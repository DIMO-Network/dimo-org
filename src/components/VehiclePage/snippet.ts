import type { VehicleRecord } from '../../data/vehicles/schema';

// Object-valued signals need sub-field selections, so they are left out of the
// generic `{ value timestamp }` example.
const OBJECT_SIGNALS = new Set(['currentLocationCoordinates']);

// TypeScript example rendered in the "Build it" section. Kept as a template so
// the snippet harness (scripts/aeo/snippets.test.mjs) can exercise it too.
export function buildSnippet(r: VehicleRecord, maxSignals = 3): string {
  const signals = [
    ...new Set(r.coverage.flatMap(c => c.signals.map(s => s.name))),
  ]
    .filter(name => !OBJECT_SIGNALS.has(name))
    .slice(0, maxSignals);
  const fields = signals
    .map(name => `      ${name} {\n        value\n        timestamp\n      }`)
    .join('\n');
  return `import { DIMO } from '@dimo-network/data-sdk';

const dimo = new DIMO('Production');
const tokenId = Number(process.env.DIMO_TOKEN_ID); // from DIMO Connect

const developerJwt = await dimo.auth.getDeveloperJwt({
  client_id: process.env.DIMO_CLIENT_ID,
  domain: process.env.DIMO_REDIRECT_URI,
  private_key: process.env.DIMO_API_KEY,
});
const vehicleJwt = await dimo.tokenexchange.getVehicleJwt({
  ...developerJwt,
  tokenId,
});

// Latest ${r.make} ${r.model} signals
const data = await dimo.telemetry.query({
  ...vehicleJwt,
  query: \`
    query {
      signalsLatest(tokenId: \${tokenId}) {
${fields}
      }
    }\`,
});
console.log(JSON.stringify(data, null, 2));
`;
}
