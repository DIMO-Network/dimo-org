import React, { type ReactNode } from 'react';
import Link from '@docusaurus/Link';
import ContentPageLayout from '../../components/ContentPageLayout';
import Translate, { translate } from '@docusaurus/Translate';

const SITE = 'https://dimo.org';

const TITLE = translate({
  id: 'compare.standardFleetAlternative.meta.title',
  message:
    'DIMO vs Standard Fleet: Open, Multi-OEM Session Infrastructure | DIMO',
});
const DESCRIPTION = translate({
  id: 'compare.standardFleetAlternative.meta.description',
  message:
    'Standard Fleet proved fleets want connected control. DIMO delivers it as an open, make-agnostic protocol with a verifiable audit trail and per-session spend, across the 50+ vehicle brands already connected to DIMO.',
});
const H1 = translate({
  id: 'compare.standardFleetAlternative.meta.h1',
  message:
    'DIMO vs Standard Fleet: open protocol, any make, verifiable audit trail',
});

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
      breadcrumbs={[
        {
          name: translate({
            id: 'compare.standardFleetAlternative.body.home.name',
            message: 'Home',
          }),
          url: `${SITE}/`,
        },
        {
          name: translate({
            id: 'compare.standardFleetAlternative.body.compare.name',
            message: 'Compare',
          }),
          url: `${SITE}/compare/standard-fleet-alternative`,
        },
        { name: 'Standard Fleet' },
      ]}
      schema={schema}
      heroEyebrow={translate({
        id: 'compare.standardFleetAlternative.body.compare',
        message: 'Compare',
      })}
      heroTitle={H1}
      heroSubtitle={translate({
        id: 'compare.standardFleetAlternative.body.standardFleetProvedThat',
        message:
          'Standard Fleet proved that fleet operators want connected, software-defined control of their vehicles. The question is whether you get it as a closed product or an open protocol.',
      })}
    >
      <p>
        <Translate
          id="compare.standardFleetAlternative.body.itShowedThatOperators"
          values={{
            strong: (
              <strong>
                <Translate id="compare.standardFleetAlternative.body.standardFleetProvedThe">
                  Standard Fleet proved the market exists.
                </Translate>
              </strong>
            ),
          }}
        >
          {
            '{strong} It showed that operators (rental, carshare, corporate mobility) want to run their vehicles through software instead of a key drawer and five disconnected tools. That demand is real, and if you are comparing DIMO to Standard Fleet, you already understand the value. The difference is architectural, not a matter of who has the longer feature list.'
          }
        </Translate>
      </p>

      <h2>
        <Translate id="compare.standardFleetAlternative.body.whereDimoDiffers">
          Where DIMO differs
        </Translate>
      </h2>
      <table>
        <thead>
          <tr>
            <th>
              <Translate id="compare.standardFleetAlternative.body.dimension">
                Dimension
              </Translate>
            </th>
            <th>
              <Translate id="compare.standardFleetAlternative.body.closedProduct">
                Closed product
              </Translate>
            </th>
            <th>DIMO</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Translate id="compare.standardFleetAlternative.body.brandCoverage">
                Brand coverage
              </Translate>
            </td>
            <td>
              <Translate id="compare.standardFleetAlternative.body.aFocusedSetOf">
                A focused set of brands
              </Translate>
            </td>
            <td>
              <Translate id="compare.standardFleetAlternative.body.makeAgnostic50BrandsAlready">
                Make-agnostic; 50+ brands already connected
              </Translate>
            </td>
          </tr>
          <tr>
            <td>
              <Translate id="compare.standardFleetAlternative.body.architecture">
                Architecture
              </Translate>
            </td>
            <td>
              <Translate id="compare.standardFleetAlternative.body.proprietarySaaS">
                Proprietary SaaS
              </Translate>
            </td>
            <td>
              <Translate id="compare.standardFleetAlternative.body.openVendorNeutralProtocol">
                Open, vendor-neutral protocol
              </Translate>
            </td>
          </tr>
          <tr>
            <td>
              <Translate id="compare.standardFleetAlternative.body.auditTrail">
                Audit trail
              </Translate>
            </td>
            <td>
              <Translate id="compare.standardFleetAlternative.body.applicationLayerLogs">
                Application-layer logs
              </Translate>
            </td>
            <td>
              <Translate id="compare.standardFleetAlternative.body.cryptographicallySignedIndependentlyVerifiable">
                Cryptographically signed, independently verifiable
              </Translate>
            </td>
          </tr>
          <tr>
            <td>
              <Translate id="compare.standardFleetAlternative.body.spend">
                Spend
              </Translate>
            </td>
            <td>
              <Translate id="compare.standardFleetAlternative.body.addOnExternal">
                Add-on / external
              </Translate>
            </td>
            <td>
              <Translate id="compare.standardFleetAlternative.body.perSessionSpendCapBuilt">
                Per-session spend cap, built in
              </Translate>
            </td>
          </tr>
          <tr>
            <td>
              <Translate id="compare.standardFleetAlternative.body.lockIn">
                Lock-in
              </Translate>
            </td>
            <td>
              <Translate id="compare.standardFleetAlternative.body.singleVendor">
                Single vendor
              </Translate>
            </td>
            <td>
              <Translate id="compare.standardFleetAlternative.body.buildOnTheProtocol">
                Build on the protocol; no vendor lock-in
              </Translate>
            </td>
          </tr>
        </tbody>
      </table>

      <h2>
        <Translate id="compare.standardFleetAlternative.body.whyTheArchitectureMatters">
          Why the architecture matters
        </Translate>
      </h2>
      <p>
        <Translate
          id="compare.standardFleetAlternative.body.twoDifferencesCompoundOver"
          values={{
            strong: (
              <strong>
                <Translate id="compare.standardFleetAlternative.body.oemBreadth">
                  OEM breadth
                </Translate>
              </strong>
            ),
            strong2: (
              <strong>
                <Translate id="compare.standardFleetAlternative.body.verifiableAuditTrail">
                  verifiable audit trail
                </Translate>
              </strong>
            ),
            link: (
              <Link to="/compliance/vehicle-access-audit-trail">
                <Translate id="compare.standardFleetAlternative.body.cryptographicallySignedSessionRecord">
                  cryptographically signed session record
                </Translate>
              </Link>
            ),
          }}
        >
          {
            'Two differences compound over time. First, {strong}: a mixed fleet that adds a brand should not need a new integration, and a make-agnostic protocol means it does not. Second, the {strong2}: application-layer logs are fine until an insurer or regulator needs a record they can trust without taking your word for it. At that point a {link} is worth far more than an internal log.'
          }
        </Translate>
      </p>
      <p>
        <Translate
          id="compare.standardFleetAlternative.body.bothFallOutOf"
          values={{
            link: (
              <Link to="/vehicle-session-infrastructure">
                <Translate id="compare.standardFleetAlternative.body.vehicleSessionInfrastructure">
                  vehicle session infrastructure
                </Translate>
              </Link>
            ),
            link2: (
              <Link to="/industries/rentals">
                <Translate id="compare.standardFleetAlternative.body.unmannedRentalOperations">
                  unmanned rental operations
                </Translate>
              </Link>
            ),
            link3: (
              <Link to="/compliance">
                <Translate id="compare.standardFleetAlternative.body.compliancePicture">
                  compliance picture
                </Translate>
              </Link>
            ),
          }}
        >
          {
            'Both fall out of the same design: {link} as an open primitive rather than a closed app. See it applied to {link2} and the broader {link3}.'
          }
        </Translate>
      </p>
    </ContentPageLayout>
  );
}
