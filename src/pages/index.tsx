import React, { type ReactNode, useState, useEffect, useRef } from 'react';
import Link from '@docusaurus/Link';
import EnglishLink from '../components/EnglishLink';
import Head from '@docusaurus/Head';
import { localizeSchema } from '../lib/seo';
import { usePageLocale } from '../lib/use-page-locale';
import styles from './index.module.css';
import FooterTheme from '../theme/Footer';
import CustomNavbar from '../components/CustomNavbar';
import { LINKS } from '../links';
import { Star } from 'lucide-react';
import ChatBot from '../components/ChatBot/ChatBot';
import HeroFlow from '../components/HeroFlow';
import Translate, { translate } from '@docusaurus/Translate';

// Asset imports
const imgIconPlugPlay = '/img/icon-plug-play.svg';
const imgIconPrivacyPreserving = '/img/icon-privacy-preserving.svg';
const imgOpenSource = '/img/icon-open-source.svg';
const imgIconSecureCompliant = '/img/icon-secure.svg';
const imgIconUniversalCompatibility = '/img/icon-universal.svg';
const imgIconStarsAI = '/img/icon-ai.svg'; // Used as AI icon
const imgHardware = '/img/dimo_hardware.webp';

// Rotating word for the hero H1. Cross-fades between complete words so the
// heading is always readable — the old typewriter effect left fragments like
// "built for se|" on screen for seconds at a time.
function useRotatingWord(words: string[], holdMs = 3500, fadeMs = 400) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let swap: ReturnType<typeof setTimeout>;
    const timer = setInterval(() => {
      setVisible(false);
      swap = setTimeout(() => {
        setIndex(prev => (prev + 1) % words.length);
        setVisible(true);
      }, fadeMs);
    }, holdMs);
    return () => {
      clearInterval(timer);
      clearTimeout(swap);
    };
  }, [words, holdMs, fadeMs]);

  return { index, visible };
}

// Defers video fetching until the element nears the viewport. `autoplay` in
// the HTML makes browsers start downloading immediately even with
// preload="none", so the sources are injected (and playback started) only
// when the section is about to be seen.
function LazyVideo({
  webm,
  mp4,
  label,
}: {
  webm: string;
  mp4: string;
  label: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (shouldLoad) {
      ref.current?.play().catch(() => {});
    }
  }, [shouldLoad]);

  return (
    <video
      ref={ref}
      loop
      muted
      playsInline
      preload="none"
      aria-label={label}
      style={{ aspectRatio: '1 / 1' }}
    >
      {shouldLoad && (
        <>
          <source src={webm} type="video/webm" />
          <source src={mp4} type="video/mp4" />
        </>
      )}
    </video>
  );
}

const ROTATING_WORDS = [
  translate({
    id: 'home.rotatingWords.connectedVehicleData',
    message: 'connected-vehicle data',
  }),
  translate({
    id: 'home.rotatingWords.sessionBasedEconomy',
    message: 'session-based economy',
  }),
  translate({
    id: 'home.rotatingWords.physicalAiInMobility',
    message: 'Physical AI in mobility',
  }),
];

function HeroSection() {
  const { index, visible } = useRotatingWord(ROTATING_WORDS);

  return (
    <header className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={styles.heroTop}>
          <h1 className={styles.heroTitle}>
            <Translate
              id="home.hero.theInfrastructureBuiltFor"
              values={{
                br: <br />,
                word: (
                  <span className={styles.rotator}>
                    {ROTATING_WORDS.map(w => (
                      <span
                        key={w}
                        aria-hidden="true"
                        className={styles.rotatorSizer}
                        data-text={w}
                      />
                    ))}
                    <span
                      className={`${styles.rotatingWord} ${
                        visible ? styles.rotatingWordVisible : ''
                      }`}
                    >
                      {ROTATING_WORDS[index]}
                    </span>
                  </span>
                ),
              }}
            >
              {'The infrastructure built for {br}{word}'}
            </Translate>
          </h1>

          <div className={styles.heroAside}>
            <p className={styles.heroSubtitle}>
              <Translate id="home.hero.dimoIsBuildingThe">
                DIMO is building the infrastructure for the session-based
                economy—where vehicles, drivers, and services connect on-demand.
                Build apps that unlock value across every trip, rental, and
                interaction.
              </Translate>
            </p>

            <div className={styles.heroButtons}>
              <Link className={styles.primaryBtn} to={LINKS.external.console}>
                <Translate id="home.hero.signUp">Sign Up</Translate>{' '}
                <span className={styles.arrow}>→</span>
              </Link>
              <EnglishLink className={styles.secondaryBtn} to="/docs">
                <Translate id="home.hero.readTheDocs">Read the Docs</Translate>{' '}
                <span className={styles.arrow}>→</span>
              </EnglishLink>
            </div>
          </div>
        </div>

        <div className={styles.heroVisual}>
          <HeroFlow />
        </div>
      </div>
    </header>
  );
}

// Press logos are shown grayscale, sized uniformly, and linked to the actual
// coverage — nominative use identifying real editorial features, per the
// trademark note below the strip. Only add outlets with verifiable articles.
function FeaturedInSection() {
  return (
    <section
      className={styles.trustedBy}
      aria-label={translate({
        id: 'home.featuredIn.pressCoverage',
        message: 'Press coverage',
      })}
    >
      <p className={styles.trustedByText}>
        <Translate id="home.featuredIn.asFeaturedIn">As featured in</Translate>
      </p>
      <div className={styles.logoMarquee}>
        <a
          href="https://www.motortrend.com/reviews/2025-ram-1500-laramie-4x4-yearlong-review-update-8-dimo-data-dump"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={translate({
            id: 'home.featuredIn.readMotorTrendsCoverageOf',
            message: "Read MotorTrend's coverage of DIMO",
          })}
        >
          <img
            src="/img/logo-motortrend.svg"
            alt="MotorTrend"
            width={155}
            height={30}
            loading="lazy"
          />
        </a>
      </div>
      <p className={styles.pressQuote}>
        <Translate id="home.featuredIn.anyTrueDataNerd">
          “Any true data nerd should connect to DIMO.” — MotorTrend, July 2026
        </Translate>
      </p>
      <p className={styles.trademarkNote}>
        <Translate id="home.featuredIn.allThirdPartyTrademarksAre">
          All third-party trademarks are the property of their respective owners
          and identify independent editorial coverage only. No endorsement or
          sponsorship is implied.
        </Translate>
      </p>
    </section>
  );
}

const WHAT_IS_DIMO_POINTS = [
  {
    title: translate({
      id: 'home.whatIsDimo.points.brands.title',
      message: '50+ brands',
    }),
    desc: translate({
      id: 'home.whatIsDimo.points.brands.desc',
      message:
        'Tesla, Ford, BMW, Toyota, Hyundai and more through one integration.',
    }),
  },
  {
    title: translate({
      id: 'home.whatIsDimo.points.signals.title',
      message: 'Live signals',
    }),
    desc: translate({
      id: 'home.whatIsDimo.points.signals.desc',
      message:
        'Location, battery, fuel, odometer, tire pressure and trouble codes.',
    }),
  },
  {
    title: translate({
      id: 'home.whatIsDimo.points.consent.title',
      message: 'Owner consent',
    }),
    desc: translate({
      id: 'home.whatIsDimo.points.consent.desc',
      message:
        'Owners grant and revoke access per session. GDPR and EU Data Act ready.',
    }),
  },
  {
    title: translate({
      id: 'home.whatIsDimo.points.free.title',
      message: 'Free to start',
    }),
    desc: translate({
      id: 'home.whatIsDimo.points.free.desc',
      message: 'Hobbyist tier with SDKs for TypeScript, Python and C#.',
    }),
  },
];

// The scannable version leads; the full overview stays in the HTML (inside
// <details>) so search and AI engines still see every fact.
function WhatIsDimoSection() {
  return (
    <section className={styles.answerSection}>
      <div className={styles.container}>
        <h2 className={styles.eyebrow}>
          <Translate id="home.whatIsDimo.whatIsDimo">What is DIMO?</Translate>
        </h2>
        <p className={styles.answerHeadline}>
          <Translate id="home.whatIsDimo.headline">
            One API for 50+ car brands.
          </Translate>
          <br />
          <span className={styles.muted}>
            <Translate id="home.whatIsDimo.headlineMuted">
              Owners stay in control.
            </Translate>
          </span>
        </p>
        <p className={styles.answerLede}>
          <Translate id="home.whatIsDimo.lede">
            DIMO (Digital Infrastructure for Moving Objects) is vehicle data
            infrastructure: one permissioned API for live telemetry, identity,
            and owner consent.
          </Translate>
        </p>
        <div className={styles.pointGrid}>
          {WHAT_IS_DIMO_POINTS.map(point => (
            <div key={point.title} className={styles.point}>
              <h3 className={styles.pointTitle}>{point.title}</h3>
              <p className={styles.pointDesc}>{point.desc}</p>
            </div>
          ))}
        </div>
        <details className={styles.answerMore}>
          <summary>
            <Translate id="home.whatIsDimo.readFullOverview">
              Read the full overview
            </Translate>
          </summary>
          <div className={styles.overviewGrid}>
            <div>
              <h3 className={styles.overviewTitle}>
                <Translate id="home.whatIsDimo.overview.start.title">
                  Get started in minutes
                </Translate>
              </h3>
              <ol className={styles.overviewList}>
                <li>
                  <Translate
                    id="home.whatIsDimo.overview.start.account"
                    values={{
                      console: (
                        <Link to={LINKS.external.console}>
                          console.dimo.org
                        </Link>
                      ),
                    }}
                  >
                    {'Create a free account at {console}.'}
                  </Translate>
                </li>
                <li>
                  <Translate id="home.whatIsDimo.overview.start.keys">
                    Generate API keys.
                  </Translate>
                </li>
                <li>
                  <Translate id="home.whatIsDimo.overview.start.query">
                    Query live data over GraphQL or REST, or use the SDKs for
                    TypeScript, Python and C#.
                  </Translate>
                </li>
              </ol>
            </div>
            <div>
              <h3 className={styles.overviewTitle}>
                <Translate id="home.whatIsDimo.overview.owners.title">
                  Owners control access
                </Translate>
              </h3>
              <ul className={styles.overviewList}>
                <li>
                  <Translate id="home.whatIsDimo.overview.owners.grant">
                    Grant or revoke access with granular, auditable permissions
                    (SACD).
                  </Translate>
                </li>
                <li>
                  <Translate id="home.whatIsDimo.overview.owners.session">
                    Permissions can start and expire with each session.
                  </Translate>
                </li>
                <li>
                  <Translate id="home.whatIsDimo.overview.owners.compliance">
                    GDPR and EU Data Act compliant by default.
                  </Translate>
                </li>
              </ul>
            </div>
            <div>
              <h3 className={styles.overviewTitle}>
                <Translate id="home.whatIsDimo.overview.sessions.title">
                  Built for the session-based economy
                </Translate>
              </h3>
              <ul className={styles.overviewList}>
                <li>
                  <Translate id="home.whatIsDimo.overview.sessions.onDemand">
                    Vehicles, drivers and services connect on demand.
                  </Translate>
                </li>
                <li>
                  <Translate id="home.whatIsDimo.overview.sessions.noIntegrations">
                    No separate integration with each manufacturer.
                  </Translate>
                </li>
                <li>
                  <Translate id="home.whatIsDimo.overview.sessions.open">
                    Open-source core. Bring your own telematics hardware.
                  </Translate>
                </li>
              </ul>
            </div>
          </div>
          <p className={styles.overviewLinks}>
            <span>
              <Translate id="home.whatIsDimo.learnMore">Learn more:</Translate>
            </span>
            <Link to="/connected-car-api">
              <Translate id="home.whatIsDimo.connectedCarApi">
                connected car API
              </Translate>
            </Link>
            <Link to="/vehicle-data-api">
              <Translate id="home.whatIsDimo.vehicleDataApi">
                vehicle data API
              </Translate>
            </Link>
            <Link to="/compare/smartcar-alternative">
              <Translate id="home.whatIsDimo.dimoVsSmartcar">
                DIMO vs Smartcar
              </Translate>
            </Link>
          </p>
        </details>
      </div>
    </section>
  );
}

function FeaturesGrid() {
  const features = [
    {
      title: translate({
        id: 'home.featuresGrid.universalCompatibility.title',
        message: 'Universal Compatibility',
      }),
      desc: translate({
        id: 'home.featuresGrid.universalCompatibility.desc',
        message:
          'A direct Tesla integration, plus Ford, BMW, and 50+ other brands already on DIMO. New vehicle signals decoded almost daily.',
      }),
      icon: imgIconUniversalCompatibility,
    },
    {
      title: translate({
        id: 'home.featuresGrid.privacyByDesign.title',
        message: 'Privacy by Design',
      }),
      desc: translate({
        id: 'home.featuresGrid.privacyByDesign.desc',
        message:
          'User-owned data architecture. Grant and revoke access with granular permissions built on verifiable credentials.',
      }),
      icon: imgIconPrivacyPreserving,
    },
    {
      title: translate({
        id: 'home.featuresGrid.aiReadyContext.title',
        message: 'AI-Ready Context',
      }),
      desc: translate({
        id: 'home.featuresGrid.aiReadyContext.desc',
        message:
          'Clean, normalized data streams ready for developing agentic workflows. ',
      }),
      icon: imgIconStarsAI,
    },
    {
      title: translate({
        id: 'home.featuresGrid.plugPlayHardware.title',
        message: 'Plug & Play Hardware',
      }),
      desc: translate({
        id: 'home.featuresGrid.plugPlayHardware.desc',
        message:
          'Onboard vehicles instantly with optional hardware like the DIMO LTE R1. Zero-config installation for users.',
      }),
      icon: imgIconPlugPlay,
    },
    {
      title: translate({
        id: 'home.featuresGrid.openSourceCore.title',
        message: 'Open Source Core',
      }),
      desc: translate({
        id: 'home.featuresGrid.openSourceCore.desc',
        message:
          'Built on open protocols. Audit the code, contribute to the network, and own your infrastructure.',
      }),
      icon: imgOpenSource,
    },
    {
      title: translate({
        id: 'home.featuresGrid.secureCompliant.title',
        message: 'Secure & Compliant',
      }),
      desc: translate({
        id: 'home.featuresGrid.secureCompliant.desc',
        message:
          'DIMO records access on a cryptographically signed, independently verifiable ledger while preserving security, ensuring compliance with GDPR and the EU Data Act.',
      }),
      icon: imgIconSecureCompliant,
    },
  ];

  return (
    <section className={styles.features}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>
          <Translate id="home.featuresGrid.builtForTheSessionBased">
            Built for the session-based economy
          </Translate>
        </h2>
        <p className={styles.sectionSubtitle}>
          <Translate id="home.featuresGrid.theFutureOfMobility">
            The future of mobility is sessions—not ownership. DIMO gives you the
            primitives to build services that activate at the start of a trip
            and settle when it ends: data consent, real-time telemetry,
            payments, and AI-driven automation—all in one platform.
          </Translate>
        </p>
      </div>

      <div className={styles.bentoGrid}>
        {features.map((f, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.cardIcon}>
              <img src={f.icon} alt="" width={48} height={48} loading="lazy" />
            </div>
            <h3 className={styles.cardTitle}>{f.title}</h3>
            <p className={styles.cardDesc}>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function AutomateOperationsSection() {
  return (
    <section className={styles.bigFeature}>
      <div className={styles.featureContainer}>
        <div className={styles.featureVisual}>
          <LazyVideo
            webm="/img/dimo-pathways.webm"
            mp4="/img/dimo-pathways.mp4"
            label={translate({
              id: 'home.automateOperations.automateOperations',
              message: 'Automate Operations',
            })}
          />
        </div>
        <div className={styles.featureText}>
          <h3>
            <Translate id="home.automateOperations.powerEverySessionEnd">
              Power every session, end to end
            </Translate>
          </h3>
          <p>
            <Translate id="home.automateOperations.fromTheMomentA">
              From the moment a driver unlocks a vehicle to the instant they
              hand it back, DIMO orchestrates the entire session lifecycle.
              Automate workflows with AI agents that carry context across every
              interaction— so your team focuses on growth, not ops. Perfect for:
            </Translate>
          </p>
          <ul className={styles.featureList}>
            <li>
              <span className={styles.checkIcon}>✓</span>{' '}
              <Translate id="home.automateOperations.rentalsFleetTurnover">
                Rentals & Fleet Turnover
              </Translate>
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>{' '}
              <Translate id="home.automateOperations.payPerUseSubscriptionServices">
                Pay-Per-Use & Subscription Services
              </Translate>
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>{' '}
              <Translate id="home.automateOperations.sessionBasedInsuranceRisk">
                Session-Based Insurance & Risk
              </Translate>
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>{' '}
              <Translate id="home.automateOperations.bookingCheckInReturns">
                Booking, Check-in & Returns
              </Translate>
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>{' '}
              <Translate id="home.automateOperations.maintenanceTriggeredByUsage">
                Maintenance Triggered by Usage
              </Translate>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function BigFeatureSection() {
  return (
    <section className={styles.bigFeature}>
      <div className={styles.featureContainer}>
        <div className={styles.featureText}>
          <h3>
            <Translate id="home.bigFeature.connectAnyVehicleStart">
              Connect any vehicle. Start any session.
            </Translate>
          </h3>
          <p>
            <Translate
              id="home.bigFeature.theSessionBasedEconomyRuns"
              values={{
                link: (
                  <a href="https://github.com/DIMO-Network/dis">
                    DIMO Ingest Server
                  </a>
                ),
              }}
            >
              {
                'The session-based economy runs on real-time vehicle data. DIMO works with vehicles across 50+ brands already on the network—or ingest your own data via the {link}. Every session gets a verified identity, live telemetry, and user-controlled consent so you can charge, insure, and serve drivers with confidence.'
              }
            </Translate>
          </p>
          <ul className={styles.featureList}>
            <li>
              <span className={styles.checkIcon}>✓</span>{' '}
              <Translate id="home.bigFeature.verifiedVehicleDriverIdentity">
                Verified vehicle & driver identity per session
              </Translate>
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>{' '}
              <Translate id="home.bigFeature.realTimeTelemetryFromIgnition">
                Real-time telemetry from ignition to park
              </Translate>
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>{' '}
              <Translate id="home.bigFeature.granularConsentThatActivates">
                Granular consent that activates and expires with each session
              </Translate>
            </li>
          </ul>
        </div>
        <div className={styles.featureVisual}>
          <LazyVideo
            webm="/img/dimo-pixel-car.webm"
            mp4="/img/dimo-pixel-car.mp4"
            label={translate({
              id: 'home.bigFeature.telematicsArchitecture',
              message: 'Telematics Architecture',
            })}
          />
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  {
    name: 'Maximiliano Ipinza',
    text: translate({
      id: 'home.testimonials.maximilianoIpinza.text',
      message:
        "Just love it. we are starting building with this kit and it's getting easier and easier. actually we are using DIMO in LATAM and we get all the data via API into our own telematics solution. another thing that really makes integrations easier is the level of support with James team and the delivery.",
    }),
  },
  {
    name: 'Collin McCloskey',
    text: translate({
      id: 'home.testimonials.collinMcCloskey.text',
      message:
        "The DIMO team has done a phenomenal job making it easy to build on their platform. When I have questions I use their GPT. When I'm writing code with CC or cursor, I copy the docs in one click. Their team is quick to support and they ship faster than I can keep up. It's honestly a really pleasant experience!",
    }),
  },
  {
    name: 'Daniel Wedding',
    text: translate({
      id: 'home.testimonials.danielWedding.text',
      message:
        'As an avid EV consumer and software engineer, DIMO provided a platform that not only allowed personal insight into the vehicle metrics I was looking for, but also integrated an easy-to-use developer API so I could integrate everything flawlessly into my tech stack.',
    }),
  },
  {
    name: 'Rob Solomon',
    text: translate({
      id: 'home.testimonials.robSolomon.text',
      message:
        "I've built several apps on DIMO. Incredibly easy. As a non-dev, I've been able to launch things that really truly work with Replit, n8n, and Bubble. The documentation is clear and the platform works as advertised. Way easier to get started than others! Perhaps I'm a bit biased... but who cares! It's great.",
    }),
  },
];

function TestimonialsSection() {
  const [isPaused, setIsPaused] = React.useState(false);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);
  const handleTouchStart = () => setIsPaused(true);
  const handleTouchEnd = () => setIsPaused(false);

  return (
    <section className={styles.wallOfLove}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>
          <Translate id="home.testimonials.whatDevsAreSaying">
            What devs are saying
          </Translate>
        </h2>
      </div>

      <div className={styles.testimonialMarqueeContainer}>
        <div
          className={`${styles.testimonialMarquee} ${isPaused ? styles.paused : ''}`}
        >
          {/* Duplicate list twice for smoother infinite scroll on wide screens */}
          {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
            <div
              key={i}
              className={styles.testimonialCard}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div className={styles.testimonialHeader}>
                <div className={styles.testimonialAvatar}>{t.name[0]}</div>
                <div className={styles.testimonialInfo}>
                  <div className={styles.testimonialName}>{t.name}</div>
                  <div className={styles.testimonialStars}>
                    {[1, 2, 3, 4, 5].map(s => (
                      <Star
                        key={s}
                        size={16}
                        fill="currentColor"
                        strokeWidth={0}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className={styles.testimonialText}>{t.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Old module commented out as requested */}
      {/* <div
        className="feedspace-embed"
        data-id="217207bd-2013-4903-8545-d7f149fda8a2"
        style={{ maxWidth: '1200px', margin: '0 auto' }}
      ></div>
      <script
        src="https://js.feedspace.io/v1/embed/embed.min.js"
        type="text/javascript"
        async
      ></script> */}
    </section>
  );
}

function HardwareSection() {
  return (
    <section className={styles.hardwareSection}>
      <div className={styles.hardwareContainer}>
        <div className={styles.hardwareContent}>
          <span className={styles.eyebrow}>DIMO LTE R1</span>
          <h2 className={styles.hardwareTitle}>
            <Translate id="home.hardware.compatibleHardware">
              Compatible Hardware
            </Translate>
          </h2>
          <p className={styles.hardwareDescription}>
            <Translate id="home.hardware.accessHighFrequencyVehicleData">
              Access high-frequency vehicle data with the DIMO LTE R1. It
              installs in seconds, works with almost any car, and streams data
              directly to the network.
            </Translate>
          </p>
          <div className={styles.hardwareButtons}>
            <Link
              className={styles.primaryBtn}
              to="https://dimo.co/products/dimo-lte-r1"
            >
              <Translate id="home.hardware.buyDimoLteR1">
                Buy DIMO LTE R1
              </Translate>
            </Link>
            <div className={styles.hardwareCustomIntegration}>
              <span className={styles.hardwareCustomText}>
                <Translate id="home.hardware.needACustomHardware">
                  Need a custom hardware integration?
                </Translate>
              </span>
              <Link
                className={styles.secondaryBtn}
                to="mailto:contact@dimo.org"
              >
                <Translate id="home.hardware.letsChat">Let's Chat</Translate>
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.hardwareVisual}>
          <img
            src={imgHardware}
            alt="DIMO LTE R1"
            width={2029}
            height={1080}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.ctaContent}>
        <h2 className={styles.ctaTitle}>
          <Translate id="home.cta.readyToBuildFor">
            Ready to build for sessions?
          </Translate>
        </h2>
        <p className={styles.ctaText}>
          <Translate id="home.cta.joinDevelopersBuildingThe">
            Join developers building the next generation of session-based
            mobility services. Get your API keys and ship your first session
            today.
          </Translate>
        </p>
        <div
          className={styles.heroButtons}
          style={{ justifyContent: 'center' }}
        >
          <Link className={styles.primaryBtn} to={LINKS.external.console}>
            <Translate id="home.cta.getApiKeys">Get API Keys</Translate>
          </Link>
          <Link className={styles.secondaryBtn} to="https://chat.dimo.org">
            <Translate id="home.cta.joinDiscord">Join Discord</Translate>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const { locale, path } = usePageLocale();
  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>
          {translate({
            id: 'home.meta.title',
            message: 'DIMO | Vehicle Platform for the Session-Based Economy',
          })}
        </title>
        <meta
          name="title"
          content={translate({
            id: 'home.meta.title',
            message: 'DIMO | Vehicle Platform for the Session-Based Economy',
          })}
        />
        <meta
          name="description"
          content={translate({
            id: 'home.meta.description',
            message:
              'DIMO powers the session-based economy: it handles vehicle access, telemetry, identity, and consent (SACD) across 50+ brands so you can build apps and businesses.',
          })}
        />
        <meta
          name="keywords"
          content={translate({
            id: 'home.meta.keywords',
            message:
              'session-based economy, vehicle data API, connected car platform, automotive developer platform, vehicle intelligence, car API, telematics API, OEM API, mobility as a service, vehicle SDK, DIMO',
          })}
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={translate({
            id: 'home.meta.ogTitle',
            message: 'DIMO | Vehicle Platform for the Session-Based Economy',
          })}
        />
        <meta
          property="og:description"
          content={translate({
            id: 'home.meta.ogDescription',
            message:
              'DIMO powers the session-based economy: it handles vehicle access, telemetry, identity, and consent (SACD) across 50+ brands so you can build apps and businesses.',
          })}
        />
        <meta
          property="og:image"
          content="https://dimo.org/img/dimo-social-card.png"
        />
        <meta property="og:site_name" content="DIMO" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={translate({
            id: 'home.meta.twitterTitle',
            message: 'DIMO | Vehicle Platform for the Session-Based Economy',
          })}
        />
        <meta
          name="twitter:description"
          content={translate({
            id: 'home.meta.twitterDescription',
            message:
              'DIMO powers the session-based economy—rentals, pay-per-use, and mobility services built on real-time vehicle data. Start free.',
          })}
        />
        <meta
          name="twitter:image"
          content="https://dimo.org/img/dimo-social-card.png"
        />

        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="DIMO" />

        {/* Structured Data - Organization */}
        <script type="application/ld+json">
          {JSON.stringify(
            localizeSchema(
              {
                '@context': 'https://schema.org',
                '@type': 'Organization',
                '@id': 'https://dimo.org/#organization',
                name: 'DIMO',
                legalName: 'DIMO Network, Inc.',
                url: 'https://dimo.org/',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://dimo.org/img/dimo-logo.png',
                  width: 640,
                  height: 120,
                },
                description: translate({
                  id: 'home.schema.description',
                  message:
                    'DIMO is the vehicle data infrastructure that powers the session-based economy. It handles vehicle access through a single, permissioned API for real-time telemetry, identity, and owner consent (SACD) across 50+ brands, so developers can build apps and businesses on connected vehicles. The core platform is open source.',
                }),
                foundingDate: '2021',
                sameAs: [
                  'https://github.com/DIMO-Network',
                  'https://x.com/dimo_network',
                  'https://www.linkedin.com/company/dimo-network',
                  'https://www.youtube.com/@dimo_network',
                  'https://medium.com/dimo-network',
                ],
                contactPoint: {
                  '@type': 'ContactPoint',
                  contactType: 'Developer Support',
                  email: 'contact@dimo.org',
                },
              },
              locale,
              path
            )
          )}
        </script>

        {/* Structured Data - SoftwareApplication */}
        <script type="application/ld+json">
          {JSON.stringify(
            localizeSchema(
              {
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                '@id': 'https://dimo.org/#software',
                name: 'DIMO Platform',
                applicationCategory: 'DeveloperApplication',
                operatingSystem: 'Web',
                offers: {
                  '@type': 'Offer',
                  price: '0',
                  priceCurrency: 'USD',
                  availability: 'https://schema.org/OnlineOnly',
                  description: translate({
                    id: 'home.schema.description2',
                    message:
                      'Free tier available with paid plans for advanced features',
                  }),
                },
                publisher: { '@id': 'https://dimo.org/#organization' },
                description: translate({
                  id: 'home.schema.description',
                  message:
                    'DIMO is the vehicle data infrastructure that powers the session-based economy. It handles vehicle access through a single, permissioned API for real-time telemetry, identity, and owner consent (SACD) across 50+ brands, so developers can build apps and businesses on connected vehicles. The core platform is open source.',
                }),
                url: 'https://dimo.org/',
                screenshot: 'https://dimo.org/img/dimo-social-card.png',
                dateModified: '2026-07-06',
                softwareVersion: '3.0',
                applicationSubCategory: 'API Platform',
                featureList: [
                  translate({
                    id: 'home.schema.featureList.worksWithAny',
                    message:
                      'Works with any make (50+ vehicle brands already connected)',
                  }),
                  translate({
                    id: 'home.schema.featureList.aiReadyDataStreams',
                    message: 'AI-ready data streams',
                  }),
                  translate({
                    id: 'home.schema.featureList.privacyPreservingArchitecture',
                    message: 'Privacy-preserving architecture',
                  }),
                  translate({
                    id: 'home.schema.featureList.plugAndPlayHardwareSupport',
                    message: 'Plug-and-play hardware support',
                  }),
                  translate({
                    id: 'home.schema.featureList.openSourceCore',
                    message: 'Open source core',
                  }),
                  translate({
                    id: 'home.schema.featureList.realTimeVehicleTelemetry',
                    message: 'Real-time vehicle telemetry',
                  }),
                  translate({
                    id: 'home.schema.featureList.agenticWorkflowDevelopment',
                    message: 'Agentic workflow development',
                  }),
                ],
              },
              locale,
              path
            )
          )}
        </script>

        {/* Structured Data - WebSite + SearchAction */}
        <script type="application/ld+json">
          {JSON.stringify(
            localizeSchema(
              {
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                '@id': 'https://dimo.org/#website',
                url: 'https://dimo.org/',
                name: 'DIMO Build',
                dateModified: '2026-07-06',
                description: translate({
                  id: 'home.schema.description',
                  message:
                    'DIMO is the vehicle data infrastructure that powers the session-based economy. It handles vehicle access through a single, permissioned API for real-time telemetry, identity, and owner consent (SACD) across 50+ brands, so developers can build apps and businesses on connected vehicles. The core platform is open source.',
                }),
                publisher: { '@id': 'https://dimo.org/#organization' },
                potentialAction: {
                  '@type': 'SearchAction',
                  target: {
                    '@type': 'EntryPoint',
                    urlTemplate:
                      'https://dimo.org/search?q={search_term_string}',
                  },
                  'query-input': 'required name=search_term_string',
                },
              },
              locale,
              path
            )
          )}
        </script>
      </Head>

      <div className={styles.homePage}>
        <CustomNavbar dark={true} />
        <main>
          <HeroSection />
          <FeaturedInSection />
          <WhatIsDimoSection />
          <AutomateOperationsSection />
          <BigFeatureSection />
          <FeaturesGrid />
          <TestimonialsSection />
          <HardwareSection />
          <CTASection />
        </main>

        <FooterTheme />
        <ChatBot />
      </div>
    </>
  );
}
