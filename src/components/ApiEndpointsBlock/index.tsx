import clsx from 'clsx';
import React from 'react';
import styles from './styles.module.css';

export interface ApiEndpoint {
  /**
   * HTTP method (GET, POST, PUT, DELETE, etc.)
   */
  method: string;

  /**
   * API endpoint path
   */
  path: string;

  /**
   * Optional description for the endpoint
   */
  description?: string;

  /**
   * Unique ID for anchor linking
   */
  id: string;
}

export interface ApiEndpointsBlockProps {
  /**
   * Array of API endpoints to display
   */
  endpoints: ApiEndpoint[];

  /**
   * Optional title for the endpoints section (defaults to "Endpoints")
   */
  title?: string;

  /**
   * Optional CSS class name for custom styling
   */
  className?: string;
}

const ApiEndpointsBlock: React.FC<ApiEndpointsBlockProps> = ({
  endpoints,
  title = 'Endpoints',
  className,
}) => {
  const handleEndpointClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const getMethodColor = (method: string): string => {
    const upperMethod = method.toUpperCase();
    switch (upperMethod) {
      case 'GET':
        return styles.methodGet;
      case 'POST':
        return styles.methodPost;
      case 'PUT':
        return styles.methodPut;
      case 'DELETE':
        return styles.methodDelete;
      case 'PATCH':
        return styles.methodPatch;
      default:
        return styles.methodDefault;
    }
  };

  return (
    <div className={clsx(styles.endpointsContainer, className)}>
      <h3 className={styles.endpointsTitle}>{title}</h3>
      <div className={styles.endpointsList}>
        {endpoints.map(endpoint => (
          <button
            key={endpoint.id}
            className={styles.endpointItem}
            onClick={() => handleEndpointClick(endpoint.id)}
            type="button"
          >
            <div className={styles.endpointMethod}>
              <span
                className={clsx(
                  styles.methodBadge,
                  getMethodColor(endpoint.method)
                )}
              >
                {endpoint.method.toUpperCase()}
              </span>
            </div>
            <div className={styles.endpointPath}>
              <code className={styles.pathCode}>{endpoint.path}</code>
              {endpoint.description && (
                <span className={styles.endpointDescription}>
                  {endpoint.description}
                </span>
              )}
            </div>
            <div className={styles.endpointArrow}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M6 3l5 5-5 5V3z" />
              </svg>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ApiEndpointsBlock;
