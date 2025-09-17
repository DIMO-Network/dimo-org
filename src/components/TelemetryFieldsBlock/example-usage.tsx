import TelemetryFieldsBlock, { TelemetryField, TelemetryHint } from './index';

// Example data transformation from your old docs

// Vehicle Info & Status
const vehicleInfoFields: TelemetryField[] = [
  {
    signal: 'lastSeen',
    commonName: 'Last Seen',
    aggregationType: '<a href="../../scalars#time">Time!</a>',
    units: 'UTC',
    description:
      'The last time any signal was seen matching the filter. Only available on <code>signalsLatest</code>',
  },
  {
    signal: 'availableSignals',
    commonName: 'Available Vehicle Signals',
    aggregationType:
      '<a href="../../schema-and-types#floataggregationtype">FloatAggregation!</a>',
    units: 'N/A',
    description:
      'Returns a list of queryable signal names that have stored data for a given <code>tokenId</code>.',
  },
  {
    signal: 'powertrainTransmissionTravelledDistance',
    commonName: 'Odometer',
    aggregationType:
      '<a href="../../schema-and-types#floataggregationtype">FloatAggregation!</a>',
    units: 'km',
    description:
      'Odometer reading in kilometers, total distance travelled during the lifetime of the transmission.',
  },
  {
    signal: 'vinVC',
    commonName: 'VIN #',
    aggregationType:
      '<a href="../../schema-and-types#floataggregationtype">FloatAggregation!</a>',
    units: 'N/A',
    description: 'Returns the latest VINVC data for a given token',
  },
  {
    signal: 'isIgnitionOn',
    commonName: 'Vehicle Ignition Status',
    aggregationType:
      '<a href="../../schema-and-types#floataggregationtype">FloatAggregation!</a>',
    units: '0 or 1',
    description:
      '<p>Vehicle ignition status.</p><p>True (1) = Vehicle Ignition On<br>False (0) = Vehicle Ignition Off</p>',
  },
  {
    signal: 'speed',
    commonName: 'Vehicle Speed',
    aggregationType:
      '<a href="../../schema-and-types#floataggregationtype">FloatAggregation!</a>',
    units: 'km/hr',
    description: 'The vehicle speed in km/hr',
  },
];

// Location data with warning hint
const locationFields: TelemetryField[] = [
  {
    signal: 'currentLocationLatitude',
    commonName: 'Latitude Location',
    aggregationType:
      '<a href="../../schema-and-types#floataggregationtype">FloatAggregation!</a>',
    units: 'degrees',
    description:
      'Current latitude of vehicle in WGS 84 geodetic coordinates, as measured at the position of GNSS receiver antenna.',
  },
  {
    signal: 'currentLocationLongitude',
    commonName: 'Longitude Location',
    aggregationType:
      '<a href="../../schema-and-types#floataggregationtype">FloatAggregation!</a>',
    units: 'degrees',
    description:
      'Current longitude of vehicle in WGS 84 geodetic coordinates, as measured at the position of GNSS receiver antenna.',
  },
  {
    signal: 'currentLocationAltitude',
    commonName: 'Altitude Level',
    aggregationType:
      '<a href="../../schema-and-types#floataggregationtype">FloatAggregation!</a>',
    units: 'degrees',
    description:
      'Current altitude relative to WGS 84 reference ellipsoid, as measured at the position of GNSS receiver antenna.',
  },
  {
    signal: 'currentLocationApproximateLatitude',
    commonName: 'Approximate Latitude Location',
    aggregationType:
      '<a href="../../schema-and-types#floataggregationtype">FloatAggregation!</a>',
    units: 'degrees',
    description:
      'Approximation of current latitude of vehicle in WGS 84 geodetic coordinates, as measured at the position of GNSS receiver antenna.',
  },
  {
    signal: 'currentLocationApproximateLongitude',
    commonName: 'Approximate Longitude Location',
    aggregationType:
      '<a href="../../schema-and-types#floataggregationtype">FloatAggregation!</a>',
    units: 'degrees',
    description:
      'Approximation of current longitude of vehicle in WGS 84 geodetic coordinates, as measured at the position of GNSS receiver antenna.',
  },
  {
    signal: 'currentLocationIsRedacted',
    commonName: 'Location Privacy Zones',
    aggregationType:
      '<a href="../../schema-and-types#floataggregationtype">FloatAggregation!</a>',
    units: '0 or 1',
    description:
      'Indicates if the latitude and longitude signals at the current timestamp have been redacted using a privacy zone.<br>True (1) = Current Location Redacted<br>False (0) = Current Location not Redacted',
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
    aggregationType:
      '<a href="../../schema-and-types#floataggregationtype">FloatAggregation!</a>',
    units: 'amps',
    description:
      'Current AC charging current (rms) at inlet. Negative if returning energy to grid. Used when per-phase numbers are unavailable.',
  },
  {
    signal: 'powertrainTractionBatteryChargingChargeLimit',
    commonName: 'Charge Limit',
    aggregationType:
      '<a href="../../schema-and-types#floataggregationtype">FloatAggregation!</a>',
    units: 'percent',
    description: 'Target charge limit (state of charge) for battery.',
  },
  {
    signal: 'powertrainTractionBatteryChargingChargeVoltageUnknownType',
    commonName: 'Charging Voltage',
    aggregationType:
      '<a href="../../schema-and-types#floataggregationtype">FloatAggregation!</a>',
    units: 'volts',
    description:
      'Current charging voltage at inlet. Used when the data source does not indicate the current type (AC or DC) in use.',
  },
  {
    signal: 'powertrainTractionBatteryChargingIsCharging',
    commonName: 'Charging Status',
    aggregationType:
      '<a href="../../schema-and-types#stringaggregationtype">StringAggregation!</a>',
    units: '0 or 1',
    description:
      'True if charging is ongoing. Charging is considered to be ongoing if energy is flowing from charger to vehicle.<br>True (1) - Vehicle is charging.<br>False (0) - Vehicle is not charging.',
  },
  {
    signal: 'powertrainTractionBatteryCurrentPower',
    commonName: 'Battery Power',
    aggregationType:
      '<a href="../../schema-and-types#floataggregationtype">FloatAggregation!</a>',
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
