import React, { type ReactNode } from 'react';
import Link from '@docusaurus/Link';
import ContentPageLayout from '../../components/ContentPageLayout';

const SITE = 'https://dimo.org';

const TITLE = 'Fleet Spend & EV Charging Reimbursement, Per Session | DIMO';
const DESCRIPTION =
  'Stop reconciling charging, tolls, and fuel days later. DIMO ties spend to each vehicle session: home charging, public charging, and tolls, capped and reconciled automatically.';
const H1 =
  'Cap spend at checkout: charging, tolls, and fuel tied to the session';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: H1,
  description: DESCRIPTION,
  url: `${SITE}/solutions/fleet-spend`,
  datePublished: '2026-06-26',
  isPartOf: { '@id': `${SITE}/#website` },
  author: { '@id': `${SITE}/#organization`, name: 'DIMO' },
  publisher: { '@id': `${SITE}/#organization`, name: 'DIMO' },
};

export default function FleetSpend(): ReactNode {
  return (
    <ContentPageLayout
      title={TITLE}
      description={DESCRIPTION}
      canonicalPath="/solutions/fleet-spend"
      breadcrumbs={[
        { name: 'Home', url: `${SITE}/` },
        { name: 'Solutions', url: `${SITE}/#solutions` },
        { name: 'Fleet Spend' },
      ]}
      schema={schema}
      heroEyebrow="Solutions · Spend"
      heroTitle={H1}
      heroSubtitle="Charging, tolls, and fuel are the leakiest line items in a fleet — because they happen after checkout and reconcile days later. Tie them to the session and the leak closes."
    >
      <p>
        Fleet spend leaks because there is no container for it. A driver takes a
        vehicle, charges it, runs through a toll, maybe fills the tank, and each
        of those costs lands in a different system, reconciled hours or days
        later against a booking nobody can cleanly match it to. DIMO ties spend
        to the <strong>vehicle session</strong>: a cap is set at checkout, every
        charge is attributed to the session that incurred it, and reconciliation
        happens automatically instead of in a Monday-morning spreadsheet.
      </p>

      <h2>Why spend leaks today</h2>
      <p>
        The core problem is that{' '}
        <strong>spend is not connected to the vehicle access event</strong>.
        Booking lives in one tool, telematics in another, charging in a third,
        tolls in a fourth. When a charge appears, matching it back to
        &ldquo;which rental, which driver, which vehicle&rdquo; is manual
        detective work. Multiply that across a fleet and it is several hours a
        week of reconciliation plus a steady trickle of costs that never get
        attributed at all.
      </p>

      <h2>The three EV reimbursement problems, at once</h2>
      <p>
        Electrification makes this sharper, because an EV fleet runs three
        reimbursement problems simultaneously:
      </p>
      <ul>
        <li>
          <strong>Home charging:</strong> a driver charges at home and has to be
          reimbursed at the right rate for the right kWh.
        </li>
        <li>
          <strong>Public charging:</strong> sessions across a dozen networks,
          each with its own app, receipt format, and pricing.
        </li>
        <li>
          <strong>Tolls and parking:</strong> incurred mid-session, billed
          later, rarely tied to the trip that caused them.
        </li>
      </ul>
      <p>
        Handled separately, these are three integrations and three
        reconciliation headaches. Handled as part of the session, they are one
        capped, attributed line item.
      </p>

      <h2>Plug-and-charge as a per-session service</h2>
      <p>
        Tying spend to the session also unlocks revenue, not just savings.
        Imagine getting <strong>plug-and-charge on your next rental</strong>, so
        you do not have to download six apps to charge on a business trip. Today
        that is a <strong>$0 line item</strong> because there is no session to
        attach it to. With a session container, charging, insurance, and other
        per-trip services become things an operator can actually offer and bill,
        priced per session rather than buried in a daily rate.
      </p>

      <h2>How it works</h2>
      <p>
        When a <Link to="/vehicle-session-infrastructure">vehicle session</Link>{' '}
        is created, it carries a spend cap alongside identity, the digital key,
        and the data scope. Charges incurred during the session are attributed
        to it automatically and bounded by the cap; when the session ends, the
        spend is reconciled and sealed into the same verifiable record as the
        rest of the session. The operator sees one number per session instead of
        four feeds to reconcile.
      </p>
      <p>
        This is the spend capability of the broader session model. See{' '}
        <Link to="/vehicle-session-infrastructure">
          vehicle session infrastructure
        </Link>
        , the <Link to="/products/pay">pay product</Link>, and how it fits{' '}
        <Link to="/industries/rentals">rental operations</Link>.
      </p>
    </ContentPageLayout>
  );
}
