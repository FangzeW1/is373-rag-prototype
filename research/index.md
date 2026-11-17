# IS373 — Individual RAG App and Technical Research

**Review 1 · Plan** | [GitHub repository](https://github.com/FangzeW1/is373-rag-prototype)

**Research question:** How can a small collection of permitted TaskNest documents support source-grounded answers through retrieval-augmented generation?

This site is the **IS373 technical research record**. The IS218 portfolio is a separate project that may link here as supporting evidence.

## Research review index

- **Sources:** [Five permitted TaskNest Markdown documents](https://github.com/FangzeW1/is373-rag-prototype/tree/main/documents)
- **Comparisons and reasons:** [Vector vs. graph vs. hybrid retrieval; LanceDB selection](https://github.com/FangzeW1/is373-rag-prototype/blob/main/research/RAG-PLAN-EVIDENCE.md#compare-retrieval-alternatives-before-choosing)
- **Technical background and references:** [Research notes](/research)
- **Source-to-answer evidence:** [Authorization trace and evidence boundaries](https://github.com/FangzeW1/is373-rag-prototype/blob/main/research/RAG-PLAN-EVIDENCE.md#trace-a-permitted-source-to-an-answer)
- **Observed and planned evaluation:** [Evaluation record](/evaluation) · [Five-check review plan](https://github.com/FangzeW1/is373-rag-prototype/blob/main/research/RAG-PLAN-EVIDENCE.md#observable-stories-and-checks)
- **Architecture and next experiments:** [Experiment plan](/experiment)
- **Implementation:** [Ingestion](https://github.com/FangzeW1/is373-rag-prototype/blob/main/chat/scripts/ingest.mjs) · [Chat API](https://github.com/FangzeW1/is373-rag-prototype/blob/main/chat/src/app/api/chat/route.ts)

## Current status

**Implemented locally:** Next.js streaming chat; five TaskNest source documents; chunking and embeddings; LanceDB vector retrieval; Groq-backed response generation. This research site is hosted, but the chatbot itself runs locally.

**Observed:** Local questions about TaskNest's purpose and member/admin access, plus an unsupported greeting. Screenshots show responses and retrieved source filenames; they do not independently verify all returned chunk text.

**Not yet established:** A systematic comparison against keyword or graph retrieval, retrieval accuracy scores, public chatbot hosting, and comprehensive answer-faithfulness testing.

## Changed / Checked / Next

**Changed:** Implemented a local RAG experiment and documented technical decisions, evidence and limitations.

**Checked:** Reviewed source files and code paths; captured three local chatbot examples. [See the screenshot walkthrough](https://fangzew1.github.io/is218-portfolio-research/projects.html#rag-walkthrough) on the separate portfolio site.

**Next:** Record exact retrieved passages and scores; evaluate five labeled questions; compare retrieval baselines; prepare hosting for Build.

The goal at Plan is to make decisions and evidence reviewable, not to claim a finished hosted application.
