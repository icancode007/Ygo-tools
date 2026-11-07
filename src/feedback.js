import { randomUUID } from 'node:crypto';

function required(value, name) {
  if (typeof value !== 'string' || !value.trim()) throw new Error(name + ' is required');
  return value.trim();
}

// Pure records: the host must provide authenticated reviewers and durable storage.
export function reportFailure({question, answer, format, problem}) {
  return {id: randomUUID(), status: 'reported',
    question: required(question, 'question'), answer: required(answer, 'answer'),
    format: required(format, 'format'), problem: required(problem, 'problem'),
    history: [{event: 'reported', at: new Date().toISOString()}]};
}

export function verifyCorrection(report, {reviewer, correction, sources, regression}) {
  if (report.status !== 'reported') throw new Error('Only reported failures can be verified');
  required(reviewer, 'reviewer'); required(correction, 'correction');
  if (!Array.isArray(sources) || !sources.length) throw new Error('Evidence required');
  const evidence = sources.map(s => {
    const url = new URL(required(s.url, 'source URL'));
    if (url.protocol !== 'https:') throw new Error('HTTPS source required');
    return {url: url.href, applicability: required(s.applicability, 'format applicability')};
  });
  const test = {id: required(regression?.id, 'regression ID'),
    input: required(regression?.input, 'regression input'),
    expected: required(regression?.expected, 'expected result')};
  return {...structuredClone(report), status: 'verified',
    review: {reviewer: reviewer.trim(), correction: correction.trim(), sources: evidence, regression: test},
    history: [...report.history, {event: 'verified', at: new Date().toISOString()}]};
}

export function releaseCorrection(report, {commit, testResult}) {
  if (report.status !== 'verified') throw new Error('Verification required before release');
  required(commit, 'commit');
  if (testResult?.passed !== true || testResult?.commit !== commit ||
      testResult?.regressionId !== report.review.regression.id) {
    throw new Error('Passing regression evidence must match correction and commit');
  }
  required(testResult.runUrl, 'test run URL');
  return {...structuredClone(report), status: 'released',
    release: {commit, testResult: structuredClone(testResult)},
    history: [...report.history, {event: 'released', at: new Date().toISOString()}]};
}
