import React, { type ReactNode } from 'react';
import Link from '@docusaurus/Link';
import EnglishLink from '../components/EnglishLink';
import ContentPageLayout from '../components/ContentPageLayout';
import Translate, { translate } from '@docusaurus/Translate';

const SITE = 'https://dimo.org';

const TITLE = translate({
  id: 'vehicleDataApi.meta.title',
  message: 'Vehicle Data API: Real-Time Telemetry, 50+ Brands | DIMO',
});
const DESCRIPTION = translate({
  id: 'vehicleDataApi.meta.description',
  message:
    'Query real-time and historical vehicle data (location, battery, fuel, odometer, tire pressure, diagnostics) across 50+ brands with one GraphQL API. Owner-consented, GDPR-ready, free tier.',
});
const H1 = translate({
  id: 'vehicleDataApi.meta.h1',
  message: 'Vehicle data API: every signal, one endpoint',
});

const schema = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: H1,
  description: DESCRIPTION,
  url: `${SITE}/vehicle-data-api`,
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

const HISTORY_QUERY = `query {
  signals(
    tokenId: 12345
    from: "2026-07-01T00:00:00Z"
    to: "2026-07-06T00:00:00Z"
    interval: "1h"
  ) {
    timestamp
    speed(agg: MAX)
    powertrainRange(agg: MIN)
    obdBarometricPressure(agg: AVG)
  }
}`;

export default function VehicleDataApi(): ReactNode {
  return (
    <ContentPageLayout
      title={TITLE}
      description={DESCRIPTION}
      breadcrumbs={[
        {
          name: translate({
            id: 'vehicleDataApi.body.home.name',
            message: 'Home',
          }),
          url: `${SITE}/`,
        },
        {
          name: translate({
            id: 'vehicleDataApi.body.vehicleDataApi.name',
            message: 'Vehicle Data API',
          }),
        },
      ]}
      schema={schema}
      heroEyebrow={translate({
        id: 'vehicleDataApi.body.product',
        message: 'Product',
      })}
      heroTitle={H1}
      heroSubtitle={translate({
        id: 'vehicleDataApi.body.normalizedRealTimeAndHistorical',
        message:
          'Normalized, real-time and historical vehicle telemetry across 50+ brands, delivered over GraphQL with owner consent enforced at the protocol level. First API call in about five minutes.',
      })}
      ctaLabel={translate({
        id: 'vehicleDataApi.body.getApiKeys',
        message: 'Get API keys',
      })}
      ctaHref="https://console.dimo.org/sign-in"
    >
      <p>
        <Translate id="vehicleDataApi.body.vehicleDataIsFragmented">
          Vehicle data is fragmented on purpose: every manufacturer has its own
          cloud, schema, units, and gatekeeping. A vehicle data API earns its
          keep by normalizing that mess into one contract your code can trust.
          DIMO does the normalization once, network-wide. Signals stream in
          through the connectivity source you choose: a direct OEM oracle, a
          pass-through provider like Smartcar, Flespi, or Volteras, or DIMO
          hardware. Whatever the source, you query everything through a single
          GraphQL endpoint with consistent names and units.
        </Translate>
      </p>
      <p>
        <Translate id="vehicleDataApi.body.oneScopingNoteIf">
          One scoping note: if you need static reference data (VIN decoding,
          make/model/trim specs, market values), that is a lookup database, and
          this is not that. This API is live and historical sensor data from
          vehicles on the road, with owner consent attached. It is the data
          layer DIMO provides for the session-based economy.
        </Translate>
      </p>

      <h2>
        <Translate id="vehicleDataApi.body.signalsYouCanQuery">
          Signals you can query
        </Translate>
      </h2>
      <table>
        <thead>
          <tr>
            <th>
              <Translate id="vehicleDataApi.body.category">Category</Translate>
            </th>
            <th>
              <Translate id="vehicleDataApi.body.signals">Signals</Translate>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Translate id="vehicleDataApi.body.locationMotion">
                Location & motion
              </Translate>
            </td>
            <td>
              <Translate id="vehicleDataApi.body.gpsCoordinatesSpeedHeading">
                GPS coordinates, speed, heading, altitude
              </Translate>
            </td>
          </tr>
          <tr>
            <td>
              <Translate id="vehicleDataApi.body.energy">Energy</Translate>
            </td>
            <td>
              <Translate id="vehicleDataApi.body.batteryStateOfCharge">
                Battery state of charge, charging status, range, fuel level
              </Translate>
            </td>
          </tr>
          <tr>
            <td>
              <Translate id="vehicleDataApi.body.usage">Usage</Translate>
            </td>
            <td>
              <Translate id="vehicleDataApi.body.odometerIgnitionStateTrip">
                Odometer, ignition state, trip data
              </Translate>
            </td>
          </tr>
          <tr>
            <td>
              <Translate id="vehicleDataApi.body.health">Health</Translate>
            </td>
            <td>
              <Translate id="vehicleDataApi.body.tirePressurePerWheel">
                Tire pressure (per wheel), engine temperature, oil life,
                diagnostic trouble codes (DTCs)
              </Translate>
            </td>
          </tr>
          <tr>
            <td>
              <Translate id="vehicleDataApi.body.state">State</Translate>
            </td>
            <td>
              <Translate id="vehicleDataApi.body.doorLockStatusWindow">
                Door lock status, window position, hood/trunk state
              </Translate>
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        <Translate
          id="vehicleDataApi.body.signalNamesFollowThe"
          values={{
            code: <code> speed</code>,
            link: (
              <EnglishLink to="/docs/api-references/telemetry-api/introduction">
                <Translate id="vehicleDataApi.body.telemetryApiReference">
                  Telemetry API reference
                </Translate>
              </EnglishLink>
            ),
          }}
        >
          {
            'Signal names follow the COVESA Vehicle Signal Specification, so{code} means the same thing for a Tesla as for a Ford. Availability varies by make and connection type; the {link} lists the full catalog. Update frequency ranges from 30 seconds through OEM cloud connections to sub-second with the optional DIMO LTE R1 adapter.'
          }
        </Translate>
      </p>

      <h2>
        <Translate id="vehicleDataApi.body.storageWithSharingNot">
          Storage with sharing, not pass-through
        </Translate>
      </h2>
      <p>
        <Translate id="vehicleDataApi.body.thisIsTheDifference">
          This is the difference between DIMO and connectivity providers.
          Smartcar, Flespi, and Volteras convert an OEM feed and pass it through
          to you; they are not a system of record, they have no consent or
          sharing model, and you cannot self-host them. DIMO ingests from those
          same providers (or from OEM oracles and hardware) and stores the
          signals as normalized time-series that vehicle owners can share,
          scope, and revoke. The open-source core means the whole stack can run
          on your own infrastructure.
        </Translate>
      </p>

      <h2>
        <Translate id="vehicleDataApi.body.historicalDataWithAggregation">
          Historical data with aggregation
        </Translate>
      </h2>
      <p>
        <Translate id="vehicleDataApi.body.becauseDimoStoresThe">
          Because DIMO stores the data, the same endpoint serves time-series
          history with server-side aggregation, so a week of driving becomes one
          query instead of a data pipeline:
        </Translate>
      </p>
      <pre>
        <code>{HISTORY_QUERY}</code>
      </pre>

      <h2>
        <Translate id="vehicleDataApi.body.consentAndComplianceAre">
          Consent and compliance are part of the API
        </Translate>
      </h2>
      <p>
        <Translate
          id="vehicleDataApi.body.everyQueryRunsAgainst"
          values={{
            link: (
              <Link to="/compliance/eu-data-act">
                <Translate id="vehicleDataApi.body.euDataAct">
                  EU Data Act
                </Translate>
              </Link>
            ),
          }}
        >
          {
            "Every query runs against a permission the vehicle owner explicitly granted. Grants are scoped (you see only the signal groups the user shared), revocable at any time, and recorded on a signed audit trail. That architecture is what makes GDPR, {link}, and CCPA compliance a property of the platform rather than a project for your team. If you have watched the FTC's recent actions on vehicle data brokers, this is the part that matters."
          }
        </Translate>
      </p>

      <h2>
        <Translate id="vehicleDataApi.body.gettingToAFirst">
          Getting to a first API call
        </Translate>
      </h2>
      <p>
        <Translate
          id="vehicleDataApi.body.createAFreeAccount"
          values={{
            link: (
              <Link to="https://console.dimo.org/sign-in">
                <Translate id="vehicleDataApi.body.consoleDimoOrg">
                  console.dimo.org
                </Translate>
              </Link>
            ),
            link2: (
              <EnglishLink to="/docs/build/building-with-tools/server-sdk">
                <Translate id="vehicleDataApi.body.typeScriptPythonAndC">
                  TypeScript, Python, and C#
                </Translate>
              </EnglishLink>
            ),
            link3: (
              <EnglishLink to="/blog/dimo-vehicle-simulator">
                <Translate id="vehicleDataApi.body.vehicleSimulator">
                  vehicle simulator
                </Translate>
              </EnglishLink>
            ),
          }}
        >
          {
            'Create a free account at {link}, generate a license and API keys, and query. SDKs for {link2} handle auth and token exchange. No car handy? The {link3} generates realistic telemetry so you can build before connecting real hardware.'
          }
        </Translate>
      </p>

      <h2>
        <Translate id="vehicleDataApi.body.pricing">Pricing</Translate>
      </h2>
      <p>
        <Translate
          id="vehicleDataApi.body.hobbyistIsFreeAll"
          values={{
            link: (
              <Link to="/pricing">
                <Translate id="vehicleDataApi.body.fullPricing">
                  Full pricing
                </Translate>
              </Link>
            ),
          }}
        >
          {
            'Hobbyist is free: all APIs, one AI agent, vehicles at $1.25/month. Core is $349/month with 100 vehicles included, higher rate limits, and data storage. Enterprise gets custom limits and on-premise options. {link}.'
          }
        </Translate>
      </p>

      <h2>
        <Translate id="vehicleDataApi.body.relatedReading">
          Related reading
        </Translate>
      </h2>
      <p>
        <Translate
          id="vehicleDataApi.body.forTheBroaderPlatform"
          values={{
            link: (
              <Link to="/connected-car-api">
                <Translate id="vehicleDataApi.body.connectedCarApiOverview">
                  connected car API overview
                </Translate>
              </Link>
            ),
            link2: (
              <Link to="/compare/smartcar-alternative">
                <Translate id="vehicleDataApi.body.dimoVsSmartcar">
                  DIMO vs Smartcar
                </Translate>
              </Link>
            ),
            link3: (
              <EnglishLink to="/docs">
                <Translate id="vehicleDataApi.body.developerDocs">
                  developer docs
                </Translate>
              </EnglishLink>
            ),
          }}
        >
          {
            'For the broader platform picture (commands, identity, and consent on top of data), see the {link}. For a head-to-head with other providers, read {link2}. The {link3} cover everything else.'
          }
        </Translate>
      </p>
    </ContentPageLayout>
  );
}
