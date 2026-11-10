import assert from 'node:assert/strict';
import { mkdtempSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import {
  guidesByVehicle,
  liveGuides,
} from '../../plugins/vehicle-pages/guides.ts';

const g = slug => ({ slug, title: slug });

test('a guide goes to the vehicle whose slug prefixes it', () => {
  const out = guidesByVehicle(
    [g('toyota-corolla-idling-detection'), g('detect-vehicle-idling')],
    ['toyota/corolla', 'toyota/camry']
  );
  assert.deepEqual(out, {
    'toyota/corolla': [g('toyota-corolla-idling-detection')],
  });
});

test('the longest matching vehicle slug wins', () => {
  const out = guidesByVehicle(
    [
      g('ford-f-150-lightning-charging-sessions'),
      g('ford-f-150-idling-detection'),
    ],
    ['ford/f-150', 'ford/f-150-lightning']
  );
  assert.deepEqual(out, {
    'ford/f-150-lightning': [g('ford-f-150-lightning-charging-sessions')],
    'ford/f-150': [g('ford-f-150-idling-detection')],
  });
});

test('liveGuides reads titles and leaves out scheduled guides', t => {
  const dir = mkdtempSync(path.join(tmpdir(), 'guides-'));
  const write = (name, title) =>
    writeFileSync(path.join(dir, name), `---\ntitle: ${title}\n---\n\nBody\n`);
  write('2026-11-17-toyota-corolla-idling-detection.mdx', '"Quoted: title"');
  write('2026-11-16-tesla-model-3-charging-sessions.mdx', 'Plain title');
  write('2026-12-14-toyota-corolla-harsh-braking-alerts.mdx', 'Later');
  writeFileSync(path.join(dir, 'authors.yml'), 'dimo-team:\n  name: DIMO\n');

  const before = {
    now: process.env.AEO_NOW,
    all: process.env.AEO_INCLUDE_FUTURE,
  };
  t.after(() => {
    for (const [key, value] of [
      ['AEO_NOW', before.now],
      ['AEO_INCLUDE_FUTURE', before.all],
    ]) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  });
  delete process.env.AEO_INCLUDE_FUTURE;
  process.env.AEO_NOW = '2026-11-20T00:00:00Z';

  assert.deepEqual(liveGuides(dir), [
    { slug: 'tesla-model-3-charging-sessions', title: 'Plain title' },
    { slug: 'toyota-corolla-idling-detection', title: 'Quoted: title' },
  ]);
});

// Vehicle pages decide which guides are live from the filename; the blog
// plugin builds them from frontmatter. If the two disagree, a vehicle page
// links to a guide that isn't built and the production build fails on the
// broken link. PR builds include scheduled pages, so only this test sees it.
test('guide filenames match their frontmatter date and slug', () => {
  const dir = path.join(import.meta.dirname, '../../resources');
  for (const file of readdirSync(dir)) {
    const m = file.match(/^(\d{4}-\d{2}-\d{2})-(.+)\.mdx?$/);
    if (!m) continue;
    const frontmatter =
      readFileSync(path.join(dir, file), 'utf8').match(
        /^---\n([\s\S]*?)\n---/
      )?.[1] ?? '';
    const field = name =>
      frontmatter.match(new RegExp(`^${name}:\\s*(.+)$`, 'm'))?.[1].trim();
    assert.equal(field('date'), m[1], `${file}: date`);
    assert.equal(field('slug'), m[2], `${file}: slug`);
    assert.equal(field('draft'), undefined, `${file}: draft`);
    assert.equal(field('unlisted'), undefined, `${file}: unlisted`);
  }
});
