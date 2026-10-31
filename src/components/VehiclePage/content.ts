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

export const vehicleName = (r: VehicleRecord) => `${r.make} ${r.model}`;

export const formatYears = ({ from, to }: Years) =>
  from === to ? `${from}` : `${from}–${to}`;

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

function coverageClause(c: Coverage): string {
  const via = c.provider ? ` (${c.provider})` : '';
  const how =
    c.type === 'oem_cloud'
      ? `connect through the OEM cloud${via} with no hardware`
      : c.type === 'dimo_device'
        ? `connect with a DIMO device${via}`
        : `connect through a phone app${via}`;
  return `model years ${formatYears(c.years)} ${how}`;
}

export function directAnswer(r: VehicleRecord): string {
  const name = vehicleName(r);
  const clauses = r.coverage.map(coverageClause);
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
  return [
    {
      q: `Which ${name} model years work with DIMO?`,
      a: `${list(r.coverage.map(c => `${formatYears(c.years)} via ${CONNECTION_LABELS[c.type]}`))}.`,
    },
    { q: `Do I need hardware to get ${name} data?`, a: hardware },
  ];
}

export function allFaq(r: VehicleRecord) {
  return [...r.faq, ...generatedFaq(r)];
}
