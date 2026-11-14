import React, { type ReactNode } from 'react';
import Link from '@docusaurus/Link';
import ContentPageLayout from '../../components/ContentPageLayout';
import Translate, { translate } from '@docusaurus/Translate';

const SITE = 'https://dimo.org';

const TITLE = translate({
  id: 'compliance.meta.title',
  message: 'Connected Vehicle Data Compliance: EU Data Act, FTC, GDPR | DIMO',
});
const DESCRIPTION = translate({
  id: 'compliance.meta.description',
  message:
    'How fleets and OEMs meet the EU Data Act, the FTC consent standard, GDPR, and SB-1394 for connected vehicle data, using session-scoped consent and verifiable audit trails.',
});

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
      breadcrumbs={[
        {
          name: translate({ id: 'compliance.body.home.name', message: 'Home' }),
          url: `${SITE}/`,
        },
        {
          name: translate({
            id: 'compliance.body.compliance.name',
            message: 'Compliance',
          }),
        },
      ]}
      schema={schema}
      heroEyebrow={translate({
        id: 'compliance.body.compliance',
        message: 'Compliance',
      })}
      heroTitle={translate({
        id: 'compliance.body.compliantConnectedVehicleDataAccess',
        message: 'Compliant connected-vehicle data access, by architecture',
      })}
      heroSubtitle={translate({
        id: 'compliance.body.regulatorsOnThreeContinents',
        message:
          'Regulators on three continents now require consent-first, revocable, auditable access to vehicle data. DIMO was built that way from the start — compliance is a byproduct of the architecture, not a retrofit.',
      })}
      ctaLabel={translate({
        id: 'compliance.body.talkToOurTeam',
        message: 'Talk to our team',
      })}
      ctaHref="/contact"
    >
      <p>
        <Translate
          id="compliance.body.connectedVehicleDataCompliance"
          values={{
            strong: (
              <strong>
                <Translate id="compliance.body.consentFirstVehicleDataAccess">
                  consent-first vehicle data access is now legally required, not
                  ethically preferred.
                </Translate>
              </strong>
            ),
          }}
        >
          {
            'Connected vehicle data compliance means giving drivers and owners consent-first, revocable control over what is shared, with whom, and for how long, and produces a verifiable record of every access. As of 2026, that is no longer a best practice. It is the law in the United States and the European Union, and {strong}'
          }
        </Translate>
      </p>
      <p>
        <Translate id="compliance.body.thisPageMapsThe">
          This page maps the regulations reshaping the connected-vehicle market
          and how a session-based access model satisfies all of them at once,
          without a multi-year in-house build.
        </Translate>
      </p>

      <h2>
        <Translate id="compliance.body.theRegulatoryWave">
          The regulatory wave
        </Translate>
      </h2>
      <p>
        <Translate id="compliance.body.fourMovingPiecesAre">
          Four moving pieces are converging on the same requirement: that access
          to vehicle data be explicitly consented, scoped, revocable, and
          auditable.
        </Translate>
      </p>
      <ul>
        <li>
          <Translate
            id="compliance.body.theRequiresOemsTo"
            values={{
              link: (
                <Link to="/compliance/eu-data-act">
                  <Translate id="compliance.body.euDataAct">
                    EU Data Act
                  </Translate>
                </Link>
              ),
            }}
          >
            {
              'The {link} requires OEMs to expose vehicle data to authorized third parties. It took effect in September 2025, with OEM enforcement following in September 2026.'
            }
          </Translate>
        </li>
        <li>
          <Translate
            id="compliance.body.theBansNonConsentedSharing"
            values={{
              link: (
                <Link to="/compliance/ftc-gm-consent">
                  <Translate id="compliance.body.ftcGmOnStarConsentOrder">
                    FTC GM/OnStar consent order
                  </Translate>
                </Link>
              ),
            }}
          >
            {
              'The {link} bans non-consented sharing of driver-behavior data, and effectively ends bulk telematics brokerage as a business model.'
            }
          </Translate>
        </li>
        <li>
          <Translate
            id="compliance.body.makeConsentStructurallyPart"
            values={{
              link: (
                <Link to="/compliance/session-scoped-consent">
                  <Translate id="compliance.body.gdprAndSessionScopedConsent">
                    GDPR and session-scoped consent
                  </Translate>
                </Link>
              ),
            }}
          >
            {
              '{link} make consent structurally part of the access event, not a separate policy bolted on afterward.'
            }
          </Translate>
        </li>
        <li>
          <Translate
            id="compliance.body.requireVehicleAccessTo"
            values={{
              link: (
                <Link to="/compliance/vehicle-access-audit-trail">
                  <Translate id="compliance.body.californiaSb1394AndUnece">
                    California SB-1394 and UNECE R155
                  </Translate>
                </Link>
              ),
            }}
          >
            {
              '{link} require vehicle access to be revocable by the owner and auditable by design.'
            }
          </Translate>
        </li>
      </ul>

      <h2>
        <Translate id="compliance.body.whyASessionModel">
          Why a session model satisfies all of them at once
        </Translate>
      </h2>
      <p>
        <Translate
          id="compliance.body.eachOfTheseRules"
          values={{
            em: (
              <em>
                <Translate id="compliance.body.session">session</Translate>
              </em>
            ),
          }}
        >
          {
            "Each of these rules asks for the same four things: explicit authorization, scoped access, atomic revocation, and a verifiable trail. A vehicle {em} bundles exactly those properties. A session is created with a driver's identity, a specific data scope, a spend limit, and a time limit; when the use case ends, everything revokes at once and a cryptographically signed, independently verifiable record is sealed."
          }
        </Translate>
      </p>
      <p>
        <Translate
          id="compliance.body.becauseConsentIsPart"
          values={{
            link: (
              <Link to="/compliance/session-scoped-consent">
                <Translate id="compliance.body.sessionScopedConsent">
                  session-scoped consent
                </Translate>
              </Link>
            ),
            link2: (
              <Link to="/vehicle-session-infrastructure">
                <Translate id="compliance.body.vehicleSessionInfrastructure">
                  vehicle session infrastructure
                </Translate>
              </Link>
            ),
            link3: (
              <Link to="/industries/rentals">
                <Translate id="compliance.body.rentalOperations">
                  rental operations
                </Translate>
              </Link>
            ),
            link4: (
              <Link to="/products/consent">
                <Translate id="compliance.body.consentProductDocs">
                  consent product docs
                </Translate>
              </Link>
            ),
          }}
        >
          {
            'Because consent is part of the session-creation primitive rather than a downstream policy, the same architecture answers GDPR, the EU Data Act, the FTC standard, and SB-1394. See {link} for how that works, and {link2} for the broader model. Operators can read how this applies to fleets in {link3}, and developers can start in the {link4}.'
          }
        </Translate>
      </p>
      <p>
        <em>
          <Translate id="compliance.body.noteFormalCertificationReview">
            Note: formal certification review should be completed before using
            compliance language in European OEM procurement; this page is
            educational, not legal advice.
          </Translate>
        </em>
      </p>
    </ContentPageLayout>
  );
}
