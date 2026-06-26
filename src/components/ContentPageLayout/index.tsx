import React, { type ReactNode } from 'react';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import CustomNavbar from '../CustomNavbar';
import FooterTheme from '../../theme/Footer';
import Breadcrumbs from '../Breadcrumbs';
import styles from './styles.module.css';

const SITE = 'https://www.dimo.org';

interface ContentPageLayoutProps {
  title: string;
  description: string;
  canonicalPath: string;
  breadcrumbs: { name: string; url?: string }[];
  schema: object;
  heroEyebrow?: string;
  heroTitle: string;
  heroSubtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  children: ReactNode;
}

// Shared layout for SEO content pages (pillars, spokes, comparisons). Supplies
// branded chrome, the <Head> (title/description/canonical/OG + JSON-LD), and a
// readable article column, so each content page is thin metadata + body JSX.
export default function ContentPageLayout({
  title,
  description,
  canonicalPath,
  breadcrumbs,
  schema,
  heroEyebrow,
  heroTitle,
  heroSubtitle,
  ctaLabel = 'Talk to our team',
  ctaHref = '/contact',
  children,
}: ContentPageLayoutProps): ReactNode {
  const url = `${SITE}${canonicalPath}`;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content={`${SITE}/img/dimo-social-card.png`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Head>
      <div className={styles.page}>
        <CustomNavbar dark={true} />
        <main>
          <header className={styles.hero}>
            {heroEyebrow && (
              <span className={styles.eyebrow}>{heroEyebrow}</span>
            )}
            <h1 className={styles.heroTitle}>{heroTitle}</h1>
            {heroSubtitle && (
              <p className={styles.heroSubtitle}>{heroSubtitle}</p>
            )}
            <Link className={styles.cta} to={ctaHref}>
              {ctaLabel} <span className={styles.arrow}>→</span>
            </Link>
          </header>
          <div className={styles.breadcrumbs}>
            <Breadcrumbs items={breadcrumbs} />
          </div>
          <article className={styles.article}>{children}</article>
        </main>
        <FooterTheme />
      </div>
    </>
  );
}
