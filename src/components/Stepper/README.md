# Stepper Component

A beautiful, flexible step-by-step instruction component for Docusaurus
documentation.

## Features

- 🎨 Beautiful design that matches your Docusaurus theme
- 📱 Fully responsive with mobile-optimized layout
- 🌙 Dark mode support
- 🖼️ Optional images for each step
- ⚡ Smooth animations and hover effects
- 🔢 Automatic step numbering
- 🎯 TypeScript support

## Usage

### Basic Usage

```jsx
import Stepper, { Step } from '@site/src/components/Stepper';

<Stepper>
  <Step title="First Step">
    This is the content for the first step. You can include any markdown content
    here.
  </Step>

  <Step title="Second Step">
    This is the content for the second step. Steps are automatically numbered.
  </Step>

  <Step title="Final Step">This is the final step in your process.</Step>
</Stepper>;
```

### With Images

````jsx
<Stepper>
  <Step title="Install Dependencies" image="/img/installation.png">
    Run the following command to install the required dependencies: ```bash npm
    install package-name ```
  </Step>

  <Step
    title="Configure Settings"
    image="/img/configuration.png"
    imageAlt="Configuration screenshot"
  >
    Update your configuration file with the following settings...
  </Step>
</Stepper>
````

### Custom Step Numbers

```jsx
<Stepper>
  <Step stepNumber={1} title="Custom Numbered Step">
    You can manually specify step numbers if needed.
  </Step>

  <Step stepNumber={5} title="Skip to Step 5">
    This will show as step 5, skipping 2-4.
  </Step>
</Stepper>
```

## Props

### Stepper Props

| Prop        | Type        | Default | Description               |
| ----------- | ----------- | ------- | ------------------------- |
| `children`  | `ReactNode` | -       | Step components to render |
| `className` | `string`    | -       | Additional CSS class name |

### Step Props

| Prop         | Type        | Default                 | Description                                  |
| ------------ | ----------- | ----------------------- | -------------------------------------------- |
| `stepNumber` | `number`    | auto                    | Step number (auto-generated if not provided) |
| `title`      | `string`    | -                       | Step title/heading                           |
| `children`   | `ReactNode` | -                       | Step content (supports markdown)             |
| `image`      | `string`    | -                       | Optional image URL                           |
| `imageAlt`   | `string`    | `Step {n} illustration` | Alt text for the image                       |

## Styling

The component uses CSS modules and follows Docusaurus theming conventions. It
automatically adapts to light/dark themes and uses your site's primary color
scheme.

### Custom Styling

You can override styles by targeting the CSS classes:

```css
/* Custom styles for your site */
.custom-stepper :global(.stepper) {
  /* Your custom styles */
}
```

## Responsive Behavior

- **Desktop**: Full layout with connecting lines between steps
- **Tablet**: Maintains layout with adjusted spacing
- **Mobile**: Simplified card-based layout for better readability

## Accessibility

- Semantic HTML structure
- Proper heading hierarchy
- Alt text support for images
- Keyboard navigation friendly
- Screen reader compatible
