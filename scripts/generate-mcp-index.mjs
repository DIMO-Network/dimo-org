#!/usr/bin/env node
// Generates static/mcp-index.json: one OpenAI embedding per doc page, used
// by api/mcp.ts to serve search_docs/fetch_doc over the DIMO docs corpus.
// Runs in `prebuild`, after generate-llms-full.mjs.

import { readFileSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { walk, clean, title, toUrl } from './lib/docs-corpus.mjs';

const ROOT = process.cwd();
const DOCS_DIR = join(ROOT, 'docs');
const OUT = join(ROOT, 'static', 'mcp-index.json');
const EMBEDDING_MODEL = 'text-embedding-3-small';

/**
 * Build the doc index. `embed` is injected so this is testable without
 * network access or an API key.
 */
export async function buildIndex({ docsDir, embed }) {
  const files = walk(docsDir).sort();
  const entries = [];
  for (const file of files) {
    const raw = readFileSync(file, 'utf8');
    const url = toUrl(file, docsDir);
    const content = clean(raw);
    const embedding = await embed(content);
    entries.push({
      id: relative(docsDir, file),
      title: title(raw, url),
      url,
      content,
      embedding,
    });
  }
  return entries;
}

async function main() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error('[mcp-index] OPENAI_API_KEY is required to generate embeddings.');
    process.exit(1);
  }

  const { default: OpenAI } = await import('openai');
  const client = new OpenAI({ apiKey });
  const embed = async text => {
    const res = await client.embeddings.create({ model: EMBEDDING_MODEL, input: text });
    return res.data[0].embedding;
  };

  const entries = await buildIndex({ docsDir: DOCS_DIR, embed });
  writeFileSync(OUT, JSON.stringify(entries), 'utf8');
  console.log(`[mcp-index] wrote ${entries.length} docs -> ${relative(ROOT, OUT)}`);
}

// Only run when executed directly (not when imported by tests).
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
