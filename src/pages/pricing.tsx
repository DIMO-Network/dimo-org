import React, { type ReactNode } from 'react';
import Link from '@docusaurus/Link';
import styles from './pricing.module.css';
import FooterTheme from '../theme/Footer';
import CustomNavbar from '../components/CustomNavbar';

export default function Pricing(): ReactNode {
  return (
    <div className={styles.pricingPage}>
      <CustomNavbar dark={true} />

      <main className={styles.comingSoonContainer}>
        {/* Animated ticker lines in the background */}
        <div className={styles.tickerWrapper}>
          <div
            className={styles.tickerLine}
            style={{ animationDuration: '20s' }}
          >
            <span className={styles.tickerText}>Coming Soon</span>
            <span className={styles.tickerText}>Coming Soon</span>
            <span className={styles.tickerText}>Coming Soon</span>
            <span className={styles.tickerText}>Coming Soon</span>
          </div>
          <div
            className={styles.tickerLine}
            style={{ animationDuration: '25s' }}
          >
            <span className={styles.tickerText}>Coming Soon</span>
            <span className={styles.tickerText}>Coming Soon</span>
            <span className={styles.tickerText}>Coming Soon</span>
            <span className={styles.tickerText}>Coming Soon</span>
          </div>
          <div
            className={styles.tickerLine}
            style={{ animationDuration: '18s' }}
          >
            <span className={styles.tickerText}>Coming Soon</span>
            <span className={styles.tickerText}>Coming Soon</span>
            <span className={styles.tickerText}>Coming Soon</span>
            <span className={styles.tickerText}>Coming Soon</span>
          </div>
          <div
            className={styles.tickerLine}
            style={{ animationDuration: '30s' }}
          >
            <span className={styles.tickerText}>Coming Soon</span>
            <span className={styles.tickerText}>Coming Soon</span>
            <span className={styles.tickerText}>Coming Soon</span>
            <span className={styles.tickerText}>Coming Soon</span>
          </div>
          <div
            className={styles.tickerLine}
            style={{ animationDuration: '22s' }}
          >
            <span className={styles.tickerText}>Coming Soon</span>
            <span className={styles.tickerText}>Coming Soon</span>
            <span className={styles.tickerText}>Coming Soon</span>
            <span className={styles.tickerText}>Coming Soon</span>
          </div>
        </div>

        {/* Centered box module with higher z-index */}
        <div className={styles.ctaBox}>
          <p className={styles.ctaQuestion}>Have questions?</p>
          <Link className={styles.ctaButton} to="mailto:developers@dimo.org">
            Get in Touch →
          </Link>
        </div>
      </main>

      <FooterTheme />
    </div>
  );
}
