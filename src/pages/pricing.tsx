import React, { useState, type ReactNode } from 'react';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import emailjs from '@emailjs/browser';
import { X } from 'lucide-react';
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
  onEnterprise,
}: {
  planType: PlanType;
  billingCycle: BillingCycle;
  onEnterprise: () => void;
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

            {tier.isEnterprise ? (
              <button
                className={`${styles.cardBtn} ${styles.enterpriseBtn}`}
                onClick={onEnterprise}
              >
                {tier.buttonText}
              </button>
            ) : (
              <Link
                to={tier.buttonLink}
                className={`${styles.cardBtn} ${tier.highlight ? styles.primaryCardBtn : ''}`}
              >
                {tier.buttonText}
              </Link>
            )}
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

function EnterpriseModal({
  planType,
  onClose,
}: {
  planType: PlanType;
  onClose: () => void;
}) {
  const { siteConfig } = useDocusaurusContext();
  const [form, setForm] = useState({ name: '', email: '', company: '', fleetSize: '', details: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  function update(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === 'loading') return;
    setStatus('loading');

    try {
      await emailjs.send(
        siteConfig.customFields.emailjsServiceId as string,
        siteConfig.customFields.emailjsTemplateId as string,
        {
          name: form.name,
          email: form.email,
          products: `Enterprise Inquiry (${planType === 'ai' ? 'AI + Vehicle Data' : 'Vehicle Data Only'})`,
          details: [
            `Company: ${form.company}`,
            `Fleet Size: ${form.fleetSize}`,
            `Details: ${form.details}`,
          ].join('\n'),
        },
        siteConfig.customFields.emailjsPublicKey as string,
      );
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>

        {status === 'success' ? (
          <div className={styles.modalSuccess}>
            <h3>Thanks, {form.name}!</h3>
            <p>We'll reach out to <strong>{form.email}</strong> shortly to discuss your enterprise needs.</p>
            <button className={styles.modalBtn} onClick={onClose}>Close</button>
          </div>
        ) : (
          <>
            <h3 className={styles.modalTitle}>Contact Us for Enterprise</h3>
            <p className={styles.modalSubtitle}>
              Tell us about your project and we'll put together a custom plan.
            </p>
            <form className={styles.modalForm} onSubmit={handleSubmit}>
              <div className={styles.modalRow}>
                <input
                  className={styles.modalInput}
                  placeholder="Your name"
                  value={form.name}
                  onChange={e => update('name', e.target.value)}
                  required
                />
                <input
                  className={styles.modalInput}
                  type="email"
                  placeholder="Work email"
                  value={form.email}
                  onChange={e => update('email', e.target.value)}
                  required
                />
              </div>
              <div className={styles.modalRow}>
                <input
                  className={styles.modalInput}
                  placeholder="Company name"
                  value={form.company}
                  onChange={e => update('company', e.target.value)}
                  required
                />
                <select
                  className={styles.modalInput}
                  value={form.fleetSize}
                  onChange={e => update('fleetSize', e.target.value)}
                  required
                >
                  <option value="" disabled>Fleet size</option>
                  <option value="100-500">100 – 500 vehicles</option>
                  <option value="500-5000">500 – 5,000 vehicles</option>
                  <option value="5000-50000">5,000 – 50,000 vehicles</option>
                  <option value="50000+">50,000+ vehicles</option>
                </select>
              </div>
              <textarea
                className={styles.modalTextarea}
                placeholder="Tell us about your use case and requirements..."
                value={form.details}
                onChange={e => update('details', e.target.value)}
                rows={4}
              />
              {status === 'error' && (
                <p className={styles.modalError}>Something went wrong. Please try again.</p>
              )}
              <button
                type="submit"
                className={styles.modalBtn}
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Sending...' : 'Get in Touch'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default function Pricing(): ReactNode {
  const [planType, setPlanType] = useState<PlanType>('ai');
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('annual');
  const [showEnterprise, setShowEnterprise] = useState(false);

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
          <PricingGrid
            planType={planType}
            billingCycle={billingCycle}
            onEnterprise={() => setShowEnterprise(true)}
          />
        </main>

        {showEnterprise && (
          <EnterpriseModal
            planType={planType}
            onClose={() => setShowEnterprise(false)}
          />
        )}

        <FooterTheme />
      </div>
    </>
  );
}
