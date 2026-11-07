import assert from 'node:assert/strict';
import { test } from 'node:test';
import { clampLastmod } from '../../plugins/vehicle-pages/sitemapLastmod.ts';

const dates = new Map([
  ['/vehicles/ford/f-150', '2026-11-10'],
  ['/resources/detect-vehicle-idling', '2026-11-18'],
]);
const item = (path, lastmod) => ({ url: `https://dimo.org${path}`, lastmod });

test('raises lastmod to the publish date for scheduled pages', () => {
  assert.deepEqual(
    clampLastmod(
      [
        item('/vehicles/ford/f-150', '2026-11-06'),
        item('/resources/detect-vehicle-idling', '2026-11-07T04:00:00.000Z'),
      ],
      dates
    ).map(i => i.lastmod),
    ['2026-11-10', '2026-11-18']
  );
});

test('keeps later edits and leaves other pages alone', () => {
  const later = item('/vehicles/ford/f-150', '2026-12-02');
  const other = item('/docs/quickstart', '2026-01-01');
  const none = item('/vehicles/ford/f-150', null);
  assert.deepEqual(clampLastmod([later, other, none], dates), [
    later,
    other,
    none,
  ]);
});
