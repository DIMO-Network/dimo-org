import { existsSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { loadRecords } from './records.ts';

type Item = { url: string; lastmod?: string | null };

// Publish date for every scheduled AEO page, keyed by site path: vehicle
// pages from their records, guides from their `YYYY-MM-DD-slug.mdx` filename.
export function publishDates(siteDir: string): Map<string, string> {
  const dates = new Map<string, string>();
  const records = path.join(siteDir, 'src/data/vehicles/records');
  for (const { record } of loadRecords(records)) {
    dates.set(`/vehicles/${record.slug}`, record.publishDate);
  }
  const resources = path.join(siteDir, 'resources');
  if (existsSync(resources)) {
    for (const file of readdirSync(resources)) {
      const m = file.match(/^(\d{4}-\d{2}-\d{2})-(.+)\.mdx?$/);
      if (m) dates.set(`/resources/${m[2]}`, m[1]);
    }
  }
  return dates;
}

// A page can't have changed before it went live. Git and lastVerified dates
// predate scheduled publish days, so lastmod is raised to the publish date;
// Google discounts sitemaps whose lastmod values look unreliable.
export function clampLastmod<T extends Item>(
  items: T[],
  dates: Map<string, string>
): T[] {
  return items.map(item => {
    const published = dates.get(new URL(item.url).pathname);
    if (!published || !item.lastmod || item.lastmod.slice(0, 10) >= published)
      return item;
    return { ...item, lastmod: published };
  });
}
