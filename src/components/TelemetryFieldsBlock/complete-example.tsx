import React from 'react';
import TelemetryFieldsBlock from './index';
import { allTelemetryData } from './telemetry-data';

/**
 * Complete example showing how to replace all your old <details> blocks
 * with the new TelemetryFieldsBlock component
 *
 * This demonstrates the full transformation of your telemetry documentation
 * from the old table format to the new modern accordion design.
 */
function CompleteTelemetryDocumentation() {
  return (
    <div>
      <h1>Telemetry Signals</h1>
      <p>
        All available telemetry signals organized by category. Click on each
        category to expand and see the available signals.
      </p>

      {/* Vehicle Info & Status - Open by default */}
      <TelemetryFieldsBlock
        title={allTelemetryData.vehicleInfo.title}
        fields={allTelemetryData.vehicleInfo.fields}
        defaultOpen={true}
      />

      {/* Location - With privacy warning */}
      <TelemetryFieldsBlock
        title={allTelemetryData.location.title}
        fields={allTelemetryData.location.fields}
        hint={allTelemetryData.location.hint}
      />

      {/* Battery & Charging */}
      <TelemetryFieldsBlock
        title={allTelemetryData.battery.title}
        fields={allTelemetryData.battery.fields}
      />

      {/* Devices */}
      <TelemetryFieldsBlock
        title={allTelemetryData.devices.title}
        fields={allTelemetryData.devices.fields}
      />

      {/* Diagnostics */}
      <TelemetryFieldsBlock
        title={allTelemetryData.diagnostics.title}
        fields={allTelemetryData.diagnostics.fields}
      />

      {/* Engine */}
      <TelemetryFieldsBlock
        title={allTelemetryData.engine.title}
        fields={allTelemetryData.engine.fields}
      />

      {/* Environment */}
      <TelemetryFieldsBlock
        title={allTelemetryData.environment.title}
        fields={allTelemetryData.environment.fields}
      />

      {/* Fuel */}
      <TelemetryFieldsBlock
        title={allTelemetryData.fuel.title}
        fields={allTelemetryData.fuel.fields}
      />

      {/* Tire Pressure */}
      <TelemetryFieldsBlock
        title={allTelemetryData.tirePressure.title}
        fields={allTelemetryData.tirePressure.fields}
      />

      {/* Doors */}
      <TelemetryFieldsBlock
        title={allTelemetryData.doors.title}
        fields={allTelemetryData.doors.fields}
      />

      {/* Windows */}
      <TelemetryFieldsBlock
        title={allTelemetryData.windows.title}
        fields={allTelemetryData.windows.fields}
      />
    </div>
  );
}

export default CompleteTelemetryDocumentation;

/**
 * How to use this in your MDX files:
 *
 * 1. Import the component and data:
 * ```mdx
 * import TelemetryFieldsBlock from '@site/src/components/TelemetryFieldsBlock';
 * import { allTelemetryData } from '@site/src/components/TelemetryFieldsBlock/telemetry-data';
 * ```
 *
 * 2. Replace your old <details> blocks with:
 * ```mdx
 * <TelemetryFieldsBlock
 *   title="Vehicle Info & Status"
 *   fields={allTelemetryData.vehicleInfo.fields}
 *   defaultOpen={true}
 * />
 * ```
 *
 * 3. For categories with hints/warnings:
 * ```mdx
 * <TelemetryFieldsBlock
 *   title="Location"
 *   fields={allTelemetryData.location.fields}
 *   hint={allTelemetryData.location.hint}
 * />
 * ```
 */
