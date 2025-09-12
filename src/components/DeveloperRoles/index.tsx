import React from 'react';
import FlipCards, { type FlipCardItem } from '../FlipCards';

interface DeveloperRolesProps {}

const DeveloperRoles: React.FC<DeveloperRolesProps> = () => {
  const getBadgeStyle = (type: 'difficulty' | 'status', value: string) => {
    if (type === 'difficulty') {
      switch (value) {
        case 'Beginner': return { backgroundColor: '#d4edda', color: '#155724' };
        case 'Intermediate': return { backgroundColor: '#fff3cd', color: '#856404' };
        case 'Advanced': return { backgroundColor: '#f8d7da', color: '#721c24' };
        default: return { backgroundColor: '#e2e3e5', color: '#383d41' };
      }
    } else {
      return value === 'Coming Soon' 
        ? { backgroundColor: '#e2e3e5', color: '#6c757d' }
        : { backgroundColor: '#d1ecf1', color: '#0c5460' };
    }
  };

  const developerRoles: FlipCardItem[] = [
    {
      id: 'data-consumers',
      title: 'App Developers',
      icon: '📱',
      backTitle: 'Consume Data through APIs and Webhooks',
      backItems: [
        'Build apps with the full DIMO login experience and vehicle permission sharing',
        'Get notified through webhooks and access real-time or historical vehicle data via the API',
        'Create one-of-a-kind experiences for vehicle owners'
      ],
      badges: [
        { label: 'Beginner', style: getBadgeStyle('difficulty', 'Beginner') },
        { label: 'Available', style: getBadgeStyle('status', 'Available') }
      ],
      actions: [
        { label: 'Quick Start', href: '/docs/introduction/where-can-you-start#app-developers', variant: 'primary' },
        // { label: 'Docs', href: '/docs/data-consumers', variant: 'outline' }
      ]
    },
    {
      id: 'data-providers',
      title: 'Connection Oracles',
      icon: '📊',
      backTitle: 'Contribute Data through Connections',
      backItems: [
        'Bring your existing device or build DIMO-compatible aftermarket solutions for scale',
        'Integrate your own telematics data feed and make it available to other developers',
        'Contribute to network discoverability and data availability'
      ],
      badges: [
        { label: 'Intermediate', style: getBadgeStyle('difficulty', 'Intermediate') },
        { label: 'Available', style: getBadgeStyle('status', 'Available') }
      ],
      actions: [
        { label: 'Quick Start', href: '/docs/introduction/where-can-you-start#connection-oracles', variant: 'primary' },
        // { label: 'Docs', href: '/docs/data-consumers', variant: 'outline' }
      ]
    },
    
    {
      id: 'storage-providers',
      title: 'Storage Nodes',
      icon: '💾',
      backTitle: 'Store Data with DIMO Storage Nodes',
      backItems: [
        'Deploy DIMO Storage Nodes on-premise with all major cloud providers',
        'Provide decentralized storage solutions for vehicle data',
        'Contribute to network resilience and service availability'
      ],
      badges: [
        { label: 'Advanced', style: getBadgeStyle('difficulty', 'Advanced') },
        { label: 'Available', style: getBadgeStyle('status', 'Available') }
      ],
      actions: [
        { label: 'Quick Start', href: '/docs/introduction/where-can-you-start#storage-nodes', variant: 'primary' },
        // { label: 'Docs', href: '/docs/data-consumers', variant: 'outline' }
      ]
    },
    {
      id: 'data-validators',
      title: 'Data Validators',
      icon: '🔍',
      backTitle: 'Validate data as an attestor',
      backItems: [
        'Operate attestation services for data validation',
        'Implement custom validation logic and algorithms',
        'Earn rewards for providing validation services',
        'Contribute to network trust and data integrity'
      ],
      badges: [
        { label: 'Advanced', style: getBadgeStyle('difficulty', 'Advanced') },
        { label: 'Coming Soon', style: getBadgeStyle('status', 'Coming Soon') }
      ],
      disabled: true,
      disabledMessage: '🚧 Available in future release'
    }
  ];

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <FlipCards
        items={developerRoles}
        columns={2}
        cardHeight="250px"
        // title="Developer Roles in DIMO"
        subtitle="Choose your role in the DIMO ecosystem. Whether you're building hardware, applications, or infrastructure, there's a path for every type of developer."
        hoverHint="💡 Hover over each card to see what you can build"
      />

      {/* Footer CTA */}
      <div 
        className="text--center" 
        style={{ 
          marginTop: '3rem',
          padding: '2rem',
          backgroundColor: 'var(--ifm-color-emphasis-100)',
          borderRadius: '12px'
        }}
      >
        <h3 style={{ marginBottom: '1rem' }}>
          Ready to Start Building?
        </h3>
        <p style={{ 
          marginBottom: '1.5rem',
          color: 'var(--ifm-color-emphasis-700)'
        }}>
          Explore our comprehensive documentation and get started with Building on DIMO today.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a 
            className="button button--primary button--lg"
            href="/docs/category/getting-started"
          >
            Get Started
          </a>
          <a 
            className="button button--outline button--primary button--lg"
            href="/docs/category/api-references"
          >
            API Reference
          </a>
        </div>
      </div>
    </div>
  );
};

export default DeveloperRoles;