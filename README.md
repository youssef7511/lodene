# Massar × LODENE — frontend Next.js

Porte d’entrée commune construite avec Next.js App Router : une page d’accueil, six univers et une navigation français/arabe. Le projet produit un site statique autonome dans `out/` et conserve toutes ses ressources localement.

## Démarrer

Prérequis : Node.js 22.12+ ou 24 LTS, npm.

```powershell
git clone https://github.com/youssef7511/lodene.git
cd lodene
npm install
npm run dev
```

Ouvrir **http://127.0.0.1:5174**.

```powershell
npm run lint
npm test
npm run build
npm run preview
```

La prévisualisation de l’export statique utilise **http://127.0.0.1:4176**. Le dossier `out/` peut être déployé sur n’importe quel hébergeur statique. Cet aperçu contient toujours une directive `noindex`.

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
NEXT_PUBLIC_MASSAR_URL=http://localhost:3000
NEXT_PUBLIC_SITE_URL=https://votre-domaine.example
```

Redémarrer Vite après modification. Les destinations LODENE sont centralisées dans `src/data/catalog.js` : site officiel, catalogue, portail apprenant, téléphone et e-mail. Les liens externes s’ouvrent dans un nouvel onglet avec `noopener noreferrer`.

## Organisation

- `app/` : routes, layouts et métadonnées Next.js.
- `src/views/` : vues clientes de l’accueil et des univers.
- `src/components/` : identité partagée, navigation, cartes, contact et animation GSAP de l’accueil.
- `src/i18n/fr.js`, `ar.js` : libellés et textes. L’arabe utilise une mise en page RTL ; les marques et coordonnées latines restent isolées.
- `src/data/` : destinations, catalogue des univers et engins.
- `src/styles.css` : style global et adaptations mobile / tablette / bureau.
- `public/images/` : visuels locaux et leur provenance dans `sources.json`.
- `public/fonts/` : Outfit et Tajawal auto-hébergées, licences SIL OFL incluses.
- `tests/` : cohérence des parcours, traductions, visuels et destinations de connexion.

La seule donnée persistée est la langue, dans `localStorage` sous `massar-lodene-language`. Les pages sont pré-générées par Next.js et aucun service tiers n’est nécessaire au rendu initial.

## Vérification de cette version

- ESLint, les quatre tests du catalogue et l’export statique Next.js constituent les contrôles du projet.
- Contrôle navigateur sous Microsoft Edge : neuf routes, français/arabe, largeurs 320, 390, 768, 1024 et 1440 px, soit 90 combinaisons. Aucun débordement horizontal ni image manquante.
- Filtres, navigation entre univers, ancres, détails des quatre engins, liens des trois comptes, menu tactile sur tablette, fermeture au clavier et persistance de la langue vérifiés.
- Aucun appel à une API métier ni erreur de console pendant les parcours testés.
- Audit automatisé axe-core : aucune violation détectée sur l’accueil bureau, Conduite bureau, Langues mobile en arabe et le dialogue d’accès. Ce contrôle automatisé ne remplace pas un audit d’accessibilité complet.

Captures du rendu réel : [accueil bureau](screenshots/home-desktop-fr.png), [accueil mobile français](screenshots/home-mobile-fr.png), [accueil mobile arabe](screenshots/home-mobile-ar.png), [Conduite bureau](screenshots/conduite-desktop-fr.png), [Conduite mobile arabe](screenshots/conduite-mobile-ar.png).

## Contenu à valider avec le partenaire

Cette version reprend les domaines demandés dans le brief. Les programmes exacts, catégories d’engins/CACES, prérequis, langues disponibles, sessions, tarifs et conditions de financement restent à confirmer avec LODENE. Aucun chiffre de réussite, témoignage, tarif ou engagement de financement n’est inventé. Le programme détaillé présenté pour les engins sert à orienter la discussion avec le centre.

Les photos et le logo LODENE proviennent de son site public ; leur utilisation est limitée à cet aperçu local en attendant validation. Les images du tractopelle et de l’atelier de langues sont des illustrations générées, et sont identifiées comme telles sur les espaces concernés. La vignette Massar est une copie de son visuel marketing existant. Aucun fichier de l’application d’origine n’a été modifié.
