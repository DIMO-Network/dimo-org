import clsx from 'clsx';
import styles from './styles.module.css';

export interface Parameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

export interface ParametersBlockProps {
  parameters: Parameter[];
  className?: string;
}

function ParametersBlock({ parameters, className }: ParametersBlockProps) {
  return (
    <div className={clsx(styles.parametersBlock, className)}>
      <h3 className={styles.title}>Parameters</h3>
      <div className={styles.parametersList}>
        {parameters.map((param, index) => (
          <div key={param.name} className={styles.parameterItem}>
            <div className={styles.parameterHeader}>
              <code className={styles.parameterName}>{param.name}</code>
              <span className={styles.parameterType}>{param.type}</span>
              <span
                className={clsx(
                  styles.badge,
                  param.required ? styles.required : styles.optional
                )}
              >
                {param.required ? 'Required' : 'Optional'}
              </span>
            </div>
            <div className={styles.parameterDescription}>
              {param.description}
            </div>
            {index < parameters.length - 1 && (
              <div className={styles.separator} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ParametersBlock;
