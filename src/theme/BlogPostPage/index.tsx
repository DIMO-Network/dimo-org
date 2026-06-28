import React, { type ReactNode } from 'react';
import Head from '@docusaurus/Head';
import OriginalBlogPostPage from '@theme-original/BlogPostPage';
import type BlogPostPageType from '@theme/BlogPostPage';
import type { WrapperProps } from '@docusaurus/types';

type Props = WrapperProps<typeof BlogPostPageType>;

const SITE = 'https://dimo.org';

// Graft a `publisher` (required for Article/BlogPosting rich results) onto the
// BlogPosting schema the blog plugin emits. Both blocks share the same @id, so
// JSON-LD processors merge the properties.
export default function BlogPostPageWrapper(props: Props): ReactNode {
  const { content } = props;
  const postUrl = `${SITE}${content.metadata.permalink}`;
  return (
    <>
      <Head>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            '@id': postUrl,
            publisher: {
              '@type': 'Organization',
              '@id': `${SITE}/#organization`,
              name: 'DIMO',
              logo: {
                '@type': 'ImageObject',
                url: `${SITE}/img/dimo-build-logo-dark.svg`,
              },
            },
          })}
        </script>
      </Head>
      <OriginalBlogPostPage {...props} />
    </>
  );
}
