# IS373 — RAG Prototype and Technical Research

## 2. Individual RAG app + technical research

A research and experimental project exploring retrieval-augmented generation (RAG), vector and graph databases, content ingestion, chunking, embeddings, retrieval, and source-supported AI answers.

## Research question

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

Plan stage. Architecture and tools are proposed, not yet implemented or validated.

## Next steps

1. Research vector versus graph retrieval.
2. Choose permitted source documents.
3. Build and publish the VitePress research site.
4. Create a small streaming-chat experiment.
5. Implement retrieval and evaluate source-supported answers.
