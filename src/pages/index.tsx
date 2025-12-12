import React, { type ReactNode } from 'react';
import Link from '@docusaurus/Link';
import styles from './index.module.css';
import FooterTheme from '../theme/Footer';
import CustomNavbar from '../components/CustomNavbar';
import { LINKS } from '../links';
import { Star } from 'lucide-react';

// Asset imports
const imgIconPlugPlay = '/img/icon-plug-play.svg';
const imgIconPrivacyPreserving = '/img/icon-privacy-preserving.svg';
const imgOpenSource = '/img/icon-open-source.svg';
const imgIconSecureCompliant = '/img/icon-secure.svg';
const imgIconUniversalCompatibility = '/img/icon-universal.svg';
const imgIconStarsAI = '/img/icon-ai.svg'; // Used as AI icon
const imgHardware = '/img/dimo_hardware.webp';
const imgHeroHighway = '/img/hero-highway-image.png';
const imgDimoAi = '/img/dimo_ai.jpg';
const imgDimoAiPlaceholder = '/img/DIMO-Docs.png';

function HeroSection() {
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
          The vehicle intelligence platform that <br />
          puts privacy first.
        </h1>

        <p className={styles.heroSubtitle}>
          Build intelligent vehicle apps that work with any car & any tech
          stack. Ship faster with DIMO AI—no rewrites, no migrations, just
          results.
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
      desc: 'DIMO utilizes the immutability of the blockchain while preserving security, ensuring compliance with GPDR and the EU Data Act.',
      icon: imgIconSecureCompliant,
    },
  ];

  return (
    <section className={styles.features}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Everything you need to build</h2>
        <p className={styles.sectionSubtitle}>
          DIMO can be used with pre-built, templated agents that work with your
          existing data, or can be used alongside custom-built agents. Our
          flexible infrasture provides you with everything you need to build
          agentic applications for vehicle services.
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
          <h3>Automate your operations like never before</h3>
          <p>
            DIMO's platform lets you transform your operations by automating
            your existing workflows with vehicle agents with memory built
            in—delivering polished, personalized customer experiences while
            maximizing efficiency. DIMO is perfect for strealining operations
            in:
          </p>
          <ul className={styles.featureList}>
            <li>
              <span className={styles.checkIcon}>✓</span> Maintenance
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span> Rentals & Returns
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span> Repairs
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span> Booking and Scheduling
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span> And more!
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
          <h3>Got Data? Bring It.</h3>
          <p>
            DIMO's intelligent vehicle agents work with your existing data and
            tech stack — just feed your data into our{' '}
            <a href="https://github.com/DIMO-Network/dis">DIMO Ingest Server</a>
            . We've built the agents that understand your data so that you can
            focus on building what matters: features that delight your users and
            drive your business forward.
          </p>
          <ul className={styles.featureList}>
            <li>
              <span className={styles.checkIcon}>✓</span> Works with your
              existing infrastructure
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span> Seamless integration,
              zero disruption
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span> Focus on your product,
              not data plumbing
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

function WatchHowItWorksSection() {
  return (
    <section className={styles.videoSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>How It Works</h2>
        </div>
        <div className={styles.videoWrapper}>
          <iframe
            src="https://www.youtube.com/embed/swdRxufYB3A"
            title="DIMO - How It Works"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  {
    name: 'Maximiliano Ipinza',
    text: 'Just love it. we are starting building with this kit and its get easier and easier. actually we are using DIMO in LATAM and we get all the data via API into our own telematic solution. another thing that really make integrations easier is the level of support with James team and the delivery.',
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
    text: "I've built several apps on DIMO. Incredibly easy. As a non-dev, I've been able to launch things that really truly work with Replit, n8n, and Bubble. The documentation is clear and the platform works as advertised. Way easier to get started than others! Perhaps I'm bit biased... but who cares! It's great.",
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
        <h2 className={styles.ctaTitle}>Ready to launch?</h2>
        <p className={styles.ctaText}>
          Join thousands of developers building the next generation of mobility
          apps. Get your API keys today.
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
    <div className={styles.homePage}>
      <CustomNavbar dark={true} />

      <main>
        <HeroSection />
        <AutomateOperationsSection />
        <BigFeatureSection />
        <FeaturesGrid />
        <WatchHowItWorksSection />
        <TestimonialsSection />
        <HardwareSection />
        <CTASection />
      </main>

      <FooterTheme />
    </div>
  );
}
