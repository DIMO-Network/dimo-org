/**
 * Centralized URL configuration for consistent link management across the application
 */

// Internal documentation links (relative paths)
export const DOCS_LINKS = {
  base: '/docs',
	developerSdk: '/docs/build/building-with-tools/client-sdk-dimo-connect',
  aiAppBuilder: '/docs/build/building-with-ai/developer-kit',
	dimoMcpServer: '/docs/build/building-with-ai/dimo-mcp-server',
	lowCodeIntegrations: '/docs/build/building-with-tools/low-code-integrations',
	cheatSheet: '/img/cheat-sheet.png',
} as const;

// External links
export const EXTERNAL_LINKS = {
  console: 'https://console.dimo.org/sign-in',
  chatgpt: 'https://chatgpt.com/g/g-68b72a6088d08191b80a6bd57c0fae3f-dimo-build-gpt',
  github: 'https://github.com/DIMO-Network',
  blogs: 'https://dimo.co/blogs/the-pit-stop/',
  discord: 'https://discord.com/invite/dimonetwork',
  dimoUniversity: 'https://youtu.be/nktm5m9LhIU',
  dimoMobile: 'https://dimo.co',
  dimoJapan: 'https://dimojapan.com/',
  dune: 'https://dune.com/dimo_network/dimo-protocol',
  twitter: 'https://twitter.com/dimo_network',
  status: 'https://status.dimo.co/'
} as const;


// Combined links object for easy access
export const LINKS = {
  docs: DOCS_LINKS,
  external: EXTERNAL_LINKS,
} as const;

// Convenience functions for common link operations
export const getGithubRepoUrl = (repoName: string): string => {
  return `${EXTERNAL_LINKS.github}/${repoName}`;
};

export const getDocUrl = (path: string): string => {
  return `/docs/${path}`;
};

// Type definitions for better TypeScript support
export type DocsLinkKey = keyof typeof DOCS_LINKS;
export type ExternalLinkKey = keyof typeof EXTERNAL_LINKS;