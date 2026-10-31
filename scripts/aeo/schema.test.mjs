import assert from 'node:assert/strict';
import { cpSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import { loadRecords } from '../../plugins/vehicle-pages/records.ts';

const RECORDS = path.join(
  import.meta.dirname,
  '../../src/data/vehicles/records'
);

function withMutatedFord(mutate) {
  const dir = mkdtempSync(path.join(tmpdir(), 'vehicle-records-'));
  cpSync(RECORDS, dir, { recursive: true });
  const file = path.join(dir, 'ford-f-150.json');
  const record = JSON.parse(readFileSync(file, 'utf8'));
  mutate(record);
  writeFileSync(file, JSON.stringify(record));
  return dir;
}

test('every vehicle record parses with the schema', () => {
  const loaded = loadRecords(RECORDS);
  assert.ok(loaded.length >= 3);
});

test('years.from > years.to fails with the file name and path', () => {
  const dir = withMutatedFord(r => {
    r.coverage[0].years = { from: 2025, to: 2020 };
  });
  assert.throws(
    () => loadRecords(dir),
    /ford-f-150\.json[\s\S]*coverage\.0\.years: years\.from must be <= years\.to/
  );
});

test('missing signals fails with the file name and path', () => {
  const dir = withMutatedFord(r => {
    delete r.coverage[0].signals;
  });
  assert.throws(
    () => loadRecords(dir),
    /ford-f-150\.json[\s\S]*coverage\.0\.signals/
  );
});

test('realWorld is rejected until data-rights sign-off', () => {
  const dir = withMutatedFord(r => {
    r.realWorld = { avgIdleMinutes: 12 };
  });
  assert.throws(() => loadRecords(dir), /realWorld/);
});

test('duplicate slugs are rejected', () => {
  const dir = withMutatedFord(() => {});
  writeFileSync(
    path.join(dir, 'ford-f-150-copy.json'),
    readFileSync(path.join(dir, 'ford-f-150.json'))
  );
  assert.throws(() => loadRecords(dir), /rename it to ford-f-150\.json/);
});
