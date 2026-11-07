// Loaded with `node --import` by the snippet harness: resolves
// @dimo-network/data-sdk to the offline stub.
import { registerHooks } from 'node:module';

const stub = new URL('./dimo-sdk-stub.mjs', import.meta.url).href;

registerHooks({
  resolve(specifier, context, next) {
    if (specifier === '@dimo-network/data-sdk')
      return { url: stub, shortCircuit: true };
    return next(specifier, context);
  },
});
