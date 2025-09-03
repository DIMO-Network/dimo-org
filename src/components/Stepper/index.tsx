import clsx from 'clsx';
import type { ReactNode } from 'react';
import React from 'react';
import styles from './styles.module.css';

export interface StepProps {
  stepNumber: number;
  title: string;
  children: ReactNode;
  image?: string;
  imageAlt?: string;
}

export interface StepperProps {
  children: ReactNode;
  className?: string;
}

function Step({ stepNumber, title, children, image, imageAlt }: StepProps) {
  return (
    <div className={styles.step}>
      <div className={styles.stepHeader}>
        <div className={styles.stepNumber}>
          <span>{stepNumber}</span>
        </div>
        <h3 className={styles.stepTitle}>{title}</h3>
      </div>

      <div className={styles.stepContent}>
        {image && (
          <div className={styles.stepImage}>
            <img
              src={image}
              alt={imageAlt || `Step ${stepNumber} illustration`}
              loading="lazy"
            />
          </div>
        )}
        <div className={styles.stepText}>{children}</div>
      </div>

      <div className={styles.stepConnector}></div>
    </div>
  );
}

function Stepper({ children, className }: StepperProps) {
  // Add step numbers to children automatically
  const stepsWithNumbers = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child) && child.type === Step) {
      return React.cloneElement(child as React.ReactElement<StepProps>, {
        stepNumber: child.props.stepNumber || index + 1,
      });
    }
    return child;
  });

  return (
    <div className={clsx(styles.stepper, className)}>{stepsWithNumbers}</div>
  );
}

// Export both components
export { Step };
export default Stepper;
