// Telemetry Signal Types
export type AggregationType = 'float' | 'string';

export interface AggregationOption {
  value: string;
  label: string;
}

export interface TelemetrySignal {
  name: string;
  description: string;
  aggregationType: AggregationType;
}

export interface SignalCategory {
  category: string;
  signals: TelemetrySignal[];
}

// Float aggregation options
export const floatAggregationOptions: AggregationOption[] = [
  { value: 'AVG', label: 'Average' },
  { value: 'MAX', label: 'Maximum' },
  { value: 'MIN', label: 'Minimum' },
  { value: 'MED', label: 'Median' },
  { value: 'FIRST', label: 'First' },
  { value: 'LAST', label: 'Last' },
  { value: 'RAND', label: 'Random' },
];

// String aggregation options
export const stringAggregationOptions: AggregationOption[] = [
  { value: 'RAND', label: 'Random' },
  { value: 'TOP', label: 'Most Frequent' },
  { value: 'UNIQUE', label: 'Unique Values' },
];

// Interval options for historical queries
export const intervalOptions: AggregationOption[] = [
  { value: '1h', label: '1 Hour' },
  { value: '6h', label: '6 Hours' },
  { value: '12h', label: '12 Hours' },
  { value: '24h', label: '1 Day' },
  { value: '168h', label: '1 Week' },
];

// All available telemetry signals organized by category
export const telemetrySignals: SignalCategory[] = [
  {
    category: 'Location',
    signals: [
      {
        name: 'currentLocationLatitude',
        description: 'Current latitude',
        aggregationType: 'float',
      },
      {
        name: 'currentLocationLongitude',
        description: 'Current longitude',
        aggregationType: 'float',
      },
      {
        name: 'currentLocationAltitude',
        description: 'Current altitude',
        aggregationType: 'float',
      },
      {
        name: 'currentLocationApproximateLatitude',
        description: 'Approximate latitude',
        aggregationType: 'float',
      },
      {
        name: 'currentLocationApproximateLongitude',
        description: 'Approximate longitude',
        aggregationType: 'float',
      },
    ],
  },
  {
    category: 'Vehicle Status',
    signals: [
      {
        name: 'isIgnitionOn',
        description: 'Ignition status',
        aggregationType: 'string',
      },
      {
        name: 'speed',
        description: 'Vehicle speed (km/hr)',
        aggregationType: 'float',
      },
      {
        name: 'powertrainTransmissionTravelledDistance',
        description: 'Odometer reading',
        aggregationType: 'float',
      },
      {
        name: 'powertrainType',
        description: 'Powertrain type',
        aggregationType: 'string',
      },
    ],
  },
  {
    category: 'Battery & Fuel',
    signals: [
      {
        name: 'powertrainFuelSystemRelativeLevel',
        description: 'Fuel level (%)',
        aggregationType: 'float',
      },
      {
        name: 'powertrainFuelSystemSupportedFuelTypes',
        description: 'Supported fuel types',
        aggregationType: 'string',
      },
      {
        name: 'powertrainRange',
        description: 'Remaining range (meters)',
        aggregationType: 'float',
      },
      {
        name: 'lowVoltageBatteryCurrentVoltage',
        description: 'Battery voltage',
        aggregationType: 'float',
      },
      {
        name: 'powertrainTractionBatteryStateOfChargeCurrent',
        description: 'EV battery charge (%)',
        aggregationType: 'float',
      },
      {
        name: 'powertrainTractionBatteryChargingIsCharging',
        description: 'Is charging',
        aggregationType: 'string',
      },
      {
        name: 'powertrainTractionBatteryChargingChargeLimit',
        description: 'Charge limit (%)',
        aggregationType: 'float',
      },
      {
        name: 'powertrainTractionBatteryCurrentPower',
        description: 'Battery power flow',
        aggregationType: 'float',
      },
      {
        name: 'powertrainTractionBatteryGrossCapacity',
        description: 'Battery capacity',
        aggregationType: 'float',
      },
    ],
  },
  {
    category: 'Engine',
    signals: [
      {
        name: 'powertrainCombustionEngineSpeed',
        description: 'Engine RPM',
        aggregationType: 'float',
      },
      {
        name: 'powertrainCombustionEngineECT',
        description: 'Engine coolant temp',
        aggregationType: 'float',
      },
      {
        name: 'powertrainCombustionEngineEngineOilLevel',
        description: 'Engine oil level',
        aggregationType: 'string',
      },
      {
        name: 'obdEngineLoad',
        description: 'Engine load (%)',
        aggregationType: 'float',
      },
      {
        name: 'powertrainCombustionEngineTPS',
        description: 'Throttle position',
        aggregationType: 'float',
      },
    ],
  },
  {
    category: 'Tire Pressure',
    signals: [
      {
        name: 'chassisAxleRow1WheelLeftTirePressure',
        description: 'Front left tire (kPa)',
        aggregationType: 'float',
      },
      {
        name: 'chassisAxleRow1WheelRightTirePressure',
        description: 'Front right tire (kPa)',
        aggregationType: 'float',
      },
      {
        name: 'chassisAxleRow2WheelLeftTirePressure',
        description: 'Rear left tire (kPa)',
        aggregationType: 'float',
      },
      {
        name: 'chassisAxleRow2WheelRightTirePressure',
        description: 'Rear right tire (kPa)',
        aggregationType: 'float',
      },
    ],
  },
  {
    category: 'Environment',
    signals: [
      {
        name: 'exteriorAirTemperature',
        description: 'Outside temperature',
        aggregationType: 'float',
      },
      {
        name: 'obdBarometricPressure',
        description: 'Barometric pressure',
        aggregationType: 'float',
      },
    ],
  },
  {
    category: 'Device/Network',
    signals: [
      {
        name: 'dimoAftermarketSSID',
        description: 'WiFi network name',
        aggregationType: 'string',
      },
      {
        name: 'dimoAftermarketWPAState',
        description: 'WiFi connection state',
        aggregationType: 'string',
      },
    ],
  },
  {
    category: 'Diagnostics',
    signals: [
      {
        name: 'obdDTCList',
        description: 'Active diagnostic codes',
        aggregationType: 'string',
      },
      {
        name: 'obdRunTime',
        description: 'Engine run time',
        aggregationType: 'float',
      },
    ],
  },
];

// Helper function to get aggregation options for a signal
export function getAggregationOptions(
  signal: TelemetrySignal
): AggregationOption[] {
  return signal.aggregationType === 'string'
    ? stringAggregationOptions
    : floatAggregationOptions;
}

// Helper function to get default aggregation for a signal
export function getDefaultAggregation(signal: TelemetrySignal): string {
  return signal.aggregationType === 'string' ? 'RAND' : 'AVG';
}

