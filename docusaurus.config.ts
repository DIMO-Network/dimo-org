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
  url: 'https://your-docusaurus-site.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

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
  },

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      logo: {
        alt: 'DIMO BUILD',
        src: 'img/logo.svg',
        width: 100,
      },
      items: [
        {
          label: 'Learn',
          position: 'left',
          items: [
            {
              type: 'docSidebar',
              sidebarId: 'tutorialSidebar',
              label: 'Documentation',
            },
          ],
        },
        {
          label: 'Tools',
          position: 'left',
          href: '#',
        },
        {
          label: 'Community',
          position: 'left',
          href: '#',
        },
        {
          href: 'https://github.com/DIMO-Network',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
        {
          label: 'Sign in',
          href: 'https://console.dimo.org/sign-in',
          position: 'right',
          className: 'navbar-signin-button',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/introduction',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/DIMO-Network',
            },
            {
              label: 'Discord',
              href: 'https://chat.dimo.zone',
            },
            {
              label: 'X',
              href: 'https://x.com/dimo_network',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Console',
              href: 'https://console.dimo.org',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} DIMO Build.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
