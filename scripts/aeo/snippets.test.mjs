// Snippet harness. Fenced code blocks tagged `test` (```js test, ```ts test,
// ```python test) in resources/ and blog/, plus the VehiclePage "Build it"
// template for every vehicle record, are syntax-checked and executed. JS/TS
// snippets run against an offline @dimo-network/data-sdk stub that answers from
// fixtures/telemetry.json (see dimo-sdk-stub.mjs), so CI never calls DIMO.
// Python snippets that use DIMO are syntax-checked only. Untagged blocks are
// skipped.
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';
import { loadRecords } from '../../plugins/vehicle-pages/records.ts';
import { buildSnippet } from '../../src/components/VehiclePage/snippet.ts';

const ROOT = path.join(import.meta.dirname, '../..');
// Outside node_modules: Node won't strip types there. The SDK import resolves
// to the stub through HOOKS.
const WORK_DIR = path.join(ROOT, '.aeo-snippets');
const TIMEOUT_MS = 30_000;
const HOOKS = path.join(import.meta.dirname, 'dimo-sdk-hooks.mjs');
const FIXTURE = path.join(import.meta.dirname, 'fixtures/telemetry.json');
const SNIPPET_ENV = {
  ...process.env,
  DIMO_CLIENT_ID: '0xstub-client-id',
  DIMO_API_KEY: 'stub-api-key',
  DIMO_REDIRECT_URI: 'https://example.com/callback',
  DIMO_TOKEN_ID: '1',
  AEO_TELEMETRY_FIXTURE: FIXTURE,
};

const LANGS = {
  js: {
    ext: '.mjs',
    check: f => ['node', ['--check', f]],
    run: f => ['node', ['--import', HOOKS, f]],
  },
  ts: {
    ext: '.mts',
    check: f => ['node', ['--check', f]],
    run: f => ['node', ['--import', HOOKS, f]],
  },
  python: {
    ext: '.py',
    check: f => ['python3', ['-m', 'py_compile', f]],
    run: f => ['python3', [f]],
  },
};
const ALIASES = { javascript: 'js', mjs: 'js', typescript: 'ts', py: 'python' };

function extractTestBlocks(source, file) {
  const blocks = [];
  const lines = source.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const open = lines[i].match(/^(\s*)(`{3,}|~{3,})(\w+)\s*(.*)$/);
    if (!open) continue;
    const [, , fence, rawLang, meta] = open;
    const close = lines.findIndex(
      (l, j) =>
        j > i &&
        l.trim().startsWith(fence) &&
        l.trim() === l.trim()[0].repeat(l.trim().length)
    );
    const end = close === -1 ? lines.length : close;
    const lang = ALIASES[rawLang] ?? rawLang;
    if (meta.split(/\s+/).includes('test') && LANGS[lang]) {
      blocks.push({
        file,
        line: i + 1,
        lang,
        code: lines.slice(i + 1, end).join('\n'),
      });
    }
    i = end;
  }
  return blocks;
}

function walk(dir, exts) {
  let out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out = out.concat(walk(full, exts));
    else if (exts.some(e => entry.name.endsWith(e))) out.push(full);
  }
  return out;
}

function contentBlocks() {
  return ['resources', 'blog'].flatMap(dir =>
    walk(path.join(ROOT, dir), ['.md', '.mdx']).flatMap(f =>
      extractTestBlocks(readFileSync(f, 'utf8'), path.relative(ROOT, f))
    )
  );
}

function vehicleBlocks() {
  const dir = path.join(ROOT, 'src/data/vehicles/records');
  return loadRecords(dir).map(({ file, record }) => ({
    file: `src/components/VehiclePage/snippet.ts (${file})`,
    line: 1,
    lang: 'ts',
    code: buildSnippet(record),
  }));
}

function exec([cmd, args]) {
  const res = spawnSync(cmd, args, {
    cwd: WORK_DIR,
    encoding: 'utf8',
    timeout: TIMEOUT_MS,
    env: SNIPPET_ENV,
  });
  if (res.error?.code === 'ETIMEDOUT')
    return `timed out after ${TIMEOUT_MS / 1000}s`;
  if (res.error) return res.error.message;
  return res.status === 0 ? null : `${res.stderr}${res.stdout}`.trim();
}

const usesNetwork = code => /DIMO_[A-Z_]+/.test(code);

{
  mkdirSync(WORK_DIR, { recursive: true });
  const blocks = [...contentBlocks(), ...vehicleBlocks()];
  const seen = new Set();

  blocks.forEach((block, n) => {
    if (seen.has(block.code)) return;
    seen.add(block.code);
    const where = `${block.file}:${block.line}`;
    test(`snippet ${where} (${block.lang})`, { concurrency: true }, t => {
      const lang = LANGS[block.lang];
      const file = path.join(WORK_DIR, `snippet-${n}${lang.ext}`);
      writeFileSync(file, `${block.code}\n`);

      const syntaxError = exec(lang.check(file));
      assert.equal(syntaxError, null, `${where}: syntax error\n${syntaxError}`);

      if (usesNetwork(block.code)) {
        if (block.lang === 'python') {
          t.skip('Python DIMO snippets are syntax-checked only');
          return;
        }
        assert.ok(
          existsSync(FIXTURE),
          `${where}: ${path.relative(ROOT, FIXTURE)} is missing (format in scripts/aeo/dimo-sdk-stub.mjs)`
        );
      }
      const runError = exec(lang.run(file));
      assert.equal(runError, null, `${where}: snippet failed\n${runError}`);
    });
  });
}
