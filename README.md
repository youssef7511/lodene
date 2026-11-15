# Massar × LODENE — frontend indépendant

Première implémentation de la nouvelle porte d’entrée commune : une page d’accueil, six univers et une navigation français/arabe. Ce dépôt contient uniquement le frontend indépendant : son propre `package.json`, son serveur Vite et ses ressources locales.

## Démarrer

Prérequis : Node.js 22.12+ ou 24 LTS, npm.

```powershell
git clone https://github.com/youssef7511/lodene.git
cd lodene
npm install
npm run dev
```

Ouvrir **http://127.0.0.1:5174**. Le port est fixe : Vite signale une erreur si un autre service l’utilise.

```powershell
npm run lint
npm test
npm run build
npm run preview
```

La prévisualisation du build utilise **http://127.0.0.1:4176**. Pour un hébergement ultérieur, configurer le serveur pour rediriger les URL de l’application vers `index.html` (routage React). Cet aperçu contient une directive `noindex`.

## Parcours

| URL                  | Contenu                                                                                                        |
| -------------------- | -------------------------------------------------------------------------------------------------------------- |
| `/`                  | Accueil du groupe, filtres des univers, présentation de la collaboration, étapes et contact                    |
| `/massar`            | Présentation du code tunisien et accès aux espaces candidat / auto-école existants                             |
| `/lodene/conduite`   | **Tractopelle, chariot électrique type Fenwick, gerbeur/transpalette et nacelle/PEMP**, puis permis automobile |
| `/lodene/vtc`        | Présentation de la formation VTC                                                                               |
| `/lodene/sst`        | Présentation prévention / secourisme SST                                                                       |
| `/lodene/logistique` | Logistique et transport, avec lien explicite vers les formations sur engins                                    |
| `/lodene/langues`    | Anglais, espagnol et allemand                                                                                  |
| `/confidentialite`   | Fonctionnement de cet aperçu et préférence de langue                                                           |

Les cartes des engins disposent d’un détail dépliable et d’un contact par e-mail avec objet prérempli. Les liens de contact ouvrent l’application téléphone ou messagerie : aucun envoi n’est simulé.

## Connexion aux espaces existants

L’application ne crée pas de comptes et n’appelle aucune API. Le bouton « Mon espace » propose trois destinations distinctes. Les liens Massar pointent par défaut vers l’application existante sur `http://localhost:3000`.

Pour changer cette destination, copier `.env.example` dans `.env.local` et définir :

```dotenv
VITE_MASSAR_URL=http://localhost:3000
```

Redémarrer Vite après modification. Les destinations LODENE sont centralisées dans `src/data/catalog.js` : site officiel, catalogue, portail apprenant, téléphone et e-mail. Les liens externes s’ouvrent dans un nouvel onglet avec `noopener noreferrer`.

## Organisation

- `src/pages/` : accueil et espaces de chaque univers.
- `src/components/` : identité partagée, menu mobile, dialogue d’accès, cartes et contact.
- `src/i18n/fr.js`, `ar.js` : libellés et textes. L’arabe utilise une mise en page RTL ; les marques et coordonnées latines restent isolées.
- `src/data/` : destinations, catalogue des univers et engins.
- `src/styles.css` : style et adaptations mobile / tablette / bureau.
- `public/images/` : visuels locaux et leur provenance dans `sources.json`.
- `public/fonts/` : Outfit et Tajawal auto-hébergées, licences SIL OFL incluses.
- `tests/` : cohérence des parcours, traductions, visuels et destinations de connexion.

La seule donnée persistée est la langue, dans `localStorage` sous `massar-lodene-language`. Aucun service tiers n’est nécessaire au rendu initial de la page.

## Vérification de cette version

- ESLint, les quatre tests du catalogue et le build de production passent.
- Contrôle navigateur sous Microsoft Edge : neuf routes, français/arabe, largeurs 320, 390, 768, 1024 et 1440 px, soit 90 combinaisons. Aucun débordement horizontal ni image manquante.
- Filtres, navigation entre univers, ancres, détails des quatre engins, liens des trois comptes, menu tactile sur tablette, fermeture au clavier et persistance de la langue vérifiés.
- Aucun appel à une API métier ni erreur de console pendant les parcours testés.
- Audit automatisé axe-core : aucune violation détectée sur l’accueil bureau, Conduite bureau, Langues mobile en arabe et le dialogue d’accès. Ce contrôle automatisé ne remplace pas un audit d’accessibilité complet.

Captures du rendu réel : [accueil bureau](screenshots/home-desktop-fr.png), [accueil mobile français](screenshots/home-mobile-fr.png), [accueil mobile arabe](screenshots/home-mobile-ar.png), [Conduite bureau](screenshots/conduite-desktop-fr.png), [Conduite mobile arabe](screenshots/conduite-mobile-ar.png).

## Contenu à valider avec le partenaire

Cette version reprend les domaines demandés dans le brief. Les programmes exacts, catégories d’engins/CACES, prérequis, langues disponibles, sessions, tarifs et conditions de financement restent à confirmer avec LODENE. Aucun chiffre de réussite, témoignage, tarif ou engagement de financement n’est inventé. Le programme détaillé présenté pour les engins sert à orienter la discussion avec le centre.

Les photos et le logo LODENE proviennent de son site public ; leur utilisation est limitée à cet aperçu local en attendant validation. Les images du tractopelle et de l’atelier de langues sont des illustrations générées, et sont identifiées comme telles sur les espaces concernés. La vignette Massar est une copie de son visuel marketing existant. Aucun fichier de l’application d’origine n’a été modifié.
