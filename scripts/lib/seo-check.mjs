// Checks one built HTML page for the locale/indexing mistakes that make Google
// drop a translated page: a canonical, og:url or JSON-LD url pointing at
// another locale, and hreflang alternates that are missing, noindex or lack
// x-default.
import { SITE, isTranslatedPath } from '../../src/lib/seo.ts';

const LOCALES = ['es', 'ja', 'zh-Hans', 'zh-Hant'];
const SHARED_TYPES = new Set(['Organization', 'Product']);

function localeOf(path) {
  const first = path.split('/').find(Boolean);
  return LOCALES.includes(first) ? first : 'en';
}

function urlPath(url) {
  return new URL(url).pathname.replace(/\/$/, '') || '/';
}

function tags(html, name) {
  const attrs = /([\w:-]+)="([^"]*)"/g;
  return [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'g'))].map(([tag]) =>
    Object.fromEntries(
      [...tag.matchAll(attrs)].map(([, k, v]) => [
        k.toLowerCase(),
        v.replaceAll('&amp;', '&'),
      ])
    )
  );
}

function jsonLdNodes(html) {
  const scripts = html.matchAll(
    /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g
  );
  return [...scripts].flatMap(([, json]) => {
    const roots = [JSON.parse(json)].flat();
    return roots.flatMap(root => root['@graph'] ?? [root]);
  });
}

function isLocalizedPageUrl(url) {
  if (typeof url !== 'string' || !url.startsWith(SITE)) return false;
  const path = urlPath(url);
  return !/\.\w+$/.test(path) && isTranslatedPath(stripLocale(path));
}

function stripLocale(path) {
  const locale = localeOf(path);
  return locale === 'en' ? path : path.slice(locale.length + 1) || '/';
}

export function checkPage(html, file, existing) {
  const locale = localeOf(file);
  const reports = [];
  const expectLocale = (label, url) => {
    if (url && localeOf(urlPath(url)) !== locale) {
      reports.push(`${file}: ${label} ${url} is not in locale ${locale}`);
    }
  };

  const links = tags(html, 'link');
  const metas = tags(html, 'meta');

  expectLocale('canonical', links.find(l => l.rel === 'canonical')?.href);
  expectLocale('og:url', metas.find(m => m.property === 'og:url')?.content);
  for (const node of jsonLdNodes(html)) {
    if (SHARED_TYPES.has(node['@type'])) continue;
    if (isLocalizedPageUrl(node.url)) expectLocale('JSON-LD url', node.url);
  }

  const alternates = links.filter(l => l.rel === 'alternate' && l.hreflang);
  if (alternates.length === 0) return reports;

  const robots = metas.find(m => m.name === 'robots')?.content ?? '';
  if (/noindex/i.test(robots)) {
    reports.push(`${file}: noindex page declares hreflang alternates`);
  }
  for (const { hreflang, href } of alternates) {
    if (!existing.has(urlPath(href))) {
      reports.push(
        `${file}: hreflang ${hreflang} target ${href} is missing or noindex`
      );
    }
  }
  if (!alternates.some(l => l.hreflang === 'x-default')) {
    reports.push(`${file}: hreflang alternates lack x-default`);
  }
  return reports;
}
