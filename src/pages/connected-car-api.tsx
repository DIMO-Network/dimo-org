import React, { type ReactNode } from 'react';
import Link from '@docusaurus/Link';
import ContentPageLayout from '../components/ContentPageLayout';

const SITE = 'https://dimo.org';

const TITLE = 'Connected Car API: One Integration for 50+ Brands | DIMO';
const DESCRIPTION =
  'DIMO is a connected car API with owner consent built in: real-time telemetry, vehicle identity, and commands across 50+ brands through one GraphQL endpoint. Free tier, SDKs for TypeScript, Python, and C#.';
const H1 = 'The connected car API with consent built in';

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
      canonicalPath="/connected-car-api"
      breadcrumbs={[
        { name: 'Home', url: `${SITE}/` },
        { name: 'Connected Car API' },
      ]}
      schema={schema}
      heroEyebrow="Product"
      heroTitle={H1}
      heroSubtitle="Read telemetry, verify identity, and issue commands across 50+ vehicle brands through one permissioned API, with owner consent enforced by the platform instead of your legal team."
      ctaLabel="Get API keys"
      ctaHref="https://console.dimo.org/sign-in"
    >
      <p>
        A connected car API lets your software talk to vehicles: read the
        battery level, find the car, check the odometer, unlock the doors. Every
        automaker exposes some of this, but each one behind its own contracts,
        auth flows, and data formats. DIMO is not another brand-by-brand
        connectivity contract. It is the toolkit for building vehicle access:
        data flows in through whatever connectivity you already have or choose
        (a direct OEM oracle, a provider like Smartcar, Flespi, or Volteras, or
        your own telematics hardware), and DIMO turns it into stored,
        consent-governed, queryable vehicle data behind one GraphQL contract.
      </p>

      <h2>What you can do with it</h2>
      <table>
        <thead>
          <tr>
            <th>Capability</th>
            <th>Examples</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Real-time telemetry</td>
            <td>
              Location, speed, battery state of charge, fuel level, odometer,
              tire pressure, diagnostic trouble codes
            </td>
          </tr>
          <tr>
            <td>Vehicle identity</td>
            <td>VIN-backed digital ID, make/model/year, ownership proof</td>
          </tr>
          <tr>
            <td>Commands</td>
            <td>Lock and unlock doors, start and stop EV charging</td>
          </tr>
          <tr>
            <td>Consent management</td>
            <td>
              Owner-granted, scoped, revocable permissions (SACD) with a signed
              audit trail
            </td>
          </tr>
          <tr>
            <td>Events</td>
            <td>Webhooks for state changes via Vehicle Triggers</td>
          </tr>
          <tr>
            <td>Ingest sources</td>
            <td>
              Direct OEM oracles, providers like Smartcar, Flespi, and Volteras,
              or your own hardware (BYOD)
            </td>
          </tr>
        </tbody>
      </table>

      <h2>Connectivity from anywhere, one data layer</h2>
      <p>
        Connectivity providers such as Smartcar, Flespi, and Volteras are
        pass-through APIs: they convert an OEM&apos;s format and hand the data
        to you, and what happens next is your problem. They do not store the
        data, they have no sharing or consent model, and you cannot self-host
        them. DIMO is the layer those feeds flow into. Signals from any ingest
        source land in one system of record with identity, owner consent, and
        sharing built in, and the core is open source, so you can run it
        yourself. You can keep an existing Smartcar or Flespi integration and
        put DIMO on top of it. This is the access layer that powers the
        session-based economy: identity, data, and consent packaged so a vehicle
        can be rented, shared, or serviced as one auditable session.
      </p>

      <h2>One query, any source</h2>
      <p>
        Vehicles across 50+ brands are already on the DIMO network, connected by
        drivers through OEM oracles, partner providers, and DIMO hardware.
        However a vehicle arrives, it answers the same GraphQL query. No
        per-manufacturer parsing, no unit conversion, no separate auth flows:
      </p>
      <pre>
        <code>{EXAMPLE_QUERY}</code>
      </pre>
      <p>
        Official SDKs cover{' '}
        <Link to="/docs/build/building-with-tools/server-sdk">
          TypeScript, Python, and C#
        </Link>
        , and a React SDK handles the user-facing consent flow. Most developers
        make their first successful API call within five minutes of creating a
        key.
      </p>

      <h2>Consent is the hard part, so it&apos;s built in</h2>
      <p>
        The expensive failure mode in connected car products is not missing
        data; it&apos;s access governance. Who authorized this read? Can the
        owner revoke it? Can you prove both to a regulator? DIMO answers these
        at the protocol level: vehicle owners grant scoped permissions through
        the SACD consent model, revoke them at any time, and every grant is
        recorded on a signed, verifiable audit trail. GDPR and{' '}
        <Link to="/compliance/eu-data-act">EU Data Act</Link> requirements are
        satisfied by the architecture instead of by paperwork.
      </p>

      <h2>What people build</h2>
      <p>
        EV charging apps that schedule around real state-of-charge instead of
        user guesses. Fleet tools that track vehicles across mixed-brand
        inventories without three telematics vendors.{' '}
        <Link to="/industries/rentals">Rental and carshare operations</Link>{' '}
        where a booking becomes a session: digital key, scoped data, spend cap,
        and clean revocation at return. Usage-based insurance rated on actual
        driving. AI agents that check your car&apos;s battery and precondition
        the cabin before you ask.
      </p>

      <h2>Pricing</h2>
      <p>
        The Hobbyist tier is free: all APIs, one AI agent, and vehicles at
        $1.25/month each. You can build against your own car before spending
        anything. Core is $349/month with 100 vehicles included for production
        apps. <Link to="/pricing">Full pricing details</Link>.
      </p>

      <h2>Where to go next</h2>
      <p>
        If you are comparing providers, the{' '}
        <Link to="/compare/smartcar-alternative">DIMO vs Smartcar</Link>{' '}
        breakdown covers the differences in depth. If you want raw signal specs,
        see the <Link to="/vehicle-data-api">vehicle data API overview</Link> or
        jump straight into the <Link to="/docs">developer docs</Link>.
        Everything starts with a free account at{' '}
        <Link to="https://console.dimo.org/sign-in">console.dimo.org</Link>.
      </p>
    </ContentPageLayout>
  );
}
