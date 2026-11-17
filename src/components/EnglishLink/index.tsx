import Link from '@docusaurus/Link';
import type { ComponentProps, ReactNode } from 'react';
import { englishHref } from '../../lib/locale-links';

type EnglishLinkProps = Omit<ComponentProps<typeof Link>, 'to'> & {
  to: string;
};

// A Link to a page that exists only in English (docs, blog, privacy, terms).
// Link would otherwise prefix the locale's baseUrl (/zh-Hans/docs, a 404) and
// open pathname:// links in a new tab.
export default function EnglishLink({
  to,
  ...props
}: EnglishLinkProps): ReactNode {
  return (
    <Link
      target="_self"
      {...props}
      to={englishHref(to)}
      autoAddBaseUrl={false}
    />
  );
}
