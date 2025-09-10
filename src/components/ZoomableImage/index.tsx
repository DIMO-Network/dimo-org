import React, { useState } from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

interface ZoomableImageProps {
  src: string;
  alt: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  style?: React.CSSProperties;
  caption?: string;
  loading?: 'lazy' | 'eager';
  placeholder?: string;
}

const ZoomableImage: React.FC<ZoomableImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  style = {},
  caption,
  loading = 'lazy',
  placeholder
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const imageStyle: React.CSSProperties = {
    maxWidth: '100%',
    height: 'auto',
    ...style,
    ...(width && { width }),
    ...(height && { height }),
    opacity: imageLoaded ? 1 : 0.5,
    transition: 'opacity 0.3s ease'
  };

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    display: 'inline-block'
  };

  if (imageError) {
    return (
      <div className={`zoomable-image-container error ${className}`} style={containerStyle}>
        <div style={{
          padding: '20px',
          border: '2px dashed var(--ifm-color-emphasis-300)',
          textAlign: 'center',
          color: 'var(--ifm-color-emphasis-600)'
        }}>
          Failed to load image: {alt}
        </div>
      </div>
    );
  }

  return (
    <div className={`zoomable-image-container ${className}`} style={containerStyle}>
      {!imageLoaded && placeholder && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'var(--ifm-color-emphasis-100)',
          zIndex: 1
        }}>
          {placeholder}
        </div>
      )}
      
      <Zoom>
        <img 
          src={src} 
          alt={alt} 
          style={imageStyle}
          loading={loading}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
        />
      </Zoom>
      
      {caption && (
        <p className="image-caption" style={{ 
          textAlign: 'center', 
          fontStyle: 'italic', 
          marginTop: '8px',
          color: 'var(--ifm-color-emphasis-600)',
          fontSize: '0.9em'
        }}>
          {caption}
        </p>
      )}
    </div>
  );
};

export default ZoomableImage;