import React, { type ReactNode } from 'react';
import Link from '@docusaurus/Link';
import type { Props } from '@theme/BlogListPage';
import ContentPageLayout from '../ContentPageLayout';
import styles from './styles.module.css';

const SITE = 'https://dimo.org';

// The /resources index, in the same layout as the guides and vehicle pages.
export default function ResourceList({ metadata, items }: Props): ReactNode {
  const { blogTitle, blogDescription, permalink, previousPage, nextPage } =
    metadata;
  return (
    <ContentPageLayout
      wide
      title={`${blogTitle} | DIMO`}
      description={blogDescription}
      canonicalPath={permalink}
      breadcrumbs={[{ name: 'Home', url: `${SITE}/` }, { name: blogTitle }]}
      schema={{
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: blogTitle,
        description: blogDescription,
        url: `${SITE}${permalink}`,
      }}
      heroEyebrow="Guides"
      heroTitle={blogTitle}
      heroSubtitle={blogDescription}
      ctaLabel="Get API keys"
      ctaHref="https://console.dimo.org/sign-in"
    >
      <ul className={styles.list}>
        {items.map(({ content }) => {
          const {
            title,
            description,
            permalink: href,
            date,
          } = content.metadata;
          return (
            <li key={href}>
              <Link to={href}>{title}</Link>
              <p>{description}</p>
              <time dateTime={date.slice(0, 10)}>{date.slice(0, 10)}</time>
            </li>
          );
        })}
      </ul>
      {(previousPage || nextPage) && (
        <p className={styles.more}>
          {previousPage && <Link to={previousPage}>Newer guides</Link>}
          {previousPage && nextPage && ' · '}
          {nextPage && <Link to={nextPage}>Older guides</Link>}
        </p>
      )}
    </ContentPageLayout>
  );
}
