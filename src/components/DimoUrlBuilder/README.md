# DIMO URL Builder Component

An interactive component that allows developers to easily build and configure
Login with DIMO URLs with real-time preview and one-click copying.

## Features

- 🔧 **Interactive Form**: Easy-to-use form fields for all DIMO URL parameters
- ⚡ **Real-time Generation**: URL updates instantly as you type
- 🎯 **Permission Selection**: Visual privilege cards for all 8 vehicle data
  permissions
- 📅 **Date Picker**: Easy expiration date selection with validation
- 📋 **One-Click Copy**: Copy generated URLs to clipboard with visual feedback
- 🎨 **Beautiful Design**: Matches Docusaurus theme with smooth animations
- 📱 **Responsive**: Works perfectly on all screen sizes
- 🌙 **Dark Mode**: Full support for dark theme

## Usage

### Basic Usage

```jsx
import DimoUrlBuilder from '@site/src/components/DimoUrlBuilder';

<DimoUrlBuilder />;
```

### With Custom Styling

```jsx
import DimoUrlBuilder from '@site/src/components/DimoUrlBuilder';

<DimoUrlBuilder className="my-custom-class" />;
```

## Component Structure

The component includes several key sections:

### 1. Form Inputs

- **Client ID**: Required field for the developer's client identifier
- **Redirect URI**: Required field for the callback URL
- **Expiration Date**: Optional date picker for custom permission expiration

### 2. Permission Selection

Interactive cards for all 8 DIMO vehicle data privileges:

1. **All-time, non-location data** - Historical vehicle data excluding location
2. **Commands** - Send commands to the vehicle (lock, unlock, start, etc.)
3. **Current location** - Real-time location data
4. **All-time location** - Historical location data
5. **View VIN credentials** - Access to vehicle identification number
6. **Live data streams** - Real-time telemetry data streaming
7. **Raw data** - Unprocessed vehicle data
8. **Approximate location** - General location area (not precise coordinates)

### 3. URL Output

- **Real-time Preview**: Shows generated URL as you configure options
- **Copy Button**: One-click copying with success feedback
- **Formatted Display**: Clean, readable URL formatting

### 4. Instructions

Step-by-step guide on how to use the generated URL.

## URL Generation Logic

The component follows the DIMO URL specification:

### Base URL Structure

```
https://login.dimo.org/?clientId={clientId}&redirectUri={redirectUri}&entryState=VEHICLE_MANAGER
```

### Permission Encoding

Permissions are encoded as an 8-digit binary string where each position
represents a privilege:

- Position 1 = Privilege 1 (All-time, non-location data)
- Position 2 = Privilege 2 (Commands)
- Position 3 = Privilege 3 (Current location)
- etc.

Example: `10110000` grants privileges 1, 3, and 4.

### Optional Parameters

- `&permissions={binaryString}` - When privileges are selected
- `&expirationDate={YYYY-MM-DD}` - When custom expiration is set

## Props

| Prop        | Type     | Default | Description               |
| ----------- | -------- | ------- | ------------------------- |
| `className` | `string` | -       | Additional CSS class name |

## Styling

The component uses CSS modules and integrates with Docusaurus theming:

- Uses `--ifm-color-*` CSS variables for theming
- Supports both light and dark modes
- Responsive design with mobile-first approach
- Smooth animations and hover effects
- DIMO brand colors (`#e80303`) for accent elements

## Browser Compatibility

- **Clipboard API**: Modern browsers (Chrome 66+, Firefox 63+, Safari 13.1+)
- **CSS Grid**: All modern browsers
- **Date Input**: All modern browsers with fallback styling

## Accessibility Features

- **Semantic HTML**: Proper form structure with labels
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: ARIA labels and descriptions
- **Focus Management**: Clear focus indicators
- **Color Contrast**: WCAG AA compliant colors

## Integration Notes

This component is designed specifically for DIMO documentation and integrates
with:

- Docusaurus theming system
- DIMO brand guidelines
- DIMO API specifications
- Login with DIMO redirect flow

## Related Documentation

- [Login with DIMO Redirect](https://docs.dimo.org/developer-platform/developer-guide/developer-suite/dimo-developer-sdks/login-with-dimo-sdk/login-with-dimo-redirect)
- [Core Functionalities](https://docs.dimo.org/developer-platform/developer-guide/developer-suite/dimo-developer-sdks/login-with-dimo-sdk/core-functionalities)
- [Permissions Contract (SACD)](https://docs.dimo.org/developer-platform/developer-guide/permissions-contract-sacd)
