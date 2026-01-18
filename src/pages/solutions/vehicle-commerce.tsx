import React, { type ReactNode, useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import styles from './solutions.module.css';
import FooterTheme from '../../theme/Footer';
import CustomNavbar from '../../components/CustomNavbar';
import { LINKS } from '../../links';
import {
  Star,
  DollarSign,
  Coins,
  Shield,
  Zap,
  RefreshCw,
  ChevronDown,
  CreditCard,
} from 'lucide-react';

const SOLUTION_NAME = 'Vehicle Commerce';
const HERO_BACKGROUND = '/img/solutions/commerce-hero.jpg'; // Placeholder
const imgToken = '/img/token.webp';
const imgDimoAi = '/img/dimo-pathways.gif';
const imgShop = '/img/shop.png';


const USE_CASES = [
  {
    icon: <Coins size={28} />,
    type: 'Payments',
    title: 'Stablecoin Payments',
    description:
      'Accept payments in USDC, USDT, and other stablecoins directly from vehicles. Low fees, instant settlement, and global reach without currency conversion.',
    example:
      'Tolls, parking, charging, and vehicle servicesall paid automatically with stable, reliable cryptocurrency.',
  },
  {
    icon: <Shield size={28} />,
    type: 'Protocol',
    title: 'x402 Payment Protocol',
    description:
      'Machine-to-machine payment standard built for vehicles. Automated, secure, and permission-based transactions between vehicles and service providers.',
    example:
      'Vehicles pay for services automaticallyno user intervention, no payment failures, no friction.',
  },
  {
    icon: <Zap size={28} />,
    type: 'Infrastructure',
    title: 'Instant Settlement',
    description:
      'Payments settle in seconds, not days. Eliminate chargebacks, reduce fraud, and improve cash flow with blockchain-based settlement.',
    example:
      'Service providers receive funds immediatelyno waiting for bank transfers or payment processors.',
  },
  {
    icon: <DollarSign size={28} />,
    type: 'Economics',
    title: 'Low Transaction Fees',
    description:
      'Pay a fraction of traditional payment processing fees. No interchange fees, no processing delaysjust simple, cost-effective transactions.',
    example:
      'Save 60-80% on payment processing costs compared to traditional card networks.',
  },
  {
    icon: <RefreshCw size={28} />,
    type: 'Automation',
    title: 'Automated Micropayments',
    description:
      'Enable micropayments for usage-based services. Pay-per-mile insurance, per-kWh charging, or per-minute parkingall automated and seamless.',
    example:
      'Users pay only for what they use, with transactions happening automatically in the background.',
  },
  {
    icon: <CreditCard size={28} />,
    type: 'Integration',
    title: 'Seamless Wallet Integration',
    description:
      'Built-in wallet infrastructure with user-friendly interfaces. Users manage balances, view transactions, and control spendingall within your app.',
    example:
      'One-tap payments, transaction history, and spending controlsnative wallet experience included.',
  },
];

const STATS = [
  { number: '<3s', label: 'Payment Settlement' },
  { number: '70%', label: 'Lower Fees' },
  { number: 'USDC/USDT', label: 'Stablecoins Supported' },
  { number: 'x402', label: 'Open Protocol' },
];

const TESTIMONIALS = [
  {
    name: 'Elena Rodriguez',
    role: 'CEO, EV Charging Network',
    text: "Stablecoin payments transformed our business model. Instant settlement means better cash flow, and the low fees let us serve more customers profitably. x402 makes it completely automated.",
  },
  {
    name: 'Thomas Anderson',
    role: 'Founder, Smart Parking Solutions',
    text: 'Micropayments were impossible with traditional payment rails. With DIMO, we charge per-minute and settle instantly. Our customers love the pay-as-you-go model.',
  },
  {
    name: 'Priya Patel',
    role: 'COO, Mobility Platform',
    text: "The x402 protocol is brilliant. Vehicles pay for tolls, parking, and charging automatically. It's the seamless experience our users expect, and it just works.",
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
          <DollarSign size={16} /> {SOLUTION_NAME}
        </span>

        <h1 className={styles.heroTitle}>
          Enable Frictionless Vehicle Payments with{' '}
          <span className={styles.heroTitleGradient}>
            Stablecoins & x402
          </span>
        </h1>

        <p className={styles.heroSubtitle}>
          Accept stablecoin payments, enable machine-to-machine transactions, and
          automate vehicle commerce with the x402 protocol. Low fees, instant
          settlement, and global reachbuilt for modern mobility.
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

function UseCasesSection() {
  return (
    <section className={styles.useCasesSection}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionEyebrow}>Platform Features</span>
        <h2 className={styles.sectionTitle}>
          Everything You Need for Vehicle Payments
        </h2>
        <p className={styles.sectionSubtitle}>
          From stablecoin infrastructure to the x402 payment protocol, DIMO
          provides the complete platform for building modern vehicle commerce
          applications.
        </p>
      </div>

      <div className={styles.useCasesGrid}>
        {USE_CASES.map((useCase, i) => (
          <div key={i} className={styles.useCaseCard}>
            <div className={styles.useCaseIcon}>{useCase.icon}</div>
            <div className={styles.useCaseType}>{useCase.type}</div>
            <h3 className={styles.useCaseTitle}>{useCase.title}</h3>
            <p className={styles.useCaseDesc}>{useCase.description}</p>
            <div className={styles.useCaseExample}>{useCase.example}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeatureSection1() {
  return (
    <section className={`${styles.featureSection} ${styles.featureSectionAlt}`}>
      <div className={styles.featureContainer}>
        <div className={styles.featureText}>
          <h2>Stablecoin Payments: Fast, Cheap, Global</h2>
          <p>
            Accept USDC, USDT, and other stablecoins for vehicle services. Instant
            settlement, low fees, and no currency conversion--payments that work
            globally without the complexity of traditional payment processors.
          </p>
          <ul className={styles.featureList}>
            <li>
              <span className={styles.checkIcon}>✓</span>
              USDC and USDT support on major blockchains (Polygon, Base, etc.)
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              Settlement in seconds, not days
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              70% lower transaction fees than card networks
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              No chargebacks, no fraud -- immutable on-chain transactions
            </li>
          </ul>
        </div>
        <div className={styles.featureVisual}>
            <img src={imgToken} alt="Stablecoin Tokens" />
        </div>
      </div>
    </section>
  );
}

function FeatureSection2() {
  return (
    <section className={styles.featureSection}>
      <div className={`${styles.featureContainer} ${styles.featureContainerReversed}`}>
        <div className={styles.featureText}>
          <h2>x402 Protocol: Machine-to-Machine Payments</h2>
          <p>
            The x402 protocol enables automated, permission-based transactions
            between vehicles and service providers. Vehicles pay for tolls, parking,
            charging, and services automaticallyno user interaction required.
          </p>
          <ul className={styles.featureList}>
            <li>
              <span className={styles.checkIcon}>✓</span>
              Open standard for vehicle-to-infrastructure payments
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              Permission-based spending with user-defined limits
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              Automated payments without user intervention
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              Compatible with existing payment infrastructure
            </li>
          </ul>
        </div>
        <div className={styles.featureVisual}>
            <img src={imgDimoAi} alt="x402 Protocol Diagram" />
        </div>
      </div>
    </section>
  );
}

function FeatureSection3() {
  return (
    <section className={`${styles.featureSection} ${styles.featureSectionAlt}`}>
      <div className={styles.featureContainer}>
        <div className={styles.featureText}>
          <h2>Built-In Wallet Infrastructure</h2>
          <p>
            Complete wallet solution with user-friendly interfaces. Users manage
            balances, view transaction history, and control spendingall integrated
            into your application with no additional development required.
          </p>
          <ul className={styles.featureList}>
            <li>
              <span className={styles.checkIcon}>✓</span>
              Non-custodial wallets with secure key management
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              On/off ramp integrations for fiat conversion
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              Transaction history and spending analytics
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              Spending limits and parental controls
            </li>
          </ul>
        </div>
        <div className={styles.featureVisual}>
            <img src={imgShop} alt="Wallet Interface" />
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      title: 'Integrate Payment Infrastructure',
      description:
        'Add DIMO\'s wallet and payment infrastructure to your app. Users create wallets and fund them with stablecoins through our on-ramp integrations.',
    },
    {
      title: 'Configure x402 Permissions',
      description:
        'Users grant payment permissions to their vehicles with spending limits and service categories. All permissions are transparent and revocable.',
    },
    {
      title: 'Enable Automated Payments',
      description:
        'Vehicles pay for services automatically using x402 protocol. Tolls, parking, chargingall handled without user intervention.',
    },
    {
      title: 'Track & Settle Instantly',
      description:
        'Payments settle in seconds on-chain. Service providers receive funds immediately, and users see real-time transaction history.',
    },
  ];

  return (
    <section className={styles.howItWorksSection}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionEyebrow}>How It Works</span>
        <h2 className={styles.sectionTitle}>Enable Vehicle Payments</h2>
        <p className={styles.sectionSubtitle}>
          From wallet integration to automated payments, DIMO makes it easy to build
          vehicle commerce applications with stablecoins and x402.
        </p>
      </div>

      <div className={styles.stepsContainer}>
        {steps.map((step, i) => (
          <div key={i} className={styles.step}>
            <div className={styles.stepNumber}>{i + 1}</div>
            <div className={styles.stepLine} />
            <div className={styles.stepContent}>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className={styles.testimonialsSection}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionEyebrow}>Testimonials</span>
        <h2 className={styles.sectionTitle}>Trusted by Commerce Leaders</h2>
      </div>

      <div className={styles.testimonialMarqueeContainer}>
        <div
          className={`${styles.testimonialMarquee} ${isPaused ? styles.paused : ''}`}
        >
          {[...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
            <div
              key={i}
              className={styles.testimonialCard}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div className={styles.testimonialHeader}>
                <div className={styles.testimonialAvatar}>{t.name[0]}</div>
                <div>
                  <div className={styles.testimonialName}>{t.name}</div>
                  <div className={styles.testimonialRole}>{t.role}</div>
                  <div className={styles.testimonialStars}>
                    {[1, 2, 3, 4, 5].map(s => (
                      <Star key={s} size={14} fill="currentColor" strokeWidth={0} />
                    ))}
                  </div>
                </div>
              </div>
              <p className={styles.testimonialText}>{t.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.ctaContent}>
        <h2 className={styles.ctaTitle}>
          Ready to Enable Vehicle Commerce?
        </h2>
        <p className={styles.ctaText}>
          Join the companies building the future of vehicle payments with
          stablecoins and the x402 protocol.
        </p>
        <div className={styles.heroButtons}>
          <Link className={styles.primaryBtn} to={LINKS.external.console}>
            Get Started <span className={styles.arrow}>→</span>
          </Link>
          <Link
            className={styles.secondaryBtn}
            to="/docs"
          >
            View Documentation <span className={styles.arrow}>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function VehicleCommercePage(): ReactNode {
  return (
    <>
      <Head>
        <title>Vehicle Commerce | Stablecoin Payments & x402 Protocol</title>
        <meta
          name="description"
          content="Enable frictionless vehicle payments with stablecoins (USDC, USDT) and the x402 protocol. Instant settlement, low fees, and automated machine-to-machine transactions."
        />
        <meta
          name="keywords"
          content="vehicle payments, stablecoin payments, USDC, USDT, x402 protocol, crypto payments, blockchain payments, vehicle commerce, automated payments"
        />
        <meta property="og:title" content="Vehicle Commerce | DIMO Platform" />
        <meta
          property="og:description"
          content="Accept stablecoin payments and enable automated vehicle transactions with x402 protocol. Low fees, instant settlement, and global reach."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://docs.dimo.org/solutions/vehicle-commerce" />

        {/* Structured Data for SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'DIMO Vehicle Commerce Platform',
            description:
              'Vehicle payment platform with stablecoin support and x402 protocol. Enable automated, low-fee payments for mobility services.',
            applicationCategory: 'FinanceApplication',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
          })}
        </script>
      </Head>

      <div className={styles.industryPage}>
        <CustomNavbar dark={true} />

        <main>
          <HeroSection />
          <StatsSection />
          <UseCasesSection />
          <FeatureSection1 />
          <FeatureSection2 />
          <FeatureSection3 />
          <HowItWorksSection />
          {/* <TestimonialsSection /> */}
          <CTASection />
        </main>

        <FooterTheme />
      </div>
    </>
  );
}
