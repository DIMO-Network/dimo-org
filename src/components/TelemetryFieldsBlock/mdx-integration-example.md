# MDX Integration Example

This shows how to replace your existing telemetry documentation with the new
TelemetryFieldsBlock component.

## In your `.mdx` file (e.g., `1_signals.mdx`)

### Step 1: Add imports at the top of your MDX file

```mdx
---
title: Signals
---

import TelemetryFieldsBlock from '@site/src/components/TelemetryFieldsBlock';
import { allTelemetryData } from '@site/src/components/TelemetryFieldsBlock/telemetry-data';

# Telemetry Signals

Here are all the available telemetry signals organized by category:
```

### Step 2: Replace your old `<details>` blocks

**OLD:**

```html
<details>
  <summary>Vehicle Info & Status</summary>
  <table>
    <thead>
      <tr>
        <th width="374.671875">Signal</th>
        <th width="159.8515625">Common Name</th>
        <!-- ... -->
      </tr>
    </thead>
    <tbody>
      <!-- ... -->
    </tbody>
  </table>
</details>

<details>
  <summary>Location</summary>
  {% hint style="warning" %} Note that these signals require a user to have
  shared the relevant location privileges with your Developer License. {%
  endhint %}
  <table>
    <!-- ... -->
  </table>
</details>
```

**NEW:**

```mdx
<TelemetryFieldsBlock
  title="Vehicle Info & Status"
  fields={allTelemetryData.vehicleInfo.fields}
  defaultOpen={true}
/>

<TelemetryFieldsBlock
  title="Location"
  fields={allTelemetryData.location.fields}
  hint={allTelemetryData.location.hint}
/>

<TelemetryFieldsBlock
  title="Battery & Charging"
  fields={allTelemetryData.battery.fields}
/>

<TelemetryFieldsBlock
  title="Devices"
  fields={allTelemetryData.devices.fields}
/>

<TelemetryFieldsBlock
  title="Diagnostics"
  fields={allTelemetryData.diagnostics.fields}
/>

<TelemetryFieldsBlock title="Engine" fields={allTelemetryData.engine.fields} />

<TelemetryFieldsBlock
  title="Environment"
  fields={allTelemetryData.environment.fields}
/>

<TelemetryFieldsBlock title="Fuel" fields={allTelemetryData.fuel.fields} />

<TelemetryFieldsBlock
  title="Tire Pressure"
  fields={allTelemetryData.tirePressure.fields}
/>

<TelemetryFieldsBlock title="Doors" fields={allTelemetryData.doors.fields} />

<TelemetryFieldsBlock
  title="Windows"
  fields={allTelemetryData.windows.fields}
/>
```

## Complete MDX File Example

```mdx
---
title: Signals
---

import TelemetryFieldsBlock from '@site/src/components/TelemetryFieldsBlock';
import { allTelemetryData } from '@site/src/components/TelemetryFieldsBlock/telemetry-data';

# Telemetry Signals

The DIMO platform provides access to a comprehensive set of vehicle telemetry
signals. These signals are organized into categories and can be queried using
our GraphQL API.

## Available Signal Categories

<TelemetryFieldsBlock
  title="Vehicle Info & Status"
  fields={allTelemetryData.vehicleInfo.fields}
  defaultOpen={true}
/>

<TelemetryFieldsBlock
  title="Location"
  fields={allTelemetryData.location.fields}
  hint={allTelemetryData.location.hint}
/>

<TelemetryFieldsBlock
  title="Battery & Charging"
  fields={allTelemetryData.battery.fields}
/>

<TelemetryFieldsBlock
  title="Devices"
  fields={allTelemetryData.devices.fields}
/>

<TelemetryFieldsBlock
  title="Diagnostics"
  fields={allTelemetryData.diagnostics.fields}
/>

<TelemetryFieldsBlock title="Engine" fields={allTelemetryData.engine.fields} />

<TelemetryFieldsBlock
  title="Environment"
  fields={allTelemetryData.environment.fields}
/>

<TelemetryFieldsBlock title="Fuel" fields={allTelemetryData.fuel.fields} />

<TelemetryFieldsBlock
  title="Tire Pressure"
  fields={allTelemetryData.tirePressure.fields}
/>

<TelemetryFieldsBlock title="Doors" fields={allTelemetryData.doors.fields} />

<TelemetryFieldsBlock
  title="Windows"
  fields={allTelemetryData.windows.fields}
/>

## Next Steps

Learn how to query these signals using our [GraphQL API](../graphql-api) or
explore our
[client SDK](../../build/building-with-tools/client-sdk-dimo-connect).
```

## Custom Data Example

If you need to create custom telemetry categories or modify existing ones:

```tsx
import TelemetryFieldsBlock, {
  TelemetryField,
  TelemetryHint,
} from '@site/src/components/TelemetryFieldsBlock';

const customFields: TelemetryField[] = [
  {
    signal: 'customSignal',
    commonName: 'Custom Signal Name',
    aggregationType: '<a href="...">FloatAggregation!</a>',
    units: 'custom units',
    description:
      'Your custom signal description with <strong>HTML support</strong>.',
  },
];

const customHint: TelemetryHint = {
  type: 'info',
  content:
    'This is a custom information hint with <a href="#">links</a> support.',
};

<TelemetryFieldsBlock
  title="Custom Category"
  fields={customFields}
  hint={customHint}
  defaultOpen={false}
/>;
```
