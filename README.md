# IS373 — Individual RAG App + Technical Research

**Review 1 · Plan · Individual deliverable 2 (IS373)**

This is an **IS373** research and application project. It is separate from my IS218 portfolio/career work, although that portfolio links to this project as supporting evidence.

**Research question:** How can five permitted TaskNest Markdown documents support answers that can be checked against retrieved source evidence?

## Start here — research review index

| What to review | Evidence |
| --- | --- |
| **Comparisons and decisions** | [Vector vs. graph vs. hybrid, LanceDB selection, chunking tradeoffs](research/RAG-PLAN-EVIDENCE.md#compare-retrieval-alternatives-before-choosing) |
| **Original permitted sources** | [Five TaskNest documents](documents/) |
| **Source-to-answer trace** | [Authorization / HTTP 403 example](research/RAG-PLAN-EVIDENCE.md#trace-a-permitted-source-to-an-answer) |
| **Observed vs. planned checks** | [Evaluation questions and evidence status](research/RAG-PLAN-EVIDENCE.md#observable-stories-and-checks) |
| **Technical research and references** | [Research notes](research/research.md) |
| **Implementation** | [Ingestion script](chat/scripts/ingest.mjs) · [Chat API](chat/src/app/api/chat/route.ts) · [Next.js interface](chat/src/app/page.tsx) |
| **Published research website** | [VitePress research site](https://fangzew1.github.io/is373-rag-prototype/) |
| **Local demonstration** | [Screenshot walkthrough on separate portfolio site](https://fangzew1.github.io/is218-portfolio-research/projects.html#rag-walkthrough) |

## Implemented local prototype

- **Source material:** Five project-owned Markdown files describing TaskNest overview, authentication, authorization, testing, and limitations.
- **Import:** Node.js script reads Markdown and divides text into 650-character chunks with 100-character overlap.
- **Embeddings:** `Xenova/all-MiniLM-L6-v2`, mean pooling and normalized 384-dimensional vectors.
- **Retrieval:** LanceDB stores text, source filenames, and vectors; the API requests the three nearest chunks.
- **Generation:** Next.js API sends retrieved passages to a Groq-hosted `openai/gpt-oss-20b` model and streams the response.
- **Interface:** Local Next.js chat; not publicly hosted at the Plan stage.

**Architecture:** Permitted Markdown → chunking → embeddings → LanceDB → question embedding and retrieval → context-grounded generation → streamed chat response.

## Changed / Checked / Next

**Changed:** Built the local RAG pipeline and chat interface; added research comparisons, source-evidence trace, and screenshot walkthrough. Linked research claims to the actual corpus and implementation.

**Checked:** Reviewed the checked-in ingestion and API code, inspected original authorization documentation, and ran three local chat examples: TaskNest overview, administrator access, and an unsupported greeting. Screenshots show answers and retrieved filenames. A retrieved filename is **not** by itself proof of answer correctness.

**Next:** Capture exact retrieved chunks and scores; test a question about a plausible but absent fact; compare keyword and vector retrieval; evaluate chunk sizes and citation support; plan persistent hosting for Build. Peer review and additional checks should be recorded only when completed.

## Run locally

From a checkout of this repository, in an Ubuntu/WSL terminal:

```bash
cd chat
npm install
node scripts/ingest.mjs
npm run dev
```

Create `chat/.env.local` containing `GROQ_API_KEY=your_key_here` before starting the server. **Never commit the real key.** Open the localhost address printed by Next.js (usually `http://localhost:3000`). The first embedding-model download can take time. The vector store is generated locally and not part of the hosted research website.

## Limitations and contribution

This is a small local learning prototype, not a deployed production service. Vector similarity can retrieve irrelevant passages; generated answers and source references require independent evaluation. The source documents are educational project notes, not third-party personal data. AI assistance was used for coding and documentation; implementation choices, source review, local testing, and interpretation of results remain the project owner's responsibility.

[Full research evidence, alternatives, and evaluation plan](research/RAG-PLAN-EVIDENCE.md)
