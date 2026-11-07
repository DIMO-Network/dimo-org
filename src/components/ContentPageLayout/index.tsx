import React, { type ReactNode } from 'react';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import { translate } from '@docusaurus/Translate';
import { localizeSchema, SITE } from '../../lib/seo';
import { usePageLocale } from '../../lib/use-page-locale';
import CustomNavbar from '../CustomNavbar';
import FooterTheme from '../../theme/Footer';
import Breadcrumbs from '../Breadcrumbs';
import styles from './styles.module.css';

interface ContentPageLayoutProps {
  title: string;
  description: string;
  breadcrumbs: { name: string; url?: string }[];
  schema: object;
  heroEyebrow?: string;
  heroTitle: string;
  heroSubtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  children: ReactNode;
  // Wider column for data-heavy pages (vehicle signal tables).
  wide?: boolean;
}

// Shared layout for SEO content pages (pillars, spokes, comparisons). Supplies
// branded chrome, the <Head> (title/description/OG + JSON-LD; canonical comes from SiteMetadata), and a
// readable article column, so each content page is thin metadata + body JSX.
export default function ContentPageLayout({
  title,
  description,
  breadcrumbs,
  schema,
  heroEyebrow,
  heroTitle,
  heroSubtitle,
  ctaLabel = translate({
    id: 'contentPage.cta.talkToOurTeam',
    message: 'Talk to our team',
  }),
  ctaHref = '/contact',
  children,
  wide = false,
}: ContentPageLayoutProps): ReactNode {
  const { locale, path } = usePageLocale();
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content={`${SITE}/img/dimo-social-card.png`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify(localizeSchema(schema, locale, path))}
        </script>
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
          <div className={`${styles.breadcrumbs} ${wide ? styles.wide : ''}`}>
            <Breadcrumbs items={breadcrumbs} />
          </div>
          <article className={`${styles.article} ${wide ? styles.wide : ''}`}>
            {children}
          </article>
        </main>
        <FooterTheme />
      </div>
    </>
  );
}
