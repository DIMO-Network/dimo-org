import React, { type ReactNode, useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import styles from '../solutions/solutions.module.css';
import FooterTheme from '../../theme/Footer';
import CustomNavbar from '../../components/CustomNavbar';
import Breadcrumbs from '../../components/Breadcrumbs';
import ConsentFlow from '../../components/ConsentFlow';
import { LINKS } from '../../links';
import {
  Shield,
  UserCheck,
  FileCheck,
  ChevronDown,
  ShieldCheck,
} from 'lucide-react';

const PRODUCT_NAME = 'Consent';
const HERO_BACKGROUND = '/img/solutions/agentic-hero.jpg';

const FEATURES = [
  {
    icon: <UserCheck size={28} />,
    type: 'User Control',
    title: 'Granular Permission Scopes',
    description:
      'Users grant access to specific data types and actions. Location, diagnostics, commands - each permission is individually controllable and revocable.',
    example:
      'Grant/revoke/extend permissions with Login with DIMO, allowing users to easily manage consent preferences.',
  },
  {
    icon: <Shield size={28} />,
    type: 'Verification',
    title: 'Blockchain-Verified Consent',
    description:
      'Every consent grant is recorded on-chain, creating an immutable audit trail. Prove compliance with cryptographic certainty.',
    example:
      'Instant verification of consent status for auditors and regulators.',
  },
  {
    icon: <FileCheck size={28} />,
    type: 'Compliance',
    title: 'Built-In Regulatory Compliance',
    description:
      'GDPR & EU Data Act compliant out of the box. Automated data subject requests, right to erasure, and consent withdrawal.',
    example:
      'One-click GDPR data export and deletion for any user, fully automated.',
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
        className={styles.heroBackground}
        style={{
          backgroundImage: `url(${HERO_BACKGROUND})`,
          transform: `translateY(${scrollY * 0.3}px)`,
        }}
      />
      <div className={styles.heroOverlay} />

      <div className={styles.heroContent}>
        <span className={styles.industryBadge}>
          <ShieldCheck size={16} /> {PRODUCT_NAME}
        </span>

        <h1 className={styles.heroTitle}>
          User-Controlled Data{' '}
          <span className={styles.heroTitleGradient}>Consent</span>
        </h1>

        <p className={styles.heroSubtitle}>
          Give users complete control over their vehicle data. Blockchain-verified
          consent management with built-in regulatory compliance.
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
          Privacy-First Consent Management
        </h2>
        <p className={styles.sectionSubtitle}>
          Build user trust with transparent, verifiable consent. Meet regulatory
          requirements while creating seamless user experiences.
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
          Ready to Build Trust with Users?
        </h2>
        <p className={styles.ctaText}>
          Implement consent management that users trust and regulators approve.
          Get started with Login with DIMO today.
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

export default function ConsentPage(): ReactNode {
  return (
    <>
      <Head>
        <title>Consent | DIMO User Consent Management</title>
        <meta
          name="description"
          content="User-controlled vehicle data consent with blockchain verification and built-in regulatory compliance. GDPR, CCPA, EU Data Act ready."
        />
        <meta
          name="keywords"
          content="consent management, GDPR compliance, OAuth 2.0, Login with DIMO, data privacy, blockchain verification"
        />
        <meta property="og:title" content="Consent | DIMO Platform" />
        <meta
          property="og:description"
          content="Privacy-first consent management with blockchain verification and regulatory compliance."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.dimo.org/products/consent" />
      </Head>

      <div className={styles.industryPage}>
        <CustomNavbar dark={true} />

        <Breadcrumbs
          items={[
            { name: 'Home', url: 'https://www.dimo.org/' },
            { name: 'Products', url: 'https://www.dimo.org/#products' },
            { name: 'Consent' },
          ]}
        />

        <main>
          <HeroSection />
          <ConsentFlow />
          <FeaturesSection />
          <CTASection />
        </main>

        <FooterTheme />
      </div>
    </>
  );
}
