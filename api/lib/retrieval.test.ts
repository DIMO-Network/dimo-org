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
} from './retrieval.ts';

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

test('cosineSimilarity of a zero vector is 0, not NaN', () => {
  assert.equal(cosineSimilarity([0, 0], [1, 1]), 0);
  assert.equal(cosineSimilarity([0, 0], [0, 0]), 0);
});

test('searchDocs does not corrupt ranking when an entry has a zero-vector embedding', () => {
  const indexWithZeroVector: DocEntry[] = [
    ...FIXTURE_INDEX,
    {
      id: 'z',
      title: 'Doc Z',
      url: 'https://dimo.org/docs/z',
      content: 'Content Z',
      embedding: [0, 0],
    },
  ];
  const results = searchDocs(indexWithZeroVector, [1, 0], 4);
  assert.equal(results.length, 4);
  assert.equal(results[0].url, 'https://dimo.org/docs/a');
  assert.ok(results.every(r => r.title !== undefined));
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
