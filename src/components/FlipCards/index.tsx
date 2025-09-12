import React from 'react';

// Generic FlipCard interfaces
export interface FlipCardItem {
  id: string;
  title: string;
  icon: string;
  frontContent?: React.ReactNode;
  backItems: string[];
  backTitle?: string;
  badges?: Array<{
    label: string;
    style?: React.CSSProperties;
    className?: string;
  }>;
  actions?: Array<{
    label: string;
    href: string;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
  }>;
  disabled?: boolean;
  disabledMessage?: string;
}

export interface FlipCardsProps {
  items: FlipCardItem[];
  columns?: 2 | 3 | 4;
  cardHeight?: string;
  hoverHint?: string;
  title?: string;
  subtitle?: string;
}

interface FlipCardProps extends FlipCardItem {
  cardHeight: string;
}

const FlipCard: React.FC<FlipCardProps> = ({
  title,
  icon,
  frontContent,
  backItems,
  backTitle = "Features",
  badges = [],
  actions = [],
  disabled = false,
  disabledMessage,
  cardHeight
}) => {
  const flipCardStyles = {
    container: {
      perspective: '1000px',
      height: cardHeight,
      marginBottom: '1.5rem',
      width: '100%',
      minHeight: '200px' // Ensure minimum height on mobile
    } as React.CSSProperties,
    
    inner: {
      position: 'relative',
      width: '100%',
      height: '100%',
      textAlign: 'center',
      transition: 'transform 0.6s',
      transformStyle: 'preserve-3d',
      cursor: disabled ? 'default' : 'pointer'
    } as React.CSSProperties,
    
    innerFlipped: {
      transform: 'rotateY(180deg)'
    } as React.CSSProperties,
    
    face: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backfaceVisibility: 'hidden',
      borderRadius: '8px',
      border: '1px solid #dee2e6',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden' // Prevent content overflow
    } as React.CSSProperties,
    
    back: {
      transform: 'rotateY(180deg)',
      backgroundColor: 'var(--ifm-card-background-color, white)'
    } as React.CSSProperties
  };

  const [isFlipped, setIsFlipped] = React.useState(false);

  const getButtonClasses = (variant: string = 'primary', size: string = 'sm') => {
    const baseClass = 'button';
    const variantClass = variant === 'outline' ? 'button--outline button--primary' : `button--${variant}`;
    const sizeClass = `button--${size}`;
    return `${baseClass} ${variantClass} ${sizeClass}`;
  };

  // Mobile-responsive styles
  const mobileStyles = `
    @media (max-width: 768px) {
      .flip-card-container {
        margin-bottom: 1rem;
      }
      
      .flip-card-icon {
        font-size: 2rem !important;
        margin-bottom: 0.75rem !important;
      }
      
      .flip-card-title {
        font-size: 1.125rem !important;
        margin-bottom: 0.75rem !important;
        line-height: 1.3 !important;
      }
      
      .flip-card-front {
        padding: 1rem 0.75rem !important;
      }
      
      .flip-card-back {
        padding: 1rem !important;
      }
      
      .flip-card-back-title {
        font-size: 0.875rem !important;
        margin-bottom: 0.75rem !important;
      }
      
      .flip-card-back-item {
        font-size: 0.8rem !important;
        margin-bottom: 0.5rem !important;
        line-height: 1.3 !important;
      }
      
      .flip-card-badge {
        font-size: 0.75rem !important;
        padding: 0.375rem 0.75rem !important;
      }
      
      .flip-card-disabled-message {
        font-size: 0.75rem !important;
        padding: 0.5rem !important;
      }
      
      .flip-card-actions {
        flex-direction: column !important;
        gap: 0.375rem !important;
      }
      
      .flip-card-actions .button {
        width: 100% !important;
        min-width: auto !important;
        font-size: 0.8rem !important;
      }
    }
    
    @media (max-width: 480px) {
      .flip-card-icon {
        font-size: 1.75rem !important;
      }
      
      .flip-card-title {
        font-size: 1rem !important;
      }
      
      .flip-card-back-title {
        font-size: 0.8rem !important;
      }
      
      .flip-card-back-item {
        font-size: 0.75rem !important;
      }
    }
  `;

  return (
    <>
      <style>{mobileStyles}</style>
      <div 
        className="flip-card-container"
        style={flipCardStyles.container}
        onMouseEnter={() => !disabled && setIsFlipped(true)}
        onMouseLeave={() => !disabled && setIsFlipped(false)}
        onClick={() => {
          // Add touch support for mobile
          if (window.innerWidth <= 768) {
            setIsFlipped(!isFlipped);
          }
        }}
      >
        <div 
          style={{
            ...flipCardStyles.inner,
            ...(isFlipped ? flipCardStyles.innerFlipped : {})
          }}
        >
          {/* Front Face */}
          <div 
            className="flip-card-front"
            style={{
              ...flipCardStyles.face,
              backgroundColor: 'var(--ifm-card-background-color, white)',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '2rem 1rem',
              opacity: disabled ? 0.7 : 1,
              borderStyle: disabled ? 'dashed' : 'solid',
              borderWidth: disabled ? '2px' : '1px'
            }}
          >
            <div style={{ 
              textAlign: 'center',
              width: '100%',
              maxWidth: '100%'
            }}>
              <div 
                className="flip-card-icon"
                style={{ 
                  fontSize: '3rem', 
                  marginBottom: '1rem'
                }}
              >
                {icon}
              </div>
              <h3 
                className="flip-card-title"
                style={{ 
                  margin: '0 0 1rem 0',
                  fontSize: '1.5rem',
                  color: 'var(--ifm-heading-color)',
                  wordWrap: 'break-word',
                  hyphens: 'auto'
                }}
              >
                {title}
              </h3>
              
              {frontContent && (
                <div style={{ 
                  marginBottom: '1rem',
                  fontSize: '0.875rem',
                  lineHeight: 1.4
                }}>
                  {frontContent}
                </div>
              )}
              
              {badges.length > 0 && (
                <div style={{ 
                  display: 'flex', 
                  gap: '0.5rem', 
                  justifyContent: 'center', 
                  flexWrap: 'wrap',
                  maxWidth: '100%'
                }}>
                  {badges.map((badge, index) => (
                    <span 
                      key={index}
                      className={`flip-card-badge ${badge.className || 'badge'}`}
                      style={{
                        fontSize: '0.875rem',
                        padding: '0.5rem 1rem',
                        wordBreak: 'break-word',
                        ...badge.style
                      }}
                    >
                      {badge.label}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Back Face */}
          <div 
            className="flip-card-back"
            style={{
              ...flipCardStyles.face,
              ...flipCardStyles.back,
              padding: '1.5rem',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <h4 
                className="flip-card-back-title"
                style={{ 
                  fontSize: '1.125rem', 
                  fontWeight: 600, 
                  textTransform: 'uppercase',
                  color: 'var(--ifm-color-primary)',
                  marginBottom: '1rem',
                  textAlign: 'center',
                  wordWrap: 'break-word'
                }}
              >
                {backTitle}
              </h4>
              <ul style={{ 
                margin: 0, 
                paddingLeft: '1.2rem',
                listStyle: 'none',
                textAlign: 'left',
                maxHeight: 'calc(100% - 3rem)',
                overflowY: 'auto'
              }}>
                {backItems.map((item, index) => (
                  <li 
                    key={index} 
                    className="flip-card-back-item"
                    style={{ 
                      marginBottom: '0.75rem', 
                      fontSize: '0.9rem',
                      lineHeight: 1.4,
                      position: 'relative',
                      paddingLeft: '1.2rem',
                      wordWrap: 'break-word',
                      hyphens: 'auto'
                    }}
                  >
                    <span style={{
                      position: 'absolute',
                      left: '0',
                      top: '0.4rem',
                      width: '6px',
                      height: '6px',
                      backgroundColor: 'var(--ifm-color-primary)',
                      borderRadius: '50%',
                      flexShrink: 0
                    }}></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions or Disabled Message */}
            {!disabled && actions.length > 0 && (
              <div style={{ marginTop: '1rem', flexShrink: 0 }}>
                <div 
                  className="flip-card-actions"
                  style={{ 
                    display: 'flex', 
                    gap: '0.5rem', 
                    flexWrap: 'wrap' 
                  }}
                >
                  {actions.map((action, index) => (
                    <a 
                      key={index}
                      href={action.href}
                      className={getButtonClasses(action.variant, action.size)}
                      style={{ 
                        flex: actions.length <= 2 ? 1 : 'none',
                        textAlign: 'center',
                        minWidth: actions.length > 2 ? '100px' : 'auto',
                        fontSize: '0.875rem',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {action.label}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {disabled && disabledMessage && (
              <div 
                className="flip-card-disabled-message"
                style={{ 
                  textAlign: 'center',
                  marginTop: '1rem',
                  padding: '0.75rem',
                  backgroundColor: '#f8f9fa',
                  color: '#6c757d',
                  fontSize: '0.875rem',
                  fontStyle: 'italic',
                  borderRadius: '6px',
                  wordWrap: 'break-word',
                  flexShrink: 0
                }}
              >
                {disabledMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const FlipCards: React.FC<FlipCardsProps> = ({
  items,
  columns = 2,
  cardHeight = '250px',
  hoverHint,
  title,
  subtitle
}) => {
  const getColumnClass = () => {
    switch (columns) {
      case 3: return 'col--4';
      case 4: return 'col--3';
      default: return 'col--6'; // 2 columns
    }
  };

  const responsiveStyles = `
    @media (max-width: 768px) {
      .flip-cards-title {
        font-size: 1.875rem !important;
        margin-bottom: 0.75rem !important;
      }
      
      .flip-cards-subtitle {
        font-size: 1rem !important;
        margin-bottom: 0.75rem !important;
        padding: 0 1rem !important;
      }
      
      .flip-cards-hint {
        font-size: 0.8rem !important;
      }
      
      .flip-cards-header {
        margin-bottom: 2rem !important;
      }
      
      .flip-cards-row .col {
        margin-bottom: 1rem;
      }
    }
    
    @media (max-width: 576px) {
      .flip-cards-row .col {
        flex: 0 0 100% !important;
        max-width: 100% !important;
      }
      
      .flip-cards-title {
        font-size: 1.5rem !important;
      }
      
      .flip-cards-subtitle {
        font-size: 0.9rem !important;
      }
    }
  `;

  return (
    <div>
      <style>{responsiveStyles}</style>
      
      {/* Header Section */}
      {(title || subtitle || hoverHint) && (
        <div 
          className="text--center flip-cards-header" 
          style={{ marginBottom: '3rem' }}
        >
          {title && (
            <h2 
              className="flip-cards-title"
              style={{ 
                fontSize: '2.5rem', 
                marginBottom: '1rem',
                wordWrap: 'break-word'
              }}
            >
              {title}
            </h2>
          )}
          {subtitle && (
            <p 
              className="flip-cards-subtitle"
              style={{ 
                fontSize: '1.125rem', 
                color: 'var(--ifm-color-emphasis-700)',
                maxWidth: '800px',
                margin: '0 auto 1rem auto',
                lineHeight: 1.6,
                wordWrap: 'break-word'
              }}
            >
              {subtitle}
            </p>
          )}
          {hoverHint && (
            <p 
              className="flip-cards-hint"
              style={{
                fontSize: '0.9rem',
                color: 'var(--ifm-color-emphasis-600)',
                fontStyle: 'italic'
              }}
            >
              {hoverHint}
            </p>
          )}
        </div>
      )}

      {/* Cards Grid */}
      <div className="row flip-cards-row">
        {items.map((item) => (
          <div key={item.id} className={`col ${getColumnClass()}`}>
            <FlipCard {...item} cardHeight={cardHeight} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlipCards;