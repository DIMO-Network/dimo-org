import clsx from 'clsx';
import { useCallback, useState } from 'react';
import styles from './styles.module.css';

export interface TelemetryField {
  signal: string;
  commonName: string;
  aggregationType: string;
  units: string;
  description: string;
}

export interface TelemetryHint {
  type: 'warning' | 'info' | 'success' | 'danger';
  content: string;
}

export interface TelemetryFieldsBlockProps {
  title: string;
  fields: TelemetryField[];
  hint?: TelemetryHint;
  defaultOpen?: boolean;
  className?: string;
}

function TelemetryFieldsBlock({
  title,
  fields,
  hint,
  defaultOpen = false,
  className,
}: TelemetryFieldsBlockProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [copiedSignal, setCopiedSignal] = useState<string | null>(null);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const copyToClipboard = useCallback((signal: string) => {
    navigator.clipboard.writeText(signal).then(() => {
      setCopiedSignal(signal);
      setTimeout(() => setCopiedSignal(null), 2000);
    }).catch((err) => {
      console.error('Failed to copy:', err);
    });
  }, []);

  return (
    <div className={clsx(styles.telemetryBlock, className)}>
      {/* Header with title and toggle button */}
      <button
        className={clsx(styles.header, isOpen && styles.open)}
        onClick={toggleOpen}
        aria-expanded={isOpen}
        type="button"
      >
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.toggleIcon}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className={clsx(styles.chevron, isOpen && styles.rotated)}
          >
            <path
              d="M4 6L8 10L12 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>

      {/* Collapsible content */}
      <div className={clsx(styles.content, isOpen && styles.contentOpen)}>
        <div className={styles.contentInner}>
          {/* Hint/Warning message */}
          {hint && (
            <div
              className={clsx(
                styles.hint,
                styles[
                  `hint${hint.type.charAt(0).toUpperCase() + hint.type.slice(1)}`
                ]
              )}
            >
              <div className={styles.hintIcon}>
                {hint.type === 'warning' && (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M8 1L15 14H1L8 1Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8 6V9"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <circle cx="8" cy="12" r="1" fill="currentColor" />
                  </svg>
                )}
                {hint.type === 'info' && (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle
                      cx="8"
                      cy="8"
                      r="7"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M8 12V8"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <circle cx="8" cy="5" r="1" fill="currentColor" />
                  </svg>
                )}
              </div>
              <div
                className={styles.hintContent}
                dangerouslySetInnerHTML={{ __html: hint.content }}
              />
            </div>
          )}

          {/* Signal cards */}
          <div className={styles.cardsContainer}>
            {fields.map((field, index) => (
              <div key={field.signal} className={styles.signalCard}>
                {/* Signal name with copy button */}
                <div className={styles.signalSection}>
                  <span className={styles.sectionLabel}>Signal Name</span>
                  <div className={styles.signalHeader}>
                    <code className={styles.signalCode}>
                      {field.signal}
                    </code>
                    <button
                      className={styles.copyButton}
                      onClick={() => copyToClipboard(field.signal)}
                      title={copiedSignal === field.signal ? 'Copied!' : 'Copy signal name'}
                      aria-label="Copy signal name"
                    >
                      {copiedSignal === field.signal ? (
                        <span className={styles.checkIcon}>✓</span>
                      ) : (
                        <svg
                          className={styles.copyIcon}
                          width="16"
                          height="16"
                          viewBox="0 0 460 460"
                          fill="currentColor"
                        >
                          <path d="M425.934,0H171.662c-18.122,0-32.864,14.743-32.864,32.864v77.134h30V32.864c0-1.579,1.285-2.864,2.864-2.864h254.272c1.579,0,2.864,1.285,2.864,2.864v254.272c0,1.58-1.285,2.865-2.864,2.865h-74.729v30h74.729c18.121,0,32.864-14.743,32.864-32.865V32.864C458.797,14.743,444.055,0,425.934,0z"/>
                          <path d="M288.339,139.998H34.068c-18.122,0-32.865,14.743-32.865,32.865v254.272C1.204,445.257,15.946,460,34.068,460h254.272c18.122,0,32.865-14.743,32.865-32.864V172.863C321.206,154.741,306.461,139.998,288.339,139.998z M288.341,430H34.068c-1.58,0-2.865-1.285-2.865-2.864V172.863c0-1.58,1.285-2.865,2.865-2.865h254.272c1.58,0,2.865,1.285,2.865,2.865v254.273h0.001C291.206,428.715,289.92,430,288.341,430z"/>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Common name */}
                <div className={styles.commonNameSection}>
                  <span className={styles.sectionLabel}>Common Name</span>
                  <span className={styles.commonName}>
                    {field.commonName}
                  </span>
                </div>

                {/* Metadata row - Agg Type and Units */}
                <div className={styles.metadataRow}>
                  <div className={styles.metadataItem}>
                    <span className={styles.metadataLabel}>Agg. Type</span>
                    <span className={styles.aggType}>
                      {field.aggregationType}
                    </span>
                  </div>
                  <div className={styles.metadataItem}>
                    <span className={styles.metadataLabel}>Units</span>
                    <span className={styles.units}>{field.units}</span>
                  </div>
                </div>

                {/* Description */}
                <div
                  className={styles.description}
                  dangerouslySetInnerHTML={{
                    __html: field.description,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TelemetryFieldsBlock;
