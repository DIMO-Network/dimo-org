import React, { type ReactNode } from 'react';
import Head from '@docusaurus/Head';
import { useBlogPost } from '@docusaurus/plugin-content-blog/client';

const SITE = 'https://dimo.org';

// Replaces the default BlogPosting structured data from the blog plugin.
// Fixes from the 2026-07-06 schema audit: emit one complete BlogPosting
// block instead of two partial ones, include dateModified, type collective
// bylines as Organization rather than Person, give named authors a stable
// @id, and reference the shared social-card image by URL only (a shared
// image @id with per-post captions merges into one corrupted node).
function buildAuthor(author: {
  name?: string;
  url?: string;
  imageURL?: string;
}) {
  const name = author.name ?? 'DIMO';
  if (name === 'DIMO Team' || name === 'DIMO') {
    return {
      '@type': 'Organization',
      '@id': `${SITE}/#organization`,
      name: 'DIMO',
      url: `${SITE}/`,
    };
  }
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return {
    '@type': 'Person',
    '@id': `${SITE}/#${slug}`,
    name,
    ...(author.url ? { url: author.url, sameAs: [author.url] } : {}),
    ...(author.imageURL ? { image: author.imageURL } : {}),
  };
}

export default function BlogPostStructuredData(): ReactNode {
  const { metadata, assets } = useBlogPost();
  const url = `${SITE}${metadata.permalink}`;
  const imagePath = assets.image ?? metadata.frontMatter.image;
  const dateModified = metadata.lastUpdatedAt
    ? new Date(metadata.lastUpdatedAt).toISOString()
    : metadata.date;

  const authors =
    metadata.authors.length > 0
      ? metadata.authors.map(buildAuthor)
      : [buildAuthor({ name: 'DIMO' })];
  const keywords = metadata.tags.map(tag => tag.label);

  const blogPosting = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': url,
    mainEntityOfPage: url,
    url,
    headline: metadata.title,
    name: metadata.title,
    description: metadata.description,
    datePublished: metadata.date,
    dateModified,
    author: authors.length === 1 ? authors[0] : authors,
    ...(imagePath
      ? { image: imagePath.startsWith('http') ? imagePath : SITE + imagePath }
      : {}),
    ...(keywords.length > 0 ? { keywords } : {}),
    isPartOf: {
      '@type': 'Blog',
      '@id': `${SITE}/blog`,
      name: 'DIMO Blog',
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE}/#organization`,
      name: 'DIMO',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE}/img/dimo-logo.png`,
        width: 640,
        height: 120,
      },
    },
  };

  return (
    <Head>
      <script type="application/ld+json">{JSON.stringify(blogPosting)}</script>
    </Head>
  );
}
