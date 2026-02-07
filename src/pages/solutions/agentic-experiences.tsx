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
  Shield,
  Lock,
  Key,
  Cpu,
  Plug,
  ChevronDown,
  Sparkles,
} from 'lucide-react';

const SOLUTION_NAME = 'Agentic Experiences';
const HERO_BACKGROUND = '/img/mp4/agents.mp4';
const imgLogin = '/img/ShareWithUsers.png';
const imgFleets = '/img/tesla-fleet2.png';

const USE_CASES = [
  {
    icon: <Key size={28} />,
    type: 'Authentication',
    title: 'Login with DIMO',
    description:
      'Seamless OAuth 2.0 authentication flow that gives your users control over their vehicle data. One-click login with granular permission controls.',
    example:
      'Users grant your app access to specific data streams (location, diagnostics, etc.) without sharing credentials.',
  },
  {
    icon: <Shield size={28} />,
    type: 'Consent Management',
    title: 'Granular Permissions',
    description:
      'Fine-grained control over what data your agents can access. Users can grant, revoke, or modify permissions at any time through a unified consent dashboard.',
    example:
      'Agents request only the permissions they needread location, write commands, access diagnosticsbuilding user trust.',
  },
  {
    icon: <Lock size={28} />,
    type: 'Security',
    title: 'Verifiable Credentials',
    description:
      'Blockchain-backed credentials ensure data authenticity and traceability. Every data access is logged and verifiable, meeting the highest compliance standards.',
    example:
      'GDPR, EU Data Act, and SOC 2 compliant out of the box. Audit logs for every data access.',
  },
  {
    icon: <Cpu size={28} />,
    type: 'Infrastructure',
    title: 'Secured Compute',
    description:
      'Run your AI agents in secure, isolated compute environments with access to vehicle data. Execute complex workflows while maintaining data privacy and security.',
    example:
      'Deploy agents that process sensitive vehicle data without exposing raw information to your servers.',
  },
  {
    icon: <Sparkles size={28} />,
    type: 'AI Platform',
    title: 'Agent Memory & Context',
    description:
      'Built-in memory layer for your agents. Maintain conversation history, user preferences, and vehicle context across sessions for personalized experiences.',
    example:
      'Agents remember past interactions: "Last time we discussed your oil changeready to schedule it?"',
  },
  {
    icon: <Plug size={28} />,
    type: 'Integration',
    title: 'Seamless Integrations',
    description:
      'Pre-built connectors for popular tools and platforms. Integrate with CRMs, scheduling systems, payment processors, and communication platforms out of the box.',
    example:
      'Connect agents to Calendly, Stripe, Twilio, SendGrid, and more with zero-code integrations.',
  },
];

const STATS = [
  { number: '<2min', label: 'Setup Time' },
  { number: '99.9%', label: 'Service Uptime' },
  { number: 'One', label: 'Simple Agents API' },
  { number: '5+', label: 'SDKs to Build On' },
];

const TESTIMONIALS = [
  {
    name: 'Sarah Johnson',
    role: 'Product Lead, Auto AI',
    text: "Login with DIMO transformed our onboarding. Users can connect their vehicles in seconds, and the consent management gives them full transparency. Our conversion rate increased 3x.",
  },
  {
    name: 'David Kim',
    role: 'Founder, Fleet Assistant',
    text: 'Secured Compute was exactly what we needed. We can process sensitive fleet data without ever touching raw information. Our enterprise customers love the security model.',
  },
  {
    name: 'Maria Garcia',
    role: 'CTO, Service Concierge',
    text: "The pre-built integrations saved us months of development. We connected our agents to Calendly, Stripe, and our CRM in days. The agent memory is incredible too.",
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
          <Sparkles size={16} /> {SOLUTION_NAME}
        </span>

        <h1 className={styles.heroTitle}>
          Build Trustworthy AI Agents with{' '}
          <span className={styles.heroTitleGradient}>
            Privacy-First Infrastructure
          </span>
        </h1>

        <p className={styles.heroSubtitle}>
          Deploy intelligent vehicle agents with built-in consent management,
          secured compute, and seamless integrations. Give users control over their
          data while building powerful agentic experiences.
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
          Everything You Need for Agentic Applications
        </h2>
        <p className={styles.sectionSubtitle}>
          From user authentication to secure compute and pre-built integrations,
          DIMO provides the complete infrastructure for building trustworthy AI
          agents.
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
          <h2>Login with DIMO: Consent-First Authentication</h2>
          <p>
            Implement OAuth 2.0 authentication with granular permission controls in
            minutes. Users connect their vehicles with one click, granting your
            agents access to exactly the data they need, nothing more.
          </p>
          <ul className={styles.featureList}>
            <li>
              <span className={styles.checkIcon}>✓</span>
              OAuth 2.0 compliant with PKCE flow
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              Granular scopes: location, diagnostics, commands, and more
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              Users can revoke access anytime through unified dashboard
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              Real-time consent status updates via webhooks
            </li>
          </ul>
        </div>
        <div className={styles.featureVisual}>
            <a href="/docs/build/building-with-tools/client-sdk-dimo-connect" target="_blank" rel="noopener noreferrer">
                <img src={imgLogin} alt="Login with DIMO Flowchart" />
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
          <h2>Secured Compute: Privacy-Preserving AI</h2>
          <p>
            Run your AI agents in isolated, secure compute environments with
            access to clean vehicle data. Process sensitive information without exposing
            raw data to your servers, meeting the strictest compliance requirements.
          </p>
          <ul className={styles.featureList}>
            <li>
              <span className={styles.checkIcon}>✓</span>
              Scale to add agents with new super powers
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              Data processed in secure enclaves, option to host on-premise
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              Compliance-ready: GDPR, SOC 2, EU Data Act
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              Audit logs for every data access and operation
            </li>
          </ul>
        </div>
        <div className={styles.featureVisual}>
            <img src={imgFleets} alt="Fleet of Connected Vehicles" />
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
          <h2>Seamless Integrations: Connect Everything</h2>
          <p>
            Pre-built connectors for 50+ popular tools and platforms. Integrate
            your agents with CRMs, scheduling systems, payment processors, and
            communication platforms with zero-code configuration.
          </p>
          <ul className={styles.featureList}>
            <li>
              <span className={styles.checkIcon}>✓</span>
              Scheduling: Calendly, Cal.com, Google Calendar
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              Payments: Stripe, PayPal, Square
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              Communications: Twilio, SendGrid, Slack
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              CRMs: Salesforce, HubSpot, Pipedrive
            </li>
          </ul>
        </div>
        <div className={styles.featureVisual}>
          <div className={styles.imagePlaceholder}>
            <span>Integration Marketplace</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      title: 'Implement Login with DIMO',
      description:
        'Add OAuth authentication to your app. Users connect their vehicles and grant permissions to your agents in seconds.',
    },
    {
      title: 'Deploy Your Agents',
      description:
        'Upload your agent code to our secured compute platform. Choose from pre-built agent templates or build custom workflows.',
    },
    {
      title: 'Connect Integrations',
      description:
        'Enable the integrations your agents need from our marketplace. Configure scheduling, payments, communications, and more.',
    },
    {
      title: 'Monitor & Optimize',
      description:
        'Track agent performance, user consent status, and system health through our comprehensive analytics dashboard.',
    },
  ];

  return (
    <section className={styles.howItWorksSection}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionEyebrow}>How It Works</span>
        <h2 className={styles.sectionTitle}>Deploy Agents in Minutes</h2>
        <p className={styles.sectionSubtitle}>
          From authentication to deployment, DIMO makes it easy to build and scale
          agentic experiences with built-in privacy and security.
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
        <h2 className={styles.sectionTitle}>Trusted by AI Builders</h2>
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
          Ready to Build Agentic Experiences?
        </h2>
        <p className={styles.ctaText}>
          Join developers building the next generation of AI-powered vehicle
          applications with privacy-first infrastructure.
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

export default function AgenticExperiencesPage(): ReactNode {
  return (
    <>
      <Head>
        <title>Agentic Experiences | Build AI Agents with DIMO</title>
        <meta
          name="description"
          content="Build trustworthy AI vehicle agents with Login with DIMO, secured compute, and seamless integrations. Privacy-first infrastructure for agentic experiences."
        />
        <meta
          name="keywords"
          content="AI agents, vehicle AI, consent management, OAuth authentication, secured compute, agent integrations, privacy-first AI, GDPR compliant"
        />
        <meta property="og:title" content="Agentic Experiences | DIMO Platform" />
        <meta
          property="og:description"
          content="Deploy intelligent vehicle agents with built-in consent management, secured compute, and 50+ integrations. Privacy-first infrastructure for AI."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://www.dimo.org/solutions/agentic-experiences" />

        {/* Structured Data for SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'DIMO Agentic Experiences Platform',
            description:
              'Build trustworthy AI vehicle agents with consent management, secured compute, and pre-built integrations.',
            applicationCategory: 'DeveloperApplication',
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
            { name: 'Agentic Experiences' },
          ]}
        />

        <main>
          <HeroSection />
          <StatsSection />
          <UseCasesSection />
          <FeatureSection1 />
          <FeatureSection2 />
          {/* <FeatureSection3 /> */}
          <HowItWorksSection />
          {/* <TestimonialsSection /> */}
          <CTASection />
        </main>

        <FooterTheme />
      </div>
    </>
  );
}
