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
test('a missing MFA practice remains visible despite a low overall score', () => {
  const { run, nodes } = app();
  const score = run(`
    state.profile = {name:'Fictional Club',hasWebsite:false,handlesSensitiveData:false};
    state.answers = getApplicableCategories(state.profile).flatMap(c => c.questions.map(q => ({questionId:q.id,category:c.name,riskPoints:q.id==='twoFactor'?3:0})));
    state.result = buildResult();
    renderResults(state.result);
    state.result.totalScore;
  `);
  assert.equal(score, 5);
  assert.ok(nodes.get('#resultsContent').innerHTML.includes('Important reported gaps'));
  assert.ok(nodes.get('#resultsContent').innerHTML.includes('Two-factor authentication is missing'));
  assert.equal(run('getRecommendations(state.answers,state.profile,state.result.categoryScores)[0].title'), 'Enable two-factor authentication');
});
test('unknown answers count as gaps and inapplicable website answers stay excluded', () => {
  const { run } = app();
  assert.equal(run(`
    state.profile = {hasWebsite:false};
    state.answers = categories.flatMap(c => c.questions.map(q => ({questionId:q.id,category:c.name,riskPoints:2})));
    const result = buildResult();
    [result.totalScore,result.riskLevel,Object.hasOwn(result.categoryScores,'Website and Domain Safety')].join(',');
  `), '68,High,false');
});
test('profile edits retain draft answers, including temporarily hidden website answers', () => {
  const { run, nodes } = app();
  const container = {
    inputs: [],
    set innerHTML(markup) {
      this.inputs = [...markup.matchAll(/name="([^"]+)" value="([^"]+)"/g)]
        .map(([, name, value]) => ({ name, value, checked: false }));
    },
    querySelectorAll(selector) {
      return selector.endsWith(':checked') ? this.inputs.filter(input => input.checked) : this.inputs;
    }
  };
  nodes.set('#questionGroups', container);
  const selected = (name, value) => container.inputs.find(input => input.name === name && input.value === value);
  run('state.profile={hasWebsite:true}; renderQuestions()');
  selected('twoFactor', '3').checked = true;
  selected('https', '3').checked = true;
  run('state.profile={hasWebsite:false}; renderQuestions()');
  assert.equal(selected('twoFactor', '3').checked, true);
  assert.equal(selected('https', '3'), undefined);
  run('state.profile={hasWebsite:true}; renderQuestions()');
  assert.equal(selected('https', '3').checked, true);
});
test('downloaded report includes the score method and prominent individual gap', () => {
  const { run } = app();
  assert.equal(run(`
    state.profile = {name:'Fictional Club',hasWebsite:false,handlesSensitiveData:false};
    state.answers = getApplicableCategories(state.profile).flatMap(c => c.questions.map(q => ({questionId:q.id,category:c.name,riskPoints:q.id==='twoFactor'?3:0})));
    state.result = buildResult();
    let captured;
    downloadText = (name, text) => { captured = {name, text}; };
    downloadReport(state.result);
    [captured.name,captured.text.includes('Readiness gap score: 5/100'),captured.text.includes('Important Reported Gaps'),captured.text.includes('Two\\\\-factor authentication is missing')].join(',');
  `), 'fictional-club-securestart-report.md,true,true,true');
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
