import clsx from 'clsx';
import { useState } from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import styles from './styles.module.css';

export interface CodeExample {
  label: string;
  language: string;
  code: string;
}

export interface ApiCodeBlockProps {
  requestType: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  codeExamples: CodeExample[];
  defaultLanguage?: string;
  className?: string;
}

const HTTP_METHOD_COLORS = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete',
  PATCH: 'patch',
} as const;

function ApiCodeBlock({
  requestType,
  path,
  codeExamples,
  defaultLanguage,
  className,
}: ApiCodeBlockProps) {
  const [selectedLanguage, setSelectedLanguage] = useState(
    defaultLanguage || codeExamples[0]?.label || ''
  );
  const [copied, setCopied] = useState(false);

  const selectedExample =
    codeExamples.find(example => example.label === selectedLanguage) ||
    codeExamples[0];

  const copyToClipboard = async () => {
    if (selectedExample?.code) {
      try {
        await navigator.clipboard.writeText(selectedExample.code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy code:', err);
      }
    }
  };

  return (
    <div className={clsx(styles.apiCodeBlock, className)}>
      {/* Header with HTTP method and path */}
      <div className={styles.header}>
        <div className={styles.methodAndPath}>
          <span
            className={clsx(
              styles.method,
              styles[HTTP_METHOD_COLORS[requestType]]
            )}
          >
            {requestType}
          </span>
          <span className={styles.path}>{path}</span>
        </div>

        {/* Language selector dropdown */}
        <div className={styles.languageSelector}>
          <select
            value={selectedLanguage}
            onChange={e => setSelectedLanguage(e.target.value)}
            className={styles.dropdown}
          >
            {codeExamples.map(example => (
              <option key={example.label} value={example.label}>
                {example.label}
              </option>
            ))}
          </select>
          <svg
            className={styles.dropdownIcon}
            width="12"
            height="8"
            viewBox="0 0 12 8"
          >
            <path
              d="M1 1l5 5 5-5"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Code block with syntax highlighting */}
      <div className={styles.codeContainer}>
        <div className={styles.codeHeader}>
          <button
            onClick={copyToClipboard}
            className={styles.copyButton}
            title="Copy code"
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

        {selectedExample && (
          <Highlight
            theme={themes.vsDark}
            code={selectedExample.code}
            language={selectedExample.language}
          >
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
        )}
      </div>
    </div>
  );
}

export default ApiCodeBlock;
