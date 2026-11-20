export default {
  locale: "fr",
  name: "Français",
  pageTitle: "Massar × LODENE — Choisissez votre parcours",
  nav: {
    univers: "Nos univers",
    collaboration: "La collaboration",
    steps: "Comment ça marche",
    contact: "Contact",
    access: "Mon espace",
    menu: "Ouvrir le menu",
    close: "Fermer",
    home: "Accueil",
    skip: "Aller au contenu",
    language: "Choisir la langue",
  },
  common: {
    discover: "Découvrir cet univers",
    explore: "Explorer nos univers",
    back: "Tous les univers",
    contact: "Parlons de votre projet",
    lodeneContact: "Contacter LODENE",
    official: "Consulter le site LODENE",
    catalog: "Voir le catalogue LODENE",
    related: "Et si votre prochaine étape était ici ?",
    next: "D’autres parcours à explorer",
    france: "France",
    tunisia: "Tunisie",
    availability:
      "Programmes, prérequis et disponibilité à confirmer avec LODENE.",
    illustrative: "Visuel d’illustration",
    learn: "Ce que vous pouvez explorer",
    details: "Voir le parcours",
    email: "Écrire à LODENE",
    call: "Appeler le centre",
    address: "Le centre de formation",
    external: "S’ouvre dans un nouvel onglet",
    close: "Fermer",
    training: "Centre de formation",
    code: "Code & auto-écoles",
    more: "En savoir plus",
  },
  hero: {
    eyebrow: "CONDUITE · FORMATION · AVENIR",
    title: "Votre avenir commence par le",
    accent: "bon parcours.",
    description:
      "Le code de la route avec Massar. La conduite et les compétences professionnelles avec LODENE. Deux expertises réunies pour vous aider à avancer.",
    secondary: "Découvrir la collaboration",
    imageAlt: "Apprentissage de la conduite avec LODENE",
    floatTitle: "Un projet, plusieurs chemins.",
    floatText: "Trouvez celui qui vous ressemble.",
    imageTag: "Apprendre. Pratiquer. Avancer.",
    smallImageAlt: "Échanges lors d’un atelier de formation",
    bottom: "Du premier code aux nouvelles compétences.",
  },
  scrollWorld: {
    ariaLabel: "Parcours interactif Massar et LODENE",
    band: {
      ariaLabel: "Accès direct aux univers de formation",
      count: "6 univers",
      description: "réunis pour construire votre parcours",
      items: [
        { label: "Code", href: "/massar" },
        { label: "Conduite & engins", href: "/lodene/conduite" },
        { label: "VTC", href: "/lodene/vtc" },
        { label: "Logistique", href: "/lodene/logistique" },
        { label: "SST", href: "/lodene/sst" },
        { label: "Langues", href: "/lodene/langues" },
      ],
    },
    sections: [
      {
        id: "cap", label: "Votre cap", eyebrow: "Six univers de formation",
        title: "Code, conduite et formations professionnelles.",
        body: "De la première règle du code à la maîtrise d’un métier, Massar et LODENE transforment chaque ambition en parcours concret.",
        alt: "Campus miniature où plusieurs chemins de formation se rejoignent",
        tagsLabel: "Repères du parcours", tags: ["Massar", "LODENE", "Tunisie · France"],
      },
      {
        id: "massar", label: "Code Massar", eyebrow: "Apprentissage numérique",
        title: "Apprenez le code avec Massar.",
        body: "Retrouvez vos cours, entraînez-vous avec les quiz et suivez votre progression avec votre auto-école.",
        alt: "Diorama d’un candidat qui apprend le code de la route avec son formateur",
        tagsLabel: "Fonctions Massar", tags: ["Cours", "Quiz", "Suivi"],
      },
      {
        id: "conduite", label: "Conduite et engins", eyebrow: "Formation pratique",
        title: "Prenez les commandes.",
        body: "Permis automobile, tractopelle, chariot électrique, gerbeur et nacelle composent des parcours bien identifiés.",
        alt: "Diorama d’un centre d’apprentissage de la conduite et des engins",
        tagsLabel: "Parcours de conduite", tags: ["Permis", "Engins", "Manutention"],
      },
      {
        id: "mobilite", label: "VTC et logistique", eyebrow: "Métiers de la mobilité",
        title: "Faites de la mobilité un métier.",
        body: "Préparez un projet VTC ou développez vos compétences dans l’organisation des flux, l’entrepôt et le transport.",
        alt: "Diorama réunissant transport de personnes et opérations logistiques",
        tagsLabel: "Métiers présentés", tags: ["VTC", "Flux", "Transport"],
      },
      {
        id: "competences", label: "SST et langues", eyebrow: "Compétences complémentaires",
        title: "Ajoutez des compétences utiles.",
        body: "Prévention, gestes de secours, anglais, espagnol ou allemand : choisissez les compétences adaptées à votre projet.",
        alt: "Diorama de deux ateliers consacrés au secourisme et aux langues",
        tagsLabel: "Compétences présentées", tags: ["SST", "Anglais", "Espagnol · Allemand"],
      },
      {
        id: "lodene", label: "Votre prochaine étape", eyebrow: "Échange avec le centre",
        title: "Choisissez votre prochaine formation.",
        body: "Présentez votre objectif à l’équipe LODENE et identifiez le parcours qui correspond à votre situation.",
        alt: "Diorama de l’entrée d’un centre de formation LODENE",
        tagsLabel: "Accès au centre", tags: ["Conduite", "Métiers", "Langues"],
        cta: { label: "Contacter LODENE", href: "#contact" },
        secondary: { label: "Voir tous les univers", href: "/#univers" },
      },
    ],
  },
  univers: {
    eyebrow: "À CHAQUE PROJET, SON UNIVERS",
    title: "Vous voulez aller où ?",
    description:
      "Choisissez votre objectif. Retrouvez les parcours et les bons interlocuteurs dans un espace dédié.",
    all: "Tous les univers",
    driving: "Conduite",
    professional: "Métiers & sécurité",
    languages: "Langues",
    filter: "Filtrer les univers",
    results: "univers",
    carouselLabel: "Parcours disponibles",
    previous: "Voir le parcours précédent",
    next: "Voir le parcours suivant",
  },
  services: {
    massar: {
      title: "Massar Auto-école",
      short: "Le code, à votre rythme.",
      description:
        "Révisez le code tunisien, entraînez-vous avec des quiz et suivez votre progression avec votre auto-école.",
      tag: "CODE · QUIZ · SUIVI",
      alt: "Aperçu d’une question du code de la route sur Massar",
      hero: "Le bon départ pour votre permis.",
      intro:
        "Un espace pour apprendre le code de la route en arabe ou en français, pratiquer et garder le cap avec votre auto-école.",
      features: [
        [
          "Réviser le code",
          "Retrouvez vos cours et avancez page après page, à votre rythme.",
        ],
        [
          "Pratiquer avec les quiz",
          "Entraînez-vous et repérez les thèmes que vous devez encore travailler.",
        ],
        [
          "Suivre votre progression",
          "Retrouvez vos résultats et votre parcours dans votre espace candidat.",
        ],
      ],
    },
    conduite: {
      title: "Conduite & engins",
      short: "Du volant aux commandes.",
      description:
        "Permis automobile, tractopelle, chariot électrique type Fenwick, gerbeur et nacelle : trouvez votre parcours.",
      tag: "PERMIS · ENGINS · MANUTENTION",
      alt: "Tractopelle avec godet avant et bras de terrassement arrière",
      hero: "Prenez les commandes de votre avenir.",
      intro:
        "Conduire une voiture ou apprendre à manœuvrer un engin : deux parcours bien identifiés, un même point de départ avec LODENE.",
    },
    vtc: {
      title: "Formation VTC",
      short: "Donnez un cap à votre métier.",
      description:
        "Découvrez la préparation au métier de chauffeur VTC et échangez avec le centre sur votre projet.",
      tag: "TRANSPORT DE PERSONNES",
      alt: "Formation au transport de personnes et à la conduite VTC",
      hero: "Faites de la conduite votre métier.",
      intro:
        "Un projet de chauffeur VTC ? Découvrez les compétences à travailler et échangez avec LODENE sur le parcours qui correspond à votre situation.",
      features: [
        [
          "Préparer son projet",
          "Faire le point sur votre situation, les conditions d’accès et les étapes du parcours.",
        ],
        [
          "Comprendre le métier",
          "Explorer la réglementation, la relation client et l’organisation de l’activité.",
        ],
        [
          "Travailler la pratique",
          "Se préparer à la conduite professionnelle et à la prise en charge des passagers.",
        ],
      ],
      action: "Découvrir l’offre VTC",
    },
    sst: {
      title: "Secourisme & SST",
      short: "Les bons gestes, au bon moment.",
      description:
        "Apprenez à prévenir les risques et découvrez les gestes de secours en milieu professionnel.",
      tag: "PRÉVENTION · SECOURISME",
      alt: "Atelier de premiers secours avec un mannequin de formation",
      hero: "Savoir agir quand cela compte.",
      intro:
        "La prévention et les premiers secours font partie des compétences utiles au travail. Découvrez les formations SST proposées par LODENE.",
      features: [
        [
          "Repérer les risques",
          "Comprendre les situations à risque et contribuer à leur prévention.",
        ],
        [
          "Alerter et protéger",
          "Découvrir les étapes pour sécuriser une situation et transmettre une alerte.",
        ],
        [
          "S’entraîner aux gestes",
          "Aborder les gestes de premiers secours lors de mises en situation encadrées.",
        ],
      ],
      action: "Découvrir l’offre SST",
    },
    logistique: {
      title: "Logistique & transport",
      short: "Faites circuler les compétences.",
      description:
        "Organisation des flux, environnement d’entrepôt et transport : construisez votre projet professionnel.",
      tag: "FLUX · ENTREPÔT · TRANSPORT",
      alt: "Professionnels de la logistique organisant les mouvements d’un véhicule de parc",
      hero: "Trouvez votre place dans la chaîne.",
      intro:
        "Du mouvement des marchandises à l’organisation des opérations, découvrez l’univers logistique et échangez avec le centre sur vos besoins.",
      features: [
        [
          "Comprendre les flux",
          "Explorer les étapes de réception, de stockage et d’expédition des marchandises.",
        ],
        [
          "Travailler en sécurité",
          "Repérer les règles de circulation, la coactivité et les précautions en entrepôt.",
        ],
        [
          "Définir son parcours",
          "Échanger sur les compétences à développer selon votre expérience et votre projet.",
        ],
      ],
      action: "Explorer le catalogue",
    },
    langues: {
      title: "Formations linguistiques",
      short: "Ouvrez la conversation.",
      description:
        "Anglais, espagnol ou allemand : développez votre aisance pour vos projets personnels et professionnels.",
      tag: "ANGLAIS · ESPAGNOL · ALLEMAND",
      alt: "Adultes échangeant autour d’une table lors d’un atelier de langues",
      hero: "Une nouvelle langue. De nouvelles possibilités.",
      intro:
        "Pour travailler, voyager ou gagner en confiance : parlez de vos objectifs avec le centre et trouvez un parcours linguistique adapté.",
      features: [
        [
          "Anglais",
          "Prendre la parole, comprendre ses interlocuteurs et enrichir son vocabulaire.",
        ],
        [
          "Espagnol",
          "Construire des échanges utiles et pratiquer dans des situations du quotidien.",
        ],
        [
          "Allemand",
          "Développer ses bases et gagner en aisance dans les échanges professionnels.",
        ],
      ],
      action: "Découvrir l’approche langues",
    },
  },
  collaboration: {
    eyebrow: "DEUX EXPERTISES, UNE MÊME AMBITION",
    title: "Deux savoir-faire. Votre prochaine étape.",
    description:
      "Apprendre le code avec Massar. Développer vos compétences avec LODENE. Choisissez l’univers qui correspond à votre projet.",
    massarTitle: "Le code, à votre rythme.",
    massarText:
      "Une plateforme d’apprentissage du code en arabe et en français, pour les candidats et les auto-écoles.",
    massarLink: "Découvrir Massar",
    lodeneTitle: "Des compétences pour avancer.",
    lodeneLink: "Découvrir LODENE",
    lodeneText:
      "Un centre de formation à Conflans-Sainte-Honorine pour construire votre prochain parcours.",
    note: "Votre parcours se poursuit dans l’espace de l’équipe concernée.",
    link: "Trouver mon univers",
  },
  steps: {
    stepLabel: "ÉTAPE",
    eyebrow: "UN CHEMIN SIMPLE",
    title: "De l’envie au bon interlocuteur.",
    items: [
      [
        "Choisissez votre univers",
        "Code, conduite, engins, métier ou langues : commencez par ce qui vous motive.",
      ],
      [
        "Explorez votre parcours",
        "Découvrez les possibilités et identifiez les compétences que vous souhaitez développer.",
      ],
      [
        "Faites le premier pas",
        "Accédez à votre espace Massar ou échangez directement avec l’équipe LODENE.",
      ],
    ],
  },
  contact: {
    eyebrow: "ON FAIT LE PREMIER PAS ?",
    title: "Votre projet mérite une vraie conversation.",
    description: "Choisissez l’équipe qui correspond à votre besoin.",
    massarTitle: "Apprendre avec Massar",
    massarText:
      "Déjà candidat ou responsable d’une auto-école ? Retrouvez votre espace et votre parcours.",
    candidate: "Espace candidat",
    school: "Espace auto-école",
    lodeneTitle: "Se former avec LODENE",
    lodeneText:
      "Conduite, engins, VTC, SST, logistique ou langues : parlons de vos objectifs.",
    location: "Conflans-Sainte-Honorine · France",
  },
  access: {
    title: "Retrouvez votre espace",
    description: "Choisissez le service auquel vous êtes inscrit.",
    candidate: "Candidat Massar",
    candidateText: "Mes cours, mes quiz et ma progression",
    school: "Auto-école Massar",
    schoolText: "Gestion de mon école et de mes candidats",
    lodene: "Apprenant LODENE",
    lodeneText: "Accéder au portail du centre",
    note: "Chaque espace conserve son propre compte de connexion.",
  },
  conduite: {
    equipment: "Engins & manutention",
    auto: "Permis & automobile",
    equipmentEyebrow: "CONDUITE D’ENGINS",
    equipmentTitle: "Quel engin voulez-vous apprendre à conduire ?",
    equipmentText:
      "Des parcours clairement identifiés pour le chantier, l’entrepôt et le travail en hauteur. Contactez le centre pour vérifier le programme adapté à votre besoin.",
    machines: {
      tractopelle: {
        title: "Tractopelle",
        label: "CHANTIER & TERRASSEMENT",
        description:
          "Découvrez la prise en main d’un tractopelle et les bases des manœuvres de chantier.",
        topics: [
          "Repérage des commandes et vérifications",
          "Déplacement et positionnement de l’engin",
          "Approche des opérations de terrassement",
        ],
      },
      chariot: {
        title: "Chariot élévateur électrique",
        label: "TYPE FENWICK · MANUTENTION",
        description:
          "Apprenez les principes de déplacement et de manutention des charges en entrepôt.",
        topics: [
          "Vérifications avant utilisation",
          "Circulation et stabilité des charges",
          "Approche du chargement et du stockage",
        ],
      },
      gerbeur: {
        title: "Gerbeur & transpalette électrique",
        label: "ENTREPÔT & STOCKAGE",
        description:
          "Explorez les équipements de manutention pour déplacer et stocker les palettes.",
        topics: [
          "Identifier les équipements et leur usage",
          "Déplacer les palettes en sécurité",
          "Comprendre le gerbage et le dégerbage",
        ],
      },
      nacelle: {
        title: "Nacelle / PEMP",
        label: "ÉLÉVATION & TRAVAIL EN HAUTEUR",
        description:
          "Découvrez les principes de mise en place et de conduite des plateformes élévatrices.",
        topics: [
          "Observer l’environnement de travail",
          "Stabiliser et positionner l’équipement",
          "Manœuvrer la plateforme en sécurité",
        ],
      },
    },
    topicLabel: "Points à aborder avec le centre",
    machineContact: "Demander des informations",
    autoEyebrow: "PERMIS & CONDUITE AUTOMOBILE",
    autoTitle: "La liberté commence au volant.",
    autoText:
      "Vous préparez votre permis ou souhaitez reprendre confiance au volant ? LODENE vous présente les options disponibles pour votre situation.",
    autoItems: [
      "Préparation au code de la route",
      "Apprentissage de la conduite automobile",
      "Accompagnement selon votre niveau",
    ],
    autoAlt: "Voiture d’apprentissage et équipe de l’auto-école LODENE",
    autoAction: "Explorer les parcours automobile",
    project: "Un engin précis en tête ?",
    projectText:
      "Expliquez votre besoin au centre : le type de machine, votre expérience et votre objectif professionnel.",
    logisticsLink: "Découvrir aussi l’univers logistique",
    disclaimer:
      "Visuels d’illustration. Les programmes, catégories CACES éventuelles, conditions d’accès et sessions sont à confirmer directement avec le centre.",
  },
  service: {
    yourProject: "Votre projet, votre parcours.",
    projectText:
      "Les durées, conditions d’accès, sessions et modalités de financement dépendent du parcours choisi. L’équipe LODENE vous communiquera les informations correspondant à votre situation.",
    question: "Prêt à en parler ?",
    relatedEquipment: "Vous cherchez une formation sur engins ?",
    relatedEquipmentText:
      "Tractopelle, chariot électrique, gerbeur et nacelle se trouvent dans l’espace Conduite & engins.",
    equipmentAction: "Voir les formations sur engins",
    languageCodes: ["EN", "ES", "DE"],
  },
  massar: {
    candidate: "Accéder à mon espace candidat",
    school: "Je représente une auto-école",
    space: "VOTRE ESPACE D’APPRENTISSAGE",
    previewTitle: "Apprendre, puis s’entraîner.",
    previewText:
      "Des supports de cours et des questions visuelles pour travailler les règles de la route.",
    bilingual: "En français et en arabe",
    forSchools: "Vous accompagnez des candidats ?",
    schoolText:
      "Massar réunit le suivi des candidats, les cours, les quiz et l’organisation de votre auto-école dans un espace dédié.",
    schoolAction: "Accéder à l’espace auto-école",
    france: "Un projet de conduite en France ?",
    franceText:
      "Découvrez les permis et les formations sur engins dans l’espace LODENE.",
    franceAction: "Découvrir LODENE Conduite",
  },
  footer: {
    tagline: "Le bon parcours. Le bon partenaire.",
    description:
      "Une porte d’entrée commune vers le code, la conduite et les compétences professionnelles.",
    univers: "Nos univers",
    links: "Liens utiles",
    contact: "Contacter LODENE",
    portal: "Espace apprenant LODENE",
    privacy: "Confidentialité",
    notice: "Massar × LODENE — Aperçu de la collaboration",
    top: "Retour en haut",
  },
  privacy: {
    title: "Vos données dans cet aperçu",
    paragraphs: [
      "Ce site de présentation fonctionne sans formulaire de collecte, sans outil publicitaire et sans connexion à une API métier.",
      "Seul votre choix de langue est conservé dans le stockage local de votre navigateur. Vous pouvez l’effacer depuis les paramètres de votre navigateur.",
      "Les liens vers Massar et LODENE vous dirigent vers des services distincts. Leurs propres conditions et politiques de confidentialité s’appliquent lorsque vous les consultez.",
      "Les boutons de contact ouvrent votre application de messagerie ou de téléphone. Aucun message n’est envoyé automatiquement.",
    ],
  },
  notFound: {
    title: "Ce chemin n’existe pas encore.",
    text: "Retrouvez les univers Massar × LODENE et choisissez votre prochaine étape.",
    action: "Revenir à l’accueil",
  },
};
