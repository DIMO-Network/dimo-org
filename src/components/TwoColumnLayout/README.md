# TwoColumnLayout Component

A responsive two-column layout component for Docusaurus documentation, similar
to the layout used in Stripe's API documentation.

## Features

- **Responsive Design**: Two columns on desktop, stacked on mobile
- **Flexible Ratios**: Support for 1:1, 2:1, and 1:2 column ratios
- **Customizable Gap**: Adjustable spacing between columns
- **Custom Breakpoints**: Configurable breakpoint for mobile stacking
- **TypeScript Support**: Full TypeScript support with proper interfaces
- **Dark Mode Compatible**: Works with Docusaurus dark/light themes

## Usage

### Basic Usage

```tsx
import TwoColumnLayout from '@site/src/components/TwoColumnLayout';

<TwoColumnLayout
  leftColumn={
    <div>
      <h2>Documentation Content</h2>
      <p>Your documentation content goes here...</p>
    </div>
  }
  rightColumn={
    <div>
      <pre>
        <code>// Code examples go here const example = "Hello World";</code>
      </pre>
    </div>
  }
/>;
```

### With Custom Ratios

```tsx
<TwoColumnLayout
  ratio="2:1"
  leftColumn={<div>Wider left column</div>}
  rightColumn={<div>Narrower right column</div>}
/>
```

### With Custom Styling

```tsx
<TwoColumnLayout
  className="my-custom-layout"
  gap={3}
  stackAt={992}
  leftColumn={<div>Content</div>}
  rightColumn={<div>Code</div>}
/>
```

## Props

| Prop          | Type                      | Default | Description                                |
| ------------- | ------------------------- | ------- | ------------------------------------------ |
| `leftColumn`  | `React.ReactNode`         | -       | Content for the left column (required)     |
| `rightColumn` | `React.ReactNode`         | -       | Content for the right column (required)    |
| `className`   | `string`                  | -       | Optional CSS class for custom styling      |
| `ratio`       | `'1:1' \| '2:1' \| '1:2'` | `'1:1'` | Column width ratio                         |
| `gap`         | `number`                  | `2`     | Gap between columns in rem units           |
| `stackAt`     | `number`                  | `768`   | Breakpoint at which columns stack (pixels) |

## Examples

### API Documentation Layout

```tsx
<TwoColumnLayout
  ratio="1:1"
  leftColumn={
    <div>
      <h3>Create a Payment</h3>
      <p>Creates a new payment with the specified parameters.</p>

      <h4>Parameters</h4>
      <ul>
        <li>
          <code>amount</code> - The payment amount
        </li>
        <li>
          <code>currency</code> - Three-letter ISO currency code
        </li>
      </ul>
    </div>
  }
  rightColumn={
    <div>
      <h4>Example Request</h4>
      <pre>
        <code>{`
curl -X POST https://api.example.com/payments \\
  -H "Authorization: Bearer your-token" \\
  -d amount=1000 \\
  -d currency=usd
      `}</code>
      </pre>

      <h4>Example Response</h4>
      <pre>
        <code>{`
{
  "id": "pm_1234567890",
  "amount": 1000,
  "currency": "usd",
  "status": "succeeded"
}
      `}</code>
      </pre>
    </div>
  }
/>
```

## Responsive Behavior

- **Desktop (> 768px)**: Shows as two columns with specified ratio
- **Mobile (≤ 768px)**: Stacks vertically with left column on top
- **Custom Breakpoint**: Use `stackAt` prop to customize the breakpoint

## CSS Classes

The component uses CSS modules with the following classes:

- `.twoColumnContainer` - Main container
- `.leftColumn` - Left column wrapper
- `.rightColumn` - Right column wrapper
- `.ratio11`, `.ratio21`, `.ratio12` - Ratio modifiers

You can target these classes for additional customization in your global CSS.
