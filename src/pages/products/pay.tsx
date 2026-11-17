import React, { type ReactNode, useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import EnglishLink from '../../components/EnglishLink';
import Head from '@docusaurus/Head';
import { localizeSchema } from '../../lib/seo';
import { usePageLocale } from '../../lib/use-page-locale';
import styles from '../solutions/solutions.module.css';
import FooterTheme from '../../theme/Footer';
import CustomNavbar from '../../components/CustomNavbar';
import Breadcrumbs from '../../components/Breadcrumbs';
import { LINKS } from '../../links';
import {
  CreditCard,
  ShieldCheck,
  ChevronDown,
  CircleDollarSign,
} from 'lucide-react';
import Translate, { translate } from '@docusaurus/Translate';

const PRODUCT_NAME = translate({
  id: 'products.pay.meta.productName',
  message: 'Pay',
});
const HERO_BACKGROUND = '/img/mp4/payments.mp4?v=2';

const FEATURES = [
  {
    icon: <CreditCard size={28} />,
    type: translate({
      id: 'products.pay.features.inVehiclePayments.type',
      message: 'Payments',
    }),
    title: translate({
      id: 'products.pay.features.inVehiclePayments.title',
      message: 'In-Vehicle Payments',
    }),
    description: translate({
      id: 'products.pay.features.inVehiclePayments.description',
      message:
        'Enable seamless payments from inside the vehicle. Fuel, parking, tolls, EV charging - all automated with driver consent.',
    }),
    example: translate({
      id: 'products.pay.features.inVehiclePayments.example',
      message:
        'Drivers pay for EV charging automatically when they plug in/unplug, delete those 20 apps today.',
    }),
  },
  {
    icon: <ShieldCheck size={28} />,
    type: translate({
      id: 'products.pay.features.securityFirstVehicleCommerce.type',
      message: 'Security',
    }),
    title: translate({
      id: 'products.pay.features.securityFirstVehicleCommerce.title',
      message: 'Security-first Vehicle Commerce',
    }),
    description: translate({
      id: 'products.pay.features.securityFirstVehicleCommerce.description',
      message:
        'Built-in security features to protect user data and transactions. Compliance with industry standards and regulations.',
    }),
    example: translate({
      id: 'products.pay.features.securityFirstVehicleCommerce.example',
      message:
        'Drive and pay seamlessly with DIMO, without worrying about security.',
    }),
  },
  {
    icon: <CircleDollarSign size={28} />,
    type: translate({
      id: 'products.pay.features.driverRewardsIncentives.type',
      message: 'Rewards',
    }),
    title: translate({
      id: 'products.pay.features.driverRewardsIncentives.title',
      message: 'Driver Rewards & Incentives',
    }),
    description: translate({
      id: 'products.pay.features.driverRewardsIncentives.description',
      message:
        'Reward drivers for safe driving, eco-friendly habits, or loyalty. Customizable rewards programs to drive engagement and retention.',
    }),
    example: translate({
      id: 'products.pay.features.driverRewardsIncentives.example',
      message:
        'Give drivers cashback for fuel-efficient driving or discounts at partner businesses.',
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
          <CreditCard size={16} /> {PRODUCT_NAME}
        </span>

        <h1 className={styles.heroTitle}>
          <Translate
            id="products.pay.hero.vehicleNative"
            values={{
              span: (
                <span className={styles.heroTitleGradient}>
                  <Translate id="products.pay.hero.commerce">
                    Commerce
                  </Translate>
                </span>
              ),
            }}
          >
            {'Vehicle-Native {span}'}
          </Translate>
        </h1>

        <p className={styles.heroSubtitle}>
          <Translate id="products.pay.hero.incentivizeYourFleetWith">
            Incentivize your fleet with rewards for safe driving, or encourage
            your customers to take their vehicle to a dealership
          </Translate>
        </p>

        <div className={styles.heroButtons}>
          <Link className={styles.primaryBtn} to={LINKS.external.console}>
            <Translate id="products.pay.hero.startBuilding">
              Start Building
            </Translate>{' '}
            <span className={styles.arrow}>→</span>
          </Link>
          <EnglishLink className={styles.secondaryBtn} to="/docs">
            <Translate id="products.pay.hero.viewDocumentation">
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

function FeaturesSection() {
  return (
    <section className={styles.useCasesSection}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionEyebrow}>
          <Translate id="products.pay.features.productFeatures">
            Product Features
          </Translate>
        </span>
        <h2 className={styles.sectionTitle}>
          <Translate id="products.pay.features.paymentsBuiltForMobility">
            Payments Built for Mobility
          </Translate>
        </h2>
        <p className={styles.sectionSubtitle}>
          <Translate id="products.pay.features.fromInVehicleTransactionsTo">
            From in-vehicle transactions to complex multi-party settlements,
            DIMO Pay handles the unique payment needs of the automotive
            industry.
          </Translate>
        </p>
      </div>

      <div className={styles.useCasesGrid}>
        {FEATURES.map((feature, i) => (
          <div key={i} className={styles.useCaseCard}>
            <div className={styles.useCaseIcon}>{feature.icon}</div>
            <div className={styles.useCaseType}>{feature.type}</div>
            <h3 className={styles.useCaseTitle}>{feature.title}</h3>
            <p className={styles.useCaseDesc}>{feature.description}</p>
            <div className={styles.useCaseExample}>{feature.example}</div>
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
          <Translate id="products.pay.cta.readyToIncentivizeDrivers">
            Ready to Incentivize Drivers?
          </Translate>
        </h2>
        <p className={styles.ctaText}>
          <Translate id="products.pay.cta.enableVehicleNativePaymentsAnd">
            Enable vehicle-native payments and rewards. Start processing
            payments in minutes.
          </Translate>
        </p>
        <div className={styles.heroButtons}>
          <Link className={styles.primaryBtn} to={LINKS.external.console}>
            <Translate id="products.pay.cta.getStarted">Get Started</Translate>{' '}
            <span className={styles.arrow}>→</span>
          </Link>
          <EnglishLink className={styles.secondaryBtn} to="/docs">
            <Translate id="products.pay.cta.viewDocumentation">
              View Documentation
            </Translate>{' '}
            <span className={styles.arrow}>→</span>
          </EnglishLink>
        </div>
      </div>
    </section>
  );
}

export default function PayPage(): ReactNode {
  const { locale, path } = usePageLocale();
  return (
    <>
      <Head>
        <title>
          {translate({
            id: 'products.pay.meta.title',
            message: 'Pay | DIMO Vehicle Payments',
          })}
        </title>
        <meta
          name="description"
          content={translate({
            id: 'products.pay.meta.description',
            message:
              'Vehicle-native payments for fuel, parking, tolling, EV charging -- with customizable rewards based on driving data.',
          })}
        />
        <meta
          name="keywords"
          content={translate({
            id: 'products.pay.meta.keywords',
            message:
              'vehicle payments, in-car payments, mobility payments, EV charging payments',
          })}
        />
        <meta
          property="og:title"
          content={translate({
            id: 'products.pay.meta.ogTitle',
            message: 'Pay | DIMO Platform',
          })}
        />
        <meta
          property="og:description"
          content={translate({
            id: 'products.pay.meta.ogDescription',
            message:
              'Enable payments from inside the vehicle with customizable rewards.',
          })}
        />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify(
            localizeSchema(
              {
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                '@id': 'https://dimo.org/products/pay#software',
                name: 'DIMO Pay',
                description: translate({
                  id: 'products.pay.schema.description',
                  message:
                    'Session-scoped stablecoin payment rails for mobility — in-vehicle payments, reimbursements, and per-session spend controls.',
                }),
                url: 'https://dimo.org/products/pay',
                applicationCategory: 'DeveloperApplication',
                operatingSystem: 'Web',
                offers: {
                  '@type': 'Offer',
                  price: '0',
                  priceCurrency: 'USD',
                  availability: 'https://schema.org/OnlineOnly',
                },
                publisher: { '@id': 'https://dimo.org/#organization' },
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
                id: 'products.pay.body.home.name',
                message: 'Home',
              }),
              url: 'https://dimo.org/',
            },
            {
              name: translate({
                id: 'products.pay.body.products.name',
                message: 'Products',
              }),
              url: 'https://dimo.org/#products',
            },
            {
              name: translate({
                id: 'products.pay.body.pay.name',
                message: 'Pay',
              }),
            },
          ]}
        />

        <main>
          <HeroSection />
          <FeaturesSection />
          <CTASection />
        </main>

        <FooterTheme />
      </div>
    </>
  );
}
