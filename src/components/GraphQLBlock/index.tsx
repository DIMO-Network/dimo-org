import React, { useState, useEffect, useRef } from 'react';
import { EditorView } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { basicSetup } from 'codemirror';
import { keymap } from '@codemirror/view';
import styles from './styles.module.css';

// Simple icons as React components
const Play = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const Copy = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
  </svg>
);

const Check = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
  </svg>
);

// GraphQL Editor with CodeMirror 6
const GraphQLEditor: React.FC<{
  value: string;
  onChange: (value: string) => void;
  onExecute?: () => void;
}> = ({ value, onChange, onExecute }) => {
  const editorRef = useRef<any>(null);
  const viewRef = useRef<EditorView | null>(null);

  useEffect(() => {
    if (!editorRef.current) return;

    // Detect theme from document
    const isDark =
      document.documentElement.getAttribute('data-theme') === 'dark' ||
      document.documentElement.getAttribute('data-theme') === null; // Default to dark

    const startState = EditorState.create({
      doc: value,
      extensions: [
        basicSetup,
        javascript(), // Using JavaScript highlighting as a base for GraphQL-like syntax
        ...(isDark ? [oneDark] : []),
        keymap.of([
          {
            key: 'Ctrl-Enter',
            run: () => {
              if (onExecute) {
                onExecute();
                return true;
              }
              return false;
            },
          },
        ]),
        EditorView.theme({
          '&': {
            height: '100%',
            fontSize: '13px',
            fontFamily:
              "'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', monospace",
          },
          '.cm-scroller': {
            height: '100%',
            padding: '16px',
          },
          '.cm-focused': { outline: 'none' },
          '.cm-editor': {
            backgroundColor: isDark ? '#1e1e1e' : '#ffffff',
          },
          '.cm-content': {
            color: isDark ? '#e0e0e0' : '#24292f',
          },
          '.cm-cursor': {
            borderLeftColor: isDark ? '#e0e0e0' : '#24292f',
          },
        }),
        EditorView.updateListener.of(update => {
          if (update.docChanged) {
            const newValue = update.state.doc.toString();
            onChange(newValue);
          }
        }),
      ],
    });

    const view = new EditorView({
      state: startState,
      parent: editorRef.current,
    });

    viewRef.current = view;

    return () => {
      view.destroy();
    };
  }, []);

  // Update editor content when value prop changes
  useEffect(() => {
    if (viewRef.current && value !== viewRef.current.state.doc.toString()) {
      const transaction = viewRef.current.state.update({
        changes: {
          from: 0,
          to: viewRef.current.state.doc.length,
          insert: value,
        },
      });
      viewRef.current.dispatch(transaction);
    }
  }, [value]);

  return <div ref={editorRef} style={{ height: '100%', width: '100%' }} />;
};

interface GraphQLBlockProps {
  query?: string;
  variables?: string;
  response?: any;
  viewOnly?: boolean;
  title?: string;
  endpoint?: string;
  headers?: Record<string, string>;
}

const GraphQLBlock: React.FC<GraphQLBlockProps> = ({
  query = '',
  variables = '{}',
  response: _response,
  viewOnly = false,
  title: _title = 'GraphQL Playground',
  endpoint = 'https://identity-api.dimo.zone/query',
  headers = {},
}) => {
  const [currentQuery, setCurrentQuery] = useState(query);
  const [currentVariables, setCurrentVariables] = useState(variables);
  const [currentResponse, setCurrentResponse] = useState(_response);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'variables' | 'headers'>(
    'variables'
  );

  // Parse variables
  let parsedVariables;
  try {
    parsedVariables =
      typeof currentVariables === 'string'
        ? JSON.parse(currentVariables)
        : currentVariables;
  } catch {
    parsedVariables = {};
  }

  const executeQuery = async () => {
    if (!currentQuery.trim() || viewOnly || typeof window === 'undefined')
      return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await window.fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: JSON.stringify({
          query: currentQuery,
          variables: parsedVariables,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setCurrentResponse(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const copyResponse = async () => {
    if (currentResponse && typeof window !== 'undefined') {
      try {
        await window.navigator.clipboard.writeText(
          JSON.stringify(currentResponse, null, 2)
        );
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  return (
    <div className={styles.graphiqlContainer}>
      {/* Top Bar */}
      <div className={styles.topBar}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>◉</div>
          <span>GraphQL</span>
        </div>

        <div className={styles.toolbar}>
          <button
            className={styles.executeButton}
            onClick={executeQuery}
            disabled={isLoading || !currentQuery.trim() || viewOnly}
            title="Execute Query (Ctrl+Enter)"
          >
            <Play size={14} />
            {isLoading ? 'Running' : 'Run'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Left Pane - Query Editor */}
        <div className={styles.leftPane}>
          <div className={styles.editorContainer}>
            {viewOnly ? (
              <pre className={styles.readOnlyEditor}>
                <code>{currentQuery}</code>
              </pre>
            ) : (
              <GraphQLEditor
                value={currentQuery}
                onChange={setCurrentQuery}
                onExecute={executeQuery}
              />
            )}
          </div>

          {/* Bottom Pane - Variables/Headers */}
          <div className={styles.bottomPane}>
            <div className={styles.tabBar}>
              <button
                className={`${styles.tab} ${activeTab === 'variables' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('variables')}
              >
                QUERY VARIABLES
              </button>
              <button
                className={`${styles.tab} ${activeTab === 'headers' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('headers')}
              >
                REQUEST HEADERS
              </button>
            </div>

            <div className={styles.tabContent}>
              {activeTab === 'variables' &&
                (viewOnly ? (
                  <pre className={styles.readOnlyEditor}>
                    <code>{JSON.stringify(parsedVariables, null, 2)}</code>
                  </pre>
                ) : (
                  <textarea
                    className={styles.variablesEditor}
                    value={currentVariables}
                    onChange={e => setCurrentVariables(e.target.value)}
                    placeholder="{}"
                    spellCheck={false}
                  />
                ))}
              {activeTab === 'headers' && (
                <textarea
                  className={styles.headersEditor}
                  value="{}"
                  placeholder="{}"
                  readOnly
                  spellCheck={false}
                />
              )}
            </div>
          </div>
        </div>

        {/* Right Pane - Response */}
        <div className={styles.rightPane}>
          <div className={styles.responseHeader}>
            <span>Response</span>
            {currentResponse && (
              <button
                className={styles.copyButton}
                onClick={copyResponse}
                title="Copy response"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            )}
          </div>

          <div className={styles.responseContent}>
            {isLoading ? (
              <div className={styles.loadingState}>
                <div className={styles.spinner}></div>
                <span>Executing query...</span>
              </div>
            ) : error ? (
              <div className={styles.errorState}>
                <div className={styles.errorMessage}>{error}</div>
              </div>
            ) : currentResponse ? (
              <pre className={styles.responseDisplay}>
                <code>{JSON.stringify(currentResponse, null, 2)}</code>
              </pre>
            ) : (
              <div className={styles.emptyState}>
                <div className={styles.emptyMessage}>
                  {viewOnly
                    ? 'This is a read-only GraphQL example.'
                    : 'Run a query to see results here.'}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphQLBlock;
