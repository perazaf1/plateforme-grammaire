# Grammaire & Méthode — Plateforme Interactive d'Analyse Grammaticale, Dictées & Concours

Plateforme web statique moderne (HTML5, CSS3, JavaScript vanilla) conçue pour s'entraîner aux épreuves d'analyse grammaticale (**Nature** vs **Fonction**, découpage de propositions, accords délicats), pratiquer des **dictées audio interactives** et réviser les notions de culture générale (Connaissance des Arts).

Les exercices et règles sont directement issus des polycopiés du dossier (`Nature_fct.pdf`, `fiche_nature_fonction.pdf`), des leçons de référence du site **Français Facile** (*francaisfacile.com*) et des fiches ICP Prépa Journalisme.

---

## 🚀 Modules interactifs inclus

1. **📝 Phrases d'Analyse (15 phrases)** :
   - *Série 1 (Fiche officielle)* : Les 10 phrases emblématiques du cours (*« Le printemps a été tardif... »*, *« Je les ai plantés... »*, *« Cependant, les narcisses sont épanouis dans l’herbe... »*).
   - *Série 2 (Français Facile)* : 5 phrases d'entraînement avancées (verbes d'état, pronom relatif *dont*, pronom personnel *leur* invariable, compléments du nom).
   - Double sélection dynamique : **Nature** (carte d'identité) + **Fonction** (rôle dans la phrase), avec validation, découpage syntaxique en propositions et pièges d'examen signalés.
2. **🎯 Quiz Nature vs Fonction (17 questions)** :
   - Questions à choix multiples ciblant les confusions fréquentes (verbe d'état vs verbe d'action, pronoms vs déterminants, fonctions autour du nom vs compléments circonstanciels, pronom « en »).
3. **📐 Le Protocole en 4 Étapes** :
   - Démonstrateur interactif pas-à-pas guidé sur les deux cas d'école complets du cours :
     - *Cas n°1 (Phrase simple)* : « Entre les branches fleuries du cerisier, j’aperçois le fleuve. »
     - *Cas n°2 (Phrase complexe à 2 propositions)* : « Je pense à un être vague qui aimera ces fleurs. »
4. **✒️ Défis Orthographe & Accords (12 défis)** :
   - Entraînement ciblé sur l'accord du participe passé avec COD antéposé, les accords complexes sujet-verbe (attraction du CDN, pronom *qui*), les homophones (*leur/leurs*, *ce/se*, *ces/ses*) et la règle de remplacement en *-é / -er*.
5. **🎧 Dictées Vocales Interactives (Nouveau !)** :
   - Synthèse vocale française intégrée (`SpeechSynthesis`) : écoute intégrale ou phrase par phrase, avec réglage de la vitesse (*0.8x Allure dictée* ou *1.0x Allure normale*).
   - Saisie en direct dans la zone d'écriture.
   - **Correction automatique intelligente mot à mot (Diff)** : affichage coloré des mots exacts (vert), des erreurs d'orthographe/accords (rouge) et des omissions.
   - Note sur 20 calculée automatiquement avec appréciation et fiches de règles ciblées pour chaque dictée (*Le Réveil du Jardin*, *Les Photographes du Musée*, *Le Fleuve à l'Aurore*).
6. **📋 La Grille d'Examen Numérique** :
   - Générateur interactif du tableau à 4 colonnes recommandé le jour de l'épreuve : personnalisable, avec préréglages et bouton d'impression optimisé (`@media print`).
7. **📖 Mémento & Règles de Cours** :
   - Synthèse complète avec **moteur de recherche instantané** pour retrouver en une seconde les définitions et moyens mnémotechniques (*« Mais où est donc Ornicar »*, *« Adam part pour Anvers... »*).
8. **🏛️ Bonus : Culture & Arts (ICP Journalisme)** :
   - QCM de révision basé sur les fiches des cours 1 à 5 (Loi Malraux 1962, Convention UNESCO 1972, Histoire du musée, Pop culture, Land Art).

---

## 💻 Test immédiat en local

### Option 1 : Ouvrir directement dans le navigateur
Double-cliquez simplement sur le fichier `index.html`. Aucune installation, aucun serveur ni connexion internet n'est requis.

### Option 2 : Lancer un petit serveur local
Dans votre terminal :
```bash
cd ~/Bureau/fiches\ e/plateforme-grammaire
python3 -m http.server 8123
```
Puis ouvrez [http://localhost:8123](http://localhost:8123) dans votre navigateur.

### Option 3 : Vérifier le moteur de correction des dictées
Le diff mot à mot (alignement, omissions, accents, mots en trop) possède une auto-vérification :
```bash
node tests/diff.test.js
```

---

## 🚀 Déploiement Continu via GitHub & Netlify (Recommandé)

Grâce à cette méthode, **chaque `git push` met à jour votre site en direct sur Internet en quelques secondes** !

### Étape 1 : Initialiser le dépôt Git local
Ouvrez votre terminal dans le dossier du site :
```bash
cd ~/Bureau/fiches\ e/plateforme-grammaire
git init
git add .
git commit -m "feat: plateforme interactive d'exercices, dictées et grammaire"
```

### Étape 2 : Créer le dépôt sur GitHub
1. Allez sur [github.com/new](https://github.com/new) et créez un nouveau dépôt public ou privé (nommez-le par exemple `plateforme-grammaire`).
2. Liez votre dossier local et poussez le code :
```bash
git remote add origin https://github.com/VOTRE_NOM_UTILISATEUR/plateforme-grammaire.git
git branch -M main
git push -u origin main
```

### Étape 3 : Connecter à Netlify (en 3 clics)
1. Rendez-vous sur [app.netlify.com](https://app.netlify.com) et connectez-vous avec votre compte GitHub.
2. Cliquez sur **« Add new site »** > **« Import an existing project »**.
3. Sélectionnez **GitHub**, puis choisissez votre dépôt `plateforme-grammaire`.
4. Netlify détecte automatiquement le fichier `netlify.toml` fourni à la racine. Cliquez directement sur **« Deploy site »** !
5. Votre site est instantanément en ligne avec une URL sécurisée en HTTPS (du type `https://votre-site.netlify.app`). Vous pouvez changer ce nom dans *Site configuration > Change site name*.

### Étape 4 : Mettre à jour le site à l'avenir
Dès que vous modifiez un fichier ou ajoutez des exercices :
```bash
git add .
git commit -m "Mise à jour des exercices"
git push
```
👉 Netlify redéploie le site automatiquement en moins de 15 secondes !

---

## 🌐 Déploiement alternatif sur Vercel

Si vous préférez Vercel, la configuration [`vercel.json`](vercel.json) et [`.vercelignore`](.vercelignore) est également incluse :
```bash
npm install -g vercel
vercel
```
