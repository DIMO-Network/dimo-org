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
  Shield,
  Lock,
  Key,
  Cpu,
  Plug,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import Translate, { translate } from '@docusaurus/Translate';

const SOLUTION_NAME = translate({
  id: 'solutions.agenticExperiences.meta.solutionName',
  message: 'Agentic Experiences',
});
const HERO_BACKGROUND = '/img/mp4/agents.mp4?v=2';
const imgLogin = '/img/ShareWithUsers.png';
const imgFleets = '/img/tesla-fleet2.png';

const USE_CASES = [
  {
    icon: <Key size={28} />,
    type: translate({
      id: 'solutions.agenticExperiences.useCases.loginWithDimo.type',
      message: 'Authentication',
    }),
    title: translate({
      id: 'solutions.agenticExperiences.useCases.loginWithDimo.title',
      message: 'Login with DIMO',
    }),
    description: translate({
      id: 'solutions.agenticExperiences.useCases.loginWithDimo.description',
      message:
        'Seamless OAuth 2.0 authentication flow that gives your users control over their vehicle data. One-click login with granular permission controls.',
    }),
    example: translate({
      id: 'solutions.agenticExperiences.useCases.loginWithDimo.example',
      message:
        'Users grant your app access to specific data streams (location, diagnostics, etc.) without sharing credentials.',
    }),
  },
  {
    icon: <Shield size={28} />,
    type: translate({
      id: 'solutions.agenticExperiences.useCases.granularPermissions.type',
      message: 'Consent Management',
    }),
    title: translate({
      id: 'solutions.agenticExperiences.useCases.granularPermissions.title',
      message: 'Granular Permissions',
    }),
    description: translate({
      id: 'solutions.agenticExperiences.useCases.granularPermissions.description',
      message:
        'Fine-grained control over what data your agents can access. Users can grant, revoke, or modify permissions at any time through a unified consent dashboard.',
    }),
    example: translate({
      id: 'solutions.agenticExperiences.useCases.granularPermissions.example',
      message:
        'Agents request only the permissions they need—read location, write commands, access diagnostics—building user trust.',
    }),
  },
  {
    icon: <Lock size={28} />,
    type: translate({
      id: 'solutions.agenticExperiences.useCases.verifiableCredentials.type',
      message: 'Security',
    }),
    title: translate({
      id: 'solutions.agenticExperiences.useCases.verifiableCredentials.title',
      message: 'Verifiable Credentials',
    }),
    description: translate({
      id: 'solutions.agenticExperiences.useCases.verifiableCredentials.description',
      message:
        'Cryptographically signed credentials ensure data authenticity and traceability. Every data access is logged and verifiable, meeting the highest compliance standards.',
    }),
    example: translate({
      id: 'solutions.agenticExperiences.useCases.verifiableCredentials.example',
      message:
        'GDPR, EU Data Act, and SOC 2 compliant out of the box. Audit logs for every data access.',
    }),
  },
  {
    icon: <Cpu size={28} />,
    type: translate({
      id: 'solutions.agenticExperiences.useCases.securedCompute.type',
      message: 'Infrastructure',
    }),
    title: translate({
      id: 'solutions.agenticExperiences.useCases.securedCompute.title',
      message: 'Secured Compute',
    }),
    description: translate({
      id: 'solutions.agenticExperiences.useCases.securedCompute.description',
      message:
        'Run your AI agents in secure, isolated compute environments with access to vehicle data. Execute complex workflows while maintaining data privacy and security.',
    }),
    example: translate({
      id: 'solutions.agenticExperiences.useCases.securedCompute.example',
      message:
        'Deploy agents that process sensitive vehicle data without exposing raw information to your servers.',
    }),
  },
  {
    icon: <Sparkles size={28} />,
    type: translate({
      id: 'solutions.agenticExperiences.useCases.agentMemoryContext.type',
      message: 'AI Platform',
    }),
    title: translate({
      id: 'solutions.agenticExperiences.useCases.agentMemoryContext.title',
      message: 'Agent Memory & Context',
    }),
    description: translate({
      id: 'solutions.agenticExperiences.useCases.agentMemoryContext.description',
      message:
        'Built-in memory layer for your agents. Maintain conversation history, user preferences, and vehicle context across sessions for personalized experiences.',
    }),
    example: translate({
      id: 'solutions.agenticExperiences.useCases.agentMemoryContext.example',
      message:
        'Agents remember past interactions: "Last time we discussed your oil change—ready to schedule it?"',
    }),
  },
  {
    icon: <Plug size={28} />,
    type: translate({
      id: 'solutions.agenticExperiences.useCases.seamlessIntegrations.type',
      message: 'Integration',
    }),
    title: translate({
      id: 'solutions.agenticExperiences.useCases.seamlessIntegrations.title',
      message: 'Seamless Integrations',
    }),
    description: translate({
      id: 'solutions.agenticExperiences.useCases.seamlessIntegrations.description',
      message:
        'Pre-built connectors for popular tools and platforms. Integrate with CRMs, scheduling systems, payment processors, and communication platforms out of the box.',
    }),
    example: translate({
      id: 'solutions.agenticExperiences.useCases.seamlessIntegrations.example',
      message:
        'Connect agents to Calendly, Stripe, Twilio, SendGrid, and more with zero-code integrations.',
    }),
  },
];

const STATS = [
  {
    number: '<2min',
    label: translate({
      id: 'solutions.agenticExperiences.stats.setupTime.label',
      message: 'Setup Time',
    }),
  },
  {
    number: '99.9%',
    label: translate({
      id: 'solutions.agenticExperiences.stats.serviceUptime.label',
      message: 'Service Uptime',
    }),
  },
  {
    number: 'MCP',
    label: translate({
      id: 'solutions.agenticExperiences.stats.agentSkills.label',
      message: 'Agent Skills',
    }),
  },
  {
    number: '5+',
    label: translate({
      id: 'solutions.agenticExperiences.stats.sDksToBuild.label',
      message: 'SDKs to Build On',
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
          <Sparkles size={16} /> {SOLUTION_NAME}
        </span>

        <h1 className={styles.heroTitle}>
          <Translate
            id="solutions.agenticExperiences.hero.buildTrustworthyAiAgents"
            values={{
              span: (
                <span className={styles.heroTitleGradient}>
                  <Translate id="solutions.agenticExperiences.hero.privacyFirstInfrastructure">
                    Privacy-First Infrastructure
                  </Translate>
                </span>
              ),
            }}
          >
            {'Build Trustworthy AI Agents with {span}'}
          </Translate>
        </h1>

        <p className={styles.heroSubtitle}>
          <Translate id="solutions.agenticExperiences.hero.deployIntelligentVehicleAgents">
            Deploy intelligent vehicle agents with built-in consent management,
            secured compute, and seamless integrations. Give users control over
            their data while building powerful agentic experiences.
          </Translate>
        </p>

        <div className={styles.heroButtons}>
          <Link className={styles.primaryBtn} to={LINKS.external.console}>
            <Translate id="solutions.agenticExperiences.hero.startBuilding">
              Start Building
            </Translate>{' '}
            <span className={styles.arrow}>→</span>
          </Link>
          <EnglishLink className={styles.secondaryBtn} to="/docs">
            <Translate id="solutions.agenticExperiences.hero.viewDocumentation">
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
          <Translate id="solutions.agenticExperiences.useCases.platformFeatures">
            Platform Features
          </Translate>
        </span>
        <h2 className={styles.sectionTitle}>
          <Translate id="solutions.agenticExperiences.useCases.everythingYouNeedFor">
            Everything You Need for Agentic Applications
          </Translate>
        </h2>
        <p className={styles.sectionSubtitle}>
          <Translate id="solutions.agenticExperiences.useCases.fromUserAuthenticationTo">
            From user authentication to secure compute and pre-built
            integrations, DIMO provides the complete infrastructure for building
            trustworthy AI agents.
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
            <Translate id="solutions.agenticExperiences.featureSection1.loginWithDimoConsentFirst">
              Login with DIMO: Consent-First Authentication
            </Translate>
          </h2>
          <p>
            <Translate id="solutions.agenticExperiences.featureSection1.implementOAuth20Authentication">
              Implement OAuth 2.0 authentication with granular permission
              controls in minutes. Users connect their vehicles with one click,
              granting your agents access to exactly the data they need, nothing
              more.
            </Translate>
          </p>
          <ul className={styles.featureList}>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="solutions.agenticExperiences.featureSection1.oauth20CompliantWith">
                OAuth 2.0 compliant with PKCE flow
              </Translate>
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="solutions.agenticExperiences.featureSection1.granularScopesLocationDiagnostics">
                Granular scopes: location, diagnostics, commands, and more
              </Translate>
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="solutions.agenticExperiences.featureSection1.usersCanRevokeAccess">
                Users can revoke access anytime through unified dashboard
              </Translate>
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="solutions.agenticExperiences.featureSection1.realTimeConsentStatusUpdates">
                Real-time consent status updates via webhooks
              </Translate>
            </li>
          </ul>
        </div>
        <div className={styles.featureVisual}>
          <a
            href="/docs/build/building-with-tools/client-sdk-dimo-connect"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={imgLogin}
              alt={translate({
                id: 'solutions.agenticExperiences.featureSection1.loginWithDimoFlowchart',
                message: 'Login with DIMO Flowchart',
              })}
            />
          </a>
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
            <Translate id="solutions.agenticExperiences.featureSection2.securedComputePrivacyPreservingAi">
              Secured Compute: Privacy-Preserving AI
            </Translate>
          </h2>
          <p>
            <Translate id="solutions.agenticExperiences.featureSection2.runYourAiAgents">
              Run your AI agents in isolated, secure compute environments with
              access to clean vehicle data. Process sensitive information
              without exposing raw data to your servers, meeting the strictest
              compliance requirements.
            </Translate>
          </p>
          <ul className={styles.featureList}>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="solutions.agenticExperiences.featureSection2.scaleToAddAgents">
                Scale to add agents with new super powers
              </Translate>
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="solutions.agenticExperiences.featureSection2.dataProcessedInSecure">
                Data processed in secure enclaves, option to host on-premise
              </Translate>
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="solutions.agenticExperiences.featureSection2.complianceReadyGdprSoc2">
                Compliance-ready: GDPR, SOC 2, EU Data Act
              </Translate>
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span>
              <Translate id="solutions.agenticExperiences.featureSection2.auditLogsForEvery">
                Audit logs for every data access and operation
              </Translate>
            </li>
          </ul>
        </div>
        <div className={styles.featureVisual}>
          <img
            src={imgFleets}
            alt={translate({
              id: 'solutions.agenticExperiences.featureSection2.fleetOfConnectedVehicles',
              message: 'Fleet of Connected Vehicles',
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
        id: 'solutions.agenticExperiences.howItWorks.implementLoginWith.title',
        message: 'Implement Login with DIMO',
      }),
      description: translate({
        id: 'solutions.agenticExperiences.howItWorks.implementLoginWith.description',
        message:
          'Add OAuth authentication to your app. Users connect their vehicles and grant permissions to your agents in seconds.',
      }),
    },
    {
      title: translate({
        id: 'solutions.agenticExperiences.howItWorks.deployYourAgents.title',
        message: 'Deploy Your Agents',
      }),
      description: translate({
        id: 'solutions.agenticExperiences.howItWorks.deployYourAgents.description',
        message:
          'Upload your agent code to our secured compute platform. Choose from pre-built agent templates or build custom workflows.',
      }),
    },
    {
      title: translate({
        id: 'solutions.agenticExperiences.howItWorks.connectIntegrations.title',
        message: 'Connect Integrations',
      }),
      description: translate({
        id: 'solutions.agenticExperiences.howItWorks.connectIntegrations.description',
        message:
          'Enable the integrations your agents need from our marketplace. Configure scheduling, payments, communications, and more.',
      }),
    },
    {
      title: translate({
        id: 'solutions.agenticExperiences.howItWorks.monitorOptimize.title',
        message: 'Monitor & Optimize',
      }),
      description: translate({
        id: 'solutions.agenticExperiences.howItWorks.monitorOptimize.description',
        message:
          'Track agent performance, user consent status, and system health through our comprehensive analytics dashboard.',
      }),
    },
  ];

  return (
    <section className={styles.howItWorksSection}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionEyebrow}>
          <Translate id="solutions.agenticExperiences.howItWorks.howItWorks">
            How It Works
          </Translate>
        </span>
        <h2 className={styles.sectionTitle}>
          <Translate id="solutions.agenticExperiences.howItWorks.deployAgentsInMinutes">
            Deploy Agents in Minutes
          </Translate>
        </h2>
        <p className={styles.sectionSubtitle}>
          <Translate id="solutions.agenticExperiences.howItWorks.fromAuthenticationToDeployment">
            From authentication to deployment, DIMO makes it easy to build and
            scale agentic experiences with built-in privacy and security.
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
          <Translate id="solutions.agenticExperiences.cta.readyToBuildAgentic">
            Ready to Build Agentic Experiences?
          </Translate>
        </h2>
        <p className={styles.ctaText}>
          <Translate id="solutions.agenticExperiences.cta.joinDevelopersBuildingThe">
            Join developers building the next generation of AI-powered vehicle
            applications with privacy-first infrastructure.
          </Translate>
        </p>
        <div className={styles.heroButtons}>
          <Link className={styles.primaryBtn} to={LINKS.external.console}>
            <Translate id="solutions.agenticExperiences.cta.getStarted">
              Get Started
            </Translate>{' '}
            <span className={styles.arrow}>→</span>
          </Link>
          <EnglishLink className={styles.secondaryBtn} to="/docs">
            <Translate id="solutions.agenticExperiences.cta.viewDocumentation">
              View Documentation
            </Translate>{' '}
            <span className={styles.arrow}>→</span>
          </EnglishLink>
        </div>
      </div>
    </section>
  );
}

export default function AgenticExperiencesPage(): ReactNode {
  const { locale, path } = usePageLocale();
  return (
    <>
      <Head>
        <title>
          {translate({
            id: 'solutions.agenticExperiences.meta.title',
            message: 'Agentic Experiences | Build AI Agents with DIMO',
          })}
        </title>
        <meta
          name="description"
          content={translate({
            id: 'solutions.agenticExperiences.meta.description',
            message:
              'Build trustworthy AI vehicle agents with Login with DIMO, secured compute, and seamless integrations. Privacy-first infrastructure for agentic experiences.',
          })}
        />
        <meta
          name="keywords"
          content={translate({
            id: 'solutions.agenticExperiences.meta.keywords',
            message:
              'AI agents, vehicle AI, consent management, OAuth authentication, secured compute, agent integrations, privacy-first AI, GDPR compliant',
          })}
        />
        <meta
          property="og:title"
          content={translate({
            id: 'solutions.agenticExperiences.meta.ogTitle',
            message: 'Agentic Experiences | DIMO Platform',
          })}
        />
        <meta
          property="og:description"
          content={translate({
            id: 'solutions.agenticExperiences.meta.ogDescription',
            message:
              'Deploy intelligent vehicle agents with built-in consent management, secured compute, and 50+ integrations. Privacy-first infrastructure for AI.',
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
                  id: 'solutions.agenticExperiences.schema.dimoAgenticExperiences.name',
                  message: 'DIMO Agentic Experiences Platform',
                }),
                description: translate({
                  id: 'solutions.agenticExperiences.schema.dimoAgenticExperiences.description',
                  message:
                    'Build trustworthy AI vehicle agents with consent management, secured compute, and pre-built integrations.',
                }),
                applicationCategory: 'DeveloperApplication',
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
                id: 'solutions.agenticExperiences.body.home.name',
                message: 'Home',
              }),
              url: 'https://dimo.org/',
            },
            {
              name: translate({
                id: 'solutions.agenticExperiences.body.solutions.name',
                message: 'Solutions',
              }),
              url: 'https://dimo.org/#solutions',
            },
            {
              name: translate({
                id: 'solutions.agenticExperiences.body.agenticExperiences.name',
                message: 'Agentic Experiences',
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
          <HowItWorksSection />
          <CTASection />
        </main>

        <FooterTheme />
      </div>
    </>
  );
}
