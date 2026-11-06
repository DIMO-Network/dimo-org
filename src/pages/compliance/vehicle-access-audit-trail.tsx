import React, { type ReactNode } from 'react';
import Link from '@docusaurus/Link';
import ContentPageLayout from '../../components/ContentPageLayout';
import Translate, { translate } from '@docusaurus/Translate';

const SITE = 'https://dimo.org';

const TITLE = translate({
  id: 'compliance.vehicleAccessAuditTrail.meta.title',
  message:
    'Verifiable Vehicle Access Audit Trails (SB-1394, UNECE R155) | DIMO',
});
const DESCRIPTION = translate({
  id: 'compliance.vehicleAccessAuditTrail.meta.description',
  message:
    'Revocable, signed, timestamped vehicle-access records that satisfy California SB-1394 and UNECE R155 — and give insurers a verifiable trail for disputes and underwriting.',
});
const H1 = translate({
  id: 'compliance.vehicleAccessAuditTrail.meta.h1',
  message:
    'Audit-ready vehicle access: who drove, what they could do, when it ended',
});

const schema = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: H1,
  description: DESCRIPTION,
  url: `${SITE}/compliance/vehicle-access-audit-trail`,
  datePublished: '2026-06-26',
  isPartOf: { '@id': `${SITE}/#website` },
  author: { '@id': `${SITE}/#organization`, name: 'DIMO' },
  publisher: { '@id': `${SITE}/#organization`, name: 'DIMO' },
};

export default function AuditTrail(): ReactNode {
  return (
    <ContentPageLayout
      title={TITLE}
      description={DESCRIPTION}
      breadcrumbs={[
        {
          name: translate({
            id: 'compliance.vehicleAccessAuditTrail.body.home.name',
            message: 'Home',
          }),
          url: `${SITE}/`,
        },
        {
          name: translate({
            id: 'compliance.vehicleAccessAuditTrail.body.compliance.name',
            message: 'Compliance',
          }),
          url: `${SITE}/compliance`,
        },
        {
          name: translate({
            id: 'compliance.vehicleAccessAuditTrail.body.auditTrails.name',
            message: 'Audit Trails',
          }),
        },
      ]}
      schema={schema}
      heroEyebrow={translate({
        id: 'compliance.vehicleAccessAuditTrail.body.complianceAudit',
        message: 'Compliance · Audit',
      })}
      heroTitle={H1}
      heroSubtitle={translate({
        id: 'compliance.vehicleAccessAuditTrail.body.newRulesRequireVehicle',
        message:
          'New rules require vehicle access to be revocable and auditable. A session model produces that record automatically — and it is the same record insurers need to settle a claim.',
      })}
    >
      <p>
        <Translate
          id="compliance.vehicleAccessAuditTrail.body.aVehicleAccessAudit"
          values={{
            strong: (
              <strong>
                <Translate id="compliance.vehicleAccessAuditTrail.body.californiaSb1394">
                  California SB-1394
                </Translate>
              </strong>
            ),
            strong2: (
              <strong>
                <Translate id="compliance.vehicleAccessAuditTrail.body.uneceR155R156">
                  UNECE R155/R156
                </Translate>
              </strong>
            ),
          }}
        >
          {
            'A vehicle access audit trail is a verifiable record of who was granted access to a vehicle, what they were allowed to do, and exactly when that access ended. Two regulations now make this mandatory rather than optional: {strong} requires vehicle access controls to be revocable by the owner, and {strong2} requires vehicle access systems to be auditable. A session model satisfies both by producing a signed, timestamped record every time access is granted and revoked.'
          }
        </Translate>
      </p>

      <h2>
        <Translate id="compliance.vehicleAccessAuditTrail.body.whatTheRulesRequire">
          What the rules require
        </Translate>
      </h2>
      <h3>
        <Translate id="compliance.vehicleAccessAuditTrail.body.californiaSb1394">
          California SB-1394
        </Translate>
      </h3>
      <p>
        <Translate
          id="compliance.vehicleAccessAuditTrail.body.signedIn2024And"
          values={{
            strong: (
              <strong>
                <Translate id="compliance.vehicleAccessAuditTrail.body.revocableByTheVehicle">
                  revocable by the vehicle owner
                </Translate>
              </strong>
            ),
          }}
        >
          {
            'Signed in 2024 and effective in 2025, SB-1394 requires that access controls on a connected vehicle be {strong}. The intent is consumer protection, particularly around stalking and abandoned access, but the engineering implication is concrete: there must be a real “off” switch, and pulling it must actually stop access. Session revocation is the technical implementation of that requirement. Ending a session withdraws every permission it contained at once.'
          }
        </Translate>
      </p>
      <h3>
        <Translate id="compliance.vehicleAccessAuditTrail.body.uneceR155R1562">
          UNECE R155 / R156
        </Translate>
      </h3>
      <p>
        <Translate
          id="compliance.vehicleAccessAuditTrail.body.inForceSinceJuly"
          values={{
            strong: <strong>auditable</strong>,
            strong2: (
              <strong>
                <Translate id="compliance.vehicleAccessAuditTrail.body.signedTimestampedAndImmutable">
                  signed, timestamped, and immutable
                </Translate>
              </strong>
            ),
          }}
        >
          {
            'In force since July 2024 for new vehicle types, R155 (cybersecurity) and R156 (software updates) require that vehicle access and its changes be {strong}. A system that grants access but cannot produce a trustworthy record of who had it and when does not meet the bar. DIMO sessions are {strong2}: cryptographically signed and independently verifiable, so the record can be trusted by a party that did not generate it.'
          }
        </Translate>
      </p>

      <h2>
        <Translate id="compliance.vehicleAccessAuditTrail.body.oneRecordTwoJobs">
          One record, two jobs: compliance and claims
        </Translate>
      </h2>
      <p>
        <Translate id="compliance.vehicleAccessAuditTrail.body.theSameAuditTrail">
          The same audit trail that satisfies a regulator is the artifact an
          insurer needs to underwrite and to settle disputes. That is where the
          business case sharpens. Today the data simply is not flowing:
        </Translate>
      </p>
      <ul>
        <li>
          <Translate
            id="compliance.vehicleAccessAuditTrail.body.despiteTheLowerLoss"
            values={{
              strong: (
                <strong>
                  <Translate id="compliance.vehicleAccessAuditTrail.body.70OfFleetsDont">
                    70% of fleets don't share telematics data with insurers
                  </Translate>
                </strong>
              ),
            }}
          >
            {
              '{strong} despite the lower loss ratios that data would justify, largely because there is no clean, consented, verifiable way to hand it over.'
            }
          </Translate>
        </li>
        <li>
          <Translate
            id="compliance.vehicleAccessAuditTrail.body.drivenByBatteryUnderwritingUncertainty"
            values={{
              strong: (
                <strong>
                  <Translate id="compliance.vehicleAccessAuditTrail.body.evInsurancePremiumsRun">
                    EV insurance premiums run about 49% higher than ICE
                  </Translate>
                </strong>
              ),
            }}
          >
            {
              '{strong}, driven by battery-underwriting uncertainty that better per-vehicle data would directly reduce.'
            }
          </Translate>
        </li>
      </ul>
      <p>
        <Translate id="compliance.vehicleAccessAuditTrail.body.aVerifiableSessionRecord">
          A verifiable session record closes that gap: it tells an underwriter
          who was driving, what telemetry was authorized, and when the session
          ended, in a form they can accept. The fleet gets better pricing; the
          insurer gets better risk signal; nobody has to trust an unverifiable
          export.
        </Translate>
      </p>

      <h2>
        <Translate id="compliance.vehicleAccessAuditTrail.body.settlingADisputeWithout">
          Settling a dispute, without the forensics
        </Translate>
      </h2>
      <p>
        <Translate id="compliance.vehicleAccessAuditTrail.body.considerADamageClaim">
          Consider a damage claim on a rental return. Without a session record,
          the operator reconstructs what happened by pulling booking data from
          one system, telematics from another, key events from a third, and
          charging from a fourth, then hopes the timestamps line up well enough
          to convince an adjuster. It is slow, and the resulting story is only
          as trustworthy as the operator asserting it.
        </Translate>
      </p>
      <p>
        <Translate id="compliance.vehicleAccessAuditTrail.body.withASessionRecord">
          With a session record, the same question is a single lookup: here is
          the verified driver, the window they had access, the telemetry that
          was in scope, and the moment access ended, all signed, so the adjuster
          does not have to take the operator's word for it. The dispute resolves
          on evidence both sides can independently verify, which is faster for
          the operator and lower-risk for the insurer.
        </Translate>
      </p>

      <h2>
        <Translate id="compliance.vehicleAccessAuditTrail.body.commonQuestions">
          Common questions
        </Translate>
      </h2>
      <h3>
        <Translate id="compliance.vehicleAccessAuditTrail.body.isSignedAndImmutable">
          Is “signed and immutable” just marketing?
        </Translate>
      </h3>
      <p>
        <Translate id="compliance.vehicleAccessAuditTrail.body.noItIsThe">
          No. It is the property that makes the record useful to a third party.
          A log a vendor can silently edit is worth little in a dispute or an
          audit. A cryptographically signed record can be checked by a party who
          did not create it, which is exactly what UNECE R155 auditability and
          an insurer's evidentiary needs require.
        </Translate>
      </p>
      <h3>
        <Translate id="compliance.vehicleAccessAuditTrail.body.doesThisConflictWith">
          Does this conflict with driver privacy?
        </Translate>
      </h3>
      <p>
        <Translate
          id="compliance.vehicleAccessAuditTrail.body.theOppositeTheSame"
          values={{
            link: (
              <Link to="/compliance/session-scoped-consent">
                <Translate id="compliance.vehicleAccessAuditTrail.body.sessionScopedConsent">
                  session-scoped consent
                </Translate>
              </Link>
            ),
          }}
        >
          {
            'The opposite. The same session that produces the audit trail also scopes what was shared and revokes it on return, so the record documents access that was already consented and bounded. Auditability and {link} are two sides of one primitive, not a trade-off.'
          }
        </Translate>
      </p>

      <h2>
        <Translate id="compliance.vehicleAccessAuditTrail.body.whatAuditReadyAccessLooks">
          What audit-ready access looks like in practice
        </Translate>
      </h2>
      <p>
        <Translate id="compliance.vehicleAccessAuditTrail.body.forEveryUseOf">
          For every use of a vehicle, a session produces a record containing the
          driver's verified identity, the data and capabilities that were in
          scope, the spend limit, the start and end times, and the revocation
          event, signed so it cannot be altered after the fact. Producing “who
          was driving and what telemetry” for a dispute becomes a lookup, not a
          forensic project across five disconnected systems.
        </Translate>
      </p>
      <p>
        <Translate
          id="compliance.vehicleAccessAuditTrail.body.thisIsTheAuditability"
          values={{
            link: (
              <Link to="/compliance/session-scoped-consent">
                <Translate id="compliance.vehicleAccessAuditTrail.body.sessionScopedConsent">
                  session-scoped consent
                </Translate>
              </Link>
            ),
            link2: (
              <Link to="/vehicle-session-infrastructure">
                <Translate id="compliance.vehicleAccessAuditTrail.body.vehicleSessionInfrastructure">
                  vehicle session infrastructure
                </Translate>
              </Link>
            ),
            link3: (
              <Link to="/solutions/fleet-intelligence">
                <Translate id="compliance.vehicleAccessAuditTrail.body.fleetIntelligence">
                  fleet intelligence
                </Translate>
              </Link>
            ),
          }}
        >
          {
            'This is the auditability half of {link} . Consent and audit are two faces of the same primitive. See how it fits the broader model in {link2}, and how fleets put it to work in {link3}.'
          }
        </Translate>
      </p>
      <p>
        <Translate
          id="compliance.vehicleAccessAuditTrail.body.related"
          values={{
            link: (
              <Link to="/compliance/ftc-gm-consent">
                <Translate id="compliance.vehicleAccessAuditTrail.body.theFtcGmOnStarOrder">
                  the FTC GM/OnStar order
                </Translate>
              </Link>
            ),
            link2: (
              <Link to="/compliance">
                <Translate id="compliance.vehicleAccessAuditTrail.body.allComplianceTopics">
                  all compliance topics
                </Translate>
              </Link>
            ),
          }}
        >
          {'Related: {link} · {link2}'}
        </Translate>
      </p>
      <p>
        <em>
          <Translate id="compliance.vehicleAccessAuditTrail.body.thisPageIsEducational">
            This page is educational, not legal advice.
          </Translate>
        </em>
      </p>
    </ContentPageLayout>
  );
}
