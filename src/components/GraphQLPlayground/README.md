# GraphQLPlayground Component

An iframe-based component for embedding GraphQL playgrounds in your
documentation with default queries and variables.

## Features

- ✅ Embeds the real GraphQL API endpoint
- ✅ Sets default queries via URL parameters
- ✅ Sets default variables via URL parameters
- ✅ Fully interactive - users can modify and run queries
- ✅ "Open in New Tab" button for full-screen experience
- ✅ Responsive design with dark mode support
- ✅ Customizable height and width

## Usage

### Basic Example

```tsx
import GraphQLPlayground from '@site/src/components/GraphQLPlayground';

<GraphQLPlayground
  endpoint="https://identity-api.dimo.zone/"
  query={`query GetUser {
    user(id: 123) {
      name
      email
    }
  }`}
/>;
```

### With Variables

```tsx
<GraphQLPlayground
  endpoint="https://identity-api.dimo.zone/"
  query={`query GetDevLicense($tokenId: String!) {
    developerLicense(by: { tokenId: $tokenId }) {
      owner
      tokenId
      alias
    }
  }`}
  variables={{
    tokenId: '123',
  }}
  height="800px"
/>
```

### With String Variables

```tsx
<GraphQLPlayground
  endpoint="https://identity-api.dimo.zone/"
  query={`query Example { ... }`}
  variables={`{
    "tokenId": "123",
    "limit": 10
  }`}
/>
```

## Props

| Prop        | Type                     | Default                             | Description                                  |
| ----------- | ------------------------ | ----------------------------------- | -------------------------------------------- |
| `endpoint`  | `string`                 | `"https://identity-api.dimo.zone/"` | The GraphQL endpoint URL                     |
| `query`     | `string`                 | `""`                                | Default query to display in the playground   |
| `variables` | `string \| object`       | `undefined`                         | Default variables (as object or JSON string) |
| `title`     | `string`                 | `"GraphQL Playground"`              | Title shown in the header                    |
| `height`    | `string \| number`       | `"600px"`                           | Height of the iframe                         |
| `width`     | `string \| number`       | `"100%"`                            | Width of the iframe                          |
| `headers`   | `Record<string, string>` | `undefined`                         | Additional headers (if supported)            |

## How It Works

The component creates an iframe that embeds the GraphQL playground and passes
default queries and variables via URL parameters:

```
https://identity-api.dimo.zone/?query=<encoded_query>&variables=<encoded_variables>
```

This approach works with most GraphQL playground implementations (GraphiQL,
Apollo Sandbox, etc.) that support URL parameters for pre-populating queries.

## Important Notes

1. **CORS Requirements**: The GraphQL endpoint must allow iframe embedding.
   Check for `X-Frame-Options` headers if you encounter issues.

2. **URL Parameter Support**: The playground at the endpoint must support URL
   parameters like `?query=...` and `?variables=...`. Most modern GraphQL
   playgrounds do.

3. **Security**: The iframe uses sandbox attributes to limit what the embedded
   content can do:
   - `allow-same-origin`: Required for some playground features
   - `allow-scripts`: Required for the playground to function
   - `allow-forms`: Required for query input
   - `allow-popups`: Required for "open in new tab" features
   - `allow-modals`: Required for error dialogs

4. **Alternative Approaches**: If the URL parameter approach doesn't work with
   your specific playground, you might need to:
   - Use a custom GraphQL playground implementation (like the existing
     GraphQLBlock)
   - Use postMessage API to communicate with the iframe
   - Use a dedicated embedding solution like GraphiQL Embed

## Troubleshooting

### The iframe shows but the query isn't pre-populated

The playground at your endpoint may not support URL parameters. Try:

1. Opening the generated URL in a new tab to see if parameters work
2. Checking the playground's documentation for supported URL parameters
3. Using the "Open in New Tab" button to verify the URL construction

### The iframe doesn't load (shows blank)

This could be due to:

1. CORS/X-Frame-Options blocking iframe embedding
2. Network issues
3. Invalid endpoint URL

Check the browser console for specific error messages.

### The height is too small/large

Adjust the `height` prop:

```tsx
<GraphQLPlayground height="800px" /> // or height={800}
```

## Example in MDX

See `docs/3_api-references/2_identity-api/2_identity-playground.mdx` for a
complete example.
