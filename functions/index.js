const {onCall, onRequest, HttpsError} = require('firebase-functions/v2/https');
const {defineSecret, defineString} = require('firebase-functions/params');
const logger = require('firebase-functions/logger');
const admin = require('firebase-admin');
const Stripe = require('stripe');
const {GoogleGenerativeAI} = require('@google/generative-ai');

admin.initializeApp();
const db = admin.firestore();

// Ajuster si le projet Firestore est dans une autre région.
const REGION = 'europe-west1';

const STRIPE_SECRET_KEY = defineSecret('STRIPE_SECRET_KEY');
const STRIPE_WEBHOOK_SECRET = defineSecret('STRIPE_WEBHOOK_SECRET');
const GEMINI_API_KEY = defineSecret('GEMINI_API_KEY');
const STRIPE_PRICE_MONTHLY = defineString('STRIPE_PRICE_MONTHLY');
const STRIPE_PRICE_ANNUAL = defineString('STRIPE_PRICE_ANNUAL');
const APP_URL = defineString('APP_URL', {default: 'https://nyakkkk.github.io/cave-a-vin/'});

// Vérifier la version d'API Stripe courante au moment du déploiement (celle-ci peut dater).
function getStripe(){
  return new Stripe(STRIPE_SECRET_KEY.value(), {apiVersion: '2024-06-20'});
}

async function ensureStripeCustomer(stripe, uid, email){
  const userRef = db.collection('users').doc(uid);
  const userSnap = await userRef.get();
  const existing = userSnap.exists ? userSnap.data().stripeCustomerId : null;
  if(existing) return existing;

  const customer = await stripe.customers.create({
    email: email || undefined,
    metadata: {firebaseUID: uid},
  });
  await userRef.set({stripeCustomerId: customer.id}, {merge: true});
  await db.collection('stripeCustomers').doc(customer.id).set({uid});
  return customer.id;
}

// ── Ouvre une session Stripe Checkout (abonnement mensuel ou annuel) ──
exports.createCheckoutSession = onCall({region: REGION, secrets: [STRIPE_SECRET_KEY]}, async (request) => {
  if(!request.auth) throw new HttpsError('unauthenticated', 'Connexion requise.');
  const uid = request.auth.uid;
  const interval = request.data && request.data.interval;
  if(interval !== 'month' && interval !== 'year'){
    throw new HttpsError('invalid-argument', 'interval doit être "month" ou "year".');
  }
  const priceId = interval === 'year' ? STRIPE_PRICE_ANNUAL.value() : STRIPE_PRICE_MONTHLY.value();
  if(!priceId){
    throw new HttpsError('failed-precondition', 'Prix Stripe non configuré (STRIPE_PRICE_MONTHLY / STRIPE_PRICE_ANNUAL).');
  }

  const stripe = getStripe();
  const customerId = await ensureStripeCustomer(stripe, uid, request.auth.token.email);

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    customer: customerId,
    client_reference_id: uid,
    line_items: [{price: priceId, quantity: 1}],
    subscription_data: {metadata: {firebaseUID: uid}},
    success_url: `${APP_URL.value()}?checkout=success`,
    cancel_url: `${APP_URL.value()}?checkout=cancel`,
  });

  return {url: session.url};
});

// ── Ouvre le portail client Stripe (gérer / résilier l'abonnement) ──
exports.createPortalSession = onCall({region: REGION, secrets: [STRIPE_SECRET_KEY]}, async (request) => {
  if(!request.auth) throw new HttpsError('unauthenticated', 'Connexion requise.');
  const uid = request.auth.uid;
  const userSnap = await db.collection('users').doc(uid).get();
  const customerId = userSnap.exists ? userSnap.data().stripeCustomerId : null;
  if(!customerId){
    throw new HttpsError('failed-precondition', 'Aucun abonnement associé à ce compte.');
  }

  const stripe = getStripe();
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: APP_URL.value(),
  });

  return {url: session.url};
});

// ── Webhook Stripe : source de vérité pour le champ `plan` ──
async function resolveUidFromCustomer(customerId){
  const mapSnap = await db.collection('stripeCustomers').doc(customerId).get();
  return mapSnap.exists ? mapSnap.data().uid : null;
}

async function applySubscriptionToUser(uid, subscription){
  const status = subscription.status;
  const plan = ['active', 'trialing'].includes(status) ? 'premium' : 'free';
  await db.collection('users').doc(uid).set({
    plan,
    stripeSubscriptionId: subscription.id,
    stripeSubscriptionStatus: status,
    planRenewsAt: subscription.current_period_end
      ? admin.firestore.Timestamp.fromMillis(subscription.current_period_end * 1000)
      : null,
  }, {merge: true});
}

exports.stripeWebhook = onRequest({region: REGION, secrets: [STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET]}, async (req, res) => {
  const stripe = getStripe();
  let event;
  try{
    event = stripe.webhooks.constructEvent(req.rawBody, req.headers['stripe-signature'], STRIPE_WEBHOOK_SECRET.value());
  }catch(err){
    logger.error('Signature webhook invalide', err);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  try{
    switch(event.type){
      case 'checkout.session.completed': {
        const session = event.data.object;
        const uid = session.client_reference_id || await resolveUidFromCustomer(session.customer);
        if(uid && session.subscription){
          const subscription = await stripe.subscriptions.retrieve(session.subscription);
          await applySubscriptionToUser(uid, subscription);
        }
        break;
      }
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        const uid = (subscription.metadata && subscription.metadata.firebaseUID)
          || await resolveUidFromCustomer(subscription.customer);
        if(uid) await applySubscriptionToUser(uid, subscription);
        break;
      }
      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        const uid = (subscription.metadata && subscription.metadata.firebaseUID)
          || await resolveUidFromCustomer(subscription.customer);
        if(uid){
          await db.collection('users').doc(uid).set({
            plan: 'free',
            stripeSubscriptionStatus: subscription.status,
          }, {merge: true});
        }
        break;
      }
      default:
        break;
    }
    res.json({received: true});
  }catch(err){
    logger.error('Erreur traitement webhook', err);
    res.status(500).send('Erreur interne');
  }
});

// ── Proxy IA (Gemini) réservé aux abonnés Premium ──
// Même prompt que l'ancienne version côté client (index.html) — seule copie désormais.
const AI_PROMPT = `Tu es un expert sommelier encyclopédiste. À partir du vin fourni, retourne UNIQUEMENT un objet JSON valide (sans markdown, sans explication) :
{"name":"...","appellation":"...","type":"Rouge|Blanc sec|Blanc moelleux|Blanc liquoreux|Rosé|Pétillant|Macération|Muté / Fortifié|Doux naturel|Oxydatif|Passerillé|Autre","region":"...","country":"...","year":2015,"apogee":"2025-2035","notes_degustation":"5-8 mots-clés ex: minéral, fruits noirs, tannins soyeux","certs":["bio"],"critics":{"parker":{"score":96,"max":100}}}

RÈGLES STRICTES :
- Ne JAMAIS inventer de notes critiques. Omets si pas certain à 100%. Si aucune certitude : "critics":{}
- Critiques : parker(100), suckling(100), decanter(20), vinous(100), bettane(20), jancis(20), ws(100), bh(100), rvf(20), anson(100), gilbert(20), tim_atkin(100), falstaff(100)
- certs : certifications du domaine parmi : "bio"(AB EU), "demeter", "biody"(Biodyvin), "hve"(HVE), "nature"(Méthode Nature), "vegan", "terra"(Terra Vitis). [] si inconnu.
- Champs inconnus : null`;

const MAX_PARTS = 20;
const MAX_PART_CHARS = 4_000_000; // ~3 Mo de base64, marge sous les limites de payload

exports.generateWineInfo = onCall({region: REGION, secrets: [GEMINI_API_KEY]}, async (request) => {
  if(!request.auth) throw new HttpsError('unauthenticated', 'Connexion requise.');
  const uid = request.auth.uid;

  const userSnap = await db.collection('users').doc(uid).get();
  const plan = userSnap.exists ? userSnap.data().plan : null;
  if(plan !== 'premium'){
    throw new HttpsError('permission-denied', 'Fonctionnalité réservée aux abonnés Premium.');
  }

  const parts = request.data && request.data.parts;
  if(!Array.isArray(parts) || !parts.length || parts.length > MAX_PARTS){
    throw new HttpsError('invalid-argument', 'parts invalide ou vide.');
  }
  for(const p of parts){
    const size = typeof p === 'string' ? p.length : JSON.stringify(p).length;
    if(size > MAX_PART_CHARS){
      throw new HttpsError('invalid-argument', 'Contenu trop volumineux.');
    }
  }

  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY.value());
  const model = genAI.getGenerativeModel({
    model: 'gemini-3-flash-preview',
    systemInstruction: AI_PROMPT,
  });

  const result = await model.generateContent(parts);
  return {text: result.response.text()};
});
