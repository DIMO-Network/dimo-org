# ApiResponseBlock Component

A specialized React component for displaying JSON API responses with syntax
highlighting and copy functionality. This component is designed specifically for
API documentation response examples.

## Features

- 📄 **Fixed "Response" Header**: Clean, consistent header for all response
  blocks
- 🎨 **JSON Syntax Highlighting**: Automatic JSON formatting with dark theme
- 📋 **Copy to Clipboard**: One-click copying of the entire JSON response
- 🎯 **Responsive Design**: Works on desktop and mobile devices
- 🌙 **Dark Mode Support**: Consistent with Docusaurus theme
- 🚀 **Lightweight**: Focused, single-purpose component

## Usage

```tsx
import ApiResponseBlock from '@site/src/components/ApiResponseBlock';

<ApiResponseBlock
  code={`{
  "id": "12345",
  "status": "success",
  "data": {
    "message": "Operation completed successfully"
  }
}`}
/>;
```

## Props

### `ApiResponseBlockProps`

| Prop        | Type     | Required | Description                   |
| ----------- | -------- | -------- | ----------------------------- |
| `code`      | `string` | ✅       | JSON response code to display |
| `className` | `string` | ❌       | Additional CSS class          |

## Examples

### Simple API Response

```tsx
<ApiResponseBlock
  code={`{
  "success": true,
  "message": "User created successfully",
  "userId": "user_abc123"
}`}
/>
```

### Complex Nested Response

```tsx
<ApiResponseBlock
  code={`{
  "rawVC": "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa...",
  "vcId": "urn:uuid:12345678-1234-5678-9abc-123456789abc",
  "expiresAt": "2024-12-31T23:59:59Z",
  "issuedAt": "2024-01-01T00:00:00Z",
  "credential": {
    "@context": [
      "https://www.w3.org/2018/credentials/v1"
    ],
    "type": ["VerifiableCredential", "VINCredential"],
    "issuer": "did:key:z6MkrJVna...",
    "credentialSubject": {
      "id": "did:key:z6MkrJVna...",
      "vin": "WBAJB1C01CC374174"
    }
  }
}`}
/>
```

### Error Response

```tsx
<ApiResponseBlock
  code={`{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "The request is missing required parameters",
    "details": {
      "missingFields": ["email", "password"]
    }
  }
}`}
/>
```

## Design Principles

This component follows a "single responsibility" design:

- **Always JSON**: No language selection needed - responses are always JSON
- **Consistent Header**: Always shows "Response" - no HTTP methods or paths
- **Copy-First**: Optimized for developers who need to copy response examples
- **Visual Clarity**: Dark code theme with clear contrast

## Comparison with ApiCodeBlock

| Feature            | ApiCodeBlock     | ApiResponseBlock  |
| ------------------ | ---------------- | ----------------- |
| HTTP Method Badge  | ✅               | ❌                |
| Endpoint Path      | ✅               | ❌                |
| Language Dropdown  | ✅               | ❌                |
| Multiple Languages | ✅               | ❌ (JSON only)    |
| Copy Functionality | ✅               | ✅                |
| Use Case           | Request examples | Response examples |

## Styling

The component uses CSS modules and inherits the same visual style as
`ApiCodeBlock`:

- Dark theme code blocks
- Consistent border radius and spacing
- Responsive design
- Hover states and transitions

You can override styles using:

```tsx
<ApiResponseBlock className="my-custom-response" code="..." />
```

## Browser Support

- Modern browsers with ES2018+ support
- Mobile browsers
- Requires `navigator.clipboard` API for copy functionality

## Dependencies

- `clsx` - Conditional class names
- `prism-react-renderer` - JSON syntax highlighting
- React 18+ - Component framework

## Best Practices

1. **Format JSON**: Always provide properly formatted JSON strings
2. **Realistic Data**: Use realistic example data that matches your API
3. **Error Examples**: Include both success and error response examples
4. **Consistency**: Use the same component for all API response documentation
