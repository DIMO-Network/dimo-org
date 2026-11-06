// Docusaurus silently falls back to English for any id a locale file lacks,
// so a gap only shows up as stray English on the live page. This lists them.
export function missingTranslations(en, other) {
  return Object.keys(en).filter(id => !other[id]?.message?.trim());
}
