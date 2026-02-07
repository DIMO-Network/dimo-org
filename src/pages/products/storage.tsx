import React, { type ReactNode, useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import styles from '../solutions/solutions.module.css';
import FooterTheme from '../../theme/Footer';
import CustomNavbar from '../../components/CustomNavbar';
import Breadcrumbs from '../../components/Breadcrumbs';
import { LINKS } from '../../links';
import {
  HardDrive,
  Search,
  Clock,
  Shield,
  ChevronDown,
  Database,
} from 'lucide-react';

const PRODUCT_NAME = 'Storage';
const HERO_BACKGROUND = '/img/mp4/storage.mp4';

const FEATURES = [
  {
    icon: <HardDrive size={28} />,
    type: 'Infrastructure',
    title: 'Cloud or On-Prem, Your Choice',
    description:
      'Store vehicle data with flexible options, managed by DIMO or on-premise in your data infrastructure.',
    example:
      'Start easy with our free cloud storage or deploy to your own AWS or GCP clusters.',
  },
  {
    icon: <Search size={28} />,
    type: 'Query Engine',
    title: 'Lightning-Fast Queries',
    description:
      'Purpose-built query engine optimized for time-series vehicle data. Run complex analytics across billions of records in milliseconds.',
    example:
      'Query average fuel efficiency over 6 months in under 500ms.',
  },
  {
    icon: <Clock size={28} />,
    type: 'Flexibility',
    title: 'Flexibility + Security',
    description:
      'Stop worrying about data storage compliance, our storage solution is designed with enterprise-grade security and compliance in mind.',
    example:
      'Fine-grained access controls and encryption to protect sensitive data.'
  }
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
          Scalable Data Storage{' '}
          <span className={styles.heroTitleGradient}>Cloud or On-Prem</span>
        </h1>

        <p className={styles.heroSubtitle}>
          Petabyte-scale storage optimized for vehicle telemetry. Lightning-fast queries,
          flexible retention, and enterprise-grade security.
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


function FeaturesSection() {
  return (
    <section className={styles.useCasesSection}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionEyebrow}>Product Features</span>
        <h2 className={styles.sectionTitle}>
          Built for Vehicle Data at Scale
        </h2>
        <p className={styles.sectionSubtitle}>
          Purpose-built storage infrastructure that handles the unique challenges
          of vehicle telemetry data.
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
          Ready to Deploy Vehicle Data Storage?
        </h2>
        <p className={styles.ctaText}>
          Get started with DIMO storage designed specifically
          for vehicle telemetry and analytics.
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

export default function StoragePage(): ReactNode {
  return (
    <>
      <Head>
        <title>Storage | DIMO Vehicle Data Storage</title>
        <meta
          name="description"
          content="Petabyte-scale vehicle data storage with lightning-fast queries, flexible retention, and enterprise-grade security."
        />
        <meta
          name="keywords"
          content="vehicle data storage, time-series database, vehicle telemetry, data retention, encrypted storage"
        />
        <meta property="og:title" content="Storage | DIMO Platform" />
        <meta
          property="og:description"
          content="Scalable storage infrastructure built for vehicle telemetry data at any scale."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.dimo.org/products/storage" />
      </Head>

      <div className={styles.industryPage}>
        <CustomNavbar dark={true} />

        <Breadcrumbs
          items={[
            { name: 'Home', url: 'https://www.dimo.org/' },
            { name: 'Products', url: 'https://www.dimo.org/#products' },
            { name: 'Storage' },
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
