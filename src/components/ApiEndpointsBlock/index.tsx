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
            <span
              className={clsx(
                styles.methodBadge,
                getMethodColor(endpoint.method)
              )}
            >
              {endpoint.method.toUpperCase()}
            </span>
            <code className={styles.pathCode}>{endpoint.path}</code>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ApiEndpointsBlock;
