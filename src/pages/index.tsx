import Link from '@docusaurus/Link';
import type { ReactNode } from 'react';

import styles from './index.module.css';

// Asset imports - descriptive names
const imgHeroHighway = '/img/hero-highway-image.png';
const imgLogoDimo = '/img/dimo-build-logo.svg';
const imgGithub = '/img/icon-github.svg';
const imgDropdownArrow = '/img/icon-dropdown-arrow.svg';
const imgIconPlugPlay = '/img/icon-plug-play.svg';
const imgIconRealTimeData = '/img/icon-real-time-data.svg';
const imgIconPrivacyPreserving = '/img/icon-privacy-preserving.svg';
const imgIconSecureCompliant = '/img/icon-secure-compliant.svg';
const imgIconUniversalCompatibility = '/img/icon-universal-compatibility.svg';
const imgIconStarsAI = '/img/icon-stars-ai.svg';
const imgIconConsentManagement = '/img/icon-consent-management.svg';
const imgLogoCoinbase = '/img/logo-coinbase.svg';
const imgLogoPolygon = '/img/logo-polygon.svg';
const imgLogoStreamr = '/img/logo-streamr.svg';
const imgLogoStaex = '/img/logo-staex.svg';

function CustomNavbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContent}>
        {/* Logo */}
        <div className={styles.navLogo}>
          <img alt="DIMO" src={imgLogoDimo} />
        </div>

        {/* Navigation Links */}
        <div className={styles.navLinks}>
          <div className={styles.navItem}>
            <span>Learn</span>
            <img
              alt=""
              src={imgDropdownArrow}
              className={styles.dropdownIcon}
            />
          </div>
          <div className={styles.navItem}>
            <span>Tools</span>
            <img
              alt=""
              src={imgDropdownArrow}
              className={styles.dropdownIcon}
            />
          </div>
          <div className={styles.navItem}>
            <span>Community</span>
          </div>
          <div className={styles.navItem}>
            <a
              href="https://github.com/DIMO-Network"
              className={styles.githubLink}
              aria-label="GitHub"
              target="blank"
            >
              <img alt="GitHub" src={imgGithub} />
            </a>
          </div>
          <div className={styles.navItem}>
            <Link
              className={styles.signInButtonNav}
              to="https://console.dimo.org/sign-in"
              target="_blank"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroBackground}>
        <div className={styles.heroBackgroundImage}>
          <img alt="" src={imgHeroHighway} />
        </div>
        <div className={styles.heroOverlay} />
      </div>
      <div className="container">
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            The vehicle data platform that puts privacy first
          </h1>
          <div className={styles.heroButtons}>
            <Link
              className={styles.signInButton}
              to="https://console.dimo.org/sign-in"
            >
              Sign in
            </Link>
            <Link
              className={styles.docsButton}
              to="https://docs.dimo.org/developer-platform"
            >
              See documentation
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustedBySection() {
  return (
    <section className={styles.trustedBy}>
      <div className="container">
        <div className={styles.trustedByContent}>
          <span className={styles.trustedByText}>TRUSTED BY</span>
          <div className={styles.trustedByLogos}>
            <img alt="Coinbase" src={imgLogoCoinbase} />
            <img alt="Polygon" src={imgLogoPolygon} />
            <img alt="Streamr" src={imgLogoStreamr} />
            <img alt="Staex" src={imgLogoStaex} />
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyDimoSection() {
  return (
    <section className={styles.whyDimo}>
      <div className="container">
        <h2 className={styles.whyDimoTitle}>Why DIMO?</h2>
        <p className={styles.whyDimoSubtitle}>
          DIMO lets you tap into $100B+ with real-time telemetry and connected
          services
        </p>

        <div className={styles.featuresGrid}>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>
              <img alt="" src={imgIconPlugPlay} />
            </div>
            <h3 className={styles.featureTitle}>Plug & play</h3>
            <p className={styles.featureDescription}>
              Built to scale, AI-ready API and developer infrastructure
            </p>
          </div>

          <div className={styles.feature}>
            <div className={styles.featureIcon}>
              <img alt="" src={imgIconPrivacyPreserving} />
            </div>
            <h3 className={styles.featureTitle}>Privacy preserving</h3>
            <p className={styles.featureDescription}>
              Connect to vehicles while maintaining user privacy and onboard app
              developers while honoring OEM agreements
            </p>
          </div>

          <div className={styles.feature}>
            <div className={styles.featureIcon}>
              <img alt="" src={imgIconRealTimeData} />
            </div>
            <h3 className={styles.featureTitle}>Real-time data</h3>
            <p className={styles.featureDescription}>
              Be a data source, host, and/or consumer of real-time vehicle data
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function BottomFeaturesSection() {
  const features = [
    {
      title: 'Open source',
      icon: null,
    },
    {
      title: 'Secure + compliant',
      icon: imgIconSecureCompliant,
    },
    {
      title: 'Universal compatibility',
      icon: imgIconUniversalCompatibility,
    },
    {
      title: 'Consent management off-the-shelf',
      icon: imgIconConsentManagement,
    },
    {
      title: 'Gen-AI & MCP-ready',
      icon: imgIconStarsAI,
      special: true,
    },
  ];

  return (
    <section className={styles.bottomFeatures}>
      <div className="container">
        <div className={styles.featureCards}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              {feature.icon && (
                <div className={styles.featureCardIcon}>
                  <img alt="" src={feature.icon} />
                </div>
              )}
              <h4 className={styles.featureCardTitle}>{feature.title}</h4>
              <div className={styles.featureCardArrow}>→</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  return (
    <div className={styles.homePage}>
      {/* Custom Navigation */}
      <CustomNavbar />

      {/* Page Content */}
      <HeroSection />
      <TrustedBySection />
      <main>
        <WhyDimoSection />
        <BottomFeaturesSection />
      </main>
    </div>
  );
}
