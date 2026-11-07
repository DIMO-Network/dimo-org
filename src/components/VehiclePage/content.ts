import type { VehicleRecord } from '../../data/vehicles/schema';

type Coverage = VehicleRecord['coverage'][number];
type ConnectionType = Coverage['type'];
type EventType = Coverage['events'][number];
type Years = { from: number; to: number };

export const CONNECTION_LABELS: Record<ConnectionType, string> = {
  oem_cloud: 'OEM cloud (no hardware)',
  dimo_device: 'DIMO device',
  phone: 'Phone app',
};

export const EVENT_LABELS: Record<EventType, string> = {
  idling: 'Idling',
  refuel: 'Refuel',
  recharge: 'Recharge',
  harsh_braking: 'Harsh braking',
  speeding: 'Speeding',
  dtc: 'New diagnostic trouble code',
};

// Secondary devices: their signal tables start collapsed so the DIMO LTE R1
// table reads first.
const SECONDARY_PROVIDERS = new Set(['AutoPi']);

// Display order: primary coverage first, secondary devices last. A secondary
// table only collapses when something else is shown open above it.
export function displayCoverage(
  r: VehicleRecord
): { coverage: Coverage; collapsed: boolean }[] {
  const secondary = (c: Coverage) =>
    c.provider !== undefined && SECONDARY_PROVIDERS.has(c.provider);
  const hasPrimary = r.coverage.some(c => !secondary(c));
  return [
    ...r.coverage.filter(c => !secondary(c)),
    ...r.coverage.filter(secondary),
  ].map(coverage => ({
    coverage,
    collapsed: hasPrimary && secondary(coverage),
  }));
}

export const vehicleName = (r: VehicleRecord) => `${r.make} ${r.model}`;

export const formatYears = ({ from, to }: Years) =>
  from === to ? `${from}` : `${from}–${to}`;

// Coverage is open-ended: newer model years keep connecting, so pages give the
// earliest year seen and never an upper bound.
export const sinceYear = (from: number) => `${from} and newer`;

type ConnectionGroup = {
  type: ConnectionType;
  from: number;
  providers: string[];
};

// One entry per connection type, so two DIMO devices read as one clause.
export function connectionGroups(r: VehicleRecord): ConnectionGroup[] {
  const ordered = displayCoverage(r).map(d => d.coverage);
  return connectionTypes(r).map(type => {
    const cs = ordered.filter(c => c.type === type);
    return {
      type,
      from: Math.min(...cs.map(c => c.years.from)),
      providers: [
        ...new Set(cs.flatMap(c => (c.provider ? [c.provider] : []))),
      ],
    };
  });
}

const orList = (items: string[]) =>
  items.length <= 1
    ? items.join('')
    : `${items.slice(0, -1).join(', ')} or ${items[items.length - 1]}`;

export function yearSpan(coverage: Coverage[]): Years {
  return {
    from: Math.min(...coverage.map(c => c.years.from)),
    to: Math.max(...coverage.map(c => c.years.to)),
  };
}

export const coverageOf = (r: VehicleRecord, type: ConnectionType) =>
  r.coverage.filter(c => c.type === type);

export const connectionTypes = (r: VehicleRecord): ConnectionType[] => [
  ...new Set(r.coverage.map(c => c.type)),
];

export function events(r: VehicleRecord): EventType[] {
  return [...new Set(r.coverage.flatMap(c => c.events))];
}

// Connection types that provide the event, or [] when every connection on
// the record does (so the page only qualifies events some connections lack).
export function eventConnections(
  r: VehicleRecord,
  e: EventType
): ConnectionType[] {
  const types = connectionTypes(r).filter(t =>
    coverageOf(r, t).some(c => c.events.includes(e))
  );
  return types.length === connectionTypes(r).length ? [] : types;
}

// Model-year ranges inside the record's overall span that no OEM cloud
// connection covers, i.e. the years that need a DIMO device.
export function yearsWithoutOemCloud(r: VehicleRecord): Years[] {
  const span = yearSpan(r.coverage);
  const oem = coverageOf(r, 'oem_cloud');
  const gaps: Years[] = [];
  let start: number | null = null;
  for (let y = span.from; y <= span.to + 1; y++) {
    const covered =
      y > span.to || oem.some(c => y >= c.years.from && y <= c.years.to);
    if (!covered && start === null) start = y;
    if (covered && start !== null) {
      gaps.push({ from: start, to: y - 1 });
      start = null;
    }
  }
  return gaps;
}

function headlineSignals(r: VehicleRecord, n = 3): string[] {
  const labels = r.coverage.flatMap(c => c.signals.map(s => s.label));
  return [...new Set(labels)].slice(0, n).map(l => l.toLowerCase());
}

function list(items: string[]): string {
  if (items.length <= 1) return items.join('');
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;
}

function coverageClause(g: ConnectionGroup): string {
  const via = g.providers.length ? ` (${orList(g.providers)})` : '';
  const how =
    g.type === 'oem_cloud'
      ? `connect through the OEM cloud${via}`
      : g.type === 'dimo_device'
        ? `connect with a DIMO device${via}`
        : `connect through a phone app${via}`;
  return `model years ${sinceYear(g.from)} ${how}`;
}

export function directAnswer(r: VehicleRecord): string {
  const name = vehicleName(r);
  const clauses = connectionGroups(r).map(coverageClause);
  const sentence2 = clauses[0][0].toUpperCase() + clauses[0].slice(1);
  const rest = clauses.slice(1);
  const coverage = rest.length
    ? `${sentence2}; ${list(rest)}.`
    : `${sentence2}.`;
  const status =
    r.verification === 'expected'
      ? ' Coverage is expected from the connection capabilities and has not yet been tested on this model.'
      : '';
  return (
    `DIMO gives developers API access to ${name} vehicle data. ${coverage} ` +
    `Headline signals include ${list(headlineSignals(r))}.${status}`
  );
}

export function generatedFaq(r: VehicleRecord): { q: string; a: string }[] {
  const name = vehicleName(r);
  const gaps = yearsWithoutOemCloud(r);
  const hasDevice = coverageOf(r, 'dimo_device').length > 0;
  const hardware =
    coverageOf(r, 'oem_cloud').length === 0
      ? `Yes. DIMO lists no OEM cloud connection for the ${name}, so data comes from a DIMO device.`
      : gaps.length === 0
        ? `No. Every listed ${name} model year connects through the OEM cloud without hardware.`
        : `Only for model years ${list(gaps.map(formatYears))}, which have no OEM cloud connection${hasDevice ? ' and need a DIMO device' : ''}. Other listed years connect without hardware.`;
  const years = connectionGroups(r).map(g =>
    g.type === 'dimo_device'
      ? `DIMO devices have been seen working on ${name} model years ${sinceYear(g.from)}.`
      : `${name} model years ${sinceYear(g.from)} connect through ${g.type === 'oem_cloud' ? 'the OEM cloud' : 'a phone app'}${g.providers.length ? ` (${orList(g.providers)})` : ''}.`
  );
  return [
    {
      q: `Which ${name} model years work with DIMO?`,
      a: `${years.join(' ')} For older vehicles, contact DIMO for additional support.`,
    },
    { q: `Do I need hardware to get ${name} data?`, a: hardware },
  ];
}

export function allFaq(r: VehicleRecord) {
  return [...r.faq, ...generatedFaq(r)];
}
