import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

interface ArrowLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const ArrowLink: React.FC<ArrowLinkProps> = ({ href, children, className }) => {
  return (
    <Link to={href} className={`${styles.arrowLink} ${className || ''}`}>
      <span className={styles.text}>{children}</span>
      <svg
        className={styles.arrow}
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 12L10 8L6 4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
};

export default ArrowLink;
