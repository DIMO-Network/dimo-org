import React, { type ReactNode } from 'react';
import Link from '@docusaurus/Link';
import ContentPageLayout from '../../components/ContentPageLayout';
import Translate, { translate } from '@docusaurus/Translate';

const SITE = 'https://dimo.org';

const TITLE = translate({
  id: 'solutions.fleetSpend.meta.title',
  message: 'Fleet Spend & EV Charging Reimbursement, Per Session | DIMO',
});
const DESCRIPTION = translate({
  id: 'solutions.fleetSpend.meta.description',
  message:
    'Stop reconciling charging, tolls, and fuel days later. DIMO ties spend to each vehicle session: home charging, public charging, and tolls, capped and reconciled automatically.',
});
const H1 = translate({
  id: 'solutions.fleetSpend.meta.h1',
  message:
    'Cap spend at checkout: charging, tolls, and fuel tied to the session',
});

const schema = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: H1,
  description: DESCRIPTION,
  url: `${SITE}/solutions/fleet-spend`,
  datePublished: '2026-06-26',
  isPartOf: { '@id': `${SITE}/#website` },
  author: { '@id': `${SITE}/#organization`, name: 'DIMO' },
  publisher: { '@id': `${SITE}/#organization`, name: 'DIMO' },
};

export default function FleetSpend(): ReactNode {
  return (
    <ContentPageLayout
      title={TITLE}
      description={DESCRIPTION}
      breadcrumbs={[
        {
          name: translate({
            id: 'solutions.fleetSpend.body.home.name',
            message: 'Home',
          }),
          url: `${SITE}/`,
        },
        {
          name: translate({
            id: 'solutions.fleetSpend.body.solutions.name',
            message: 'Solutions',
          }),
          url: `${SITE}/#solutions`,
        },
        {
          name: translate({
            id: 'solutions.fleetSpend.body.fleetSpend.name',
            message: 'Fleet Spend',
          }),
        },
      ]}
      schema={schema}
      heroEyebrow={translate({
        id: 'solutions.fleetSpend.body.solutionsSpend',
        message: 'Solutions · Spend',
      })}
      heroTitle={H1}
      heroSubtitle={translate({
        id: 'solutions.fleetSpend.body.chargingTollsAndFuel',
        message:
          'Charging, tolls, and fuel are the leakiest line items in a fleet — because they happen after checkout and reconcile days later. Tie them to the session and the leak closes.',
      })}
    >
      <p>
        <Translate
          id="solutions.fleetSpend.body.fleetSpendLeaksBecause"
          values={{
            strong: (
              <strong>
                <Translate id="solutions.fleetSpend.body.vehicleSession">
                  vehicle session
                </Translate>
              </strong>
            ),
          }}
        >
          {
            'Fleet spend leaks because there is no container for it. A driver takes a vehicle, charges it, runs through a toll, maybe fills the tank, and each of those costs lands in a different system, reconciled hours or days later against a booking nobody can cleanly match it to. DIMO ties spend to the {strong}: a cap is set at checkout, every charge is attributed to the session that incurred it, and reconciliation happens automatically instead of in a Monday-morning spreadsheet.'
          }
        </Translate>
      </p>

      <h2>
        <Translate id="solutions.fleetSpend.body.whySpendLeaksToday">
          Why spend leaks today
        </Translate>
      </h2>
      <p>
        <Translate
          id="solutions.fleetSpend.body.theCoreProblemIs"
          values={{
            strong: (
              <strong>
                <Translate id="solutions.fleetSpend.body.spendIsNotConnected">
                  spend is not connected to the vehicle access event
                </Translate>
              </strong>
            ),
          }}
        >
          {
            'The core problem is that {strong}. Booking lives in one tool, telematics in another, charging in a third, tolls in a fourth. When a charge appears, matching it back to “which rental, which driver, which vehicle” is manual detective work. Multiply that across a fleet and it is several hours a week of reconciliation plus a steady trickle of costs that never get attributed at all.'
          }
        </Translate>
      </p>

      <h2>
        <Translate id="solutions.fleetSpend.body.theThreeEvReimbursement">
          The three EV reimbursement problems, at once
        </Translate>
      </h2>
      <p>
        <Translate id="solutions.fleetSpend.body.electrificationMakesThisSharper">
          Electrification makes this sharper, because an EV fleet runs three
          reimbursement problems simultaneously:
        </Translate>
      </p>
      <ul>
        <li>
          <Translate
            id="solutions.fleetSpend.body.aDriverChargesAt"
            values={{
              strong: (
                <strong>
                  <Translate id="solutions.fleetSpend.body.homeCharging">
                    Home charging:
                  </Translate>
                </strong>
              ),
            }}
          >
            {
              '{strong} a driver charges at home and has to be reimbursed at the right rate for the right kWh.'
            }
          </Translate>
        </li>
        <li>
          <Translate
            id="solutions.fleetSpend.body.sessionsAcrossADozen"
            values={{
              strong: (
                <strong>
                  <Translate id="solutions.fleetSpend.body.publicCharging">
                    Public charging:
                  </Translate>
                </strong>
              ),
            }}
          >
            {
              '{strong} sessions across a dozen networks, each with its own app, receipt format, and pricing.'
            }
          </Translate>
        </li>
        <li>
          <Translate
            id="solutions.fleetSpend.body.incurredMidSessionBilledLater"
            values={{
              strong: (
                <strong>
                  <Translate id="solutions.fleetSpend.body.tollsAndParking">
                    Tolls and parking:
                  </Translate>
                </strong>
              ),
            }}
          >
            {
              '{strong} incurred mid-session, billed later, rarely tied to the trip that caused them.'
            }
          </Translate>
        </li>
      </ul>
      <p>
        <Translate id="solutions.fleetSpend.body.handledSeparatelyTheseAre">
          Handled separately, these are three integrations and three
          reconciliation headaches. Handled as part of the session, they are one
          capped, attributed line item.
        </Translate>
      </p>

      <h2>
        <Translate id="solutions.fleetSpend.body.plugAndChargeAsAPerSession">
          Plug-and-charge as a per-session service
        </Translate>
      </h2>
      <p>
        <Translate
          id="solutions.fleetSpend.body.tyingSpendToThe"
          values={{
            strong: (
              <strong>
                <Translate id="solutions.fleetSpend.body.plugAndChargeOnYourNext">
                  plug-and-charge on your next rental
                </Translate>
              </strong>
            ),
            strong2: (
              <strong>
                <Translate id="solutions.fleetSpend.body.0LineItem">
                  $0 line item
                </Translate>
              </strong>
            ),
          }}
        >
          {
            'Tying spend to the session also unlocks revenue, not just savings. Imagine getting {strong}, so you do not have to download six apps to charge on a business trip. Today that is a {strong2} because there is no session to attach it to. With a session container, charging, insurance, and other per-trip services become things an operator can actually offer and bill, priced per session rather than buried in a daily rate.'
          }
        </Translate>
      </p>

      <h2>
        <Translate id="solutions.fleetSpend.body.howItWorks">
          How it works
        </Translate>
      </h2>
      <p>
        <Translate
          id="solutions.fleetSpend.body.whenAIsCreated"
          values={{
            link: (
              <Link to="/vehicle-session-infrastructure">
                <Translate id="solutions.fleetSpend.body.vehicleSession">
                  vehicle session
                </Translate>
              </Link>
            ),
          }}
        >
          {
            'When a {link} is created, it carries a spend cap alongside identity, the digital key, and the data scope. Charges incurred during the session are attributed to it automatically and bounded by the cap; when the session ends, the spend is reconciled and sealed into the same verifiable record as the rest of the session. The operator sees one number per session instead of four feeds to reconcile.'
          }
        </Translate>
      </p>
      <p>
        <Translate
          id="solutions.fleetSpend.body.thisIsTheSpend"
          values={{
            link: (
              <Link to="/vehicle-session-infrastructure">
                <Translate id="solutions.fleetSpend.body.vehicleSessionInfrastructure">
                  vehicle session infrastructure
                </Translate>
              </Link>
            ),
            link2: (
              <Link to="/products/pay">
                <Translate id="solutions.fleetSpend.body.payProduct">
                  pay product
                </Translate>
              </Link>
            ),
            link3: (
              <Link to="/industries/rentals">
                <Translate id="solutions.fleetSpend.body.rentalOperations">
                  rental operations
                </Translate>
              </Link>
            ),
          }}
        >
          {
            'This is the spend capability of the broader session model. See {link}, the {link2}, and how it fits {link3}.'
          }
        </Translate>
      </p>
    </ContentPageLayout>
  );
}
