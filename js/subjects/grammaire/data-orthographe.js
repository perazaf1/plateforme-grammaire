/**
 * Grammaire & Méthode — Données Orthographe, Accords & Dictées
 */
(function (global) {
  "use strict";

  global.GrammaireDataParts = global.GrammaireDataParts || {};
  global.GrammaireDataParts.orthographeDefis = [
  {
    "id": "ortho1",
    "titre": "Accord du participe passé avec COD antéposé (Phrase 4 du cours)",
    "enonce": "Je les ai ____ à l'automne (en parlant des narcisses, nom masculin pluriel).",
    "options": [
      "plantés",
      "planté",
      "plantée",
      "plantées"
    ],
    "reponseCorrecte": 0,
    "regle": "Avec l'auxiliaire avoir, le participe passé s'accorde en genre et en nombre avec le COD si celui-ci est placé AVANT le verbe (« les » = les narcisses, masculin pluriel → plantés)."
  },
  {
    "id": "ortho2",
    "titre": "Accord du participe passé avec COD antéposé (Féminin pluriel)",
    "enonce": "Les branches fleuries que j'ai ____ s'étendent au-dessus de l'eau.",
    "options": [
      "aperçues",
      "aperçu",
      "aperçue",
      "aperçus"
    ],
    "reponseCorrecte": 0,
    "regle": "Le pronom relatif « que » est COD du verbe « ai aperçu(es) ». Son antécédent est « Les branches » (féminin pluriel), placé avant le verbe → accord au féminin pluriel : « aperçues »."
  },
  {
    "id": "ortho3",
    "titre": "Attribut du sujet avec verbe d'état",
    "enonce": "Sous le soleil d'avril, les jeunes pousses du jardin semblent ____ .",
    "options": [
      "épanouies",
      "épanoui",
      "épanouis",
      "épanouie"
    ],
    "reponseCorrecte": 0,
    "regle": "« Sembler » est un verbe d'état. L'attribut s'accorde en genre et en nombre avec le sujet « les jeunes pousses » (féminin pluriel) → « épanouies »."
  },
  {
    "id": "ortho4",
    "titre": "Accord du verbe : piège du complément du nom",
    "enonce": "Le chant mélodieux des oiseaux du parc m'____ profondément.",
    "options": [
      "émerveille",
      "émerveillent",
      "émerveilles",
      "émerveillant"
    ],
    "reponseCorrecte": 0,
    "regle": "Piège classique d'attraction ! Le sujet n'est pas « des oiseaux » mais « Le chant » (singulier). Le verbe s'accorde donc à la 3e personne du singulier : « émerveille »."
  },
  {
    "id": "ortho5",
    "titre": "Homophones grammaticaux : leur vs leurs (Français Facile)",
    "enonce": "Les jardiniers coupent les branches sèches et ____ donnent une seconde vie.",
    "options": [
      "leur",
      "leurs",
      "leurre",
      "leurres"
    ],
    "reponseCorrecte": 0,
    "regle": "Placé devant un verbe (« donnent »), « leur » est un pronom personnel (COI : donne à eux). Il est STRICTEMENT INVARIABLE : jamais de -s devant un verbe !"
  },
  {
    "id": "ortho6",
    "titre": "Homophones grammaticaux : leur vs leurs (Déterminant)",
    "enonce": "Les arbres du verger perdent ____ fleurs au premier coup de vent.",
    "options": [
      "leurs",
      "leur",
      "leurre",
      "leurs'"
    ],
    "reponseCorrecte": 0,
    "regle": "Ici, « leurs » est un déterminant possessif qui détermine le nom pluriel « fleurs ». Il prend donc la marque du pluriel : « leurs fleurs »."
  },
  {
    "id": "ortho7",
    "titre": "Homophones grammaticaux : ce vs se",
    "enonce": "À la tombée du jour, le cerisier ____ couvre d'une ombre bleutée.",
    "options": [
      "se",
      "ce",
      "ceux",
      "c'"
    ],
    "reponseCorrecte": 0,
    "regle": "Devant le verbe pronominal « couvre » (« se couvrir »), on emploie le pronom réfléchi « se ». « Ce » est un déterminant ou pronom démonstratif (« ce cerisier »)."
  },
  {
    "id": "ortho8",
    "titre": "Homophones grammaticaux : ces vs ses",
    "enonce": "Regarde ____ péniches au loin sur le fleuve : elles avancent lentement.",
    "options": [
      "ces",
      "ses",
      "c'est",
      "s'est"
    ],
    "reponseCorrecte": 0,
    "regle": "On montre du doigt les péniches : c'est le déterminant démonstratif « ces » (pluriel de ce/cette). « Ses » est possessif (les siennes)."
  },
  {
    "id": "ortho9",
    "titre": "Accord du verbe avec sujet pronom relatif « qui »",
    "enonce": "C'est moi qui ____ planté ces narcisses le long de la berge.",
    "options": [
      "ai",
      "a",
      "est",
      "es"
    ],
    "reponseCorrecte": 0,
    "regle": "Le pronom relatif « qui » prend la personne et le nombre de son antécédent. Ici, l'antécédent est « moi » (1re personne du singulier), donc le verbe prend « ai » (« c'est moi qui ai »)."
  },
  {
    "id": "ortho10",
    "titre": "Tout / tous / toute / toutes",
    "enonce": "____ les branches du vieux pommier ont résisté à la tempête.",
    "options": [
      "Toutes",
      "Tous",
      "Tout",
      "Toute"
    ],
    "reponseCorrecte": 0,
    "regle": "« Branches » est un nom féminin pluriel. Le déterminant indéfini s'accorde au féminin pluriel : « Toutes les branches »."
  },
  {
    "id": "ortho11",
    "titre": "Terminaison verbale en -é ou -er (Règle de remplacement)",
    "enonce": "Pour réussir son examen, l'étudiant doit s'entraîner à ____ chaque proposition.",
    "options": [
      "analyser",
      "analysé",
      "analysez",
      "analysés"
    ],
    "reponseCorrecte": 0,
    "regle": "Astuce Français Facile : remplacez par un verbe du 3e groupe comme « mordre / vendre ». On dit « s'entraîner à mordre » et non « à mordu » → infinitif en -er !"
  },
  {
    "id": "ortho12",
    "titre": "Accord du mot « demi »",
    "enonce": "La conférence a duré une heure et ____ .",
    "options": [
      "demie",
      "demi",
      "demis",
      "demies"
    ],
    "reponseCorrecte": 0,
    "regle": "Placé APRÈS le nom, « demi » s'accorde en genre uniquement avec ce nom (jamais de -s au pluriel) : « une heure et demie »."
  }
];
  global.GrammaireDataParts.dictees = [
  {
    "id": "dictee-1",
    "titre": "Dictée 1 : Le Réveil du Jardin (Niveau Fondamental)",
    "difficulte": "Intermédiaire",
    "theme": "Accords des participes passés et homophones",
    "audioDebits": [
      1,
      0.8
    ],
    "texteComplet": "Sous le ciel gris du matin, les fleurs que j'ai aperçues ont bien du mal à s'épanouir. Je les ai plantées avec patience le long de l'allée sinueuse. Leurs tiges fragiles ploient sous la pluie, mais leur éclat demeure intact.",
    "phrases": [
      {
        "texte": "Sous le ciel gris du matin, les fleurs que j'ai aperçues ont bien du mal à s'épanouir.",
        "notes": "« aperçues » : accord au féminin pluriel avec le pronom relatif « que », COD placé avant l'auxiliaire avoir (antécédent : les fleurs). « s'épanouir » : verbe pronominal à l'infinitif après la préposition « à »."
      },
      {
        "texte": "Je les ai plantées avec patience le long de l'allée sinueuse.",
        "notes": "« les ai plantées » : « les » est pronom personnel COD antéposé remplaçant les fleurs (fém. pl.) → accord avec un « -es ». « sinueuse » : adjectif fém. singulier."
      },
      {
        "texte": "Leurs tiges fragiles ploient sous la pluie, mais leur éclat demeure intact.",
        "notes": "« Leurs tiges » : déterminant possessif devant un nom pluriel → prend un -s. « leur éclat » : déterminant devant un nom singulier → pas de -s. « demeure » : verbe d'état, « intact » est son attribut au masculin singulier."
      }
    ],
    "vocabulaireCles": [
      {
        "mot": "aperçues",
        "regle": "Accord participe passé avec COD antéposé (que = les fleurs, fém. pl.)"
      },
      {
        "mot": "plantées",
        "regle": "Accord participe passé avec pronom COD antéposé « les »"
      },
      {
        "mot": "Leurs tiges",
        "regle": "Déterminant possessif pluriel s'accordant avec « tiges »"
      },
      {
        "mot": "leur éclat",
        "regle": "Déterminant possessif singulier s'accordant avec « éclat »"
      },
      {
        "mot": "demeure intact",
        "regle": "« demeurer » est verbe d'état → attribut du sujet au masculin singulier"
      }
    ]
  },
  {
    "id": "dictee-2",
    "titre": "Dictée 2 : Les Photographes et les Trésors du Musée (Français Facile)",
    "difficulte": "Concours / Examen",
    "theme": "Sujet inversé, accord des adjectifs de couleur et pronoms",
    "audioDebits": [
      1,
      0.8
    ],
    "texteComplet": "Attentivement, les visiteurs se pressent dans les salles spacieuses du vieux musée. Les toiles restaurées qu'ont admirées les critiques suscitent une vive émotion. Chacun d'eux tente de saisir ces jeux de lumière sans en altérer la préservation.",
    "phrases": [
      {
        "texte": "Attentivement, les visiteurs se pressent dans les salles spacieuses du vieux musée.",
        "notes": "« Attentivement » : adverbe invariable en -ment. « se pressent » : pronom réfléchi « se » (ne pas écrire « ce »). « spacieuses » : adjectif accordé avec « salles » (fém. pl.)."
      },
      {
        "texte": "Les toiles restaurées qu'ont admirées les critiques suscitent une vive émotion.",
        "notes": "« qu'ont admirées » : piège du sujet inversé ! Le sujet de « ont admirées » est « les critiques ». Mais le COD est le pronom relatif « qu' » dont l'antécédent est « Les toiles restaurées » (fém. pl.) → accord « admirées » !"
      },
      {
        "texte": "Chacun d'eux tente de saisir ces jeux de lumière sans en altérer la préservation.",
        "notes": "« Chacun » : singulier → « tente ». « ces jeux » : déterminant démonstratif (on montre les jeux de lumière, ne pas confondre avec le possessif « ses »). « sans en altérer » : infinitif après la préposition « sans »."
      }
    ],
    "vocabulaireCles": [
      {
        "mot": "se pressent",
        "regle": "Homophone ce/se : pronom réfléchi devant le verbe presser"
      },
      {
        "mot": "admirées",
        "regle": "Accord du participe passé avec COD « qu' » antéposé (les toiles)"
      },
      {
        "mot": "ces jeux",
        "regle": "Déterminant démonstratif (pluriel de « ce jeu »)"
      },
      {
        "mot": "sans en altérer",
        "regle": "Règle de l'infinitif après préposition (sans faire, sans altérer)"
      }
    ]
  },
  {
    "id": "dictee-3",
    "titre": "Dictée 3 : Le Fleuve et les Péniches à l'Aurore",
    "difficulte": "Avancé",
    "theme": "Compléments circonstanciels, pronom dont et accords complexes",
    "audioDebits": [
      1,
      0.8
    ],
    "texteComplet": "Entre les branches fleuries du cerisier, aperçois-tu les péniches qui avancent en paisibles caravanes ? Tous les mariniers saluent la berge verdoyante dont les reflets miroitent sur l'eau limpide. Les chants des oiseaux sauvages nous ont émerveillés pendant de longues heures.",
    "phrases": [
      {
        "texte": "Entre les branches fleuries du cerisier, aperçois-tu les péniches qui avancent en paisibles caravanes ?",
        "notes": "« aperçois-tu » : trait d'union obligatoire lors de l'inversion du pronom sujet. « caravanes » : nom féminin pluriel, « paisibles » prend un -s."
      },
      {
        "texte": "Tous les mariniers saluent la berge verdoyante dont les reflets miroitent sur l'eau limpide.",
        "notes": "« Tous les mariniers » : déterminant indéfini masculin pluriel « Tous ». « dont » : pronom relatif invariable (les reflets de la berge). « miroitent » : verbe s'accordant avec le sujet « les reflets »."
      },
      {
        "texte": "Les chants des oiseaux sauvages nous ont émerveillés pendant de longues heures.",
        "notes": "« nous ont émerveillés » : « nous » est pronom personnel COD placé avant le verbe avoir (ils ont émerveillé qui ? → nous, masculin pluriel) → accord en -és ! Ne pas faire accorder le verbe avec « oiseaux » mais avec « Les chants » (3e pers. pluriel)."
      }
    ],
    "vocabulaireCles": [
      {
        "mot": "aperçois-tu",
        "regle": "Tiret d'inversion du sujet interrogatif"
      },
      {
        "mot": "Tous les",
        "regle": "Tout s'accorde au masculin pluriel devant l'article"
      },
      {
        "mot": "ont émerveillés",
        "regle": "Accord participe passé avec COD antéposé « nous »"
      }
    ]
  }
];
})(typeof window !== "undefined" ? window : globalThis);
