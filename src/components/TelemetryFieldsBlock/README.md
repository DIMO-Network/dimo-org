# TelemetryFieldsBlock Component

A modern, reusable React component that displays telemetry field data in an
elegant accordion-style layout. This component replaces the old HTML `<details>`
blocks with a clean, consistent design that matches your site's visual theme.

## Features

- 🎨 **Modern Design**: Clean, elegant UI with smooth animations
- 🌓 **Theme Support**: Automatic light/dark mode support
- 📱 **Mobile Responsive**: Optimized for all screen sizes
- ♿ **Accessible**: Full keyboard navigation and screen reader support
- 🎯 **Type-Safe**: Built with TypeScript for better development experience
- 🔗 **HTML Support**: Supports HTML content in descriptions and links
- ⚠️ **Hint Support**: Built-in warning/info/success/danger hints

## Usage

### Basic Usage

```tsx
import TelemetryFieldsBlock from '@site/src/components/TelemetryFieldsBlock';

const myFields = [
  {
    signal: 'speed',
    commonName: 'Vehicle Speed',
    aggregationType:
      '<a href="../../schema-and-types#floataggregationtype">FloatAggregation!</a>',
    units: 'km/hr',
    description: 'The vehicle speed in km/hr',
  },
];

function MyComponent() {
  return (
    <TelemetryFieldsBlock
      title="Vehicle Info & Status"
      fields={myFields}
      defaultOpen={true}
    />
  );
}
```

### With Hint/Warning

```tsx
const locationHint = {
  type: 'warning',
  content:
    'Note that these signals require a user to have shared the <a href="../../../token-exchange-api#privilege-definitions"><strong>relevant location privileges</strong></a> with your Developer License.',
};

<TelemetryFieldsBlock
  title="Location"
  fields={locationFields}
  hint={locationHint}
/>;
```

### Using Pre-built Data

```tsx
import { allTelemetryData } from '@site/src/components/TelemetryFieldsBlock/telemetry-data';

function TelemetryPage() {
  return (
    <div>
      {/* Vehicle Info & Status */}
      <TelemetryFieldsBlock
        title={allTelemetryData.vehicleInfo.title}
        fields={allTelemetryData.vehicleInfo.fields}
        defaultOpen={true}
      />

      {/* Location with warning */}
      <TelemetryFieldsBlock
        title={allTelemetryData.location.title}
        fields={allTelemetryData.location.fields}
        hint={allTelemetryData.location.hint}
      />

      {/* All other categories... */}
    </div>
  );
}
```

## Props

| Prop          | Type               | Default | Description                                |
| ------------- | ------------------ | ------- | ------------------------------------------ |
| `title`       | `string`           | -       | The category title displayed in the header |
| `fields`      | `TelemetryField[]` | -       | Array of telemetry fields to display       |
| `hint`        | `TelemetryHint?`   | -       | Optional hint/warning to display           |
| `defaultOpen` | `boolean`          | `false` | Whether the accordion is open by default   |
| `className`   | `string?`          | -       | Additional CSS classes                     |

## Types

### TelemetryField

```tsx
interface TelemetryField {
  signal: string; // The technical signal name (displayed as code)
  commonName: string; // Human-readable name
  aggregationType: string; // Type with HTML links (e.g., "FloatAggregation!")
  units: string; // Units of measurement
  description: string; // Description with HTML support
}
```

### TelemetryHint

```tsx
interface TelemetryHint {
  type: 'warning' | 'info' | 'success' | 'danger';
  content: string; // HTML content supported
}
```

## Migration from Old Format

To convert your existing `<details>` blocks:

### Old Format

```html
<details>
  <summary>Vehicle Info & Status</summary>
  <table>
    <thead>
      <tr>
        <th>Signal</th>
        <th>Common Name</th>
        <!-- ... -->
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>speed</code></td>
        <td>Vehicle Speed</td>
        <!-- ... -->
      </tr>
    </tbody>
  </table>
</details>
```

### New Format

```tsx
import TelemetryFieldsBlock from '@site/src/components/TelemetryFieldsBlock';

const fields = [
  {
    signal: 'speed',
    commonName: 'Vehicle Speed',
    aggregationType: '<a href="...">FloatAggregation!</a>',
    units: 'km/hr',
    description: 'The vehicle speed in km/hr',
  },
];

<TelemetryFieldsBlock title="Vehicle Info & Status" fields={fields} />;
```

## Styling

The component uses CSS modules and inherits your site's theme variables. It
automatically adapts to light/dark modes and maintains consistency with your
existing design system.

Custom styling can be applied using the `className` prop or by overriding the
CSS module classes.
