import React, { type ReactNode } from 'react';
import Link from '@docusaurus/Link';
import EnglishLink from '../components/EnglishLink';
import ContentPageLayout from '../components/ContentPageLayout';
import Translate, { translate } from '@docusaurus/Translate';

const SITE = 'https://dimo.org';

const TITLE = translate({
  id: 'connectedCarApi.meta.title',
  message: 'Connected Car API: One Integration for 50+ Brands | DIMO',
});
const DESCRIPTION = translate({
  id: 'connectedCarApi.meta.description',
  message:
    'DIMO is a connected car API with owner consent built in: real-time telemetry, vehicle identity, and commands across 50+ brands through one GraphQL endpoint. Free tier, SDKs for TypeScript, Python, and C#.',
});
const H1 = translate({
  id: 'connectedCarApi.meta.h1',
  message: 'The connected car API with consent built in',
});

const schema = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: H1,
  description: DESCRIPTION,
  url: `${SITE}/connected-car-api`,
  image: `${SITE}/img/dimo-social-card.png`,
  datePublished: '2026-07-06',
  dateModified: '2026-07-06',
  isPartOf: { '@id': `${SITE}/#website` },
  author: {
    '@type': 'Organization',
    '@id': `${SITE}/#organization`,
    name: 'DIMO',
  },
  publisher: {
    '@type': 'Organization',
    '@id': `${SITE}/#organization`,
    name: 'DIMO',
  },
};

const EXAMPLE_QUERY = `query {
  signalsLatest(tokenId: 12345) {
    speed { value timestamp }
    powertrainTractionBatteryStateOfChargeCurrent { value }
    currentLocationLatitude { value }
    currentLocationLongitude { value }
  }
}`;

export default function ConnectedCarApi(): ReactNode {
  return (
    <ContentPageLayout
      title={TITLE}
      description={DESCRIPTION}
      breadcrumbs={[
        {
          name: translate({
            id: 'connectedCarApi.body.home.name',
            message: 'Home',
          }),
          url: `${SITE}/`,
        },
        {
          name: translate({
            id: 'connectedCarApi.body.connectedCarApi.name',
            message: 'Connected Car API',
          }),
        },
      ]}
      schema={schema}
      heroEyebrow={translate({
        id: 'connectedCarApi.body.product',
        message: 'Product',
      })}
      heroTitle={H1}
      heroSubtitle={translate({
        id: 'connectedCarApi.body.readTelemetryVerifyIdentity',
        message:
          'Read telemetry, verify identity, and issue commands across 50+ vehicle brands through one permissioned API, with owner consent enforced by the platform instead of your legal team.',
      })}
      ctaLabel={translate({
        id: 'connectedCarApi.body.getApiKeys',
        message: 'Get API keys',
      })}
      ctaHref="https://console.dimo.org/sign-in"
    >
      <p>
        <Translate id="connectedCarApi.body.aConnectedCarApi">
          A connected car API lets your software talk to vehicles: read the
          battery level, find the car, check the odometer, unlock the doors.
          Every automaker exposes some of this, but each one behind its own
          contracts, auth flows, and data formats. DIMO is not another
          brand-by-brand connectivity contract. It is the toolkit for building
          vehicle access: data flows in through whatever connectivity you
          already have or choose (a direct OEM oracle, a provider like Smartcar,
          Flespi, or Volteras, or your own telematics hardware), and DIMO turns
          it into stored, consent-governed, queryable vehicle data behind one
          GraphQL contract.
        </Translate>
      </p>

      <h2>
        <Translate id="connectedCarApi.body.whatYouCanDo">
          What you can do with it
        </Translate>
      </h2>
      <table>
        <thead>
          <tr>
            <th>
              <Translate id="connectedCarApi.body.capability">
                Capability
              </Translate>
            </th>
            <th>
              <Translate id="connectedCarApi.body.examples">Examples</Translate>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Translate id="connectedCarApi.body.realTimeTelemetry">
                Real-time telemetry
              </Translate>
            </td>
            <td>
              <Translate id="connectedCarApi.body.locationSpeedBatteryState">
                Location, speed, battery state of charge, fuel level, odometer,
                tire pressure, diagnostic trouble codes
              </Translate>
            </td>
          </tr>
          <tr>
            <td>
              <Translate id="connectedCarApi.body.vehicleIdentity">
                Vehicle identity
              </Translate>
            </td>
            <td>
              <Translate id="connectedCarApi.body.vinBackedDigitalIdMakeModelYear">
                VIN-backed digital ID, make/model/year, ownership proof
              </Translate>
            </td>
          </tr>
          <tr>
            <td>
              <Translate id="connectedCarApi.body.commands">Commands</Translate>
            </td>
            <td>
              <Translate id="connectedCarApi.body.lockAndUnlockDoors">
                Lock and unlock doors, start and stop EV charging
              </Translate>
            </td>
          </tr>
          <tr>
            <td>
              <Translate id="connectedCarApi.body.consentManagement">
                Consent management
              </Translate>
            </td>
            <td>
              <Translate id="connectedCarApi.body.ownerGrantedScopedRevocablePermissions">
                Owner-granted, scoped, revocable permissions (SACD) with a
                signed audit trail
              </Translate>
            </td>
          </tr>
          <tr>
            <td>
              <Translate id="connectedCarApi.body.events">Events</Translate>
            </td>
            <td>
              <Translate id="connectedCarApi.body.webhooksForStateChanges">
                Webhooks for state changes via Vehicle Triggers
              </Translate>
            </td>
          </tr>
          <tr>
            <td>
              <Translate id="connectedCarApi.body.ingestSources">
                Ingest sources
              </Translate>
            </td>
            <td>
              <Translate id="connectedCarApi.body.directOemOraclesProviders">
                Direct OEM oracles, providers like Smartcar, Flespi, and
                Volteras, or your own hardware (BYOD)
              </Translate>
            </td>
          </tr>
        </tbody>
      </table>

      <h2>
        <Translate id="connectedCarApi.body.connectivityFromAnywhereOne">
          Connectivity from anywhere, one data layer
        </Translate>
      </h2>
      <p>
        <Translate id="connectedCarApi.body.connectivityProvidersSuchAs">
          Connectivity providers such as Smartcar, Flespi, and Volteras are
          pass-through APIs: they convert an OEM's format and hand the data to
          you, and what happens next is your problem. They do not store the
          data, they have no sharing or consent model, and you cannot self-host
          them. DIMO is the layer those feeds flow into. Signals from any ingest
          source land in one system of record with identity, owner consent, and
          sharing built in, and the core is open source, so you can run it
          yourself. You can keep an existing Smartcar or Flespi integration and
          put DIMO on top of it. This is the access layer that powers the
          session-based economy: identity, data, and consent packaged so a
          vehicle can be rented, shared, or serviced as one auditable session.
        </Translate>
      </p>

      <h2>
        <Translate id="connectedCarApi.body.oneQueryAnySource">
          One query, any source
        </Translate>
      </h2>
      <p>
        <Translate id="connectedCarApi.body.vehiclesAcross50Brands">
          Vehicles across 50+ brands are already on the DIMO network, connected
          by drivers through OEM oracles, partner providers, and DIMO hardware.
          However a vehicle arrives, it answers the same GraphQL query. No
          per-manufacturer parsing, no unit conversion, no separate auth flows:
        </Translate>
      </p>
      <pre>
        <code>{EXAMPLE_QUERY}</code>
      </pre>
      <p>
        <Translate
          id="connectedCarApi.body.officialSdksCoverAnd"
          values={{
            link: (
              <EnglishLink to="/docs/build/building-with-tools/server-sdk">
                <Translate id="connectedCarApi.body.typeScriptPythonAndC">
                  TypeScript, Python, and C#
                </Translate>
              </EnglishLink>
            ),
          }}
        >
          {
            'Official SDKs cover {link}, and a React SDK handles the user-facing consent flow. Most developers make their first successful API call within five minutes of creating a key.'
          }
        </Translate>
      </p>

      <h2>
        <Translate id="connectedCarApi.body.consentIsTheHard">
          Consent is the hard part, so it's built in
        </Translate>
      </h2>
      <p>
        <Translate
          id="connectedCarApi.body.theExpensiveFailureMode"
          values={{
            link: (
              <Link to="/compliance/eu-data-act">
                <Translate id="connectedCarApi.body.euDataAct">
                  EU Data Act
                </Translate>
              </Link>
            ),
          }}
        >
          {
            "The expensive failure mode in connected car products is not missing data; it's access governance. Who authorized this read? Can the owner revoke it? Can you prove both to a regulator? DIMO answers these at the protocol level: vehicle owners grant scoped permissions through the SACD consent model, revoke them at any time, and every grant is recorded on a signed, verifiable audit trail. GDPR and {link} requirements are satisfied by the architecture instead of by paperwork."
          }
        </Translate>
      </p>

      <h2>
        <Translate id="connectedCarApi.body.whatPeopleBuild">
          What people build
        </Translate>
      </h2>
      <p>
        <Translate
          id="connectedCarApi.body.evChargingAppsThat"
          values={{
            link: (
              <Link to="/industries/rentals">
                <Translate id="connectedCarApi.body.rentalAndCarshareOperations">
                  Rental and carshare operations
                </Translate>
              </Link>
            ),
          }}
        >
          {
            "EV charging apps that schedule around real state-of-charge instead of user guesses. Fleet tools that track vehicles across mixed-brand inventories without three telematics vendors. {link} where a booking becomes a session: digital key, scoped data, spend cap, and clean revocation at return. Usage-based insurance rated on actual driving. AI agents that check your car's battery and precondition the cabin before you ask."
          }
        </Translate>
      </p>

      <h2>
        <Translate id="connectedCarApi.body.pricing">Pricing</Translate>
      </h2>
      <p>
        <Translate
          id="connectedCarApi.body.theHobbyistTierIs"
          values={{
            link: (
              <Link to="/pricing">
                <Translate id="connectedCarApi.body.fullPricingDetails">
                  Full pricing details
                </Translate>
              </Link>
            ),
          }}
        >
          {
            'The Hobbyist tier is free: all APIs, one AI agent, and vehicles at $1.25/month each. You can build against your own car before spending anything. Core is $349/month with 100 vehicles included for production apps. {link}.'
          }
        </Translate>
      </p>

      <h2>
        <Translate id="connectedCarApi.body.whereToGoNext">
          Where to go next
        </Translate>
      </h2>
      <p>
        <Translate
          id="connectedCarApi.body.ifYouAreComparing"
          values={{
            link: (
              <Link to="/compare/smartcar-alternative">
                <Translate id="connectedCarApi.body.dimoVsSmartcar">
                  DIMO vs Smartcar
                </Translate>
              </Link>
            ),
            link2: (
              <Link to="/vehicle-data-api">
                <Translate id="connectedCarApi.body.vehicleDataApiOverview">
                  vehicle data API overview
                </Translate>
              </Link>
            ),
            link3: (
              <EnglishLink to="/docs">
                <Translate id="connectedCarApi.body.developerDocs">
                  developer docs
                </Translate>
              </EnglishLink>
            ),
            link4: (
              <Link to="https://console.dimo.org/sign-in">
                <Translate id="connectedCarApi.body.consoleDimoOrg">
                  console.dimo.org
                </Translate>
              </Link>
            ),
          }}
        >
          {
            'If you are comparing providers, the {link} breakdown covers the differences in depth. If you want raw signal specs, see the {link2} or jump straight into the {link3}. Everything starts with a free account at {link4}.'
          }
        </Translate>
      </p>
    </ContentPageLayout>
  );
}
