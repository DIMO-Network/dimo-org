import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkPage } from './seo-check.mjs';
import {
  isTranslatedPath,
  localeUrl,
  localizeSchema,
  pagePath,
} from '../../src/lib/seo.ts';

const LOCALES = ['en', 'es', 'ja', 'zh-Hans', 'zh-Hant'];

function head({ canonical, ogUrl, hreflangs = {}, robots, jsonLd = [] }) {
  return [
    '<html><head>',
    canonical && `<link rel="canonical" href="${canonical}">`,
    ogUrl && `<meta property="og:url" content="${ogUrl}">`,
    ...Object.entries(hreflangs).map(
      ([lang, href]) =>
        `<link data-rh="true" rel="alternate" href="${href}" hreflang="${lang}">`
    ),
    robots && `<meta name="robots" content="${robots}">`,
    ...jsonLd.map(
      s => `<script type="application/ld+json">${JSON.stringify(s)}</script>`
    ),
    '</head><body></body></html>',
  ]
    .filter(Boolean)
    .join('');
}

const allPricingPages = new Set(
  LOCALES.map(l => (l === 'en' ? '/pricing' : `/${l}/pricing`))
);

function pricingAlternates() {
  const alternates = Object.fromEntries(
    LOCALES.map(l => [l, localeUrl(l, '/pricing')])
  );
  return { ...alternates, 'x-default': localeUrl('en', '/pricing') };
}

test('checkPage reports a translated page canonical to another locale', () => {
  const html = head({
    canonical: 'https://dimo.org/pricing',
    ogUrl: 'https://dimo.org/zh-Hans/pricing',
    hreflangs: pricingAlternates(),
  });
  const reports = checkPage(html, 'zh-Hans/pricing.html', allPricingPages);
  assert.equal(reports.length, 1);
  assert.match(reports[0], /canonical/);
});

test('checkPage reports og:url and JSON-LD url in another locale', () => {
  const html = head({
    canonical: 'https://dimo.org/ja/pricing',
    ogUrl: 'https://dimo.org/pricing',
    hreflangs: pricingAlternates(),
    jsonLd: [
      { '@type': 'WebPage', url: 'https://dimo.org/es/pricing' },
      { '@type': 'Organization', url: 'https://dimo.org/' },
    ],
  });
  const reports = checkPage(html, 'ja/pricing.html', allPricingPages);
  assert.equal(reports.length, 2);
  assert.match(reports[0], /og:url/);
  assert.match(reports[1], /JSON-LD url/);
});

test('checkPage reports an hreflang target that is not in the build', () => {
  const docs = '/docs/intro';
  const html = head({
    canonical: 'https://dimo.org/docs/intro',
    ogUrl: 'https://dimo.org/docs/intro',
    hreflangs: {
      en: 'https://dimo.org/docs/intro',
      ja: 'https://dimo.org/ja/docs/intro',
      'x-default': 'https://dimo.org/docs/intro',
    },
  });
  const reports = checkPage(html, 'docs/intro.html', new Set([docs]));
  assert.deepEqual(reports, [
    'docs/intro.html: hreflang ja target https://dimo.org/ja/docs/intro is missing or noindex',
  ]);
});

test('checkPage reports a noindex page that declares alternates', () => {
  const html = head({
    canonical: 'https://dimo.org/es/pricing',
    ogUrl: 'https://dimo.org/es/pricing',
    hreflangs: pricingAlternates(),
    robots: 'noindex, nofollow',
  });
  const reports = checkPage(html, 'es/pricing.html', allPricingPages);
  assert.equal(reports.length, 1);
  assert.match(reports[0], /noindex/);
});

test('checkPage reports alternates without x-default', () => {
  const alternates = pricingAlternates();
  delete alternates['x-default'];
  const html = head({
    canonical: 'https://dimo.org/pricing',
    ogUrl: 'https://dimo.org/pricing',
    hreflangs: alternates,
  });
  const reports = checkPage(html, 'pricing.html', allPricingPages);
  assert.equal(reports.length, 1);
  assert.match(reports[0], /x-default/);
});

test('checkPage returns [] for a correct translated page', () => {
  const html = head({
    canonical: 'https://dimo.org/zh-Hant/pricing',
    ogUrl: 'https://dimo.org/zh-Hant/pricing',
    hreflangs: pricingAlternates(),
    jsonLd: [
      {
        '@graph': [
          { '@type': 'WebPage', url: 'https://dimo.org/zh-Hant/pricing' },
          { '@type': 'Product', url: 'https://dimo.org/pricing' },
        ],
      },
    ],
  });
  assert.deepEqual(
    checkPage(html, 'zh-Hant/pricing.html', allPricingPages),
    []
  );
});

test('checkPage treats a locale home page as that locale', () => {
  const home = new Set(LOCALES.map(l => (l === 'en' ? '/' : `/${l}`)));
  const alternates = Object.fromEntries(
    LOCALES.map(l => [l, localeUrl(l, '/')])
  );
  const html = head({
    canonical: 'https://dimo.org/zh-Hans',
    ogUrl: 'https://dimo.org/zh-Hans',
    hreflangs: { ...alternates, 'x-default': localeUrl('en', '/') },
  });
  assert.deepEqual(checkPage(html, 'zh-Hans/index.html', home), []);
});

test('localeUrl has no trailing slash and no prefix for English', () => {
  assert.equal(localeUrl('zh-Hant', '/'), 'https://dimo.org/zh-Hant');
  assert.equal(localeUrl('en', '/'), 'https://dimo.org');
  assert.equal(localeUrl('ja', '/pricing'), 'https://dimo.org/ja/pricing');
  assert.equal(localeUrl('en', '/pricing'), 'https://dimo.org/pricing');
});

test('isTranslatedPath excludes docs, blog, privacy, terms and search', () => {
  assert.equal(isTranslatedPath('/blog/x'), false);
  assert.equal(isTranslatedPath('/blog'), false);
  assert.equal(isTranslatedPath('/docs'), false);
  assert.equal(isTranslatedPath('/docs/intro'), false);
  assert.equal(isTranslatedPath('/privacy'), false);
  assert.equal(isTranslatedPath('/terms'), false);
  assert.equal(isTranslatedPath('/search'), false);
  assert.equal(isTranslatedPath('/'), true);
  assert.equal(isTranslatedPath('/pricing'), true);
  assert.equal(isTranslatedPath('/compliance/eu-data-act'), true);
});

test('pagePath strips the locale baseUrl and any trailing slash', () => {
  assert.equal(pagePath('/zh-Hans/pricing', '/zh-Hans/'), '/pricing');
  assert.equal(pagePath('/zh-Hans/', '/zh-Hans/'), '/');
  assert.equal(pagePath('/zh-Hans', '/zh-Hans/'), '/');
  assert.equal(pagePath('/', '/'), '/');
  assert.equal(pagePath('/pricing/', '/'), '/pricing');
});

test('localizeSchema localizes the page node and keeps shared entity ids', () => {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://dimo.org/#organization',
        url: 'https://dimo.org/',
      },
      {
        '@type': 'Product',
        '@id': 'https://dimo.org/pricing#product',
        url: 'https://dimo.org/pricing',
      },
      {
        '@type': 'WebPage',
        '@id': 'https://dimo.org/pricing#webpage',
        url: 'https://dimo.org/pricing',
        isPartOf: { '@id': 'https://dimo.org/#website' },
      },
    ],
  };
  const localized = localizeSchema(schema, 'zh-Hans', '/pricing');
  assert.deepEqual(localized['@graph'][0], schema['@graph'][0]);
  assert.deepEqual(localized['@graph'][1], schema['@graph'][1]);
  assert.deepEqual(localized['@graph'][2], {
    '@type': 'WebPage',
    '@id': 'https://dimo.org/zh-Hans/pricing#webpage',
    url: 'https://dimo.org/zh-Hans/pricing',
    isPartOf: { '@id': 'https://dimo.org/#website' },
    inLanguage: 'zh-Hans',
  });
  assert.equal(schema['@graph'][2].url, 'https://dimo.org/pricing');
});

test('localizeSchema handles a single node and the home page', () => {
  const localized = localizeSchema(
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://dimo.org/#software',
      url: 'https://dimo.org/',
      publisher: { '@id': 'https://dimo.org/#organization' },
    },
    'ja',
    '/'
  );
  assert.deepEqual(localized, {
    '@type': 'SoftwareApplication',
    '@id': 'https://dimo.org/ja#software',
    url: 'https://dimo.org/ja',
    publisher: { '@id': 'https://dimo.org/#organization' },
    inLanguage: 'ja',
  });
});
