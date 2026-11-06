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
import DataIngestFlow from '../../components/DataIngestFlow';
import { LINKS } from '../../links';
import { Database, Zap, Shield, ChevronDown, Download } from 'lucide-react';
import Translate, { translate } from '@docusaurus/Translate';

const PRODUCT_NAME = translate({
  id: 'products.ingest.meta.productName',
  message: 'Ingest',
});
const HERO_BACKGROUND = '/img/mp4/ingest.mp4?v=2';

const FEATURES = [
  {
    icon: <Zap size={28} />,
    type: translate({
      id: 'products.ingest.features.realTimeStreaming.type',
      message: 'Performance',
    }),
    title: translate({
      id: 'products.ingest.features.realTimeStreaming.title',
      message: 'Real-Time Streaming',
    }),
    description: translate({
      id: 'products.ingest.features.realTimeStreaming.description',
      message:
        'Sub-second latency data streaming for mission-critical applications. Process millions of data points per second with guaranteed delivery.',
    }),
  },
  {
    icon: <Database size={28} />,
    type: translate({
      id: 'products.ingest.features.smartDataNormalization.type',
      message: 'Processing',
    }),
    title: translate({
      id: 'products.ingest.features.smartDataNormalization.title',
      message: 'Smart Data Normalization',
    }),
    description: translate({
      id: 'products.ingest.features.smartDataNormalization.description',
      message:
        'Automatically normalize data from different sources into a unified schema. Vehicle data from Tesla and GM are normalized in the same standard, COVESA format.',
    }),
  },
  {
    icon: <Shield size={28} />,
    type: translate({
      id: 'products.ingest.features.enterpriseGradeReliability.type',
      message: 'Reliability',
    }),
    title: translate({
      id: 'products.ingest.features.enterpriseGradeReliability.title',
      message: 'Enterprise-Grade Reliability',
    }),
    description: translate({
      id: 'products.ingest.features.enterpriseGradeReliability.description',
      message:
        'Built-in redundancy, automatic failover, and data integrity verification. Never lose a data point with our durable message queue architecture.',
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
          <Download size={16} /> {PRODUCT_NAME}
        </span>

        <h1 className={styles.heroTitle}>
          <Translate
            id="products.ingest.hero.collectVehicleDataFrom"
            values={{
              span: (
                <span className={styles.heroTitleGradient}>
                  <Translate id="products.ingest.hero.anySource">
                    Any Source
                  </Translate>
                </span>
              ),
            }}
          >
            {'Collect Vehicle Data from {span}'}
          </Translate>
        </h1>

        <p className={styles.heroSubtitle}>
          <Translate id="products.ingest.hero.aUnifiedDataIngestion">
            A unified data ingestion pipeline that connects to OEMs, aftermarket
            devices, and smartphone apps. Real-time streaming with
            enterprise-grade reliability.
          </Translate>
        </p>

        <div className={styles.heroButtons}>
          <Link className={styles.primaryBtn} to={LINKS.external.console}>
            <Translate id="products.ingest.hero.startBuilding">
              Start Building
            </Translate>{' '}
            <span className={styles.arrow}>→</span>
          </Link>
          <EnglishLink className={styles.secondaryBtn} to="/docs">
            <Translate id="products.ingest.hero.viewDocumentation">
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
          <Translate id="products.ingest.features.productFeatures">
            Product Features
          </Translate>
        </span>
        <h2 className={styles.sectionTitle}>
          <Translate id="products.ingest.features.enterpriseGradeDataIngestion">
            Enterprise-Grade Data Ingestion
          </Translate>
        </h2>
        <p className={styles.sectionSubtitle}>
          <Translate id="products.ingest.features.builtToHandleThe">
            Built to handle the complexity of vehicle data at scale. From
            collection to normalization, DIMO Ingest handles it all.
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
          <Translate id="products.ingest.cta.readyToIngestVehicle">
            Ready to Ingest Vehicle Data at Scale?
          </Translate>
        </h2>
        <p className={styles.ctaText}>
          <Translate id="products.ingest.cta.ingestAnyVehicleData">
            Ingest any vehicle data source through a single, unified service.
          </Translate>
        </p>
        <div className={styles.heroButtons}>
          <Link className={styles.primaryBtn} to={LINKS.external.console}>
            <Translate id="products.ingest.cta.getStarted">
              Get Started
            </Translate>{' '}
            <span className={styles.arrow}>→</span>
          </Link>
          <EnglishLink className={styles.secondaryBtn} to="/docs">
            <Translate id="products.ingest.cta.viewDocumentation">
              View Documentation
            </Translate>{' '}
            <span className={styles.arrow}>→</span>
          </EnglishLink>
        </div>
      </div>
    </section>
  );
}

export default function IngestPage(): ReactNode {
  const { locale, path } = usePageLocale();
  return (
    <>
      <Head>
        <title>
          {translate({
            id: 'products.ingest.meta.title',
            message: 'Ingest | DIMO Vehicle Data Collection',
          })}
        </title>
        <meta
          name="description"
          content={translate({
            id: 'products.ingest.meta.description',
            message:
              'Collect vehicle data from any source - OEMs, aftermarket devices, and smartphone apps. Real-time streaming with enterprise-grade reliability.',
          })}
        />
        <meta
          name="keywords"
          content={translate({
            id: 'products.ingest.meta.keywords',
            message:
              'vehicle data ingestion, OBD-II data, OEM API, real-time streaming, data collection, vehicle telemetry',
          })}
        />
        <meta
          property="og:title"
          content={translate({
            id: 'products.ingest.meta.ogTitle',
            message: 'Ingest | DIMO Platform',
          })}
        />
        <meta
          property="og:description"
          content={translate({
            id: 'products.ingest.meta.ogDescription',
            message:
              'Unified vehicle data ingestion from any source with real-time streaming and enterprise reliability.',
          })}
        />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify(
            localizeSchema(
              {
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                '@id': 'https://dimo.org/products/ingest#software',
                name: 'DIMO Ingest',
                description:
                  'Bring-your-own telematics ingestion via the DIMO Ingest Server (DIS) into a unified vehicle data pipeline.',
                url: 'https://dimo.org/products/ingest',
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
                id: 'products.ingest.body.home.name',
                message: 'Home',
              }),
              url: 'https://dimo.org/',
            },
            {
              name: translate({
                id: 'products.ingest.body.products.name',
                message: 'Products',
              }),
              url: 'https://dimo.org/#products',
            },
            {
              name: translate({
                id: 'products.ingest.body.ingest.name',
                message: 'Ingest',
              }),
            },
          ]}
        />

        <main>
          <HeroSection />
          <DataIngestFlow />
          <FeaturesSection />
          <CTASection />
        </main>

        <FooterTheme />
      </div>
    </>
  );
}
