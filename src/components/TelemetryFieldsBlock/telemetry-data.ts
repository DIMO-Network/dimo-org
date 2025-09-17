import { TelemetryField, TelemetryHint } from './index';

// Complete telemetry data transformation from your old docs

export const vehicleInfoFields: TelemetryField[] = [
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

export const locationFields: TelemetryField[] = [
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

export const locationHint: TelemetryHint = {
  type: 'warning',
  content:
    'Note that these signals require a user to have shared the <a href="../../../token-exchange-api#privilege-definitions"><strong>relevant location privileges</strong></a> with your Developer License.',
};

export const batteryFields: TelemetryField[] = [
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
  {
    signal: 'powertrainTractionBatteryGrossCapacity',
    commonName: 'Total Battery Capacity',
    aggregationType:
      '<a href="../../schema-and-types#floataggregationtype">FloatAggregation!</a>',
    units: 'kWh',
    description: 'Gross capacity of the battery.',
  },
  {
    signal: 'powertrainTractionBatteryStateOfChargeCurrent',
    commonName: 'Current Charge Level',
    aggregationType:
      '<a href="../../schema-and-types#floataggregationtype">FloatAggregation!</a>',
    units: 'percent',
    description:
      'Physical state of charge of the high voltage battery, relative to net capacity. This is not necessarily the state of charge being displayed to the customer.',
  },
  {
    signal: 'powertrainTractionBatteryStateOfChargeCurrentEnergy',
    commonName: 'Remaining Energy',
    aggregationType:
      '<a href="../../schema-and-types#floataggregationtype">FloatAggregation!</a>',
    units: 'kWh',
    description: 'Physical state of charge of the high voltage battery.',
  },
  {
    signal: 'powertrainTractionBatteryChargingAddedEnergy',
    commonName: 'Session Energy',
    aggregationType:
      '<a href="../../schema-and-types#floataggregationtype">FloatAggregation!</a>',
    units: 'kWh',
    description:
      'The amount of charge added to the battery during the current charging session.',
  },
  {
    signal: 'lowVoltageBatteryCurrentVoltage',
    commonName: 'Low Voltage Battery',
    aggregationType:
      '<a href="../../schema-and-types#floataggregationtype">FloatAggregation!</a>',
    units: 'volts',
    description: 'Current Voltage of the low voltage battery.',
  },
];

export const devicesFields: TelemetryField[] = [
  {
    signal: 'dimoAftermarketWPAState',
    commonName: 'Wifi Protected Access (WPA)',
    aggregationType:
      '<a href="../../schema-and-types#stringaggregationtype">StringAggregation!</a>',
    units: 'N/A',
    description: 'Indicate the current WPA state for the devices Wi-Fi.',
  },
  {
    signal: 'dimoAftermarketSSID',
    commonName: 'Service Set Identifier (SSID)',
    aggregationType:
      '<a href="../../schema-and-types#stringaggregationtype">StringAggregation!</a>',
    units: 'N/A',
    description: 'Service Set Identifier for the Wi-Fi.',
  },
  {
    signal: 'dimoAftermarketNSAT',
    commonName: 'Number of Satellites (NSAT)',
    aggregationType:
      '<a href="../../schema-and-types#floataggregationtype">FloatAggregation!</a>',
    units: 'N/A',
    description: 'Number of sync satellites for GPS.',
  },
  {
    signal: 'dimoAftermarketHDOP',
    commonName: 'Horizontal Dilution of Precision (HDOP)',
    aggregationType:
      '<a href="../../schema-and-types#floataggregationtype">FloatAggregation!</a>',
    units: 'N/A',
    description: 'Horizontal dilution of precision of GPS.',
  },
];

export const diagnosticsFields: TelemetryField[] = [
  {
    signal: 'obdDTCList',
    commonName: 'Diagnostic Trouble Codes',
    aggregationType:
      '<a href="../../schema-and-types#floataggregationtype">FloatAggregation!</a>',
    units: 'OBD II Standard',
    description:
      'List of currently active DTCs formatted according OBD II (SAE-J2012DA_201812) standard ([P|C|B|U]XXXXX )',
  },
  {
    signal: 'obdRunTime',
    commonName: 'Engine runtime',
    aggregationType:
      '<a href="../../schema-and-types#floataggregationtype">FloatAggregation!</a>',
    units: 'seconds',
    description: 'PID 1F - Engine run time.',
  },
  {
    signal: 'obdIntakeTemp',
    commonName: 'Intake temperature',
    aggregationType:
      '<a href="../../schema-and-types#floataggregationtype">FloatAggregation!</a>',
    units: 'degrees (ºC)',
    description: 'PID 0F - Intake temperature.',
  },
  {
    signal: 'obdEngineLoad',
    commonName: 'Engine Load',
    aggregationType:
      '<a href="../../schema-and-types#floataggregationtype">FloatAggregation!</a>',
    units: 'percentage',
    description:
      'PID 04 - Engine load in percent - 0 = no load, 100 = full load.',
  },
  {
    signal: 'obdBarometricPressure',
    commonName: 'Barometric Pressure',
    aggregationType:
      '<a href="../../schema-and-types#floataggregationtype">FloatAggregation!</a>',
    units: 'kPa',
    description: 'PID 33 - Barometric pressure.',
  },
];

export const engineFields: TelemetryField[] = [
  {
    signal: 'powertrainType',
    commonName: 'Powertrain Type',
    aggregationType:
      '<a href="../../schema-and-types#stringaggregationtype">StringAggregation!</a>',
    units: 'N/A',
    description: 'Defines the powertrain type of the vehicle.',
  },
  {
    signal: 'powertrainRange',
    commonName: 'Range (remaining)',
    aggregationType:
      '<a href="../../schema-and-types#floataggregationtype">FloatAggregation!</a>',
    units: 'kilometers',
    description:
      'Remaining range in km using all energy sources available in the vehicle.',
  },
  {
    signal: 'powertrainCombustionEngineTPS',
    commonName: 'Throttle Position',
    aggregationType:
      '<a href="../../schema-and-types#floataggregationtype">FloatAggregation!</a>',
    units: 'percent',
    description: 'Current throttle position.',
  },
  {
    signal: 'powertrainCombustionEngineSpeed',
    commonName: 'Engine RPM',
    aggregationType:
      '<a href="../../schema-and-types#floataggregationtype">FloatAggregation!</a>',
    units: 'rpm',
    description: 'Engine speed measured as rotations per minute (rpm).',
  },
  {
    signal: 'powertrainCombustionEngineMAF',
    commonName: 'Engine Air Intake',
    aggregationType:
      '<a href="../../schema-and-types#floataggregationtype">FloatAggregation!</a>',
    units: 'grams/second',
    description: 'Grams of air drawn into engine per second.',
  },
  {
    signal: 'powertrainCombustionEngineEngineOilLevel',
    commonName: 'Oil Level',
    aggregationType:
      '<a href="../../schema-and-types#stringaggregationtype">StringAggregation!</a>',
    units: 'liters',
    description: 'Engine oil level.',
  },
  {
    signal: 'powertrainCombustionEngineECT',
    commonName: 'Coolant Temperature',
    aggregationType:
      '<a href="../../schema-and-types#floataggregationtype">FloatAggregation!</a>',
    units: 'degrees (ºC)',
    description: 'Engine coolant temperature.',
  },
];

export const environmentFields: TelemetryField[] = [
  {
    signal: 'exteriorAirTemperature',
    commonName: 'Air Temperature',
    aggregationType:
      '<a href="../../schema-and-types#floataggregationtype">FloatAggregation!</a>',
    units: 'degrees (ºC)',
    description: 'Air temperature outside the vehicle.',
  },
];

export const fuelFields: TelemetryField[] = [
  {
    signal: 'powertrainFuelSystemSupportedFuelTypes',
    commonName: 'Supported Fuel Types',
    aggregationType:
      '<a href="../../schema-and-types#stringaggregationtype">StringAggregation!</a>',
    units: 'N/A',
    description: 'High level information of fuel types supported.',
  },
  {
    signal: 'powertrainFuelSystemRelativeLevel',
    commonName: 'Fuel Percentage',
    aggregationType:
      '<a href="../../schema-and-types#floataggregationtype">FloatAggregation!</a>',
    units: 'percent',
    description: 'Current available fuel in the fuel tank in %, from 0 to 100.',
  },
  {
    signal: 'powertrainFuelSystemAbsoluteLevel',
    commonName: 'Fuel Level',
    aggregationType:
      '<a href="../../schema-and-types#floataggregationtype">FloatAggregation!</a>',
    units: 'liters',
    description: 'Current available fuel in the fuel tank expressed in liters.',
  },
];

export const tirePressureFields: TelemetryField[] = [
  {
    signal: 'chassisAxleRow1WheelLeftTirePressure',
    commonName: 'Front Left Wheel',
    aggregationType:
      '<a href="../../schema-and-types#floataggregationtype">FloatAggregation!</a>',
    units: 'kPa',
    description: 'Tire pressure of the front left tire in kilo-Pascal.',
  },
  {
    signal: 'chassisAxleRow1WheelRightTirePressure',
    commonName: 'Front Right Wheel',
    aggregationType:
      '<a href="../../schema-and-types#floataggregationtype">FloatAggregation!</a>',
    units: 'kPa',
    description: 'Tire pressure of the front right tire in kilo-Pascal.',
  },
  {
    signal: 'chassisAxleRow2WheelLeftTirePressure',
    commonName: 'Back Left Wheel',
    aggregationType:
      '<a href="../../schema-and-types#floataggregationtype">FloatAggregation!</a>',
    units: 'kPa',
    description: 'Tire pressure of the rear left tire in kilo-Pascal.',
  },
  {
    signal: 'chassisAxleRow2WheelRightTirePressure',
    commonName: 'Back Right Wheel',
    aggregationType:
      '<a href="../../schema-and-types#floataggregationtype">FloatAggregation!</a>',
    units: 'kPa',
    description: 'Tire pressure of the rear right tire in kilo-Pascal.',
  },
];

export const doorsFields: TelemetryField[] = [
  {
    signal: 'cabinDoorRow1DriverSideIsOpen',
    commonName: 'Front Driver Side Door',
    aggregationType:
      '<a href="../../schema-and-types#floataggregationtype">FloatAggregation!</a>',
    units: '0 or 1',
    description:
      '<p>True (1) = Fully or partially open.</p><p>False (0) = Fully closed.</p>',
  },
  {
    signal: 'cabinDoorRow1PassengerSideIsOpen',
    commonName: 'Front Passenger Side Door',
    aggregationType:
      '<a href="../../schema-and-types#floataggregationtype">FloatAggregation!</a>',
    units: '0 or 1',
    description:
      '<p>True (1) = Fully or partially open.</p><p>False (0) = Fully closed.</p>',
  },
  {
    signal: 'cabinDoorRow2DriverSideIsOpen',
    commonName: 'Back Driver Side Door',
    aggregationType:
      '<a href="../../schema-and-types#floataggregationtype">FloatAggregation!</a>',
    units: '0 or 1',
    description:
      '<p>True (1) = Fully or partially open.</p><p>False (0) = Fully closed.</p>',
  },
  {
    signal: 'cabinDoorRow2PassengerSideIsOpen',
    commonName: 'Back Passenger Side Door',
    aggregationType:
      '<a href="../../schema-and-types#floataggregationtype">FloatAggregation!</a>',
    units: '0 or 1',
    description:
      '<p>True (1) = Fully or partially open.</p><p>False (0) = Fully closed.</p>',
  },
];

export const windowsFields: TelemetryField[] = [
  {
    signal: 'cabinDoorRow1DriverSideWindowIsOpen',
    commonName: 'Front Driver Side Window',
    aggregationType:
      '<a href="../../schema-and-types#floataggregationtype">FloatAggregation!</a>',
    units: '0 or 1',
    description:
      '<p>True (1) = Fully or partially open.</p><p>False (0) = Fully closed.</p>',
  },
  {
    signal: 'cabinDoorRow1PassengerSideWindowIsOpen',
    commonName: 'Front Passenger Side Window',
    aggregationType:
      '<a href="../../schema-and-types#floataggregationtype">FloatAggregation!</a>',
    units: '0 or 1',
    description:
      '<p>True (1) = Fully or partially open.</p><p>False (0) = Fully closed.</p>',
  },
  {
    signal: 'cabinDoorRow2DriverSideWindowIsOpen',
    commonName: 'Back Driver Side Window',
    aggregationType:
      '<a href="../../schema-and-types#floataggregationtype">FloatAggregation!</a>',
    units: '0 or 1',
    description:
      '<p>True (1) = Fully or partially open.</p><p>False (0) = Fully closed.</p>',
  },
  {
    signal: 'cabinDoorRow2PassengerSideWindowIsOpen',
    commonName: 'Back Passenger Side Window',
    aggregationType:
      '<a href="../../schema-and-types#floataggregationtype">FloatAggregation!</a>',
    units: '0 or 1',
    description:
      '<p>True (1) = Fully or partially open.</p><p>False (0) = Fully closed.</p>',
  },
];

// Complete data export for easy usage
export const allTelemetryData = {
  vehicleInfo: {
    title: 'Vehicle Info & Status',
    fields: vehicleInfoFields,
  },
  location: {
    title: 'Location',
    fields: locationFields,
    hint: locationHint,
  },
  battery: {
    title: 'Battery & Charging',
    fields: batteryFields,
  },
  devices: {
    title: 'Devices',
    fields: devicesFields,
  },
  diagnostics: {
    title: 'Diagnostics',
    fields: diagnosticsFields,
  },
  engine: {
    title: 'Engine',
    fields: engineFields,
  },
  environment: {
    title: 'Environment',
    fields: environmentFields,
  },
  fuel: {
    title: 'Fuel',
    fields: fuelFields,
  },
  tirePressure: {
    title: 'Tire Pressure',
    fields: tirePressureFields,
  },
  doors: {
    title: 'Doors',
    fields: doorsFields,
  },
  windows: {
    title: 'Windows',
    fields: windowsFields,
  },
};
