import assert from 'node:assert/strict';
import { test } from 'node:test';
import { relatedVehicles } from '../../plugins/vehicle-pages/related.ts';

const v = (slug, powertrains = ['ice']) => {
  const [make, model] = slug.split('/');
  return { slug, make, model, powertrains, years: { from: 2015, to: 2025 } };
};
const catalog = [
  v('ford/f-150'),
  v('ford/escape', ['ice', 'hybrid']),
  v('ford/mustang-mach-e', ['ev']),
  v('tesla/model-3', ['ev']),
  v('tesla/model-y', ['ev']),
  v('toyota/camry'),
  v('toyota/rav4', ['ice', 'hybrid']),
  v('honda/cr-v'),
];

test('links every other model from the same make', () => {
  const { sameMake } = relatedVehicles('ford/f-150', catalog);
  assert.deepEqual(
    sameMake.map(x => x.slug),
    ['ford/escape', 'ford/mustang-mach-e']
  );
});

test('similar vehicles share a powertrain and come from other makes', () => {
  const { similar } = relatedVehicles('tesla/model-3', catalog);
  assert.deepEqual(
    similar.map(x => x.slug),
    ['ford/mustang-mach-e']
  );
  const ice = relatedVehicles('ford/f-150', catalog, 3).similar;
  assert.equal(ice.length, 3);
  assert.ok(ice.every(x => !x.slug.startsWith('ford/')));
});

test('each page gets a stable but different set of similar vehicles', () => {
  const big = Array.from({ length: 40 }, (_, i) => v(`make${i}/model`));
  const a = relatedVehicles('make0/model', big).similar.map(x => x.slug);
  assert.deepEqual(
    a,
    relatedVehicles('make0/model', big).similar.map(x => x.slug)
  );
  const sets = new Set(
    big.map(x =>
      relatedVehicles(x.slug, big)
        .similar.map(y => y.slug)
        .join()
    )
  );
  assert.ok(sets.size > 30);
});

test('unknown slugs get no links', () => {
  assert.deepEqual(relatedVehicles('nope/nope', catalog), {
    sameMake: [],
    similar: [],
  });
});
