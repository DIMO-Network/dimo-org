import React, { useState, useRef } from 'react';
import styles from './ImageTooltips.module.css';

export type TooltipArea = {
  x: number;
  y: number;
  width: number;
  height: number;
  title?: string;
  text: string;
};

export type ImageTooltipsProps = {
  src: string;
  alt: string;
  tooltipAreas?: TooltipArea[];
};

const ImageTooltips: React.FC<ImageTooltipsProps> = ({ src, alt, tooltipAreas = [] }) => {
  const [activeTooltip, setActiveTooltip] = useState<TooltipArea | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);

  const handleMouseEnter = (area: TooltipArea, event: React.MouseEvent) => {
    if (!imageRef.current) return;
    
    const rect = imageRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    setTooltipPosition({ x, y });
    setActiveTooltip(area);
  };

  const handleMouseLeave = () => {
    setActiveTooltip(null);
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (activeTooltip && imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      setTooltipPosition({ x, y });
    }
  };

  return (
    <div className={styles.imageContainer}>
      <img 
        ref={imageRef}
        src={src} 
        alt={alt} 
        className={styles.image}
        onMouseMove={handleMouseMove}
      />
      
      {tooltipAreas.map((area, index) => (
        <div
          key={index}
          className={styles.tooltipArea}
          style={{
            left: `${area.x}%`,
            top: `${area.y}%`,
            width: `${area.width}%`,
            height: `${area.height}%`,
          }}
          onMouseEnter={(e) => handleMouseEnter(area, e)}
          onMouseLeave={handleMouseLeave}
        />
      ))}
      
      {activeTooltip && (
        <div
          className={styles.tooltip}
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y - 10}px`,
          }}
        >
          <div className={styles.tooltipContent}>
            {activeTooltip.title && (
              <div className={styles.tooltipTitle}>{activeTooltip.title}</div>
            )}
            <div className={styles.tooltipText}>{activeTooltip.text}</div>
          </div>
          <div className={styles.tooltipArrow} />
        </div>
      )}
    </div>
  );
};

export default ImageTooltips;