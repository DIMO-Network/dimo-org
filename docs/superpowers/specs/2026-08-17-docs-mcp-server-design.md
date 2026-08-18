# DIMO Docs MCP Server — Design

## Goal

Expose the DIMO developer docs (`docs/`) through a remote MCP server with
embedding-based retrieval, so AI agents/clients can search and fetch doc content
directly instead of relying on static `llms-full.txt` dumps or web scraping.

## Architecture

Two new pieces added to the existing Docusaurus/Vercel project, alongside the
existing `scripts/generate-llms-full.mjs` build step:

1. **Build-time indexer** — `scripts/generate-mcp-index.mjs`, run in `prebuild`
   alongside (or after) the existing llms-full generation. Walks `docs/`, reuses
   the same clean/title/URL extraction logic as `generate-llms-full.mjs`, calls
   OpenAI's `text-embedding-3-small` once per doc, and writes
   `static/mcp-index.json`.
2. **MCP server** — `api/mcp.ts`, a Vercel Function using
   `@modelcontextprotocol/sdk` with the Streamable HTTP transport. Loads
   `mcp-index.json` on cold start and serves two tools with no authentication
   (docs are already public).

Deployment target: **remote HTTP MCP on Vercel**, alongside the existing static
site deployment — no separate hosting, no local install required for consumers.

## Components

### `scripts/generate-mcp-index.mjs`

- Walks `docs/**/*.{md,mdx}` (share/extract the `walk`, `clean`, `title`,
  `toUrl` helpers currently inline in `generate-llms-full.mjs` so both scripts
  stay in sync).
- One chunk per doc — embeds the whole cleaned page (42 docs total, no
  section-level chunking).
- Calls OpenAI's `text-embedding-3-small` per doc.
- Writes `static/mcp-index.json`:
  ```json
  [{ "id": "...", "title": "...", "url": "...", "content": "...", "embedding": [0.01, ...] }]
  ```
- Runs every build. No cross-build caching/diffing of unchanged docs — 42
  embedding calls is cheap and fast enough that the added complexity isn't worth
  it (YAGNI).

### `api/mcp.ts`

- Vercel Function (Node.js runtime, not Edge) using `@modelcontextprotocol/sdk`.
- `mcp-index.json` is bundled into the function via `vercel.json`'s
  `functions.includeFiles`, avoiding a runtime network hop to fetch it.
- Loads the index into memory once per cold start.
- Exposes two tools:
  - **`search_docs(query: string, top_k?: number = 5)`** — embeds `query` via
    the OpenAI API at request time, computes cosine similarity against the
    precomputed doc embeddings, returns the top-k matches as
    `{ title, url, snippet }[]`.
  - **`fetch_doc(url: string)`** — looks up a doc by URL and returns its full
    cleaned markdown content.
- No auth — matches the public nature of the docs content.

### Environment

- `OPENAI_API_KEY` required in two places:
  - Build time, for the indexer (`generate-mcp-index.mjs`).
  - Request time, for embedding incoming queries in `search_docs`.
- Same Vercel project env var covers both.

## Data Flow

```
docs/*.mdx
  -> generate-mcp-index.mjs (build)
  -> static/mcp-index.json
  -> bundled into api/mcp.ts via vercel.json includeFiles
  -> MCP client calls search_docs(query)
  -> embed query -> cosine similarity vs. precomputed vectors
  -> ranked results { title, url, snippet }
  -> (optional) fetch_doc(url) -> full markdown content
```

## Error Handling

- **Build time**: if `OPENAI_API_KEY` is missing, `generate-mcp-index.mjs` fails
  the build loudly rather than silently producing an empty/stale index —
  consistent with "never deploy broken."
- **Request time**: if the query-embedding API call fails, `search_docs`
  surfaces an MCP tool error rather than returning an empty result set silently.

## Testing

- **Index sanity check**: a small script (or assertion in the indexer itself)
  that the generated `mcp-index.json` has 42 entries, each with a non-empty
  `embedding` array of the expected dimensionality.
- **Retrieval smoke test**: run `search_docs` locally for a couple of known
  queries (e.g. "how do I get a vehicle JWT") and confirm the expected doc ranks
  first; run `fetch_doc` on that result and confirm the content matches the
  source doc.
- **End-to-end verification**: after deploying, connect an MCP client (e.g.
  Claude Desktop config pointed at the deployed URL, or
  `npx @modelcontextprotocol/inspector`) and confirm both tools work against the
  live endpoint.

## Out of Scope

- Section/heading-level chunking (revisit only if doc pages grow significantly
  larger or search precision proves inadequate at whole-page granularity).
- Authentication/rate limiting on the MCP endpoint.
- Cross-build embedding cache/diffing.
- A local stdio MCP server variant (remote HTTP only, per decision above).
