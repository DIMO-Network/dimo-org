import Link from '@docusaurus/Link';
import EnglishLink from '../EnglishLink';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useState } from 'react';
import { LINKS } from '../../links';
import { localeSwitchPath } from '../../lib/seo';
import { usePageLocale } from '../../lib/use-page-locale';
import {
  Download,
  Database,
  ShieldCheck,
  Key,
  CreditCard,
  Wallet,
  Smartphone,
  Terminal,
  Bot,
  Car,
} from 'lucide-react';

import styles from './styles.module.css';
import Translate, { translate } from '@docusaurus/Translate';

// Asset imports - descriptive names
const imgLogoDimoLight = '/img/dimo-build-logo.svg';
const imgLogoDimoDark = '/img/dimo-build-logo-dark.svg';
const imgGithub = '/img/icon-github.svg';
const imgDune = '/img/icon-dune.svg';
const imgDropdownArrow = '/img/icon-dropdown-arrow.svg'; // Kept for mobile menu if needed, though we are simplifying

interface CustomNavbarProps {
  dark?: boolean;
}

// pathname:// plus autoAddBaseUrl={false} so Link doesn't prefix the current
// locale's baseUrl. Docusaurus's createUrl isn't used: on a locale home served
// without the trailing slash (/ja), it keeps "/ja" in the path (/zh-Hans//ja).
function useLocaleLinks() {
  const {
    i18n: { currentLocale, locales, localeConfigs },
  } = useDocusaurusContext();
  const { path } = usePageLocale();
  return {
    currentLabel: localeConfigs[currentLocale].label,
    links: locales.map(locale => ({
      locale,
      label: localeConfigs[locale].label,
      lang: localeConfigs[locale].htmlLang,
      to: `pathname://${localeSwitchPath(locale, path)}`,
      isCurrent: locale === currentLocale,
    })),
  };
}

export default function CustomNavbar({ dark = false }: CustomNavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const [isSolutionsDropdownOpen, setIsSolutionsDropdownOpen] = useState(false);
  const [isResourcesDropdownOpen, setIsResourcesDropdownOpen] = useState(false);
  const [isLocaleDropdownOpen, setIsLocaleDropdownOpen] = useState(false);
  const localeLinks = useLocaleLinks();

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
          aria-label={translate({
            id: 'navbar.body.toggleNavigationMenu',
            message: 'Toggle navigation menu',
          })}
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
              <Translate id="navbar.body.products">Products</Translate>
              <img
                src={imgDropdownArrow}
                alt=""
                className={`${styles.dropdownIcon} ${isProductsDropdownOpen ? styles.rotated : ''}`}
              />
            </div>
            {isProductsDropdownOpen && (
              <div
                className={`${styles.dropdownMenu} ${styles.dropdownMenuProducts}`}
              >
                <div className={styles.dropdownSection}>
                  <div className={styles.dropdownSectionTitle}>
                    <Translate id="navbar.body.components">
                      Components
                    </Translate>
                  </div>
                  <Link
                    to="/products/components#wallet"
                    className={styles.dropdownItemWithIcon}
                  >
                    <Wallet size={20} className={styles.dropdownItemIcon} />
                    <div className={styles.dropdownItemContent}>
                      <span className={styles.dropdownItemTitle}>
                        <Translate id="navbar.body.wallet">Wallet</Translate>
                      </span>
                      <span className={styles.dropdownItemDesc}>
                        <Translate id="navbar.body.selfCustodiedVehicleIdentityAnd">
                          Self-custodied vehicle identity and asset management
                        </Translate>
                      </span>
                    </div>
                  </Link>
                  <Link
                    to="/products/components#digital-key"
                    className={styles.dropdownItemWithIcon}
                  >
                    <Smartphone size={20} className={styles.dropdownItemIcon} />
                    <div className={styles.dropdownItemContent}>
                      <span className={styles.dropdownItemTitle}>
                        <Translate id="navbar.body.digitalKeyCcc">
                          Digital Key (CCC)
                        </Translate>
                      </span>
                      <span className={styles.dropdownItemDesc}>
                        <Translate id="navbar.body.phoneAsKeyVehicleAccessVia">
                          Phone-as-key vehicle access via NFC and BLE
                        </Translate>
                      </span>
                    </div>
                  </Link>
                  <Link
                    to="/products/components#agents"
                    className={styles.dropdownItemWithIcon}
                  >
                    <Bot size={20} className={styles.dropdownItemIcon} />
                    <div className={styles.dropdownItemContent}>
                      <span className={styles.dropdownItemTitle}>
                        <Translate id="navbar.body.agents">Agents</Translate>
                      </span>
                      <span className={styles.dropdownItemDesc}>
                        <Translate id="navbar.body.autonomousVehicleIntelligenceAnd">
                          Autonomous vehicle intelligence and workflow
                          automation
                        </Translate>
                      </span>
                    </div>
                  </Link>
                  <Link
                    to="/products/components#developer-tools"
                    className={styles.dropdownItemWithIcon}
                  >
                    <Terminal size={20} className={styles.dropdownItemIcon} />
                    <div className={styles.dropdownItemContent}>
                      <span className={styles.dropdownItemTitle}>
                        <Translate id="navbar.body.developerTools">
                          Developer Tools
                        </Translate>
                      </span>
                      <span className={styles.dropdownItemDesc}>
                        <Translate id="navbar.body.sdksApisConsoleAnd">
                          SDKs, APIs, console, and AI-native integrations
                        </Translate>
                      </span>
                    </div>
                  </Link>
                  <Link
                    to="/products/components#vehicle-simulator"
                    className={styles.dropdownItemWithIcon}
                  >
                    <Car size={20} className={styles.dropdownItemIcon} />
                    <div className={styles.dropdownItemContent}>
                      <span className={styles.dropdownItemTitle}>
                        <Translate id="navbar.body.vehicleSimulator">
                          Vehicle Simulator
                        </Translate>
                      </span>
                      <span className={styles.dropdownItemDesc}>
                        <Translate id="navbar.body.simulateVehicleDataFor">
                          Simulate vehicle data for development and testing
                        </Translate>
                      </span>
                    </div>
                  </Link>
                </div>
                <div className={styles.dropdownSection}>
                  <div className={styles.dropdownSectionTitle}>
                    <Translate id="navbar.body.platform">Platform</Translate>
                  </div>
                  <Link
                    to="/products/ingest"
                    className={styles.dropdownItemWithIcon}
                  >
                    <Download size={20} className={styles.dropdownItemIcon} />
                    <div className={styles.dropdownItemContent}>
                      <span className={styles.dropdownItemTitle}>
                        <Translate id="navbar.body.ingest">Ingest</Translate>
                      </span>
                      <span className={styles.dropdownItemDesc}>
                        <Translate id="navbar.body.bringYourOwnData">
                          Bring your own data (BYOD) or integrate with
                          telematics partners
                        </Translate>
                      </span>
                    </div>
                  </Link>
                  <Link
                    to="/products/storage"
                    className={styles.dropdownItemWithIcon}
                  >
                    <Database size={20} className={styles.dropdownItemIcon} />
                    <div className={styles.dropdownItemContent}>
                      <span className={styles.dropdownItemTitle}>
                        <Translate id="navbar.body.storage">Storage</Translate>
                      </span>
                      <span className={styles.dropdownItemDesc}>
                        <Translate id="navbar.body.normalizedCleanAiReadyData">
                          Normalized, clean, AI-ready data - managed or
                          on-premise
                        </Translate>
                      </span>
                    </div>
                  </Link>
                  <Link
                    to="/products/consent"
                    className={styles.dropdownItemWithIcon}
                  >
                    <ShieldCheck
                      size={20}
                      className={styles.dropdownItemIcon}
                    />
                    <div className={styles.dropdownItemContent}>
                      <span className={styles.dropdownItemTitle}>
                        <Translate id="navbar.body.consent">Consent</Translate>
                      </span>
                      <span className={styles.dropdownItemDesc}>
                        <Translate id="navbar.body.offTheShelfDataPrivacyAnd">
                          Off-the-shelf data privacy and permissions management
                        </Translate>
                      </span>
                    </div>
                  </Link>
                  <Link
                    to="/products/access"
                    className={styles.dropdownItemWithIcon}
                  >
                    <Key size={20} className={styles.dropdownItemIcon} />
                    <div className={styles.dropdownItemContent}>
                      <span className={styles.dropdownItemTitle}>
                        <Translate id="navbar.body.access">Access</Translate>
                      </span>
                      <span className={styles.dropdownItemDesc}>
                        <Translate id="navbar.body.consumeGovernedDataVia">
                          Consume governed data via API, SDK, and AI Agents
                        </Translate>
                      </span>
                    </div>
                  </Link>
                  <Link
                    to="/products/pay"
                    className={styles.dropdownItemWithIcon}
                  >
                    <CreditCard size={20} className={styles.dropdownItemIcon} />
                    <div className={styles.dropdownItemContent}>
                      <span className={styles.dropdownItemTitle}>
                        <Translate id="navbar.body.pay">Pay</Translate>
                      </span>
                      <span className={styles.dropdownItemDesc}>
                        <Translate id="navbar.body.paymentRewardRailsFor">
                          Payment & reward rails for vehicle-centric commerce
                        </Translate>
                      </span>
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
              <Translate id="navbar.body.solutions">Solutions</Translate>
              <img
                src={imgDropdownArrow}
                alt=""
                className={`${styles.dropdownIcon} ${isSolutionsDropdownOpen ? styles.rotated : ''}`}
              />
            </div>
            {isSolutionsDropdownOpen && (
              <div className={styles.dropdownMenu}>
                <div className={styles.dropdownSection}>
                  <div className={styles.dropdownSectionTitle}>
                    <Translate id="navbar.body.byExperience">
                      By Experience
                    </Translate>
                  </div>
                  <Link
                    to="/solutions/agentic-experiences"
                    className={styles.dropdownItem}
                  >
                    <Translate id="navbar.body.agenticExperiences">
                      Agentic Experiences
                    </Translate>
                  </Link>
                  <Link
                    to="/solutions/consumer-applications"
                    className={styles.dropdownItem}
                  >
                    <Translate id="navbar.body.consumerApplications">
                      Consumer Applications
                    </Translate>
                  </Link>
                  <Link
                    to="/solutions/fleet-intelligence"
                    className={styles.dropdownItem}
                  >
                    <Translate id="navbar.body.fleetIntelligence">
                      Fleet Intelligence
                    </Translate>
                  </Link>
                  <Link
                    to="/solutions/vehicle-commerce"
                    className={styles.dropdownItem}
                  >
                    <Translate id="navbar.body.vehicleCommerce">
                      Vehicle Commerce
                    </Translate>
                  </Link>
                </div>
                <div className={styles.dropdownSection}>
                  <div className={styles.dropdownSectionTitle}>
                    <Translate id="navbar.body.byIndustry">
                      By Industry
                    </Translate>
                  </div>
                  <Link to="/industries/oem" className={styles.dropdownItem}>
                    <Translate id="navbar.body.autoOems">Auto OEMs</Translate>
                  </Link>
                  <Link
                    to="/industries/dealerships"
                    className={styles.dropdownItem}
                  >
                    <Translate id="navbar.body.dealerships">
                      Dealerships
                    </Translate>
                  </Link>
                  <Link to="/industries/dsp" className={styles.dropdownItem}>
                    <Translate id="navbar.body.deliveryServiceProviders">
                      Delivery Service Providers
                    </Translate>
                  </Link>
                  <Link
                    to="/industries/rentals"
                    className={styles.dropdownItem}
                  >
                    <Translate id="navbar.body.rentalsP2pCarSharing">
                      Rentals & P2P Car Sharing
                    </Translate>
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
              <Translate id="navbar.body.resources">Resources</Translate>
              <img
                src={imgDropdownArrow}
                alt=""
                className={`${styles.dropdownIcon} ${isResourcesDropdownOpen ? styles.rotated : ''}`}
              />
            </div>
            {isResourcesDropdownOpen && (
              <div className={styles.dropdownMenu}>
                <div className={styles.dropdownSection}>
                  <div className={styles.dropdownSectionTitle}>
                    <Translate id="navbar.body.learn">Learn</Translate>
                  </div>
                  <EnglishLink to="/docs" className={styles.dropdownItem}>
                    <Translate id="navbar.body.documentation">
                      Documentation
                    </Translate>
                  </EnglishLink>
                  <Link
                    to={LINKS.external.blogs}
                    className={styles.dropdownItem}
                    target="_blank"
                  >
                    <Translate id="navbar.body.developerBlog">
                      Developer Blog
                    </Translate>
                  </Link>
                  <Link
                    to={LINKS.external.dimoUniversity}
                    className={styles.dropdownItem}
                    target="_blank"
                  >
                    DIMO University
                  </Link>
                </div>
                <div className={styles.dropdownSection}>
                  <div className={styles.dropdownSectionTitle}>
                    <Translate id="navbar.body.customerStories">
                      Customer Stories
                    </Translate>
                  </div>
                  <Link
                    to="/customer-stories/emobi"
                    className={styles.dropdownItem}
                  >
                    Emobi
                  </Link>
                  <Link
                    to="/customer-stories/grupo-kaufmann"
                    className={styles.dropdownItem}
                  >
                    Grupo Kaufmann
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link to="/pricing" className={styles.navItem}>
            <Translate id="navbar.body.pricing">Pricing</Translate>
          </Link>

          {/* Locale Dropdown */}
          <div
            className={styles.dropdownContainer}
            onMouseEnter={() => setIsLocaleDropdownOpen(true)}
            onMouseLeave={() => setIsLocaleDropdownOpen(false)}
          >
            <div className={`${styles.navItem} ${styles.dropdownTrigger}`}>
              {localeLinks.currentLabel}
              <img
                src={imgDropdownArrow}
                alt=""
                className={`${styles.dropdownIcon} ${isLocaleDropdownOpen ? styles.rotated : ''}`}
              />
            </div>
            {isLocaleDropdownOpen && (
              <div
                className={`${styles.dropdownMenu} ${styles.dropdownMenuLocales}`}
              >
                {localeLinks.links.map(link => (
                  <Link
                    key={link.locale}
                    to={link.to}
                    lang={link.lang}
                    target="_self"
                    autoAddBaseUrl={false}
                    aria-current={link.isCurrent ? 'true' : undefined}
                    className={styles.dropdownItem}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
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
              <Translate id="navbar.body.console">Console</Translate>
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
                  <div className={styles.mobileMenuSectionTitle}>
                    <Translate id="navbar.body.products">Products</Translate>
                  </div>
                  <Link
                    to="/products/components"
                    className={styles.mobileMenuItem}
                    onClick={closeMobileMenu}
                  >
                    <Translate id="navbar.body.components">
                      Components
                    </Translate>
                  </Link>
                  <Link
                    to="/products/components#vehicle-simulator"
                    className={styles.mobileMenuItem}
                    onClick={closeMobileMenu}
                  >
                    <Translate id="navbar.body.vehicleSimulator">
                      Vehicle Simulator
                    </Translate>
                  </Link>
                  <Link
                    to="/products/ingest"
                    className={styles.mobileMenuItem}
                    onClick={closeMobileMenu}
                  >
                    <Translate id="navbar.body.ingest">Ingest</Translate>
                  </Link>
                  <Link
                    to="/products/storage"
                    className={styles.mobileMenuItem}
                    onClick={closeMobileMenu}
                  >
                    <Translate id="navbar.body.storage">Storage</Translate>
                  </Link>
                  <Link
                    to="/products/consent"
                    className={styles.mobileMenuItem}
                    onClick={closeMobileMenu}
                  >
                    <Translate id="navbar.body.consent">Consent</Translate>
                  </Link>
                  <Link
                    to="/products/access"
                    className={styles.mobileMenuItem}
                    onClick={closeMobileMenu}
                  >
                    <Translate id="navbar.body.access">Access</Translate>
                  </Link>
                  <Link
                    to="/products/pay"
                    className={styles.mobileMenuItem}
                    onClick={closeMobileMenu}
                  >
                    <Translate id="navbar.body.pay">Pay</Translate>
                  </Link>
                </div>

                {/* Solutions Section */}
                <div className={styles.mobileMenuSection}>
                  <div className={styles.mobileMenuSectionTitle}>
                    <Translate id="navbar.body.solutions">Solutions</Translate>
                  </div>
                  <Link
                    to="/solutions/agentic-experiences"
                    className={styles.mobileMenuItem}
                    onClick={closeMobileMenu}
                  >
                    <Translate id="navbar.body.agenticExperiences">
                      Agentic Experiences
                    </Translate>
                  </Link>
                  <Link
                    to="/solutions/consumer-applications"
                    className={styles.mobileMenuItem}
                    onClick={closeMobileMenu}
                  >
                    <Translate id="navbar.body.consumerApplications">
                      Consumer Applications
                    </Translate>
                  </Link>
                  <Link
                    to="/solutions/fleet-intelligence"
                    className={styles.mobileMenuItem}
                    onClick={closeMobileMenu}
                  >
                    <Translate id="navbar.body.fleetIntelligence">
                      Fleet Intelligence
                    </Translate>
                  </Link>
                  <Link
                    to="/solutions/vehicle-commerce"
                    className={styles.mobileMenuItem}
                    onClick={closeMobileMenu}
                  >
                    <Translate id="navbar.body.vehicleCommerce">
                      Vehicle Commerce
                    </Translate>
                  </Link>
                </div>

                <div className={styles.mobileMenuSection}>
                  <div className={styles.mobileMenuSectionTitle}>
                    <Translate id="navbar.body.industries">
                      Industries
                    </Translate>
                  </div>
                  <Link
                    to="/industries/oem"
                    className={styles.mobileMenuItem}
                    onClick={closeMobileMenu}
                  >
                    <Translate id="navbar.body.autoOems">Auto OEMs</Translate>
                  </Link>
                  <Link
                    to="/industries/dealerships"
                    className={styles.mobileMenuItem}
                    onClick={closeMobileMenu}
                  >
                    <Translate id="navbar.body.dealerships">
                      Dealerships
                    </Translate>
                  </Link>
                  <Link
                    to="/industries/delivery-service-providers"
                    className={styles.mobileMenuItem}
                    onClick={closeMobileMenu}
                  >
                    <Translate id="navbar.body.deliveryServiceProviders">
                      Delivery Service Providers
                    </Translate>
                  </Link>
                  <Link
                    to="/industries/rentals"
                    className={styles.mobileMenuItem}
                    onClick={closeMobileMenu}
                  >
                    <Translate id="navbar.body.rentalsP2pCarSharing">
                      Rentals & P2P Car Sharing
                    </Translate>
                  </Link>
                </div>

                {/* Resources Section */}
                <div className={styles.mobileMenuSection}>
                  <div className={styles.mobileMenuSectionTitle}>
                    <Translate id="navbar.body.resources">Resources</Translate>
                  </div>
                  <EnglishLink
                    to="/docs"
                    className={styles.mobileMenuItem}
                    onClick={closeMobileMenu}
                  >
                    <Translate id="navbar.body.documentation">
                      Documentation
                    </Translate>
                  </EnglishLink>
                  <Link
                    to={LINKS.external.blogs}
                    className={styles.mobileMenuItem}
                    onClick={closeMobileMenu}
                    target="_blank"
                  >
                    <Translate id="navbar.body.developerBlog">
                      Developer Blog
                    </Translate>
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
                  <Translate id="navbar.body.pricing">Pricing</Translate>
                </Link>

                <div className={styles.mobileMenuSection}>
                  <div className={styles.mobileMenuSectionTitle}>
                    <Translate id="navbar.body.language">Language</Translate>
                  </div>
                  {localeLinks.links.map(link => (
                    <Link
                      key={link.locale}
                      to={link.to}
                      lang={link.lang}
                      target="_self"
                      autoAddBaseUrl={false}
                      aria-current={link.isCurrent ? 'true' : undefined}
                      className={styles.mobileMenuItem}
                      onClick={closeMobileMenu}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

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
                    <Translate id="navbar.body.console">Console</Translate>
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
