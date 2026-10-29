import assert from 'node:assert/strict';
import { test } from 'node:test';
import { aeoBodyText, comparePairs, shingles } from './dup-check.mjs';

const page = body =>
  `<nav>shared chrome words repeated on every page</nav><article><div data-aeo-body="true">${body}</div></article><footer>more chrome</footer>`;

test('only text inside data-aeo-body is compared', () => {
  const words = aeoBodyText(page('<p>Ford F-150 <b>signals</b></p>'));
  assert.deepEqual(words, ['ford', 'f-150', 'signals']);
  assert.equal(aeoBodyText('<article>no marker</article>'), null);
});

test('same-make pairs are scored, cross-make pairs skipped', () => {
  const text = 'one two three four five six seven eight nine ten';
  const mk = (make, p, t) => ({
    make,
    page: `${make}/${p}`,
    shingles: shingles(aeoBodyText(page(t))),
  });
  const pairs = comparePairs([
    mk('ford', 'a', text),
    mk('ford', 'b', text),
    mk('tesla', 'c', text),
  ]);
  assert.equal(pairs.length, 1);
  assert.equal(pairs[0].score, 1);
});
