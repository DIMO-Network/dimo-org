import React, { type ReactNode } from 'react';
import Link from '@docusaurus/Link';
import ContentPageLayout from '../components/ContentPageLayout';

const SITE = 'https://dimo.org';

const TITLE = 'Vehicle Data API: Real-Time Telemetry, 50+ Brands | DIMO';
const DESCRIPTION =
  'Query real-time and historical vehicle data (location, battery, fuel, odometer, tire pressure, diagnostics) across 50+ brands with one GraphQL API. Owner-consented, GDPR-ready, free tier.';
const H1 = 'Vehicle data API: every signal, one endpoint';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: H1,
  description: DESCRIPTION,
  url: `${SITE}/vehicle-data-api`,
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
      canonicalPath="/vehicle-data-api"
      breadcrumbs={[
        { name: 'Home', url: `${SITE}/` },
        { name: 'Vehicle Data API' },
      ]}
      schema={schema}
      heroEyebrow="Product"
      heroTitle={H1}
      heroSubtitle="Normalized, real-time and historical vehicle telemetry across 50+ brands, delivered over GraphQL with owner consent enforced at the protocol level. First API call in about five minutes."
      ctaLabel="Get API keys"
      ctaHref="https://console.dimo.org/sign-in"
    >
      <p>
        Vehicle data is fragmented on purpose: every manufacturer has its own
        cloud, schema, units, and gatekeeping. A vehicle data API earns its keep
        by normalizing that mess into one contract your code can trust. DIMO
        does the normalization once, network-wide: drivers connect their cars,
        signals stream in from OEM clouds and optional hardware, and you query
        everything through a single GraphQL endpoint with consistent names and
        units.
      </p>

      <h2>Signals you can query</h2>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Signals</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Location & motion</td>
            <td>GPS coordinates, speed, heading, altitude</td>
          </tr>
          <tr>
            <td>Energy</td>
            <td>Battery state of charge, charging status, range, fuel level</td>
          </tr>
          <tr>
            <td>Usage</td>
            <td>Odometer, ignition state, trip data</td>
          </tr>
          <tr>
            <td>Health</td>
            <td>
              Tire pressure (per wheel), engine temperature, oil life,
              diagnostic trouble codes (DTCs)
            </td>
          </tr>
          <tr>
            <td>State</td>
            <td>Door lock status, window position, hood/trunk state</td>
          </tr>
        </tbody>
      </table>
      <p>
        Signal names follow the COVESA Vehicle Signal Specification, so
        <code> speed</code> means the same thing for a Tesla as for a Ford.
        Availability varies by make and connection type; the{' '}
        <Link to="/docs/api-references/telemetry-api/introduction">
          Telemetry API reference
        </Link>{' '}
        lists the full catalog. Update frequency ranges from 30 seconds through
        OEM cloud connections to sub-second with the optional DIMO LTE R1
        adapter.
      </p>

      <h2>Historical data with aggregation</h2>
      <p>
        The same endpoint serves time-series history with server-side
        aggregation, so a week of driving becomes one query instead of a data
        pipeline:
      </p>
      <pre>
        <code>{HISTORY_QUERY}</code>
      </pre>

      <h2>Consent and compliance are part of the API</h2>
      <p>
        Every query runs against a permission the vehicle owner explicitly
        granted. Grants are scoped (you see only the signal groups the user
        shared), revocable at any time, and recorded on a signed audit trail.
        That architecture is what makes GDPR,{' '}
        <Link to="/compliance/eu-data-act">EU Data Act</Link>, and CCPA
        compliance a property of the platform rather than a project for your
        team. If you have watched the FTC&apos;s recent actions on vehicle data
        brokers, this is the part that matters.
      </p>

      <h2>Getting to a first API call</h2>
      <p>
        Create a free account at{' '}
        <Link to="https://console.dimo.org/sign-in">console.dimo.org</Link>,
        generate a license and API keys, and query. SDKs for{' '}
        <Link to="/docs/build/building-with-tools/server-sdk">
          TypeScript, Python, and C#
        </Link>{' '}
        handle auth and token exchange. No car handy? The{' '}
        <Link to="/blog/dimo-vehicle-simulator">vehicle simulator</Link>{' '}
        generates realistic telemetry so you can build before connecting real
        hardware.
      </p>

      <h2>Pricing</h2>
      <p>
        Hobbyist is free: all APIs, one AI agent, vehicles at $1.25/month. Core
        is $349/month with 100 vehicles included, higher rate limits, and data
        storage. Enterprise gets custom limits and on-premise options.{' '}
        <Link to="/pricing">Full pricing</Link>.
      </p>

      <h2>Related reading</h2>
      <p>
        For the broader platform picture (commands, identity, and consent on top
        of data), see the{' '}
        <Link to="/connected-car-api">connected car API overview</Link>. For a
        head-to-head with other providers, read{' '}
        <Link to="/compare/smartcar-alternative">DIMO vs Smartcar</Link>. The{' '}
        <Link to="/docs">developer docs</Link> cover everything else.
      </p>
    </ContentPageLayout>
  );
}
