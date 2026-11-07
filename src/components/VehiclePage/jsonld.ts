import type { VehicleRecord } from '../../data/vehicles/schema';

const SITE = 'https://dimo.org';
const ORG = {
  '@type': 'Organization',
  '@id': `${SITE}/#organization`,
  name: 'DIMO',
};

export function articleJsonLd(opts: {
  record: VehicleRecord;
  headline: string;
  description: string;
  path: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.headline,
    description: opts.description,
    url: `${SITE}${opts.path}`,
    image: `${SITE}/img/dimo-social-card.png`,
    datePublished: opts.record.publishDate,
    dateModified: opts.record.lastVerified,
    isPartOf: { '@id': `${SITE}/#website` },
    author: ORG,
    publisher: ORG,
    about: {
      '@type': 'Car',
      brand: { '@type': 'Brand', name: opts.record.make },
      model: opts.record.model,
    },
  };
}

export function faqJsonLd(faq: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}
