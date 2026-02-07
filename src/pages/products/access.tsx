import React, { type ReactNode, useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import styles from '../solutions/solutions.module.css';
import FooterTheme from '../../theme/Footer';
import CustomNavbar from '../../components/CustomNavbar';
import Breadcrumbs from '../../components/Breadcrumbs';
import DataAccessFlow from '../../components/DataAccessFlow';
import { LINKS } from '../../links';
import {
  Key,
  Webhook,
  Code,
  Gauge,
  ChevronDown,
} from 'lucide-react';

const PRODUCT_NAME = 'Access';
const HERO_BACKGROUND = '/img/mp4/access.mp4';

const FEATURES = [
  {
    icon: <Key size={28} />,
    type: 'Authentication',
    title: 'Easy Access Control with Developer Console',
    description:
      'Easily manage app permissions and vehicle access through a user-friendly interface.',
    example:
      'One-stop-shop with intuitive UI, state-of-the-art security features for managing application access.',
  },
  {
    icon: <Code size={28} />,
    type: 'APIs & SDKs',
    title: 'Unified Data & AI-first APIs',
    description:
      'Access all vehicle data through clean, well-documented APIs & SDKs. Supports multiple languages and see the value of Agentic AI in action.',
    example:
      'Ask an AI agent about vehicle health and have agents take actions for you, call a mechanic, book an appointment, research and buy parts.',
  },
  {
    icon: <Webhook size={28} />,
    type: 'Real-Time',
    title: 'Webhooks, Events, Trips',
    description:
      'Get notified instantly when vehicle data changes. Real-time webhooks, events, and trips data to build event-driven applications.',
    example:
      'Receive notifications when a vehicle enters a geofence, look up harsh braking events, and analyze trips.',
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
          <Key size={16} /> {PRODUCT_NAME}
        </span>

        <h1 className={styles.heroTitle}>
          Access Vehicle Data With Ease{' '}
          <span className={styles.heroTitleGradient}></span>
        </h1>

        <p className={styles.heroSubtitle}>
          Clean, fast, easy-to-use APIs & SDKs for accessing vehicle data. Drive meaningful outcomes using AI Agents to allow conversational interactions with your fleet.
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
          Developer-First API Platform
        </h2>
        <p className={styles.sectionSubtitle}>
          Built by developers, for developers. Clean APIs, comprehensive SDKs,
          and documentation that actually helps.
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
          Ready to Access Vehicle Data?
        </h2>
        <p className={styles.ctaText}>
          Get your API keys and start building in minutes. Comprehensive SDKs
          for every major language, works seamlessly with our REST and GraphQL APIs.
        </p>
        <div className={styles.heroButtons}>
          <Link className={styles.primaryBtn} to={LINKS.external.console}>
            Get API Keys <span className={styles.arrow}>→</span>
          </Link>
          <Link className={styles.secondaryBtn} to="/docs">
            View Documentation <span className={styles.arrow}>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function AccessPage(): ReactNode {
  return (
    <>
      <Head>
        <title>Access | DIMO Vehicle Data APIs</title>
        <meta
          name="description"
          content="Fast, reliable APIs for accessing vehicle data. REST, GraphQL, webhooks, and streaming with global edge deployment."
        />
        <meta
          name="keywords"
          content="vehicle API, REST API, GraphQL API, webhooks, real-time data, vehicle telemetry API"
        />
        <meta property="og:title" content="Access | DIMO Platform" />
        <meta
          property="og:description"
          content="Developer-first API platform for vehicle data with global edge deployment."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.dimo.org/products/access" />
      </Head>

      <div className={styles.industryPage}>
        <CustomNavbar dark={true} />

        <Breadcrumbs
          items={[
            { name: 'Home', url: 'https://www.dimo.org/' },
            { name: 'Products', url: 'https://www.dimo.org/#products' },
            { name: 'Access' },
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
