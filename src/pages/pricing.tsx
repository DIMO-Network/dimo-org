import React, { useState, type ReactNode } from 'react';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import styles from './pricing.module.css';
import FooterTheme from '../theme/Footer';
import CustomNavbar from '../components/CustomNavbar';

type BillingCycle = 'annual' | 'monthly';
type PlanType = 'ai' | 'data';

interface PricingTier {
  id: string;
  name: string;
  price: string;
  period?: string;
  subPrice?: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonLink: string;
  highlight: boolean;
  badge?: string;
  isEnterprise?: boolean;
}

const getPricingTiers = (
  planType: PlanType,
  billingCycle: BillingCycle
): PricingTier[] => {
  const tiers: PricingTier[] = [
    {
      id: 'hobbyist',
      name: 'DIMO Hobbyist',
      price: 'FREE',
      period: '',
      subPrice: '+ $1.25 per vehicle/mo',
      description: 'Perfect for enthusiasts building for their own vehicles.',
      features: [
        'Access vehicle data securely',
        ...(planType === 'ai'
          ? [
              'Limited to 1 AI agent',
              'Pay as you go AI',
              'Access to built-in MCPs',
            ]
          : []),
      ],
      buttonText: 'Get Started',
      buttonLink: 'https://console.dimo.org/sign-in',
      highlight: false,
    },
  ];

  if (planType === 'ai') {
    tiers.push({
      id: 'core',
      name: 'DIMO Core',
      price: billingCycle === 'annual' ? '$349' : '$399',
      period: '/mo',
      subPrice: '+ $1.25 per vehicle/mo',
      description: 'For developers building apps for a fleet or user base.',
      features: [
        'Everything in DIMO Hobbyist',
        '100 vehicles included',
        'More request limits',
        'Bring your own data',
        'Includes data storage',
      ],
      buttonText: 'Start Building',
      buttonLink: 'https://console.dimo.org/sign-in',
      highlight: true,
      badge: 'MOST POPULAR',
    });
  }

  tiers.push({
    id: 'enterprise',
    name: 'DIMO Enterprise',
    price: 'Custom',
    subPrice: planType === 'data' ? undefined : '+ $1.25 per vehicle/mo',
    description: 'Tailored solutions for large-scale deployments.',
    features: [
      `Everything in ${planType === 'ai' ? 'DIMO Core' : 'DIMO Hobbyist'}`,
      'Custom request limits',
      ...(planType === 'ai'
        ? ['More AI agents included', 'Bring your own AI keys']
        : []),
      'Dedicated support channel',
      'Custom SLA & contracts',
      'On-premise deployment options',
    ],
    buttonText: 'Contact Us',
    buttonLink: 'https://app.formcrafts.com/7c869c6f',
    highlight: false,
    isEnterprise: true,
  });

  return tiers;
};

function HeroSection({
  planType,
  setPlanType,
  billingCycle,
  setBillingCycle,
}: {
  planType: PlanType;
  setPlanType: (t: PlanType) => void;
  billingCycle: BillingCycle;
  setBillingCycle: (b: BillingCycle) => void;
}) {
  return (
    <header className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={styles.earlyBirdBadge}>🎉 Early Bird Pricing</div>
        <h1 className={styles.heroTitle}>Choose Your Plan</h1>
        <p className={styles.heroSubtitle}>
          Select the perfect plan for your needs. Scale from hobbyist to
          enterprise with flexible pricing options.
        </p>

        <div className={styles.toggleContainer}>
          {/* Main Plan Toggle */}
          <div className={styles.toggleGroup}>
            <button
              className={`${styles.toggleButton} ${planType === 'ai' ? styles.toggleButtonActive : ''}`}
              onClick={() => setPlanType('ai')}
            >
              AI + Vehicle Data
            </button>
            <button
              className={`${styles.toggleButton} ${planType === 'data' ? styles.toggleButtonActive : ''}`}
              onClick={() => setPlanType('data')}
            >
              Vehicle Data Only
            </button>
          </div>

          {/* Billing Cycle Toggle - Only show for AI + Vehicle Data */}
          {planType === 'ai' && (
            <div className={styles.toggleGroup}>
              <button
                className={`${styles.toggleButton} ${billingCycle === 'annual' ? styles.toggleButtonActive : ''}`}
                onClick={() => setBillingCycle('annual')}
              >
                Annual
              </button>
              <button
                className={`${styles.toggleButton} ${billingCycle === 'monthly' ? styles.toggleButtonActive : ''}`}
                onClick={() => setBillingCycle('monthly')}
              >
                Monthly
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function PricingGrid({
  planType,
  billingCycle,
}: {
  planType: PlanType;
  billingCycle: BillingCycle;
}) {
  const tiers = getPricingTiers(planType, billingCycle);

  return (
    <section className={styles.pricingSection}>
      <div className={styles.pricingGrid} data-count={tiers.length}>
        {tiers.map(tier => (
          <div
            key={tier.id}
            className={`${styles.pricingCard} ${
              tier.highlight ? styles.featuredCard : ''
            } ${tier.isEnterprise ? styles.enterpriseCard : ''}`}
          >
            {tier.badge && (
              <div className={styles.mostPopularBadge}>{tier.badge}</div>
            )}
            <div className={styles.cardGlow} />

            <h3 className={styles.tierName}>{tier.name}</h3>

            <div className={styles.tierPriceContainer}>
              <div className={styles.tierPrice}>
                {tier.price}
                {tier.period && (
                  <span className={styles.tierPeriod}>{tier.period}</span>
                )}
              </div>
              {tier.subPrice && (
                <span className={styles.tierSubPrice}>{tier.subPrice}</span>
              )}
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
      <div
        style={{
          textAlign: 'center',
          marginTop: '3rem',
          color: 'var(--hp-text-muted)',
          fontSize: '0.9rem',
        }}
      >
        All plans include access to the DIMO network. Need more information?{' '}
        <Link to="/docs" style={{ color: '#fff', textDecoration: 'underline' }}>
          View detailed comparison
        </Link>
      </div>
      <div
        style={{
          textAlign: 'center',
          marginTop: '2rem',
          color: 'var(--hp-text-muted)',
          fontSize: '0.85rem',
          fontStyle: 'italic',
        }}
      >
        * Early bird pricing is available for a limited time. Pricing and
        features are subject to change.
      </div>
    </section>
  );
}

export default function Pricing(): ReactNode {
  const [planType, setPlanType] = useState<PlanType>('ai');
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('annual');

  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>DIMO Pricing | Vehicle Data API & AI Agent Plans - Start Free</title>
        <meta name="title" content="DIMO Pricing | Vehicle Data API & AI Agent Plans - Start Free" />
        <meta
          name="description"
          content="Flexible pricing for vehicle data APIs and AI agents. Free hobbyist tier, $349/mo for developers, custom enterprise plans. Connect 50+ OEMs with one platform. Start building today."
        />
        <meta
          name="keywords"
          content="vehicle API pricing, DIMO pricing, automotive data costs, car API plans, vehicle intelligence pricing, fleet management pricing, telematics API cost"
        />

        {/* Canonical URL */}
        <link rel="canonical" href="https://www.dimo.org/pricing" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.dimo.org/pricing" />
        <meta property="og:title" content="DIMO Pricing | Vehicle Data API & AI Agent Plans" />
        <meta
          property="og:description"
          content="Transparent pricing for connected car development. Free to start, scale as you grow. Vehicle data APIs, AI agents, and enterprise solutions."
        />
        <meta property="og:image" content="https://www.dimo.org/img/dimo-social-card.png" />
        <meta property="og:site_name" content="DIMO" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.dimo.org/pricing" />
        <meta name="twitter:title" content="DIMO Pricing | Start Free" />
        <meta
          name="twitter:description"
          content="Free hobbyist tier • $349/mo developer plan • Custom enterprise solutions. Build with vehicle data from 50+ OEMs."
        />
        <meta name="twitter:image" content="https://www.dimo.org/img/dimo-social-card.png" />

        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />

        {/* Structured Data - Product with Offers */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "DIMO Platform",
            "description": "Vehicle intelligence platform with AI agents and data APIs for connected car development",
            "brand": {
              "@type": "Brand",
              "name": "DIMO"
            },
            "offers": [
              {
                "@type": "Offer",
                "name": "DIMO Hobbyist",
                "price": "0",
                "priceCurrency": "USD",
                "priceSpecification": {
                  "@type": "UnitPriceSpecification",
                  "price": "0",
                  "priceCurrency": "USD",
                  "referenceQuantity": {
                    "@type": "QuantitativeValue",
                    "value": "1",
                    "unitText": "account"
                  }
                },
                "description": "Free tier for enthusiasts building for their own vehicles. Includes 1 AI agent and pay-as-you-go pricing.",
                "url": "https://www.dimo.org/pricing",
                "availability": "https://schema.org/InStock"
              },
              {
                "@type": "Offer",
                "name": "DIMO Core",
                "price": "349",
                "priceCurrency": "USD",
                "priceSpecification": {
                  "@type": "UnitPriceSpecification",
                  "price": "349",
                  "priceCurrency": "USD",
                  "billingDuration": "P1M",
                  "referenceQuantity": {
                    "@type": "QuantitativeValue",
                    "value": "1",
                    "unitText": "month"
                  }
                },
                "description": "For developers building apps for fleets or user bases. Includes 100 vehicles, higher request limits, and data storage.",
                "url": "https://www.dimo.org/pricing",
                "availability": "https://schema.org/InStock"
              },
              {
                "@type": "Offer",
                "name": "DIMO Enterprise",
                "price": "0",
                "priceCurrency": "USD",
                "priceSpecification": {
                  "@type": "PriceSpecification",
                  "priceCurrency": "USD",
                  "price": "Contact for pricing"
                },
                "description": "Custom solutions for large-scale deployments with dedicated support, custom SLAs, and on-premise options.",
                "url": "https://www.dimo.org/pricing",
                "availability": "https://schema.org/InStock"
              }
            ],
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5",
              "ratingCount": "4",
              "reviewCount": "4"
            }
          })}
        </script>
      </Head>

      <div className={styles.pricingPage}>
        <CustomNavbar dark={true} />

        <main>
          <HeroSection
            planType={planType}
            setPlanType={setPlanType}
            billingCycle={billingCycle}
            setBillingCycle={setBillingCycle}
          />
          <PricingGrid planType={planType} billingCycle={billingCycle} />
        </main>

        <FooterTheme />
      </div>
    </>
  );
}
