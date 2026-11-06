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
import Translate, { translate } from '@docusaurus/Translate';

// Asset imports
const imgIconPlugPlay = '/img/icon-plug-play.svg';
const imgIconPrivacyPreserving = '/img/icon-privacy-preserving.svg';
const imgOpenSource = '/img/icon-open-source.svg';
const imgIconSecureCompliant = '/img/icon-secure.svg';
const imgIconUniversalCompatibility = '/img/icon-universal.svg';
const imgIconStarsAI = '/img/icon-ai.svg'; // Used as AI icon
const imgHardware = '/img/dimo_hardware.webp';
const imgDimoAiPlaceholder = '/img/DIMO-Docs.webp';

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

  return { word: words[index], visible };
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
  translate({ id: 'home.rotatingWords.vehicleData', message: 'vehicle data' }),
  translate({
    id: 'home.rotatingWords.sessionBasedEconomy',
    message: 'session-based economy',
  }),
  translate({ id: 'home.rotatingWords.mobility', message: 'mobility' }),
];

function HeroSection() {
  const { word, visible } = useRotatingWord(ROTATING_WORDS);

  return (
    <header className={styles.hero}>
      <div className={styles.heroGrid} />
      <div className={styles.heroGlow} />

      <div className={styles.heroContent}>
        <Link
          className={styles.pill}
          to="https://www.producthunt.com/products/dimo-build?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-dimo"
        >
          <span className={styles.pillNew}>
            <Translate id="home.hero.new">New</Translate>
          </span>
          <span>
            <Translate id="home.hero.checkUsOutOn">
              Check us out on ProductHunt
            </Translate>{' '}
            <span className={styles.arrow}>→</span>
          </span>
        </Link>

        <h1 className={styles.heroTitle}>
          <Translate
            id="home.hero.theInfrastructureBuiltFor"
            values={{
              br: <br />,
              word: (
                <span
                  className={`${styles.rotatingWord} ${
                    visible ? styles.rotatingWordVisible : ''
                  }`}
                >
                  {word}
                </span>
              ),
            }}
          >
            {'The infrastructure built for {br}{word}'}
          </Translate>
        </h1>

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

        {/* Visual / Code Editor */}
        <div className={styles.heroVisual}>
          <div className={styles.codeWindow}>
            <img
              src={imgDimoAiPlaceholder}
              alt="DIMO Docs"
              width={3454}
              height={1970}
              fetchPriority="high"
              decoding="async"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
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

function WhatIsDimoSection() {
  return (
    <section className={styles.answerSection}>
      <div className={styles.answerBlock}>
        <h2>
          <Translate id="home.whatIsDimo.whatIsDimo">What is DIMO?</Translate>
        </h2>
        <p>
          <Translate id="home.whatIsDimo.dimoDigitalInfrastructureFor">
            DIMO (Digital Infrastructure for Moving Objects) is the vehicle data
            infrastructure that powers the session-based economy, where
            vehicles, drivers, and services connect on-demand. DIMO handles
            vehicle access through a single, permissioned API for real-time
            telemetry, vehicle identity, and owner consent (SACD) across 50+
            brands, including Tesla, Ford, BMW, Toyota, and Hyundai, so
            developers can build apps and businesses without negotiating
            separate integrations with each manufacturer. Developers create a
            free account at console.dimo.org, generate API keys, and query live
            vehicle data such as location, battery and fuel level, odometer,
            tire pressure, and diagnostic trouble codes through GraphQL and REST
            endpoints, with official SDKs for TypeScript, Python, and C#.
            Vehicle owners control their data: they grant or revoke access with
            granular, auditable permissions that can activate and expire with
            each session, which keeps applications compliant with GDPR and the
            EU Data Act by default. The platform core is open source, supports
            bring-your-own-device telematics hardware, and the free Hobbyist
            tier lets developers make their first API call in minutes.
          </Translate>
        </p>
        <p>
          <Translate
            id="home.whatIsDimo.startWithTheOverview"
            values={{
              link: (
                <Link to="/connected-car-api">
                  <Translate id="home.whatIsDimo.connectedCarApi">
                    connected car API
                  </Translate>
                </Link>
              ),
              link2: (
                <Link to="/vehicle-data-api">
                  <Translate id="home.whatIsDimo.vehicleDataApi">
                    vehicle data API
                  </Translate>
                </Link>
              ),
              link3: (
                <Link to="/compare/smartcar-alternative">
                  <Translate id="home.whatIsDimo.dimoVsSmartcar">
                    DIMO vs Smartcar
                  </Translate>
                </Link>
              ),
            }}
          >
            {
              'Start with the {link} overview for capabilities, the {link2} page for the signal catalog, or the {link3} comparison if you are evaluating providers.'
            }
          </Translate>
        </p>
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
            <div className={styles.cardGlow} />
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
          <span className={styles.hardwareSubBanner}>DIMO LTE R1</span>
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
                description:
                  'DIMO is the vehicle data infrastructure that powers the session-based economy. It handles vehicle access through a single, permissioned API for real-time telemetry, identity, and owner consent (SACD) across 50+ brands, so developers can build apps and businesses on connected vehicles. The core platform is open source.',
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
                  description:
                    'Free tier available with paid plans for advanced features',
                },
                publisher: { '@id': 'https://dimo.org/#organization' },
                description:
                  'DIMO is the vehicle data infrastructure that powers the session-based economy. It handles vehicle access through a single, permissioned API for real-time telemetry, identity, and owner consent (SACD) across 50+ brands, so developers can build apps and businesses on connected vehicles. The core platform is open source.',
                url: 'https://dimo.org/',
                screenshot: 'https://dimo.org/img/dimo-social-card.png',
                dateModified: '2026-07-06',
                softwareVersion: '3.0',
                applicationSubCategory: 'API Platform',
                featureList: [
                  'Works with any make (50+ vehicle brands already connected)',
                  'AI-ready data streams',
                  'Privacy-preserving architecture',
                  'Plug-and-play hardware support',
                  'Open source core',
                  'Real-time vehicle telemetry',
                  'Agentic workflow development',
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
                description:
                  'DIMO is the vehicle data infrastructure that powers the session-based economy. It handles vehicle access through a single, permissioned API for real-time telemetry, identity, and owner consent (SACD) across 50+ brands, so developers can build apps and businesses on connected vehicles. The core platform is open source.',
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
