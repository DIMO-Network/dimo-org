import React from 'react';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import { isTranslatedPath, localeUrl, SITE } from '../../lib/seo';
import { usePageLocale } from '../../lib/use-page-locale';
import styles from './styles.module.css';

export interface BreadcrumbItem {
  name: string;
  url?: string; // Optional - last item typically has no URL
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

/**
 * Breadcrumbs component with JSON-LD structured data for SEO
 *
 * @example
 * <Breadcrumbs items={[
 *   { name: 'Home', url: 'https://dimo.org/' },
 *   { name: 'Industries', url: 'https://dimo.org/industries' },
 *   { name: 'Dealerships' }
 * ]} />
 */
export default function Breadcrumbs({
  items,
}: BreadcrumbsProps): React.JSX.Element {
  const { locale } = usePageLocale();
  // Point dimo.org crumbs at the current locale's copy of the page.
  const localize = (url: string): string => {
    if (!url.startsWith(SITE)) return url;
    const { pathname, hash } = new URL(url);
    const path = pathname.replace(/\/$/, '') || '/';
    return isTranslatedPath(path) ? localeUrl(locale, path) + hash : url;
  };
  const crumbs = items.map(item => ({
    ...item,
    url: item.url && localize(item.url),
  }));

  // Generate JSON-LD structured data
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      // Omit `item` for in-page fragment anchors (e.g. /#products): they are
      // not crawlable pages and are invalid as BreadcrumbList item URLs.
      ...(item.url && !item.url.includes('#') && { item: item.url }),
    })),
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <Head>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Head>

      {/* Visual Breadcrumbs */}
      <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
        <ol className={styles.breadcrumbList}>
          {crumbs.map((item, index) => (
            <li key={index} className={styles.breadcrumbItem}>
              {item.url ? (
                <>
                  <Link to={item.url} className={styles.breadcrumbLink}>
                    {item.name}
                  </Link>
                  {index < items.length - 1 && (
                    <span
                      className={styles.breadcrumbSeparator}
                      aria-hidden="true"
                    >
                      /
                    </span>
                  )}
                </>
              ) : (
                <span className={styles.breadcrumbCurrent} aria-current="page">
                  {item.name}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
