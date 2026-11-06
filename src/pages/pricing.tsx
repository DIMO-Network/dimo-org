import React, { useState, useRef, type ReactNode } from 'react';
import Link from '@docusaurus/Link';
import EnglishLink from '../components/EnglishLink';
import Head from '@docusaurus/Head';
import { localizeSchema } from '../lib/seo';
import { usePageLocale } from '../lib/use-page-locale';
import { X } from 'lucide-react';
import { submitLead } from '../utils/lead';
import styles from './pricing.module.css';
import FooterTheme from '../theme/Footer';
import CustomNavbar from '../components/CustomNavbar';
import {
  isValidEmail,
  MIN_FILL_TIME_MS,
  withinCooldown,
  markSubmitted,
} from '../utils/antiSpam';
import Translate, { translate } from '@docusaurus/Translate';

const LAST_SUBMIT_KEY = 'dimo_enterprise_last_submit';

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
      price: translate({ id: 'pricing.tiers.hobbyist.price', message: 'FREE' }),
      period: '',
      subPrice: translate({
        id: 'pricing.tiers.subPrice',
        message: '+ $1.25 per vehicle/mo',
      }),
      description: translate({
        id: 'pricing.tiers.hobbyist.description',
        message: 'Perfect for enthusiasts building for their own vehicles.',
      }),
      features: [
        translate({
          id: 'pricing.tiers.hobbyist.features.accessVehicleData',
          message: 'Access vehicle data securely',
        }),
        ...(planType === 'ai'
          ? [
              translate({
                id: 'pricing.tiers.hobbyist.features.oneAiAgent',
                message: 'Limited to 1 AI agent',
              }),
              translate({
                id: 'pricing.tiers.hobbyist.features.payAsYouGoAi',
                message: 'Pay as you go AI',
              }),
              translate({
                id: 'pricing.tiers.hobbyist.features.builtInMcps',
                message: 'Access to built-in MCPs',
              }),
            ]
          : []),
      ],
      buttonText: translate({
        id: 'pricing.tiers.getStarted',
        message: 'Get Started',
      }),
      buttonLink: 'https://console.dimo.org/sign-in',
      highlight: false,
    },
  ];

  if (planType === 'ai') {
    tiers.push({
      id: 'core',
      name: 'DIMO Core',
      price: billingCycle === 'annual' ? '$349' : '$399',
      period: translate({ id: 'pricing.tiers.perMonth', message: '/mo' }),
      subPrice: translate({
        id: 'pricing.tiers.subPrice',
        message: '+ $1.25 per vehicle/mo',
      }),
      description: translate({
        id: 'pricing.tiers.core.description',
        message: 'For developers building apps for a fleet or user base.',
      }),
      features: [
        translate(
          { id: 'pricing.tiers.everythingIn', message: 'Everything in {plan}' },
          { plan: 'DIMO Hobbyist' }
        ),
        translate({
          id: 'pricing.tiers.core.features.vehiclesIncluded',
          message: '100 vehicles included',
        }),
        translate({
          id: 'pricing.tiers.core.features.moreRequestLimits',
          message: 'More request limits',
        }),
        translate({
          id: 'pricing.tiers.core.features.bringYourOwnData',
          message: 'Bring your own data',
        }),
        translate({
          id: 'pricing.tiers.core.features.dataStorage',
          message: 'Includes data storage',
        }),
      ],
      buttonText: translate({
        id: 'pricing.tiers.startBuilding',
        message: 'Start Building',
      }),
      buttonLink: 'https://console.dimo.org/sign-in',
      highlight: true,
      badge: translate({
        id: 'pricing.tiers.mostPopular',
        message: 'MOST POPULAR',
      }),
    });
  }

  tiers.push({
    id: 'enterprise',
    name: 'DIMO Enterprise',
    price: translate({
      id: 'pricing.tiers.enterprise.price',
      message: 'Custom',
    }),
    subPrice:
      planType === 'data'
        ? undefined
        : translate({
            id: 'pricing.tiers.subPrice',
            message: '+ $1.25 per vehicle/mo',
          }),
    description: translate({
      id: 'pricing.tiers.enterprise.description',
      message: 'Tailored solutions for large-scale deployments.',
    }),
    features: [
      translate(
        { id: 'pricing.tiers.everythingIn', message: 'Everything in {plan}' },
        { plan: planType === 'ai' ? 'DIMO Core' : 'DIMO Hobbyist' }
      ),
      translate({
        id: 'pricing.tiers.enterprise.features.customRequestLimits',
        message: 'Custom request limits',
      }),
      ...(planType === 'ai'
        ? [
            translate({
              id: 'pricing.tiers.enterprise.features.moreAiAgents',
              message: 'More AI agents included',
            }),
            translate({
              id: 'pricing.tiers.enterprise.features.bringYourOwnAiKeys',
              message: 'Bring your own AI keys',
            }),
          ]
        : []),
      translate({
        id: 'pricing.tiers.enterprise.features.dedicatedSupport',
        message: 'Dedicated support channel',
      }),
      translate({
        id: 'pricing.tiers.enterprise.features.customSla',
        message: 'Custom SLA & contracts',
      }),
      translate({
        id: 'pricing.tiers.enterprise.features.onPremise',
        message: 'On-premise deployment options',
      }),
    ],
    buttonText: translate({
      id: 'pricing.tiers.contactUs',
      message: 'Contact Us',
    }),
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
        <div className={styles.earlyBirdBadge}>
          <Translate id="pricing.hero.earlyBirdPricing">
            🎉 Early Bird Pricing
          </Translate>
        </div>
        <h1 className={styles.heroTitle}>
          <Translate id="pricing.hero.chooseYourPlan">
            Choose Your Plan
          </Translate>
        </h1>
        <p className={styles.heroSubtitle}>
          <Translate id="pricing.hero.selectThePerfectPlan">
            Select the perfect plan for your needs. Scale from hobbyist to
            enterprise with flexible pricing options.
          </Translate>
        </p>

        <div className={styles.toggleContainer}>
          {/* Main Plan Toggle */}
          <div className={styles.toggleGroup}>
            <button
              className={`${styles.toggleButton} ${planType === 'ai' ? styles.toggleButtonActive : ''}`}
              onClick={() => setPlanType('ai')}
            >
              <Translate id="pricing.hero.aiVehicleData">
                AI + Vehicle Data
              </Translate>
            </button>
            <button
              className={`${styles.toggleButton} ${planType === 'data' ? styles.toggleButtonActive : ''}`}
              onClick={() => setPlanType('data')}
            >
              <Translate id="pricing.hero.vehicleDataOnly">
                Vehicle Data Only
              </Translate>
            </button>
          </div>

          {/* Billing Cycle Toggle - Only show for AI + Vehicle Data */}
          {planType === 'ai' && (
            <div className={styles.toggleGroup}>
              <button
                className={`${styles.toggleButton} ${billingCycle === 'annual' ? styles.toggleButtonActive : ''}`}
                onClick={() => setBillingCycle('annual')}
              >
                <Translate id="pricing.hero.annual">Annual</Translate>
              </button>
              <button
                className={`${styles.toggleButton} ${billingCycle === 'monthly' ? styles.toggleButtonActive : ''}`}
                onClick={() => setBillingCycle('monthly')}
              >
                <Translate id="pricing.hero.monthly">Monthly</Translate>
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
        <Translate
          id="pricing.pricingGrid.allPlansIncludeAccess"
          values={{
            link: (
              <EnglishLink
                to="/docs"
                style={{ color: '#fff', textDecoration: 'underline' }}
              >
                <Translate id="pricing.pricingGrid.viewDetailedComparison">
                  View detailed comparison
                </Translate>
              </EnglishLink>
            ),
          }}
        >
          {
            'All plans include access to the DIMO network. Need more information? {link}'
          }
        </Translate>
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
        <Translate id="pricing.pricingGrid.earlyBirdPricingIs">
          * Early bird pricing is available for a limited time. Pricing and
          features are subject to change.
        </Translate>
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
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    fleetSize: '',
    details: '',
  });
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const mountedAt = useRef(Date.now());

  function update(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === 'loading') return;

    const trimmedEmail = form.email.trim();
    if (!isValidEmail(trimmedEmail)) {
      setStatus('error');
      return;
    }

    // Honeypot caught a bot, or the form was submitted faster than a human
    // could fill it out. Pretend it worked so the bot doesn't adapt.
    if (honeypot || Date.now() - mountedAt.current < MIN_FILL_TIME_MS) {
      setStatus('success');
      return;
    }

    if (withinCooldown(LAST_SUBMIT_KEY)) {
      setStatus('success');
      return;
    }

    setStatus('loading');

    try {
      await submitLead({
        name: form.name,
        email: trimmedEmail,
        company: form.company,
        products: `Enterprise Inquiry (${planType === 'ai' ? 'AI + Vehicle Data' : 'Vehicle Data Only'})`,
        details: [
          `Company: ${form.company}`,
          `Fleet Size: ${form.fleetSize}`,
          `Details: ${form.details}`,
        ].join('\n'),
        source: 'enterprise',
        honeypot,
        formStartedAt: mountedAt.current,
      });
      markSubmitted(LAST_SUBMIT_KEY);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button
          className={styles.modalClose}
          onClick={onClose}
          aria-label={translate({
            id: 'pricing.enterpriseModal.close',
            message: 'Close',
          })}
        >
          <X size={20} />
        </button>

        {status === 'success' ? (
          <div className={styles.modalSuccess}>
            <h3>
              <Translate
                id="pricing.enterpriseModal.thanks"
                values={{ name: form.name }}
              >
                {'Thanks, {name}!'}
              </Translate>
            </h3>
            <p>
              <Translate
                id="pricing.enterpriseModal.wellReachOutTo"
                values={{ strong: <strong>{form.email}</strong> }}
              >
                {
                  "We'll reach out to {strong} shortly to discuss your enterprise needs."
                }
              </Translate>
            </p>
            <button className={styles.modalBtn} onClick={onClose}>
              <Translate id="pricing.enterpriseModal.close">Close</Translate>
            </button>
          </div>
        ) : (
          <>
            <h3 className={styles.modalTitle}>
              <Translate id="pricing.enterpriseModal.contactUsForEnterprise">
                Contact Us for Enterprise
              </Translate>
            </h3>
            <p className={styles.modalSubtitle}>
              <Translate id="pricing.enterpriseModal.tellUsAboutYour">
                Tell us about your project and we'll put together a custom plan.
              </Translate>
            </p>
            <form className={styles.modalForm} onSubmit={handleSubmit}>
              {/* Honeypot: hidden from sighted users and screen readers, but
                  bots that auto-fill every field will populate it. */}
              <input
                type="text"
                name="website"
                value={honeypot}
                onChange={e => setHoneypot(e.target.value)}
                className={styles.honeypot}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />
              <div className={styles.modalRow}>
                <input
                  className={styles.modalInput}
                  placeholder={translate({
                    id: 'pricing.enterpriseModal.yourName',
                    message: 'Your name',
                  })}
                  value={form.name}
                  onChange={e => update('name', e.target.value)}
                  required
                />
                <input
                  className={styles.modalInput}
                  type="email"
                  placeholder={translate({
                    id: 'pricing.enterpriseModal.workEmail',
                    message: 'Work email',
                  })}
                  value={form.email}
                  onChange={e => update('email', e.target.value)}
                  required
                />
              </div>
              <div className={styles.modalRow}>
                <input
                  className={styles.modalInput}
                  placeholder={translate({
                    id: 'pricing.enterpriseModal.companyName',
                    message: 'Company name',
                  })}
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
                  <option value="" disabled>
                    {translate({
                      id: 'pricing.enterpriseModal.fleetSize',
                      message: 'Fleet size',
                    })}
                  </option>
                  <option value="100-500">
                    {translate({
                      id: 'pricing.enterpriseModal.100500Vehicles',
                      message: '100 – 500 vehicles',
                    })}
                  </option>
                  <option value="500-5000">
                    {translate({
                      id: 'pricing.enterpriseModal.5005000Vehicles',
                      message: '500 – 5,000 vehicles',
                    })}
                  </option>
                  <option value="5000-50000">
                    {translate({
                      id: 'pricing.enterpriseModal.500050000Vehicles',
                      message: '5,000 – 50,000 vehicles',
                    })}
                  </option>
                  <option value="50000+">
                    {translate({
                      id: 'pricing.enterpriseModal.50000Vehicles',
                      message: '50,000+ vehicles',
                    })}
                  </option>
                </select>
              </div>
              <textarea
                className={styles.modalTextarea}
                placeholder={translate({
                  id: 'pricing.enterpriseModal.tellUsAboutYour2',
                  message: 'Tell us about your use case and requirements...',
                })}
                value={form.details}
                onChange={e => update('details', e.target.value)}
                rows={4}
              />
              {status === 'error' && (
                <p className={styles.modalError}>
                  {isValidEmail(form.email)
                    ? translate({
                        id: 'pricing.enterpriseModal.error',
                        message: 'Something went wrong. Please try again.',
                      })
                    : translate({
                        id: 'pricing.enterpriseModal.invalidEmail',
                        message: 'Please enter a valid email address.',
                      })}
                </p>
              )}
              <button
                type="submit"
                className={styles.modalBtn}
                disabled={status === 'loading'}
              >
                {status === 'loading'
                  ? translate({
                      id: 'pricing.enterpriseModal.sending',
                      message: 'Sending...',
                    })
                  : translate({
                      id: 'pricing.enterpriseModal.getInTouch',
                      message: 'Get in Touch',
                    })}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default function Pricing(): ReactNode {
  const { locale, path } = usePageLocale();
  const [planType, setPlanType] = useState<PlanType>('ai');
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('annual');
  const [showEnterprise, setShowEnterprise] = useState(false);

  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>
          {translate({
            id: 'pricing.meta.title',
            message:
              'DIMO Pricing | Vehicle Data API & AI Agent Plans - Start Free',
          })}
        </title>
        <meta
          name="title"
          content={translate({
            id: 'pricing.meta.title',
            message:
              'DIMO Pricing | Vehicle Data API & AI Agent Plans - Start Free',
          })}
        />
        <meta
          name="description"
          content={translate({
            id: 'pricing.meta.description',
            message:
              'Flexible pricing for vehicle data APIs and AI agents. Free hobbyist tier, $349/mo for developers, custom enterprise plans. Access vehicle data across 50+ brands with one platform. Start building today.',
          })}
        />
        <meta
          name="keywords"
          content={translate({
            id: 'pricing.meta.keywords',
            message:
              'vehicle API pricing, DIMO pricing, automotive data costs, car API plans, vehicle intelligence pricing, fleet management pricing, telematics API cost',
          })}
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={translate({
            id: 'pricing.meta.ogTitle',
            message: 'DIMO Pricing | Vehicle Data API & AI Agent Plans',
          })}
        />
        <meta
          property="og:description"
          content={translate({
            id: 'pricing.meta.ogDescription',
            message:
              'Transparent pricing for connected car development. Free to start, scale as you grow. Vehicle data APIs, AI agents, and enterprise solutions.',
          })}
        />
        <meta
          property="og:image"
          content="https://dimo.org/img/dimo-social-card.png"
        />
        <meta property="og:site_name" content="DIMO" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={translate({
            id: 'pricing.meta.twitterTitle',
            message: 'DIMO Pricing | Start Free',
          })}
        />
        <meta
          name="twitter:description"
          content={translate({
            id: 'pricing.meta.twitterDescription',
            message:
              'Free hobbyist tier • $349/mo developer plan • Custom enterprise solutions. Build with vehicle data from 50+ brands.',
          })}
        />
        <meta
          name="twitter:image"
          content="https://dimo.org/img/dimo-social-card.png"
        />

        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />

        {/* Structured Data - Product with Offers */}
        <script type="application/ld+json">
          {JSON.stringify(
            localizeSchema(
              {
                '@context': 'https://schema.org',
                '@type': 'Product',
                '@id': 'https://dimo.org/pricing#product',
                name: 'DIMO Platform',
                url: 'https://dimo.org/pricing',
                image: 'https://dimo.org/img/dimo-social-card.png',
                description:
                  'DIMO is the vehicle data infrastructure that powers the session-based economy. Plans for developers building on real-time, consent-governed vehicle data and AI agents.',
                brand: {
                  '@type': 'Brand',
                  name: 'DIMO',
                },
                offers: [
                  {
                    '@type': 'Offer',
                    name: 'DIMO Hobbyist',
                    price: '0',
                    priceCurrency: 'USD',
                    priceSpecification: {
                      '@type': 'UnitPriceSpecification',
                      price: '0',
                      priceCurrency: 'USD',
                      referenceQuantity: {
                        '@type': 'QuantitativeValue',
                        value: '1',
                        unitText: 'account',
                      },
                    },
                    description:
                      'Free tier for enthusiasts building for their own vehicles. Includes 1 AI agent and pay-as-you-go pricing.',
                    url: 'https://dimo.org/pricing',
                    availability: 'https://schema.org/InStock',
                  },
                  {
                    '@type': 'Offer',
                    name: 'DIMO Core',
                    price: '349',
                    priceCurrency: 'USD',
                    priceSpecification: {
                      '@type': 'UnitPriceSpecification',
                      price: '349',
                      priceCurrency: 'USD',
                      billingDuration: 'P1M',
                      referenceQuantity: {
                        '@type': 'QuantitativeValue',
                        value: '1',
                        unitText: 'month',
                      },
                    },
                    description:
                      'For developers building apps for fleets or user bases. Includes 100 vehicles, higher request limits, and data storage.',
                    url: 'https://dimo.org/pricing',
                    availability: 'https://schema.org/InStock',
                  },
                ],
              },
              locale,
              path
            )
          )}
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
