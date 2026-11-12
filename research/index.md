# IS373 — RAG Prototype

## Individual RAG App & Technical Research

**Research question:** How can a small collection of permitted documents support accurate, source-cited answers using retrieval-augmented generation?

This website documents research, architecture decisions, experiments, and limitations for an individual RAG application.

## Current stage

**Plan — November 12, 2026**

The research site and project repository are being prepared. The working chatbot, retrieval pipeline, and hosted application have not yet been completed.

## Intended reader

A student or developer who wants to ask questions about a small collection of technical documents and inspect the supporting evidence.

## Proposed system

1. Import permitted documents and record their sources.
2. Extract, clean, and deduplicate content.
3. Split content into chunks with stable source identifiers.
4. Generate embeddings and store them in a vector database.
5. Embed a user question and retrieve relevant passages.
6. Ask a language model to answer using those passages.
7. Stream the answer to a Next.js chat interface.
8. Display source references and evaluate the result.

## Project links

- [GitHub repository](https://github.com/FangzeW1/is373-rag-prototype)
- [Technical research](/research)
- [Experiment plan](/experiment)

## Working Prototype Results

The local Next.js RAG experiment is now operational. It ingests five original TaskNest documents, generates local embeddings, searches a LanceDB vector database, and streams Groq responses with source references.

Five initial manual questions behaved as expected, including questions about information absent from the corpus.

See the [evaluation report](./evaluation) for implementation details, observations, and limitations.
