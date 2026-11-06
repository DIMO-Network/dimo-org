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
  Wallet,
  Smartphone,
  Terminal,
  Bot,
  Car,
  ChevronDown,
  Layers,
} from 'lucide-react';
import Translate, { translate } from '@docusaurus/Translate';

const PRODUCT_NAME = translate({
  id: 'products.components.meta.productName',
  message: 'Components',
});

const COMPONENTS = [
  {
    id: 'wallet',
    icon: <Wallet size={28} />,
    type: translate({
      id: 'products.components.components.selfCustodiedVehicleIdentity.type',
      message: 'Wallet',
    }),
    title: translate({
      id: 'products.components.components.selfCustodiedVehicleIdentity.title',
      message: 'Self-Custodied Vehicle Identity',
    }),
    description: translate({
      id: 'products.components.components.selfCustodiedVehicleIdentity.description',
      message:
        'The DIMO Wallet gives vehicle owners a self-custodied identity on the DIMO Network, used to sign transactions, manage permissions, and hold digital assets.',
    }),
    example: translate({
      id: 'products.components.components.selfCustodiedVehicleIdentity.example',
      message:
        'Passkey-based authentication — no seed phrases. Sign SACD permission grants and hold digital IDs and verifiable credentials.',
    }),
  },
  {
    id: 'digital-key',
    icon: <Smartphone size={28} />,
    type: translate({
      id: 'products.components.components.phoneAsKeyVehicleAccess.type',
      message: 'Digital Key (CCC)',
    }),
    title: translate({
      id: 'products.components.components.phoneAsKeyVehicleAccess.title',
      message: 'Phone-as-Key Vehicle Access',
    }),
    description: translate({
      id: 'products.components.components.phoneAsKeyVehicleAccess.description',
      message:
        "Digital Key enables a smartphone to lock, unlock, and start a vehicle without a physical key fob — integrated into DIMO's identity and permissions layer.",
    }),
    example: translate({
      id: 'products.components.components.phoneAsKeyVehicleAccess.example',
      message:
        "NFC and BLE-based access. Time-bound or permission-scoped key sharing tied to the vehicle's verifiable identity for auditability.",
    }),
  },
  {
    id: 'agents',
    icon: <Bot size={28} />,
    type: translate({
      id: 'products.components.components.autonomousVehicleIntelligence.type',
      message: 'Agents',
    }),
    title: translate({
      id: 'products.components.components.autonomousVehicleIntelligence.title',
      message: 'Autonomous Vehicle Intelligence',
    }),
    description: translate({
      id: 'products.components.components.autonomousVehicleIntelligence.description',
      message:
        'Build AI agents that can reason about vehicle data, take actions, and automate workflows — from scheduling maintenance to monitoring fleet health.',
    }),
    example: translate({
      id: 'products.components.components.autonomousVehicleIntelligence.example',
      message:
        'Create agents that respond to vehicle events, book appointments, pay for services, alert drivers, and integrate with your existing business systems. Start creating agentic sessions for autonomous vehicles today.',
    }),
  },
  {
    id: 'developer-tools',
    icon: <Terminal size={28} />,
    type: translate({
      id: 'products.components.components.everythingYouNeed.type',
      message: 'Developer Tools',
    }),
    title: translate({
      id: 'products.components.components.everythingYouNeed.title',
      message: 'Everything You Need to Build',
    }),
    description: translate({
      id: 'products.components.components.everythingYouNeed.description',
      message:
        'DIMO provides a full suite of developer tools — SDKs, a developer console, APIs, and AI-native integrations — to get you from zero to production quickly.',
    }),
    example: translate({
      id: 'products.components.components.everythingYouNeed.example',
      message:
        'Client and server SDKs, MCP server for AI agents, webhooks, a GraphQL playground, and the Developer Console for managing licenses and permissions.',
    }),
  },
];

function HeroSection() {
  const [, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={styles.hero}>
      <div
        className={styles.heroOverlay}
        style={{
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 50%, rgba(3,3,3,1) 100%)',
        }}
      />

      <div className={styles.heroContent}>
        <span className={styles.industryBadge}>
          <Layers size={16} /> {PRODUCT_NAME}
        </span>

        <h1 className={styles.heroTitle}>
          <Translate
            id="products.components.hero.theBuildingBlocksOf"
            values={{
              span: (
                <span className={styles.heroTitleGradient}>
                  <Translate id="products.components.hero.vehicleOwnership">
                    Vehicle Ownership
                  </Translate>
                </span>
              ),
            }}
          >
            {'The Building Blocks of {span}'}
          </Translate>
        </h1>

        <p className={styles.heroSubtitle}>
          <Translate id="products.components.hero.walletsDigitalKeyAgents">
            Wallets, digital key, agents, and developer tools — the core
            components that power the DIMO Network.
          </Translate>
        </p>

        <div className={styles.heroButtons}>
          <Link className={styles.primaryBtn} to={LINKS.external.console}>
            <Translate id="products.components.hero.startBuilding">
              Start Building
            </Translate>{' '}
            <span className={styles.arrow}>→</span>
          </Link>
          <EnglishLink className={styles.secondaryBtn} to="/docs">
            <Translate id="products.components.hero.viewDocumentation">
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

function ComponentsSection() {
  return (
    <section className={styles.useCasesSection}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionEyebrow}>
          <Translate id="products.components.components.coreComponents">
            Core Components
          </Translate>
        </span>
        <h2 className={styles.sectionTitle}>
          <Translate id="products.components.components.everythingThatMakesDimo">
            Everything That Makes DIMO Work
          </Translate>
        </h2>
        <p className={styles.sectionSubtitle}>
          <Translate id="products.components.components.fourFoundationalComponentsThat">
            Four foundational components that together enable secure vehicle
            connectivity, ownership, and data access.
          </Translate>
        </p>
      </div>

      <div
        className={styles.useCasesGrid}
        style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}
      >
        {COMPONENTS.map((component, i) => (
          <div key={i} id={component.id} className={styles.useCaseCard}>
            <div className={styles.useCaseIcon}>{component.icon}</div>
            <div className={styles.useCaseType}>{component.type}</div>
            <h3 className={styles.useCaseTitle}>{component.title}</h3>
            <p className={styles.useCaseDesc}>{component.description}</p>
            <div className={styles.useCaseExample}>{component.example}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function VehicleSimulatorSection() {
  return (
    <section
      id="vehicle-simulator"
      className={`${styles.featureSection} ${styles.featureSectionAlt}`}
    >
      <div className={styles.featureContainer}>
        <div className={styles.featureText}>
          <span className={styles.sectionEyebrow}>
            <Car
              size={14}
              style={{
                display: 'inline',
                marginRight: '0.4rem',
                verticalAlign: 'middle',
              }}
            />
            <Translate id="products.components.vehicleSimulator.startYourEngines">
              Start your engines
            </Translate>
          </span>
          <h2>
            <Translate id="products.components.vehicleSimulator.vehicleSimulator">
              Vehicle Simulator
            </Translate>
          </h2>
          <p>
            <Translate id="products.components.vehicleSimulator.buildAndTestVehicleConnected">
              Build and test vehicle-connected applications without needing a
              physical car. The DIMO Vehicle Simulator lets you generate
              realistic vehicle telemetry, trigger events, and validate your
              integration end-to-end in a fully controlled environment.
            </Translate>
          </p>
          <ul className={styles.featureList}>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="products.components.vehicleSimulator.simulateRealTimeTelemetrySignals">
                Simulate real-time telemetry signals — speed, location, battery,
                engine data, and more
              </Translate>
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="products.components.vehicleSimulator.triggerVehicleEventsTo">
                Trigger vehicle events to test webhooks, alerts, and agentic
                workflows
              </Translate>
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="products.components.vehicleSimulator.worksWithAllDimo">
                Works with all DIMO APIs and SDKs — no hardware required
              </Translate>
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="products.components.vehicleSimulator.accelerateDevelopmentCyclesAnd">
                Accelerate development cycles and QA across your team
              </Translate>
            </li>
          </ul>
          <div
            className={styles.heroButtons}
            style={{ justifyContent: 'flex-start', marginTop: '2rem' }}
          >
            <Link className={styles.primaryBtn} to={LINKS.external.console}>
              <Translate id="products.components.vehicleSimulator.openConsole">
                Open Console
              </Translate>{' '}
              <span className={styles.arrow}>→</span>
            </Link>
            <EnglishLink className={styles.secondaryBtn} to="/docs">
              <Translate id="products.components.vehicleSimulator.readTheDocs">
                Read the Docs
              </Translate>{' '}
              <span className={styles.arrow}>→</span>
            </EnglishLink>
          </div>
        </div>
        <div className={styles.featureVisual}>
          <img src="/img/vehicle_simulator.png" alt="DIMO Vehicle Simulator" />
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.ctaContent}>
        <h2 className={styles.ctaTitle}>
          <Translate id="products.components.cta.readyToBuildOn">
            Ready to Build on DIMO?
          </Translate>
        </h2>
        <p className={styles.ctaText}>
          <Translate id="products.components.cta.integrateVehicleConnectivityIdentity">
            Integrate vehicle connectivity, identity, and data access into your
            application using DIMO's open platform.
          </Translate>
        </p>
        <div className={styles.heroButtons}>
          <Link className={styles.primaryBtn} to={LINKS.external.console}>
            <Translate id="products.components.cta.getStarted">
              Get Started
            </Translate>{' '}
            <span className={styles.arrow}>→</span>
          </Link>
          <EnglishLink className={styles.secondaryBtn} to="/docs">
            <Translate id="products.components.cta.viewDocumentation">
              View Documentation
            </Translate>{' '}
            <span className={styles.arrow}>→</span>
          </EnglishLink>
        </div>
      </div>
    </section>
  );
}

export default function ComponentsPage(): ReactNode {
  const { locale, path } = usePageLocale();
  return (
    <>
      <Head>
        <title>
          {translate({
            id: 'products.components.meta.title',
            message: 'Components | DIMO Platform',
          })}
        </title>
        <meta
          name="description"
          content={translate({
            id: 'products.components.meta.description',
            message:
              'The core components of the DIMO Network — Wallets, Digital Key, Agents, and Developer Tools.',
          })}
        />
        <meta
          name="keywords"
          content={translate({
            id: 'products.components.meta.keywords',
            message:
              'DIMO wallet, developer tools, telematic devices, digital key, verifiable identity, AI agents, digital ID, vehicle connectivity',
          })}
        />
        <meta
          property="og:title"
          content={translate({
            id: 'products.components.meta.ogTitle',
            message: 'Components | DIMO Platform',
          })}
        />
        <meta
          property="og:description"
          content={translate({
            id: 'products.components.meta.ogDescription',
            message:
              'The building blocks of vehicle ownership on the DIMO Network.',
          })}
        />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify(
            localizeSchema(
              {
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                '@id': 'https://dimo.org/products/components#software',
                name: 'DIMO Components',
                description:
                  'Embeddable UI components for DIMO — drop-in consent flows, Login with DIMO, and vehicle connection widgets.',
                url: 'https://dimo.org/products/components',
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
                id: 'products.components.body.home.name',
                message: 'Home',
              }),
              url: 'https://dimo.org/',
            },
            {
              name: translate({
                id: 'products.components.body.products.name',
                message: 'Products',
              }),
              url: 'https://dimo.org/#products',
            },
            {
              name: translate({
                id: 'products.components.body.components.name',
                message: 'Components',
              }),
            },
          ]}
        />

        <main>
          <HeroSection />
          <ComponentsSection />
          <VehicleSimulatorSection />
          <CTASection />
        </main>

        <FooterTheme />
      </div>
    </>
  );
}
