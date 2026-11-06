import React, { type ReactNode, useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import EnglishLink from '../../components/EnglishLink';
import Head from '@docusaurus/Head';
import { localizeSchema } from '../../lib/seo';
import { usePageLocale } from '../../lib/use-page-locale';
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
import Translate, { translate } from '@docusaurus/Translate';

const COMPANY_NAME = 'Grupo Kaufmann';
const HERO_BACKGROUND = '/img/kaufmann.webp';

// Key metrics showcasing results
const RESULTS = [
  {
    number: '100%',
    label: translate({
      id: 'customerStories.grupoKaufmann.results.oemConnectivityAchieved.label',
      message: 'OEM Connectivity Achieved',
    }),
  },
  {
    number: '80%',
    label: translate({
      id: 'customerStories.grupoKaufmann.results.reductionInTheft.label',
      message: 'Reduction in Theft Incidents',
    }),
  },
  {
    number: '3x',
    label: translate({
      id: 'customerStories.grupoKaufmann.results.increaseInCustomer.label',
      message: 'Increase in Customer Loyalty',
    }),
  },
  {
    number: '24/7',
    label: translate({
      id: 'customerStories.grupoKaufmann.results.realTimeVehicleMonitoring.label',
      message: 'Real-Time Vehicle Monitoring',
    }),
  },
];

// Problems they faced
const CHALLENGES = [
  {
    icon: <AlertTriangle size={28} />,
    title: translate({
      id: 'customerStories.grupoKaufmann.challenges.noDataAccess.title',
      message: 'No Data Access',
    }),
    description: translate({
      id: 'customerStories.grupoKaufmann.challenges.noDataAccess.description',
      message:
        'Grupo Kaufmann lacked direct data access to vehicle data from OEMs, hampering their ability to serve customers effectively with proactive services or real-time insights.',
    }),
  },
  {
    icon: <Shield size={28} />,
    title: translate({
      id: 'customerStories.grupoKaufmann.challenges.vehicleTheftConcerns.title',
      message: 'Vehicle Theft Concerns',
    }),
    description: translate({
      id: 'customerStories.grupoKaufmann.challenges.vehicleTheftConcerns.description',
      message:
        'With no way to track vehicles, stolen inventory was difficult to locate & recover, leading to significant financial losses and insurance complications.',
    }),
  },
  {
    icon: <TrendingUp size={28} />,
    title: translate({
      id: 'customerStories.grupoKaufmann.challenges.lowEndUserEngagement.title',
      message: 'Low End-User Engagement',
    }),
    description: translate({
      id: 'customerStories.grupoKaufmann.challenges.lowEndUserEngagement.description',
      message:
        'Due to the lack of data insights, managing post-sales customer relationships was challenging, missing opportunities for service revenue and loyalty.',
    }),
  },
];

// Solutions implemented
const SOLUTIONS = [
  {
    icon: <Zap size={28} />,
    title: translate({
      id: 'customerStories.grupoKaufmann.solutions.universalIntegration.title',
      message: 'Universal Integration',
    }),
    description: translate({
      id: 'customerStories.grupoKaufmann.solutions.universalIntegration.description',
      message:
        'DIMO provided seamless connectivity to multiple OEM and aftermarket data sources, eliminating the need for individual integrations.',
    }),
    result: translate({
      id: 'customerStories.grupoKaufmann.solutions.universalIntegration.result',
      message:
        'Grupo Kaufmann gained instant access to real-time telemetry from their vehicle inventory across multiple brands, including Mercedez-Benz, Maxus, and Jetour.',
    }),
  },
  {
    icon: <Shield size={28} />,
    title: translate({
      id: 'customerStories.grupoKaufmann.solutions.realTimeTheftPrevention.title',
      message: 'Real-Time Theft Prevention',
    }),
    description: translate({
      id: 'customerStories.grupoKaufmann.solutions.realTimeTheftPrevention.description',
      message:
        'DIMO provided real-time location tracking and engine blocking capabilities to implement vehicle monitoring and instant intervention systems for unauthorized movement.',
    }),
    result: translate({
      id: 'customerStories.grupoKaufmann.solutions.realTimeTheftPrevention.result',
      message:
        'Grupo Kaufmann achieved an instant reduction in vehicle thefts and faster recovery times when incidents occurred.',
    }),
  },
  {
    icon: <Users size={28} />,
    title: translate({
      id: 'customerStories.grupoKaufmann.solutions.customPortalAi.title',
      message: 'Custom Portal & AI Insights',
    }),
    description: translate({
      id: 'customerStories.grupoKaufmann.solutions.customPortalAi.description',
      message:
        'DIMO provided developer-friendly APIs & SDKs to build any custom portal, with built-in AI capabilities, and a whitelabeled mobile app for an end-to-end customer experience.',
    }),
    result: translate({
      id: 'customerStories.grupoKaufmann.solutions.customPortalAi.result',
      message:
        'Grupo Kaufmann reported 3x customer engagement, faster service turnaround times, and improved customer satisfaction scores.',
    }),
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
          <Star size={16} />{' '}
          <Translate id="customerStories.grupoKaufmann.hero.customerStory">
            Customer Story
          </Translate>
        </span>

        <h1 className={styles.heroTitle}>
          <Translate
            id="customerStories.grupoKaufmann.hero.transformedTheirDealershipNetwork"
            values={{
              link: (
                <a
                  href="https://www.kaufmann.cl/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className={styles.heroTitleGradient}>
                    {COMPANY_NAME}
                  </span>
                </a>
              ),
              span: (
                <span className={styles.heroTitleGradient}>
                  <Translate id="customerStories.grupoKaufmann.hero.connectedVehicleIntelligence">
                    Connected Vehicle Intelligence
                  </Translate>
                </span>
              ),
            }}
          >
            {'{link} Transformed Their Dealership Network with {span}'}
          </Translate>
        </h1>

        <p className={styles.heroSubtitle}>
          <Translate id="customerStories.grupoKaufmann.hero.fromZeroConnectivityTo">
            From zero connectivity to 100% OEM coverage, real-time theft
            prevention, and 3x customer engagement—see how Latin America's
            leading automotive group revolutionize their operations.
          </Translate>
        </p>

        <div className={styles.heroButtons}>
          <Link className={styles.primaryBtn} to={LINKS.external.console}>
            <Translate id="customerStories.grupoKaufmann.hero.startYourOwnJourney">
              Start Your Own Journey
            </Translate>{' '}
            <span className={styles.arrow}>→</span>
          </Link>
          <EnglishLink className={styles.secondaryBtn} to="/docs">
            <Translate id="customerStories.grupoKaufmann.hero.readOurDocumentation">
              Read Our Documentation
            </Translate>{' '}
            <span className={styles.arrow}>→</span>
          </EnglishLink>
        </div>
      </div>
    </header>
  );
}

function ResultsSection() {
  return (
    <section className={styles.statsBanner}>
      <div className={styles.sectionHeader} style={{ marginBottom: '2rem' }}>
        <h2 className={styles.sectionTitle}>
          <Translate id="customerStories.grupoKaufmann.results.theOutcome">
            The Outcome
          </Translate>
        </h2>
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
        <span className={styles.sectionEyebrow}>
          <Translate id="customerStories.grupoKaufmann.challenges.theKaufmannStory">
            The Kaufmann Story
          </Translate>
        </span>
        <h2 className={styles.sectionTitle}>
          <Translate id="customerStories.grupoKaufmann.challenges.theChallenges">
            The Challenges
          </Translate>
        </h2>
        <p className={styles.sectionSubtitle}>
          <Translate id="customerStories.grupoKaufmann.challenges.asOneOfLatin">
            As one of Latin America's largest automotive groups, Grupo Kaufmann
            faced critical operational challenges that prevented them from
            delivering modern, connected experiences to their dealership network
            and end customers.
          </Translate>
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
        <span className={styles.sectionEyebrow}>
          <Translate id="customerStories.grupoKaufmann.solutions.theDimoSolution">
            The DIMO Solution
          </Translate>
        </span>
        <h2 className={styles.sectionTitle}>
          <Translate id="customerStories.grupoKaufmann.solutions.connectedVehicleIntelligence">
            Connected Vehicle Intelligence
          </Translate>
        </h2>
        <p className={styles.sectionSubtitle}>
          <Translate id="customerStories.grupoKaufmann.solutions.grupoKaufmannPartneredWith">
            Grupo Kaufmann partnered with DIMO to build a comprehensive
            connected vehicle ecosystem that solved all four major challenges
            simultaneously—without the complexity of managing multiple OEM
            integrations.
          </Translate>
        </p>
      </div>

      <div className={styles.cardsGrid}>
        {SOLUTIONS.map((solution, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.cardIcon}>{solution.icon}</div>
            <h3 className={styles.cardTitle}>{solution.title}</h3>
            <p className={styles.cardDesc}>{solution.description}</p>
            <div className={styles.cardHighlight}>
              <strong>
                <Translate id="customerStories.grupoKaufmann.solutions.impact">
                  Impact:
                </Translate>
              </strong>{' '}
              {solution.result}
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
          <Translate id="customerStories.grupoKaufmann.testimonial.dimoTransformedOurEntire">
            "DIMO transformed our entire operation. What would have taken us
            years and millions of dollars in custom integrations was deployed in
            weeks. Our dealers now have real-time vehicle insights, our
            customers love the connected experience, and we've virtually
            eliminated inventory theft. This is the future of automotive
            retail."
          </Translate>
        </blockquote>
        <div className={styles.testimonialAuthor}>
          <Translate id="customerStories.grupoKaufmann.testimonial.maximilianoIpinza">
            Maximiliano Ipinza
          </Translate>
        </div>
        <div className={styles.testimonialRole}>
          <Translate id="customerStories.grupoKaufmann.testimonial.headOfDigitalInnovation">
            Head of Digital Innovation, Grupo Kaufmann
          </Translate>
        </div>
      </div>
    </section>
  );
}

function ImplementationSection() {
  const timeline = [
    {
      phase: translate({
        id: 'customerStories.grupoKaufmann.implementation.platformSetupIntegration.phase',
        message: 'Week 1',
      }),
      title: translate({
        id: 'customerStories.grupoKaufmann.implementation.platformSetupIntegration.title',
        message: 'Platform Setup & Integration',
      }),
      description: translate({
        id: 'customerStories.grupoKaufmann.implementation.platformSetupIntegration.description',
        message:
          "DIMO team worked with Grupo Kaufmann's digital transformation department to configure API access, set up authentication, and establish test data flows.",
      }),
    },
    {
      phase: translate({
        id: 'customerStories.grupoKaufmann.implementation.dealerPortalDevelopment.phase',
        message: 'Week 2',
      }),
      title: translate({
        id: 'customerStories.grupoKaufmann.implementation.dealerPortalDevelopment.title',
        message: 'Dealer Portal Development',
      }),
      description: translate({
        id: 'customerStories.grupoKaufmann.implementation.dealerPortalDevelopment.description',
        message:
          "Using DIMO's developer-friendly SDKs and comprehensive documentation, the internal team built a custom dealer portal with real-time vehicle data access.",
      }),
    },
    {
      phase: translate({
        id: 'customerStories.grupoKaufmann.implementation.deviceDeploymentFeature.phase',
        message: 'Week 4',
      }),
      title: translate({
        id: 'customerStories.grupoKaufmann.implementation.deviceDeploymentFeature.title',
        message: 'Device Deployment & Feature Rollout',
      }),
      description: translate({
        id: 'customerStories.grupoKaufmann.implementation.deviceDeploymentFeature.description',
        message:
          'Deployed connected devices across the dealership network and rolled out key features like real-time tracking and remote diagnostics.',
      }),
    },
    {
      phase: translate({
        id: 'customerStories.grupoKaufmann.implementation.customerAppLaunch.phase',
        message: 'Week 8',
      }),
      title: translate({
        id: 'customerStories.grupoKaufmann.implementation.customerAppLaunch.title',
        message: 'Customer App Launch',
      }),
      description: translate({
        id: 'customerStories.grupoKaufmann.implementation.customerAppLaunch.description',
        message:
          'Rolled out the customer-facing mobile application in Spanish with connected vehicle features, service reminders, and remote diagnostics to end users.',
      }),
    },
  ];

  return (
    <section className={styles.timelineSection}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionEyebrow}>
          <Translate id="customerStories.grupoKaufmann.implementation.implementation">
            Implementation
          </Translate>
        </span>
        <h2 className={styles.sectionTitle}>
          <Translate id="customerStories.grupoKaufmann.implementation.8WeekDeploymentTimeline">
            8-Week Deployment Timeline
          </Translate>
        </h2>
        <p className={styles.sectionSubtitle}>
          <Translate id="customerStories.grupoKaufmann.implementation.fromKickoffToFull">
            From kickoff to full production deployment in just two months—no
            lengthy integrations, no complex infrastructure buildout.
          </Translate>
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
    translate({
      id: 'customerStories.grupoKaufmann.keyTakeaways.singleApiReplaced',
      message:
        'Single API replaced multiple complex OEM integrations, reducing development time by 90%',
    }),
    translate({
      id: 'customerStories.grupoKaufmann.keyTakeaways.realTimeTheftMonitoring',
      message:
        'Real-time theft monitoring and geofencing eliminated 80% of inventory theft incidents',
    }),
    translate({
      id: 'customerStories.grupoKaufmann.keyTakeaways.dealersGainedInstant',
      message:
        'Dealers gained instant access to vehicle diagnostics and service history, improving service efficiency by 50%',
    }),
    translate({
      id: 'customerStories.grupoKaufmann.keyTakeaways.customerEngagementTripled',
      message:
        'Customer engagement tripled with connected vehicle features and proactive service reminders',
    }),
    translate({
      id: 'customerStories.grupoKaufmann.keyTakeaways.platformScaledSeamlessly',
      message:
        'Platform scaled seamlessly across multiple brands and vehicle types without additional integration work',
    }),
    translate({
      id: 'customerStories.grupoKaufmann.keyTakeaways.privacyFirstArchitectureEnsured',
      message:
        'Privacy-first architecture ensured GDPR compliance and customer data ownership',
    }),
  ];

  return (
    <section className={`${styles.section} ${styles.sectionAlt}`}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionEyebrow}>
          <Translate id="customerStories.grupoKaufmann.keyTakeaways.keyTakeaways">
            Key Takeaways
          </Translate>
        </span>
        <h2 className={styles.sectionTitle}>
          <Translate id="customerStories.grupoKaufmann.keyTakeaways.whyThisWorked">
            Why This Worked
          </Translate>
        </h2>
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
          <Translate id="customerStories.grupoKaufmann.cta.readyToTransformYour">
            Ready to Transform Your Operations?
          </Translate>
        </h2>
        <p className={styles.ctaText}>
          <Translate id="customerStories.grupoKaufmann.cta.joinGrupoKaufmannAnd">
            Join Grupo Kaufmann and hundreds of other innovative companies using
            DIMO to build connected vehicle experiences. Get started today with
            our free developer tier.
          </Translate>
        </p>
        <div className={styles.heroButtons}>
          <Link className={styles.primaryBtn} to={LINKS.external.console}>
            <Translate id="customerStories.grupoKaufmann.cta.getApiKeys">
              Get API Keys
            </Translate>{' '}
            <span className={styles.arrow}>→</span>
          </Link>
          <EnglishLink className={styles.secondaryBtn} to="/docs">
            <Translate id="customerStories.grupoKaufmann.cta.readTheDocs">
              Read the Docs
            </Translate>{' '}
            <span className={styles.arrow}>→</span>
          </EnglishLink>
        </div>
      </div>
    </section>
  );
}

export default function GrupoKaufmannCaseStudy(): ReactNode {
  const { locale, path } = usePageLocale();
  return (
    <>
      <Head>
        <title>
          {translate({
            id: 'customerStories.grupoKaufmann.meta.title',
            message:
              'Grupo Kaufmann Case Study | DIMO Connected Vehicle Success Story',
          })}
        </title>
        <meta
          name="description"
          content={translate({
            id: 'customerStories.grupoKaufmann.meta.description',
            message:
              "See how Grupo Kaufmann achieved 100% OEM connectivity, reduced theft by 80%, and tripled customer engagement using DIMO's connected vehicle platform. Real results in 8 weeks.",
          })}
        />
        <meta
          name="keywords"
          content={translate({
            id: 'customerStories.grupoKaufmann.meta.keywords',
            message:
              'Grupo Kaufmann, DIMO case study, connected vehicles, dealership technology, vehicle theft prevention, OEM integration, automotive innovation',
          })}
        />
        <meta
          property="og:title"
          content={translate({
            id: 'customerStories.grupoKaufmann.meta.ogTitle',
            message: 'Grupo Kaufmann Case Study | DIMO Success Story',
          })}
        />
        <meta
          property="og:description"
          content={translate({
            id: 'customerStories.grupoKaufmann.meta.ogDescription',
            message:
              "How Latin America's leading automotive group transformed their operations with DIMO: 100% OEM connectivity, 80% theft reduction, 3x customer engagement.",
          })}
        />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />

        {/* Structured Data for Case Study */}
        <script type="application/ld+json">
          {JSON.stringify(
            localizeSchema(
              {
                '@context': 'https://schema.org',
                '@type': 'Article',
                headline:
                  'How Grupo Kaufmann Transformed Their Dealership Network with DIMO',
                description:
                  "Case study: Grupo Kaufmann achieved 100% OEM connectivity, reduced vehicle theft by 80%, and tripled customer engagement using DIMO's connected vehicle platform.",
                image: {
                  '@type': 'ImageObject',
                  url: 'https://dimo.org/img/kaufmann.webp',
                  contentUrl: 'https://dimo.org/img/kaufmann.webp',
                },
                author: {
                  '@type': 'Organization',
                  name: 'DIMO',
                },
                publisher: {
                  '@type': 'Organization',
                  name: 'DIMO',
                  logo: {
                    '@type': 'ImageObject',
                    url: 'https://dimo.org/img/dimo-build-logo-dark.svg',
                  },
                },
                datePublished: '2025-01-28',
                mainEntityOfPage: {
                  '@type': 'WebPage',
                  '@id': 'https://dimo.org/customer-stories/grupo-kaufmann',
                },
              },
              locale,
              path
            )
          )}
        </script>
      </Head>

      <div className={styles.storyPage}>
        <CustomNavbar dark={true} />

        <Breadcrumbs
          items={[
            {
              name: translate({
                id: 'customerStories.grupoKaufmann.body.home.name',
                message: 'Home',
              }),
              url: 'https://dimo.org/',
            },
            {
              name: translate({
                id: 'customerStories.grupoKaufmann.body.customerStories.name',
                message: 'Customer Stories',
              }),
              url: 'https://dimo.org/#customer-stories',
            },
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
