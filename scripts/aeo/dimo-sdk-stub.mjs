// Offline stand-in for @dimo-network/data-sdk, swapped in by the snippet
// harness so CI never calls DIMO. Auth calls check their inputs and return fake
// JWTs. telemetry.query answers from the fixture at AEO_TELEMETRY_FIXTURE: the
// merged `data` objects of real Telemetry API responses, e.g.
//   { "signalsLatest": { "speed": { "value": 0, "timestamp": "..." }, ... },
//     "segments": [{ "start": { "timestamp": "..." }, "end": null, ... }] }
// Querying a field the fixture lacks fails, which is how invented signal names
// get caught.
import { readFileSync } from 'node:fs';
import { parse } from 'graphql';

const DEVELOPER_JWT = 'Bearer stub-developer-jwt';
const VEHICLE_JWT = 'Bearer stub-vehicle-jwt';

function select(value, selectionSet, path) {
  if (value === null || !selectionSet) return value;
  if (Array.isArray(value))
    return value.map((v, i) => select(v, selectionSet, `${path}[${i}]`));
  const out = {};
  for (const node of selectionSet.selections) {
    if (node.kind !== 'Field')
      throw new Error(
        `${path}: fragments aren't supported by the snippet stub`
      );
    const name = node.name.value;
    if (!(name in value))
      throw new Error(
        `Cannot query field "${name}" on ${path}: not in the telemetry fixture`
      );
    out[node.alias?.value ?? name] = select(
      value[name],
      node.selectionSet,
      `${path}.${name}`
    );
  }
  return out;
}

export function answer(query, fixture) {
  const op = parse(query).definitions.find(
    d => d.kind === 'OperationDefinition'
  );
  return { data: select(fixture, op.selectionSet, 'query') };
}

export class DIMO {
  constructor(env) {
    if (!['Production', 'Dev'].includes(env))
      throw new Error(`new DIMO(): unknown environment "${env}"`);

    this.auth = {
      async getDeveloperJwt(params) {
        for (const key of ['client_id', 'domain', 'private_key'])
          if (!params?.[key])
            throw new Error(`auth.getDeveloperJwt: missing ${key}`);
        return { headers: { Authorization: DEVELOPER_JWT } };
      },
    };

    this.tokenexchange = {
      async getVehicleJwt(params) {
        if (params?.headers?.Authorization !== DEVELOPER_JWT)
          throw new Error(
            'tokenexchange.getVehicleJwt: spread the developer JWT into the call'
          );
        if (!Number.isInteger(params.tokenId))
          throw new Error(
            'tokenexchange.getVehicleJwt: tokenId must be an integer'
          );
        return { headers: { Authorization: VEHICLE_JWT } };
      },
    };

    this.telemetry = {
      async query(params) {
        if (params?.headers?.Authorization !== VEHICLE_JWT)
          throw new Error(
            'telemetry.query: spread the vehicle JWT into the call'
          );
        const fixture = JSON.parse(
          readFileSync(process.env.AEO_TELEMETRY_FIXTURE, 'utf8')
        );
        return answer(params.query, fixture);
      },
    };
  }
}
