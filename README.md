# Atelier d'Entraînement — Plateforme Interactive Multi-Matières

> **Site en ligne :** [https://icpplateforme.netlify.app/](https://icpplateforme.netlify.app/)

Application web statique modulaire (HTML5, CSS3 OKLCH, JavaScript vanilla, sans dépendance ni étape de build) organisée en deux niveaux : **Menu des matières** (`index.html`) puis **Sous-sections & Active Recall** (`matiere.html`).

---

## Matières incluses

### 1. Grammaire & Méthode (`js/subjects/grammaire/`)
Découpée en 3 sous-sections :
- **Analyse syntaxique (`analyse`)** : Phrases d'Analyse (15), Quiz Nature & Fonction (17), Protocole 4 Étapes, Grille d'Examen imprimable.
- **Orthographe & Dictées (`orthographe`)** : Défis Orthographe & Accords (12), Dictées Vocales Interactives (3) avec correction mot-à-mot LCS (`js/engines/diff.js`).
- **Mémento & Règles (`memento`)** : Fiches de grammaire avec recherche instantanée insensible aux accents.

### 2. Connaissance des Arts — ICP Prépa Journalisme (`js/subjects/connaissance-arts/`)
Découpée en 6 sous-sections (1 fichier par cours + révision transversale) :
- **Révision globale (`global`)** : 25 QCM, 285 flashcards et 5 fiches repères.
- **Cours 1 à 5 (`cours-1` à `cours-5`)** : chaque cours dispose de son propre Quiz Active Recall, de ses Flashcards et de sa Fiche & Repères.

---

## Architecture modulaire

- `index.html` + `js/ui/catalog-page.js` : menu de sélection des matières avec recherche, filtres par domaine et jauge de maîtrise.
- `matiere.html` + `js/ui/subject-page.js` : hub et rail des sous-sections, chargement dynamique à la demande (`js/core/loader.js`) des scripts de la matière choisie.
- `css/` : `tokens.css` (OKLCH + polices locales `.woff2`), `base.css`, `layout.css`, `components.css`, `active-recall.css`, `grammaire.css`.
- `assets/fonts/` : polices auto-hébergées (`Bricolage Grotesque`, `Plus Jakarta Sans`, `JetBrains Mono`).
- `js/engines/` : moteurs Active Recall (`quiz-engine.js` avec mode sans indices, barre segmentée, combo XP et reprise des erreurs ; `flashcards-engine.js` avec 3 niveaux d'auto-évaluation et file active ; `reperes-engine.js`).

---

## Tests et lancement local

```bash
cd ~/Code/plateforme-entrainement/plateforme
python3 -m http.server 8123
```

Tests automatisés :
```bash
cd ~/Code/plateforme-entrainement/plateforme
node tests/diff.test.js && node tests/arts.test.js && node tests/platform.test.js
```
