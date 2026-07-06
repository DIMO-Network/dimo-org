import React, { type ReactNode } from 'react';
import Head from '@docusaurus/Head';
import OriginalBlogPostPage from '@theme-original/BlogPostPage';
import type BlogPostPageType from '@theme/BlogPostPage';
import type { WrapperProps } from '@docusaurus/types';

type Props = WrapperProps<typeof BlogPostPageType>;

const SITE = 'https://dimo.org';

// Adds a BreadcrumbList to every blog post. The BlogPosting itself is
// emitted by src/theme/BlogPostPage/StructuredData (which replaces the
// plugin default), so this wrapper no longer grafts a second partial
// BlogPosting block.
export default function BlogPostPageWrapper(props: Props): ReactNode {
  const { content } = props;
  const postUrl = `${SITE}${content.metadata.permalink}`;
  return (
    <>
      <Head>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: `${SITE}/`,
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Blog',
                item: `${SITE}/blog`,
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: content.metadata.title,
                item: postUrl,
              },
            ],
          })}
        </script>
      </Head>
      <OriginalBlogPostPage {...props} />
    </>
  );
}
