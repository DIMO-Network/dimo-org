import React, { type ReactNode } from 'react';
import Link from '@docusaurus/Link';
import EnglishLink from '../components/EnglishLink';
import ContentPageLayout from '../components/ContentPageLayout';
import Translate, { translate } from '@docusaurus/Translate';

const SITE = 'https://dimo.org';

const TITLE = translate({
  id: 'vehicleSessionInfrastructure.meta.title',
  message: 'Vehicle Session Infrastructure: OAuth for Vehicles | DIMO',
});
const DESCRIPTION = translate({
  id: 'vehicleSessionInfrastructure.meta.description',
  message:
    'Smartcar reads data and Geotab tracks vehicles — neither governs the session. DIMO is the access layer: create a vehicle session, scope data and spend, and revoke it atomically.',
});
const H1 = translate({
  id: 'vehicleSessionInfrastructure.meta.h1',
  message:
    'Vehicle Session Infrastructure: verify, key, scope, spend — and revoke',
});

const schema = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: H1,
  description: DESCRIPTION,
  url: `${SITE}/vehicle-session-infrastructure`,
  image: `${SITE}/img/dimo-social-card.png`,
  datePublished: '2026-06-26',
  dateModified: '2026-07-06',
  isPartOf: { '@id': `${SITE}/#website` },
  author: { '@id': `${SITE}/#organization`, name: 'DIMO' },
  publisher: { '@id': `${SITE}/#organization`, name: 'DIMO' },
};

export default function VehicleSessionInfrastructure(): ReactNode {
  return (
    <ContentPageLayout
      title={TITLE}
      description={DESCRIPTION}
      breadcrumbs={[
        {
          name: translate({
            id: 'vehicleSessionInfrastructure.body.home.name',
            message: 'Home',
          }),
          url: `${SITE}/`,
        },
        {
          name: translate({
            id: 'vehicleSessionInfrastructure.body.vehicleSessionInfrastructure.name',
            message: 'Vehicle Session Infrastructure',
          }),
        },
      ]}
      schema={schema}
      heroEyebrow={translate({
        id: 'vehicleSessionInfrastructure.body.platform',
        message: 'Platform',
      })}
      heroTitle={H1}
      heroSubtitle={translate({
        id: 'vehicleSessionInfrastructure.body.aRentalACarshare',
        message:
          "A rental, a carshare, a robotaxi ride, a fleet dispatch: every time someone uses a vehicle they don't own, that's a session. DIMO is the infrastructure that governs it.",
      })}
    >
      <p>
        <Translate
          id="vehicleSessionInfrastructure.body.isTheSoftwareLayer"
          values={{
            strong: (
              <strong>
                <Translate id="vehicleSessionInfrastructure.body.vehicleSessionInfrastructure">
                  Vehicle Session Infrastructure
                </Translate>
              </strong>
            ),
          }}
        >
          {
            '{strong} is the software layer that provisions a vehicle for a shared use case in one operation, then revokes everything when the use case ends. It is the concept at the center of DIMO, the vehicle data infrastructure that powers the session-based economy. It sits between the car and the apps, fleets, and services that need temporary, governed access. The easiest way to picture it is by analogy to plumbing that already runs the internet:'
          }
        </Translate>
      </p>
      <ul>
        <li>
          <Translate
            id="vehicleSessionInfrastructure.body.authorizesCapturesAndRefunds"
            values={{
              strong: (
                <strong>
                  <Translate id="vehicleSessionInfrastructure.body.stripe">
                    Stripe
                  </Translate>
                </strong>
              ),
            }}
          >
            {'{strong} authorizes, captures, and refunds a payment.'}
          </Translate>
        </li>
        <li>
          <Translate
            id="vehicleSessionInfrastructure.body.createsScopesAndRevokes"
            values={{
              strong: (
                <strong>
                  <Translate id="vehicleSessionInfrastructure.body.auth0">
                    Auth0
                  </Translate>
                </strong>
              ),
            }}
          >
            {'{strong} creates, scopes, and revokes an identity session.'}
          </Translate>
        </li>
        <li>
          <Translate
            id="vehicleSessionInfrastructure.body.createsAVehicleSession"
            values={{ strong: <strong>DIMO</strong> }}
          >
            {
              '{strong} creates a vehicle session, scopes the data, access, and spend inside it, and revokes it at return.'
            }
          </Translate>
        </li>
      </ul>
      <p>
        <Translate
          id="vehicleSessionInfrastructure.body.putAnotherWayIt"
          values={{
            strong: (
              <strong>
                <Translate id="vehicleSessionInfrastructure.body.oauthForVehicles">
                  OAuth for vehicles
                </Translate>
              </strong>
            ),
          }}
        >
          {
            'Put another way, it is {strong}. Right now every fleet operator, rental app, and OEM wires up its own identity, keys, data, and payment integrations by hand. It is the same mess every website lived with before OAuth, when each site rolled its own login. DIMO is the shared primitive that replaces it.'
          }
        </Translate>
      </p>

      <h2>
        <Translate id="vehicleSessionInfrastructure.body.theRowNotThe">
          The row, not the column
        </Translate>
      </h2>
      <p>
        <Translate id="vehicleSessionInfrastructure.body.itIsEasyTo">
          It is easy to mistake DIMO for a telematics provider or a digital-key
          vendor. It is neither. It does not compete on any single column; it
          composes the whole row. Here is the landscape:
        </Translate>
      </p>
      <table>
        <thead>
          <tr>
            <th>
              <Translate id="vehicleSessionInfrastructure.body.layer">
                Layer
              </Translate>
            </th>
            <th>
              <Translate id="vehicleSessionInfrastructure.body.whoOwnsIt">
                Who owns it
              </Translate>
            </th>
            <th>
              <Translate id="vehicleSessionInfrastructure.body.whatItDoesAnd">
                What it does, and lacks
              </Translate>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Translate id="vehicleSessionInfrastructure.body.fleetTelematics">
                Fleet telematics
              </Translate>
            </td>
            <td>
              <Translate id="vehicleSessionInfrastructure.body.geotabSamsaraVerizonConnect">
                Geotab, Samsara, Verizon Connect, Motive
              </Translate>
            </td>
            <td>
              <Translate id="vehicleSessionInfrastructure.body.monitoringOnlyNothingTo">
                Monitoring only; nothing to revoke when the use ends
              </Translate>
            </td>
          </tr>
          <tr>
            <td>
              <Translate id="vehicleSessionInfrastructure.body.connectedDataApiReadOnly">
                Connected data API (read-only)
              </Translate>
            </td>
            <td>
              <Translate id="vehicleSessionInfrastructure.body.smartcarMotorqHighMobility">
                Smartcar, Motorq, High Mobility
              </Translate>
            </td>
            <td>
              <Translate id="vehicleSessionInfrastructure.body.aWindowIntoThe">
                A window into the car, with no session object
              </Translate>
            </td>
          </tr>
          <tr>
            <td>
              <Translate id="vehicleSessionInfrastructure.body.digitalKeyAccess">
                Digital key / access
              </Translate>
            </td>
            <td>
              <Translate id="vehicleSessionInfrastructure.body.cccDigitalKeyStandard">
                CCC Digital Key, Standard Fleet
              </Translate>
            </td>
            <td>
              <Translate id="vehicleSessionInfrastructure.body.accessButNotComposed">
                Access, but not composed with data, spend, and revocation
              </Translate>
            </td>
          </tr>
          <tr>
            <td>
              <strong>
                <Translate id="vehicleSessionInfrastructure.body.sessionInfrastructure">
                  Session infrastructure
                </Translate>
              </strong>
            </td>
            <td>
              <strong>DIMO</strong>
            </td>
            <td>
              <Translate id="vehicleSessionInfrastructure.body.oneSessionThatBundles">
                One session that bundles and governs all of the above
              </Translate>
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        <Translate
          id="vehicleSessionInfrastructure.body.orInOneLine"
          values={{
            em: (
              <em>
                <Translate id="vehicleSessionInfrastructure.body.smartcarIsAWindow">
                  Smartcar is a window into the car; DIMO is the checkout desk.
                  Samsara tells you what is happening; DIMO controls what is
                  allowed to happen.
                </Translate>
              </em>
            ),
          }}
        >
          {
            'Or, in one line each: {em} Nobody else governs the session. That is the gap DIMO fills.'
          }
        </Translate>
      </p>

      <h2>
        <Translate id="vehicleSessionInfrastructure.body.whatOneSessionBundles">
          What one session bundles
        </Translate>
      </h2>
      <p>
        <Translate id="vehicleSessionInfrastructure.body.aSingleDimoSession">
          A single DIMO session opens, and later revokes, a defined set of
          capabilities. The operator integrates once instead of stitching
          together five vendors:
        </Translate>
      </p>
      <ul>
        <li>
          <Translate
            id="vehicleSessionInfrastructure.body.verifyWhoIsBeing"
            values={{
              strong: (
                <strong>
                  <Translate id="vehicleSessionInfrastructure.body.identity">
                    Identity:
                  </Translate>
                </strong>
              ),
            }}
          >
            {'{strong} verify who is being granted access.'}
          </Translate>
        </li>
        <li>
          <Translate
            id="vehicleSessionInfrastructure.body.grantAndRevokePhysical"
            values={{
              strong: (
                <strong>
                  <Translate id="vehicleSessionInfrastructure.body.digitalKey">
                    Digital key:
                  </Translate>
                </strong>
              ),
            }}
          >
            {'{strong} grant and revoke physical access, with no fob to lose.'}
          </Translate>
        </li>
        <li>
          <Translate
            id="vehicleSessionInfrastructure.body.normalizedTelemetryLimitedTo"
            values={{
              strong: (
                <strong>
                  <Translate id="vehicleSessionInfrastructure.body.dataScope">
                    Data scope:
                  </Translate>
                </strong>
              ),
            }}
          >
            {
              '{strong} normalized telemetry, limited to what the use case needs.'
            }
          </Translate>
        </li>
        <li>
          <Translate
            id="vehicleSessionInfrastructure.body.seatMirrorAndProfile"
            values={{
              strong: (
                <strong>
                  <Translate id="vehicleSessionInfrastructure.body.comfortAndMedia">
                    Comfort and media:
                  </Translate>
                </strong>
              ),
            }}
          >
            {
              "{strong} seat, mirror, and profile personalization, so a rental stops feeling like a stranger's car."
            }
          </Translate>
        </li>
        <li>
          <Translate
            id="vehicleSessionInfrastructure.body.chargingTollsAndFuel"
            values={{
              strong: (
                <strong>
                  <Translate id="vehicleSessionInfrastructure.body.spendCap">
                    Spend cap:
                  </Translate>
                </strong>
              ),
              link: (
                <Link to="/solutions/fleet-spend">
                  <Translate id="vehicleSessionInfrastructure.body.perSessionSpend">
                    per-session spend
                  </Translate>
                </Link>
              ),
            }}
          >
            {
              '{strong} charging, tolls, and fuel bounded at checkout (see {link}).'
            }
          </Translate>
        </li>
        <li>
          <Translate
            id="vehicleSessionInfrastructure.body.whenTheSessionEnds"
            values={{
              strong: (
                <strong>
                  <Translate id="vehicleSessionInfrastructure.body.atomicRevocation">
                    Atomic revocation:
                  </Translate>
                </strong>
              ),
            }}
          >
            {
              '{strong} when the session ends, all of it ends together and seals a verifiable record.'
            }
          </Translate>
        </li>
      </ul>

      <h2>
        <Translate id="vehicleSessionInfrastructure.body.whyNow">
          Why now
        </Translate>
      </h2>
      <p>
        <Translate
          id="vehicleSessionInfrastructure.body.thereAreEveryRental"
          values={{
            strong: (
              <strong>
                <Translate id="vehicleSessionInfrastructure.body.hundredsOfMillionsOf">
                  hundreds of millions of vehicle sessions a year in the US
                </Translate>
              </strong>
            ),
            link: (
              <Link to="/compliance">
                <Translate id="vehicleSessionInfrastructure.body.connectedVehicleDataCompliance">
                  connected vehicle data compliance
                </Translate>
              </Link>
            ),
          }}
        >
          {
            'There are {strong}: every rental, carshare trip, robotaxi ride, and fleet dispatch. Zero of them run on a shared protocol. At the same time, regulators are mandating exactly the properties a session provides: consented, scoped, revocable, auditable access (see {link}). The demand and the rules are arriving together.'
          }
        </Translate>
      </p>

      <h2>
        <Translate id="vehicleSessionInfrastructure.body.whoBuildsOnIt">
          Who builds on it
        </Translate>
      </h2>
      <p>
        <Translate
          id="vehicleSessionInfrastructure.body.rentalAndCarshareOperators"
          values={{
            link: (
              <Link to="/industries/rentals">
                <Translate id="vehicleSessionInfrastructure.body.unmannedMixedFleetOperations">
                  unmanned, mixed-fleet operations
                </Translate>
              </Link>
            ),
            link2: (
              <Link to="/compliance/eu-data-act">
                <Translate id="vehicleSessionInfrastructure.body.euDataAct">
                  EU Data Act
                </Translate>
              </Link>
            ),
            link3: (
              <EnglishLink to="/docs">
                <Translate id="vehicleSessionInfrastructure.body.dimoApisAndSdks">
                  DIMO APIs and SDKs
                </Translate>
              </EnglishLink>
            ),
          }}
        >
          {
            'Rental and carshare operators use it to run {link}; OEM connected-services teams use it to meet the {link2} and offer post-session revenue; and developers build on the {link3}. One session primitive, many callers, including ones the industry has not met yet.'
          }
        </Translate>
      </p>
    </ContentPageLayout>
  );
}
