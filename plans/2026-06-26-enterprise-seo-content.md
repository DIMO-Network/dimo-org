# Enterprise SEO Content Strategy — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make dimo.org rank for and get AI-cited on the categories the company actually sells into — connected-vehicle data **compliance** (EU Data Act / FTC / GDPR), **vehicle session infrastructure**, **mixed-fleet rental operations**, and **per-session spend** — by building a compliance content pillar, a category pillar, comparison pages, and repositioning existing fleet pages to the enterprise buyer's search intent.

**Architecture:** All pages are React/TSX under `src/pages/` (Docusaurus renders them as routes). A new reusable `ContentPageLayout` component supplies the branded chrome (CustomNavbar + Footer + Breadcrumbs), the `<Head>` (title/description/canonical/OG + JSON-LD), and a readable article container — so each new content page is a thin file that passes metadata + body JSX, instead of hand-rebuilding a styled page. Existing fleet pages are edited in place (title/H1/intro/schema only).

**Tech Stack:** Docusaurus 3.9.2, React 19, TypeScript, existing `CustomNavbar`, `Breadcrumbs`, `theme/Footer`, lucide-react. No new dependencies.

## Global Constraints

These come from the DIMO enterprise positioning brief (`/Users/zer0stars/workspace/dimo-v3/docs/positioning-enterprise.md`). Every task inherits them.

- **Canonical host:** `https://www.dimo.org`. All absolute URLs and canonicals use it.
- **Buyer vocabulary (target intent):** write for **Director/VP of Fleet Operations** and **OEM VP Connected Services / General Counsel** — not developers. Lead pages with the operational pain ("reconciling five tabs," "who has the F-150 right now and what have they spent," "unmanned self-service rental"), not with API/SDK/open-source/AI-agents.
- **CRYPTO VOCABULARY IS BANNED on all marketing/content pages.** Never: `blockchain`, `on-chain`, `NFT`, `wallet`, `smart contract`, `DePIN`, `decentralized`, `trustless`, `permissionless`, `token`/`$DIMO`. Use the translations: blockchain/on-chain → "cryptographically signed, independently verifiable session records"; NFT → "cryptographically verifiable vehicle credential"; smart contract → "self-enforcing session rules"; wallet → "secure digital identity credential"; DePIN/decentralized → "vendor-neutral, open protocol." (Web3 terms remain allowed only inside `/docs/**` developer pages.)
- **Category name (proper noun):** "Vehicle Session Infrastructure." Defining analogy to use repeatedly: **Stripe authorizes a payment, Auth0 scopes an identity session, DIMO creates a vehicle session — scope data + access + spend, revoke at return.** Also "OAuth for vehicles."
- **Competitor framing:** anchor, don't attack. "Smartcar reads data, Geotab tracks vehicles — nobody governs sessions." "Standard Fleet proved the market exists." Differentiate architecturally (50+ OEMs, open protocol, verifiable audit trail, per-session spend), never by disparagement.
- **Metrics must be consistent (verify before publishing):** use **200K+ connected vehicles**, **50+ OEM brands**, **$25/veh/mo** vs **$45–55** fragmented stack, **500M US vehicle sessions/year**. Do NOT publish the Cintra MRR figure or the "150 reviews" number (the latter was removed as fabricated). Cintra is OEM-Layer-2 context only.
- **Prettier/ESLint:** 80-char width, single quotes, es5 trailing commas; run `npm run format` on **only the files you touched** (never repo-wide — it reformats ~50 unrelated files). Max-len 80, zero new warnings.
- **Per-task gate:** `npm run typecheck` passes and `npm run build` succeeds before commit. (Note: repo has ~37 pre-existing ESLint errors unrelated to this work; do not let them block, but add none.)
- **Plans/scratch never under `docs/`, `blog/`, `src/pages/`, `static/`** (Docusaurus publishes those). This plan lives in `plans/`.

---

## File Structure

**Create — foundation:**
- `src/components/ContentPageLayout/index.tsx` — reusable branded content page (Head+schema, navbar, hero, breadcrumbs, article container, footer).
- `src/components/ContentPageLayout/styles.module.css` — layout styles.

**Create — compliance pillar (Phase 2):**
- `src/pages/compliance/index.tsx` — pillar hub.
- `src/pages/compliance/eu-data-act.tsx`
- `src/pages/compliance/ftc-gm-consent.tsx`
- `src/pages/compliance/session-scoped-consent.tsx`
- `src/pages/compliance/vehicle-access-audit-trail.tsx`

**Create — category + spend (Phase 4):**
- `src/pages/vehicle-session-infrastructure.tsx` — category pillar.
- `src/pages/solutions/fleet-spend.tsx` — per-session spend.

**Create — comparisons (Phase 5):**
- `src/pages/compare/smartcar-alternative.tsx`
- `src/pages/compare/standard-fleet-alternative.tsx`

**Modify:**
- `src/pages/industries/rentals.tsx` — retarget title/H1/intro/schema (Phase 3).
- `src/pages/solutions/fleet-intelligence.tsx` — retarget title/H1/intro (Phase 3).
- `src/components/CustomNavbar/index.tsx` — add nav entries for Compliance + Session Infrastructure (Phase 6).
- `static/llms.txt` — add the new pillar/category URLs (Phase 6).
- `blog/2026-01-21-data-wars-...md`, and any marketing page using banned crypto terms — scrub vocabulary (Phase 6).

---

# PHASE 1 — Foundation: reusable content layout

### Task 1: Build `ContentPageLayout`

**Files:**
- Create: `src/components/ContentPageLayout/index.tsx`
- Create: `src/components/ContentPageLayout/styles.module.css`

**Interfaces — Produces:** a default-exported component every later task consumes:
```ts
interface ContentPageLayoutProps {
  title: string;          // <title> + og:title
  description: string;    // meta description (<=155 chars)
  canonicalPath: string;  // e.g. '/compliance/eu-data-act'
  breadcrumbs: { name: string; url?: string }[]; // last item omits url
  schema: object;         // JSON-LD object (Article/TechArticle/etc.)
  heroEyebrow?: string;
  heroTitle: string;      // rendered as the page <h1>
  heroSubtitle?: string;
  ctaLabel?: string;      // defaults to 'Talk to our team'
  ctaHref?: string;       // defaults to '/contact'
  children: React.ReactNode; // article body
}
```

- [ ] **Step 1: Write the layout component.**

```tsx
import React, { type ReactNode } from 'react';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import CustomNavbar from '../CustomNavbar';
import FooterTheme from '../../theme/Footer';
import Breadcrumbs from '../Breadcrumbs';
import styles from './styles.module.css';

const SITE = 'https://www.dimo.org';

interface ContentPageLayoutProps {
  title: string;
  description: string;
  canonicalPath: string;
  breadcrumbs: { name: string; url?: string }[];
  schema: object;
  heroEyebrow?: string;
  heroTitle: string;
  heroSubtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  children: ReactNode;
}

export default function ContentPageLayout({
  title,
  description,
  canonicalPath,
  breadcrumbs,
  schema,
  heroEyebrow,
  heroTitle,
  heroSubtitle,
  ctaLabel = 'Talk to our team',
  ctaHref = '/contact',
  children,
}: ContentPageLayoutProps): ReactNode {
  const url = `${SITE}${canonicalPath}`;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content={`${SITE}/img/dimo-social-card.png`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Head>
      <div className={styles.page}>
        <CustomNavbar dark={true} />
        <main>
          <header className={styles.hero}>
            {heroEyebrow && <span className={styles.eyebrow}>{heroEyebrow}</span>}
            <h1 className={styles.heroTitle}>{heroTitle}</h1>
            {heroSubtitle && (
              <p className={styles.heroSubtitle}>{heroSubtitle}</p>
            )}
            <Link className={styles.cta} to={ctaHref}>
              {ctaLabel} <span className={styles.arrow}>→</span>
            </Link>
          </header>
          <Breadcrumbs items={breadcrumbs} />
          <article className={styles.article}>{children}</article>
        </main>
        <FooterTheme />
      </div>
    </>
  );
}
```

- [ ] **Step 2: Write the CSS module.** Dark theme consistent with the site (bg `#030303`, accent `#124bdb`, Geist font, readable 720px article column).

```css
.page {
  background-color: #030303;
  color: #fff;
  min-height: 100vh;
  font-family: 'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  padding-top: 80px;
}
.hero {
  max-width: 820px;
  margin: 0 auto;
  padding: 4rem 1.5rem 2rem;
  text-align: center;
}
.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.8rem;
  color: #124bdb;
  font-weight: 600;
}
.heroTitle {
  font-size: 3rem;
  line-height: 1.05;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin: 1rem 0;
}
.heroSubtitle {
  font-size: 1.25rem;
  color: #a1a1aa;
  max-width: 680px;
  margin: 0 auto 2rem;
  line-height: 1.6;
}
.cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #fff;
  color: #000;
  padding: 0 1.75rem;
  height: 3.25rem;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
}
.cta:hover {
  color: #000;
  transform: translateY(-2px);
}
.arrow {
  transition: transform 0.2s ease;
}
.cta:hover .arrow {
  transform: translateX(4px);
}
.article {
  max-width: 720px;
  margin: 0 auto;
  padding: 1rem 1.5rem 5rem;
  font-size: 1.0625rem;
  line-height: 1.75;
  color: #d4d4d8;
}
.article h2 {
  font-size: 1.75rem;
  margin: 2.5rem 0 1rem;
  color: #fff;
}
.article h3 {
  font-size: 1.25rem;
  margin: 1.75rem 0 0.75rem;
  color: #fff;
}
.article a {
  color: #6385d9;
}
.article ul,
.article ol {
  padding-left: 1.25rem;
}
.article li {
  margin: 0.4rem 0;
}
```

- [ ] **Step 3: Verify it compiles via a throwaway smoke page.** Create `src/pages/_layout-smoke.tsx` importing the layout with minimal props, run `npm run build`, confirm `build/_layout-smoke/index.html` exists, then `git rm` the smoke file.

Run: `npm run build && test -e build/_layout-smoke/index.html && echo OK`
Expected: `OK`. Then `rm src/pages/_layout-smoke.tsx`.

- [ ] **Step 4: Format + typecheck + commit.**

```bash
npx prettier --write src/components/ContentPageLayout/index.tsx src/components/ContentPageLayout/styles.module.css
npm run typecheck
git add src/components/ContentPageLayout
git commit -m "feat(content): reusable ContentPageLayout for SEO content pages"
```

**Falsifiable:** any page using the layout builds and renders title, canonical, H1, and JSON-LD in `build/<path>/index.html`.

---

# PHASE 2 — Compliance pillar (priority #1)

Each page in this phase uses `ContentPageLayout`. The body (`children`) is authored to the outline + must-include hooks below. **Acceptance for every content page:** ≥900 words; the **first paragraph answers the title question directly** (answer-first, for AI Overviews/Perplexity); every statistic cites its source inline; ≥3 internal links; zero banned crypto terms (`grep -iE 'blockchain|on-chain|NFT|wallet|DePIN' <file>` returns nothing).

### Task 2: Compliance pillar hub — `/compliance`

**Files:** Create `src/pages/compliance/index.tsx`

**SEO (verbatim):**
- Target query: `connected vehicle data compliance`
- `title`: `Connected Vehicle Data Compliance: EU Data Act, FTC, GDPR | DIMO`
- `heroTitle` (H1): `Compliant connected-vehicle data access, by architecture`
- `description`: `How fleets and OEMs meet the EU Data Act, the FTC consent standard, GDPR, and SB-1394 for connected vehicle data — using session-scoped consent and verifiable audit trails.`
- `canonicalPath`: `/compliance`
- `breadcrumbs`: `[{name:'Home',url:SITE+'/'},{name:'Compliance'}]`
- `schema`: `{'@context':'https://schema.org','@type':'CollectionPage','name': title,'description': description,'url': SITE+'/compliance','isPartOf':{'@id':SITE+'/#website'},'publisher':{'@id':SITE+'/#organization'}}`

**Body outline:** 2–3 sentence answer-first intro; a "the regulatory wave" section linking each spoke; a "why session-scoped consent satisfies all of them" section; CTA to `/contact`. Link to all four spokes + `/vehicle-session-infrastructure` + `/products/consent`.
**Must-include hook (verbatim):** "Consent-first vehicle data access is now legally required, not ethically preferred."

- [ ] Step 1: Author the page with `ContentPageLayout` and the metadata above.
- [ ] Step 2: `npm run build`; verify `grep -c 'Connected Vehicle Data Compliance' build/compliance/index.html` ≥ 1 and `grep -ic 'blockchain\|on-chain\|wallet' build/compliance/index.html` = 0.
- [ ] Step 3: `npx prettier --write src/pages/compliance/index.tsx && git add src/pages/compliance/index.tsx && git commit -m "feat(seo): compliance pillar hub page"`

**Falsifiable:** `/compliance` builds, answer-first intro present, links to all 4 spokes. **Leading indicator:** GSC impressions for "vehicle data compliance" cluster.

### Task 3: Spoke — `/compliance/eu-data-act`

**Files:** Create `src/pages/compliance/eu-data-act.tsx` (use `ContentPageLayout`).

**SEO (verbatim):**
- Target query: `EU Data Act vehicle data`
- `title`: `EU Data Act for Vehicle Data: What OEMs & Fleets Must Do | DIMO`
- H1: `The EU Data Act and vehicle data: what changes for OEMs and fleets`
- `description`: `The EU Data Act requires OEMs to expose vehicle data to authorized third parties. Here's the compliance timeline, what's required, and how session-scoped consent meets it.`
- `canonicalPath`: `/compliance/eu-data-act`
- `breadcrumbs`: Home → Compliance (`/compliance`) → EU Data Act
- `schema` (`@type` `TechArticle`): headline=H1, description, url, `author`/`publisher` → `{'@id':SITE+'/#organization'}`, `isPartOf`→`#website`, `datePublished` `2026-06-26`.

**Body outline (≥900 words, answer-first):**
1. Answer-first: what the EU Data Act requires for vehicle data, in 2–3 sentences.
2. Timeline: "effective Sept 2025; OEM enforcement Sept 2026."
3. The forcing-function math (verbatim hook): "A 12–18 month in-house build that starts today delivers 6–12 months late. The compliance clock does not move."
4. What "compliant access" actually requires (authorization, scoping, revocation, audit).
5. How DIMO meets it: "EU Data Act compliance is a byproduct of the architecture, not a retrofit." Link `/compliance/session-scoped-consent` and `/vehicle-session-infrastructure`.
6. **Caveat to include verbatim (legal safety):** note that "formal certification review should be completed before using compliance language with European OEM procurement."
**Internal links:** hub, session-scoped-consent spoke, `/products/consent`, `/industries/oem`.

- [ ] Step 1: Author page. - [ ] Step 2: Build + verify (`grep -c 'EU Data Act' build/compliance/eu-data-act/index.html` ≥ 1; crypto-term grep = 0; word count ≥ 900). - [ ] Step 3: prettier + commit `feat(seo): EU Data Act vehicle data compliance page`.

**Falsifiable:** page builds, contains the timeline + forcing-function hook + legal caveat. **Leading indicator:** ranks top-20 for "EU Data Act vehicle data" within 60–90 days.

### Task 4: Spoke — `/compliance/ftc-gm-consent`

**Files:** Create `src/pages/compliance/ftc-gm-consent.tsx`.

**SEO (verbatim):**
- Target query: `FTC connected vehicle data` / `GM OnStar consent order`
- `title`: `The FTC's GM/OnStar Order & the End of Bulk Telematics | DIMO`
- H1: `The FTC's GM OnStar order made consent-first vehicle data the law`
- `description`: `The FTC's 2026 order against GM/OnStar bans non-consented driver-data sharing. What it means for OEMs, insurers, and why bulk telematics brokerage is now a dead business model.`
- `canonicalPath`: `/compliance/ftc-gm-consent`; breadcrumbs Home → Compliance → FTC GM Order; `TechArticle` schema as Task 3.

**Body outline (≥900 words, answer-first). Must-include verbatim facts/hooks:**
- "5-year ban" on sharing driver-behavior data; "affirmative opt-in" required; "1.8M GM customers" affected; data shared with "LexisNexis and Verisk."
- "Verisk stopped accepting OEM-sourced telematics data the same week the order was finalized."
- Thesis: "GM just proved that the old model is illegal. DIMO is the infrastructure that makes the new model work." → "bulk OEM telematics data brokerage is now legally dead as a business model."
- Tie to the insurance angle (link Task 12 fleet-intelligence / audit-trail spoke).
**Internal links:** hub, audit-trail spoke, `/industries/oem`, `/solutions/fleet-intelligence`.

- [ ] Step 1: Author. - [ ] Step 2: Build + verify (`grep`s as above). - [ ] Step 3: prettier + commit `feat(seo): FTC GM OnStar consent order explainer`.

### Task 5: Spoke — `/compliance/session-scoped-consent`

**Files:** Create `src/pages/compliance/session-scoped-consent.tsx`.

**SEO (verbatim):**
- Target query: `session-scoped consent` / `vehicle data consent management`
- `title`: `Session-Scoped Consent for Vehicle Data, Explained | DIMO`
- H1: `Session-scoped consent: consent built into the access primitive`
- `description`: `What session-scoped consent is, why grant-then-revoke beats blanket data sharing, and how it satisfies GDPR, the EU Data Act, and California SB-1394 by architecture.`
- `canonicalPath`: `/compliance/session-scoped-consent`; breadcrumbs Home → Compliance → Session-Scoped Consent; `TechArticle`.

**Body outline (≥900 words, answer-first). Must-include hooks:**
- Definition first: consent is "structurally part of the session creation primitive… compliant by architecture, not by policy."
- Contrast blanket/perpetual data sharing vs grant-scoped-revoke. Use the "logged into HBO at a hotel and someone is still using your account — now it's your car, your keys, your payment method, your location" analogy (translated, no crypto terms).
- Mechanism (translate to non-crypto): a session is created with identity + data scope + spend cap + time limit, and revoked atomically, leaving a "cryptographically signed, independently verifiable" record.
**Internal links:** hub, EU Data Act spoke, audit-trail spoke, `/products/consent`, `/vehicle-session-infrastructure`.

- [ ] Step 1 author / Step 2 build+verify / Step 3 prettier+commit `feat(seo): session-scoped consent explainer`.

### Task 6: Spoke — `/compliance/vehicle-access-audit-trail`

**Files:** Create `src/pages/compliance/vehicle-access-audit-trail.tsx`.

**SEO (verbatim):**
- Target query: `vehicle access audit trail` / `SB-1394` / `UNECE R155 vehicle access`
- `title`: `Verifiable Vehicle Access Audit Trails (SB-1394, UNECE R155) | DIMO`
- H1: `Audit-ready vehicle access: who drove, what they could do, when it ended`
- `description`: `Revocable, signed, timestamped vehicle-access records that satisfy California SB-1394 and UNECE R155 — and give insurers a verifiable trail for disputes and underwriting.`
- `canonicalPath`: `/compliance/vehicle-access-audit-trail`; breadcrumbs Home → Compliance → Audit Trails; `TechArticle`.

**Body outline (≥900 words, answer-first). Must-include hooks:**
- SB-1394 (effective 2025): access controls "must be revocable by the vehicle owner" → "session revocation is the technical implementation of SB-1394 compliance."
- UNECE R155/R156 (July 2024): access systems "must be auditable" → DIMO sessions are "signed, timestamped, and immutable — audit-ready by design" (no crypto vocab; say "cryptographically signed, independently verifiable").
- Insurer angle: "70% of fleets don't share telematics data with insurers despite lower loss ratios"; "EV insurance premiums are 49% higher than ICE."
**Internal links:** hub, ftc spoke, `/solutions/fleet-intelligence`.

- [ ] Step 1 author / Step 2 build+verify / Step 3 prettier+commit `feat(seo): vehicle access audit trail (SB-1394/UNECE) page`.

---

# PHASE 3 — Reposition existing fleet pages

### Task 7: Retarget `/industries/rentals`

**Files:** Modify `src/pages/industries/rentals.tsx` (the `<Head>` title/description, the hero H1 + first subtitle paragraph, and the JSON-LD; do **not** rebuild the page).

**SEO (verbatim):**
- Target query: `unmanned car rental software` / `mixed fleet rental management`
- New `<title>`: `Unmanned, Mixed-Fleet Rental Operations Software | DIMO`
- New H1: `Run unmanned, mixed-fleet rental — keys, data, and spend in one place`
- New meta description: `Operate rentals across Tesla, Ford, GM and 50+ brands from one dashboard. Issue digital keys, scope data, cap spend, and revoke at return — without on-site staff.`

- [ ] **Step 1:** Find the current title/H1/subtitle and replace with the above. Lead the subtitle with the reconciliation pain: `Stop toggling five tools to answer "who has this vehicle right now and what have they spent." One session governs identity, keys, data, and spend across your mixed fleet.`
- [ ] **Step 2:** Add an internal link from the page body to `/compliance` and `/vehicle-session-infrastructure`.
- [ ] **Step 3:** Build + verify the new H1 in `build/industries/rentals/index.html`; crypto-term grep = 0.
- [ ] **Step 4:** prettier + commit `fix(seo): retarget rentals page to unmanned mixed-fleet intent`.

**Falsifiable:** built page H1 = the new string. **Leading indicator:** impressions for "unmanned/mixed-fleet rental."

### Task 8: Retarget `/solutions/fleet-intelligence`

**Files:** Modify `src/pages/solutions/fleet-intelligence.tsx` (title/H1/intro/schema only).

**SEO (verbatim):**
- Target query: `mixed fleet management software` / `fleet telematics for insurance`
- New `<title>`: `Mixed-Fleet Management & Telematics, One Dashboard | DIMO`
- New H1: `See every vehicle, every session, across a mixed fleet`
- New meta: `Normalized telematics and session control across 50+ OEM brands — one integration. Share a verifiable trail with insurers and stop reconciling five systems.`

- [ ] Step 1 replace title/H1/intro (lead with "4–5 hours per week consolidating data across fragmented systems"). - [ ] Step 2 add internal links to `/compliance/vehicle-access-audit-trail` and `/industries/rentals`. - [ ] Step 3 build + verify. - [ ] Step 4 prettier + commit `fix(seo): retarget fleet-intelligence to mixed-fleet + insurer intent`.

---

# PHASE 4 — Category pillar + per-session spend

### Task 9: Category pillar — `/vehicle-session-infrastructure`

**Files:** Create `src/pages/vehicle-session-infrastructure.tsx` (use `ContentPageLayout`).

**SEO (verbatim):**
- Target query: `vehicle session infrastructure` (exact-match the category)
- `title`: `Vehicle Session Infrastructure: OAuth for Vehicles | DIMO`
- H1: `Vehicle Session Infrastructure: verify, key, scope, spend — and revoke`
- `description`: `Smartcar reads data and Geotab tracks vehicles — neither governs the session. DIMO is the access layer: create a vehicle session, scope data and spend, and revoke it atomically.`
- `canonicalPath`: `/vehicle-session-infrastructure`; breadcrumbs Home → Vehicle Session Infrastructure; `schema` `@type` `TechArticle`.

**Body outline (≥1000 words, answer-first). Must-include:**
- The Stripe/Auth0/DIMO analogy (from Global Constraints) as the opening framing.
- The "row vs column" thesis table: Fleet Telematics (Geotab/Samsara) · Connected Data API (Smartcar/Motorq/High Mobility) · Digital Key (CCC/Standard Fleet) · **Session Infrastructure (DIMO)** — with the one-liners ("Smartcar is a window into the car; DIMO is the checkout desk").
- The seven capabilities one session bundles: identity/verify · digital key · data/telemetry scope · comfort/personalization · media · spend cap · atomic revocation.
- "500M vehicle sessions per year in the US — zero have a shared protocol."
**Internal links:** `/compliance`, `/industries/rentals`, `/solutions/fleet-intelligence`, `/solutions/fleet-spend`, `/docs` (for developers).

- [ ] Step 1 author / Step 2 build+verify (H1 present, crypto-grep=0, ≥1000 words) / Step 3 prettier + commit `feat(seo): Vehicle Session Infrastructure category pillar`.

### Task 10: Per-session spend — `/solutions/fleet-spend`

**Files:** Create `src/pages/solutions/fleet-spend.tsx` (use `ContentPageLayout`).

**SEO (verbatim):**
- Target query: `fleet EV charging reimbursement` / `per-session spend control`
- `title`: `Fleet Spend & EV Charging Reimbursement, Per Session | DIMO`
- H1: `Cap spend at checkout: charging, tolls, and fuel tied to the session`
- `description`: `Stop reconciling charging, tolls, and fuel days later. DIMO ties spend to each vehicle session — home charging, public charging, and tolls, capped and reconciled automatically.`
- `canonicalPath`: `/solutions/fleet-spend`; breadcrumbs Home → Solutions → Fleet Spend; `TechArticle`.

**Body outline (≥900 words, answer-first). Must-include:**
- The pain: "Spend leaks because there's no session container" — fuel/charging/tolls "reconciled hours or days later."
- The three simultaneous EV-reimbursement problems: home charging, public charging, tolls/parking.
- Plug-and-charge hook: "get plug and charge on your next rental so you don't have to download 6 apps" — "a $0 line item today."
**Internal links:** `/vehicle-session-infrastructure`, `/products/pay`, `/industries/rentals`.

- [ ] Step 1 author / Step 2 build+verify / Step 3 prettier + commit `feat(seo): per-session fleet spend & EV charging page`.

---

# PHASE 5 — Comparison pages (bottom-funnel)

### Task 11: `/compare/smartcar-alternative`

**Files:** Create `src/pages/compare/smartcar-alternative.tsx` (use `ContentPageLayout`).

**SEO (verbatim):**
- Target query: `Smartcar alternative` / `Smartcar vs DIMO`
- `title`: `DIMO vs Smartcar: Session Control, Not Just Data | DIMO`
- H1: `DIMO vs Smartcar: from reading vehicle data to governing access`
- `description`: `Smartcar is read-only vehicle data. DIMO adds the session: identity, digital key, scoped data, spend caps, and atomic revocation across 50+ OEMs. Here's the difference.`
- `canonicalPath`: `/compare/smartcar-alternative`; breadcrumbs Home → Compare → Smartcar; `TechArticle`.

**Body outline (≥800 words). Must-include (anchor, don't attack):** "Smartcar reads data… nobody governs sessions." A neutral comparison table (Read data ✓/✓; Write/commands; Digital key; Per-session spend; Atomic revocation; Verifiable audit trail; OEM count 50+). No disparagement.
**Internal links:** `/vehicle-session-infrastructure`, `/industries/rentals`, `/docs`.

- [ ] Step 1 author / Step 2 build+verify / Step 3 prettier + commit `feat(seo): DIMO vs Smartcar comparison page`.

### Task 12: `/compare/standard-fleet-alternative`

**Files:** Create `src/pages/compare/standard-fleet-alternative.tsx`.

**SEO (verbatim):**
- Target query: `Standard Fleet alternative`
- `title`: `DIMO vs Standard Fleet: Open, Multi-OEM Session Infrastructure | DIMO`
- H1: `DIMO vs Standard Fleet: open protocol, 50+ OEMs, verifiable audit trail`
- `description`: `Standard Fleet proved fleets want connected control. DIMO delivers it as an open, multi-OEM protocol with a verifiable audit trail and per-session spend across 50+ brands.`
- `canonicalPath`: `/compare/standard-fleet-alternative`; breadcrumbs Home → Compare → Standard Fleet; `TechArticle`.

**Body outline (≥800 words). Anchor, don't attack:** open with "Standard Fleet proved the market exists." Differentiate architecturally only: ~30 vs 50+ OEMs, proprietary SaaS vs open protocol, app-layer logs vs verifiable audit trail. **Do not** publish competitor pricing as fact (frame DIMO's own $25/veh/mo vs $45–55 fragmented stack).
**Internal links:** `/vehicle-session-infrastructure`, `/industries/rentals`, `/compliance`.

- [ ] Step 1 author / Step 2 build+verify / Step 3 prettier + commit `feat(seo): DIMO vs Standard Fleet comparison page`.

---

# PHASE 6 — Wire-up, guardrails, discoverability

### Task 13: Add nav entries

**Files:** Modify `src/components/CustomNavbar/index.tsx`.

- [ ] **Step 1:** Add a top-level `Solutions`/`Industries` dropdown entry (follow the existing dropdown markup pattern) linking to `/vehicle-session-infrastructure` and `/compliance`. Match the existing `dropdownItemWithIcon` structure; use lucide icons already imported (e.g., `Shield` for Compliance).
- [ ] **Step 2:** Build; verify both links render in `build/index.html` nav.
- [ ] **Step 3:** prettier + commit `feat(nav): surface Session Infrastructure + Compliance in nav`.

### Task 14: Scrub banned crypto vocabulary from public copy

**Files:** Modify any file under `src/pages/**` and `blog/**` that uses banned terms (the data-wars blog post is known: "auditable on-chain," "Blockchain-native audit trails").

- [ ] **Step 1: Find every occurrence.**
```bash
grep -rinE 'blockchain|on-chain|onchain|\bNFT\b|\bwallet\b|smart contract|DePIN|decentrali|trustless|permissionless' src/pages blog
```
- [ ] **Step 2:** Replace each per the Global Constraints mapping (e.g., "auditable on-chain" → "auditable and independently verifiable"; "Blockchain-native audit trails" → "cryptographically signed, independently verifiable audit trails"). Preserve meaning; do not touch `/docs/**`.
- [ ] **Step 3:** Re-run the grep over `src/pages blog`; expect **0** matches.
- [ ] **Step 4:** Build + prettier (touched files only) + commit `fix(positioning): translate crypto vocabulary out of marketing copy`.

**Falsifiable:** grep over `src/pages` + `blog` returns 0 banned terms. **Why:** the brief: "'Blockchain' triggers the crypto risk-assessment reflex — the buyer categorizes DIMO as a crypto company before value lands."

### Task 15: Add new pages to `llms.txt` + verify sitemap

**Files:** Modify `static/llms.txt`.

- [ ] **Step 1:** Add a "## Compliance" section and the category page to `static/llms.txt`:
```
## Compliance
- [Connected Vehicle Data Compliance](https://www.dimo.org/compliance)
- [EU Data Act for Vehicle Data](https://www.dimo.org/compliance/eu-data-act)
- [FTC GM/OnStar Consent Order](https://www.dimo.org/compliance/ftc-gm-consent)
- [Session-Scoped Consent](https://www.dimo.org/compliance/session-scoped-consent)
- [Vehicle Access Audit Trails](https://www.dimo.org/compliance/vehicle-access-audit-trail)

## Category
- [Vehicle Session Infrastructure](https://www.dimo.org/vehicle-session-infrastructure)
```
- [ ] **Step 2:** Build; verify every new route is in `build/sitemap.xml` (auto-generated): `for u in compliance compliance/eu-data-act vehicle-session-infrastructure solutions/fleet-spend compare/smartcar-alternative; do grep -c "/$u" build/sitemap.xml; done` (each ≥1).
- [ ] **Step 3:** commit `chore(seo): list compliance + category pages in llms.txt`.

---

## Self-Review

- **Spec coverage vs the 5 strategic moves:** (1) compliance pillar → Tasks 2–6 ✓; (2) reposition fleet pages → Tasks 7–8 ✓; (3) category pillar → Task 9 ✓; (4) per-session spend ("digital payment" reframed) → Task 10 ✓; (5) comparison pages → Tasks 11–12 ✓. Guardrails (no-crypto, nav, discoverability) → Tasks 13–15 ✓. Foundation → Task 1 ✓. The original "vehicle telemetry" query is served by Task 8 (fleet telematics/insurer intent) and Task 9 (data-scope capability) rather than a standalone page, because the brief forbids competing as a "telematics platform" — noted, intentional, not a gap.
- **Placeholder scan:** content bodies are specified as outline + verbatim SEO strings + must-include hooks + measurable acceptance criteria (word count, answer-first, grep gates), not "TODO." The body prose is authored at execution to that brief — this is editorial work, not code, and cannot be pre-written without becoming the article itself. All SEO-critical short strings (title/H1/meta/slug/schema) are given verbatim.
- **Type consistency:** every content page consumes the single `ContentPageLayoutProps` interface from Task 1 (same prop names throughout: `title`, `description`, `canonicalPath`, `breadcrumbs`, `schema`, `heroTitle`, `children`). `Breadcrumbs` items use `{name, url?}` to match the existing `src/components/Breadcrumbs` API used by `industries/oem.tsx`.
- **Sequencing:** Task 1 is a hard dependency for Tasks 2–6, 9–12. Phase 3 (edits) and Phase 6 are independent. Recommend shipping **Phase 2 (compliance pillar) first** as its own PR — it's the highest fit-to-goals × winnability and stands alone.
- **Out of scope (flagged, not silently dropped):** actual ranking depends on authority/backlinks + time (weeks-to-months to recrawl); Wikipedia entity and a backlink push are separate from this content build. Verify all customer/metric claims (Cintra MRR vs grant figure; "300+" vs "120+" repos) against a current source before publishing.
