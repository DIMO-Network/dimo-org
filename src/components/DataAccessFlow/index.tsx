import React, { useEffect, useState } from 'react';
import {
  Monitor,
  Shield,
  Users,
  Settings,
  Webhook,
  Fingerprint,
  Gauge,
  Bot,
} from 'lucide-react';
import styles from './styles.module.css';

const CONSOLE_FEATURES = [
  { icon: <Shield size={18} />, label: 'Access Control' },
  { icon: <Users size={18} />, label: 'Vehicle Sharing' },
  { icon: <Settings size={18} />, label: 'App Configuration' },
  { icon: <Webhook size={18} />, label: 'Webhooks' },
];

const APIS = [
  { icon: <Fingerprint size={20} />, label: 'Identity', description: 'Authentication & authorization', link: 'https://www.dimo.org/docs/api-references/identity-api/introduction' },
  { icon: <Gauge size={20} />, label: 'Telemetry', description: 'Real-time vehicle data', link: 'https://www.dimo.org/docs/api-references/telemetry-api/introduction' },
  { icon: <Bot size={20} />, label: 'Agents', description: 'AI-powered interactions', link: 'https://www.dimo.org/docs/api-references/agents-api' },
];

const SDKS = [
  { name: 'TypeScript', logo: '/img/sdk/typescript.svg', link: 'https://github.com/DIMO-Network/data-sdk' },
  { name: 'Node.js', logo: '/img/sdk/nodejs.svg', link: 'https://github.com/DIMO-Network/data-sdk' },
  { name: 'Python', logo: '/img/sdk/python.svg', link: 'https://github.com/DIMO-Network/dimo-python-sdk' },
  { name: 'C#', logo: '/img/sdk/csharp.svg', link: 'https://github.com/DIMO-Network/dimo-dotnet-sdk' }
];

export default function DataAccessFlow() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className={styles.accessSection}>
      <div className={styles.container}>
        <div className={styles.titleBlock}>
          <span className={styles.eyebrow}>How It Works</span>
          <h2 className={styles.heading}>
            Build with Developer-First Tools
          </h2>
        </div>

        <div className={styles.cardsContainer}>
          {/* Developer Console */}
          <div className={`${styles.card} ${mounted ? styles.mounted : ''}`} style={{ transitionDelay: '0s' }}>
            <div className={styles.cardHeader}>
              <div className={styles.cardIcon}>
                <Monitor size={28} strokeWidth={1.5} />
              </div>
              <h3 className={styles.cardTitle}>Developer Console</h3>
            </div>
            <p className={styles.cardDesc}>Manage everything from one dashboard</p>
            <div className={styles.featureList}>
              {CONSOLE_FEATURES.map((feature, idx) => (
                <div
                  key={idx}
                  className={`${styles.featureItem} ${mounted ? styles.mounted : ''}`}
                  style={{ transitionDelay: `${0.3 + idx * 0.1}s` }}
                >
                  <div className={styles.featureIcon}>{feature.icon}</div>
                  <span className={styles.featureLabel}>{feature.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* APIs */}
          <div className={`${styles.card} ${styles.apiCard} ${mounted ? styles.mounted : ''}`} style={{ transitionDelay: '0.2s' }}>
            <div className={styles.cardHeader}>
              <div className={`${styles.cardIcon} ${styles.apiIcon}`}>
                <Webhook size={28} strokeWidth={1.5} />
              </div>
              <h3 className={styles.cardTitle}>APIs</h3>
            </div>
            <p className={styles.cardDesc}>Clean, well-documented endpoints</p>
            <div className={styles.apiList}>
              {APIS.map((api, idx) => (
                <a href={api.link} target="_blank" rel="noopener noreferrer" className={styles.apiLink} key={idx}>
                  <div
                    className={`${styles.apiItem} ${mounted ? styles.mounted : ''}`}
                    style={{ transitionDelay: `${0.5 + idx * 0.15}s` }}
                  >
                  <div className={styles.apiItemIcon}>{api.icon}</div>
                  <div className={styles.apiItemInfo}>
                    <span className={styles.apiItemLabel}>{api.label}</span>
                    <span className={styles.apiItemDesc}>{api.description}</span>
                  </div>
                </div>
                </a>
              ))}
            </div>
          </div>

          {/* SDKs */}
          <div className={`${styles.card} ${styles.sdkCard} ${mounted ? styles.mounted : ''}`} style={{ transitionDelay: '0.4s' }}>
            <div className={styles.cardHeader}>
              <div className={`${styles.cardIcon} ${styles.sdkIcon}`}>
                <span className={styles.codeSymbol}>&lt;/&gt;</span>
              </div>
              <h3 className={styles.cardTitle}>SDKs</h3>
            </div>
            <p className={styles.cardDesc}>Native libraries for your stack</p>
            <div className={styles.sdkGrid}>
              {SDKS.map((sdk, idx) => (
                <a href={sdk.link} target="_blank" rel="noopener noreferrer" className={styles.sdkLink}>
                <div
                  key={idx}
                  className={`${styles.sdkItem} ${mounted ? styles.mounted : ''}`}
                  style={{ transitionDelay: `${0.7 + idx * 0.1}s` }}
                >
                  <img src={sdk.logo} alt={sdk.name} className={styles.sdkLogo} />
                  <span className={styles.sdkName}>{sdk.name}</span>
                </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Connection Lines Animation */}
        <div className={styles.connectionLines}>
          <div className={`${styles.line} ${styles.line1} ${mounted ? styles.active : ''}`} />
          <div className={`${styles.line} ${styles.line2} ${mounted ? styles.active : ''}`} />
        </div>
      </div>
    </section>
  );
}
