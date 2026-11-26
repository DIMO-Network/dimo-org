import React, { type ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import Layout from '@theme/Layout';
import SearchMetadata from '@theme/SearchMetadata';
import BlogListPageStructuredData from '@theme/BlogListPage/StructuredData';
import type { Props } from '@theme/BlogListPage';
import { bylineNames, coverImage } from '@site/src/lib/blog-meta';
import styles from './styles.module.css';

const dateFormat = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
});

// The /blog index as a Substack-style publication archive: one column of
// title, subtitle and byline rows, with a thumbnail when the post has a cover.
export default function BlogList(props: Props): ReactNode {
  const { metadata, items } = props;
  const { blogTitle, blogDescription, previousPage, nextPage } = metadata;
  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogListPage
      )}
    >
      <PageMetadata title={blogTitle} description={blogDescription} />
      <SearchMetadata tag="blog_posts_list" />
      <BlogListPageStructuredData {...props} />
      <Layout>
        <main className={styles.page}>
          <header className={styles.masthead}>
            <h1 className={styles.name}>DIMO Blog</h1>
            <p className={styles.tagline}>{blogDescription}</p>
          </header>
          <ul className={styles.list}>
            {items.map(({ content }) => {
              const { title, description, permalink, date, authors } =
                content.metadata;
              const cover = coverImage(content.frontMatter.image);
              return (
                <li key={permalink} className={styles.row}>
                  <Link to={permalink} className={styles.link}>
                    <div className={styles.text}>
                      <h2 className={styles.title}>{title}</h2>
                      {description && (
                        <p className={styles.subtitle}>{description}</p>
                      )}
                      <p className={styles.byline}>
                        <time dateTime={date}>
                          {dateFormat.format(new Date(date))}
                        </time>
                        {authors.length > 0 &&
                          ` · ${bylineNames(authors.map(a => a.name ?? ''))}`}
                      </p>
                    </div>
                    {cover && (
                      <img
                        className={styles.thumb}
                        src={cover}
                        alt=""
                        loading="lazy"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
          {(previousPage || nextPage) && (
            <nav className={styles.pager} aria-label="Blog list pages">
              {previousPage && <Link to={previousPage}>Newer posts</Link>}
              {nextPage && <Link to={nextPage}>Older posts</Link>}
            </nav>
          )}
        </main>
      </Layout>
    </HtmlClassNameProvider>
  );
}
