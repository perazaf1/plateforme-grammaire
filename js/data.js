/**
 * Grammaire & Méthode — Données pédagogiques complètes
 * Sources : Fiche méthode Nature et Fonction (Nature_fct.pdf),
 * Exercices & cours officiels de Français Facile (francaisfacile.com),
 * et Fiches de révision Connaissance des Arts (ICP Prépa Journalisme).
 */

const APP_DATA = {
  // 1. MÉMENTO ET SYNTHÈSE DE COURS
  memento: {
    fondement: {
      titre: "La différence fondamentale : Nature vs Fonction",
      sousTitre: "La règle d'or pour ne plus jamais confondre",
      comparaison: [
        {
          critere: "Repère",
          nature: "LA NATURE (Classe grammaticale)",
          fonction: "LA FONCTION (Rôle dans la phrase)"
        },
        {
          critere: "Image mentale",
          nature: "C'est la carte d'identité du mot.",
          fonction: "C'est le métier (ou le déguisement) du mot dans la phrase."
        },
        {
          critere: "Est-ce que ça change ?",
          nature: "NON. Un mot garde toujours la même nature dans le dictionnaire, même hors contexte.",
          fonction: "OUI. La fonction change selon la place et le rôle du mot dans la phrase."
        },
        {
          critere: "Question à se poser",
          nature: "« Qu'est-ce que c'est comme mot ? »",
          fonction: "« À quoi sert ce mot ou ce groupe de mots ici ? »"
        }
      ],
      exempleCle: {
        syntagme: "mon jardin",
        natureFixe: "Groupe Nominal (Déterminant possessif « mon » + Nom commun « jardin »)",
        variations: [
          { phrase: "Mon jardin fleurit au printemps.", fonction: "Sujet du verbe fleurit", question: "Qui est-ce qui fleurit ? → Mon jardin" },
          { phrase: "J'orne mon jardin.", fonction: "COD du verbe orne", question: "J'orne quoi ? → mon jardin" },
          { phrase: "Je me promène dans mon jardin.", fonction: "Complément Circonstanciel (CC) de lieu", question: "Je me promène où ? → dans mon jardin (avec préposition dans)" }
        ]
      }
    },

    classesGrammaticales: {
      variables: [
        {
          nom: "Nom (Substantif)",
          definition: "Désigne une personne, un animal, une chose ou une idée abstraite.",
          sousTypes: "Nom commun (cerisier, fleur, fleuve) ou Nom propre (Paris, Marie, Athènes).",
          astuce: "Il a un genre (masculin/féminin) et varie en nombre (singulier/pluriel)."
        },
        {
          nom: "Déterminant",
          definition: "Précède le nom et lui donne genre et nombre.",
          sousTypes: "Article défini (le, la, les, l'), indéfini (un, une, des), contracté (au, aux, du, des), possessif (mon, ton, son...), démonstratif (ce, cette, ces...), indéfini (chaque, aucun...), interrogatif/exclamatif (quel, quelle...).",
          astuce: "Attention à « du » et « des » : articles indéfinis OU contractés (de + le = du ; de + les = des) !"
        },
        {
          nom: "Adjectif qualificatif",
          definition: "Apporte une précision sur le nom qu'il qualifie. S'accorde en genre et en nombre avec ce nom.",
          sousTypes: "Épithète liée, épithète détachée ou attribut.",
          astuce: "On peut souvent le supprimer sans rendre la phrase agrammaticale (s'il est épithète)."
        },
        {
          nom: "Pronom",
          definition: "Remplace un nom ou un groupe nominal pour éviter les répétitions.",
          sousTypes: "Personnel (je, tu, il, les, leur...), démonstratif (celui-ci, cela, ce...), possessif (le mien, le leur...), relatif (qui, que, quoi, dont, où...), indéfini (chacun, tout, rien...).",
          astuce: "Ne pas confondre le pronom « les » (« Je les ai vus ») et l'article « les » (« Les fleurs ») !"
        },
        {
          nom: "Verbe",
          definition: "Noyau de la phrase. Exprime une action ou un état. Se conjugue en mode, temps, personne.",
          sousTypes: "Verbe d'action (chanter, orner, cueillir) vs Verbe d'état (être, paraître, sembler, devenir, rester, avoir l'air).",
          astuce: "Formes nominales du verbe : infinitif (chanter) et participe (chantant / chanté)."
        }
      ],
      invariables: [
        {
          nom: "Adverbe",
          definition: "Modifie le sens d'un verbe, d'un adjectif ou d'un autre adverbe.",
          exemples: "toujours, bien, lentement, très, hier, là-bas, ne... pas, cependant...",
          astuce: "Contrairement à l'adjectif, l'adverbe ne s'accorde JAMAIS. (ex: toujours, mal, bien)."
        },
        {
          nom: "Préposition",
          definition: "Mot invariable qui introduit un complément (COI, CC, Complément du nom).",
          exemples: "à, de, par, pour, sans, dans, sous, entre, en, vers, chez, avec...",
          astuce: "Mnémo classique : « Adam part pour Anvers avec deux cents sous » (à, dans, par, pour, en, vers, avec, de, sans, sous)."
        },
        {
          nom: "Conjonction de coordination",
          definition: "Relie deux mots ou propositions de même nature et même fonction.",
          exemples: "mais, ou, et, donc, or, ni, car",
          astuce: "Mnémo célèbre : « Mais où est donc Ornicar ? »"
        },
        {
          nom: "Conjonction de subordination",
          definition: "Introduit une proposition subordonnée conjonctive et la relie à la principale.",
          exemples: "que, quand, comme, si, parce que, puisque, bien que, lorsque...",
          astuce: "À ne pas confondre avec le pronom relatif (le pronom relatif a un antécédent, la conjonction relie)."
        }
      ]
    },

    fonctions: {
      autourVerbe: [
        {
          nom: "Sujet",
          question: "« Qui est-ce qui + [Verbe] ? »",
          role: "Indique qui fait l'action ou qui est dans l'état décrit. Commande l'accord du verbe.",
          exemple: "« Le printemps a été tardif » → Qui est-ce qui a été tardif ? Le printemps."
        },
        {
          nom: "Noyau verbal",
          question: "—",
          role: "Centre syntaxique de la proposition autour duquel s'organisent tous les compléments.",
          exemple: "« Je pense à un être vague » → pense est le noyau verbal."
        },
        {
          nom: "COD (Complément d'Objet Direct)",
          question: "« Sujet + Verbe + qui / quoi ? » (sans préposition)",
          role: "Complément essentiel du verbe d'action, non supprimable, non déplaçable.",
          exemple: "« J'aperçois le fleuve » → J'aperçois quoi ? Le fleuve (COD)."
        },
        {
          nom: "COI (Complément d'Objet Indirect)",
          question: "« Sujet + Verbe + à qui / à quoi / de qui / de quoi ? » (avec préposition)",
          role: "Complément essentiel relié au verbe par une préposition (à, de...).",
          exemple: "« Je pense à un être vague » → Je pense à qui ? À un être vague (COI)."
        },
        {
          nom: "Attribut du sujet",
          question: "Sujet + Verbe d'état + quoi/comment ?",
          role: "Exprime une caractéristique du sujet par l'intermédiaire d'un verbe d'état (être, paraître, sembler, devenir, rester, avoir l'air).",
          exemple: "« Les narcisses sont épanouis » → épanouis est attribut du sujet « les narcisses »."
        }
      ],
      autourNom: [
        {
          nom: "Épithète liée",
          role: "Adjectif qualificatif directement collé (avant ou après) au nom qu'il qualifie, sans virgule.",
          exemple: "« Les branches fleuries » → fleuries est épithète liée du nom branches."
        },
        {
          nom: "Épithète détachée / Apposition",
          role: "Adjectif ou groupe séparé du nom par une virgule.",
          exemple: "« Épanouis, les narcisses brillent sous le soleil. »"
        },
        {
          nom: "Complément du Nom (CDN)",
          role: "Groupe prépositionnel (souvent introduit par « de », « à », « en ») qui complète un nom.",
          exemple: "« Les branches du cerisier » → du cerisier est complément du nom branches."
        }
      ],
      circonstanciels: [
        {
          nom: "CC de Lieu",
          question: "Où ?",
          role: "Précise l'endroit. Déplaçable et généralement supprimable.",
          exemple: "« Cependant, les narcisses sont épanouis dans l'herbe » → dans l'herbe (CC de lieu)."
        },
        {
          nom: "CC de Temps",
          question: "Quand ? Combien de temps ?",
          role: "Précise le moment ou la durée.",
          exemple: "« Je les ai plantés à l'automne » → à l'automne (CC de temps)."
        },
        {
          nom: "CC de Manière",
          question: "Comment ? De quelle façon ?",
          role: "Précise la manière dont l'action s'accomplit.",
          exemple: "« Les péniches passent en paisibles caravanes » → en paisibles caravanes (CC de manière)."
        },
        {
          nom: "CC de Cause / But",
          question: "Pourquoi ? Dans quel but ? Pour quelle raison ?",
          role: "Précise la cause ou l'objectif de l'action.",
          exemple: "« Il étudie pour réussir son concours » → pour réussir (CC de but)."
        }
      ]
    },

    methode4Etapes: [
      {
        etape: 1,
        titre: "Souligner les verbes conjugués et découper en propositions",
        regle: "1 verbe conjugué = 1 proposition.",
        action: "Compter les verbes conjugués. Entourer chaque proposition de crochets [ ... ]. Déterminer son type : Indépendante (vit seule), Principale (commande une subordonnée), ou Subordonnée (introduite par un mot subordonnant)."
      },
      {
        etape: 2,
        titre: "Découper l'intérieur de chaque proposition en blocs fonctionnels",
        regle: "Poser les questions dans un ordre strict autour du verbe pivot.",
        action: "1. Verbe conjugué (pivot). 2. Sujet (« Qui est-ce qui + verbe ? »). 3. Compléments essentiels (COD/COI si verbe d'action, Attribut si verbe d'état). 4. Compléments Circonstanciels (« Où ? Quand ? Comment ? Pourquoi ? »)."
      },
      {
        etape: 3,
        titre: "Analyser mot par mot à l'intérieur de chaque bloc",
        regle: "Descendre au niveau de la cellule grammaticale.",
        action: "Donner la nature précise de chaque mot (article, nom, adjectif, préposition...). Indiquer les fonctions internes au sein du Groupe Nominal (adjectif épithète du nom noyau, complément du nom CDN)."
      },
      {
        etape: 4,
        titre: "Remplir la grille officielle d'examen",
        regle: "4 colonnes claires pour chaque bloc.",
        action: "Colonne 1 : Groupes de la proposition | Colonne 2 : Fonction du groupe | Colonne 3 : Nature mot par mot | Colonne 4 : Fonction précise de chaque mot."
      }
    ]
  },

  // 2. PHRASES D'APPLICATION (Série 1 : Les 10 phrases de la fiche + Série 2 : Français Facile)
  dixPhrases: [
    {
      id: 1,
      serie: "Série 1 : Fiche Officielle",
      numero: 1,
      phraseBrute: "Le printemps a été tardif cette année.",
      texteAffiche: "Le <mark class='target-token'>printemps</mark> a été tardif cette année.",
      elementCible: "printemps",
      typeCible: "mot",
      decoupagePropositions: "[Le (printemps) a été tardif cette année.]",
      typeProposition: "Proposition indépendante (1 seul verbe conjugué : « a été »)",
      natureExacte: "Nom commun",
      fonctionExacte: "Noyau du groupe nominal sujet du verbe « a été »",
      choixNature: ["Nom commun", "Adjectif qualificatif", "Verbe conjugué", "Adverbe"],
      choixFonction: [
        "Noyau du groupe nominal sujet du verbe « a été »",
        "Complément d'Objet Direct (COD)",
        "Attribut du sujet",
        "Complément Circonstanciel de temps"
      ],
      explication: "« Printemps » est un nom commun masculin singulier précédé du déterminant « Le ». En posant la question : « Qui est-ce qui a été tardif ? », on obtient « Le printemps » : c'est le Groupe Nominal Sujet. « Printemps » en est le mot-noyau.",
      piege: "Ne pas confondre avec le CC de temps de la fin de phrase (« cette année »)."
    },
    {
      id: 2,
      serie: "Série 1 : Fiche Officielle",
      numero: 2,
      phraseBrute: "Sous le ciel gris, les fleurs ont bien du mal à percer.",
      texteAffiche: "Sous le ciel gris, les <mark class='target-token'>fleurs</mark> ont bien du mal à percer.",
      elementCible: "fleurs",
      typeCible: "mot",
      decoupagePropositions: "[Sous le ciel gris, les (fleurs) ont bien du mal à percer.]",
      typeProposition: "Proposition indépendante (1 verbe conjugué : « ont »)",
      natureExacte: "Nom commun",
      fonctionExacte: "Sujet du verbe « ont »",
      choixNature: ["Nom commun", "Pronom personnel", "Adjectif qualificatif", "Participe présent"],
      choixFonction: [
        "Sujet du verbe « ont »",
        "Complément d'Objet Direct de « ont »",
        "Complément Circonstanciel de lieu",
        "Complément du nom « ciel »"
      ],
      explication: "« Fleurs » est un nom commun (féminin pluriel). Pour trouver le sujet : « Qui est-ce qui a bien du mal à percer ? » → « les fleurs ». « Fleurs » est donc le sujet (ou noyau du GN sujet) du verbe « ont ».",
      piege: "Attention à l'inversion stylistique : le CC de lieu (« Sous le ciel gris ») est placé en tête de phrase, mais le sujet reste « les fleurs »."
    },
    {
      id: 3,
      serie: "Série 1 : Fiche Officielle",
      numero: 3,
      phraseBrute: "Cependant, les narcisses sont épanouis dans l’herbe.",
      texteAffiche: "Cependant, les narcisses sont épanouis <mark class='target-token'>dans l’herbe</mark>.",
      elementCible: "dans l’herbe",
      typeCible: "groupe",
      decoupagePropositions: "[Cependant, les narcisses sont épanouis (dans l’herbe).]",
      typeProposition: "Proposition indépendante (1 verbe conjugué : « sont »)",
      natureExacte: "Groupe prépositionnel",
      natureDetaillee: "Préposition « dans » + article élidé « l' » + nom commun « herbe »",
      fonctionExacte: "Complément Circonstanciel (CC) de lieu",
      choixNature: ["Groupe prépositionnel", "Groupe nominal simple", "Proposition subordonnée", "Adverbe composé"],
      choixFonction: [
        "Complément Circonstanciel (CC) de lieu",
        "Complément d'Objet Indirect (COI)",
        "Attribut du sujet",
        "Complément du nom « narcisses »"
      ],
      explication: "Le groupe « dans l'herbe » est introduit par la préposition « dans ». Il répond à la question : « Les narcisses sont épanouis où ? » → « dans l'herbe ». Il est déplaçable et supprimable : c'est un CC de lieu.",
      piege: "Ne pas confondre avec un COI : un verbe d'état n'a pas de COI, et ce groupe est supprimable sans rendre la phrase incorrecte (« Cependant, les narcisses sont épanouis. »)."
    },
    {
      id: 4,
      serie: "Série 1 : Fiche Officielle",
      numero: 4,
      phraseBrute: "Je les ai plantés à l’automne.",
      texteAffiche: "Je <mark class='target-token'>les</mark> ai plantés à l’automne.",
      elementCible: "les",
      typeCible: "mot",
      decoupagePropositions: "[Je (les) ai plantés à l’automne.]",
      typeProposition: "Proposition indépendante (1 verbe conjugué : « ai plantés »)",
      natureExacte: "Pronom personnel",
      fonctionExacte: "Complément d'Objet Direct (COD) du verbe « ai plantés »",
      choixNature: ["Pronom personnel", "Article défini (déterminant)", "Pronom démonstratif", "Pronom relatif"],
      choixFonction: [
        "Complément d'Objet Direct (COD) du verbe « ai plantés »",
        "Sujet du verbe « ai plantés »",
        "Complément d'Objet Indirect (COI)",
        "Complément Circonstanciel de temps"
      ],
      explication: "« Les » remplace ici « les narcisses » ou « les bulbes » et précède le verbe conjugué : c'est un pronom personnel (et NON un article !). Question : « J'ai planté qui/quoi ? » → « les » (placé avant le verbe). C'est le COD !",
      piege: "Règle d'orthographe cruciale : comme le COD « les » (masculin pluriel) est placé AVANT le verbe conjugué avec l'auxiliaire avoir, le participe passé s'accorde : « plantés » prend un -s !"
    },
    {
      id: 5,
      serie: "Série 1 : Fiche Officielle",
      numero: 5,
      phraseBrute: "Quand j’orne mon jardin, ce n’est pas pour moi.",
      texteAffiche: "Quand j’orne <mark class='target-token'>mon jardin</mark>, ce n’est pas pour moi.",
      elementCible: "mon jardin",
      typeCible: "groupe",
      decoupagePropositions: "[Quand j’orne (mon jardin),]Sub. conj. [ce n’est pas pour moi.]Principale",
      typeProposition: "Phrase complexe à 2 propositions (Subordonnée conjonctive + Principale)",
      natureExacte: "Groupe nominal",
      natureDetaillee: "Déterminant possessif « mon » + nom commun « jardin »",
      fonctionExacte: "Complément d'Objet Direct (COD) du verbe « orne »",
      choixNature: ["Groupe nominal", "Groupe prépositionnel", "Proposition subordonnée", "Pronom possessif"],
      choixFonction: [
        "Complément d'Objet Direct (COD) du verbe « orne »",
        "Sujet du verbe « orne »",
        "Complément Circonstanciel de lieu",
        "Attribut du sujet « ce »"
      ],
      explication: "Dans la proposition subordonnée « Quand j'orne mon jardin », le sujet est « j' », le verbe est « orne ». On pose la question : « J'orne quoi ? » → « mon jardin ». C'est un COD non prépositionnel.",
      piege: "« Mon jardin » peut être sujet (« Mon jardin fleurit ») ou CC de lieu (« dans mon jardin »), mais ici sa fonction est bel et bien COD !"
    },
    {
      id: 6,
      serie: "Série 1 : Fiche Officielle",
      numero: 6,
      phraseBrute: "Je pense à un être vague qui aimera ces fleurs.",
      texteAffiche: "Je <mark class='target-token'>pense</mark> à un être vague qui aimera ces fleurs.",
      elementCible: "pense",
      typeCible: "mot",
      decoupagePropositions: "[Je (pense) à un être vague]Principale [qui aimera ces fleurs.]Sub. relative",
      typeProposition: "Phrase complexe : Proposition principale + Proposition subordonnée relative",
      natureExacte: "Verbe conjugué",
      natureDetaillee: "Verbe penser, présent de l'indicatif, 1re personne du singulier",
      fonctionExacte: "Noyau verbal de la proposition principale",
      choixNature: ["Verbe conjugué", "Nom commun", "Participe présent", "Adjectif"],
      choixFonction: [
        "Noyau verbal de la proposition principale",
        "Sujet de la proposition principale",
        "Complément d'Objet Indirect",
        "Attribut du sujet « Je »"
      ],
      explication: "« Pense » est la forme conjuguée du verbe du 1er groupe « penser ». C'est le pivot (noyau verbal) autour duquel s'articule la proposition principale « Je pense à un être vague ».",
      piege: "Ne pas confondre le verbe « pense » avec le nom homophone « pensée »."
    },
    {
      id: 7,
      serie: "Série 1 : Fiche Officielle",
      numero: 7,
      phraseBrute: "Entre les branches fleuries du cerisier, j’aperçois le fleuve.",
      texteAffiche: "Entre les branches fleuries <mark class='target-token'>du cerisier</mark>, j’aperçois le fleuve.",
      elementCible: "du cerisier",
      typeCible: "groupe",
      decoupagePropositions: "[Entre les branches fleuries (du cerisier), j’aperçois le fleuve.]",
      typeProposition: "Proposition unique indépendante (1 verbe : « aperçois »)",
      natureExacte: "Groupe prépositionnel",
      natureDetaillee: "Article contracté « du » (de + le) + nom commun « cerisier »",
      fonctionExacte: "Complément du nom « branches » (CDN)",
      choixNature: ["Groupe prépositionnel", "Groupe nominal sujet", "Complément Circonstanciel", "Adverbe"],
      choixFonction: [
        "Complément du nom « branches » (CDN)",
        "Complément Circonstanciel de lieu de « aperçois »",
        "Complément d'Objet Indirect de « aperçois »",
        "Épithète liée du nom « branches »"
      ],
      explication: "Tout le bloc « Entre les branches fleuries du cerisier » est CC de lieu. Mais À L'INTÉRIEUR de ce bloc, « du cerisier » s'accroche directement au nom « branches » (« les branches de quoi ? »). Sa fonction interne est donc Complément du Nom (CDN) de « branches » !",
      piege: "Piège classique d'examen : confondre la fonction du grand bloc (CC de lieu) avec la fonction interne d'un mot ou sous-groupe (Complément du nom)."
    },
    {
      id: 8,
      serie: "Série 1 : Fiche Officielle",
      numero: 8,
      phraseBrute: "Les péniches passent en paisibles caravanes.",
      texteAffiche: "Les péniches passent <mark class='target-token'>en paisibles caravanes</mark>.",
      elementCible: "en paisibles caravanes",
      typeCible: "groupe",
      decoupagePropositions: "[Les péniches passent (en paisibles caravanes).]",
      typeProposition: "Proposition unique indépendante (1 verbe : « passent »)",
      natureExacte: "Groupe prépositionnel",
      natureDetaillee: "Préposition « en » + adjectif qualificatif « paisibles » + nom commun « caravanes »",
      fonctionExacte: "Complément Circonstanciel (CC) de manière du verbe « passent »",
      choixNature: ["Groupe prépositionnel", "Groupe nominal COD", "Attribut du sujet « Les péniches »", "Proposition subordonnée"],
      choixFonction: [
        "Complément Circonstanciel (CC) de manière du verbe « passent »",
        "Attribut du sujet « Les péniches »",
        "Complément d'Objet Direct",
        "Complément d'Objet Indirect"
      ],
      explication: "Le groupe est introduit par la préposition « en ». On pose la question : « Les péniches passent comment ? / de quelle manière ? » → « en paisibles caravanes ». C'est un Complément Circonstanciel de manière.",
      piege: "« Passer » est ici un verbe intransitif employé au sens de circuler. Ce n'est pas un verbe d'état, donc ce n'est pas un attribut !"
    },
    {
      id: 9,
      serie: "Série 1 : Fiche Officielle",
      numero: 9,
      phraseBrute: "Les chants des oiseaux m’émerveillent toujours autant.",
      texteAffiche: "Les chants des oiseaux m’émerveillent <mark class='target-token'>toujours</mark> autant.",
      elementCible: "toujours",
      typeCible: "mot",
      decoupagePropositions: "[Les chants des oiseaux m’émerveillent (toujours) autant.]",
      typeProposition: "Proposition unique indépendante (1 verbe : « émerveillent »)",
      natureExacte: "Adverbe",
      natureDetaillee: "Adverbe de temps (mot invariable)",
      fonctionExacte: "Modifie le sens du verbe « émerveillent » (CC de temps)",
      choixNature: ["Adverbe", "Adjectif qualificatif", "Conjonction de coordination", "Préposition"],
      choixFonction: [
        "Modifie le sens du verbe « émerveillent » (CC de temps)",
        "Complément d'Objet Direct",
        "Attribut du sujet",
        "Sujet du verbe"
      ],
      explication: "« Toujours » est un mot strictement invariable qui ne prend jamais de marque de genre ou de nombre : c'est un adverbe. Il s'applique au verbe « émerveillent » pour en préciser la fréquence et la durée dans le temps.",
      piege: "Ne pas le confondre avec un adjectif. Un adverbe ne s'accorde jamais !"
    },
    {
      id: 10,
      serie: "Série 1 : Fiche Officielle",
      numero: 10,
      phraseBrute: "Et voici mon jardin sous un soleil de printemps.",
      texteAffiche: "Et voici mon jardin sous <mark class='target-token'>un</mark> soleil de printemps.",
      elementCible: "un",
      typeCible: "mot",
      decoupagePropositions: "[Et voici mon jardin sous (un) soleil de printemps.]",
      typeProposition: "Proposition unique indépendante",
      natureExacte: "Déterminant (Article indéfini)",
      natureDetaillee: "Article indéfini, masculin singulier",
      fonctionExacte: "Détermine le nom commun « soleil »",
      choixNature: ["Déterminant (Article indéfini)", "Pronom indéfini", "Nom commun", "Adjectif numéral"],
      choixFonction: [
        "Détermine le nom commun « soleil »",
        "Sujet de « voici »",
        "Épithète liée du nom « soleil »",
        "Complément d'Objet Direct"
      ],
      explication: "« Un » est placé devant le nom « soleil » pour former le groupe nominal « un soleil ». C'est un article indéfini. Sa fonction grammaticale au niveau du mot est d'actualiser / déterminer le nom « soleil ».",
      piege: "La fonction d'un déterminant est toujours de « déterminer / actualiser » le nom auquel il est rattaché."
    },
    // SÉRIE 2 : EXEMPLES FRANÇAIS FACILE
    {
      id: 11,
      serie: "Série 2 : Français Facile",
      numero: 11,
      phraseBrute: "Cette vieille bâtisse semble abandonnée depuis plusieurs années.",
      texteAffiche: "Cette vieille bâtisse semble <mark class='target-token'>abandonnée</mark> depuis plusieurs années.",
      elementCible: "abandonnée",
      typeCible: "mot",
      decoupagePropositions: "[Cette vieille bâtisse semble (abandonnée) depuis plusieurs années.]",
      typeProposition: "Proposition indépendante (1 verbe : « semble »)",
      natureExacte: "Adjectif qualificatif (participe passé adjectivé)",
      fonctionExacte: "Attribut du sujet « Cette vieille bâtisse »",
      choixNature: ["Adjectif qualificatif (participe passé adjectivé)", "Verbe conjugué au passif", "Nom commun", "Adverbe"],
      choixFonction: [
        "Attribut du sujet « Cette vieille bâtisse »",
        "Épithète liée du nom « bâtisse »",
        "Complément d'Objet Direct",
        "Complément Circonstanciel de manière"
      ],
      explication: "Le verbe « sembler » est un verbe d'état. Le mot « abandonnée » exprime une qualité attribuée au sujet par l'intermédiaire du verbe d'état : sa fonction est donc Attribut du sujet !",
      piege: "Ce n'est pas une épithète car il est séparé du nom par le verbe d'état « semble »."
    },
    {
      id: 12,
      serie: "Série 2 : Français Facile",
      numero: 12,
      phraseBrute: "La violoniste dont nous écoutons le disque joue avec une immense virtuosité.",
      texteAffiche: "La violoniste <mark class='target-token'>dont</mark> nous écoutons le disque joue avec une immense virtuosité.",
      elementCible: "dont",
      typeCible: "mot",
      decoupagePropositions: "[La violoniste [dont nous écoutons le disque] joue avec une immense virtuosité.]",
      typeProposition: "Phrase complexe : Principale + Subordonnée relative enchâssée",
      natureExacte: "Pronom relatif",
      fonctionExacte: "Complément du nom « disque »",
      choixNature: ["Pronom relatif", "Conjonction de subordination", "Adverbe de lieu", "Pronom démonstratif"],
      choixFonction: [
        "Complément du nom « disque »",
        "Sujet du verbe « joue »",
        "COD du verbe « écoutons »",
        "Complément d'Objet Indirect"
      ],
      explication: "« Dont » est un pronom relatif invariable qui remplace son antécédent « la violoniste ». Dans la proposition subordonnée, on écoute « le disque de la violoniste » : « dont » est Complément du nom « disque » !",
      piege: "« Dont » n'est jamais sujet ni COD. Il remplace un groupe introduit par « de » (CDN, COI ou complément de l'adjectif)."
    },
    {
      id: 13,
      serie: "Série 2 : Français Facile",
      numero: 13,
      phraseBrute: "Le professeur leur distribue les copies corrigées.",
      texteAffiche: "Le professeur <mark class='target-token'>leur</mark> distribue les copies corrigées.",
      elementCible: "leur",
      typeCible: "mot",
      decoupagePropositions: "[Le professeur (leur) distribue les copies corrigées.]",
      typeProposition: "Proposition indépendante (1 verbe : « distribue »)",
      natureExacte: "Pronom personnel",
      fonctionExacte: "Complément d'Objet Indirect (COI) / Second (COS)",
      choixNature: ["Pronom personnel", "Déterminant possessif", "Pronom possessif", "Adverbe"],
      choixFonction: [
        "Complément d'Objet Indirect (COI) / Second (COS)",
        "Sujet du verbe distribue",
        "Complément d'Objet Direct",
        "Complément du nom « copies »"
      ],
      explication: "Placé directement devant le verbe conjugué « distribue », « leur » est un pronom personnel (il distribue à qui ? → à eux/elles). C'est pourquoi il est STRICTEMENT INVARIABLE (pas de -s) !",
      piege: "Confusion classique de Français Facile : « leur » devant un verbe est un pronom invariable ; « leurs » devant un nom pluriel est un déterminant (« leurs copies »)."
    },
    {
      id: 14,
      serie: "Série 2 : Français Facile",
      numero: 14,
      phraseBrute: "En automne, les feuilles mortes jonchent les sentiers forestiers.",
      texteAffiche: "<mark class='target-token'>En automne</mark>, les feuilles mortes jonchent les sentiers forestiers.",
      elementCible: "En automne",
      typeCible: "groupe",
      decoupagePropositions: "[(En automne), les feuilles mortes jonchent les sentiers forestiers.]",
      typeProposition: "Proposition indépendante",
      natureExacte: "Groupe prépositionnel",
      natureDetaillee: "Préposition « En » + nom commun « automne »",
      fonctionExacte: "Complément Circonstanciel (CC) de temps",
      choixNature: ["Groupe prépositionnel", "Groupe nominal sujet", "Adverbe composé", "Proposition subordonnée"],
      choixFonction: [
        "Complément Circonstanciel (CC) de temps",
        "Complément d'Objet Direct",
        "Sujet du verbe jonchent",
        "Attribut du sujet"
      ],
      explication: "« En automne » est introduit par la préposition « en ». Il répond à la question : « Quand les feuilles jonchent-elles les sentiers ? » → « En automne ». C'est un CC de temps déplaçable et supprimable.",
      piege: "Placé en début de phrase, ce n'est pas le sujet. Le sujet est « les feuilles mortes »."
    },
    {
      id: 15,
      serie: "Série 2 : Français Facile",
      numero: 15,
      phraseBrute: "Les archéologues ont découvert des statuettes d'une finesse remarquable.",
      texteAffiche: "Les archéologues ont découvert des statuettes <mark class='target-token'>d'une finesse remarquable</mark>.",
      elementCible: "d'une finesse remarquable",
      typeCible: "groupe",
      decoupagePropositions: "[Les archéologues ont découvert des statuettes (d'une finesse remarquable).]",
      typeProposition: "Proposition indépendante",
      natureExacte: "Groupe prépositionnel",
      natureDetaillee: "Préposition « d' » + GN « une finesse remarquable »",
      fonctionExacte: "Complément du nom « statuettes » (CDN)",
      choixNature: ["Groupe prépositionnel", "Complément Circonstanciel de manière", "Attribut du COD", "Proposition subordonnée"],
      choixFonction: [
        "Complément du nom « statuettes » (CDN)",
        "Complément Circonstanciel de manière de « ont découvert »",
        "Complément d'Objet Indirect",
        "Attribut du sujet"
      ],
      explication: "Ce groupe est introduit par la préposition « d' » et complète le nom « statuettes » (« des statuettes de quelle nature/qualité ? »). Il ne qualifie pas l'action de découvrir, mais le nom lui-même : c'est un CDN.",
      piege: "Ne pas confondre CC de manière du verbe et Complément de caractérisation du nom !"
    }
  ],

  // 3. DICTÉES INTERACTIVES AVEC LECTURE AUDIO ET ANALYSE SYNTAXIQUE
  dictees: [
    {
      id: "dictee-1",
      titre: "Dictée 1 : Le Réveil du Jardin (Niveau Fondamental)",
      difficulte: "Intermédiaire",
      theme: "Accords des participes passés et homophones",
      audioDebits: [1.0, 0.8],
      texteComplet: "Sous le ciel gris du matin, les fleurs que j'ai aperçues ont bien du mal à s'épanouir. Je les ai plantées avec patience le long de l'allée sinueuse. Leurs tiges fragiles ploient sous la pluie, mais leur éclat demeure intact.",
      phrases: [
        {
          texte: "Sous le ciel gris du matin, les fleurs que j'ai aperçues ont bien du mal à s'épanouir.",
          notes: "« aperçues » : accord au féminin pluriel avec le pronom relatif « que », COD placé avant l'auxiliaire avoir (antécédent : les fleurs). « s'épanouir » : verbe pronominal à l'infinitif après la préposition « à »."
        },
        {
          texte: "Je les ai plantées avec patience le long de l'allée sinueuse.",
          notes: "« les ai plantées » : « les » est pronom personnel COD antéposé remplaçant les fleurs (fém. pl.) → accord avec un « -es ». « sinueuse » : adjectif fém. singulier."
        },
        {
          texte: "Leurs tiges fragiles ploient sous la pluie, mais leur éclat demeure intact.",
          notes: "« Leurs tiges » : déterminant possessif devant un nom pluriel → prend un -s. « leur éclat » : déterminant devant un nom singulier → pas de -s. « demeure » : verbe d'état, « intact » est son attribut au masculin singulier."
        }
      ],
      vocabulaireCles: [
        { mot: "aperçues", regle: "Accord participe passé avec COD antéposé (que = les fleurs, fém. pl.)" },
        { mot: "plantées", regle: "Accord participe passé avec pronom COD antéposé « les »" },
        { mot: "Leurs tiges", regle: "Déterminant possessif pluriel s'accordant avec « tiges »" },
        { mot: "leur éclat", regle: "Déterminant possessif singulier s'accordant avec « éclat »" },
        { mot: "demeure intact", regle: "« demeurer » est verbe d'état → attribut du sujet au masculin singulier" }
      ]
    },
    {
      id: "dictee-2",
      titre: "Dictée 2 : Les Photographes et les Trésors du Musée (Français Facile)",
      difficulte: "Concours / Examen",
      theme: "Sujet inversé, accord des adjectifs de couleur et pronoms",
      audioDebits: [1.0, 0.8],
      texteComplet: "Attentivement, les visiteurs se pressent dans les salles spacieuses du vieux musée. Les toiles restaurées qu'ont admirées les critiques suscitent une vive émotion. Chacun d'eux tente de saisir ces jeux de lumière sans en altérer la préservation.",
      phrases: [
        {
          texte: "Attentivement, les visiteurs se pressent dans les salles spacieuses du vieux musée.",
          notes: "« Attentivement » : adverbe invariable en -ment. « se pressent » : pronom réfléchi « se » (ne pas écrire « ce »). « spacieuses » : adjectif accordé avec « salles » (fém. pl.)."
        },
        {
          texte: "Les toiles restaurées qu'ont admirées les critiques suscitent une vive émotion.",
          notes: "« qu'ont admirées » : piège du sujet inversé ! Le sujet de « ont admirées » est « les critiques ». Mais le COD est le pronom relatif « qu' » dont l'antécédent est « Les toiles restaurées » (fém. pl.) → accord « admirées » !"
        },
        {
          texte: "Chacun d'eux tente de saisir ces jeux de lumière sans en altérer la préservation.",
          notes: "« Chacun » : singulier → « tente ». « ces jeux » : déterminant démonstratif (on montre les jeux de lumière, ne pas confondre avec le possessif « ses »). « sans en altérer » : infinitif après la préposition « sans »."
        }
      ],
      vocabulaireCles: [
        { mot: "se pressent", regle: "Homophone ce/se : pronom réfléchi devant le verbe presser" },
        { mot: "admirées", regle: "Accord du participe passé avec COD « qu' » antéposé (les toiles)" },
        { mot: "ces jeux", regle: "Déterminant démonstratif (pluriel de « ce jeu »)" },
        { mot: "sans en altérer", regle: "Règle de l'infinitif après préposition (sans faire, sans altérer)" }
      ]
    },
    {
      id: "dictee-3",
      titre: "Dictée 3 : Le Fleuve et les Péniches à l'Aurore",
      difficulte: "Avancé",
      theme: "Compléments circonstanciels, pronom dont et accords complexes",
      audioDebits: [1.0, 0.8],
      texteComplet: "Entre les branches fleuries du cerisier, aperçois-tu les péniches qui avancent en paisibles caravanes ? Tous les mariniers saluent la berge verdoyante dont les reflets miroitent sur l'eau limpide. Les chants des oiseaux sauvages nous ont émerveillés pendant de longues heures.",
      phrases: [
        {
          texte: "Entre les branches fleuries du cerisier, aperçois-tu les péniches qui avancent en paisibles caravanes ?",
          notes: "« aperçois-tu » : trait d'union obligatoire lors de l'inversion du pronom sujet. « caravanes » : nom féminin pluriel, « paisibles » prend un -s."
        },
        {
          texte: "Tous les mariniers saluent la berge verdoyante dont les reflets miroitent sur l'eau limpide.",
          notes: "« Tous les mariniers » : déterminant indéfini masculin pluriel « Tous ». « dont » : pronom relatif invariable (les reflets de la berge). « miroitent » : verbe s'accordant avec le sujet « les reflets »."
        },
        {
          texte: "Les chants des oiseaux sauvages nous ont émerveillés pendant de longues heures.",
          notes: "« nous ont émerveillés » : « nous » est pronom personnel COD placé avant le verbe avoir (ils ont émerveillé qui ? → nous, masculin pluriel) → accord en -és ! Ne pas faire accorder le verbe avec « oiseaux » mais avec « Les chants » (3e pers. pluriel)."
        }
      ],
      vocabulaireCles: [
        { mot: "aperçois-tu", regle: "Tiret d'inversion du sujet interrogatif" },
        { mot: "Tous les", regle: "Tout s'accorde au masculin pluriel devant l'article" },
        { mot: "ont émerveillés", regle: "Accord participe passé avec COD antéposé « nous »" }
      ]
    }
  ],

  // 4. LE PROTOCOLE EN 4 ÉTAPES (Démonstrations interactives pas-à-pas)
  demonstrationsCas: [
    {
      id: "cas1",
      titre: "Cas d'école n°1 : Phrase à 1 proposition avec plusieurs groupes",
      phrase: "Entre les branches fleuries du cerisier, j’aperçois le fleuve.",
      etape1: {
        verbesConjugues: [{ verbe: "aperçois", infinitif: "apercevoir", personne: "1re pers. singulier (présent)" }],
        nombrePropositions: 1,
        decoupage: "[Entre les branches fleuries du cerisier, j’aperçois le fleuve.]",
        natureProposition: "Proposition indépendante unique (1 verbe conjugué = 1 proposition autonome)"
      },
      etape2: {
        blocs: [
          {
            bloc: "j’",
            question: "Qui est-ce qui aperçoit ?",
            fonction: "Sujet du verbe aperçois",
            type: "essentiel"
          },
          {
            bloc: "aperçois",
            question: "Quel est le verbe ?",
            fonction: "Noyau verbal (Centre de la proposition)",
            type: "pivot"
          },
          {
            bloc: "le fleuve",
            question: "J'aperçois quoi ?",
            fonction: "COD du verbe aperçois (Complément essentiel)",
            type: "essentiel"
          },
          {
            bloc: "Entre les branches fleuries du cerisier",
            question: "J'aperçois où ?",
            fonction: "Complément Circonstanciel (CC) de lieu (déplaçable/supprimable)",
            type: "circonstanciel"
          }
        ]
      },
      etape3: {
        mots: [
          { mot: "Entre", bloc: "Entre les branches fleuries du cerisier", nature: "Préposition", fonctionInterne: "Introduit le groupe prépositionnel CC de lieu" },
          { mot: "les", bloc: "Entre les branches fleuries du cerisier", nature: "Déterminant (Article défini)", fonctionInterne: "Détermine le nom « branches »" },
          { mot: "branches", bloc: "Entre les branches fleuries du cerisier", nature: "Nom commun (féminin pluriel)", fonctionInterne: "Noyau du groupe nominal prépositionnel" },
          { mot: "fleuries", bloc: "Entre les branches fleuries du cerisier", nature: "Adjectif qualificatif", fonctionInterne: "Épithète liée du nom « branches »" },
          { mot: "du", bloc: "Entre les branches fleuries du cerisier", nature: "Déterminant (Article contracté = de + le)", fonctionInterne: "Introduit le complément du nom « cerisier »" },
          { mot: "cerisier", bloc: "Entre les branches fleuries du cerisier", nature: "Nom commun (masculin singulier)", fonctionInterne: "Complément du nom (CDN) de « branches »" },
          { mot: "j’", bloc: "j’", nature: "Pronom personnel", fonctionInterne: "Sujet du verbe aperçois" },
          { mot: "aperçois", bloc: "aperçois", nature: "Verbe conjugué (apercevoir)", fonctionInterne: "Noyau verbal de la proposition" },
          { mot: "le", bloc: "le fleuve", nature: "Déterminant (Article défini)", fonctionInterne: "Détermine le nom « fleuve »" },
          { mot: "fleuve", bloc: "le fleuve", nature: "Nom commun (masculin singulier)", fonctionInterne: "Noyau du groupe nominal COD" }
        ]
      }
    },
    {
      id: "cas2",
      titre: "Cas d'école n°2 : Phrase complexe à 2 propositions (Relative)",
      phrase: "Je pense à un être vague qui aimera ces fleurs.",
      etape1: {
        verbesConjugues: [
          { verbe: "pense", infinitif: "penser", personne: "1re pers. singulier" },
          { verbe: "aimera", infinitif: "aimer", personne: "3e pers. singulier (futur simple)" }
        ],
        nombrePropositions: 2,
        motSubordonnant: "qui (pronom relatif, antécédent : « être »)",
        decoupage: "[Je pense à un être vague] (Prop. 1 - Principale) [qui aimera ces fleurs] (Prop. 2 - Subordonnée relative)",
        natureProposition: "Phrase complexe composée d'une proposition principale et d'une subordonnée relative complément de l'antécédent « être »."
      },
      etape2: {
        propositions: [
          {
            nom: "Proposition 1 : [Je pense à un être vague] (Principale)",
            blocs: [
              { bloc: "Je", question: "Qui est-ce qui pense ?", fonction: "Sujet du verbe pense" },
              { bloc: "pense", question: "Quel est le verbe ?", fonction: "Noyau verbal (Centre de la proposition)" },
              { bloc: "à un être vague", question: "Je pense à qui ?", fonction: "COI du verbe pense (Complément essentiel indirect)" }
            ]
          },
          {
            nom: "Proposition 2 : [qui aimera ces fleurs] (Subordonnée relative)",
            blocs: [
              { bloc: "qui", question: "Qui est-ce qui aimera ces fleurs ?", fonction: "Sujet du verbe aimera (remplace « être »)" },
              { bloc: "aimera", question: "Quel est le verbe ?", fonction: "Noyau verbal de la subordonnée" },
              { bloc: "ces fleurs", question: "Il aimera quoi ?", fonction: "COD du verbe aimera" }
            ]
          }
        ]
      },
      etape3: {
        mots: [
          { mot: "Je", bloc: "Je", nature: "Pronom personnel", fonctionInterne: "Sujet du verbe « pense »" },
          { mot: "pense", bloc: "pense", nature: "Verbe conjugué (penser)", fonctionInterne: "Centre de la proposition principale" },
          { mot: "à", bloc: "à un être vague", nature: "Préposition", fonctionInterne: "Introduit le COI" },
          { mot: "un", bloc: "à un être vague", nature: "Déterminant (Article indéfini)", fonctionInterne: "Détermine le nom « être »" },
          { mot: "être", bloc: "à un être vague", nature: "Nom commun", fonctionInterne: "Noyau du groupe COI" },
          { mot: "vague", bloc: "à un être vague", nature: "Adjectif qualificatif", fonctionInterne: "Épithète liée du nom « être »" },
          { mot: "qui", bloc: "qui", nature: "Pronom relatif", fonctionInterne: "Remplace l'antécédent « être » et sujet du verbe « aimera »" },
          { mot: "aimera", bloc: "aimera", nature: "Verbe conjugué (aimer)", fonctionInterne: "Centre de la proposition subordonnée" },
          { mot: "ces", bloc: "ces fleurs", nature: "Déterminant démonstratif", fonctionInterne: "Détermine le nom « fleurs »" },
          { mot: "fleurs", bloc: "ces fleurs", nature: "Nom commun", fonctionInterne: "Noyau du groupe nominal COD" }
        ]
      }
    }
  ],

  // 5. QUIZ INTERACTIFS (Nature, Fonction, Propositions, Pièges Français Facile)
  quizQuestions: [
    {
      id: "q1",
      categorie: "Fondement : Nature vs Fonction",
      question: "Quelle est la définition exacte de la NATURE d'un mot ?",
      options: [
        "C'est la carte d'identité fixe du mot, telle qu'inscrite dans le dictionnaire.",
        "C'est le rôle qu'il joue par rapport au verbe dans une phrase précise.",
        "C'est la place qu'il occupe au début ou à la fin de la phrase.",
        "C'est le fait qu'il soit invariable ou conjugué."
      ],
      reponseCorrecte: 0,
      explication: "La NATURE est l'identité grammaticale intrinsèque du mot (nom, verbe, adjectif...). Elle ne change jamais selon le contexte."
    },
    {
      id: "q2",
      categorie: "Fondement : Nature vs Fonction",
      question: "Dans la phrase « Mon jardin fleurit au printemps », quelle est la FONCTION du groupe « mon jardin » ?",
      options: [
        "Sujet du verbe fleurit",
        "Groupe nominal",
        "Complément d'Objet Direct",
        "Complément Circonstanciel de lieu"
      ],
      reponseCorrecte: 0,
      explication: "« Groupe nominal » est sa NATURE. Sa FONCTION ici est d'être le Sujet (« Qui est-ce qui fleurit ? → Mon jardin »)."
    },
    {
      id: "q3",
      categorie: "Fondement : Nature vs Fonction",
      question: "Dans la phrase « Je me promène dans mon jardin », quelle est la NATURE de « dans mon jardin » ?",
      options: [
        "Groupe prépositionnel",
        "Complément Circonstanciel de lieu",
        "Complément d'Objet Indirect",
        "Adverbe de lieu"
      ],
      reponseCorrecte: 0,
      explication: "Attention au piège : « CC de lieu » est sa FONCTION ! Sa NATURE est d'être un Groupe Prépositionnel (introduit par la préposition « dans »)."
    },
    {
      id: "q4",
      categorie: "Classes de mots variables & invariables",
      question: "Parmi ces quatre catégories, laquelle fait partie des mots STRICTEMENT INVARIABLES ?",
      options: [
        "L'adverbe",
        "L'adjectif qualificatif",
        "Le pronom",
        "Le déterminant"
      ],
      reponseCorrecte: 0,
      explication: "Les cinq variables sont Nom, Déterminant, Adjectif, Pronom, Verbe. L'adverbe ne s'accorde jamais en genre ni en nombre."
    },
    {
      id: "q5",
      categorie: "Classes de mots variables & invariables",
      question: "Dans « Je les ai plantés », quelle est la nature précise du mot « les » ?",
      options: [
        "Pronom personnel",
        "Article défini",
        "Pronom démonstratif",
        "Adjectif qualificatif"
      ],
      reponseCorrecte: 0,
      explication: "« Les » remplace ici un nom (« les narcisses ») et est complément du verbe : c'est un pronom personnel. S'il précédait un nom (« les fleurs »), ce serait un article défini."
    },
    {
      id: "q6",
      categorie: "Classes de mots variables & invariables",
      question: "Quel moyen mnémotechnique permet de retenir les prépositions les plus courantes ?",
      options: [
        "« Adam part pour Anvers avec deux cents sous » (à, dans, par, pour, en, vers, avec, de, sans, sous)",
        "« Mais où est donc Ornicar ? »",
        "« Si j'aurais su j'aurais pas venu »",
        "« Mourir pour des idées »"
      ],
      reponseCorrecte: 0,
      explication: "« Mais où est donc Ornicar » retient les 7 conjonctions de coordination. « Adam part pour Anvers avec deux cents sous » liste les prépositions (à, dans, par, pour, en, vers, avec, de, sans, sous)."
    },
    {
      id: "q7",
      categorie: "Fonctions autour du verbe",
      question: "Quelle question pose-t-on pour identifier à coup sûr un COD (Complément d'Objet Direct) ?",
      options: [
        "Sujet + Verbe + qui ? ou quoi ? (sans préposition)",
        "Sujet + Verbe + à qui ? ou de quoi ?",
        "Qui est-ce qui + verbe ?",
        "Où, quand, comment ?"
      ],
      reponseCorrecte: 0,
      explication: "Le COD est direct : aucune préposition ne le sépare du verbe (« J'aperçois le fleuve » → J'aperçois quoi ? Le fleuve)."
    },
    {
      id: "q8",
      categorie: "Fonctions autour du verbe",
      question: "Dans « Les narcisses sont épanouis », quelle est la fonction du mot « épanouis » ?",
      options: [
        "Attribut du sujet « les narcisses »",
        "Épithète liée du nom « narcisses »",
        "Complément d'Objet Direct du verbe être",
        "Complément Circonstanciel de manière"
      ],
      reponseCorrecte: 0,
      explication: "Le verbe « être » est un verbe d'état. Il ne peut jamais recevoir de COD ! Le mot relié au sujet par un verbe d'état est l'Attribut du sujet."
    },
    {
      id: "q9",
      categorie: "Fonctions autour du verbe",
      question: "Lequel de ces verbes est un verbe d'état introduisant un Attribut du sujet ?",
      options: [
        "Demeurer",
        "Cueillir",
        "Apercevoir",
        "Planter"
      ],
      reponseCorrecte: 0,
      explication: "Les principaux verbes d'état sont : être, paraître, sembler, devenir, rester, demeurer, avoir l'air, passer pour."
    },
    {
      id: "q10",
      categorie: "Fonctions autour du nom",
      question: "Dans « Entre les branches fleuries du cerisier », quelle est la fonction de « fleuries » ?",
      options: [
        "Épithète liée du nom « branches »",
        "Attribut du sujet",
        "Complément du nom",
        "Complément Circonstanciel"
      ],
      reponseCorrecte: 0,
      explication: "« Fleuries » est directement accolé au nom « branches » sans verbe ni virgule intermédiaire : c'est une épithète liée."
    },
    {
      id: "q11",
      categorie: "Fonctions autour du nom",
      question: "Dans la même expression, quelle est la fonction de « du cerisier » ?",
      options: [
        "Complément du nom « branches » (CDN)",
        "Complément Circonstanciel de lieu",
        "Complément d'Objet Indirect",
        "Épithète détachée"
      ],
      reponseCorrecte: 0,
      explication: "« Du cerisier » est relié au nom « branches » par la préposition contractée « du » (de + le). Il complète le nom « branches » : c'est son CDN."
    },
    {
      id: "q12",
      categorie: "Découpage et propositions",
      question: "Quelle est la règle absolue pour compter le nombre de propositions dans une phrase ?",
      options: [
        "1 verbe conjugué = 1 proposition",
        "1 virgule = 1 proposition",
        "1 sujet = 1 proposition",
        "1 verbe à l'infinitif = 1 proposition"
      ],
      reponseCorrecte: 0,
      explication: "Règle absolue du cours : on compte le nombre de verbes conjugués. Chaque verbe conjugué forme le noyau d'une proposition distincte."
    },
    {
      id: "q13",
      categorie: "Découpage et propositions",
      question: "Combien de propositions compte la phrase : « Je pense à un être vague qui aimera ces fleurs » ?",
      options: [
        "2 propositions (pense / aimera)",
        "1 proposition",
        "3 propositions",
        "Aucune car elle est elliptique"
      ],
      reponseCorrecte: 0,
      explication: "Il y a 2 verbes conjugués (« pense » et « aimera »). Donc 2 propositions : la principale « Je pense à un être vague » et la subordonnée relative « qui aimera ces fleurs »."
    },
    {
      id: "q14",
      categorie: "Découpage et propositions",
      question: "Dans la proposition « qui aimera ces fleurs », quelle est la fonction du pronom relatif « qui » ?",
      options: [
        "Sujet du verbe aimera",
        "COD du verbe aimera",
        "COI du verbe aimera",
        "Attribut du sujet"
      ],
      reponseCorrecte: 0,
      explication: "Le pronom relatif « qui » remplace l'antécédent « être » et répond à : « Qui est-ce qui aimera ces fleurs ? » → « qui ». Il est donc Sujet du verbe aimera."
    },
    {
      id: "q15",
      categorie: "Pièges fréquents (Français Facile)",
      question: "Dans « J'en veux encore », quelle est la nature et la fonction du mot « en » ?",
      options: [
        "Pronom personnel, fonction COD ou COI",
        "Préposition de lieu",
        "Adverbe de quantité",
        "Conjonction de coordination"
      ],
      reponseCorrecte: 0,
      explication: "Dans cette phrase, « en » remplace un nom (« je veux de cela ») : c'est un pronom personnel (COD de « veux »). Devant un nom (« en France »), il est préposition."
    },
    {
      id: "q16",
      categorie: "Pièges fréquents (Français Facile)",
      question: "Dans « La robe que j'ai achetée est rouge », quelle est la nature et la fonction de « rouge » ?",
      options: [
        "Adjectif qualificatif, Attribut du sujet « La robe »",
        "Nom commun, COD du verbe être",
        "Adjectif qualificatif, Épithète liée",
        "Adverbe de manière"
      ],
      reponseCorrecte: 0,
      explication: "« Rouge » est un adjectif qualificatif relié au sujet « La robe » par le verbe d'état « être » : sa fonction est Attribut du sujet."
    },
    {
      id: "q17",
      categorie: "Pièges fréquents (Français Facile)",
      question: "Dans « Les enfants courent vite », quelle est la nature du mot « vite » ?",
      options: [
        "Adverbe (mot invariable)",
        "Adjectif qualificatif",
        "Nom commun",
        "Verbe au subjonctif"
      ],
      reponseCorrecte: 0,
      explication: "« Vite » modifie le sens du verbe « courent ». C'est un adverbe invariable (on dit « des enfants rapides », mais « ils courent vite » sans -s)."
    }
  ],

  // 6. DÉFIS ORTHOGRAPHE & ACCORDS GRAMMATICAUX (Enrichi Français Facile)
  orthographeDefis: [
    {
      id: "ortho1",
      titre: "Accord du participe passé avec COD antéposé (Phrase 4 du cours)",
      enonce: "Je les ai ____ à l'automne (en parlant des narcisses, nom masculin pluriel).",
      options: ["plantés", "planté", "plantée", "plantées"],
      reponseCorrecte: 0,
      regle: "Avec l'auxiliaire avoir, le participe passé s'accorde en genre et en nombre avec le COD si celui-ci est placé AVANT le verbe (« les » = les narcisses, masculin pluriel → plantés)."
    },
    {
      id: "ortho2",
      titre: "Accord du participe passé avec COD antéposé (Féminin pluriel)",
      enonce: "Les branches fleuries que j'ai ____ s'étendent au-dessus de l'eau.",
      options: ["aperçues", "aperçu", "aperçue", "aperçus"],
      reponseCorrecte: 0,
      regle: "Le pronom relatif « que » est COD du verbe « ai aperçu(es) ». Son antécédent est « Les branches » (féminin pluriel), placé avant le verbe → accord au féminin pluriel : « aperçues »."
    },
    {
      id: "ortho3",
      titre: "Attribut du sujet avec verbe d'état",
      enonce: "Sous le soleil d'avril, les jeunes pousses du jardin semblent ____ .",
      options: ["épanouies", "épanoui", "épanouis", "épanouie"],
      reponseCorrecte: 0,
      regle: "« Sembler » est un verbe d'état. L'attribut s'accorde en genre et en nombre avec le sujet « les jeunes pousses » (féminin pluriel) → « épanouies »."
    },
    {
      id: "ortho4",
      titre: "Accord du verbe : piège du complément du nom",
      enonce: "Le chant mélodieux des oiseaux du parc m'____ profondément.",
      options: ["émerveille", "émerveillent", "émerveilles", "émerveillant"],
      reponseCorrecte: 0,
      regle: "Piège classique d'attraction ! Le sujet n'est pas « des oiseaux » mais « Le chant » (singulier). Le verbe s'accorde donc à la 3e personne du singulier : « émerveille »."
    },
    {
      id: "ortho5",
      titre: "Homophones grammaticaux : leur vs leurs (Français Facile)",
      enonce: "Les jardiniers coupent les branches sèches et ____ donnent une seconde vie.",
      options: ["leur", "leurs", "leurre", "leurres"],
      reponseCorrecte: 0,
      regle: "Placé devant un verbe (« donnent »), « leur » est un pronom personnel (COI : donne à eux). Il est STRICTEMENT INVARIABLE : jamais de -s devant un verbe !"
    },
    {
      id: "ortho6",
      titre: "Homophones grammaticaux : leur vs leurs (Déterminant)",
      enonce: "Les arbres du verger perdent ____ fleurs au premier coup de vent.",
      options: ["leurs", "leur", "leurre", "leurs'"],
      reponseCorrecte: 0,
      regle: "Ici, « leurs » est un déterminant possessif qui détermine le nom pluriel « fleurs ». Il prend donc la marque du pluriel : « leurs fleurs »."
    },
    {
      id: "ortho7",
      titre: "Homophones grammaticaux : ce vs se",
      enonce: "À la tombée du jour, le cerisier ____ couvre d'une ombre bleutée.",
      options: ["se", "ce", "ceux", "c'"],
      reponseCorrecte: 0,
      regle: "Devant le verbe pronominal « couvre » (« se couvrir »), on emploie le pronom réfléchi « se ». « Ce » est un déterminant ou pronom démonstratif (« ce cerisier »)."
    },
    {
      id: "ortho8",
      titre: "Homophones grammaticaux : ces vs ses",
      enonce: "Regarde ____ péniches au loin sur le fleuve : elles avancent lentement.",
      options: ["ces", "ses", "c'est", "s'est"],
      reponseCorrecte: 0,
      regle: "On montre du doigt les péniches : c'est le déterminant démonstratif « ces » (pluriel de ce/cette). « Ses » est possessif (les siennes)."
    },
    {
      id: "ortho9",
      titre: "Accord du verbe avec sujet pronom relatif « qui »",
      enonce: "C'est moi qui ____ planté ces narcisses le long de la berge.",
      options: ["ai", "a", "est", "es"],
      reponseCorrecte: 0,
      regle: "Le pronom relatif « qui » prend la personne et le nombre de son antécédent. Ici, l'antécédent est « moi » (1re personne du singulier), donc le verbe prend « ai » (« c'est moi qui ai »)."
    },
    {
      id: "ortho10",
      titre: "Tout / tous / toute / toutes",
      enonce: "____ les branches du vieux pommier ont résisté à la tempête.",
      options: ["Toutes", "Tous", "Tout", "Toute"],
      reponseCorrecte: 0,
      regle: "« Branches » est un nom féminin pluriel. Le déterminant indéfini s'accorde au féminin pluriel : « Toutes les branches »."
    },
    {
      id: "ortho11",
      titre: "Terminaison verbale en -é ou -er (Règle de remplacement)",
      enonce: "Pour réussir son examen, l'étudiant doit s'entraîner à ____ chaque proposition.",
      options: ["analyser", "analysé", "analysez", "analysés"],
      reponseCorrecte: 0,
      regle: "Astuce Français Facile : remplacez par un verbe du 3e groupe comme « mordre / vendre ». On dit « s'entraîner à mordre » et non « à mordu » → infinitif en -er !"
    },
    {
      id: "ortho12",
      titre: "Accord du mot « demi »",
      enonce: "La conférence a duré une heure et ____ .",
      options: ["demie", "demi", "demis", "demies"],
      reponseCorrecte: 0,
      regle: "Placé APRÈS le nom, « demi » s'accorde en genre uniquement avec ce nom (jamais de -s au pluriel) : « une heure et demie »."
    }
  ],

  // 7. BONUS : CONNAISSANCE DES ARTS (Cours 1 à 5 ICP Journalisme)
  artsCulture: [
    // --- COURS 1 : Conscience patrimoniale et protection des biens ---
    {
      id: "art1",
      coursNum: 1,
      cours: "Cours 1 : Conscience patrimoniale et protection des biens",
      question: "En quelle année l'abbé Grégoire forge-t-il le terme de « vandalisme » pour dénoncer les destructions du patrimoine révolutionnaire ?",
      options: ["1794", "1789", "1804", "1830"],
      reponseCorrecte: 0,
      explication: "Dans ses rapports à la Convention nationale en 1794, l'abbé Grégoire invente le mot « vandalisme » pour sauvegarder les monuments et chefs-d'œuvre de l'Ancien Régime au nom de la nation."
    },
    {
      id: "art2",
      coursNum: 1,
      cours: "Cours 1 : Conscience patrimoniale et protection des biens",
      question: "Quelle grande convention internationale de l'UNESCO fonde en 1972 la notion de « Valeur Universelle Exceptionnelle » (VUE) ?",
      options: [
        "La Convention de La Haye (1954)",
        "La Convention pour la protection du patrimoine mondial, culturel et naturel (Paris, 1972)",
        "La Convention d'UNIDROIT (1995)",
        "Le Traité de Rome (1957)"
      ],
      reponseCorrecte: 1,
      explication: "Adoptée en 1972 par l'UNESCO, cette convention établit la Liste du patrimoine mondial et exige que les sites possèdent une « valeur universelle exceptionnelle » pour être inscrits."
    },
    {
      id: "art3",
      coursNum: 1,
      cours: "Cours 1 : Conscience patrimoniale et protection des biens",
      question: "Quel symbole officiel, issu de la Convention de La Haye de 1954, protège les biens culturels en cas de conflit armé ?",
      options: ["La Croix rouge", "Le Bouclier bleu", "Le Casque blanc", "L'Étoile d'or"],
      reponseCorrecte: 1,
      explication: "Le Bouclier bleu est le signe distinctif prévu par la Convention de La Haye (1954) pour marquer les monuments protégés lors des guerres."
    },
    {
      id: "art4",
      coursNum: 1,
      cours: "Cours 1 : Conscience patrimoniale et protection des biens",
      question: "Quel jugement historique de la CPI (2016) a condamné pour la première fois la destruction de mausolées (Tombouctou) comme crime de guerre ?",
      options: [
        "L'arrêt Klaus Barbie",
        "L'arrêt Radovan Karadžić",
        "L'arrêt Ahmad Al Faqi Al-Mahdi",
        "L'arrêt Nuremberg II"
      ],
      reponseCorrecte: 2,
      explication: "En 2016, la Cour Pénale Internationale condamne Ahmad Al Faqi Al-Mahdi à 9 ans de prison pour avoir intentionnellement dirigé des attaques contre les mausolées classés UNESCO de Tombouctou."
    },
    {
      id: "art5_c1",
      coursNum: 1,
      cours: "Cours 1 : Conscience patrimoniale et protection des biens",
      question: "Quelle grande opération internationale de l'UNESCO menée en 1964 en Égypte est considérée comme l'acte fondateur de la sauvegarde du patrimoine mondial ?",
      options: [
        "La reconstruction du phare d'Alexandrie",
        "Le sauvetage et le déplacement des temples d'Abou Simbel",
        "La restauration intégrale des pyramides de Gizeh",
        "Le déblaiement du complexe funéraire de Louxor"
      ],
      reponseCorrecte: 1,
      explication: "En 1964, face à la montée des eaux causée par le barrage d'Assouan, l'UNESCO mobilise 50 pays pour découper et déplacer les temples d'Abou Simbel, préfigurant la Convention de 1972."
    },

    // --- COURS 2 : Histoire et enjeux actuels du musée ---
    {
      id: "art5",
      coursNum: 2,
      cours: "Cours 2 : Histoire et enjeux actuels du musée",
      question: "Que désignait étymologiquement le terme grec « Mouseion » dans l'Antiquité ?",
      options: [
        "Une galerie marchande réservée aux sculpteurs",
        "Un sanctuaire ou bois sacré consacré aux Muses, souvent à vocation commémorative ou funéraire",
        "Un bâtiment réservé aux archives de la cité",
        "Une académie militaire athénienne"
      ],
      reponseCorrecte: 1,
      explication: "À l'origine, le Mouseion est un lieu sacré dédié aux 9 Muses. Le plus célèbre, celui d'Alexandrie (IIIe siècle av. J.-C.), comprenait la grande bibliothèque."
    },
    {
      id: "art6",
      coursNum: 2,
      cours: "Cours 2 : Histoire et enjeux actuels du musée",
      question: "En quelle année le Muséum central des arts de la République (futur Musée du Louvre) a-t-il ouvert ses portes au public ?",
      options: ["1789 (14 juillet)", "1793 (10 août)", "1804 (2 décembre)", "1848 (24 février)"],
      reponseCorrecte: 1,
      explication: "Le Louvre ouvre officiellement au public le 10 août 1793, marquant la naissance du musée moderne public et éducatif issu des Lumières et de la Révolution."
    },
    {
      id: "art7",
      coursNum: 2,
      cours: "Cours 2 : Histoire et enjeux actuels du musée",
      question: "Qui a créé à Borgo Vico entre 1537 et 1543 l'un des premiers « Musaeum » de la Renaissance doté de cartels explicatifs ?",
      options: ["Laurent de Médicis", "Giorgio Vasari", "Paolo Giovio", "Pic de la Mirandole"],
      reponseCorrecte: 2,
      explication: "L'humaniste et évêque Paolo Giovio rassemble plus de 400 portraits d'hommes illustres avec des inscriptions (cartels) dans sa villa de Borgo Vico près de Côme."
    },
    {
      id: "art8_c2",
      coursNum: 2,
      cours: "Cours 2 : Histoire et enjeux actuels du musée",
      question: "Quel est le plus ancien trésor ecclésial médiéval conservé en France, célèbre pour sa statue-reliquaire du Xe-XIe siècle en bois d'if recouvert d'or et de gemmes ?",
      options: [
        "Le trésor de Sainte-Foy de Conques",
        "Le trésor royal de Saint-Denis",
        "Le trésor de Notre-Dame de Chartres",
        "Le trésor de l'abbaye de Cluny"
      ],
      reponseCorrecte: 0,
      explication: "Le trésor de Sainte-Foy de Conques conserve la célèbre statue-reliquaire (Xe–XIe s.) protégée par la sacralité des reliques, illustrant la conservation religieuse médiévale précédant les musées modernes."
    },
    {
      id: "art9_c2",
      coursNum: 2,
      cours: "Cours 2 : Histoire et enjeux actuels du musée",
      question: "Quel établissement britannique, inauguré en 1683 à Oxford pour abriter les collections données par Elias Ashmole, est considéré comme le premier musée universitaire public moderne ?",
      options: [
        "Le British Museum",
        "La Dulwich Picture Gallery",
        "L'Ashmolean Museum",
        "Le Fitzwilliam Museum"
      ],
      reponseCorrecte: 2,
      explication: "Inauguré le 21 mai 1683 à l'université d'Oxford, l'Ashmolean Museum est le premier musée public fondé par une institution pour accueillir des collections d'histoire naturelle et d'art."
    },

    // --- COURS 3 : La culture populaire dans les musées ---
    {
      id: "art8",
      coursNum: 3,
      cours: "Cours 3 : La culture populaire dans les musées",
      question: "Quel théoricien britannique des Cultural Studies a défendu l'idée que « culture is ordinary » et analysé la culture ouvrière dans les années 1950 ?",
      options: ["Pierre Bourdieu", "Raymond Williams (et Richard Hoggart)", "Michel Foucault", "Theodor Adorno"],
      reponseCorrecte: 1,
      explication: "L'école de Birmingham (Richard Hoggart, Raymond Williams, Stuart Hall) a réhabilité l'étude de la culture populaire comme digne d'intérêt scientifique et muséal."
    },
    {
      id: "art11_c3",
      coursNum: 3,
      cours: "Cours 3 : La culture populaire dans les musées",
      question: "Qui est considéré par les historiens comme le véritable « père de la bande dessinée moderne » grâce à ses histoires en images créées dès 1827 et publiées dès 1833 ?",
      options: [
        "Richard Felton Outcault",
        "Rodolphe Töpffer",
        "Wilhelm Busch",
        "Honoré Daumier"
      ],
      reponseCorrecte: 1,
      explication: "Le pédagogue et dessinateur suisse Rodolphe Töpffer crée dès 1827 et publie 7 albums dès 1833, fondant la bande dessinée comme un média narratif autonome qu'il qualifiait d'art de « nature mixte »."
    },
    {
      id: "art12_c3",
      coursNum: 3,
      cours: "Cours 3 : La culture populaire dans les musées",
      question: "En 1964, qui a pour la première fois qualifié la bande dessinée de « neuvième art » dans une série d'articles de critique cinématographique et littéraire ?",
      options: [
        "Francis Lacassin",
        "René Goscinny",
        "André Malraux",
        "Claude Beylie (formule popularisée ensuite par Morris)"
      ],
      reponseCorrecte: 3,
      explication: "Claude Beylie emploie l'expression « neuvième art » en 1964 dans la revue Lettres et Médecins, consacrant la bande dessinée à l'égal du cinéma (7e art) et de la télévision (8e art)."
    },
    {
      id: "art13_c3",
      coursNum: 3,
      cours: "Cours 3 : La culture populaire dans les musées",
      question: "Quel roman graphique emblématique d'Art Spiegelman, relatant la Shoah sous forme de fable animale, a fait l'objet d'une exposition au MoMA en 1991-1992 et reçu un Prix Pulitzer spécial en 1992 ?",
      options: [
        "Persepolis",
        "Maus",
        "Watchmen",
        "L'Arabe du futur"
      ],
      reponseCorrecte: 1,
      explication: "Maus d'Art Spiegelman a marqué l'entrée décisive de la bande dessinée dans les grands musées d'art moderne (MoMA 1991-1992) et a obtenu un Prix Pulitzer en 1992."
    },
    {
      id: "art14_c3",
      coursNum: 3,
      cours: "Cours 3 : La culture populaire dans les musées",
      question: "Quelle caractéristique formelle fondamentale est aujourd'hui retenue par les spécialistes pour définir la bande dessinée (au lieu de la simple présence de bulles de texte) ?",
      options: [
        "La séquentialité (succession ordonnée d'au moins deux images reliées narrativement)",
        "L'obligation de phylactères ou bulles de dialogue",
        "Le format de publication sous forme de comic strip de presse",
        "Le dessin satirique ou caricatural obligatoire"
      ],
      reponseCorrecte: 0,
      explication: "La bande dessinée se définit par la séquentialité visuelle (la succession d'images dans le temps et l'espace). Des chefs-d'œuvre sans texte ni bulles restent d'authentiques bandes dessinées."
    },

    // --- COURS 4 : Art et écologie ---
    {
      id: "art9",
      coursNum: 4,
      cours: "Cours 4 : Art et écologie",
      question: "Quel mouvement artistique apparu à la fin des années 1960 aux États-Unis intervient directement dans le paysage naturel (Robert Smithson, Michael Heizer) ?",
      options: ["Le Pop Art", "Le Futurisme", "Le Land Art", "Le Suprématisme"],
      reponseCorrecte: 2,
      explication: "Le Land Art utilise le cadre et les matériaux de la nature (terre, roche, sel) pour créer des œuvres monumentales in situ, à l'image de Spiral Jetty (1970) de Smithson."
    },
    {
      id: "art15_c4",
      coursNum: 4,
      cours: "Cours 4 : Art et écologie",
      question: "En 1982, quelle artiste a semé et récolté un champ de blé de deux hectares sur une décharge face aux tours de Wall Street à New York (Wheatfield – A Confrontation) ?",
      options: [
        "Nancy Holt",
        "Agnes Denes",
        "Judy Chicago",
        "Maya Lin"
      ],
      reponseCorrecte: 1,
      explication: "Dans Wheatfield – A Confrontation (1982), Agnes Denes sème 2 hectares de blé à Manhattan pour récolter 450 kg de céréales et dénoncer la spéculation financière sur la nourriture et la destruction écologique."
    },
    {
      id: "art16_c4",
      coursNum: 4,
      cours: "Cours 4 : Art et écologie",
      question: "En décembre 2015 à Paris lors de la COP21, quelle installation de l'artiste Olafur Eliasson a disposé des blocs de banquise du Groenland sur la place du Panthéon ?",
      options: [
        "Ice Watch",
        "The Weather Project",
        "Green River",
        "Melting Landscape"
      ],
      reponseCorrecte: 0,
      explication: "Pour Ice Watch (2014-2018), Olafur Eliasson et le géologue Minik Rosing ont importé des blocs de glace flottante groenlandaise afin de rendre tangible la fonte de la cryosphère aux yeux des citoyens et décideurs."
    },
    {
      id: "art17_c4",
      coursNum: 4,
      cours: "Cours 4 : Art et écologie",
      question: "Quel ouvrage fondateur de la biologiste Rachel Carson, paru en 1962, a révélé au monde l'empoisonnement écologique par les pesticides (DDT) et impulsé l'écologie contemporaine ?",
      options: [
        "Notre avenir à tous (Rapport Brundtland)",
        "Les Limites à la croissance (Rapport Meadows)",
        "Printemps silencieux (Silent Spring)",
        "La Terre outragée"
      ],
      reponseCorrecte: 2,
      explication: "Printemps silencieux (1962) de Rachel Carson a sonné l'alarme contre l'usage massif des pesticides de synthèse, impulsant la création des premières agences environnementales et la conférence de Stockholm en 1972."
    },
    {
      id: "art18_c4",
      coursNum: 4,
      cours: "Cours 4 : Art et écologie",
      question: "Quel photographe de l'expédition géologique Hayden (1871) a fourni les images décisives qui ont convaincu le Congrès américain de fonder le premier parc national de l'histoire (Yellowstone, 1872) ?",
      options: [
        "Ansel Adams",
        "Timothy O'Sullivan",
        "Carleton Watkins",
        "William Henry Jackson"
      ],
      reponseCorrecte: 3,
      explication: "Les photographies de William Henry Jackson prises en 1871-1872 ont joué un rôle politique majeur pour préserver les geysers et canyons de Yellowstone de la prédation industrielle privée."
    },

    // --- COURS 5 : Art, pouvoir et contestations ---
    {
      id: "art10",
      coursNum: 5,
      cours: "Cours 5 : Art, pouvoir et contestations",
      question: "En quelle année l'exposition de propagande nazie sur « l'art dégénéré » (Entartete Kunst) a-t-elle été organisée à Munich ?",
      options: ["1933", "1937", "1939", "1941"],
      reponseCorrecte: 1,
      explication: "Organisée en 1937 par le régime nazi à Munich, cette exposition visait à diffamer l'art moderne (expressionnisme, cubisme, surréalisme, abstraction) en le qualifiant de pathologique et dégénéré."
    },
    {
      id: "art19_c5",
      coursNum: 5,
      cours: "Cours 5 : Art, pouvoir et contestations",
      question: "Le 10 mars 1914, quelle suffragette britannique a tailladé au hachoir la toile de Diego Vélasquez « La Vénus à son miroir » à la National Gallery de Londres ?",
      options: [
        "Mary Richardson",
        "Emmeline Pankhurst",
        "Emily Davison",
        "Millicent Fawcett"
      ],
      reponseCorrecte: 0,
      explication: "Mary Richardson a lacéré le tableau de Vélasquez pour protester contre l'incarcération et les tortures (gavage forcé) subies par Emmeline Pankhurst, déclarant tenir « davantage à la justice qu'à l'art »."
    },
    {
      id: "art20_c5",
      coursNum: 5,
      cours: "Cours 5 : Art, pouvoir et contestations",
      question: "Durant la guerre froide, quel courant pictural américain a été secrètement soutenu et financé par la CIA via le Congrès pour la liberté de la culture comme arme de soft-power ?",
      options: [
        "Le Pop Art",
        "L'Expressionnisme abstrait (Pollock, de Kooning, Rothko)",
        "Le Précisionnisme",
        "Le Réalisme social"
      ],
      reponseCorrecte: 1,
      explication: "La CIA et des critiques d'art comme Clement Greenberg ont fait de l'Expressionnisme abstrait l'étendard de l'individualisme et de la liberté occidentale face au réalisme socialiste soviétique."
    },
    {
      id: "art21_c5",
      coursNum: 5,
      cours: "Cours 5 : Art, pouvoir et contestations",
      question: "Quel essai pionnier de Linda Nochlin, publié en 1971 dans Artnews, est considéré comme le texte fondateur de l'histoire de l'art féministe ?",
      options: [
        "« The Dinner Party and Feminist Art »",
        "« Ways of Seeing »",
        "« Why Have There Been No Great Women Artists? »",
        "« Old Mistresses: Women, Art and Ideology »"
      ],
      reponseCorrecte: 2,
      explication: "Dans « Why Have There Been No Great Women Artists? » (1971), Linda Nochlin démontre que l'absence des femmes dans l'histoire canonique de l'art résulte d'interdits institutionnels et sociaux et non d'une absence de génie."
    },
    {
      id: "art22_c5",
      coursNum: 5,
      cours: "Cours 5 : Art, pouvoir et contestations",
      question: "Quel musée précurseur entièrement consacré à l'art urbain et au street-art a ouvert ses portes à Berlin en 2017, illustrant le dilemme de faire entrer la rue dans l'institution muséale ?",
      options: [
        "Street Art Passage Vienna",
        "Urban Nation Museum for Urban Contemporary Art",
        "Museum of Urban and Contemporary Art (MUCA)",
        "The Wynwood Walls Museum"
      ],
      reponseCorrecte: 1,
      explication: "Inauguré en 2017 à Berlin, Urban Nation pose le paradoxe de muséifier et pérenniser des formes d'art urbain dont l'essence est originellement illégale, éphémère et contestataire."
    }
  ]
};
