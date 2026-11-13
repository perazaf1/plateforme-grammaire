/**
 * Auto-vérification du module Connaissance des Arts (ICP) — architecture modulaire
 * Exécution : node tests/arts.test.js
 */
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const rootDir = path.resolve(__dirname, "..");
const context = vm.createContext({ console });

const scripts = [
  "js/core/registry.js",
  "js/subjects/connaissance-arts/cours-1.js",
  "js/subjects/connaissance-arts/cours-2.js",
  "js/subjects/connaissance-arts/cours-3.js",
  "js/subjects/connaissance-arts/cours-4.js",
  "js/subjects/connaissance-arts/cours-5.js",
  "js/subjects/connaissance-arts/index.js"
];

scripts.forEach((rel) => {
  vm.runInContext(fs.readFileSync(path.join(rootDir, rel), "utf8"), context, { filename: rel });
});

const artsSubject = context.PlatformRegistry.getSubject("connaissance-arts");
assert.ok(artsSubject, "La matière connaissance-arts doit être enregistrée");
assert.ok(artsSubject.data && Array.isArray(artsSubject.data.quizQuestions), "quizQuestions doit être un tableau");
assert.equal(artsSubject.subsections.length, 6, "Doit contenir 6 sous-sections (global + cours 1 à 5)");

const questions = artsSubject.data.quizQuestions;
assert.equal(questions.length, 25, "Il doit y avoir exactement 25 questions Arts (5 par cours)");

const ids = new Set();
const courseCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

questions.forEach((q, idx) => {
  assert.ok(q.id && typeof q.id === "string", `Question #${idx} doit avoir un id`);
  assert.ok(!ids.has(q.id), `ID dupliqué détecté : ${q.id}`);
  ids.add(q.id);

  assert.ok([1, 2, 3, 4, 5].includes(q.coursNum), `Question ${q.id} : coursNum doit être entre 1 et 5`);
  courseCounts[q.coursNum]++;

  assert.ok(q.cours && q.cours.startsWith(`Cours ${q.coursNum}`), `Question ${q.id} : cours doit commencer par 'Cours ${q.coursNum}'`);
  assert.ok(q.question && q.question.trim().length > 10, `Question ${q.id} : énoncé trop court ou absent`);

  assert.ok(Array.isArray(q.options) && q.options.length >= 4, `Question ${q.id} : doit avoir au moins 4 options`);
  q.options.forEach((opt, optIdx) => {
    assert.ok(opt && typeof opt === "string" && opt.trim().length > 0, `Question ${q.id} option ${optIdx} vide`);
  });

  assert.ok(Number.isInteger(q.reponseCorrecte), `Question ${q.id} : reponseCorrecte doit être un entier`);
  assert.ok(q.reponseCorrecte >= 0 && q.reponseCorrecte < q.options.length, `Question ${q.id} : index reponseCorrecte hors limites`);
  assert.ok(q.options[q.reponseCorrecte], `Question ${q.id} : options[reponseCorrecte] inexistant`);

  assert.ok(q.explication && q.explication.trim().length > 15, `Question ${q.id} : explication trop courte ou absente`);
});

for (let c = 1; c <= 5; c++) {
  assert.equal(courseCounts[c], 5, `Cours ${c} doit avoir exactement 5 questions (actuel: ${courseCounts[c]})`);
  const sub = context.PlatformRegistry.getSubsection(artsSubject, `cours-${c}`);
  assert.ok(sub, `Sous-section cours-${c} présente`);
  assert.equal(sub.modules.length, 3, `cours-${c} doit exposer quiz, flashcards et repères`);
}

const courses = artsSubject.courses;
assert.equal(courses.length, 5, "Il doit y avoir 5 fiches de cours Arts");
courses.forEach((c, idx) => {
  assert.equal(c.num, idx + 1);
  assert.ok(c.title && c.title.length > 5);
  assert.ok(c.filConducteur && c.filConducteur.length > 100, `Cours ${c.num} : filConducteur manquant`);
  assert.ok(Array.isArray(c.chronologie) && c.chronologie.length > 5, `Cours ${c.num} : chronologie insuffisante`);
  assert.ok(Array.isArray(c.noms) && c.noms.length > 5, `Cours ${c.num} : noms insuffisants`);
  assert.ok(Array.isArray(c.notions) && c.notions.length > 5, `Cours ${c.num} : notions insuffisantes`);
});

assert.equal(artsSubject.data.flashcards.length, 285, "285 flashcards doivent être générées depuis les 5 fiches");

console.log(`✓ tests/arts.test.js : 25 questions ICP, 6 sous-sections et 5 cours (${artsSubject.data.flashcards.length} flashcards) validés`);
