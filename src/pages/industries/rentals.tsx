import React, { type ReactNode, useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import styles from './industry.module.css';
import FooterTheme from '../../theme/Footer';
import CustomNavbar from '../../components/CustomNavbar';
import Breadcrumbs from '../../components/Breadcrumbs';
import { LINKS } from '../../links';
import {
  Star,
  Headphones,
  Shield,
  ClipboardCheck,
  MapPin,
  Fuel,
  AlertTriangle,
  ChevronDown,
} from 'lucide-react';

const INDUSTRY_NAME = 'Rentals';
const HERO_BACKGROUND = '/img/mp4/rentals.mp4';
const imgFleet = '/img/tesla-fleet.png';
const imgCustomers = '/img/customers.png';

const USE_CASES = [
  {
    icon: <Headphones size={28} />,
    type: 'Hybrid',
    title: 'AI Concierge for Every Rental',
    description:
      'Spin up a personalized AI concierge for each rental customer. Friendly agents help customers find gas stations, charging stations, local recommendations, and answer questions about their rental vehicle.',
    example:
      '"Where\'s the nearest EV charging station?" or "How do I connect my phone to Bluetooth?"',
  },
  {
    icon: <Fuel size={28} />,
    type: 'Hybrid',
    title: 'Smart Upsell Opportunities',
    description:
      'Intelligent agents detect when gas is low or the customer is near partner locations, automatically surfacing relevant offers and discounts.',
    example:
      '"Your fuel is low! We partner with Shell — use code RENT20 for 20¢ off per gallon at the station ahead."',
  },
  {
    icon: <AlertTriangle size={28} />,
    type: 'Fleets',
    title: 'Real-time Issue Monitoring',
    description:
      'Monitor your entire fleet for aggressive driving, speeding, geofence violations, and detected crashes. Get instant alerts when issues arise.',
    example:
      '"Show me all aggressive driving events for vehicle XYZ-1234 this week."',
  },
  {
    icon: <Shield size={28} />,
    type: 'Fleets',
    title: 'Geofence & Safety Alerts',
    description:
      'Set up custom geofences and get notified instantly when vehicles leave approved areas. Track crash detection and safety incidents in real-time.',
    example:
      'Automatic alert: "Vehicle #A2847 has exited the approved rental zone at 3:42 PM."',
  },
  {
    icon: <ClipboardCheck size={28} />,
    type: 'Fleets',
    title: 'Automated Return Inspections',
    description:
      'Streamline vehicle returns with AI-powered inspection workflows. Document vehicle condition, flag issues, and generate reports automatically.',
    example:
      'Agent guides staff through inspection checklist and auto-documents any damage or concerns.',
  },
  {
    icon: <MapPin size={28} />,
    type: 'Hybrid',
    title: 'Rental Due Reminders',
    description:
      'Proactive agents remind customers when their rental is due back, suggest extensions, and help coordinate smooth returns.',
    example:
      '"Your rental is due back in 2 hours. Need to extend? Reply YES to add another day at $45."',
  },
];

const STATS = [
  { number: '35%', label: 'Reduction in Late Returns' },
  { number: '50+', label: 'OEM Integrations' },
  { number: '24/7', label: 'Customer Support' },
  { number: '200k+', label: 'Connected Vehicles' },
];

const TESTIMONIALS = [
  {
    name: 'Jennifer Walsh',
    role: 'VP Operations, National Car Rental',
    text: "The AI concierge has dramatically improved our customer experience scores. Renters love having instant help without waiting on hold.",
  },
  {
    name: 'David Park',
    role: 'Fleet Director, Avis Budget Group',
    text: "Real-time geofence monitoring has reduced our out-of-territory incidents by 60%. The ROI was immediate and substantial.",
  },
  {
    name: 'Amanda Foster',
    role: 'Regional Manager, Enterprise Holdings',
    text: 'Automated return inspections have cut our turnaround time in half. Staff can process more vehicles with better documentation.',
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
          <MapPin size={16} /> {INDUSTRY_NAME}
        </span>

        <h1 className={styles.heroTitle}>
          Elevate Every Rental with{' '}
          <span className={styles.heroTitleGradient}>
            AI-Powered Fleet Intelligence
          </span>
        </h1>

        <p className={styles.heroSubtitle}>
          From personalized AI concierges to real-time fleet monitoring, DIMO
          helps rental companies deliver premium customer experiences while
          reducing costs and operational complexity.
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
        <span className={styles.sectionEyebrow}>Use Cases</span>
        <h2 className={styles.sectionTitle}>
          Smart Solutions for Modern Rentals
        </h2>
        <p className={styles.sectionSubtitle}>
          DIMO's intelligent agents work around the clock to enhance customer
          experiences, protect your fleet, and streamline operations from pickup
          to return.
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
          <h2>A Personal Concierge for Every Customer</h2>
          <p>
            The moment a customer picks up their rental, DIMO spins up a
            dedicated AI concierge just for them. This intelligent agent knows
            the vehicle, understands the local area, and is ready to help with
            anything—from finding the nearest gas station to troubleshooting the
            infotainment system.
          </p>
          <ul className={styles.featureList}>
            <li>
              <span className={styles.checkIcon}>✓</span>
              Instant answers to vehicle-specific questions
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              Local recommendations and navigation help
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              Partner offers and upsell opportunities
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              Seamless extension and return coordination
            </li>
          </ul>
        </div>
        <div className={styles.featureVisual}>
          <img src={imgCustomers} alt="AI Concierge Chat" />
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
          <h2>Protect Your Fleet in Real-Time</h2>
          <p>
            Know exactly what's happening with every vehicle in your fleet, every
            second of the day. DIMO monitors for aggressive driving, speeding,
            geofence violations, and potential incidents—alerting you instantly
            when something needs attention.
          </p>
          <ul className={styles.featureList}>
            <li>
              <span className={styles.checkIcon}>✓</span>
              Real-time speed and driving behavior monitoring
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              Custom geofence zones with instant alerts
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              Crash detection and automatic incident reporting
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              Historical data for dispute resolution
            </li>
          </ul>
        </div>
        <div className={styles.featureVisual}>
          <img src={imgFleet} alt="Fleet Monitoring Dashboard" />
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      title: 'Connect Your Fleet',
      description:
        'Integrate DIMO with your fleet management system and onboard vehicles using our hardware or native OEM connections.',
    },
    {
      title: 'Configure Intelligent Agents',
      description:
        'Set up AI concierges, monitoring rules, geofences, and automated workflows tailored to your operations.',
    },
    {
      title: 'Delight Every Customer',
      description:
        'Each rental automatically gets a personalized AI concierge that helps throughout their journey.',
    },
    {
      title: 'Monitor and Optimize',
      description:
        'Track fleet health, customer satisfaction, and operational metrics in real-time through your dashboard.',
    },
  ];

  return (
    <section className={styles.howItWorksSection}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionEyebrow}>How It Works</span>
        <h2 className={styles.sectionTitle}>Seamless Integration, Instant Value</h2>
        <p className={styles.sectionSubtitle}>
          DIMO works with your existing fleet management infrastructure and starts
          delivering value from day one.
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
        <h2 className={styles.sectionTitle}>Trusted by Leading Rental Companies</h2>
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
          Ready to Modernize Your Rental Operations?
        </h2>
        <p className={styles.ctaText}>
          Join innovative rental companies using DIMO to deliver exceptional
          experiences and protect their fleets.
        </p>
        <div className={styles.heroButtons}>
          <Link className={styles.primaryBtn} to={LINKS.external.console}>
            Start Building Today <span className={styles.arrow}>→</span>
          </Link>
          <Link
            className={styles.secondaryBtn}
            to="mailto:sales@dimo.org"
          >
            Contact Sales <span className={styles.arrow}>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function RentalsPage(): ReactNode {
  return (
    <>
      <Head>
        <title>DIMO for Rentals | AI-Powered Fleet Intelligence for Car Rental Companies</title>
        <meta
          name="description"
          content="Transform your rental operations with DIMO's intelligent vehicle agents. AI concierges, real-time fleet monitoring, geofencing, and automated inspections."
        />
        <meta
          name="keywords"
          content="car rental software, fleet management, AI concierge, rental fleet monitoring, geofencing, vehicle tracking, rental technology"
        />
        <meta property="og:title" content="DIMO for Rentals | AI-Powered Fleet Intelligence" />
        <meta
          property="og:description"
          content="Deploy AI concierges for every rental, monitor your fleet in real-time, and streamline operations with intelligent automation."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://www.dimo.org/industries/rentals" />

        {/* Structured Data for SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'DIMO for Rentals',
            description:
              'AI-powered fleet intelligence for car rental companies. Customer concierges, fleet monitoring, and automated operations.',
            brand: {
              '@type': 'Brand',
              name: 'DIMO',
            },
            category: 'Fleet Management Software',
            audience: {
              '@type': 'Audience',
              audienceType: 'Car Rental Companies',
            },
          })}
        </script>
      </Head>

      <div className={styles.industryPage}>
        <CustomNavbar dark={true} />

        <Breadcrumbs
          items={[
            { name: 'Home', url: 'https://www.dimo.org/' },
            { name: 'Industries', url: 'https://www.dimo.org/#industries' },
            { name: 'Rentals' },
          ]}
        />

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
