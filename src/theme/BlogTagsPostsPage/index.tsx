import React, { type ReactNode } from 'react';
import Head from '@docusaurus/Head';
import BlogTagsPostsPage from '@theme-original/BlogTagsPostsPage';
import type BlogTagsPostsPageType from '@theme/BlogTagsPostsPage';
import type { WrapperProps } from '@docusaurus/types';

type Props = WrapperProps<typeof BlogTagsPostsPageType>;

// Tag pages only list posts that have their own canonical URLs, so keep them
// out of the index (they are already excluded from the sitemap).
export default function BlogTagsPostsPageWrapper(props: Props): ReactNode {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, follow" />
      </Head>
      <BlogTagsPostsPage {...props} />
    </>
  );
}
