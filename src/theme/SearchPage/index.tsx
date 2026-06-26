import React, { type ReactNode } from 'react';
import Head from '@docusaurus/Head';
import SearchPage from '@theme-original/SearchPage';
import type SearchPageType from '@theme/SearchPage';
import type { WrapperProps } from '@docusaurus/types';

type Props = WrapperProps<typeof SearchPageType>;

// Wrapper: the upstream Algolia SearchPage emits `property="robots"` which
// Google ignores. Add a valid `name="robots"` noindex so the search results
// page is correctly excluded from the index (it is crawlable in robots.txt so
// this directive is honored).
export default function SearchPageWrapper(props: Props): ReactNode {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, follow" />
      </Head>
      <SearchPage {...props} />
    </>
  );
}
