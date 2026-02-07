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
  Gauge,
  Wrench,
  Users,
  Route,
  AlertOctagon,
  LayoutDashboard,
  Truck,
  ChevronDown,
} from 'lucide-react';

const INDUSTRY_NAME = 'Delivery Service Providers';
const HERO_BACKGROUND = '/img/mp4/dsp.mp4';
const imgTrucks = '/img/trucks.png';
const imgMechanic = '/img/mechanic5.png';

const USE_CASES = [
  {
    icon: <LayoutDashboard size={28} />,
    type: 'Fleets',
    title: 'Fleet Operations Command Center',
    description:
      'Get real-time visibility into your entire fleet with a comprehensive dashboard showing availability, conditions, maintenance needs, and driver status at a glance.',
    example:
      '"Show me all vehicles currently available and their last maintenance date."',
  },
  {
    icon: <Wrench size={28} />,
    type: 'Fleets',
    title: 'Predictive Maintenance Copilot',
    description:
      'AI-powered maintenance predictions that analyze vehicle data to identify issues before they cause breakdowns, reducing downtime and repair costs.',
    example:
      '"Vehicle F-2847 shows early signs of brake wear. Schedule service within the next 500 miles."',
  },
  {
    icon: <Users size={28} />,
    type: 'Fleets',
    title: 'Driver Behavior Coaching',
    description:
      'Monitor driving patterns and automatically provide coaching and corrective actions for aggressive driving, harsh braking, and other risky behaviors.',
    example:
      'Agent sends coaching message: "3 harsh braking events detected today. Smooth braking extends tire life and fuel economy."',
  },
  {
    icon: <Route size={28} />,
    type: 'Fleets',
    title: 'Route Performance Analysis',
    description:
      'Analyze historical route data to identify the fastest, safest, and most efficient delivery routes. Flag routes with high incident rates.',
    example:
      '"Route 7A has 40% faster completion times than Route 7B, with fewer aggressive driving events."',
  },
  {
    icon: <AlertOctagon size={28} />,
    type: 'Fleets',
    title: 'Damage Detection & Incident Response',
    description:
      'Automatically detect vehicle damage, crashes, and incidents. Generate reports, trigger notifications, and coordinate response workflows.',
    example:
      'Instant alert: "Collision detected on Vehicle D-1923 at 2:34 PM. Location: 5th & Main. Driver status: OK."',
  },
  {
    icon: <Gauge size={28} />,
    type: 'Fleets',
    title: 'Real-Time Fleet Health Dashboard',
    description:
      'Monitor fuel levels, tire pressure, engine diagnostics, and overall vehicle health across your entire fleet in one unified view.',
    example:
      '"5 vehicles need attention: 2 low fuel, 2 tire pressure alerts, 1 check engine light."',
  },
];

const STATS = [
  { number: '25%', label: 'Reduction in Vehicle Downtime' },
  { number: '18%', label: 'Fuel Cost Savings' },
  { number: 'Zero', label: 'SQL Queries Required' },
  { number: '30%', label: 'Quality of Life Improvements' },
];

const TESTIMONIALS = [
  {
    name: 'Marcus Johnson',
    role: 'Fleet Director, FedEx Ground',
    text: "Predictive maintenance alone has saved us hundreds of thousands in emergency repairs. We catch issues before they become roadside breakdowns.",
  },
  {
    name: 'Lisa Rodriguez',
    role: 'Operations VP, Amazon Logistics',
    text: "The route analysis feature revealed inefficiencies we'd never noticed. Our on-time delivery rate improved by 15% after optimizing based on DIMO data.",
  },
  {
    name: 'Robert Kim',
    role: 'Safety Manager, UPS',
    text: 'Driver coaching through DIMO has reduced aggressive driving incidents by 40%. Our drivers appreciate the real-time feedback.',
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
          <Truck size={16} /> {INDUSTRY_NAME}
        </span>

        <h1 className={styles.heroTitle}>
          Command Your Fleet with{' '}
          <span className={styles.heroTitleGradient}>
            Intelligent Operations
          </span>
        </h1>

        <p className={styles.heroSubtitle}>
          From predictive maintenance to driver coaching and route optimization,
          DIMO gives delivery service providers the real-time intelligence they
          need to maximize uptime, reduce costs, and deliver on every promise.
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
          Built for High-Performance Delivery Operations
        </h2>
        <p className={styles.sectionSubtitle}>
          DIMO's fleet intelligence platform helps delivery service providers
          optimize every aspect of their operations—from vehicle health to driver
          performance to route efficiency.
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
          <h2>Predict Problems Before They Happen</h2>
          <p>
            DIMO's predictive maintenance copilot continuously analyzes vehicle
            data—engine diagnostics, usage patterns, environmental conditions,
            and historical maintenance records—to identify issues before they
            cause expensive breakdowns or missed deliveries.
          </p>
          <ul className={styles.featureList}>
            <li>
              <span className={styles.checkIcon}>✓</span>
              AI-powered failure prediction based on real vehicle data
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              Automatic maintenance scheduling when issues are detected
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              Integration with your existing maintenance systems
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              Reduce emergency repairs and roadside breakdowns
            </li>
          </ul>
        </div>
        <div className={styles.featureVisual}>
          <img src={imgMechanic} alt="Mechanic Inspecting Delivery Vehicle" />
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
          <h2>Optimize Routes, Maximize Deliveries</h2>
          <p>
            Go beyond basic GPS tracking. DIMO's route analysis intelligence
            examines historical performance data to identify which routes are
            fastest, where problems occur, and how to optimize your delivery
            network for maximum efficiency.
          </p>
          <ul className={styles.featureList}>
            <li>
              <span className={styles.checkIcon}>✓</span>
              Identify high-performing vs. problem routes
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              Correlate routes with driver behavior and incidents
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              Suggest optimized alternatives based on real data
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              Track improvements over time with analytics
            </li>
          </ul>
        </div>
        <div className={styles.featureVisual}>
          <img src={imgTrucks} alt="Delivery Trucks on Route" />
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
        'Onboard your delivery vehicles using DIMO hardware or native OEM connections. Integration is seamless with your existing fleet management tools.',
    },
    {
      title: 'Configure Your Command Center',
      description:
        'Set up real-time monitoring, maintenance thresholds, driver coaching parameters, and custom alerts tailored to your operations.',
    },
    {
      title: 'Deploy Intelligent Agents',
      description:
        'Activate AI-powered copilots for maintenance prediction, route analysis, driver coaching, and incident response.',
    },
    {
      title: 'Optimize Continuously',
      description:
        'Use real-time data and analytics to continuously improve fleet performance, reduce costs, and maximize on-time deliveries.',
    },
  ];

  return (
    <section className={styles.howItWorksSection}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionEyebrow}>How It Works</span>
        <h2 className={styles.sectionTitle}>From Setup to Optimization in Days</h2>
        <p className={styles.sectionSubtitle}>
          DIMO integrates with your existing systems and starts delivering
          actionable intelligence immediately.
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
        <h2 className={styles.sectionTitle}>Trusted by Industry Leaders</h2>
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
          Ready to Transform Your Delivery Operations?
        </h2>
        <p className={styles.ctaText}>
          Join leading delivery service providers using DIMO to reduce costs,
          improve reliability, and deliver on every promise.
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

export default function DeliveryPage(): ReactNode {
  return (
    <>
      <Head>
        <title>DIMO for Delivery | Fleet Intelligence for Delivery Service Providers</title>
        <meta
          name="description"
          content="Optimize delivery operations with DIMO's intelligent fleet platform. Predictive maintenance, driver coaching, route analysis, and real-time fleet monitoring."
        />
        <meta
          name="keywords"
          content="delivery fleet management, predictive maintenance, driver coaching, route optimization, fleet monitoring, logistics technology, delivery operations"
        />
        <meta property="og:title" content="DIMO for Delivery | Fleet Intelligence Platform" />
        <meta
          property="og:description"
          content="Command your delivery fleet with AI-powered predictive maintenance, driver coaching, route analysis, and real-time monitoring."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://www.dimo.org/industries/dsp" />

        {/* Structured Data for SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'DIMO for Delivery',
            description:
              'Fleet intelligence platform for delivery service providers. Predictive maintenance, driver coaching, and route optimization.',
            brand: {
              '@type': 'Brand',
              name: 'DIMO',
            },
            category: 'Fleet Management Software',
            audience: {
              '@type': 'Audience',
              audienceType: 'Delivery Service Providers',
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
            { name: 'Data Service Providers' },
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
