import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkPage, isNoindex } from './seo-check.mjs';
import {
  LOCALES,
  isEnglishBuild,
  isTranslatedPath,
  localeUrl,
  localizeSchema,
  localeSwitchPath,
  localizeSiteUrl,
  pagePath,
} from '../../src/lib/seo.ts';

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
  const html = head({
    canonical: 'https://dimo.org/pricing',
    ogUrl: 'https://dimo.org/pricing',
    hreflangs: pricingAlternates(),
  });
  const withoutJa = new Set(
    [...allPricingPages].filter(path => path !== '/ja/pricing')
  );
  const reports = checkPage(html, 'pricing.html', withoutJa);
  assert.deepEqual(reports, [
    'pricing.html: hreflang ja target https://dimo.org/ja/pricing is missing or noindex',
  ]);
});

test('checkPage reports alternates on English-only pages', () => {
  for (const path of [
    '/docs/intro',
    '/vehicles/toyota/camry',
    '/resources/detect-vehicle-idling',
  ]) {
    const url = localeUrl('en', path);
    const html = head({
      canonical: url,
      ogUrl: url,
      hreflangs: { en: url, ja: localeUrl('ja', path), 'x-default': url },
    });
    const file = `${path.slice(1)}.html`;
    const existing = new Set([path, `/ja${path}`]);
    assert.deepEqual(checkPage(html, file, existing), [
      `${file}: English-only page declares hreflang alternates`,
    ]);
  }
});

test('checkPage reports an English-only page built in a locale', () => {
  const url = 'https://dimo.org/zh-Hans/vehicles/toyota/camry';
  const html = head({ canonical: url, ogUrl: url });
  assert.deepEqual(
    checkPage(html, 'zh-Hans/vehicles/toyota/camry.html', new Set()),
    [
      'zh-Hans/vehicles/toyota/camry.html: English-only page built in locale zh-Hans',
    ]
  );
});

test('checkPage allows a noindex search page in a locale build', () => {
  const url = 'https://dimo.org/zh-Hans/search';
  const html = head({ canonical: url, ogUrl: url, robots: 'noindex, follow' });
  assert.deepEqual(checkPage(html, 'zh-Hans/search.html', new Set()), []);
});

test('checkPage returns [] for an English-only vehicle page', () => {
  const url = 'https://dimo.org/vehicles/toyota/camry';
  const html = head({
    canonical: url,
    ogUrl: url,
    jsonLd: [
      {
        '@type': 'Article',
        url,
        publisher: {
          '@type': 'Organization',
          '@id': 'https://dimo.org/#organization',
        },
      },
    ],
  });
  assert.deepEqual(
    checkPage(html, 'vehicles/toyota/camry.html', new Set()),
    []
  );
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
          { '@type': 'Product', url: 'https://dimo.org/zh-Hant/pricing' },
          { '@type': 'Organization', url: 'https://dimo.org/' },
          { '@type': 'WebSite', url: 'https://dimo.org/' },
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

test('isTranslatedPath excludes docs, blog, vehicles, resources, privacy, terms and search', () => {
  assert.equal(isTranslatedPath('/vehicles'), false);
  assert.equal(isTranslatedPath('/vehicles/toyota'), false);
  assert.equal(isTranslatedPath('/vehicles/toyota/camry'), false);
  assert.equal(isTranslatedPath('/resources'), false);
  assert.equal(isTranslatedPath('/resources/detect-vehicle-idling'), false);
  assert.equal(isTranslatedPath('/vehicle-data-api'), true);
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

test('checkPage reports a translated page with no alternates', () => {
  const html = head({
    canonical: 'https://dimo.org/es/pricing',
    ogUrl: 'https://dimo.org/es/pricing',
  });
  const reports = checkPage(html, 'es/pricing.html', allPricingPages);
  assert.deepEqual(reports, [
    'es/pricing.html: hreflang alternates missing: en, es, ja, zh-Hans, zh-Hant, x-default',
  ]);
});

test('checkPage reports an alternate that points at the wrong URL', () => {
  const html = head({
    canonical: 'https://dimo.org/pricing',
    ogUrl: 'https://dimo.org/pricing',
    hreflangs: { ...pricingAlternates(), es: 'https://dimo.org/pricing' },
  });
  const reports = checkPage(html, 'pricing.html', allPricingPages);
  assert.deepEqual(reports, [
    'pricing.html: hreflang es is https://dimo.org/pricing, expected https://dimo.org/es/pricing',
  ]);
});

test('checkPage reports a canonical to another page in the same locale', () => {
  const html = head({
    canonical: 'https://dimo.org/ja',
    ogUrl: 'https://dimo.org/ja/pricing',
    hreflangs: pricingAlternates(),
  });
  const reports = checkPage(html, 'ja/pricing.html', allPricingPages);
  assert.deepEqual(reports, [
    'ja/pricing.html: canonical https://dimo.org/ja is not the page URL https://dimo.org/ja/pricing',
  ]);
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
  assert.deepEqual(localized['@graph'][1], {
    '@type': 'Product',
    '@id': 'https://dimo.org/pricing#product',
    url: 'https://dimo.org/zh-Hans/pricing',
  });
  assert.deepEqual(localized['@graph'][2], {
    '@type': 'WebPage',
    '@id': 'https://dimo.org/zh-Hans/pricing#webpage',
    url: 'https://dimo.org/zh-Hans/pricing',
    isPartOf: { '@id': 'https://dimo.org/#website' },
    inLanguage: 'zh-Hans',
  });
  assert.equal(schema['@graph'][2].url, 'https://dimo.org/pricing');
});

test('localizeSchema keeps shared ids on the home page', () => {
  const nodes = [
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://dimo.org/#software',
      url: 'https://dimo.org/',
      publisher: { '@id': 'https://dimo.org/#organization' },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://dimo.org/#website',
      url: 'https://dimo.org/',
    },
    {
      '@type': 'Organization',
      '@id': 'https://dimo.org/#organization',
      url: 'https://dimo.org/',
    },
  ];
  assert.deepEqual(
    nodes.map(n => localizeSchema(n, 'ja', '/')),
    [{ ...nodes[0], url: 'https://dimo.org/ja' }, nodes[1], nodes[2]]
  );
});

test('localizeSchema leaves English unchanged apart from inLanguage', () => {
  const article = {
    '@type': 'TechArticle',
    '@id': 'https://dimo.org/compare/smartcar-alternative#article',
    url: 'https://dimo.org/compare/smartcar-alternative',
    isPartOf: { '@id': 'https://dimo.org/#website' },
  };
  const home = {
    '@type': 'WebSite',
    '@id': 'https://dimo.org/#website',
    url: 'https://dimo.org/',
  };
  const crumbs = { '@type': 'BreadcrumbList', itemListElement: [] };
  assert.deepEqual(
    localizeSchema(article, 'en', '/compare/smartcar-alternative'),
    { ...article, inLanguage: 'en' }
  );
  assert.deepEqual(localizeSchema(home, 'en', '/'), home);
  assert.deepEqual(localizeSchema(crumbs, 'en', '/pricing'), crumbs);
});

test('localizeSiteUrl is a no-op in English and prefixes translated pages', () => {
  assert.equal(localizeSiteUrl('https://dimo.org/', 'en'), 'https://dimo.org/');
  assert.equal(
    localizeSiteUrl('https://dimo.org/products', 'en'),
    'https://dimo.org/products'
  );
  assert.equal(
    localizeSiteUrl('https://dimo.org/', 'ja'),
    'https://dimo.org/ja'
  );
  assert.equal(
    localizeSiteUrl('https://dimo.org/#products', 'ja'),
    'https://dimo.org/ja#products'
  );
  assert.equal(
    localizeSiteUrl('https://dimo.org/blog/x', 'ja'),
    'https://dimo.org/blog/x'
  );
  assert.equal(
    localizeSiteUrl('https://example.com/a', 'ja'),
    'https://example.com/a'
  );
});

test('isEnglishBuild treats a missing or "undefined" locale as English', () => {
  assert.equal(isEnglishBuild(undefined), true);
  assert.equal(isEnglishBuild('undefined'), true);
  assert.equal(isEnglishBuild('en'), true);
  assert.equal(isEnglishBuild('zh-Hans'), false);
  assert.equal(isEnglishBuild('ja'), false);
});

test('localizeSchema localizes each node of a top-level array', () => {
  const schema = [
    {
      '@type': 'TechArticle',
      url: 'https://dimo.org/compare/smartcar-alternative',
    },
    { '@type': 'FAQPage', mainEntity: [] },
  ];
  const localized = localizeSchema(
    schema,
    'es',
    '/compare/smartcar-alternative'
  );
  assert.ok(Array.isArray(localized));
  assert.deepEqual(localized, [
    {
      '@type': 'TechArticle',
      url: 'https://dimo.org/es/compare/smartcar-alternative',
      inLanguage: 'es',
    },
    { '@type': 'FAQPage', mainEntity: [], inLanguage: 'es' },
  ]);
});

test('checkPage reads the minified build output, attribute quotes dropped', () => {
  const alternates = Object.entries(pricingAlternates())
    .map(
      ([lang, href]) =>
        `<link data-rh=true rel=alternate href=${href} hreflang=${lang} />`
    )
    .join('');
  const html =
    '<html><head>' +
    '<meta data-rh=true property=og:url content=https://dimo.org/ja/pricing />' +
    '<link data-rh=true rel=canonical href=https://dimo.org/pricing />' +
    alternates +
    '<script data-rh=true type=application/ld+json>' +
    JSON.stringify({ '@type': 'WebPage', url: 'https://dimo.org/ja/pricing' }) +
    '</script></head><body></body></html>';
  assert.deepEqual(checkPage(html, 'ja/pricing.html', allPricingPages), [
    'ja/pricing.html: canonical https://dimo.org/pricing is not the page URL https://dimo.org/ja/pricing',
  ]);
});

test('isNoindex reads quoted and unquoted robots metas', () => {
  assert.equal(
    isNoindex('<meta data-rh=true name=robots content="noindex, follow"/>'),
    true
  );
  assert.equal(isNoindex('<meta name=robots content=noindex>'), true);
  assert.equal(
    isNoindex('<meta name="robots" content="index, follow">'),
    false
  );
  assert.equal(isNoindex('<meta name=description content=noindex>'), false);
});

test('localeSwitchPath keeps the locale copy on translated pages', () => {
  assert.equal(
    localeSwitchPath('ja', '/pricing', '/ja/pricing'),
    '/ja/pricing'
  );
  assert.equal(localeSwitchPath('en', '/pricing', '/pricing'), '/pricing');
});

test('localeSwitchPath points English-only pages at the locale home', () => {
  for (const path of ['/vehicles/audi/a3', '/resources', '/docs/x', '/blog']) {
    assert.equal(localeSwitchPath('en', path, path), '/');
    assert.equal(
      localeSwitchPath('zh-Hant', path, `/zh-Hant${path}`),
      '/zh-Hant/'
    );
  }
});
