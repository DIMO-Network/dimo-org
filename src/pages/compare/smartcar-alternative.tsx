import React, { type ReactNode } from 'react';
import Link from '@docusaurus/Link';
import EnglishLink from '../../components/EnglishLink';
import ContentPageLayout from '../../components/ContentPageLayout';
import Translate, { translate } from '@docusaurus/Translate';

const SITE = 'https://dimo.org';

const TITLE = translate({
  id: 'compare.smartcarAlternative.meta.title',
  message: 'DIMO vs Smartcar: Session Control, Not Just Data | DIMO',
});
const DESCRIPTION = translate({
  id: 'compare.smartcarAlternative.meta.description',
  message:
    'Smartcar is pass-through vehicle data with conversion. DIMO is storage with sharing: identity, consent, digital keys, spend caps, and atomic revocation. Self-hostable, and it can even ingest through Smartcar.',
});
const H1 = translate({
  id: 'compare.smartcarAlternative.meta.h1',
  message: 'DIMO vs Smartcar: from reading vehicle data to governing access',
});

const schema = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: H1,
  description: DESCRIPTION,
  url: `${SITE}/compare/smartcar-alternative`,
  image: `${SITE}/img/dimo-social-card.png`,
  datePublished: '2026-06-26',
  dateModified: '2026-07-06',
  isPartOf: { '@id': `${SITE}/#website` },
  author: {
    '@type': 'Organization',
    '@id': `${SITE}/#organization`,
    name: 'DIMO',
  },
  publisher: {
    '@type': 'Organization',
    '@id': `${SITE}/#organization`,
    name: 'DIMO',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: translate({
        id: 'compare.smartcarAlternative.faqSchema.doINeed.name',
        message: 'Do I need hardware to use DIMO instead of Smartcar?',
      }),
      acceptedAnswer: {
        '@type': 'Answer',
        text: translate({
          id: 'compare.smartcarAlternative.faqSchema.text',
          message:
            'No. Most of the 50+ supported brands connect through software integrations. The optional DIMO LTE R1 adapter adds high-frequency data for vehicles without a usable cloud API.',
        }),
      },
    },
    {
      '@type': 'Question',
      name: translate({
        id: 'compare.smartcarAlternative.faqSchema.canAVehicle.name',
        message: 'Can a vehicle owner revoke access mid-session?',
      }),
      acceptedAnswer: {
        '@type': 'Answer',
        text: translate({
          id: 'compare.smartcarAlternative.faqSchema.text2',
          message:
            'Yes. Revocation is atomic: the key, the data grant, and the spend authorization all end together, and the session record stays on the audit trail.',
        }),
      },
    },
    {
      '@type': 'Question',
      name: translate({
        id: 'compare.smartcarAlternative.faqSchema.isDimoCompliant.name',
        message: 'Is DIMO compliant in Europe?',
      }),
      acceptedAnswer: {
        '@type': 'Answer',
        text: translate({
          id: 'compare.smartcarAlternative.faqSchema.text3',
          message:
            'The SACD consent model was built for GDPR and the EU Data Act. Every query runs against an owner-granted, scoped, revocable permission recorded on a signed audit trail.',
        }),
      },
    },
  ],
};

export default function SmartcarAlternative(): ReactNode {
  return (
    <ContentPageLayout
      title={TITLE}
      description={DESCRIPTION}
      breadcrumbs={[
        {
          name: translate({
            id: 'compare.smartcarAlternative.body.home.name',
            message: 'Home',
          }),
          url: `${SITE}/`,
        },
        {
          name: translate({
            id: 'compare.smartcarAlternative.body.smartcarAlternative.name',
            message: 'Smartcar alternative',
          }),
        },
      ]}
      schema={[schema, faqSchema]}
      heroEyebrow={translate({
        id: 'compare.smartcarAlternative.body.compare',
        message: 'Compare',
      })}
      ctaLabel={translate({
        id: 'compare.smartcarAlternative.body.getApiKeys',
        message: 'Get API keys',
      })}
      ctaHref="https://console.dimo.org/sign-in"
      heroTitle={H1}
      heroSubtitle={translate({
        id: 'compare.smartcarAlternative.body.smartcarConvertsAnOem',
        message:
          'Smartcar converts an OEM feed and passes it through to you. DIMO stores vehicle data with owner consent, sharing, and sessions built in, and can even ingest through Smartcar itself. Here is how to think about the difference.',
      })}
    >
      <p>
        <Translate
          id="compare.smartcarAlternative.body.ifYouAreEvaluating"
          values={{
            em: (
              <em>
                <Translate id="compare.smartcarAlternative.body.acts">
                  acts
                </Translate>
              </em>
            ),
            strong: (
              <strong>
                <Translate id="compare.smartcarAlternative.body.smartcarIsAWindow">
                  Smartcar is a window into the car; DIMO is the checkout desk.
                </Translate>
              </strong>
            ),
          }}
        >
          {
            'If you are evaluating Smartcar, you are almost certainly trying to do one of two things: read vehicle data across many brands, or build a product that {em} on vehicles: unlock, grant access, cap spend, and cleanly end it all. Smartcar is excellent at the first. DIMO is built for the second. {strong}'
          }
        </Translate>
      </p>
      <p>
        <Translate
          id="compare.smartcarAlternative.body.smartcarReadsDataAnd"
          values={{
            em: (
              <em>
                <Translate id="compare.smartcarAlternative.body.session">
                  session
                </Translate>
              </em>
            ),
          }}
        >
          {
            'Smartcar reads data and issues commands through a clean API. What it does not provide is a {em}: a single object that bundles identity, a digital key, a scoped data grant, a spend cap, and atomic revocation, with a verifiable record when it ends. For a dashboard or an analytics feature, you may never need that. For a rental, a carshare, or any case where a stranger temporarily uses a vehicle, the session is the whole job.'
          }
        </Translate>
      </p>
      <p>
        <Translate id="compare.smartcarAlternative.body.theArchitecturalDifferenceUnderneath">
          The architectural difference underneath: Smartcar is pass-through with
          conversion. It translates an OEM feed and hands the result to you. It
          is not a system of record, it has no data sharing or consent model,
          and you cannot self-host it. DIMO is data storage with sharing:
          ingested signals become normalized time-series that vehicle owners can
          share, scope, and revoke, on infrastructure you can run yourself
          because the core is open source.
        </Translate>
      </p>

      <h2>
        <Translate id="compare.smartcarAlternative.body.sideBySide">
          Side by side
        </Translate>
      </h2>
      <table>
        <thead>
          <tr>
            <th>
              <Translate id="compare.smartcarAlternative.body.capability">
                Capability
              </Translate>
            </th>
            <th>Smartcar</th>
            <th>DIMO</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Translate id="compare.smartcarAlternative.body.readVehicleDataAcross">
                Read vehicle data across brands
              </Translate>
            </td>
            <td>
              <Translate id="compare.smartcarAlternative.body.yes">
                Yes
              </Translate>
            </td>
            <td>
              <Translate id="compare.smartcarAlternative.body.yes50BrandsAlready">
                Yes (50+ brands already connected)
              </Translate>
            </td>
          </tr>
          <tr>
            <td>
              <Translate id="compare.smartcarAlternative.body.issueCommandsLockUnlock">
                Issue commands (lock/unlock)
              </Translate>
            </td>
            <td>
              <Translate id="compare.smartcarAlternative.body.yes">
                Yes
              </Translate>
            </td>
            <td>
              <Translate id="compare.smartcarAlternative.body.yes">
                Yes
              </Translate>
            </td>
          </tr>
          <tr>
            <td>
              <Translate id="compare.smartcarAlternative.body.storesDataAsA">
                Stores data as a shareable system of record
              </Translate>
            </td>
            <td>
              <Translate id="compare.smartcarAlternative.body.passThroughWithConversion">
                — (pass-through with conversion)
              </Translate>
            </td>
            <td>
              <Translate id="compare.smartcarAlternative.body.yesConsentGovernedTimeSeries">
                Yes (consent-governed time-series)
              </Translate>
            </td>
          </tr>
          <tr>
            <td>
              <Translate id="compare.smartcarAlternative.body.selfHostable">
                Self-hostable
              </Translate>
            </td>
            <td>—</td>
            <td>
              <Translate id="compare.smartcarAlternative.body.yesOpenSourceCore">
                Yes (open-source core)
              </Translate>
            </td>
          </tr>
          <tr>
            <td>
              <Translate id="compare.smartcarAlternative.body.ingestsFromOtherConnectivity">
                Ingests from other connectivity providers
              </Translate>
            </td>
            <td>—</td>
            <td>
              <Translate id="compare.smartcarAlternative.body.yesIncludingSmartcarFlespi">
                Yes (including Smartcar, Flespi, Volteras)
              </Translate>
            </td>
          </tr>
          <tr>
            <td>
              <Translate id="compare.smartcarAlternative.body.digitalKeyAsPart">
                Digital key as part of a session
              </Translate>
            </td>
            <td>—</td>
            <td>
              <Translate id="compare.smartcarAlternative.body.yes">
                Yes
              </Translate>
            </td>
          </tr>
          <tr>
            <td>
              <Translate id="compare.smartcarAlternative.body.perSessionSpendCap">
                Per-session spend cap
              </Translate>
            </td>
            <td>—</td>
            <td>
              <Translate id="compare.smartcarAlternative.body.yes">
                Yes
              </Translate>
            </td>
          </tr>
          <tr>
            <td>
              <Translate id="compare.smartcarAlternative.body.atomicRevocationOfA">
                Atomic revocation of a whole session
              </Translate>
            </td>
            <td>—</td>
            <td>
              <Translate id="compare.smartcarAlternative.body.yes">
                Yes
              </Translate>
            </td>
          </tr>
          <tr>
            <td>
              <Translate id="compare.smartcarAlternative.body.verifiableSignedAccessAudit">
                Verifiable, signed access audit trail
              </Translate>
            </td>
            <td>—</td>
            <td>
              <Translate id="compare.smartcarAlternative.body.yes">
                Yes
              </Translate>
            </td>
          </tr>
        </tbody>
      </table>

      <h2>
        <Translate id="compare.smartcarAlternative.body.howThePricingModels">
          How the pricing models differ
        </Translate>
      </h2>
      <p>
        <Translate id="compare.smartcarAlternative.body.smartcarPricesPerConnected">
          Smartcar prices per connected vehicle with plan minimums, which works
          well when every connected car maps to a paying end user. DIMO
          separates the two decisions. The Hobbyist tier is free with vehicles
          at $1.25/month each, so you can validate an idea against your own car
          before any commitment. Core is $349/month with 100 vehicles included
          and higher rate limits for production apps. Enterprise adds custom
          SLAs, on-premise deployment, and volume pricing. There is no charge
          for the consent and session layer itself; it ships with every tier.
        </Translate>
      </p>
      <p>
        <Translate id="compare.smartcarAlternative.body.oneStructuralDifferenceMatters">
          One structural difference matters more than the numbers: DIMO's core
          protocol is open source. If pricing or terms ever stop working for
          you, the exit path is running the infrastructure yourself rather than
          rewriting your product against a new proprietary API.
        </Translate>
      </p>

      <h2>
        <Translate id="compare.smartcarAlternative.body.youMayNotNeed">
          You may not need to migrate at all
        </Translate>
      </h2>
      <p>
        <Translate
          id="compare.smartcarAlternative.body.thisIsThePart"
          values={{
            em: (
              <em>
                <Translate id="compare.smartcarAlternative.body.through">
                  through
                </Translate>
              </em>
            ),
            link: (
              <Link to="https://github.com/DIMO-Network/oracle-example">
                <Translate id="compare.smartcarAlternative.body.oracleExample">
                  oracle example
                </Translate>
              </Link>
            ),
          }}
        >
          {
            'This is the part most evaluations miss: DIMO and Smartcar are not mutually exclusive. DIMO can ingest data {em} Smartcar (and through Flespi or Volteras) the same way it ingests from OEM oracles or its own hardware. If your Smartcar integration works, keep it as the connectivity layer and put DIMO on top for what Smartcar does not do: storage, owner consent, sharing, sessions, and an audit trail. See the {link} for how ingest sources plug in.'
          }
        </Translate>
      </p>

      <h2>
        <Translate id="compare.smartcarAlternative.body.migratingFromSmartcar">
          Migrating from Smartcar
        </Translate>
      </h2>
      <p>
        <Translate
          id="compare.smartcarAlternative.body.ifYouDoWant"
          values={{
            link: (
              <EnglishLink to="/docs/build/building-with-tools/server-sdk">
                <Translate id="compare.smartcarAlternative.body.typeScriptPythonOrC">
                  TypeScript, Python, or C# SDK
                </Translate>
              </EnglishLink>
            ),
            link2: (
              <EnglishLink to="/docs/comparison">
                <Translate id="compare.smartcarAlternative.body.platformComparisonInThe">
                  platform comparison in the docs
                </Translate>
              </EnglishLink>
            ),
          }}
        >
          {
            "If you do want to replace Smartcar outright, most migrations are endpoint mapping, not re-architecture. Smartcar's REST reads (odometer, location, battery, fuel) map to DIMO's GraphQL Telemetry API, and vehicle authorization maps to a SACD consent grant. The practical sequence: create a free account at console.dimo.org, generate API keys, point the {link} at your existing data model, and run both providers in parallel while your users re-consent. The {link2} includes a field-by-field migration guide with code samples."
          }
        </Translate>
      </p>

      <h2>
        <Translate id="compare.smartcarAlternative.body.whereSmartcarIsStill">
          Where Smartcar is still the right call
        </Translate>
      </h2>
      <p>
        <Translate id="compare.smartcarAlternative.body.honestAnswerIfYour">
          Honest answer: if your product only reads data, never touches access
          control, and your users are all in Smartcar's coverage footprint,
          Smartcar is a mature, well-documented choice and switching would buy
          you little. The reason developers move to DIMO is almost always that
          their roadmap grew past read-only: they need keys, scoped grants,
          session-based billing, or an audit trail regulators will accept, and
          bolting those onto a read-only API means building the hard part
          themselves.
        </Translate>
      </p>

      <h2>
        <Translate id="compare.smartcarAlternative.body.commonQuestions">
          Common questions
        </Translate>
      </h2>
      <p>
        <Translate
          id="compare.smartcarAlternative.body.noMostOfThe"
          values={{
            strong: (
              <strong>
                <Translate id="compare.smartcarAlternative.body.doINeedHardware">
                  Do I need hardware?
                </Translate>
              </strong>
            ),
          }}
        >
          {
            '{strong} No. Most of the 50+ supported brands connect through software integrations. The optional DIMO LTE R1 adapter adds high-frequency data for vehicles without a usable cloud API.'
          }
        </Translate>
      </p>
      <p>
        <Translate
          id="compare.smartcarAlternative.body.yesRevocationIsAtomic"
          values={{
            strong: (
              <strong>
                <Translate id="compare.smartcarAlternative.body.canAVehicleOwner">
                  Can a vehicle owner revoke access mid-session?
                </Translate>
              </strong>
            ),
          }}
        >
          {
            '{strong} Yes. Revocation is atomic: the key, the data grant, and the spend authorization all end together, and the session record stays on the audit trail.'
          }
        </Translate>
      </p>
      <p>
        <Translate
          id="compare.smartcarAlternative.body.theSacdConsentModel"
          values={{
            strong: (
              <strong>
                <Translate id="compare.smartcarAlternative.body.isThisCompliantIn">
                  Is this compliant in Europe?
                </Translate>
              </strong>
            ),
            link: (
              <Link to="/compliance/eu-data-act">
                <Translate id="compare.smartcarAlternative.body.euDataActGuide">
                  EU Data Act guide
                </Translate>
              </Link>
            ),
          }}
        >
          {
            '{strong} The SACD consent model was built for GDPR and the EU Data Act; see the {link} for specifics.'
          }
        </Translate>
      </p>

      <h2>
        <Translate id="compare.smartcarAlternative.body.whenToChooseWhich">
          When to choose which
        </Translate>
      </h2>
      <p>
        <Translate
          id="compare.smartcarAlternative.body.chooseSmartcarWhenYour"
          values={{
            em: (
              <em>
                <Translate id="compare.smartcarAlternative.body.reading">
                  reading
                </Translate>
              </em>
            ),
            em2: (
              <em>
                <Translate id="compare.smartcarAlternative.body.governsAccess">
                  governs access
                </Translate>
              </em>
            ),
          }}
        >
          {
            'Choose Smartcar when your product is fundamentally about {em} data: usage analytics, EV charging insights, a service that needs odometer or battery state. Choose DIMO when your product {em2}: unmanned rental, carshare, fleet dispatch, per-session insurance. It needs identity, keys, data, spend, and revocation to behave as one consented, auditable unit.'
          }
        </Translate>
      </p>
      <p>
        <Translate
          id="compare.smartcarAlternative.body.theModelBehindThat"
          values={{
            link: (
              <Link to="/vehicle-session-infrastructure">
                <Translate id="compare.smartcarAlternative.body.vehicleSessionInfrastructure">
                  vehicle session infrastructure
                </Translate>
              </Link>
            ),
            link2: (
              <Link to="/industries/rentals">
                <Translate id="compare.smartcarAlternative.body.rentalOperations">
                  rental operations
                </Translate>
              </Link>
            ),
            link3: (
              <Link to="/connected-car-api">
                <Translate id="compare.smartcarAlternative.body.connectedCarApiOverview">
                  connected car API overview
                </Translate>
              </Link>
            ),
            link4: (
              <Link to="/vehicle-data-api">
                <Translate id="compare.smartcarAlternative.body.vehicleDataApi">
                  vehicle data API
                </Translate>
              </Link>
            ),
            link5: (
              <Link to="/pricing">
                <Translate id="compare.smartcarAlternative.body.pricing">
                  pricing
                </Translate>
              </Link>
            ),
            link6: (
              <EnglishLink to="/docs">
                <Translate id="compare.smartcarAlternative.body.developerDocs">
                  developer docs
                </Translate>
              </EnglishLink>
            ),
          }}
        >
          {
            'The model behind that is {link}; see it applied to {link2}. For the product itself, the {link3} and {link4} pages cover capabilities and signals, {link5} is published (free Hobbyist tier, $349/month Core), and the {link6} take you to a first API call.'
          }
        </Translate>
      </p>
    </ContentPageLayout>
  );
}
