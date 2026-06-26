import React, { type ReactNode } from 'react';
import Head from '@docusaurus/Head';
import Layout from '@theme-original/DocItem/Layout';
import type LayoutType from '@theme/DocItem/Layout';
import type { WrapperProps } from '@docusaurus/types';
import { useDoc } from '@docusaurus/plugin-content-docs/client';

type Props = WrapperProps<typeof LayoutType>;

const SITE = 'https://www.dimo.org';

// Wrapper: emit TechArticle + a full BreadcrumbList for every docs page.
// Anchors each page to the site WebSite/Organization entity graph and gives
// crawlers + AI extractors authoritative technical-doc signals.
export default function LayoutWrapper(props: Props): ReactNode {
  const { metadata } = useDoc();
  const url = `${SITE}${metadata.permalink}`;

  const techArticle = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: metadata.title,
    description: metadata.description,
    url,
    isPartOf: { '@type': 'WebSite', '@id': `${SITE}/#website` },
    author: {
      '@type': 'Organization',
      '@id': `${SITE}/#organization`,
      name: 'DIMO',
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE}/#organization`,
      name: 'DIMO',
    },
  };

  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: 'Docs', item: `${SITE}/docs` },
      { '@type': 'ListItem', position: 3, name: metadata.title, item: url },
    ],
  };

  return (
    <>
      <Head>
        <script type="application/ld+json">
          {JSON.stringify(techArticle)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbs)}
        </script>
      </Head>
      <Layout {...props} />
    </>
  );
}
