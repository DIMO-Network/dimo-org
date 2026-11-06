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
import ConsentFlow from '../../components/ConsentFlow';
import { LINKS } from '../../links';
import {
  Shield,
  UserCheck,
  FileCheck,
  ChevronDown,
  ShieldCheck,
} from 'lucide-react';
import Translate, { translate } from '@docusaurus/Translate';

const PRODUCT_NAME = translate({
  id: 'products.consent.meta.productName',
  message: 'Consent',
});
const HERO_BACKGROUND = '/img/mp4/consent.mp4?v=2';

const FEATURES = [
  {
    icon: <UserCheck size={28} />,
    type: translate({
      id: 'products.consent.features.granularPermissionScopes.type',
      message: 'User Control',
    }),
    title: translate({
      id: 'products.consent.features.granularPermissionScopes.title',
      message: 'Granular Permission Scopes',
    }),
    description: translate({
      id: 'products.consent.features.granularPermissionScopes.description',
      message:
        'Users grant access to specific data types and actions. Location, diagnostics, commands - each permission is individually controllable and revocable.',
    }),
    example: translate({
      id: 'products.consent.features.granularPermissionScopes.example',
      message:
        'Grant/revoke/extend permissions with Login with DIMO, allowing users to easily manage consent preferences.',
    }),
  },
  {
    icon: <Shield size={28} />,
    type: translate({
      id: 'products.consent.features.cryptographicallyVerifiedConsent.type',
      message: 'Verification',
    }),
    title: translate({
      id: 'products.consent.features.cryptographicallyVerifiedConsent.title',
      message: 'Cryptographically Verified Consent',
    }),
    description: translate({
      id: 'products.consent.features.cryptographicallyVerifiedConsent.description',
      message:
        'Every consent grant is recorded as a cryptographically signed, independently verifiable entry, creating an immutable audit trail. Prove compliance with cryptographic certainty.',
    }),
    example: translate({
      id: 'products.consent.features.cryptographicallyVerifiedConsent.example',
      message:
        'Instant verification of consent status for auditors and regulators.',
    }),
  },
  {
    icon: <FileCheck size={28} />,
    type: translate({
      id: 'products.consent.features.builtInRegulatoryCompliance.type',
      message: 'Compliance',
    }),
    title: translate({
      id: 'products.consent.features.builtInRegulatoryCompliance.title',
      message: 'Built-In Regulatory Compliance',
    }),
    description: translate({
      id: 'products.consent.features.builtInRegulatoryCompliance.description',
      message:
        'GDPR & EU Data Act compliant out of the box. Automated data subject requests, right to erasure, and consent withdrawal.',
    }),
    example: translate({
      id: 'products.consent.features.builtInRegulatoryCompliance.example',
      message:
        'One-click GDPR data export and deletion for any user, fully automated.',
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
          <ShieldCheck size={16} /> {PRODUCT_NAME}
        </span>

        <h1 className={styles.heroTitle}>
          <Translate
            id="products.consent.hero.userControlledData"
            values={{
              span: (
                <span className={styles.heroTitleGradient}>
                  <Translate id="products.consent.hero.consent">
                    Consent
                  </Translate>
                </span>
              ),
            }}
          >
            {'User-Controlled Data {span}'}
          </Translate>
        </h1>

        <p className={styles.heroSubtitle}>
          <Translate id="products.consent.hero.giveUsersCompleteControl">
            Give users complete control over their vehicle data.
            Cryptographically verified consent management with built-in
            regulatory compliance.
          </Translate>
        </p>

        <div className={styles.heroButtons}>
          <Link className={styles.primaryBtn} to={LINKS.external.console}>
            <Translate id="products.consent.hero.startBuilding">
              Start Building
            </Translate>{' '}
            <span className={styles.arrow}>→</span>
          </Link>
          <EnglishLink className={styles.secondaryBtn} to="/docs">
            <Translate id="products.consent.hero.viewDocumentation">
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
          <Translate id="products.consent.features.productFeatures">
            Product Features
          </Translate>
        </span>
        <h2 className={styles.sectionTitle}>
          <Translate id="products.consent.features.privacyFirstConsentManagement">
            Privacy-First Consent Management
          </Translate>
        </h2>
        <p className={styles.sectionSubtitle}>
          <Translate id="products.consent.features.buildUserTrustWith">
            Build user trust with transparent, verifiable consent. Meet
            regulatory requirements while creating seamless user experiences.
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
          <Translate id="products.consent.cta.readyToBuildTrust">
            Ready to Build Trust with Users?
          </Translate>
        </h2>
        <p className={styles.ctaText}>
          <Translate id="products.consent.cta.implementConsentManagementThat">
            Implement consent management that users trust and regulators
            approve. Get started with Login with DIMO today.
          </Translate>
        </p>
        <div className={styles.heroButtons}>
          <Link className={styles.primaryBtn} to={LINKS.external.console}>
            <Translate id="products.consent.cta.getStarted">
              Get Started
            </Translate>{' '}
            <span className={styles.arrow}>→</span>
          </Link>
          <EnglishLink className={styles.secondaryBtn} to="/docs">
            <Translate id="products.consent.cta.viewDocumentation">
              View Documentation
            </Translate>{' '}
            <span className={styles.arrow}>→</span>
          </EnglishLink>
        </div>
      </div>
    </section>
  );
}

export default function ConsentPage(): ReactNode {
  const { locale, path } = usePageLocale();
  return (
    <>
      <Head>
        <title>
          {translate({
            id: 'products.consent.meta.title',
            message: 'Consent | DIMO User Consent Management',
          })}
        </title>
        <meta
          name="description"
          content={translate({
            id: 'products.consent.meta.description',
            message:
              'User-controlled vehicle data consent with cryptographic verification and built-in regulatory compliance. GDPR, CCPA, EU Data Act ready.',
          })}
        />
        <meta
          name="keywords"
          content={translate({
            id: 'products.consent.meta.keywords',
            message:
              'consent management, GDPR compliance, OAuth 2.0, Login with DIMO, data privacy, cryptographic verification',
          })}
        />
        <meta
          property="og:title"
          content={translate({
            id: 'products.consent.meta.ogTitle',
            message: 'Consent | DIMO Platform',
          })}
        />
        <meta
          property="og:description"
          content={translate({
            id: 'products.consent.meta.ogDescription',
            message:
              'Privacy-first consent management with cryptographic verification and regulatory compliance.',
          })}
        />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify(
            localizeSchema(
              {
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                '@id': 'https://dimo.org/products/consent#software',
                name: 'DIMO Consent',
                description:
                  'Privacy-preserving, user-owned consent management for vehicle data — session-scoped permissions with atomic grant and revocation (SACD).',
                url: 'https://dimo.org/products/consent',
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
                id: 'products.consent.body.home.name',
                message: 'Home',
              }),
              url: 'https://dimo.org/',
            },
            {
              name: translate({
                id: 'products.consent.body.products.name',
                message: 'Products',
              }),
              url: 'https://dimo.org/#products',
            },
            {
              name: translate({
                id: 'products.consent.body.consent.name',
                message: 'Consent',
              }),
            },
          ]}
        />

        <main>
          <HeroSection />
          <ConsentFlow />
          <FeaturesSection />
          <CTASection />
        </main>

        <FooterTheme />
      </div>
    </>
  );
}
