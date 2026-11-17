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
import { Code, Zap, Lock, Globe, Layers, ChevronDown, Cpu } from 'lucide-react';
import Translate, { translate } from '@docusaurus/Translate';

const INDUSTRY_NAME = translate({
  id: 'industries.oem.meta.industryName',
  message: 'Auto OEMs',
});
const HERO_BACKGROUND = '/img/mp4/oem.mp4?v=2';
const imgSdk = '/img/sdks.webp';
const imgRentals = '/img/rentals.png';

const USE_CASES = [
  {
    icon: <Code size={28} />,
    type: translate({
      id: 'industries.oem.useCases.unifiedDataInfrastructure.type',
      message: 'Vehicle Data Platform',
    }),
    title: translate({
      id: 'industries.oem.useCases.unifiedDataInfrastructure.title',
      message: 'Unified Data Infrastructure',
    }),
    description: translate({
      id: 'industries.oem.useCases.unifiedDataInfrastructure.description',
      message:
        'Real-time telemetry ingest, processing, storage, and query interfaces. Stop worrying about data structure, API designs, infrastructure, or support.',
    }),
    example: translate({
      id: 'industries.oem.useCases.unifiedDataInfrastructure.example',
      message:
        'Allow 3rd-party developers to access your real-time diagnostics, location, battery status, and more with a streamlined, standardized interface.',
    }),
  },
  {
    icon: <Zap size={28} />,
    type: translate({
      id: 'industries.oem.useCases.easyToUseSdkTools.type',
      message: 'E2E Developer Platform',
    }),
    title: translate({
      id: 'industries.oem.useCases.easyToUseSdkTools.title',
      message: 'Easy-to-Use SDK & Tools',
    }),
    description: translate({
      id: 'industries.oem.useCases.easyToUseSdkTools.description',
      message:
        'Industry-leading, developer-friendly SDKs in modern languages. Production-ready code examples, developer console, and comprehensive documentation included.',
    }),
    example: translate({
      id: 'industries.oem.useCases.easyToUseSdkTools.example',
      message:
        'Empower 3rd-party developers with delightful tools and SDK - so they see value in your vehicle data in minutes, not months.',
    }),
  },
  {
    icon: <Lock size={28} />,
    type: translate({
      id: 'industries.oem.useCases.privacyFirstArchitecture.type',
      message: 'Security & Privacy',
    }),
    title: translate({
      id: 'industries.oem.useCases.privacyFirstArchitecture.title',
      message: 'Privacy-First Architecture',
    }),
    description: translate({
      id: 'industries.oem.useCases.privacyFirstArchitecture.description',
      message:
        'User consent and data ownership at the core, open-sourced. Out-of-the-box GDPR and EU Data Act compliant, with granular permission controls and verifiable credentials.',
    }),
    example: translate({
      id: 'industries.oem.useCases.privacyFirstArchitecture.example',
      message:
        'Low liability: Vehicle owners control what data is shared, when, and with whom, building trust between you and your customers. No vendor lock-in.',
    }),
  },
  {
    icon: <Globe size={28} />,
    type: translate({
      id: 'industries.oem.useCases.multiOemCompatibility.type',
      message: 'Universal Platform Coverage',
    }),
    title: translate({
      id: 'industries.oem.useCases.multiOemCompatibility.title',
      message: 'Multi-OEM Compatibility',
    }),
    description: translate({
      id: 'industries.oem.useCases.multiOemCompatibility.description',
      message:
        'Already works across 50+ vehicle brands, with a proven architecture and pattern so your brand is easy to support.',
    }),
    example: translate({
      id: 'industries.oem.useCases.multiOemCompatibility.example',
      message:
        'Build once, deploy everywhere -- any OEM can be integrated with the same great experience.',
    }),
  },
  {
    icon: <Layers size={28} />,
    type: translate({
      id: 'industries.oem.useCases.scalableMonetarySystems.type',
      message: 'Rewards, Payments & Monetization',
    }),
    title: translate({
      id: 'industries.oem.useCases.scalableMonetarySystems.title',
      message: 'Scalable Monetary Systems',
    }),
    description: translate({
      id: 'industries.oem.useCases.scalableMonetarySystems.description',
      message:
        'Stablecoin payment & rewards infrastructure built for the next generation of vehicle commerce applications. Enterprise-grade architecture designed for scale.',
    }),
    example: translate({
      id: 'industries.oem.useCases.scalableMonetarySystems.example',
      message:
        'Payment rails are built-in, so you can focus on building great experiences that drive revenue, loyalty, and engagement.',
    }),
  },
  {
    icon: <Cpu size={28} />,
    type: translate({
      id: 'industries.oem.useCases.aiReady.type',
      message: 'AI & ML',
    }),
    title: translate({
      id: 'industries.oem.useCases.aiReady.title',
      message: 'AI-Ready',
    }),
    description: translate({
      id: 'industries.oem.useCases.aiReady.description',
      message:
        "Clean, normalized, and contextualized vehicle data ready for AI/ML applications. Build agentic experiences using DIMO's Agent skills and MCP-accessible data streams.",
    }),
    example: translate({
      id: 'industries.oem.useCases.aiReady.example',
      message:
        'AI/ML developers can now access clean data without you juggling. Monetize your data for the AI revolution.',
    }),
  },
];

const STATS = [
  {
    number: '100%',
    label: translate({
      id: 'industries.oem.stats.covesaStandards.label',
      message: 'COVESA Standards',
    }),
  },
  {
    number: '>95%',
    label: translate({
      id: 'industries.oem.stats.developerSatisfaction.label',
      message: 'Developer Satisfaction',
    }),
  },
  {
    number: '99.9%',
    label: translate({
      id: 'industries.oem.stats.apiUptime.label',
      message: 'API Uptime',
    }),
  },
  {
    number: '<100ms',
    label: translate({
      id: 'industries.oem.stats.averageLatency.label',
      message: 'Average Latency',
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
          <Cpu size={16} /> {INDUSTRY_NAME}
        </span>

        <h1 className={styles.heroTitle}>
          <Translate
            id="industries.oem.hero.buildTheFutureOf"
            values={{
              span: (
                <span className={styles.heroTitleGradient}>
                  <Translate id="industries.oem.hero.oneUnifiedPlatform">
                    One Unified Platform
                  </Translate>
                </span>
              ),
            }}
          >
            {'Build the Future of Mobility with {span}'}
          </Translate>
        </h1>

        <p className={styles.heroSubtitle}>
          <Translate id="industries.oem.hero.turnkeyDataInfrastructureHosted">
            Turnkey data infrastructure hosted on your terms. Let partners ship
            faster with developer-friendly SDKs, documentation, AI integration,
            and tools. Stop wondering if you have the technology.
          </Translate>
        </p>

        <div className={styles.heroButtons}>
          <Link className={styles.primaryBtn} to={LINKS.external.console}>
            <Translate id="industries.oem.hero.getApiKeys">
              Get API Keys
            </Translate>{' '}
            <span className={styles.arrow}>→</span>
          </Link>
          <EnglishLink className={styles.secondaryBtn} to="/docs">
            <Translate id="industries.oem.hero.viewDocumentation">
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
          <Translate id="industries.oem.useCases.platformFeatures">
            Platform Features
          </Translate>
        </span>
        <h2 className={styles.sectionTitle}>
          <Translate id="industries.oem.useCases.everythingYouNeedFor">
            Everything You Need For Vehicle Commerce
          </Translate>
        </h2>
        <p className={styles.sectionSubtitle}>
          <Translate id="industries.oem.useCases.fromUnifiedApiAccess">
            From unified API access to AI-ready data streams, DIMO provides the
            complete developer platform for building the next generation of
            mobility applications for vehicle commerce. Super charge your
            vehicle data strategy with DIMO.
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
            <Translate id="industries.oem.featureSection1.developerFirstPrivacyFirst">
              Developer-First, Privacy-First
            </Translate>
          </h2>
          <p>
            <Translate id="industries.oem.featureSection1.dimoIsBuiltFrom">
              DIMO is built from the ground up with developers and users in
              mind. Our privacy-first architecture ensures user consent and data
              ownership, while our developer-friendly tools make integration
              seamless and straightforward - so you can focus on building
              relationships that drives revenue, loyalty, and engagement.
            </Translate>
          </p>
          <ul className={styles.featureList}>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="industries.oem.featureSection1.openApisSdksAnd">
                Open APIs, SDKs, and comprehensive developer tools
              </Translate>
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="industries.oem.featureSection1.interactiveDeveloperDocsWith">
                Interactive developer docs with code examples and boilerplates
              </Translate>
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="industries.oem.featureSection1.consentManagementInA">
                Consent management in a box, users control their data sharing
                experience
              </Translate>
            </li>
          </ul>
        </div>
        <div className={styles.featureVisual}>
          <img
            src={imgSdk}
            alt={translate({
              id: 'industries.oem.featureSection1.dimoSdkCodeExample',
              message: 'DIMO SDK Code Example',
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
            <Translate id="industries.oem.featureSection2.verticallyIntegratedExperience">
              Vertically Integrated Experience
            </Translate>
          </h2>
          <p>
            <Translate id="industries.oem.featureSection2.youUnderstandAutoBut">
              You understand auto, but we understand developers. DIMO handles
              the complexity so you can focus on building great cars. Our
              vertically integrated data stack allows you to offer a seamless
              experience to app developers, so they can offer innovative
              services to your customers.
            </Translate>
          </p>
          <ul className={styles.featureList}>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="industries.oem.featureSection2.standardizedDataModelsAcross">
                Standardized data models across all OEMs, stop worrying about
                designing vehicle data strategies
              </Translate>
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="industries.oem.featureSection2.cleanDataForAiMl">
                Clean data for AI/ML applications with contextualized streams,
                build AI experiences not AI infra
              </Translate>
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="industries.oem.featureSection2.autoStablecoinPaymentsFor">
                Auto stablecoin payments for EV charging, parking, tolls, and
                more. Next generation vehicle commerce made easy
              </Translate>
            </li>
          </ul>
        </div>
        <div className={styles.featureVisual}>
          <img
            src={imgRentals}
            alt={translate({
              id: 'industries.oem.featureSection2.carRentalFleetManagement',
              message: 'Car Rental Fleet Management',
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
        id: 'industries.oem.howItWorks.signUpGet.title',
        message: 'Sign Up & Get API Keys',
      }),
      description: translate({
        id: 'industries.oem.howItWorks.signUpGet.description',
        message:
          'Create your DIMO developer account and get instant access to your API credentials. No waiting, no approval process.',
      }),
    },
    {
      title: translate({
        id: 'industries.oem.howItWorks.bringYourOwn.title',
        message: 'Bring Your Own Data',
      }),
      description: translate({
        id: 'industries.oem.howItWorks.bringYourOwn.description',
        message:
          'Implement DIMO Ingest by setting up a Kafka stream or equivalent. No more data re-designs, complex ETL, or data warehouse infrastructure.',
      }),
    },
    {
      title: translate({
        id: 'industries.oem.howItWorks.buildScale.title',
        message: 'Build & Scale',
      }),
      description: translate({
        id: 'industries.oem.howItWorks.buildScale.description',
        message:
          'Once the data flow is established, the Developer Platform, API, and SDK are ready-to-use. Scale to millions of developers with confidence on DIMO.',
      }),
    },
  ];

  return (
    <section className={styles.howItWorksSection}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionEyebrow}>
          <Translate id="industries.oem.howItWorks.howItWorks">
            How It Works
          </Translate>
        </span>
        <h2 className={styles.sectionTitle}>
          <Translate id="industries.oem.howItWorks.getStartedInMinutes">
            Get Started in Minutes
          </Translate>
        </h2>
        <p className={styles.sectionSubtitle}>
          <Translate id="industries.oem.howItWorks.simplyBringYourOwn">
            Simply bring your own data into DIMO's plug-and-play infrastructure,
            we make it easy to build and scale.
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
          <Translate id="industries.oem.cta.readyToStartMonetizing">
            Ready to Start Monetizing?
          </Translate>
        </h2>
        <p className={styles.ctaText}>
          <Translate id="industries.oem.cta.accessDevelopersBuildingThe">
            Access developers building the future of mobility for your vehicles
            today. Get your API keys today and start strategizing for tomorrow.
          </Translate>
        </p>
        <div className={styles.heroButtons}>
          <Link className={styles.primaryBtn} to={LINKS.external.console}>
            <Translate id="industries.oem.cta.getApiKeys">
              Get API Keys
            </Translate>{' '}
            <span className={styles.arrow}>→</span>
          </Link>
          <EnglishLink className={styles.secondaryBtn} to="/docs">
            <Translate id="industries.oem.cta.readTheDocs">
              Read the Docs
            </Translate>{' '}
            <span className={styles.arrow}>→</span>
          </EnglishLink>
        </div>
      </div>
    </section>
  );
}

export default function OEMPage(): ReactNode {
  const { locale, path } = usePageLocale();
  return (
    <>
      <Head>
        <title>
          {translate({
            id: 'industries.oem.meta.title',
            message:
              'DIMO for Auto OEMs | Unified Vehicle Data Platform for Developers',
          })}
        </title>
        <meta
          name="description"
          content={translate({
            id: 'industries.oem.meta.description',
            message:
              "Build vehicle applications faster with DIMO's unified API. Access data from 50+ vehicle brands through one developer-friendly platform. Privacy-first, enterprise-grade, production-ready.",
          })}
        />
        <meta
          name="keywords"
          content={translate({
            id: 'industries.oem.meta.keywords',
            message:
              'vehicle API, vehicle data integration, automotive developers, vehicle data platform, Tesla API, Ford API, BMW API, connected car platform, telematics API',
          })}
        />
        <meta
          property="og:title"
          content={translate({
            id: 'industries.oem.meta.ogTitle',
            message: 'DIMO for Auto OEMs | Unified Vehicle Data Platform',
          })}
        />
        <meta
          property="og:description"
          content={translate({
            id: 'industries.oem.meta.ogDescription',
            message:
              'One API to access vehicle data from 50+ brands. Developer-friendly SDKs, privacy-first architecture, and enterprise-grade infrastructure.',
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
                name: 'DIMO Developer Platform',
                description: translate({
                  id: 'industries.oem.schema.description',
                  message:
                    'Unified API platform for accessing vehicle data from 50+ brands. Developer-friendly SDKs, privacy-first architecture, and enterprise infrastructure.',
                }),
                applicationCategory: 'DeveloperApplication',
                operatingSystem: 'Web, iOS, Android',
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
                id: 'industries.oem.body.home.name',
                message: 'Home',
              }),
              url: 'https://dimo.org/',
            },
            {
              name: translate({
                id: 'industries.oem.body.industries.name',
                message: 'Industries',
              }),
              url: 'https://dimo.org/#industries',
            },
            {
              name: translate({
                id: 'industries.oem.body.oem.name',
                message: 'OEM',
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
