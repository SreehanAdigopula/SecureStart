const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
function app(storage = {}) {
  const nodes = new Map();
  const context = vm.createContext({
    document: { querySelector: key => {
      if (!nodes.has(key)) nodes.set(key, { innerHTML: '', querySelectorAll: () => [] });
      return nodes.get(key);
    }, addEventListener() {} },
    localStorage: { getItem: () => null, setItem() {}, ...storage },
    crypto: { randomUUID: () => 'test-id' },
  });
  vm.runInContext(fs.readFileSync('app.js', 'utf8'), context);
  return { run: code => vm.runInContext(code, context), nodes };
}
test('best/worst scores, website applicability, and band boundaries', () => {
  const { run } = app();
  for (const website of [true, false]) {
    for (const worst of [true, false]) {
      assert.equal(run(`state.profile = {hasWebsite:${website}}; state.answers = getApplicableCategories(state.profile).flatMap(c => c.questions.map(q => ({questionId:q.id, category:c.name, riskPoints: ${worst} ? Math.max(...q.answers.map(a=>a[1])) : 0}))); buildResult().totalScore`), worst ? 100 : 0);
      assert.equal(run('Object.keys(buildResult().categoryScores).length'), website ? 6 : 5);
    }
  }
  assert.equal(run('[0,24,25,49,50,74,75,100].map(getRiskLevel).join()'), 'Low,Low,Moderate,Moderate,High,High,Urgent,Urgent');
});
test('documented example is 34 and a single worsening answer never improves score', () => {
  const {run} = app();
  assert.equal(run('Math.round([3/11,3/9,4/12,3/9,2/9,5/9].map(x=>Math.round(x*100)).reduce((a,b)=>a+b)/6)'),34);
  assert.equal(run(`state.profile={hasWebsite:true}; state.answers=categories.flatMap(c=>c.questions.map(q=>({questionId:q.id,category:c.name,riskPoints:0}))); let last=0; let monotonic=true; for(const a of state.answers) {a.riskPoints=1; const score=buildResult().totalScore; if(score<last) monotonic=false; last=score;} monotonic;`),true);
});
test('every isolated partial or absent practice produces relevant advice', () => {
  const { run } = app();
  assert.equal(run(`categories.every(c=>c.questions.every(q=>[1,Math.max(...q.answers.map(a=>a[1]))].every(points=>getRecommendations([{questionId:q.id,category:c.name,riskPoints:points}],{hasWebsite:true},{}).some(r=>r.match.includes(q.id)))))`),true);
  assert.equal(run(`getRecommendations([{questionId:'https',category:'Website and Domain Safety',riskPoints:3}],{hasWebsite:true},{})[0].title`),'Enable and verify HTTPS');
  assert.equal(run(`getRecommendations([{questionId:'recoveryOptions',category:'Incident Readiness',riskPoints:3}],{hasWebsite:true},{})[0].title`),'Update account recovery methods');
});
test('blocked storage is recoverable and malformed saved data is tolerated', () => {
  assert.equal(app({setItem(){throw Error('QuotaExceeded');}}).run('saveAssessment({})'),false);
  assert.equal(app({getItem(){throw Error('SecurityError');}}).run('getSavedAssessments().length'),0);
  assert.equal(app({getItem:()=>'{broken'}).run('getSavedAssessments().length'),0);
  assert.equal(app().run('saveAssessment({})'),true);
});
test('hostile labels remain text in HTML and Markdown', () => {
  const {run,nodes}=app();
  run(`renderResults({organization:{name:'<img src=x onerror=alert(1)>'},riskLevel:'Low',totalScore:0,scoringVersion:'2.0'})`);
  assert.ok(nodes.get('#resultsContent').innerHTML.includes('&lt;img'));
  assert.ok(!nodes.get('#resultsContent').innerHTML.includes('<img'));
  const escaped=run('safeMarkdownText("<script>alert(1)</script> [click](javascript:alert(1))")');
  assert.ok(!escaped.includes('<script>'));
  assert.ok(escaped.includes('\\['));
});
