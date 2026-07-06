# GEO Analysis — dimo.org

**Date:** 2026-07-05 · **Criteria:** May 2026 evidence rules (llms.txt
de-weighted per Google primary sources; brand mentions weighted; recency ~3×
citation boost; AIO and AI Mode scored separately)

## GEO Readiness Score: 55 / 100

| Dimension                 | Weight | Raw | Weighted |
| ------------------------- | ------ | --- | -------- |
| Citability                | 25%    | 52  | 13.0     |
| Structural Readability    | 20%    | 65  | 13.0     |
| Multi-Modal Content       | 15%    | 30  | 4.5      |
| Authority & Brand Signals | 20%    | 40  | 8.0      |
| Technical Accessibility   | 20%    | 83  | 16.6     |
| **Total**                 |        |     | **55**   |

Note: not comparable to the prior 61 — the rubric changed (llms.txt no longer
earns citation weight; brand mentions and multi-modal are scored harder).
Technical is near-ceiling; the gap is brand authority and citability.

## Platform Breakdown

| Platform            | Score | Limiting factor                                                                                                          |
| ------------------- | ----- | ------------------------------------------------------------------------------------------------------------------------ |
| Google AI Overviews | 53    | FAQPage schema covers 5/31 questions; entity text conflict in visible copy                                               |
| Google AI Mode      | 57    | No Wikipedia entity; freshness is strong (sitemap lastmod all <2 weeks) — EU Data Act page is the best AI Mode candidate |
| ChatGPT             | 48    | No Wikipedia entity (ChatGPT's primary grounding anchor)                                                                 |
| Perplexity          | 58    | No Reddit community; compliance + comparison content are strong citation candidates                                      |

Only ~13.7% of URLs overlap between AIO and AI Mode — treat as separate
surfaces.

## AI Crawler Access — RESOLVED ✓

GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, PerplexityBot, Google-Extended
all explicitly allowed; no crawl-delay;
`Content-Signal: ai-train=yes, search=yes, ai-input=yes` live on all pages.

## llms.txt Status

Present and well-implemented (76 annotated links, per-link descriptions, full
corpus at llms-full.txt). Under current evidence (Mueller/Illyes; server-log
audits), it is **not a citation lever** — token technical credit only. No
further investment warranted.

## Brand Mention Analysis

| Signal                | Status                                                                                                                                                                                                           | Impact                                                                                                   |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Wikipedia / Wikidata  | **MISSING**                                                                                                                                                                                                      | Highest-correlation gap; caps ChatGPT/AI Mode authority regardless of on-site work                       |
| YouTube               | **Found: youtube.com/@dimo_network** — now added to `sameAs` ✓ (deployed 87f6a7d)                                                                                                                                | Strongest measured correlate (~0.737)                                                                    |
| Reddit                | No official community found                                                                                                                                                                                      | Perplexity cites Reddit for 46.7% of answers; ChatGPT 11.3%                                              |
| Medium                | medium.com/dimo-network — now added to `sameAs` ✓                                                                                                                                                                | Moderate                                                                                                 |
| GitHub / LinkedIn / X | In `sameAs` ✓                                                                                                                                                                                                    | Solid                                                                                                    |
| Entity fragmentation  | Third-party corpus (Gate, CoinMarketCap, Variant, Polygon) frames DIMO as a **crypto/DePIN token project**; the site frames it as **developer vehicle-data infrastructure**. Legacy `docs.dimo.org` still ranks. | AI models train on the third-party framing; new authoritative dev-platform coverage is the counterweight |

## Citability (per-page)

- **Homepage — RESOLVED ✓ (2026-07-06):** self-contained ~165-word "What is
  DIMO?" answer block added directly after the hero (SSR, first 30% of page),
  stating the chain explicitly: session economy → DIMO handles vehicle access →
  build apps and businesses. Entity conflict resolved in the reverse direction
  per CEO decision: "session-based economy" IS the brand — schema descriptions
  (Organization/SoftwareApplication/WebSite) and meta description realigned to
  the session-based definition to match visible copy.
- **EU Data Act — STRONG:** dense, dated, self-contained regulatory answer in
  the first 30%. Best AI Mode candidate on the site.
- **Comparison — FIXED ✓ (87f6a7d):** live factual inversion ("Built-in agents,
  DIMO has none") corrected to "SmartCar has none". Until this deploy, AI
  engines citing that line would have answered competitor queries against DIMO.
- **FAQ — RESOLVED ✓ (2026-07-06):** FAQPage schema expanded 5 → 28, covering
  every real Q&A on the page (the earlier "31" count included 3 section-grouping
  headers that aren't questions). Schema answers mirror the visible HTML.
- **Pricing — RESOLVED ✓:** tiers/prices in raw SSR HTML; Product schema
  completed with @id/url/image (87f6a7d).

## SSR Check — RESOLVED ✓

All audited pages return full content in raw HTML; pricing tiers included. 1,151
words of indexable homepage text without JS.

## Recency — RESOLVED ✓ (2026-07-06)

Sitemap lastmod all within ~2 weeks (strong). CEO post published dated
2026-07-06 (dead links fixed: `api-references/agents-api` →
`/solutions/agentic-experiences`; `client-sdk` → `client-sdk-dimo-connect`;
"scan safely" typo → "can safely"; preview lede added). Blog now has a post
inside the <3-month window that earns the ~3× citation boost.

## Top 5 Highest-Impact Changes

1. ~~Fix comparison copy inversion~~ — **DONE, deployed (87f6a7d)**
2. ~~Align entity definition~~ — **DONE (2026-07-06).** Brand call made by CEO:
   "session-based economy" is the canonical identity. Direction reversed from
   the original suggestion — visible copy kept;
   Organization/SoftwareApplication/WebSite schema + meta description realigned
   to "DIMO is the vehicle data infrastructure powering the session-based
   economy — it handles vehicle access with a single, permissioned API for
   real-time telemetry, identity, and owner consent (SACD) across 50+ brands, so
   developers can build apps and businesses on connected vehicles. Open-source
   core." Visible copy and schema now agree. (CEO refinement: make the chain
   explicit — session economy → handles vehicle access → build apps and
   businesses.)
3. ~~Expand FAQPage schema~~ — **DONE (2026-07-06).** 5 → 28 (all real Q&As on
   the page).
4. ~~Publish one fresh technical post~~ — **DONE (2026-07-06).** CEO draft
   shipped: dead links fixed, typo fixed, preview lede added, dated 2026-07-06.
5. **Create the Wikipedia/Wikidata entity** — OPEN (off-site). The only lever
   for the biggest cap on ChatGPT/AI Mode authority. Needs secondary sources
   (press, the FTC/EU coverage angle, customer stories). Days of effort, highest
   ceiling.

Also worth doing: seed a Reddit presence (r/DIMO or active participation in
r/cars, r/selfhosted, r/electricvehicles threads about vehicle data) —
Perplexity's #1 citation source; and consider consolidating or canonicalizing
legacy `docs.dimo.org` to avoid splitting the entity across properties.

## Fixed This Session (deployed, commit 87f6a7d)

- Comparison factual inversion corrected
- YouTube channel + Medium added to Organization `sameAs`
- SoftwareApplication description matched exactly to the canonical entity
  definition
- Pricing Product schema completed (@id, url, image, entity-aligned description)

## Fixed 2026-07-06 (this session)

- Entity definition unified on the session-based economy identity (CEO brand
  decision): homepage schema (Organization/SoftwareApplication/WebSite) +
  meta/OG descriptions now match visible copy
- 158-word self-contained "What is DIMO?" answer block added to homepage first
  30% (SSR)
- FAQPage schema expanded 5 → 28 Q&As
- CEO blog post published (2026-07-06): 2 dead links fixed, typo fixed, preview
  lede added — blog re-enters <3-month freshness window

## Remaining Open (off-site)

- Wikipedia/Wikidata entity (highest ceiling)
- Reddit presence (Perplexity's #1 citation source)
- Consolidate/canonicalize legacy `docs.dimo.org`
