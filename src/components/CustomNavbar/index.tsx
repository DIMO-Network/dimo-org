import Link from '@docusaurus/Link';
import { useState } from 'react';
import { LINKS } from '../../links';

import styles from './styles.module.css';

// Asset imports - descriptive names
const imgLogoDimoLight = '/img/dimo-build-logo.svg';
const imgLogoDimoDark = '/img/dimo-build-logo-dark.svg';
const imgGithub = '/img/icon-github.svg';
const imgDune = '/img/icon-dune.svg';
const imgDropdownArrow = '/img/icon-dropdown-arrow.svg';

interface CustomNavbarProps {
  dark?: boolean;
}

export default function CustomNavbar({ dark = false }: CustomNavbarProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const imgLogoDimo = dark ? imgLogoDimoDark : imgLogoDimoLight;

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
    <nav className={`${styles.navbar} ${dark ? styles.navbarDark : ''}`}>
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
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Watch
                </a>
                <a
                  href={LINKS.docs.cheatSheet}
                  className={styles.dropdownItem}
                  target="_blank"
                  rel="noopener noreferrer"
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
                  target="_blank"
                  rel="noopener noreferrer"
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
                  target="_blank"
                  rel="noopener noreferrer"
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
              target="_blank"
              rel="noopener noreferrer"
            >
              Status
            </Link>
          </div>
          <div className={styles.navItem}>
            <a
              href={LINKS.external.github}
              className={styles.navIcon}
              aria-label="GitHub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img alt="GitHub" src={imgGithub} />
            </a>
            <a
              href={LINKS.external.dune}
              className={styles.navIcon}
              aria-label="Dune"
              target="_blank"
              rel="noopener noreferrer"
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
                  <img alt="DIMO" src={imgLogoDimoLight} />
                </div>
              </div>

              <div className={styles.mobileMenuLinks}>
                {/* Learn Section */}
                <div className={styles.mobileMenuSection}>
                  <div className={styles.mobileMenuSectionTitle}>Learn</div>
                  <a
                    href={LINKS.docs.base}
                    className={styles.mobileMenuItem}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMobileMenu}
                  >
                    Read
                  </a>
                  <a
                    href={LINKS.external.dimoUniversity}
                    className={styles.mobileMenuItem}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMobileMenu}
                  >
                    Watch
                  </a>
                  <a
                    href={LINKS.docs.cheatSheet}
                    className={styles.mobileMenuItem}
                    target="_blank"
                    rel="noopener noreferrer"
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
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMobileMenu}
                  >
                    DIMO MCP Server
                  </a>
                  <a
                    href={LINKS.docs.aiAppBuilder}
                    className={styles.mobileMenuItem}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMobileMenu}
                  >
                    AI App Builder
                  </a>
                  <a href={LINKS.external.dimoMobile}
                    className={styles.mobileMenuItem}
                    target="_blank"
                    rel="noopener noreferrer"
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
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMobileMenu}
                  >
                    Developer SDKs
                  </a>
                  <a
                    href={LINKS.docs.lowCodeIntegrations}
                    className={styles.mobileMenuItem}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMobileMenu}
                  >
                    Low Code
                  </a>
                </div>

                {/* Follow Us Section */}
                <div className={styles.mobileMenuSection}>
                  <div className={styles.mobileMenuSectionTitle}>Follow Us</div>
                  <Link
                    href={LINKS.external.status}
                    className={styles.mobileMenuItem}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMobileMenu}
                  >
                    Status
                  </Link>
                  <Link
                    href={LINKS.external.github}
                    className={styles.mobileMenuItem}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMobileMenu}
                  >
                    GitHub
                  </Link>
                   <Link
                    href={LINKS.external.dune}
                    className={styles.mobileMenuItem}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMobileMenu}
                  >
                    Dune
                  </Link>
                </div>

                <div className={styles.mobileMenuActions}>
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
