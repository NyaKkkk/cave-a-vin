# Changelog

Suivi des modifications notables apportées au site.

## 2026-07-26

### Onglet Ventes
- Les KPI distinguent désormais les ventes finalisées (statut "Vendu") des annonces en attente ("À vendre" / "En cours") : *Bouteilles vendues*, *Revenus encaissés*, *Prix moyen/bouteille* et *Plus-value réalisée* ne portent plus que sur les ventes conclues.
- Ajout du compteur *En attente de vente*.

### Onglet Statistiques
- Suppression des filtres par type en haut de l'onglet (Rouge, Blanc sec, Moelleux, Liquoreux, Rosé, Pétillant, Macération).
- Les KPI globaux (achat/actuelle/plus-value totale) sont remplacés par une vue d'ensemble de la cave : Bouteilles, Références, Valeur de la cave, Âge moyen, Prêtes à boire.
- Nouveau camembert **Répartition par région**.
- Suppression des graphiques "Plus-value par région" et "Valeur achat vs actuelle par région" (trop orientés investissement).
- "Plus-value par millésime" devient **Bouteilles par millésime** (nombre de bouteilles par année, plus de gain financier).
- Nouveaux blocs **Répartition par format** (tailles de bouteilles) et **À boire en priorité** (vins dont la fenêtre d'apogée est dépassée ou proche, basé sur le champ Apogée de chaque fiche vin).

## 2026-07-26 (2)

### Pages légales
- Rédaction de 4 documents affichés dans une modale dédiée depuis le footer : CGU, Politique de confidentialité, Politique de cookies, Mentions légales.
- Les CGV et Tarifs ont été retirés du footer (aucune offre payante n'existe actuellement dans le site).
- L'identité de l'éditeur (nom/raison sociale, adresse) est laissée en placeholder `[à compléter]` dans Mentions légales et Confidentialité — à compléter avec les vraies informations avant mise en production réelle.
- Le bandeau de cookies a été corrigé pour ne plus mentionner une mesure d'audience qui n'existe pas dans le code ; son lien "En savoir plus" ouvre désormais la politique de cookies complète.

### Fond de page
- Signalement utilisateur d'une différence de couleur de fond sur la partie droite de l'écran. Investigation approfondie (CSS, DOM, tests sur le site déployé en conditions réelles à plusieurs résolutions) : aucune cause trouvée dans le code, le fond est bien uniforme sur toute la largeur. Non reproduit sur le site réel — probablement lié à l'environnement de test. À reconfirmer avec une capture d'écran si le problème persiste.

## 2026-07-27

### Fond de page (suite)
- Cause réelle trouvée : la barre de navigation et la barre d'outils s'arrêtent 15px avant le bord de la fenêtre (largeur de la scrollbar native), qui n'était pas stylée et tranchait avec la palette chaude du site. Scrollbar principale désormais stylée pour se fondre dans la charte graphique (clair et sombre).

### Abonnement Premium (Stripe) — infrastructure
- Ajout de l'infrastructure Firebase Cloud Functions (`firebase.json`, `.firebaserc`, `firestore.rules`, `functions/`) : `createCheckoutSession`, `createPortalSession`, `stripeWebhook`, `generateWineInfo`.
- La fonction d'analyse par IA (reconnaissance d'étiquette photo/texte) est déplacée côté serveur : elle vérifie l'abonnement (`plan==='premium'`) avant d'appeler Gemini, ce qu'un contrôle uniquement côté client ne pouvait pas garantir.
- Nouvelle modale **Passer Premium** (mensuel/annuel) déclenchée dès qu'un utilisateur non-abonné clique sur une fonctionnalité IA (ajout de vin ou de souhait). Menu utilisateur : bouton "Passer Premium" / "Gérer mon abonnement" selon le statut.
- Règles de sécurité Firestore : les champs `plan`, `stripeCustomerId`, `stripeSubscriptionId`, `planRenewsAt` ne sont modifiables que par les Cloud Functions, jamais par le client.
- **Reste à faire côté humain avant mise en service** : compte Stripe (produit + prix mensuel/annuel), passage du projet Firebase au plan Blaze, déploiement des fonctions, configuration du webhook Stripe. Voir le plan détaillé pour l'ordre exact des étapes.
- Bug corrigé au passage : le chargement des scripts Firebase était une chaîne codée en dur sur 4 scripts ; l'ajout d'un 5e script (Cloud Functions) le laissait silencieusement de côté. Chargement généralisé en boucle pour éviter que ça se reproduise.
