import Link from '@docusaurus/Link';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { LINKS } from '../links';

import styles from './index.module.css';

// Asset imports - descriptive names
const imgHeroHighway = '/img/hero-highway-image.png';
const imgLogoDimo = '/img/dimo-build-logo.svg';
const imgGithub = '/img/icon-github.svg';
const imgDune = '/img/icon-dune.svg';
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
              Console
            </Link>
            <Link className={styles.docsButton} to="/docs">
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

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerColumns}>
          {/* Column 1 - Learn More */}
          <div className={styles.footerColumn}>
            <h4 className={styles.footerColumnTitle}>Learn More</h4>
            <ul className={styles.footerLinks}>
              <li>
                <Link to="/docs">Docs</Link>
              </li>
              <li>
                <Link to="https://dimo.co/blogs/the-pit-stop/" target="_blank">
                  Developer Blog
                </Link>
              </li>
              <li>
                <Link to="/docs/category/building-with-tools">
                  Developer SDKs
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2 - Resources */}
          <div className={styles.footerColumn}>
            <h4 className={styles.footerColumnTitle}>Resources</h4>
            <ul className={styles.footerLinks}>
              <li>
                <Link to="https://console.dimo.org/sign-in" target="_blank">
                  DIMO Developer Console
                </Link>
              </li>
              <li>
                <Link
                  to="https://www.youtube.com/watch?v=nktm5m9LhIU"
                  target="_blank"
                >
                  DIMO University
                </Link>
              </li>
              <li>
                <Link
                  to="https://chatgpt.com/g/g-68b72a6088d08191b80a6bd57c0fae3f-dimo-build-gpt"
                  target="_blank"
                >
                  Get Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Icons Row */}
        <div className={styles.footerSocial}>
          <a
            href="https://github.com/DIMO-Network"
            className={styles.socialLink}
            aria-label="GitHub"
            target="_blank"
          >
            <img alt="GitHub" src={imgGithub} />
          </a>
          <a
            href="https://discord.com/invite/dimonetwork"
            className={styles.socialLink}
            aria-label="Discord"
            target="_blank"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
            </svg>
          </a>
          <a
            href="https://twitter.com/dimo_network"
            className={styles.socialLink}
            aria-label="Twitter"
            target="_blank"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        </div>

        {/* Copyright */}
        <div className={styles.footerCopyright}>
          <p>© 2025 DIMO® All rights reserved</p>
        </div>
      </div>
    </footer>
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

      {/* Footer */}
      <Footer />
    </div>
  );
}
