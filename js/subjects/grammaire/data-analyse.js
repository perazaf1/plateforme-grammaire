/**
 * Grammaire & Méthode — Données Analyse (Phrases d'analyse, Quiz Nature/Fonction, Cas 4 étapes)
 */
(function (global) {
  "use strict";

  global.GrammaireDataParts = global.GrammaireDataParts || {};
  global.GrammaireDataParts.dixPhrases = [
  {
    "id": 1,
    "serie": "Série 1 : Fiche Officielle",
    "numero": 1,
    "phraseBrute": "Le printemps a été tardif cette année.",
    "texteAffiche": "Le <mark class='target-token'>printemps</mark> a été tardif cette année.",
    "elementCible": "printemps",
    "typeCible": "mot",
    "decoupagePropositions": "[Le (printemps) a été tardif cette année.]",
    "typeProposition": "Proposition indépendante (1 seul verbe conjugué : « a été »)",
    "natureExacte": "Nom commun",
    "fonctionExacte": "Noyau du groupe nominal sujet du verbe « a été »",
    "choixNature": [
      "Nom commun",
      "Adjectif qualificatif",
      "Verbe conjugué",
      "Adverbe"
    ],
    "choixFonction": [
      "Noyau du groupe nominal sujet du verbe « a été »",
      "Complément d'Objet Direct (COD)",
      "Attribut du sujet",
      "Complément Circonstanciel de temps"
    ],
    "explication": "« Printemps » est un nom commun masculin singulier précédé du déterminant « Le ». En posant la question : « Qui est-ce qui a été tardif ? », on obtient « Le printemps » : c'est le Groupe Nominal Sujet. « Printemps » en est le mot-noyau.",
    "piege": "Ne pas confondre avec le CC de temps de la fin de phrase (« cette année »)."
  },
  {
    "id": 2,
    "serie": "Série 1 : Fiche Officielle",
    "numero": 2,
    "phraseBrute": "Sous le ciel gris, les fleurs ont bien du mal à percer.",
    "texteAffiche": "Sous le ciel gris, les <mark class='target-token'>fleurs</mark> ont bien du mal à percer.",
    "elementCible": "fleurs",
    "typeCible": "mot",
    "decoupagePropositions": "[Sous le ciel gris, les (fleurs) ont bien du mal à percer.]",
    "typeProposition": "Proposition indépendante (1 verbe conjugué : « ont »)",
    "natureExacte": "Nom commun",
    "fonctionExacte": "Sujet du verbe « ont »",
    "choixNature": [
      "Nom commun",
      "Pronom personnel",
      "Adjectif qualificatif",
      "Participe présent"
    ],
    "choixFonction": [
      "Sujet du verbe « ont »",
      "Complément d'Objet Direct de « ont »",
      "Complément Circonstanciel de lieu",
      "Complément du nom « ciel »"
    ],
    "explication": "« Fleurs » est un nom commun (féminin pluriel). Pour trouver le sujet : « Qui est-ce qui a bien du mal à percer ? » → « les fleurs ». « Fleurs » est donc le sujet (ou noyau du GN sujet) du verbe « ont ».",
    "piege": "Attention à l'inversion stylistique : le CC de lieu (« Sous le ciel gris ») est placé en tête de phrase, mais le sujet reste « les fleurs »."
  },
  {
    "id": 3,
    "serie": "Série 1 : Fiche Officielle",
    "numero": 3,
    "phraseBrute": "Cependant, les narcisses sont épanouis dans l’herbe.",
    "texteAffiche": "Cependant, les narcisses sont épanouis <mark class='target-token'>dans l’herbe</mark>.",
    "elementCible": "dans l’herbe",
    "typeCible": "groupe",
    "decoupagePropositions": "[Cependant, les narcisses sont épanouis (dans l’herbe).]",
    "typeProposition": "Proposition indépendante (1 verbe conjugué : « sont »)",
    "natureExacte": "Groupe prépositionnel",
    "natureDetaillee": "Préposition « dans » + article élidé « l' » + nom commun « herbe »",
    "fonctionExacte": "Complément Circonstanciel (CC) de lieu",
    "choixNature": [
      "Groupe prépositionnel",
      "Groupe nominal simple",
      "Proposition subordonnée",
      "Adverbe composé"
    ],
    "choixFonction": [
      "Complément Circonstanciel (CC) de lieu",
      "Complément d'Objet Indirect (COI)",
      "Attribut du sujet",
      "Complément du nom « narcisses »"
    ],
    "explication": "Le groupe « dans l'herbe » est introduit par la préposition « dans ». Il répond à la question : « Les narcisses sont épanouis où ? » → « dans l'herbe ». Il est déplaçable et supprimable : c'est un CC de lieu.",
    "piege": "Ne pas confondre avec un COI : un verbe d'état n'a pas de COI, et ce groupe est supprimable sans rendre la phrase incorrecte (« Cependant, les narcisses sont épanouis. »)."
  },
  {
    "id": 4,
    "serie": "Série 1 : Fiche Officielle",
    "numero": 4,
    "phraseBrute": "Je les ai plantés à l’automne.",
    "texteAffiche": "Je <mark class='target-token'>les</mark> ai plantés à l’automne.",
    "elementCible": "les",
    "typeCible": "mot",
    "decoupagePropositions": "[Je (les) ai plantés à l’automne.]",
    "typeProposition": "Proposition indépendante (1 verbe conjugué : « ai plantés »)",
    "natureExacte": "Pronom personnel",
    "fonctionExacte": "Complément d'Objet Direct (COD) du verbe « ai plantés »",
    "choixNature": [
      "Pronom personnel",
      "Article défini (déterminant)",
      "Pronom démonstratif",
      "Pronom relatif"
    ],
    "choixFonction": [
      "Complément d'Objet Direct (COD) du verbe « ai plantés »",
      "Sujet du verbe « ai plantés »",
      "Complément d'Objet Indirect (COI)",
      "Complément Circonstanciel de temps"
    ],
    "explication": "« Les » remplace ici « les narcisses » ou « les bulbes » et précède le verbe conjugué : c'est un pronom personnel (et NON un article !). Question : « J'ai planté qui/quoi ? » → « les » (placé avant le verbe). C'est le COD !",
    "piege": "Règle d'orthographe cruciale : comme le COD « les » (masculin pluriel) est placé AVANT le verbe conjugué avec l'auxiliaire avoir, le participe passé s'accorde : « plantés » prend un -s !"
  },
  {
    "id": 5,
    "serie": "Série 1 : Fiche Officielle",
    "numero": 5,
    "phraseBrute": "Quand j’orne mon jardin, ce n’est pas pour moi.",
    "texteAffiche": "Quand j’orne <mark class='target-token'>mon jardin</mark>, ce n’est pas pour moi.",
    "elementCible": "mon jardin",
    "typeCible": "groupe",
    "decoupagePropositions": "[Quand j’orne (mon jardin),]Sub. conj. [ce n’est pas pour moi.]Principale",
    "typeProposition": "Phrase complexe à 2 propositions (Subordonnée conjonctive + Principale)",
    "natureExacte": "Groupe nominal",
    "natureDetaillee": "Déterminant possessif « mon » + nom commun « jardin »",
    "fonctionExacte": "Complément d'Objet Direct (COD) du verbe « orne »",
    "choixNature": [
      "Groupe nominal",
      "Groupe prépositionnel",
      "Proposition subordonnée",
      "Pronom possessif"
    ],
    "choixFonction": [
      "Complément d'Objet Direct (COD) du verbe « orne »",
      "Sujet du verbe « orne »",
      "Complément Circonstanciel de lieu",
      "Attribut du sujet « ce »"
    ],
    "explication": "Dans la proposition subordonnée « Quand j'orne mon jardin », le sujet est « j' », le verbe est « orne ». On pose la question : « J'orne quoi ? » → « mon jardin ». C'est un COD non prépositionnel.",
    "piege": "« Mon jardin » peut être sujet (« Mon jardin fleurit ») ou CC de lieu (« dans mon jardin »), mais ici sa fonction est bel et bien COD !"
  },
  {
    "id": 6,
    "serie": "Série 1 : Fiche Officielle",
    "numero": 6,
    "phraseBrute": "Je pense à un être vague qui aimera ces fleurs.",
    "texteAffiche": "Je <mark class='target-token'>pense</mark> à un être vague qui aimera ces fleurs.",
    "elementCible": "pense",
    "typeCible": "mot",
    "decoupagePropositions": "[Je (pense) à un être vague]Principale [qui aimera ces fleurs.]Sub. relative",
    "typeProposition": "Phrase complexe : Proposition principale + Proposition subordonnée relative",
    "natureExacte": "Verbe conjugué",
    "natureDetaillee": "Verbe penser, présent de l'indicatif, 1re personne du singulier",
    "fonctionExacte": "Noyau verbal de la proposition principale",
    "choixNature": [
      "Verbe conjugué",
      "Nom commun",
      "Participe présent",
      "Adjectif"
    ],
    "choixFonction": [
      "Noyau verbal de la proposition principale",
      "Sujet de la proposition principale",
      "Complément d'Objet Indirect",
      "Attribut du sujet « Je »"
    ],
    "explication": "« Pense » est la forme conjuguée du verbe du 1er groupe « penser ». C'est le pivot (noyau verbal) autour duquel s'articule la proposition principale « Je pense à un être vague ».",
    "piege": "Ne pas confondre le verbe « pense » avec le nom homophone « pensée »."
  },
  {
    "id": 7,
    "serie": "Série 1 : Fiche Officielle",
    "numero": 7,
    "phraseBrute": "Entre les branches fleuries du cerisier, j’aperçois le fleuve.",
    "texteAffiche": "Entre les branches fleuries <mark class='target-token'>du cerisier</mark>, j’aperçois le fleuve.",
    "elementCible": "du cerisier",
    "typeCible": "groupe",
    "decoupagePropositions": "[Entre les branches fleuries (du cerisier), j’aperçois le fleuve.]",
    "typeProposition": "Proposition unique indépendante (1 verbe : « aperçois »)",
    "natureExacte": "Groupe prépositionnel",
    "natureDetaillee": "Article contracté « du » (de + le) + nom commun « cerisier »",
    "fonctionExacte": "Complément du nom « branches » (CDN)",
    "choixNature": [
      "Groupe prépositionnel",
      "Groupe nominal sujet",
      "Complément Circonstanciel",
      "Adverbe"
    ],
    "choixFonction": [
      "Complément du nom « branches » (CDN)",
      "Complément Circonstanciel de lieu de « aperçois »",
      "Complément d'Objet Indirect de « aperçois »",
      "Épithète liée du nom « branches »"
    ],
    "explication": "Tout le bloc « Entre les branches fleuries du cerisier » est CC de lieu. Mais À L'INTÉRIEUR de ce bloc, « du cerisier » s'accroche directement au nom « branches » (« les branches de quoi ? »). Sa fonction interne est donc Complément du Nom (CDN) de « branches » !",
    "piege": "Piège classique d'examen : confondre la fonction du grand bloc (CC de lieu) avec la fonction interne d'un mot ou sous-groupe (Complément du nom)."
  },
  {
    "id": 8,
    "serie": "Série 1 : Fiche Officielle",
    "numero": 8,
    "phraseBrute": "Les péniches passent en paisibles caravanes.",
    "texteAffiche": "Les péniches passent <mark class='target-token'>en paisibles caravanes</mark>.",
    "elementCible": "en paisibles caravanes",
    "typeCible": "groupe",
    "decoupagePropositions": "[Les péniches passent (en paisibles caravanes).]",
    "typeProposition": "Proposition unique indépendante (1 verbe : « passent »)",
    "natureExacte": "Groupe prépositionnel",
    "natureDetaillee": "Préposition « en » + adjectif qualificatif « paisibles » + nom commun « caravanes »",
    "fonctionExacte": "Complément Circonstanciel (CC) de manière du verbe « passent »",
    "choixNature": [
      "Groupe prépositionnel",
      "Groupe nominal COD",
      "Attribut du sujet « Les péniches »",
      "Proposition subordonnée"
    ],
    "choixFonction": [
      "Complément Circonstanciel (CC) de manière du verbe « passent »",
      "Attribut du sujet « Les péniches »",
      "Complément d'Objet Direct",
      "Complément d'Objet Indirect"
    ],
    "explication": "Le groupe est introduit par la préposition « en ». On pose la question : « Les péniches passent comment ? / de quelle manière ? » → « en paisibles caravanes ». C'est un Complément Circonstanciel de manière.",
    "piege": "« Passer » est ici un verbe intransitif employé au sens de circuler. Ce n'est pas un verbe d'état, donc ce n'est pas un attribut !"
  },
  {
    "id": 9,
    "serie": "Série 1 : Fiche Officielle",
    "numero": 9,
    "phraseBrute": "Les chants des oiseaux m’émerveillent toujours autant.",
    "texteAffiche": "Les chants des oiseaux m’émerveillent <mark class='target-token'>toujours</mark> autant.",
    "elementCible": "toujours",
    "typeCible": "mot",
    "decoupagePropositions": "[Les chants des oiseaux m’émerveillent (toujours) autant.]",
    "typeProposition": "Proposition unique indépendante (1 verbe : « émerveillent »)",
    "natureExacte": "Adverbe",
    "natureDetaillee": "Adverbe de temps (mot invariable)",
    "fonctionExacte": "Modifie le sens du verbe « émerveillent » (CC de temps)",
    "choixNature": [
      "Adverbe",
      "Adjectif qualificatif",
      "Conjonction de coordination",
      "Préposition"
    ],
    "choixFonction": [
      "Modifie le sens du verbe « émerveillent » (CC de temps)",
      "Complément d'Objet Direct",
      "Attribut du sujet",
      "Sujet du verbe"
    ],
    "explication": "« Toujours » est un mot strictement invariable qui ne prend jamais de marque de genre ou de nombre : c'est un adverbe. Il s'applique au verbe « émerveillent » pour en préciser la fréquence et la durée dans le temps.",
    "piege": "Ne pas le confondre avec un adjectif. Un adverbe ne s'accorde jamais !"
  },
  {
    "id": 10,
    "serie": "Série 1 : Fiche Officielle",
    "numero": 10,
    "phraseBrute": "Et voici mon jardin sous un soleil de printemps.",
    "texteAffiche": "Et voici mon jardin sous <mark class='target-token'>un</mark> soleil de printemps.",
    "elementCible": "un",
    "typeCible": "mot",
    "decoupagePropositions": "[Et voici mon jardin sous (un) soleil de printemps.]",
    "typeProposition": "Proposition unique indépendante",
    "natureExacte": "Déterminant (Article indéfini)",
    "natureDetaillee": "Article indéfini, masculin singulier",
    "fonctionExacte": "Détermine le nom commun « soleil »",
    "choixNature": [
      "Déterminant (Article indéfini)",
      "Pronom indéfini",
      "Nom commun",
      "Adjectif numéral"
    ],
    "choixFonction": [
      "Détermine le nom commun « soleil »",
      "Sujet de « voici »",
      "Épithète liée du nom « soleil »",
      "Complément d'Objet Direct"
    ],
    "explication": "« Un » est placé devant le nom « soleil » pour former le groupe nominal « un soleil ». C'est un article indéfini. Sa fonction grammaticale au niveau du mot est d'actualiser / déterminer le nom « soleil ».",
    "piege": "La fonction d'un déterminant est toujours de « déterminer / actualiser » le nom auquel il est rattaché."
  },
  {
    "id": 11,
    "serie": "Série 2 : Français Facile",
    "numero": 11,
    "phraseBrute": "Cette vieille bâtisse semble abandonnée depuis plusieurs années.",
    "texteAffiche": "Cette vieille bâtisse semble <mark class='target-token'>abandonnée</mark> depuis plusieurs années.",
    "elementCible": "abandonnée",
    "typeCible": "mot",
    "decoupagePropositions": "[Cette vieille bâtisse semble (abandonnée) depuis plusieurs années.]",
    "typeProposition": "Proposition indépendante (1 verbe : « semble »)",
    "natureExacte": "Adjectif qualificatif (participe passé adjectivé)",
    "fonctionExacte": "Attribut du sujet « Cette vieille bâtisse »",
    "choixNature": [
      "Adjectif qualificatif (participe passé adjectivé)",
      "Verbe conjugué au passif",
      "Nom commun",
      "Adverbe"
    ],
    "choixFonction": [
      "Attribut du sujet « Cette vieille bâtisse »",
      "Épithète liée du nom « bâtisse »",
      "Complément d'Objet Direct",
      "Complément Circonstanciel de manière"
    ],
    "explication": "Le verbe « sembler » est un verbe d'état. Le mot « abandonnée » exprime une qualité attribuée au sujet par l'intermédiaire du verbe d'état : sa fonction est donc Attribut du sujet !",
    "piege": "Ce n'est pas une épithète car il est séparé du nom par le verbe d'état « semble »."
  },
  {
    "id": 12,
    "serie": "Série 2 : Français Facile",
    "numero": 12,
    "phraseBrute": "La violoniste dont nous écoutons le disque joue avec une immense virtuosité.",
    "texteAffiche": "La violoniste <mark class='target-token'>dont</mark> nous écoutons le disque joue avec une immense virtuosité.",
    "elementCible": "dont",
    "typeCible": "mot",
    "decoupagePropositions": "[La violoniste [dont nous écoutons le disque] joue avec une immense virtuosité.]",
    "typeProposition": "Phrase complexe : Principale + Subordonnée relative enchâssée",
    "natureExacte": "Pronom relatif",
    "fonctionExacte": "Complément du nom « disque »",
    "choixNature": [
      "Pronom relatif",
      "Conjonction de subordination",
      "Adverbe de lieu",
      "Pronom démonstratif"
    ],
    "choixFonction": [
      "Complément du nom « disque »",
      "Sujet du verbe « joue »",
      "COD du verbe « écoutons »",
      "Complément d'Objet Indirect"
    ],
    "explication": "« Dont » est un pronom relatif invariable qui remplace son antécédent « la violoniste ». Dans la proposition subordonnée, on écoute « le disque de la violoniste » : « dont » est Complément du nom « disque » !",
    "piege": "« Dont » n'est jamais sujet ni COD. Il remplace un groupe introduit par « de » (CDN, COI ou complément de l'adjectif)."
  },
  {
    "id": 13,
    "serie": "Série 2 : Français Facile",
    "numero": 13,
    "phraseBrute": "Le professeur leur distribue les copies corrigées.",
    "texteAffiche": "Le professeur <mark class='target-token'>leur</mark> distribue les copies corrigées.",
    "elementCible": "leur",
    "typeCible": "mot",
    "decoupagePropositions": "[Le professeur (leur) distribue les copies corrigées.]",
    "typeProposition": "Proposition indépendante (1 verbe : « distribue »)",
    "natureExacte": "Pronom personnel",
    "fonctionExacte": "Complément d'Objet Indirect (COI) / Second (COS)",
    "choixNature": [
      "Pronom personnel",
      "Déterminant possessif",
      "Pronom possessif",
      "Adverbe"
    ],
    "choixFonction": [
      "Complément d'Objet Indirect (COI) / Second (COS)",
      "Sujet du verbe distribue",
      "Complément d'Objet Direct",
      "Complément du nom « copies »"
    ],
    "explication": "Placé directement devant le verbe conjugué « distribue », « leur » est un pronom personnel (il distribue à qui ? → à eux/elles). C'est pourquoi il est STRICTEMENT INVARIABLE (pas de -s) !",
    "piege": "Confusion classique de Français Facile : « leur » devant un verbe est un pronom invariable ; « leurs » devant un nom pluriel est un déterminant (« leurs copies »)."
  },
  {
    "id": 14,
    "serie": "Série 2 : Français Facile",
    "numero": 14,
    "phraseBrute": "En automne, les feuilles mortes jonchent les sentiers forestiers.",
    "texteAffiche": "<mark class='target-token'>En automne</mark>, les feuilles mortes jonchent les sentiers forestiers.",
    "elementCible": "En automne",
    "typeCible": "groupe",
    "decoupagePropositions": "[(En automne), les feuilles mortes jonchent les sentiers forestiers.]",
    "typeProposition": "Proposition indépendante",
    "natureExacte": "Groupe prépositionnel",
    "natureDetaillee": "Préposition « En » + nom commun « automne »",
    "fonctionExacte": "Complément Circonstanciel (CC) de temps",
    "choixNature": [
      "Groupe prépositionnel",
      "Groupe nominal sujet",
      "Adverbe composé",
      "Proposition subordonnée"
    ],
    "choixFonction": [
      "Complément Circonstanciel (CC) de temps",
      "Complément d'Objet Direct",
      "Sujet du verbe jonchent",
      "Attribut du sujet"
    ],
    "explication": "« En automne » est introduit par la préposition « en ». Il répond à la question : « Quand les feuilles jonchent-elles les sentiers ? » → « En automne ». C'est un CC de temps déplaçable et supprimable.",
    "piege": "Placé en début de phrase, ce n'est pas le sujet. Le sujet est « les feuilles mortes »."
  },
  {
    "id": 15,
    "serie": "Série 2 : Français Facile",
    "numero": 15,
    "phraseBrute": "Les archéologues ont découvert des statuettes d'une finesse remarquable.",
    "texteAffiche": "Les archéologues ont découvert des statuettes <mark class='target-token'>d'une finesse remarquable</mark>.",
    "elementCible": "d'une finesse remarquable",
    "typeCible": "groupe",
    "decoupagePropositions": "[Les archéologues ont découvert des statuettes (d'une finesse remarquable).]",
    "typeProposition": "Proposition indépendante",
    "natureExacte": "Groupe prépositionnel",
    "natureDetaillee": "Préposition « d' » + GN « une finesse remarquable »",
    "fonctionExacte": "Complément du nom « statuettes » (CDN)",
    "choixNature": [
      "Groupe prépositionnel",
      "Complément Circonstanciel de manière",
      "Attribut du COD",
      "Proposition subordonnée"
    ],
    "choixFonction": [
      "Complément du nom « statuettes » (CDN)",
      "Complément Circonstanciel de manière de « ont découvert »",
      "Complément d'Objet Indirect",
      "Attribut du sujet"
    ],
    "explication": "Ce groupe est introduit par la préposition « d' » et complète le nom « statuettes » (« des statuettes de quelle nature/qualité ? »). Il ne qualifie pas l'action de découvrir, mais le nom lui-même : c'est un CDN.",
    "piege": "Ne pas confondre CC de manière du verbe et Complément de caractérisation du nom !"
  }
];
  global.GrammaireDataParts.quizQuestions = [
  {
    "id": "q1",
    "categorie": "Fondement : Nature vs Fonction",
    "question": "Quelle est la définition exacte de la NATURE d'un mot ?",
    "options": [
      "C'est la carte d'identité fixe du mot, telle qu'inscrite dans le dictionnaire.",
      "C'est le rôle qu'il joue par rapport au verbe dans une phrase précise.",
      "C'est la place qu'il occupe au début ou à la fin de la phrase.",
      "C'est le fait qu'il soit invariable ou conjugué."
    ],
    "reponseCorrecte": 0,
    "explication": "La NATURE est l'identité grammaticale intrinsèque du mot (nom, verbe, adjectif...). Elle ne change jamais selon le contexte."
  },
  {
    "id": "q2",
    "categorie": "Fondement : Nature vs Fonction",
    "question": "Dans la phrase « Mon jardin fleurit au printemps », quelle est la FONCTION du groupe « mon jardin » ?",
    "options": [
      "Sujet du verbe fleurit",
      "Groupe nominal",
      "Complément d'Objet Direct",
      "Complément Circonstanciel de lieu"
    ],
    "reponseCorrecte": 0,
    "explication": "« Groupe nominal » est sa NATURE. Sa FONCTION ici est d'être le Sujet (« Qui est-ce qui fleurit ? → Mon jardin »)."
  },
  {
    "id": "q3",
    "categorie": "Fondement : Nature vs Fonction",
    "question": "Dans la phrase « Je me promène dans mon jardin », quelle est la NATURE de « dans mon jardin » ?",
    "options": [
      "Groupe prépositionnel",
      "Complément Circonstanciel de lieu",
      "Complément d'Objet Indirect",
      "Adverbe de lieu"
    ],
    "reponseCorrecte": 0,
    "explication": "Attention au piège : « CC de lieu » est sa FONCTION ! Sa NATURE est d'être un Groupe Prépositionnel (introduit par la préposition « dans »)."
  },
  {
    "id": "q4",
    "categorie": "Classes de mots variables & invariables",
    "question": "Parmi ces quatre catégories, laquelle fait partie des mots STRICTEMENT INVARIABLES ?",
    "options": [
      "L'adverbe",
      "L'adjectif qualificatif",
      "Le pronom",
      "Le déterminant"
    ],
    "reponseCorrecte": 0,
    "explication": "Les cinq variables sont Nom, Déterminant, Adjectif, Pronom, Verbe. L'adverbe ne s'accorde jamais en genre ni en nombre."
  },
  {
    "id": "q5",
    "categorie": "Classes de mots variables & invariables",
    "question": "Dans « Je les ai plantés », quelle est la nature précise du mot « les » ?",
    "options": [
      "Pronom personnel",
      "Article défini",
      "Pronom démonstratif",
      "Adjectif qualificatif"
    ],
    "reponseCorrecte": 0,
    "explication": "« Les » remplace ici un nom (« les narcisses ») et est complément du verbe : c'est un pronom personnel. S'il précédait un nom (« les fleurs »), ce serait un article défini."
  },
  {
    "id": "q6",
    "categorie": "Classes de mots variables & invariables",
    "question": "Quel moyen mnémotechnique permet de retenir les prépositions les plus courantes ?",
    "options": [
      "« Adam part pour Anvers avec deux cents sous » (à, dans, par, pour, en, vers, avec, de, sans, sous)",
      "« Mais où est donc Ornicar ? »",
      "« Si j'aurais su j'aurais pas venu »",
      "« Mourir pour des idées »"
    ],
    "reponseCorrecte": 0,
    "explication": "« Mais où est donc Ornicar » retient les 7 conjonctions de coordination. « Adam part pour Anvers avec deux cents sous » liste les prépositions (à, dans, par, pour, en, vers, avec, de, sans, sous)."
  },
  {
    "id": "q7",
    "categorie": "Fonctions autour du verbe",
    "question": "Quelle question pose-t-on pour identifier à coup sûr un COD (Complément d'Objet Direct) ?",
    "options": [
      "Sujet + Verbe + qui ? ou quoi ? (sans préposition)",
      "Sujet + Verbe + à qui ? ou de quoi ?",
      "Qui est-ce qui + verbe ?",
      "Où, quand, comment ?"
    ],
    "reponseCorrecte": 0,
    "explication": "Le COD est direct : aucune préposition ne le sépare du verbe (« J'aperçois le fleuve » → J'aperçois quoi ? Le fleuve)."
  },
  {
    "id": "q8",
    "categorie": "Fonctions autour du verbe",
    "question": "Dans « Les narcisses sont épanouis », quelle est la fonction du mot « épanouis » ?",
    "options": [
      "Attribut du sujet « les narcisses »",
      "Épithète liée du nom « narcisses »",
      "Complément d'Objet Direct du verbe être",
      "Complément Circonstanciel de manière"
    ],
    "reponseCorrecte": 0,
    "explication": "Le verbe « être » est un verbe d'état. Il ne peut jamais recevoir de COD ! Le mot relié au sujet par un verbe d'état est l'Attribut du sujet."
  },
  {
    "id": "q9",
    "categorie": "Fonctions autour du verbe",
    "question": "Lequel de ces verbes est un verbe d'état introduisant un Attribut du sujet ?",
    "options": [
      "Demeurer",
      "Cueillir",
      "Apercevoir",
      "Planter"
    ],
    "reponseCorrecte": 0,
    "explication": "Les principaux verbes d'état sont : être, paraître, sembler, devenir, rester, demeurer, avoir l'air, passer pour."
  },
  {
    "id": "q10",
    "categorie": "Fonctions autour du nom",
    "question": "Dans « Entre les branches fleuries du cerisier », quelle est la fonction de « fleuries » ?",
    "options": [
      "Épithète liée du nom « branches »",
      "Attribut du sujet",
      "Complément du nom",
      "Complément Circonstanciel"
    ],
    "reponseCorrecte": 0,
    "explication": "« Fleuries » est directement accolé au nom « branches » sans verbe ni virgule intermédiaire : c'est une épithète liée."
  },
  {
    "id": "q11",
    "categorie": "Fonctions autour du nom",
    "question": "Dans la même expression, quelle est la fonction de « du cerisier » ?",
    "options": [
      "Complément du nom « branches » (CDN)",
      "Complément Circonstanciel de lieu",
      "Complément d'Objet Indirect",
      "Épithète détachée"
    ],
    "reponseCorrecte": 0,
    "explication": "« Du cerisier » est relié au nom « branches » par la préposition contractée « du » (de + le). Il complète le nom « branches » : c'est son CDN."
  },
  {
    "id": "q12",
    "categorie": "Découpage et propositions",
    "question": "Quelle est la règle absolue pour compter le nombre de propositions dans une phrase ?",
    "options": [
      "1 verbe conjugué = 1 proposition",
      "1 virgule = 1 proposition",
      "1 sujet = 1 proposition",
      "1 verbe à l'infinitif = 1 proposition"
    ],
    "reponseCorrecte": 0,
    "explication": "Règle absolue du cours : on compte le nombre de verbes conjugués. Chaque verbe conjugué forme le noyau d'une proposition distincte."
  },
  {
    "id": "q13",
    "categorie": "Découpage et propositions",
    "question": "Combien de propositions compte la phrase : « Je pense à un être vague qui aimera ces fleurs » ?",
    "options": [
      "2 propositions (pense / aimera)",
      "1 proposition",
      "3 propositions",
      "Aucune car elle est elliptique"
    ],
    "reponseCorrecte": 0,
    "explication": "Il y a 2 verbes conjugués (« pense » et « aimera »). Donc 2 propositions : la principale « Je pense à un être vague » et la subordonnée relative « qui aimera ces fleurs »."
  },
  {
    "id": "q14",
    "categorie": "Découpage et propositions",
    "question": "Dans la proposition « qui aimera ces fleurs », quelle est la fonction du pronom relatif « qui » ?",
    "options": [
      "Sujet du verbe aimera",
      "COD du verbe aimera",
      "COI du verbe aimera",
      "Attribut du sujet"
    ],
    "reponseCorrecte": 0,
    "explication": "Le pronom relatif « qui » remplace l'antécédent « être » et répond à : « Qui est-ce qui aimera ces fleurs ? » → « qui ». Il est donc Sujet du verbe aimera."
  },
  {
    "id": "q15",
    "categorie": "Pièges fréquents (Français Facile)",
    "question": "Dans « J'en veux encore », quelle est la nature et la fonction du mot « en » ?",
    "options": [
      "Pronom personnel, fonction COD ou COI",
      "Préposition de lieu",
      "Adverbe de quantité",
      "Conjonction de coordination"
    ],
    "reponseCorrecte": 0,
    "explication": "Dans cette phrase, « en » remplace un nom (« je veux de cela ») : c'est un pronom personnel (COD de « veux »). Devant un nom (« en France »), il est préposition."
  },
  {
    "id": "q16",
    "categorie": "Pièges fréquents (Français Facile)",
    "question": "Dans « La robe que j'ai achetée est rouge », quelle est la nature et la fonction de « rouge » ?",
    "options": [
      "Adjectif qualificatif, Attribut du sujet « La robe »",
      "Nom commun, COD du verbe être",
      "Adjectif qualificatif, Épithète liée",
      "Adverbe de manière"
    ],
    "reponseCorrecte": 0,
    "explication": "« Rouge » est un adjectif qualificatif relié au sujet « La robe » par le verbe d'état « être » : sa fonction est Attribut du sujet."
  },
  {
    "id": "q17",
    "categorie": "Pièges fréquents (Français Facile)",
    "question": "Dans « Les enfants courent vite », quelle est la nature du mot « vite » ?",
    "options": [
      "Adverbe (mot invariable)",
      "Adjectif qualificatif",
      "Nom commun",
      "Verbe au subjonctif"
    ],
    "reponseCorrecte": 0,
    "explication": "« Vite » modifie le sens du verbe « courent ». C'est un adverbe invariable (on dit « des enfants rapides », mais « ils courent vite » sans -s)."
  }
];
  global.GrammaireDataParts.demonstrationsCas = [
  {
    "id": "cas1",
    "titre": "Cas d'école n°1 : Phrase à 1 proposition avec plusieurs groupes",
    "phrase": "Entre les branches fleuries du cerisier, j’aperçois le fleuve.",
    "etape1": {
      "verbesConjugues": [
        {
          "verbe": "aperçois",
          "infinitif": "apercevoir",
          "personne": "1re pers. singulier (présent)"
        }
      ],
      "nombrePropositions": 1,
      "decoupage": "[Entre les branches fleuries du cerisier, j’aperçois le fleuve.]",
      "natureProposition": "Proposition indépendante unique (1 verbe conjugué = 1 proposition autonome)"
    },
    "etape2": {
      "blocs": [
        {
          "bloc": "j’",
          "question": "Qui est-ce qui aperçoit ?",
          "fonction": "Sujet du verbe aperçois",
          "type": "essentiel"
        },
        {
          "bloc": "aperçois",
          "question": "Quel est le verbe ?",
          "fonction": "Noyau verbal (Centre de la proposition)",
          "type": "pivot"
        },
        {
          "bloc": "le fleuve",
          "question": "J'aperçois quoi ?",
          "fonction": "COD du verbe aperçois (Complément essentiel)",
          "type": "essentiel"
        },
        {
          "bloc": "Entre les branches fleuries du cerisier",
          "question": "J'aperçois où ?",
          "fonction": "Complément Circonstanciel (CC) de lieu (déplaçable/supprimable)",
          "type": "circonstanciel"
        }
      ]
    },
    "etape3": {
      "mots": [
        {
          "mot": "Entre",
          "bloc": "Entre les branches fleuries du cerisier",
          "nature": "Préposition",
          "fonctionInterne": "Introduit le groupe prépositionnel CC de lieu"
        },
        {
          "mot": "les",
          "bloc": "Entre les branches fleuries du cerisier",
          "nature": "Déterminant (Article défini)",
          "fonctionInterne": "Détermine le nom « branches »"
        },
        {
          "mot": "branches",
          "bloc": "Entre les branches fleuries du cerisier",
          "nature": "Nom commun (féminin pluriel)",
          "fonctionInterne": "Noyau du groupe nominal prépositionnel"
        },
        {
          "mot": "fleuries",
          "bloc": "Entre les branches fleuries du cerisier",
          "nature": "Adjectif qualificatif",
          "fonctionInterne": "Épithète liée du nom « branches »"
        },
        {
          "mot": "du",
          "bloc": "Entre les branches fleuries du cerisier",
          "nature": "Déterminant (Article contracté = de + le)",
          "fonctionInterne": "Introduit le complément du nom « cerisier »"
        },
        {
          "mot": "cerisier",
          "bloc": "Entre les branches fleuries du cerisier",
          "nature": "Nom commun (masculin singulier)",
          "fonctionInterne": "Complément du nom (CDN) de « branches »"
        },
        {
          "mot": "j’",
          "bloc": "j’",
          "nature": "Pronom personnel",
          "fonctionInterne": "Sujet du verbe aperçois"
        },
        {
          "mot": "aperçois",
          "bloc": "aperçois",
          "nature": "Verbe conjugué (apercevoir)",
          "fonctionInterne": "Noyau verbal de la proposition"
        },
        {
          "mot": "le",
          "bloc": "le fleuve",
          "nature": "Déterminant (Article défini)",
          "fonctionInterne": "Détermine le nom « fleuve »"
        },
        {
          "mot": "fleuve",
          "bloc": "le fleuve",
          "nature": "Nom commun (masculin singulier)",
          "fonctionInterne": "Noyau du groupe nominal COD"
        }
      ]
    }
  },
  {
    "id": "cas2",
    "titre": "Cas d'école n°2 : Phrase complexe à 2 propositions (Relative)",
    "phrase": "Je pense à un être vague qui aimera ces fleurs.",
    "etape1": {
      "verbesConjugues": [
        {
          "verbe": "pense",
          "infinitif": "penser",
          "personne": "1re pers. singulier"
        },
        {
          "verbe": "aimera",
          "infinitif": "aimer",
          "personne": "3e pers. singulier (futur simple)"
        }
      ],
      "nombrePropositions": 2,
      "motSubordonnant": "qui (pronom relatif, antécédent : « être »)",
      "decoupage": "[Je pense à un être vague] (Prop. 1 - Principale) [qui aimera ces fleurs] (Prop. 2 - Subordonnée relative)",
      "natureProposition": "Phrase complexe composée d'une proposition principale et d'une subordonnée relative complément de l'antécédent « être »."
    },
    "etape2": {
      "propositions": [
        {
          "nom": "Proposition 1 : [Je pense à un être vague] (Principale)",
          "blocs": [
            {
              "bloc": "Je",
              "question": "Qui est-ce qui pense ?",
              "fonction": "Sujet du verbe pense"
            },
            {
              "bloc": "pense",
              "question": "Quel est le verbe ?",
              "fonction": "Noyau verbal (Centre de la proposition)"
            },
            {
              "bloc": "à un être vague",
              "question": "Je pense à qui ?",
              "fonction": "COI du verbe pense (Complément essentiel indirect)"
            }
          ]
        },
        {
          "nom": "Proposition 2 : [qui aimera ces fleurs] (Subordonnée relative)",
          "blocs": [
            {
              "bloc": "qui",
              "question": "Qui est-ce qui aimera ces fleurs ?",
              "fonction": "Sujet du verbe aimera (remplace « être »)"
            },
            {
              "bloc": "aimera",
              "question": "Quel est le verbe ?",
              "fonction": "Noyau verbal de la subordonnée"
            },
            {
              "bloc": "ces fleurs",
              "question": "Il aimera quoi ?",
              "fonction": "COD du verbe aimera"
            }
          ]
        }
      ]
    },
    "etape3": {
      "mots": [
        {
          "mot": "Je",
          "bloc": "Je",
          "nature": "Pronom personnel",
          "fonctionInterne": "Sujet du verbe « pense »"
        },
        {
          "mot": "pense",
          "bloc": "pense",
          "nature": "Verbe conjugué (penser)",
          "fonctionInterne": "Centre de la proposition principale"
        },
        {
          "mot": "à",
          "bloc": "à un être vague",
          "nature": "Préposition",
          "fonctionInterne": "Introduit le COI"
        },
        {
          "mot": "un",
          "bloc": "à un être vague",
          "nature": "Déterminant (Article indéfini)",
          "fonctionInterne": "Détermine le nom « être »"
        },
        {
          "mot": "être",
          "bloc": "à un être vague",
          "nature": "Nom commun",
          "fonctionInterne": "Noyau du groupe COI"
        },
        {
          "mot": "vague",
          "bloc": "à un être vague",
          "nature": "Adjectif qualificatif",
          "fonctionInterne": "Épithète liée du nom « être »"
        },
        {
          "mot": "qui",
          "bloc": "qui",
          "nature": "Pronom relatif",
          "fonctionInterne": "Remplace l'antécédent « être » et sujet du verbe « aimera »"
        },
        {
          "mot": "aimera",
          "bloc": "aimera",
          "nature": "Verbe conjugué (aimer)",
          "fonctionInterne": "Centre de la proposition subordonnée"
        },
        {
          "mot": "ces",
          "bloc": "ces fleurs",
          "nature": "Déterminant démonstratif",
          "fonctionInterne": "Détermine le nom « fleurs »"
        },
        {
          "mot": "fleurs",
          "bloc": "ces fleurs",
          "nature": "Nom commun",
          "fonctionInterne": "Noyau du groupe nominal COD"
        }
      ]
    }
  }
];
})(typeof window !== "undefined" ? window : globalThis);
