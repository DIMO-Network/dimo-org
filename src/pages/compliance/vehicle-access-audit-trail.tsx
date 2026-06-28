import React, { type ReactNode } from 'react';
import Link from '@docusaurus/Link';
import ContentPageLayout from '../../components/ContentPageLayout';

const SITE = 'https://dimo.org';

const TITLE =
  'Verifiable Vehicle Access Audit Trails (SB-1394, UNECE R155) | DIMO';
const DESCRIPTION =
  'Revocable, signed, timestamped vehicle-access records that satisfy California SB-1394 and UNECE R155 — and give insurers a verifiable trail for disputes and underwriting.';
const H1 =
  'Audit-ready vehicle access: who drove, what they could do, when it ended';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: H1,
  description: DESCRIPTION,
  url: `${SITE}/compliance/vehicle-access-audit-trail`,
  datePublished: '2026-06-26',
  isPartOf: { '@id': `${SITE}/#website` },
  author: { '@id': `${SITE}/#organization`, name: 'DIMO' },
  publisher: { '@id': `${SITE}/#organization`, name: 'DIMO' },
};

export default function AuditTrail(): ReactNode {
  return (
    <ContentPageLayout
      title={TITLE}
      description={DESCRIPTION}
      canonicalPath="/compliance/vehicle-access-audit-trail"
      breadcrumbs={[
        { name: 'Home', url: `${SITE}/` },
        { name: 'Compliance', url: `${SITE}/compliance` },
        { name: 'Audit Trails' },
      ]}
      schema={schema}
      heroEyebrow="Compliance · Audit"
      heroTitle={H1}
      heroSubtitle="New rules require vehicle access to be revocable and auditable. A session model produces that record automatically — and it is the same record insurers need to settle a claim."
    >
      <p>
        A vehicle access audit trail is a verifiable record of who was granted
        access to a vehicle, what they were allowed to do, and exactly when that
        access ended. Two regulations now make this mandatory rather than
        optional: <strong>California SB-1394</strong> requires vehicle access
        controls to be revocable by the owner, and{' '}
        <strong>UNECE R155/R156</strong> requires vehicle access systems to be
        auditable. A session model satisfies both by producing a signed,
        timestamped record every time access is granted and revoked.
      </p>

      <h2>What the rules require</h2>
      <h3>California SB-1394</h3>
      <p>
        Signed in 2024 and effective in 2025, SB-1394 requires that access
        controls on a connected vehicle be{' '}
        <strong>revocable by the vehicle owner</strong>. The intent is consumer
        protection, particularly around stalking and abandoned access, but the
        engineering implication is concrete: there must be a real
        &ldquo;off&rdquo; switch, and pulling it must actually stop access.
        Session revocation is the technical implementation of that requirement.
        Ending a session withdraws every permission it contained at once.
      </p>
      <h3>UNECE R155 / R156</h3>
      <p>
        In force since July 2024 for new vehicle types, R155 (cybersecurity) and
        R156 (software updates) require that vehicle access and its changes be{' '}
        <strong>auditable</strong>. A system that grants access but cannot
        produce a trustworthy record of who had it and when does not meet the
        bar. DIMO sessions are{' '}
        <strong>signed, timestamped, and immutable</strong>: cryptographically
        signed and independently verifiable, so the record can be trusted by a
        party that did not generate it.
      </p>

      <h2>One record, two jobs: compliance and claims</h2>
      <p>
        The same audit trail that satisfies a regulator is the artifact an
        insurer needs to underwrite and to settle disputes. That is where the
        business case sharpens. Today the data simply is not flowing:
      </p>
      <ul>
        <li>
          <strong>
            70% of fleets don&apos;t share telematics data with insurers
          </strong>{' '}
          despite the lower loss ratios that data would justify, largely because
          there is no clean, consented, verifiable way to hand it over.
        </li>
        <li>
          <strong>EV insurance premiums run about 49% higher than ICE</strong>,
          driven by battery-underwriting uncertainty that better per-vehicle
          data would directly reduce.
        </li>
      </ul>
      <p>
        A verifiable session record closes that gap: it tells an underwriter who
        was driving, what telemetry was authorized, and when the session ended,
        in a form they can accept. The fleet gets better pricing; the insurer
        gets better risk signal; nobody has to trust an unverifiable export.
      </p>

      <h2>Settling a dispute, without the forensics</h2>
      <p>
        Consider a damage claim on a rental return. Without a session record,
        the operator reconstructs what happened by pulling booking data from one
        system, telematics from another, key events from a third, and charging
        from a fourth, then hopes the timestamps line up well enough to convince
        an adjuster. It is slow, and the resulting story is only as trustworthy
        as the operator asserting it.
      </p>
      <p>
        With a session record, the same question is a single lookup: here is the
        verified driver, the window they had access, the telemetry that was in
        scope, and the moment access ended, all signed, so the adjuster does not
        have to take the operator&apos;s word for it. The dispute resolves on
        evidence both sides can independently verify, which is faster for the
        operator and lower-risk for the insurer.
      </p>

      <h2>Common questions</h2>
      <h3>Is &ldquo;signed and immutable&rdquo; just marketing?</h3>
      <p>
        No. It is the property that makes the record useful to a third party. A
        log a vendor can silently edit is worth little in a dispute or an audit.
        A cryptographically signed record can be checked by a party who did not
        create it, which is exactly what UNECE R155 auditability and an
        insurer&apos;s evidentiary needs require.
      </p>
      <h3>Does this conflict with driver privacy?</h3>
      <p>
        The opposite. The same session that produces the audit trail also scopes
        what was shared and revokes it on return, so the record documents access
        that was already consented and bounded. Auditability and{' '}
        <Link to="/compliance/session-scoped-consent">
          session-scoped consent
        </Link>{' '}
        are two sides of one primitive, not a trade-off.
      </p>

      <h2>What audit-ready access looks like in practice</h2>
      <p>
        For every use of a vehicle, a session produces a record containing the
        driver&apos;s verified identity, the data and capabilities that were in
        scope, the spend limit, the start and end times, and the revocation
        event, signed so it cannot be altered after the fact. Producing
        &ldquo;who was driving and what telemetry&rdquo; for a dispute becomes a
        lookup, not a forensic project across five disconnected systems.
      </p>
      <p>
        This is the auditability half of{' '}
        <Link to="/compliance/session-scoped-consent">
          session-scoped consent
        </Link>{' '}
        . Consent and audit are two faces of the same primitive. See how it fits
        the broader model in{' '}
        <Link to="/vehicle-session-infrastructure">
          vehicle session infrastructure
        </Link>
        , and how fleets put it to work in{' '}
        <Link to="/solutions/fleet-intelligence">fleet intelligence</Link>.
      </p>
      <p>
        Related:{' '}
        <Link to="/compliance/ftc-gm-consent">the FTC GM/OnStar order</Link> ·{' '}
        <Link to="/compliance">all compliance topics</Link>
      </p>
      <p>
        <em>This page is educational, not legal advice.</em>
      </p>
    </ContentPageLayout>
  );
}
