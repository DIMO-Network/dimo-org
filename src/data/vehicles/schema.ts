import { z } from 'zod';

export const ConnectionType = z.enum(['oem_cloud', 'dimo_device', 'phone']);

export const Signal = z.object({
  name: z.string().min(1), // canonical DIMO signal name, e.g. "powertrainFuelSystemRelativeLevel"
  label: z.string().min(1), // human label, e.g. "Fuel level"
  unit: z.string().optional(),
  typicalFrequency: z.string().optional(), // e.g. "every 30s while driving"
});

export const ConnectionCoverage = z.object({
  type: ConnectionType,
  provider: z.string().optional(), // e.g. "FordPass", device model name
  years: z
    .object({ from: z.number().int(), to: z.number().int() })
    .refine(y => y.from <= y.to, 'years.from must be <= years.to'),
  signals: z.array(Signal).min(1),
  events: z
    .array(
      z.enum([
        'idling',
        'refuel',
        'recharge',
        'harsh_braking',
        'speeding',
        'dtc',
      ])
    )
    .default([]),
  notes: z.string().optional(), // known gaps, e.g. "fuel level not reported on 2019–2020 trims"
});

export const VehicleRecord = z.object({
  make: z.string().min(1),
  model: z.string().min(1),
  slug: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*\/[a-z0-9]+(?:-[a-z0-9]+)*$/), // "ford/f-150"
  powertrains: z.array(z.enum(['ice', 'hybrid', 'phev', 'ev'])).min(1),
  regions: z.array(z.string()).default(['US']),
  coverage: z.array(ConnectionCoverage).min(1),
  verification: z.enum(['tested', 'expected']),
  lastVerified: z.string().date(),
  publishDate: z.string().date(), // page goes live on/after this date (UTC)
  faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
  intro: z.string().min(40).optional(), // reviewed prose from the drafting pipeline
  // Wave 2 slot — must stay absent until data-rights sign-off.
  realWorld: z.never().optional(),
});

export type VehicleRecord = z.infer<typeof VehicleRecord>;
