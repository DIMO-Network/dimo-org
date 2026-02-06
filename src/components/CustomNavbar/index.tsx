import Link from '@docusaurus/Link';
import { useState } from 'react';
import { LINKS } from '../../links';
import {
  Download,
  Database,
  ShieldCheck,
  Key,
  CreditCard,
} from 'lucide-react';

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
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const [isSolutionsDropdownOpen, setIsSolutionsDropdownOpen] = useState(false);
  const [isResourcesDropdownOpen, setIsResourcesDropdownOpen] = useState(false);

  const imgLogoDimo = dark ? imgLogoDimoDark : imgLogoDimoLight;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleProductsMouseEnter = () => {
    setIsProductsDropdownOpen(true);
  };

  const handleProductsMouseLeave = () => {
    setIsProductsDropdownOpen(false);
  };

  const handleSolutionsMouseEnter = () => {
    setIsSolutionsDropdownOpen(true);
  };

  const handleSolutionsMouseLeave = () => {
    setIsSolutionsDropdownOpen(false);
  };

  const handleResourcesMouseEnter = () => {
    setIsResourcesDropdownOpen(true);
  };

  const handleResourcesMouseLeave = () => {
    setIsResourcesDropdownOpen(false);
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
          {/* Products Dropdown */}
          <div
            className={styles.dropdownContainer}
            onMouseEnter={handleProductsMouseEnter}
            onMouseLeave={handleProductsMouseLeave}
          >
            <div className={`${styles.navItem} ${styles.dropdownTrigger}`}>
              Products
              <img
                src={imgDropdownArrow}
                alt=""
                className={`${styles.dropdownIcon} ${isProductsDropdownOpen ? styles.rotated : ''}`}
              />
            </div>
            {isProductsDropdownOpen && (
              <div className={`${styles.dropdownMenu} ${styles.dropdownMenuProducts}`}>
                <div className={styles.dropdownSection}>
                  <div className={styles.dropdownSectionTitle}>Platform</div>
                  <Link to="/products/ingest" className={styles.dropdownItemWithIcon}>
                    <Download size={20} className={styles.dropdownItemIcon} />
                    <div className={styles.dropdownItemContent}>
                      <span className={styles.dropdownItemTitle}>Ingest</span>
                      <span className={styles.dropdownItemDesc}>Bring your own data (BYOD) or integrate with telematics partners</span>
                    </div>
                  </Link>
                  <Link to="/products/storage" className={styles.dropdownItemWithIcon}>
                    <Database size={20} className={styles.dropdownItemIcon} />
                    <div className={styles.dropdownItemContent}>
                      <span className={styles.dropdownItemTitle}>Storage</span>
                      <span className={styles.dropdownItemDesc}>Normalized, clean, AI-ready data - managed or on-premise</span>
                    </div>
                  </Link>
                  <Link to="/products/consent" className={styles.dropdownItemWithIcon}>
                    <ShieldCheck size={20} className={styles.dropdownItemIcon} />
                    <div className={styles.dropdownItemContent}>
                      <span className={styles.dropdownItemTitle}>Consent</span>
                      <span className={styles.dropdownItemDesc}>Off-the-shelf data privacy and permissions management</span>
                    </div>
                  </Link>
                  <Link to="/products/access" className={styles.dropdownItemWithIcon}>
                    <Key size={20} className={styles.dropdownItemIcon} />
                    <div className={styles.dropdownItemContent}>
                      <span className={styles.dropdownItemTitle}>Access</span>
                      <span className={styles.dropdownItemDesc}>Consume governed data via API, SDK, and AI Agents</span>
                    </div>
                  </Link>
                  <Link to="/products/pay" className={styles.dropdownItemWithIcon}>
                    <CreditCard size={20} className={styles.dropdownItemIcon} />
                    <div className={styles.dropdownItemContent}>
                      <span className={styles.dropdownItemTitle}>Pay</span>
                      <span className={styles.dropdownItemDesc}>Payment & reward rails for vehicle-centric commerce</span>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Solutions Dropdown */}
          <div
            className={styles.dropdownContainer}
            onMouseEnter={handleSolutionsMouseEnter}
            onMouseLeave={handleSolutionsMouseLeave}
          >
            <div className={`${styles.navItem} ${styles.dropdownTrigger}`}>
              Solutions
              <img
                src={imgDropdownArrow}
                alt=""
                className={`${styles.dropdownIcon} ${isSolutionsDropdownOpen ? styles.rotated : ''}`}
              />
            </div>
            {isSolutionsDropdownOpen && (
              <div className={styles.dropdownMenu}>
                <div className={styles.dropdownSection}>
                  <div className={styles.dropdownSectionTitle}>By Experience</div>
                  <Link to="/solutions/agentic-experiences" className={styles.dropdownItem}>
                    Agentic Experiences
                  </Link>
                  <Link to="/solutions/consumer-applications" className={styles.dropdownItem}>
                    Consumer Applications
                  </Link>
                  <Link to="/solutions/fleet-intelligence" className={styles.dropdownItem}>
                    Fleet Intelligence
                  </Link>
                  <Link to="/solutions/vehicle-commerce" className={styles.dropdownItem}>
                    Vehicle Commerce
                  </Link>
                </div>
                <div className={styles.dropdownSection}>
                  <div className={styles.dropdownSectionTitle}>By Industry</div>
                  <Link to="/industries/oem" className={styles.dropdownItem}>
                    Auto OEMs
                  </Link>
                  <Link to="/industries/maintenance" className={styles.dropdownItem}>
                    Auto Maintenance
                  </Link>
                  <Link to="/industries/dealerships" className={styles.dropdownItem}>
                    Dealerships
                  </Link>
                  <Link to="/industries/dsp" className={styles.dropdownItem}>
                    Delivery Service Providers
                  </Link>
                  <Link to="/industries/rentals" className={styles.dropdownItem}>
                    Rentals
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Resources Dropdown */}
          <div
            className={styles.dropdownContainer}
            onMouseEnter={handleResourcesMouseEnter}
            onMouseLeave={handleResourcesMouseLeave}
          >
            <div className={`${styles.navItem} ${styles.dropdownTrigger}`}>
              Resources
              <img
                src={imgDropdownArrow}
                alt=""
                className={`${styles.dropdownIcon} ${isResourcesDropdownOpen ? styles.rotated : ''}`}
              />
            </div>
            {isResourcesDropdownOpen && (
              <div className={styles.dropdownMenu}>
                <div className={styles.dropdownSection}>
                  <div className={styles.dropdownSectionTitle}>Learn</div>
                  <Link to="/docs" className={styles.dropdownItem}>
                    Documentation
                  </Link>
                  <Link to={LINKS.external.blogs} className={styles.dropdownItem} target="_blank">
                    Developer Blog
                  </Link>
                  <Link to={LINKS.external.dimoUniversity} className={styles.dropdownItem} target="_blank">
                    DIMO University
                  </Link>
                </div>
                <div className={styles.dropdownSection}>
                  <div className={styles.dropdownSectionTitle}>Customer Stories</div>
                  <Link to="/customer-stories/emobi" className={styles.dropdownItem}>
                    Emobi
                  </Link>
                  <Link to="/customer-stories/grupo-kaufmann" className={styles.dropdownItem}>
                    Grupo Kaufmann
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link to="/pricing" className={styles.navItem}>
            Pricing
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
                  <img alt="DIMO" src={imgLogoDimo} />
                </div>
              </div>

              <div className={styles.mobileMenuLinks}>
                {/* Products Section */}
                <div className={styles.mobileMenuSection}>
                  <div className={styles.mobileMenuSectionTitle}>Products</div>
                  <Link
                    to="/products/ingest"
                    className={styles.mobileMenuItem}
                    onClick={closeMobileMenu}
                  >
                    Ingest
                  </Link>
                  <Link
                    to="/products/storage"
                    className={styles.mobileMenuItem}
                    onClick={closeMobileMenu}
                  >
                    Storage
                  </Link>
                  <Link
                    to="/products/consent"
                    className={styles.mobileMenuItem}
                    onClick={closeMobileMenu}
                  >
                    Consent
                  </Link>
                  <Link
                    to="/products/access"
                    className={styles.mobileMenuItem}
                    onClick={closeMobileMenu}
                  >
                    Access
                  </Link>
                  <Link
                    to="/products/pay"
                    className={styles.mobileMenuItem}
                    onClick={closeMobileMenu}
                  >
                    Pay
                  </Link>
                </div>

                {/* Solutions Section */}
                <div className={styles.mobileMenuSection}>
                  <div className={styles.mobileMenuSectionTitle}>Solutions</div>
                  <Link
                    to="/solutions/agentic-experiences"
                    className={styles.mobileMenuItem}
                    onClick={closeMobileMenu}
                  >
                    Agentic Experiences
                  </Link>
                  <Link
                    to="/solutions/consumer-applications"
                    className={styles.mobileMenuItem}
                    onClick={closeMobileMenu}
                  >
                    Consumer Applications
                  </Link>
                  <Link
                    to="/solutions/fleet-intelligence"
                    className={styles.mobileMenuItem}
                    onClick={closeMobileMenu}
                  >
                    Fleet Intelligence
                  </Link>
                  <Link
                    to="/solutions/vehicle-commerce"
                    className={styles.mobileMenuItem}
                    onClick={closeMobileMenu}
                  >
                    Vehicle Commerce
                  </Link>
                </div>

                <div className={styles.mobileMenuSection}>
                  <div className={styles.mobileMenuSectionTitle}>Industries</div>
                  <Link
                    to="/industries/auto-oems"
                    className={styles.mobileMenuItem}
                    onClick={closeMobileMenu}
                  >
                    Auto OEMs
                  </Link>
                  <Link
                    to="/industries/auto-maintenance"
                    className={styles.mobileMenuItem}
                    onClick={closeMobileMenu}
                  >
                    Auto Maintenance
                  </Link>
                  <Link
                    to="/industries/dealerships"
                    className={styles.mobileMenuItem}
                    onClick={closeMobileMenu}
                  >
                    Dealerships
                  </Link>
                  <Link
                    to="/industries/delivery-service-providers"
                    className={styles.mobileMenuItem}
                    onClick={closeMobileMenu}
                  >
                    Delivery Service Providers
                  </Link>
                  <Link
                    to="/industries/rentals"
                    className={styles.mobileMenuItem}
                    onClick={closeMobileMenu}
                  >
                    Rentals
                  </Link>
                </div>

                {/* Resources Section */}
                <div className={styles.mobileMenuSection}>
                  <div className={styles.mobileMenuSectionTitle}>Resources</div>
                  <Link
                    to="/docs"
                    className={styles.mobileMenuItem}
                    onClick={closeMobileMenu}
                  >
                    Documentation
                  </Link>
                  <Link
                    to={LINKS.external.blogs}
                    className={styles.mobileMenuItem}
                    onClick={closeMobileMenu}
                    target="_blank"
                  >
                    Developer Blog
                  </Link>
                  <Link
                    to={LINKS.external.dimoUniversity}
                    className={styles.mobileMenuItem}
                    onClick={closeMobileMenu}
                    target="_blank"
                  >
                    DIMO University
                  </Link>
                  <Link
                    to="/customer-stories/emobi"
                    className={styles.mobileMenuItem}
                    onClick={closeMobileMenu}
                  >
                    Emobi
                  </Link>
                  <Link
                    to="/customer-stories/grupo-kaufmann"
                    className={styles.mobileMenuItem}
                    onClick={closeMobileMenu}
                  >
                    Grupo Kaufmann
                  </Link>
                </div>

                <Link
                  to="/pricing"
                  className={styles.mobileMenuItem}
                  onClick={closeMobileMenu}
                >
                  Pricing
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
