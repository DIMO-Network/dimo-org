# ApiCodeBlock Component

A reusable React component for displaying API endpoint documentation with
syntax-highlighted code examples in multiple programming languages.

## Features

- 📊 **HTTP Method Display**: Color-coded badges for GET, POST, PUT, DELETE, and
  PATCH methods
- 🛤️ **Endpoint Path**: Clear display of the API endpoint path
- 🌐 **Multi-Language Support**: Dropdown selector for different programming
  languages
- 🎨 **Syntax Highlighting**: Powered by `prism-react-renderer` with dark theme
- 📋 **Copy to Clipboard**: One-click code copying functionality
- 🎯 **Responsive Design**: Works on desktop and mobile devices
- 🌙 **Dark Mode Support**: Respects Docusaurus theme settings

## Usage

```tsx
import ApiCodeBlock from '@site/src/components/ApiCodeBlock';

<ApiCodeBlock
  requestType="POST"
  path="/v1/vc/vin/:tokenId"
  codeExamples={[
    {
      label: 'Node.js',
      language: 'javascript',
      code: `const stripe = require('stripe')('sk_test_...');

const charge = await stripe.charges.create({
  amount: 1099,
  currency: 'usd',
  source: 'tok_visa',
});`,
    },
    {
      label: 'Python',
      language: 'python',
      code: `import stripe
stripe.api_key = "sk_test_..."

charge = stripe.Charge.create(
    amount=1099,
    currency="usd",
    source="tok_visa",
)`,
    },
    {
      label: 'cURL',
      language: 'bash',
      code: `curl -X POST https://api.stripe.com/v1/charges \\
  -u sk_test_...: \\
  -d amount=1099 \\
  -d currency=usd \\
  -d source=tok_visa`,
    },
  ]}
  defaultLanguage="Node.js"
/>;
```

## Props

### `ApiCodeBlockProps`

| Prop              | Type                                              | Required | Default       | Description                                   |
| ----------------- | ------------------------------------------------- | -------- | ------------- | --------------------------------------------- |
| `requestType`     | `'GET' \| 'POST' \| 'PUT' \| 'DELETE' \| 'PATCH'` | ✅       | -             | HTTP method for the endpoint                  |
| `path`            | `string`                                          | ✅       | -             | API endpoint path                             |
| `codeExamples`    | `CodeExample[]`                                   | ✅       | -             | Array of code examples in different languages |
| `defaultLanguage` | `string`                                          | ❌       | First example | Default selected language                     |
| `className`       | `string`                                          | ❌       | -             | Additional CSS class for the container        |

### `CodeExample`

| Prop       | Type     | Required | Description                                              |
| ---------- | -------- | -------- | -------------------------------------------------------- |
| `label`    | `string` | ✅       | Display name in the dropdown (e.g., "Node.js", "Python") |
| `language` | `string` | ✅       | Programming language for syntax highlighting             |
| `code`     | `string` | ✅       | The actual code to display                               |

## Supported Languages

The component supports any language that `prism-react-renderer` supports. Common
languages include:

- `javascript` / `js`
- `typescript` / `ts`
- `python`
- `bash` / `shell`
- `json`
- `yaml`
- `go`
- `rust`
- `java`
- `php`
- `ruby`
- `swift`
- `kotlin`

## HTTP Method Colors

Each HTTP method has a distinct color scheme:

- **GET**: Green (`#4caf50`)
- **POST**: Blue (`#2196f3`)
- **PUT**: Orange (`#ff9800`)
- **PATCH**: Purple (`#9c27b0`)
- **DELETE**: Red (`#f44336`)

Colors automatically adapt to light and dark themes.

## Examples

### Simple GET Endpoint

```tsx
<ApiCodeBlock
  requestType="GET"
  path="/api/v1/users/:id"
  codeExamples={[
    {
      label: 'JavaScript',
      language: 'javascript',
      code: "fetch('/api/v1/users/123')",
    },
    {
      label: 'Python',
      language: 'python',
      code: "import requests\nresponse = requests.get('/api/v1/users/123')",
    },
  ]}
/>
```

### Complex POST with Multiple Languages

```tsx
<ApiCodeBlock
  requestType="POST"
  path="/api/v1/attestations"
  codeExamples={[
    {
      label: 'Node.js',
      language: 'javascript',
      code: `const response = await fetch('/api/v1/attestations', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your-token'
  },
  body: JSON.stringify({
    vin: 'WBAJB1C01CC374174',
    data: { ... }
  })
});`,
    },
    {
      label: 'Python',
      language: 'python',
      code: `import requests

response = requests.post(
    '/api/v1/attestations',
    headers={
        'Content-Type': 'application/json',
        'Authorization': 'Bearer your-token'
    },
    json={
        'vin': 'WBAJB1C01CC374174',
        'data': { ... }
    }
)`,
    },
  ]}
  defaultLanguage="Python"
/>
```

## Styling

The component uses CSS modules and respects Docusaurus CSS variables. You can
override styles by:

1. Using the `className` prop
2. Targeting CSS module classes in your global styles
3. Customizing CSS variables

## Browser Support

- Modern browsers with ES2018+ support
- Mobile browsers
- Requires `navigator.clipboard` API for copy functionality

## Dependencies

- `clsx` - Conditional class names
- `prism-react-renderer` - Syntax highlighting
- React 18+ - Component framework
