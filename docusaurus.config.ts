import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import { themes as prismThemes } from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'DIMO Build',
  tagline: 'The vehicle data platform that puts privacy first',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://www.dimo.org',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'DIMO-Network', // Usually your GitHub org/user name.
  projectName: 'dimo-org', // Usually your repo name.

  onBrokenLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: ['@docusaurus/theme-mermaid'],

  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  themeConfig: {
    // Replace with your project's social card
    image: 'img/dimo-social-card.png',
    navbar: {
      logo: {
        alt: 'DIMO',
        src: 'img/dimo-build-logo.svg',
        srcDark: 'img/dimo-build-logo-dark.svg',
        href: '/',
      },
      items: [
        {
          type: 'search',
          position: 'right',
        },
        {
          to: 'https://console.dimo.org/sign-in',
          label: 'Log In',
          position: 'right',
          className: 'header-login-button',
        },
        {
          to: 'https://github.com/DIMO-Network',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub',
        },
      ],
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    algolia: {
      appId: '1UPBW4N7NX',
      apiKey: '19eb8461516e41ddb1580e426cd5f92a',
      indexName: 'DIMO Docs Crawler',
      contextualSearch: true,
      searchPagePath: 'search',

      // DocSearch v4 features
      insights: true, // Enable search insights

      // AskAI configuration (optional - requires Algolia AskAI assistant)
      // Uncomment and configure when you have an AskAI assistant set up
      // See: https://www.algolia.com/doc/guides/ai-search/
      // askAi: {
      //   assistantId: 'YOUR_ASSISTANT_ID',
      //   enabled: true,
      // },
    },
  } satisfies Preset.ThemeConfig,

  clientModules: [require.resolve('./src/clientModules/analytics.ts')],
};

export default config;
