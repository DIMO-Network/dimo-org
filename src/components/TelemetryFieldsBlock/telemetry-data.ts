import { TelemetryField, TelemetryHint } from './index';

// Complete telemetry data transformation from your old docs

export const vehicleInfoFields: TelemetryField[] = [
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
      'Returns a list of queryable signal names that have stored data for a given <code>tokenId</code>.',
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
  {
    signal: 'angularVelocityYaw',
    commonName: 'Yaw Rate',
    aggregationType: 'FloatAggregation!',
    units: 'degrees/s',
    description: 'Vehicle rotation rate along the vertical (Z) axis.',
  },
  {
    signal: 'bodyLightsIsAirbagWarningOn',
    commonName: 'Airbag Warning',
    aggregationType: 'FloatAggregation!',
    units: '0 or 1',
    description:
      '<p>Indicates whether the airbag/SRS warning telltale is active.</p><p>True (1) = Warning active<br>False (0) = Warning inactive</p>',
  },
  {
    signal: 'bodyLockIsLocked',
    commonName: 'Central Lock Status',
    aggregationType: 'FloatAggregation!',
    units: '0 or 1',
    description:
      '<p>Central locking status of the vehicle.</p><p>True (1) = Locked<br>False (0) = Unlocked</p>',
  },
  {
    signal: 'bodyTrunkFrontIsOpen',
    commonName: 'Front Trunk / Frunk',
    aggregationType: 'FloatAggregation!',
    units: '0 or 1',
    description:
      '<p>Front trunk (frunk) open/closed status.</p><p>True (1) = Open<br>False (0) = Closed</p>',
  },
  {
    signal: 'bodyTrunkRearIsOpen',
    commonName: 'Rear Trunk',
    aggregationType: 'FloatAggregation!',
    units: '0 or 1',
    description:
      '<p>Rear trunk open/closed status.</p><p>True (1) = Open<br>False (0) = Closed</p>',
  },
];

export const locationFields: TelemetryField[] = [
  {
    signal: 'currentLocationCoordinates',
    commonName: 'Coordinates',
    aggregationType: 'LocationAggregation!',
    units: 'WGS 84 coordinates',
    description:
      'Current location of the vehicle in WGS 84 coordinates, as measured at the position of GNSS receiver antenna.',
  },
  {
    signal: 'currentLocationLatitude',
    commonName: 'Latitude Location',
    aggregationType: 'FloatAggregation!',
    units: 'degrees',
    description:
      'Current latitude of vehicle in WGS 84 geodetic coordinates, as measured at the position of GNSS receiver antenna.',
  },
  {
    signal: 'currentLocationLongitude',
    commonName: 'Longitude Location',
    aggregationType: 'FloatAggregation!',
    units: 'degrees',
    description:
      'Current longitude of vehicle in WGS 84 geodetic coordinates, as measured at the position of GNSS receiver antenna.',
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
  {
    signal: 'currentLocationApproximateLatitude',
    commonName: 'Approximate Latitude Location',
    aggregationType: 'FloatAggregation!',
    units: 'degrees',
    description:
      'Approximation of current latitude of vehicle in WGS 84 geodetic coordinates, as measured at the position of GNSS receiver antenna.',
  },
  {
    signal: 'currentLocationApproximateLongitude',
    commonName: 'Approximate Longitude Location',
    aggregationType: 'FloatAggregation!',
    units: 'degrees',
    description:
      'Approximation of current longitude of vehicle in WGS 84 geodetic coordinates, as measured at the position of GNSS receiver antenna.',
  },
  {
    signal: 'currentLocationIsRedacted',
    commonName: 'Location Privacy Zones',
    aggregationType: 'FloatAggregation!',
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
    aggregationType: 'FloatAggregation!',
    units: '0 or 1',
    description:
      'True if charging is ongoing. Charging is considered to be ongoing if energy is flowing from charger to vehicle.<br>True (1) - Vehicle is charging.<br>False (0) - Vehicle is not charging.',
  },
  {
    signal: 'powertrainTractionBatteryChargingIsChargingCableConnected',
    commonName: 'Charging Cable Connected',
    aggregationType: 'FloatAggregation!',
    units: '0 or 1',
    description:
      '<p>Indicates whether a charging cable is connected to the vehicle.</p><p>True (1) = Cable connected<br>False (0) = Cable not connected</p>',
  },
  {
    signal: 'powertrainTractionBatteryChargingPower',
    commonName: 'Charging Power',
    aggregationType: 'FloatAggregation!',
    units: 'kW',
    description: 'Current charging power delivered to the traction battery.',
  },
  {
    signal: 'powertrainTractionBatteryCurrentPower',
    commonName: 'Battery Power',
    aggregationType: 'FloatAggregation!',
    units: 'watts',
    description:
      'Current electrical energy flowing in/out of battery. Positive = Energy flowing in to battery, e.g. during charging. Negative = Energy flowing out of battery, e.g. during driving.',
  },
  {
    signal: 'powertrainTractionBatteryCurrentVoltage',
    commonName: 'Battery Voltage',
    aggregationType: 'FloatAggregation!',
    units: 'volts',
    description: 'Current voltage of the traction battery pack.',
  },
  {
    signal: 'powertrainTractionBatteryGrossCapacity',
    commonName: 'Total Battery Capacity',
    aggregationType: 'FloatAggregation!',
    units: 'kWh',
    description: 'Gross capacity of the battery.',
  },
  {
    signal: 'powertrainTractionBatteryRange',
    commonName: 'Battery Range',
    aggregationType: 'FloatAggregation!',
    units: 'km',
    description: 'Remaining range in km based on current battery state of charge.',
  },
  {
    signal: 'powertrainTractionBatteryStateOfChargeCurrent',
    commonName: 'Current Charge Level',
    aggregationType: 'FloatAggregation!',
    units: 'percent',
    description:
      'Physical state of charge of the high voltage battery, relative to net capacity. This is not necessarily the state of charge being displayed to the customer.',
  },
  {
    signal: 'powertrainTractionBatteryStateOfChargeCurrentEnergy',
    commonName: 'Remaining Energy',
    aggregationType: 'FloatAggregation!',
    units: 'kWh',
    description: 'Physical state of charge of the high voltage battery.',
  },
  {
    signal: 'powertrainTractionBatteryStateOfHealth',
    commonName: 'Battery State of Health',
    aggregationType: 'FloatAggregation!',
    units: 'percent',
    description:
      'Indicates the battery health as a percentage of the original rated capacity (0–100%).',
  },
  {
    signal: 'powertrainTractionBatteryTemperatureAverage',
    commonName: 'Battery Temperature',
    aggregationType: 'FloatAggregation!',
    units: 'celsius',
    description: 'Average temperature of the traction battery pack.',
  },
  {
    signal: 'powertrainTractionBatteryChargingAddedEnergy',
    commonName: 'Session Energy',
    aggregationType: 'FloatAggregation!',
    units: 'kWh',
    description:
      'The amount of charge added to the battery during the current charging session.',
  },
  {
    signal: 'lowVoltageBatteryCurrentVoltage',
    commonName: 'Low Voltage Battery',
    aggregationType: 'FloatAggregation!',
    units: 'volts',
    description: 'Current Voltage of the low voltage battery.',
  },
];

export const devicesFields: TelemetryField[] = [
  {
    signal: 'dimoAftermarketWPAState',
    commonName: 'Wifi Protected Access (WPA)',
    aggregationType: 'StringAggregation!',
    units: 'N/A',
    description: 'Indicate the current WPA state for the devices Wi-Fi.',
  },
  {
    signal: 'dimoAftermarketSSID',
    commonName: 'Service Set Identifier (SSID)',
    aggregationType: 'StringAggregation!',
    units: 'N/A',
    description: 'Service Set Identifier for the Wi-Fi.',
  },
  {
    signal: 'dimoAftermarketNSAT',
    commonName: 'Number of Satellites (NSAT)',
    aggregationType: 'FloatAggregation!',
    units: 'N/A',
    description: 'Number of sync satellites for GPS.',
  },
  {
    signal: 'dimoAftermarketHDOP',
    commonName: 'Horizontal Dilution of Precision (HDOP)',
    aggregationType: 'FloatAggregation!',
    units: 'N/A',
    description: 'Horizontal dilution of precision of GPS.',
  },
];

export const diagnosticsFields: TelemetryField[] = [
  {
    signal: 'obdDTCList',
    commonName: 'Diagnostic Trouble Codes',
    aggregationType: 'StringAggregation!',
    units: 'OBD II Standard',
    description:
      'List of currently active DTCs formatted according OBD II (SAE-J2012DA_201812) standard ([P|C|B|U]XXXXX )',
  },
  {
    signal: 'obdStatusDTCCount',
    commonName: 'DTC Count',
    aggregationType: 'FloatAggregation!',
    units: 'N/A',
    description: 'Number of currently active Diagnostic Trouble Codes.',
  },
  {
    signal: 'obdRunTime',
    commonName: 'Engine runtime',
    aggregationType: 'FloatAggregation!',
    units: 'seconds',
    description: 'PID 1F - Engine run time.',
  },
  {
    signal: 'obdIntakeTemp',
    commonName: 'Intake temperature',
    aggregationType: 'FloatAggregation!',
    units: 'degrees (ºC)',
    description: 'PID 0F - Intake temperature.',
  },
  {
    signal: 'obdEngineLoad',
    commonName: 'Engine Load',
    aggregationType: 'FloatAggregation!',
    units: 'percentage',
    description:
      'PID 04 - Engine load in percent - 0 = no load, 100 = full load.',
  },
  {
    signal: 'obdBarometricPressure',
    commonName: 'Barometric Pressure',
    aggregationType: 'FloatAggregation!',
    units: 'kPa',
    description: 'PID 33 - Barometric pressure.',
  },
  {
    signal: 'obdMAP',
    commonName: 'Manifold Absolute Pressure',
    aggregationType: 'FloatAggregation!',
    units: 'kPa',
    description: 'PID 0B - Manifold absolute pressure.',
  },
  {
    signal: 'obdFuelPressure',
    commonName: 'Fuel Pressure',
    aggregationType: 'FloatAggregation!',
    units: 'kPa',
    description: 'PID 0A - Fuel pressure.',
  },
  {
    signal: 'obdFuelRate',
    commonName: 'Fuel Rate',
    aggregationType: 'FloatAggregation!',
    units: 'l/h',
    description: 'PID 5E - Engine fuel rate.',
  },
  {
    signal: 'obdFuelTypeName',
    commonName: 'Fuel Type',
    aggregationType: 'StringAggregation!',
    units: 'N/A',
    description: 'PID 51 decoded - fuel type name (e.g. Gasoline, Diesel, Electric).',
  },
  {
    signal: 'obdOilTemperature',
    commonName: 'Oil Temperature',
    aggregationType: 'FloatAggregation!',
    units: 'degrees (ºC)',
    description: 'PID 5C - Engine oil temperature.',
  },
  {
    signal: 'obdCommandedEGR',
    commonName: 'Commanded EGR',
    aggregationType: 'FloatAggregation!',
    units: 'percent',
    description: 'PID 2C - Commanded Exhaust Gas Recirculation (EGR) percentage.',
  },
  {
    signal: 'obdCommandedEVAP',
    commonName: 'Commanded EVAP Purge',
    aggregationType: 'FloatAggregation!',
    units: 'percent',
    description: 'PID 2E - Commanded evaporative purge percentage.',
  },
  {
    signal: 'obdShortTermFuelTrim1',
    commonName: 'Short Term Fuel Trim (Bank 1)',
    aggregationType: 'FloatAggregation!',
    units: 'percent',
    description: 'PID 06 - Short term fuel trim for bank 1.',
  },
  {
    signal: 'obdLongTermFuelTrim1',
    commonName: 'Long Term Fuel Trim (Bank 1)',
    aggregationType: 'FloatAggregation!',
    units: 'percent',
    description: 'PID 07 - Long term fuel trim for bank 1.',
  },
  {
    signal: 'obdO2WRSensor1Voltage',
    commonName: 'O2 Sensor 1 Voltage',
    aggregationType: 'FloatAggregation!',
    units: 'volts',
    description: 'Wide-range oxygen sensor 1 voltage.',
  },
  {
    signal: 'obdO2WRSensor2Voltage',
    commonName: 'O2 Sensor 2 Voltage',
    aggregationType: 'FloatAggregation!',
    units: 'volts',
    description: 'Wide-range oxygen sensor 2 voltage.',
  },
  {
    signal: 'obdDistanceSinceDTCClear',
    commonName: 'Distance Since DTC Clear',
    aggregationType: 'FloatAggregation!',
    units: 'km',
    description: 'PID 31 - Distance travelled since diagnostic trouble codes were last cleared.',
  },
  {
    signal: 'obdDistanceWithMIL',
    commonName: 'Distance with MIL On',
    aggregationType: 'FloatAggregation!',
    units: 'km',
    description: 'PID 21 - Distance travelled with Malfunction Indicator Lamp (MIL) on.',
  },
  {
    signal: 'obdWarmupsSinceDTCClear',
    commonName: 'Warmups Since DTC Clear',
    aggregationType: 'FloatAggregation!',
    units: 'N/A',
    description: 'PID 30 - Number of warm-up cycles since diagnostic trouble codes were cleared.',
  },
  {
    signal: 'obdIsEngineBlocked',
    commonName: 'Engine Blocked',
    aggregationType: 'FloatAggregation!',
    units: '0 or 1',
    description:
      '<p>Indicates whether the engine is blocked.</p><p>True (1) = Engine blocked<br>False (0) = Engine not blocked</p>',
  },
  {
    signal: 'obdIsPTOActive',
    commonName: 'PTO Active',
    aggregationType: 'FloatAggregation!',
    units: '0 or 1',
    description:
      'PID 1E - Indicates whether the Power Take-Off (PTO) is active.<br>True (1) = PTO active<br>False (0) = PTO inactive',
  },
  {
    signal: 'obdIsPluggedIn',
    commonName: 'OBD Device Plugged In',
    aggregationType: 'FloatAggregation!',
    units: '0 or 1',
    description:
      '<p>Indicates whether the aftermarket OBD device is plugged in.</p><p>True (1) = Plugged in<br>False (0) = Not plugged in</p>',
  },
];

export const engineFields: TelemetryField[] = [
  {
    signal: 'powertrainType',
    commonName: 'Powertrain Type',
    aggregationType: 'StringAggregation!',
    units: 'N/A',
    description: 'Defines the powertrain type of the vehicle.',
  },
  {
    signal: 'powertrainRange',
    commonName: 'Range (remaining)',
    aggregationType: 'FloatAggregation!',
    units: 'kilometers',
    description:
      'Remaining range in km using all energy sources available in the vehicle.',
  },
  {
    signal: 'powertrainCombustionEngineTPS',
    commonName: 'Throttle Position',
    aggregationType: 'FloatAggregation!',
    units: 'percent',
    description: 'Current throttle position.',
  },
  {
    signal: 'powertrainCombustionEngineSpeed',
    commonName: 'Engine RPM',
    aggregationType: 'FloatAggregation!',
    units: 'rpm',
    description: 'Engine speed measured as rotations per minute (rpm).',
  },
  {
    signal: 'powertrainCombustionEngineMAF',
    commonName: 'Engine Air Intake',
    aggregationType: 'FloatAggregation!',
    units: 'grams/second',
    description: 'Grams of air drawn into engine per second.',
  },
  {
    signal: 'powertrainCombustionEngineTorque',
    commonName: 'Engine Torque',
    aggregationType: 'FloatAggregation!',
    units: 'Nm',
    description: 'Current engine torque output.',
  },
  {
    signal: 'powertrainCombustionEngineTorquePercent',
    commonName: 'Engine Torque Percent',
    aggregationType: 'FloatAggregation!',
    units: 'percent',
    description: 'Engine torque as a percentage of maximum torque.',
  },
  {
    signal: 'powertrainCombustionEngineEngineOilLevel',
    commonName: 'Oil Level',
    aggregationType: 'StringAggregation!',
    units: 'liters',
    description: 'Engine oil level.',
  },
  {
    signal: 'powertrainCombustionEngineEngineOilRelativeLevel',
    commonName: 'Oil Level (Relative)',
    aggregationType: 'FloatAggregation!',
    units: 'percent',
    description: 'Engine oil level as a percentage of the recommended full level (0–100%).',
  },
  {
    signal: 'powertrainCombustionEngineECT',
    commonName: 'Coolant Temperature',
    aggregationType: 'FloatAggregation!',
    units: 'degrees (ºC)',
    description: 'Engine coolant temperature.',
  },
  {
    signal: 'powertrainCombustionEngineEOP',
    commonName: 'Engine Oil Pressure',
    aggregationType: 'FloatAggregation!',
    units: 'kPa',
    description: 'Engine oil pressure.',
  },
  {
    signal: 'powertrainCombustionEngineEOT',
    commonName: 'Engine Oil Temperature',
    aggregationType: 'FloatAggregation!',
    units: 'degrees (ºC)',
    description: 'Engine oil temperature.',
  },
  {
    signal: 'powertrainCombustionEngineDieselExhaustFluidLevel',
    commonName: 'DEF Level',
    aggregationType: 'FloatAggregation!',
    units: 'percent',
    description: 'Diesel Exhaust Fluid (DEF/AdBlue) level as a percentage of tank capacity (0–100%).',
  },
  {
    signal: 'powertrainCombustionEngineDieselExhaustFluidCapacity',
    commonName: 'DEF Tank Capacity',
    aggregationType: 'FloatAggregation!',
    units: 'liters',
    description: 'Total capacity of the Diesel Exhaust Fluid (DEF/AdBlue) tank.',
  },
];

export const environmentFields: TelemetryField[] = [
  {
    signal: 'exteriorAirTemperature',
    commonName: 'Air Temperature',
    aggregationType: 'FloatAggregation!',
    units: 'degrees (ºC)',
    description: 'Air temperature outside the vehicle.',
  },
];

export const fuelFields: TelemetryField[] = [
  {
    signal: 'powertrainFuelSystemSupportedFuelTypes',
    commonName: 'Supported Fuel Types',
    aggregationType: 'StringAggregation!',
    units: 'N/A',
    description: 'High level information of fuel types supported.',
  },
  {
    signal: 'powertrainFuelSystemRelativeLevel',
    commonName: 'Fuel Percentage',
    aggregationType: 'FloatAggregation!',
    units: 'percent',
    description: 'Current available fuel in the fuel tank in %, from 0 to 100.',
  },
  {
    signal: 'powertrainFuelSystemAbsoluteLevel',
    commonName: 'Fuel Level',
    aggregationType: 'FloatAggregation!',
    units: 'liters',
    description: 'Current available fuel in the fuel tank expressed in liters.',
  },
  {
    signal: 'powertrainFuelSystemAccumulatedConsumption',
    commonName: 'Accumulated Fuel Consumption',
    aggregationType: 'FloatAggregation!',
    units: 'liters',
    description: 'Total accumulated fuel consumed over the lifetime of the vehicle.',
  },
];

export const transmissionFields: TelemetryField[] = [
  {
    signal: 'powertrainTransmissionCurrentGear',
    commonName: 'Current Gear',
    aggregationType: 'FloatAggregation!',
    units: 'N/A',
    description: 'The current engaged gear of the transmission. Negative values may indicate reverse.',
  },
  {
    signal: 'powertrainTransmissionSelectedGear',
    commonName: 'Selected Gear',
    aggregationType: 'FloatAggregation!',
    units: 'N/A',
    description: 'The gear selected by the driver (e.g. via shifter position).',
  },
  {
    signal: 'powertrainTransmissionTemperature',
    commonName: 'Transmission Temperature',
    aggregationType: 'FloatAggregation!',
    units: 'degrees (ºC)',
    description: 'Current temperature of the transmission fluid.',
  },
  {
    signal: 'powertrainTransmissionIsClutchSwitchOperated',
    commonName: 'Clutch Switch',
    aggregationType: 'FloatAggregation!',
    units: '0 or 1',
    description:
      '<p>Indicates whether the clutch switch is currently operated (pressed).</p><p>True (1) = Clutch pressed<br>False (0) = Clutch released</p>',
  },
  {
    signal: 'powertrainTransmissionRetarderActualTorque',
    commonName: 'Retarder Torque',
    aggregationType: 'FloatAggregation!',
    units: 'percent',
    description: 'Actual torque of the transmission retarder as a percentage of maximum.',
  },
  {
    signal: 'powertrainTransmissionRetarderTorqueMode',
    commonName: 'Retarder Torque Mode',
    aggregationType: 'StringAggregation!',
    units: 'N/A',
    description: 'The active torque mode of the transmission retarder.',
  },
];

export const tirePressureFields: TelemetryField[] = [
  {
    signal: 'chassisAxleRow1WheelLeftTirePressure',
    commonName: 'Front Left Wheel',
    aggregationType: 'FloatAggregation!',
    units: 'kPa',
    description: 'Tire pressure of the front left tire in kilo-Pascal.',
  },
  {
    signal: 'chassisAxleRow1WheelRightTirePressure',
    commonName: 'Front Right Wheel',
    aggregationType: 'FloatAggregation!',
    units: 'kPa',
    description: 'Tire pressure of the front right tire in kilo-Pascal.',
  },
  {
    signal: 'chassisAxleRow2WheelLeftTirePressure',
    commonName: 'Back Left Wheel',
    aggregationType: 'FloatAggregation!',
    units: 'kPa',
    description: 'Tire pressure of the rear left tire in kilo-Pascal.',
  },
  {
    signal: 'chassisAxleRow2WheelRightTirePressure',
    commonName: 'Back Right Wheel',
    aggregationType: 'FloatAggregation!',
    units: 'kPa',
    description: 'Tire pressure of the rear right tire in kilo-Pascal.',
  },
  {
    signal: 'chassisAxleRow1WheelLeftSpeed',
    commonName: 'Front Left Wheel Speed',
    aggregationType: 'FloatAggregation!',
    units: 'km/h',
    description: 'Rotational speed of the front left wheel.',
  },
  {
    signal: 'chassisAxleRow1WheelRightSpeed',
    commonName: 'Front Right Wheel Speed',
    aggregationType: 'FloatAggregation!',
    units: 'km/h',
    description: 'Rotational speed of the front right wheel.',
  },
  {
    signal: 'chassisTireSystemIsWarningOn',
    commonName: 'Tire Pressure Warning (TPMS)',
    aggregationType: 'FloatAggregation!',
    units: '0 or 1',
    description:
      '<p>Indicates whether the Tire Pressure Monitoring System (TPMS) warning is active.</p><p>True (1) = Warning active<br>False (0) = Warning inactive</p>',
  },
];

export const brakesFields: TelemetryField[] = [
  {
    signal: 'chassisBrakeIsPedalPressed',
    commonName: 'Brake Pedal Pressed',
    aggregationType: 'FloatAggregation!',
    units: '0 or 1',
    description:
      '<p>Indicates whether the brake pedal is currently pressed.</p><p>True (1) = Pedal pressed<br>False (0) = Pedal released</p>',
  },
  {
    signal: 'chassisBrakePedalPosition',
    commonName: 'Brake Pedal Position',
    aggregationType: 'FloatAggregation!',
    units: 'percent',
    description: 'Brake pedal position as a percentage of maximum travel (0–100%).',
  },
  {
    signal: 'chassisParkingBrakeIsEngaged',
    commonName: 'Parking Brake',
    aggregationType: 'FloatAggregation!',
    units: '0 or 1',
    description:
      '<p>Indicates whether the parking brake is engaged.</p><p>True (1) = Engaged<br>False (0) = Released</p>',
  },
  {
    signal: 'chassisBrakeABSIsWarningOn',
    commonName: 'ABS Warning',
    aggregationType: 'FloatAggregation!',
    units: '0 or 1',
    description:
      '<p>Indicates whether the Anti-lock Braking System (ABS) warning telltale is active.</p><p>True (1) = Warning active<br>False (0) = Warning inactive</p>',
  },
  {
    signal: 'chassisBrakeCircuit1PressurePrimary',
    commonName: 'Brake Circuit 1 Pressure',
    aggregationType: 'FloatAggregation!',
    units: 'kPa',
    description: 'Primary pressure in brake circuit 1.',
  },
  {
    signal: 'chassisBrakeCircuit2PressurePrimary',
    commonName: 'Brake Circuit 2 Pressure',
    aggregationType: 'FloatAggregation!',
    units: 'kPa',
    description: 'Primary pressure in brake circuit 2.',
  },
];

export const seatsFields: TelemetryField[] = [
  {
    signal: 'cabinSeatRow1DriverSideIsBelted',
    commonName: 'Front Driver Seatbelt',
    aggregationType: 'FloatAggregation!',
    units: '0 or 1',
    description:
      '<p>True (1) = Seatbelt fastened.</p><p>False (0) = Seatbelt unfastened.</p>',
  },
  {
    signal: 'cabinSeatRow1PassengerSideIsBelted',
    commonName: 'Front Passenger Seatbelt',
    aggregationType: 'FloatAggregation!',
    units: '0 or 1',
    description:
      '<p>True (1) = Seatbelt fastened.</p><p>False (0) = Seatbelt unfastened.</p>',
  },
  {
    signal: 'cabinSeatRow2DriverSideIsBelted',
    commonName: 'Rear Driver Side Seatbelt',
    aggregationType: 'FloatAggregation!',
    units: '0 or 1',
    description:
      '<p>True (1) = Seatbelt fastened.</p><p>False (0) = Seatbelt unfastened.</p>',
  },
  {
    signal: 'cabinSeatRow2MiddleIsBelted',
    commonName: 'Rear Middle Seatbelt',
    aggregationType: 'FloatAggregation!',
    units: '0 or 1',
    description:
      '<p>True (1) = Seatbelt fastened.</p><p>False (0) = Seatbelt unfastened.</p>',
  },
  {
    signal: 'cabinSeatRow2PassengerSideIsBelted',
    commonName: 'Rear Passenger Side Seatbelt',
    aggregationType: 'FloatAggregation!',
    units: '0 or 1',
    description:
      '<p>True (1) = Seatbelt fastened.</p><p>False (0) = Seatbelt unfastened.</p>',
  },
  {
    signal: 'cabinSeatRow3DriverSideIsBelted',
    commonName: 'Third Row Driver Side Seatbelt',
    aggregationType: 'FloatAggregation!',
    units: '0 or 1',
    description:
      '<p>True (1) = Seatbelt fastened.</p><p>False (0) = Seatbelt unfastened.</p>',
  },
  {
    signal: 'cabinSeatRow3PassengerSideIsBelted',
    commonName: 'Third Row Passenger Side Seatbelt',
    aggregationType: 'FloatAggregation!',
    units: '0 or 1',
    description:
      '<p>True (1) = Seatbelt fastened.</p><p>False (0) = Seatbelt unfastened.</p>',
  },
];

export const doorsFields: TelemetryField[] = [
  {
    signal: 'cabinDoorRow1DriverSideIsOpen',
    commonName: 'Front Driver Side Door',
    aggregationType: 'FloatAggregation!',
    units: '0 or 1',
    description:
      '<p>True (1) = Fully or partially open.</p><p>False (0) = Fully closed.</p>',
  },
  {
    signal: 'cabinDoorRow1PassengerSideIsOpen',
    commonName: 'Front Passenger Side Door',
    aggregationType: 'FloatAggregation!',
    units: '0 or 1',
    description:
      '<p>True (1) = Fully or partially open.</p><p>False (0) = Fully closed.</p>',
  },
  {
    signal: 'cabinDoorRow2DriverSideIsOpen',
    commonName: 'Back Driver Side Door',
    aggregationType: 'FloatAggregation!',
    units: '0 or 1',
    description:
      '<p>True (1) = Fully or partially open.</p><p>False (0) = Fully closed.</p>',
  },
  {
    signal: 'cabinDoorRow2PassengerSideIsOpen',
    commonName: 'Back Passenger Side Door',
    aggregationType: 'FloatAggregation!',
    units: '0 or 1',
    description:
      '<p>True (1) = Fully or partially open.</p><p>False (0) = Fully closed.</p>',
  },
];

export const windowsFields: TelemetryField[] = [
  {
    signal: 'cabinDoorRow1DriverSideWindowIsOpen',
    commonName: 'Front Driver Side Window',
    aggregationType: 'FloatAggregation!',
    units: '0 or 1',
    description:
      '<p>True (1) = Fully or partially open.</p><p>False (0) = Fully closed.</p>',
  },
  {
    signal: 'cabinDoorRow1PassengerSideWindowIsOpen',
    commonName: 'Front Passenger Side Window',
    aggregationType: 'FloatAggregation!',
    units: '0 or 1',
    description:
      '<p>True (1) = Fully or partially open.</p><p>False (0) = Fully closed.</p>',
  },
  {
    signal: 'cabinDoorRow2DriverSideWindowIsOpen',
    commonName: 'Back Driver Side Window',
    aggregationType: 'FloatAggregation!',
    units: '0 or 1',
    description:
      '<p>True (1) = Fully or partially open.</p><p>False (0) = Fully closed.</p>',
  },
  {
    signal: 'cabinDoorRow2PassengerSideWindowIsOpen',
    commonName: 'Back Passenger Side Window',
    aggregationType: 'FloatAggregation!',
    units: '0 or 1',
    description:
      '<p>True (1) = Fully or partially open.</p><p>False (0) = Fully closed.</p>',
  },
];

export const serviceFields: TelemetryField[] = [
  {
    signal: 'serviceDistanceToService',
    commonName: 'Distance to Service',
    aggregationType: 'FloatAggregation!',
    units: 'km',
    description: 'Distance remaining until the next scheduled vehicle service.',
  },
  {
    signal: 'serviceTimeToService',
    commonName: 'Time to Service',
    aggregationType: 'FloatAggregation!',
    units: 'seconds',
    description: 'Time remaining until the next scheduled vehicle service.',
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
  transmission: {
    title: 'Transmission',
    fields: transmissionFields,
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
    title: 'Tires & Wheels',
    fields: tirePressureFields,
  },
  brakes: {
    title: 'Brakes',
    fields: brakesFields,
  },
  seats: {
    title: 'Seatbelts',
    fields: seatsFields,
  },
  doors: {
    title: 'Doors',
    fields: doorsFields,
  },
  windows: {
    title: 'Windows',
    fields: windowsFields,
  },
  service: {
    title: 'Service',
    fields: serviceFields,
  },
};
