import React from 'react';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
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
 *   { name: 'Home', url: 'https://www.dimo.org/' },
 *   { name: 'Industries', url: 'https://www.dimo.org/industries' },
 *   { name: 'Dealerships' }
 * ]} />
 */
export default function Breadcrumbs({ items }: BreadcrumbsProps): React.JSX.Element {
  // Generate JSON-LD structured data
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.url && { item: item.url }),
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
          {items.map((item, index) => (
            <li key={index} className={styles.breadcrumbItem}>
              {item.url ? (
                <>
                  <Link to={item.url} className={styles.breadcrumbLink}>
                    {item.name}
                  </Link>
                  {index < items.length - 1 && (
                    <span className={styles.breadcrumbSeparator} aria-hidden="true">
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
