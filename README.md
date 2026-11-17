# IS373 — RAG Prototype and Technical Research

## 2. Individual RAG app + technical research

A research and experimental project exploring retrieval-augmented generation (RAG), vector and graph databases, content ingestion, chunking, embeddings, retrieval, and source-supported AI answers.

**Review index:** [RAG Plan: alternatives, source evidence and evaluation](research/RAG-PLAN-EVIDENCE.md) · [TaskNest source documents](documents/) · [Chat ingestion](chat/scripts/ingest.mjs) · [Chat API](chat/src/app/api/chat/route.ts) · [Screenshot walkthrough](https://fangzew1.github.io/is218-portfolio-research/projects.html#rag-walkthrough)\n\n## Research question

How can a small collection of permitted documents support accurate, source-cited answers through retrieval-augmented generation?

## Proposed approach

- Next.js frontend with streaming chat responses
- Small corpus of approximately five permitted documents
- Content extraction, cleaning, deduplication and chunking
- Vector retrieval using real embeddings and a persistent vector store
- AI model API for answer generation
- Source references and retrieval traces
- Five evaluation questions, including an unanswerable question
- VitePress site documenting research and experiments

## Current status

Local Next.js RAG prototype implemented and exercised with three documented UI examples. The GitHub API route may lag uncommitted local improvements; see the linked research evidence page for verified code paths, observed screenshots and planned evaluation.

## Next steps

1. Research vector versus graph retrieval.
2. Choose permitted source documents.
3. Build and publish the VitePress research site.
4. Create a small streaming-chat experiment.
5. Implement retrieval and evaluate source-supported answers.
