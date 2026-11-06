/**
 * Auto-vérification du module Arts & Culture (ICP)
 * Exécution : node tests/arts.test.js
 */
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

// Charger data.js dans un contexte isolé
const dataCode = fs.readFileSync("js/data.js", "utf8");
const APP_DATA = vm.runInNewContext(dataCode + "; APP_DATA;");
assert.ok(APP_DATA, "APP_DATA doit être défini");
assert.ok(Array.isArray(APP_DATA.artsCulture), "APP_DATA.artsCulture doit être un tableau");

const questions = APP_DATA.artsCulture;
assert.equal(questions.length, 25, "Il doit y avoir exactement 25 questions Arts (5 par cours)");

// Vérifier l'unicité des IDs
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

// Vérifier que chaque cours a exactement 5 questions
for (let c = 1; c <= 5; c++) {
  assert.equal(courseCounts[c], 5, `Cours ${c} doit avoir exactement 5 questions (actuel: ${courseCounts[c]})`);
}

// Vérifier la logique de filtrage
function filterQuestions(courseSelection) {
  if (!courseSelection || courseSelection === "all") return questions;
  const num = parseInt(courseSelection, 10);
  return questions.filter(q => q.coursNum === num);
}

assert.equal(filterQuestions("all").length, 25);
assert.equal(filterQuestions("1").length, 5);
assert.equal(filterQuestions("2").length, 5);
assert.equal(filterQuestions("3").length, 5);
assert.equal(filterQuestions("4").length, 5);
assert.equal(filterQuestions("5").length, 5);

console.log("✓ tests/arts.test.js : 25 questions ICP validées avec succès (5 par cours)");
