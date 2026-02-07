import React, { type ReactNode, useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import styles from './solutions.module.css';
import FooterTheme from '../../theme/Footer';
import CustomNavbar from '../../components/CustomNavbar';
import Breadcrumbs from '../../components/Breadcrumbs';
import { LINKS } from '../../links';
import {
  Star,
  Smartphone,
  Palette,
  Globe,
  Zap,
  Download,
  ChevronDown,
  Users,
} from 'lucide-react';

const SOLUTION_NAME = 'Consumer Applications';
const HERO_BACKGROUND = '/img/mp4/consumer.mp4';
const imgMobile = '/img/dimo-mobile.png';
const imgJapan = '/img/dimo-japan.png';

const USE_CASES = [
  {
    icon: <Smartphone size={28} />,
    type: 'Mobile Platform',
    title: 'DIMO Mobile App',
    description:
      'Production-ready mobile application for iOS and Android. Users can connect their vehicles, view real-time data, and manage permissionsall out of the box.',
    example:
      'Launch your vehicle platform in weeks, not months. Complete mobile experience included.',
  },
  {
    icon: <Palette size={28} />,
    type: 'Customization',
    title: 'White-Label Experience',
    description:
      'Fully customizable UI with your branding, colors, and logo. Make DIMO Mobile App look and feel like your own product with no code changes required.',
    example:
      'Replace logos, adjust color schemes, and customize messagingall through configuration.',
  },
  {
    icon: <Globe size={28} />,
    type: 'Localization',
    title: 'Multi-Language Support',
    description:
      'Built-in support for 20+ languages with easy localization framework. Expand to new markets without rebuilding your app from scratch.',
    example:
      'English, Spanish, Portuguese, French, German, Japanese, and moreready to deploy globally.',
  },
  {
    icon: <Zap size={28} />,
    type: 'Features',
    title: 'Real-Time Vehicle Data',
    description:
      'Access live vehicle telemetry, diagnostics, location, and more through an intuitive interface. All data streams pre-integrated and tested.',
    example:
      'Battery level, tire pressure, location tracking, trip historyeverything your users need.',
  },
  {
    icon: <Users size={28} />,
    type: 'User Management',
    title: 'Account & Permissions',
    description:
      'Complete user authentication, profile management, and granular permission controls. Users manage data sharing preferences with full transparency.',
    example:
      'OAuth 2.0 authentication, profile settings, connected apps dashboard, and consent management.',
  },
  {
    icon: <Download size={28} />,
    type: 'Distribution',
    title: 'App Store Ready',
    description:
      'Pre-configured for iOS App Store and Google Play Store submission. Includes all necessary compliance, privacy policies, and app store assets.',
    example:
      'Submit your branded app to stores in days with included assets and compliance documentation.',
  },
];

const STATS = [
  { number: '100%', label: 'Customizable UI' },
  { number: '<1 Week', label: 'Time to Launch' },
  { number: '<3m', label: 'To Onboard New Users' },
  { number: '<5m', label: 'To Onboard New Marketplace Partners' },
];

const TESTIMONIALS = [
  {
    name: 'Carlos De Martini Muñoz',
    role: 'Connected Services Manager, Grupo Kaufmann',
    text: "We launched our branded vehicle app across Latin America using DIMO's white-label solution. The localization support for our local market was flawless.",
  },
  {
    name: 'Ryo Hayashi',
    role: 'Founder, DIMO Japan',
    text: "Localizing for the Japanese market was painless. DIMO's multi-language support and cultural customization options helped us build user trust immediately.",
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
          <Smartphone size={16} /> {SOLUTION_NAME}
        </span>

        <h1 className={styles.heroTitle}>
          Launch Your Vehicle App with{' '}
          <span className={styles.heroTitleGradient}>
            Zero Development Time
          </span>
        </h1>

        <p className={styles.heroSubtitle}>
          Deploy a fully-branded, production-ready mobile app for iOS and Android.
          White-label customization, multi-language support, and global reachall
          included out of the box.
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
          Everything You Need for Consumer Apps
        </h2>
        <p className={styles.sectionSubtitle}>
          From mobile apps to white-label customization and global localization,
          DIMO provides the complete platform for launching consumer vehicle
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
          <h2>DIMO Mobile App: Production-Ready Platform</h2>
          <p>
            Launch with a complete mobile application for iOS and Android. Every
            feature your users need: vehicle connectivity, real-time data, trip
            tracking, diagnostics, and more -- tested and ready for production.
          </p>
          <ul className={styles.featureList}>
            <li>
              <span className={styles.checkIcon}>✓</span>
              Native iOS and Android apps built with modern mobile frameworks
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              Real-time vehicle data: location, battery, diagnostics
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              Trip tracking with detailed analytics and history
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              User profiles, authentication, and permission management all built-in
            </li>
          </ul>
        </div>
        <div className={styles.featureVisual}>
            <a href="https://dimo.co" target="_blank" rel="noopener noreferrer">
                <img src={imgMobile} alt="DIMO Mobile App on Phone" />
            </a>
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
          <h2>White-Label: Make It Yours</h2>
          <p>
            Customize every aspect of the DIMO Mobile App with your brand identity.
            Replace logos, adjust colors, modify copy: all through simple
            configuration without touching a line of code. Expand to international 
            markets with built-in localization support.
          </p>
          <ul className={styles.featureList}>
            <li>
              <span className={styles.checkIcon}>✓</span>
              Brand customization: logos, colors, fonts, and themes
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              Custom messaging and copy throughout the app
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              Your app name and identity in app stores
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              Configuration-based: no code changes required
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              Regional customization for dates, currencies, and units
            </li>
          </ul>
        </div>
        <div className={styles.featureVisual}>
            <a href="https://dimojapan.com" target="_blank" rel="noopener noreferrer">
                <img src={imgJapan} alt="DIMO in Japan" />
            </a>
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      title: 'Configure Your Brand',
      description:
        'Upload your logos, choose your color scheme, and customize app messaging through our configuration dashboardno coding required.',
    },
    {
      title: 'Select Languages & Regions',
      description:
        'Choose which languages to enable and configure regional settings. Add custom translations if needed through our localization framework.',
    },
    {
      title: 'Test Your App',
      description:
        'Use our TestFlight and Google Play beta distribution to test your branded app with internal teams before public launch.',
    },
    {
      title: 'Launch to App Stores',
      description:
        'Submit your app to iOS App Store and Google Play Store with included compliance documentation and app store assets.',
    },
  ];

  return (
    <section className={styles.howItWorksSection}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionEyebrow}>How It Works</span>
        <h2 className={styles.sectionTitle}>Launch in Less Than a Week</h2>
        <p className={styles.sectionSubtitle}>
          From configuration to app store submission, DIMO makes it easy to launch
          your branded vehicle application globally.
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
        <h2 className={styles.sectionTitle}>Trusted Globally</h2>
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
          Ready to Launch Your Vehicle App?
        </h2>
        <p className={styles.ctaText}>
          Join companies launching branded vehicle applications globally with
          DIMO's white-label mobile platform.
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

export default function ConsumerApplicationsPage(): ReactNode {
  return (
    <>
      <Head>
        <title>Consumer Applications | White-Label Mobile Apps by DIMO</title>
        <meta
          name="description"
          content="Launch your branded vehicle mobile app in days. DIMO provides production-ready iOS and Android apps with white-label customization and 20+ language support."
        />
        <meta
          name="keywords"
          content="white-label mobile app, vehicle app, iOS Android, multi-language app, branded mobile app, localization, DIMO mobile"
        />
        <meta property="og:title" content="Consumer Applications | DIMO White-Label Platform" />
        <meta
          property="og:description"
          content="Production-ready mobile apps for iOS and Android. Fully customizable, multi-language support, and global reach out of the box."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://www.dimo.org/solutions/consumer-applications" />

        {/* Structured Data for SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MobileApplication',
            name: 'DIMO Mobile App Platform',
            description:
              'White-label mobile application platform for vehicle data. iOS and Android apps with customization and localization.',
            operatingSystem: 'iOS, Android',
            applicationCategory: 'Automotive',
          })}
        </script>
      </Head>

      <div className={styles.industryPage}>
        <CustomNavbar dark={true} />

        <Breadcrumbs
          items={[
            { name: 'Home', url: 'https://www.dimo.org/' },
            { name: 'Solutions', url: 'https://www.dimo.org/#solutions' },
            { name: 'Consumer Applications' },
          ]}
        />

        <main>
          <HeroSection />
          <StatsSection />
          <UseCasesSection />
          <FeatureSection1 />
          <FeatureSection2 />
          <HowItWorksSection />
          <TestimonialsSection />
          <CTASection />
        </main>

        <FooterTheme />
      </div>
    </>
  );
}
