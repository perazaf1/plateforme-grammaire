/**
 * Grammaire & Méthode — Données Mémento & Règles grammaticales
 */
(function (global) {
  "use strict";

  global.GrammaireDataParts = global.GrammaireDataParts || {};
  global.GrammaireDataParts.memento = {
  "fondement": {
    "titre": "La différence fondamentale : Nature vs Fonction",
    "sousTitre": "La règle d'or pour ne plus jamais confondre",
    "comparaison": [
      {
        "critere": "Repère",
        "nature": "LA NATURE (Classe grammaticale)",
        "fonction": "LA FONCTION (Rôle dans la phrase)"
      },
      {
        "critere": "Image mentale",
        "nature": "C'est la carte d'identité du mot.",
        "fonction": "C'est le métier (ou le déguisement) du mot dans la phrase."
      },
      {
        "critere": "Est-ce que ça change ?",
        "nature": "NON. Un mot garde toujours la même nature dans le dictionnaire, même hors contexte.",
        "fonction": "OUI. La fonction change selon la place et le rôle du mot dans la phrase."
      },
      {
        "critere": "Question à se poser",
        "nature": "« Qu'est-ce que c'est comme mot ? »",
        "fonction": "« À quoi sert ce mot ou ce groupe de mots ici ? »"
      }
    ],
    "exempleCle": {
      "syntagme": "mon jardin",
      "natureFixe": "Groupe Nominal (Déterminant possessif « mon » + Nom commun « jardin »)",
      "variations": [
        {
          "phrase": "Mon jardin fleurit au printemps.",
          "fonction": "Sujet du verbe fleurit",
          "question": "Qui est-ce qui fleurit ? → Mon jardin"
        },
        {
          "phrase": "J'orne mon jardin.",
          "fonction": "COD du verbe orne",
          "question": "J'orne quoi ? → mon jardin"
        },
        {
          "phrase": "Je me promène dans mon jardin.",
          "fonction": "Complément Circonstanciel (CC) de lieu",
          "question": "Je me promène où ? → dans mon jardin (avec préposition dans)"
        }
      ]
    }
  },
  "classesGrammaticales": {
    "variables": [
      {
        "nom": "Nom (Substantif)",
        "definition": "Désigne une personne, un animal, une chose ou une idée abstraite.",
        "sousTypes": "Nom commun (cerisier, fleur, fleuve) ou Nom propre (Paris, Marie, Athènes).",
        "astuce": "Il a un genre (masculin/féminin) et varie en nombre (singulier/pluriel)."
      },
      {
        "nom": "Déterminant",
        "definition": "Précède le nom et lui donne genre et nombre.",
        "sousTypes": "Article défini (le, la, les, l'), indéfini (un, une, des), contracté (au, aux, du, des), possessif (mon, ton, son...), démonstratif (ce, cette, ces...), indéfini (chaque, aucun...), interrogatif/exclamatif (quel, quelle...).",
        "astuce": "Attention à « du » et « des » : articles indéfinis OU contractés (de + le = du ; de + les = des) !"
      },
      {
        "nom": "Adjectif qualificatif",
        "definition": "Apporte une précision sur le nom qu'il qualifie. S'accorde en genre et en nombre avec ce nom.",
        "sousTypes": "Épithète liée, épithète détachée ou attribut.",
        "astuce": "On peut souvent le supprimer sans rendre la phrase agrammaticale (s'il est épithète)."
      },
      {
        "nom": "Pronom",
        "definition": "Remplace un nom ou un groupe nominal pour éviter les répétitions.",
        "sousTypes": "Personnel (je, tu, il, les, leur...), démonstratif (celui-ci, cela, ce...), possessif (le mien, le leur...), relatif (qui, que, quoi, dont, où...), indéfini (chacun, tout, rien...).",
        "astuce": "Ne pas confondre le pronom « les » (« Je les ai vus ») et l'article « les » (« Les fleurs ») !"
      },
      {
        "nom": "Verbe",
        "definition": "Noyau de la phrase. Exprime une action ou un état. Se conjugue en mode, temps, personne.",
        "sousTypes": "Verbe d'action (chanter, orner, cueillir) vs Verbe d'état (être, paraître, sembler, devenir, rester, avoir l'air).",
        "astuce": "Formes nominales du verbe : infinitif (chanter) et participe (chantant / chanté)."
      }
    ],
    "invariables": [
      {
        "nom": "Adverbe",
        "definition": "Modifie le sens d'un verbe, d'un adjectif ou d'un autre adverbe.",
        "exemples": "toujours, bien, lentement, très, hier, là-bas, ne... pas, cependant...",
        "astuce": "Contrairement à l'adjectif, l'adverbe ne s'accorde JAMAIS. (ex: toujours, mal, bien)."
      },
      {
        "nom": "Préposition",
        "definition": "Mot invariable qui introduit un complément (COI, CC, Complément du nom).",
        "exemples": "à, de, par, pour, sans, dans, sous, entre, en, vers, chez, avec...",
        "astuce": "Mnémo classique : « Adam part pour Anvers avec deux cents sous » (à, dans, par, pour, en, vers, avec, de, sans, sous)."
      },
      {
        "nom": "Conjonction de coordination",
        "definition": "Relie deux mots ou propositions de même nature et même fonction.",
        "exemples": "mais, ou, et, donc, or, ni, car",
        "astuce": "Mnémo célèbre : « Mais où est donc Ornicar ? »"
      },
      {
        "nom": "Conjonction de subordination",
        "definition": "Introduit une proposition subordonnée conjonctive et la relie à la principale.",
        "exemples": "que, quand, comme, si, parce que, puisque, bien que, lorsque...",
        "astuce": "À ne pas confondre avec le pronom relatif (le pronom relatif a un antécédent, la conjonction relie)."
      }
    ]
  },
  "fonctions": {
    "autourVerbe": [
      {
        "nom": "Sujet",
        "question": "« Qui est-ce qui + [Verbe] ? »",
        "role": "Indique qui fait l'action ou qui est dans l'état décrit. Commande l'accord du verbe.",
        "exemple": "« Le printemps a été tardif » → Qui est-ce qui a été tardif ? Le printemps."
      },
      {
        "nom": "Noyau verbal",
        "question": "—",
        "role": "Centre syntaxique de la proposition autour duquel s'organisent tous les compléments.",
        "exemple": "« Je pense à un être vague » → pense est le noyau verbal."
      },
      {
        "nom": "COD (Complément d'Objet Direct)",
        "question": "« Sujet + Verbe + qui / quoi ? » (sans préposition)",
        "role": "Complément essentiel du verbe d'action, non supprimable, non déplaçable.",
        "exemple": "« J'aperçois le fleuve » → J'aperçois quoi ? Le fleuve (COD)."
      },
      {
        "nom": "COI (Complément d'Objet Indirect)",
        "question": "« Sujet + Verbe + à qui / à quoi / de qui / de quoi ? » (avec préposition)",
        "role": "Complément essentiel relié au verbe par une préposition (à, de...).",
        "exemple": "« Je pense à un être vague » → Je pense à qui ? À un être vague (COI)."
      },
      {
        "nom": "Attribut du sujet",
        "question": "Sujet + Verbe d'état + quoi/comment ?",
        "role": "Exprime une caractéristique du sujet par l'intermédiaire d'un verbe d'état (être, paraître, sembler, devenir, rester, avoir l'air).",
        "exemple": "« Les narcisses sont épanouis » → épanouis est attribut du sujet « les narcisses »."
      }
    ],
    "autourNom": [
      {
        "nom": "Épithète liée",
        "role": "Adjectif qualificatif directement collé (avant ou après) au nom qu'il qualifie, sans virgule.",
        "exemple": "« Les branches fleuries » → fleuries est épithète liée du nom branches."
      },
      {
        "nom": "Épithète détachée / Apposition",
        "role": "Adjectif ou groupe séparé du nom par une virgule.",
        "exemple": "« Épanouis, les narcisses brillent sous le soleil. »"
      },
      {
        "nom": "Complément du Nom (CDN)",
        "role": "Groupe prépositionnel (souvent introduit par « de », « à », « en ») qui complète un nom.",
        "exemple": "« Les branches du cerisier » → du cerisier est complément du nom branches."
      }
    ],
    "circonstanciels": [
      {
        "nom": "CC de Lieu",
        "question": "Où ?",
        "role": "Précise l'endroit. Déplaçable et généralement supprimable.",
        "exemple": "« Cependant, les narcisses sont épanouis dans l'herbe » → dans l'herbe (CC de lieu)."
      },
      {
        "nom": "CC de Temps",
        "question": "Quand ? Combien de temps ?",
        "role": "Précise le moment ou la durée.",
        "exemple": "« Je les ai plantés à l'automne » → à l'automne (CC de temps)."
      },
      {
        "nom": "CC de Manière",
        "question": "Comment ? De quelle façon ?",
        "role": "Précise la manière dont l'action s'accomplit.",
        "exemple": "« Les péniches passent en paisibles caravanes » → en paisibles caravanes (CC de manière)."
      },
      {
        "nom": "CC de Cause / But",
        "question": "Pourquoi ? Dans quel but ? Pour quelle raison ?",
        "role": "Précise la cause ou l'objectif de l'action.",
        "exemple": "« Il étudie pour réussir son concours » → pour réussir (CC de but)."
      }
    ]
  },
  "methode4Etapes": [
    {
      "etape": 1,
      "titre": "Souligner les verbes conjugués et découper en propositions",
      "regle": "1 verbe conjugué = 1 proposition.",
      "action": "Compter les verbes conjugués. Entourer chaque proposition de crochets [ ... ]. Déterminer son type : Indépendante (vit seule), Principale (commande une subordonnée), ou Subordonnée (introduite par un mot subordonnant)."
    },
    {
      "etape": 2,
      "titre": "Découper l'intérieur de chaque proposition en blocs fonctionnels",
      "regle": "Poser les questions dans un ordre strict autour du verbe pivot.",
      "action": "1. Verbe conjugué (pivot). 2. Sujet (« Qui est-ce qui + verbe ? »). 3. Compléments essentiels (COD/COI si verbe d'action, Attribut si verbe d'état). 4. Compléments Circonstanciels (« Où ? Quand ? Comment ? Pourquoi ? »)."
    },
    {
      "etape": 3,
      "titre": "Analyser mot par mot à l'intérieur de chaque bloc",
      "regle": "Descendre au niveau de la cellule grammaticale.",
      "action": "Donner la nature précise de chaque mot (article, nom, adjectif, préposition...). Indiquer les fonctions internes au sein du Groupe Nominal (adjectif épithète du nom noyau, complément du nom CDN)."
    },
    {
      "etape": 4,
      "titre": "Remplir la grille officielle d'examen",
      "regle": "4 colonnes claires pour chaque bloc.",
      "action": "Colonne 1 : Groupes de la proposition | Colonne 2 : Fonction du groupe | Colonne 3 : Nature mot par mot | Colonne 4 : Fonction précise de chaque mot."
    }
  ]
};
})(typeof window !== "undefined" ? window : globalThis);
