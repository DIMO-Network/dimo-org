import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { isLive } from './publishDate.ts';

export type Guide = { slug: string; title: string };

const FILE = /^(\d{4}-\d{2}-\d{2})-(.+)\.mdx?$/;

// Frontmatter title, without a YAML parser: titles are single-line scalars.
function frontmatterTitle(source: string): string | null {
  const frontmatter = source.match(/^---\n([\s\S]*?)\n---/);
  const title = frontmatter?.[1].match(/^title:\s*(.+)$/m)?.[1].trim();
  if (!title) return null;
  const quoted = title.match(/^(['"])(.*)\1$/);
  return quoted ? quoted[2] : title;
}

// Guides under /resources whose date has passed, oldest first. Scheduled
// guides are left out so nothing links to a page that isn't built yet.
export function liveGuides(resourcesDir: string): Guide[] {
  if (!existsSync(resourcesDir)) return [];
  return readdirSync(resourcesDir)
    .sort()
    .flatMap(file => {
      const m = file.match(FILE);
      if (!m || !isLive(m[1])) return [];
      const title = frontmatterTitle(
        readFileSync(path.join(resourcesDir, file), 'utf8')
      );
      return [{ slug: m[2], title: title ?? m[2] }];
    });
}

// Car-specific guides are named <make>-<model>-<topic>. Each guide goes to the
// record with the longest matching prefix, so a guide for "ford/f-150-lightning"
// never lands on "ford/f-150".
export function guidesByVehicle(
  guides: Guide[],
  recordSlugs: string[]
): Record<string, Guide[]> {
  const prefixes = recordSlugs
    .map(slug => ({ slug, prefix: `${slug.replace('/', '-')}-` }))
    .sort((a, b) => b.prefix.length - a.prefix.length);
  const out: Record<string, Guide[]> = {};
  for (const guide of guides) {
    const owner = prefixes.find(p => guide.slug.startsWith(p.prefix));
    if (owner) (out[owner.slug] ??= []).push(guide);
  }
  return out;
}
