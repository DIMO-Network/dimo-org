// Identity API Field Types
export type FieldType = 'field' | 'object' | 'array';
export type VariableType = 'number' | 'string' | 'address' | 'boolean';

export interface QueryVariable {
  name: string;
  type: VariableType;
  placeholder: string;
  required: boolean;
  label: string;
  description?: string;
}

export interface SelectableField {
  id: string;
  name: string;
  description: string;
  type: FieldType;
  // For nested fields
  fields?: SelectableField[];
  // If this field requires parent context (e.g., only available under vehicle)
  parentContext?: string;
  // Whether this field uses the GraphQL nodes wrapper pattern
  usesNodesWrapper?: boolean;
}

export interface QueryRoot {
  id: string;
  name: string;
  description: string;
  queryName: string;
  // Variables needed for the root query
  variables: QueryVariable[];
  // Available fields to select
  availableFields: SelectableField[];
  // Whether this supports pagination
  supportsPagination?: boolean;
}

// Identity API Query Roots and their available fields
export const identityQueryRoots: QueryRoot[] = [
  {
    id: 'vehicle',
    name: 'Single Vehicle Query',
    description: 'Query data for a specific vehicle by token ID',
    queryName: 'vehicle',
    variables: [
      {
        name: 'tokenId',
        type: 'number',
        placeholder: '12345',
        required: true,
        label: 'Vehicle Token ID',
        description: 'The unique token ID of the vehicle',
      },
    ],
    availableFields: [
      {
        id: 'owner',
        name: 'owner',
        description: 'Owner wallet address',
        type: 'field',
      },
      {
        id: 'tokenId',
        name: 'tokenId',
        description: 'Vehicle token ID',
        type: 'field',
      },
      {
        id: 'tokenDID',
        name: 'tokenDID',
        description: 'Vehicle DID (Decentralized Identifier)',
        type: 'field',
      },
      {
        id: 'mintedAt',
        name: 'mintedAt',
        description: 'Timestamp when vehicle was minted',
        type: 'field',
      },
      {
        id: 'definition',
        name: 'definition',
        description: 'Vehicle definition (make/model/year)',
        type: 'object',
        fields: [
          {
            id: 'make',
            name: 'make',
            description: 'Vehicle make',
            type: 'field',
          },
          {
            id: 'model',
            name: 'model',
            description: 'Vehicle model',
            type: 'field',
          },
          {
            id: 'year',
            name: 'year',
            description: 'Vehicle year',
            type: 'field',
          },
          {
            id: 'id',
            name: 'id',
            description: 'Device definition ID',
            type: 'field',
          },
        ],
      },
      {
        id: 'sacds',
        name: 'sacds',
        description: 'Shared Access Control Data (permissions)',
        type: 'object',
        usesNodesWrapper: true,
        fields: [
          {
            id: 'permissions',
            name: 'permissions',
            description: 'Permission hex codes',
            type: 'field',
          },
          {
            id: 'grantee',
            name: 'grantee',
            description: 'Address granted permissions',
            type: 'field',
          },
          {
            id: 'source',
            name: 'source',
            description: 'Source of permission grant',
            type: 'field',
          },
          {
            id: 'createdAt',
            name: 'createdAt',
            description: 'When permission was created',
            type: 'field',
          },
          {
            id: 'expiresAt',
            name: 'expiresAt',
            description: 'When permission expires',
            type: 'field',
          },
        ],
      },
      {
        id: 'earnings',
        name: 'earnings',
        description: 'Vehicle earnings/rewards data',
        type: 'object',
        fields: [
          {
            id: 'totalTokens',
            name: 'totalTokens',
            description: 'Total tokens earned',
            type: 'field',
          },
          {
            id: 'history',
            name: 'history',
            description: 'Earnings history',
            type: 'object',
            fields: [
              {
                id: 'week',
                name: 'week',
                description: 'Week of earnings',
                type: 'field',
              },
              {
                id: 'aftermarketDeviceTokens',
                name: 'aftermarketDeviceTokens',
                description: 'Tokens from aftermarket device',
                type: 'field',
              },
              {
                id: 'syntheticDeviceTokens',
                name: 'syntheticDeviceTokens',
                description: 'Tokens from synthetic device',
                type: 'field',
              },
              {
                id: 'sentAt',
                name: 'sentAt',
                description: 'When tokens were sent',
                type: 'field',
              },
              {
                id: 'beneficiary',
                name: 'beneficiary',
                description: 'Beneficiary address',
                type: 'field',
              },
              {
                id: 'connectionStreak',
                name: 'connectionStreak',
                description: 'Connection streak count',
                type: 'field',
              },
              {
                id: 'streakTokens',
                name: 'streakTokens',
                description: 'Tokens from streak bonus',
                type: 'field',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'vehicles',
    name: 'Multiple Vehicles Query',
    description: 'Query data for multiple vehicles with filtering options',
    queryName: 'vehicles',
    supportsPagination: true,
    variables: [
      {
        name: 'owner',
        type: 'address',
        placeholder: '0x...',
        required: false,
        label: 'Owner Address (optional)',
        description: 'Filter by vehicle owner address',
      },
      {
        name: 'privileged',
        type: 'address',
        placeholder: '0x...',
        required: false,
        label: 'Privileged Address (optional)',
        description: 'Filter by developer license with access',
      },
      {
        name: 'first',
        type: 'number',
        placeholder: '10',
        required: false,
        label: 'Limit (optional)',
        description: 'Maximum number of results',
      },
    ],
    availableFields: [
      {
        id: 'totalCount',
        name: 'totalCount',
        description: 'Total number of vehicles matching filters',
        type: 'field',
      },
      {
        id: 'nodes',
        name: 'nodes',
        description: 'List of vehicles',
        type: 'object',
        fields: [
          {
            id: 'owner',
            name: 'owner',
            description: 'Owner wallet address',
            type: 'field',
          },
          {
            id: 'tokenId',
            name: 'tokenId',
            description: 'Vehicle token ID',
            type: 'field',
          },
          {
            id: 'tokenDID',
            name: 'tokenDID',
            description: 'Vehicle DID',
            type: 'field',
          },
          {
            id: 'mintedAt',
            name: 'mintedAt',
            description: 'Minting timestamp',
            type: 'field',
          },
          {
            id: 'definition',
            name: 'definition',
            description: 'Vehicle definition',
            type: 'object',
            fields: [
              {
                id: 'make',
                name: 'make',
                description: 'Vehicle make',
                type: 'field',
              },
              {
                id: 'model',
                name: 'model',
                description: 'Vehicle model',
                type: 'field',
              },
              {
                id: 'year',
                name: 'year',
                description: 'Vehicle year',
                type: 'field',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'developerLicense',
    name: 'Developer License Query',
    description: 'Query data for a specific developer license',
    queryName: 'developerLicense',
    variables: [
      {
        name: 'tokenId',
        type: 'number',
        placeholder: '123',
        required: true,
        label: 'Developer License Token ID',
        description: 'The token ID of the developer license',
      },
    ],
    availableFields: [
      {
        id: 'owner',
        name: 'owner',
        description: 'License owner address',
        type: 'field',
      },
      {
        id: 'tokenId',
        name: 'tokenId',
        description: 'License token ID',
        type: 'field',
      },
      {
        id: 'alias',
        name: 'alias',
        description: 'License alias/name',
        type: 'field',
      },
      {
        id: 'clientId',
        name: 'clientId',
        description: 'OAuth client ID',
        type: 'field',
      },
      {
        id: 'mintedAt',
        name: 'mintedAt',
        description: 'When license was minted',
        type: 'field',
      },
      {
        id: 'redirectURIs',
        name: 'redirectURIs',
        description: 'Registered redirect URIs',
        type: 'object',
        usesNodesWrapper: true,
        fields: [
          {
            id: 'uri',
            name: 'uri',
            description: 'Redirect URI',
            type: 'field',
          },
          {
            id: 'enabledAt',
            name: 'enabledAt',
            description: 'When URI was enabled',
            type: 'field',
          },
        ],
      },
    ],
  },
  {
    id: 'rewards',
    name: 'Rewards Query',
    description: 'Query rewards data for a user',
    queryName: 'rewards',
    variables: [
      {
        name: 'user',
        type: 'address',
        placeholder: '0x...',
        required: true,
        label: 'User Address',
        description: 'Wallet address of the user',
      },
    ],
    availableFields: [
      {
        id: 'totalTokens',
        name: 'totalTokens',
        description: 'Total tokens earned',
        type: 'field',
      },
    ],
  },
  {
    id: 'deviceDefinition',
    name: 'Device Definition Query',
    description: 'Query device definition details',
    queryName: 'deviceDefinition',
    variables: [
      {
        name: 'id',
        type: 'string',
        placeholder: 'device-definition-id',
        required: true,
        label: 'Device Definition ID',
        description: 'The device definition identifier',
      },
    ],
    availableFields: [
      {
        id: 'model',
        name: 'model',
        description: 'Vehicle model',
        type: 'field',
      },
      { id: 'year', name: 'year', description: 'Vehicle year', type: 'field' },
      {
        id: 'attributes',
        name: 'attributes',
        description: 'Device attributes',
        type: 'object',
        fields: [
          {
            id: 'name',
            name: 'name',
            description: 'Attribute name',
            type: 'field',
          },
          {
            id: 'value',
            name: 'value',
            description: 'Attribute value',
            type: 'field',
          },
        ],
      },
    ],
  },
];

// Helper function to get nested field path
export function getFieldPath(
  field: SelectableField,
  parentPath: string = ''
): string {
  return parentPath ? `${parentPath}.${field.name}` : field.name;
}
