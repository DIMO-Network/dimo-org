import clsx from 'clsx';
import { useState } from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import styles from './styles.module.css';

export interface ApiResponseBlockProps {
  code: string;
  className?: string;
}

function ApiResponseBlock({ code, className }: ApiResponseBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    if (code) {
      try {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy code:', err);
      }
    }
  };

  return (
    <div className={clsx(styles.apiResponseBlock, className)}>
      {/* Header with Response title */}
      <div className={styles.header}>
        <h4 className={styles.title}>Response</h4>
      </div>

      {/* Code block with syntax highlighting */}
      <div className={styles.codeContainer}>
        <div className={styles.codeHeader}>
          <button
            onClick={copyToClipboard}
            className={styles.copyButton}
            title="Copy response"
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

        <Highlight theme={themes.vsDark} code={code} language="json">
          {({
            className: highlightClassName,
            style,
            tokens,
            getLineProps,
            getTokenProps,
          }) => (
            <pre
              className={clsx(styles.codeBlock, highlightClassName)}
              style={style}
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
}

export default ApiResponseBlock;
