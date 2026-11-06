import React, { type ReactNode, useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import EnglishLink from '../../components/EnglishLink';
import Head from '@docusaurus/Head';
import { localizeSchema } from '../../lib/seo';
import { usePageLocale } from '../../lib/use-page-locale';
import styles from './industry.module.css';
import FooterTheme from '../../theme/Footer';
import CustomNavbar from '../../components/CustomNavbar';
import Breadcrumbs from '../../components/Breadcrumbs';
import { LINKS } from '../../links';
import {
  MessageSquare,
  FileSearch,
  DollarSign,
  Calendar,
  Users,
  Car,
  ChevronDown,
} from 'lucide-react';
import Translate, { translate } from '@docusaurus/Translate';

const INDUSTRY_NAME = translate({
  id: 'industries.dealerships.meta.industryName',
  message: 'Dealerships',
});
const HERO_BACKGROUND = '/img/mp4/race.mp4?v=2';
const imgCustomers = '/img/customers.png';
const imgMechanic = '/img/mechanic5.png';

const USE_CASES = [
  {
    icon: <MessageSquare size={28} />,
    type: translate({
      id: 'industries.dealerships.useCases.virtualServiceAdvisor.type',
      message: 'Consumer',
    }),
    title: translate({
      id: 'industries.dealerships.useCases.virtualServiceAdvisor.title',
      message: 'Virtual Service Advisor',
    }),
    description: translate({
      id: 'industries.dealerships.useCases.virtualServiceAdvisor.description',
      message:
        'Deploy a conversational AI agent that customers can text or chat with 24/7 about their vehicles and book service appointments when needed.',
    }),
    example: translate({
      id: 'industries.dealerships.useCases.virtualServiceAdvisor.example',
      message:
        '"My check engine light just came on, should I be concerned about that?"',
    }),
  },
  {
    icon: <FileSearch size={28} />,
    type: translate({
      id: 'industries.dealerships.useCases.usedVehiclePrePurchaseReport.type',
      message: 'Hybrid',
    }),
    title: translate({
      id: 'industries.dealerships.useCases.usedVehiclePrePurchaseReport.title',
      message: 'Used-Vehicle Pre-Purchase Report',
    }),
    description: translate({
      id: 'industries.dealerships.useCases.usedVehiclePrePurchaseReport.description',
      message:
        'Provide comprehensive vehicle health reports online for customer research or in-person for dealer agents to build trust and close deals faster.',
    }),
    example: translate({
      id: 'industries.dealerships.useCases.usedVehiclePrePurchaseReport.example',
      message: '"Give me a complete health report on this 2019 Toyota Camry"',
    }),
  },
  {
    icon: <DollarSign size={28} />,
    type: translate({
      id: 'industries.dealerships.useCases.tradeInValuationAssistant.type',
      message: 'Hybrid',
    }),
    title: translate({
      id: 'industries.dealerships.useCases.tradeInValuationAssistant.title',
      message: 'Trade-In Valuation Assistant',
    }),
    description: translate({
      id: 'industries.dealerships.useCases.tradeInValuationAssistant.description',
      message:
        'Empower your sales team with an AI agent that provides data-backed valuations during the trade-in process, increasing transparency and customer confidence.',
    }),
    example: translate({
      id: 'industries.dealerships.useCases.tradeInValuationAssistant.example',
      message:
        'Agent analyzes real-time vehicle data to provide accurate, defensible trade-in values.',
    }),
  },
  {
    icon: <Calendar size={28} />,
    type: translate({
      id: 'industries.dealerships.useCases.proactiveBookingAgent.type',
      message: 'Hybrid',
    }),
    title: translate({
      id: 'industries.dealerships.useCases.proactiveBookingAgent.title',
      message: 'Proactive Booking Agent',
    }),
    description: translate({
      id: 'industries.dealerships.useCases.proactiveBookingAgent.description',
      message:
        'Automatically detect when vehicles hit service milestones, error codes, or time-based maintenance and proactively reach out to schedule appointments.',
    }),
    example: translate({
      id: 'industries.dealerships.useCases.proactiveBookingAgent.example',
      message:
        '"It\'s time to come in for service! We noticed your oil change is overdue. We have these available time slots..."',
    }),
  },
  {
    icon: <Users size={28} />,
    type: translate({
      id: 'industries.dealerships.useCases.postSaleRelationshipManager.type',
      message: 'Fleets',
    }),
    title: translate({
      id: 'industries.dealerships.useCases.postSaleRelationshipManager.title',
      message: 'Post-Sale Relationship Manager',
    }),
    description: translate({
      id: 'industries.dealerships.useCases.postSaleRelationshipManager.description',
      message:
        'Maintain ongoing relationships with fleet customers through intelligent agents that monitor vehicle health and proactively suggest services.',
    }),
    example: translate({
      id: 'industries.dealerships.useCases.postSaleRelationshipManager.example',
      message:
        'Agents track fleet vehicle conditions and automatically schedule preventive maintenance.',
    }),
  },
  {
    icon: <Car size={28} />,
    type: translate({
      id: 'industries.dealerships.useCases.leasedVehicleFleet.type',
      message: 'Fleets',
    }),
    title: translate({
      id: 'industries.dealerships.useCases.leasedVehicleFleet.title',
      message: 'Leased Vehicle Fleet Management',
    }),
    description: translate({
      id: 'industries.dealerships.useCases.leasedVehicleFleet.description',
      message:
        'Simplify fleet management for leased vehicles with agents that handle maintenance scheduling, usage tracking, and end-of-lease inspections.',
    }),
    example: translate({
      id: 'industries.dealerships.useCases.leasedVehicleFleet.example',
      message:
        'Fleet managers get real-time insights into vehicle conditions across their entire leased fleet.',
    }),
  },
];

const STATS = [
  {
    number: '24/7',
    label: translate({
      id: 'industries.dealerships.stats.customerAvailability.label',
      message: 'Customer Availability',
    }),
  },
  {
    number: '25%',
    label: translate({
      id: 'industries.dealerships.stats.improvedCustomerEngagement.label',
      message: 'Improved Customer Engagement',
    }),
  },
  {
    number: '40%',
    label: translate({
      id: 'industries.dealerships.stats.fasterServiceBooking.label',
      message: 'Faster Service Booking',
    }),
  },
  {
    number: '200k+',
    label: translate({
      id: 'industries.dealerships.stats.connectedVehicles.label',
      message: 'Connected Vehicles',
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
          <Car size={16} /> {INDUSTRY_NAME}
        </span>

        <h1 className={styles.heroTitle}>
          <Translate
            id="industries.dealerships.hero.transformYourDealershipWith"
            values={{
              span: (
                <span className={styles.heroTitleGradient}>
                  <Translate id="industries.dealerships.hero.intelligentVehicleAgents">
                    Intelligent Vehicle Agents
                  </Translate>
                </span>
              ),
            }}
          >
            {'Transform Your Dealership with {span}'}
          </Translate>
        </h1>

        <p className={styles.heroSubtitle}>
          <Translate id="industries.dealerships.hero.fromVirtualServiceAdvisors">
            From virtual service advisors to AI-powered trade-in valuations,
            DIMO helps dealerships deliver exceptional customer experiences
            while streamlining operations across sales, service, and fleet
            management.
          </Translate>
        </p>

        <div className={styles.heroButtons}>
          <Link className={styles.primaryBtn} to={LINKS.external.console}>
            <Translate id="industries.dealerships.hero.getStarted">
              Get Started
            </Translate>{' '}
            <span className={styles.arrow}>→</span>
          </Link>
          <EnglishLink className={styles.secondaryBtn} to="/docs">
            <Translate id="industries.dealerships.hero.viewDocumentation">
              View Documentation
            </Translate>{' '}
            <span className={styles.arrow}>→</span>
          </EnglishLink>
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
        <span className={styles.sectionEyebrow}>
          <Translate id="industries.dealerships.useCases.useCases">
            Use Cases
          </Translate>
        </span>
        <h2 className={styles.sectionTitle}>
          <Translate id="industries.dealerships.useCases.builtForEveryPart">
            Built for Every Part of Your Dealership
          </Translate>
        </h2>
        <p className={styles.sectionSubtitle}>
          <Translate id="industries.dealerships.useCases.whetherYoureServingIndividual">
            Whether you're serving individual customers or managing enterprise
            fleets, DIMO's intelligent agents adapt to your needs and integrate
            seamlessly with your existing systems.
          </Translate>
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
          <h2>
            <Translate id="industries.dealerships.featureSection1.worksInLatamAnd">
              Works in LATAM and the US — Your Way
            </Translate>
          </h2>
          <p>
            <Translate id="industries.dealerships.featureSection1.dimoOffersFlexibleDeployment">
              DIMO offers flexible deployment options designed for your market.
              In Latin America, we support professionally installed hardware
              with full integration and mobile app experiences. In the United
              States, leverage our BYOD (Bring Your Own Device) approach for
              rapid deployment.
            </Translate>
          </p>
          <ul className={styles.featureList}>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="industries.dealerships.featureSection1.professionalInstallationSupportIn">
                Professional installation support in LATAM markets
              </Translate>
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="industries.dealerships.featureSection1.byodIntegrationForUs">
                BYOD integration for US dealerships
              </Translate>
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="industries.dealerships.featureSection1.whiteLabelMobileAppOptions">
                White-label mobile app options available
              </Translate>
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="industries.dealerships.featureSection1.fullApiAccessFor">
                Full API access for custom integrations
              </Translate>
            </li>
          </ul>
        </div>
        <div className={styles.featureVisual}>
          <img
            src={imgCustomers}
            alt={translate({
              id: 'industries.dealerships.featureSection1.happyDealershipCustomersInteracting',
              message: 'Happy Dealership Customers Interacting with AI Agent',
            })}
          />
        </div>
      </div>
    </section>
  );
}

function FeatureSection2() {
  return (
    <section className={styles.featureSection}>
      <div
        className={`${styles.featureContainer} ${styles.featureContainerReversed}`}
      >
        <div className={styles.featureText}>
          <h2>
            <Translate id="industries.dealerships.featureSection2.aiAgentsThatKnow">
              AI Agents That Know Your Customers
            </Translate>
          </h2>
          <p>
            <Translate id="industries.dealerships.featureSection2.everyVehicleAgentHas">
              Every vehicle agent has built-in memory and context awareness,
              delivering personalized experiences that feel human. Customers get
              instant answers about their specific vehicle, service history, and
              upcoming maintenance needs.
            </Translate>
          </p>
          <ul className={styles.featureList}>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="industries.dealerships.featureSection2.persistentMemoryAcrossAll">
                Persistent memory across all customer interactions
              </Translate>
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="industries.dealerships.featureSection2.realTimeVehicleDiagnosticsAnd">
                Real-time vehicle diagnostics and health data
              </Translate>
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="industries.dealerships.featureSection2.seamlessHandoffToHuman">
                Seamless handoff to human agents when needed
              </Translate>
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="industries.dealerships.featureSection2.multiChannelSupportSmsChat">
                Multi-channel support: SMS, chat, voice
              </Translate>
            </li>
          </ul>
        </div>
        <div className={styles.featureVisual}>
          <img
            src={imgMechanic}
            alt={translate({
              id: 'industries.dealerships.featureSection2.aiMechanicAssistingCustomer',
              message: 'AI Mechanic Assisting Customer',
            })}
          />
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      title: translate({
        id: 'industries.dealerships.howItWorks.connectYourInventory.title',
        message: 'Connect Your Inventory',
      }),
      description: translate({
        id: 'industries.dealerships.howItWorks.connectYourInventory.description',
        message:
          'Integrate DIMO with your existing DMS and inventory management systems. Our APIs work with all major platforms.',
      }),
    },
    {
      title: translate({
        id: 'industries.dealerships.howItWorks.deployIntelligentAgents.title',
        message: 'Deploy Intelligent Agents',
      }),
      description: translate({
        id: 'industries.dealerships.howItWorks.deployIntelligentAgents.description',
        message:
          'Choose from pre-built agent templates for service, sales, and fleet management, or customize agents for your specific workflows.',
      }),
    },
    {
      title: translate({
        id: 'industries.dealerships.howItWorks.engageCustomersAutomatically.title',
        message: 'Engage Customers Automatically',
      }),
      description: translate({
        id: 'industries.dealerships.howItWorks.engageCustomersAutomatically.description',
        message:
          'Agents proactively reach out when vehicles need service, answer questions 24/7, and help close more deals.',
      }),
    },
    {
      title: translate({
        id: 'industries.dealerships.howItWorks.measureAndOptimize.title',
        message: 'Measure and Optimize',
      }),
      description: translate({
        id: 'industries.dealerships.howItWorks.measureAndOptimize.description',
        message:
          'Track agent performance, customer satisfaction, and revenue impact through our comprehensive analytics dashboard.',
      }),
    },
  ];

  return (
    <section className={styles.howItWorksSection}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionEyebrow}>
          <Translate id="industries.dealerships.howItWorks.howItWorks">
            How It Works
          </Translate>
        </span>
        <h2 className={styles.sectionTitle}>
          <Translate id="industries.dealerships.howItWorks.upAndRunningIn">
            Up and Running in Days, Not Months
          </Translate>
        </h2>
        <p className={styles.sectionSubtitle}>
          <Translate id="industries.dealerships.howItWorks.dimoIntegratesWithYour">
            DIMO integrates with your existing systems and starts delivering
            value immediately—no complex implementations required.
          </Translate>
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

function CTASection() {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.ctaContent}>
        <h2 className={styles.ctaTitle}>
          <Translate id="industries.dealerships.cta.readyToTransformYour">
            Ready to Transform Your Dealership?
          </Translate>
        </h2>
        <p className={styles.ctaText}>
          <Translate id="industries.dealerships.cta.joinForwardThinkingDealershipsAlready">
            Join forward-thinking dealerships already using DIMO to deliver
            exceptional customer experiences and drive more revenue.
          </Translate>
        </p>
        <div className={styles.heroButtons}>
          <Link className={styles.primaryBtn} to={LINKS.external.console}>
            <Translate id="industries.dealerships.cta.startBuildingToday">
              Start Building Today
            </Translate>{' '}
            <span className={styles.arrow}>→</span>
          </Link>
          <Link className={styles.secondaryBtn} to="mailto:contact@dimo.org">
            <Translate id="industries.dealerships.cta.contactSales">
              Contact Sales
            </Translate>{' '}
            <span className={styles.arrow}>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function DealershipsPage(): ReactNode {
  const { locale, path } = usePageLocale();
  return (
    <>
      <Head>
        <title>
          {translate({
            id: 'industries.dealerships.meta.title',
            message:
              'DIMO for Dealerships | Intelligent Vehicle Agents for Auto Dealers',
          })}
        </title>
        <meta
          name="description"
          content={translate({
            id: 'industries.dealerships.meta.description',
            message:
              "Transform your dealership with DIMO's intelligent vehicle agents. Virtual service advisors, AI trade-in valuations, proactive booking, and fleet management solutions.",
          })}
        />
        <meta
          name="keywords"
          content={translate({
            id: 'industries.dealerships.meta.keywords',
            message:
              'dealership software, auto dealer AI, virtual service advisor, trade-in valuation, fleet management, automotive technology, vehicle agents',
          })}
        />
        <meta
          property="og:title"
          content={translate({
            id: 'industries.dealerships.meta.ogTitle',
            message: 'DIMO for Dealerships | Intelligent Vehicle Agents',
          })}
        />
        <meta
          property="og:description"
          content={translate({
            id: 'industries.dealerships.meta.ogDescription',
            message:
              'Deploy AI-powered vehicle agents for service, sales, and fleet management. 24/7 customer support, data-backed valuations, and proactive service scheduling.',
          })}
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />

        {/* Structured Data for SEO */}
        <script type="application/ld+json">
          {JSON.stringify(
            localizeSchema(
              {
                '@context': 'https://schema.org',
                '@type': 'Product',
                name: translate({
                  id: 'industries.dealerships.schema.dimoForDealerships.name',
                  message: 'DIMO for Dealerships',
                }),
                description: translate({
                  id: 'industries.dealerships.schema.dimoForDealerships.description',
                  message:
                    'Intelligent vehicle agents for automotive dealerships. Virtual service advisors, trade-in valuations, and fleet management.',
                }),
                brand: {
                  '@type': 'Brand',
                  name: 'DIMO',
                },
                category: translate({
                  id: 'industries.dealerships.schema.dimoForDealerships.category',
                  message: 'Automotive Software',
                }),
                audience: {
                  '@type': 'Audience',
                  audienceType: translate({
                    id: 'industries.dealerships.schema.audienceType',
                    message: 'Automotive Dealerships',
                  }),
                },
              },
              locale,
              path
            )
          )}
        </script>
      </Head>

      <div className={styles.industryPage}>
        <CustomNavbar dark={true} />

        <Breadcrumbs
          items={[
            {
              name: translate({
                id: 'industries.dealerships.body.home.name',
                message: 'Home',
              }),
              url: 'https://dimo.org/',
            },
            {
              name: translate({
                id: 'industries.dealerships.body.industries.name',
                message: 'Industries',
              }),
              url: 'https://dimo.org/#industries',
            },
            {
              name: translate({
                id: 'industries.dealerships.body.dealerships.name',
                message: 'Dealerships',
              }),
            },
          ]}
        />

        <main>
          <HeroSection />
          <StatsSection />
          <UseCasesSection />
          <FeatureSection1 />
          <FeatureSection2 />
          <HowItWorksSection />
          <CTASection />
        </main>

        <FooterTheme />
      </div>
    </>
  );
}
