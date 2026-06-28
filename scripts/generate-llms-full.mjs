#!/usr/bin/env node
// Generates static/llms-full.txt: the full DIMO docs corpus as plain markdown,
// for AI crawlers / LLM context. Runs before `docusaurus build`. No deps.

import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join, relative, extname } from 'node:path';

const ROOT = process.cwd();
const DOCS_DIR = join(ROOT, 'docs');
const OUT = join(ROOT, 'static', 'llms-full.txt');
// Canonical host is the apex domain; www.dimo.org redirects to it.
const SITE = 'https://dimo.org';

/** Recursively collect .md / .mdx files. */
function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      out.push(...walk(full));
    } else if (['.md', '.mdx'].includes(extname(entry))) {
      out.push(full);
    }
  }
  return out;
}

/** docs/3_api-references/0_agents-api.mdx -> /docs/api-references/agents-api */
function toUrl(file) {
  let rel = relative(DOCS_DIR, file).replace(/\\/g, '/');
  rel = rel.replace(/\.mdx?$/, '');
  const segs = rel
    .split('/')
    .map(s => s.replace(/^\d+[_-]/, '')) // strip numeric ordering prefix
    .filter(Boolean);
  if (segs[segs.length - 1] === 'index') segs.pop();
  return `${SITE}/docs/${segs.join('/')}`.replace(/\/$/, '');
}

/** Strip front matter, import/export lines, and obvious JSX component lines. */
function clean(raw) {
  let body = raw.replace(/^---\n[\s\S]*?\n---\n?/, '');
  return body
    .split('\n')
    .filter(line => !/^\s*(import|export)\s/.test(line))
    .filter(line => !/^\s*<\/?[A-Z][\w.]*/.test(line)) // <Component ...> lines
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function title(raw, url) {
  const fm = raw.match(/^---\n([\s\S]*?)\n---/);
  if (fm) {
    const t = fm[1].match(/^title:\s*["']?(.+?)["']?\s*$/m);
    if (t) return t[1];
  }
  const h1 = raw.match(/^#\s+(.+)$/m);
  if (h1) return h1[1];
  return url.split('/').pop();
}

const files = walk(DOCS_DIR).sort();
const sections = files.map(f => {
  const raw = readFileSync(f, 'utf8');
  const url = toUrl(f);
  return `# ${title(raw, url)}\n\nURL: ${url}\n\n${clean(raw)}`;
});

const header =
  `# DIMO Build — Full Documentation Corpus\n\n` +
  `> Concatenated developer documentation for the DIMO vehicle data platform.\n` +
  `> ${files.length} documents. Source: ${SITE}/docs\n`;

writeFileSync(OUT, `${header}\n${sections.join('\n\n---\n\n')}\n`, 'utf8');
console.log(`[llms-full] wrote ${files.length} docs -> ${relative(ROOT, OUT)}`);
