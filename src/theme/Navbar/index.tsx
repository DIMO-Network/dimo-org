import React, { type ReactNode, useState } from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
import { LINKS } from '../../links';

// Asset imports - descriptive names
const imgLogoDimo = '/img/dimo-build-logo.svg';
const imgGithub = '/img/icon-github.svg';
const imgDune = '/img/icon-dune.svg';
const imgDropdownArrow = '/img/icon-dropdown-arrow.svg';

export default function Navbar(): ReactNode {
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
    <nav
      className={`navbar navbar--fixed-top ${styles.navbar}`}
      role="navigation"
    >
      <div className={`container ${styles.navContent}`}>
        {/* Logo */}
        <div className={styles.navLogo}>
          <Link to="/">
            <img alt="DIMO" src={imgLogoDimo} />
          </Link>
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
                <Link to={LINKS.docs.base} className={styles.dropdownItem}>
                  Read
                </Link>
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
                <Link
                  to={LINKS.docs.dimoMcpServer}
                  className={styles.dropdownItem}
                >
                  DIMO MCP Server
                </Link>
                <Link
                  to={LINKS.docs.aiAppBuilder}
                  className={styles.dropdownItem}
                >
                  AI App Builder
                </Link>
                <a
                  href={LINKS.external.dimoMobile}
                  className={styles.dropdownItem}
                  aria-label="DIMO Mobile"
                  target="blank"
                  onClick={closeMobileMenu}
                >
                  DIMO Mobile
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
                <Link
                  to={LINKS.docs.developerSdk}
                  className={styles.dropdownItem}
                >
                  Developer SDKs
                </Link>
                <Link
                  to={LINKS.docs.lowCodeIntegrations}
                  className={styles.dropdownItem}
                >
                  Low Code
                </Link>
              </div>
            )}
          </div>
          <div className={styles.navItem}>
            <a
              href={LINKS.external.status}
              className={styles.navItem}
              target="blank"
            >
              Status
            </a>
          </div>

          {/* <div className={styles.navItem}>
            <a
              href={LINKS.external.discord}
              className={styles.navItem}
              target="blank"
            >
              Community
            </a>
          </div> */}
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
                  <Link to="/">
                    <img alt="DIMO" src={imgLogoDimo} />
                  </Link>
                </div>
              </div>

              <div className={styles.mobileMenuLinks}>
                {/* Learn Section */}
                <div className={styles.mobileMenuSection}>
                  <div className={styles.mobileMenuSectionTitle}>Learn</div>
                  <Link
                    to={LINKS.docs.base}
                    className={styles.mobileMenuItem}
                    onClick={closeMobileMenu}
                  >
                    Read
                  </Link>
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

                  <Link
                    to={LINKS.docs.dimoMcpServer}
                    className={styles.mobileMenuItem}
                    onClick={closeMobileMenu}
                  >
                    DIMO MCP Server
                  </Link>
                  <Link
                    to={LINKS.docs.aiAppBuilder}
                    className={styles.mobileMenuItem}
                    onClick={closeMobileMenu}
                  >
                    AI App Builder
                  </Link>
                  <a
                    href={LINKS.external.dimoMobile}
                    className={styles.mobileMenuItem}
                    aria-label="DIMO Mobile"
                    target="blank"
                    onClick={closeMobileMenu}
                  >
                    DIMO Mobile
                  </a>
                </div>


                {/* Tools Section */}
                <div className={styles.mobileMenuSection}>
                  <div className={styles.mobileMenuSectionTitle}>Tools</div>
                  <Link
                    to={LINKS.docs.developerSdk}
                    className={styles.mobileMenuItem}
                    onClick={closeMobileMenu}
                  >
                    Developer SDKs
                  </Link>
                  <Link
                    to={LINKS.docs.lowCodeIntegrations}
                    className={styles.mobileMenuItem}
                    onClick={closeMobileMenu}
                  >
                    Low Code
                  </Link>
                </div>
                {/* Status */}
                <div className={styles.mobileMenuSection}>
                  <a
                    href={LINKS.external.status}
                    className={styles.mobileMenuItem}
                    target="blank"
                    onClick={closeMobileMenu}
                  >
                    Status
                  </a>
                </div>
                {/* Community */}
                <div className={styles.mobileMenuSection}>
                  <a
                    href={LINKS.external.discord}
                    className={styles.mobileMenuItem}
                    target="blank"
                    onClick={closeMobileMenu}
                  >
                    Community
                  </a>
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
