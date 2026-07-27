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
- Compte Stripe et abonnement configurés et déployés (secrets, prix mensuel/annuel, webhook signé, règles Firestore). Testé de bout en bout.

### Abonnement Premium — refonte de la modale de vente
- La modale « Passer Premium » affiche désormais les vrais prix (récupérés en direct depuis Stripe via une nouvelle fonction `getPricing`, jamais codés en dur) : prix mensuel, prix annuel, équivalent mensuel de l'offre annuelle, et un badge d'économie calculé automatiquement (`Économisez X%`).
- Ajout d'une liste de bénéfices concrets de l'IA (reconnaissance d'étiquette, remplissage automatique des champs) au-dessus des offres, pour clarifier la valeur avant le prix.
- Carte annuelle mise en avant visuellement (bordure accentuée, badge d'économie), bouton mensuel en style secondaire pour orienter vers l'offre la plus avantageuse.

### Abonnement Premium — visibilité dans le site
- Le seul rappel de l'offre Premium était un lien texte caché dans le menu du profil. Ajout d'un badge permanent dans l'en-tête (« ★ Passer Premium » en doré pour les utilisateurs gratuits, « ★ Premium » discret pour les abonnés), visible sur toutes les pages, qui ouvre directement la modale tarifs ou le portail d'abonnement selon le statut.
- Ajout d'une pastille « Premium » directement sur les options "Photo de l'étiquette" et "Nom de la cuvée" dans les écrans d'ajout (vin et souhait), pour rendre la fonctionnalité visible là où elle sert, plutôt que découverte seulement au clic. Masquée automatiquement pour les abonnés.
- Retrait du lien "Passer Premium" du menu déroulant (redondant avec le badge de l'en-tête). À la place, ajout d'une section **Abonnement** dans la modale "Mon profil" : statut actuel (Version gratuite / Premium) et bouton pour changer d'offre ou gérer l'abonnement.

## 2026-07-27 (2)

### Application Android (Capacitor)
- Mise en place de l'infrastructure pour empaqueter le site en vraie application Android installable : `capacitor.config.json`, projet natif `android/` (généré via Capacitor), scripts `scripts/build-www.mjs` (copie le site vers `www/`, le dossier embarqué dans l'app) et `scripts/compress-images.mjs`.
- Les 4 images de fond de l'écran de connexion (13,5 Mo au total en SVG) sont converties en WebP compressé (~2,3 Mo au total, -83%), pour un chargement plus rapide sur le web et une app plus légère. Fichiers SVG sources devenus inutiles supprimés du dépôt, avec `bottle_svg.svg` qui n'était déjà plus utilisé.
- Comportements adaptés spécifiquement pour l'app native (le site web n'est pas affecté, tout est détecté au runtime) :
  - Lien IdealWine et paiement Stripe : ouverture dans le navigateur système plutôt que dans la WebView de l'app (pour Stripe, une navigation dans la WebView casserait la session de connexion — retour géré par un lien `caveavin://checkout` dédié).
  - Export de la cave : le popup d'impression du web ne fonctionnant pas dans une app Android, l'export natif passe par le sélecteur de partage Android (impression via Chrome, enregistrement, etc.).
  - Scan d'étiquette par IA : ouverture de l'appareil photo natif au lieu du simple sélecteur de fichier, pour une expérience plus fiable.
  - Bouton retour matériel Android : ferme la modale ouverte (ou le panneau de filtres) au lieu de fermer l'application.
- Icône et écran de démarrage de l'app générés à partir du logo existant (fond bordeaux nuit, bouteille dans une arche de cave) — un placeholder rapide, remplaçable plus tard.
- **Reste à faire côté humain** : installer Android Studio (aucun SDK Android sur cette machine), puis `npm install` + `npx cap sync android` + `npx cap open android` pour compiler et tester réellement l'app. Publication sur le Play Store hors de ce chantier (compte développeur à créer séparément).

## 2026-07-27 (3)

### Refonte graphique mobile-native
L'empaquetage Capacitor rendait l'app installable, mais l'interface restait une simple transposition responsive du desktop (barre d'onglets étirée, header dense, modales centrées trop petites). Refonte pensée pour un usage au pouce, via des media queries CSS — profite donc aussi bien à l'app Android qu'à toute visite du site depuis un téléphone.

- **Navigation** : barre de navigation fixe en bas d'écran sous 760px (Mes vins, Mes caves, Dégustations, Souhaits en accès direct + bouton **Plus** ouvrant une feuille pour Statistiques et Ventes). La barre d'onglets du haut est masquée sur mobile ; le bouton retour matériel Android ferme la feuille "Plus" comme les autres modales.
- **Nettoyage** : suppression d'un système de navigation en tiroir (sidebar + burger) entièrement codé en CSS mais jamais branché au HTML — un reliquat d'une itération de design antérieure.
- **En-tête** : les 4 indicateurs (Bouteilles / Références / Valeur / +/- value) étaient auparavant intégralement masqués sous 560px, sans alternative. Remplacés par une version compacte (Bouteilles · Valeur). Le bouton mode privé, lui aussi masqué sans remplacement, est désormais accessible depuis le menu du profil sur mobile.
- **Barre d'outils (Mes vins)** : recherche en pleine largeur sur sa propre ligne, puis vue/tri/filtres/export sur une seconde ligne (filtres et export en icônes avec info-bulle accessible), et bouton "+ Ajouter un vin" mis en avant sur toute la largeur plutôt qu'un bouton flottant.
- **Modales** : les fenêtres (profil, ajout de vin/cave, dégustation, vente, IA, tarifs, mentions légales…) s'ouvrent désormais depuis le bas de l'écran en plein largeur sur mobile, plus confortables à manipuler au pouce qu'une fenêtre centrée réduite. La fiche détail d'un vin (déjà un tiroir plein écran) et le formulaire d'ajout en pleine page n'étaient pas concernés.
- **Cartes vin et filtres** : zone de clic du bouton "Modifier" agrandie pour le tactile (même mécanisme invisible déjà utilisé pour les boutons quantité/suppression). Le panneau de filtres passe en plein écran sur les téléphones étroits plutôt que de rester figé à 320px.
- **Zones tactiles** : extension de la zone de clic invisible (déjà en place sur certains boutons) aux boutons vue grille/cave, thème, mode privé, avatar, badge Premium, fermeture du panneau de filtres, éléments du menu d'export et fermeture des modales.
