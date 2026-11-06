import React, { type ReactNode } from 'react';
import Link from '@docusaurus/Link';
import ContentPageLayout from '../../components/ContentPageLayout';
import Translate, { translate } from '@docusaurus/Translate';

const SITE = 'https://dimo.org';

const TITLE = translate({
  id: 'compliance.sessionScopedConsent.meta.title',
  message: 'Session-Scoped Consent for Vehicle Data, Explained | DIMO',
});
const DESCRIPTION = translate({
  id: 'compliance.sessionScopedConsent.meta.description',
  message:
    'What session-scoped consent is, why grant-then-revoke beats blanket data sharing, and how it satisfies GDPR, the EU Data Act, and California SB-1394 by architecture.',
});
const H1 = translate({
  id: 'compliance.sessionScopedConsent.meta.h1',
  message: 'Session-scoped consent: consent built into the access primitive',
});

const schema = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: H1,
  description: DESCRIPTION,
  url: `${SITE}/compliance/session-scoped-consent`,
  datePublished: '2026-06-26',
  isPartOf: { '@id': `${SITE}/#website` },
  author: { '@id': `${SITE}/#organization`, name: 'DIMO' },
  publisher: { '@id': `${SITE}/#organization`, name: 'DIMO' },
};

export default function SessionScopedConsent(): ReactNode {
  return (
    <ContentPageLayout
      title={TITLE}
      description={DESCRIPTION}
      breadcrumbs={[
        {
          name: translate({
            id: 'compliance.sessionScopedConsent.body.home.name',
            message: 'Home',
          }),
          url: `${SITE}/`,
        },
        {
          name: translate({
            id: 'compliance.sessionScopedConsent.body.compliance.name',
            message: 'Compliance',
          }),
          url: `${SITE}/compliance`,
        },
        {
          name: translate({
            id: 'compliance.sessionScopedConsent.body.sessionScopedConsent.name',
            message: 'Session-Scoped Consent',
          }),
        },
      ]}
      schema={schema}
      heroEyebrow={translate({
        id: 'compliance.sessionScopedConsent.body.complianceConsent',
        message: 'Compliance · Consent',
      })}
      heroTitle={H1}
      heroSubtitle={translate({
        id: 'compliance.sessionScopedConsent.body.mostVehicleDataSystems',
        message:
          'Most vehicle data systems treat consent as a policy bolted onto a data pipe. Session-scoped consent makes it part of how access is created — and revoked.',
      })}
    >
      <p>
        <Translate
          id="compliance.sessionScopedConsent.body.meansTheUsersPermission"
          values={{
            strong: (
              <strong>
                <Translate id="compliance.sessionScopedConsent.body.sessionScopedConsent">
                  Session-scoped consent
                </Translate>
              </strong>
            ),
            em: (
              <em>
                {' '}
                <Translate id="compliance.sessionScopedConsent.body.compliantByArchitectureNot">
                  compliant by architecture, not by policy.
                </Translate>
              </em>
            ),
          }}
        >
          {
            "{strong} means the user's permission is structurally part of creating an access session, not a separate policy applied afterward. Instead of granting a service blanket, perpetual access to a vehicle's data, the owner authorizes a specific session: a defined scope of data and capabilities, for a defined purpose, for a defined time, after which everything revokes at once. Consent is{em}"
          }
        </Translate>
      </p>

      <h2>
        <Translate id="compliance.sessionScopedConsent.body.theProblemWithBlanket">
          The problem with blanket consent
        </Translate>
      </h2>
      <p>
        <Translate id="compliance.sessionScopedConsent.body.thinkAboutLoggingInto">
          Think about logging into a streaming account at a hotel two years ago.
          There is a decent chance a stranger is still using it, because the
          access you granted never cleanly ended. Now imagine that is not a
          streaming login. It is your car, your digital key, your payment
          method, and your location. That is what blanket, perpetual data
          sharing looks like in the vehicle world: access is granted broadly,
          scoped loosely, and almost never revoked in a way you can verify.
        </Translate>
      </p>
      <p>
        <Translate
          id="compliance.sessionScopedConsent.body.regulatorsHaveDecidedThat"
          values={{
            link: (
              <Link to="/compliance/eu-data-act">
                <Translate id="compliance.sessionScopedConsent.body.euDataAct">
                  EU Data Act
                </Translate>
              </Link>
            ),
            link2: (
              <Link to="/compliance/ftc-gm-consent">
                <Translate id="compliance.sessionScopedConsent.body.ftcsGmOnstarOrder">
                  FTC's GM/OnStar order
                </Translate>
              </Link>
            ),
          }}
        >
          {
            'Regulators have decided that model is no longer acceptable. GDPR demands purpose limitation and the right to withdraw; the {link} demands scoped, user-directed access; the {link2} demands affirmative opt-in. Every one of them is, in effect, asking for consent that is specific, revocable, and provable.'
          }
        </Translate>
      </p>

      <h2>
        <Translate id="compliance.sessionScopedConsent.body.howSessionScopedConsentWorks">
          How session-scoped consent works
        </Translate>
      </h2>
      <p>
        <Translate id="compliance.sessionScopedConsent.body.aVehicleSessionIs">
          A vehicle session is created as a single operation that carries
          everything the access needs:
        </Translate>
      </p>
      <ul>
        <li>
          <Translate
            id="compliance.sessionScopedConsent.body.whoIsBeingGranted"
            values={{
              strong: (
                <strong>
                  <Translate id="compliance.sessionScopedConsent.body.identity">
                    Identity:
                  </Translate>
                </strong>
              ),
            }}
          >
            {'{strong} who is being granted access, verified.'}
          </Translate>
        </li>
        <li>
          <Translate
            id="compliance.sessionScopedConsent.body.exactlyWhichDataAnd"
            values={{
              strong: (
                <strong>
                  <Translate id="compliance.sessionScopedConsent.body.scope">
                    Scope:
                  </Translate>
                </strong>
              ),
            }}
          >
            {'{strong} exactly which data and capabilities, and nothing more.'}
          </Translate>
        </li>
        <li>
          <Translate
            id="compliance.sessionScopedConsent.body.aCapAndAn"
            values={{
              strong: (
                <strong>
                  <Translate id="compliance.sessionScopedConsent.body.spendAndTimeLimits">
                    Spend and time limits:
                  </Translate>
                </strong>
              ),
            }}
          >
            {'{strong} a cap and an expiry, so access is bounded by design.'}
          </Translate>
        </li>
        <li>
          <Translate
            id="compliance.sessionScopedConsent.body.whenTheSessionEnds"
            values={{
              strong: (
                <strong>
                  <Translate id="compliance.sessionScopedConsent.body.atomicRevocation">
                    Atomic revocation:
                  </Translate>
                </strong>
              ),
            }}
          >
            {
              '{strong} when the session ends, every permission inside it is withdrawn together, not one system at a time.'
            }
          </Translate>
        </li>
      </ul>
      <p>
        <Translate
          id="compliance.sessionScopedConsent.body.whenTheSessionCloses"
          values={{
            strong: (
              <strong>
                <Translate id="compliance.sessionScopedConsent.body.cryptographicallySignedIndependentlyVerifiable">
                  cryptographically signed, independently verifiable
                </Translate>
              </strong>
            ),
          }}
        >
          {
            'When the session closes, it seals a {strong} record of what was authorized and when it ended. Because consent is part of session creation, you cannot have access without a consent artifact, and you cannot have lingering access after revocation. The compliance properties regulators ask for are not added later. They are the only way the system works.'
          }
        </Translate>
      </p>

      <h2>
        <Translate id="compliance.sessionScopedConsent.body.aConcreteExampleA">
          A concrete example: a three-day rental
        </Translate>
      </h2>
      <p>
        <Translate id="compliance.sessionScopedConsent.body.pictureADriverRenting">
          Picture a driver renting a connected vehicle for a weekend. With
          session-scoped consent, the rental creates one session at checkout: it
          verifies the driver, issues a digital key, scopes data access to
          location and trip telemetry for the rental period only, sets a spend
          cap for charging and tolls, and stamps a 72-hour expiry. The driver
          can see precisely what they granted. When they return the car, the
          session ends: the key stops working, data access stops, and a signed
          record of the whole arrangement is sealed.
        </Translate>
      </p>
      <p>
        <Translate id="compliance.sessionScopedConsent.body.nothingLingersThereIs">
          Nothing lingers. There is no open data feed after the return, no key
          that still works in a stranger's hands, and no need for anyone to
          manually go disable five separate systems. The consent and its
          boundaries were the access, so ending the access ended the consent,
          cleanly and provably.
        </Translate>
      </p>

      <h2>
        <Translate id="compliance.sessionScopedConsent.body.blanketConsentVsSessionScoped">
          Blanket consent vs. session-scoped consent
        </Translate>
      </h2>
      <table>
        <thead>
          <tr>
            <th>
              <Translate id="compliance.sessionScopedConsent.body.property">
                Property
              </Translate>
            </th>
            <th>
              <Translate id="compliance.sessionScopedConsent.body.blanketConsent">
                Blanket consent
              </Translate>
            </th>
            <th>
              <Translate id="compliance.sessionScopedConsent.body.sessionScopedConsent">
                Session-scoped consent
              </Translate>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Translate id="compliance.sessionScopedConsent.body.whenConsentIsCaptured">
                When consent is captured
              </Translate>
            </td>
            <td>
              <Translate id="compliance.sessionScopedConsent.body.onceUpFrontBroadly">
                Once, up front, broadly
              </Translate>
            </td>
            <td>
              <Translate id="compliance.sessionScopedConsent.body.perAccessEventAs">
                Per access event, as part of creating it
              </Translate>
            </td>
          </tr>
          <tr>
            <td>
              <Translate id="compliance.sessionScopedConsent.body.scopeOfData">
                Scope of data
              </Translate>
            </td>
            <td>
              <Translate id="compliance.sessionScopedConsent.body.looselyDefinedOftenEverything">
                Loosely defined, often everything
              </Translate>
            </td>
            <td>
              <Translate id="compliance.sessionScopedConsent.body.exactlyWhatThePurpose">
                Exactly what the purpose needs
              </Translate>
            </td>
          </tr>
          <tr>
            <td>
              <Translate id="compliance.sessionScopedConsent.body.revocation">
                Revocation
              </Translate>
            </td>
            <td>
              <Translate id="compliance.sessionScopedConsent.body.manualPartialOftenNever">
                Manual, partial, often never
              </Translate>
            </td>
            <td>
              <Translate id="compliance.sessionScopedConsent.body.atomicAllPermissionsEnd">
                Atomic; all permissions end together
              </Translate>
            </td>
          </tr>
          <tr>
            <td>
              <Translate id="compliance.sessionScopedConsent.body.proof">
                Proof
              </Translate>
            </td>
            <td>
              <Translate id="compliance.sessionScopedConsent.body.aPolicyDocument">
                A policy document
              </Translate>
            </td>
            <td>
              <Translate id="compliance.sessionScopedConsent.body.aSignedVerifiablePerSession">
                A signed, verifiable per-session record
              </Translate>
            </td>
          </tr>
        </tbody>
      </table>

      <h2>
        <Translate id="compliance.sessionScopedConsent.body.whyThisSatisfiesMultiple">
          Why this satisfies multiple regulations at once
        </Translate>
      </h2>
      <p>
        <Translate
          id="compliance.sessionScopedConsent.body.theReasonASingle"
          values={{
            em: (
              <em>
                <Translate id="compliance.sessionScopedConsent.body.structurallyPartOfThe">
                  structurally part of the session creation primitive
                </Translate>
              </em>
            ),
          }}
        >
          {
            'The reason a single model answers GDPR, the EU Data Act, and California SB-1394 is that they all reduce to the same primitive: authorize, scope, revoke, and prove. A blanket-consent system has to bolt each of those on separately and reconcile them. A session model produces all four as a side effect of granting access at all. That is what it means for consent to be {em} rather than a policy layer.'
          }
        </Translate>
      </p>
      <p>
        <Translate
          id="compliance.sessionScopedConsent.body.forTheTechnicalImplementation"
          values={{
            link: (
              <Link to="/compliance/vehicle-access-audit-trail">
                <Translate id="compliance.sessionScopedConsent.body.auditReadyVehicleAccess">
                  audit-ready vehicle access
                </Translate>
              </Link>
            ),
            link2: (
              <Link to="/vehicle-session-infrastructure">
                <Translate id="compliance.sessionScopedConsent.body.vehicleSessionInfrastructure">
                  vehicle session infrastructure
                </Translate>
              </Link>
            ),
            link3: (
              <Link to="/products/consent">
                <Translate id="compliance.sessionScopedConsent.body.consentProduct">
                  consent product
                </Translate>
              </Link>
            ),
          }}
        >
          {
            "For the technical implementation of revocation specifically, which maps directly to SB-1394's “revocable by the owner” requirement, see {link}. For the broader model these sessions belong to, see {link2}, and developers can start with the {link3}."
          }
        </Translate>
      </p>
      <p>
        <Translate
          id="compliance.sessionScopedConsent.body.related"
          values={{
            link: (
              <Link to="/compliance">
                <Translate id="compliance.sessionScopedConsent.body.allComplianceTopics">
                  all compliance topics
                </Translate>
              </Link>
            ),
            link2: (
              <Link to="/compliance/eu-data-act">
                <Translate id="compliance.sessionScopedConsent.body.euDataAct">
                  EU Data Act
                </Translate>
              </Link>
            ),
          }}
        >
          {'Related: {link} · {link2}'}
        </Translate>
      </p>
      <p>
        <em>
          <Translate id="compliance.sessionScopedConsent.body.thisPageIsEducational">
            This page is educational, not legal advice.
          </Translate>
        </em>
      </p>
    </ContentPageLayout>
  );
}
