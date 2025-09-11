# ApiEndpointsBlock

A clean, compact reusable component for displaying API endpoints with
Stripe-inspired design and anchor link functionality.

## Features

- **Stripe-inspired Design**: Clean, minimal appearance with a single bordered
  container
- **Compact Layout**: Space-efficient design that takes up less vertical space
- **HTTP Method Badges**: Small, color-coded badges for different HTTP methods
  (GET, POST, PUT, DELETE, PATCH)
- **Anchor Links**: Click-to-scroll functionality to navigate to detailed
  endpoint sections
- **Responsive**: Works well on desktop and mobile devices
- **Dark Mode**: Full support for dark/light theme switching
- **Simple Hover Effects**: Subtle background changes on interaction

## Usage

```tsx
import ApiEndpointsBlock from '@site/src/components/ApiEndpointsBlock';

const endpoints = [
  {
    method: 'GET',
    path: '/v1/webhooks',
    id: 'get-webhooks',
  },
  {
    method: 'POST',
    path: '/v1/webhooks',
    id: 'create-webhook',
  },
  {
    method: 'DELETE',
    path: '/v1/webhooks/:webhookId',
    id: 'delete-webhook',
  },
];

<ApiEndpointsBlock endpoints={endpoints} title="Available Endpoints" />;
```

## Props

### `endpoints` (required)

Array of endpoint objects with the following structure:

| Property | Type     | Required | Description                                            |
| -------- | -------- | -------- | ------------------------------------------------------ |
| `method` | `string` | Yes      | HTTP method (GET, POST, PUT, DELETE, etc.)             |
| `path`   | `string` | Yes      | API endpoint path                                      |
| `id`     | `string` | Yes      | Unique ID for anchor linking to corresponding sections |

### `title` (optional)

- **Type**: `string`
- **Default**: `"Endpoints"`
- **Description**: Title displayed above the endpoints list

### `className` (optional)

- **Type**: `string`
- **Description**: Additional CSS class for custom styling

## Styling

The component uses CSS modules with the following key classes:

- `.endpointsContainer` - Main container
- `.endpointsList` - Bordered list container
- `.endpointItem` - Individual endpoint row/button
- `.methodBadge` - HTTP method badge
- `.pathCode` - Endpoint path styling

HTTP method colors:

- **GET**: Green (`#10b981`)
- **POST**: Blue (`#3b82f6`)
- **PUT**: Orange (`#f59e0b`)
- **DELETE**: Red (`#ef4444`)
- **PATCH**: Purple (`#8b5cf6`)

## Anchor Linking

Each endpoint requires a unique `id` that should match the `id` of the
corresponding detailed section (usually in a TwoColumnLayout component). When
users click an endpoint, it will smoothly scroll to the matching section.

## Integration with TwoColumnLayout

Use with TwoColumnLayout that has matching IDs:

```tsx
<ApiEndpointsBlock endpoints={endpoints} />

<TwoColumnLayout
  id="get-webhooks"  // Matches endpoint.id
  leftColumn={<div>Documentation for GET /v1/webhooks</div>}
  rightColumn={<div>Code examples</div>}
/>
```

## Responsive Design

- **Desktop**: Clean bordered list with hover effects
- **Tablet**: Maintains layout with adjusted spacing
- **Mobile**: More compact design with smaller badges and reduced padding

## Accessibility

- Uses semantic `button` elements for keyboard navigation
- Proper focus states for screen readers
- ARIA-compatible structure
- Color contrast meets WCAG guidelines
