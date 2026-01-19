import React, { type ReactNode, useEffect, useRef, useState } from 'react';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import styles from './industry.module.css';
import FooterTheme from '../../theme/Footer';
import CustomNavbar from '../../components/CustomNavbar';
import { LINKS } from '../../links';
import {
  Star,
  MessageSquare,
  FileSearch,
  DollarSign,
  Calendar,
  Users,
  Car,
  ChevronDown,
} from 'lucide-react';

const INDUSTRY_NAME = 'Dealerships';
const HERO_BACKGROUND = '/img/industry/dealership-hero.jpg'; // Placeholder
const imgCustomers = '/img/customers.png';
const imgMechanic = '/img/mechanic5.png';


const USE_CASES = [
  {
    icon: <MessageSquare size={28} />,
    type: 'Consumer',
    title: 'Virtual Service Advisor',
    description:
      'Deploy a conversational AI agent that customers can text or chat with 24/7 about their vehicles and book service appointments when needed.',
    example:
      '"My check engine light just came on, should I be concerned about that?"',
  },
  {
    icon: <FileSearch size={28} />,
    type: 'Hybrid',
    title: 'Used-Vehicle Pre-Purchase Report',
    description:
      'Provide comprehensive vehicle health reports online for customer research or in-person for dealer agents to build trust and close deals faster.',
    example: '"Give me a complete health report on this 2019 Toyota Camry"',
  },
  {
    icon: <DollarSign size={28} />,
    type: 'Hybrid',
    title: 'Trade-In Valuation Assistant',
    description:
      'Empower your sales team with an AI agent that provides data-backed valuations during the trade-in process, increasing transparency and customer confidence.',
    example:
      'Agent analyzes real-time vehicle data to provide accurate, defensible trade-in values.',
  },
  {
    icon: <Calendar size={28} />,
    type: 'Hybrid',
    title: 'Proactive Booking Agent',
    description:
      'Automatically detect when vehicles hit service milestones, error codes, or time-based maintenance and proactively reach out to schedule appointments.',
    example:
      '"It\'s time to come in for service! We noticed your oil change is overdue. We have these available time slots..."',
  },
  {
    icon: <Users size={28} />,
    type: 'Fleets',
    title: 'Post-Sale Relationship Manager',
    description:
      'Maintain ongoing relationships with fleet customers through intelligent agents that monitor vehicle health and proactively suggest services.',
    example:
      'Agents track fleet vehicle conditions and automatically schedule preventive maintenance.',
  },
  {
    icon: <Car size={28} />,
    type: 'Fleets',
    title: 'Leased Vehicle Fleet Management',
    description:
      'Simplify fleet management for leased vehicles with agents that handle maintenance scheduling, usage tracking, and end-of-lease inspections.',
    example:
      'Fleet managers get real-time insights into vehicle conditions across their entire leased fleet.',
  },
];

const STATS = [
  { number: '24/7', label: 'Customer Availability' },
  { number: '25%', label: 'Improved Customer Engagement' },
  { number: '40%', label: 'Faster Service Booking' },
  { number: '200k+', label: 'Connected Vehicles' },
];

const TESTIMONIALS = [
  {
    name: 'Carlos Martinez',
    role: 'Service Director, AutoNation',
    text: "The virtual service advisor has transformed how we interact with customers. We're booking 40% more service appointments and our CSI scores have never been higher.",
  },
  {
    name: 'Sarah Chen',
    role: 'GM, Premier Auto Group',
    text: "The trade-in valuation tool gives our sales team instant credibility. Customers trust the data-backed numbers, which means faster negotiations and happier buyers.",
  },
  {
    name: 'Michael Thompson',
    role: 'Fleet Manager, Enterprise Dealers',
    text: 'Managing our leased fleet used to be a nightmare. Now we have real-time visibility into every vehicle and maintenance is proactive instead of reactive.',
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
          <Car size={16} /> {INDUSTRY_NAME}
        </span>

        <h1 className={styles.heroTitle}>
          Transform Your Dealership with{' '}
          <span className={styles.heroTitleGradient}>
            Intelligent Vehicle Agents
          </span>
        </h1>

        <p className={styles.heroSubtitle}>
          From virtual service advisors to AI-powered trade-in valuations, DIMO
          helps dealerships deliver exceptional customer experiences while
          streamlining operations across sales, service, and fleet management.
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
          Built for Every Part of Your Dealership
        </h2>
        <p className={styles.sectionSubtitle}>
          Whether you're serving individual customers or managing enterprise
          fleets, DIMO's intelligent agents adapt to your needs and integrate
          seamlessly with your existing systems.
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
          <h2>Works in LATAM and the US — Your Way</h2>
          <p>
            DIMO offers flexible deployment options designed for your market.
            In Latin America, we support professionally installed hardware with
            full integration and mobile app experiences. In the United States,
            leverage our BYOD (Bring Your Own Device) approach for rapid
            deployment.
          </p>
          <ul className={styles.featureList}>
            <li>
              <span className={styles.checkIcon}>✓</span>
              Professional installation support in LATAM markets
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              BYOD integration for US dealerships
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              White-label mobile app options available
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              Full API access for custom integrations
            </li>
          </ul>
        </div>
        <div className={styles.featureVisual}>
          <img src={imgCustomers} alt="Happy Dealership Customers Interacting with AI Agent" />
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
          <h2>AI Agents That Know Your Customers</h2>
          <p>
            Every vehicle agent has built-in memory and context awareness,
            delivering personalized experiences that feel human. Customers get
            instant answers about their specific vehicle, service history, and
            upcoming maintenance needs.
          </p>
          <ul className={styles.featureList}>
            <li>
              <span className={styles.checkIcon}>✓</span>
              Persistent memory across all customer interactions
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              Real-time vehicle diagnostics and health data
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              Seamless handoff to human agents when needed
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              Multi-channel support: SMS, chat, voice
            </li>
          </ul>
        </div>
        <div className={styles.featureVisual}>
          <img src={imgMechanic} alt="AI Mechanic Assisting Customer" />
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      title: 'Connect Your Inventory',
      description:
        'Integrate DIMO with your existing DMS and inventory management systems. Our APIs work with all major platforms.',
    },
    {
      title: 'Deploy Intelligent Agents',
      description:
        'Choose from pre-built agent templates for service, sales, and fleet management, or customize agents for your specific workflows.',
    },
    {
      title: 'Engage Customers Automatically',
      description:
        'Agents proactively reach out when vehicles need service, answer questions 24/7, and help close more deals.',
    },
    {
      title: 'Measure and Optimize',
      description:
        'Track agent performance, customer satisfaction, and revenue impact through our comprehensive analytics dashboard.',
    },
  ];

  return (
    <section className={styles.howItWorksSection}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionEyebrow}>How It Works</span>
        <h2 className={styles.sectionTitle}>Up and Running in Days, Not Months</h2>
        <p className={styles.sectionSubtitle}>
          DIMO integrates with your existing systems and starts delivering value
          immediately—no complex implementations required.
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
        <h2 className={styles.sectionTitle}>Trusted by Leading Dealerships</h2>
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
          Ready to Transform Your Dealership?
        </h2>
        <p className={styles.ctaText}>
          Join forward-thinking dealerships already using DIMO to deliver
          exceptional customer experiences and drive more revenue.
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

export default function DealershipsPage(): ReactNode {
  return (
    <>
      <Head>
        <title>DIMO for Dealerships | Intelligent Vehicle Agents for Auto Dealers</title>
        <meta
          name="description"
          content="Transform your dealership with DIMO's intelligent vehicle agents. Virtual service advisors, AI trade-in valuations, proactive booking, and fleet management solutions."
        />
        <meta
          name="keywords"
          content="dealership software, auto dealer AI, virtual service advisor, trade-in valuation, fleet management, automotive technology, vehicle agents"
        />
        <meta property="og:title" content="DIMO for Dealerships | Intelligent Vehicle Agents" />
        <meta
          property="og:description"
          content="Deploy AI-powered vehicle agents for service, sales, and fleet management. 24/7 customer support, data-backed valuations, and proactive service scheduling."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://docs.dimo.org/dealerships" />

        {/* Structured Data for SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'DIMO for Dealerships',
            description:
              'Intelligent vehicle agents for automotive dealerships. Virtual service advisors, trade-in valuations, and fleet management.',
            brand: {
              '@type': 'Brand',
              name: 'DIMO',
            },
            category: 'Automotive Software',
            audience: {
              '@type': 'Audience',
              audienceType: 'Automotive Dealerships',
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
          <TestimonialsSection />
          <CTASection />
        </main>

        <FooterTheme />
      </div>
    </>
  );
}
