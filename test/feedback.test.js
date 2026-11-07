import {test} from 'node:test';
import assert from 'node:assert/strict';
import {reportFailure, verifyCorrection, releaseCorrection} from '../src/feedback.js';
const report = () => reportFailure({question:'Re-do format: Rabbit priority?',
  answer:'Allowed in Edison', format:'unresolved spoken format',
  problem:'Verdict given before identifying format'});
const review = () => ({reviewer:'maintainer', correction:'Clarify the format before a verdict',
  sources:[{url:'https://www.yugioh-card.com/en/play/fast-effect-timing/',
    applicability:'Timing source; format identity still requires clarification'}],
  regression:{id:'ambiguous-format', input:'Re-do: Rabbit priority?', expected:'needs_clarification'}});
test('a report is not an accepted correction', () => {
  const r = report(); assert.equal(r.status,'reported');
  assert.throws(() => releaseCorrection(r,{commit:'abc'}), /Verification/);
});
test('empty evidence and missing applicability cannot verify', () => {
  assert.throws(() => verifyCorrection(report(),{...review(),sources:[]}), /Evidence/);
  assert.throws(() => verifyCorrection(report(),{...review(),sources:[{url:'https://example.com'}]}), /applicability/);
});
test('verification requires a reproducible expected result', () => {
  assert.throws(() => verifyCorrection(report(),{...review(),regression:{id:'x'}}), /regression input/);
});
test('failed, missing, and unrelated test results block release', () => {
  const r = verifyCorrection(report(),review());
  for (const result of [undefined, {passed:false}, {passed:true,commit:'old',regressionId:'ambiguous-format'},
    {passed:true,commit:'abc',regressionId:'different'}]) {
    assert.throws(() => releaseCorrection(r,{commit:'abc',testResult:result}), /Passing regression/);
  }
});
test('verified correction releases with matching test evidence without mutating history', () => {
  const initial = report(); const verified = verifyCorrection(initial,review());
  const released = releaseCorrection(verified,{commit:'abc',testResult:{
    passed:true,commit:'abc',regressionId:'ambiguous-format',runUrl:'https://example.com/runs/1'}});
  assert.equal(initial.status,'reported'); assert.equal(verified.status,'verified');
  assert.equal(released.status,'released'); assert.equal(released.history.length,3);
});
