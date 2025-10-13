import React, { useState, useMemo } from 'react';
import {
  telemetrySignals,
  TelemetrySignal,
  getAggregationOptions,
  getDefaultAggregation,
  intervalOptions,
} from './signals';
import TwoColumnLayout from '../TwoColumnLayout';
import styles from './styles.module.css';

interface SelectedSignals {
  [signalName: string]: boolean;
}

interface SignalAggregations {
  [signalName: string]: string;
}

type QueryType = 'signals' | 'signalsLatest';

const TelemetryQueryBuilder: React.FC = () => {
  // Query configuration state
  const [vehicleTokenId, setVehicleTokenId] = useState('');
  const [queryType, setQueryType] = useState<QueryType>('signalsLatest');
  const [selectedSignals, setSelectedSignals] = useState<SelectedSignals>({});
  const [signalAggregations, setSignalAggregations] =
    useState<SignalAggregations>({});
  const [dateRange, setDateRange] = useState({
    from: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
    to: new Date().toISOString().slice(0, 16),
    interval: '1h',
  });

  // Copy to clipboard state
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);

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
  signalsLatest(tokenId: ${vehicleTokenId || '<vehicle_token_id>'}) {
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
    tokenId: ${vehicleTokenId || '<vehicle_token_id>'},
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
    vehicleTokenId,
  ]);

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

  // Left Column: Query Configuration
  const leftColumn = (
    <div>
      {/* Section 1: Vehicle Token ID */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>1. Vehicle Token ID</h3>
        <p className={styles.sectionDescription}>
          Enter the Vehicle Token ID to use in your query. This will be included
          in the generated GraphQL query.
        </p>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Vehicle Token ID</label>
          <input
            type="text"
            className={styles.input}
            placeholder="12345"
            value={vehicleTokenId}
            onChange={e => setVehicleTokenId(e.target.value)}
          />
        </div>
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
    </div>
  );

  // Right Column: Generated Query & Results (Sticky)
  const rightColumn = (
    <div>
      {Object.values(selectedSignals).some(v => v) ? (
        <>
          {/* Generated Query */}
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
              </div>
            </div>
            <pre className={styles.queryCode}>
              <code>{generatedQuery}</code>
            </pre>
            <p className={styles.copyHint}>
              Copy this query and paste it into the GraphQL Playground below to
              execute it.
            </p>
          </div>
        </>
      ) : (
        <div className={styles.section}>
          <div className={styles.placeholderMessage}>
            <p>
              👈 Select signals from the left to see your generated GraphQL
              query here
            </p>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className={styles.telemetryBuilder}>
      <TwoColumnLayout
        leftColumn={leftColumn}
        rightColumn={rightColumn}
        ratio="1:1"
        stickyRight={true}
        gap={3}
      />
    </div>
  );
};

export default TelemetryQueryBuilder;
