import React, { useMemo } from 'react';
import styles from './styles.module.css';

interface GraphQLPlaygroundProps {
  /** The GraphQL endpoint URL */
  endpoint?: string;
  /** Default query to display in the playground */
  query?: string;
  /** Default variables to display in the playground */
  variables?: string | object;
  /** Title for the iframe container */
  title?: string;
  /** Custom height for the iframe (default: 600px) */
  height?: string | number;
  /** Custom width for the iframe (default: 100%) */
  width?: string | number;
  /** Additional headers to pass (if supported by the playground) */
  headers?: Record<string, string>;
}

const GraphQLPlayground: React.FC<GraphQLPlaygroundProps> = ({
  endpoint = 'https://identity-api.dimo.zone/',
  query = '',
  variables,
  title = 'GraphQL Playground',
  height = '600px',
  width = '100%',
  headers,
}) => {
  // Construct the iframe URL with query parameters
  const iframeUrl = useMemo(() => {
    const url = new URL(endpoint);

    // Add query parameter if provided
    if (query) {
      url.searchParams.set('query', query);
    }

    // Add variables parameter if provided
    if (variables) {
      const variablesString =
        typeof variables === 'string' ? variables : JSON.stringify(variables);
      url.searchParams.set('variables', variablesString);
    }

    // Add headers if provided (note: not all playgrounds support this)
    if (headers) {
      url.searchParams.set('headers', JSON.stringify(headers));
    }

    return url.toString();
  }, [endpoint, query, variables, headers]);

  return (
    <div className={styles.playgroundContainer}>
      <div className={styles.playgroundHeader}>
        <h3 className={styles.playgroundTitle}>{title}</h3>
        <a
          href={iframeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.openButton}
        >
          Open in New Tab →
        </a>
      </div>
      <div className={styles.iframeWrapper}>
        <iframe
          src={iframeUrl}
          title={title}
          className={styles.iframe}
          style={{
            height: typeof height === 'number' ? `${height}px` : height,
            width: typeof width === 'number' ? `${width}px` : width,
          }}
          frameBorder="0"
          allow="clipboard-read; clipboard-write"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals"
        />
      </div>
      <div className={styles.playgroundFooter}>
        <p className={styles.footerText}>
          💡 Tip: You can interact with the playground above or{' '}
          <a href={iframeUrl} target="_blank" rel="noopener noreferrer">
            open it in a new tab
          </a>{' '}
          for a full-screen experience.
        </p>
      </div>
    </div>
  );
};

export default GraphQLPlayground;
