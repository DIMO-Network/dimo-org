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
  Headphones,
  Shield,
  ClipboardCheck,
  MapPin,
  Fuel,
  AlertTriangle,
  ChevronDown,
} from 'lucide-react';
import Translate, { translate } from '@docusaurus/Translate';

const INDUSTRY_NAME = translate({
  id: 'industries.rentals.meta.industryName',
  message: 'Rentals',
});
const HERO_BACKGROUND = '/img/mp4/rentals.mp4?v=2';
const imgFleet = '/img/tesla-fleet.png';
const imgCustomers = '/img/customers.png';

const USE_CASES = [
  {
    icon: <Headphones size={28} />,
    type: translate({
      id: 'industries.rentals.useCases.aiConciergeFor.type',
      message: 'Hybrid',
    }),
    title: translate({
      id: 'industries.rentals.useCases.aiConciergeFor.title',
      message: 'AI Concierge for Every Rental',
    }),
    description: translate({
      id: 'industries.rentals.useCases.aiConciergeFor.description',
      message:
        'Spin up a personalized AI concierge for each rental customer. Friendly agents help customers find gas stations, charging stations, local recommendations, and answer questions about their rental vehicle.',
    }),
    example: translate({
      id: 'industries.rentals.useCases.aiConciergeFor.example',
      message:
        '"Where\'s the nearest EV charging station?" or "How do I connect my phone to Bluetooth?"',
    }),
  },
  {
    icon: <Fuel size={28} />,
    type: translate({
      id: 'industries.rentals.useCases.smartUpsellOpportunities.type',
      message: 'Hybrid',
    }),
    title: translate({
      id: 'industries.rentals.useCases.smartUpsellOpportunities.title',
      message: 'Smart Upsell Opportunities',
    }),
    description: translate({
      id: 'industries.rentals.useCases.smartUpsellOpportunities.description',
      message:
        'Intelligent agents detect when gas is low or the customer is near partner locations, automatically surfacing relevant offers and discounts.',
    }),
    example: translate({
      id: 'industries.rentals.useCases.smartUpsellOpportunities.example',
      message:
        '"Your fuel is low! We partner with Shell — use code RENT20 for 20¢ off per gallon at the station ahead."',
    }),
  },
  {
    icon: <AlertTriangle size={28} />,
    type: translate({
      id: 'industries.rentals.useCases.realTimeIssueMonitoring.type',
      message: 'Fleets',
    }),
    title: translate({
      id: 'industries.rentals.useCases.realTimeIssueMonitoring.title',
      message: 'Real-time Issue Monitoring',
    }),
    description: translate({
      id: 'industries.rentals.useCases.realTimeIssueMonitoring.description',
      message:
        'Monitor your entire fleet for aggressive driving, speeding, geofence violations, and detected crashes. Get instant alerts when issues arise.',
    }),
    example: translate({
      id: 'industries.rentals.useCases.realTimeIssueMonitoring.example',
      message:
        '"Show me all aggressive driving events for vehicle XYZ-1234 this week."',
    }),
  },
  {
    icon: <Shield size={28} />,
    type: translate({
      id: 'industries.rentals.useCases.geofenceSafetyAlerts.type',
      message: 'Fleets',
    }),
    title: translate({
      id: 'industries.rentals.useCases.geofenceSafetyAlerts.title',
      message: 'Geofence & Safety Alerts',
    }),
    description: translate({
      id: 'industries.rentals.useCases.geofenceSafetyAlerts.description',
      message:
        'Set up custom geofences and get notified instantly when vehicles leave approved areas. Track crash detection and safety incidents in real-time.',
    }),
    example: translate({
      id: 'industries.rentals.useCases.geofenceSafetyAlerts.example',
      message:
        'Automatic alert: "Vehicle #A2847 has exited the approved rental zone at 3:42 PM."',
    }),
  },
  {
    icon: <ClipboardCheck size={28} />,
    type: translate({
      id: 'industries.rentals.useCases.automatedReturnInspections.type',
      message: 'Fleets',
    }),
    title: translate({
      id: 'industries.rentals.useCases.automatedReturnInspections.title',
      message: 'Automated Return Inspections',
    }),
    description: translate({
      id: 'industries.rentals.useCases.automatedReturnInspections.description',
      message:
        'Streamline vehicle returns with AI-powered inspection workflows. Document vehicle condition, flag issues, and generate reports automatically.',
    }),
    example: translate({
      id: 'industries.rentals.useCases.automatedReturnInspections.example',
      message:
        'Agent guides staff through inspection checklist and auto-documents any damage or concerns.',
    }),
  },
  {
    icon: <MapPin size={28} />,
    type: translate({
      id: 'industries.rentals.useCases.rentalDueReminders.type',
      message: 'Hybrid',
    }),
    title: translate({
      id: 'industries.rentals.useCases.rentalDueReminders.title',
      message: 'Rental Due Reminders',
    }),
    description: translate({
      id: 'industries.rentals.useCases.rentalDueReminders.description',
      message:
        'Proactive agents remind customers when their rental is due back, suggest extensions, and help coordinate smooth returns.',
    }),
    example: translate({
      id: 'industries.rentals.useCases.rentalDueReminders.example',
      message:
        '"Your rental is due back in 2 hours. Need to extend? Reply YES to add another day at $45."',
    }),
  },
];

const STATS = [
  {
    number: '$1.25',
    label: translate({
      id: 'industries.rentals.stats.perVehiclePer.label',
      message: 'Per Vehicle per Month',
    }),
  },
  {
    number: '50+',
    label: translate({
      id: 'industries.rentals.stats.vehicleBrands.label',
      message: 'Vehicle Brands',
    }),
  },
  {
    number: '24/7',
    label: translate({
      id: 'industries.rentals.stats.customerSupport.label',
      message: 'Customer Support',
    }),
  },
  {
    number: '200k+',
    label: translate({
      id: 'industries.rentals.stats.connectedVehicles.label',
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
          <MapPin size={16} /> {INDUSTRY_NAME}
        </span>

        <h1 className={styles.heroTitle}>
          <Translate
            id="industries.rentals.hero.runUnmannedMixedFleetRental"
            values={{
              span: (
                <span className={styles.heroTitleGradient}>
                  <Translate id="industries.rentals.hero.keysDataAndSpend">
                    keys, data, and spend in one place
                  </Translate>
                </span>
              ),
            }}
          >
            {'Run unmanned, mixed-fleet rental — {span}'}
          </Translate>
        </h1>

        <p className={styles.heroSubtitle}>
          <Translate
            id="industries.rentals.hero.stopTogglingFiveTools"
            values={{
              link: (
                <Link to="/vehicle-session-infrastructure">
                  <Translate id="industries.rentals.hero.vehicleSession">
                    vehicle session
                  </Translate>
                </Link>
              ),
              link2: <Link to="/compliance">consent-compliant</Link>,
            }}
          >
            {
              'Stop toggling five tools to answer “who has this vehicle right now and what have they spent.” One {link} governs identity, digital keys, data, and spend across your mixed fleet, and stays {link2} by design.'
            }
          </Translate>
        </p>

        <div className={styles.heroButtons}>
          <Link className={styles.primaryBtn} to={LINKS.external.console}>
            <Translate id="industries.rentals.hero.getStarted">
              Get Started
            </Translate>{' '}
            <span className={styles.arrow}>→</span>
          </Link>
          <EnglishLink className={styles.secondaryBtn} to="/docs">
            <Translate id="industries.rentals.hero.viewDocumentation">
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
          <Translate id="industries.rentals.useCases.useCases">
            Use Cases
          </Translate>
        </span>
        <h2 className={styles.sectionTitle}>
          <Translate id="industries.rentals.useCases.smartSolutionsForModern">
            Smart Solutions for Modern Rentals
          </Translate>
        </h2>
        <p className={styles.sectionSubtitle}>
          <Translate id="industries.rentals.useCases.dimosIntelligentAgentsWork">
            DIMO's intelligent agents work around the clock to enhance customer
            experiences, protect your fleet, and streamline operations from
            pickup to return.
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
            <Translate id="industries.rentals.featureSection1.aPersonalConciergeFor">
              A Personal Concierge for Every Customer
            </Translate>
          </h2>
          <p>
            <Translate id="industries.rentals.featureSection1.theMomentACustomer">
              The moment a customer picks up their rental, DIMO spins up a
              dedicated AI concierge just for them. This intelligent agent knows
              the vehicle, understands the local area, and is ready to help with
              anything—from finding the nearest gas station to troubleshooting
              the infotainment system.
            </Translate>
          </p>
          <ul className={styles.featureList}>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="industries.rentals.featureSection1.instantAnswersToVehicleSpecific">
                Instant answers to vehicle-specific questions
              </Translate>
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="industries.rentals.featureSection1.localRecommendationsAndNavigation">
                Local recommendations and navigation help
              </Translate>
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="industries.rentals.featureSection1.partnerOffersAndUpsell">
                Partner offers and upsell opportunities
              </Translate>
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="industries.rentals.featureSection1.seamlessExtensionAndReturn">
                Seamless extension and return coordination
              </Translate>
            </li>
          </ul>
        </div>
        <div className={styles.featureVisual}>
          <img
            src={imgCustomers}
            alt={translate({
              id: 'industries.rentals.featureSection1.aiConciergeChat',
              message: 'AI Concierge Chat',
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
            <Translate id="industries.rentals.featureSection2.protectYourFleetIn">
              Protect Your Fleet in Real-Time
            </Translate>
          </h2>
          <p>
            <Translate id="industries.rentals.featureSection2.knowExactlyWhatsHappening">
              Know exactly what's happening with every vehicle in your fleet,
              every second of the day. DIMO monitors for aggressive driving,
              speeding, geofence violations, and potential incidents—alerting
              you instantly when something needs attention.
            </Translate>
          </p>
          <ul className={styles.featureList}>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="industries.rentals.featureSection2.realTimeSpeedAndDriving">
                Real-time speed and driving behavior monitoring
              </Translate>
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="industries.rentals.featureSection2.customGeofenceZonesWith">
                Custom geofence zones with instant alerts
              </Translate>
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="industries.rentals.featureSection2.crashDetectionAndAutomatic">
                Crash detection and automatic incident reporting
              </Translate>
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="industries.rentals.featureSection2.historicalDataForDispute">
                Historical data for dispute resolution
              </Translate>
            </li>
          </ul>
        </div>
        <div className={styles.featureVisual}>
          <img
            src={imgFleet}
            alt={translate({
              id: 'industries.rentals.featureSection2.fleetMonitoringDashboard',
              message: 'Fleet Monitoring Dashboard',
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
        id: 'industries.rentals.howItWorks.connectYourFleet.title',
        message: 'Connect Your Fleet',
      }),
      description: translate({
        id: 'industries.rentals.howItWorks.connectYourFleet.description',
        message:
          'Integrate DIMO with your fleet management system and onboard vehicles using our hardware or native OEM connections.',
      }),
    },
    {
      title: translate({
        id: 'industries.rentals.howItWorks.configureIntelligentAgents.title',
        message: 'Configure Intelligent Agents',
      }),
      description: translate({
        id: 'industries.rentals.howItWorks.configureIntelligentAgents.description',
        message:
          'Set up AI concierges, monitoring rules, geofences, and automated workflows tailored to your operations.',
      }),
    },
    {
      title: translate({
        id: 'industries.rentals.howItWorks.delightEveryCustomer.title',
        message: 'Delight Every Customer',
      }),
      description: translate({
        id: 'industries.rentals.howItWorks.delightEveryCustomer.description',
        message:
          'Each rental automatically gets a personalized AI concierge that helps throughout their journey.',
      }),
    },
    {
      title: translate({
        id: 'industries.rentals.howItWorks.monitorAndOptimize.title',
        message: 'Monitor and Optimize',
      }),
      description: translate({
        id: 'industries.rentals.howItWorks.monitorAndOptimize.description',
        message:
          'Track fleet health, customer satisfaction, and operational metrics in real-time through your dashboard.',
      }),
    },
  ];

  return (
    <section className={styles.howItWorksSection}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionEyebrow}>
          <Translate id="industries.rentals.howItWorks.howItWorks">
            How It Works
          </Translate>
        </span>
        <h2 className={styles.sectionTitle}>
          <Translate id="industries.rentals.howItWorks.seamlessIntegrationInstantValue">
            Seamless Integration, Instant Value
          </Translate>
        </h2>
        <p className={styles.sectionSubtitle}>
          <Translate id="industries.rentals.howItWorks.dimoWorksWithYour">
            DIMO works with your existing fleet management infrastructure and
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
          <Translate id="industries.rentals.cta.readyToModernizeYour">
            Ready to Modernize Your Rental Operations?
          </Translate>
        </h2>
        <p className={styles.ctaText}>
          <Translate id="industries.rentals.cta.joinInnovativeRentalCompanies">
            Join innovative rental companies using DIMO to deliver exceptional
            experiences and protect their fleets.
          </Translate>
        </p>
        <div className={styles.heroButtons}>
          <Link className={styles.primaryBtn} to={LINKS.external.console}>
            <Translate id="industries.rentals.cta.startBuildingToday">
              Start Building Today
            </Translate>{' '}
            <span className={styles.arrow}>→</span>
          </Link>
          <Link className={styles.secondaryBtn} to="mailto:contact@dimo.org">
            <Translate id="industries.rentals.cta.contactSales">
              Contact Sales
            </Translate>{' '}
            <span className={styles.arrow}>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function RentalsPage(): ReactNode {
  const { locale, path } = usePageLocale();
  return (
    <>
      <Head>
        <title>
          {translate({
            id: 'industries.rentals.meta.title',
            message: 'Unmanned, Mixed-Fleet Rental Operations Software | DIMO',
          })}
        </title>
        <meta
          name="description"
          content={translate({
            id: 'industries.rentals.meta.description',
            message:
              'Operate rentals across Tesla, Ford, GM and 50+ brands from one dashboard. Issue digital keys, scope data, cap spend, and revoke at return — without on-site staff.',
          })}
        />
        <meta
          name="keywords"
          content={translate({
            id: 'industries.rentals.meta.keywords',
            message:
              'car rental software, fleet management, AI concierge, rental fleet monitoring, geofencing, vehicle tracking, rental technology',
          })}
        />
        <meta
          property="og:title"
          content={translate({
            id: 'industries.rentals.meta.ogTitle',
            message: 'Unmanned, Mixed-Fleet Rental Operations Software | DIMO',
          })}
        />
        <meta
          property="og:description"
          content={translate({
            id: 'industries.rentals.meta.ogDescription',
            message:
              'Deploy AI concierges for every rental, monitor your fleet in real-time, and streamline operations with intelligent automation.',
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
                id: 'industries.rentals.body.home.name',
                message: 'Home',
              }),
              url: 'https://dimo.org/',
            },
            {
              name: translate({
                id: 'industries.rentals.body.industries.name',
                message: 'Industries',
              }),
              url: 'https://dimo.org/#industries',
            },
            {
              name: translate({
                id: 'industries.rentals.body.rentals.name',
                message: 'Rentals',
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
