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
      marginBottom: '1.5rem'
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
      flexDirection: 'column'
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

  return (
    <div 
      style={flipCardStyles.container}
      onMouseEnter={() => !disabled && setIsFlipped(true)}
      onMouseLeave={() => !disabled && setIsFlipped(false)}
    >
      <div 
        style={{
          ...flipCardStyles.inner,
          ...(isFlipped ? flipCardStyles.innerFlipped : {})
        }}
      >
        {/* Front Face */}
        <div 
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
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
              {icon}
            </div>
            <h3 style={{ 
              margin: '0 0 1rem 0',
              fontSize: '1.5rem',
              color: 'var(--ifm-heading-color)'
            }}>
              {title}
            </h3>
            
            {frontContent && (
              <div style={{ marginBottom: '1rem' }}>
                {frontContent}
              </div>
            )}
            
            {badges.length > 0 && (
              <div style={{ 
                display: 'flex', 
                gap: '0.75rem', 
                justifyContent: 'center', 
                flexWrap: 'wrap' 
              }}>
                {badges.map((badge, index) => (
                  <span 
                    key={index}
                    className={badge.className || 'badge'}
                    style={{
                      fontSize: '0.875rem',
                      padding: '0.5rem 1rem',
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
          style={{
            ...flipCardStyles.face,
            ...flipCardStyles.back,
            padding: '1.5rem',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <h4 style={{ 
              fontSize: '1.125rem', 
              fontWeight: 600, 
              textTransform: 'uppercase',
              color: 'var(--ifm-color-primary)',
              marginBottom: '1rem',
              textAlign: 'center'
            }}>
              {backTitle}
            </h4>
            <ul style={{ 
              margin: 0, 
              paddingLeft: '1.2rem',
              listStyle: 'none',
              textAlign: 'left'
            }}>
              {backItems.map((item, index) => (
                <li key={index} style={{ 
                  marginBottom: '0.75rem', 
                  fontSize: '0.9rem',
                  lineHeight: 1.4,
                  position: 'relative',
                  paddingLeft: '1.2rem'
                }}>
                  <span style={{
                    position: 'absolute',
                    left: '0',
                    top: '0.4rem',
                    width: '6px',
                    height: '6px',
                    backgroundColor: 'var(--ifm-color-primary)',
                    borderRadius: '50%'
                  }}></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Actions or Disabled Message */}
          {!disabled && actions.length > 0 && (
            <div style={{ marginTop: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {actions.map((action, index) => (
                  <a 
                    key={index}
                    href={action.href}
                    className={getButtonClasses(action.variant, action.size)}
                    style={{ 
                      flex: actions.length <= 2 ? 1 : 'none',
                      textAlign: 'center',
                      minWidth: actions.length > 2 ? '100px' : 'auto'
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
              style={{ 
                textAlign: 'center',
                marginTop: '1rem',
                padding: '0.75rem',
                backgroundColor: '#f8f9fa',
                color: '#6c757d',
                fontSize: '0.875rem',
                fontStyle: 'italic',
                borderRadius: '6px'
              }}
            >
              {disabledMessage}
            </div>
          )}
        </div>
      </div>
    </div>
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

  return (
    <div>
      {/* Header Section */}
      {(title || subtitle || hoverHint) && (
        <div className="text--center" style={{ marginBottom: '3rem' }}>
          {title && (
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
              {title}
            </h2>
          )}
          {subtitle && (
            <p style={{ 
              fontSize: '1.125rem', 
              color: 'var(--ifm-color-emphasis-700)',
              maxWidth: '800px',
              margin: '0 auto 1rem auto',
              lineHeight: 1.6
            }}>
              {subtitle}
            </p>
          )}
          {hoverHint && (
            <p style={{
              fontSize: '0.9rem',
              color: 'var(--ifm-color-emphasis-600)',
              fontStyle: 'italic'
            }}>
              {hoverHint}
            </p>
          )}
        </div>
      )}

      {/* Cards Grid */}
      <div className="row">
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