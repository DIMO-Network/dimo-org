import Link from '@docusaurus/Link';
import type { ReactNode } from 'react';
import { LINKS } from '../links';

import styles from './index.module.css';
import FooterTheme from '../theme/Footer';
import CustomNavbar from '../components/CustomNavbar';

// Asset imports - descriptive names
const imgHeroHighway = '/img/hero-highway-image.png';
const imgDimoIconBlue = '/img/dimo-build-logo-round.png';
const imgDimoIcon = '/img/dimo-logo-red.png';
const imgIconPlugPlay = '/img/icon-plug-play.svg';
const imgIconRealTimeData = '/img/icon-real-time-data.svg';
const imgIconPrivacyPreserving = '/img/icon-privacy-preserving.svg';
const imgOpenSource = '/img/icon-open-source.svg';
const imgIconSecureCompliant = '/img/icon-secure.svg';
const imgIconUniversalCompatibility = '/img/icon-universal.svg';
const imgIconStarsAI = '/img/icon-ai.svg';
const imgIconConsentManagement = '/img/icon-consent-management.svg';

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
                  <div className={styles.dimoMobileTextContainer}>
                    <div className={styles.dimoMobileSubText}>SIGN UP AS A CONSUMER</div>
                    <div className={styles.dimoMobileMainText}>DIMO Mobile</div>
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

function WallOfLoveSection() {
  return (
    <section>
      <div className={styles.wallOfLove}>
        <h2 className={styles.wallOfLoveTitle}>Hear What Devs Say</h2>
      </div>
      <div className="feedspace-embed" data-id="217207bd-2013-4903-8545-d7f149fda8a2"></div>
      <script src="https://js.feedspace.io/v1/embed/embed.min.js" type="text/javascript" async></script>
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
        <WallOfLoveSection />
      </main>

      {/* Footer */}
      <FooterTheme />
    </div>
  );
}