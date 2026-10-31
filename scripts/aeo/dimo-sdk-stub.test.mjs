import assert from 'node:assert/strict';
import { test } from 'node:test';
import { answer, DIMO } from './dimo-sdk-stub.mjs';

const fixture = {
  signalsLatest: {
    speed: { value: 0, timestamp: '2026-10-01T00:00:00Z' },
  },
  segments: [
    { start: { timestamp: '2026-10-01T00:00:00Z' }, end: null, duration: 60 },
  ],
};

test('answer returns only the selected fields, honouring aliases', () => {
  const res = answer(
    `query { signalsLatest(tokenId: 1) { mph: speed { value } } }`,
    fixture
  );
  assert.deepEqual(res, { data: { signalsLatest: { mph: { value: 0 } } } });
});

test('answer maps selections over lists and keeps nulls', () => {
  const res = answer(
    `query { segments(tokenId: 1) { start { timestamp } end { timestamp } } }`,
    fixture
  );
  assert.deepEqual(res.data.segments, [
    { start: { timestamp: '2026-10-01T00:00:00Z' }, end: null },
  ]);
});

test('answer rejects fields missing from the fixture', () => {
  assert.throws(
    () =>
      answer(
        `query { signalsLatest(tokenId: 1) { madeUp { value } } }`,
        fixture
      ),
    /Cannot query field "madeUp" on query.signalsLatest/
  );
});

test('telemetry.query requires the vehicle JWT, not the developer JWT', async () => {
  const dimo = new DIMO('Production');
  const developerJwt = await dimo.auth.getDeveloperJwt({
    client_id: 'c',
    domain: 'd',
    private_key: 'k',
  });
  await assert.rejects(
    dimo.telemetry.query({
      ...developerJwt,
      query: '{ signalsLatest { speed { value } } }',
    }),
    /vehicle JWT/
  );
});
