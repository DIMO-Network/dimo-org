import { test } from 'node:test';
import assert from 'node:assert/strict';
import { coverImage, bylineNames } from '../../src/lib/blog-meta.ts';

test('coverImage keeps real cover images', () => {
  assert.equal(
    coverImage('/img/vehicle_simulator.png'),
    '/img/vehicle_simulator.png'
  );
});

test('coverImage drops the generic social card and missing images', () => {
  assert.equal(coverImage('/img/dimo-social-card.png'), undefined);
  assert.equal(coverImage(undefined), undefined);
});

test('bylineNames joins author names like a Substack byline', () => {
  assert.equal(bylineNames([]), '');
  assert.equal(bylineNames(['DIMO Team']), 'DIMO Team');
  assert.equal(bylineNames(['A', 'B']), 'A and B');
  assert.equal(bylineNames(['A', 'B', 'C']), 'A, B and C');
});
