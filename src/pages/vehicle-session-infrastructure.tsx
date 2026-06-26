import React, { type ReactNode } from 'react';
import Link from '@docusaurus/Link';
import ContentPageLayout from '../components/ContentPageLayout';

const SITE = 'https://www.dimo.org';

const TITLE = 'Vehicle Session Infrastructure: OAuth for Vehicles | DIMO';
const DESCRIPTION =
  'Smartcar reads data and Geotab tracks vehicles — neither governs the session. DIMO is the access layer: create a vehicle session, scope data and spend, and revoke it atomically.';
const H1 =
  'Vehicle Session Infrastructure: verify, key, scope, spend — and revoke';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: H1,
  description: DESCRIPTION,
  url: `${SITE}/vehicle-session-infrastructure`,
  datePublished: '2026-06-26',
  isPartOf: { '@id': `${SITE}/#website` },
  author: { '@id': `${SITE}/#organization`, name: 'DIMO' },
  publisher: { '@id': `${SITE}/#organization`, name: 'DIMO' },
};

export default function VehicleSessionInfrastructure(): ReactNode {
  return (
    <ContentPageLayout
      title={TITLE}
      description={DESCRIPTION}
      canonicalPath="/vehicle-session-infrastructure"
      breadcrumbs={[
        { name: 'Home', url: `${SITE}/` },
        { name: 'Vehicle Session Infrastructure' },
      ]}
      schema={schema}
      heroEyebrow="Platform"
      heroTitle={H1}
      heroSubtitle="A rental, a carshare, a robotaxi ride, a fleet dispatch: every time someone uses a vehicle they don't own, that's a session. DIMO is the infrastructure that governs it."
    >
      <p>
        <strong>Vehicle Session Infrastructure</strong> is the software layer
        that provisions a vehicle for a shared use case in one operation, then
        revokes everything when the use case ends. It sits between the car and
        the apps, fleets, and services that need temporary, governed access. The
        easiest way to picture it is by analogy to plumbing that already runs
        the internet:
      </p>
      <ul>
        <li>
          <strong>Stripe</strong> authorizes, captures, and refunds a payment.
        </li>
        <li>
          <strong>Auth0</strong> creates, scopes, and revokes an identity
          session.
        </li>
        <li>
          <strong>DIMO</strong> creates a vehicle session, scopes the data,
          access, and spend inside it, and revokes it at return.
        </li>
      </ul>
      <p>
        Put another way, it is <strong>OAuth for vehicles</strong>. Right now
        every fleet operator, rental app, and OEM wires up its own identity,
        keys, data, and payment integrations by hand. It is the same mess every
        website lived with before OAuth, when each site rolled its own login.
        DIMO is the shared primitive that replaces it.
      </p>

      <h2>The row, not the column</h2>
      <p>
        It is easy to mistake DIMO for a telematics provider or a digital-key
        vendor. It is neither. It does not compete on any single column; it
        composes the whole row. Here is the landscape:
      </p>
      <table>
        <thead>
          <tr>
            <th>Layer</th>
            <th>Who owns it</th>
            <th>What it does, and lacks</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Fleet telematics</td>
            <td>Geotab, Samsara, Verizon Connect, Motive</td>
            <td>Monitoring only; nothing to revoke when the use ends</td>
          </tr>
          <tr>
            <td>Connected data API (read-only)</td>
            <td>Smartcar, Motorq, High Mobility</td>
            <td>A window into the car, with no session object</td>
          </tr>
          <tr>
            <td>Digital key / access</td>
            <td>CCC Digital Key, Standard Fleet</td>
            <td>Access, but not composed with data, spend, and revocation</td>
          </tr>
          <tr>
            <td>
              <strong>Session infrastructure</strong>
            </td>
            <td>
              <strong>DIMO</strong>
            </td>
            <td>One session that bundles and governs all of the above</td>
          </tr>
        </tbody>
      </table>
      <p>
        Or, in one line each:{' '}
        <em>
          Smartcar is a window into the car; DIMO is the checkout desk. Samsara
          tells you what is happening; DIMO controls what is allowed to happen.
        </em>{' '}
        Nobody else governs the session. That is the gap DIMO fills.
      </p>

      <h2>What one session bundles</h2>
      <p>
        A single DIMO session opens, and later revokes, a defined set of
        capabilities. The operator integrates once instead of stitching together
        five vendors:
      </p>
      <ul>
        <li>
          <strong>Identity:</strong> verify who is being granted access.
        </li>
        <li>
          <strong>Digital key:</strong> grant and revoke physical access, with
          no fob to lose.
        </li>
        <li>
          <strong>Data scope:</strong> normalized telemetry, limited to what the
          use case needs.
        </li>
        <li>
          <strong>Comfort and media:</strong> seat, mirror, and profile
          personalization, so a rental stops feeling like a stranger&apos;s car.
        </li>
        <li>
          <strong>Spend cap:</strong> charging, tolls, and fuel bounded at
          checkout (see{' '}
          <Link to="/solutions/fleet-spend">per-session spend</Link>).
        </li>
        <li>
          <strong>Atomic revocation:</strong> when the session ends, all of it
          ends together and seals a verifiable record.
        </li>
      </ul>

      <h2>Why now</h2>
      <p>
        There are roughly{' '}
        <strong>500 million vehicle sessions a year in the US</strong>: every
        rental, carshare trip, robotaxi ride, and fleet dispatch. Zero of them
        run on a shared protocol. At the same time, regulators are mandating
        exactly the properties a session provides: consented, scoped, revocable,
        auditable access (see{' '}
        <Link to="/compliance">connected vehicle data compliance</Link>). The
        demand and the rules are arriving together.
      </p>

      <h2>Who builds on it</h2>
      <p>
        Rental and carshare operators use it to run{' '}
        <Link to="/industries/rentals">unmanned, mixed-fleet operations</Link>;
        OEM connected-services teams use it to meet the{' '}
        <Link to="/compliance/eu-data-act">EU Data Act</Link> and offer
        post-session revenue; and developers build on the{' '}
        <Link to="/docs">DIMO APIs and SDKs</Link>. One session primitive, many
        callers, including ones the industry has not met yet.
      </p>
    </ContentPageLayout>
  );
}
