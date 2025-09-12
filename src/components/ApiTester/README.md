# API Tester Usage Examples

Here are several examples of how to use the ApiTester component in your MDX files:

## Basic Usage (in any .mdx file)

```jsx
import ApiTester from '@site/src/components/ApiTester';

<ApiTester 
  defaultUrl="https://api.example.com/user/profile"
  title="Get User Profile"
/>
```

## POST Request with Body

```jsx
import ApiTester from '@site/src/components/ApiTester';

<ApiTester 
  defaultUrl="https://api.example.com/posts"
  method="POST"
  requestBody='{"title": "New Post", "content": "Post content here"}'
  title="Create New Post"
  jwtPlaceholder="Paste your authentication token here..."
/>
```

## Advanced Configuration

```jsx
import ApiTester from '@site/src/components/ApiTester';

<ApiTester 
  defaultUrl="https://api.example.com/admin/users"
  method="GET"
  additionalHeaders={{
    "X-API-Version": "v2",
    "Accept": "application/json"
  }}
  title="Admin: List Users"
  urlPlaceholder="Enter admin API endpoint..."
  showDetails={true}
/>
```

## Quick Test (Minimal Configuration)

```jsx
import ApiTester from '@site/src/components/ApiTester';

<ApiTester />
```

## Component Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `defaultUrl` | string | `''` | Pre-filled API endpoint URL |
| `method` | `'GET' \| 'POST' \| 'PUT' \| 'DELETE' \| 'PATCH'` | `'GET'` | HTTP method |
| `requestBody` | string | `''` | JSON body as string for POST/PUT/PATCH requests |
| `bodyParams` | Record<string, any> | `undefined` | Body parameters as object (auto-converted to JSON) |
| `additionalHeaders` | Record<string, string> | `{}` | Extra headers beyond Authorization |
| `jwtPlaceholder` | string | `'Enter your JWT token...'` | JWT input placeholder |
| `urlPlaceholder` | string | `'Enter API endpoint URL...'` | URL input placeholder |
| `title` | string | `'API Tester'` | Component title |
| `showDetails` | boolean | `true` | Show response headers and detailed info |
| `allowBodyEdit` | boolean | `false` | Allow users to edit the request body |

## Body Parameter Options

There are three ways to handle request bodies:

1. **Easy Object Syntax** (`bodyParams`): Pass an object that gets auto-formatted as JSON
2. **Raw JSON String** (`requestBody`): Pass a JSON string directly
3. **Editable Body** (`allowBodyEdit={true}`): Let users modify the body in a textarea

Priority: `bodyParams` > `editableBody` > `requestBody`

## Features

- ✅ Automatic Bearer token formatting
- ✅ Support for all HTTP methods
- ✅ JSON request body support
- ✅ Custom headers
- ✅ Response formatting (JSON/text)
- ✅ Error handling
- ✅ Loading states
- ✅ Responsive design
- ✅ Dark mode support
- ✅ TypeScript support