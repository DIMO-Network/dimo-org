import React, { type ReactNode, useState } from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

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
                <Link to="/docs" className={styles.dropdownItem}>
                  Read
                </Link>
                <a
                  href="https://youtu.be/nktm5m9LhIU"
                  className={styles.dropdownItem}
                  target="blank"
                >
                  Watch
                </a>
                <a
                  href="/img/cheat-sheet.png"
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
              <span>AI</span>
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
                  to="/docs/build/building-with-ai/dimo-mcp-server"
                  className={styles.dropdownItem}
                >
                  DIMO MCP Server
                </Link>
                <Link
                  to="/docs/build/building-with-ai/developer-kit"
                  className={styles.dropdownItem}
                >
                  AI App Builder
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
                <Link
                  to="/docs/category/building-with-tools"
                  className={styles.dropdownItem}
                >
                  Developer SDKs
                </Link>
                <Link
                  to="/docs/build/building-with-tools/low-code-integrations"
                  className={styles.dropdownItem}
                >
                  Low Code
                </Link>
              </div>
            )}
          </div>

          <div className={styles.navItem}>
            <a
              href="https://discord.com/invite/dimonetwork"
              className={styles.navItem}
              target="blank"
            >
              Community
            </a>
          </div>
          <div className={styles.navItem}>
            <a
              href="https://github.com/DIMO-Network"
              className={styles.navIcon}
              aria-label="GitHub"
              target="blank"
            >
              <img alt="GitHub" src={imgGithub} />
            </a>
            <a
              href="https://dune.com/dimo_network/dimo-protocol"
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
              to="https://console.dimo.org/sign-in"
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
                    to="/docs"
                    className={styles.mobileMenuItem}
                    onClick={closeMobileMenu}
                  >
                    Read
                  </Link>
                  <a
                    href="https://youtu.be/nktm5m9LhIU"
                    className={styles.mobileMenuItem}
                    target="blank"
                    onClick={closeMobileMenu}
                  >
                    Watch
                  </a>
                  <a
                    href="/img/cheat-sheet.png"
                    className={styles.mobileMenuItem}
                    target="blank"
                    onClick={closeMobileMenu}
                  >
                    Cheat Sheet
                  </a>
                </div>

                {/* AI Section */}
                <div className={styles.mobileMenuSection}>
                  <div className={styles.mobileMenuSectionTitle}>AI</div>

                  <Link
                    to="/docs/build/building-with-ai/dimo-mcp-server"
                    className={styles.mobileMenuItem}
                    onClick={closeMobileMenu}
                  >
                    DIMO MCP Server
                  </Link>
                  <Link
                    to="/docs/build/building-with-ai/developer-kit"
                    className={styles.mobileMenuItem}
                    onClick={closeMobileMenu}
                  >
                    AI App Builder
                  </Link>
                </div>


                {/* Tools Section */}
                <div className={styles.mobileMenuSection}>
                  <div className={styles.mobileMenuSectionTitle}>Tools</div>
                  <Link
                    to="/docs/category/building-with-tools"
                    className={styles.mobileMenuItem}
                    onClick={closeMobileMenu}
                  >
                    Developer SDKs
                  </Link>
                  <Link
                    to="/docs/build/building-with-tools/low-code-integrations"
                    className={styles.mobileMenuItem}
                    onClick={closeMobileMenu}
                  >
                    Low Code
                  </Link>
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
                  <a
                    href="https://discord.com/invite/dimonetwork"
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
                    href="https://github.com/DIMO-Network"
                    className={styles.mobileMenuGitHub}
                    aria-label="GitHub"
                    target="blank"
                    onClick={closeMobileMenu}
                  >
                    <img alt="GitHub" src={imgGithub} />
                    GitHub
                  </a>
                  <a
                    href="https://dune.com/dimo_network/dimo-protocol"
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
