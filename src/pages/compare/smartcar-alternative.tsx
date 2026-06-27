import React, { type ReactNode } from 'react';
import Link from '@docusaurus/Link';
import ContentPageLayout from '../../components/ContentPageLayout';

const SITE = 'https://www.dimo.org';

const TITLE = 'DIMO vs Smartcar: Session Control, Not Just Data | DIMO';
const DESCRIPTION =
  'Smartcar is read-only vehicle data. DIMO adds the session: identity, digital key, scoped data, spend caps, and atomic revocation, across the 50+ vehicle brands already connected to DIMO. Here is the difference.';
const H1 = 'DIMO vs Smartcar: from reading vehicle data to governing access';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: H1,
  description: DESCRIPTION,
  url: `${SITE}/compare/smartcar-alternative`,
  datePublished: '2026-06-26',
  isPartOf: { '@id': `${SITE}/#website` },
  author: { '@id': `${SITE}/#organization`, name: 'DIMO' },
  publisher: { '@id': `${SITE}/#organization`, name: 'DIMO' },
};

export default function SmartcarAlternative(): ReactNode {
  return (
    <ContentPageLayout
      title={TITLE}
      description={DESCRIPTION}
      canonicalPath="/compare/smartcar-alternative"
      breadcrumbs={[
        { name: 'Home', url: `${SITE}/` },
        { name: 'Compare', url: `${SITE}/compare/smartcar-alternative` },
        { name: 'Smartcar' },
      ]}
      schema={schema}
      heroEyebrow="Compare"
      heroTitle={H1}
      heroSubtitle="Smartcar and DIMO both connect to vehicles across many brands. The difference is what happens after you read the data — whether you can also govern access, spend, and revocation as one session."
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
        <Link to="/industries/rentals">rental operations</Link>, and start in
        the <Link to="/docs">developer docs</Link>.
      </p>
    </ContentPageLayout>
  );
}
