import React, { type ReactNode } from 'react';
import Link from '@docusaurus/Link';
import { Highlight, themes } from 'prism-react-renderer';
import ContentPageLayout from '../ContentPageLayout';
import type { VehiclePageData } from '../../../plugins/vehicle-pages';
import {
  CONNECTION_LABELS,
  EVENT_LABELS,
  allFaq,
  connectionTypes,
  directAnswer,
  displayCoverage,
  eventConnections,
  events,
  formatYears,
  coverageYears,
  sinceYear,
  vehicleName,
  yearSpan,
  yearsWithoutOemCloud,
} from './content';
import { articleJsonLd, faqJsonLd } from './jsonld';
import { buildSnippet } from './snippet';
import styles from './styles.module.css';
import VehicleList from './VehicleList';

const SITE = 'https://dimo.org';

function KeyFacts({ record }: { record: VehiclePageData['record'] }) {
  const span = yearSpan(record.coverage);
  return (
    <aside className={styles.facts} aria-label="Key facts">
      <dl>
        <dt>Model years</dt>
        <dd>{sinceYear(span.from)}</dd>
        <dt>Connection types</dt>
        <dd>
          {connectionTypes(record)
            .map(t => CONNECTION_LABELS[t])
            .join(', ')}
        </dd>
        {record.coverage.map((c, i) => (
          <React.Fragment key={i}>
            <dt>Signals via {c.provider ?? CONNECTION_LABELS[c.type]}</dt>
            <dd>
              {c.signals.length} ({coverageYears(c, span.to)})
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
  const latest = yearSpan(record.coverage).to;
  return (
    <>
      <h2>Signals by connection type</h2>
      {displayCoverage(record).map(({ coverage: c, collapsed }, i) => {
        // Records generated from network data have no frequency, so the
        // column only appears when some signal in the table has one.
        const hasFrequency = c.signals.some(s => s.typicalFrequency);
        const heading = `${CONNECTION_LABELS[c.type]}${c.provider ? ` — ${c.provider}` : ''} (${coverageYears(c, latest)})`;
        const table = (
          <table>
            <thead>
              <tr>
                <th>Signal</th>
                <th>DIMO name</th>
                <th>Unit</th>
                {hasFrequency && <th>Typical frequency</th>}
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
                  {hasFrequency && <td>{s.typicalFrequency ?? '—'}</td>}
                </tr>
              ))}
            </tbody>
          </table>
        );
        return (
          <section key={i}>
            {collapsed ? (
              <details className={styles.collapsible}>
                <summary>
                  <h3>{heading}</h3>
                </summary>
                {table}
              </details>
            ) : (
              <>
                <h3>{heading}</h3>
                {table}
              </>
            )}
            {c.notes && <p>Known gaps: {c.notes}</p>}
          </section>
        );
      })}
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
  const span = yearSpan(record.coverage);
  const devices = displayCoverage(record)
    .map(d => d.coverage)
    .filter(c => c.type === 'dimo_device');
  const device = devices[0];
  const providers = devices.flatMap(d => (d.provider ? [d.provider] : []));
  return (
    <>
      <h2>No factory connectivity?</h2>
      <p>
        {name} model years{' '}
        {gaps
          .map(g => (g.to === span.to ? sinceYear(g.from) : formatYears(g)))
          .join(', ')}{' '}
        have no OEM cloud connection listed.{' '}
        {device ? (
          <>
            For these years, a DIMO device
            {providers.length ? ` (${providers.join(' or ')})` : ''} plugs into
            the OBD-II port and streams vehicle signals once the owner connects
            it and consents to sharing.
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
            {eventConnections(record, e).length > 0 &&
              ` (${eventConnections(record, e)
                .map(t => CONNECTION_LABELS[t])
                .join(', ')})`}
          </li>
        ))}
      </ul>
    </>
  );
}

// After the page content, next to Related: a list of links, not prose.
function CarGuides({ record, carGuides }: VehiclePageData) {
  if (carGuides.length === 0) return null;
  return (
    <nav aria-label="Guides for this vehicle">
      <h2>{vehicleName(record)} guides</h2>
      <ul>
        {carGuides.map(g => (
          <li key={g.slug}>
            <Link to={`/resources/${g.slug}`}>{g.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// Outside [data-aeo-body]: shared link lists would make pages look alike to
// the duplicate check.
function Related({ record, related }: VehiclePageData) {
  const makeSlug = record.slug.split('/')[0];
  if (!related.sameMake.length && !related.similar.length) return null;
  return (
    <nav aria-label="Related vehicles">
      <h2>Related vehicles</h2>
      {related.sameMake.length > 0 && (
        <>
          <h3>More {record.make} vehicles</h3>
          <VehicleList vehicles={related.sameMake} />
        </>
      )}
      {related.similar.length > 0 && (
        <>
          <h3>Similar vehicles</h3>
          <VehicleList vehicles={related.similar} />
        </>
      )}
      <p>
        <Link to={`/vehicles/${makeSlug}`}>All {record.make} vehicles</Link>
        {' · '}
        <Link to="/vehicles">Browse all vehicles</Link>
      </p>
    </nav>
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
      wide
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
        {/* prism-react-renderer directly: ContentPageLayout sits outside the
            theme Layout, so @theme/CodeBlock has no color-mode context during
            SSG. Dracula matches the site's dark code theme. */}
        <Highlight
          theme={themes.dracula}
          code={buildSnippet(record).trimEnd()}
          language="tsx"
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className={`${styles.snippet} ${className}`} style={style}>
              <code>
                {tokens.map((line, l) => (
                  <div key={l} {...getLineProps({ line })}>
                    {line.map((token, t) => (
                      <span key={t} {...getTokenProps({ token })} />
                    ))}
                  </div>
                ))}
              </code>
            </pre>
          )}
        </Highlight>
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
      <CarGuides {...data} />
      <Related {...data} />
    </ContentPageLayout>
  );
}
