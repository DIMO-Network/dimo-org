import React, { useState, useMemo } from 'react';
import {
  identityQueryRoots,
  QueryRoot,
  SelectableField,
  QueryVariable,
} from './queries';
import styles from './styles.module.css';

interface VariableValues {
  [key: string]: string;
}

interface SelectedFields {
  [fieldId: string]: boolean;
}

const IdentityQueryBuilder: React.FC = () => {
  const [selectedRoot, setSelectedRoot] = useState<QueryRoot | null>(null);
  const [variableValues, setVariableValues] = useState<VariableValues>({});
  const [selectedFields, setSelectedFields] = useState<SelectedFields>({});
  const [queryResult, setQueryResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);

  // Build the GraphQL query from selected fields
  const buildQuery = (
    fields: SelectableField[],
    selections: SelectedFields,
    indent: number = 2,
    prefix: string = ''
  ): string => {
    const indentStr = ' '.repeat(indent);
    let result = '';

    fields.forEach(field => {
      const fieldId = prefix ? `${prefix}.${field.id}` : field.id;
      if (selections[fieldId]) {
        if (field.type === 'field') {
          result += `${indentStr}${field.name}\n`;
        } else if (field.type === 'object' && field.fields) {
          let hasSelectedNested = false;

          // Check if any nested fields are selected
          field.fields.forEach(nestedField => {
            const nestedId = `${fieldId}.${nestedField.id}`;
            if (selections[nestedId]) {
              hasSelectedNested = true;
            }
          });

          if (hasSelectedNested) {
            // Handle pagination for certain fields
            const paginationArgs =
              field.name === 'redirectURIs' ||
              field.name === 'history' ||
              field.name === 'sacds'
                ? '(first: 10) '
                : '';

            result += `${indentStr}${field.name}${paginationArgs}{\n`;

            // Handle special field structures
            if (field.name === 'history') {
              // history uses edges { node { } } structure
              result += `${indentStr}  edges {\n`;
              result += `${indentStr}    node {\n`;
              result += buildQuery(
                field.fields,
                selections,
                indent + 6,
                fieldId
              );
              result += `${indentStr}    }\n`;
              result += `${indentStr}  }\n`;
            } else if (field.usesNodesWrapper) {
              // These fields use nodes { } wrapper (sacds, redirectURIs)
              result += `${indentStr}  nodes {\n`;
              result += buildQuery(
                field.fields,
                selections,
                indent + 4,
                fieldId
              );
              result += `${indentStr}  }\n`;
            } else {
              // Most fields (including 'nodes' itself) render children directly
              result += buildQuery(
                field.fields,
                selections,
                indent + 2,
                fieldId
              );
            }
            result += `${indentStr}}\n`;
          }
        }
      }
    });

    return result;
  };

  const generatedQuery = useMemo(() => {
    if (!selectedRoot) return '';

    const hasSelections = Object.values(selectedFields).some(v => v);
    if (!hasSelections) return '';

    let queryArgs = '';
    const filters: string[] = [];

    // Build arguments based on the selected root
    if (selectedRoot.id === 'vehicle') {
      const tokenId = variableValues['tokenId'] || '<tokenId>';
      queryArgs = `(tokenId: ${tokenId})`;
    } else if (selectedRoot.id === 'vehicles') {
      const filterParts: string[] = [];
      if (variableValues['owner']) {
        filterParts.push(`owner: "${variableValues['owner']}"`);
      }
      if (variableValues['privileged']) {
        filterParts.push(`privileged: "${variableValues['privileged']}"`);
      }
      if (filterParts.length > 0) {
        filters.push(`filterBy: {${filterParts.join(', ')}}`);
      }
      if (variableValues['first']) {
        filters.push(`first: ${variableValues['first']}`);
      } else {
        filters.push('first: 10');
      }
      queryArgs = filters.length > 0 ? `(${filters.join(', ')})` : '';
    } else if (selectedRoot.id === 'developerLicense') {
      const tokenId = variableValues['tokenId'] || '<tokenId>';
      queryArgs = `(by: { tokenId: ${tokenId} })`;
    } else if (selectedRoot.id === 'rewards') {
      const user = variableValues['user'] || '<user_address>';
      queryArgs = `(user: "${user}")`;
    } else if (selectedRoot.id === 'deviceDefinition') {
      const id = variableValues['id'] || '<device_definition_id>';
      queryArgs = `(by: { id: "${id}" })`;
    }

    const fieldsQuery = buildQuery(
      selectedRoot.availableFields,
      selectedFields
    );

    return `query {
  ${selectedRoot.queryName}${queryArgs} {
${fieldsQuery}  }
}`;
  }, [selectedRoot, selectedFields, variableValues]);

  const handleRootSelect = (root: QueryRoot) => {
    setSelectedRoot(root);
    setSelectedFields({});
    setQueryResult(null);
    setError('');
    // Initialize variables
    const initialVars: VariableValues = {};
    root.variables.forEach(variable => {
      initialVars[variable.name] = '';
    });
    setVariableValues(initialVars);
  };

  const toggleField = (fieldId: string) => {
    setSelectedFields(prev => ({
      ...prev,
      [fieldId]: !prev[fieldId],
    }));
  };

  const handleVariableChange = (variableName: string, value: string) => {
    setVariableValues(prev => ({
      ...prev,
      [variableName]: value,
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
    if (!generatedQuery) {
      setError('Please select at least one field to query');
      return;
    }

    setLoading(true);
    setError('');
    setQueryResult(null);

    try {
      // eslint-disable-next-line no-undef
      const response = await fetch('https://identity-api.dimo.zone/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: generatedQuery,
        }),
      });

      const data = await response.json();

      if (!response.ok || data.errors) {
        throw new Error(data.errors?.[0]?.message || 'Query execution failed');
      }

      setQueryResult(data);
    } catch (err: any) {
      setError(err.message || 'Failed to execute query');
    } finally {
      setLoading(false);
    }
  };

  const renderFieldSelector = (
    field: SelectableField,
    parentId: string = ''
  ) => {
    const fieldId = parentId ? `${parentId}.${field.id}` : field.id;
    const isSelected = selectedFields[fieldId];

    if (field.type === 'object' && field.fields) {
      return (
        <div key={fieldId} className={styles.fieldGroup}>
          <button
            className={`${styles.fieldButton} ${isSelected ? styles.fieldButtonSelected : ''}`}
            onClick={() => toggleField(fieldId)}
          >
            <div className={styles.fieldButtonContent}>
              <div className={styles.fieldButtonName}>{field.name}</div>
              <div className={styles.fieldButtonDescription}>
                {field.description}
              </div>
            </div>
            {isSelected && <span className={styles.fieldCheckmark}>✓</span>}
          </button>
          {isSelected && (
            <div className={styles.nestedFields}>
              {field.fields.map(nestedField =>
                renderFieldSelector(nestedField, fieldId)
              )}
            </div>
          )}
        </div>
      );
    }

    return (
      <button
        key={fieldId}
        className={`${styles.fieldButton} ${isSelected ? styles.fieldButtonSelected : ''}`}
        onClick={() => toggleField(fieldId)}
      >
        <div className={styles.fieldButtonContent}>
          <div className={styles.fieldButtonName}>{field.name}</div>
          <div className={styles.fieldButtonDescription}>
            {field.description}
          </div>
        </div>
        {isSelected && <span className={styles.fieldCheckmark}>✓</span>}
      </button>
    );
  };

  return (
    <div className={styles.queryBuilder}>
      {/* Query Root Selection */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>1. Select Query Type</h3>
        <p className={styles.sectionDescription}>
          Choose what type of data you want to query from the Identity API
        </p>
        <div className={styles.rootSelector}>
          {identityQueryRoots.map(root => (
            <button
              key={root.id}
              className={`${styles.rootButton} ${selectedRoot?.id === root.id ? styles.rootButtonSelected : ''}`}
              onClick={() => handleRootSelect(root)}
            >
              <div className={styles.rootButtonName}>{root.name}</div>
              <div className={styles.rootButtonDescription}>
                {root.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedRoot && (
        <>
          {/* Variable Inputs */}
          {selectedRoot.variables.length > 0 && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>2. Configure Parameters</h3>
              <p className={styles.sectionDescription}>
                Enter the required parameters for your query
              </p>
              <div className={styles.variablesGrid}>
                {selectedRoot.variables.map((variable: QueryVariable) => (
                  <div key={variable.name} className={styles.variableInput}>
                    <label className={styles.variableLabel}>
                      {variable.label}
                      {variable.required && (
                        <span className={styles.required}>*</span>
                      )}
                    </label>
                    {variable.description && (
                      <p className={styles.variableDescription}>
                        {variable.description}
                      </p>
                    )}
                    <input
                      type="text"
                      className={styles.input}
                      placeholder={variable.placeholder}
                      value={variableValues[variable.name] || ''}
                      onChange={e =>
                        handleVariableChange(variable.name, e.target.value)
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Field Selection */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>
              {selectedRoot.variables.length > 0 ? '3' : '2'}. Select Fields to
              Retrieve
            </h3>
            <p className={styles.sectionDescription}>
              Choose which data fields you want to include in your query
            </p>
            <div className={styles.fieldSelector}>
              {selectedRoot.availableFields.map(field =>
                renderFieldSelector(field)
              )}
            </div>
          </div>

          {/* Generated Query Display */}
          {Object.values(selectedFields).some(v => v) && (
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
                    disabled={loading}
                  >
                    {loading ? '⏳ Running...' : '▶ Execute Query'}
                  </button>
                </div>
              </div>
              <pre className={styles.queryCode}>
                <code>{generatedQuery}</code>
              </pre>
            </div>
          )}

          {/* Results Display */}
          {(queryResult || error) && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Query Results</h3>
              {error && (
                <div className={styles.error}>
                  <strong>Error:</strong> {error}
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

export default IdentityQueryBuilder;
