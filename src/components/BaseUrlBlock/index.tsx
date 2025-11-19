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
              <svg width="14" height="14" viewBox="0 0 460 460" fill="currentColor">
                <path d="M425.934,0H171.662c-18.122,0-32.864,14.743-32.864,32.864v77.134h30V32.864c0-1.579,1.285-2.864,2.864-2.864h254.272
                  c1.579,0,2.864,1.285,2.864,2.864v254.272c0,1.58-1.285,2.865-2.864,2.865h-74.729v30h74.729
                  c18.121,0,32.864-14.743,32.864-32.865V32.864C458.797,14.743,444.055,0,425.934,0z"/>
                <path d="M288.339,139.998H34.068c-18.122,0-32.865,14.743-32.865,32.865v254.272C1.204,445.257,15.946,460,34.068,460h254.272
                  c18.122,0,32.865-14.743,32.865-32.864V172.863C321.206,154.741,306.461,139.998,288.339,139.998z M288.341,430H34.068
                  c-1.58,0-2.865-1.285-2.865-2.864V172.863c0-1.58,1.285-2.865,2.865-2.865h254.272c1.58,0,2.865,1.285,2.865,2.865v254.273h0.001
                  C291.206,428.715,289.92,430,288.341,430z"/>
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
