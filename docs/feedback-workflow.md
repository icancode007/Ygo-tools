# Improvement after verified failure

Implemented first slice: dependency-free JavaScript workflow module in src/feedback.js, runnable with npm test on Node 22 or later.

A report starts as reported, not as accepted knowledge. A maintainer supplies a correction, sources with format applicability, and a reproducible regression case before verification. Release requires a passing test result linked to that regression and the exact corrected commit. Records preserve transition history.

These checks validate workflow structure, not the truth of evidence. Sources still need human review. The host must authenticate reviewers, obtain test results from trusted CI, persist records, and restrict transitions to authorized callers. Never expose verification or release directly as unauthenticated user tools. Caller-supplied reviewer names and passing flags are not proof of authorization or CI execution.

The tests exercise rejection of missing evidence, invalid state transitions, failed tests, and test results from another correction or commit. They do not test a working ruling model.

Next integrations:
- Private report intake with answer/version IDs and user-approved excerpts.
- Durable storage, reviewer authentication, duplicate grouping, rejection and reopening.
- A real judge evaluation runner and trusted CI evidence.
- Published correction history stripped of personal conversation data.
- ChatGPT plugin tools backed by the service.

Do not automatically publish users' chats to this public repository. Do not promise automatic learning or perfect accuracy. No API, model integration, deployed plugin, or report submission UI exists yet.
