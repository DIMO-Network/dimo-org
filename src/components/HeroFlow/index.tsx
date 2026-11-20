import React, { useEffect, useState } from 'react';
import { translate } from '@docusaurus/Translate';
import styles from './styles.module.css';

const BRANDS = ['Tesla', 'Ford', 'BMW', 'Toyota', 'Hyundai'];

const SPEEDS = ['48 km/h', '52 km/h', '47 km/h', '55 km/h'];
const TIRE_PRESSURES = ['35 psi', '35 psi', '34 psi', '35 psi'];
const LOCATIONS = [
  '37.774, -122.419',
  '37.775, -122.418',
  '37.776, -122.417',
  '37.777, -122.416',
];

// Odometer only counts up and battery only drains, so the loop never shows a
// car driving backwards.
function signalValues(tick: number) {
  return [
    SPEEDS[tick % SPEEDS.length],
    `${78 - (Math.floor(tick / 8) % 20)}%`,
    `${(31204 + Math.floor(tick / 2)).toLocaleString('en-US')} km`,
    TIRE_PRESSURES[tick % TIRE_PRESSURES.length],
    LOCATIONS[tick % LOCATIONS.length],
  ];
}

// One consent session per app: access counts down, expires, then a new
// session starts. Apps are offset so one is always expiring.
const CONSENT_CYCLE_S = 9;
const CONSENT_ACTIVE = 0.78;

type Point = { x: number; y: number };
type Rect = { x: number; y: number; w: number; h: number };

type Layout = {
  viewBox: [number, number];
  direction: 'row' | 'column';
  vehicles: Rect[];
  vehicleIn: Point[];
  hub: Rect;
  apps: Rect[];
  appOut: Point[];
  compact: boolean;
  labels: { text: 'vehicles' | 'layer' | 'apps'; x: number; y: number }[];
  moreBrands: Point;
};

const WIDE: Layout = (() => {
  const vehicles = BRANDS.map((_, i) => ({
    x: 20,
    y: 70 + i * 72,
    w: 200,
    h: 50,
  }));
  const hub = { x: 400, y: 60, w: 320, h: 370 };
  const apps = [0, 1, 2].map(i => ({
    x: 900,
    y: 80 + i * 115,
    w: 200,
    h: 100,
  }));
  return {
    viewBox: [1120, 445],
    direction: 'row',
    vehicles,
    vehicleIn: vehicles.map((_, i) => ({ x: hub.x, y: 160 + i * 40 })),
    hub,
    apps,
    appOut: apps.map((_, i) => ({ x: hub.x + hub.w, y: 190 + i * 50 })),
    compact: false,
    labels: [
      { text: 'vehicles', x: 120, y: 30 },
      { text: 'layer', x: 560, y: 30 },
      { text: 'apps', x: 1000, y: 30 },
    ],
    moreBrands: { x: 120, y: 434 },
  };
})();

const TALL: Layout = (() => {
  const vehicles = BRANDS.map((_, i) => ({
    x: 6 + i * 70,
    y: 48,
    w: 62,
    h: 40,
  }));
  const hub = { x: 20, y: 170, w: 320, h: 370 };
  const apps = [0, 1, 2].map(i => ({ x: 6 + i * 122, y: 620, w: 104, h: 84 }));
  return {
    viewBox: [360, 750],
    direction: 'column',
    vehicles,
    vehicleIn: vehicles.map((_, i) => ({ x: 180 + (i - 2) * 30, y: hub.y })),
    hub,
    apps,
    appOut: apps.map((_, i) => ({ x: 130 + i * 50, y: hub.y + hub.h })),
    compact: true,
    labels: [
      { text: 'vehicles', x: 180, y: 20 },
      { text: 'apps', x: 180, y: 735 },
    ],
    moreBrands: { x: 180, y: 38 },
  };
})();

function curve(a: Point, b: Point, direction: Layout['direction']) {
  if (direction === 'row') {
    const dx = (b.x - a.x) / 2;
    return `M${a.x} ${a.y} C${a.x + dx} ${a.y}, ${b.x - dx} ${b.y}, ${b.x} ${b.y}`;
  }
  const dy = (b.y - a.y) / 2;
  return `M${a.x} ${a.y} C${a.x} ${a.y + dy}, ${b.x} ${b.y - dy}, ${b.x} ${b.y}`;
}

function vehicleOut(r: Rect, direction: Layout['direction']): Point {
  return direction === 'row'
    ? { x: r.x + r.w, y: r.y + r.h / 2 }
    : { x: r.x + r.w / 2, y: r.y + r.h };
}

function appIn(r: Rect, direction: Layout['direction']): Point {
  return direction === 'row'
    ? { x: r.x, y: r.y + r.h / 2 }
    : { x: r.x + r.w / 2, y: r.y };
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(query.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

function useTick(enabled: boolean, ms: number) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (!enabled) return undefined;
    const id = setInterval(() => setTick(t => t + 1), ms);
    return () => clearInterval(id);
  }, [enabled, ms]);
  return tick;
}

function consentAnimation(
  attributeName: string,
  values: string,
  begin: number,
  discrete = false
) {
  return (
    <animate
      attributeName={attributeName}
      values={values}
      keyTimes={discrete ? `0;${CONSENT_ACTIVE}` : `0;${CONSENT_ACTIVE};1`}
      calcMode={discrete ? 'discrete' : 'linear'}
      dur={`${CONSENT_CYCLE_S}s`}
      begin={`${-begin}s`}
      repeatCount="indefinite"
    />
  );
}

type Strings = ReturnType<typeof useStrings>;

function useStrings() {
  return {
    title: translate({
      id: 'home.heroFlow.title',
      message:
        'Vehicles from Tesla, Ford, BMW, Toyota, Hyundai and 45+ more brands stream into DIMO, one data layer for identity, telemetry and consent. Apps read that data only while the owner’s time-bounded consent is active.',
    }),
    vehicles: translate({
      id: 'home.heroFlow.anyVehicle',
      message: 'Any vehicle',
    }),
    layer: translate({
      id: 'home.heroFlow.oneDataLayer',
      message: 'One data layer',
    }),
    apps: translate({ id: 'home.heroFlow.anyApp', message: 'Any app' }),
    moreBrands: translate({
      id: 'home.heroFlow.moreBrands',
      message: '+ 45 more brands',
    }),
    hubSubtitle: translate({
      id: 'home.heroFlow.hubSubtitle',
      message: 'Normalized, permissioned vehicle data',
    }),
    signals: [
      translate({ id: 'home.heroFlow.signal.speed', message: 'Speed' }),
      translate({ id: 'home.heroFlow.signal.battery', message: 'Battery' }),
      translate({ id: 'home.heroFlow.signal.odometer', message: 'Odometer' }),
      translate({
        id: 'home.heroFlow.signal.tirePressure',
        message: 'Tire pressure',
      }),
      translate({ id: 'home.heroFlow.signal.location', message: 'Location' }),
    ],
    pillars: [
      translate({ id: 'home.heroFlow.pillar.identity', message: 'Identity' }),
      translate({ id: 'home.heroFlow.pillar.telemetry', message: 'Telemetry' }),
      translate({ id: 'home.heroFlow.pillar.consent', message: 'Consent' }),
    ],
    appNames: [
      translate({ id: 'home.heroFlow.app.rental', message: 'Rental app' }),
      translate({ id: 'home.heroFlow.app.insurance', message: 'Insurance' }),
      translate({ id: 'home.heroFlow.app.fleet', message: 'Fleet ops' }),
    ],
    sessionConsent: translate({
      id: 'home.heroFlow.sessionConsent',
      message: 'Session consent',
    }),
    active: translate({ id: 'home.heroFlow.active', message: 'Active' }),
    expired: translate({ id: 'home.heroFlow.expired', message: 'Expired' }),
  };
}

function CarGlyph({ x, y }: Point) {
  return (
    <g className={styles.glyph} transform={`translate(${x} ${y})`}>
      <path d="M1 9.5V7l3-3.5h9L17 7h3v2.5" />
      <circle cx="5.5" cy="10" r="1.8" />
      <circle cx="15.5" cy="10" r="1.8" />
    </g>
  );
}

function Diagram({
  layout,
  strings,
  tick,
  animate,
  className,
  titleId,
}: {
  layout: Layout;
  strings: Strings;
  tick: number;
  animate: boolean;
  className: string;
  titleId: string;
}) {
  const { hub, compact, direction } = layout;
  const [vbW, vbH] = layout.viewBox;
  const pillW = (hub.w - 48 - 16) / 3;
  const values = signalValues(tick);

  return (
    <svg
      className={className}
      viewBox={`0 0 ${vbW} ${vbH}`}
      role="img"
      aria-labelledby={titleId}
    >
      <title id={titleId}>{strings.title}</title>

      {layout.labels.map(l => (
        <text
          key={l.text}
          className={styles.colLabel}
          x={l.x}
          y={l.y}
          textAnchor="middle"
        >
          {strings[l.text]}
        </text>
      ))}

      {layout.vehicles.map((r, i) => {
        const d = curve(
          vehicleOut(r, direction),
          layout.vehicleIn[i],
          direction
        );
        return (
          <g key={BRANDS[i]}>
            <path className={styles.wire} d={d} />
            {animate && (
              <circle className={styles.packet} r="3">
                <animateMotion
                  path={d}
                  dur="2.6s"
                  begin={`${-i * 0.45}s`}
                  repeatCount="indefinite"
                />
              </circle>
            )}
            <rect
              className={styles.card}
              x={r.x}
              y={r.y}
              width={r.w}
              height={r.h}
              rx="6"
            />
            {compact ? (
              <text
                className={styles.brandSmall}
                x={r.x + r.w / 2}
                y={r.y + r.h / 2 + 4}
                textAnchor="middle"
              >
                {BRANDS[i]}
              </text>
            ) : (
              <>
                <CarGlyph x={r.x + 16} y={r.y + r.h / 2 - 7} />
                <text
                  className={styles.brand}
                  x={r.x + 48}
                  y={r.y + r.h / 2 + 5}
                >
                  {BRANDS[i]}
                </text>
                <circle
                  className={styles.liveDot}
                  cx={r.x + r.w - 20}
                  cy={r.y + r.h / 2}
                  r="3.5"
                >
                  {animate && (
                    <animate
                      attributeName="opacity"
                      values="1;0.3;1"
                      dur="1.6s"
                      begin={`${-i * 0.3}s`}
                      repeatCount="indefinite"
                    />
                  )}
                </circle>
              </>
            )}
          </g>
        );
      })}

      <text
        className={styles.more}
        x={layout.moreBrands.x}
        y={layout.moreBrands.y}
        textAnchor="middle"
      >
        {strings.moreBrands}
      </text>

      {layout.apps.map((r, i) => {
        const d = curve(layout.appOut[i], appIn(r, direction), direction);
        const begin = i * 3;
        const barW = r.w - 32;
        return (
          <g key={strings.appNames[i]}>
            <g>
              {animate && consentAnimation('opacity', '1;0.2', begin, true)}
              <path className={styles.wireActive} d={d} />
              {animate &&
                [0, 1.1].map(offset => (
                  <circle key={offset} className={styles.packet} r="3">
                    <animateMotion
                      path={d}
                      dur="2.2s"
                      begin={`${-(i * 0.5 + offset)}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                ))}
            </g>
            <rect
              className={styles.card}
              x={r.x}
              y={r.y}
              width={r.w}
              height={r.h}
              rx="6"
            />
            <text
              className={compact ? styles.appNameSmall : styles.appName}
              x={r.x + 16}
              y={r.y + (compact ? 26 : 30)}
            >
              {strings.appNames[i]}
            </text>
            {!compact && (
              <text className={styles.caption} x={r.x + 16} y={r.y + 56}>
                {strings.sessionConsent}
              </text>
            )}
            <text
              className={styles.stateActive}
              x={compact ? r.x + 16 : r.x + r.w - 16}
              y={r.y + (compact ? 48 : 56)}
              textAnchor={compact ? 'start' : 'end'}
            >
              {animate && consentAnimation('opacity', '1;0', begin, true)}
              {strings.active}
            </text>
            <text
              className={styles.stateExpired}
              x={compact ? r.x + 16 : r.x + r.w - 16}
              y={r.y + (compact ? 48 : 56)}
              textAnchor={compact ? 'start' : 'end'}
              opacity="0"
            >
              {animate && consentAnimation('opacity', '0;1', begin, true)}
              {strings.expired}
            </text>
            <rect
              className={styles.track}
              x={r.x + 16}
              y={r.y + r.h - (compact ? 20 : 24)}
              width={barW}
              height="4"
              rx="2"
            />
            <rect
              className={styles.bar}
              x={r.x + 16}
              y={r.y + r.h - (compact ? 20 : 24)}
              width={barW * 0.6}
              height="4"
              rx="2"
            >
              {animate && consentAnimation('width', `${barW};0;0`, begin)}
            </rect>
          </g>
        );
      })}

      <rect
        className={styles.hub}
        x={hub.x}
        y={hub.y}
        width={hub.w}
        height={hub.h}
        rx="8"
      />
      <text className={styles.hubTitle} x={hub.x + 24} y={hub.y + 44}>
        DIMO
      </text>
      <text className={styles.caption} x={hub.x + 24} y={hub.y + 68}>
        {strings.hubSubtitle}
      </text>
      <line
        className={styles.divider}
        x1={hub.x + 24}
        x2={hub.x + hub.w - 24}
        y1={hub.y + 88}
        y2={hub.y + 88}
      />
      {strings.signals.map((label, i) => {
        const y = hub.y + 122 + i * 38;
        return (
          <g key={label}>
            <text className={styles.signalLabel} x={hub.x + 24} y={y}>
              {label}
            </text>
            <text
              className={styles.signalValue}
              x={hub.x + hub.w - 24}
              y={y}
              textAnchor="end"
            >
              {values[i]}
            </text>
          </g>
        );
      })}
      <line
        className={styles.divider}
        x1={hub.x + 24}
        x2={hub.x + hub.w - 24}
        y1={hub.y + 306}
        y2={hub.y + 306}
      />
      {strings.pillars.map((label, i) => {
        const x = hub.x + 24 + i * (pillW + 8);
        return (
          <g key={label}>
            <rect
              className={styles.pill}
              x={x}
              y={hub.y + 322}
              width={pillW}
              height="28"
              rx="4"
            />
            <text
              className={styles.pillText}
              x={x + pillW / 2}
              y={hub.y + 340}
              textAnchor="middle"
            >
              {label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function HeroFlow() {
  const strings = useStrings();
  const reduced = useReducedMotion();
  const tick = useTick(!reduced, 1400);
  const animate = !reduced;

  return (
    <div className={styles.flow}>
      <Diagram
        layout={WIDE}
        strings={strings}
        tick={tick}
        animate={animate}
        className={styles.wide}
        titleId="hero-flow-title-wide"
      />
      <Diagram
        layout={TALL}
        strings={strings}
        tick={tick}
        animate={animate}
        className={styles.tall}
        titleId="hero-flow-title-tall"
      />
    </div>
  );
}
