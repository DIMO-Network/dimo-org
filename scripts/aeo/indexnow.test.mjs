import assert from 'node:assert/strict';
import { test } from 'node:test';
import { changedUrls, parseSitemap } from './indexnow.mjs';

const xml = `<urlset>
<url><loc>https://dimo.org/a</loc><lastmod>2026-10-01</lastmod></url>
<url><loc>https://dimo.org/b</loc><lastmod>2026-10-02</lastmod></url>
<url><loc>https://dimo.org/c</loc></url>
</urlset>`;

test('parses loc and lastmod', () => {
  assert.deepEqual(parseSitemap(xml), {
    'https://dimo.org/a': '2026-10-01',
    'https://dimo.org/b': '2026-10-02',
    'https://dimo.org/c': '',
  });
});

test('submits only new URLs and URLs whose lastmod changed', () => {
  const previous = {
    'https://dimo.org/a': '2026-10-01',
    'https://dimo.org/b': '2026-09-01',
  };
  assert.deepEqual(changedUrls(previous, parseSitemap(xml)), [
    'https://dimo.org/b',
    'https://dimo.org/c',
  ]);
});
