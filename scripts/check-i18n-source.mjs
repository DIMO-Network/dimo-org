// Fails when the committed i18n/en files no longer match the source. The en
// build renders from i18n/en/code.json, and write-translations never updates
// an existing message, so a copy edit in a page would otherwise keep showing
// the old English.
// Usage: node scripts/check-i18n-source.mjs [--fix]
import { execFileSync } from 'node:child_process';
import {
  cpSync,
  existsSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { translationDrift } from './lib/i18n-check.mjs';

const EN_DIR = join(import.meta.dirname, '..', 'i18n', 'en');
const fix = process.argv.includes('--fix');

// Docusaurus theme strings (theme.*) stay out of i18n/en: listing them makes
// the English build render the extracted message instead of the theme's own
// fallback, and some ids are reused with two messages ("View All Tags" vs
// "View all tags", "Powered by" vs "Powered by Algolia"). Other locales get
// theme strings from Docusaurus's bundled translations.
const isThemeId = id => id.startsWith('theme.');

function readAll(dir) {
  if (!existsSync(dir)) return {};
  return Object.fromEntries(
    readdirSync(dir, { recursive: true })
      .filter(file => file.endsWith('.json'))
      .map(file => [file, JSON.parse(readFileSync(join(dir, file), 'utf8'))])
  );
}

const committed = readAll(EN_DIR);
const backup = mkdtempSync(join(tmpdir(), 'i18n-en-'));
cpSync(EN_DIR, backup, { recursive: true });
rmSync(EN_DIR, { recursive: true, force: true });

let fresh;
try {
  execFileSync('npx', ['docusaurus', 'write-translations', '--locale', 'en'], {
    stdio: 'pipe',
  });
  fresh = readAll(EN_DIR);
  fresh['code.json'] = Object.fromEntries(
    Object.entries(fresh['code.json'] ?? {}).filter(([id]) => !isThemeId(id))
  );
} finally {
  if (fix && fresh) {
    for (const [file, content] of Object.entries(fresh)) {
      writeFileSync(
        join(EN_DIR, file),
        `${JSON.stringify(content, null, 2)}\n`
      );
    }
  } else {
    rmSync(EN_DIR, { recursive: true, force: true });
    cpSync(backup, EN_DIR, { recursive: true });
  }
  rmSync(backup, { recursive: true, force: true });
}

const drift = translationDrift(committed, fresh);
if (fix) {
  console.log(`check-i18n-source: rewrote i18n/en (${drift.length} change(s))`);
} else if (drift.length > 0) {
  console.error(drift.slice(0, 20).join('\n'));
  if (drift.length > 20) console.error(`… and ${drift.length - 20} more`);
  console.error(
    'check-i18n-source: i18n/en is out of date with the source. Fix with:\n' +
      '  node scripts/check-i18n-source.mjs --fix'
  );
  process.exit(1);
} else {
  console.log('check-i18n-source: i18n/en matches the source');
}
