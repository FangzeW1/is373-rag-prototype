# RAG Prototype Evaluation

## Implementation

The prototype uses five original Markdown summaries of the TaskNest project.

The ingestion script reads each document, divides it into chunks of up to 650 characters with 100 characters of overlap, generates normalized embeddings using `Xenova/all-MiniLM-L6-v2`, and stores the vectors and source metadata in a local LanceDB database.

The Next.js API embeds each user question using the same model, retrieves the three closest chunks by vector similarity, and supplies them as context to `openai/gpt-oss-20b` through Groq. The model response streams to the browser.

The initial corpus produced five chunks, one per document. Therefore, overlapping chunk boundaries were implemented but not meaningfully exercised by this dataset.

## Initial Manual Evaluation

| Question | Expected behavior | Observed result |
| --- | --- | --- |
| What happens when a TaskNest user logs out? | Explain session invalidation and cite authentication source | Passed |
| Can a regular member access the administrator API? | Explain HTTP 403 and cite authorization source | Passed |
| How was TaskNest tested on a narrow screen? | Mention approximately 390px viewport | Passed |
| Does TaskNest already store assignments and deadlines? | Avoid claiming unimplemented storage | Passed |
| How many paying customers does TaskNest have? | State that documents do not establish this | Passed |

These results were manually observed in the local browser on November 12, 2026. They are not automated test results.

## Interpretation

The experiment demonstrates a functioning ingestion, embedding, vector retrieval, and streaming answer-generation pipeline.

Five manually checked questions behaved as expected. This is encouraging but does not establish general reliability, retrieval accuracy, or hallucination resistance.

## Limitations

- Only five short, closely related source documents were tested.
- Each document generated one chunk, so chunk overlap was not meaningfully tested.
- No keyword-retrieval baseline has yet been implemented or measured.
- No graph retrieval was implemented.
- Retrieval relevance scores and source rankings were not evaluated systematically.
- The model's source citations are generated from supplied filenames rather than independently verified by the interface.
- The application runs locally and is not a hosted production service.

## Next Experiments

1. Compare vector retrieval with a keyword baseline on the same questions.
2. Add longer documents and compare chunk sizes and overlap.
3. Evaluate retrieval ranking separately from answer quality.
4. Test conflicting, irrelevant, and adversarial source documents.
5. Expand the corpus using properly attributed, permitted sources.
