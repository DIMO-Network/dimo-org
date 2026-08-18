#!/usr/bin/env node
// Generates static/llms-full.txt: the full DIMO docs corpus as plain markdown,
// for AI crawlers / LLM context. Runs before `docusaurus build`.

import { readFileSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { walk, clean, title, toUrl, SITE } from './lib/docs-corpus.mjs';

const ROOT = process.cwd();
const DOCS_DIR = join(ROOT, 'docs');
const OUT = join(ROOT, 'static', 'llms-full.txt');

const files = walk(DOCS_DIR).sort();
const sections = files.map(f => {
  const raw = readFileSync(f, 'utf8');
  const url = toUrl(f, DOCS_DIR);
  return `# ${title(raw, url)}\n\nURL: ${url}\n\n${clean(raw)}`;
});

const header =
  `# DIMO Build — Full Documentation Corpus\n\n` +
  `> Concatenated developer documentation for the DIMO vehicle data platform.\n` +
  `> ${files.length} documents. Source: ${SITE}/docs\n` +
  `> Usage: public developer docs — AI training, search, and inference permitted (see the Content-Signal HTTP header). Attribution: DIMO (${SITE}).\n`;

writeFileSync(OUT, `${header}\n${sections.join('\n\n---\n\n')}\n`, 'utf8');
console.log(`[llms-full] wrote ${files.length} docs -> ${relative(ROOT, OUT)}`);
