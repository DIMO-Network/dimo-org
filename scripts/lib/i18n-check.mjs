// Docusaurus silently falls back to English for any id a locale file lacks,
// so a gap only shows up as stray English on the live page. This lists them.
export function missingTranslations(en, other) {
  return Object.keys(en).filter(id => !other[id]?.message?.trim());
}

// Differences between the committed i18n/en files and a fresh
// write-translations run, both given as { [file]: { [id]: { message } } }.
export function translationDrift(committed, fresh) {
  const files = [
    ...new Set([...Object.keys(committed), ...Object.keys(fresh)]),
  ];
  return files.sort().flatMap(file => {
    if (!committed[file]) return [`${file} is missing`];
    if (!fresh[file]) return [`${file} is no longer generated`];
    const ids = [
      ...new Set([
        ...Object.keys(committed[file]),
        ...Object.keys(fresh[file]),
      ]),
    ];
    return ids.sort().flatMap(id => {
      const was = committed[file][id]?.message;
      const now = fresh[file][id]?.message;
      if (was === undefined) return [`${file}: ${id} is missing`];
      if (now === undefined)
        return [`${file}: ${id} is no longer in the source`];
      return was === now
        ? []
        : [`${file}: ${id} is "${was}", source says "${now}"`];
    });
  });
}
