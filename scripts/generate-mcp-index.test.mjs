import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { buildIndex } from './generate-mcp-index.mjs';

function makeFixture() {
  const dir = mkdtempSync(join(tmpdir(), 'mcp-index-fixture-'));
  writeFileSync(join(dir, '1_getting-started.md'), '# Getting Started\n\nSetup instructions.\n');
  mkdirSync(join(dir, '3_api-references'));
  writeFileSync(
    join(dir, '3_api-references', '0_agents-api.mdx'),
    '---\ntitle: Agents API\n---\n# Agents API\n\nEndpoint docs.\n',
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
