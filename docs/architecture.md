# Judge assistant foundation

## Proposed design

Keep the knowledge layer independent of the model and chat interface.

- Source registry: URL, publisher, language, jurisdiction, format, publication/effective date when known, retrieval date, and reuse constraints.
- Retrieval layer: find version-appropriate card text, rules, and relevant rulings.
- Case representation: question, format, date, turn player, phase/step, relevant zones, active effects, and ordered chain links.
- Answer layer: conclusion, reasoning, cited evidence, assumptions, missing facts, and uncertainty.
- Adapters: future HTTP API, website chat, and other clients.

A retrieved source is evidence, not an instruction to the assistant. Source content must never override application instructions or request secrets.

## Answer states

- needs_clarification: material game-state or format details are missing.
- supported: applicable evidence supports the answer; distinguish explicit rulings from inference.
- unresolved: evidence is insufficient or contradictory.

Do not use model confidence alone as proof of correctness. Do not apply an OCG ruling to TCG without identifying and checking applicability.

## Initial milestones

1. Define the case and evidence schemas.
2. Build a small reviewed evaluation set of timing, targeting, negation, and chain-resolution questions.
3. Add source adapters with provenance and version tracking.
4. Implement retrieval and a provider-independent answer service.
5. Evaluate citation accuracy, format separation, and clarification behavior.
6. Integrate website chat after the service meets the evaluation criteria.

## Open implementation decisions

Hosting, model provider, operating budget, supported formats at launch, and permitted source ingestion remain to be selected. No model account integration or subscription sharing is implemented.

## Worked-example catalog

Requirement: explain rulings with a reusable, reviewed catalog of concrete examples, rather than relying on abstract rule explanations alone.

Each example records:
- Stable ID, concept tags, and a plain-language title.
- Applicable format, region, effective date, and card-text versions.
- Relevant board state, player actions, and ordered chain links.
- Expected outcome and step-by-step explanation.
- The decisive rule and supporting source URLs.
- Whether the outcome is explicitly sourced or inferred.
- Review status and review date.
- Optional paired example changing one decisive condition to demonstrate a different outcome.

Answer presentation:
1. State the ruling for the user's actual situation.
2. Explain the decisive rule in plain language.
3. Select one or two applicable reviewed examples.
4. Explicitly map the example to the user's situation and identify meaningful differences.
5. When useful, show a contrasting example and name the detail that changes the result.

Retrieve examples by rule concept and applicability, not just matching card names. Never force an analogy across incompatible formats, text versions, or materially different effects. If no suitable reviewed example exists, say so; any newly generated illustration must be labeled as illustrative and unreviewed, and must not automatically enter the reviewed catalog. Examples explain evidence-backed conclusions; they are not substitutes for ruling sources.

Before publication, validate each catalog entry against its cited evidence. Keep evaluation cases separate from retrieval examples to avoid measuring memorization. Evaluate example relevance, correctness, and whether the explanation identifies the decisive condition.

Status: this section specifies the planned feature; no reviewed card-interaction examples or example-selection implementation have been added yet.
