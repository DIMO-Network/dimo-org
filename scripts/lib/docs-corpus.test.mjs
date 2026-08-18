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
    '---\ntitle: Agents API\n---\nimport Foo from "./Foo";\n\n# Agents API\n\nSome body text.\n',
  );
  writeFileSync(
    join(dir, '1_getting-started.md'),
    '# Getting Started\n\nNo frontmatter here.\n',
  );
  return dir;
}

test('walk finds all md/mdx files recursively', () => {
  const dir = makeFixture();
  try {
    const files = walk(dir).map(f => f.replace(dir, '')).sort();
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
  assert.equal(title(withoutFm, `${SITE}/docs/getting-started`), 'Getting Started');
});
