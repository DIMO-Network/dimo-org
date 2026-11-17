import React, { type ReactNode, useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import EnglishLink from '../../components/EnglishLink';
import Head from '@docusaurus/Head';
import { localizeSchema } from '../../lib/seo';
import { usePageLocale } from '../../lib/use-page-locale';
import styles from './solutions.module.css';
import FooterTheme from '../../theme/Footer';
import CustomNavbar from '../../components/CustomNavbar';
import Breadcrumbs from '../../components/Breadcrumbs';
import { LINKS } from '../../links';
import {
  DollarSign,
  Coins,
  Shield,
  Zap,
  RefreshCw,
  ChevronDown,
  CreditCard,
} from 'lucide-react';
import Translate, { translate } from '@docusaurus/Translate';

const SOLUTION_NAME = translate({
  id: 'solutions.vehicleCommerce.meta.solutionName',
  message: 'Vehicle Commerce',
});
const HERO_BACKGROUND = '/img/mp4/charging.mp4?v=2';
const imgToken = '/img/token.webp';
const imgShop = '/img/shop.png';

const USE_CASES = [
  {
    icon: <Coins size={28} />,
    type: translate({
      id: 'solutions.vehicleCommerce.useCases.stablecoinPayments.type',
      message: 'Payments',
    }),
    title: translate({
      id: 'solutions.vehicleCommerce.useCases.stablecoinPayments.title',
      message: 'Stablecoin Payments',
    }),
    description: translate({
      id: 'solutions.vehicleCommerce.useCases.stablecoinPayments.description',
      message:
        'Accept payments in USDC, USDT, and other stablecoins directly from vehicles. Low fees, instant settlement, and global reach without currency conversion.',
    }),
    example: translate({
      id: 'solutions.vehicleCommerce.useCases.stablecoinPayments.example',
      message:
        'Tolls, parking, charging, and vehicle services—all paid automatically with stable, reliable cryptocurrency.',
    }),
  },
  {
    icon: <Shield size={28} />,
    type: translate({
      id: 'solutions.vehicleCommerce.useCases.x402PaymentProtocol.type',
      message: 'Protocol',
    }),
    title: translate({
      id: 'solutions.vehicleCommerce.useCases.x402PaymentProtocol.title',
      message: 'x402 Payment Protocol',
    }),
    description: translate({
      id: 'solutions.vehicleCommerce.useCases.x402PaymentProtocol.description',
      message:
        'Machine-to-machine payment standard built for vehicles. Automated, secure, and permission-based transactions between vehicles and service providers.',
    }),
    example: translate({
      id: 'solutions.vehicleCommerce.useCases.x402PaymentProtocol.example',
      message:
        'Vehicles pay for services automatically—no user intervention, no payment failures, no friction.',
    }),
  },
  {
    icon: <Zap size={28} />,
    type: translate({
      id: 'solutions.vehicleCommerce.useCases.instantSettlement.type',
      message: 'Infrastructure',
    }),
    title: translate({
      id: 'solutions.vehicleCommerce.useCases.instantSettlement.title',
      message: 'Instant Settlement',
    }),
    description: translate({
      id: 'solutions.vehicleCommerce.useCases.instantSettlement.description',
      message:
        'Payments settle in seconds, not days. Eliminate chargebacks, reduce fraud, and improve cash flow with blockchain-based settlement.',
    }),
    example: translate({
      id: 'solutions.vehicleCommerce.useCases.instantSettlement.example',
      message:
        'Service providers receive funds immediately—no waiting for bank transfers or payment processors.',
    }),
  },
  {
    icon: <DollarSign size={28} />,
    type: translate({
      id: 'solutions.vehicleCommerce.useCases.lowTransactionFees.type',
      message: 'Economics',
    }),
    title: translate({
      id: 'solutions.vehicleCommerce.useCases.lowTransactionFees.title',
      message: 'Low Transaction Fees',
    }),
    description: translate({
      id: 'solutions.vehicleCommerce.useCases.lowTransactionFees.description',
      message:
        'Pay a fraction of traditional payment processing fees. No interchange fees, no processing delays—just simple, cost-effective transactions.',
    }),
    example: translate({
      id: 'solutions.vehicleCommerce.useCases.lowTransactionFees.example',
      message:
        'Save 60-80% on payment processing costs compared to traditional card networks.',
    }),
  },
  {
    icon: <RefreshCw size={28} />,
    type: translate({
      id: 'solutions.vehicleCommerce.useCases.automatedMicropayments.type',
      message: 'Automation',
    }),
    title: translate({
      id: 'solutions.vehicleCommerce.useCases.automatedMicropayments.title',
      message: 'Automated Micropayments',
    }),
    description: translate({
      id: 'solutions.vehicleCommerce.useCases.automatedMicropayments.description',
      message:
        'Enable micropayments for usage-based services. Pay-per-mile insurance, per-kWh charging, or per-minute parking—all automated and seamless.',
    }),
    example: translate({
      id: 'solutions.vehicleCommerce.useCases.automatedMicropayments.example',
      message:
        'Users pay only for what they use, with transactions happening automatically in the background.',
    }),
  },
  {
    icon: <CreditCard size={28} />,
    type: translate({
      id: 'solutions.vehicleCommerce.useCases.seamlessWalletIntegration.type',
      message: 'Integration',
    }),
    title: translate({
      id: 'solutions.vehicleCommerce.useCases.seamlessWalletIntegration.title',
      message: 'Seamless Wallet Integration',
    }),
    description: translate({
      id: 'solutions.vehicleCommerce.useCases.seamlessWalletIntegration.description',
      message:
        'Built-in wallet infrastructure with user-friendly interfaces. Users manage balances, view transactions, and control spending—all within your app.',
    }),
    example: translate({
      id: 'solutions.vehicleCommerce.useCases.seamlessWalletIntegration.example',
      message:
        'One-tap payments, transaction history, and spending controls—native wallet experience included.',
    }),
  },
];

const STATS = [
  {
    number: '<3s',
    label: translate({
      id: 'solutions.vehicleCommerce.stats.paymentSettlement.label',
      message: 'Payment Settlement',
    }),
  },
  {
    number: '70%',
    label: translate({
      id: 'solutions.vehicleCommerce.stats.lowerFees.label',
      message: 'Lower Fees',
    }),
  },
  {
    number: 'USDC/USDT',
    label: translate({
      id: 'solutions.vehicleCommerce.stats.stablecoinsSupported.label',
      message: 'Stablecoins Supported',
    }),
  },
  {
    number: 'x402',
    label: translate({
      id: 'solutions.vehicleCommerce.stats.openProtocol.label',
      message: 'Open Protocol',
    }),
  },
];

function HeroSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={styles.hero}>
      <video
        className={styles.heroBackground}
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        src={HERO_BACKGROUND}
        autoPlay
        loop
        muted
        playsInline
      />
      <div className={styles.heroOverlay} />

      <div className={styles.heroContent}>
        <span className={styles.industryBadge}>
          <DollarSign size={16} /> {SOLUTION_NAME}
        </span>

        <h1 className={styles.heroTitle}>
          <Translate
            id="solutions.vehicleCommerce.hero.enableFrictionlessVehiclePayments"
            values={{
              span: (
                <span className={styles.heroTitleGradient}>
                  <Translate id="solutions.vehicleCommerce.hero.stablecoinsX402">
                    Stablecoins & x402
                  </Translate>
                </span>
              ),
            }}
          >
            {'Enable Frictionless Vehicle Payments with {span}'}
          </Translate>
        </h1>

        <p className={styles.heroSubtitle}>
          <Translate id="solutions.vehicleCommerce.hero.acceptStablecoinPaymentsEnable">
            Accept stablecoin payments, enable machine-to-machine transactions,
            and automate vehicle commerce with the x402 protocol. Low fees,
            instant settlement, and global reach—built for modern mobility.
          </Translate>
        </p>

        <div className={styles.heroButtons}>
          <Link className={styles.primaryBtn} to={LINKS.external.console}>
            <Translate id="solutions.vehicleCommerce.hero.getStarted">
              Get Started
            </Translate>{' '}
            <span className={styles.arrow}>→</span>
          </Link>
          <EnglishLink className={styles.secondaryBtn} to="/docs">
            <Translate id="solutions.vehicleCommerce.hero.viewDocumentation">
              View Documentation
            </Translate>{' '}
            <span className={styles.arrow}>→</span>
          </EnglishLink>
        </div>
      </div>

      <div className={styles.scrollIndicator}>
        <ChevronDown size={32} />
      </div>
    </header>
  );
}

function StatsSection() {
  return (
    <section className={styles.statsBanner}>
      <div className={styles.statsGrid}>
        {STATS.map((stat, i) => (
          <div key={i} className={styles.statItem}>
            <div className={styles.statNumber}>{stat.number}</div>
            <div className={styles.statLabel}>{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function UseCasesSection() {
  return (
    <section className={styles.useCasesSection}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionEyebrow}>
          <Translate id="solutions.vehicleCommerce.useCases.platformFeatures">
            Platform Features
          </Translate>
        </span>
        <h2 className={styles.sectionTitle}>
          <Translate id="solutions.vehicleCommerce.useCases.everythingYouNeedFor">
            Everything You Need for Vehicle Payments
          </Translate>
        </h2>
        <p className={styles.sectionSubtitle}>
          <Translate id="solutions.vehicleCommerce.useCases.fromStablecoinInfrastructureTo">
            From stablecoin infrastructure to the x402 payment protocol, DIMO
            provides the complete platform for building modern vehicle commerce
            applications.
          </Translate>
        </p>
      </div>

      <div className={styles.useCasesGrid}>
        {USE_CASES.map((useCase, i) => (
          <div key={i} className={styles.useCaseCard}>
            <div className={styles.useCaseIcon}>{useCase.icon}</div>
            <div className={styles.useCaseType}>{useCase.type}</div>
            <h3 className={styles.useCaseTitle}>{useCase.title}</h3>
            <p className={styles.useCaseDesc}>{useCase.description}</p>
            <div className={styles.useCaseExample}>{useCase.example}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeatureSection1() {
  return (
    <section className={`${styles.featureSection} ${styles.featureSectionAlt}`}>
      <div className={styles.featureContainer}>
        <div className={styles.featureText}>
          <h2>
            <Translate id="solutions.vehicleCommerce.featureSection1.stablecoinPaymentsFastCheap">
              Stablecoin Payments: Fast, Cheap, Global
            </Translate>
          </h2>
          <p>
            <Translate id="solutions.vehicleCommerce.featureSection1.acceptUsdcUsdtAnd">
              Accept USDC, USDT, and other stablecoins for vehicle services.
              Instant settlement, low fees, and no currency conversion--payments
              that work globally without the complexity of traditional payment
              processors.
            </Translate>
          </p>
          <ul className={styles.featureList}>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="solutions.vehicleCommerce.featureSection1.usdcAndUsdtSupport">
                USDC and USDT support on major blockchains (Polygon, Base, etc.)
              </Translate>
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="solutions.vehicleCommerce.featureSection1.settlementInSecondsNot">
                Settlement in seconds, not days
              </Translate>
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="solutions.vehicleCommerce.featureSection1.70LowerTransactionFees">
                70% lower transaction fees than card networks
              </Translate>
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="solutions.vehicleCommerce.featureSection1.noChargebacksNoFraud">
                No chargebacks, no fraud -- immutable on-chain transactions
              </Translate>
            </li>
          </ul>
        </div>
        <div className={styles.featureVisual}>
          <img
            src={imgToken}
            alt={translate({
              id: 'solutions.vehicleCommerce.featureSection1.stablecoinTokens',
              message: 'Stablecoin Tokens',
            })}
          />
        </div>
      </div>
    </section>
  );
}

function FeatureSection2() {
  return (
    <section className={styles.featureSection}>
      <div
        className={`${styles.featureContainer} ${styles.featureContainerReversed}`}
      >
        <div className={styles.featureText}>
          <h2>
            <Translate id="solutions.vehicleCommerce.featureSection2.x402ProtocolMachineToMachinePayments">
              x402 Protocol: Machine-to-Machine Payments
            </Translate>
          </h2>
          <p>
            <Translate id="solutions.vehicleCommerce.featureSection2.theX402ProtocolEnables">
              The x402 protocol enables automated, permission-based transactions
              between vehicles and service providers. Vehicles pay for tolls,
              parking, charging, and services automatically—no user interaction
              required.
            </Translate>
          </p>
          <ul className={styles.featureList}>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="solutions.vehicleCommerce.featureSection2.openStandardForVehicleToInfrastructure">
                Open standard for vehicle-to-infrastructure payments
              </Translate>
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="solutions.vehicleCommerce.featureSection2.permissionBasedSpendingWithUserDefined">
                Permission-based spending with user-defined limits
              </Translate>
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="solutions.vehicleCommerce.featureSection2.automatedPaymentsWithoutUser">
                Automated payments without user intervention
              </Translate>
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="solutions.vehicleCommerce.featureSection2.compatibleWithExistingPayment">
                Compatible with existing payment infrastructure
              </Translate>
            </li>
          </ul>
        </div>
        <div className={styles.featureVisual}>
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            aria-label={translate({
              id: 'solutions.vehicleCommerce.featureSection2.x402ProtocolDiagram',
              message: 'x402 Protocol Diagram',
            })}
          >
            <source src="/img/dimo-pathways.webm" type="video/webm" />
            <source src="/img/dimo-pathways.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
}

function FeatureSection3() {
  return (
    <section className={`${styles.featureSection} ${styles.featureSectionAlt}`}>
      <div className={styles.featureContainer}>
        <div className={styles.featureText}>
          <h2>
            <Translate id="solutions.vehicleCommerce.featureSection3.builtInWalletInfrastructure">
              Built-In Wallet Infrastructure
            </Translate>
          </h2>
          <p>
            <Translate id="solutions.vehicleCommerce.featureSection3.completeWalletSolutionWith">
              Complete wallet solution with user-friendly interfaces. Users
              manage balances, view transaction history, and control
              spending—all integrated into your application with no additional
              development required.
            </Translate>
          </p>
          <ul className={styles.featureList}>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="solutions.vehicleCommerce.featureSection3.nonCustodialWalletsWithSecure">
                Non-custodial wallets with secure key management
              </Translate>
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="solutions.vehicleCommerce.featureSection3.onOffRampIntegrationsFor">
                On/off ramp integrations for fiat conversion
              </Translate>
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="solutions.vehicleCommerce.featureSection3.transactionHistoryAndSpending">
                Transaction history and spending analytics
              </Translate>
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="solutions.vehicleCommerce.featureSection3.spendingLimitsAndParental">
                Spending limits and parental controls
              </Translate>
            </li>
          </ul>
        </div>
        <div className={styles.featureVisual}>
          <img
            src={imgShop}
            alt={translate({
              id: 'solutions.vehicleCommerce.featureSection3.walletInterface',
              message: 'Wallet Interface',
            })}
          />
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      title: translate({
        id: 'solutions.vehicleCommerce.howItWorks.integratePaymentInfrastructure.title',
        message: 'Integrate Payment Infrastructure',
      }),
      description: translate({
        id: 'solutions.vehicleCommerce.howItWorks.integratePaymentInfrastructure.description',
        message:
          "Add DIMO's wallet and payment infrastructure to your app. Users create wallets and fund them with stablecoins through our on-ramp integrations.",
      }),
    },
    {
      title: translate({
        id: 'solutions.vehicleCommerce.howItWorks.configureX402Permissions.title',
        message: 'Configure x402 Permissions',
      }),
      description: translate({
        id: 'solutions.vehicleCommerce.howItWorks.configureX402Permissions.description',
        message:
          'Users grant payment permissions to their vehicles with spending limits and service categories. All permissions are transparent and revocable.',
      }),
    },
    {
      title: translate({
        id: 'solutions.vehicleCommerce.howItWorks.enableAutomatedPayments.title',
        message: 'Enable Automated Payments',
      }),
      description: translate({
        id: 'solutions.vehicleCommerce.howItWorks.enableAutomatedPayments.description',
        message:
          'Vehicles pay for services automatically using x402 protocol. Tolls, parking, charging—all handled without user intervention.',
      }),
    },
    {
      title: translate({
        id: 'solutions.vehicleCommerce.howItWorks.trackSettleInstantly.title',
        message: 'Track & Settle Instantly',
      }),
      description: translate({
        id: 'solutions.vehicleCommerce.howItWorks.trackSettleInstantly.description',
        message:
          'Payments settle in seconds on-chain. Service providers receive funds immediately, and users see real-time transaction history.',
      }),
    },
  ];

  return (
    <section className={styles.howItWorksSection}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionEyebrow}>
          <Translate id="solutions.vehicleCommerce.howItWorks.howItWorks">
            How It Works
          </Translate>
        </span>
        <h2 className={styles.sectionTitle}>
          <Translate id="solutions.vehicleCommerce.howItWorks.enableVehiclePayments">
            Enable Vehicle Payments
          </Translate>
        </h2>
        <p className={styles.sectionSubtitle}>
          <Translate id="solutions.vehicleCommerce.howItWorks.fromWalletIntegrationTo">
            From wallet integration to automated payments, DIMO makes it easy to
            build vehicle commerce applications with stablecoins and x402.
          </Translate>
        </p>
      </div>

      <div className={styles.stepsContainer}>
        {steps.map((step, i) => (
          <div key={i} className={styles.step}>
            <div className={styles.stepNumber}>{i + 1}</div>
            <div className={styles.stepLine} />
            <div className={styles.stepContent}>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.ctaContent}>
        <h2 className={styles.ctaTitle}>
          <Translate id="solutions.vehicleCommerce.cta.readyToEnableVehicle">
            Ready to Enable Vehicle Commerce?
          </Translate>
        </h2>
        <p className={styles.ctaText}>
          <Translate id="solutions.vehicleCommerce.cta.joinTheCompaniesBuilding">
            Join the companies building the future of vehicle payments with
            stablecoins and the x402 protocol.
          </Translate>
        </p>
        <div className={styles.heroButtons}>
          <Link className={styles.primaryBtn} to={LINKS.external.console}>
            <Translate id="solutions.vehicleCommerce.cta.getStarted">
              Get Started
            </Translate>{' '}
            <span className={styles.arrow}>→</span>
          </Link>
          <EnglishLink className={styles.secondaryBtn} to="/docs">
            <Translate id="solutions.vehicleCommerce.cta.viewDocumentation">
              View Documentation
            </Translate>{' '}
            <span className={styles.arrow}>→</span>
          </EnglishLink>
        </div>
      </div>
    </section>
  );
}

export default function VehicleCommercePage(): ReactNode {
  const { locale, path } = usePageLocale();
  return (
    <>
      <Head>
        <title>
          {translate({
            id: 'solutions.vehicleCommerce.meta.title',
            message: 'Vehicle Commerce | Stablecoin Payments & x402 Protocol',
          })}
        </title>
        <meta
          name="description"
          content={translate({
            id: 'solutions.vehicleCommerce.meta.description',
            message:
              'Enable frictionless vehicle payments with stablecoins (USDC, USDT) and the x402 protocol. Instant settlement, low fees, and automated machine-to-machine transactions.',
          })}
        />
        <meta
          name="keywords"
          content={translate({
            id: 'solutions.vehicleCommerce.meta.keywords',
            message:
              'vehicle payments, stablecoin payments, USDC, USDT, x402 protocol, crypto payments, blockchain payments, vehicle commerce, automated payments',
          })}
        />
        <meta
          property="og:title"
          content={translate({
            id: 'solutions.vehicleCommerce.meta.ogTitle',
            message: 'Vehicle Commerce | DIMO Platform',
          })}
        />
        <meta
          property="og:description"
          content={translate({
            id: 'solutions.vehicleCommerce.meta.ogDescription',
            message:
              'Accept stablecoin payments and enable automated vehicle transactions with x402 protocol. Low fees, instant settlement, and global reach.',
          })}
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />

        {/* Structured Data for SEO */}
        <script type="application/ld+json">
          {JSON.stringify(
            localizeSchema(
              {
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: translate({
                  id: 'solutions.vehicleCommerce.schema.dimoVehicleCommerce.name',
                  message: 'DIMO Vehicle Commerce Platform',
                }),
                description: translate({
                  id: 'solutions.vehicleCommerce.schema.dimoVehicleCommerce.description',
                  message:
                    'Vehicle payment platform with stablecoin support and x402 protocol. Enable automated, low-fee payments for mobility services.',
                }),
                applicationCategory: 'FinanceApplication',
                offers: {
                  '@type': 'Offer',
                  price: '0',
                  priceCurrency: 'USD',
                },
              },
              locale,
              path
            )
          )}
        </script>
      </Head>

      <div className={styles.industryPage}>
        <CustomNavbar dark={true} />

        <Breadcrumbs
          items={[
            {
              name: translate({
                id: 'solutions.vehicleCommerce.body.home.name',
                message: 'Home',
              }),
              url: 'https://dimo.org/',
            },
            {
              name: translate({
                id: 'solutions.vehicleCommerce.body.solutions.name',
                message: 'Solutions',
              }),
              url: 'https://dimo.org/#solutions',
            },
            {
              name: translate({
                id: 'solutions.vehicleCommerce.body.vehicleCommerce.name',
                message: 'Vehicle Commerce',
              }),
            },
          ]}
        />

        <main>
          <HeroSection />
          <StatsSection />
          <UseCasesSection />
          <FeatureSection1 />
          <FeatureSection2 />
          <FeatureSection3 />
          <HowItWorksSection />
          <CTASection />
        </main>

        <FooterTheme />
      </div>
    </>
  );
}
