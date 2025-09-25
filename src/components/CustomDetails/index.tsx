import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

interface CustomDetailsProps {
  summary: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

const CustomDetails: React.FC<CustomDetailsProps> = ({ 
  summary, 
  children, 
  defaultOpen = false,
  className 
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={clsx(styles.detailsBlock, className)}>
      {/* Header with title and toggle button */}
      <button
        className={clsx(styles.header, isOpen && styles.open)}
        onClick={toggleOpen}
        aria-expanded={isOpen}
        type="button"
      >
        <h3 className={styles.title}>{summary}</h3>
        <div className={styles.toggleIcon}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className={clsx(styles.chevron, isOpen && styles.rotated)}
          >
            <path
              d="M4 6L8 10L12 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>

      {/* Collapsible content */}
      <div className={clsx(styles.content, isOpen && styles.contentOpen)}>
        <div className={styles.contentInner}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default CustomDetails;