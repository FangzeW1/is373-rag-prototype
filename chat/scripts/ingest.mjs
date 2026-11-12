import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as lancedb from "@lancedb/lancedb";
import { pipeline } from "@huggingface/transformers";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const documentsDir = path.join(root, "documents");
const databaseDir = path.join(root, "rag-data");

function chunkText(text, size = 650, overlap = 100) {
  const chunks = [];
  let start = 0;

  while (start < text.length) {
    const end = Math.min(start + size, text.length);
    chunks.push(text.slice(start, end));

    if (end === text.length) break;
    start = end - overlap;
  }

  return chunks;
}

console.log("Loading embedding model (first run may download files)...");
const embedder = await pipeline(
  "feature-extraction",
  "Xenova/all-MiniLM-L6-v2"
);

const files = (await fs.readdir(documentsDir))
  .filter(name => name.endsWith(".md"))
  .sort();

const rows = [];

for (const filename of files) {
  const text = await fs.readFile(
    path.join(documentsDir, filename),
    "utf8"
  );

  const chunks = chunkText(text);

  for (let i = 0; i < chunks.length; i++) {
    const result = await embedder(chunks[i], {
      pooling: "mean",
      normalize: true
    });

    rows.push({
      id: `${filename}-${i}`,
      source: filename,
      text: chunks[i],
      vector: Array.from(result.data)
    });
  }

  console.log(`${filename}: ${chunks.length} chunks`);
}

await fs.mkdir(databaseDir, { recursive: true });

const db = await lancedb.connect(databaseDir);
const tables = await db.tableNames();

if (tables.includes("documents")) {
  await db.dropTable("documents");
}

await db.createTable("documents", rows);

console.log(`Stored ${rows.length} chunks in ${databaseDir}`);
console.log("Ingestion complete!");
