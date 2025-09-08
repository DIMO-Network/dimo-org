import clsx from 'clsx';
import React from 'react';
import styles from './styles.module.css';

export interface TwoColumnLayoutProps {
  /**
   * Content for the left column (documentation/content)
   */
  leftColumn: React.ReactNode;

  /**
   * Content for the right column (code examples/secondary content)
   */
  rightColumn: React.ReactNode;

  /**
   * Optional CSS class name for custom styling
   */
  className?: string;

  /**
   * Column ratio (left:right). Options: '1:1', '2:1', '1:2'. Default: '1:1'
   */
  ratio?: '1:1' | '2:1' | '1:2';

  /**
   * Gap between columns in rem units. Default: 2
   */
  gap?: number;

  /**
   * Breakpoint at which columns stack (in pixels). Default: 768
   */
  stackAt?: number;
}

const TwoColumnLayout: React.FC<TwoColumnLayoutProps> = ({
  leftColumn,
  rightColumn,
  className,
  ratio = '1:1',
  gap = 2,
  stackAt = 768,
}) => {
  const containerClasses = clsx(
    styles.twoColumnContainer,
    {
      [styles.ratio11]: ratio === '1:1',
      [styles.ratio21]: ratio === '2:1',
      [styles.ratio12]: ratio === '1:2',
    },
    className
  );

  const containerStyle: React.CSSProperties = {
    '--column-gap': `${gap}rem`,
    '--stack-breakpoint': `${stackAt}px`,
  } as React.CSSProperties;

  return (
    <div className={containerClasses} style={containerStyle}>
      <div className={styles.leftColumn}>{leftColumn}</div>

      <div className={styles.rightColumn}>{rightColumn}</div>
    </div>
  );
};

export default TwoColumnLayout;
