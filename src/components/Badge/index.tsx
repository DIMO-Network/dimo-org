import React from 'react';
import './styles.css';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'pre-alpha' | 'alpha' | 'beta' | 'warning' | 'info';
}

const Badge: React.FC<BadgeProps> = ({ children, variant = 'info' }) => {
  return (
    <span className={`badge badge-${variant}`}>
      {children}
    </span>
  );
};

export default Badge;
