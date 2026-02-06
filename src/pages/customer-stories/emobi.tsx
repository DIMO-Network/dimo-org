import React, { type ReactNode, useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import styles from './customer-stories.module.css';
import FooterTheme from '../../theme/Footer';
import CustomNavbar from '../../components/CustomNavbar';
import Breadcrumbs from '../../components/Breadcrumbs';
import { LINKS } from '../../links';
import {
  Star,
  Zap,
  Shield,
  Car,
  Plug,
  AlertTriangle,
  Battery,
} from 'lucide-react';

const COMPANY_NAME = 'Emobi';
const HERO_BACKGROUND = '/img/emobi.png';

// Key metrics showcasing results
const RESULTS = [
  { number: 'First', label: 'Fleet-Ready Plug & Charge Device' },
  { number: 'ISO 15118', label: 'Standards Compliant' },
  { number: '140K+', label: 'Chargers Accessible' },
  { number: 'Any', label: 'Vehicle Compatible' },
];

// Problems they faced
const CHALLENGES = [
  {
    icon: <AlertTriangle size={28} />,
    title: 'Automaker Dependency',
    description:
      'Existing Plug & Charge implementations relied on automaker-issued certificates, limiting adoption to specific vehicles and requiring costly OEM partnerships.',
  },
  {
    icon: <Car size={28} />,
    title: 'Limited Vehicle Support',
    description:
      'Fleets with mixed vehicle brands and legacy EVs were excluded from Plug & Charge benefits, forcing drivers to use multiple apps and payment methods.',
  },
  {
    icon: <Plug size={28} />,
    title: 'Complex Infrastructure',
    description:
      'Enabling Plug & Charge traditionally required firmware updates, hardware upgrades, and complex integrations with charging networks.',
  },
];

// Solutions implemented
const SOLUTIONS = [
  {
    icon: <Battery size={28} />,
    title: 'Device-Based Digital Certificates',
    description:
      'Emobi\'s JustPlug™ technology issues ISO 15118 digital certificates directly to fleet vehicles through DIMO\'s OBD-II device or virtual onboarding—no automaker involvement required.',
    result:
      'Any fleet can now enable Plug & Charge on any vehicle, including legacy EVs, without waiting for OEM support.',
  },
  {
    icon: <Shield size={28} />,
    title: 'Secure Identity Bridge',
    description:
      'DIMO\'s device securely hosts the EV\'s digital charging identity, serving as the bridge for Plug & Charge without requiring any changes to the vehicle itself.',
    result:
      'Fleets maintain full control over their charging credentials with enterprise-grade security and compliance.',
  },
  {
    icon: <Zap size={28} />,
    title: 'Universal Charging Access',
    description:
      'The partnership combines DIMO\'s fleet intelligence platform with Emobi\'s access to over 140,000 chargers across the U.S. and Canada.',
    result:
      'Drivers experience seamless, app-free charging across both modern and legacy charging infrastructure.',
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
          backgroundPosition: 'center 10%',
          backgroundSize: '70% auto',
        }}
      />
      <div className={styles.heroOverlay} />

      <div className={styles.heroContent}>
        <span className={styles.storyBadge}>
          <Star size={16} /> Customer Story
        </span>

        <h1 className={styles.heroTitle}>
          <a href="https://www.emobi.ai/" target="_blank" rel="noopener noreferrer">
            <span className={styles.heroTitleGradient}>
              {COMPANY_NAME}
            </span>
          </a> and DIMO Deliver the First{' '}
          <span className={styles.heroTitleGradient}>
            Fleet-Ready Plug & Charge Device
          </span>
        </h1>

        <p className={styles.heroSubtitle}>
          A groundbreaking partnership that brings secure, seamless ISO 15118 Plug & Charge
          to any fleet vehicle—without automaker dependencies, firmware updates, or hardware upgrades.
        </p>

        <div className={styles.heroButtons}>
          <Link className={styles.primaryBtn} to={LINKS.external.console}>
            Enable Your Fleet <span className={styles.arrow}>→</span>
          </Link>
          <Link className={styles.secondaryBtn} to="/docs">
            Read Our Documentation <span className={styles.arrow}>→</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

function ResultsSection() {
  return (
    <section className={styles.statsBanner}>
      <div className={styles.sectionHeader} style={{ marginBottom: '2rem' }}>
        <h2 className={styles.sectionTitle}>The Innovation</h2>
      </div>
      <div className={styles.statsGrid}>
        {RESULTS.map((stat, i) => (
          <div key={i} className={styles.statItem}>
            <div className={styles.statNumber}>{stat.number}</div>
            <div className={styles.statLabel}>{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ChallengesSection() {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionEyebrow}>The Industry Challenge</span>
        <h2 className={styles.sectionTitle}>
          Plug & Charge Promise vs. Reality
        </h2>
        <p className={styles.sectionSubtitle}>
          Plug & Charge has long promised app-free EV charging, but the industry has struggled
          to deliver it at scale. Cost, complexity, and automaker-led implementations have
          kept this convenience out of reach for most fleets.
        </p>
      </div>

      <div className={styles.cardsGrid}>
        {CHALLENGES.map((challenge, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.cardIcon}>{challenge.icon}</div>
            <h3 className={styles.cardTitle}>{challenge.title}</h3>
            <p className={styles.cardDesc}>{challenge.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function SolutionsSection() {
  return (
    <section className={`${styles.section} ${styles.sectionAlt}`}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionEyebrow}>The DIMO + Emobi Solution</span>
        <h2 className={styles.sectionTitle}>
          Fleet-Level Plug & Charge Enablement
        </h2>
        <p className={styles.sectionSubtitle}>
          By shifting Plug & Charge enablement from automakers to fleets, the partnership
          unlocks secure, standards-based charging for any driver in any vehicle.
        </p>
      </div>

      <div className={styles.cardsGrid}>
        {SOLUTIONS.map((solution, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.cardIcon}>{solution.icon}</div>
            <h3 className={styles.cardTitle}>{solution.title}</h3>
            <p className={styles.cardDesc}>{solution.description}</p>
            <div className={styles.cardHighlight}>
              <strong>Impact:</strong> {solution.result}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function QuoteSection() {
  return (
    <section className={styles.testimonialSection}>
      <div className={styles.testimonialContainer}>
        <div className={styles.testimonialStars}>
          <Star size={32} fill="currentColor" strokeWidth={0} />
          <Star size={32} fill="currentColor" strokeWidth={0} />
          <Star size={32} fill="currentColor" strokeWidth={0} />
          <Star size={32} fill="currentColor" strokeWidth={0} />
          <Star size={32} fill="currentColor" strokeWidth={0} />
        </div>
        <blockquote className={styles.testimonialQuote}>
          "This partnership represents a major milestone for EV adoption. Electric vehicles have been promised a seamless Plug & Charge experience for years, but have had to keep waiting as the industry struggled to deliver it at scale. Issuing ISO 15118 digital certificates directly to fleets through DIMO's device puts control where it belongs, and unlocks Plug & Charge functionality for any car today."
        </blockquote>
        <div className={styles.testimonialAuthor}>Lin Sun Fa</div>
        <div className={styles.testimonialRole}>CEO, Emobi</div>
      </div>
    </section>
  );
}

function SecondQuoteSection() {
  return (
    <section className={`${styles.testimonialSection} ${styles.sectionAlt}`}>
      <div className={styles.testimonialContainer}>
        <blockquote className={styles.testimonialQuote}>
          "With Emobi, we're extending DIMO's mission of smarter, safer mobility into fleet charging operations. Together, we're helping fleets spend less time managing infrastructure complexity and more time keeping vehicles on the road and delivering results."
        </blockquote>
        <div className={styles.testimonialAuthor}>Yevgeny Khessin</div>
        <div className={styles.testimonialRole}>Co-founder, DIMO</div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      phase: 'Step 1',
      title: 'Connect with DIMO',
      description:
        'Fleets connect their vehicles using DIMO\'s affordable OBD-II device or virtual onboarding, enabling advanced vehicle intelligence without costly upgrades.',
    },
    {
      phase: 'Step 2',
      title: 'Certificate Issuance',
      description:
        'Emobi\'s JustPlug™ issues and manages an ISO 15118 digital certificate at the fleet level via DIMO\'s device—no automaker involvement or firmware updates required.',
    },
    {
      phase: 'Step 3',
      title: 'Secure Identity Hosting',
      description:
        'The DIMO device or cloud securely hosts the EV\'s digital charging identity, serving as the bridge for Plug & Charge without any changes to the vehicle.',
    },
    {
      phase: 'Step 4',
      title: 'Seamless Charging',
      description:
        'Drivers simply plug in at any of 140,000+ compatible chargers across the U.S. and Canada. Authentication and payment happen automatically.',
    },
  ];

  return (
    <section className={styles.timelineSection}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionEyebrow}>How It Works</span>
        <h2 className={styles.sectionTitle}>From Connection to Charging</h2>
        <p className={styles.sectionSubtitle}>
          A simple four-step process that finally delivers the universal Plug & Charge
          experience fleets and drivers have been waiting for.
        </p>
      </div>

      <div className={styles.stepsContainer}>
        {steps.map((step, i) => (
          <div key={i} className={styles.step}>
            <div className={styles.stepNumber}>{step.phase}</div>
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

function KeyTakeawaysSection() {
  const takeaways = [
    'First fleet-ready device to enable secure ISO 15118 Plug & Charge without automaker involvement',
    'Works with any vehicle—including legacy EVs—through DIMO\'s OBD-II device or virtual onboarding',
    'No firmware updates, hardware upgrades, or charging infrastructure changes required',
    'Access to 140,000+ chargers across the U.S. and Canada through Emobi\'s roaming network',
    'Fleet-level certificate management puts control where it belongs—with the fleet operator',
    'Trusted by the U.S. Department of Energy and Department of Transportation',
  ];

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionEyebrow}>Key Takeaways</span>
        <h2 className={styles.sectionTitle}>Why This Matters</h2>
      </div>
      <ul className={styles.takeawaysList}>
        {takeaways.map((takeaway, i) => (
          <li key={i}>
            <span className={styles.checkIcon}>✓</span>
            {takeaway}
          </li>
        ))}
      </ul>
    </section>
  );
}

function CTASection() {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.ctaContent}>
        <h2 className={styles.ctaTitle}>
          Ready to Enable Plug & Charge for Your Fleet?
        </h2>
        <p className={styles.ctaText}>
          Join the fleets already benefiting from seamless, app-free EV charging.
          Get started with DIMO and Emobi's JustPlug™ technology today.
        </p>
        <div className={styles.heroButtons}>
          <Link className={styles.primaryBtn} to={LINKS.external.console}>
            Get Started <span className={styles.arrow}>→</span>
          </Link>
          <Link
            className={styles.secondaryBtn}
            to="/docs"
          >
            Read the Docs <span className={styles.arrow}>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function EmobiCaseStudy(): ReactNode {
  return (
    <>
      <Head>
        <title>Emobi Partnership | DIMO Fleet Plug & Charge Success Story</title>
        <meta
          name="description"
          content="See how Emobi and DIMO partnered to deliver the first fleet-ready Plug & Charge device using ISO 15118 standards—enabling seamless EV charging for any vehicle without automaker dependencies."
        />
        <meta
          name="keywords"
          content="Emobi, DIMO partnership, Plug and Charge, ISO 15118, fleet EV charging, JustPlug, electric vehicle charging, fleet management"
        />
        <meta property="og:title" content="Emobi + DIMO Partnership | Fleet Plug & Charge" />
        <meta
          property="og:description"
          content="How Emobi and DIMO delivered the first fleet-ready Plug & Charge device: ISO 15118 compliant, any vehicle compatible, 140K+ chargers accessible."
        />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://www.dimo.org/customer-stories/emobi" />

        {/* Structured Data for Case Study */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Emobi and DIMO Partner to Deliver First Fleet-Ready Plug & Charge Device',
            description:
              'Partnership combines Emobi\'s JustPlug™ technology with DIMO\'s vehicle intelligence platform to bring secure, seamless ISO 15118 Plug & Charge to fleets for the first time.',
            author: {
              '@type': 'Organization',
              name: 'DIMO',
            },
            publisher: {
              '@type': 'Organization',
              name: 'DIMO',
              logo: {
                '@type': 'ImageObject',
                url: 'https://www.dimo.org/img/dimo-build-logo-dark.svg',
              },
            },
            datePublished: '2026-02-01',
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://www.dimo.org/customer-stories/emobi',
            },
          })}
        </script>
      </Head>

      <div className={styles.storyPage}>
        <CustomNavbar dark={true} />

        <Breadcrumbs
          items={[
            { name: 'Home', url: 'https://www.dimo.org/' },
            { name: 'Customer Stories', url: 'https://www.dimo.org/#customer-stories' },
            { name: 'Emobi' },
          ]}
        />

        <main>
          <HeroSection />
          <ResultsSection />
          <ChallengesSection />
          <SolutionsSection />
          <QuoteSection />
          <HowItWorksSection />
          <SecondQuoteSection />
          <KeyTakeawaysSection />
          <CTASection />
        </main>

        <FooterTheme />
      </div>
    </>
  );
}
