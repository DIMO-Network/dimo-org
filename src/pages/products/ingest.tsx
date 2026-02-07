import React, { type ReactNode, useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import styles from '../solutions/solutions.module.css';
import FooterTheme from '../../theme/Footer';
import CustomNavbar from '../../components/CustomNavbar';
import Breadcrumbs from '../../components/Breadcrumbs';
import DataIngestFlow from '../../components/DataIngestFlow';
import { LINKS } from '../../links';
import {
  Database,
  Zap,
  Shield,
  ChevronDown,
  Download,
} from 'lucide-react';

const PRODUCT_NAME = 'Ingest';
const HERO_BACKGROUND = '/img/mp4/ingest.mp4';

const FEATURES = [
  {
    icon: <Zap size={28} />,
    type: 'Performance',
    title: 'Real-Time Streaming',
    description:
      'Sub-second latency data streaming for mission-critical applications. Process millions of data points per second with guaranteed delivery.',
  },
  {
    icon: <Database size={28} />,
    type: 'Processing',
    title: 'Smart Data Normalization',
    description:
      'Automatically normalize data from different sources into a unified schema. Vehicle data from Tesla and GM are normalized in the same standard, COVESA format.',
  },
  {
    icon: <Shield size={28} />,
    type: 'Reliability',
    title: 'Enterprise-Grade Reliability',
    description:
      'Built-in redundancy, automatic failover, and data integrity verification. Never lose a data point with our durable message queue architecture.',
  },
];

const STATS = [
  { number: '1B+', label: 'Data Points Daily' },
  { number: '<100ms', label: 'Avg Latency' },
  { number: '40+', label: 'OEM Integrations' },
  { number: '99.99%', label: 'Uptime SLA' },
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
          Collect Vehicle Data from{' '}
          <span className={styles.heroTitleGradient}>Any Source</span>
        </h1>

        <p className={styles.heroSubtitle}>
          A unified data ingestion pipeline that connects to OEMs, aftermarket devices,
          and smartphone apps. Real-time streaming with enterprise-grade reliability.
        </p>

        <div className={styles.heroButtons}>
          <Link className={styles.primaryBtn} to={LINKS.external.console}>
            Start Building <span className={styles.arrow}>→</span>
          </Link>
          <Link className={styles.secondaryBtn} to="/docs">
            View Documentation <span className={styles.arrow}>→</span>
          </Link>
        </div>
      </div>

      <div className={styles.scrollIndicator}>
        <ChevronDown size={32} />
      </div>
    </header>
  );
}

function StatsSection() {
  return (
    <section className={styles.statsBanner}>
      <div className={styles.statsGrid}>
        {STATS.map((stat, i) => (
          <div key={i} className={styles.statItem}>
            <div className={styles.statNumber}>{stat.number}</div>
            <div className={styles.statLabel}>{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className={styles.useCasesSection}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionEyebrow}>Product Features</span>
        <h2 className={styles.sectionTitle}>
          Enterprise-Grade Data Ingestion
        </h2>
        <p className={styles.sectionSubtitle}>
          Built to handle the complexity of vehicle data at scale. From collection
          to normalization, DIMO Ingest handles it all.
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
          Ready to Ingest Vehicle Data at Scale?
        </h2>
        <p className={styles.ctaText}>
          Ingest any vehicle data source through a single, unified service.
        </p>
        <div className={styles.heroButtons}>
          <Link className={styles.primaryBtn} to={LINKS.external.console}>
            Get Started <span className={styles.arrow}>→</span>
          </Link>
          <Link className={styles.secondaryBtn} to="/docs">
            View Documentation <span className={styles.arrow}>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function IngestPage(): ReactNode {
  return (
    <>
      <Head>
        <title>Ingest | DIMO Vehicle Data Collection</title>
        <meta
          name="description"
          content="Collect vehicle data from any source - OEMs, aftermarket devices, and smartphone apps. Real-time streaming with enterprise-grade reliability."
        />
        <meta
          name="keywords"
          content="vehicle data ingestion, OBD-II data, OEM API, real-time streaming, data collection, vehicle telemetry"
        />
        <meta property="og:title" content="Ingest | DIMO Platform" />
        <meta
          property="og:description"
          content="Unified vehicle data ingestion from any source with real-time streaming and enterprise reliability."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.dimo.org/products/ingest" />
      </Head>

      <div className={styles.industryPage}>
        <CustomNavbar dark={true} />

        <Breadcrumbs
          items={[
            { name: 'Home', url: 'https://www.dimo.org/' },
            { name: 'Products', url: 'https://www.dimo.org/#products' },
            { name: 'Ingest' },
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
