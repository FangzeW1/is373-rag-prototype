# Experiment Plan

**Status:** Local RAG experiment implemented and manually exercised; systematic comparisons and hosted deployment remain planned.

## Intended reader

A student or developer asking questions about a small collection of technical documentation.

**[RAG chatbot code and setup](https://github.com/FangzeW1/is373-rag-prototype#run-locally)** · [Evaluation record](/evaluation) · [Source evidence trace](https://github.com/FangzeW1/is373-rag-prototype/blob/main/research/RAG-PLAN-EVIDENCE.md)

## Actual permitted corpus

Start with five short, permitted documents about the TaskNest prototype:

| ID | Document | Permission |
|---|---|---|
| DOC-001 | Original TaskNest overview | Self-authored |
| DOC-002 | TaskNest authentication | Self-authored |
| DOC-003 | TaskNest authorization | Self-authored |
| DOC-004 | TaskNest testing notes | Self-authored |
| DOC-005 | TaskNest scope and limitations | Self-authored |

These five project-owned Markdown documents are present in the repository's [documents folder](https://github.com/FangzeW1/is373-rag-prototype/tree/main/documents) and have been imported into local LanceDB. A source version/hash manifest remains planned.

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

## Implemented locally / planned for Build

- **Implemented:** Next.js streaming chat interface
- **Implemented:** Server-side Groq model API access
- **Implemented:** MiniLM embeddings and persistent local LanceDB
- **Partially implemented:** Retrieved source filenames are displayed; exact chunk-level traces and verified citations remain planned
- **Implemented:** Repeatable Markdown import script
- **Planned for Build:** Hosted application

## Unresolved questions for class

- How will hosted API usage be limited and monitored? (Groq is used locally.)
- How does the selected MiniLM model compare with alternatives on our corpus?
- What hosting arrangement can persist the vector database?
- How should public request limits be enforced?
- What is the simplest useful evaluation record?

## Evidence status

Local import, embeddings, retrieval and streamed model answers have been implemented. The [evaluation report](/evaluation) records five manually observed questions, and the [screenshot walkthrough](https://fangzew1.github.io/is218-portfolio-research/projects.html#rag-walkthrough) shows three further local interactions. No hosted chatbot, measured retrieval accuracy, comparative baseline, or completed peer review is claimed.
