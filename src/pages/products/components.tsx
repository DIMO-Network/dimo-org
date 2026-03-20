import React, { type ReactNode, useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import styles from '../solutions/solutions.module.css';
import FooterTheme from '../../theme/Footer';
import CustomNavbar from '../../components/CustomNavbar';
import Breadcrumbs from '../../components/Breadcrumbs';
import { LINKS } from '../../links';
import {
  Wallet,
  Smartphone,
  Terminal,
  Bot,
  ChevronDown,
  Layers,
} from 'lucide-react';

const PRODUCT_NAME = 'Components';

const COMPONENTS = [
  {
    id: 'wallet',
    icon: <Wallet size={28} />,
    type: 'Wallet',
    title: 'Self-Custodied Vehicle Identity',
    description:
      'The DIMO Wallet gives vehicle owners a self-custodied identity on the DIMO Network, used to sign transactions, manage permissions, and hold digital assets.',
    example:
      'Passkey-based authentication — no seed phrases. Sign SACD permission grants and hold vehicle NFTs and on-chain assets.',
  },
  {
    id: 'digital-key',
    icon: <Smartphone size={28} />,
    type: 'Digital Key (CCC)',
    title: 'Phone-as-Key Vehicle Access',
    description:
      "Digital Key enables a smartphone to lock, unlock, and start a vehicle without a physical key fob — integrated into DIMO's identity and permissions layer.",
    example:
      "NFC and BLE-based access. Time-bound or permission-scoped key sharing tied to the vehicle's on-chain identity for auditability.",
  },
  {
    id: 'agents',
    icon: <Bot size={28} />,
    type: 'Agents',
    title: 'Autonomous Vehicle Intelligence',
    description:
      'Build AI agents that can reason about vehicle data, take actions, and automate workflows — from scheduling maintenance to monitoring fleet health.',
    example:
      'Create agents that respond to vehicle events, book appointments, pay for services, alert drivers, and integrate with your existing business systems. Start creating agentic sessions for autonomous vehicles today.',
  },
  {
    id: 'developer-tools',
    icon: <Terminal size={28} />,
    type: 'Developer Tools',
    title: 'Everything You Need to Build',
    description:
      'DIMO provides a full suite of developer tools — SDKs, a developer console, APIs, and AI-native integrations — to get you from zero to production quickly.',
    example:
      'Client and server SDKs, MCP server for AI agents, webhooks, a GraphQL playground, and the Developer Console for managing licenses and permissions.',
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
      <div
        className={styles.heroOverlay}
        style={{
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 50%, rgba(3,3,3,1) 100%)',
        }}
      />

      <div className={styles.heroContent}>
        <span className={styles.industryBadge}>
          <Layers size={16} /> {PRODUCT_NAME}
        </span>

        <h1 className={styles.heroTitle}>
          The Building Blocks of{' '}
          <span className={styles.heroTitleGradient}>Vehicle Ownership</span>
        </h1>

        <p className={styles.heroSubtitle}>
          Wallets, digital key, agents, and developer tools — the core
          components that power the DIMO Network.
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

function ComponentsSection() {
  return (
    <section className={styles.useCasesSection}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionEyebrow}>Core Components</span>
        <h2 className={styles.sectionTitle}>Everything That Makes DIMO Work</h2>
        <p className={styles.sectionSubtitle}>
          Four foundational components that together enable secure vehicle
          connectivity, ownership, and data access.
        </p>
      </div>

      <div className={styles.useCasesGrid}>
        {COMPONENTS.map((component, i) => (
          <div key={i} id={component.id} className={styles.useCaseCard}>
            <div className={styles.useCaseIcon}>{component.icon}</div>
            <div className={styles.useCaseType}>{component.type}</div>
            <h3 className={styles.useCaseTitle}>{component.title}</h3>
            <p className={styles.useCaseDesc}>{component.description}</p>
            <div className={styles.useCaseExample}>{component.example}</div>
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
        <h2 className={styles.ctaTitle}>Ready to Build on DIMO?</h2>
        <p className={styles.ctaText}>
          Integrate vehicle connectivity, identity, and data access into your
          application using DIMO's open platform.
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

export default function ComponentsPage(): ReactNode {
  return (
    <>
      <Head>
        <title>Components | DIMO Platform</title>
        <meta
          name="description"
          content="The core components of the DIMO Network — Wallets, Digital Key, Agents, and Developer Tools."
        />
        <meta
          name="keywords"
          content="DIMO wallet, developer tools, telematic devices, digital key, on-chain identity, AI agents, vehicle NFT, vehicle connectivity"
        />
        <meta property="og:title" content="Components | DIMO Platform" />
        <meta
          property="og:description"
          content="The building blocks of vehicle ownership on the DIMO Network."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.dimo.org/products/components" />
      </Head>

      <div className={styles.industryPage}>
        <CustomNavbar dark={true} />

        <Breadcrumbs
          items={[
            { name: 'Home', url: 'https://www.dimo.org/' },
            { name: 'Products', url: 'https://www.dimo.org/#products' },
            { name: 'Components' },
          ]}
        />

        <main>
          <HeroSection />
          <ComponentsSection />
          <CTASection />
        </main>

        <FooterTheme />
      </div>
    </>
  );
}
