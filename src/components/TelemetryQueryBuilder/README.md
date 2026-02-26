# Telemetry Query Builder

An interactive GraphQL query builder for the DIMO Telemetry API. Users can
authenticate, select telemetry signals, configure aggregations, and execute
queries directly - all within the browser.

## Features

### Full Authentication Flow

- Input fields for developer credentials (Client ID, Redirect URI, API Key,
  Vehicle Token ID)
- Vehicle JWT generation (note: requires backend proxy due to CORS)
- Manual JWT input for users with existing JWTs
- 10-minute expiration timer with countdown display
- Visual warning when JWT is about to expire

### Dual Query Modes

**signalsLatest**

- Query current/latest values for each signal
- No aggregation needed
- Perfect for real-time dashboards

**signals**

- Historical time series data
- Customizable date range (from/to)
- Interval selection (1h, 6h, 12h, 24h, 168h)
- Per-signal aggregation selection (AVG, MAX, MIN, etc.)

### Signal Selection

- 8 categories of telemetry signals organized by type
- 40+ available signals covering location, vehicle status, battery, engine, etc.
- Multi-select interface with visual feedback
- Per-signal aggregation dropdowns (for historical queries)
- Automatic detection of string vs float aggregation types

### Query Execution

- Real-time query generation as signals are selected
- Copy to clipboard functionality
- Direct execution against Telemetry API
- Formatted JSON results display
- Error handling and user-friendly error messages

## Architecture

### Data Structure (`signals.ts`)

Organized into signal categories with metadata:

```typescript
export const telemetrySignals: SignalCategory[] = [
  {
    category: 'Location',
    signals: [
      {
        name: 'currentLocationCoordinates',
        description: 'Current location (latitude, longitude, hdop)',
        aggregationType: 'location',
      },
      // ...more signals
    ],
  },
  // ...more categories
];
```

Each signal has:

- `name`: GraphQL field name
- `description`: Human-readable description
- `aggregationType`: 'float' or 'string' (determines available aggregations)

### Component State

The component manages several state groups:

**Authentication:**

- `authData`: User credentials
- `vehicleJWT`: Generated or manually entered JWT
- `jwtTimer`: Countdown timer in seconds
- `authLoading`, `authError`: Loading and error states

**Query Configuration:**

- `queryType`: 'signals' or 'signalsLatest'
- `selectedSignals`: Object mapping signal names to boolean (selected/not)
- `signalAggregations`: Object mapping signal names to aggregation type
- `dateRange`: from/to dates and interval for historical queries

**Query Execution:**

- `queryResult`: API response data
- `queryLoading`, `queryError`: Loading and error states
- `copiedToClipboard`: Clipboard feedback state

### Query Generation

The `generatedQuery` useMemo hook builds GraphQL queries dynamically:

**For signalsLatest:**

```graphql
query {
  signalsLatest(tokenId: 12345) {
    lastSeen
    speed {
      timestamp
      value
    }
    currentLocationCoordinates {
      timestamp
      value { latitude longitude hdop }
    }
  }
}
```

**For signals:**

```graphql
query {
  signals(
    tokenId: 12345
    interval: "1h"
    from: "2025-01-01T00:00:00Z"
    to: "2025-01-02T00:00:00Z"
  ) {
    speed(agg: MAX)
    currentLocationCoordinates(agg: AVG) { latitude longitude hdop }
    timestamp
  }
}
```

### Authentication Note

The `getVehicleJWT()` function currently displays a warning message about
requiring a backend service. This is because:

1. **CORS Restrictions**: The Token Exchange API doesn't allow direct browser
   calls
2. **Security**: API keys should not be exposed in frontend code
3. **Token Generation**: Requires multiple API calls and cryptographic signing

**Solutions:**

- Users can manually paste a JWT obtained via the Python/Node SDK
- Production deployments should implement a backend JWT generation service
- Reference implementation available in `dimo-mobile-telemetry/backend/main.py`

## Usage

```mdx
import TelemetryQueryBuilder from '@site/src/components/TelemetryQueryBuilder';

<TelemetryQueryBuilder />
```

## Signal Categories

### 1. Location (4 signals)

Coordinates (latitude, longitude, hdop), approximate coordinates, altitude, heading

### 2. Vehicle Status (4 signals)

Ignition, speed, odometer, powertrain type

### 3. Battery & Fuel (9 signals)

Fuel level, battery voltage, EV charge status, range, power flow

### 4. Engine (5 signals)

RPM, coolant temperature, oil level, engine load, throttle position

### 5. Tire Pressure (4 signals)

All four wheel tire pressures in kPa

### 6. Environment (2 signals)

Outside temperature, barometric pressure

### 7. Diagnostics (2 signals)

Diagnostic trouble codes (DTCs), engine runtime

## Aggregation Types

### Float Aggregations

Available for numeric signals (speed, temperature, pressure, etc.):

- **AVG**: Average value
- **MAX**: Maximum value
- **MIN**: Minimum value
- **MED**: Median value
- **FIRST**: First value in range
- **LAST**: Last value in range
- **RAND**: Random sample

### String Aggregations

Available for text/enum signals (ignition status, powertrain type, etc.):

- **RAND**: Random sample
- **TOP**: Most frequent value
- **UNIQUE**: List of unique values

## Styling

Uses Docusaurus theme variables for automatic light/dark mode:

- CSS modules for component-scoped styles
- Responsive grid layouts
- Theme-aware colors and backgrounds
- Special styling for JWT timer (red countdown)
- Hover states and transitions
- Mobile-optimized layouts

## Example Workflow

1. **Authenticate**
   - Enter developer credentials
   - Generate JWT or paste existing one
   - See 10-minute countdown timer

2. **Select Query Type**
   - Choose `signalsLatest` for current values
   - Choose `signals` for historical data

3. **Configure Parameters** (if historical)
   - Set date range (from/to)
   - Choose interval (1h, 6h, 12h, 24h, 168h)

4. **Select Signals**
   - Browse 8 categories
   - Click signals to select/deselect
   - Choose aggregation for each (historical mode)

5. **Execute**
   - Review generated query
   - Copy to clipboard (optional)
   - Click "Execute Query"
   - View formatted results

## Future Enhancements

- Backend JWT generation service integration
- Query history/favorites
- Results visualization (charts/graphs)
- Export results to CSV/JSON
- Query templates/presets
- Real-time signal streaming
- Multi-vehicle comparison queries

