import React, { type ReactNode } from 'react';
import Link from '@docusaurus/Link';
import styles from './pricing.module.css';
import FooterTheme from '../theme/Footer';
import CustomNavbar from '../components/CustomNavbar';

const PricingTiers = [
  {
    name: 'DIMO Hobbyist',
    price: 'Free',
    period: '',
    description: 'Perfect for enthusiasts building for their own vehicles.',
    features: [
      'Access your own vehicle data',
      'Create a developer license',
      'Use third party apps like Home Assistant',
    ],
    buttonText: 'Get Started',
    buttonLink: 'https://console.dimo.xyz',
    highlight: false,
  },
  {
    name: 'DIMO Pro',
    price: '$20',
    period: '/mo',
    description: 'For developers building apps for a fleet or user base.',
    features: [
      'Everything in DIMO Hobbyist',
      'Access to the DIMO Agent SDK',
      'x,xxx requests per month',
    ],
    buttonText: 'Start Building',
    buttonLink: 'https://console.dimo.xyz',
    highlight: true, // "Sleek and enticing" - maybe highlight the Pro tier?
    badge: 'Most Popular',
  },
  {
    name: 'DIMO MAX',
    price: '$200',
    period: '/mo',
    description: 'Scale your application with higher limits and support.',
    features: [
      'Everything in DIMO Pro',
      'xxx,xxxx requests per month',
      'Priority access to the DIMO team',
    ],
    buttonText: 'Upgrade',
    buttonLink: 'https://console.dimo.xyz',
    highlight: false,
  },
  {
    name: 'DIMO Enterprise',
    price: 'Custom',
    period: '',
    description: 'Tailored solutions for large-scale deployments.',
    features: [
      'Unlimited requests',
      'Dedicated support channel',
      'Custom SLA & contracts',
      'On-premise deployment options',
    ],
    buttonText: 'Contact Us',
    buttonLink: 'mailto:sales@dimo.org', // Or a contact form link
    highlight: false,
    isEnterprise: true,
  },
];

function HeroSection() {
  return (
    <header className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          Simple, transparent <br />
          <span className={styles.heroTitleSpan}>pricing for everyone.</span>
        </h1>
        <p className={styles.heroSubtitle}>
          Start for free, scale as you grow. Whether you're a hobbyist or an enterprise,
          DIMO has a plan that fits your needs.
        </p>
      </div>
    </header>
  );
}

function PricingGrid() {
  return (
    <section className={styles.pricingSection}>
      <div className={styles.pricingGrid}>
        {PricingTiers.map((tier, index) => (
          <div
            key={index}
            className={`${styles.pricingCard} ${tier.highlight ? styles.featuredCard : ''} ${tier.isEnterprise ? styles.enterpriseCard : ''}`}
          >
            {tier.badge && <div className={styles.mostPopularBadge}>{tier.badge}</div>}
            <div className={styles.cardGlow} />

            <h3 className={styles.tierName}>{tier.name}</h3>
            <div className={styles.tierPrice}>
              {tier.price}
              {tier.period && <span className={styles.tierPeriod}>{tier.period}</span>}
            </div>
            <p className={styles.tierDesc}>{tier.description}</p>

            <div className={styles.divider} />

            <ul className={styles.featureList}>
              {tier.features.map((feature, i) => (
                <li key={i} className={styles.featureItem}>
                  <span className={styles.checkIcon}>✓</span>
                  {feature}
                </li>
              ))}
              {tier.isEnterprise && (
                 <li className={styles.featureItem}>
                    <span className={styles.checkIcon}>✓</span>
                    Contact us for custom pricing
                 </li>
              )}
            </ul>

            <Link
              to={tier.buttonLink}
              className={`${styles.cardBtn} ${tier.highlight ? styles.primaryCardBtn : ''}`}
            >
              {tier.buttonText}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

function FAQSection() {
    return (
        <section className={styles.hero} style={{ background: 'transparent', paddingBottom: '6rem' }}>
            <div className={styles.heroContent}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '2rem' }}>Frequently Asked Questions</h2>
                <div style={{ textAlign: 'left', maxWidth: '800px', margin: '0 auto', display: 'grid', gap: '2rem' }}>
                    <div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>Do I need a credit card to start?</h3>
                        <p style={{ color: '#a1a1aa' }}>No, the DIMO Hobbyist plan is completely free and requires no credit card. You can upgrade anytime.</p>
                    </div>
                    <div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>What happens if I exceed my request limit?</h3>
                        <p style={{ color: '#a1a1aa' }}>We'll notify you when you're close to your limit. For sustained overages, we'll ask you to upgrade to the next tier.</p>
                    </div>
                     <div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>Can I cancel anytime?</h3>
                        <p style={{ color: '#a1a1aa' }}>Yes, you can downgrade or cancel your subscription at any time. Changes will take effect at the end of your billing cycle.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default function Pricing(): ReactNode {
  return (
    <div className={styles.pricingPage}>
      <CustomNavbar dark={true} />

      <main>
        <HeroSection />
        <PricingGrid />
        <FAQSection />
      </main>

      <FooterTheme />
    </div>
  );
}
