import Link from '@docusaurus/Link';
import { useState } from 'react';
import { LINKS } from '../../links';

import styles from './styles.module.css';

// Asset imports - descriptive names
const imgLogoDimoLight = '/img/dimo-build-logo.svg';
const imgLogoDimoDark = '/img/dimo-build-logo-dark.svg';
const imgGithub = '/img/icon-github.svg';
const imgDune = '/img/icon-dune.svg';
const imgDropdownArrow = '/img/icon-dropdown-arrow.svg'; // Kept for mobile menu if needed, though we are simplifying

interface CustomNavbarProps {
  dark?: boolean;
}

export default function CustomNavbar({ dark = false }: CustomNavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const imgLogoDimo = dark ? imgLogoDimoDark : imgLogoDimoLight;

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
        <Link to="/" className={styles.navLogo}>
          <img alt="DIMO" src={imgLogoDimo} />
        </Link>

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

        {/* Navigation Links (Desktop) */}
        <div className={styles.navLinks}>
          <Link to="/docs" className={styles.navItem}>
            Documentation
          </Link>

          {/* Temporarily hidden until Agent SDK is ready */}
          {/* <Link to="/docs/build/building-with-tools/agent-sdk" className={styles.navItem}>
            Build an Agent
          </Link> */}

          <Link to="/pricing" className={styles.navItem}>
            Pricing
          </Link>

          <Link
            to={LINKS.external.status}
            className={styles.navItem}
            target="_blank"
            rel="noopener noreferrer"
          >
            Status
          </Link>

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
                <Link
                  to="/docs"
                  className={styles.mobileMenuItem}
                  onClick={closeMobileMenu}
                >
                  Documentation
                </Link>

                {/* Temporarily hidden until Agent SDK is ready */}
                {/* <Link
                  to="/docs/build/building-with-tools/agent-sdk"
                  className={styles.mobileMenuItem}
                  onClick={closeMobileMenu}
                >
                  Build an Agent
                </Link> */}

                <Link
                  to="/pricing"
                  className={styles.mobileMenuItem}
                  onClick={closeMobileMenu}
                >
                  Pricing
                </Link>

                <Link
                  to={LINKS.external.status}
                  className={styles.mobileMenuItem}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMobileMenu}
                >
                  Status
                </Link>

                 {/* Icons in Mobile Menu */}
                 <div style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
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
