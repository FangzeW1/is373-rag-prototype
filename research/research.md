# Technical Research: RAG, Vectors, and Graphs

**Research date:** November 12, 2026  
**Status:** Plan-stage research; implementation and evaluation pending.

## Research question

How can a small collection of permitted documents support accurate answers with inspectable source evidence?

## What is RAG?

Retrieval-augmented generation (RAG) combines information retrieval with a language model. Instead of relying only on information learned during training, the application retrieves relevant passages and provides them as context for generating an answer.

Retrieval does not guarantee accuracy. The application must show the retrieved evidence and evaluate whether the answer is actually supported.

## Vector databases

A vector database stores embeddings, which are numerical representations of text or other data.

**Proposed process:**
1. Split documents into chunks.
2. Generate an embedding for each chunk.
3. Store embeddings with source metadata.
4. Embed the user's question using a compatible embedding model.
5. Retrieve similar chunks.
6. Give relevant passages to the generation model.

**Strength:** Can retrieve semantically similar wording, even without exact keyword matches.

**Limitation:** Similarity does not guarantee factual relevance or correct relationships.

## Graph databases

A graph database represents entities as nodes and relationships as edges.

Example:

- TaskNest → uses → SQLite
- SQLite → provides → persistent storage
- TaskNest → requires → authenticated access

These would be proposed facts derived from specific source passages, not automatically trustworthy facts.

**Strength:** Explicit relationships can help answer multi-entity questions.

**Limitation:** Entity extraction, relationship modeling, and evidence maintenance add complexity.

## Architecture decision

**Proposed choice: vector retrieval for the first prototype.**

The initial corpus is small and consists mainly of short technical documents. Vector retrieval is a practical first experiment for paraphrased questions. A graph database is not necessary for the initial implementation.

Graph retrieval remains an alternative worth testing if relationship-based questions perform poorly.

This is a design hypothesis, not an experimentally validated conclusion.

## Keyword baseline

A simple keyword search will provide a comparison against vector retrieval.

We will compare whether each method retrieves the expected evidence for exact-term, paraphrased, and relationship questions.

## ETL and content import

ETL means extract, transform, and load.

1. Extract text from permitted source documents.
2. Clean whitespace and unwanted formatting.
3. Normalize document identifiers.
4. Deduplicate repeated content.
5. Split content into chunks.
6. Store chunks and source metadata.
7. Generate and store embeddings.

Each source will have a stable ID, origin, retrieval date, version or content hash, and permission status. Reimporting unchanged content should not create duplicates.

## Chunking

**Option A:** Fixed-size chunks with overlap.

**Option B:** Paragraph- or heading-aware chunks.

We will start with paragraph-aware chunks because they may preserve the meaning of short technical explanations. We'll compare their retrieval results against fixed-size chunks.

Metadata should preserve document ID, heading, chunk ID, and source location.

## Embeddings

An embedding model converts text into a vector.

The same compatible embedding model must be used for both stored chunks and user questions.

The specific model, dimensions, version, and configuration will be recorded when selected. No embedding model has been tested yet.

## Answer generation

The generation model will receive the question and retrieved passages, with instructions to answer only when the supplied evidence supports the response.

The interface should display source references and acknowledge insufficient evidence rather than inventing an answer.

## Security and operations

- Use only permitted, non-sensitive documents.
- Keep API credentials in server-side environment variables.
- Restrict document imports to authorized users.
- Keep database services private.
- Apply public request limits.
- Record model and hosting costs.
- Avoid treating retrieved documents as trusted instructions.

## Primary references

- [Original RAG paper — Lewis et al. (2020)](https://arxiv.org/abs/2005.11401)
- [Chroma documentation](https://docs.trychroma.com/)
- [Neo4j documentation](https://neo4j.com/docs/)
- [Sentence Transformers documentation](https://sbert.net/)
- [OWASP: LLM Prompt Injection Prevention](https://cheatsheetseries.owasp.org/cheatsheets/LLM_Prompt_Injection_Prevention_Cheat_Sheet.html)

These references are starting points. Specific implementation claims and compatibility must be checked against the selected versions.
