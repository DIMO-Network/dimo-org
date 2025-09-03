import clsx from 'clsx';
import { useEffect, useState } from 'react';
import styles from './styles.module.css';

interface PrivilegeDefinition {
  id: number;
  name: string;
  description: string;
}

const PRIVILEGES: PrivilegeDefinition[] = [
  {
    id: 1,
    name: 'All-time, non-location data',
    description: 'Historical vehicle data excluding location information',
  },
  {
    id: 2,
    name: 'Commands',
    description: 'Send commands to the vehicle (lock, unlock, start, etc.)',
  },
  { id: 3, name: 'Current location', description: 'Real-time location data' },
  { id: 4, name: 'All-time location', description: 'Historical location data' },
  {
    id: 5,
    name: 'View VIN credentials',
    description: 'Access to vehicle identification number',
  },
  {
    id: 6,
    name: 'Live data streams',
    description: 'Real-time telemetry data streaming',
  },
  { id: 7, name: 'Raw data', description: 'Unprocessed vehicle data' },
  {
    id: 8,
    name: 'Approximate location',
    description: 'General location area (not precise coordinates)',
  },
];

interface DimoUrlBuilderProps {
  className?: string;
}

function DimoUrlBuilder({ className }: DimoUrlBuilderProps) {
  const [clientId, setClientId] = useState('');
  const [redirectUri, setRedirectUri] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [selectedPrivileges, setSelectedPrivileges] = useState<number[]>([]);
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [copied, setCopied] = useState(false);

  // Generate URL whenever inputs change
  useEffect(() => {
    if (clientId && redirectUri) {
      let url = `https://login.dimo.org/?clientId=${encodeURIComponent(clientId)}&redirectUri=${encodeURIComponent(redirectUri)}&entryState=VEHICLE_MANAGER`;

      if (selectedPrivileges.length > 0) {
        // Create permissions bit string (8 digits, 1 for granted, 0 for not granted)
        const permissionsBitString = Array.from({ length: 8 }, (_, index) =>
          selectedPrivileges.includes(index + 1) ? '1' : '0'
        ).join('');
        url += `&permissions=${permissionsBitString}`;
      }

      if (expirationDate) {
        url += `&expirationDate=${expirationDate}`;
      }

      setGeneratedUrl(url);
    } else {
      setGeneratedUrl('');
    }
  }, [clientId, redirectUri, expirationDate, selectedPrivileges]);

  const togglePrivilege = (privilegeId: number) => {
    setSelectedPrivileges(prev =>
      prev.includes(privilegeId)
        ? prev.filter(id => id !== privilegeId)
        : [...prev, privilegeId]
    );
  };

  const copyToClipboard = async () => {
    if (generatedUrl) {
      try {
        await navigator.clipboard.writeText(generatedUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy URL:', err);
      }
    }
  };

  const clearAll = () => {
    setClientId('');
    setRedirectUri('');
    setExpirationDate('');
    setSelectedPrivileges([]);
  };

  const selectAllPrivileges = () => {
    setSelectedPrivileges(PRIVILEGES.map(p => p.id));
  };

  const clearPrivileges = () => {
    setSelectedPrivileges([]);
  };

  return (
    <div className={clsx(styles.urlBuilder, className)}>
      <div className={styles.header}>
        <h3>DIMO Connect URL Builder</h3>
        <p>
          Configure your DIMO Connect URL by filling out the fields below. The
          URL will be generated in real-time below.
        </p>
      </div>

      <div className={styles.form}>
        {/* Client ID Input */}
        <div className={styles.inputGroup}>
          <label htmlFor="clientId" className={styles.label}>
            Client ID <span className={styles.required}>*</span>
          </label>
          <input
            id="clientId"
            type="text"
            value={clientId}
            onChange={e => setClientId(e.target.value)}
            placeholder="Enter your Client ID from the Developer Console"
            className={styles.input}
          />
        </div>

        {/* Redirect URI Input */}
        <div className={styles.inputGroup}>
          <label htmlFor="redirectUri" className={styles.label}>
            Redirect URI <span className={styles.required}>*</span>
          </label>
          <input
            id="redirectUri"
            type="url"
            value={redirectUri}
            onChange={e => setRedirectUri(e.target.value)}
            placeholder="https://yourapp.com/callback"
            className={styles.input}
          />
        </div>

        {/* Expiration Date Picker */}
        <div className={styles.inputGroup}>
          <label htmlFor="expirationDate" className={styles.label}>
            Expiration Date <span className={styles.optional}>(optional)</span>
          </label>
          <input
            id="expirationDate"
            type="date"
            value={expirationDate}
            onChange={e => setExpirationDate(e.target.value)}
            className={styles.input}
            min={new Date().toISOString().split('T')[0]}
          />
          <div className={styles.inputHint}>
            If not set, permissions will expire in 100 years (default)
          </div>
        </div>

        {/* Permissions Section */}
        <div className={styles.permissionsSection}>
          <div className={styles.permissionsHeader}>
            <label className={styles.label}>
              Vehicle Data Permissions{' '}
              <span className={styles.optional}>(optional)</span>
            </label>
            <div className={styles.permissionActions}>
              <button
                type="button"
                onClick={selectAllPrivileges}
                className={styles.actionButton}
              >
                Select All
              </button>
              <button
                type="button"
                onClick={clearPrivileges}
                className={styles.actionButton}
              >
                Clear All
              </button>
            </div>
          </div>

          <div className={styles.privilegeGrid}>
            {PRIVILEGES.map(privilege => (
              <div
                key={privilege.id}
                className={clsx(
                  styles.privilegeCard,
                  selectedPrivileges.includes(privilege.id) &&
                    styles.privilegeCardSelected
                )}
                onClick={() => togglePrivilege(privilege.id)}
              >
                <div className={styles.privilegeNumber}>{privilege.id}</div>
                <div className={styles.privilegeContent}>
                  <div className={styles.privilegeName}>{privilege.name}</div>
                  <div className={styles.privilegeDescription}>
                    {privilege.description}
                  </div>
                </div>
                <div className={styles.privilegeCheckbox}>
                  {selectedPrivileges.includes(privilege.id) && (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M13.5 4.5L6 12L2.5 8.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Clear All Button */}
        <div className={styles.formActions}>
          <button
            type="button"
            onClick={clearAll}
            className={styles.clearButton}
          >
            Clear All Fields
          </button>
        </div>
      </div>

      {/* Generated URL Display */}
      {generatedUrl && (
        <div className={styles.urlOutput}>
          <div className={styles.urlHeader}>
            <label className={styles.label}>Generated DIMO URL</label>
            <button onClick={copyToClipboard} className={styles.copyButton}>
              {copied ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M13.5 4.5L6 12L2.5 8.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect
                      x="2"
                      y="2"
                      width="8"
                      height="8"
                      rx="1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      fill="none"
                    />
                    <path
                      d="M6 2V1a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      fill="none"
                    />
                  </svg>
                  Copy URL
                </>
              )}
            </button>
          </div>
          <div className={styles.urlDisplay}>
            <code>{generatedUrl}</code>
          </div>
          <p>
            {' '}
            Share this DIMO Connect URL with a DIMO user to have them share
            vehicle data with you.
          </p>
        </div>
      )}
    </div>
  );
}

export default DimoUrlBuilder;
