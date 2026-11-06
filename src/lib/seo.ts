// Locale-aware URLs for canonical, hreflang, Open Graph and JSON-LD. Kept free
// of Docusaurus imports so the build-time SEO check can reuse it under Node.

export const SITE = 'https://dimo.org';

export const OG_LOCALE: Record<string, string> = {
  en: 'en_US',
  es: 'es_ES',
  ja: 'ja_JP',
  'zh-Hans': 'zh_CN',
  'zh-Hant': 'zh_TW',
};

// Docs, blog, privacy and terms exist only in English; search isn't indexed.
export function isTranslatedPath(path: string): boolean {
  return !/^\/(?:docs|blog)(?:\/|$)|^\/(?:privacy|terms|search)$/.test(path);
}

export function localeUrl(locale: string, path: string): string {
  return `${SITE}${locale === 'en' ? '' : '/' + locale}${path === '/' ? '' : path}`;
}

// The locale-independent path of a page: "/zh-Hans/pricing" with baseUrl
// "/zh-Hans/" is "/pricing".
export function pagePath(pathname: string, baseUrl: string): string {
  const rest = `${pathname}/`.startsWith(baseUrl)
    ? `${pathname}/`.slice(baseUrl.length)
    : pathname.replace(/^\//, '');
  return `/${rest}`.replace(/\/+$/, '') || '/';
}

// Organization and Product ids stay shared across locales so Google sees one
// entity per company and product.
const SHARED_TYPES = new Set(['Organization', 'Product']);

type SchemaNode = Record<string, unknown>;

function localizeNode(node: SchemaNode, locale: string, path: string) {
  if (SHARED_TYPES.has(node['@type'] as string)) return node;
  const englishUrl = localeUrl('en', path);
  const localize = (value: unknown) => {
    if (typeof value !== 'string') return value;
    const [base, fragment] = value.split('#');
    if (base.replace(/\/$/, '') !== englishUrl) return value;
    const url = localeUrl(locale, path);
    return fragment === undefined ? url : `${url}#${fragment}`;
  };
  return {
    ...node,
    ...('@id' in node && { '@id': localize(node['@id']) }),
    ...('url' in node && { url: localize(node.url) }),
    inLanguage: locale,
  };
}

export function localizeSchema<T extends object>(
  schema: T,
  locale: string,
  path: string
): T {
  const root = schema as SchemaNode;
  if (Array.isArray(root['@graph'])) {
    return {
      ...root,
      '@graph': root['@graph'].map(node => localizeNode(node, locale, path)),
    } as T;
  }
  return localizeNode(root, locale, path) as T;
}
