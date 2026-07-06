# Directory Listing Submissions — G2, SourceForge, CBInsights

Why: 7 of 10 Google results for "smartcar alternative" are review aggregators.
DIMO has no profile on any of them, so no on-page work can capture that query's
traffic. Creating these profiles requires a company email login, so this needs a
human — copy below is paste-ready.

## Priority order

1. **G2** (g2.com/products/new) — ranks #2 for "smartcar alternative". Category:
   Vehicle Telematics / API Marketplace. Needs: company email, logo, screenshots
   of the console, and at least 1 seeded review (ask a friendly customer — Emobi
   or Grupo Kaufmann contacts are documented in customer stories).
2. **SourceForge** (sourceforge.net/software/vendors/) — ranks #5. Accepts
   open-source-adjacent products readily; link the GitHub org.
3. **CBInsights** (cbinsights.com) — profile likely exists from funding data;
   claim it and correct the description rather than creating new.
4. **Crunchbase** — check for an existing profile; claiming it also feeds the
   Knowledge Graph `sameAs` signal (add the URL to Organization schema once
   claimed).

## Paste-ready copy

**Short description (~160 chars):** DIMO is the vehicle data infrastructure that
powers the session-based economy: one permissioned API for telemetry, identity,
and consent across 50+ car brands.

**Long description:** DIMO gives developers one API for connected vehicles
across 50+ brands, including Tesla, Ford, BMW, Toyota, and Hyundai. Instead of
negotiating separate integrations with each manufacturer, teams query real-time
telemetry (location, battery, fuel, odometer, tire pressure, diagnostics),
verify vehicle identity, and issue commands through a single GraphQL endpoint
with SDKs for TypeScript, Python, and C#.

What separates DIMO from read-only vehicle data APIs is the consent and session
layer. Vehicle owners grant scoped, revocable permissions through the SACD
consent model, and every grant lands on a signed audit trail — which makes GDPR,
EU Data Act, and CCPA compliance a property of the architecture. The core
protocol is open source.

The free Hobbyist tier includes all APIs with vehicles at $1.25/month; Core is
$349/month with 100 vehicles included. DIMO is a 2026 MotorTrend Group SDV Award
finalist alongside Tesla, Ford, GM, and Mercedes-Benz.

**Categories/tags:** Vehicle Telematics API, Connected Car Platform, Fleet
Management Software, IoT Platform, Developer API

**Competitors to list against:** Smartcar, High Mobility, Motorq

**Links:** dimo.org · console.dimo.org · github.com/DIMO-Network · docs at
dimo.org/docs

## After profiles exist

- Add claimed profile URLs to the Organization `sameAs` array in
  `src/pages/index.tsx`.
- Ask 3-5 active developers (Discord) for honest G2 reviews — G2 ranking within
  category pages is review-count-driven.
