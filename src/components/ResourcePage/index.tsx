import React, { type ReactNode } from 'react';
import Link from '@docusaurus/Link';
import { BlogPostProvider } from '@docusaurus/plugin-content-blog/client';
import LayoutProvider from '@theme/Layout/Provider';
import MDXContent from '@theme/MDXContent';
import type { Props } from '@theme/BlogPostPage';
import ContentPageLayout from '../ContentPageLayout';
import styles from './styles.module.css';

const SITE = 'https://dimo.org';
const ORG = {
  '@type': 'Organization',
  '@id': `${SITE}/#organization`,
  name: 'DIMO',
};

// Guide pages under /resources, in the same layout as the vehicle pages they
// link from. LayoutProvider supplies the theme context (color mode) that MDX
// code blocks need, without the theme's own navbar and footer.
export default function ResourcePage({ content: Content }: Props): ReactNode {
  const { title, description, permalink, date, readingTime } = Content.metadata;
  const published = date.slice(0, 10);
  return (
    <LayoutProvider>
      <BlogPostProvider content={Content} isBlogPostPage>
        <ContentPageLayout
          wide
          title={`${title} | DIMO`}
          description={description}
          canonicalPath={permalink}
          breadcrumbs={[
            { name: 'Home', url: `${SITE}/` },
            { name: 'Resources', url: `${SITE}/resources` },
            { name: title },
          ]}
          schema={{
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: title,
            description,
            url: `${SITE}${permalink}`,
            image: `${SITE}/img/dimo-social-card.png`,
            datePublished: published,
            isPartOf: { '@id': `${SITE}/#website` },
            author: ORG,
            publisher: ORG,
          }}
          heroEyebrow="Guide"
          heroTitle={title}
          salesChat
        >
          <p className={styles.meta}>
            <time dateTime={published}>{published}</time>
            {readingTime ? ` · ${Math.ceil(readingTime)} min read` : ''}
          </p>
          <div data-aeo-body>
            <MDXContent>
              <Content />
            </MDXContent>
          </div>
          <p className={styles.more}>
            <Link to="/resources">More guides</Link>
            {' · '}
            <Link to="/vehicles">Browse vehicles</Link>
          </p>
        </ContentPageLayout>
      </BlogPostProvider>
    </LayoutProvider>
  );
}
