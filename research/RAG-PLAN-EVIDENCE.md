# RAG Plan: alternatives, source evidence, and evaluation

**Individual deliverable 2 — RAG app + technical research**  
**Stage:** Plan / local experiment. This page separates code inspection, observed screenshots, assumptions, and future checks.

## Research question and permitted corpus

Can a small set of project-owned TaskNest Markdown files support answers grounded in source text? The permitted corpus is the five Markdown files in [documents/](../documents/): overview, authentication, authorization, testing, and limitations. These are project documentation, not private user records or scraped third-party content. Their contents describe TaskNest's educational prototype and its observed tests; they do not establish a complete commercial task-management product.

## Compare retrieval alternatives before choosing

| Approach | Representation and retrieval | Advantage for TaskNest | Cost / limitation | Decision |
| --- | --- | --- | --- | --- |
| Vector RAG (LanceDB) | Chunk text, embed it, retrieve semantically similar chunks | Small unstructured Markdown corpus; tolerates wording differences | Similarity is not factual proof; may retrieve irrelevant chunks | **Selected for first experiment** |
| Graph retrieval | Extract entities such as Member, Admin, API and explicit relationships such as `Member → denied → Admin API` | Makes access-control relationships explicit and traversable | Requires entity/edge extraction, schema and verification; not implemented | Compare conceptually; defer |
| Hybrid vector + graph | Semantic retrieval plus explicit relationship traversal | Could combine relevant passages with multi-step relationship evidence | More components and evaluation work; unnecessary for first five-document prototype | Possible future experiment |

**Why LanceDB?** The current application already uses a local persistent LanceDB table and JavaScript/Next.js. It avoids operating a separate database service for this small corpus. This is a practical scope decision, **not** an experimental finding that LanceDB outperforms graph or hybrid retrieval. External comparison examples: [LanceDB vector/RAG examples](https://github.com/lancedb/vectordb-recipes) and [Kùzu + LanceDB graph/vector workshop](https://github.com/kuzudb/graph-rag-workshop). The latter is evidence that hybrid retrieval is feasible, not a benchmark on our TaskNest data.

## Import, chunking, embeddings, retrieval and generation

The [ingestion script](../chat/scripts/ingest.mjs) reads `documents/*.md` in filename order, splits each document into **650-character** chunks with **100-character** overlap, embeds each chunk using `Xenova/all-MiniLM-L6-v2` with mean pooling and normalization, and stores `id`, `source`, `text` and `vector` in a local LanceDB `documents` table. The embedding vectors are 384-dimensional. Re-running ingestion drops and rebuilds the table. There is no PDF parsing, web crawling, graph extraction, or deduplication implemented in this script.

The [API route](../chat/src/app/api/chat/route.ts) embeds a question with the same model, retrieves the **top three** vector matches, formats their source filenames and chunk text into a context string, and sends that context and the question to Groq's `openai/gpt-oss-20b` for a streamed response. The system instruction tells the model to answer only from the documents and to decline unsupported answers. **Important:** the checked-in route at the time of this review does not append a separate `Retrieved sources` line; local screenshots show that line, indicating local changes not yet represented in the repository. The repository code is evidence of implementation logic; the screenshots are evidence of local UI behavior.

**Chunking tradeoff:** 650 characters with 100 overlap is a simple starting point, not a tuned optimum. Overlap reduces the chance of losing context at boundaries but duplicates some text; character-based splitting can cut sentences or relationships. Compare smaller/larger chunks in a future retrieval evaluation.

## Trace a permitted source to an answer

**Question:** “can standard members access administrator tools?”

1. **Source fact:** [`03-authorization.md`](../documents/03-authorization.md) explicitly says members cannot access administrator pages or protected administrator APIs and that a direct member request should return **HTTP 403**. It also says server enforcement is required.
2. **Proposed representation / code-verified step:** the ingestion script reads this file, splits it into chunks, generates embedding vectors, and stores rows with `source: "03-authorization.md"`. Exact stored vectors and row IDs have **not** been captured as review evidence.
3. **Code-verified retrieval path:** the API embeds the question and asks LanceDB for three nearest chunks. It sends those chunks to the language model as source-labeled context.
4. **Observed local result:** the November 17 chatbot screenshot answers that members cannot access administrator pages/APIs and should receive HTTP 403; its displayed retrieved filenames include `03-authorization.md`, `05-limitations.md`, and `02-authentication.md`. The screenshot is linked from the [portfolio walkthrough](https://fangzew1.github.io/is218-portfolio-research/projects.html#rag-walkthrough).
5. **Evidence boundary:** a displayed filename is not proof of an exact retrieved passage or independent verification of the answer. The source text above supports the claim; a future trace should log matched chunk IDs/text and compare the answer to those passages.

## Observable stories and checks

| Story / question | Expected behavior | Status and evidence |
| --- | --- | --- |
| Ask “what is this site for?” | Describe TaskNest as an educational prototype; avoid claiming a finished commercial app | **Observed locally**: screenshot in [walkthrough](https://fangzew1.github.io/is218-portfolio-research/projects.html#rag-walkthrough); source candidates include `01-overview.md` |
| Ask whether standard members can access admin tools | Explain server-side denial / HTTP 403 | **Observed locally**: screenshot; source text in [authorization](../documents/03-authorization.md) supports the claim |
| Ask “hi” | Do not invent a document-grounded factual answer | **Observed locally**: chatbot responded “The provided documents do not establish that.” This tests a greeting, not a comprehensive out-of-domain benchmark |
| Ask a plausible but absent fact, such as “What date will TaskNest launch commercially?” | State that the documents do not establish the date | **Planned**: record answer and retrieved chunks |
| Deliberately compare a question against retrieved text | Capture top-three chunk IDs, scores, passages, and whether answer claims are supported | **Planned**: implement a small evaluation dataset and trace |

## Constraints, risks and next steps

- **Hosting:** chatbot runs locally in Next.js; GitHub Pages hosts research and screenshots, not the server/API. A hosted app is deferred to Build.
- **Resources:** embedding model may download on first run; local vector store uses disk space; generation requires an external Groq API key and network access. Do not commit the key.
- **Quality:** top-three nearest matches can be irrelevant; the code has no explicit relevance threshold or citation verification. Displayed “Retrieved sources” are retrieval metadata, not independently validated citations.
- **Planned:** log exact retrieved chunks safely; create five or more labeled evaluation questions; compare chunk sizes and vector vs keyword retrieval; record latency/error tests; review peer feedback and document decisions.

## Contribution and verification note

AI assistance helped with implementation and documentation. The project owner supplied the TaskNest scope, chose the educational corpus and local prototype direction, ran the chatbot, captured screenshots, and reviewed observed answers. Code paths and document claims above were checked against repository files; any new evaluation results must be recorded only after tests are run.
