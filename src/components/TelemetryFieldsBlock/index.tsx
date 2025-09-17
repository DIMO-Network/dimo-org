import clsx from 'clsx';
import { useState } from 'react';
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

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

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

          {/* Table with telemetry fields */}
          <div className={styles.tableContainer}>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr className={styles.headerRow}>
                    <th className={styles.headerCell}>Signal</th>
                    <th className={styles.headerCell}>Common Name</th>
                    <th className={styles.headerCell}>Agg. Type</th>
                    <th className={styles.headerCell}>Units</th>
                    <th className={styles.headerCell}>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {fields.map((field, index) => (
                    <tr key={field.signal} className={styles.row}>
                      <td className={styles.cell}>
                        <code className={styles.signalCode}>
                          {field.signal}
                        </code>
                      </td>
                      <td className={styles.cell}>
                        <span className={styles.commonName}>
                          {field.commonName}
                        </span>
                      </td>
                      <td className={styles.cell}>
                        <span
                          className={styles.aggType}
                          dangerouslySetInnerHTML={{
                            __html: field.aggregationType,
                          }}
                        />
                      </td>
                      <td className={styles.cell}>
                        <span className={styles.units}>{field.units}</span>
                      </td>
                      <td className={styles.cell}>
                        <div
                          className={styles.description}
                          dangerouslySetInnerHTML={{
                            __html: field.description,
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TelemetryFieldsBlock;
