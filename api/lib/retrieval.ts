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
  topK = 5,
): SearchResult[] {
  return index
    .map(doc => ({ doc, score: cosineSimilarity(doc.embedding, queryEmbedding) }))
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
