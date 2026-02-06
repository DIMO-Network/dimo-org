import React, { type ReactNode, useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import styles from '../solutions/solutions.module.css';
import FooterTheme from '../../theme/Footer';
import CustomNavbar from '../../components/CustomNavbar';
import Breadcrumbs from '../../components/Breadcrumbs';
import { LINKS } from '../../links';
import {
  CreditCard,
  ShieldCheck,
  ChevronDown,
  CircleDollarSign
} from 'lucide-react';

const PRODUCT_NAME = 'Pay';
const HERO_BACKGROUND = '/img/solutions/agentic-hero.jpg';

const FEATURES = [
  {
    icon: <CreditCard size={28} />,
    type: 'Payments',
    title: 'In-Vehicle Payments',
    description:
      'Enable seamless payments from inside the vehicle. Fuel, parking, tolls, EV charging - all automated with driver consent.',
    example:
      'Drivers pay for EV charging automatically when they plug in/unplug, delete those 20 apps today.',
  },
  {
    icon: <ShieldCheck size={28} />,
    type: 'Security',
    title: 'Security-first Vehicle Commerce',
    description:
      'Built-in security features to protect user data and transactions. Compliance with industry standards and regulations.',
    example:
      'Drive and pay seamlessly with DIMO, without worrying about security.',
  },
  {
    icon: <CircleDollarSign size={28} />,
    type: 'Rewards',
    title: 'Driver Rewards & Incentives',
    description:
      'Reward drivers for safe driving, eco-friendly habits, or loyalty. Customizable rewards programs to drive engagement and retention.',
    example:
      'Give drivers cashback for fuel-efficient driving or discounts at partner businesses.',
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
          <CreditCard size={16} /> {PRODUCT_NAME}
        </span>

        <h1 className={styles.heroTitle}>
          Vehicle-Native{' '}
          <span className={styles.heroTitleGradient}>Payments</span>
        </h1>

        <p className={styles.heroSubtitle}>
          Enable payments from inside the vehicle. Usage-based billing, multi-party
          settlements, and real-time revenue analytics.
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
          Payments Built for Mobility
        </h2>
        <p className={styles.sectionSubtitle}>
          From in-vehicle transactions to complex multi-party settlements,
          DIMO Pay handles the unique payment needs of the automotive industry.
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
          Ready to Monetize Vehicle Data?
        </h2>
        <p className={styles.ctaText}>
          Enable vehicle-native payments and usage-based billing.
          Start processing payments in minutes.
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

export default function PayPage(): ReactNode {
  return (
    <>
      <Head>
        <title>Pay | DIMO Vehicle Payments</title>
        <meta
          name="description"
          content="Vehicle-native payments with usage-based billing, multi-party settlements, and real-time analytics. 150+ payment methods in 40+ countries."
        />
        <meta
          name="keywords"
          content="vehicle payments, in-car payments, usage-based billing, mobility payments, EV charging payments"
        />
        <meta property="og:title" content="Pay | DIMO Platform" />
        <meta
          property="og:description"
          content="Enable payments from inside the vehicle with usage-based billing and multi-party settlements."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.dimo.org/products/pay" />
      </Head>

      <div className={styles.industryPage}>
        <CustomNavbar dark={true} />

        <Breadcrumbs
          items={[
            { name: 'Home', url: 'https://www.dimo.org/' },
            { name: 'Products', url: 'https://www.dimo.org/#products' },
            { name: 'Pay' },
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
