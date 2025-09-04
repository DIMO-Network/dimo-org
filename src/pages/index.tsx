import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Heading from '@theme/Heading';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import type { ReactNode } from 'react';

import styles from './index.module.css';

function HomepageHeader() {
  return (
    <header className={clsx('hero-gradient', styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroContent}>
          <Heading as="h1" className={styles.heroTitle}>
            The vehicle data
            <br />
            platform that puts
            <br />
            privacy first
          </Heading>
          <div className={styles.heroButtons}>
            <Link
              className={clsx(
                'button button--primary button--lg',
                styles.signInButton
              )}
              to="https://console.dimo.org/sign-in"
            >
              Sign in
            </Link>
            <Link
              className={clsx(
                'button button--outline button--lg',
                styles.docsButton
              )}
              to="/docs/getting-started/introduction"
            >
              See documentation
            </Link>
          </div>
        </div>
        <div className="hero-vehicles"></div>
      </div>
    </header>
  );
}

function TrustedBySection() {
  return (
    <section className="trusted-by-section">
      <div className="container">
        <div className="trusted-by-text">Trusted by</div>
        <div className="trusted-by-logos">
          <div className="trusted-logo">COINBASE</div>
          <div className="trusted-logo">POLYGON</div>
          <div className="trusted-logo">STREAMR</div>
          <div className="trusted-logo">STAEX</div>
        </div>
      </div>
    </section>
  );
}

function WhyDimoSection() {
  return (
    <section className="why-dimo-section">
      <div className="container">
        <Heading as="h2" className="why-dimo-title">
          Why DIMO?
        </Heading>
        <p className="why-dimo-subtitle">
          DIMO lets you tap into $100B+ with real-time telemetry
          <br />
          and connected services
        </p>

        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                <path d="M19 12v7H5v-7M12 2l7 5v5l-7 5-7-5V7l7-5z" />
              </svg>
            </div>
            <Heading as="h3" className="feature-title">
              Plug & play
            </Heading>
            <p className="feature-description">
              Built to scale, AI-ready
              <br />
              API and developer
              <br />
              infrastructure
            </p>
          </div>

          <div className="feature-item">
            <div className="feature-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
              </svg>
            </div>
            <Heading as="h3" className="feature-title">
              Privacy preserving
            </Heading>
            <p className="feature-description">
              Connect to vehicles while maintaining
              <br />
              user privacy and onboard app developers
              <br />
              while honoring OEM agreements
            </p>
          </div>

          <div className="feature-item">
            <div className="feature-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
              </svg>
            </div>
            <Heading as="h3" className="feature-title">
              Real-time data
            </Heading>
            <p className="feature-description">
              Be a data source, host,
              <br />
              and/or consumer of real-
              <br />
              time vehicle data
            </p>
          </div>
        </div>

        <div className="bottom-features">
          <div className="bottom-feature-card">
            <div className="bottom-feature-title">
              Open
              <br />
              source
            </div>
            <div className="bottom-feature-arrow">→</div>
          </div>

          <div className="bottom-feature-card">
            <div className="bottom-feature-title">
              Secure +<br />
              compliant
            </div>
            <div className="bottom-feature-arrow">→</div>
          </div>

          <div className="bottom-feature-card">
            <div className="bottom-feature-title">
              Universal
              <br />
              compatibility
            </div>
            <div className="bottom-feature-arrow">→</div>
          </div>

          <div className="bottom-feature-card">
            <div className="bottom-feature-title">
              Consent
              <br />
              management
              <br />
              off-the-shelf
            </div>
            <div className="bottom-feature-arrow">→</div>
          </div>

          <div className="bottom-feature-card">
            <div className="bottom-feature-title">
              Gen-AI &<br />
              MCP-ready
            </div>
            <div className="bottom-feature-arrow">→</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="The vehicle data platform that puts privacy first"
    >
      <HomepageHeader />
      <TrustedBySection />
      <main>
        <WhyDimoSection />
      </main>
    </Layout>
  );
}
