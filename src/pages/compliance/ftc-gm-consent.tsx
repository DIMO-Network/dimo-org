import React, { type ReactNode } from 'react';
import Link from '@docusaurus/Link';
import ContentPageLayout from '../../components/ContentPageLayout';
import Translate, { translate } from '@docusaurus/Translate';

const SITE = 'https://dimo.org';

const TITLE = translate({
  id: 'compliance.ftcGmConsent.meta.title',
  message: "The FTC's GM/OnStar Order & the End of Bulk Telematics | DIMO",
});
const DESCRIPTION = translate({
  id: 'compliance.ftcGmConsent.meta.description',
  message:
    'The FTC order against GM/OnStar bans non-consented driver-data sharing. What it means for OEMs, insurers, and why bulk telematics brokerage is now a dead business model.',
});
const H1 = translate({
  id: 'compliance.ftcGmConsent.meta.h1',
  message: 'The FTC GM OnStar order made consent-first vehicle data the law',
});

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
      breadcrumbs={[
        {
          name: translate({
            id: 'compliance.ftcGmConsent.body.home.name',
            message: 'Home',
          }),
          url: `${SITE}/`,
        },
        {
          name: translate({
            id: 'compliance.ftcGmConsent.body.compliance.name',
            message: 'Compliance',
          }),
          url: `${SITE}/compliance`,
        },
        {
          name: translate({
            id: 'compliance.ftcGmConsent.body.ftcGmOnStarOrder.name',
            message: 'FTC GM/OnStar Order',
          }),
        },
      ]}
      schema={schema}
      heroEyebrow={translate({
        id: 'compliance.ftcGmConsent.body.complianceFtc',
        message: 'Compliance · FTC',
      })}
      heroTitle={H1}
      heroSubtitle={translate({
        id: 'compliance.ftcGmConsent.body.theFtcsOrderAgainst',
        message:
          "The FTC's order against GM and OnStar did not just penalize one company — it declared the old vehicle-data business model illegal and made consent-first access the new baseline.",
      })}
    >
      <p>
        <Translate
          id="compliance.ftcGmConsent.body.inEarly2026The"
          values={{
            strong: (
              <strong>
                <Translate id="compliance.ftcGmConsent.body.affirmativeOptIn">
                  affirmative opt-in
                </Translate>
              </strong>
            ),
            strong2: (
              <strong>
                <Translate id="compliance.ftcGmConsent.body.fiveYears">
                  five years
                </Translate>
              </strong>
            ),
            strong3: (
              <strong>
                <Translate id="compliance.ftcGmConsent.body.gmJustProvedThat">
                  GM just proved that the old model is illegal, and
                  consent-first vehicle data access is now the baseline
                  regulators expect.
                </Translate>
              </strong>
            ),
          }}
        >
          {
            'In early 2026 the U.S. Federal Trade Commission finalized an order against General Motors and its OnStar unit over the collection and sale of connected-vehicle data without proper consent. The order bars GM from sharing driver-behavior and precise-geolocation data without {strong} consent, and it does so for {strong2}. The practical message to the entire industry is blunt: {strong3}'
          }
        </Translate>
      </p>

      <h2>
        <Translate id="compliance.ftcGmConsent.body.whatTheOrderActually">
          What the order actually says
        </Translate>
      </h2>
      <ul>
        <li>
          <Translate
            id="compliance.ftcGmConsent.body.aOnSharingDriverBehavior"
            values={{
              strong: (
                <strong>
                  <Translate id="compliance.ftcGmConsent.body.fiveYearBan">
                    five-year ban
                  </Translate>
                </strong>
              ),
            }}
          >
            {
              'A {strong} on sharing driver-behavior data collected without affirmative, informed consent.'
            }
          </Translate>
        </li>
        <li>
          <Translate
            id="compliance.ftcGmConsent.body.aRequirementForBefore"
            values={{
              strong: (
                <strong>
                  <Translate id="compliance.ftcGmConsent.body.affirmativeOptIn">
                    affirmative opt-in
                  </Translate>
                </strong>
              ),
            }}
          >
            {
              'A requirement for {strong} before collecting or sharing connected-vehicle data going forward.'
            }
          </Translate>
        </li>
        <li>
          <Translate
            id="compliance.ftcGmConsent.body.theConductAffectedRoughly"
            values={{
              strong: (
                <strong>
                  <Translate id="compliance.ftcGmConsent.body.18MillionGmCustomers">
                    1.8 million GM customers
                  </Translate>
                </strong>
              ),
              strong2: (
                <strong>
                  <Translate id="compliance.ftcGmConsent.body.lexisNexisAndVerisk">
                    LexisNexis and Verisk
                  </Translate>
                </strong>
              ),
            }}
          >
            {
              'The conduct affected roughly {strong} whose data had been routed to data brokers, including {strong2}, where it could feed insurance risk scoring.'
            }
          </Translate>
        </li>
      </ul>

      <h2>
        <Translate id="compliance.ftcGmConsent.body.whyThisKillsBulk">
          Why this kills bulk telematics brokerage
        </Translate>
      </h2>
      <p>
        <Translate
          id="compliance.ftcGmConsent.body.theDownstreamEffectWas"
          values={{
            strong: (
              <strong>
                <Translate id="compliance.ftcGmConsent.body.veriskStoppedAcceptingOemSourced">
                  Verisk stopped accepting OEM-sourced telematics data the same
                  week the order was finalized.
                </Translate>
              </strong>
            ),
            strong2: (
              <strong>
                <Translate id="compliance.ftcGmConsent.body.bulkOemTelematicsData">
                  Bulk OEM telematics data brokerage is now legally dead as a
                  business model.
                </Translate>
              </strong>
            ),
          }}
        >
          {
            'The downstream effect was immediate. {strong} When the largest buyers of bulk vehicle data will no longer touch OEM-sourced feeds without airtight consent provenance, the economics of the brokerage model collapse. {strong2}'
          }
        </Translate>
      </p>
      <p>
        <Translate
          id="compliance.ftcGmConsent.body.thatIsNotA"
          values={{
            em: (
              <em>
                <Translate id="compliance.ftcGmConsent.body.aggregate">
                  aggregate
                </Translate>
              </em>
            ),
            em2: (
              <em>
                <Translate id="compliance.ftcGmConsent.body.withConsentForA">
                  with consent, for a purpose, and on the record
                </Translate>
              </em>
            ),
          }}
        >
          {
            'That is not a temporary chill. It is a structural shift: value moves from whoever can {em} the most data to whoever can prove the data was accessed {em2}.'
          }
        </Translate>
      </p>

      <h2>
        <Translate id="compliance.ftcGmConsent.body.theNewModelStill">
          The new model still has enormous value, if it is consented
        </Translate>
      </h2>
      <p>
        <Translate
          id="compliance.ftcGmConsent.body.noneOfThisMeans"
          values={{
            em: (
              <em>
                <Translate id="compliance.ftcGmConsent.body.plumbing">
                  plumbing
                </Translate>
              </em>
            ),
          }}
        >
          {
            'None of this means vehicle data loses its worth. Insurers still want it: usage-based pricing works, and fleets that share telematics see better loss ratios. The problem the FTC order exposes is the {em}, not the demand. What insurers and OEMs now need is a way to get driver-authorized data with a verifiable trail, rather than a broker feed that cannot survive a consent audit.'
          }
        </Translate>
      </p>
      <p>
        <Translate
          id="compliance.ftcGmConsent.body.thatIsExactlyWhat"
          values={{
            strong: (
              <strong>
                <Translate id="compliance.ftcGmConsent.body.dimoIsTheInfrastructure">
                  DIMO is the infrastructure that makes the new model work:
                </Translate>
              </strong>
            ),
            link: (
              <Link to="/compliance/session-scoped-consent">
                <Translate id="compliance.ftcGmConsent.body.sessionScopedConsent">
                  session-scoped consent
                </Translate>
              </Link>
            ),
            link2: (
              <Link to="/compliance/vehicle-access-audit-trail">
                <Translate id="compliance.ftcGmConsent.body.auditTrail">
                  audit trail
                </Translate>
              </Link>
            ),
          }}
        >
          {
            'That is exactly what a session model provides. {strong} access is created per session, scoped to what the driver authorized, and sealed with a signed, independently verifiable record. Consent is not a checkbox bolted onto a data pipe. It is part of how access is created, as described in {link}, and the resulting {link2} is the artifact an underwriter or regulator can actually accept.'
          }
        </Translate>
      </p>

      <h2>
        <Translate id="compliance.ftcGmConsent.body.theBiggerPatternValue">
          The bigger pattern: value moves to consent provenance
        </Translate>
      </h2>
      <p>
        <Translate
          id="compliance.ftcGmConsent.body.connectedServicesRevenueIsReal"
          values={{
            strong: (
              <strong>
                <Translate id="compliance.ftcGmConsent.body.54BillionIn2025">
                  $5.4 billion in 2025
                </Translate>
              </strong>
            ),
            em: (
              <em>
                <Translate id="compliance.ftcGmConsent.body.mechanism">
                  mechanism
                </Translate>
              </em>
            ),
          }}
        >
          {
            "Connected-services revenue is real and large. GM's own OnStar business reportedly reached roughly {strong}, serving on the order of 12 million subscribers. The FTC order does not say that revenue is illegitimate. It says the {em} matters: money earned from data that cannot survive a consent audit is now at risk, and money earned from data with clear, per-driver consent provenance is durable."
          }
        </Translate>
      </p>
      <p>
        <Translate id="compliance.ftcGmConsent.body.thatIsTheShift">
          That is the shift to internalize. For a decade the implicit business
          model was “aggregate as much vehicle data as possible, then find
          buyers.” After this order, the durable model is “grant access per
          driver, scope it, and keep the receipt.” The asset is no longer the
          size of the data lake; it is the strength of the consent trail
          attached to each access.
        </Translate>
      </p>

      <h2>
        <Translate id="compliance.ftcGmConsent.body.commonQuestions">
          Common questions
        </Translate>
      </h2>
      <h3>
        <Translate id="compliance.ftcGmConsent.body.isThisJustA">
          Is this just a GM problem?
        </Translate>
      </h3>
      <p>
        <Translate id="compliance.ftcGmConsent.body.noTheFtcFramed">
          No. The FTC framed it as an industry standard, not a one-off penalty.
          Any manufacturer or broker relying on non-consented driver-behavior
          data is exposed to the same theory. Treat the order as the baseline
          the rest of the market will be held to, not as a GM-specific event.
        </Translate>
      </p>
      <h3>
        <Translate id="compliance.ftcGmConsent.body.canInsurersStillUse">
          Can insurers still use vehicle data for pricing?
        </Translate>
      </h3>
      <p>
        <Translate
          id="compliance.ftcGmConsent.body.yesUsageBasedPricingWorks"
          values={{
            link: (
              <Link to="/compliance/vehicle-access-audit-trail">
                <Translate id="compliance.ftcGmConsent.body.sessionAuditTrail">
                  session audit trail
                </Translate>
              </Link>
            ),
          }}
        >
          {
            'Yes. Usage-based pricing works and is not going away. What changed is the sourcing. Insurers now need driver-authorized data with a verifiable trail, which is exactly what a {link} provides, rather than a broker feed that just lost its largest buyer.'
          }
        </Translate>
      </p>

      <h2>
        <Translate id="compliance.ftcGmConsent.body.whatOemsAndInsurers">
          What OEMs and insurers should take from it
        </Translate>
      </h2>
      <ul>
        <li>
          <Translate
            id="compliance.ftcGmConsent.body.anyDataMonetizationPlanThat"
            values={{
              strong: (
                <strong>
                  <Translate id="compliance.ftcGmConsent.body.oems">
                    OEMs:
                  </Translate>
                </strong>
              ),
            }}
          >
            {
              '{strong} any data-monetization plan that depends on bulk, broker-routed telematics is now a liability. Re-base it on per-driver consent with an audit trail.'
            }
          </Translate>
        </li>
        <li>
          <Translate
            id="compliance.ftcGmConsent.body.thePathToUsageBased"
            values={{
              strong: (
                <strong>
                  <Translate id="compliance.ftcGmConsent.body.insurers">
                    Insurers:
                  </Translate>
                </strong>
              ),
            }}
          >
            {
              '{strong} the path to usage-based and fleet-telematics pricing runs through consented, verifiable access, not broker feeds that just got cut off.'
            }
          </Translate>
        </li>
      </ul>
      <p>
        <Translate
          id="compliance.ftcGmConsent.body.related"
          values={{
            link: (
              <Link to="/compliance/eu-data-act">
                <Translate id="compliance.ftcGmConsent.body.theEuDataAct">
                  the EU Data Act
                </Translate>
              </Link>
            ),
            link2: (
              <Link to="/solutions/fleet-intelligence">
                <Translate id="compliance.ftcGmConsent.body.mixedFleetTelematicsForInsurers">
                  mixed-fleet telematics for insurers
                </Translate>
              </Link>
            ),
            link3: (
              <Link to="/compliance">
                <Translate id="compliance.ftcGmConsent.body.allComplianceTopics">
                  all compliance topics
                </Translate>
              </Link>
            ),
          }}
        >
          {'Related: {link} · {link2} · {link3}'}
        </Translate>
      </p>
      <p>
        <em>
          <Translate id="compliance.ftcGmConsent.body.thisPageIsEducational">
            This page is educational, not legal advice.
          </Translate>
        </em>
      </p>
    </ContentPageLayout>
  );
}
