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
