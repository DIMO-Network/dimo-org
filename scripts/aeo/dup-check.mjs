// Near-duplicate check for built vehicle pages. Compares the AEO body
// (inside [data-aeo-body], so shared chrome is excluded) of every pair of
// model pages from the same make using 5-word shingle Jaccard similarity.
// Usage: node scripts/aeo/dup-check.mjs [buildDir]
import { readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';

const FAIL = 0.6;
const WARN = 0.45;
const SHINGLE = 5;

export function aeoBodyText(html) {
  const start = html.indexOf('data-aeo-body');
  if (start === -1) return null;
  const end = html.indexOf('</article>', start);
  return html
    .slice(html.indexOf('>', start) + 1, end === -1 ? undefined : end)
    .replace(/<(script|style)[\s\S]*?<\/\1>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z#0-9]+;/gi, ' ')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

export function shingles(words, n = SHINGLE) {
  const set = new Set();
  for (let i = 0; i + n <= words.length; i++) {
    set.add(words.slice(i, i + n).join(' '));
  }
  return set;
}

export function jaccard(a, b) {
  if (a.size === 0 && b.size === 0) return 0;
  let inter = 0;
  for (const s of a) if (b.has(s)) inter++;
  return inter / (a.size + b.size - inter);
}

// Model pages live at <buildDir>/vehicles/<make>/<model>.html (or
// <model>/index.html); brand hubs at vehicles/<make>.html are skipped.
function modelPages(vehiclesDir) {
  const pages = [];
  for (const make of readdirSync(vehiclesDir)) {
    const makeDir = path.join(vehiclesDir, make);
    if (!statSync(makeDir).isDirectory()) continue;
    for (const entry of readdirSync(makeDir)) {
      const full = path.join(makeDir, entry);
      const file = statSync(full).isDirectory()
        ? path.join(full, 'index.html')
        : full;
      if (!file.endsWith('.html')) continue;
      const words = aeoBodyText(readFileSync(file, 'utf8'));
      if (words)
        pages.push({
          make,
          page: `${make}/${entry.replace(/\.html$/, '')}`,
          shingles: shingles(words),
        });
    }
  }
  return pages;
}

export function comparePairs(pages) {
  const pairs = [];
  for (let i = 0; i < pages.length; i++) {
    for (let j = i + 1; j < pages.length; j++) {
      if (pages[i].make !== pages[j].make) continue;
      pairs.push({
        a: pages[i].page,
        b: pages[j].page,
        score: jaccard(pages[i].shingles, pages[j].shingles),
      });
    }
  }
  return pairs.sort((x, y) => y.score - x.score);
}

function main() {
  const buildDir = process.argv[2] ?? 'build';
  const pages = modelPages(path.join(buildDir, 'vehicles'));
  const pairs = comparePairs(pages);
  console.log(
    `dup-check: ${pages.length} vehicle pages, ${pairs.length} same-make pairs`
  );
  for (const p of pairs.slice(0, 10)) {
    const flag = p.score > FAIL ? 'FAIL' : p.score > WARN ? 'warn' : 'ok  ';
    console.log(`  ${flag} ${p.score.toFixed(3)}  ${p.a} ~ ${p.b}`);
  }
  const failing = pairs.filter(p => p.score > FAIL);
  const warning = pairs.filter(p => p.score > WARN && p.score <= FAIL);
  for (const p of warning) {
    console.log(
      `::warning::${p.a} and ${p.b} are ${(p.score * 100).toFixed(0)}% similar`
    );
  }
  if (failing.length) {
    for (const p of failing) {
      console.log(
        `::error::${p.a} and ${p.b} are ${(p.score * 100).toFixed(0)}% similar (limit ${FAIL * 100}%)`
      );
    }
    process.exitCode = 1;
  }
}

if (import.meta.main) main();
