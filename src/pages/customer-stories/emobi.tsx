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
  Zap,
  Shield,
  Car,
  Plug,
  AlertTriangle,
  Battery,
} from 'lucide-react';
import Translate, { translate } from '@docusaurus/Translate';

const COMPANY_NAME = 'Emobi';
const HERO_BACKGROUND = '/img/emobi.png';

// Key metrics showcasing results
const RESULTS = [
  {
    number: '30+',
    label: translate({
      id: 'customerStories.emobi.results.chargingNetworks.label',
      message: 'Charging Networks',
    }),
  },
  {
    number: 'ISO 15118',
    label: translate({
      id: 'customerStories.emobi.results.plugCharge.label',
      message: 'Plug & Charge',
    }),
  },
  {
    number: '140K+',
    label: translate({
      id: 'customerStories.emobi.results.chargersAccessible.label',
      message: 'Chargers Accessible',
    }),
  },
  {
    number: 'All',
    label: translate({
      id: 'customerStories.emobi.results.teslaVehiclesSupported.label',
      message: 'Tesla Vehicles Supported',
    }),
  },
];

// Problems they faced
const CHALLENGES = [
  {
    icon: <AlertTriangle size={28} />,
    title: translate({
      id: 'customerStories.emobi.challenges.automakerDependency.title',
      message: 'Automaker Dependency',
    }),
    description: translate({
      id: 'customerStories.emobi.challenges.automakerDependency.description',
      message:
        'Existing Plug & Charge implementations relied on automaker-issued certificates, limiting adoption to specific vehicles and requiring costly OEM partnerships.',
    }),
  },
  {
    icon: <Car size={28} />,
    title: translate({
      id: 'customerStories.emobi.challenges.limitedVehicleSupport.title',
      message: 'Limited Vehicle Support',
    }),
    description: translate({
      id: 'customerStories.emobi.challenges.limitedVehicleSupport.description',
      message:
        'Fleets with mixed vehicle brands and legacy EVs were excluded from Plug & Charge benefits, forcing drivers to use multiple apps and payment methods.',
    }),
  },
  {
    icon: <Plug size={28} />,
    title: translate({
      id: 'customerStories.emobi.challenges.complexInfrastructure.title',
      message: 'Complex Infrastructure',
    }),
    description: translate({
      id: 'customerStories.emobi.challenges.complexInfrastructure.description',
      message:
        'Enabling Plug & Charge traditionally required firmware updates, hardware upgrades, and complex integrations with charging networks.',
    }),
  },
];

// Solutions implemented
const SOLUTIONS = [
  {
    icon: <Battery size={28} />,
    title: translate({
      id: 'customerStories.emobi.solutions.deviceBasedDigitalCertificates.title',
      message: 'Device-Based Digital Certificates',
    }),
    description: translate({
      id: 'customerStories.emobi.solutions.deviceBasedDigitalCertificates.description',
      message:
        "Emobi's JustPlug™ technology issues ISO 15118 digital certificates directly to fleet vehicles through DIMO's OBD-II device or virtual onboarding—no automaker involvement required.",
    }),
    result: translate({
      id: 'customerStories.emobi.solutions.deviceBasedDigitalCertificates.result',
      message:
        'Any fleet can now enable Plug & Charge on any vehicle, including legacy EVs, without waiting for OEM support.',
    }),
  },
  {
    icon: <Shield size={28} />,
    title: translate({
      id: 'customerStories.emobi.solutions.secureIdentityBridge.title',
      message: 'Secure Identity Bridge',
    }),
    description: translate({
      id: 'customerStories.emobi.solutions.secureIdentityBridge.description',
      message:
        "DIMO's device securely hosts the EV's digital charging identity, serving as the bridge for Plug & Charge without requiring any changes to the vehicle itself.",
    }),
    result: translate({
      id: 'customerStories.emobi.solutions.secureIdentityBridge.result',
      message:
        'Fleets maintain full control over their charging credentials with enterprise-grade security and compliance.',
    }),
  },
  {
    icon: <Zap size={28} />,
    title: translate({
      id: 'customerStories.emobi.solutions.universalChargingAccess.title',
      message: 'Universal Charging Access',
    }),
    description: translate({
      id: 'customerStories.emobi.solutions.universalChargingAccess.description',
      message:
        "The partnership combines DIMO's fleet intelligence platform with Emobi's access to over 140,000 chargers across the U.S. and Canada.",
    }),
    result: translate({
      id: 'customerStories.emobi.solutions.universalChargingAccess.result',
      message:
        'Drivers experience seamless, app-free charging across both modern and legacy charging infrastructure.',
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
          backgroundPosition: 'center 10%',
          backgroundSize: '70% auto',
        }}
      />
      <div className={styles.heroOverlay} />

      <div className={styles.heroContent}>
        <span className={styles.storyBadge}>
          <Star size={16} />{' '}
          <Translate id="customerStories.emobi.hero.customerStory">
            Customer Story
          </Translate>
        </span>

        <h1 className={styles.heroTitle}>
          <Translate
            id="customerStories.emobi.hero.andDimoDeliverThe"
            values={{
              link: (
                <a
                  href="https://www.emobi.ai/"
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
                  <Translate id="customerStories.emobi.hero.fleetReadyPlugChargeDevice">
                    Fleet-Ready Plug & Charge Device
                  </Translate>
                </span>
              ),
            }}
          >
            {'{link} and DIMO Deliver the First {span}'}
          </Translate>
        </h1>

        <p className={styles.heroSubtitle}>
          <Translate id="customerStories.emobi.hero.aGroundbreakingPartnershipThat">
            A groundbreaking partnership that brings secure, seamless ISO 15118
            Plug & Charge to any fleet vehicle—without automaker dependencies,
            firmware updates, or hardware upgrades.
          </Translate>
        </p>

        <div className={styles.heroButtons}>
          <Link className={styles.primaryBtn} to={LINKS.external.console}>
            <Translate id="customerStories.emobi.hero.enableYourFleet">
              Enable Your Fleet
            </Translate>{' '}
            <span className={styles.arrow}>→</span>
          </Link>
          <EnglishLink className={styles.secondaryBtn} to="/docs">
            <Translate id="customerStories.emobi.hero.readOurDocumentation">
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
          <Translate id="customerStories.emobi.results.theInnovation">
            The Innovation
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
          <Translate id="customerStories.emobi.challenges.theIndustryChallenge">
            The Industry Challenge
          </Translate>
        </span>
        <h2 className={styles.sectionTitle}>
          <Translate id="customerStories.emobi.challenges.plugChargePromiseVs">
            Plug & Charge Promise vs. Reality
          </Translate>
        </h2>
        <p className={styles.sectionSubtitle}>
          <Translate id="customerStories.emobi.challenges.plugChargeHasLong">
            Plug & Charge has long promised app-free EV charging, but the
            industry has struggled to deliver it at scale. Cost, complexity, and
            automaker-led implementations have kept this convenience out of
            reach for most fleets.
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
          <Translate id="customerStories.emobi.solutions.theDimoEmobiSolution">
            The DIMO + Emobi Solution
          </Translate>
        </span>
        <h2 className={styles.sectionTitle}>
          <Translate id="customerStories.emobi.solutions.fleetLevelPlugChargeEnablement">
            Fleet-Level Plug & Charge Enablement
          </Translate>
        </h2>
        <p className={styles.sectionSubtitle}>
          <Translate id="customerStories.emobi.solutions.byShiftingPlugCharge">
            By shifting Plug & Charge enablement from automakers to fleets, the
            partnership unlocks secure, standards-based charging for any driver
            in any vehicle.
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
                <Translate id="customerStories.emobi.solutions.impact">
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

function QuoteSection() {
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
          <Translate id="customerStories.emobi.quote.thisPartnershipRepresentsA">
            "This partnership represents a major milestone for EV adoption.
            Electric vehicles have been promised a seamless Plug & Charge
            experience for years, but have had to keep waiting as the industry
            struggled to deliver it at scale. Issuing ISO 15118 digital
            certificates directly to fleets through DIMO's device puts control
            where it belongs, and unlocks Plug & Charge functionality for any
            car today."
          </Translate>
        </blockquote>
        <div className={styles.testimonialAuthor}>
          <Translate id="customerStories.emobi.quote.linSunFa">
            Lin Sun Fa
          </Translate>
        </div>
        <div className={styles.testimonialRole}>
          <Translate id="customerStories.emobi.quote.ceoEmobi">
            CEO, Emobi
          </Translate>
        </div>
      </div>
    </section>
  );
}

function SecondQuoteSection() {
  return (
    <section className={`${styles.testimonialSection} ${styles.sectionAlt}`}>
      <div className={styles.testimonialContainer}>
        <blockquote className={styles.testimonialQuote}>
          <Translate id="customerStories.emobi.secondQuote.withEmobiWereExtending">
            "With Emobi, we're extending DIMO's mission of smarter, safer
            mobility into fleet charging operations. Together, we're helping
            fleets spend less time managing infrastructure complexity and more
            time keeping vehicles on the road and delivering results."
          </Translate>
        </blockquote>
        <div className={styles.testimonialAuthor}>
          <Translate id="customerStories.emobi.secondQuote.yevgenyKhessin">
            Yevgeny Khessin
          </Translate>
        </div>
        <div className={styles.testimonialRole}>
          <Translate id="customerStories.emobi.secondQuote.coFounderDimo">
            Co-founder, DIMO
          </Translate>
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      phase: translate({
        id: 'customerStories.emobi.howItWorks.connectWithDimo.phase',
        message: 'Step 1',
      }),
      title: translate({
        id: 'customerStories.emobi.howItWorks.connectWithDimo.title',
        message: 'Connect with DIMO',
      }),
      description: translate({
        id: 'customerStories.emobi.howItWorks.connectWithDimo.description',
        message:
          "Fleets connect their vehicles using DIMO's affordable OBD-II device or virtual onboarding, enabling advanced vehicle intelligence without costly upgrades.",
      }),
    },
    {
      phase: translate({
        id: 'customerStories.emobi.howItWorks.certificateIssuance.phase',
        message: 'Step 2',
      }),
      title: translate({
        id: 'customerStories.emobi.howItWorks.certificateIssuance.title',
        message: 'Certificate Issuance',
      }),
      description: translate({
        id: 'customerStories.emobi.howItWorks.certificateIssuance.description',
        message:
          "Emobi's JustPlug™ issues and manages an ISO 15118 digital certificate at the fleet level via DIMO's device—no automaker involvement or firmware updates required.",
      }),
    },
    {
      phase: translate({
        id: 'customerStories.emobi.howItWorks.secureIdentityHosting.phase',
        message: 'Step 3',
      }),
      title: translate({
        id: 'customerStories.emobi.howItWorks.secureIdentityHosting.title',
        message: 'Secure Identity Hosting',
      }),
      description: translate({
        id: 'customerStories.emobi.howItWorks.secureIdentityHosting.description',
        message:
          "The DIMO device or cloud securely hosts the EV's digital charging identity, serving as the bridge for Plug & Charge without any changes to the vehicle.",
      }),
    },
    {
      phase: translate({
        id: 'customerStories.emobi.howItWorks.seamlessCharging.phase',
        message: 'Step 4',
      }),
      title: translate({
        id: 'customerStories.emobi.howItWorks.seamlessCharging.title',
        message: 'Seamless Charging',
      }),
      description: translate({
        id: 'customerStories.emobi.howItWorks.seamlessCharging.description',
        message:
          'Drivers simply plug in at any of 140,000+ compatible chargers across the U.S. and Canada. Authentication and payment happen automatically.',
      }),
    },
  ];

  return (
    <section className={styles.timelineSection}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionEyebrow}>
          <Translate id="customerStories.emobi.howItWorks.howItWorks">
            How It Works
          </Translate>
        </span>
        <h2 className={styles.sectionTitle}>
          <Translate id="customerStories.emobi.howItWorks.fromConnectionToCharging">
            From Connection to Charging
          </Translate>
        </h2>
        <p className={styles.sectionSubtitle}>
          <Translate id="customerStories.emobi.howItWorks.aSimpleFourStepProcess">
            A simple four-step process that finally delivers the universal Plug
            & Charge experience fleets and drivers have been waiting for.
          </Translate>
        </p>
      </div>

      <div className={styles.stepsContainer}>
        {steps.map((step, i) => (
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
      id: 'customerStories.emobi.keyTakeaways.firstFleetReadyDevice',
      message:
        'First fleet-ready device to enable secure ISO 15118 Plug & Charge without automaker involvement',
    }),
    translate({
      id: 'customerStories.emobi.keyTakeaways.worksWithAny',
      message:
        "Works with any Teslas — more EVs available through DIMO's OBD-II device",
    }),
    translate({
      id: 'customerStories.emobi.keyTakeaways.noFirmwareUpdates',
      message:
        'No firmware updates, hardware upgrades, or charging infrastructure changes required',
    }),
    translate({
      id: 'customerStories.emobi.keyTakeaways.accessTo140000',
      message:
        "Access to 140,000+ chargers across the U.S. and Canada through Emobi's roaming network",
    }),
    translate({
      id: 'customerStories.emobi.keyTakeaways.fleetLevelCertificateManagement',
      message:
        'Fleet-level certificate management puts control where it belongs—with the fleet operator',
    }),
    translate({
      id: 'customerStories.emobi.keyTakeaways.trustedByThe',
      message:
        'Trusted by the U.S. Department of Energy and Department of Transportation',
    }),
  ];

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionEyebrow}>
          <Translate id="customerStories.emobi.keyTakeaways.keyTakeaways">
            Key Takeaways
          </Translate>
        </span>
        <h2 className={styles.sectionTitle}>
          <Translate id="customerStories.emobi.keyTakeaways.whyThisMatters">
            Why This Matters
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
          <Translate id="customerStories.emobi.cta.readyToEnablePlug">
            Ready to Enable Plug & Charge for Your Fleet?
          </Translate>
        </h2>
        <p className={styles.ctaText}>
          <Translate id="customerStories.emobi.cta.joinTheFleetsAlready">
            Join the fleets already benefiting from seamless, app-free EV
            charging. Get started with DIMO and Emobi's JustPlug™ technology
            today.
          </Translate>
        </p>
        <div className={styles.heroButtons}>
          <Link className={styles.primaryBtn} to={LINKS.external.console}>
            <Translate id="customerStories.emobi.cta.getStarted">
              Get Started
            </Translate>{' '}
            <span className={styles.arrow}>→</span>
          </Link>
          <EnglishLink className={styles.secondaryBtn} to="/docs">
            <Translate id="customerStories.emobi.cta.readTheDocs">
              Read the Docs
            </Translate>{' '}
            <span className={styles.arrow}>→</span>
          </EnglishLink>
        </div>
      </div>
    </section>
  );
}

export default function EmobiCaseStudy(): ReactNode {
  const { locale, path } = usePageLocale();
  return (
    <>
      <Head>
        <title>
          {translate({
            id: 'customerStories.emobi.meta.title',
            message:
              'Emobi Partnership | DIMO Fleet Plug & Charge Success Story',
          })}
        </title>
        <meta
          name="description"
          content={translate({
            id: 'customerStories.emobi.meta.description',
            message:
              'See how Emobi and DIMO partnered to deliver the first fleet-ready Plug & Charge device using ISO 15118 standards—enabling seamless EV charging for any vehicle without automaker dependencies.',
          })}
        />
        <meta
          name="keywords"
          content={translate({
            id: 'customerStories.emobi.meta.keywords',
            message:
              'Emobi, DIMO partnership, Plug and Charge, ISO 15118, fleet EV charging, JustPlug, electric vehicle charging, fleet management',
          })}
        />
        <meta
          property="og:title"
          content={translate({
            id: 'customerStories.emobi.meta.ogTitle',
            message: 'Emobi + DIMO Partnership | Fleet Plug & Charge',
          })}
        />
        <meta
          property="og:description"
          content={translate({
            id: 'customerStories.emobi.meta.ogDescription',
            message:
              'How Emobi and DIMO delivered the first fleet-ready Plug & Charge device: ISO 15118 compliant, any vehicle compatible, 140K+ chargers accessible.',
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
                headline: translate({
                  id: 'customerStories.emobi.schema.emobiAndDimo.headline',
                  message:
                    'Emobi and DIMO Partner to Deliver First Fleet-Ready Plug & Charge Device',
                }),
                description: translate({
                  id: 'customerStories.emobi.schema.emobiAndDimo.description',
                  message:
                    "Partnership combines Emobi's JustPlug™ technology with DIMO's vehicle intelligence platform to bring secure, seamless ISO 15118 Plug & Charge to fleets for the first time.",
                }),
                image: {
                  '@type': 'ImageObject',
                  url: 'https://dimo.org/img/emobi.png',
                  contentUrl: 'https://dimo.org/img/emobi.png',
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
                datePublished: '2026-02-01',
                mainEntityOfPage: {
                  '@type': 'WebPage',
                  '@id': 'https://dimo.org/customer-stories/emobi',
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
                id: 'customerStories.emobi.body.home.name',
                message: 'Home',
              }),
              url: 'https://dimo.org/',
            },
            {
              name: translate({
                id: 'customerStories.emobi.body.customerStories.name',
                message: 'Customer Stories',
              }),
              url: 'https://dimo.org/#customer-stories',
            },
            { name: 'Emobi' },
          ]}
        />

        <main>
          <HeroSection />
          <ResultsSection />
          <ChallengesSection />
          <SolutionsSection />
          <QuoteSection />
          <HowItWorksSection />
          <SecondQuoteSection />
          <KeyTakeawaysSection />
          <CTASection />
        </main>

        <FooterTheme />
      </div>
    </>
  );
}
