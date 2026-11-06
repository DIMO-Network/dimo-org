// Fails the build when a page's canonical, og:url or JSON-LD url points at
// another locale, or an hreflang alternate is missing, noindex or incomplete.
// Usage: node scripts/check-seo.mjs build
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { checkPage } from './lib/seo-check.mjs';

const LOCALES = ['es', 'ja', 'zh-Hans', 'zh-Hant'];
const buildDir = process.argv[2] ?? 'build';

const pages = readdirSync(buildDir, { recursive: true })
  .filter(file => file.endsWith('.html') && !file.endsWith('404.html'))
  .map(file => ({ file, html: readFileSync(join(buildDir, file), 'utf8') }));

const toPath = file =>
  `/${file.replace(/\.html$/, '').replace(/(^|\/)index$/, '')}`.replace(
    /(.)\/$/,
    '$1'
  );
const isNoindex = html =>
  /<meta[^>]*name="robots"[^>]*content="[^"]*noindex/i.test(html);

// A partial build (npm run build -- --locale en) can't confirm alternates in
// locales it didn't build, so those count as present and are reported below.
const built = new Set(
  ['en', ...LOCALES].filter(locale =>
    existsSync(join(buildDir, locale === 'en' ? '' : locale, 'index.html'))
  )
);
const unbuilt = ['en', ...LOCALES].filter(locale => !built.has(locale));
const localeOf = path =>
  LOCALES.find(l => path === `/${l}` || path.startsWith(`/${l}/`)) ?? 'en';

class BuiltPages extends Set {
  has(path) {
    return super.has(path) || !built.has(localeOf(path));
  }
}
const existing = new BuiltPages(
  pages.filter(p => !isNoindex(p.html)).map(p => toPath(p.file))
);

const reports = pages.flatMap(({ file, html }) =>
  checkPage(html, file, existing)
);

if (unbuilt.length > 0) {
  console.log(
    `check-seo: ${unbuilt.join(', ')} not in this build; their hreflang targets were not verified`
  );
}
if (reports.length > 0) {
  console.error(reports.join('\n'));
  console.error(`check-seo: ${reports.length} problem(s) in ${buildDir}`);
  process.exit(1);
}
console.log(`check-seo: ${pages.length} pages OK`);
