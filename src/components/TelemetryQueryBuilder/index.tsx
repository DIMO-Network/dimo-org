import React, { useState, useMemo, useEffect } from 'react';
import {
  telemetrySignals,
  TelemetrySignal,
  getAggregationOptions,
  getDefaultAggregation,
  intervalOptions,
} from './signals';
import styles from './styles.module.css';

interface AuthData {
  clientId: string;
  redirectUri: string;
  apiKey: string;
  vehicleTokenId: string;
}

interface SelectedSignals {
  [signalName: string]: boolean;
}

interface SignalAggregations {
  [signalName: string]: string;
}

type QueryType = 'signals' | 'signalsLatest';

const TelemetryQueryBuilder: React.FC = () => {
  // Authentication state
  const [authData, setAuthData] = useState<AuthData>({
    clientId: '',
    redirectUri: '',
    apiKey: '',
    vehicleTokenId: '',
  });
  const [vehicleJWT, setVehicleJWT] = useState('');
  const [jwtTimer, setJwtTimer] = useState<number | null>(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  // Query configuration state
  const [queryType, setQueryType] = useState<QueryType>('signalsLatest');
  const [selectedSignals, setSelectedSignals] = useState<SelectedSignals>({});
  const [signalAggregations, setSignalAggregations] =
    useState<SignalAggregations>({});
  const [dateRange, setDateRange] = useState({
    from: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
    to: new Date().toISOString().slice(0, 16),
    interval: '1h',
  });

  // Query execution state
  const [queryResult, setQueryResult] = useState<any>(null);
  const [queryLoading, setQueryLoading] = useState(false);
  const [queryError, setQueryError] = useState('');
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);

  // JWT Timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (jwtTimer !== null && jwtTimer > 0) {
      interval = setInterval(() => {
        setJwtTimer(prevTimer => {
          if (prevTimer === null || prevTimer <= 1) {
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    } else if (jwtTimer === 0) {
      if (interval) clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [jwtTimer]);

  // Format timer display (mm:ss)
  const formatTimer = (seconds: number | null): string | null => {
    if (seconds === null || seconds < 0) return null;
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  // Generate GraphQL query
  const generatedQuery = useMemo(() => {
    const selectedSignalNames = Object.keys(selectedSignals).filter(
      name => selectedSignals[name]
    );

    if (selectedSignalNames.length === 0) return '';

    if (queryType === 'signalsLatest') {
      const signalQueries = selectedSignalNames
        .map(
          signal => `    ${signal} {
      timestamp
      value
    }`
        )
        .join('\n');

      return `query {
  signalsLatest(tokenId: ${authData.vehicleTokenId || '<vehicle_token_id>'}) {
    lastSeen
${signalQueries}
  }
}`;
    } else {
      // signals query with aggregations
      const signalQueries = selectedSignalNames
        .map(signal => {
          const agg = signalAggregations[signal] || 'AVG';
          return `    ${signal}(agg: ${agg})`;
        })
        .join('\n');

      return `query {
  signals(
    tokenId: ${authData.vehicleTokenId || '<vehicle_token_id>'},
    interval: "${dateRange.interval}",
    from: "${dateRange.from}:00Z",
    to: "${dateRange.to}:00Z"
  ) {
${signalQueries}
    timestamp
  }
}`;
    }
  }, [
    queryType,
    selectedSignals,
    signalAggregations,
    dateRange,
    authData.vehicleTokenId,
  ]);

  const handleAuthInputChange = (field: keyof AuthData, value: string) => {
    setAuthData(prev => ({ ...prev, [field]: value }));
  };

  const getVehicleJWT = async () => {
    if (
      !authData.clientId ||
      !authData.redirectUri ||
      !authData.apiKey ||
      !authData.vehicleTokenId
    ) {
      setAuthError('Please fill in all authentication fields');
      return;
    }

    setAuthLoading(true);
    setAuthError('');

    // Note: This is a placeholder. In production, you would need a backend
    // service to generate the JWT due to CORS and security concerns.
    setAuthError(
      '⚠️ JWT generation requires a backend service. For now, please manually paste a valid Vehicle JWT below. See the Authentication docs for details on generating JWTs.'
    );
    setAuthLoading(false);
  };

  const toggleSignal = (signalName: string, signal: TelemetrySignal) => {
    setSelectedSignals(prev => {
      const newSignals = { ...prev, [signalName]: !prev[signalName] };

      // Set default aggregation for new selections in signals mode
      if (!prev[signalName] && queryType === 'signals') {
        setSignalAggregations(prevAgg => ({
          ...prevAgg,
          [signalName]: getDefaultAggregation(signal),
        }));
      }

      return newSignals;
    });
  };

  const updateSignalAggregation = (signalName: string, aggregation: string) => {
    setSignalAggregations(prev => ({
      ...prev,
      [signalName]: aggregation,
    }));
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedQuery);
      setCopiedToClipboard(true);
      setTimeout(() => setCopiedToClipboard(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const executeQuery = async () => {
    if (!vehicleJWT) {
      setQueryError('Please provide a valid Vehicle JWT');
      return;
    }

    if (Object.values(selectedSignals).every(v => !v)) {
      setQueryError('Please select at least one signal');
      return;
    }

    setQueryLoading(true);
    setQueryError('');
    setQueryResult(null);

    try {
      const response = await fetch('https://telemetry-api.dimo.zone/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${vehicleJWT.trim()}`,
        },
        body: JSON.stringify({
          query: generatedQuery,
        }),
      });

      const data = await response.json();

      if (!response.ok || data.errors) {
        throw new Error(
          data.errors?.[0]?.message ||
            data.message ||
            `Query failed with status ${response.status}`
        );
      }

      setQueryResult(data);
    } catch (err: any) {
      setQueryError(err.message || 'Failed to execute query');
    } finally {
      setQueryLoading(false);
    }
  };

  return (
    <div className={styles.telemetryBuilder}>
      {/* Section 1: Authentication */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>1. Authentication</h3>
        <p className={styles.sectionDescription}>
          Enter your developer credentials to generate a Vehicle JWT. The JWT is
          required to query telemetry data and expires after 10 minutes.
        </p>

        <div className={styles.authGrid}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>
              Client ID<span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              className={styles.input}
              placeholder="0x..."
              value={authData.clientId}
              onChange={e => handleAuthInputChange('clientId', e.target.value)}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>
              Redirect URI<span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              className={styles.input}
              placeholder="https://your-app.com/callback"
              value={authData.redirectUri}
              onChange={e =>
                handleAuthInputChange('redirectUri', e.target.value)
              }
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>
              API Key<span className={styles.required}>*</span>
            </label>
            <input
              type="password"
              className={styles.input}
              placeholder="Your API key"
              value={authData.apiKey}
              onChange={e => handleAuthInputChange('apiKey', e.target.value)}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>
              Vehicle Token ID<span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              className={styles.input}
              placeholder="12345"
              value={authData.vehicleTokenId}
              onChange={e =>
                handleAuthInputChange('vehicleTokenId', e.target.value)
              }
            />
          </div>
        </div>

        <button
          className={styles.authButton}
          onClick={getVehicleJWT}
          disabled={authLoading}
        >
          {authLoading ? '⏳ Generating...' : '🔑 Get Vehicle JWT'}
        </button>

        <div className={styles.jwtSection}>
          <label className={styles.label}>
            Vehicle JWT
            {jwtTimer !== null && jwtTimer > 0 && (
              <span className={styles.jwtTimer}>
                Expires in: {formatTimer(jwtTimer)}
              </span>
            )}
          </label>
          <textarea
            className={styles.textarea}
            placeholder="Paste your Vehicle JWT here or generate one above"
            rows={4}
            value={vehicleJWT}
            onChange={e => {
              setVehicleJWT(e.target.value);
              if (e.target.value && jwtTimer === null) {
                setJwtTimer(599); // Start 10-minute timer
              }
            }}
          />
        </div>

        {authError && <div className={styles.warning}>{authError}</div>}
      </div>

      {/* Section 2: Query Type Selection */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>2. Select Query Type</h3>
        <p className={styles.sectionDescription}>
          Choose between current values (signalsLatest) or historical time
          series data (signals)
        </p>

        <div className={styles.queryTypeSelector}>
          <button
            className={`${styles.queryTypeButton} ${queryType === 'signalsLatest' ? styles.queryTypeButtonActive : ''}`}
            onClick={() => setQueryType('signalsLatest')}
          >
            <div className={styles.queryTypeName}>signalsLatest</div>
            <div className={styles.queryTypeDescription}>
              Current vehicle signals
            </div>
          </button>
          <button
            className={`${styles.queryTypeButton} ${queryType === 'signals' ? styles.queryTypeButtonActive : ''}`}
            onClick={() => setQueryType('signals')}
          >
            <div className={styles.queryTypeName}>signals</div>
            <div className={styles.queryTypeDescription}>
              Historical time series data
            </div>
          </button>
        </div>

        {/* Date Range for signals mode */}
        {queryType === 'signals' && (
          <div className={styles.dateRangeSection}>
            <h4 className={styles.subsectionTitle}>Date Range & Interval</h4>
            <div className={styles.dateRangeGrid}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>From</label>
                <input
                  type="datetime-local"
                  className={styles.input}
                  value={dateRange.from}
                  onChange={e =>
                    setDateRange(prev => ({ ...prev, from: e.target.value }))
                  }
                />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>To</label>
                <input
                  type="datetime-local"
                  className={styles.input}
                  value={dateRange.to}
                  onChange={e =>
                    setDateRange(prev => ({ ...prev, to: e.target.value }))
                  }
                />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Interval</label>
                <select
                  className={styles.input}
                  value={dateRange.interval}
                  onChange={e =>
                    setDateRange(prev => ({
                      ...prev,
                      interval: e.target.value,
                    }))
                  }
                >
                  {intervalOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Section 3: Signal Selection */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>3. Select Signals</h3>
        <p className={styles.sectionDescription}>
          Choose which telemetry signals to include in your query
          {queryType === 'signals' &&
            ' and select aggregation methods for each signal'}
        </p>

        <div className={styles.signalCategories}>
          {telemetrySignals.map(category => (
            <div key={category.category} className={styles.category}>
              <h4 className={styles.categoryTitle}>{category.category}</h4>
              <div className={styles.signalList}>
                {category.signals.map(signal => {
                  const isSelected = selectedSignals[signal.name];
                  return (
                    <div key={signal.name} className={styles.signalItem}>
                      <button
                        className={`${styles.signalButton} ${isSelected ? styles.signalButtonSelected : ''}`}
                        onClick={() => toggleSignal(signal.name, signal)}
                      >
                        <div className={styles.signalButtonContent}>
                          <div className={styles.signalButtonName}>
                            {signal.name}
                          </div>
                          <div className={styles.signalButtonDescription}>
                            {signal.description}
                          </div>
                        </div>
                        {isSelected && (
                          <span className={styles.signalCheckmark}>✓</span>
                        )}
                      </button>

                      {/* Aggregation selector for signals mode */}
                      {isSelected && queryType === 'signals' && (
                        <div className={styles.aggregationSelector}>
                          <label className={styles.aggregationLabel}>
                            Aggregation:
                          </label>
                          <select
                            className={styles.aggregationSelect}
                            value={
                              signalAggregations[signal.name] ||
                              getDefaultAggregation(signal)
                            }
                            onChange={e =>
                              updateSignalAggregation(
                                signal.name,
                                e.target.value
                              )
                            }
                          >
                            {getAggregationOptions(signal).map(option => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 4: Generated Query & Results */}
      {Object.values(selectedSignals).some(v => v) && (
        <>
          <div className={styles.section}>
            <div className={styles.queryOutputHeader}>
              <h3 className={styles.sectionTitle}>Generated Query</h3>
              <div className={styles.queryActions}>
                <button
                  className={styles.copyButton}
                  onClick={handleCopyToClipboard}
                  disabled={copiedToClipboard}
                >
                  {copiedToClipboard ? '✓ Copied!' : '📋 Copy'}
                </button>
                <button
                  className={styles.executeButton}
                  onClick={executeQuery}
                  disabled={queryLoading || !vehicleJWT}
                >
                  {queryLoading ? '⏳ Running...' : '▶ Execute Query'}
                </button>
              </div>
            </div>
            <pre className={styles.queryCode}>
              <code>{generatedQuery}</code>
            </pre>
          </div>

          {/* Results */}
          {(queryResult || queryError) && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Query Results</h3>
              {queryError && (
                <div className={styles.error}>
                  <strong>Error:</strong> {queryError}
                </div>
              )}
              {queryResult && (
                <pre className={styles.resultsCode}>
                  <code>{JSON.stringify(queryResult, null, 2)}</code>
                </pre>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TelemetryQueryBuilder;

