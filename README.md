# YGO Tools

Open-source tools for Yu-Gi-Oh!, beginning with a source-backed ruling assistant.

## Status

Initial project foundation only. No working chatbot, rules engine, or deployed API yet.

## Judge assistant goals

- Answer card interactions and board-state questions with traceable sources.
- Ask for missing facts before deciding a ruling.
- Keep TCG, OCG, Master Duel, and historical formats distinct.
- Separate published rulings from inference and unresolved questions.
- Eventually expose a reusable API for integration with king-of-games.com.

This is an independent community project, not an official Konami product or a substitute for the event judge's decision.

## Planned answer flow

1. Capture format, region, effective date, card text, board state, and chain.
2. Retrieve applicable rules and rulings with source URLs and retrieval dates.
3. Identify missing details or conflicting sources.
4. Return the ruling, explanation, citations, assumptions, and uncertainty.

See [architecture](docs/architecture.md) and [contribution guidelines](CONTRIBUTING.md).

## License

Original project code is MIT licensed; see [LICENSE](LICENSE). Third-party card text, artwork, trademarks, and source documents are not granted a license by this repository. Prefer source links and provenance over copying third-party datasets.
