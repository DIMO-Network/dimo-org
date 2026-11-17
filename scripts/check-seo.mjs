// Fails the build when a page's canonical, og:url or JSON-LD url points at
// another locale, an hreflang alternate is missing, noindex or incomplete, or
// an English-only page (docs, blog, vehicles, guides, legal) is built in a
// locale or lists alternates.
// Usage: node scripts/check-seo.mjs build
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { LOCALES, ROOT_ONLY_FILES } from '../src/lib/seo.ts';
import { checkPage, isNoindex, localeOf } from './lib/seo-check.mjs';

const buildDir = process.argv[2] ?? 'build';

const pages = readdirSync(buildDir, { recursive: true })
  .filter(file => file.endsWith('.html') && !file.endsWith('404.html'))
  .map(file => ({ file, html: readFileSync(join(buildDir, file), 'utf8') }));

const toPath = file =>
  `/${file.replace(/\.html$/, '').replace(/(^|\/)index$/, '')}`.replace(
    /(.)\/$/,
    '$1'
  );

// A partial build (npm run build -- --locale en) can't confirm alternates in
// locales it didn't build, so those count as present and are reported below.
const built = new Set(
  LOCALES.filter(locale =>
    existsSync(join(buildDir, locale === 'en' ? '' : locale, 'index.html'))
  )
);
const unbuilt = LOCALES.filter(locale => !built.has(locale));

class BuiltPages extends Set {
  has(path) {
    return super.has(path) || !built.has(localeOf(path));
  }
}
const existing = new BuiltPages(
  pages.filter(p => !isNoindex(p.html)).map(p => toPath(p.file))
);

const reports = [
  ...pages.flatMap(({ file, html }) => checkPage(html, file, existing)),
  // llms.txt, llms-full.txt and robots.txt are English and live at the root.
  ...LOCALES.filter(l => l !== 'en' && built.has(l)).flatMap(locale =>
    ROOT_ONLY_FILES.filter(f => existsSync(join(buildDir, locale, f))).map(
      f => `${locale}/${f}: root-only file copied into a locale build`
    )
  ),
];

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
