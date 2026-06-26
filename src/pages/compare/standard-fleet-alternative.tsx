import React, { type ReactNode } from 'react';
import Link from '@docusaurus/Link';
import ContentPageLayout from '../../components/ContentPageLayout';

const SITE = 'https://www.dimo.org';

const TITLE =
  'DIMO vs Standard Fleet: Open, Multi-OEM Session Infrastructure | DIMO';
const DESCRIPTION =
  'Standard Fleet proved fleets want connected control. DIMO delivers it as an open, multi-OEM protocol with a verifiable audit trail and per-session spend across 50+ brands.';
const H1 =
  'DIMO vs Standard Fleet: open protocol, 50+ OEMs, verifiable audit trail';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: H1,
  description: DESCRIPTION,
  url: `${SITE}/compare/standard-fleet-alternative`,
  datePublished: '2026-06-26',
  isPartOf: { '@id': `${SITE}/#website` },
  author: { '@id': `${SITE}/#organization`, name: 'DIMO' },
  publisher: { '@id': `${SITE}/#organization`, name: 'DIMO' },
};

export default function StandardFleetAlternative(): ReactNode {
  return (
    <ContentPageLayout
      title={TITLE}
      description={DESCRIPTION}
      canonicalPath="/compare/standard-fleet-alternative"
      breadcrumbs={[
        { name: 'Home', url: `${SITE}/` },
        { name: 'Compare', url: `${SITE}/compare/standard-fleet-alternative` },
        { name: 'Standard Fleet' },
      ]}
      schema={schema}
      heroEyebrow="Compare"
      heroTitle={H1}
      heroSubtitle="Standard Fleet proved that fleet operators want connected, software-defined control of their vehicles. The question is whether you get it as a closed product or an open protocol."
    >
      <p>
        <strong>Standard Fleet proved the market exists.</strong> It showed that
        operators (rental, carshare, corporate mobility) want to run their
        vehicles through software instead of a key drawer and five disconnected
        tools. That demand is real, and if you are comparing DIMO to Standard
        Fleet, you already understand the value. The difference is
        architectural, not a matter of who has the longer feature list.
      </p>

      <h2>Where DIMO differs</h2>
      <table>
        <thead>
          <tr>
            <th>Dimension</th>
            <th>Closed product</th>
            <th>DIMO</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>OEM coverage</td>
            <td>A focused set of brands</td>
            <td>50+ OEM brands on one integration</td>
          </tr>
          <tr>
            <td>Architecture</td>
            <td>Proprietary SaaS</td>
            <td>Open, vendor-neutral protocol</td>
          </tr>
          <tr>
            <td>Audit trail</td>
            <td>Application-layer logs</td>
            <td>Cryptographically signed, independently verifiable</td>
          </tr>
          <tr>
            <td>Spend</td>
            <td>Add-on / external</td>
            <td>Per-session spend cap, built in</td>
          </tr>
          <tr>
            <td>Lock-in</td>
            <td>Single vendor</td>
            <td>Build on the protocol; no vendor lock-in</td>
          </tr>
        </tbody>
      </table>

      <h2>Why the architecture matters</h2>
      <p>
        Two differences compound over time. First, <strong>OEM breadth</strong>:
        a mixed fleet that adds a brand should not need a new integration, and
        an open, 50+ OEM protocol means it does not. Second, the{' '}
        <strong>verifiable audit trail</strong>: application-layer logs are fine
        until an insurer or regulator needs a record they can trust without
        taking your word for it. At that point a{' '}
        <Link to="/compliance/vehicle-access-audit-trail">
          cryptographically signed session record
        </Link>{' '}
        is worth far more than an internal log.
      </p>
      <p>
        Both fall out of the same design:{' '}
        <Link to="/vehicle-session-infrastructure">
          vehicle session infrastructure
        </Link>{' '}
        as an open primitive rather than a closed app. See it applied to{' '}
        <Link to="/industries/rentals">unmanned rental operations</Link> and the
        broader <Link to="/compliance">compliance picture</Link>.
      </p>
    </ContentPageLayout>
  );
}
