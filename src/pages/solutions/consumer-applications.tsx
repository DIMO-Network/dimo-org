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
  Smartphone,
  Palette,
  Globe,
  Zap,
  Download,
  ChevronDown,
  Users,
} from 'lucide-react';
import Translate, { translate } from '@docusaurus/Translate';

const SOLUTION_NAME = translate({
  id: 'solutions.consumerApplications.meta.solutionName',
  message: 'Consumer Applications',
});
const HERO_BACKGROUND = '/img/mp4/consumer.mp4?v=2';
const imgMobile = '/img/dimo-mobile.png';
const imgJapan = '/img/dimo-japan.png';

const USE_CASES = [
  {
    icon: <Smartphone size={28} />,
    type: translate({
      id: 'solutions.consumerApplications.useCases.mobilePlatform.type',
      message: 'Mobile Platform',
    }),
    title: 'DIMO Mobile App',
    description: translate({
      id: 'solutions.consumerApplications.useCases.mobilePlatform.description',
      message:
        'Production-ready mobile application for iOS and Android. Users can connect their vehicles, view real-time data, and manage permissions—all out of the box.',
    }),
    example: translate({
      id: 'solutions.consumerApplications.useCases.mobilePlatform.example',
      message:
        'Launch your vehicle platform in weeks, not months. Complete mobile experience included.',
    }),
  },
  {
    icon: <Palette size={28} />,
    type: translate({
      id: 'solutions.consumerApplications.useCases.whiteLabelExperience.type',
      message: 'Customization',
    }),
    title: translate({
      id: 'solutions.consumerApplications.useCases.whiteLabelExperience.title',
      message: 'White-Label Experience',
    }),
    description: translate({
      id: 'solutions.consumerApplications.useCases.whiteLabelExperience.description',
      message:
        'Fully customizable UI with your branding, colors, and logo. Make DIMO Mobile App look and feel like your own product with no code changes required.',
    }),
    example: translate({
      id: 'solutions.consumerApplications.useCases.whiteLabelExperience.example',
      message:
        'Replace logos, adjust color schemes, and customize messaging—all through configuration.',
    }),
  },
  {
    icon: <Globe size={28} />,
    type: translate({
      id: 'solutions.consumerApplications.useCases.multiLanguageSupport.type',
      message: 'Localization',
    }),
    title: translate({
      id: 'solutions.consumerApplications.useCases.multiLanguageSupport.title',
      message: 'Multi-Language Support',
    }),
    description: translate({
      id: 'solutions.consumerApplications.useCases.multiLanguageSupport.description',
      message:
        'Built-in support for 20+ languages with easy localization framework. Expand to new markets without rebuilding your app from scratch.',
    }),
    example: translate({
      id: 'solutions.consumerApplications.useCases.multiLanguageSupport.example',
      message:
        'English, Spanish, Portuguese, French, German, Japanese, and more—ready to deploy globally.',
    }),
  },
  {
    icon: <Zap size={28} />,
    type: translate({
      id: 'solutions.consumerApplications.useCases.realTimeVehicleData.type',
      message: 'Features',
    }),
    title: translate({
      id: 'solutions.consumerApplications.useCases.realTimeVehicleData.title',
      message: 'Real-Time Vehicle Data',
    }),
    description: translate({
      id: 'solutions.consumerApplications.useCases.realTimeVehicleData.description',
      message:
        'Access live vehicle telemetry, diagnostics, location, and more through an intuitive interface. All data streams pre-integrated and tested.',
    }),
    example: translate({
      id: 'solutions.consumerApplications.useCases.realTimeVehicleData.example',
      message:
        'Battery level, tire pressure, location tracking, trip history—everything your users need.',
    }),
  },
  {
    icon: <Users size={28} />,
    type: translate({
      id: 'solutions.consumerApplications.useCases.accountPermissions.type',
      message: 'User Management',
    }),
    title: translate({
      id: 'solutions.consumerApplications.useCases.accountPermissions.title',
      message: 'Account & Permissions',
    }),
    description: translate({
      id: 'solutions.consumerApplications.useCases.accountPermissions.description',
      message:
        'Complete user authentication, profile management, and granular permission controls. Users manage data sharing preferences with full transparency.',
    }),
    example: translate({
      id: 'solutions.consumerApplications.useCases.accountPermissions.example',
      message:
        'OAuth 2.0 authentication, profile settings, connected apps dashboard, and consent management.',
    }),
  },
  {
    icon: <Download size={28} />,
    type: translate({
      id: 'solutions.consumerApplications.useCases.appStoreReady.type',
      message: 'Distribution',
    }),
    title: translate({
      id: 'solutions.consumerApplications.useCases.appStoreReady.title',
      message: 'App Store Ready',
    }),
    description: translate({
      id: 'solutions.consumerApplications.useCases.appStoreReady.description',
      message:
        'Pre-configured for iOS App Store and Google Play Store submission. Includes all necessary compliance, privacy policies, and app store assets.',
    }),
    example: translate({
      id: 'solutions.consumerApplications.useCases.appStoreReady.example',
      message:
        'Submit your branded app to stores in days with included assets and compliance documentation.',
    }),
  },
];

const STATS = [
  {
    number: '100%',
    label: translate({
      id: 'solutions.consumerApplications.stats.customizableUi.label',
      message: 'Customizable UI',
    }),
  },
  {
    number: '<1 Week',
    label: translate({
      id: 'solutions.consumerApplications.stats.timeToLaunch.label',
      message: 'Time to Launch',
    }),
  },
  {
    number: '<3m',
    label: translate({
      id: 'solutions.consumerApplications.stats.toOnboardNew.label',
      message: 'To Onboard New Users',
    }),
  },
  {
    number: '<5m',
    label: translate({
      id: 'solutions.consumerApplications.stats.toOnboardNew.label2',
      message: 'To Onboard New Marketplace Partners',
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
          <Smartphone size={16} /> {SOLUTION_NAME}
        </span>

        <h1 className={styles.heroTitle}>
          <Translate
            id="solutions.consumerApplications.hero.launchYourVehicleApp"
            values={{
              span: (
                <span className={styles.heroTitleGradient}>
                  <Translate id="solutions.consumerApplications.hero.zeroDevelopmentTime">
                    Zero Development Time
                  </Translate>
                </span>
              ),
            }}
          >
            {'Launch Your Vehicle App with {span}'}
          </Translate>
        </h1>

        <p className={styles.heroSubtitle}>
          <Translate id="solutions.consumerApplications.hero.deployAFullyBrandedProductionReady">
            Deploy a fully-branded, production-ready mobile app for iOS and
            Android. White-label customization, multi-language support, and
            global reach—all included out of the box.
          </Translate>
        </p>

        <div className={styles.heroButtons}>
          <Link className={styles.primaryBtn} to={LINKS.external.console}>
            <Translate id="solutions.consumerApplications.hero.getStarted">
              Get Started
            </Translate>{' '}
            <span className={styles.arrow}>→</span>
          </Link>
          <EnglishLink className={styles.secondaryBtn} to="/docs">
            <Translate id="solutions.consumerApplications.hero.viewDocumentation">
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
          <Translate id="solutions.consumerApplications.useCases.platformFeatures">
            Platform Features
          </Translate>
        </span>
        <h2 className={styles.sectionTitle}>
          <Translate id="solutions.consumerApplications.useCases.everythingYouNeedFor">
            Everything You Need for Consumer Apps
          </Translate>
        </h2>
        <p className={styles.sectionSubtitle}>
          <Translate id="solutions.consumerApplications.useCases.fromMobileAppsTo">
            From mobile apps to white-label customization and global
            localization, DIMO provides the complete platform for launching
            consumer vehicle applications.
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
            <Translate id="solutions.consumerApplications.featureSection1.dimoMobileAppProductionReady">
              DIMO Mobile App: Production-Ready Platform
            </Translate>
          </h2>
          <p>
            <Translate id="solutions.consumerApplications.featureSection1.launchWithAComplete">
              Launch with a complete mobile application for iOS and Android.
              Every feature your users need: vehicle connectivity, real-time
              data, trip tracking, diagnostics, and more -- tested and ready for
              production.
            </Translate>
          </p>
          <ul className={styles.featureList}>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="solutions.consumerApplications.featureSection1.nativeIosAndAndroid">
                Native iOS and Android apps built with modern mobile frameworks
              </Translate>
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="solutions.consumerApplications.featureSection1.realTimeVehicleDataLocation">
                Real-time vehicle data: location, battery, diagnostics
              </Translate>
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="solutions.consumerApplications.featureSection1.tripTrackingWithDetailed">
                Trip tracking with detailed analytics and history
              </Translate>
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="solutions.consumerApplications.featureSection1.userProfilesAuthenticationAnd">
                User profiles, authentication, and permission management all
                built-in
              </Translate>
            </li>
          </ul>
        </div>
        <div className={styles.featureVisual}>
          <a href="https://dimo.co" target="_blank" rel="noopener noreferrer">
            <img
              src={imgMobile}
              alt={translate({
                id: 'solutions.consumerApplications.featureSection1.dimoMobileAppOn',
                message: 'DIMO Mobile App on Phone',
              })}
            />
          </a>
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
            <Translate id="solutions.consumerApplications.featureSection2.whiteLabelMakeItYours">
              White-Label: Make It Yours
            </Translate>
          </h2>
          <p>
            <Translate id="solutions.consumerApplications.featureSection2.customizeEveryAspectOf">
              Customize every aspect of the DIMO Mobile App with your brand
              identity. Replace logos, adjust colors, modify copy: all through
              simple configuration without touching a line of code. Expand to
              international markets with built-in localization support.
            </Translate>
          </p>
          <ul className={styles.featureList}>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="solutions.consumerApplications.featureSection2.brandCustomizationLogosColors">
                Brand customization: logos, colors, fonts, and themes
              </Translate>
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="solutions.consumerApplications.featureSection2.customMessagingAndCopy">
                Custom messaging and copy throughout the app
              </Translate>
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="solutions.consumerApplications.featureSection2.yourAppNameAnd">
                Your app name and identity in app stores
              </Translate>
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="solutions.consumerApplications.featureSection2.configurationBasedNoCodeChanges">
                Configuration-based: no code changes required
              </Translate>
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="solutions.consumerApplications.featureSection2.regionalCustomizationForDates">
                Regional customization for dates, currencies, and units
              </Translate>
            </li>
          </ul>
        </div>
        <div className={styles.featureVisual}>
          <a
            href="https://dimojapan.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={imgJapan}
              alt={translate({
                id: 'solutions.consumerApplications.featureSection2.dimoInJapan',
                message: 'DIMO in Japan',
              })}
            />
          </a>
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      title: translate({
        id: 'solutions.consumerApplications.howItWorks.configureYourBrand.title',
        message: 'Configure Your Brand',
      }),
      description: translate({
        id: 'solutions.consumerApplications.howItWorks.configureYourBrand.description',
        message:
          'Upload your logos, choose your color scheme, and customize app messaging through our configuration dashboard—no coding required.',
      }),
    },
    {
      title: translate({
        id: 'solutions.consumerApplications.howItWorks.selectLanguagesRegions.title',
        message: 'Select Languages & Regions',
      }),
      description: translate({
        id: 'solutions.consumerApplications.howItWorks.selectLanguagesRegions.description',
        message:
          'Choose which languages to enable and configure regional settings. Add custom translations if needed through our localization framework.',
      }),
    },
    {
      title: translate({
        id: 'solutions.consumerApplications.howItWorks.testYourApp.title',
        message: 'Test Your App',
      }),
      description: translate({
        id: 'solutions.consumerApplications.howItWorks.testYourApp.description',
        message:
          'Use our TestFlight and Google Play beta distribution to test your branded app with internal teams before public launch.',
      }),
    },
    {
      title: translate({
        id: 'solutions.consumerApplications.howItWorks.launchToApp.title',
        message: 'Launch to App Stores',
      }),
      description: translate({
        id: 'solutions.consumerApplications.howItWorks.launchToApp.description',
        message:
          'Submit your app to iOS App Store and Google Play Store with included compliance documentation and app store assets.',
      }),
    },
  ];

  return (
    <section className={styles.howItWorksSection}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionEyebrow}>
          <Translate id="solutions.consumerApplications.howItWorks.howItWorks">
            How It Works
          </Translate>
        </span>
        <h2 className={styles.sectionTitle}>
          <Translate id="solutions.consumerApplications.howItWorks.launchInLessThan">
            Launch in Less Than a Week
          </Translate>
        </h2>
        <p className={styles.sectionSubtitle}>
          <Translate id="solutions.consumerApplications.howItWorks.fromConfigurationToApp">
            From configuration to app store submission, DIMO makes it easy to
            launch your branded vehicle application globally.
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
          <Translate id="solutions.consumerApplications.cta.readyToLaunchYour">
            Ready to Launch Your Vehicle App?
          </Translate>
        </h2>
        <p className={styles.ctaText}>
          <Translate id="solutions.consumerApplications.cta.joinCompaniesLaunchingBranded">
            Join companies launching branded vehicle applications globally with
            DIMO's white-label mobile platform.
          </Translate>
        </p>
        <div className={styles.heroButtons}>
          <Link className={styles.primaryBtn} to={LINKS.external.console}>
            <Translate id="solutions.consumerApplications.cta.getStarted">
              Get Started
            </Translate>{' '}
            <span className={styles.arrow}>→</span>
          </Link>
          <EnglishLink className={styles.secondaryBtn} to="/docs">
            <Translate id="solutions.consumerApplications.cta.viewDocumentation">
              View Documentation
            </Translate>{' '}
            <span className={styles.arrow}>→</span>
          </EnglishLink>
        </div>
      </div>
    </section>
  );
}

export default function ConsumerApplicationsPage(): ReactNode {
  const { locale, path } = usePageLocale();
  return (
    <>
      <Head>
        <title>
          {translate({
            id: 'solutions.consumerApplications.meta.title',
            message: 'Consumer Applications | White-Label Mobile Apps by DIMO',
          })}
        </title>
        <meta
          name="description"
          content={translate({
            id: 'solutions.consumerApplications.meta.description',
            message:
              'Launch your branded vehicle mobile app in days. DIMO provides production-ready iOS and Android apps with white-label customization and 20+ language support.',
          })}
        />
        <meta
          name="keywords"
          content={translate({
            id: 'solutions.consumerApplications.meta.keywords',
            message:
              'white-label mobile app, vehicle app, iOS Android, multi-language app, branded mobile app, localization, DIMO mobile',
          })}
        />
        <meta
          property="og:title"
          content={translate({
            id: 'solutions.consumerApplications.meta.ogTitle',
            message: 'Consumer Applications | DIMO White-Label Platform',
          })}
        />
        <meta
          property="og:description"
          content={translate({
            id: 'solutions.consumerApplications.meta.ogDescription',
            message:
              'Production-ready mobile apps for iOS and Android. Fully customizable, multi-language support, and global reach out of the box.',
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
                '@type': 'MobileApplication',
                name: translate({
                  id: 'solutions.consumerApplications.schema.dimoMobileApp.name',
                  message: 'DIMO Mobile App Platform',
                }),
                description: translate({
                  id: 'solutions.consumerApplications.schema.dimoMobileApp.description',
                  message:
                    'White-label mobile application platform for vehicle data. iOS and Android apps with customization and localization.',
                }),
                operatingSystem: 'iOS, Android',
                applicationCategory: 'Automotive',
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
                id: 'solutions.consumerApplications.body.home.name',
                message: 'Home',
              }),
              url: 'https://dimo.org/',
            },
            {
              name: translate({
                id: 'solutions.consumerApplications.body.solutions.name',
                message: 'Solutions',
              }),
              url: 'https://dimo.org/#solutions',
            },
            {
              name: translate({
                id: 'solutions.consumerApplications.body.consumerApplications.name',
                message: 'Consumer Applications',
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
