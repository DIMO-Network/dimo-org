import { readdirSync, statSync } from 'node:fs';
import { join, relative, extname } from 'node:path';

// Canonical host is the apex domain; www.dimo.org redirects to it.
export const SITE = 'https://dimo.org';

/** Recursively collect .md / .mdx file paths under dir. */
export function walk(dir) {
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

/** docs/3_api-references/0_agents-api.mdx -> https://dimo.org/docs/api-references/agents-api */
export function toUrl(file, docsDir) {
  let rel = relative(docsDir, file).replace(/\\/g, '/');
  rel = rel.replace(/\.mdx?$/, '');
  const segs = rel
    .split('/')
    .map(s => s.replace(/^\d+[_-]/, '')) // strip numeric ordering prefix
    .filter(Boolean);
  if (segs[segs.length - 1] === 'index') segs.pop();
  return `${SITE}/docs/${segs.join('/')}`.replace(/\/$/, '');
}

/** Strip front matter, import/export lines, and obvious JSX component lines. */
export function clean(raw) {
  let body = raw.replace(/^---\n[\s\S]*?\n---\n?/, '');
  return body
    .split('\n')
    .filter(line => !/^\s*(import|export)\s/.test(line))
    .filter(line => {
      const t = line.trim();
      if (/^<https?:/i.test(t)) return true; // keep markdown autolinks
      if (/^<\/?[A-Za-z][\w.-]*/.test(t)) return false; // drop JSX/HTML tag lines
      if (/^\{\/\*[\s\S]*\*\/\}$/.test(t)) return false; // drop {/* comments */}
      return true;
    })
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export function title(raw, url) {
  const fm = raw.match(/^---\n([\s\S]*?)\n---/);
  if (fm) {
    const t = fm[1].match(/^title:\s*["']?(.+?)["']?\s*$/m);
    if (t) return t[1];
  }
  const h1 = raw.match(/^#\s+(.+)$/m);
  if (h1) return h1[1];
  return url.split('/').pop();
}
