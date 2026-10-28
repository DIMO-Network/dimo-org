import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { VehicleRecord } from '../../src/data/vehicles/schema.ts';

export type LoadedRecord = { file: string; record: VehicleRecord };

function formatIssues(
  file: string,
  error: {
    issues: readonly { path: readonly PropertyKey[]; message: string }[];
  }
) {
  const lines = error.issues.map(
    i => `  - ${i.path.length ? i.path.join('.') : '(root)'}: ${i.message}`
  );
  return `Invalid vehicle record ${file}:\n${lines.join('\n')}`;
}

export function loadRecords(dir: string): LoadedRecord[] {
  const files = readdirSync(dir)
    .filter(f => f.endsWith('.json'))
    .sort();
  const loaded = files.map(file => {
    let raw: unknown;
    try {
      raw = JSON.parse(readFileSync(path.join(dir, file), 'utf8'));
    } catch (err) {
      throw new Error(
        `Invalid JSON in vehicle record ${file}: ${(err as Error).message}`
      );
    }
    const result = VehicleRecord.safeParse(raw);
    if (!result.success) throw new Error(formatIssues(file, result.error));
    const expected = `${result.data.slug.replace('/', '-')}.json`;
    if (file !== expected) {
      throw new Error(
        `Vehicle record ${file} has slug "${result.data.slug}"; rename it to ${expected}`
      );
    }
    return { file, record: result.data };
  });
  const seen = new Map<string, string>();
  for (const { file, record } of loaded) {
    const prev = seen.get(record.slug);
    if (prev)
      throw new Error(
        `Duplicate vehicle slug "${record.slug}" in ${prev} and ${file}`
      );
    seen.set(record.slug, file);
  }
  return loaded;
}
