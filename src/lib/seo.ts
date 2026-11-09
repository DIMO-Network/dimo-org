// Locale-aware URLs for canonical, hreflang, Open Graph and JSON-LD. Kept free
// of Docusaurus imports so the build-time SEO check can reuse it under Node.

export const SITE = 'https://dimo.org';

export const LOCALES = ['en', 'es', 'ja', 'zh-Hans', 'zh-Hant'];

// Static files that are English-only and belong at the site root, not in
// every build/<locale>/ copy of static/.
export const ROOT_ONLY_FILES = ['llms.txt', 'llms-full.txt', 'robots.txt'];

// Whether this Docusaurus build is for English (the docs/blog locale).
// `docusaurus start` without --locale sets the env var to "undefined".
export function isEnglishBuild(locale: string | undefined): boolean {
  return !locale || locale === 'undefined' || locale === 'en';
}

export const OG_LOCALE: Record<string, string> = {
  en: 'en_US',
  es: 'es_ES',
  ja: 'ja_JP',
  'zh-Hans': 'zh_CN',
  'zh-Hant': 'zh_TW',
};

// Docs, blog, vehicle pages, guides, privacy and terms exist only in English;
// search isn't indexed.
export function isTranslatedPath(path: string): boolean {
  return !/^\/(?:docs|blog|vehicles|resources)(?:\/|$)|^\/(?:privacy|terms|search)$/.test(
    path
  );
}

export function localeUrl(locale: string, path: string): string {
  return `${SITE}${locale === 'en' ? '' : '/' + locale}${path === '/' ? '' : path}`;
}

// Points a dimo.org URL at the given locale's copy of the page.
export function localizeSiteUrl(url: string, locale: string): string {
  if (locale === 'en' || !url.startsWith(SITE)) return url;
  const { pathname, hash } = new URL(url);
  const path = pathname.replace(/\/$/, '') || '/';
  return isTranslatedPath(path) ? localeUrl(locale, path) + hash : url;
}

// The locale-independent path of a page: "/zh-Hans/pricing" with baseUrl
// "/zh-Hans/" is "/pricing".
export function pagePath(pathname: string, baseUrl: string): string {
  const rest = `${pathname}/`.startsWith(baseUrl)
    ? `${pathname}/`.slice(baseUrl.length)
    : pathname.replace(/^\//, '');
  return `/${rest}`.replace(/\/+$/, '') || '/';
}

// One entity per company, site and product across every locale: these keep
// their English @id and get no inLanguage.
export const SHARED_TYPES = new Set([
  'Organization',
  'Product',
  'WebSite',
  'SoftwareApplication',
  'MobileApplication',
]);

// Shared entities whose url is the site itself, never a localized page.
export const FIXED_URL_TYPES = new Set(['Organization', 'WebSite']);

// Types where schema.org defines inLanguage (CreativeWork pages).
const LANGUAGE_TYPES = new Set([
  'Article',
  'TechArticle',
  'BlogPosting',
  'WebPage',
  'FAQPage',
  'CollectionPage',
  'AboutPage',
  'ContactPage',
]);

type SchemaNode = Record<string, unknown>;

function localizeNode(node: SchemaNode, locale: string, path: string) {
  const type = node['@type'] as string;
  const englishUrl = localeUrl('en', path);
  const localize = (value: unknown) => {
    if (locale === 'en' || typeof value !== 'string') return value;
    const [base, fragment] = value.split('#');
    if (base.replace(/\/$/, '') !== englishUrl) return value;
    const url = localeUrl(locale, path);
    return fragment === undefined ? url : `${url}#${fragment}`;
  };
  if (SHARED_TYPES.has(type)) {
    if (FIXED_URL_TYPES.has(type) || !('url' in node)) return node;
    return { ...node, url: localize(node.url) };
  }
  return {
    ...node,
    ...('@id' in node && { '@id': localize(node['@id']) }),
    ...('url' in node && { url: localize(node.url) }),
    ...(LANGUAGE_TYPES.has(type) && { inLanguage: locale }),
  };
}

export function localizeSchema<T extends object>(
  schema: T,
  locale: string,
  path: string
): T {
  if (Array.isArray(schema)) {
    return schema.map(node => localizeSchema(node, locale, path)) as T;
  }
  const root = schema as SchemaNode;
  if (Array.isArray(root['@graph'])) {
    return {
      ...root,
      '@graph': root['@graph'].map(node => localizeNode(node, locale, path)),
    } as T;
  }
  return localizeNode(root, locale, path) as T;
}
