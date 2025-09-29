import Link from '@docusaurus/Link';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { LINKS } from '../links';

import styles from './index.module.css';
import FooterTheme from '../theme/Footer';

// Asset imports - descriptive names
const imgHeroHighway = '/img/hero-highway-image.png';
const imgLogoDimo = '/img/dimo-build-logo.svg';
const imgGithub = '/img/icon-github.svg';
const imgDune = '/img/icon-dune.svg';
const imgDimoIconBlue = '/img/dimo-build-logo-round.png';
const imgDimoIcon = '/img/dimo-logo-red.png';
const imgDropdownArrow = '/img/icon-dropdown-arrow.svg';
const imgIconPlugPlay = '/img/icon-plug-play.svg';
const imgIconRealTimeData = '/img/icon-real-time-data.svg';
const imgIconPrivacyPreserving = '/img/icon-privacy-preserving.svg';
const imgOpenSource = '/img/icon-open-source.svg';
const imgIconSecureCompliant = '/img/icon-secure.svg';
const imgIconUniversalCompatibility = '/img/icon-universal.svg';
const imgIconStarsAI = '/img/icon-ai.svg';
const imgIconConsentManagement = '/img/icon-consent-management.svg';

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
                <a href="/docs" className={styles.dropdownItem}>
                  Read
                </a>
                <a
                  href={LINKS.external.dimoUniversity}
                  className={styles.dropdownItem}
                  target="blank"
                >
                  Watch
                </a>
                <a
                  href={LINKS.docs.cheatSheet}
                  className={styles.dropdownItem}
                  target="blank"
                >
                  Cheat Sheet
                </a>
              </div>
            )}
          </div>

          {/* AI Dropdown */}
          <div
            className={`${styles.navItem} ${styles.dropdownContainer}`}
            onMouseEnter={() => handleDropdownEnter('ai')}
            onMouseLeave={handleDropdownLeave}
          >
            <div className={styles.dropdownTrigger}>
              <span>AI Use Case</span>
              <img
                alt=""
                src={imgDropdownArrow}
                className={`${styles.dropdownIcon} ${
                  activeDropdown === 'ai' ? styles.rotated : ''
                }`}
              />
            </div>
            {activeDropdown === 'ai' && (
              <div className={styles.dropdownMenu}>
                <a
                  href={LINKS.docs.dimoMcpServer}
                  className={styles.dropdownItem}
                  target="blank"
                >
                  DIMO MCP Server
                </a>
                <a
                  href={LINKS.docs.aiAppBuilder}
                  className={styles.dropdownItem}
                >
                  AI App Builder
                </a>
                <Link
                  href={LINKS.external.dimoMobile}
                  className={styles.dropdownItem}
                  target="blank"
                >
                  DIMO Mobile
                </Link>
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
                  href={LINKS.docs.developerSdk}
                  className={styles.dropdownItem}
                >
                  Developer SDKs
                </a>
                <a
                  href={LINKS.docs.lowCodeIntegrations}
                  className={styles.dropdownItem}
                >
                  Low Code
                </a>
              </div>
            )}
          </div>
          <div className={styles.navItem}>
            <Link
              href={LINKS.external.status}
              className={styles.navItem}
              target="blank"
            >
              Status
            </Link>
          </div>
          <div className={styles.navItem}>
            <Link
              href={LINKS.external.discord}
              className={styles.navItem}
              target="blank"
            >
              Community
            </Link>
          </div>
          <div className={styles.navItem}>
            <a
              href={LINKS.external.github}
              className={styles.navIcon}
              aria-label="GitHub"
              target="blank"
            >
              <img alt="GitHub" src={imgGithub} />
            </a>
            <a
              href={LINKS.external.dune}
              className={styles.navIcon}
              aria-label="Dune"
              target="blank"
            >
              <img alt="Dune" src={imgDune} />
            </a>
          </div>
          <div className={styles.navItem}>
            <Link
              className={styles.signInButtonNav}
              to={LINKS.external.console}
              target="_blank"
            >
              Console
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
                    href={LINKS.docs.base}
                    className={styles.mobileMenuItem}
                    target="blank"
                    onClick={closeMobileMenu}
                  >
                    Read
                  </a>
                  <a
                    href={LINKS.external.dimoUniversity}
                    className={styles.mobileMenuItem}
                    target="blank"
                    onClick={closeMobileMenu}
                  >
                    Watch
                  </a>
                  <a
                    href={LINKS.docs.cheatSheet}
                    className={styles.mobileMenuItem}
                    target="blank"
                    onClick={closeMobileMenu}
                  >
                    Cheat Sheet
                  </a>
                </div>


                {/* AI Section */}
                <div className={styles.mobileMenuSection}>
                  <div className={styles.mobileMenuSectionTitle}>AI Use Case</div>
                  <a
                    href={LINKS.docs.dimoMcpServer}
                    className={styles.mobileMenuItem}
                    target="blank"
                    onClick={closeMobileMenu}
                  >
                    DIMO MCP Server
                  </a>
                  <a
                    href={LINKS.docs.aiAppBuilder}
                    className={styles.mobileMenuItem}
                    target="blank"
                    onClick={closeMobileMenu}
                  >
                    AI App Builder
                  </a>
                  <a href={LINKS.external.dimoMobile}
                    className={styles.mobileMenuItem}
                    target="blank"
                    onClick={closeMobileMenu}
                  >
                    DIMO Mobile
                  </a>
                </div>

                {/* Tools Section */}
                <div className={styles.mobileMenuSection}>
                  <div className={styles.mobileMenuSectionTitle}>Tools</div>
                  <a
                    href={LINKS.docs.developerSdk}
                    className={styles.mobileMenuItem}
                    target="blank"
                    onClick={closeMobileMenu}
                  >
                    Developer SDKs
                  </a>
                  <a
                    href={LINKS.docs.lowCodeIntegrations}
                    className={styles.mobileMenuItem}
                    target="blank"
                    onClick={closeMobileMenu}
                  >
                    Low Code
                  </a>
                </div>

                {/* Status */}
                <div className={styles.mobileMenuSection}>
                  <Link
                    href={LINKS.external.status}
                    className={styles.mobileMenuItem}
                    target="blank"
                    onClick={closeMobileMenu}
                  >
                    Status
                  </Link>
                </div>

                {/* Community */}
                <div className={styles.mobileMenuSection}>
                  <Link
                    href={LINKS.external.discord}
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
                    href={LINKS.external.github}
                    className={styles.mobileMenuGitHub}
                    aria-label="GitHub"
                    target="blank"
                    onClick={closeMobileMenu}
                  >
                    <img alt="GitHub" src={imgGithub} />
                    GitHub
                  </a>
                  <a
                    href={LINKS.external.dune}
                    className={styles.mobileMenuGitHub}
                    aria-label="Dune"
                    target="blank"
                    onClick={closeMobileMenu}
                  >
                    <img alt="Dune" src={imgDune} />
                    Dune
                  </a>
                  <Link
                    className={styles.mobileMenuSignIn}
                    to={LINKS.external.console}
                    target="_blank"
                    onClick={closeMobileMenu}
                  >
                    Console
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
      </div>
      <div className="container">
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            The vehicle data platform that puts privacy first
          </h1>
          <div className={styles.heroButtons}>
            <Link
              className={styles.signInButton}
              to={LINKS.external.console}
            >
              Console
            </Link>
            <Link className={styles.docsButton} to="/docs">
              Read The Docs
            </Link>
          </div>
          
          {/* Badges Container */}
          <div className={styles.badgesContainer}>
            {/* DIMO Mobile Badge */}
            <div className={styles.dimoMobileBadge}>
              <a href={LINKS.external.dimoMobile} target="_blank" className={styles.dimoMobileLink}>
                <div className={styles.dimoMobileContent}>
                  <div className={styles.dimoMobileIcon}>
                    <img src={imgDimoIcon} alt="DIMO Mobile" />
                  </div>
                  <div className={styles.dimoJapanTextContainer}>
                    <div className={styles.dimoJapanSubText}>SIGN UP AS A CONSUMER</div>
                    <div className={styles.dimoJapanMainText}>DIMO Mobile</div>
                  </div>
                </div>
              </a>
            </div>

            {/* Product Hunt Badge */}
            <div className={styles.productHuntBadge}>
              <a href="https://www.producthunt.com/products/dimo-build?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-dimo" target="_blank">
                <img 
                  src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1019734&theme=light&t=1758908398048" 
                  alt="DIMO - The&#0032;vehicle&#0032;data&#0032;platform&#0032;that&#0032;puts&#0032;privacy&#0032;first | Product Hunt" 
                  style={{width: '250px', height: '54px'}}
                />
              </a>
            </div>

            {/* DIMO Japan Badge */}
            <div className={styles.dimoJapanBadge}>
              <a href={LINKS.external.dimoJapan} target="_blank" className={styles.dimoJapanLink}>
                <div className={styles.dimoJapanContent}>
                  <div className={styles.dimoJapanIcon}>
                    <img src={imgDimoIconBlue} alt="DIMO Japan" />
                  </div>
                  <div className={styles.dimoJapanTextContainer}>
                    <div className={styles.dimoJapanSubText}>EXPLORE OUR AFFILIATES</div>
                    <div className={styles.dimoJapanMainText}>DIMO Japan</div>
                  </div>
                </div>
              </a>
            </div>
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
      title: 'Open Source',
      icon: imgOpenSource,
      description:
        'DIMO is built on open-source, either MIT License or Apache License 2.0',
    },
    {
      title: 'Secure + Compliant',
      icon: imgIconSecureCompliant,
      description:
        'DIMO utilizes the immutability of the blockchain while preserving security, ensuring compliance with GPDR and the EU Data Act',
    },
    {
      title: 'Universal Compatibility',
      icon: imgIconUniversalCompatibility,
      description:
        'DIMO works with any data providers, whether you are an OEM, a data service provider, or manufacturers of an aftermarket device',
    },
    {
      title: 'Off-the-shelf Features',
      icon: imgIconConsentManagement,
      description:
        'Consent management, programmable rewards, and universal API are all built-in, off-the-shelf features',
    },
    {
      title: 'Gen-AI & MCP-Ready',
      icon: imgIconStarsAI,
      description:
        'Proven to work with generative AI and MCP servers, DIMO provides the data foundation to build your AI solutions',
      special: true,
    },
  ];

  return (
    <section className={styles.bottomFeatures}>
      <div className="container">
        <div className={styles.featureCards}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureCardContainer}>
              <div className={styles.featureCard}>
                {/* Front side */}
                <div className={styles.featureCardFront}>
                  {feature.icon && (
                    <div className={styles.featureCardIcon}>
                      <img alt="" src={feature.icon} />
                    </div>
                  )}
                  <h4 className={styles.featureCardTitle}>{feature.title}</h4>
                  <div className={styles.featureCardArrow}>→</div>
                </div>
                {/* Back side */}
                <div className={styles.featureCardBack}>
                  <h4 className={styles.featureCardTitleBack}>
                    {feature.title}
                  </h4>
                  <p className={styles.featureCardDescription}>
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WatchHowItWorksSection() {
  return (
    <section className={styles.whyDimo}>
      <div className="container">
        <h2 className={styles.whyDimoTitle}>Watch How It Works</h2>
        <div className={styles.videoContainer}>
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
        <WatchHowItWorksSection />
      </main>

      {/* Footer */}
      <FooterTheme />
    </div>
  );
}