// Submits new or changed dimo.org URLs to IndexNow (Bing, Yandex, Seznam and
// others; not Google). Compares the live sitemap with the snapshot from the
// previous run, which CI keeps in the Actions cache.
//
// Usage: node scripts/aeo/indexnow.mjs [--dry-run] [--sitemap <url|path>]
//        [--snapshot <path>]
// Env:   INDEXNOW_KEY (required unless --dry-run)
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { parseArgs } from 'node:util';

const HOST = 'dimo.org';
const ENDPOINT = 'https://api.indexnow.org/indexnow';
const BATCH = 10_000;

export function parseSitemap(xml) {
  const entries = {};
  for (const [, block] of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
    const loc = block.match(/<loc>([^<]+)<\/loc>/)?.[1]?.trim();
    if (!loc) continue;
    entries[loc] =
      block.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1]?.trim() ?? '';
  }
  return entries;
}

export function changedUrls(previous, current) {
  return Object.keys(current).filter(
    url => !(url in previous) || previous[url] !== current[url]
  );
}

async function readSitemap(source) {
  if (!/^https?:/.test(source)) return readFileSync(source, 'utf8');
  const res = await fetch(source);
  if (!res.ok) throw new Error(`GET ${source} → ${res.status}`);
  return res.text();
}

async function submit(urlList, key) {
  for (let i = 0; i < urlList.length; i += BATCH) {
    const batch = urlList.slice(i, i + BATCH);
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: HOST,
        key,
        keyLocation: `https://${HOST}/${key}.txt`,
        urlList: batch,
      }),
    });
    const msg = `IndexNow: submitted ${batch.length} URLs → HTTP ${res.status}`;
    // A failed submission shouldn't fail the deploy pipeline.
    console.log(res.ok ? msg : `::warning::${msg} ${await res.text()}`);
  }
}

async function main() {
  const { values } = parseArgs({
    options: {
      'dry-run': { type: 'boolean', default: false },
      sitemap: { type: 'string', default: `https://${HOST}/sitemap.xml` },
      snapshot: { type: 'string', default: '.indexnow/sitemap.json' },
    },
  });
  const key = process.env.INDEXNOW_KEY;
  if (!values['dry-run'] && !key) throw new Error('INDEXNOW_KEY is not set');

  const current = parseSitemap(await readSitemap(values.sitemap));
  const previous = existsSync(values.snapshot)
    ? JSON.parse(readFileSync(values.snapshot, 'utf8'))
    : {};
  const urls = changedUrls(previous, current);
  console.log(
    `IndexNow: ${Object.keys(current).length} URLs in sitemap, ${urls.length} new or changed`
  );

  if (values['dry-run']) {
    urls.forEach(u => console.log(`  ${u}`));
    return;
  }
  if (urls.length) await submit(urls, key);
  mkdirSync(path.dirname(values.snapshot), { recursive: true });
  writeFileSync(values.snapshot, JSON.stringify(current, null, 2));
}

if (import.meta.main) {
  main().catch(err => {
    console.error(err);
    process.exitCode = 1;
  });
}
