import React, { type ReactNode } from 'react';
import Link from '@docusaurus/Link';
import ContentPageLayout from '../../components/ContentPageLayout';

const SITE = 'https://www.dimo.org';

const TITLE = 'EU Data Act for Vehicle Data: What OEMs & Fleets Must Do | DIMO';
const DESCRIPTION =
  'The EU Data Act requires OEMs to expose vehicle data to authorized third parties. Here is the compliance timeline, what is required, and how session-scoped consent meets it.';
const H1 = 'The EU Data Act and vehicle data: what changes for OEMs and fleets';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: H1,
  description: DESCRIPTION,
  url: `${SITE}/compliance/eu-data-act`,
  datePublished: '2026-06-26',
  isPartOf: { '@id': `${SITE}/#website` },
  author: { '@id': `${SITE}/#organization`, name: 'DIMO' },
  publisher: { '@id': `${SITE}/#organization`, name: 'DIMO' },
};

export default function EuDataAct(): ReactNode {
  return (
    <ContentPageLayout
      title={TITLE}
      description={DESCRIPTION}
      canonicalPath="/compliance/eu-data-act"
      breadcrumbs={[
        { name: 'Home', url: `${SITE}/` },
        { name: 'Compliance', url: `${SITE}/compliance` },
        { name: 'EU Data Act' },
      ]}
      schema={schema}
      heroEyebrow="Compliance · EU Data Act"
      heroTitle={H1}
      heroSubtitle="The EU Data Act turns connected-vehicle data from a proprietary asset into a regulated, shareable one. Here is what it requires and how to be ready in time."
    >
      <p>
        The <strong>EU Data Act</strong> requires vehicle manufacturers to make
        the data their connected products generate available to the user and, at
        the user&apos;s request, to authorized third parties, in a usable,
        real-time, and non-discriminatory way. For OEMs and the fleets that
        operate their vehicles, that means the connected data a car produces can
        no longer sit behind a closed first-party portal. It has to be
        accessible, with the owner&apos;s consent, to the services the owner
        chooses.
      </p>
      <p>
        In short: the car is becoming an open data source by law, and the OEMs
        that treat it as an architecture problem now, instead of a legal
        scramble later, will be the ones who turn it into revenue instead of
        liability.
      </p>

      <h2>The timeline that is not moving</h2>
      <p>
        The Data Act became applicable in <strong>September 2025</strong>, with
        the obligations that bite hardest for connected vehicles, third-party
        data access at the user&apos;s request, phasing into enforcement for
        OEMs around <strong>September 2026</strong>. The deadline is fixed.
      </p>
      <p>
        That matters because of simple arithmetic.{' '}
        <strong>
          A 12–18 month in-house build that starts today delivers 6–12 months
          late. The compliance clock does not move.
        </strong>{' '}
        An OEM that decides to build its own consent, access, and audit layer
        from scratch is, in most cases, already behind the regulation before the
        first sprint closes.
      </p>

      <h2>What &ldquo;compliant access&rdquo; actually requires</h2>
      <p>
        Stripped to its essentials, and read alongside GDPR, the Data Act asks
        for four capabilities around vehicle data:
      </p>
      <ul>
        <li>
          <strong>Authorization.</strong> The user must explicitly grant access;
          implied or bundled consent does not satisfy the standard.
        </li>
        <li>
          <strong>Scoping.</strong> Third parties receive only the specific data
          a user authorized, for the purpose authorized, not a firehose.
        </li>
        <li>
          <strong>Revocation.</strong> The user can withdraw access, and the
          withdrawal must actually stop the flow.
        </li>
        <li>
          <strong>Auditability.</strong> There must be a record of who accessed
          what, when, and under whose authorization.
        </li>
      </ul>
      <p>
        Most existing connected-services stacks were never designed around these
        four. They were built to deliver first-party features, then retrofitted
        with a consent checkbox. The Data Act is hard precisely because it
        demands these properties be structural, not cosmetic.
      </p>

      <h2>How a session model meets it</h2>
      <p>
        A vehicle <em>session</em> is an access event with those four properties
        built in. When a session is created, it carries the user&apos;s
        identity, a defined data scope, and a time limit; when it ends, access
        revokes atomically and a signed, independently verifiable record is
        sealed. Consent is part of creating the session, not a policy attached
        afterward. That is exactly what{' '}
        <Link to="/compliance/session-scoped-consent">
          session-scoped consent
        </Link>{' '}
        describes.
      </p>
      <p>
        Because the access primitive already produces authorization, scoping,
        revocation, and an audit trail,{' '}
        <strong>
          EU Data Act compliance is a byproduct of the architecture, not a
          retrofit.
        </strong>{' '}
        An OEM integrates one access layer and inherits the compliant behavior
        across every model and market, rather than re-implementing consent for
        each program. The same model normalizes data across{' '}
        <Link to="/vehicle-session-infrastructure">
          50+ vehicle brands already connected to DIMO
        </Link>
        , which matters for fleets running mixed inventories.
      </p>

      <h2>From compliance cost to revenue</h2>
      <p>
        It is tempting to read the Data Act as pure cost. It is not. The same
        consented, scoped access that satisfies the regulation is the foundation
        for the software revenue OEMs are already chasing. They are collectively
        targeting <strong>$62–67 billion a year</strong> from software and
        connected services by 2030. The difference is that the compliant path
        and the revenue path are now the <em>same</em> path. An OEM that can
        grant a driver-authorized session can also offer per-session insurance,
        plug-and-charge, or maintenance services on top of it, legally, with the
        consent already captured.
      </p>
      <p>
        Contrast that with the closed path. As the{' '}
        <Link to="/compliance/ftc-gm-consent">FTC&apos;s GM/OnStar order</Link>{' '}
        showed, the bulk-data-brokerage model is now a liability rather than an
        asset. The OEMs that win the next decade of connected-services revenue
        will be the ones whose data access was consented and auditable from the
        first session, because that is the only kind regulators, insurers, and
        increasingly customers will accept.
      </p>

      <h2>Common questions</h2>
      <h3>Does this only matter for vehicles sold in the EU?</h3>
      <p>
        The Data Act is an EU regulation, but its gravity is global. The same
        architecture an OEM builds for the EU answers the FTC standard in the US
        and SB-1394 in California, so most manufacturers will not maintain a
        separate &ldquo;compliant&rdquo; stack for one market and a legacy stack
        for another. The economics push toward one consented access layer
        everywhere.
      </p>
      <h3>We already have a connected-services program. Is that enough?</h3>
      <p>
        Usually not. Most existing programs were designed to deliver first-party
        features and then retrofitted with a consent checkbox. The Data Act asks
        for third-party access at the user&apos;s request, with scoping,
        revocation, and an audit trail as structural properties. If those four
        are not built into how access is granted, a checkbox will not close the
        gap.
      </p>

      <h2>What OEMs and fleets should do now</h2>
      <ul>
        <li>
          <strong>OEMs:</strong> treat third-party access as a platform
          capability, not a per-program feature. Decide build-vs-integrate
          against a September 2026 clock, not an open-ended roadmap.
        </li>
        <li>
          <strong>Fleets:</strong> if you operate vehicles in the EU, confirm
          your data access path is consent-backed and revocable today. See{' '}
          <Link to="/compliance/vehicle-access-audit-trail">
            audit-ready vehicle access
          </Link>
          .
        </li>
      </ul>
      <p>
        <em>
          This page is educational, not legal advice. Formal certification
          review should be completed before using compliance language in
          European OEM procurement.
        </em>
      </p>
      <p>
        Related:{' '}
        <Link to="/compliance/ftc-gm-consent">the FTC GM/OnStar order</Link> ·{' '}
        <Link to="/compliance">all compliance topics</Link> ·{' '}
        <Link to="/industries/oem">DIMO for OEMs</Link>
      </p>
    </ContentPageLayout>
  );
}
