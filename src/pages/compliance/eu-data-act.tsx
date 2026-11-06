import React, { type ReactNode } from 'react';
import Link from '@docusaurus/Link';
import ContentPageLayout from '../../components/ContentPageLayout';
import Translate, { translate } from '@docusaurus/Translate';

const SITE = 'https://dimo.org';

const TITLE = translate({
  id: 'compliance.euDataAct.meta.title',
  message: 'EU Data Act for Vehicle Data: What OEMs & Fleets Must Do | DIMO',
});
const DESCRIPTION = translate({
  id: 'compliance.euDataAct.meta.description',
  message:
    'The EU Data Act requires OEMs to expose vehicle data to authorized third parties. Here is the compliance timeline, what is required, and how session-scoped consent meets it.',
});
const H1 = translate({
  id: 'compliance.euDataAct.meta.h1',
  message: 'The EU Data Act and vehicle data: what changes for OEMs and fleets',
});

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
      breadcrumbs={[
        {
          name: translate({
            id: 'compliance.euDataAct.body.home.name',
            message: 'Home',
          }),
          url: `${SITE}/`,
        },
        {
          name: translate({
            id: 'compliance.euDataAct.body.compliance.name',
            message: 'Compliance',
          }),
          url: `${SITE}/compliance`,
        },
        {
          name: translate({
            id: 'compliance.euDataAct.body.euDataAct.name',
            message: 'EU Data Act',
          }),
        },
      ]}
      schema={schema}
      heroEyebrow={translate({
        id: 'compliance.euDataAct.body.complianceEuDataAct',
        message: 'Compliance · EU Data Act',
      })}
      heroTitle={H1}
      heroSubtitle={translate({
        id: 'compliance.euDataAct.body.theEuDataAct',
        message:
          'The EU Data Act turns connected-vehicle data from a proprietary asset into a regulated, shareable one. Here is what it requires and how to be ready in time.',
      })}
    >
      <p>
        <Translate
          id="compliance.euDataAct.body.theRequiresVehicleManufacturers"
          values={{
            strong: (
              <strong>
                <Translate id="compliance.euDataAct.body.euDataAct">
                  EU Data Act
                </Translate>
              </strong>
            ),
          }}
        >
          {
            "The {strong} requires vehicle manufacturers to make the data their connected products generate available to the user and, at the user's request, to authorized third parties, in a usable, real-time, and non-discriminatory way. For OEMs and the fleets that operate their vehicles, that means the connected data a car produces can no longer sit behind a closed first-party portal. It has to be accessible, with the owner's consent, to the services the owner chooses."
          }
        </Translate>
      </p>
      <p>
        <Translate id="compliance.euDataAct.body.inShortTheCar">
          In short: the car is becoming an open data source by law, and the OEMs
          that treat it as an architecture problem now, instead of a legal
          scramble later, will be the ones who turn it into revenue instead of
          liability.
        </Translate>
      </p>

      <h2>
        <Translate id="compliance.euDataAct.body.theTimelineThatIs">
          The timeline that is not moving
        </Translate>
      </h2>
      <p>
        <Translate
          id="compliance.euDataAct.body.theDataActBecame"
          values={{
            strong: (
              <strong>
                <Translate id="compliance.euDataAct.body.september2025">
                  September 2025
                </Translate>
              </strong>
            ),
            strong2: (
              <strong>
                <Translate id="compliance.euDataAct.body.september2026">
                  September 2026
                </Translate>
              </strong>
            ),
          }}
        >
          {
            "The Data Act became applicable in {strong}, with the obligations that bite hardest for connected vehicles, third-party data access at the user's request, phasing into enforcement for OEMs around {strong2}. The deadline is fixed."
          }
        </Translate>
      </p>
      <p>
        <Translate
          id="compliance.euDataAct.body.thatMattersBecauseOf"
          values={{
            strong: (
              <strong>
                <Translate id="compliance.euDataAct.body.a1218MonthInHouse">
                  A 12–18 month in-house build that starts today delivers 6–12
                  months late. The compliance clock does not move.
                </Translate>
              </strong>
            ),
          }}
        >
          {
            'That matters because of simple arithmetic. {strong} An OEM that decides to build its own consent, access, and audit layer from scratch is, in most cases, already behind the regulation before the first sprint closes.'
          }
        </Translate>
      </p>

      <h2>
        <Translate id="compliance.euDataAct.body.whatCompliantAccessActually">
          What “compliant access” actually requires
        </Translate>
      </h2>
      <p>
        <Translate id="compliance.euDataAct.body.strippedToItsEssentials">
          Stripped to its essentials, and read alongside GDPR, the Data Act asks
          for four capabilities around vehicle data:
        </Translate>
      </p>
      <ul>
        <li>
          <Translate
            id="compliance.euDataAct.body.theUserMustExplicitly"
            values={{
              strong: (
                <strong>
                  <Translate id="compliance.euDataAct.body.authorization">
                    Authorization.
                  </Translate>
                </strong>
              ),
            }}
          >
            {
              '{strong} The user must explicitly grant access; implied or bundled consent does not satisfy the standard.'
            }
          </Translate>
        </li>
        <li>
          <Translate
            id="compliance.euDataAct.body.thirdPartiesReceiveOnly"
            values={{
              strong: (
                <strong>
                  <Translate id="compliance.euDataAct.body.scoping">
                    Scoping.
                  </Translate>
                </strong>
              ),
            }}
          >
            {
              '{strong} Third parties receive only the specific data a user authorized, for the purpose authorized, not a firehose.'
            }
          </Translate>
        </li>
        <li>
          <Translate
            id="compliance.euDataAct.body.theUserCanWithdraw"
            values={{
              strong: (
                <strong>
                  <Translate id="compliance.euDataAct.body.revocation">
                    Revocation.
                  </Translate>
                </strong>
              ),
            }}
          >
            {
              '{strong} The user can withdraw access, and the withdrawal must actually stop the flow.'
            }
          </Translate>
        </li>
        <li>
          <Translate
            id="compliance.euDataAct.body.thereMustBeA"
            values={{
              strong: (
                <strong>
                  <Translate id="compliance.euDataAct.body.auditability">
                    Auditability.
                  </Translate>
                </strong>
              ),
            }}
          >
            {
              '{strong} There must be a record of who accessed what, when, and under whose authorization.'
            }
          </Translate>
        </li>
      </ul>
      <p>
        <Translate id="compliance.euDataAct.body.mostExistingConnectedServicesStacks">
          Most existing connected-services stacks were never designed around
          these four. They were built to deliver first-party features, then
          retrofitted with a consent checkbox. The Data Act is hard precisely
          because it demands these properties be structural, not cosmetic.
        </Translate>
      </p>

      <h2>
        <Translate id="compliance.euDataAct.body.howASessionModel">
          How a session model meets it
        </Translate>
      </h2>
      <p>
        <Translate
          id="compliance.euDataAct.body.aVehicleIsAn"
          values={{
            em: <em>session</em>,
            link: (
              <Link to="/compliance/session-scoped-consent">
                <Translate id="compliance.euDataAct.body.sessionScopedConsent">
                  session-scoped consent
                </Translate>
              </Link>
            ),
          }}
        >
          {
            "A vehicle {em} is an access event with those four properties built in. When a session is created, it carries the user's identity, a defined data scope, and a time limit; when it ends, access revokes atomically and a signed, independently verifiable record is sealed. Consent is part of creating the session, not a policy attached afterward. That is exactly what {link} describes."
          }
        </Translate>
      </p>
      <p>
        <Translate
          id="compliance.euDataAct.body.becauseTheAccessPrimitive"
          values={{
            strong: (
              <strong>
                <Translate id="compliance.euDataAct.body.euDataActCompliance">
                  EU Data Act compliance is a byproduct of the architecture, not
                  a retrofit.
                </Translate>
              </strong>
            ),
            link: (
              <Link to="/vehicle-session-infrastructure">
                <Translate id="compliance.euDataAct.body.50VehicleBrandsAlready">
                  50+ vehicle brands already connected to DIMO
                </Translate>
              </Link>
            ),
          }}
        >
          {
            'Because the access primitive already produces authorization, scoping, revocation, and an audit trail, {strong} An OEM integrates one access layer and inherits the compliant behavior across every model and market, rather than re-implementing consent for each program. The same model normalizes data across {link}, which matters for fleets running mixed inventories.'
          }
        </Translate>
      </p>

      <h2>
        <Translate id="compliance.euDataAct.body.fromComplianceCostTo">
          From compliance cost to revenue
        </Translate>
      </h2>
      <p>
        <Translate
          id="compliance.euDataAct.body.itIsTemptingTo"
          values={{
            strong: (
              <strong>
                <Translate id="compliance.euDataAct.body.tensOfBillionsOf">
                  tens of billions of dollars a year
                </Translate>
              </strong>
            ),
            em: <em>same</em>,
          }}
        >
          {
            'It is tempting to read the Data Act as pure cost. It is not. The same consented, scoped access that satisfies the regulation is the foundation for the software revenue OEMs are already chasing. They are collectively targeting {strong} from software and connected services by 2030. The difference is that the compliant path and the revenue path are now the {em} path. An OEM that can grant a driver-authorized session can also offer per-session insurance, plug-and-charge, or maintenance services on top of it, legally, with the consent already captured.'
          }
        </Translate>
      </p>
      <p>
        <Translate
          id="compliance.euDataAct.body.contrastThatWithThe"
          values={{
            link: (
              <Link to="/compliance/ftc-gm-consent">
                <Translate id="compliance.euDataAct.body.ftcsGmOnstarOrder">
                  FTC's GM/OnStar order
                </Translate>
              </Link>
            ),
          }}
        >
          {
            'Contrast that with the closed path. As the {link} showed, the bulk-data-brokerage model is now a liability rather than an asset. The OEMs that win the next decade of connected-services revenue will be the ones whose data access was consented and auditable from the first session, because that is the only kind regulators, insurers, and increasingly customers will accept.'
          }
        </Translate>
      </p>

      <h2>
        <Translate id="compliance.euDataAct.body.commonQuestions">
          Common questions
        </Translate>
      </h2>
      <h3>
        <Translate id="compliance.euDataAct.body.doesThisOnlyMatter">
          Does this only matter for vehicles sold in the EU?
        </Translate>
      </h3>
      <p>
        <Translate id="compliance.euDataAct.body.theDataActIs">
          The Data Act is an EU regulation, but its gravity is global. The same
          architecture an OEM builds for the EU answers the FTC standard in the
          US and SB-1394 in California, so most manufacturers will not maintain
          a separate “compliant” stack for one market and a legacy stack for
          another. The economics push toward one consented access layer
          everywhere.
        </Translate>
      </p>
      <h3>
        <Translate id="compliance.euDataAct.body.weAlreadyHaveA">
          We already have a connected-services program. Is that enough?
        </Translate>
      </h3>
      <p>
        <Translate id="compliance.euDataAct.body.usuallyNotMostExisting">
          Usually not. Most existing programs were designed to deliver
          first-party features and then retrofitted with a consent checkbox. The
          Data Act asks for third-party access at the user's request, with
          scoping, revocation, and an audit trail as structural properties. If
          those four are not built into how access is granted, a checkbox will
          not close the gap.
        </Translate>
      </p>

      <h2>
        <Translate id="compliance.euDataAct.body.whatOemsAndFleets">
          What OEMs and fleets should do now
        </Translate>
      </h2>
      <ul>
        <li>
          <Translate
            id="compliance.euDataAct.body.treatThirdPartyAccessAs"
            values={{
              strong: (
                <strong>
                  <Translate id="compliance.euDataAct.body.oems">
                    OEMs:
                  </Translate>
                </strong>
              ),
            }}
          >
            {
              '{strong} treat third-party access as a platform capability, not a per-program feature. Decide build-vs-integrate against a September 2026 clock, not an open-ended roadmap.'
            }
          </Translate>
        </li>
        <li>
          <Translate
            id="compliance.euDataAct.body.ifYouOperateVehicles"
            values={{
              strong: (
                <strong>
                  <Translate id="compliance.euDataAct.body.fleets">
                    Fleets:
                  </Translate>
                </strong>
              ),
              link: (
                <Link to="/compliance/vehicle-access-audit-trail">
                  <Translate id="compliance.euDataAct.body.auditReadyVehicleAccess">
                    audit-ready vehicle access
                  </Translate>
                </Link>
              ),
            }}
          >
            {
              '{strong} if you operate vehicles in the EU, confirm your data access path is consent-backed and revocable today. See {link}.'
            }
          </Translate>
        </li>
      </ul>
      <p>
        <em>
          <Translate id="compliance.euDataAct.body.thisPageIsEducational">
            This page is educational, not legal advice. Formal certification
            review should be completed before using compliance language in
            European OEM procurement.
          </Translate>
        </em>
      </p>
      <p>
        <Translate
          id="compliance.euDataAct.body.related"
          values={{
            link: (
              <Link to="/compliance/ftc-gm-consent">
                <Translate id="compliance.euDataAct.body.theFtcGmOnStarOrder">
                  the FTC GM/OnStar order
                </Translate>
              </Link>
            ),
            link2: (
              <Link to="/compliance">
                <Translate id="compliance.euDataAct.body.allComplianceTopics">
                  all compliance topics
                </Translate>
              </Link>
            ),
            link3: (
              <Link to="/industries/oem">
                <Translate id="compliance.euDataAct.body.dimoForOems">
                  DIMO for OEMs
                </Translate>
              </Link>
            ),
          }}
        >
          {'Related: {link} · {link2} · {link3}'}
        </Translate>
      </p>
    </ContentPageLayout>
  );
}
