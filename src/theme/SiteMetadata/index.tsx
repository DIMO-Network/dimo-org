import Head from '@docusaurus/Head';
import { PageMetadata, useThemeConfig } from '@docusaurus/theme-common';
import { DEFAULT_SEARCH_TAG } from '@docusaurus/theme-common/internal';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import SearchMetadata from '@theme/SearchMetadata';
import React, { type ReactNode } from 'react';
import { isTranslatedPath, localeUrl, OG_LOCALE } from '../../lib/seo';
import { usePageLocale } from '../../lib/use-page-locale';

// Ejected so this is the only emitter of canonical, og:url, og:locale and
// hreflang. Each translated page is canonical to itself and lists every
// locale plus x-default; English-only pages (docs, blog, legal) list none.
function LocaleHeaders(): ReactNode {
  const {
    i18n: { locales, localeConfigs },
  } = useDocusaurusContext();
  const { locale, path } = usePageLocale();
  const url = localeUrl(locale, path);
  const translated = isTranslatedPath(path);
  return (
    <Head>
      <link rel="canonical" href={url} />
      <meta property="og:url" content={url} />
      <meta property="og:locale" content={OG_LOCALE[locale]} />
      {translated &&
        locales
          .filter(other => other !== locale)
          .map(other => (
            <meta
              key={`og-${other}`}
              property="og:locale:alternate"
              content={OG_LOCALE[other]}
            />
          ))}
      {translated &&
        locales.map(other => (
          <link
            key={other}
            rel="alternate"
            href={localeUrl(other, path)}
            hrefLang={localeConfigs[other].htmlLang}
          />
        ))}
      {translated && (
        <link
          rel="alternate"
          href={localeUrl('en', path)}
          hrefLang="x-default"
        />
      )}
    </Head>
  );
}

export default function SiteMetadata(): ReactNode {
  const {
    i18n: { currentLocale },
  } = useDocusaurusContext();
  const { metadata, image: defaultImage } = useThemeConfig();
  return (
    <>
      <Head>
        <meta name="twitter:card" content="summary_large_image" />
        {/* The keyboard focus class name need to be applied when SSR so links
        are outlined when JS is disabled */}
        <body />
      </Head>

      {defaultImage && <PageMetadata image={defaultImage} />}

      <LocaleHeaders />

      <SearchMetadata tag={DEFAULT_SEARCH_TAG} locale={currentLocale} />

      {/*
          It's important to have an additional <Head> element here, as it allows
          react-helmet to override default metadata values set in previous <Head>
          like "twitter:card". In same Head, the same meta would appear twice
          instead of overriding.
        */}
      <Head>
        {/* Yes, "metadatum" is the grammatically correct term */}
        {metadata.map((metadatum, i) => (
          <meta key={i} {...metadatum} />
        ))}
      </Head>
    </>
  );
}
