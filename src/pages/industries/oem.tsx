import React, { type ReactNode, useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import styles from './industry.module.css';
import FooterTheme from '../../theme/Footer';
import CustomNavbar from '../../components/CustomNavbar';
import { LINKS } from '../../links';
import {
  Star,
  Code,
  Zap,
  Lock,
  Globe,
  Layers,
  ChevronDown,
  Cpu,
} from 'lucide-react';

const INDUSTRY_NAME = 'Auto OEMs';
const HERO_BACKGROUND = '/img/industry/oem-hero.jpg'; // Placeholder
const imgSdk = '/img/sdks.webp';
const imgRentals = '/img/rentals.png';

const USE_CASES = [
  {
    icon: <Code size={28} />,
    type: 'Developer Platform',
    title: 'Unified API Access',
    description:
      'One thoughtfully-designed GraphQL API to access vehicle data. Eliminate the complexity of managing multiple integrations and focus on building great features.',
    example:
      'Access real-time diagnostics, location, battery status, and more with a streamlined, standardized interface.',
  },
  {
    icon: <Zap size={28} />,
    type: 'Developer Platform',
    title: 'Easy-to-Use SDK',
    description:
      'Ship faster with our developer-friendly SDKs for JavaScript, Python, C#, Go, and more. Production-ready code examples and comprehensive documentation included.',
    example:
      'Get your developers started in minutes with npm install or pip install and have the first integration running in minutes.',
  },
  {
    icon: <Lock size={28} />,
    type: 'Security & Privacy',
    title: 'Privacy-First Architecture',
    description:
      'Built with user consent and data ownership at the core. GDPR and EU Data Act compliant, with granular permission controls and verifiable credentials.',
    example:
      'Vehicle owners control what data is shared, when, and with whom, building trust between you and your customers.',
  },
  {
    icon: <Globe size={28} />,
    type: 'Platform',
    title: 'Multi-OEM Compatibility',
    description:
      'Support vehicles from all major manufacturers through a single integration. Any OEM can easily be added.',
    example:
      'Build once, deploy everywhere -- any OEM can be integrated with the same great experience.',
  },
  {
    icon: <Layers size={28} />,
    type: 'Platform',
    title: 'Scalable Infrastructure',
    description:
      'Enterprise-grade reliability with 99.9% uptime. Handle millions of requests with low latency and real-time data streaming capabilities.',
    example:
      'From prototype to production, DIMO scales with your business without infrastructure headaches.',
  },
  {
    icon: <Cpu size={28} />,
    type: 'AI & Analytics',
    title: 'AI-Ready Data Streams',
    description:
      "Clean, normalized, and contextualized vehicle data ready for AI/ML applications. Build agentic experiences on top of DIMO's intelligence layer.",
    example:
      'Monetize clean data without the hassle -- power predictive maintenance, fleet optimization, and more.',
  },
];

const STATS = [
  { number: '100%', label: 'COVESA Standards' },
  { number: '>95%', label: 'Developer Satisfaction' },
  { number: '99.9%', label: 'API Uptime' },
  { number: '<100ms', label: 'Average Latency' },
];

const TESTIMONIALS = [
  {
    name: 'Alex Rodriguez',
    role: 'CTO, Mobility Startup',
    text: "DIMO's unified API saved us months of development time. Instead of integrating with each OEM separately, we had access to all major brands in a week. The SDK is phenomenal.",
  },
  {
    name: 'Emma Chen',
    role: 'Lead Engineer, Fleet Platform',
    text: 'The documentation and developer experience are top-notch. We went from proof-of-concept to production in under a month. The real-time data streaming is incredibly reliable.',
  },
  {
    name: 'Michael Foster',
    role: 'Founder, Automotive AI',
    text: "As a small team, we couldn't afford to build and maintain OEM integrations ourselves. DIMO gave us enterprise-level capabilities without the enterprise-level cost.",
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
          <Cpu size={16} /> {INDUSTRY_NAME}
        </span>

        <h1 className={styles.heroTitle}>
          Build the Future of Mobility with{' '}
          <span className={styles.heroTitleGradient}>
            One Unified Platform
          </span>
        </h1>

        <p className={styles.heroSubtitle}>
          Access vehicle data from 50+ OEMs through a single, privacy-first API.
          Ship faster with developer-friendly SDKs, comprehensive documentation,
          and enterprise-grade infrastructure built for scale.
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
          Everything You Need to Build Vehicle Applications
        </h2>
        <p className={styles.sectionSubtitle}>
          From unified API access to AI-ready data streams, DIMO provides the
          complete developer platform for building the next generation of mobility
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
          <h2>Developer-First, Privacy-First</h2>
          <p>
            DIMO is built from the ground up with developers and users in mind.
            Our privacy-first architecture ensures user consent and data ownership,
            while our developer-friendly tools make integration seamless and
            straightforward.
          </p>
          <ul className={styles.featureList}>
            <li>
              <span className={styles.checkIcon}>✓</span>
              RESTful and GraphQL APIs with OpenAPI specs
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              SDKs for JavaScript, TypeScript, Python, C#, and more
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              Simple developer sign up process with secured API key management
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              Comprehensive docs with interactive examples
            </li>
          </ul>
        </div>
        <div className={styles.featureVisual}>
            <img src={imgSdk} alt="DIMO SDK Code Example" />
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
          <h2>One API, Every Major OEM</h2>
          <p>
            Stop managing dozens of OEM integrations. DIMO provides a unified
            interface to access vehicle data from Tesla, Ford, BMW, GM, and any major
            vehicle manufacturers. We handle the complexity so you can focus on
            building great products.
          </p>
          <ul className={styles.featureList}>
            <li>
              <span className={styles.checkIcon}>✓</span>
              Standardized data models across all OEMs
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              Supports real-time diagnostics, location, commands, and telemetry
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              Cleanse your data for AI/ML applications with contextualized streams
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              Works with connected vehicles and aftermarket devices
            </li>
          </ul>
        </div>
        <div className={styles.featureVisual}>
            <img src={imgRentals} alt="Car Rental Fleet Management" />
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      title: 'Sign Up & Get API Keys',
      description:
        'Create your DIMO developer account and get instant access to your API credentials. No waiting, no approval process.',
    },
    {
      title: 'Bring Your Own Data',
      description:
        'Implement DIMO Ingest by setting up a Kafka stream or equivalent, sending data to our managed ingest service or a self-hosted DIMO instance.',
    },
    {
      title: 'Build & Scale',
      description:
        'Once the data flow is established, the Developer Platform, API, and SDK are ready-to-use. Scale to millions of developers with confidence on the DIMO infrastructure.',
    },
  ];

  return (
    <section className={styles.howItWorksSection}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionEyebrow}>How It Works</span>
        <h2 className={styles.sectionTitle}>Get Started in Minutes</h2>
        <p className={styles.sectionSubtitle}>
          Simply bring your own data into DIMO's plug-and-play infrastructure, we make it easy to build and scale.
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
        <h2 className={styles.sectionTitle}>Loved by Developers</h2>
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
          Ready to Start Building?
        </h2>
        <p className={styles.ctaText}>
          Join thousands of developers building the future of mobility on DIMO.
          Get your API keys and start shipping today.
        </p>
        <div className={styles.heroButtons}>
          <Link className={styles.primaryBtn} to={LINKS.external.console}>
            Get API Keys <span className={styles.arrow}>→</span>
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

export default function OEMPage(): ReactNode {
  return (
    <>
      <Head>
        <title>DIMO for Auto OEMs | Unified Vehicle Data Platform for Developers</title>
        <meta
          name="description"
          content="Build vehicle applications faster with DIMO's unified API. Access data from 50+ OEMs through one developer-friendly platform. Privacy-first, enterprise-grade, production-ready."
        />
        <meta
          name="keywords"
          content="vehicle API, OEM integrations, automotive developers, vehicle data platform, Tesla API, Ford API, BMW API, connected car platform, telematics API"
        />
        <meta property="og:title" content="DIMO for Auto OEMs | Unified Vehicle Data Platform" />
        <meta
          property="og:description"
          content="One API to access vehicle data from 50+ OEMs. Developer-friendly SDKs, privacy-first architecture, and enterprise-grade infrastructure."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://docs.dimo.org/industries/oem" />

        {/* Structured Data for SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'DIMO Developer Platform',
            description:
              'Unified API platform for accessing vehicle data from 50+ OEMs. Developer-friendly SDKs, privacy-first architecture, and enterprise infrastructure.',
            applicationCategory: 'DeveloperApplication',
            operatingSystem: 'Web, iOS, Android',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.8',
              ratingCount: '150',
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
          <HowItWorksSection />
          {/* <TestimonialsSection /> */}
          <CTASection />
        </main>

        <FooterTheme />
      </div>
    </>
  );
}
