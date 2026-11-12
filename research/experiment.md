# Experiment Plan

**Status:** Planned; no retrieval or generation results are claimed.

## Intended reader

A student or developer asking questions about a small collection of technical documentation.

## Proposed corpus

Start with five short, permitted documents about the TaskNest prototype:

| ID | Document | Permission |
|---|---|---|
| DOC-001 | Original TaskNest overview | Self-authored |
| DOC-002 | Original feature requirements | Self-authored |
| DOC-003 | Original architecture notes | Self-authored |
| DOC-004 | Original testing plan | Self-authored |
| DOC-005 | Original security decisions | Self-authored |

These documents still need to be prepared and imported. Record their actual creation dates, versions, and hashes in a source manifest.

## Evaluation questions

1. **Exact term:** What database is proposed for TaskNest?
2. **Paraphrase:** How will the app remember assignments after restarting?
3. **Relationship:** How are authentication and task ownership connected?
4. **Comparison:** Why choose persistent storage over an in-memory list?
5. **Unanswerable:** How many students used TaskNest last semester?

The fifth question should produce an explicit insufficient-evidence response.

## Retrieval evaluation

For each question, record:

- Expected source IDs and relevant passages
- Keyword baseline results
- Vector retrieval results
- Actual returned chunk IDs and similarity scores, if available
- Missing or irrelevant evidence

## Answer evaluation

For each generated response, record:

- Actual answer
- Source citations
- Whether each claim is supported
- Whether the answer admits missing evidence
- Any misleading or invented details

## Two design comparisons

1. Paragraph-aware versus fixed-size chunking.
2. Keyword search versus embedding-based retrieval.

These comparisons will use the same corpus and evaluation questions.

## Planned application

- Next.js streaming chat interface
- Server-side model API access
- Real embeddings and persistent vector storage
- Source citations and retrieval traces
- Repeatable import script
- Hosted application at the Build stage

## Unresolved questions for class

- Which free-tier model API is suitable for streaming generation?
- Which embedding model is practical for local development?
- What hosting arrangement can persist the vector database?
- How should public request limits be enforced?
- What is the simplest useful evaluation record?

## Evidence status

Research and architecture planning are in progress. No successful imports, embeddings, retrieval traces, model answers, hosted RAG deployment, or peer review are claimed yet.
