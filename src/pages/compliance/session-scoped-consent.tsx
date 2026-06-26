import React, { type ReactNode } from 'react';
import Link from '@docusaurus/Link';
import ContentPageLayout from '../../components/ContentPageLayout';

const SITE = 'https://www.dimo.org';

const TITLE = 'Session-Scoped Consent for Vehicle Data, Explained | DIMO';
const DESCRIPTION =
  'What session-scoped consent is, why grant-then-revoke beats blanket data sharing, and how it satisfies GDPR, the EU Data Act, and California SB-1394 by architecture.';
const H1 = 'Session-scoped consent: consent built into the access primitive';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: H1,
  description: DESCRIPTION,
  url: `${SITE}/compliance/session-scoped-consent`,
  datePublished: '2026-06-26',
  isPartOf: { '@id': `${SITE}/#website` },
  author: { '@id': `${SITE}/#organization`, name: 'DIMO' },
  publisher: { '@id': `${SITE}/#organization`, name: 'DIMO' },
};

export default function SessionScopedConsent(): ReactNode {
  return (
    <ContentPageLayout
      title={TITLE}
      description={DESCRIPTION}
      canonicalPath="/compliance/session-scoped-consent"
      breadcrumbs={[
        { name: 'Home', url: `${SITE}/` },
        { name: 'Compliance', url: `${SITE}/compliance` },
        { name: 'Session-Scoped Consent' },
      ]}
      schema={schema}
      heroEyebrow="Compliance · Consent"
      heroTitle={H1}
      heroSubtitle="Most vehicle data systems treat consent as a policy bolted onto a data pipe. Session-scoped consent makes it part of how access is created — and revoked."
    >
      <p>
        <strong>Session-scoped consent</strong> means the user&apos;s permission
        is structurally part of creating an access session, not a separate
        policy applied afterward. Instead of granting a service blanket,
        perpetual access to a vehicle&apos;s data, the owner authorizes a
        specific session: a defined scope of data and capabilities, for a
        defined purpose, for a defined time, after which everything revokes at
        once. Consent is
        <em> compliant by architecture, not by policy.</em>
      </p>

      <h2>The problem with blanket consent</h2>
      <p>
        Think about logging into a streaming account at a hotel two years ago.
        There is a decent chance a stranger is still using it, because the
        access you granted never cleanly ended. Now imagine that is not a
        streaming login. It is your car, your digital key, your payment method,
        and your location. That is what blanket, perpetual data sharing looks
        like in the vehicle world: access is granted broadly, scoped loosely,
        and almost never revoked in a way you can verify.
      </p>
      <p>
        Regulators have decided that model is no longer acceptable. GDPR demands
        purpose limitation and the right to withdraw; the{' '}
        <Link to="/compliance/eu-data-act">EU Data Act</Link> demands scoped,
        user-directed access; the{' '}
        <Link to="/compliance/ftc-gm-consent">FTC&apos;s GM/OnStar order</Link>{' '}
        demands affirmative opt-in. Every one of them is, in effect, asking for
        consent that is specific, revocable, and provable.
      </p>

      <h2>How session-scoped consent works</h2>
      <p>
        A vehicle session is created as a single operation that carries
        everything the access needs:
      </p>
      <ul>
        <li>
          <strong>Identity:</strong> who is being granted access, verified.
        </li>
        <li>
          <strong>Scope:</strong> exactly which data and capabilities, and
          nothing more.
        </li>
        <li>
          <strong>Spend and time limits:</strong> a cap and an expiry, so access
          is bounded by design.
        </li>
        <li>
          <strong>Atomic revocation:</strong> when the session ends, every
          permission inside it is withdrawn together, not one system at a time.
        </li>
      </ul>
      <p>
        When the session closes, it seals a{' '}
        <strong>cryptographically signed, independently verifiable</strong>{' '}
        record of what was authorized and when it ended. Because consent is part
        of session creation, you cannot have access without a consent artifact,
        and you cannot have lingering access after revocation. The compliance
        properties regulators ask for are not added later. They are the only way
        the system works.
      </p>

      <h2>A concrete example: a three-day rental</h2>
      <p>
        Picture a driver renting a connected vehicle for a weekend. With
        session-scoped consent, the rental creates one session at checkout: it
        verifies the driver, issues a digital key, scopes data access to
        location and trip telemetry for the rental period only, sets a spend cap
        for charging and tolls, and stamps a 72-hour expiry. The driver can see
        precisely what they granted. When they return the car, the session ends:
        the key stops working, data access stops, and a signed record of the
        whole arrangement is sealed.
      </p>
      <p>
        Nothing lingers. There is no open data feed after the return, no key
        that still works in a stranger&apos;s hands, and no need for anyone to
        manually go disable five separate systems. The consent and its
        boundaries were the access, so ending the access ended the consent,
        cleanly and provably.
      </p>

      <h2>Blanket consent vs. session-scoped consent</h2>
      <table>
        <thead>
          <tr>
            <th>Property</th>
            <th>Blanket consent</th>
            <th>Session-scoped consent</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>When consent is captured</td>
            <td>Once, up front, broadly</td>
            <td>Per access event, as part of creating it</td>
          </tr>
          <tr>
            <td>Scope of data</td>
            <td>Loosely defined, often everything</td>
            <td>Exactly what the purpose needs</td>
          </tr>
          <tr>
            <td>Revocation</td>
            <td>Manual, partial, often never</td>
            <td>Atomic; all permissions end together</td>
          </tr>
          <tr>
            <td>Proof</td>
            <td>A policy document</td>
            <td>A signed, verifiable per-session record</td>
          </tr>
        </tbody>
      </table>

      <h2>Why this satisfies multiple regulations at once</h2>
      <p>
        The reason a single model answers GDPR, the EU Data Act, and California
        SB-1394 is that they all reduce to the same primitive: authorize, scope,
        revoke, and prove. A blanket-consent system has to bolt each of those on
        separately and reconcile them. A session model produces all four as a
        side effect of granting access at all. That is what it means for consent
        to be <em>structurally part of the session creation primitive</em>{' '}
        rather than a policy layer.
      </p>
      <p>
        For the technical implementation of revocation specifically, which maps
        directly to SB-1394&apos;s &ldquo;revocable by the owner&rdquo;
        requirement, see{' '}
        <Link to="/compliance/vehicle-access-audit-trail">
          audit-ready vehicle access
        </Link>
        . For the broader model these sessions belong to, see{' '}
        <Link to="/vehicle-session-infrastructure">
          vehicle session infrastructure
        </Link>
        , and developers can start with the{' '}
        <Link to="/products/consent">consent product</Link>.
      </p>
      <p>
        Related: <Link to="/compliance">all compliance topics</Link> ·{' '}
        <Link to="/compliance/eu-data-act">EU Data Act</Link>
      </p>
      <p>
        <em>This page is educational, not legal advice.</em>
      </p>
    </ContentPageLayout>
  );
}
