import React, { type ReactNode } from 'react';
import Link from '@docusaurus/Link';
import styles from './index.module.css';
import FooterTheme from '../theme/Footer';
import CustomNavbar from '../components/CustomNavbar';
import { LINKS } from '../links';

// Asset imports
const imgIconPlugPlay = '/img/icon-plug-play.svg';
const imgIconPrivacyPreserving = '/img/icon-privacy-preserving.svg';
const imgOpenSource = '/img/icon-open-source.svg';
const imgIconSecureCompliant = '/img/icon-secure.svg';
const imgIconUniversalCompatibility = '/img/icon-universal.svg';
const imgIconStarsAI = '/img/icon-ai.svg'; // Used as AI icon

// Trusted Logos
const LogoPolygon = '/img/logo-polygon.svg';
const LogoCoinbase = '/img/logo-coinbase.svg';
const LogoStreamr = '/img/logo-streamr.svg';
const LogoStaex = '/img/logo-staex.svg';

function HeroSection() {
  return (
    <header className={styles.hero}>
      <div className={styles.heroGrid} />
      <div className={styles.heroGlow} />

      <div className={styles.heroContent}>
        <div className={styles.pill}>
          <span className={styles.pillNew}>New</span>
          <span>Vehicle webhooks are live now →</span>
        </div>

        <h1 className={styles.heroTitle}>
          The only vehicle intelligence platform that <br />
          <span className={styles.heroTitleSpan}>puts privacy first.</span>
        </h1>

        <p className={styles.heroSubtitle}>
          Connect to thousands of vehicle models with a single open API. Build
          AI-powered applications, verify real-world identity, and access
          telemetry data without the hardware headache.
        </p>

        <div className={styles.heroButtons}>
          <Link className={styles.primaryBtn} to={LINKS.external.console}>
            Start Building
          </Link>
          <Link className={styles.secondaryBtn} to="/docs">
            Read the Docs
          </Link>
        </div>

        {/* Visual / Code Editor */}
        <div className={styles.heroVisual}>
          <div className={styles.codeWindow}>
            <div className={styles.codeHeader}>
              <div className={styles.codeTab}>
                <span className={styles.tsIcon}>TS</span>
                index.ts
              </div>
            </div>
            <div className={styles.codeBody}>
              <div className={styles.lineNumbers}>
                1<br />
                2<br />
                3<br />
                4<br />
                5<br />
                6<br />
                7<br />
                8<br />
                9<br />
                10
                <br />
                11
                <br />
                12
                <br />
                13
                <br />
                14
                <br />
                15
                <br />
                16
                <br />
                17
                <br />
                18
              </div>
              <div className={styles.codeContent}>
                <div className={styles.codeLine}>
                  <span className={styles.tokenKeyword}>import</span>{' '}
                  <span className={styles.tokenOperator}>{`{`}</span>{' '}
                  <span className={styles.tokenType}>DIMO</span>{' '}
                  <span className={styles.tokenOperator}>{`}`}</span>{' '}
                  <span className={styles.tokenKeyword}>from</span>{' '}
                  <span className={styles.tokenString}>
                    '@dimo-network/data-sdk'
                  </span>
                  ;
                </div>
                <br />
                <div className={styles.codeLine}>
                  <span className={styles.tokenComment}>
                    // 1. Initialize the SDK
                  </span>
                </div>
                <div className={styles.codeLine}>
                  <span className={styles.tokenKeyword}>const</span>{' '}
                  <span className={styles.tokenVariable}>dimo</span>{' '}
                  <span className={styles.tokenOperator}>=</span>{' '}
                  <span className={styles.tokenKeyword}>new</span>{' '}
                  <span className={styles.tokenType}>DIMO</span>(
                  <span className={styles.tokenString}>'Production'</span>);
                </div>
                <br />
                <div className={styles.codeLine}>
                  <span className={styles.tokenComment}>
                    // 2. Auth with your Developer License
                  </span>
                </div>
                <div className={styles.codeLine}>
                  <span className={styles.tokenKeyword}>await</span>{' '}
                  <span className={styles.tokenVariable}>dimo</span>.
                  <span className={styles.tokenVariable}>auth</span>.
                  <span className={styles.tokenFunction}>getDeveloperJwt</span>(
                  <span className={styles.tokenOperator}>{`{`}</span>
                </div>
                <div className={styles.codeLine}>
                  &nbsp;&nbsp;
                  <span className={styles.tokenVariable}>clientId</span>:{' '}
                  <span className={styles.tokenVariable}>process</span>.
                  <span className={styles.tokenVariable}>env</span>.
                  <span className={styles.tokenVariable}>DIMO_CLIENT_ID</span>,
                </div>
                <div className={styles.codeLine}>
                  &nbsp;&nbsp;
                  <span className={styles.tokenVariable}>apiKey</span>:{' '}
                  <span className={styles.tokenVariable}>process</span>.
                  <span className={styles.tokenVariable}>env</span>.
                  <span className={styles.tokenVariable}>DIMO_API_KEY</span>,
                </div>
                <div className={styles.codeLine}>
                  <span className={styles.tokenOperator}>{`}`}</span>);
                </div>
                <br />
                <div className={styles.codeLine}>
                  <span className={styles.tokenComment}>
                    // 3. Query real-time vehicle data
                  </span>
                </div>
                <div className={styles.codeLine}>
                  <span className={styles.tokenKeyword}>const</span>{' '}
                  <span className={styles.tokenVariable}>data</span>{' '}
                  <span className={styles.tokenOperator}>=</span>{' '}
                  <span className={styles.tokenKeyword}>await</span>{' '}
                  <span className={styles.tokenVariable}>dimo</span>.
                  <span className={styles.tokenVariable}>telemetry</span>.
                  <span className={styles.tokenFunction}>query</span>(
                  <span className={styles.tokenOperator}>{`{`}</span>
                </div>
                <div className={styles.codeLine}>
                  &nbsp;&nbsp;
                  <span className={styles.tokenVariable}>tokenId</span>:{' '}
                  <span className={styles.tokenNumber}>12345</span>,
                </div>
                <div className={styles.codeLine}>
                  &nbsp;&nbsp;
                  <span className={styles.tokenVariable}>signals</span>: [
                  <span className={styles.tokenString}>'speed'</span>,{' '}
                  <span className={styles.tokenString}>'powertrainRange'</span>,{' '}
                  <span className={styles.tokenString}>'currentLocation'</span>]
                </div>
                <div className={styles.codeLine}>
                  <span className={styles.tokenOperator}>{`}`}</span>);
                </div>
                <br />
                <div className={styles.codeLine}>
                  <span className={styles.tokenVariable}>console</span>.
                  <span className={styles.tokenFunction}>log</span>(
                  <span className={styles.tokenVariable}>data</span>);
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function TrustedBySection() {
  return (
    <section className={styles.trustedBy}>
      <div className="container">
        <div className={styles.trustedByText}>Trusted by Innovators</div>
        <div className={styles.logoMarquee}>
          <img src={LogoPolygon} alt="Polygon" />
          <img src={LogoStreamr} alt="Streamr" />
          <img src={LogoCoinbase} alt="Coinbase" />
          <img src={LogoStaex} alt="Staex" />
        </div>
      </div>
    </section>
  );
}

function FeaturesGrid() {
  const features = [
    {
      title: 'Universal Compatibility',
      desc: 'One API for Tesla, Ford, BMW, and 50+ other OEMs. Forget proprietary dongles and fragmented standards.',
      icon: imgIconUniversalCompatibility,
    },
    {
      title: 'Privacy by Design',
      desc: 'User-owned data architecture. Grant and revoke access with granular permissions built on verifiable credentials.',
      icon: imgIconPrivacyPreserving,
    },
    {
      title: 'AI-Ready Context',
      desc: 'Clean, normalized data streams ready for LLMs and predictive models. Train on real-world driving behavior.',
      icon: imgIconStarsAI,
    },
    {
      title: 'Plug & Play Hardware',
      desc: 'Onboard older vehicles instantly with the DIMO Macaron or AutoPi. Zero-config installation for users.',
      icon: imgIconPlugPlay,
    },
    {
      title: 'Open Source Core',
      desc: 'Built on open protocols. Audit the code, contribute to the network, and own your infrastructure.',
      icon: imgOpenSource,
    },
    {
      title: 'Secure & Compliant',
      desc: 'Enterprise-grade security with GDPR and SOC2 compliance. Your data is safe, your users are protected.',
      icon: imgIconSecureCompliant,
    },
  ];

  return (
    <section className={styles.features}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Everything you need to build</h2>
        <p className={styles.sectionSubtitle}>
          Stop wrestling with OBD-II codes and flaky Bluetooth connections. DIMO
          handles the hard stuff so you can ship features.
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

function BigFeatureSection() {
  return (
    <section className={styles.bigFeature}>
      <div className={styles.featureContainer}>
        <div className={styles.featureText}>
          <h3>Real-time Telemetry at Scale</h3>
          <p>
            Access high-frequency sensor data including GPS, speed, fuel levels,
            battery health, and tire pressure. Stream it directly to your
            application via WebSockets or query via GraphQL.
          </p>
          <ul className={styles.featureList}>
            <li>
              <span className={styles.checkIcon}>✓</span> Sub-second latency
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span> Normalized across
              makes & models
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span> Historical replay
              capability
            </li>
          </ul>
        </div>
        <div className={styles.featureVisual}>
          <div
            style={{
              background:
                'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))',
              height: '300px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'rgba(255,255,255,0.5)',
            }}
          >
            <img
              src="/img/TelemetrySample.png"
              alt="Telematics Architecture"
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                opacity: 0.9,
                borderRadius: '8px',
              }}
            />
          </div>
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

function WallOfLoveSection() {
  return (
    <section className={styles.wallOfLove}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>What devs are saying</h2>
      </div>
      <div
        className="feedspace-embed"
        data-id="217207bd-2013-4903-8545-d7f149fda8a2"
        style={{ maxWidth: '1200px', margin: '0 auto' }}
      ></div>
      <script
        src="https://js.feedspace.io/v1/embed/embed.min.js"
        type="text/javascript"
        async
      ></script>
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
        <TrustedBySection />
        <FeaturesGrid />
        <BigFeatureSection />
        <WatchHowItWorksSection />
        <WallOfLoveSection />
        <CTASection />
      </main>

      <FooterTheme />
    </div>
  );
}
