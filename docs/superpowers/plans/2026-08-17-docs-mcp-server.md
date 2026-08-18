# DIMO Docs MCP Server Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use
> superpowers:subagent-driven-development (recommended) or
> superpowers:executing-plans to implement this plan task-by-task. Steps use
> checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stand up a remote HTTP MCP server on Vercel that exposes the DIMO docs
corpus via embedding-based `search_docs` / `fetch_doc` tools.

**Architecture:** A build-time indexer embeds every doc page with OpenAI's
`text-embedding-3-small` and writes a static JSON vector index; a Vercel
Function (`api/mcp.ts`) using the MCP TypeScript SDK's Streamable HTTP transport
loads that index and serves the two tools, embedding incoming queries on demand
and ranking by cosine similarity.

**Tech Stack:** Node.js 24 (native TS execution + `node:test`),
`@modelcontextprotocol/sdk`, `openai` SDK, `zod`, Vercel Functions.

**Spec:** `docs/superpowers/specs/2026-08-17-docs-mcp-server-design.md`

## Global Constraints

- Node >=24 (per `package.json` engines) — use native `node --test` for all new
  tests, no test framework dependency.
- Remote HTTP MCP only, deployed as a Vercel Function — no local stdio server
  variant.
- No authentication on the MCP endpoint — docs are public.
- One embedding per doc (whole cleaned page) — no section/heading-level
  chunking.
- Embeddings via OpenAI `text-embedding-3-small`, called both at build time
  (indexing) and request time (query embedding).
- `OPENAI_API_KEY` is required in both the build environment and the Vercel
  Function's runtime environment.
- The indexer must fail the build loudly if `OPENAI_API_KEY` is missing — never
  write an empty/stale index silently.
- No cross-build embedding cache — re-embed all docs on every build (42 docs is
  cheap; don't add caching complexity).
- Confirm with James before running any deploy step (`vercel --prod`, pushing to
  a branch that triggers deploy, or setting production env vars).

---

## Task 1: Extract shared docs-corpus helpers into a library module

**Files:**

- Create: `scripts/lib/docs-corpus.mjs`
- Create: `scripts/lib/docs-corpus.test.mjs`
- Modify: `scripts/generate-llms-full.mjs`

**Interfaces:**

- Produces (used by Task 1's refactor and by Task 2's indexer):
  - `SITE: string` — `'https://dimo.org'`
  - `walk(dir: string): string[]` — recursively collects `.md`/`.mdx` file paths
    under `dir`
  - `toUrl(file: string, docsDir: string): string` — converts a doc file path to
    its canonical `https://dimo.org/docs/...` URL, stripping numeric ordering
    prefixes and `index` segments
  - `clean(raw: string): string` — strips frontmatter, `import`/`export` lines,
    and JSX/HTML tag lines from raw MDX
  - `title(raw: string, url: string): string` — extracts a title from
    frontmatter, falling back to the first `#` heading, falling back to the last
    URL segment

- [ ] **Step 1: Write the failing test**

```js
// scripts/lib/docs-corpus.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { walk, toUrl, clean, title, SITE } from './docs-corpus.mjs';

function makeFixture() {
  const dir = mkdtempSync(join(tmpdir(), 'docs-corpus-'));
  mkdirSync(join(dir, '3_api-references'));
  writeFileSync(
    join(dir, '3_api-references', '0_agents-api.mdx'),
    '---\ntitle: Agents API\n---\nimport Foo from "./Foo";\n\n# Agents API\n\nSome body text.\n'
  );
  writeFileSync(
    join(dir, '1_getting-started.md'),
    '# Getting Started\n\nNo frontmatter here.\n'
  );
  return dir;
}

test('walk finds all md/mdx files recursively', () => {
  const dir = makeFixture();
  try {
    const files = walk(dir)
      .map(f => f.replace(dir, ''))
      .sort();
    assert.deepEqual(files, [
      '/1_getting-started.md',
      '/3_api-references/0_agents-api.mdx',
    ]);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('toUrl strips numeric prefixes and extension', () => {
  const dir = makeFixture();
  try {
    const file = join(dir, '3_api-references', '0_agents-api.mdx');
    assert.equal(toUrl(file, dir), `${SITE}/docs/api-references/agents-api`);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('clean strips frontmatter and import lines', () => {
  const raw = '---\ntitle: X\n---\nimport Foo from "./Foo";\n\n# X\n\nBody.\n';
  const cleaned = clean(raw);
  assert.ok(!cleaned.includes('---'));
  assert.ok(!cleaned.includes('import Foo'));
  assert.ok(cleaned.includes('Body.'));
});

test('title prefers frontmatter, falls back to heading', () => {
  const withFm = '---\ntitle: Agents API\n---\n# Something Else\n';
  assert.equal(title(withFm, `${SITE}/docs/x`), 'Agents API');

  const withoutFm = '# Getting Started\n\nBody.\n';
  assert.equal(
    title(withoutFm, `${SITE}/docs/getting-started`),
    'Getting Started'
  );
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test scripts/lib/docs-corpus.test.mjs` Expected: FAIL —
`docs-corpus.mjs` does not exist yet (module not found).

- [ ] **Step 3: Write the library module**

```js
// scripts/lib/docs-corpus.mjs
import { readdirSync, statSync } from 'node:fs';
import { join, relative, extname } from 'node:path';

// Canonical host is the apex domain; www.dimo.org redirects to it.
export const SITE = 'https://dimo.org';

/** Recursively collect .md / .mdx file paths under dir. */
export function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      out.push(...walk(full));
    } else if (['.md', '.mdx'].includes(extname(entry))) {
      out.push(full);
    }
  }
  return out;
}

/** docs/3_api-references/0_agents-api.mdx -> https://dimo.org/docs/api-references/agents-api */
export function toUrl(file, docsDir) {
  let rel = relative(docsDir, file).replace(/\\/g, '/');
  rel = rel.replace(/\.mdx?$/, '');
  const segs = rel
    .split('/')
    .map(s => s.replace(/^\d+[_-]/, '')) // strip numeric ordering prefix
    .filter(Boolean);
  if (segs[segs.length - 1] === 'index') segs.pop();
  return `${SITE}/docs/${segs.join('/')}`.replace(/\/$/, '');
}

/** Strip front matter, import/export lines, and obvious JSX component lines. */
export function clean(raw) {
  let body = raw.replace(/^---\n[\s\S]*?\n---\n?/, '');
  return body
    .split('\n')
    .filter(line => !/^\s*(import|export)\s/.test(line))
    .filter(line => {
      const t = line.trim();
      if (/^<https?:/i.test(t)) return true; // keep markdown autolinks
      if (/^<\/?[A-Za-z][\w.-]*/.test(t)) return false; // drop JSX/HTML tag lines
      if (/^\{\/\*[\s\S]*\*\/\}$/.test(t)) return false; // drop {/* comments */}
      return true;
    })
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export function title(raw, url) {
  const fm = raw.match(/^---\n([\s\S]*?)\n---/);
  if (fm) {
    const t = fm[1].match(/^title:\s*["']?(.+?)["']?\s*$/m);
    if (t) return t[1];
  }
  const h1 = raw.match(/^#\s+(.+)$/m);
  if (h1) return h1[1];
  return url.split('/').pop();
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test scripts/lib/docs-corpus.test.mjs` Expected: PASS (4 tests)

- [ ] **Step 5: Refactor `generate-llms-full.mjs` to use the shared module**

```js
// scripts/generate-llms-full.mjs
#!/usr/bin/env node
// Generates static/llms-full.txt: the full DIMO docs corpus as plain markdown,
// for AI crawlers / LLM context. Runs before `docusaurus build`.

import { readFileSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { walk, clean, title, toUrl, SITE } from './lib/docs-corpus.mjs';

const ROOT = process.cwd();
const DOCS_DIR = join(ROOT, 'docs');
const OUT = join(ROOT, 'static', 'llms-full.txt');

const files = walk(DOCS_DIR).sort();
const sections = files.map(f => {
  const raw = readFileSync(f, 'utf8');
  const url = toUrl(f, DOCS_DIR);
  return `# ${title(raw, url)}\n\nURL: ${url}\n\n${clean(raw)}`;
});

const header =
  `# DIMO Build — Full Documentation Corpus\n\n` +
  `> Concatenated developer documentation for the DIMO vehicle data platform.\n` +
  `> ${files.length} documents. Source: ${SITE}/docs\n` +
  `> Usage: public developer docs — AI training, search, and inference permitted (see the Content-Signal HTTP header). Attribution: DIMO (${SITE}).\n`;

writeFileSync(OUT, `${header}\n${sections.join('\n\n---\n\n')}\n`, 'utf8');
console.log(`[llms-full] wrote ${files.length} docs -> ${relative(ROOT, OUT)}`);
```

- [ ] **Step 6: Verify the refactor produces byte-identical output**

Run:

```bash
cp static/llms-full.txt /tmp/llms-full.before.txt
node scripts/generate-llms-full.mjs
diff /tmp/llms-full.before.txt static/llms-full.txt
```

Expected: no diff output (files identical).

- [ ] **Step 7: Add a `test` script to package.json**

Modify `package.json` scripts block to add (after `"prebuild"`):

```json
"test": "node --test scripts api",
```

- [ ] **Step 8: Commit**

```bash
git add scripts/lib/docs-corpus.mjs scripts/lib/docs-corpus.test.mjs scripts/generate-llms-full.mjs package.json
git commit -m "refactor: extract docs-corpus helpers into shared lib module"
```

---

## Task 2: Build-time embedding indexer

**Files:**

- Create: `scripts/generate-mcp-index.mjs`
- Create: `scripts/generate-mcp-index.test.mjs`
- Modify: `package.json` (add `openai` dependency, chain indexer into
  `prebuild`)

**Interfaces:**

- Consumes: `walk`, `toUrl`, `clean`, `title` from `scripts/lib/docs-corpus.mjs`
  (Task 1)
- Produces (used by Task 4's `api/lib/retrieval.ts` and Task 5's `api/mcp.ts`):
  - `static/mcp-index.json` — JSON array of:
    ```ts
    { id: string; title: string; url: string; content: string; embedding: number[] }
    ```
  - `buildIndex({ docsDir: string, embed: (text: string) => Promise<number[]> }): Promise<DocEntry[]>`
    — exported for testing with a fake `embed` function

- [ ] **Step 1: Install the OpenAI SDK**

```bash
npm install openai
```

- [ ] **Step 2: Write the failing test**

```js
// scripts/generate-mcp-index.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { buildIndex } from './generate-mcp-index.mjs';

function makeFixture() {
  const dir = mkdtempSync(join(tmpdir(), 'mcp-index-fixture-'));
  writeFileSync(
    join(dir, '1_getting-started.md'),
    '# Getting Started\n\nSetup instructions.\n'
  );
  mkdirSync(join(dir, '3_api-references'));
  writeFileSync(
    join(dir, '3_api-references', '0_agents-api.mdx'),
    '---\ntitle: Agents API\n---\n# Agents API\n\nEndpoint docs.\n'
  );
  return dir;
}

test('buildIndex produces one entry per doc with an embedding for each', async () => {
  const dir = makeFixture();
  try {
    const fakeEmbed = async text => [text.length, 0, 1];
    const entries = await buildIndex({ docsDir: dir, embed: fakeEmbed });

    assert.equal(entries.length, 2);
    for (const entry of entries) {
      assert.equal(typeof entry.id, 'string');
      assert.equal(typeof entry.title, 'string');
      assert.ok(entry.url.startsWith('https://dimo.org/docs/'));
      assert.equal(typeof entry.content, 'string');
      assert.ok(Array.isArray(entry.embedding));
      assert.equal(entry.embedding.length, 3);
    }

    const agentsEntry = entries.find(e => e.title === 'Agents API');
    assert.ok(agentsEntry, 'expected an entry titled "Agents API"');
    assert.ok(agentsEntry.content.includes('Endpoint docs.'));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `node --test scripts/generate-mcp-index.test.mjs` Expected: FAIL —
`generate-mcp-index.mjs` does not exist / `buildIndex` not exported.

- [ ] **Step 4: Write the indexer**

```js
// scripts/generate-mcp-index.mjs
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
```

- [ ] **Step 5: Run test to verify it passes**

Run: `node --test scripts/generate-mcp-index.test.mjs` Expected: PASS

- [ ] **Step 6: Chain the indexer into `prebuild`**

Modify `package.json`:

```json
"prebuild": "node scripts/generate-llms-full.mjs && node scripts/generate-mcp-index.mjs",
```

- [ ] **Step 7: Commit**

```bash
git add scripts/generate-mcp-index.mjs scripts/generate-mcp-index.test.mjs package.json package-lock.json
git commit -m "feat: add build-time embedding indexer for docs MCP server"
```

---

## Task 3: Retrieval logic (cosine similarity search + doc lookup)

**Files:**

- Create: `api/lib/retrieval.ts`
- Create: `api/lib/retrieval.test.ts`

**Interfaces:**

- Consumes: `static/mcp-index.json` shape produced by Task 2
  (`{ id, title, url, content, embedding }[]`)
- Produces (used by Task 4's `api/mcp.ts`):
  - `interface DocEntry { id: string; title: string; url: string; content: string; embedding: number[] }`
  - `interface SearchResult { title: string; url: string; snippet: string }`
  - `loadIndex(jsonPath: string): DocEntry[]`
  - `cosineSimilarity(a: number[], b: number[]): number`
  - `searchDocs(index: DocEntry[], queryEmbedding: number[], topK?: number): SearchResult[]`
    (default `topK = 5`)
  - `fetchDoc(index: DocEntry[], url: string): string | null`

- [ ] **Step 1: Write the failing test**

```ts
// api/lib/retrieval.test.ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import {
  cosineSimilarity,
  loadIndex,
  searchDocs,
  fetchDoc,
  type DocEntry,
} from './retrieval';

const FIXTURE_INDEX: DocEntry[] = [
  {
    id: 'a',
    title: 'Doc A',
    url: 'https://dimo.org/docs/a',
    content: 'Content A',
    embedding: [1, 0],
  },
  {
    id: 'b',
    title: 'Doc B',
    url: 'https://dimo.org/docs/b',
    content: 'Content B',
    embedding: [0, 1],
  },
  {
    id: 'c',
    title: 'Doc C',
    url: 'https://dimo.org/docs/c',
    content: 'Content C',
    embedding: [1, 1],
  },
];

test('cosineSimilarity of identical vectors is 1', () => {
  assert.equal(cosineSimilarity([1, 0], [1, 0]), 1);
});

test('cosineSimilarity of orthogonal vectors is 0', () => {
  assert.equal(cosineSimilarity([1, 0], [0, 1]), 0);
});

test('searchDocs ranks the closest doc first', () => {
  const results = searchDocs(FIXTURE_INDEX, [1, 0], 2);
  assert.equal(results.length, 2);
  assert.equal(results[0].url, 'https://dimo.org/docs/a');
  assert.equal(results[0].title, 'Doc A');
  assert.ok(results[0].snippet.includes('Content A'));
});

test('fetchDoc returns content for a known URL and null for unknown', () => {
  assert.equal(fetchDoc(FIXTURE_INDEX, 'https://dimo.org/docs/b'), 'Content B');
  assert.equal(fetchDoc(FIXTURE_INDEX, 'https://dimo.org/docs/nope'), null);
});

test('loadIndex reads and parses a JSON index file from disk', () => {
  const dir = mkdtempSync(join(tmpdir(), 'retrieval-fixture-'));
  const path = join(dir, 'mcp-index.json');
  try {
    writeFileSync(path, JSON.stringify(FIXTURE_INDEX));
    const loaded = loadIndex(path);
    assert.deepEqual(loaded, FIXTURE_INDEX);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test api/lib/retrieval.test.ts` Expected: FAIL — `./retrieval`
module does not exist.

- [ ] **Step 3: Write the retrieval module**

```ts
// api/lib/retrieval.ts
import { readFileSync } from 'node:fs';

export interface DocEntry {
  id: string;
  title: string;
  url: string;
  content: string;
  embedding: number[];
}

export interface SearchResult {
  title: string;
  url: string;
  snippet: string;
}

const SNIPPET_LENGTH = 280;

export function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

export function loadIndex(jsonPath: string): DocEntry[] {
  const raw = readFileSync(jsonPath, 'utf8');
  return JSON.parse(raw) as DocEntry[];
}

export function searchDocs(
  index: DocEntry[],
  queryEmbedding: number[],
  topK = 5
): SearchResult[] {
  return index
    .map(doc => ({
      doc,
      score: cosineSimilarity(doc.embedding, queryEmbedding),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map(({ doc }) => ({
      title: doc.title,
      url: doc.url,
      snippet:
        doc.content.length > SNIPPET_LENGTH
          ? `${doc.content.slice(0, SNIPPET_LENGTH).trim()}…`
          : doc.content,
    }));
}

export function fetchDoc(index: DocEntry[], url: string): string | null {
  const doc = index.find(d => d.url === url);
  return doc ? doc.content : null;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test api/lib/retrieval.test.ts` Expected: PASS (5 tests)

- [ ] **Step 5: Commit**

```bash
git add api/lib/retrieval.ts api/lib/retrieval.test.ts
git commit -m "feat: add retrieval module for docs MCP server"
```

---

## Task 4: MCP server Vercel Function

**Files:**

- Create: `api/mcp.ts`
- Modify: `vercel.json` (bundle `static/mcp-index.json` into the function)
- Modify: `package.json` (add `@modelcontextprotocol/sdk` and `zod`
  dependencies)

**Interfaces:**

- Consumes: `loadIndex`, `searchDocs`, `fetchDoc`, `DocEntry` from
  `api/lib/retrieval.ts` (Task 3)
- Produces: the deployed `/api/mcp` endpoint (verified manually — see Step 6/7)

- [ ] **Step 1: Install dependencies**

```bash
npm install @modelcontextprotocol/sdk zod
```

- [ ] **Step 2: Write the Vercel Function**

```ts
// api/mcp.ts
import type { IncomingMessage, ServerResponse } from 'node:http';
import { join } from 'node:path';
import OpenAI from 'openai';
import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import {
  loadIndex,
  searchDocs,
  fetchDoc,
  type DocEntry,
} from './lib/retrieval';

const EMBEDDING_MODEL = 'text-embedding-3-small';
const INDEX_PATH = join(process.cwd(), 'static', 'mcp-index.json');

let cachedIndex: DocEntry[] | null = null;
function getIndex(): DocEntry[] {
  if (!cachedIndex) {
    cachedIndex = loadIndex(INDEX_PATH);
  }
  return cachedIndex;
}

function getOpenAiClient(): OpenAI {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not set');
  }
  return new OpenAI({ apiKey });
}

function buildServer(): McpServer {
  const server = new McpServer({ name: 'dimo-docs', version: '1.0.0' });

  server.registerTool(
    'search_docs',
    {
      title: 'Search DIMO docs',
      description:
        'Search the DIMO developer documentation and return the most relevant pages, ranked by relevance.',
      inputSchema: {
        query: z.string().describe('Natural-language search query'),
        top_k: z
          .number()
          .int()
          .min(1)
          .max(20)
          .optional()
          .describe('Number of results to return (default 5)'),
      },
    },
    async ({ query, top_k }) => {
      try {
        const client = getOpenAiClient();
        const embeddingRes = await client.embeddings.create({
          model: EMBEDDING_MODEL,
          input: query,
        });
        const queryEmbedding = embeddingRes.data[0].embedding;
        const results = searchDocs(getIndex(), queryEmbedding, top_k ?? 5);
        return {
          content: [
            { type: 'text' as const, text: JSON.stringify(results, null, 2) },
          ],
        };
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        return {
          content: [
            { type: 'text' as const, text: `search_docs failed: ${message}` },
          ],
          isError: true,
        };
      }
    }
  );

  server.registerTool(
    'fetch_doc',
    {
      title: 'Fetch a DIMO doc',
      description: 'Fetch the full markdown content of a DIMO doc by its URL.',
      inputSchema: {
        url: z.string().describe('The doc URL, as returned by search_docs'),
      },
    },
    async ({ url }) => {
      const content = fetchDoc(getIndex(), url);
      if (!content) {
        return {
          content: [
            { type: 'text' as const, text: `No doc found for URL: ${url}` },
          ],
          isError: true,
        };
      }
      return { content: [{ type: 'text' as const, text: content }] };
    }
  );

  return server;
}

export default async function handler(
  req: IncomingMessage & { body?: unknown },
  res: ServerResponse
) {
  const server = buildServer();
  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
  });

  res.on('close', () => {
    transport.close();
    server.close();
  });

  await server.connect(transport);
  await transport.handleRequest(req, res, req.body);
}
```

> **Note for the implementer:** the MCP SDK's public API shifts between
> versions. After `npm install`, check
> `node_modules/@modelcontextprotocol/sdk/dist/esm/server/mcp.d.ts` and
> `.../streamableHttp.d.ts` to confirm `registerTool`'s signature and
> `StreamableHTTPServerTransport`'s constructor options match what's used above,
> and adjust if the installed version differs.

- [ ] **Step 3: Bundle the index file into the function**

Modify `vercel.json` — add a top-level `functions` key alongside the existing
`headers` array:

```json
{
  "cleanUrls": true,
  "trailingSlash": false,
  "functions": {
    "api/mcp.ts": {
      "includeFiles": "static/mcp-index.json"
    }
  },
  "headers": [
    ...
  ]
}
```

- [ ] **Step 4: Typecheck**

Run: `npm run typecheck` Expected: no errors. If the SDK's types don't match the
note in Step 2, fix `api/mcp.ts` to match the installed version's actual types.

- [ ] **Step 5: Generate a real index locally**

This requires an OpenAI API key (ask James for one if you don't have it, or use
his if working in his environment):

```bash
OPENAI_API_KEY=sk-... node scripts/generate-mcp-index.mjs
```

Expected: `[mcp-index] wrote 42 docs -> static/mcp-index.json`

- [ ] **Step 6: Smoke-test the function locally**

```bash
OPENAI_API_KEY=sk-... npx vercel dev
```

In another terminal, use the MCP inspector against the local server:

```bash
npx @modelcontextprotocol/inspector
```

Point it at `http://localhost:3000/api/mcp`, call `search_docs` with a query
like `"how do I get a vehicle JWT"`, and confirm a relevant doc ranks first.
Call `fetch_doc` with that result's URL and confirm the full content comes back.

- [ ] **Step 7: Commit**

```bash
git add api/mcp.ts vercel.json package.json package-lock.json
git commit -m "feat: add MCP server Vercel Function for docs search/fetch"
```

---

## Task 5: Deploy and verify end-to-end (checkpoint — confirm with James first)

**Files:** none (deployment/config only)

- [ ] **Step 1: Set `OPENAI_API_KEY` in Vercel's project environment variables**

This is a dashboard/CLI action against shared infrastructure — confirm with
James before doing this, then either add it via the Vercel dashboard or:

```bash
vercel env add OPENAI_API_KEY
```

Add it for both Preview and Production environments.

- [ ] **Step 2: Confirm with James, then deploy a preview**

```bash
vercel
```

(Do not deploy to production without an explicit go-ahead per Global
Constraints.)

- [ ] **Step 3: Verify the preview build generated the index**

Check the preview deployment's build logs for the line:

```
[mcp-index] wrote 42 docs -> static/mcp-index.json
```

- [ ] **Step 4: Verify the live endpoint with the MCP inspector**

```bash
npx @modelcontextprotocol/inspector
```

Point it at `https://<preview-url>/api/mcp`. Run `search_docs` for a couple of
known queries and `fetch_doc` on a returned result. Confirm both tools respond
correctly against the deployed function.

- [ ] **Step 5: Report results to James**

Summarize: preview URL, confirmation that both tools work, and ask whether to
promote to production.
