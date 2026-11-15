import React, { type ReactNode } from 'react';
import Head from '@docusaurus/Head';
import BlogTagsListPage from '@theme-original/BlogTagsListPage';
import type BlogTagsListPageType from '@theme/BlogTagsListPage';
import type { WrapperProps } from '@docusaurus/types';

type Props = WrapperProps<typeof BlogTagsListPageType>;

// Tag pages only list posts that have their own canonical URLs, so keep them
// out of the index (they are already excluded from the sitemap).
export default function BlogTagsListPageWrapper(props: Props): ReactNode {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, follow" />
      </Head>
      <BlogTagsListPage {...props} />
    </>
  );
}
