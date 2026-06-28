import React, { type ReactNode } from 'react';
import Link from '@docusaurus/Link';
import ContentPageLayout from '../../components/ContentPageLayout';

const SITE = 'https://dimo.org';

const TITLE = "The FTC's GM/OnStar Order & the End of Bulk Telematics | DIMO";
const DESCRIPTION =
  'The FTC order against GM/OnStar bans non-consented driver-data sharing. What it means for OEMs, insurers, and why bulk telematics brokerage is now a dead business model.';
const H1 = 'The FTC GM OnStar order made consent-first vehicle data the law';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: H1,
  description: DESCRIPTION,
  url: `${SITE}/compliance/ftc-gm-consent`,
  datePublished: '2026-06-26',
  isPartOf: { '@id': `${SITE}/#website` },
  author: { '@id': `${SITE}/#organization`, name: 'DIMO' },
  publisher: { '@id': `${SITE}/#organization`, name: 'DIMO' },
};

export default function FtcGmConsent(): ReactNode {
  return (
    <ContentPageLayout
      title={TITLE}
      description={DESCRIPTION}
      canonicalPath="/compliance/ftc-gm-consent"
      breadcrumbs={[
        { name: 'Home', url: `${SITE}/` },
        { name: 'Compliance', url: `${SITE}/compliance` },
        { name: 'FTC GM/OnStar Order' },
      ]}
      schema={schema}
      heroEyebrow="Compliance · FTC"
      heroTitle={H1}
      heroSubtitle="The FTC's order against GM and OnStar did not just penalize one company — it declared the old vehicle-data business model illegal and made consent-first access the new baseline."
    >
      <p>
        In early 2026 the U.S. Federal Trade Commission finalized an order
        against General Motors and its OnStar unit over the collection and sale
        of connected-vehicle data without proper consent. The order bars GM from
        sharing driver-behavior and precise-geolocation data without{' '}
        <strong>affirmative opt-in</strong> consent, and it does so for{' '}
        <strong>five years</strong>. The practical message to the entire
        industry is blunt:{' '}
        <strong>
          GM just proved that the old model is illegal, and consent-first
          vehicle data access is now the baseline regulators expect.
        </strong>
      </p>

      <h2>What the order actually says</h2>
      <ul>
        <li>
          A <strong>five-year ban</strong> on sharing driver-behavior data
          collected without affirmative, informed consent.
        </li>
        <li>
          A requirement for <strong>affirmative opt-in</strong> before
          collecting or sharing connected-vehicle data going forward.
        </li>
        <li>
          The conduct affected roughly <strong>1.8 million GM customers</strong>{' '}
          whose data had been routed to data brokers, including{' '}
          <strong>LexisNexis and Verisk</strong>, where it could feed insurance
          risk scoring.
        </li>
      </ul>

      <h2>Why this kills bulk telematics brokerage</h2>
      <p>
        The downstream effect was immediate.{' '}
        <strong>
          Verisk stopped accepting OEM-sourced telematics data the same week the
          order was finalized.
        </strong>{' '}
        When the largest buyers of bulk vehicle data will no longer touch
        OEM-sourced feeds without airtight consent provenance, the economics of
        the brokerage model collapse.{' '}
        <strong>
          Bulk OEM telematics data brokerage is now legally dead as a business
          model.
        </strong>
      </p>
      <p>
        That is not a temporary chill. It is a structural shift: value moves
        from whoever can <em>aggregate</em> the most data to whoever can prove
        the data was accessed{' '}
        <em>with consent, for a purpose, and on the record</em>.
      </p>

      <h2>The new model still has enormous value, if it is consented</h2>
      <p>
        None of this means vehicle data loses its worth. Insurers still want it:
        usage-based pricing works, and fleets that share telematics see better
        loss ratios. The problem the FTC order exposes is the <em>plumbing</em>,
        not the demand. What insurers and OEMs now need is a way to get
        driver-authorized data with a verifiable trail, rather than a broker
        feed that cannot survive a consent audit.
      </p>
      <p>
        That is exactly what a session model provides.{' '}
        <strong>
          DIMO is the infrastructure that makes the new model work:
        </strong>{' '}
        access is created per session, scoped to what the driver authorized, and
        sealed with a signed, independently verifiable record. Consent is not a
        checkbox bolted onto a data pipe. It is part of how access is created,
        as described in{' '}
        <Link to="/compliance/session-scoped-consent">
          session-scoped consent
        </Link>
        , and the resulting{' '}
        <Link to="/compliance/vehicle-access-audit-trail">audit trail</Link> is
        the artifact an underwriter or regulator can actually accept.
      </p>

      <h2>The bigger pattern: value moves to consent provenance</h2>
      <p>
        Connected-services revenue is real and large. GM&apos;s own OnStar
        business reportedly reached roughly{' '}
        <strong>$5.4 billion in 2025</strong>, serving on the order of 12
        million subscribers. The FTC order does not say that revenue is
        illegitimate. It says the <em>mechanism</em> matters: money earned from
        data that cannot survive a consent audit is now at risk, and money
        earned from data with clear, per-driver consent provenance is durable.
      </p>
      <p>
        That is the shift to internalize. For a decade the implicit business
        model was &ldquo;aggregate as much vehicle data as possible, then find
        buyers.&rdquo; After this order, the durable model is &ldquo;grant
        access per driver, scope it, and keep the receipt.&rdquo; The asset is
        no longer the size of the data lake; it is the strength of the consent
        trail attached to each access.
      </p>

      <h2>Common questions</h2>
      <h3>Is this just a GM problem?</h3>
      <p>
        No. The FTC framed it as an industry standard, not a one-off penalty.
        Any manufacturer or broker relying on non-consented driver-behavior data
        is exposed to the same theory. Treat the order as the baseline the rest
        of the market will be held to, not as a GM-specific event.
      </p>
      <h3>Can insurers still use vehicle data for pricing?</h3>
      <p>
        Yes. Usage-based pricing works and is not going away. What changed is
        the sourcing. Insurers now need driver-authorized data with a verifiable
        trail, which is exactly what a{' '}
        <Link to="/compliance/vehicle-access-audit-trail">
          session audit trail
        </Link>{' '}
        provides, rather than a broker feed that just lost its largest buyer.
      </p>

      <h2>What OEMs and insurers should take from it</h2>
      <ul>
        <li>
          <strong>OEMs:</strong> any data-monetization plan that depends on
          bulk, broker-routed telematics is now a liability. Re-base it on
          per-driver consent with an audit trail.
        </li>
        <li>
          <strong>Insurers:</strong> the path to usage-based and
          fleet-telematics pricing runs through consented, verifiable access,
          not broker feeds that just got cut off.
        </li>
      </ul>
      <p>
        Related: <Link to="/compliance/eu-data-act">the EU Data Act</Link> ·{' '}
        <Link to="/solutions/fleet-intelligence">
          mixed-fleet telematics for insurers
        </Link>{' '}
        · <Link to="/compliance">all compliance topics</Link>
      </p>
      <p>
        <em>This page is educational, not legal advice.</em>
      </p>
    </ContentPageLayout>
  );
}
