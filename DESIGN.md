---
name: Cave à Vin
description: Gestionnaire de cave premium pour collectionneurs et amateurs sérieux.
colors:
  vieux-bordeaux: "#8b1a2a"
  vieux-bordeaux-profond: "#a02030"
  paille-de-riesling: "#7a5c10"
  paille-de-riesling-mid: "#96720e"
  paille-de-riesling-pale: "#e8d070"
  or-de-cave: "#fdf7e8"
  cave-profonde: "#1a090d"
  encre-sombre: "#38181f"
  encre-tertiaire: "#5c3040"
  encre-douce: "#6e404e"
  brume-de-cave: "#dcc8ce"
  lin-pale: "#f3ecee"
  lin-de-cave: "#fffcfa"
  fond-de-cave: "#f7f0ec"
  status-positif: "#2a7a2a"
  status-negatif: "#8b1a1a"
  status-avertissement: "#b8860b"
  status-info: "#1a5ab8"
typography:
  display:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontWeight: 600
    lineHeight: 1.1
  headline:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontWeight: 600
    fontSize: "1.125rem"
    lineHeight: 1.2
  body:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontWeight: 400
    fontSize: "0.9375rem"
    lineHeight: 1.5
  label:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontWeight: 600
    fontSize: "0.6875rem"
    letterSpacing: "0.05em"
rounded:
  sm: "8px"
  md: "12px"
  pill: "20px"
components:
  button-primary:
    backgroundColor: "{colors.vieux-bordeaux}"
    textColor: "{colors.lin-de-cave}"
    rounded: "{rounded.sm}"
    height: "44px"
    padding: "0 20px"
  button-primary-hover:
    backgroundColor: "{colors.vieux-bordeaux-profond}"
    textColor: "{colors.lin-de-cave}"
  button-secondary:
    backgroundColor: "{colors.lin-de-cave}"
    textColor: "{colors.cave-profonde}"
    rounded: "{rounded.sm}"
    height: "44px"
    padding: "0 16px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.cave-profonde}"
    rounded: "{rounded.sm}"
    height: "44px"
    padding: "0 16px"
  button-ia:
    backgroundColor: "{colors.or-de-cave}"
    textColor: "{colors.paille-de-riesling}"
    rounded: "{rounded.sm}"
    height: "44px"
    padding: "0 16px"
  chip:
    backgroundColor: "{colors.lin-pale}"
    textColor: "{colors.encre-douce}"
    rounded: "{rounded.pill}"
    height: "32px"
    padding: "0 12px"
  chip-selected:
    backgroundColor: "{colors.vieux-bordeaux}"
    textColor: "{colors.lin-de-cave}"
    rounded: "{rounded.pill}"
    height: "32px"
    padding: "0 12px"
---

# Design System: Cave à Vin

## 1. Overview

**Creative North Star: "Le Grand Caviste"**

Cave à Vin porte l'autorité tranquille d'un grand caviste indépendant : quelqu'un qui connaît chaque bouteille sans avoir besoin de le démontrer. L'interface ne cherche pas à séduire — elle organise. Chaque décision visuelle procède du même principe directeur : le vin est la star, l'interface son serviteur silencieux.

Le système tient une tension délibérée entre densité et grâce. Des collectionneurs sérieux ont besoin de voir beaucoup d'informations en peu d'espace ; ils méritent de le faire dans un environnement qui ressemble à une cave particulière, pas à un tableau Excel habillé en SaaS. La densité ne justifie pas la laideur. La sobriété ne justifie pas la froideur. La typographie, la couleur et l'espace sont choisis avec précision, pas avec générosité.

Ce que le système refuse catégoriquement : le bling ostentatoire des apps grand public (Vivino, CellarTracker), les copies génériques SaaS qui empilent des composants Tailwind UI ou shadcn, et tout ornement visuel qui détourne l'attention du contenu. Un seul accent, deux familles typographiques, des ombres comptées — c'est la discipline qui donne sa valeur à chaque choix.

**Key Characteristics:**
- Palette bichrome : Vieux Bordeaux (accent d'action) + Paille de Riesling (or sommelière, sidebar)
- Typographie bipolaire : Cormorant Garamond pour les noms de vins, DM Sans pour tout le reste
- Ombres à rôle sémantique : présentes et discrètes, elles signalent le statut de l'élément, pas sa décoration
- Chrome sombre permanent pour la sidebar : un fond de cave, pas un panneau SaaS
- Composants raffinés mais fonctionnels : du caractère perceptible, zéro ornement parasite

## 2. Colors: La Palette Cave Particulière

Un bichrome ancré dans le terroir, discipliné par une neutralité warm-tinted. Chaque couleur a un rôle précis et s'y tient.

### Primary
- **Vieux Bordeaux** (`#8b1a2a`): L'accent primaire. Boutons CTA, onglets actifs, top-border des cartes vin, sélections. Jamais décoratif. Sa rareté est son autorité.
- **Vieux Bordeaux Profond** (`#a02030`): État hover et active sur les boutons primaires. Légèrement plus lumineux pour signaler l'interaction sans changer de nature.

### Secondary
- **Paille de Riesling** (`#7a5c10`): Titres et libellés dans la sidebar chrome sombre. Évoque l'or mat d'un grand millésime blanc, pas l'éclat commercial.
- **Paille de Riesling Moyen** (`#96720e`): États hover sur les éléments dorés, textes secondaires dans la sidebar.
- **Paille de Riesling Pâle** (`#e8d070`): Statistiques en vedette sur fond chrome. L'éclat retenu d'une robe dorée sous la lumière de cave.
- **Or de Cave** (`#fdf7e8`): Fond des éléments contextuels IA. Chaleur sans saturation.

### Neutral
- **Cave Profonde** (`#1a090d`): Texte principal et fond de la sidebar. Jamais pur noir — teinté vers le terroir.
- **Encre Sombre** (`#38181f`): Texte secondaire important, titres de section.
- **Encre Tertiaire** (`#5c3040`): Texte tertiaire, libellés de champs, millésimes dans les cartes.
- **Encre Douce** (`#6e404e`): Métadonnées, légendes, catégories.
- **Brume de Cave** (`#dcc8ce`): Bordures de composants (cartes, champs, boutons ghost). La frontière discrète entre les surfaces.
- **Lin Pâle** (`#f3ecee`): Diviseurs, fonds de hover ultra-légers, chips non sélectionnées.
- **Lin de Cave** (`#fffcfa`): Surface principale. Fond des cartes, modales, panneaux. Presque blanc, teinté vers le chaud.
- **Fond de Cave** (`#f7f0ec`): Fond de page. Légèrement plus saturé que Lin de Cave pour créer la séparation fond/surface.

### Status
- **Vert Cellier** (`#2a7a2a`): Succès, stock suffisant, imports réussis.
- **Cramoisi** (`#8b1a1a`): Erreur, stock épuisé, actions destructives.
- **Ambre Sec** (`#b8860b`): Avertissement, stock bas, attention requise.
- **Bleu Ardoise** (`#1a5ab8`): Information, processus en cours, notifications neutres.

### Named Rules
**La Règle de l'Accent Unique.** Vieux Bordeaux apparaît sur ≤10% d'un écran donné. Il signale l'action et l'identité ; sa rareté est le point. Si tout est rouge, rien ne l'est.

**La Règle des Neutres Teintés.** Aucun `#000` ni `#fff` dans le système. Chaque neutre est teinté vers Cave Profonde (chrominance 0.005–0.01). Le blanc est Lin de Cave. Le noir est Cave Profonde. Les neutres purs trahissent une origine générique.

## 3. Typography

**Police Display :** Cormorant Garamond (avec Georgia, serif en fallback)
**Police UI :** DM Sans (avec system-ui, sans-serif en fallback)

**Caractère :** L'association n'est pas un contraste décoratif — c'est une distinction sémantique. Cormorant Garamond touche uniquement le vin : noms, appellations, titres display. DM Sans gère tout le reste. Un utilisateur doit sentir la différence : le système parle avec une voix différente pour "Chambolle-Musigny 2018" et pour "Supprimer".

### Hierarchy
- **Display** (Cormorant Garamond, 600, ~1.5–2rem, line-height 1.1): Noms de vins comme lecture primaire sur les cartes. Nulle part ailleurs dans l'interface.
- **Headline** (DM Sans, 600, 1.125rem, line-height 1.2): Titres de sections, titres de modales, en-têtes de panneaux.
- **Title** (DM Sans, 500, 1rem, line-height 1.3): Titres secondaires de sidebar, titres de groupes dans les listes.
- **Body** (DM Sans, 400, 0.9375rem, line-height 1.5): Tout le texte d'interface, libellés de champs, descriptions, données. Longueur de ligne max 65–75ch pour la prose.
- **Label** (DM Sans, 600, 0.6875rem, letter-spacing 0.05em, uppercase): Onglets de navigation, en-têtes de colonnes, catégories de chips, boutons de filtre. La casse haute confère le poids de catégorie, pas la décoration.

### Named Rules
**La Règle des Deux Voix.** Cormorant Garamond est le vin ; DM Sans est la cave. Ne jamais les inverser. Pas de Cormorant dans les boutons, libellés, ou données. Pas de DM Sans là où le nom d'un vin est la lecture primaire.

## 4. Elevation

Le système adopte une élévation **présente mais discrète**. Les éléments interactifs portent une ombre légère qui signale leur disponibilité et leur statut flottant ; les surfaces au repos restent plates. Les ombres ne créent pas de profondeur picturale — elles communiquent une hiérarchie d'attention.

Toutes les ombres sont teintées `rgba(28,10,13, ...)` — une trace de Cave Profonde — plutôt que du noir pur. La palette reste cohérente jusqu'aux ombres.

### Shadow Vocabulary
- **Hover de carte** (`0 4px 16px rgba(28,10,13,.07)`): Signale l'interactivité d'une carte au survol. Invisible au repos.
- **Dropdown** (`0 4px 20px rgba(28,10,13,.12)`): Menus flottants de premier niveau, sélecteurs, tooltips.
- **Sidebar filtre** (`8px 0 24px rgba(28,10,13,.1)`): Panneau glissant latéral. Ombre directionnelle pour ancrer le mouvement d'entrée depuis la gauche.
- **Modale / formulaire** (`0 8px 40px rgba(28,10,13,.25)`): Couche modale et overlays prioritaires. L'ombre la plus prononcée du système — réservée à la priorité d'attention maximale.

### Named Rules
**La Règle de l'Ombre Teintée.** Toutes les ombres utilisent `rgba(28,10,13, ...)` — jamais `rgba(0,0,0, ...)`. La teinte Cave Profonde garde l'élévation cohérente avec la palette. Une ombre grise indique une origine générique.

**La Règle de l'Élévation Sémantique.** L'intensité d'ombre correspond à la priorité UI : hover carte < dropdown < sidebar < modale. La profondeur d'ombre indique à l'utilisateur où diriger son attention.

## 5. Components

Les composants sont "raffinés mais fonctionnels" : présence et caractère sans ornement parasite. Le soin est perceptible — transitions précises, coins légèrement arrondis, états bien définis — mais il n'impose pas d'attention.

### Buttons
- **Shape:** Légèrement arrondis (8px, `--r`). Jamais pill pour les boutons d'action.
- **Primary:** Fond Vieux Bordeaux (`#8b1a2a`), texte Lin de Cave. Hauteur 44px. Padding 0 20px.
- **Hover/Active:** Background vers Vieux Bordeaux Profond en `.18s`. `transform: scale(0.98)` sur active en `.1s`. Focus visible : outline 2px Vieux Bordeaux, offset 2px.
- **Secondary:** Fond Lin de Cave, bordure Brume de Cave (`#dcc8ce`). Même hauteur 44px. Pour les actions confirmantes non-destructives.
- **Ghost / Annulation:** Transparent, bordure Brume de Cave. Pour les actions secondaires dans les formulaires.
- **IA:** Fond Or de Cave (`#fdf7e8`), bordure Paille de Riesling Moyen, texte Paille de Riesling. Réservé exclusivement aux actions assistées par IA.

### Chips
- **Shape:** Pill complet (20px radius, `--r3`). La seule exception au bouton non-pill.
- **Non sélectionné:** Fond Lin Pâle (`#f3ecee`), texte Encre Douce. Hauteur 32px (28px en panneau filtre compact).
- **Sélectionné:** Fond Vieux Bordeaux, texte Lin de Cave. Transition `.15s`.
- **Usage:** Filtres de catégorie, sélections multiples. Jamais pour des actions primaires.

### Cards / Containers (Wine Cards)
- **Corner Style:** Arrondis doux (12px, `--r2`).
- **Background:** Lin de Cave.
- **Top Border:** 3px solid `var(--wtype-clr)` — la couleur-type du vin. C'est l'unique signal coloré de la carte : une classification, pas une décoration.
- **Side/Bottom Border:** Brume de Cave (`#dcc8ce`), 1px.
- **Shadow Strategy:** Plate au repos. Hover élève à `0 4px 16px rgba(28,10,13,.07)`.
- **Signature:** La bordure supérieure étroite est le seul accent coloré de la carte. Elle n'est pas une stripe — c'est un signal de classification. Jamais de `border-left` ou `border-right` comme accent coloré.

### Inputs / Fields
- **Style:** Bordure 1px Brume de Cave, fond Lin de Cave, radius 8px. Hauteur 44px.
- **Focus:** La bordure passe à Vieux Bordeaux. Pas de glow, pas d'ombre — le changement de bordure seul.
- **Error:** Bordure Cramoisi (`#8b1a1a`), fond légèrement teinté `--clr-neg-bg`.
- **Placeholder:** Brume de Cave, 400 weight. Discret mais lisible.

### Navigation
- **Onglets principaux (`.ntab`):** DM Sans, 0.6875rem, uppercase, weight 600, letter-spacing 0.05em. Bottom-border 2px Vieux Bordeaux sur l'état actif. Pas de fond actif, pas de pill — les onglets expriment leur état uniquement par la typographie et la ligne.
- **Sidebar chrome:** Fond Cave Profonde (`#1a090d`) permanent, quel que soit le thème. Titres de section en Paille de Riesling. Statistiques en Paille de Riesling Pâle. La sidebar est la présence constante de la cave.

### Wine Card (Composant Signature)
La carte vin est la pièce maîtresse. Elle porte l'image de la bouteille, le nom en Cormorant Garamond (dominant), l'appellation en label uppercase, le millésime en corps, et les contrôles quantité/édition/suppression. La hiérarchie — nom dominant, millésime en vedette — traduit le premier principe du produit : "Le vin est la star." Aucun autre composant ne peut porter Cormorant Garamond.

## 6. Do's and Don'ts

### Do:
- **Do** utiliser Vieux Bordeaux (`#8b1a2a`) uniquement pour les actions primaires, les états actifs, et les indicateurs de classification. Sa rareté est son autorité.
- **Do** utiliser Cormorant Garamond exclusivement pour les noms de vins et les titres display. Tout autre texte est DM Sans.
- **Do** teinter toutes les ombres avec `rgba(28,10,13, ...)` — jamais `rgba(0,0,0, ...)`.
- **Do** utiliser la bordure supérieure (3px solid type-color) comme unique signal accent sur les cartes vin. Pas de remplissage coloré, pas de stripe latérale.
- **Do** maintenir 44px de cible tactile minimum sur tous les éléments interactifs. Utiliser `::after` avec un inset négatif si la taille visuelle est plus petite.
- **Do** maintenir l'état ARIA complet (aria-expanded, aria-selected, aria-live) sur toutes les régions interactives. L'état de l'interface n'est jamais ambigu.
- **Do** conserver la sidebar toujours sombre (fond `#1a090d`), indépendamment du thème de page.

### Don't:
- **Don't** utiliser `border-left` ou `border-right` supérieur à 1px comme accent coloré. La stripe latérale est interdite. Remplacer par une bordure supérieure, un fond teinté, ou rien.
- **Don't** utiliser du texte en dégradé (`background-clip: text` avec un fond gradient). Jamais.
- **Don't** créer des grilles de cartes identiques (même icône + titre + texte, répété). La carte vin est distinctive ; les patterns génériques détruisent son autorité.
- **Don't** animer pour décorer. Animer uniquement les changements d'état (hover, open/close, loading). Aucune chorégraphie d'entrée.
- **Don't** utiliser Cormorant Garamond dans les labels UI, boutons, éléments de navigation, ou données.
- **Don't** utiliser du `#000` pur ou du `#fff` pur. Tout neutre est teinté vers Cave Profonde.
- **Don't** ressembler à Vivino, CellarTracker, ou une app grand public d'œnologie. Pas de widgets de notation étoilées, pas de backgrounds décoratifs, pas de patterns "social".
- **Don't** ressembler à un SaaS générique (Tailwind UI, shadcn defaults). Pas de gris neutres, pas d'accent bleu primaire, pas de card-grids icône+titre+corps.
- **Don't** être "trop chargé / bling". Chaque élément visuel justifie sa présence par sa fonction, pas par son esthétique.
- **Don't** utiliser du glassmorphism décoratif. Le toast utilise un `backdrop-filter:blur(4px)` fonctionnel — c'est le plafond du système.
