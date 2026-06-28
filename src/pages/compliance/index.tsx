import React, { type ReactNode } from 'react';
import Link from '@docusaurus/Link';
import ContentPageLayout from '../../components/ContentPageLayout';

const SITE = 'https://dimo.org';

const TITLE =
  'Connected Vehicle Data Compliance: EU Data Act, FTC, GDPR | DIMO';
const DESCRIPTION =
  'How fleets and OEMs meet the EU Data Act, the FTC consent standard, GDPR, and SB-1394 for connected vehicle data, using session-scoped consent and verifiable audit trails.';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: TITLE,
  description: DESCRIPTION,
  url: `${SITE}/compliance`,
  isPartOf: { '@id': `${SITE}/#website` },
  publisher: { '@id': `${SITE}/#organization` },
};

export default function ComplianceHub(): ReactNode {
  return (
    <ContentPageLayout
      title={TITLE}
      description={DESCRIPTION}
      canonicalPath="/compliance"
      breadcrumbs={[{ name: 'Home', url: `${SITE}/` }, { name: 'Compliance' }]}
      schema={schema}
      heroEyebrow="Compliance"
      heroTitle="Compliant connected-vehicle data access, by architecture"
      heroSubtitle="Regulators on three continents now require consent-first, revocable, auditable access to vehicle data. DIMO was built that way from the start — compliance is a byproduct of the architecture, not a retrofit."
      ctaLabel="Talk to our team"
      ctaHref="/contact"
    >
      <p>
        Connected vehicle data compliance means giving drivers and owners
        consent-first, revocable control over what is shared, with whom, and for
        how long, and produces a verifiable record of every access. As of 2026,
        that is no longer a best practice. It is the law in the United States
        and the European Union, and{' '}
        <strong>
          consent-first vehicle data access is now legally required, not
          ethically preferred.
        </strong>
      </p>
      <p>
        This page maps the regulations reshaping the connected-vehicle market
        and how a session-based access model satisfies all of them at once,
        without a multi-year in-house build.
      </p>

      <h2>The regulatory wave</h2>
      <p>
        Four moving pieces are converging on the same requirement: that access
        to vehicle data be explicitly consented, scoped, revocable, and
        auditable.
      </p>
      <ul>
        <li>
          The <Link to="/compliance/eu-data-act">EU Data Act</Link> requires
          OEMs to expose vehicle data to authorized third parties. It took
          effect in September 2025, with OEM enforcement following in September
          2026.
        </li>
        <li>
          The{' '}
          <Link to="/compliance/ftc-gm-consent">
            FTC GM/OnStar consent order
          </Link>{' '}
          bans non-consented sharing of driver-behavior data, and effectively
          ends bulk telematics brokerage as a business model.
        </li>
        <li>
          <Link to="/compliance/session-scoped-consent">
            GDPR and session-scoped consent
          </Link>{' '}
          make consent structurally part of the access event, not a separate
          policy bolted on afterward.
        </li>
        <li>
          <Link to="/compliance/vehicle-access-audit-trail">
            California SB-1394 and UNECE R155
          </Link>{' '}
          require vehicle access to be revocable by the owner and auditable by
          design.
        </li>
      </ul>

      <h2>Why a session model satisfies all of them at once</h2>
      <p>
        Each of these rules asks for the same four things: explicit
        authorization, scoped access, atomic revocation, and a verifiable trail.
        A vehicle <em>session</em> bundles exactly those properties. A session
        is created with a driver&apos;s identity, a specific data scope, a spend
        limit, and a time limit; when the use case ends, everything revokes at
        once and a cryptographically signed, independently verifiable record is
        sealed.
      </p>
      <p>
        Because consent is part of the session-creation primitive rather than a
        downstream policy, the same architecture answers GDPR, the EU Data Act,
        the FTC standard, and SB-1394. See{' '}
        <Link to="/compliance/session-scoped-consent">
          session-scoped consent
        </Link>{' '}
        for how that works, and{' '}
        <Link to="/vehicle-session-infrastructure">
          vehicle session infrastructure
        </Link>{' '}
        for the broader model. Operators can read how this applies to fleets in{' '}
        <Link to="/industries/rentals">rental operations</Link>, and developers
        can start in the{' '}
        <Link to="/products/consent">consent product docs</Link>.
      </p>
      <p>
        <em>
          Note: formal certification review should be completed before using
          compliance language in European OEM procurement; this page is
          educational, not legal advice.
        </em>
      </p>
    </ContentPageLayout>
  );
}
