import Link from '@docusaurus/Link';
import type { ReactNode } from 'react';
import { useState } from 'react';

import styles from './index.module.css';

// Asset imports - descriptive names
const imgHeroHighway = '/img/hero-highway-image.png';
const imgLogoDimo = '/img/dimo-build-logo.svg';
const imgGithub = '/img/icon-github.svg';
const imgDropdownArrow = '/img/icon-dropdown-arrow.svg';
const imgIconPlugPlay = '/img/icon-plug-play.svg';
const imgIconRealTimeData = '/img/icon-real-time-data.svg';
const imgIconPrivacyPreserving = '/img/icon-privacy-preserving.svg';
const imgOpenSource = '/img/icon-open-source.svg';
const imgIconSecureCompliant = '/img/icon-secure.svg';
const imgIconUniversalCompatibility = '/img/icon-universal.svg';
const imgIconStarsAI = '/img/icon-ai.svg';
const imgIconConsentManagement = '/img/icon-consent-management.svg';
const imgLogoCoinbase = '/img/logo-coinbase.svg';
const imgLogoPolygon = '/img/logo-polygon.svg';
const imgLogoStreamr = '/img/logo-streamr.svg';
const imgLogoStaex = '/img/logo-staex.svg';

function CustomNavbar() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleDropdownEnter = (dropdown: string) => {
    setActiveDropdown(dropdown);
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContent}>
        {/* Logo */}
        <div className={styles.navLogo}>
          <img alt="DIMO" src={imgLogoDimo} />
        </div>

        {/* Hamburger Menu Button */}
        <button
          className={styles.hamburger}
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
        >
          <span
            className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.hamburgerLineActive : ''}`}
          ></span>
          <span
            className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.hamburgerLineActive : ''}`}
          ></span>
          <span
            className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.hamburgerLineActive : ''}`}
          ></span>
        </button>

        {/* Navigation Links */}
        <div className={styles.navLinks}>
          {/* Learn Dropdown */}
          <div
            className={`${styles.navItem} ${styles.dropdownContainer}`}
            onMouseEnter={() => handleDropdownEnter('learn')}
            onMouseLeave={handleDropdownLeave}
          >
            <div className={styles.dropdownTrigger}>
              <span>Learn</span>
              <img
                alt=""
                src={imgDropdownArrow}
                className={`${styles.dropdownIcon} ${
                  activeDropdown === 'learn' ? styles.rotated : ''
                }`}
              />
            </div>
            {activeDropdown === 'learn' && (
              <div className={styles.dropdownMenu}>
                <a
                  href="https://docs.dimo.org/developer-platform"
                  className={styles.dropdownItem}
                  target="blank"
                >
                  Read
                </a>
                <a
                  href="https://youtu.be/nktm5m9LhIU"
                  className={styles.dropdownItem}
                  target="blank"
                >
                  Watch
                </a>
                <a
                  href="https://1352636538-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fxj7jMSjVBtR92AFN0SNC%2Fuploads%2FDcDoks4W5cbWrkVG6G37%2FDIMO%20Cheat%20Sheet.png?alt=media&token=d8028035-d25f-4709-b9ca-30a650602106"
                  className={styles.dropdownItem}
                  target="blank"
                >
                  Cheat Sheet
                </a>
              </div>
            )}
          </div>

          {/* Tools Dropdown */}
          <div
            className={`${styles.navItem} ${styles.dropdownContainer}`}
            onMouseEnter={() => handleDropdownEnter('tools')}
            onMouseLeave={handleDropdownLeave}
          >
            <div className={styles.dropdownTrigger}>
              <span>Tools</span>
              <img
                alt=""
                src={imgDropdownArrow}
                className={`${styles.dropdownIcon} ${
                  activeDropdown === 'tools' ? styles.rotated : ''
                }`}
              />
            </div>
            {activeDropdown === 'tools' && (
              <div className={styles.dropdownMenu}>
                <a
                  href="https://docs.dimo.org/developer-platform/developer-guide/developer-suite/dimo-developer-sdks"
                  className={styles.dropdownItem}
                  target="blank"
                >
                  Developer SDKs
                </a>
                <a
                  href="https://docs.dimo.org/developer-platform/developer-guide/developer-suite/low-code-tools"
                  className={styles.dropdownItem}
                  target="blank"
                >
                  Low Code
                </a>
                <a
                  href="https://github.com/DIMO-Network/dimo-developer-kit"
                  className={styles.dropdownItem}
                  target="blank"
                >
                  AI Examples
                </a>
              </div>
            )}
          </div>

          <div className={styles.navItem}>
            <Link
              href="https://discord.com/invite/dimonetwork"
              className={styles.navItem}
              target="blank"
            >
              Community
            </Link>
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
              Sign In
            </Link>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className={styles.mobileMenuOverlay}>
            <div className={styles.mobileMenuContent}>
              <div className={styles.mobileMenuHeader}>
                <div className={styles.mobileMenuLogo}>
                  <img alt="DIMO" src={imgLogoDimo} />
                </div>
              </div>

              <div className={styles.mobileMenuLinks}>
                {/* Learn Section */}
                <div className={styles.mobileMenuSection}>
                  <div className={styles.mobileMenuSectionTitle}>Learn</div>
                  <a
                    href="https://docs.dimo.org/developer-platform"
                    className={styles.mobileMenuItem}
                    target="blank"
                    onClick={closeMobileMenu}
                  >
                    Read
                  </a>
                  <a
                    href="https://youtu.be/nktm5m9LhIU"
                    className={styles.mobileMenuItem}
                    target="blank"
                    onClick={closeMobileMenu}
                  >
                    Watch
                  </a>
                  <a
                    href="https://1352636538-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fxj7jMSjVBtR92AFN0SNC%2Fuploads%2FDcDoks4W5cbWrkVG6G37%2FDIMO%20Cheat%20Sheet.png?alt=media&token=d8028035-d25f-4709-b9ca-30a650602106"
                    className={styles.mobileMenuItem}
                    target="blank"
                    onClick={closeMobileMenu}
                  >
                    Cheat Sheet
                  </a>
                </div>

                {/* Tools Section */}
                <div className={styles.mobileMenuSection}>
                  <div className={styles.mobileMenuSectionTitle}>Tools</div>
                  <a
                    href="https://docs.dimo.org/developer-platform/developer-guide/developer-suite/dimo-developer-sdks"
                    className={styles.mobileMenuItem}
                    target="blank"
                    onClick={closeMobileMenu}
                  >
                    Developer SDKs
                  </a>
                  <a
                    href="https://docs.dimo.org/developer-platform/developer-guide/developer-suite/low-code-tools"
                    className={styles.mobileMenuItem}
                    target="blank"
                    onClick={closeMobileMenu}
                  >
                    Low Code
                  </a>
                  <a
                    href="https://github.com/DIMO-Network/dimo-developer-kit"
                    className={styles.mobileMenuItem}
                    target="blank"
                    onClick={closeMobileMenu}
                  >
                    AI Examples
                  </a>
                </div>

                {/* Community */}
                <div className={styles.mobileMenuSection}>
                  <Link
                    href="https://discord.com/invite/dimonetwork"
                    className={styles.mobileMenuItem}
                    target="blank"
                    onClick={closeMobileMenu}
                  >
                    Community
                  </Link>
                </div>

                {/* GitHub and Sign In */}
                <div className={styles.mobileMenuActions}>
                  <a
                    href="https://github.com/DIMO-Network"
                    className={styles.mobileMenuGitHub}
                    aria-label="GitHub"
                    target="blank"
                    onClick={closeMobileMenu}
                  >
                    <img alt="GitHub" src={imgGithub} />
                    GitHub
                  </a>
                  <Link
                    className={styles.mobileMenuSignIn}
                    to="https://console.dimo.org/sign-in"
                    target="_blank"
                    onClick={closeMobileMenu}
                  >
                    Sign in
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
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
        <div className={styles.heroOverlay}>
          <div className={styles.trustedByContent}>
            <span className={styles.trustedByText}>TRUSTED BY</span>
            <div className={styles.trustedByLogos}>
              <img alt="Coinbase" src={imgLogoCoinbase} />
              <img
                alt="Polygon"
                src={imgLogoPolygon}
                className={styles.polygonLogo}
              />
              <img
                id="Streamr"
                alt="Streamr"
                src={imgLogoStreamr}
                className={styles.streamrLogo}
              />
              <img
                alt="Staex"
                src={imgLogoStaex}
                className={styles.staexLogo}
              />
            </div>
          </div>
        </div>
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
              Sign In
            </Link>
            <Link
              className={styles.docsButton}
              to="https://docs.dimo.org/developer-platform"
            >
              Read The Docs
            </Link>
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
            <h3 className={styles.featureTitle}>Plug & Play</h3>
            <p className={styles.featureDescription}>
              Built to scale, AI-ready API and developer infrastructure
            </p>
          </div>

          <div className={styles.feature}>
            <div className={styles.featureIcon}>
              <img
                alt=""
                src={imgIconPrivacyPreserving}
                className={styles.largerIcon}
              />
            </div>
            <h3 className={styles.featureTitle}>Privacy Preserving</h3>
            <p className={styles.featureDescription}>
              Connect to vehicles while maintaining user privacy and onboard app
              developers while honoring OEM agreements
            </p>
          </div>

          <div className={styles.feature}>
            <div className={styles.featureIcon}>
              <img
                alt=""
                src={imgIconRealTimeData}
                className={styles.largerIcon}
              />
            </div>
            <h3 className={styles.featureTitle}>Real-time Data</h3>
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
      icon: imgOpenSource,
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
      <main>
        <WhyDimoSection />
        <BottomFeaturesSection />
      </main>
    </div>
  );
}
