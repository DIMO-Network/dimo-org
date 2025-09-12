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

  /**
   * Optional unique ID for anchor linking from ApiEndpointsBlock
   */
  id?: string;

  /**
   * Make the right column sticky to the top when scrolling. Default: false
   */
  stickyRight?: boolean;

  /**
   * Make the left column sticky to the top when scrolling. Default: false
   */
  stickyLeft?: boolean;

  /**
   * Top offset for sticky positioning (in rem). Accounts for fixed navigation headers.
   * Default: 5rem (appropriate for most Docusaurus sites). Adjust if your navigation height differs.
   */
  stickyTop?: number;
}

const TwoColumnLayout: React.FC<TwoColumnLayoutProps> = ({
  leftColumn,
  rightColumn,
  className,
  ratio = '1:1',
  gap = 2,
  stackAt = 768,
  id,
  stickyRight = false,
  stickyLeft = false,
  stickyTop = 5,
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
    '--sticky-top': `${stickyTop}rem`,
  } as React.CSSProperties;

  const leftColumnClasses = clsx(
    styles.leftColumn,
    stickyLeft && styles.stickyLeft
  );

  const rightColumnClasses = clsx(
    styles.rightColumn,
    stickyRight && styles.stickyRight
  );

  return (
    <div className={containerClasses} style={containerStyle} id={id}>
      <div className={leftColumnClasses}>{leftColumn}</div>

      <div className={rightColumnClasses}>{rightColumn}</div>
    </div>
  );
};

export default TwoColumnLayout;
