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
import { LINKS } from '../../links';
import { HardDrive, Search, Clock, ChevronDown, Database } from 'lucide-react';
import Translate, { translate } from '@docusaurus/Translate';

const PRODUCT_NAME = translate({
  id: 'products.storage.meta.productName',
  message: 'Storage',
});
const HERO_BACKGROUND = '/img/mp4/storage.mp4?v=2';

const FEATURES = [
  {
    icon: <HardDrive size={28} />,
    type: translate({
      id: 'products.storage.features.cloudOrOnPrem.type',
      message: 'Infrastructure',
    }),
    title: translate({
      id: 'products.storage.features.cloudOrOnPrem.title',
      message: 'Cloud or On-Prem, Your Choice',
    }),
    description: translate({
      id: 'products.storage.features.cloudOrOnPrem.description',
      message:
        'Store vehicle data with flexible options, managed by DIMO or on-premise in your data infrastructure.',
    }),
    example: translate({
      id: 'products.storage.features.cloudOrOnPrem.example',
      message:
        'Start easy with our free cloud storage or deploy to your own AWS or GCP clusters.',
    }),
  },
  {
    icon: <Search size={28} />,
    type: translate({
      id: 'products.storage.features.lightningFastQueries.type',
      message: 'Query Engine',
    }),
    title: translate({
      id: 'products.storage.features.lightningFastQueries.title',
      message: 'Lightning-Fast Queries',
    }),
    description: translate({
      id: 'products.storage.features.lightningFastQueries.description',
      message:
        'Purpose-built query engine optimized for time-series vehicle data. Run complex analytics across billions of records in milliseconds.',
    }),
    example: translate({
      id: 'products.storage.features.lightningFastQueries.example',
      message: 'Query average fuel efficiency over 6 months in under 500ms.',
    }),
  },
  {
    icon: <Clock size={28} />,
    type: translate({
      id: 'products.storage.features.flexibilitySecurity.type',
      message: 'Flexibility',
    }),
    title: translate({
      id: 'products.storage.features.flexibilitySecurity.title',
      message: 'Flexibility + Security',
    }),
    description: translate({
      id: 'products.storage.features.flexibilitySecurity.description',
      message:
        'Stop worrying about data storage compliance, our storage solution is designed with enterprise-grade security and compliance in mind.',
    }),
    example: translate({
      id: 'products.storage.features.flexibilitySecurity.example',
      message:
        'Fine-grained access controls and encryption to protect sensitive data.',
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
          <Database size={16} /> {PRODUCT_NAME}
        </span>

        <h1 className={styles.heroTitle}>
          <Translate
            id="products.storage.hero.scalableDataStorage"
            values={{
              span: (
                <span className={styles.heroTitleGradient}>
                  <Translate id="products.storage.hero.cloudOrOnPrem">
                    Cloud or On-Prem
                  </Translate>
                </span>
              ),
            }}
          >
            {'Scalable Data Storage {span}'}
          </Translate>
        </h1>

        <p className={styles.heroSubtitle}>
          <Translate id="products.storage.hero.petabyteScaleStorageOptimizedFor">
            Petabyte-scale storage optimized for vehicle telemetry.
            Lightning-fast queries, flexible retention, and enterprise-grade
            security.
          </Translate>
        </p>

        <div className={styles.heroButtons}>
          <Link className={styles.primaryBtn} to={LINKS.external.console}>
            <Translate id="products.storage.hero.startBuilding">
              Start Building
            </Translate>{' '}
            <span className={styles.arrow}>→</span>
          </Link>
          <EnglishLink className={styles.secondaryBtn} to="/docs">
            <Translate id="products.storage.hero.viewDocumentation">
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
          <Translate id="products.storage.features.productFeatures">
            Product Features
          </Translate>
        </span>
        <h2 className={styles.sectionTitle}>
          <Translate id="products.storage.features.builtForVehicleData">
            Built for Vehicle Data at Scale
          </Translate>
        </h2>
        <p className={styles.sectionSubtitle}>
          <Translate id="products.storage.features.purposeBuiltStorageInfrastructureThat">
            Purpose-built storage infrastructure that handles the unique
            challenges of vehicle telemetry data.
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
          <Translate id="products.storage.cta.readyToDeployVehicle">
            Ready to Deploy Vehicle Data Storage?
          </Translate>
        </h2>
        <p className={styles.ctaText}>
          <Translate id="products.storage.cta.getStartedWithDimo">
            Get started with DIMO storage designed specifically for vehicle
            telemetry and analytics.
          </Translate>
        </p>
        <div className={styles.heroButtons}>
          <Link className={styles.primaryBtn} to={LINKS.external.console}>
            <Translate id="products.storage.cta.getStarted">
              Get Started
            </Translate>{' '}
            <span className={styles.arrow}>→</span>
          </Link>
          <EnglishLink className={styles.secondaryBtn} to="/docs">
            <Translate id="products.storage.cta.viewDocumentation">
              View Documentation
            </Translate>{' '}
            <span className={styles.arrow}>→</span>
          </EnglishLink>
        </div>
      </div>
    </section>
  );
}

export default function StoragePage(): ReactNode {
  const { locale, path } = usePageLocale();
  return (
    <>
      <Head>
        <title>
          {translate({
            id: 'products.storage.meta.title',
            message: 'Storage | DIMO Vehicle Data Storage',
          })}
        </title>
        <meta
          name="description"
          content={translate({
            id: 'products.storage.meta.description',
            message:
              'Petabyte-scale vehicle data storage with lightning-fast queries, flexible retention, and enterprise-grade security.',
          })}
        />
        <meta
          name="keywords"
          content={translate({
            id: 'products.storage.meta.keywords',
            message:
              'vehicle data storage, time-series database, vehicle telemetry, data retention, encrypted storage',
          })}
        />
        <meta
          property="og:title"
          content={translate({
            id: 'products.storage.meta.ogTitle',
            message: 'Storage | DIMO Platform',
          })}
        />
        <meta
          property="og:description"
          content={translate({
            id: 'products.storage.meta.ogDescription',
            message:
              'Scalable storage infrastructure built for vehicle telemetry data at any scale.',
          })}
        />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify(
            localizeSchema(
              {
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                '@id': 'https://dimo.org/products/storage#software',
                name: 'DIMO Storage',
                description:
                  'Normalized, queryable storage for connected-vehicle telemetry — time-series vehicle data, cloud or on-prem.',
                url: 'https://dimo.org/products/storage',
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
                id: 'products.storage.body.home.name',
                message: 'Home',
              }),
              url: 'https://dimo.org/',
            },
            {
              name: translate({
                id: 'products.storage.body.products.name',
                message: 'Products',
              }),
              url: 'https://dimo.org/#products',
            },
            {
              name: translate({
                id: 'products.storage.body.storage.name',
                message: 'Storage',
              }),
            },
          ]}
        />

        <main>
          <HeroSection />
          <FeaturesSection />
          <CTASection />
        </main>

        <FooterTheme />
      </div>
    </>
  );
}
