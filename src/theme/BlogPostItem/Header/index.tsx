import React, { type ReactNode } from 'react';
import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import { usePluralForm } from '@docusaurus/theme-common';
import { useBlogPost } from '@docusaurus/plugin-content-blog/client';
import useRouteContext from '@docusaurus/useRouteContext';
import OriginalHeader from '@theme-original/BlogPostItem/Header';
import BlogPostItemHeaderTitle from '@theme/BlogPostItem/Header/Title';
import { bylineSeparator } from '@site/src/lib/blog-meta';
import styles from './styles.module.css';

const dateFormat = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
});

function useReadingTime(readingTime: number | undefined): string | undefined {
  const { selectMessage } = usePluralForm();
  if (readingTime === undefined) return undefined;
  const minutes = Math.ceil(readingTime);
  return selectMessage(
    minutes,
    translate(
      {
        id: 'theme.blog.post.readingTime.plurals',
        message: 'One min read|{readingTime} min read',
      },
      { readingTime: minutes }
    )
  );
}

// Substack-style post header: title, subtitle, then an author row with
// avatars, names, date and reading time.
function SubstackHeader(): ReactNode {
  const { metadata, isBlogPostPage } = useBlogPost();
  const { description, date, readingTime, authors } = metadata;
  const readingTimeLabel = useReadingTime(readingTime);
  const avatars = authors.filter(a => a.imageURL).slice(0, 3);
  const named = authors.filter(a => a.name);

  return (
    <header className={styles.header}>
      <BlogPostItemHeaderTitle />
      {isBlogPostPage && description && (
        <p className={styles.subtitle}>{description}</p>
      )}
      <div className={styles.byline}>
        {avatars.length > 0 && (
          <div className={styles.avatars}>
            {avatars.map(a => (
              <img
                key={a.imageURL}
                className={styles.avatar}
                src={a.imageURL}
                alt=""
                width={36}
                height={36}
              />
            ))}
          </div>
        )}
        <div className={styles.meta}>
          {named.length > 0 && (
            <span className={styles.names}>
              {named.map((a, i) => (
                <React.Fragment key={a.key ?? a.name}>
                  {bylineSeparator(i, named.length)}
                  {a.url ? <Link to={a.url}>{a.name}</Link> : a.name}
                </React.Fragment>
              ))}
            </span>
          )}
          <span className={styles.when}>
            <time dateTime={date}>{dateFormat.format(new Date(date))}</time>
            {readingTimeLabel && ` · ${readingTimeLabel}`}
          </span>
        </div>
      </div>
    </header>
  );
}

// Only the default blog (/blog) gets the new header. The resources instance
// renders tag and author pages through BlogPostItem too, and keeps the stock one.
export default function BlogPostItemHeader(): ReactNode {
  const { plugin } = useRouteContext();
  return plugin.id === 'default' ? <SubstackHeader /> : <OriginalHeader />;
}
