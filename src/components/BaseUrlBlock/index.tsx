import clsx from 'clsx';
import { useState } from 'react';
import styles from './styles.module.css';

export interface BaseUrlBlockProps {
  /**
   * The base URL for the API
   */
  url: string;

  /**
   * Optional title for the section (defaults to "Base URL")
   */
  title?: string;

  /**
   * Optional CSS class name for custom styling
   */
  className?: string;
}

function BaseUrlBlock({
  url,
  title = 'Base URL',
  className,
}: BaseUrlBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  return (
    <div className={clsx(styles.baseUrlBlock, className)}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <button
          onClick={copyToClipboard}
          className={styles.copyButton}
          title="Copy URL"
        >
          {copied ? (
            <>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path
                  d="M13.5 4.5L6 12L2.5 8.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <rect
                  x="2"
                  y="2"
                  width="8"
                  height="8"
                  rx="1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                />
                <path
                  d="M6 2V1a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
      <div className={styles.urlContainer}>
        <code className={styles.url}>{url}</code>
      </div>
    </div>
  );
}

export default BaseUrlBlock;
