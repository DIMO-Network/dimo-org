import React, { type ReactNode, useState, useEffect } from 'react';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import styles from './index.module.css';
import FooterTheme from '../theme/Footer';
import CustomNavbar from '../components/CustomNavbar';
import { LINKS } from '../links';
import { Star } from 'lucide-react';
import ChatBot from '../components/ChatBot/ChatBot';

// Asset imports
const imgIconPlugPlay = '/img/icon-plug-play.svg';
const imgIconPrivacyPreserving = '/img/icon-privacy-preserving.svg';
const imgOpenSource = '/img/icon-open-source.svg';
const imgIconSecureCompliant = '/img/icon-secure.svg';
const imgIconUniversalCompatibility = '/img/icon-universal.svg';
const imgIconStarsAI = '/img/icon-ai.svg'; // Used as AI icon
const imgHardware = '/img/dimo_hardware.webp';
const imgHeroHighway = '/img/dimo-pixel-car.gif';
const imgDimoAi = '/img/dimo-pathways.gif';
const imgDimoAiPlaceholder = '/img/DIMO-Docs.png';

// Typewriter hook for rotating words
function useTypewriter(words: string[], typingSpeed = 100, deletingSpeed = 50, pauseTime = 3000) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];

    if (isPaused) {
      const pauseTimeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseTime);
      return () => clearTimeout(pauseTimeout);
    }

    if (isDeleting) {
      if (currentText === '') {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      } else {
        const timeout = setTimeout(() => {
          setCurrentText(currentWord.substring(0, currentText.length - 1));
        }, deletingSpeed);
        return () => clearTimeout(timeout);
      }
    } else {
      if (currentText === currentWord) {
        setIsPaused(true);
      } else {
        const timeout = setTimeout(() => {
          setCurrentText(currentWord.substring(0, currentText.length + 1));
        }, typingSpeed);
        return () => clearTimeout(timeout);
      }
    }
  }, [currentText, currentWordIndex, isDeleting, isPaused, words, typingSpeed, deletingSpeed, pauseTime]);

  return currentText;
}

function HeroSection() {
  const rotatingWord = useTypewriter(['session-based economy', 'mobility', 'vehicle data'], 100, 50, 3000);

  return (
    <header className={styles.hero}>
      <div className={styles.heroGrid} />
      <div className={styles.heroGlow} />

      <div className={styles.heroContent}>
        <Link
          className={styles.pill}
          to="https://www.producthunt.com/products/dimo-build?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-dimo"
        >
          <span className={styles.pillNew}>New</span>
          <span>
            Check us out on ProductHunt <span className={styles.arrow}>→</span>
          </span>
        </Link>

        <h1 className={styles.heroTitle}>
          The infrastructure built for <br />
          {rotatingWord}<span className={styles.typewriterCursor}>|</span>
        </h1>

        <p className={styles.heroSubtitle}>
          DIMO is building the infrastructure for the session-based economy—where
          vehicles, drivers, and services connect on-demand. Build apps that unlock
          value across every trip, rental, and interaction.
        </p>

        <div className={styles.heroButtons}>
          <Link className={styles.primaryBtn} to={LINKS.external.console}>
            Sign Up <span className={styles.arrow}>→</span>
          </Link>
          <Link className={styles.secondaryBtn} to="/docs">
            Read the Docs <span className={styles.arrow}>→</span>
          </Link>
        </div>

        {/* Visual / Code Editor */}
        <div className={styles.heroVisual}>
          <div className={styles.codeWindow}>
            <img
              src={imgDimoAiPlaceholder}
              alt="DIMO Docs"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

function FeaturesGrid() {
  const features = [
    {
      title: 'Universal Compatibility',
      desc: 'Open APIs for Tesla, Ford, BMW, and 50+ other OEMs, with new vehicle signals decoded almost daily.',
      icon: imgIconUniversalCompatibility,
    },
    {
      title: 'Privacy by Design',
      desc: 'User-owned data architecture. Grant and revoke access with granular permissions built on verifiable credentials.',
      icon: imgIconPrivacyPreserving,
    },
    {
      title: 'AI-Ready Context',
      desc: 'Clean, normalized data streams ready for developing agentic workflows. ',
      icon: imgIconStarsAI,
    },
    {
      title: 'Plug & Play Hardware',
      desc: 'Onboard vehicles instantly with optional hardware like the DIMO LTE R1. Zero-config installation for users.',
      icon: imgIconPlugPlay,
    },
    {
      title: 'Open Source Core',
      desc: 'Built on open protocols. Audit the code, contribute to the network, and own your infrastructure.',
      icon: imgOpenSource,
    },
    {
      title: 'Secure & Compliant',
      desc: 'DIMO utilizes the immutability of the blockchain while preserving security, ensuring compliance with GDPR and the EU Data Act.',
      icon: imgIconSecureCompliant,
    },
  ];

  return (
    <section className={styles.features}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Built for the session-based economy</h2>
        <p className={styles.sectionSubtitle}>
          The future of mobility is sessions—not ownership. DIMO gives you the
          primitives to build services that activate at the start of a trip and
          settle when it ends: data consent, real-time telemetry, payments, and
          AI-driven automation—all in one platform.
        </p>
      </div>

      <div className={styles.bentoGrid}>
        {features.map((f, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.cardGlow} />
            <div className={styles.cardIcon}>
              <img src={f.icon} alt="" />
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
          <img src={imgDimoAi} alt="Automate Operations" />
        </div>
        <div className={styles.featureText}>
          <h3>Power every session, end to end</h3>
          <p>
            From the moment a driver unlocks a vehicle to the instant they hand
            it back, DIMO orchestrates the entire session lifecycle. Automate
            workflows with AI agents that carry context across every interaction—
            so your team focuses on growth, not ops. Perfect for:
          </p>
          <ul className={styles.featureList}>
            <li>
              <span className={styles.checkIcon}>✓</span> Rentals & Fleet Turnover
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span> Pay-Per-Use & Subscription Services
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span> Session-Based Insurance & Risk
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span> Booking, Check-in & Returns
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span> Maintenance Triggered by Usage
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
          <h3>Connect any vehicle. Start any session.</h3>
          <p>
            The session-based economy runs on real-time vehicle data. DIMO
            connects to 50+ OEMs out of the box—or ingest your own data via the{' '}
            <a href="https://github.com/DIMO-Network/dis">DIMO Ingest Server</a>
            . Every session gets a verified identity, live telemetry, and
            user-controlled consent so you can charge, insure, and serve drivers
            with confidence.
          </p>
          <ul className={styles.featureList}>
            <li>
              <span className={styles.checkIcon}>✓</span> Verified vehicle &
              driver identity per session
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span> Real-time telemetry
              from ignition to park
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span> Granular consent that
              activates and expires with each session
            </li>
          </ul>
        </div>
        <div className={styles.featureVisual}>
          <img src={imgHeroHighway} alt="Telematics Architecture" />
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  {
    name: 'Maximiliano Ipinza',
    text: "Just love it. we are starting building with this kit and it's getting easier and easier. actually we are using DIMO in LATAM and we get all the data via API into our own telematics solution. another thing that really makes integrations easier is the level of support with James team and the delivery.",
  },
  {
    name: 'Collin McCloskey',
    text: "The DIMO team has done a phenomenal job making it easy to build on their platform. When I have questions I use their GPT. When I'm writing code with CC or cursor, I copy the docs in one click. Their team is quick to support and they ship faster than I can keep up. It's honestly a really pleasant experience!",
  },
  {
    name: 'Daniel Wedding',
    text: 'As an avid EV consumer and software engineer, DIMO provided a platform that not only allowed personal insight into the vehicle metrics I was looking for, but also integrated an easy-to-use developer API so I could integrate everything flawlessly into my tech stack.',
  },
  {
    name: 'Rob Solomon',
    text: "I've built several apps on DIMO. Incredibly easy. As a non-dev, I've been able to launch things that really truly work with Replit, n8n, and Bubble. The documentation is clear and the platform works as advertised. Way easier to get started than others! Perhaps I'm a bit biased... but who cares! It's great.",
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
        <h2 className={styles.sectionTitle}>What devs are saying</h2>
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
          <h2 className={styles.hardwareTitle}>Compatible Hardware</h2>
          <p className={styles.hardwareDescription}>
            Access high-frequency vehicle data with the DIMO LTE R1. It installs
            in seconds, works with almost any car, and streams data directly to
            the network.
          </p>
          <div className={styles.hardwareButtons}>
            <Link
              className={styles.primaryBtn}
              to="https://dimo.co/products/dimo-lte-r1"
            >
              Buy DIMO LTE R1
            </Link>
            <div className={styles.hardwareCustomIntegration}>
              <span className={styles.hardwareCustomText}>
                Need a custom hardware integration?
              </span>
              <Link
                className={styles.secondaryBtn}
                to="mailto:developer-support@dimo.org"
              >
                Let's Chat
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.hardwareVisual}>
          <img src={imgHardware} alt="DIMO LTE R1" />
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.ctaContent}>
        <h2 className={styles.ctaTitle}>Ready to build for sessions?</h2>
        <p className={styles.ctaText}>
          Join developers building the next generation of session-based mobility
          services. Get your API keys and ship your first session today.
        </p>
        <div
          className={styles.heroButtons}
          style={{ justifyContent: 'center' }}
        >
          <Link className={styles.primaryBtn} to={LINKS.external.console}>
            Get API Keys
          </Link>
          <Link
            className={styles.secondaryBtn}
            to="https://discord.gg/dimonetwork"
          >
            Join Discord
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>DIMO | Vehicle Platform for the Session-Based Economy</title>
        <meta name="title" content="DIMO | Vehicle Platform for the Session-Based Economy" />
        <meta
          name="description"
          content="DIMO is building the infrastructure for the session-based economy. Power rentals, pay-per-use, and mobility services with real-time vehicle data, session consent, and AI automation across 50+ OEMs."
        />
        <meta
          name="keywords"
          content="session-based economy, vehicle data API, connected car platform, automotive developer platform, vehicle intelligence, car API, telematics API, OEM API, mobility as a service, vehicle SDK, DIMO"
        />

        {/* Canonical URL */}
        <link rel="canonical" href="https://www.dimo.org/" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.dimo.org/" />
        <meta property="og:title" content="DIMO | Vehicle Platform for the Session-Based Economy" />
        <meta
          property="og:description"
          content="DIMO is building the infrastructure for the session-based economy. Power rentals, pay-per-use, and mobility services with real-time vehicle data, session consent, and AI automation across 50+ OEMs."
        />
        <meta property="og:image" content="https://www.dimo.org/img/dimo-social-card.png" />
        <meta property="og:site_name" content="DIMO" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.dimo.org/" />
        <meta name="twitter:title" content="DIMO | Vehicle Platform for the Session-Based Economy" />
        <meta
          name="twitter:description"
          content="DIMO powers the session-based economy—rentals, pay-per-use, and mobility services built on real-time vehicle data. Start free."
        />
        <meta name="twitter:image" content="https://www.dimo.org/img/dimo-social-card.png" />

        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="author" content="DIMO" />

        {/* Structured Data - Organization */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "DIMO",
            "url": "https://www.dimo.org",
            "logo": "https://www.dimo.org/img/dimo-build-logo-dark.svg",
            "description": "Developer platform for connected vehicle data and intelligent vehicle applications",
            "foundingDate": "2021",
            "sameAs": [
              "https://github.com/DIMO-Network",
              "https://twitter.com/dimo_network",
              "https://discord.gg/dimonetwork"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "Developer Support",
              "email": "developer-support@dimo.org"
            }
          })}
        </script>

        {/* Structured Data - SoftwareApplication */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "DIMO Platform",
            "applicationCategory": "DeveloperApplication",
            "operatingSystem": "Cross-platform",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD",
              "description": "Free tier available with paid plans for advanced features"
            },
            "description": "Vehicle intelligence platform that enables developers to build apps with real-time data from 50+ automotive OEMs",
            "url": "https://www.dimo.org",
            "screenshot": "https://www.dimo.org/img/dimo-social-card.png",
            "softwareVersion": "3.0",
            "applicationSubCategory": "API Platform",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5",
              "ratingCount": "4",
              "reviewCount": "4"
            },
            "featureList": [
              "Universal OEM compatibility (50+ manufacturers)",
              "AI-ready data streams",
              "Privacy-preserving architecture",
              "Plug-and-play hardware support",
              "Open source core",
              "Real-time vehicle telemetry",
              "Agentic workflow development"
            ]
          })}
        </script>
      </Head>

      <div className={styles.homePage}>
        <CustomNavbar dark={true} />
        <main>
          <HeroSection />
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
