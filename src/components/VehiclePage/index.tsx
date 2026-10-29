import React, { type ReactNode } from 'react';
import Link from '@docusaurus/Link';
import ContentPageLayout from '../ContentPageLayout';
import type { VehiclePageData } from '../../../plugins/vehicle-pages';
import {
  CONNECTION_LABELS,
  EVENT_LABELS,
  allFaq,
  connectionTypes,
  coverageOf,
  directAnswer,
  events,
  formatYears,
  vehicleName,
  yearSpan,
  yearsWithoutOemCloud,
} from './content';
import { articleJsonLd, faqJsonLd } from './jsonld';
import { buildSnippet } from './snippet';
import styles from './styles.module.css';

const SITE = 'https://dimo.org';

function KeyFacts({ record }: { record: VehiclePageData['record'] }) {
  return (
    <aside className={styles.facts} aria-label="Key facts">
      <dl>
        <dt>Model years</dt>
        <dd>{formatYears(yearSpan(record.coverage))}</dd>
        <dt>Connection types</dt>
        <dd>
          {connectionTypes(record)
            .map(t => CONNECTION_LABELS[t])
            .join(', ')}
        </dd>
        {record.coverage.map((c, i) => (
          <React.Fragment key={i}>
            <dt>Signals via {CONNECTION_LABELS[c.type]}</dt>
            <dd>
              {c.signals.length} ({formatYears(c.years)})
            </dd>
          </React.Fragment>
        ))}
        <dt>Last verified</dt>
        <dd>
          <time dateTime={record.lastVerified}>{record.lastVerified}</time>
        </dd>
      </dl>
    </aside>
  );
}

function SignalTables({ record }: { record: VehiclePageData['record'] }) {
  return (
    <>
      <h2>Signals by connection type</h2>
      {record.coverage.map((c, i) => (
        <section key={i}>
          <h3>
            {CONNECTION_LABELS[c.type]}
            {c.provider ? ` — ${c.provider}` : ''} ({formatYears(c.years)})
          </h3>
          <table>
            <thead>
              <tr>
                <th>Signal</th>
                <th>DIMO name</th>
                <th>Unit</th>
                <th>Typical frequency</th>
              </tr>
            </thead>
            <tbody>
              {c.signals.map(s => (
                <tr key={s.name}>
                  <td>{s.label}</td>
                  <td>
                    <code>{s.name}</code>
                  </td>
                  <td>{s.unit ?? '—'}</td>
                  <td>{s.typicalFrequency ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {c.notes && <p>Known gaps: {c.notes}</p>}
        </section>
      ))}
    </>
  );
}

function NoFactoryConnectivity({
  record,
}: {
  record: VehiclePageData['record'];
}) {
  const gaps = yearsWithoutOemCloud(record);
  if (gaps.length === 0) return null;
  const name = vehicleName(record);
  const device = coverageOf(record, 'dimo_device')[0];
  return (
    <>
      <h2>No factory connectivity?</h2>
      <p>
        {name} model years {gaps.map(formatYears).join(', ')} have no OEM cloud
        connection listed.{' '}
        {device ? (
          <>
            For these years, a DIMO device
            {device.provider ? ` (${device.provider})` : ''} plugs into the
            OBD-II port and streams {device.signals.length} signals once the
            owner connects it and consents to sharing.
          </>
        ) : (
          <>No DIMO device coverage is listed for these years yet.</>
        )}
      </p>
      <p>
        See <Link to="/docs/quickstart">the developer quickstart</Link> for how
        owners connect vehicles and grant access.
      </p>
    </>
  );
}

function Events({ record, eventGuides }: VehiclePageData) {
  const list = events(record);
  if (list.length === 0) return null;
  return (
    <>
      <h2>Events available</h2>
      <ul>
        {list.map(e => (
          <li key={e}>
            {eventGuides[e] ? (
              <Link to={`/resources/${eventGuides[e]}`}>{EVENT_LABELS[e]}</Link>
            ) : (
              EVENT_LABELS[e]
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

export default function VehiclePage({
  data,
}: {
  data: VehiclePageData;
}): ReactNode {
  const { record } = data;
  const name = vehicleName(record);
  const path = `/vehicles/${record.slug}`;
  const h1 = `${name} vehicle data API: signals, model years and connection options`;
  const title = `${name} Vehicle Data API: Signals & Model Years | DIMO`;
  const description = `Which ${name} model years connect to DIMO, the signals available by connection type, and how to query them with the DIMO API.`;
  const faq = allFaq(record);
  const makeSlug = record.slug.split('/')[0];

  return (
    <ContentPageLayout
      title={title}
      description={description}
      canonicalPath={path}
      breadcrumbs={[
        { name: 'Home', url: `${SITE}/` },
        { name: 'Vehicles', url: `${SITE}/vehicles` },
        { name: record.make, url: `${SITE}/vehicles/${makeSlug}` },
        { name: record.model },
      ]}
      schema={[
        articleJsonLd({ record, headline: h1, description, path }),
        faqJsonLd(faq),
      ]}
      heroEyebrow="Vehicle data"
      heroTitle={h1}
      ctaLabel="Get API keys"
      ctaHref="https://console.dimo.org/sign-in"
    >
      <div data-aeo-body>
        <p className={styles.answer}>{directAnswer(record)}</p>
        {record.intro && <p>{record.intro}</p>}
        <KeyFacts record={record} />
        <SignalTables record={record} />
        <NoFactoryConnectivity record={record} />
        <Events {...data} />

        <h2>Build it</h2>
        <p>
          Query the latest {name} signals with the DIMO TypeScript SDK. The
          vehicle owner must first share access with your app through DIMO
          Connect.
        </p>
        {/* Plain <pre>: ContentPageLayout sits outside the theme Layout, so
            @theme/CodeBlock has no color-mode context during SSG. */}
        <pre className={styles.snippet}>
          <code className="language-ts">{buildSnippet(record)}</code>
        </pre>
        <p>
          Full walkthrough:{' '}
          <Link to="/docs/quickstart">Developer quickstart</Link>.
        </p>

        <h2>FAQ</h2>
        {faq.map(({ q, a }) => (
          <section key={q}>
            <h3>{q}</h3>
            <p>{a}</p>
          </section>
        ))}

        <p className={styles.methodology}>
          Source: DIMO vehicle compatibility records.{' '}
          {record.verification === 'tested'
            ? 'Coverage tested on a connected vehicle.'
            : 'Coverage expected from the connection capabilities; not yet tested on this model.'}{' '}
          Last verified{' '}
          <time dateTime={record.lastVerified}>{record.lastVerified}</time>.
        </p>
      </div>
    </ContentPageLayout>
  );
}
