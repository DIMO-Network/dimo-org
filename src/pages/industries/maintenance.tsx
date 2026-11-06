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
  MessageCircle,
  Stethoscope,
  Phone,
  GraduationCap,
  Settings,
  ChevronDown,
} from 'lucide-react';
import Translate, { translate } from '@docusaurus/Translate';

const INDUSTRY_NAME = translate({
  id: 'industries.maintenance.meta.industryName',
  message: 'Automotive Maintenance',
});
const HERO_BACKGROUND = '/img/mp4/mechanics.mp4?v=2';
const imgMechanic = '/img/mechanic.png';
const imgCustomer = '/img/customers.png';

const USE_CASES = [
  {
    icon: <MessageCircle size={28} />,
    type: translate({
      id: 'industries.maintenance.useCases.customerSupportAgent.type',
      message: 'Consumer',
    }),
    title: translate({
      id: 'industries.maintenance.useCases.customerSupportAgent.title',
      message: 'Customer Support Agent',
    }),
    description: translate({
      id: 'industries.maintenance.useCases.customerSupportAgent.description',
      message:
        'Let customers share their vehicle data and describe issues before arriving at your shop. The AI agent gathers detailed information, helping technicians prepare and diagnose faster.',
    }),
    example: translate({
      id: 'industries.maintenance.useCases.customerSupportAgent.example',
      message:
        'Customer: "My car is making a grinding noise when I brake." Agent: "I see your brake pads are at 15%. Let me check your service history and schedule you in."',
    }),
  },
  {
    icon: <Stethoscope size={28} />,
    type: translate({
      id: 'industries.maintenance.useCases.diagnosticsAssistance.type',
      message: 'Fleets',
    }),
    title: translate({
      id: 'industries.maintenance.useCases.diagnosticsAssistance.title',
      message: 'Diagnostics Assistance',
    }),
    description: translate({
      id: 'industries.maintenance.useCases.diagnosticsAssistance.description',
      message:
        'Give every technician a seasoned expert to consult with, powered by live vehicle data. Techs can describe symptoms while the agent pulls relevant OBD data and suggests diagnoses.',
    }),
    example: translate({
      id: 'industries.maintenance.useCases.diagnosticsAssistance.example',
      message:
        '"The engine is misfiring on cold starts. What does the OBD data show?" Agent analyzes codes and sensor data in real-time.',
    }),
  },
  {
    icon: <Phone size={28} />,
    type: translate({
      id: 'industries.maintenance.useCases.proactiveCustomerOutreach.type',
      message: 'Fleets',
    }),
    title: translate({
      id: 'industries.maintenance.useCases.proactiveCustomerOutreach.title',
      message: 'Proactive Customer Outreach',
    }),
    description: translate({
      id: 'industries.maintenance.useCases.proactiveCustomerOutreach.description',
      message:
        'Automatically identify customers whose vehicles need service based on mileage, time, or detected issues. Reach out proactively to schedule appointments.',
    }),
    example: translate({
      id: 'industries.maintenance.useCases.proactiveCustomerOutreach.example',
      message:
        '"Hi John, your 2021 Honda is due for its 30,000-mile service. Would you like to schedule an appointment this week?"',
    }),
  },
  {
    icon: <GraduationCap size={28} />,
    type: translate({
      id: 'industries.maintenance.useCases.trainingAssistant.type',
      message: 'Fleets',
    }),
    title: translate({
      id: 'industries.maintenance.useCases.trainingAssistant.title',
      message: 'Training Assistant',
    }),
    description: translate({
      id: 'industries.maintenance.useCases.trainingAssistant.description',
      message:
        'Accelerate junior technician development with an AI training assistant. Real-time access to vehicle data, repair procedures, and expert guidance helps new techs learn faster.',
    }),
    example: translate({
      id: 'industries.maintenance.useCases.trainingAssistant.example',
      message:
        'Junior tech: "How do I diagnose this P0420 code?" Agent: "Let me walk you through catalyst efficiency testing step by step."',
    }),
  },
];

const STATS = [
  {
    number: '45%',
    label: translate({
      id: 'industries.maintenance.stats.fasterDiagnosis.label',
      message: 'Faster Diagnosis',
    }),
  },
  {
    number: '30%',
    label: translate({
      id: 'industries.maintenance.stats.increaseInBookings.label',
      message: 'Increase in Bookings',
    }),
  },
  {
    number: '25 %',
    label: translate({
      id: 'industries.maintenance.stats.moreAccurateEstimates.label',
      message: 'More Accurate Estimates',
    }),
  },
  {
    number: '200k+',
    label: translate({
      id: 'industries.maintenance.stats.connectedVehicles.label',
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
          <Settings size={16} /> {INDUSTRY_NAME}
        </span>

        <h1 className={styles.heroTitle}>
          <Translate
            id="industries.maintenance.hero.superchargeYourShopWith"
            values={{
              span: (
                <span className={styles.heroTitleGradient}>
                  <Translate id="industries.maintenance.hero.aiPoweredDiagnostics">
                    AI-Powered Diagnostics
                  </Translate>
                </span>
              ),
            }}
          >
            {'Supercharge Your Shop with {span}'}
          </Translate>
        </h1>

        <p className={styles.heroSubtitle}>
          <Translate id="industries.maintenance.hero.fromCustomerIntakeTo">
            From customer intake to technician training, DIMO's intelligent
            vehicle agents help automotive maintenance shops diagnose faster,
            book more appointments, and develop skilled technicians.
          </Translate>
        </p>

        <div className={styles.heroButtons}>
          <Link className={styles.primaryBtn} to={LINKS.external.console}>
            <Translate id="industries.maintenance.hero.getStarted">
              Get Started
            </Translate>{' '}
            <span className={styles.arrow}>→</span>
          </Link>
          <EnglishLink className={styles.secondaryBtn} to="/docs">
            <Translate id="industries.maintenance.hero.viewDocumentation">
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
          <Translate id="industries.maintenance.useCases.useCases">
            Use Cases
          </Translate>
        </span>
        <h2 className={styles.sectionTitle}>
          <Translate id="industries.maintenance.useCases.builtForModernAutomotive">
            Built for Modern Automotive Shops
          </Translate>
        </h2>
        <p className={styles.sectionSubtitle}>
          <Translate id="industries.maintenance.useCases.dimosIntelligentAgentsHelp">
            DIMO's intelligent agents help automotive maintenance businesses
            improve customer experience, accelerate diagnostics, and develop
            their team—all powered by real vehicle data.
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
            <Translate id="industries.maintenance.featureSection1.knowWhatsWrongBefore">
              Know What's Wrong Before the Car Arrives
            </Translate>
          </h2>
          <p>
            <Translate id="industries.maintenance.featureSection1.dimosCustomerSupportAgent">
              DIMO's customer support agent engages with customers when they
              first notice a problem. By the time they arrive at your shop, you
              already have their vehicle data, symptom descriptions, and a
              preliminary diagnosis—so your technicians can get straight to
              work.
            </Translate>
          </p>
          <ul className={styles.featureList}>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="industries.maintenance.featureSection1.customersDescribeIssuesIn">
                Customers describe issues in natural language
              </Translate>
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="industries.maintenance.featureSection1.agentAccessesRealTimeVehicle">
                Agent accesses real-time vehicle diagnostics
              </Translate>
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="industries.maintenance.featureSection1.preliminaryDiagnosisReadyBefore">
                Preliminary diagnosis ready before arrival
              </Translate>
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="industries.maintenance.featureSection1.partsCanBeOrdered">
                Parts can be ordered in advance
              </Translate>
            </li>
          </ul>
        </div>
        <div className={styles.featureVisual}>
          <img
            src={imgCustomer}
            alt={translate({
              id: 'industries.maintenance.featureSection1.customerIntakeFlow',
              message: 'Customer Intake Flow',
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
            <Translate id="industries.maintenance.featureSection2.aMasterTechnicianIn">
              A Master Technician in Every Bay
            </Translate>
          </h2>
          <p>
            <Translate id="industries.maintenance.featureSection2.giveEveryTechnicianFromApprentice">
              Give every technician—from apprentice to veteran—access to an
              AI-powered diagnostics assistant. The agent can pull live OBD
              data, suggest diagnostic procedures, explain repair steps, and
              provide expert guidance for complex issues.
            </Translate>
          </p>
          <ul className={styles.featureList}>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="industries.maintenance.featureSection2.realTimeAccessToVehicle">
                Real-time access to vehicle sensor data
              </Translate>
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="industries.maintenance.featureSection2.contextAwareDiagnosticSuggestions">
                Context-aware diagnostic suggestions
              </Translate>
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="industries.maintenance.featureSection2.stepByStepRepairGuidance">
                Step-by-step repair guidance
              </Translate>
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="industries.maintenance.featureSection2.accelerateJuniorTechnicianDevelopment">
                Accelerate junior technician development
              </Translate>
            </li>
          </ul>
        </div>
        <div className={styles.featureVisual}>
          <img
            src={imgMechanic}
            alt={translate({
              id: 'industries.maintenance.featureSection2.mechanicUsingDiagnosticsAssistance',
              message: 'Mechanic using Diagnostics Assistance',
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
        id: 'industries.maintenance.howItWorks.connectCustomerVehicles.title',
        message: 'Connect Customer Vehicles',
      }),
      description: translate({
        id: 'industries.maintenance.howItWorks.connectCustomerVehicles.description',
        message:
          'Customers connect their vehicles through DIMO, giving your shop authorized access to diagnostic data with full consent management.',
      }),
    },
    {
      title: translate({
        id: 'industries.maintenance.howItWorks.deploySupportAgents.title',
        message: 'Deploy Support Agents',
      }),
      description: translate({
        id: 'industries.maintenance.howItWorks.deploySupportAgents.description',
        message:
          'Set up customer-facing support agents that handle inquiries, gather symptom information, and schedule appointments.',
      }),
    },
    {
      title: translate({
        id: 'industries.maintenance.howItWorks.empowerYourTechnicians.title',
        message: 'Empower Your Technicians',
      }),
      description: translate({
        id: 'industries.maintenance.howItWorks.empowerYourTechnicians.description',
        message:
          'Give your team access to AI-powered diagnostics assistance that works alongside live vehicle data.',
      }),
    },
    {
      title: translate({
        id: 'industries.maintenance.howItWorks.growYourBusiness.title',
        message: 'Grow Your Business',
      }),
      description: translate({
        id: 'industries.maintenance.howItWorks.growYourBusiness.description',
        message:
          'Use proactive outreach to stay connected with customers and automatically identify service opportunities.',
      }),
    },
  ];

  return (
    <section className={styles.howItWorksSection}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionEyebrow}>
          <Translate id="industries.maintenance.howItWorks.howItWorks">
            How It Works
          </Translate>
        </span>
        <h2 className={styles.sectionTitle}>
          <Translate id="industries.maintenance.howItWorks.simpleSetupPowerfulResults">
            Simple Setup, Powerful Results
          </Translate>
        </h2>
        <p className={styles.sectionSubtitle}>
          <Translate id="industries.maintenance.howItWorks.dimoIntegratesWithYour">
            DIMO integrates with your existing shop management systems and
            starts delivering value from day one.
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
          <Translate id="industries.maintenance.cta.readyToTransformYour">
            Ready to Transform Your Shop?
          </Translate>
        </h2>
        <p className={styles.ctaText}>
          <Translate id="industries.maintenance.cta.joinForwardThinkingAutomotiveMaintenance">
            Join forward-thinking automotive maintenance shops already using
            DIMO to diagnose faster, book more, and build better teams.
          </Translate>
        </p>
        <div className={styles.heroButtons}>
          <Link className={styles.primaryBtn} to={LINKS.external.console}>
            <Translate id="industries.maintenance.cta.startBuildingToday">
              Start Building Today
            </Translate>{' '}
            <span className={styles.arrow}>→</span>
          </Link>
          <Link className={styles.secondaryBtn} to="mailto:contact@dimo.org">
            <Translate id="industries.maintenance.cta.contactSales">
              Contact Sales
            </Translate>{' '}
            <span className={styles.arrow}>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function MaintenancePage(): ReactNode {
  const { locale, path } = usePageLocale();
  return (
    <>
      <Head>
        <title>
          {translate({
            id: 'industries.maintenance.meta.title',
            message:
              'DIMO for Automotive Maintenance | AI-Powered Diagnostics for Auto Shops',
          })}
        </title>
        <meta
          name="description"
          content={translate({
            id: 'industries.maintenance.meta.description',
            message:
              "Transform your auto shop with DIMO's intelligent diagnostics. Customer support agents, technician assistance, proactive outreach, and training tools.",
          })}
        />
        <meta
          name="keywords"
          content={translate({
            id: 'industries.maintenance.meta.keywords',
            message:
              'auto shop software, automotive diagnostics, technician training, shop management, vehicle repair, automotive technology, mechanic tools',
          })}
        />
        <meta
          property="og:title"
          content={translate({
            id: 'industries.maintenance.meta.ogTitle',
            message: 'DIMO for Automotive Maintenance | AI-Powered Diagnostics',
          })}
        />
        <meta
          property="og:description"
          content={translate({
            id: 'industries.maintenance.meta.ogDescription',
            message:
              'Supercharge your shop with AI diagnostics assistance, customer support agents, and technician training tools powered by real vehicle data.',
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
                id: 'industries.maintenance.body.home.name',
                message: 'Home',
              }),
              url: 'https://dimo.org/',
            },
            {
              name: translate({
                id: 'industries.maintenance.body.industries.name',
                message: 'Industries',
              }),
              url: 'https://dimo.org/#industries',
            },
            {
              name: translate({
                id: 'industries.maintenance.body.maintenance.name',
                message: 'Maintenance',
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
