# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the DIMO developer documentation site, built with Docusaurus 3.8. The site provides documentation, interactive API testers, and query builders for the DIMO vehicle data platform.

**Site URL**: https://www.dimo.org
**Organization**: DIMO-Network
**Node Version**: >=18.0

## Common Commands

### Development
```bash
npm start                # Start dev server (auto-opens browser)
npm run build            # Build static site to build/ directory
npm run serve            # Serve the production build locally
```

### Code Quality
```bash
npm run typecheck        # Run TypeScript type checking
npm run lint             # Lint with ESLint (max 0 warnings)
npm run lint:fix         # Auto-fix linting issues
npm run format           # Format all code with Prettier
npm run format:check     # Check formatting without changes
npm run format:docs      # Format only docs/ and blog/ markdown
npm run check-all        # Run typecheck, lint, and format:check
```

### Other Commands
```bash
npm run clear            # Clear Docusaurus cache
npm run swizzle          # Customize Docusaurus theme components
```

### Deployment
```bash
# Using SSH
USE_SSH=true npm run deploy

# Using GitHub credentials
GIT_USER=<username> npm run deploy
```

## Architecture

### Documentation Structure

The site follows a numbered directory structure for content organization:

- `docs/0_introduction/` - Getting started guides
- `docs/1_getting-started/` - Initial setup and quickstarts
- `docs/2_build/` - Building with DIMO (SDKs, AI tools, integrations)
- `docs/3_api-references/` - API documentation for each service
- `docs/4_examples/` - Code examples and tutorials
- `docs/5_faq.mdx` - Frequently asked questions

Sidebars are auto-generated from the file system structure (see `sidebars.ts`).

### Interactive Components

The site features several custom React components for interactive API exploration:

#### ApiTester (`src/components/ApiTester/`)
- Interactive REST API testing interface
- Supports all HTTP methods (GET, POST, PUT, DELETE, PATCH)
- JWT/Bearer token authentication
- Custom headers and request bodies
- Configurable user inputs with validation
- GraphQL support with variables
- Used in MDX files: `import ApiTester from '@site/src/components/ApiTester'`

#### TelemetryQueryBuilder (`src/components/TelemetryQueryBuilder/`)
- Full-featured GraphQL query builder for telemetry data
- Two query modes: `signals` (historical) and `signalsLatest` (current values)
- 40+ telemetry signals across 8 categories (Location, Battery, Engine, etc.)
- Authentication flow with JWT generation (requires backend proxy for CORS)
- Per-signal aggregation selection (AVG, MAX, MIN, MED, etc.)
- Date range and interval configuration
- Signal definitions in `signals.ts` with aggregation types

#### IdentityQueryBuilder (`src/components/IdentityQueryBuilder/`)
- GraphQL query builder for Identity API
- Pre-configured queries in `queries.ts`
- Authentication and execution interface

#### GraphQLPlayground (`src/components/GraphQLPlayground/`)
- Iframe-based embedding of GraphQL playground
- Supports default queries and variables via URL parameters
- Customizable height/width
- "Open in New Tab" functionality

#### Other Utility Components
- `ApiCodeBlock` - Formatted API code examples
- `ApiEndpointsBlock` - API endpoint documentation
- `ApiResponseBlock` - API response examples
- `DimoUrlBuilder` - URL construction helper
- `MapWidget` - Leaflet-based map integration
- `TelemetryFieldsBlock` - Telemetry field documentation
- `ZoomableImage` - Image zoom functionality (react-medium-image-zoom)
- `GraphQLBlock` - GraphQL query display
- `CustomDetails` - Collapsible details sections
- `Stepper` - Step-by-step guides
- `TwoColumnLayout` - Two-column documentation layout

### Link Management

All internal and external links are centralized in `src/links.tsx`:
- `DOCS_LINKS` - Internal documentation paths
- `EXTERNAL_LINKS` - External services (Console, GitHub, Discord, etc.)
- Helper functions: `getGithubRepoUrl()`, `getDocUrl()`

When adding links, update this file rather than hardcoding URLs.

### Theming & Styling

- Custom CSS in `src/css/custom.css` (Universal Sans Display font family)
- Component-specific CSS modules (e.g., `styles.module.css`)
- Docusaurus theme variables for light/dark mode
- Mermaid diagram support enabled
- Custom navbar component in `src/components/CustomNavbar/`
- Algolia search configured (App ID: 1UPBW4N7NX)

### Pages

- `src/pages/index.tsx` - Custom homepage
- `src/pages/markdown-page.md` - Example markdown page
- Theme overrides in `src/theme/`

### Analytics

Vercel Analytics configured via `src/clientModules/analytics.ts` (loaded as client module).

## Code Standards

### Linting
- ESLint configuration in `.eslintrc.js`
- Max line length: 80 characters (warnings only)
- TypeScript unused vars: prefix with `_` to ignore
- React in JSX scope: disabled (React 19)
- MDX files have special linting rules

### Formatting
- Prettier configuration in `.prettierrc`
- `prettier-plugin-organize-imports` for automatic import sorting
- Run `npm run format` before committing

### TypeScript
- TypeScript ~5.6.2
- Base config extends `@docusaurus/tsconfig`
- Type checking with `npm run typecheck` (separate from build)

## DIMO-Specific Patterns

### API Endpoints
The platform has multiple API services:
- Attestation API
- Device Definitions API
- Identity API (GraphQL)
- Telemetry API (GraphQL)
- Token Exchange API
- Valuations API
- Vehicle Triggers API

API documentation located in `docs/3_api-references/`.

### Authentication
- Developer credentials: Client ID, Redirect URI, API Key
- Vehicle Token ID for vehicle-specific queries
- JWT tokens with 10-minute expiration
- Token generation requires backend proxy (CORS restrictions prevent direct browser calls)

### Telemetry Signals
Signals are categorized by:
- **aggregationType**: `'float'` or `'string'` determines available aggregations
- Float signals: AVG, MAX, MIN, MED, FIRST, LAST, RAND
- String signals: RAND, TOP, UNIQUE

When adding new signals, update `src/components/TelemetryQueryBuilder/signals.ts`.

## Component Development

### Adding New Components
1. Create directory in `src/components/YourComponent/`
2. Add `index.tsx` (main component)
3. Add `styles.module.css` (if needed)
4. Add `README.md` documenting props and usage
5. Export for use in MDX: `import YourComponent from '@site/src/components/YourComponent'`

### Using Components in MDX
Components must be imported at the top of MDX files:
```mdx
import ApiTester from '@site/src/components/ApiTester';

<ApiTester
  defaultUrl="https://api.example.com/endpoint"
  method="GET"
/>
```

## Testing
No formal test suite currently configured. Manual testing recommended:
1. Run `npm run build` to check for build errors
2. Run `npm run typecheck` for type errors
3. Run `npm run check-all` for comprehensive checks
4. Test interactive components in browser

## Troubleshooting

### Build Issues
- Clear cache: `npm run clear`
- Delete `node_modules/` and reinstall: `rm -rf node_modules && npm install`
- Check `onBrokenLinks: 'warn'` in `docusaurus.config.ts` (set to 'throw' for strict mode)

### Component Issues
- Ensure imports use `@site/` prefix for absolute paths
- Check that client-side code (browser APIs) isn't used in config files
- Verify CSS module classNames are properly imported and used

### JWT/Authentication Issues
- CORS prevents direct API calls from browser for token generation
- Users must either manually input JWTs or use a backend proxy service
- Reference implementation available in `dimo-mobile-telemetry/backend/main.py`
