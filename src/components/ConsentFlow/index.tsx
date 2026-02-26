import React, { useEffect, useState } from 'react';
import {
  User,
  ShieldCheck,
  Code2,
  Database,
  MapPin,
  Gauge,
  ArrowDown,
  PlaneTakeoff,
  MessageSquareWarning,
  Check,
} from 'lucide-react';
import styles from './styles.module.css';

const DATA_PERMISSIONS = [
  {
    id: 'telemetry',
    icon: <MapPin size={16} />,
    label: 'Telemetry',
    description: 'GPS coordinates, engine status, battery level',
    json: `{
  "currentLocationAltitude": 983.8,
  "currentLocationCoordinates": { "latitude": 36.1805983, "longitude": -115.3463983, "hdop": 1.2 },
  "powertrainCombustionEngineECT": 61,
  "isIgnitionOn": 1,
  "powertrainCombustionEngineSpeed": 788.25,
  "lowVoltageBatteryCurrentVoltage": 13.848,
  "powertrainFuelSystemAbsoluteLevel": 28,
  "powertrainFuelSystemRelativeLevel": 47.450980392156865,
  "timestamp": "2025-11-01T21:09:00Z",
  "odometer": 78838
}`,
  },
  {
    id: 'vin-credentials',
    icon: <Gauge size={16} />,
    label: 'VIN Credentials',
    description: 'Vehicle Identification Number',
    json: `{
  "vin": "1HGCM82633A004352XYZ",
}`,
  },
  {
    id: 'events',
    icon: <MessageSquareWarning size={16} />,
    label: 'Events',
    description: 'Driving events',
    json: `[
  {
    "name": "HarshAcceleration",
    "metadata": "{\"counterValue\":1}",
    "timestamp": "2025-12-04T23:20:57Z"
  },
  {
    "name": "ExtremeBraking",
    "metadata": "{\"counterValue\":1}",
    "timestamp": "2025-12-04T23:20:53Z"
  }
]`,
  },
  {
    id: 'segments',
    icon: <PlaneTakeoff size={16} />,
    label: 'Segments',
    description: 'Trip segments',
    json: `[
  {
    "startTime": "2025-11-01T21:07:00Z",
    "endTime": "2025-11-01T22:02:00Z",
    "isOngoing": false,
    "durationSeconds": 3300,
    "startedBeforeRange": false
  },
  {
    "startTime": "2025-11-01T22:15:00Z",
    "endTime": "2025-11-01T22:40:00Z",
    "isOngoing": false,
    "durationSeconds": 1500,
    "startedBeforeRange": false
  }
]`,
  },
];

export default function ConsentFlow() {
  const [mounted, setMounted] = useState(false);
  const [consentGranted, setConsentGranted] = useState(false);
  const [selectedPermission, setSelectedPermission] = useState(DATA_PERMISSIONS[0]);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setConsentGranted(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handlePermissionClick = (permission: typeof DATA_PERMISSIONS[0]) => {
    setSelectedPermission(permission);
  };

  return (
    <section className={styles.consentSection}>
      <div className={styles.container}>
        <div className={styles.titleBlock}>
          <span className={styles.eyebrow}>How It Works</span>
          <h2 className={styles.heading}>
            User-Controlled Data Permissions
          </h2>
        </div>

        <div className={styles.mainLayout}>
          {/* Left Side: Flow Diagram */}
          <div className={styles.flowDiagram}>
            {/* Top Row: Vehicle Owner -> DIMO Consent */}
            <div className={styles.topRow}>
              {/* Vehicle Owner */}
              <div className={`${styles.flowStep} ${mounted ? styles.mounted : ''}`} style={{ transitionDelay: '0s' }}>
                <div className={styles.stepCard}>
                  <div className={styles.stepIcon}>
                    <User size={32} strokeWidth={1.5} />
                  </div>
                  <div className={styles.stepTitle}>Vehicle Owner</div>
                  <div className={styles.stepDesc}>Share vehicle data</div>
                </div>
              </div>

              {/* Arrow: Grants Consent */}
              <div className={`${styles.flowArrowHorizontal} ${mounted ? styles.mounted : ''}`} style={{ transitionDelay: '0.3s' }}>
                <div className={styles.arrowLine}>
                  <div className={`${styles.arrowPacket} ${consentGranted ? styles.active : ''}`} />
                </div>
                <div className={styles.arrowLabel}>Grants Consent</div>
              </div>

              {/* DIMO Consent */}
              <div className={`${styles.flowStep} ${mounted ? styles.mounted : ''}`} style={{ transitionDelay: '0.6s' }}>
                <div className={`${styles.stepCard} ${styles.dimoCard}`}>
                  <div className={`${styles.stepIcon} ${styles.dimoIcon}`}>
                    <ShieldCheck size={32} strokeWidth={1.5} />
                  </div>
                  <div className={styles.stepTitle}>DIMO Consent</div>
                  <div className={styles.stepDesc}>Verifies & records on-chain</div>
                </div>
              </div>
            </div>

            {/* Vertical Arrow from App Developer to Vehicle Owner */}
            <div className={styles.verticalConnector}>
              <div className={`${styles.flowArrowVertical} ${mounted ? styles.mounted : ''}`} style={{ transitionDelay: '0.8s' }}>
                <div className={styles.arrowLineVertical}>
                  <div className={`${styles.arrowPacketUp} ${consentGranted ? styles.active : ''}`} />
                </div>
                <div className={styles.arrowLabelVertical}>Request Consent</div>
              </div>
            </div>

            {/* Bottom Row: App Developer -> DIMO API */}
            <div className={styles.bottomRow}>
              {/* App Developer */}
              <div className={`${styles.flowStep} ${mounted ? styles.mounted : ''}`} style={{ transitionDelay: '1.0s' }}>
                <div className={styles.stepCard}>
                  <div className={styles.stepIcon}>
                    <Code2 size={32} strokeWidth={1.5} />
                  </div>
                  <div className={styles.stepTitle}>App Developer</div>
                  <div className={styles.stepDesc}>Fetches consented data</div>
                </div>
              </div>

              {/* Arrow: API Access */}
              <div className={`${styles.flowArrowHorizontal} ${mounted ? styles.mounted : ''}`} style={{ transitionDelay: '1.2s' }}>
                <div className={styles.arrowLine}>
                  <div className={`${styles.arrowPacket} ${styles.apiPacket} ${consentGranted ? styles.active : ''}`} />
                </div>
                <div className={styles.arrowLabel}>API Access</div>
              </div>

              {/* DIMO API */}
              <div className={`${styles.flowStep} ${mounted ? styles.mounted : ''}`} style={{ transitionDelay: '1.4s' }}>
                <div className={styles.stepCard}>
                  <div className={`${styles.stepIcon} ${styles.storageIcon}`}>
                    <Database size={32} strokeWidth={1.5} />
                  </div>
                  <div className={styles.stepTitle}>DIMO API</div>
                  <div className={styles.stepDesc}>Managed or on-premise</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Permissions & JSON Preview */}
          <div className={`${styles.rightPanel} ${mounted ? styles.mounted : ''}`}>
            {/* Permissions Panel */}
            <div className={styles.permissionsPanel}>
              <div className={styles.permissionsLabel}>Data Previews</div>
              <div className={styles.permissionsGrid}>
                {DATA_PERMISSIONS.map((perm, idx) => (
                  <div
                    key={idx}
                    className={`${styles.permissionItem} ${consentGranted ? styles.granted : ''} ${selectedPermission.id === perm.id ? styles.selected : ''}`}
                    style={{ transitionDelay: `${1.0 + idx * 0.1}s` }}
                    onClick={() => handlePermissionClick(perm)}
                  >
                    <div className={styles.permissionIcon}>{perm.icon}</div>
                    <div className={styles.permissionInfo}>
                      <span className={styles.permissionName}>{perm.label}</span>
                      <span className={styles.permissionDesc}>{perm.description}</span>
                    </div>
                    <div className={`${styles.permissionCheck} ${consentGranted ? styles.visible : ''}`}>
                      <Check size={12} strokeWidth={3} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* JSON Preview */}
            <div className={`${styles.jsonPreview} ${consentGranted ? styles.active : ''}`}>
              <div className={styles.jsonHeader}>
                <span className={styles.jsonDot} />
                <span className={styles.jsonDot} />
                <span className={styles.jsonDot} />
                <span className={styles.jsonTitle}>{selectedPermission.label} Response</span>
              </div>
              <pre className={styles.jsonCode}>{selectedPermission.json}</pre>
            </div>
          </div>
        </div>

        {/* Mobile View - Simplified */}
        <div className={styles.mobileFlow}>
          <div className={styles.mobileSection}>
            <div className={styles.mobileSectionTitle}>Consent Flow</div>
            <div className={`${styles.mobileStep} ${mounted ? styles.mounted : ''}`}>
              <div className={styles.mobileStepNumber}>1</div>
              <div className={styles.mobileStepContent}>
                <Code2 size={24} />
                <span>App requests consent from user</span>
              </div>
            </div>
            <div className={styles.mobileArrow}><ArrowDown size={20} /></div>
            <div className={`${styles.mobileStep} ${mounted ? styles.mounted : ''}`} style={{ transitionDelay: '0.2s' }}>
              <div className={styles.mobileStepNumber}>2</div>
              <div className={styles.mobileStepContent}>
                <User size={24} />
                <span>Vehicle Owner grants consent</span>
              </div>
            </div>
            <div className={styles.mobileArrow}><ArrowDown size={20} /></div>
            <div className={`${styles.mobileStep} ${mounted ? styles.mounted : ''}`} style={{ transitionDelay: '0.3s' }}>
              <div className={styles.mobileStepNumber}>3</div>
              <div className={styles.mobileStepContent}>
                <ShieldCheck size={24} />
                <span>DIMO verifies & records on-chain</span>
              </div>
            </div>
          </div>

          <div className={styles.mobileSection}>
            <div className={styles.mobileSectionTitle}>Data Access</div>
            <div className={`${styles.mobileStep} ${mounted ? styles.mounted : ''}`} style={{ transitionDelay: '0.4s' }}>
              <div className={styles.mobileStepNumber}>4</div>
              <div className={styles.mobileStepContent}>
                <Code2 size={24} />
                <span>App Developer calls API</span>
              </div>
            </div>
            <div className={styles.mobileArrow}><ArrowDown size={20} /></div>
            <div className={`${styles.mobileStep} ${mounted ? styles.mounted : ''}`} style={{ transitionDelay: '0.5s' }}>
              <div className={styles.mobileStepNumber}>5</div>
              <div className={styles.mobileStepContent}>
                <Database size={24} />
                <span>DIMO Storage returns data</span>
              </div>
            </div>
          </div>

          <div className={styles.mobilePermissions}>
            <div className={styles.mobilePermissionsTitle}>Granular Permissions</div>
            <div className={styles.mobilePermissionsGrid}>
              {DATA_PERMISSIONS.map((perm, idx) => (
                <div
                  key={idx}
                  className={`${styles.mobilePermItem} ${selectedPermission.id === perm.id ? styles.selected : ''}`}
                  onClick={() => handlePermissionClick(perm)}
                >
                  {perm.icon}
                  <span>{perm.label}</span>
                </div>
              ))}
            </div>
            <div className={`${styles.mobileJsonPreview} ${consentGranted ? styles.active : ''}`}>
              <div className={styles.jsonHeader}>
                <span className={styles.jsonDot} />
                <span className={styles.jsonDot} />
                <span className={styles.jsonDot} />
                <span className={styles.jsonTitle}>{selectedPermission.label}</span>
              </div>
              <pre className={styles.jsonCode}>{selectedPermission.json}</pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
