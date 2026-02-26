// Telemetry Signal Types
export type AggregationType = 'float' | 'string' | 'location';

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
        name: 'currentLocationCoordinates',
        description: 'Current location (latitude, longitude, hdop)',
        aggregationType: 'location',
      },
      {
        name: 'currentLocationApproximateCoordinates',
        description: 'Approximate location (latitude, longitude, hdop)',
        aggregationType: 'location',
      },
      {
        name: 'currentLocationAltitude',
        description: 'Current altitude',
        aggregationType: 'float',
      },
      {
        name: 'currentLocationHeading',
        description: 'Current heading (degrees)',
        aggregationType: 'float',
      },
    ],
  },
  {
    category: 'Vehicle Status',
    signals: [
      {
        name: 'speed',
        description: 'Vehicle speed (km/hr)',
        aggregationType: 'float',
      },
      {
        name: 'isIgnitionOn',
        description: 'Ignition status (0 = off, 1 = on)',
        aggregationType: 'float',
      },
      {
        name: 'powertrainTransmissionTravelledDistance',
        description: 'Odometer reading (km)',
        aggregationType: 'float',
      },
      {
        name: 'powertrainType',
        description: 'Powertrain type',
        aggregationType: 'string',
      },
      {
        name: 'powertrainRange',
        description: 'Remaining range (km)',
        aggregationType: 'float',
      },
    ],
  },
  {
    category: 'Battery & EV',
    signals: [
      {
        name: 'powertrainTractionBatteryStateOfChargeCurrent',
        description: 'Current charge level (%)',
        aggregationType: 'float',
      },
      {
        name: 'powertrainTractionBatteryStateOfChargeCurrentEnergy',
        description: 'Remaining energy (kWh)',
        aggregationType: 'float',
      },
      {
        name: 'powertrainTractionBatteryChargingIsCharging',
        description: 'Charging status (0 = not charging, 1 = charging)',
        aggregationType: 'string',
      },
      {
        name: 'powertrainTractionBatteryChargingChargeLimit',
        description: 'Charge limit (%)',
        aggregationType: 'float',
      },
      {
        name: 'powertrainTractionBatteryCurrentPower',
        description: 'Battery power (W, + = charging, - = discharging)',
        aggregationType: 'float',
      },
      {
        name: 'powertrainTractionBatteryGrossCapacity',
        description: 'Total battery capacity (kWh)',
        aggregationType: 'float',
      },
      {
        name: 'powertrainTractionBatteryChargingAddedEnergy',
        description: 'Session energy added (kWh)',
        aggregationType: 'float',
      },
      {
        name: 'powertrainTractionBatteryChargingChargeVoltageUnknownType',
        description: 'Charging voltage (V)',
        aggregationType: 'float',
      },
      {
        name: 'lowVoltageBatteryCurrentVoltage',
        description: 'Low voltage battery (V)',
        aggregationType: 'float',
      },
    ],
  },
  {
    category: 'Fuel',
    signals: [
      {
        name: 'powertrainFuelSystemRelativeLevel',
        description: 'Fuel percentage (%)',
        aggregationType: 'float',
      },
      {
        name: 'powertrainFuelSystemAbsoluteLevel',
        description: 'Fuel level (liters)',
        aggregationType: 'float',
      },
      {
        name: 'powertrainFuelSystemSupportedFuelTypes',
        description: 'Supported fuel types',
        aggregationType: 'string',
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
        description: 'Coolant temperature (°C)',
        aggregationType: 'float',
      },
      {
        name: 'powertrainCombustionEngineEngineOilLevel',
        description: 'Oil level (liters)',
        aggregationType: 'string',
      },
      {
        name: 'powertrainCombustionEngineTPS',
        description: 'Throttle position (%)',
        aggregationType: 'float',
      },
      {
        name: 'powertrainCombustionEngineMAF',
        description: 'Air intake (g/s)',
        aggregationType: 'float',
      },
      {
        name: 'obdEngineLoad',
        description: 'Engine load (%)',
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
        description: 'Air temperature (°C)',
        aggregationType: 'float',
      },
      {
        name: 'obdBarometricPressure',
        description: 'Barometric pressure (kPa)',
        aggregationType: 'float',
      },
    ],
  },
  {
    category: 'Doors',
    signals: [
      {
        name: 'cabinDoorRow1DriverSideIsOpen',
        description: 'Front driver door (0 = closed, 1 = open)',
        aggregationType: 'float',
      },
      {
        name: 'cabinDoorRow1PassengerSideIsOpen',
        description: 'Front passenger door (0 = closed, 1 = open)',
        aggregationType: 'float',
      },
      {
        name: 'cabinDoorRow2DriverSideIsOpen',
        description: 'Back driver door (0 = closed, 1 = open)',
        aggregationType: 'float',
      },
      {
        name: 'cabinDoorRow2PassengerSideIsOpen',
        description: 'Back passenger door (0 = closed, 1 = open)',
        aggregationType: 'float',
      },
    ],
  },
  {
    category: 'Windows',
    signals: [
      {
        name: 'cabinDoorRow1DriverSideWindowIsOpen',
        description: 'Front driver window (0 = closed, 1 = open)',
        aggregationType: 'float',
      },
      {
        name: 'cabinDoorRow1PassengerSideWindowIsOpen',
        description: 'Front passenger window (0 = closed, 1 = open)',
        aggregationType: 'float',
      },
      {
        name: 'cabinDoorRow2DriverSideWindowIsOpen',
        description: 'Back driver window (0 = closed, 1 = open)',
        aggregationType: 'float',
      },
      {
        name: 'cabinDoorRow2PassengerSideWindowIsOpen',
        description: 'Back passenger window (0 = closed, 1 = open)',
        aggregationType: 'float',
      },
    ],
  },
  {
    category: 'Diagnostics',
    signals: [
      {
        name: 'obdDTCList',
        description: 'Diagnostic trouble codes',
        aggregationType: 'string',
      },
      {
        name: 'obdRunTime',
        description: 'Engine runtime (seconds)',
        aggregationType: 'float',
      },
      {
        name: 'obdIntakeTemp',
        description: 'Intake temperature (°C)',
        aggregationType: 'float',
      },
    ],
  },
];

// Location uses same aggregation options as float
export const locationAggregationOptions = floatAggregationOptions;

// Helper function to get aggregation options for a signal
export function getAggregationOptions(
  signal: TelemetrySignal
): AggregationOption[] {
  if (signal.aggregationType === 'string') return stringAggregationOptions;
  if (signal.aggregationType === 'location') return locationAggregationOptions;
  return floatAggregationOptions;
}

// Helper function to get default aggregation for a signal
export function getDefaultAggregation(signal: TelemetrySignal): string {
  if (signal.aggregationType === 'string') return 'RAND';
  return 'AVG';
}
