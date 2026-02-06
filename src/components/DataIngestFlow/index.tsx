import React, { useEffect, useState } from 'react';
import { Plug, Radio, Link as LinkIcon, Server } from 'lucide-react';
import styles from './styles.module.css';

const SOURCES = [
  {
    icon: <Plug size={24} strokeWidth={2} />,
    title: 'Bring Your Own Data',
    description: 'Connect any telematics you currently use directly to DIMO',
    examples: 'Custom hardware, aftermarket devices',
  },
  {
    icon: <Radio size={24} strokeWidth={2} />,
    title: 'DIMO-Connected Device',
    description: 'Pre-certified DIMO hardware with seamless plug-and-play integration',
    examples: 'R1, Smart5, AutoPi, Macaron, etc',
  },
  {
    icon: <LinkIcon size={24} strokeWidth={2} />,
    title: 'DIMO Native Integrations',
    description: 'Direct API connections with major OEMs and fleet management platforms',
    examples: 'Tesla, Samsara, Geotab, etc',
  },
];

export default function DataIngestFlow() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className={styles.dataIngestSection}>
      <div className={styles.container}>
        <div className={styles.titleBlock}>
          <span className={styles.eyebrow}>How It Works</span>
          <h2 className={styles.heading}>
            Unified Data Ingestion from Any Source
          </h2>
        </div>

        <div className={styles.diagram}>
          <div className={styles.sources}>
            {SOURCES.map((source, index) => (
              <div
                key={index}
                className={`${styles.sourceCard} ${mounted ? styles.mounted : ''}`}
                style={{ transitionDelay: `${index * 0.2}s` }}
              >
                <div className={styles.iconBox}>{source.icon}</div>
                <div className={styles.sourceTitle}>{source.title}</div>
                <div className={styles.sourceDesc}>{source.description}</div>
                <div className={styles.examples}>{source.examples}</div>
              </div>
            ))}
          </div>

          <div className={styles.flowContainer}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={styles.dataPacket}
                style={{
                  animationDelay: `${i}s`,
                  top: i === 0 ? '20%' : i === 1 ? '50%' : '80%',
                }}
              />
            ))}
          </div>

          <div className={`${styles.serverContainer} ${mounted ? styles.mounted : ''}`}>
            <div className={styles.serverBox}>
              <Server size={52} strokeWidth={2} />
              <div className={styles.serverTitle}>DIMO Ingest Server</div>
              <div className={styles.serverSubtitle}>
                Unified Vehicle Data Infrastructure
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}