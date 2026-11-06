import i18n from '@generated/i18n';

// Docs, blog, privacy and terms exist only in the English build. From a
// translated page, pathname:// makes Docusaurus treat the link as a plain
// <a> to the English URL instead of a route missing from this locale's build.
export function englishHref(path: string): string {
  return i18n.currentLocale === i18n.defaultLocale
    ? path
    : `pathname://${path}`;
}
