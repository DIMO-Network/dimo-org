import React, { type ReactNode } from 'react';
import Link from '@docusaurus/Link';
import ContentPageLayout from '../../components/ContentPageLayout';

const SITE = 'https://dimo.org';

const TITLE = 'DIMO vs Smartcar: Session Control, Not Just Data | DIMO';
const DESCRIPTION =
  'Smartcar is pass-through vehicle data with conversion. DIMO is storage with sharing: identity, consent, digital keys, spend caps, and atomic revocation. Self-hostable, and it can even ingest through Smartcar.';
const H1 = 'DIMO vs Smartcar: from reading vehicle data to governing access';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: H1,
  description: DESCRIPTION,
  url: `${SITE}/compare/smartcar-alternative`,
  image: `${SITE}/img/dimo-social-card.png`,
  datePublished: '2026-06-26',
  dateModified: '2026-07-06',
  isPartOf: { '@id': `${SITE}/#website` },
  author: {
    '@type': 'Organization',
    '@id': `${SITE}/#organization`,
    name: 'DIMO',
  },
  publisher: {
    '@type': 'Organization',
    '@id': `${SITE}/#organization`,
    name: 'DIMO',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Do I need hardware to use DIMO instead of Smartcar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Most of the 50+ supported brands connect through software integrations. The optional DIMO LTE R1 adapter adds high-frequency data for vehicles without a usable cloud API.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can a vehicle owner revoke access mid-session?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Revocation is atomic: the key, the data grant, and the spend authorization all end together, and the session record stays on the audit trail.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is DIMO compliant in Europe?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The SACD consent model was built for GDPR and the EU Data Act. Every query runs against an owner-granted, scoped, revocable permission recorded on a signed audit trail.',
      },
    },
  ],
};

export default function SmartcarAlternative(): ReactNode {
  return (
    <ContentPageLayout
      title={TITLE}
      description={DESCRIPTION}
      canonicalPath="/compare/smartcar-alternative"
      breadcrumbs={[
        { name: 'Home', url: `${SITE}/` },
        { name: 'Smartcar alternative' },
      ]}
      schema={[schema, faqSchema]}
      heroEyebrow="Compare"
      ctaLabel="Get API keys"
      ctaHref="https://console.dimo.org/sign-in"
      heroTitle={H1}
      heroSubtitle="Smartcar converts an OEM feed and passes it through to you. DIMO stores vehicle data with owner consent, sharing, and sessions built in, and can even ingest through Smartcar itself. Here is how to think about the difference."
    >
      <p>
        If you are evaluating Smartcar, you are almost certainly trying to do
        one of two things: read vehicle data across many brands, or build a
        product that <em>acts</em> on vehicles: unlock, grant access, cap spend,
        and cleanly end it all. Smartcar is excellent at the first. DIMO is
        built for the second.{' '}
        <strong>
          Smartcar is a window into the car; DIMO is the checkout desk.
        </strong>
      </p>
      <p>
        Smartcar reads data and issues commands through a clean API. What it
        does not provide is a <em>session</em>: a single object that bundles
        identity, a digital key, a scoped data grant, a spend cap, and atomic
        revocation, with a verifiable record when it ends. For a dashboard or an
        analytics feature, you may never need that. For a rental, a carshare, or
        any case where a stranger temporarily uses a vehicle, the session is the
        whole job.
      </p>
      <p>
        The architectural difference underneath: Smartcar is pass-through with
        conversion. It translates an OEM feed and hands the result to you. It is
        not a system of record, it has no data sharing or consent model, and you
        cannot self-host it. DIMO is data storage with sharing: ingested signals
        become normalized time-series that vehicle owners can share, scope, and
        revoke, on infrastructure you can run yourself because the core is open
        source.
      </p>

      <h2>Side by side</h2>
      <table>
        <thead>
          <tr>
            <th>Capability</th>
            <th>Smartcar</th>
            <th>DIMO</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Read vehicle data across brands</td>
            <td>Yes</td>
            <td>Yes (50+ brands already connected)</td>
          </tr>
          <tr>
            <td>Issue commands (lock/unlock)</td>
            <td>Yes</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Stores data as a shareable system of record</td>
            <td>— (pass-through with conversion)</td>
            <td>Yes (consent-governed time-series)</td>
          </tr>
          <tr>
            <td>Self-hostable</td>
            <td>—</td>
            <td>Yes (open-source core)</td>
          </tr>
          <tr>
            <td>Ingests from other connectivity providers</td>
            <td>—</td>
            <td>Yes (including Smartcar, Flespi, Volteras)</td>
          </tr>
          <tr>
            <td>Digital key as part of a session</td>
            <td>—</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Per-session spend cap</td>
            <td>—</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Atomic revocation of a whole session</td>
            <td>—</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Verifiable, signed access audit trail</td>
            <td>—</td>
            <td>Yes</td>
          </tr>
        </tbody>
      </table>

      <h2>How the pricing models differ</h2>
      <p>
        Smartcar prices per connected vehicle with plan minimums, which works
        well when every connected car maps to a paying end user. DIMO separates
        the two decisions. The Hobbyist tier is free with vehicles at
        $1.25/month each, so you can validate an idea against your own car
        before any commitment. Core is $349/month with 100 vehicles included and
        higher rate limits for production apps. Enterprise adds custom SLAs,
        on-premise deployment, and volume pricing. There is no charge for the
        consent and session layer itself; it ships with every tier.
      </p>
      <p>
        One structural difference matters more than the numbers: DIMO&apos;s
        core protocol is open source. If pricing or terms ever stop working for
        you, the exit path is running the infrastructure yourself rather than
        rewriting your product against a new proprietary API.
      </p>

      <h2>You may not need to migrate at all</h2>
      <p>
        This is the part most evaluations miss: DIMO and Smartcar are not
        mutually exclusive. DIMO can ingest data <em>through</em> Smartcar (and
        through Flespi or Volteras) the same way it ingests from OEM oracles or
        its own hardware. If your Smartcar integration works, keep it as the
        connectivity layer and put DIMO on top for what Smartcar does not do:
        storage, owner consent, sharing, sessions, and an audit trail. See the{' '}
        <Link to="https://github.com/DIMO-Network/oracle-example">
          oracle example
        </Link>{' '}
        for how ingest sources plug in.
      </p>

      <h2>Migrating from Smartcar</h2>
      <p>
        If you do want to replace Smartcar outright, most migrations are
        endpoint mapping, not re-architecture. Smartcar&apos;s REST reads
        (odometer, location, battery, fuel) map to DIMO&apos;s GraphQL Telemetry
        API, and vehicle authorization maps to a SACD consent grant. The
        practical sequence: create a free account at console.dimo.org, generate
        API keys, point the{' '}
        <Link to="/docs/build/building-with-tools/server-sdk">
          TypeScript, Python, or C# SDK
        </Link>{' '}
        at your existing data model, and run both providers in parallel while
        your users re-consent. The{' '}
        <Link to="/docs/comparison">platform comparison in the docs</Link>{' '}
        includes a field-by-field migration guide with code samples.
      </p>

      <h2>Where Smartcar is still the right call</h2>
      <p>
        Honest answer: if your product only reads data, never touches access
        control, and your users are all in Smartcar&apos;s coverage footprint,
        Smartcar is a mature, well-documented choice and switching would buy you
        little. The reason developers move to DIMO is almost always that their
        roadmap grew past read-only: they need keys, scoped grants,
        session-based billing, or an audit trail regulators will accept, and
        bolting those onto a read-only API means building the hard part
        themselves.
      </p>

      <h2>Common questions</h2>
      <p>
        <strong>Do I need hardware?</strong> No. Most of the 50+ supported
        brands connect through software integrations. The optional DIMO LTE R1
        adapter adds high-frequency data for vehicles without a usable cloud
        API.
      </p>
      <p>
        <strong>Can a vehicle owner revoke access mid-session?</strong> Yes.
        Revocation is atomic: the key, the data grant, and the spend
        authorization all end together, and the session record stays on the
        audit trail.
      </p>
      <p>
        <strong>Is this compliant in Europe?</strong> The SACD consent model was
        built for GDPR and the EU Data Act; see the{' '}
        <Link to="/compliance/eu-data-act">EU Data Act guide</Link> for
        specifics.
      </p>

      <h2>When to choose which</h2>
      <p>
        Choose Smartcar when your product is fundamentally about{' '}
        <em>reading</em> data: usage analytics, EV charging insights, a service
        that needs odometer or battery state. Choose DIMO when your product{' '}
        <em>governs access</em>: unmanned rental, carshare, fleet dispatch,
        per-session insurance. It needs identity, keys, data, spend, and
        revocation to behave as one consented, auditable unit.
      </p>
      <p>
        The model behind that is{' '}
        <Link to="/vehicle-session-infrastructure">
          vehicle session infrastructure
        </Link>
        ; see it applied to{' '}
        <Link to="/industries/rentals">rental operations</Link>. For the product
        itself, the{' '}
        <Link to="/connected-car-api">connected car API overview</Link> and{' '}
        <Link to="/vehicle-data-api">vehicle data API</Link> pages cover
        capabilities and signals, <Link to="/pricing">pricing</Link> is
        published (free Hobbyist tier, $349/month Core), and the{' '}
        <Link to="/docs">developer docs</Link> take you to a first API call.
      </p>
    </ContentPageLayout>
  );
}
