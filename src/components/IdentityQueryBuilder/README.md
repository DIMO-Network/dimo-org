# Identity Query Builder

An interactive GraphQL query builder for the DIMO Identity API. Users can
compose custom queries by selecting fields piece-by-piece, similar to the
Telemetry API query builder.

## Features

### Field-Based Query Composition

- Select a query root type (vehicle, vehicles, developerLicense, etc.)
- Choose individual fields to include in the query
- Support for nested objects with expandable field selections
- Multiple field selections that combine into a single query

### Query Execution

- Execute queries directly against the Identity API
- Display results in a formatted JSON view
- Copy generated queries to clipboard
- Real-time query generation as fields are selected

### User Experience

- No container box - integrates directly with page content
- Responsive design for mobile, tablet, and desktop
- Light/dark mode support via Docusaurus theme variables
- Clear step-by-step workflow

## Architecture

### Data Structure (`queries.ts`)

The query structure is field-based rather than template-based:

```typescript
export const identityQueryRoots: QueryRoot[] = [
  {
    id: 'vehicle',
    name: 'Single Vehicle Query',
    queryName: 'vehicle',
    variables: [...],
    availableFields: [
      { id: 'owner', name: 'owner', type: 'field' },
      {
        id: 'definition',
        name: 'definition',
        type: 'object',
        fields: [
          { id: 'make', name: 'make', type: 'field' },
          { id: 'model', name: 'model', type: 'field' },
          // ...
        ]
      }
    ]
  },
  // ... more roots
]
```

### Component State

- `selectedRoot`: The chosen query root (vehicle, vehicles, etc.)
- `variableValues`: Values for query parameters (tokenId, owner, etc.)
- `selectedFields`: Object tracking which fields are selected
- `queryResult`: Results from query execution
- `loading`, `error`: UI state

### Query Generation

The `buildQuery` function recursively constructs GraphQL query strings from
selected fields:

- Handles nested objects with proper indentation
- Adds pagination arguments where needed
- Substitutes variable values into query parameters

## Usage

```mdx
import IdentityQueryBuilder from '@site/src/components/IdentityQueryBuilder';

<IdentityQueryBuilder />
```

## Query Roots

### 1. Single Vehicle Query (`vehicle`)

Query a specific vehicle by token ID. Returns detailed information about one
vehicle.

**Variables:**

- `tokenId` (required): Vehicle token ID

**Available Fields:**

- Basic: owner, tokenId, tokenDID, mintedAt
- Nested: definition (make/model/year), sacds (permissions), earnings (rewards)

### 2. Multiple Vehicles Query (`vehicles`)

Query multiple vehicles with optional filtering.

**Variables:**

- `owner` (optional): Filter by owner address
- `privileged` (optional): Filter by developer license address
- `first` (optional): Limit results (default: 10)

**Available Fields:**

- totalCount: Total number of matching vehicles
- nodes: List of vehicles with their data

### 3. Developer License Query (`developerLicense`)

Query information about a developer license.

**Variables:**

- `tokenId` (required): Developer license token ID

**Available Fields:**

- Basic: owner, tokenId, alias, clientId, mintedAt
- Nested: redirectURIs (registered OAuth redirect URIs)

### 4. Rewards Query (`rewards`)

Query rewards/earnings for a user.

**Variables:**

- `user` (required): User wallet address

**Available Fields:**

- totalTokens: Total tokens earned

### 5. Device Definition Query (`deviceDefinition`)

Query vehicle device definition details.

**Variables:**

- `id` (required): Device definition ID

**Available Fields:**

- Basic: make, model, year
- Nested: attributes (device attribute name/value pairs)

## Styling

The component uses CSS modules with Docusaurus theme variables for automatic
light/dark mode support:

- `var(--ifm-color-primary)` for primary actions
- `var(--ifm-background-surface-color)` for surfaces
- `var(--ifm-color-emphasis-N00)` for borders/subtle backgrounds
- Responsive grid layouts with mobile breakpoints

## Example Workflow

1. **Select Query Type**: User clicks "Single Vehicle Query"
2. **Configure Parameters**: User enters vehicle token ID (e.g., 12345)
3. **Select Fields**: User selects:
   - `owner`
   - `definition` → `make`, `model`, `year`
   - `sacds` → `permissions`, `grantee`
4. **Generated Query**: Component builds the GraphQL query in real-time
5. **Execute**: User clicks "Execute Query" to run it
6. **Results**: Query results display below in formatted JSON

## Future Enhancements

- Add query history/favorites
- Support for more complex filters (date ranges, etc.)
- Visual schema explorer
- Query result visualization (charts/graphs)
- Export results to CSV/JSON file
