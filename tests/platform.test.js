/**
 * Auto-vérification de l'architecture modulaire multi-matières et sous-sections.
 * Exécution : node tests/platform.test.js
 */
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const rootDir = path.resolve(__dirname, "..");

function createMockStorage() {
  const store = new Map();
  return {
    getItem: (k) => (store.has(k) ? store.get(k) : null),
    setItem: (k, v) => store.set(k, String(v)),
    removeItem: (k) => store.delete(k)
  };
}

const mockStorage = createMockStorage();
// Simuler une ancienne sauvegarde v1 pour vérifier la migration
mockStorage.setItem("grammaire_app_stats", JSON.stringify({
  scoreTotal: 30,
  tentatives: 3,
  streak: 2,
  completedPhrases: { 1: true, 2: true }
}));

const context = vm.createContext({
  console,
  localStorage: mockStorage
});

const coreScripts = [
  "js/core/catalog.js",
  "js/core/registry.js",
  "js/core/state.js",
  "js/engines/diff.js",
  "js/engines/quiz-engine.js",
  "js/engines/flashcards-engine.js",
  "js/engines/reperes-engine.js"
];

coreScripts.forEach((rel) => {
  vm.runInContext(fs.readFileSync(path.join(rootDir, rel), "utf8"), context, { filename: rel });
});

// Vérifier le catalogue léger et charger dynamiquement tous les scripts déclarés
const catalog = context.PlatformCatalog.getCatalog();
assert.equal(catalog.length, 2, "Le catalogue doit référencer 2 matières");

catalog.forEach((entry) => {
  assert.ok(entry.id && entry.title && entry.category, `Entrée catalogue incomplète : ${entry.id}`);
  assert.ok(Array.isArray(entry.scripts) && entry.scripts.length > 0, `Scripts manquants pour ${entry.id}`);
  entry.scripts.forEach((rel) => {
    const full = path.join(rootDir, rel);
    assert.ok(fs.existsSync(full), `Script introuvable : ${rel}`);
    vm.runInContext(fs.readFileSync(full, "utf8"), context, { filename: rel });
  });
});

const subjects = context.PlatformRegistry.getSubjects();
assert.equal(subjects.length, 2, "Deux matières doivent être enregistrées (grammaire, connaissance-arts)");

const validTypes = new Set(["quiz", "flashcards", "reperes", "custom"]);
const subjectIds = new Set();

subjects.forEach((subj) => {
  assert.ok(subj.id && !subjectIds.has(subj.id), `ID matière invalide ou dupliqué : ${subj.id}`);
  subjectIds.add(subj.id);
  assert.ok(subj.title && Array.isArray(subj.subsections) && subj.subsections.length > 0, `Matière ${subj.id} sans sous-sections`);

  const subIds = new Set();
  subj.subsections.forEach((sub) => {
    assert.ok(sub.id && !subIds.has(sub.id), `Sous-section dupliquée dans ${subj.id} : ${sub.id}`);
    subIds.add(sub.id);
    assert.ok(sub.title && Array.isArray(sub.modules) && sub.modules.length > 0, `Sous-section ${sub.id} sans modules`);

    const modIds = new Set();
    sub.modules.forEach((mod) => {
      assert.ok(mod.id && !modIds.has(mod.id), `ID module dupliqué dans ${subj.id}/${sub.id} : ${mod.id}`);
      modIds.add(mod.id);
      assert.ok(mod.label, `Module ${mod.id} sans libellé`);
      assert.ok(validTypes.has(mod.type), `Type de module inconnu : ${mod.type}`);
      if (mod.type === "custom") {
        assert.equal(typeof mod.render, "function", `Module custom ${mod.id} sans fonction render`);
      }
      if (mod.type === "quiz") {
        assert.ok(Array.isArray(mod.data) && mod.data.length > 0, `Module quiz ${mod.id} sans questions`);
      }
    });
  });
});

// Vérifier l'intégrité des données et sous-sections de Grammaire
const gram = context.PlatformRegistry.getSubject("grammaire");
assert.equal(gram.subsections.length, 3, "Grammaire doit contenir 3 sous-sections");
assert.equal(gram.data.dixPhrases.length, 15, "Grammaire doit contenir 15 phrases");
assert.equal(gram.data.quizQuestions.length, 17, "Grammaire doit contenir 17 questions quiz");
assert.equal(gram.data.demonstrationsCas.length, 2, "Grammaire doit contenir 2 cas pas-à-pas");
assert.equal(gram.data.orthographeDefis.length, 12, "Grammaire doit contenir 12 défis orthographe");
assert.equal(gram.data.dictees.length, 3, "Grammaire doit contenir 3 dictées");

// Vérifier la migration, les combos, et la progression par sous-section
const loaded = context.PlatformState.load();
assert.equal(loaded.scoreTotal, 30);
assert.equal(context.PlatformState.isCompleted("grammaire:phrase:1"), true);
assert.equal(context.PlatformState.isCompleted("grammaire:phrase:2"), true);

const res = context.PlatformState.recordQuizAttempt("connaissance-arts", "art1", true, 10);
assert.equal(res.earned, 12, "Streak de 3 donne +2 bonus combo (10 + 2)");
assert.equal(context.PlatformState.getStats().scoreTotal, 42);
assert.equal(context.PlatformState.isQuestionMastered("connaissance-arts", "art1"), true);

const c1 = context.PlatformRegistry.getSubsection(context.PlatformRegistry.getSubject("connaissance-arts"), "cours-1");
const prog = context.PlatformState.getSubsectionProgress("connaissance-arts", c1.trackableIds);
assert.equal(prog.done, 1, "Cours 1 doit compter 1 élément maîtrisé");

// Vérifier la présence locale des polices woff2
const fontsDir = path.join(rootDir, "assets", "fonts");
const woff2Files = fs.readdirSync(fontsDir).filter((f) => f.endsWith(".woff2"));
assert.equal(woff2Files.length, 6, "6 fichiers woff2 locaux doivent être présents dans assets/fonts/");

console.log("✓ tests/platform.test.js : catalogue, sous-sections, stats active recall et polices locales validés");
