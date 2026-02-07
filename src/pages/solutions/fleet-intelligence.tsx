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
  BarChart3,
  Layers,
  Code,
  Zap,
  Shield,
  ChevronDown,
  Truck,
} from 'lucide-react';

const SOLUTION_NAME = 'Fleet Intelligence';
const HERO_BACKGROUND = '/img/mp4/fleets.mp4';
const imgFleet = '/img/trucks2.png';
const imgSdk = '/img/sdks.webp';
const imgDelivery = '/img/delivery.png';

const USE_CASES = [
  {
    icon: <BarChart3 size={28} />,
    type: 'Dashboard (Coming Soon)',
    title: 'Unified Fleet Dashboard',
    description:
      'Comprehensive fleet management dashboard with real-time visibility into all vehicles. Monitor health, location, utilization, and maintenance needs from one centralized platform.',
    example:
      'Track 100s or 1000s of vehicles across multiple locations with live updates and predictive insights.',
  },
  {
    icon: <Code size={28} />,
    type: 'SDK Integration',
    title: 'Developer-Friendly SDKs',
    description:
      'Build custom fleet applications with our easy-to-use SDKs for JavaScript, Python, Go, and C#. Full API access with production-ready code examples.',
    example:
      'npm install @dimo/sdk and start querying fleet data in minutes with comprehensive documentation.',
  },
  {
    icon: <Layers size={28} />,
    type: 'Data Platform',
    title: 'Real-Time Fleet Telemetry',
    description:
      'Stream live vehicle data including location, diagnostics, fuel consumption, and driver behavior. Build custom analytics and reporting on top of clean, normalized data.',
    example:
      'Access real-time streams via WebSocket or batch data via REST APIchoose what fits your use case.',
  },
  {
    icon: <Zap size={28} />,
    type: 'Analytics',
    title: 'Predictive Maintenance',
    description:
      'AI-powered insights that predict maintenance needs before failures occur. Reduce downtime and extend vehicle lifespan with data-driven maintenance scheduling.',
    example:
      'Get alerts when vehicles are due for service based on actual usage patterns, not just mileage.',
  },
  {
    icon: <Shield size={28} />,
    type: 'Compliance',
    title: 'Driver Safety & Compliance',
    description:
      'Monitor driver behavior, track compliance metrics, and ensure safety standards across your fleet. Automated alerts for unsafe driving patterns.',
    example:
      'Track speeding, harsh braking, rapid acceleration, and idle timeall with configurable thresholds.',
  },
  {
    icon: <Truck size={28} />,
    type: 'Optimization',
    title: 'Route & Utilization Optimization',
    description:
      'Optimize routes, reduce fuel costs, and maximize vehicle utilization with intelligent analytics. Identify underutilized assets and inefficient routes.',
    example:
      'Reduce fuel costs by 15-25% through data-driven route optimization and utilization insights.',
  },
];

const STATS = [
  { number: 'Coming Soon', label: 'Fleet Dashboard' },
  { number: '5+', label: 'SDK Languages' },
  { number: '<100ms', label: 'API Latency' },
  { number: '99.9%', label: 'Uptime SLA' },
];

const TESTIMONIALS = [
  {
    name: 'Robert Chang',
    role: 'Fleet Manager, Logistics Corp',
    text: "The SDK made it easy to build custom fleet dashboards tailored to our needs. We integrated our existing systems in days and now have complete visibility across 500+ vehicles.",
  },
  {
    name: 'Jennifer Lopez',
    role: 'Director of Operations, Delivery Service',
    text: 'Predictive maintenance alerts have reduced our downtime by 40%. We catch issues before they become problems, saving thousands in emergency repairs.',
  },
  {
    name: 'Marcus Taylor',
    role: 'CTO, Transportation Platform',
    text: "DIMO's API documentation is excellent. Our developers were productive from day one. The real-time telemetry streams have been rock solid at scale.",
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
          <Truck size={16} /> {SOLUTION_NAME}
        </span>

        <h1 className={styles.heroTitle}>
          Build Intelligent Fleet Solutions with{' '}
          <span className={styles.heroTitleGradient}>
            Real-Time Vehicle Data
          </span>
        </h1>

        <p className={styles.heroSubtitle}>
          Access comprehensive fleet telemetry, build custom dashboards with our
          SDKs, and optimize operations with AI-powered insights. Complete fleet
          intelligence platform for modern transportation.
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
          Everything You Need for Fleet Management
        </h2>
        <p className={styles.sectionSubtitle}>
          From unified dashboards to powerful SDKs and predictive analytics, DIMO
          provides the complete platform for building intelligent fleet solutions.
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
          <h2>Fleet Dashboard: Coming Soon</h2>
          <p>
            A comprehensive, production-ready fleet management dashboard is on the
            way. Get real-time visibility into your entire fleet with customizable
            views, alerts, and reportingall built on DIMO's reliable
            infrastructure.
          </p>
          <ul className={styles.featureList}>
            <li>
              <span className={styles.checkIcon}>✓</span>
              Live vehicle tracking with map-based visualization
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              Health monitoring and predictive maintenance alerts
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              Driver behavior scoring and safety compliance
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              Customizable reports and analytics dashboards
            </li>
          </ul>
        </div>
        <div className={styles.featureVisual}>
          <img src={imgFleet} alt="Fleet of Trucks on Road" />
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
          <h2>Build with Powerful SDKs</h2>
          <p>
            Developer-friendly SDKs for JavaScript, Python, Go, C#, and more. Build
            custom fleet applications with full API access, comprehensive
            documentation, and production-ready code examples.
          </p>
          <ul className={styles.featureList}>
            <li>
              <span className={styles.checkIcon}>✓</span>
              SDKs for JavaScript, Python, Go, C#, and more
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              RESTful and GraphQL APIs with OpenAPI specifications
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              WebSocket support for real-time telemetry streaming
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              Interactive documentation with code examples
            </li>
          </ul>
        </div>
        <div className={styles.featureVisual}>
            <img src={imgSdk} alt="SDK Code Examples" />
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
          <h2>AI-Powered Fleet Optimization</h2>
          <p>
            Leverage machine learning insights to reduce costs, improve safety, and
            maximize efficiency. Predictive maintenance, route optimization, and
            driver behavior analysisall powered by clean, normalized vehicle data.
          </p>
          <ul className={styles.featureList}>
            <li>
              <span className={styles.checkIcon}>✓</span>
              Predictive maintenance based on actual usage patterns
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              Fuel consumption tracking and optimization insights
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              Driver safety scoring with actionable recommendations
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              Utilization analytics to identify underused assets
            </li>
          </ul>
        </div>
        <div className={styles.featureVisual}>
            <img src={imgDelivery} alt="Delivery Vehicle on Route" />
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      title: 'Get API Access',
      description:
        'Sign up for DIMO and get instant API credentials. No approval process or waitingstart building immediately.',
    },
    {
      title: 'Integrate with SDKs',
      description:
        'Install our SDK in your preferred language and connect your fleet vehicles. Follow our quickstart guides for common use cases.',
    },
    {
      title: 'Build Custom Dashboards',
      description:
        'Use our APIs to build custom fleet dashboards tailored to your operations. Or wait for our pre-built Fleet Dashboard (coming soon).',
    },
    {
      title: 'Scale & Optimize',
      description:
        'Leverage AI-powered insights to optimize routes, reduce costs, and improve safety. Scale to thousands of vehicles with confidence.',
    },
  ];

  return (
    <section className={styles.howItWorksSection}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionEyebrow}>How It Works</span>
        <h2 className={styles.sectionTitle}>Start Building Fleet Solutions</h2>
        <p className={styles.sectionSubtitle}>
          From API access to production deployment, DIMO makes it easy to build
          intelligent fleet management applications.
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
        <h2 className={styles.sectionTitle}>Trusted by Fleet Operators</h2>
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
          Ready to Build Fleet Intelligence?
        </h2>
        <p className={styles.ctaText}>
          Join fleet operators building the next generation of intelligent
          transportation solutions with DIMO's platform.
        </p>
        <div className={styles.heroButtons}>
          <Link className={styles.primaryBtn} to={LINKS.external.console}>
            Get API Keys <span className={styles.arrow}>→</span>
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

export default function FleetIntelligencePage(): ReactNode {
  return (
    <>
      <Head>
        <title>Fleet Intelligence | Fleet Management Platform by DIMO</title>
        <meta
          name="description"
          content="Build intelligent fleet solutions with DIMO's SDKs and APIs. Real-time telemetry, predictive maintenance, and AI-powered optimization. Fleet Dashboard coming soon."
        />
        <meta
          name="keywords"
          content="fleet management, fleet tracking, telematics, fleet API, fleet SDK, predictive maintenance, fleet optimization, vehicle telemetry"
        />
        <meta property="og:title" content="Fleet Intelligence | DIMO Platform" />
        <meta
          property="og:description"
          content="Comprehensive fleet management platform with SDKs, real-time telemetry, and AI-powered insights. Build custom fleet solutions or use our dashboard (coming soon)."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://www.dimo.org/solutions/fleet-intelligence" />

        {/* Structured Data for SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'DIMO Fleet Intelligence Platform',
            description:
              'Fleet management platform with SDKs, APIs, and AI-powered insights. Build custom fleet solutions with real-time vehicle telemetry.',
            applicationCategory: 'BusinessApplication',
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

        <Breadcrumbs
          items={[
            { name: 'Home', url: 'https://www.dimo.org/' },
            { name: 'Solutions', url: 'https://www.dimo.org/#solutions' },
            { name: 'Fleet Intelligence' },
          ]}
        />

        <main>
          <HeroSection />
          <StatsSection />
          <UseCasesSection />
          <FeatureSection1 />
          <FeatureSection2 />
          <FeatureSection3 />
          <HowItWorksSection />
          <TestimonialsSection />
          <CTASection />
        </main>

        <FooterTheme />
      </div>
    </>
  );
}
