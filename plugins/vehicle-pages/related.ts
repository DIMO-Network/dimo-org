import type { VehicleSummary } from './index';

export type RelatedVehicles = {
  sameMake: VehicleSummary[];
  similar: VehicleSummary[];
};

const makeOf = (slug: string) => slug.split('/')[0];

// FNV-1a. Gives each page its own stable ordering of candidates, so
// "similar vehicles" links spread across the catalog instead of every page
// linking to the same alphabetically-first models.
function hash(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

export function relatedVehicles(
  slug: string,
  vehicles: VehicleSummary[],
  similarCount = 6
): RelatedVehicles {
  const self = vehicles.find(v => v.slug === slug);
  if (!self) return { sameMake: [], similar: [] };
  const byName = (a: VehicleSummary, b: VehicleSummary) =>
    `${a.make} ${a.model}`.localeCompare(`${b.make} ${b.model}`);
  const sameMake = vehicles
    .filter(v => v.slug !== slug && makeOf(v.slug) === makeOf(slug))
    .sort(byName);
  const similar = vehicles
    .filter(
      v =>
        makeOf(v.slug) !== makeOf(slug) &&
        v.powertrains.some(p => self.powertrains.includes(p))
    )
    .sort((a, b) => hash(`${slug}|${a.slug}`) - hash(`${slug}|${b.slug}`))
    .slice(0, similarCount)
    .sort(byName);
  return { sameMake, similar };
}
