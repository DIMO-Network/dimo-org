import { existsSync, readdirSync } from 'node:fs';
import path from 'node:path';
import type { LoadContext, Plugin } from '@docusaurus/types';
import type { VehicleRecord } from '../../src/data/vehicles/schema.ts';
import { isLive } from './publishDate.ts';
import { loadRecords } from './records.ts';

// Event → guide slug under /resources. A link renders only once that guide is
// live, so scheduled guides never produce broken links.
const EVENT_GUIDES: Record<string, string> = {
  idling: 'detect-idling-without-hardware',
};

export type VehicleSummary = Pick<
  VehicleRecord,
  'make' | 'model' | 'slug' | 'powertrains'
> & { years: { from: number; to: number } };

export type VehiclePageData = {
  record: VehicleRecord;
  eventGuides: Record<string, string>;
};

type Content = {
  live: VehicleRecord[];
  scheduled: number;
  eventGuides: Record<string, string>;
};

function liveGuideSlugs(resourcesDir: string): Set<string> {
  if (!existsSync(resourcesDir)) return new Set();
  const slugs = readdirSync(resourcesDir)
    .map(f => f.match(/^(\d{4}-\d{2}-\d{2})-(.+)\.mdx?$/))
    .filter((m): m is RegExpMatchArray => m !== null && isLive(m[1]))
    .map(m => m[2]);
  return new Set(slugs);
}

function summarize(record: VehicleRecord): VehicleSummary {
  const years = record.coverage.map(c => c.years);
  return {
    make: record.make,
    model: record.model,
    slug: record.slug,
    powertrains: record.powertrains,
    years: {
      from: Math.min(...years.map(y => y.from)),
      to: Math.max(...years.map(y => y.to)),
    },
  };
}

const makeSlug = (slug: string) => slug.split('/')[0];

export default function vehiclePages(context: LoadContext): Plugin<Content> {
  const recordsDir = path.join(context.siteDir, 'src/data/vehicles/records');
  const resourcesDir = path.join(context.siteDir, 'resources');
  return {
    name: 'vehicle-pages',

    getPathsToWatch() {
      return [path.join(recordsDir, '*.json')];
    },

    async loadContent() {
      const records = loadRecords(recordsDir).map(r => r.record);
      const live = records.filter(r => isLive(r.publishDate));
      const guides = liveGuideSlugs(resourcesDir);
      const eventGuides = Object.fromEntries(
        Object.entries(EVENT_GUIDES).filter(([, slug]) => guides.has(slug))
      );
      console.log(
        `vehicle-pages: ${live.length} live, ${records.length - live.length} scheduled`
      );
      return { live, scheduled: records.length - live.length, eventGuides };
    },

    async contentLoaded({ content, actions }) {
      const { createData, addRoute } = actions;
      const { live, eventGuides } = content;

      for (const record of live) {
        const data: VehiclePageData = { record, eventGuides };
        const dataPath = await createData(
          `vehicle-${record.slug.replace('/', '-')}.json`,
          JSON.stringify(data)
        );
        addRoute({
          path: `/vehicles/${record.slug}`,
          component: '@site/src/components/VehiclePage',
          exact: true,
          modules: { data: dataPath },
          // Sitemap lastmod, which IndexNow uses to resubmit changed pages.
          metadata: { lastUpdatedAt: Date.parse(record.lastVerified) },
        });
      }

      const summaries = live
        .map(summarize)
        .sort((a, b) =>
          `${a.make} ${a.model}`.localeCompare(`${b.make} ${b.model}`)
        );
      const indexPath = await createData(
        'vehicles-index.json',
        JSON.stringify(summaries)
      );
      addRoute({
        path: '/vehicles',
        component: '@site/src/components/VehiclePage/VehicleIndex',
        exact: true,
        modules: { vehicles: indexPath },
      });

      const makes = [...new Set(summaries.map(s => makeSlug(s.slug)))];
      for (const make of makes) {
        const vehicles = summaries.filter(s => makeSlug(s.slug) === make);
        const makePath = await createData(
          `vehicles-make-${make}.json`,
          JSON.stringify(vehicles)
        );
        addRoute({
          path: `/vehicles/${make}`,
          component: '@site/src/components/VehiclePage/MakeHub',
          exact: true,
          modules: { vehicles: makePath },
        });
      }
    },
  };
}
