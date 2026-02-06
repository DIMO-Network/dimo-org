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
  Shield,
  Users,
  TrendingUp,
  Zap,
  AlertTriangle,
} from 'lucide-react';

const COMPANY_NAME = 'Grupo Kaufmann';
const HERO_BACKGROUND = '/img/kaufmann.webp';

// Key metrics showcasing results
const RESULTS = [
  { number: '100%', label: 'OEM Connectivity Achieved' },
  { number: '80%', label: 'Reduction in Theft Incidents' },
  { number: '3x', label: 'Increase in Customer Loyalty' },
  { number: '24/7', label: 'Real-Time Vehicle Monitoring' },
];

// Problems they faced
const CHALLENGES = [
  {
    icon: <AlertTriangle size={28} />,
    title: 'No Data Access',
    description:
      'Grupo Kaufmann lacked direct data access to vehicle data from OEMs, hampering their ability to serve customers effectively with proactive services or real-time insights.'
  },
  {
    icon: <Shield size={28} />,
    title: 'Vehicle Theft Concerns',
    description:
      'With no way to track vehicles, stolen inventory was difficult to locate & recover, leading to significant financial losses and insurance complications.',
  },
  {
    icon: <TrendingUp size={28} />,
    title: 'Low End-User Engagement',
    description:
      'Due to the lack of data insights, managing post-sales customer relationships was challenging, missing opportunities for service revenue and loyalty.',
  },
];

// Solutions implemented
const SOLUTIONS = [
  {
    icon: <Zap size={28} />,
    title: 'Universal Integration',
    description:
      'DIMO provided seamless connectivity to multiple OEM and aftermarket data sources, eliminating the need for individual integrations.',
    result:
      'Grupo Kaufmann gained instant access to real-time telemetry from their vehicle inventory across multiple brands, including Mercedez-Benz, Maxus, and Jetour.',
  },
  {
    icon: <Shield size={28} />,
    title: 'Real-Time Theft Prevention',
    description:
      'DIMO provided real-time location tracking and engine blocking capabilities to implement vehicle monitoring and instant intervention systems for unauthorized movement.',
    result:
      'Grupo Kaufmann achieved an instant reduction in vehicle thefts and faster recovery times when incidents occurred.',
  },
  {
    icon: <Users size={28} />,
    title: 'Custom Portal & AI Insights',
    description:
      'DIMO provided developer-friendly APIs & SDKs to build any custom portal, with built-in AI capabilities, and a whitelabeled mobile app for an end-to-end customer experience.',
    result:
      'Grupo Kaufmann reported 3x customer engagement, faster service turnaround times, and improved customer satisfaction scores.',
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
        <span className={styles.storyBadge}>
          <Star size={16} /> Customer Story
        </span>

        <h1 className={styles.heroTitle}>
          <a href="https://www.kaufmann.cl/" target="_blank" rel="noopener noreferrer">
            <span className={styles.heroTitleGradient}>
              {COMPANY_NAME}
            </span> 
          </a> Transformed Their Dealership Network with{' '}
          <span className={styles.heroTitleGradient}>
            Connected Vehicle Intelligence
          </span>
        </h1>

        <p className={styles.heroSubtitle}>
          From zero connectivity to 100% OEM coverage, real-time theft prevention, and 3x customer engagement—see how Latin America's leading automotive group revolutionize their operations.
        </p>

        <div className={styles.heroButtons}>
          <Link className={styles.primaryBtn} to={LINKS.external.console}>
            Start Your Own Journey <span className={styles.arrow}>→</span>
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
        <h2 className={styles.sectionTitle}>The Outcome</h2>
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
        <span className={styles.sectionEyebrow}>The Kaufmann Story</span>
        <h2 className={styles.sectionTitle}>
          The Challenges
        </h2>
        <p className={styles.sectionSubtitle}>
          As one of Latin America's largest automotive groups, Grupo Kaufmann faced critical operational challenges that prevented them from delivering modern, connected experiences to their dealership network and end customers.
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
        <span className={styles.sectionEyebrow}>The DIMO Solution</span>
        <h2 className={styles.sectionTitle}>
          Connected Vehicle Intelligence
        </h2>
        <p className={styles.sectionSubtitle}>
          Grupo Kaufmann partnered with DIMO to build a comprehensive connected vehicle ecosystem that solved all four major challenges simultaneously—without the complexity of managing multiple OEM integrations.
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

function TestimonialSection() {
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
          "DIMO transformed our entire operation. What would have taken us years and millions of dollars in custom integrations was deployed in weeks. Our dealers now have real-time vehicle insights, our customers love the connected experience, and we've virtually eliminated inventory theft. This is the future of automotive retail."
        </blockquote>
        <div className={styles.testimonialAuthor}>Maximiliano Ipinza</div>
        <div className={styles.testimonialRole}>Head of Digital Innovation, Grupo Kaufmann</div>
      </div>
    </section>
  );
}

function ImplementationSection() {
  const timeline = [
    {
      phase: 'Week 1',
      title: 'Platform Setup & Integration',
      description:
        'DIMO team worked with Grupo Kaufmann\'s digital transformation department to configure API access, set up authentication, and establish test data flows.',
    },
    {
      phase: 'Week 2',
      title: 'Dealer Portal Development',
      description:
        'Using DIMO\'s developer-friendly SDKs and comprehensive documentation, the internal team built a custom dealer portal with real-time vehicle data access.',
    },
    {
      phase: 'Week 4',
      title: 'Device Deployment & Feature Rollout',
      description:
        'Deployed connected devices across the dealership network and rolled out key features like real-time tracking and remote diagnostics.',
    },
    {
      phase: 'Week 8',
      title: 'Customer App Launch',
      description:
        'Rolled out the customer-facing mobile application in Spanish with connected vehicle features, service reminders, and remote diagnostics to end users.',
    },
  ];

  return (
    <section className={styles.timelineSection}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionEyebrow}>Implementation</span>
        <h2 className={styles.sectionTitle}>8-Week Deployment Timeline</h2>
        <p className={styles.sectionSubtitle}>
          From kickoff to full production deployment in just two months—no lengthy integrations, no complex infrastructure buildout.
        </p>
      </div>

      <div className={styles.stepsContainer}>
        {timeline.map((step, i) => (
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
    'Single API replaced multiple complex OEM integrations, reducing development time by 90%',
    'Real-time theft monitoring and geofencing eliminated 80% of inventory theft incidents',
    'Dealers gained instant access to vehicle diagnostics and service history, improving service efficiency by 50%',
    'Customer engagement tripled with connected vehicle features and proactive service reminders',
    'Platform scaled seamlessly across multiple brands and vehicle types without additional integration work',
    'Privacy-first architecture ensured GDPR compliance and customer data ownership',
  ];

  return (
    <section className={`${styles.section} ${styles.sectionAlt}`}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionEyebrow}>Key Takeaways</span>
        <h2 className={styles.sectionTitle}>Why This Worked</h2>
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
          Ready to Transform Your Operations?
        </h2>
        <p className={styles.ctaText}>
          Join Grupo Kaufmann and hundreds of other innovative companies using DIMO to build connected vehicle experiences. Get started today with our free developer tier.
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

export default function GrupoKaufmannCaseStudy(): ReactNode {
  return (
    <>
      <Head>
        <title>Grupo Kaufmann Case Study | DIMO Connected Vehicle Success Story</title>
        <meta
          name="description"
          content="See how Grupo Kaufmann achieved 100% OEM connectivity, reduced theft by 80%, and tripled customer engagement using DIMO's connected vehicle platform. Real results in 8 weeks."
        />
        <meta
          name="keywords"
          content="Grupo Kaufmann, DIMO case study, connected vehicles, dealership technology, vehicle theft prevention, OEM integration, automotive innovation"
        />
        <meta property="og:title" content="Grupo Kaufmann Case Study | DIMO Success Story" />
        <meta
          property="og:description"
          content="How Latin America's leading automotive group transformed their operations with DIMO: 100% OEM connectivity, 80% theft reduction, 3x customer engagement."
        />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://www.dimo.org/customer-stories/grupo-kaufmann" />

        {/* Structured Data for Case Study */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'How Grupo Kaufmann Transformed Their Dealership Network with DIMO',
            description:
              'Case study: Grupo Kaufmann achieved 100% OEM connectivity, reduced vehicle theft by 80%, and tripled customer engagement using DIMO\'s connected vehicle platform.',
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
            datePublished: '2025-01-28',
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://www.dimo.org/customer-stories/grupo-kaufmann',
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
            { name: 'Grupo Kaufmann' },
          ]}
        />

        <main>
          <HeroSection />
          <ResultsSection />
          <ChallengesSection />
          <SolutionsSection />
          <TestimonialSection />
          <ImplementationSection />
          <KeyTakeawaysSection />
          <CTASection />
        </main>

        <FooterTheme />
      </div>
    </>
  );
}
