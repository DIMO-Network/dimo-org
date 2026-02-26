import TelemetryFieldsBlock, { TelemetryField, TelemetryHint } from './index';

// Example data transformation from your old docs

// Vehicle Info & Status
const vehicleInfoFields: TelemetryField[] = [
  {
    signal: 'lastSeen',
    commonName: 'Last Seen',
    aggregationType: 'Time!',
    units: 'UTC',
    description:
      'The last time any signal was seen matching the filter. Only available on <code>signalsLatest</code>',
  },
  {
    signal: 'availableSignals',
    commonName: 'Available Vehicle Signals',
    aggregationType: '[String!]!',
    units: 'N/A',
    description:
      'Returns a list of queryable signal names that have stored data for a given <code>tokenId</code>. <strong>Note:</strong> This is a standalone query field, not a sub-field of <code>signals</code> or <code>signalsLatest</code>. Query example: <code>query { availableSignals(tokenId: 12345) }</code>',
  },
  {
    signal: 'powertrainTransmissionTravelledDistance',
    commonName: 'Odometer',
    aggregationType: 'FloatAggregation!',
    units: 'km',
    description:
      'Odometer reading in kilometers, total distance travelled during the lifetime of the transmission.',
  },
  {
    signal: 'vinVC',
    commonName: 'VIN #',
    aggregationType: 'VinVC',
    units: 'N/A',
    description:
      'Returns the latest VINVC data for a given token. <strong>Note:</strong> This is a standalone query field, not a sub-field of <code>signals</code> or <code>signalsLatest</code>. Query example: <code>query { vinVCLatest(tokenId: 12345) { vin } }</code>',
  },
  {
    signal: 'isIgnitionOn',
    commonName: 'Vehicle Ignition Status',
    aggregationType: 'FloatAggregation!',
    units: '0 or 1',
    description:
      '<p>Vehicle ignition status.</p><p>True (1) = Vehicle Ignition On<br>False (0) = Vehicle Ignition Off</p>',
  },
  {
    signal: 'speed',
    commonName: 'Vehicle Speed',
    aggregationType: 'FloatAggregation!',
    units: 'km/hr',
    description: 'The vehicle speed in km/hr',
  },
];

// Location data with warning hint
const locationFields: TelemetryField[] = [
  {
    signal: 'currentLocationCoordinates',
    commonName: 'Coordinates',
    aggregationType: 'LocationAggregation!',
    units: 'WGS 84 coordinates (latitude, longitude, hdop)',
    description:
      'Current location of the vehicle in WGS 84 coordinates, as measured at the position of GNSS receiver antenna. Returns latitude, longitude, and HDOP.',
  },
  {
    signal: 'currentLocationApproximateCoordinates',
    commonName: 'Approximate Coordinates',
    aggregationType: 'LocationAggregation!',
    units: 'WGS 84 coordinates (latitude, longitude, hdop)',
    description: 'Approximation of current location in WGS 84 coordinates (latitude, longitude, hdop).',
  },
  {
    signal: 'currentLocationAltitude',
    commonName: 'Altitude Level',
    aggregationType: 'FloatAggregation!',
    units: 'm',
    description:
      'Current altitude relative to WGS 84 reference ellipsoid, as measured at the position of GNSS receiver antenna.',
  },
  {
    signal: 'currentLocationHeading',
    commonName: 'Heading',
    aggregationType: 'FloatAggregation!',
    units: 'degrees',
    description:
      'Current heading of the vehicle in degrees (0–360), measured clockwise from true north.',
  },
];

const locationHint: TelemetryHint = {
  type: 'warning',
  content:
    'Note that these signals require a user to have shared the <a href="../../../token-exchange-api#privilege-definitions"><strong>relevant location privileges</strong></a> with your Developer License.',
};

// Battery & Charging data
const batteryFields: TelemetryField[] = [
  {
    signal: 'powertrainTractionBatteryChargingChargeCurrentAC',
    commonName: 'AC Current Charge (Alternating Current)',
    aggregationType: 'FloatAggregation!',
    units: 'amps',
    description:
      'Current AC charging current (rms) at inlet. Negative if returning energy to grid. Used when per-phase numbers are unavailable.',
  },
  {
    signal: 'powertrainTractionBatteryChargingChargeLimit',
    commonName: 'Charge Limit',
    aggregationType: 'FloatAggregation!',
    units: 'percent',
    description: 'Target charge limit (state of charge) for battery.',
  },
  {
    signal: 'powertrainTractionBatteryChargingChargeVoltageUnknownType',
    commonName: 'Charging Voltage',
    aggregationType: 'FloatAggregation!',
    units: 'volts',
    description:
      'Current charging voltage at inlet. Used when the data source does not indicate the current type (AC or DC) in use.',
  },
  {
    signal: 'powertrainTractionBatteryChargingIsCharging',
    commonName: 'Charging Status',
    aggregationType: 'StringAggregation!',
    units: '0 or 1',
    description:
      'True if charging is ongoing. Charging is considered to be ongoing if energy is flowing from charger to vehicle.<br>True (1) - Vehicle is charging.<br>False (0) - Vehicle is not charging.',
  },
  {
    signal: 'powertrainTractionBatteryCurrentPower',
    commonName: 'Battery Power',
    aggregationType: 'FloatAggregation!',
    units: 'watts',
    description:
      'Current electrical energy flowing in/out of battery. Positive = Energy flowing in to battery, e.g. during charging. Negative = Energy flowing out of battery, e.g. during driving.',
  },
];

// Example usage component
function TelemetryFieldsExample() {
  return (
    <div>
      <h2>Telemetry Fields Example</h2>

      {/* Vehicle Info & Status */}
      <TelemetryFieldsBlock
        title="Vehicle Info & Status"
        fields={vehicleInfoFields}
        defaultOpen={true}
      />

      {/* Location with warning */}
      <TelemetryFieldsBlock
        title="Location"
        fields={locationFields}
        hint={locationHint}
      />

      {/* Battery & Charging */}
      <TelemetryFieldsBlock title="Battery & Charging" fields={batteryFields} />
    </div>
  );
}

export default TelemetryFieldsExample;
