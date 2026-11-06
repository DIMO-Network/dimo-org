import React, { type ReactNode, useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import EnglishLink from '../../components/EnglishLink';
import Head from '@docusaurus/Head';
import { localizeSchema } from '../../lib/seo';
import { usePageLocale } from '../../lib/use-page-locale';
import styles from './solutions.module.css';
import FooterTheme from '../../theme/Footer';
import CustomNavbar from '../../components/CustomNavbar';
import Breadcrumbs from '../../components/Breadcrumbs';
import { LINKS } from '../../links';
import {
  BarChart3,
  Layers,
  Code,
  Zap,
  Shield,
  ChevronDown,
  Truck,
} from 'lucide-react';
import Translate, { translate } from '@docusaurus/Translate';

const SOLUTION_NAME = translate({
  id: 'solutions.fleetIntelligence.meta.solutionName',
  message: 'Fleet Intelligence',
});
const HERO_BACKGROUND = '/img/mp4/fleets.mp4?v=2';
const imgFleet = '/img/trucks2.png';
const imgSdk = '/img/sdks.webp';
const imgDelivery = '/img/delivery.png';

const USE_CASES = [
  {
    icon: <BarChart3 size={28} />,
    type: translate({
      id: 'solutions.fleetIntelligence.useCases.unifiedFleetDashboard.type',
      message: 'Dashboard (Coming Soon)',
    }),
    title: translate({
      id: 'solutions.fleetIntelligence.useCases.unifiedFleetDashboard.title',
      message: 'Unified Fleet Dashboard',
    }),
    description: translate({
      id: 'solutions.fleetIntelligence.useCases.unifiedFleetDashboard.description',
      message:
        'Comprehensive fleet management dashboard with real-time visibility into all vehicles. Monitor health, location, utilization, and maintenance needs from one centralized platform.',
    }),
    example: translate({
      id: 'solutions.fleetIntelligence.useCases.unifiedFleetDashboard.example',
      message:
        'Track 100s or 1000s of vehicles across multiple locations with live updates and predictive insights.',
    }),
  },
  {
    icon: <Code size={28} />,
    type: translate({
      id: 'solutions.fleetIntelligence.useCases.developerFriendlySdks.type',
      message: 'SDK Integration',
    }),
    title: translate({
      id: 'solutions.fleetIntelligence.useCases.developerFriendlySdks.title',
      message: 'Developer-Friendly SDKs',
    }),
    description: translate({
      id: 'solutions.fleetIntelligence.useCases.developerFriendlySdks.description',
      message:
        'Build custom fleet applications with our easy-to-use SDKs for JavaScript, Python, Go, and C#. Full API access with production-ready code examples.',
    }),
    example: translate({
      id: 'solutions.fleetIntelligence.useCases.developerFriendlySdks.example',
      message:
        'npm install @dimo/sdk and start querying fleet data in minutes with comprehensive documentation.',
    }),
  },
  {
    icon: <Layers size={28} />,
    type: translate({
      id: 'solutions.fleetIntelligence.useCases.realTimeFleetTelemetry.type',
      message: 'Data Platform',
    }),
    title: translate({
      id: 'solutions.fleetIntelligence.useCases.realTimeFleetTelemetry.title',
      message: 'Real-Time Fleet Telemetry',
    }),
    description: translate({
      id: 'solutions.fleetIntelligence.useCases.realTimeFleetTelemetry.description',
      message:
        'Stream live vehicle data including location, diagnostics, fuel consumption, and driver behavior. Build custom analytics and reporting on top of clean, normalized data.',
    }),
    example: translate({
      id: 'solutions.fleetIntelligence.useCases.realTimeFleetTelemetry.example',
      message:
        'Access real-time streams via WebSocket or batch data via REST API—choose what fits your use case.',
    }),
  },
  {
    icon: <Zap size={28} />,
    type: translate({
      id: 'solutions.fleetIntelligence.useCases.predictiveMaintenance.type',
      message: 'Analytics',
    }),
    title: translate({
      id: 'solutions.fleetIntelligence.useCases.predictiveMaintenance.title',
      message: 'Predictive Maintenance',
    }),
    description: translate({
      id: 'solutions.fleetIntelligence.useCases.predictiveMaintenance.description',
      message:
        'AI-powered insights that predict maintenance needs before failures occur. Reduce downtime and extend vehicle lifespan with data-driven maintenance scheduling.',
    }),
    example: translate({
      id: 'solutions.fleetIntelligence.useCases.predictiveMaintenance.example',
      message:
        'Get alerts when vehicles are due for service based on actual usage patterns, not just mileage.',
    }),
  },
  {
    icon: <Shield size={28} />,
    type: translate({
      id: 'solutions.fleetIntelligence.useCases.driverSafetyCompliance.type',
      message: 'Compliance',
    }),
    title: translate({
      id: 'solutions.fleetIntelligence.useCases.driverSafetyCompliance.title',
      message: 'Driver Safety & Compliance',
    }),
    description: translate({
      id: 'solutions.fleetIntelligence.useCases.driverSafetyCompliance.description',
      message:
        'Monitor driver behavior, track compliance metrics, and ensure safety standards across your fleet. Automated alerts for unsafe driving patterns.',
    }),
    example: translate({
      id: 'solutions.fleetIntelligence.useCases.driverSafetyCompliance.example',
      message:
        'Track speeding, harsh braking, rapid acceleration, and idle time—all with configurable thresholds.',
    }),
  },
  {
    icon: <Truck size={28} />,
    type: translate({
      id: 'solutions.fleetIntelligence.useCases.routeUtilizationOptimization.type',
      message: 'Optimization',
    }),
    title: translate({
      id: 'solutions.fleetIntelligence.useCases.routeUtilizationOptimization.title',
      message: 'Route & Utilization Optimization',
    }),
    description: translate({
      id: 'solutions.fleetIntelligence.useCases.routeUtilizationOptimization.description',
      message:
        'Optimize routes, reduce fuel costs, and maximize vehicle utilization with intelligent analytics. Identify underutilized assets and inefficient routes.',
    }),
    example: translate({
      id: 'solutions.fleetIntelligence.useCases.routeUtilizationOptimization.example',
      message:
        'Reduce fuel costs by 15-25% through data-driven route optimization and utilization insights.',
    }),
  },
];

const STATS = [
  {
    number: 'Coming Soon',
    label: translate({
      id: 'solutions.fleetIntelligence.stats.fleetDashboard.label',
      message: 'Fleet Dashboard',
    }),
  },
  {
    number: '5+',
    label: translate({
      id: 'solutions.fleetIntelligence.stats.sdkLanguages.label',
      message: 'SDK Languages',
    }),
  },
  {
    number: '<100ms',
    label: translate({
      id: 'solutions.fleetIntelligence.stats.apiLatency.label',
      message: 'API Latency',
    }),
  },
  {
    number: '99.9%',
    label: translate({
      id: 'solutions.fleetIntelligence.stats.uptimeSla.label',
      message: 'Uptime SLA',
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
          <Truck size={16} /> {SOLUTION_NAME}
        </span>

        <h1 className={styles.heroTitle}>
          <Translate
            id="solutions.fleetIntelligence.hero.seeEveryVehicleEvery"
            values={{
              span: (
                <span className={styles.heroTitleGradient}>
                  <Translate id="solutions.fleetIntelligence.hero.acrossAMixedFleet">
                    across a mixed fleet
                  </Translate>
                </span>
              ),
            }}
          >
            {'See every vehicle, every session, {span}'}
          </Translate>
        </h1>

        <p className={styles.heroSubtitle}>
          <Translate
            id="solutions.fleetIntelligence.hero.fleetManagersSpend45"
            values={{
              link: (
                <Link to="/compliance/vehicle-access-audit-trail">
                  <Translate id="solutions.fleetIntelligence.hero.verifiableTrailYouCan">
                    verifiable trail you can share with insurers
                  </Translate>
                </Link>
              ),
              link2: (
                <Link to="/industries/rentals">
                  <Translate id="solutions.fleetIntelligence.hero.rentalOperations">
                    rental operations
                  </Translate>
                </Link>
              ),
            }}
          >
            {
              'Fleet managers spend 4–5 hours a week consolidating data across fragmented systems. DIMO normalizes telematics across the 50+ vehicle brands already connected, through one API, and turns it into a {link}. See it in {link2}.'
            }
          </Translate>
        </p>

        <div className={styles.heroButtons}>
          <Link className={styles.primaryBtn} to={LINKS.external.console}>
            <Translate id="solutions.fleetIntelligence.hero.getApiKeys">
              Get API Keys
            </Translate>{' '}
            <span className={styles.arrow}>→</span>
          </Link>
          <EnglishLink className={styles.secondaryBtn} to="/docs">
            <Translate id="solutions.fleetIntelligence.hero.viewDocumentation">
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
          <Translate id="solutions.fleetIntelligence.useCases.platformFeatures">
            Platform Features
          </Translate>
        </span>
        <h2 className={styles.sectionTitle}>
          <Translate id="solutions.fleetIntelligence.useCases.everythingYouNeedFor">
            Everything You Need for Fleet Management
          </Translate>
        </h2>
        <p className={styles.sectionSubtitle}>
          <Translate id="solutions.fleetIntelligence.useCases.fromUnifiedDashboardsTo">
            From unified dashboards to powerful SDKs and predictive analytics,
            DIMO provides the complete platform for building intelligent fleet
            solutions.
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
            <Translate id="solutions.fleetIntelligence.featureSection1.fleetDashboardComingSoon">
              Fleet Dashboard: Coming Soon
            </Translate>
          </h2>
          <p>
            <Translate id="solutions.fleetIntelligence.featureSection1.aComprehensiveProductionReadyFleet">
              A comprehensive, production-ready fleet management dashboard is on
              the way. Get real-time visibility into your entire fleet with
              customizable views, alerts, and reporting—all built on DIMO's
              reliable infrastructure.
            </Translate>
          </p>
          <ul className={styles.featureList}>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="solutions.fleetIntelligence.featureSection1.liveVehicleTrackingWith">
                Live vehicle tracking with map-based visualization
              </Translate>
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="solutions.fleetIntelligence.featureSection1.healthMonitoringAndPredictive">
                Health monitoring and predictive maintenance alerts
              </Translate>
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="solutions.fleetIntelligence.featureSection1.driverBehaviorScoringAnd">
                Driver behavior scoring and safety compliance
              </Translate>
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="solutions.fleetIntelligence.featureSection1.customizableReportsAndAnalytics">
                Customizable reports and analytics dashboards
              </Translate>
            </li>
          </ul>
        </div>
        <div className={styles.featureVisual}>
          <img
            src={imgFleet}
            alt={translate({
              id: 'solutions.fleetIntelligence.featureSection1.fleetOfTrucksOn',
              message: 'Fleet of Trucks on Road',
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
            <Translate id="solutions.fleetIntelligence.featureSection2.buildWithPowerfulSdks">
              Build with Powerful SDKs
            </Translate>
          </h2>
          <p>
            <Translate id="solutions.fleetIntelligence.featureSection2.developerFriendlySdksForJavascript">
              Developer-friendly SDKs for JavaScript, Python, Go, C#, and more.
              Build custom fleet applications with full API access,
              comprehensive documentation, and production-ready code examples.
            </Translate>
          </p>
          <ul className={styles.featureList}>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="solutions.fleetIntelligence.featureSection2.sdksForJavascriptPython">
                SDKs for JavaScript, Python, Go, C#, and more
              </Translate>
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="solutions.fleetIntelligence.featureSection2.restfulAndGraphqlApis">
                RESTful and GraphQL APIs with OpenAPI specifications
              </Translate>
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="solutions.fleetIntelligence.featureSection2.webSocketSupportForRealTime">
                WebSocket support for real-time telemetry streaming
              </Translate>
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="solutions.fleetIntelligence.featureSection2.interactiveDocumentationWithCode">
                Interactive documentation with code examples
              </Translate>
            </li>
          </ul>
        </div>
        <div className={styles.featureVisual}>
          <img
            src={imgSdk}
            alt={translate({
              id: 'solutions.fleetIntelligence.featureSection2.sdkCodeExamples',
              message: 'SDK Code Examples',
            })}
          />
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
          <h2>
            <Translate id="solutions.fleetIntelligence.featureSection3.aiPoweredFleetOptimization">
              AI-Powered Fleet Optimization
            </Translate>
          </h2>
          <p>
            <Translate id="solutions.fleetIntelligence.featureSection3.leverageMachineLearningInsights">
              Leverage machine learning insights to reduce costs, improve
              safety, and maximize efficiency. Predictive maintenance, route
              optimization, and driver behavior analysis—all powered by clean,
              normalized vehicle data.
            </Translate>
          </p>
          <ul className={styles.featureList}>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="solutions.fleetIntelligence.featureSection3.predictiveMaintenanceBasedOn">
                Predictive maintenance based on actual usage patterns
              </Translate>
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="solutions.fleetIntelligence.featureSection3.fuelConsumptionTrackingAnd">
                Fuel consumption tracking and optimization insights
              </Translate>
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="solutions.fleetIntelligence.featureSection3.driverSafetyScoringWith">
                Driver safety scoring with actionable recommendations
              </Translate>
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="solutions.fleetIntelligence.featureSection3.utilizationAnalyticsToIdentify">
                Utilization analytics to identify underused assets
              </Translate>
            </li>
          </ul>
        </div>
        <div className={styles.featureVisual}>
          <img
            src={imgDelivery}
            alt={translate({
              id: 'solutions.fleetIntelligence.featureSection3.deliveryVehicleOnRoute',
              message: 'Delivery Vehicle on Route',
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
        id: 'solutions.fleetIntelligence.howItWorks.getApiAccess.title',
        message: 'Get API Access',
      }),
      description: translate({
        id: 'solutions.fleetIntelligence.howItWorks.getApiAccess.description',
        message:
          'Sign up for DIMO and get instant API credentials. No approval process or waiting—start building immediately.',
      }),
    },
    {
      title: translate({
        id: 'solutions.fleetIntelligence.howItWorks.integrateWithSdks.title',
        message: 'Integrate with SDKs',
      }),
      description: translate({
        id: 'solutions.fleetIntelligence.howItWorks.integrateWithSdks.description',
        message:
          'Install our SDK in your preferred language and connect your fleet vehicles. Follow our quickstart guides for common use cases.',
      }),
    },
    {
      title: translate({
        id: 'solutions.fleetIntelligence.howItWorks.buildCustomDashboards.title',
        message: 'Build Custom Dashboards',
      }),
      description: translate({
        id: 'solutions.fleetIntelligence.howItWorks.buildCustomDashboards.description',
        message:
          'Use our APIs to build custom fleet dashboards tailored to your operations. Or wait for our pre-built Fleet Dashboard (coming soon).',
      }),
    },
    {
      title: translate({
        id: 'solutions.fleetIntelligence.howItWorks.scaleOptimize.title',
        message: 'Scale & Optimize',
      }),
      description: translate({
        id: 'solutions.fleetIntelligence.howItWorks.scaleOptimize.description',
        message:
          'Leverage AI-powered insights to optimize routes, reduce costs, and improve safety. Scale to thousands of vehicles with confidence.',
      }),
    },
  ];

  return (
    <section className={styles.howItWorksSection}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionEyebrow}>
          <Translate id="solutions.fleetIntelligence.howItWorks.howItWorks">
            How It Works
          </Translate>
        </span>
        <h2 className={styles.sectionTitle}>
          <Translate id="solutions.fleetIntelligence.howItWorks.startBuildingFleetSolutions">
            Start Building Fleet Solutions
          </Translate>
        </h2>
        <p className={styles.sectionSubtitle}>
          <Translate id="solutions.fleetIntelligence.howItWorks.fromApiAccessTo">
            From API access to production deployment, DIMO makes it easy to
            build intelligent fleet management applications.
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
          <Translate id="solutions.fleetIntelligence.cta.readyToBuildFleet">
            Ready to Build Fleet Intelligence?
          </Translate>
        </h2>
        <p className={styles.ctaText}>
          <Translate id="solutions.fleetIntelligence.cta.joinFleetOperatorsBuilding">
            Join fleet operators building the next generation of intelligent
            transportation solutions with DIMO's platform.
          </Translate>
        </p>
        <div className={styles.heroButtons}>
          <Link className={styles.primaryBtn} to={LINKS.external.console}>
            <Translate id="solutions.fleetIntelligence.cta.getApiKeys">
              Get API Keys
            </Translate>{' '}
            <span className={styles.arrow}>→</span>
          </Link>
          <EnglishLink className={styles.secondaryBtn} to="/docs">
            <Translate id="solutions.fleetIntelligence.cta.viewDocumentation">
              View Documentation
            </Translate>{' '}
            <span className={styles.arrow}>→</span>
          </EnglishLink>
        </div>
      </div>
    </section>
  );
}

export default function FleetIntelligencePage(): ReactNode {
  const { locale, path } = usePageLocale();
  return (
    <>
      <Head>
        <title>
          {translate({
            id: 'solutions.fleetIntelligence.meta.title',
            message:
              'Mixed-Fleet Management & Telematics, One Dashboard | DIMO',
          })}
        </title>
        <meta
          name="description"
          content={translate({
            id: 'solutions.fleetIntelligence.meta.description',
            message:
              'Normalized telematics and session control across the 50+ vehicle brands already connected, through one API. Share a verifiable trail with insurers and stop reconciling five systems.',
          })}
        />
        <meta
          name="keywords"
          content={translate({
            id: 'solutions.fleetIntelligence.meta.keywords',
            message:
              'fleet management, fleet tracking, telematics, fleet API, fleet SDK, predictive maintenance, fleet optimization, vehicle telemetry',
          })}
        />
        <meta
          property="og:title"
          content={translate({
            id: 'solutions.fleetIntelligence.meta.ogTitle',
            message:
              'Mixed-Fleet Management & Telematics, One Dashboard | DIMO',
          })}
        />
        <meta
          property="og:description"
          content={translate({
            id: 'solutions.fleetIntelligence.meta.ogDescription',
            message:
              'Comprehensive fleet management platform with SDKs, real-time telemetry, and AI-powered insights. Build custom fleet solutions or use our dashboard (coming soon).',
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
                '@type': 'SoftwareApplication',
                name: 'DIMO Fleet Intelligence Platform',
                description:
                  'Fleet management platform with SDKs, APIs, and AI-powered insights. Build custom fleet solutions with real-time vehicle telemetry.',
                applicationCategory: 'BusinessApplication',
                offers: {
                  '@type': 'Offer',
                  price: '0',
                  priceCurrency: 'USD',
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
                id: 'solutions.fleetIntelligence.body.home.name',
                message: 'Home',
              }),
              url: 'https://dimo.org/',
            },
            {
              name: translate({
                id: 'solutions.fleetIntelligence.body.solutions.name',
                message: 'Solutions',
              }),
              url: 'https://dimo.org/#solutions',
            },
            {
              name: translate({
                id: 'solutions.fleetIntelligence.body.fleetIntelligence.name',
                message: 'Fleet Intelligence',
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
          <FeatureSection3 />
          <HowItWorksSection />
          <CTASection />
        </main>

        <FooterTheme />
      </div>
    </>
  );
}
