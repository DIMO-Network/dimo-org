import React, { type ReactNode, useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import styles from './industry.module.css';
import FooterTheme from '../../theme/Footer';
import CustomNavbar from '../../components/CustomNavbar';
import { LINKS } from '../../links';
import {
  Star,
  MessageCircle,
  Stethoscope,
  Phone,
  GraduationCap,
  Settings,
  ChevronDown,
} from 'lucide-react';

const INDUSTRY_NAME = 'Automotive Maintenance';
const HERO_BACKGROUND = '/img/industry/maintenance-hero.jpg'; // Placeholder
const imgMechanic = '/img/mechanic.png';
const imgCustomer = '/img/customers.png';

const USE_CASES = [
  {
    icon: <MessageCircle size={28} />,
    type: 'Consumer',
    title: 'Customer Support Agent',
    description:
      'Let customers share their vehicle data and describe issues before arriving at your shop. The AI agent gathers detailed information, helping technicians prepare and diagnose faster.',
    example:
      'Customer: "My car is making a grinding noise when I brake." Agent: "I see your brake pads are at 15%. Let me check your service history and schedule you in."',
  },
  {
    icon: <Stethoscope size={28} />,
    type: 'Fleets',
    title: 'Diagnostics Assistance',
    description:
      'Give every technician a seasoned expert to consult with, powered by live vehicle data. Techs can describe symptoms while the agent pulls relevant OBD data and suggests diagnoses.',
    example:
      '"The engine is misfiring on cold starts. What does the OBD data show?" Agent analyzes codes and sensor data in real-time.',
  },
  {
    icon: <Phone size={28} />,
    type: 'Fleets',
    title: 'Proactive Customer Outreach',
    description:
      'Automatically identify customers whose vehicles need service based on mileage, time, or detected issues. Reach out proactively to schedule appointments.',
    example:
      '"Hi John, your 2021 Honda is due for its 30,000-mile service. Would you like to schedule an appointment this week?"',
  },
  {
    icon: <GraduationCap size={28} />,
    type: 'Fleets',
    title: 'Training Assistant',
    description:
      'Accelerate junior technician development with an AI training assistant. Real-time access to vehicle data, repair procedures, and expert guidance helps new techs learn faster.',
    example:
      'Junior tech: "How do I diagnose this P0420 code?" Agent: "Let me walk you through catalyst efficiency testing step by step."',
  },
];

const STATS = [
  { number: '45%', label: 'Faster Diagnosis' },
  { number: '30%', label: 'Increase in Bookings' },
  { number: '50+', label: 'OEM Integrations' },
  { number: '2M+', label: 'Connected Vehicles' },
];

const TESTIMONIALS = [
  {
    name: 'Mike Sullivan',
    role: 'Owner, Sullivan Auto Care',
    text: "The customer support agent has transformed how we intake vehicles. By the time the car arrives, we already know exactly what's wrong and have parts ready.",
  },
  {
    name: 'Chris Williams',
    role: 'Service Manager, Pep Boys',
    text: "Our junior techs are learning twice as fast with the training assistant. It's like having a master technician available 24/7 to answer questions.",
  },
  {
    name: 'Rachel Torres',
    role: 'Director, Firestone Complete Auto Care',
    text: 'Proactive outreach has increased our repeat customer rate by 40%. Customers appreciate that we remember their service schedule.',
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
          <Settings size={16} /> {INDUSTRY_NAME}
        </span>

        <h1 className={styles.heroTitle}>
          Supercharge Your Shop with{' '}
          <span className={styles.heroTitleGradient}>
            AI-Powered Diagnostics
          </span>
        </h1>

        <p className={styles.heroSubtitle}>
          From customer intake to technician training, DIMO's intelligent
          vehicle agents help automotive maintenance shops diagnose faster, book
          more appointments, and develop skilled technicians.
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
          Built for Modern Automotive Shops
        </h2>
        <p className={styles.sectionSubtitle}>
          DIMO's intelligent agents help automotive maintenance businesses
          improve customer experience, accelerate diagnostics, and develop their
          team—all powered by real vehicle data.
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
          <h2>Know What's Wrong Before the Car Arrives</h2>
          <p>
            DIMO's customer support agent engages with customers when they first
            notice a problem. By the time they arrive at your shop, you already
            have their vehicle data, symptom descriptions, and a preliminary
            diagnosis—so your technicians can get straight to work.
          </p>
          <ul className={styles.featureList}>
            <li>
              <span className={styles.checkIcon}>✓</span>
              Customers describe issues in natural language
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              Agent accesses real-time vehicle diagnostics
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              Preliminary diagnosis ready before arrival
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              Parts can be ordered in advance
            </li>
          </ul>
        </div>
        <div className={styles.featureVisual}>
          <img src={imgCustomer} alt="Customer Intake Flow" />
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
          <h2>A Master Technician in Every Bay</h2>
          <p>
            Give every technician—from apprentice to veteran—access to an
            AI-powered diagnostics assistant. The agent can pull live OBD data,
            suggest diagnostic procedures, explain repair steps, and provide
            expert guidance for complex issues.
          </p>
          <ul className={styles.featureList}>
            <li>
              <span className={styles.checkIcon}>✓</span>
              Real-time access to vehicle sensor data
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              Context-aware diagnostic suggestions
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              Step-by-step repair guidance
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              Accelerate junior technician development
            </li>
          </ul>
        </div>
        <div className={styles.featureVisual}>
          <img src={imgMechanic} alt="Mechanic using Diagnostics Assistance" />
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      title: 'Connect Customer Vehicles',
      description:
        'Customers connect their vehicles through DIMO, giving your shop authorized access to diagnostic data with full consent management.',
    },
    {
      title: 'Deploy Support Agents',
      description:
        'Set up customer-facing support agents that handle inquiries, gather symptom information, and schedule appointments.',
    },
    {
      title: 'Empower Your Technicians',
      description:
        'Give your team access to AI-powered diagnostics assistance that works alongside live vehicle data.',
    },
    {
      title: 'Grow Your Business',
      description:
        'Use proactive outreach to stay connected with customers and automatically identify service opportunities.',
    },
  ];

  return (
    <section className={styles.howItWorksSection}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionEyebrow}>How It Works</span>
        <h2 className={styles.sectionTitle}>Simple Setup, Powerful Results</h2>
        <p className={styles.sectionSubtitle}>
          DIMO integrates with your existing shop management systems and starts
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
        <h2 className={styles.sectionTitle}>Trusted by Shops Nationwide</h2>
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
          Ready to Transform Your Shop?
        </h2>
        <p className={styles.ctaText}>
          Join forward-thinking automotive maintenance shops already using DIMO
          to diagnose faster, book more, and build better teams.
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

export default function MaintenancePage(): ReactNode {
  return (
    <>
      <Head>
        <title>DIMO for Automotive Maintenance | AI-Powered Diagnostics for Auto Shops</title>
        <meta
          name="description"
          content="Transform your auto shop with DIMO's intelligent diagnostics. Customer support agents, technician assistance, proactive outreach, and training tools."
        />
        <meta
          name="keywords"
          content="auto shop software, automotive diagnostics, technician training, shop management, vehicle repair, automotive technology, mechanic tools"
        />
        <meta property="og:title" content="DIMO for Automotive Maintenance | AI-Powered Diagnostics" />
        <meta
          property="og:description"
          content="Supercharge your shop with AI diagnostics assistance, customer support agents, and technician training tools powered by real vehicle data."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://docs.dimo.org/maintenance" />

        {/* Structured Data for SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'DIMO for Automotive Maintenance',
            description:
              'AI-powered diagnostics and customer support for automotive maintenance shops. Faster diagnosis, better training, more bookings.',
            brand: {
              '@type': 'Brand',
              name: 'DIMO',
            },
            category: 'Automotive Software',
            audience: {
              '@type': 'Audience',
              audienceType: 'Automotive Repair Shops',
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
