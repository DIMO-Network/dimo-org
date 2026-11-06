// Fails when a locale is missing a translation that exists in i18n/en.
// Usage: node scripts/check-i18n.mjs
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { missingTranslations } from './lib/i18n-check.mjs';

const ROOT = join(import.meta.dirname, '..', 'i18n');
const LOCALES = ['es', 'ja', 'zh-Hans', 'zh-Hant'];
const FILES = [
  'code.json',
  'docusaurus-theme-classic/navbar.json',
  'docusaurus-theme-classic/footer.json',
];

const readJson = path =>
  existsSync(path) ? JSON.parse(readFileSync(path, 'utf8')) : {};

let gaps = 0;
for (const file of FILES) {
  const enPath = join(ROOT, 'en', file);
  if (!existsSync(enPath)) continue;
  const en = readJson(enPath);
  for (const locale of LOCALES) {
    const missing = missingTranslations(en, readJson(join(ROOT, locale, file)));
    if (missing.length === 0) continue;
    gaps += missing.length;
    console.error(
      `${locale}/${file}: ${missing.length} missing\n  ${missing.slice(0, 10).join('\n  ')}${missing.length > 10 ? '\n  …' : ''}`
    );
  }
}

if (gaps > 0) {
  console.error(`check-i18n: ${gaps} missing translation(s)`);
  process.exit(1);
}
console.log('check-i18n: all locales complete');
