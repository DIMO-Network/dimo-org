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
        console.error('[search_docs] failed:', err);
        return {
          content: [
            {
              type: 'text' as const,
              text: 'search_docs failed — see server logs for details',
            },
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
