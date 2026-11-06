import React, { type ReactNode, useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import EnglishLink from '../../components/EnglishLink';
import Head from '@docusaurus/Head';
import { localizeSchema } from '../../lib/seo';
import { usePageLocale } from '../../lib/use-page-locale';
import styles from '../solutions/solutions.module.css';
import FooterTheme from '../../theme/Footer';
import CustomNavbar from '../../components/CustomNavbar';
import Breadcrumbs from '../../components/Breadcrumbs';
import DataAccessFlow from '../../components/DataAccessFlow';
import { LINKS } from '../../links';
import { Key, Webhook, Code, ChevronDown } from 'lucide-react';
import Translate, { translate } from '@docusaurus/Translate';

const PRODUCT_NAME = translate({
  id: 'products.access.meta.productName',
  message: 'Access',
});
const HERO_BACKGROUND = '/img/mp4/access.mp4?v=2';

const FEATURES = [
  {
    icon: <Key size={28} />,
    type: translate({
      id: 'products.access.features.easyAccessControl.type',
      message: 'Authentication',
    }),
    title: translate({
      id: 'products.access.features.easyAccessControl.title',
      message: 'Easy Access Control with Developer Console',
    }),
    description: translate({
      id: 'products.access.features.easyAccessControl.description',
      message:
        'Easily manage app permissions and vehicle access through a user-friendly interface.',
    }),
    example: translate({
      id: 'products.access.features.easyAccessControl.example',
      message:
        'One-stop-shop with intuitive UI, state-of-the-art security features for managing application access.',
    }),
  },
  {
    icon: <Code size={28} />,
    type: translate({
      id: 'products.access.features.unifiedDataAiFirst.type',
      message: 'APIs & SDKs',
    }),
    title: translate({
      id: 'products.access.features.unifiedDataAiFirst.title',
      message: 'Unified Data & AI-first APIs',
    }),
    description: translate({
      id: 'products.access.features.unifiedDataAiFirst.description',
      message:
        'Access all vehicle data through clean, well-documented APIs & SDKs. Supports multiple languages and see the value of Agentic AI in action.',
    }),
    example: translate({
      id: 'products.access.features.unifiedDataAiFirst.example',
      message:
        'Ask an AI agent about vehicle health and have agents take actions for you, call a mechanic, book an appointment, research and buy parts.',
    }),
  },
  {
    icon: <Webhook size={28} />,
    type: translate({
      id: 'products.access.features.webhooksEventsTrips.type',
      message: 'Real-Time',
    }),
    title: translate({
      id: 'products.access.features.webhooksEventsTrips.title',
      message: 'Webhooks, Events, Trips',
    }),
    description: translate({
      id: 'products.access.features.webhooksEventsTrips.description',
      message:
        'Get notified instantly when vehicle data changes. Real-time webhooks, events, and trips data to build event-driven applications.',
    }),
    example: translate({
      id: 'products.access.features.webhooksEventsTrips.example',
      message:
        'Receive notifications when a vehicle enters a geofence, look up harsh braking events, and analyze trips.',
    }),
  },
];

function HeroSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={styles.hero}>
      <video
        className={styles.heroBackground}
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        src={HERO_BACKGROUND}
        autoPlay
        loop
        muted
        playsInline
      />
      <div className={styles.heroOverlay} />

      <div className={styles.heroContent}>
        <span className={styles.industryBadge}>
          <Key size={16} /> {PRODUCT_NAME}
        </span>

        <h1 className={styles.heroTitle}>
          <Translate id="products.access.hero.accessVehicleDataWith">
            Access Vehicle Data With Ease
          </Translate>{' '}
          <span className={styles.heroTitleGradient}></span>
        </h1>

        <p className={styles.heroSubtitle}>
          <Translate id="products.access.hero.cleanFastEasyToUseApis">
            Clean, fast, easy-to-use APIs & SDKs for accessing vehicle data.
            Drive meaningful outcomes using AI Agents to allow conversational
            interactions with your fleet.
          </Translate>
        </p>

        <div className={styles.heroButtons}>
          <Link className={styles.primaryBtn} to={LINKS.external.console}>
            <Translate id="products.access.hero.startBuilding">
              Start Building
            </Translate>{' '}
            <span className={styles.arrow}>→</span>
          </Link>
          <EnglishLink className={styles.secondaryBtn} to="/docs">
            <Translate id="products.access.hero.viewDocumentation">
              View Documentation
            </Translate>{' '}
            <span className={styles.arrow}>→</span>
          </EnglishLink>
        </div>
      </div>

      <div className={styles.scrollIndicator}>
        <ChevronDown size={32} />
      </div>
    </header>
  );
}

function FeaturesSection() {
  return (
    <section className={styles.useCasesSection}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionEyebrow}>
          <Translate id="products.access.features.productFeatures">
            Product Features
          </Translate>
        </span>
        <h2 className={styles.sectionTitle}>
          <Translate id="products.access.features.developerFirstApiPlatform">
            Developer-First API Platform
          </Translate>
        </h2>
        <p className={styles.sectionSubtitle}>
          <Translate id="products.access.features.builtByDevelopersFor">
            Built by developers, for developers. Clean APIs, comprehensive SDKs,
            and documentation that actually helps.
          </Translate>
        </p>
      </div>

      <div className={styles.useCasesGrid}>
        {FEATURES.map((feature, i) => (
          <div key={i} className={styles.useCaseCard}>
            <div className={styles.useCaseIcon}>{feature.icon}</div>
            <div className={styles.useCaseType}>{feature.type}</div>
            <h3 className={styles.useCaseTitle}>{feature.title}</h3>
            <p className={styles.useCaseDesc}>{feature.description}</p>
            <div className={styles.useCaseExample}>{feature.example}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.ctaContent}>
        <h2 className={styles.ctaTitle}>
          <Translate id="products.access.cta.readyToAccessVehicle">
            Ready to Access Vehicle Data?
          </Translate>
        </h2>
        <p className={styles.ctaText}>
          <Translate id="products.access.cta.getYourApiKeys">
            Get your API keys and start building in minutes. Comprehensive SDKs
            for every major language, works seamlessly with our REST and GraphQL
            APIs.
          </Translate>
        </p>
        <div className={styles.heroButtons}>
          <Link className={styles.primaryBtn} to={LINKS.external.console}>
            <Translate id="products.access.cta.getApiKeys">
              Get API Keys
            </Translate>{' '}
            <span className={styles.arrow}>→</span>
          </Link>
          <EnglishLink className={styles.secondaryBtn} to="/docs">
            <Translate id="products.access.cta.viewDocumentation">
              View Documentation
            </Translate>{' '}
            <span className={styles.arrow}>→</span>
          </EnglishLink>
        </div>
      </div>
    </section>
  );
}

export default function AccessPage(): ReactNode {
  const { locale, path } = usePageLocale();
  return (
    <>
      <Head>
        <title>
          {translate({
            id: 'products.access.meta.title',
            message: 'Access | DIMO Vehicle Data APIs',
          })}
        </title>
        <meta
          name="description"
          content={translate({
            id: 'products.access.meta.description',
            message:
              'Fast, reliable APIs for accessing vehicle data. REST, GraphQL, webhooks, and streaming with global edge deployment.',
          })}
        />
        <meta
          name="keywords"
          content={translate({
            id: 'products.access.meta.keywords',
            message:
              'vehicle API, REST API, GraphQL API, webhooks, real-time data, vehicle telemetry API',
          })}
        />
        <meta
          property="og:title"
          content={translate({
            id: 'products.access.meta.ogTitle',
            message: 'Access | DIMO Platform',
          })}
        />
        <meta
          property="og:description"
          content={translate({
            id: 'products.access.meta.ogDescription',
            message:
              'Developer-first API platform for vehicle data with global edge deployment.',
          })}
        />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify(
            localizeSchema(
              {
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                '@id': 'https://dimo.org/products/access#software',
                name: 'DIMO Access',
                description:
                  'Clean, fast APIs and SDKs (REST, GraphQL, webhooks, streaming) for accessing real-time and historical vehicle data across 50+ connected brands.',
                url: 'https://dimo.org/products/access',
                applicationCategory: 'DeveloperApplication',
                operatingSystem: 'Web',
                offers: {
                  '@type': 'Offer',
                  price: '0',
                  priceCurrency: 'USD',
                  availability: 'https://schema.org/OnlineOnly',
                },
                publisher: { '@id': 'https://dimo.org/#organization' },
              },
              locale,
              path
            )
          )}
        </script>
      </Head>

      <div className={styles.industryPage}>
        <CustomNavbar dark={true} />

        <Breadcrumbs
          items={[
            {
              name: translate({
                id: 'products.access.body.home.name',
                message: 'Home',
              }),
              url: 'https://dimo.org/',
            },
            {
              name: translate({
                id: 'products.access.body.products.name',
                message: 'Products',
              }),
              url: 'https://dimo.org/#products',
            },
            {
              name: translate({
                id: 'products.access.body.access.name',
                message: 'Access',
              }),
            },
          ]}
        />

        <main>
          <HeroSection />
          <DataAccessFlow />
          <FeaturesSection />
          <CTASection />
        </main>

        <FooterTheme />
      </div>
    </>
  );
}
