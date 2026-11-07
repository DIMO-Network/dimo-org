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
  Gauge,
  Wrench,
  Users,
  Route,
  AlertOctagon,
  LayoutDashboard,
  Truck,
  ChevronDown,
} from 'lucide-react';
import Translate, { translate } from '@docusaurus/Translate';

const INDUSTRY_NAME = translate({
  id: 'industries.dsp.meta.industryName',
  message: 'Delivery Service Providers',
});
const HERO_BACKGROUND = '/img/mp4/dsp.mp4?v=2';
const imgTrucks = '/img/trucks.png';
const imgMechanic = '/img/mechanic5.png';

const USE_CASES = [
  {
    icon: <LayoutDashboard size={28} />,
    type: translate({
      id: 'industries.dsp.useCases.fleetOperationsCommand.type',
      message: 'Fleets',
    }),
    title: translate({
      id: 'industries.dsp.useCases.fleetOperationsCommand.title',
      message: 'Fleet Operations Command Center',
    }),
    description: translate({
      id: 'industries.dsp.useCases.fleetOperationsCommand.description',
      message:
        'Get real-time visibility into your entire fleet with a comprehensive dashboard showing availability, conditions, maintenance needs, and driver status at a glance.',
    }),
    example: translate({
      id: 'industries.dsp.useCases.fleetOperationsCommand.example',
      message:
        '"Show me all vehicles currently available and their last maintenance date."',
    }),
  },
  {
    icon: <Wrench size={28} />,
    type: translate({
      id: 'industries.dsp.useCases.predictiveMaintenanceCopilot.type',
      message: 'Fleets',
    }),
    title: translate({
      id: 'industries.dsp.useCases.predictiveMaintenanceCopilot.title',
      message: 'Predictive Maintenance Copilot',
    }),
    description: translate({
      id: 'industries.dsp.useCases.predictiveMaintenanceCopilot.description',
      message:
        'AI-powered maintenance predictions that analyze vehicle data to identify issues before they cause breakdowns, reducing downtime and repair costs.',
    }),
    example: translate({
      id: 'industries.dsp.useCases.predictiveMaintenanceCopilot.example',
      message:
        '"Vehicle F-2847 shows early signs of brake wear. Schedule service within the next 500 miles."',
    }),
  },
  {
    icon: <Users size={28} />,
    type: translate({
      id: 'industries.dsp.useCases.driverBehaviorCoaching.type',
      message: 'Fleets',
    }),
    title: translate({
      id: 'industries.dsp.useCases.driverBehaviorCoaching.title',
      message: 'Driver Behavior Coaching',
    }),
    description: translate({
      id: 'industries.dsp.useCases.driverBehaviorCoaching.description',
      message:
        'Monitor driving patterns and automatically provide coaching and corrective actions for aggressive driving, harsh braking, and other risky behaviors.',
    }),
    example: translate({
      id: 'industries.dsp.useCases.driverBehaviorCoaching.example',
      message:
        'Agent sends coaching message: "3 harsh braking events detected today. Smooth braking extends tire life and fuel economy."',
    }),
  },
  {
    icon: <Route size={28} />,
    type: translate({
      id: 'industries.dsp.useCases.routePerformanceAnalysis.type',
      message: 'Fleets',
    }),
    title: translate({
      id: 'industries.dsp.useCases.routePerformanceAnalysis.title',
      message: 'Route Performance Analysis',
    }),
    description: translate({
      id: 'industries.dsp.useCases.routePerformanceAnalysis.description',
      message:
        'Analyze historical route data to identify the fastest, safest, and most efficient delivery routes. Flag routes with high incident rates.',
    }),
    example: translate({
      id: 'industries.dsp.useCases.routePerformanceAnalysis.example',
      message:
        '"Route 7A has 40% faster completion times than Route 7B, with fewer aggressive driving events."',
    }),
  },
  {
    icon: <AlertOctagon size={28} />,
    type: translate({
      id: 'industries.dsp.useCases.damageDetectionIncident.type',
      message: 'Fleets',
    }),
    title: translate({
      id: 'industries.dsp.useCases.damageDetectionIncident.title',
      message: 'Damage Detection & Incident Response',
    }),
    description: translate({
      id: 'industries.dsp.useCases.damageDetectionIncident.description',
      message:
        'Automatically detect vehicle damage, crashes, and incidents. Generate reports, trigger notifications, and coordinate response workflows.',
    }),
    example: translate({
      id: 'industries.dsp.useCases.damageDetectionIncident.example',
      message:
        'Instant alert: "Collision detected on Vehicle D-1923 at 2:34 PM. Location: 5th & Main. Driver status: OK."',
    }),
  },
  {
    icon: <Gauge size={28} />,
    type: translate({
      id: 'industries.dsp.useCases.realTimeFleetHealth.type',
      message: 'Fleets',
    }),
    title: translate({
      id: 'industries.dsp.useCases.realTimeFleetHealth.title',
      message: 'Real-Time Fleet Health Dashboard',
    }),
    description: translate({
      id: 'industries.dsp.useCases.realTimeFleetHealth.description',
      message:
        'Monitor fuel levels, tire pressure, engine diagnostics, and overall vehicle health across your entire fleet in one unified view.',
    }),
    example: translate({
      id: 'industries.dsp.useCases.realTimeFleetHealth.example',
      message:
        '"5 vehicles need attention: 2 low fuel, 2 tire pressure alerts, 1 check engine light."',
    }),
  },
];

const STATS = [
  {
    number: '25%',
    label: translate({
      id: 'industries.dsp.stats.reductionInVehicle.label',
      message: 'Reduction in Vehicle Downtime',
    }),
  },
  {
    number: '18%',
    label: translate({
      id: 'industries.dsp.stats.fuelCostSavings.label',
      message: 'Fuel Cost Savings',
    }),
  },
  {
    number: translate({
      id: 'industries.dsp.stats.sqlQueriesRequired.number',
      message: 'Zero',
    }),
    label: translate({
      id: 'industries.dsp.stats.sqlQueriesRequired.label',
      message: 'SQL Queries Required',
    }),
  },
  {
    number: '30%',
    label: translate({
      id: 'industries.dsp.stats.qualityOfLife.label',
      message: 'Quality of Life Improvements',
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
          <Truck size={16} /> {INDUSTRY_NAME}
        </span>

        <h1 className={styles.heroTitle}>
          <Translate
            id="industries.dsp.hero.commandYourFleetWith"
            values={{
              span: (
                <span className={styles.heroTitleGradient}>
                  <Translate id="industries.dsp.hero.intelligentOperations">
                    Intelligent Operations
                  </Translate>
                </span>
              ),
            }}
          >
            {'Command Your Fleet with {span}'}
          </Translate>
        </h1>

        <p className={styles.heroSubtitle}>
          <Translate id="industries.dsp.hero.fromPredictiveMaintenanceTo">
            From predictive maintenance to driver coaching and route
            optimization, DIMO gives delivery service providers the real-time
            intelligence they need to maximize uptime, reduce costs, and deliver
            on every promise.
          </Translate>
        </p>

        <div className={styles.heroButtons}>
          <Link className={styles.primaryBtn} to={LINKS.external.console}>
            <Translate id="industries.dsp.hero.getStarted">
              Get Started
            </Translate>{' '}
            <span className={styles.arrow}>→</span>
          </Link>
          <EnglishLink className={styles.secondaryBtn} to="/docs">
            <Translate id="industries.dsp.hero.viewDocumentation">
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
          <Translate id="industries.dsp.useCases.useCases">Use Cases</Translate>
        </span>
        <h2 className={styles.sectionTitle}>
          <Translate id="industries.dsp.useCases.builtForHighPerformanceDelivery">
            Built for High-Performance Delivery Operations
          </Translate>
        </h2>
        <p className={styles.sectionSubtitle}>
          <Translate id="industries.dsp.useCases.dimosFleetIntelligencePlatform">
            DIMO's fleet intelligence platform helps delivery service providers
            optimize every aspect of their operations—from vehicle health to
            driver performance to route efficiency.
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
            <Translate id="industries.dsp.featureSection1.predictProblemsBeforeThey">
              Predict Problems Before They Happen
            </Translate>
          </h2>
          <p>
            <Translate id="industries.dsp.featureSection1.dimosPredictiveMaintenanceCopilot">
              DIMO's predictive maintenance copilot continuously analyzes
              vehicle data—engine diagnostics, usage patterns, environmental
              conditions, and historical maintenance records—to identify issues
              before they cause expensive breakdowns or missed deliveries.
            </Translate>
          </p>
          <ul className={styles.featureList}>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="industries.dsp.featureSection1.aiPoweredFailurePredictionBased">
                AI-powered failure prediction based on real vehicle data
              </Translate>
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="industries.dsp.featureSection1.automaticMaintenanceSchedulingWhen">
                Automatic maintenance scheduling when issues are detected
              </Translate>
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="industries.dsp.featureSection1.integrationWithYourExisting">
                Integration with your existing maintenance systems
              </Translate>
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="industries.dsp.featureSection1.reduceEmergencyRepairsAnd">
                Reduce emergency repairs and roadside breakdowns
              </Translate>
            </li>
          </ul>
        </div>
        <div className={styles.featureVisual}>
          <img
            src={imgMechanic}
            alt={translate({
              id: 'industries.dsp.featureSection1.mechanicInspectingDeliveryVehicle',
              message: 'Mechanic Inspecting Delivery Vehicle',
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
            <Translate id="industries.dsp.featureSection2.optimizeRoutesMaximizeDeliveries">
              Optimize Routes, Maximize Deliveries
            </Translate>
          </h2>
          <p>
            <Translate id="industries.dsp.featureSection2.goBeyondBasicGps">
              Go beyond basic GPS tracking. DIMO's route analysis intelligence
              examines historical performance data to identify which routes are
              fastest, where problems occur, and how to optimize your delivery
              network for maximum efficiency.
            </Translate>
          </p>
          <ul className={styles.featureList}>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="industries.dsp.featureSection2.identifyHighPerformingVsProblem">
                Identify high-performing vs. problem routes
              </Translate>
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="industries.dsp.featureSection2.correlateRoutesWithDriver">
                Correlate routes with driver behavior and incidents
              </Translate>
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="industries.dsp.featureSection2.suggestOptimizedAlternativesBased">
                Suggest optimized alternatives based on real data
              </Translate>
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="industries.dsp.featureSection2.trackImprovementsOverTime">
                Track improvements over time with analytics
              </Translate>
            </li>
          </ul>
        </div>
        <div className={styles.featureVisual}>
          <img
            src={imgTrucks}
            alt={translate({
              id: 'industries.dsp.featureSection2.deliveryTrucksOnRoute',
              message: 'Delivery Trucks on Route',
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
        id: 'industries.dsp.howItWorks.connectYourFleet.title',
        message: 'Connect Your Fleet',
      }),
      description: translate({
        id: 'industries.dsp.howItWorks.connectYourFleet.description',
        message:
          'Onboard your delivery vehicles using DIMO hardware or native OEM connections. Integration is seamless with your existing fleet management tools.',
      }),
    },
    {
      title: translate({
        id: 'industries.dsp.howItWorks.configureYourCommand.title',
        message: 'Configure Your Command Center',
      }),
      description: translate({
        id: 'industries.dsp.howItWorks.configureYourCommand.description',
        message:
          'Set up real-time monitoring, maintenance thresholds, driver coaching parameters, and custom alerts tailored to your operations.',
      }),
    },
    {
      title: translate({
        id: 'industries.dsp.howItWorks.deployIntelligentAgents.title',
        message: 'Deploy Intelligent Agents',
      }),
      description: translate({
        id: 'industries.dsp.howItWorks.deployIntelligentAgents.description',
        message:
          'Activate AI-powered copilots for maintenance prediction, route analysis, driver coaching, and incident response.',
      }),
    },
    {
      title: translate({
        id: 'industries.dsp.howItWorks.optimizeContinuously.title',
        message: 'Optimize Continuously',
      }),
      description: translate({
        id: 'industries.dsp.howItWorks.optimizeContinuously.description',
        message:
          'Use real-time data and analytics to continuously improve fleet performance, reduce costs, and maximize on-time deliveries.',
      }),
    },
  ];

  return (
    <section className={styles.howItWorksSection}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionEyebrow}>
          <Translate id="industries.dsp.howItWorks.howItWorks">
            How It Works
          </Translate>
        </span>
        <h2 className={styles.sectionTitle}>
          <Translate id="industries.dsp.howItWorks.fromSetupToOptimization">
            From Setup to Optimization in Days
          </Translate>
        </h2>
        <p className={styles.sectionSubtitle}>
          <Translate id="industries.dsp.howItWorks.dimoIntegratesWithYour">
            DIMO integrates with your existing systems and starts delivering
            actionable intelligence immediately.
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
          <Translate id="industries.dsp.cta.readyToTransformYour">
            Ready to Transform Your Delivery Operations?
          </Translate>
        </h2>
        <p className={styles.ctaText}>
          <Translate id="industries.dsp.cta.joinLeadingDeliveryService">
            Join leading delivery service providers using DIMO to reduce costs,
            improve reliability, and deliver on every promise.
          </Translate>
        </p>
        <div className={styles.heroButtons}>
          <Link className={styles.primaryBtn} to={LINKS.external.console}>
            <Translate id="industries.dsp.cta.startBuildingToday">
              Start Building Today
            </Translate>{' '}
            <span className={styles.arrow}>→</span>
          </Link>
          <Link className={styles.secondaryBtn} to="mailto:contact@dimo.org">
            <Translate id="industries.dsp.cta.contactSales">
              Contact Sales
            </Translate>{' '}
            <span className={styles.arrow}>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function DeliveryPage(): ReactNode {
  const { locale, path } = usePageLocale();
  return (
    <>
      <Head>
        <title>
          {translate({
            id: 'industries.dsp.meta.title',
            message:
              'DIMO for Delivery | Fleet Intelligence for Delivery Service Providers',
          })}
        </title>
        <meta
          name="description"
          content={translate({
            id: 'industries.dsp.meta.description',
            message:
              "Optimize delivery operations with DIMO's intelligent fleet platform. Predictive maintenance, driver coaching, route analysis, and real-time fleet monitoring.",
          })}
        />
        <meta
          name="keywords"
          content={translate({
            id: 'industries.dsp.meta.keywords',
            message:
              'delivery fleet management, predictive maintenance, driver coaching, route optimization, fleet monitoring, logistics technology, delivery operations',
          })}
        />
        <meta
          property="og:title"
          content={translate({
            id: 'industries.dsp.meta.ogTitle',
            message: 'DIMO for Delivery | Fleet Intelligence Platform',
          })}
        />
        <meta
          property="og:description"
          content={translate({
            id: 'industries.dsp.meta.ogDescription',
            message:
              'Command your delivery fleet with AI-powered predictive maintenance, driver coaching, route analysis, and real-time monitoring.',
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
                  id: 'industries.dsp.schema.dimoForDelivery.name',
                  message: 'DIMO for Delivery',
                }),
                description: translate({
                  id: 'industries.dsp.schema.dimoForDelivery.description',
                  message:
                    'Fleet intelligence platform for delivery service providers. Predictive maintenance, driver coaching, and route optimization.',
                }),
                brand: {
                  '@type': 'Brand',
                  name: 'DIMO',
                },
                category: translate({
                  id: 'industries.dsp.schema.dimoForDelivery.category',
                  message: 'Fleet Management Software',
                }),
                audience: {
                  '@type': 'Audience',
                  audienceType: translate({
                    id: 'industries.dsp.schema.audienceType',
                    message: 'Delivery Service Providers',
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
                id: 'industries.dsp.body.home.name',
                message: 'Home',
              }),
              url: 'https://dimo.org/',
            },
            {
              name: translate({
                id: 'industries.dsp.body.industries.name',
                message: 'Industries',
              }),
              url: 'https://dimo.org/#industries',
            },
            {
              name: translate({
                id: 'industries.dsp.body.dataServiceProviders.name',
                message: 'Data Service Providers',
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
