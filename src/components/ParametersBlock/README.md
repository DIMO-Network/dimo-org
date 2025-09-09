# ParametersBlock Component

A specialized React component for displaying API parameter documentation with a
consistent, professional layout. This component provides a standardized way to
document API parameters with clear visual hierarchy and accessibility.

## Features

- 📋 **Consistent Header**: Always includes "Parameters" title with underline
- 🏷️ **Parameter Details**: Shows name, type, required status, and description
- 🎨 **Visual Hierarchy**: Clean design with proper spacing and typography
- 🔖 **Status Badges**: Color-coded Required/Optional badges
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🌙 **Dark Mode Support**: Adapts to Docusaurus theme settings
- ♿ **Accessibility**: Semantic HTML with proper contrast ratios

## Usage

```tsx
import ParametersBlock from '@site/src/components/ParametersBlock';

<ParametersBlock
  parameters={[
    {
      name: 'tokenId',
      type: 'integer',
      required: true,
      description: 'The unique identifier of the vehicle token.',
    },
    {
      name: 'vehicleJwt',
      type: 'string',
      required: true,
      description: 'A valid JWT token for vehicle authentication.',
    },
    {
      name: 'includeMetadata',
      type: 'boolean',
      required: false,
      description: 'Whether to include additional metadata in the response.',
    },
  ]}
/>;
```

## Props

### `ParametersBlockProps`

| Prop         | Type          | Required | Description                            |
| ------------ | ------------- | -------- | -------------------------------------- |
| `parameters` | `Parameter[]` | ✅       | Array of parameter objects to display  |
| `className`  | `string`      | ❌       | Additional CSS class for the container |

### `Parameter`

| Prop          | Type      | Required | Description                                           |
| ------------- | --------- | -------- | ----------------------------------------------------- |
| `name`        | `string`  | ✅       | Parameter name (displayed in monospace font)          |
| `type`        | `string`  | ✅       | Parameter type (e.g., "string", "integer", "boolean") |
| `required`    | `boolean` | ✅       | Whether the parameter is required or optional         |
| `description` | `string`  | ✅       | Detailed description of the parameter's purpose       |

## Examples

### API Endpoint Parameters

```tsx
<ParametersBlock
  parameters={[
    {
      name: 'userId',
      type: 'string',
      required: true,
      description: 'The unique identifier for the user account.',
    },
    {
      name: 'limit',
      type: 'integer',
      required: false,
      description:
        'Maximum number of results to return. Default is 50, maximum is 100.',
    },
    {
      name: 'offset',
      type: 'integer',
      required: false,
      description: 'Number of results to skip for pagination. Default is 0.',
    },
  ]}
/>
```

### Complex Parameters with Rich Descriptions

```tsx
<ParametersBlock
  parameters={[
    {
      name: 'paymentMethod',
      type: 'enum',
      required: true,
      description:
        "Payment method to use. Valid values are 'credit_card', 'bank_account', or 'crypto_wallet'.",
    },
    {
      name: 'amount',
      type: 'integer',
      required: true,
      description:
        'Payment amount in the smallest currency unit (e.g., cents for USD). Must be between 50 and 999999999.',
    },
    {
      name: 'currency',
      type: 'string',
      required: true,
      description:
        'Three-letter ISO currency code in lowercase. Must be a supported currency.',
    },
  ]}
/>
```

### Mixed Required and Optional Parameters

```tsx
<ParametersBlock
  parameters={[
    {
      name: 'apiKey',
      type: 'string',
      required: true,
      description:
        'Your API key for authentication. Keep this secure and never expose it in client-side code.',
    },
    {
      name: 'format',
      type: 'enum',
      required: false,
      description: "Response format. Options: 'json' (default), 'xml', 'csv'.",
    },
    {
      name: 'compressed',
      type: 'boolean',
      required: false,
      description:
        'Whether to compress the response using gzip. Default is false.',
    },
  ]}
/>
```

## Visual Design

The component follows a clean, professional design inspired by leading API
documentation:

- **Header**: "Parameters" title with subtle underline
- **Parameter Names**: Monospace font with light background highlighting
- **Types**: Italicized secondary text for easy scanning
- **Badges**:
  - **Required**: Orange background with high contrast
  - **Optional**: Neutral gray styling
- **Descriptions**: Clear typography with good line spacing
- **Separators**: Subtle lines between each parameter

## Color Scheme

### Light Theme

- Required badges: Orange (`#e65100`) with light orange background
- Optional badges: Gray with light gray background
- Parameter names: Dark text on light gray background
- Separators: Light gray lines

### Dark Theme

- Required badges: Light orange (`#ffb74d`) with dark orange background
- Optional badges: Light gray with dark gray background
- Parameter names: Light text on dark gray background
- Separators: Dark gray lines

## Common Parameter Types

Use these standard type names for consistency:

- `string` - Text values
- `integer` - Whole numbers
- `number` - Numeric values (including decimals)
- `boolean` - True/false values
- `enum` - Predefined set of values
- `object` - JSON objects
- `array` - Lists of values
- `date` - Date strings
- `uuid` - UUID strings
- `email` - Email addresses
- `url` - URL strings

## Accessibility Features

- Semantic HTML structure with proper headings
- High contrast ratios for all text and backgrounds
- Screen reader friendly parameter descriptions
- Keyboard navigation support
- Clear visual hierarchy

## Best Practices

1. **Consistent Naming**: Use clear, descriptive parameter names
2. **Detailed Descriptions**: Explain purpose, format, and constraints
3. **Type Accuracy**: Use precise type names that match your API
4. **Logical Order**: List required parameters first, then optional
5. **Examples in Descriptions**: Include example values when helpful
6. **Constraint Documentation**: Mention min/max values, length limits, etc.

## Browser Support

- Modern browsers with ES2018+ support
- Mobile browsers
- Screen readers and assistive technologies

## Dependencies

- `clsx` - Conditional class names
- React 18+ - Component framework

## Integration with Other Components

The ParametersBlock component works well alongside:

- `ApiCodeBlock` - For showing request examples
- `ApiResponseBlock` - For showing response examples
- Standard markdown content for additional documentation
