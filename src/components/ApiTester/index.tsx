// /ApiTester/index.tsx
import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import styles from './styles.module.css';

// ---------------- Types ----------------
export interface ApiResponse {
  status: number;
  statusText: string;
  data: any;
  headers: Record<string, string>;
}

export interface ApiError {
  message: string;
  status?: number;
  statusText?: string;
}

type InputType = 'string' | 'number' | 'boolean' | 'array';

export interface UserInputDef {
  key: string;
  label: string;
  type: InputType;
  placeholder?: string;
  helpText?: string;

  // ARRAY-ONLY config
  options?: { label: string; value: string | number }[];
  allowCustomValues?: boolean;
  maxSelections?: number;
}

export interface ApiTesterProps {
  defaultUrl?: string;
  userInputs?: UserInputDef[];
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  /** If valid JSON, merges with user inputs (user wins). If not JSON, sent raw if no inputs. */
  requestBody?: string;
  additionalHeaders?: Record<string, string>;
  jwtPlaceholder?: string;
  urlPlaceholder?: string;
  title?: string;
  showDetails?: boolean;
}

// ---------------- Utils ----------------
function parseInputValue(raw: string, type: InputType): any {
  if (type === 'number') {
    const n = Number(raw);
    return isFinite(n) ? n : undefined;
  }
  if (type === 'boolean') {
    const v = String(raw).toLowerCase().trim();
    return v === 'true';
  }
  if (type === 'array') {
    const val = (raw || '').trim();
    if (!val) return [];
    if (val.charAt(0) === '[') {
      try {
        const parsed = JSON.parse(val);
        return Array.isArray(parsed) ? parsed : [parsed];
      } catch (e) {
        // fall through to CSV parsing
      }
    }
    return val.split(',').map(function (s) { return s.trim(); }).filter(Boolean);
  }
  return raw;
}

// function toCurl(opts: {
//   method: string;
//   url: string;
//   headers: Record<string, string>;
//   body?: any;
// }): string {
//   const method = opts.method;
//   const url = opts.url;
//   const headers = opts.headers;
//   const body = opts.body;

//   const headerLines = Object.keys(headers).map(function (k) {
//     return '-H ' + JSON.stringify(k + ': ' + headers[k]);
//   });

//   const dataLine =
//     body !== undefined &&
//     (method === 'POST' || method === 'PUT' || method === 'PATCH')
//       ? '--data ' + JSON.stringify(JSON.stringify(body))
//       : '';

//   return ['curl', '-sS', '-X', method]
//     .concat(headerLines)
//     .concat([dataLine, JSON.stringify(url)])
//     .filter(Boolean)
//     .join(' ');
// }

// ---------------- Component ----------------
const ApiTester: React.FC<ApiTesterProps> = ({
  defaultUrl = '',
  userInputs = [],
  method = 'GET',
  requestBody = '',
  additionalHeaders = {},
  jwtPlaceholder = 'Enter your JWT token...',
  urlPlaceholder = 'Enter API endpoint URL...',
  title = 'API Tester',
  showDetails = true,
}) => {
  const [jwt, setJwt] = useState<string>('');
  const [url, setUrl] = useState<string>(defaultUrl);
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<ApiError | null>(null);

  // dynamic values for all inputs
  const [userInputValues, setUserInputValues] = useState<Record<string, any>>({});
  // drafts for custom array items (per field)
  const [customArrayDrafts, setCustomArrayDrafts] = useState<Record<string, string>>({});

  // restore JWT
  useEffect(function () {
    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('apitester.jwt');
        if (saved) setJwt(saved);
      }
    } catch (e) {}
  }, []);
  // persist JWT
  useEffect(function () {
    try {
      if (jwt && typeof window !== 'undefined') {
        localStorage.setItem('apitester.jwt', jwt);
      }
    } catch (e) {}
  }, [jwt]);

  // ensure keys exist for current schema
  useEffect(function () {
    setUserInputValues(function (prev) {
      const next: Record<string, any> = {};
      // keep only current schema keys, add defaults for missing
      for (let i = 0; i < userInputs.length; i++) {
        const def = userInputs[i];
        if (prev.hasOwnProperty(def.key)) {
          next[def.key] = prev[def.key];
        } else {
          next[def.key] = def.type === 'boolean' ? false : (def.type === 'array' ? [] : '');
        }
      }
      return next;
    });
  }, [userInputs]);

  const handleUserInputChange = useCallback(function (key: string, value: any) {
    setUserInputValues(function (v) {
      const nv = Object.assign({}, v);
      nv[key] = value;
      return nv;
    });
  }, []);

  // ARRAY with options: collect selected values
  const handleArraySelectChange = useCallback(function (
    def: UserInputDef,
    selectedOptions: HTMLCollectionOf<HTMLOptionElement>
  ) {
    const chosen: (string | number)[] = [];
    const arr = Array.prototype.slice.call(selectedOptions) as HTMLOptionElement[];
    for (let i = 0; i < arr.length; i++) {
      const opt = arr[i];
      if (opt.selected) {
        const raw = opt.value;
        let found: string | number = raw;
        if (def.options && def.options.length > 0) {
          for (let j = 0; j < def.options.length; j++) {
            const o = def.options[j];
            if (String(o.value) === raw) {
              found = o.value;
              break;
            }
          }
        }
        chosen.push(found);
      }
    }
    if (def.maxSelections && chosen.length > def.maxSelections) return;
    handleUserInputChange(def.key, chosen);
  }, [handleUserInputChange]);

  const addCustomArrayValue = useCallback(function (def: UserInputDef) {
    const draft = (customArrayDrafts[def.key] || '').trim();
    if (!draft) return;
    const currentRaw = userInputValues[def.key];
    const current = Array.isArray(currentRaw) ? currentRaw : [];
    const next = current.concat([draft]);
    if (def.maxSelections && next.length > def.maxSelections) return;
    handleUserInputChange(def.key, next);
    setCustomArrayDrafts(function (s) {
      const ns = Object.assign({}, s);
      ns[def.key] = '';
      return ns;
    });
  }, [customArrayDrafts, userInputValues, handleUserInputChange]);

  const removeArrayItem = useCallback(function (def: UserInputDef, idx: number) {
    const currentRaw = userInputValues[def.key];
    const current = Array.isArray(currentRaw) ? currentRaw : [];
    const next: any[] = [];
    for (let i = 0; i < current.length; i++) {
      if (i !== idx) next.push(current[i]);
    }
    handleUserInputChange(def.key, next);
  }, [userInputValues, handleUserInputChange]);

  // final payload (merge valid JSON base with inputs)
  const payload = useMemo(function () {
    let base: any = undefined;
    if (requestBody && String(requestBody).trim()) {
      try {
        base = JSON.parse(String(requestBody));
      } catch (e) {
        base = undefined;
      }
    }
    const cleaned: Record<string, any> = {};
    const keys = Object.keys(userInputValues);
    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];
      const v = userInputValues[k];
      if (v === '') continue;
      cleaned[k] = v;
    }
    if (base && typeof base === 'object') {
      const merged: Record<string, any> = {};
      const bk = Object.keys(base);
      for (let i = 0; i < bk.length; i++) merged[bk[i]] = base[bk[i]];
      const ck = Object.keys(cleaned);
      for (let i = 0; i < ck.length; i++) merged[ck[i]] = cleaned[ck[i]];
      return merged;
    }
    return Object.keys(cleaned).length ? cleaned : undefined;
  }, [requestBody, userInputValues]);

  const abortRef = useRef<AbortController | null>(null);

  const makeApiCall = useCallback(async function () {
    if (!jwt.trim()) {
      setError({ message: 'JWT token is required' });
      return;
    }
    if (!url.trim()) {
      setError({ message: 'API URL is required' });
      return;
    }

    setLoading(true);
    setError(null);
    setResponse(null);

    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();

    try {
      const authHeader = jwt.toLowerCase().indexOf('bearer ') === 0 ? jwt : ('Bearer ' + jwt);
      const headers: Record<string, string> = Object.assign(
        { Authorization: authHeader, 'Content-Type': 'application/json' },
        additionalHeaders || {}
      );

      const config: RequestInit = {
        method: method,
        headers: headers,
        signal: abortRef.current.signal,
      };

      if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
        if (payload !== undefined) {
          config.body = JSON.stringify(payload);
        } else if (requestBody && String(requestBody).trim()) {
          config.body = requestBody; // raw fallback
        }
      }

      const res = await fetch(url, config);

      let data: any;
      const ct = res.headers.get('content-type') || '';
      if (ct.indexOf('application/json') >= 0) {
        data = await res.json();
      } else if (ct.indexOf('application/octet-stream') >= 0) {
        const blob = await res.blob();
        data = { message: 'Binary response received', size: blob.size };
      } else {
        data = await res.text();
      }

      const respHeaders: Record<string, string> = {};
      res.headers.forEach(function (value, key) {
        respHeaders[key] = value;
      });

      setResponse({
        status: res.status,
        statusText: res.statusText,
        data: data,
        headers: respHeaders,
      });

      if (!res.ok) {
        setError({
          message: 'HTTP ' + res.status + ': ' + res.statusText,
          status: res.status,
          statusText: res.statusText,
        });
      }
    } catch (err: any) {
      if (err && err.name === 'AbortError') {
        setError({ message: 'Request aborted' });
      } else {
        const msg = err instanceof Error ? err.message : 'An unknown error occurred';
        setError({ message: msg });
      }
    } finally {
      setLoading(false);
    }
  }, [jwt, url, method, requestBody, additionalHeaders, payload]);

  const formatJson = function (obj: any): string {
    try {
      return JSON.stringify(obj, null, 2);
    } catch (e) {
      return String(obj);
    }
  };

  const effectiveHeaders = useMemo(function () {
    const authHeader = jwt
      ? (jwt.toLowerCase().indexOf('bearer ') === 0 ? jwt : ('Bearer ' + jwt))
      : 'Bearer <token>';
    const base: Record<string, string> = { Authorization: authHeader, 'Content-Type': 'application/json' };
    const merged: Record<string, string> = Object.assign({}, base, additionalHeaders || {});
    return merged;
  }, [jwt, additionalHeaders]);

//   const curlPreview = useMemo(function () {
//     try {
//       return toCurl({ method: method, url: url || '<url>', headers: effectiveHeaders, body: payload });
//     } catch (e) {
//       return '';
//     }
//   }, [method, url, effectiveHeaders, payload]);

  // ---------------- Render ----------------
  return (
    <div className={styles.apiTester}>
      <div className={styles.header}>
        <h3>{title}</h3>
        <div className={styles.methodBadge}>
          <span className={styles.badge + ' ' + (styles as any)[method.toLowerCase()]}>{method}</span>
        </div>
      </div>

      <div className={styles.inputSection}>
        <div className={styles.inputGroup}>
          <label htmlFor="jwt-input" className={styles.label}>JWT Token</label>
          <textarea
            id="jwt-input"
            className={styles.textarea}
            value={jwt}
            onChange={function (e) { setJwt(e.target.value); }}
            placeholder={jwtPlaceholder}
            rows={3}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="url-input" className={styles.label}>API Endpoint</label>
          <input
            id="url-input"
            type="url"
            className={styles.input + ' ' + (defaultUrl ? (styles as any).readonly : '')}
            value={url}
            onChange={function (e) { setUrl(e.target.value); }}
            placeholder={urlPlaceholder}
            readOnly={!!defaultUrl}
            disabled={!!defaultUrl}
          />
        </div>

        {userInputs.length > 0 && (
          <div className={styles.userInputsSection}>
            <h4 className={styles.sectionTitle}>Request Parameters</h4>

            {userInputs.map(function (input) {
              const val = userInputValues[input.key];
              const isArray = input.type === 'array';
              const hasOptions = isArray && !!(input.options && input.options.length > 0);

              return (
                <div key={input.key} className={styles.inputGroup}>
                  <label htmlFor={'user-input-' + input.key} className={styles.label}>
                    {input.label}
                    {isArray && input.maxSelections ? (
                      <span className={styles.muted}> &nbsp;• max {input.maxSelections}</span>
                    ) : null}
                  </label>

                  {input.type === 'boolean' && (
                    <select
                      id={'user-input-' + input.key}
                      className={styles.input}
                      value={String(val !== undefined ? val : false)}
                      onChange={function (e) {
                        handleUserInputChange(input.key, parseInputValue(e.target.value, input.type));
                      }}
                    >
                      <option value="false">false</option>
                      <option value="true">true</option>
                    </select>
                  )}

                  {isArray && hasOptions && (
                    <>
                      <select
                        id={'user-input-' + input.key}
                        multiple
                        className={styles.input + ' ' + (styles as any).multiple}
                        value={(Array.isArray(val) ? val : []).map(function (v: any) { return String(v); })}
                        onChange={function (e) {
                          handleArraySelectChange(input, e.target.selectedOptions);
                        }}
                      >
                        {(input.options || []).map(function (opt) {
                          return (
                            <option key={String(opt.value)} value={String(opt.value)}>
                              {opt.label}
                            </option>
                          );
                        })}
                      </select>

                      <div className={styles.chips}>
                        {(Array.isArray(val) ? val : []).map(function (v: any, idx: number) {
                          let lbl = String(v);
                          if (input.options) {
                            for (let j = 0; j < input.options.length; j++) {
                              const o = input.options[j];
                              if (String(o.value) === String(v)) { lbl = o.label; break; }
                            }
                          }
                          return (
                            <span key={input.key + '-' + idx} className={styles.chip}>
                              {lbl}
                              <button
                                type="button"
                                className={styles.chipRemove}
                                onClick={function () { removeArrayItem(input, idx); }}
                                aria-label={'Remove ' + lbl}
                              >
                                ×
                              </button>
                            </span>
                          );
                        })}
                      </div>

                      {input.allowCustomValues ? (
                        <div className={(styles as any).inline}>
                          <input
                            type="text"
                            className={styles.input}
                            value={customArrayDrafts[input.key] || ''}
                            onChange={function (e) {
                              setCustomArrayDrafts(function (s) {
                                const ns = Object.assign({}, s);
                                ns[input.key] = e.target.value;
                                return ns;
                              });
                            }}
                            placeholder={input.placeholder || 'Add custom value'}
                          />
                          <button
                            type="button"
                            className={styles.button}
                            onClick={function () { addCustomArrayValue(input); }}
                            disabled={
                              !!input.maxSelections &&
                              Array.isArray(val) &&
                              val.length >= (input.maxSelections as number)
                            }
                          >
                            Add
                          </button>
                        </div>
                      ) : null}
                    </>
                  )}

                  {isArray && !hasOptions && (
                    <input
                      id={'user-input-' + input.key}
                      type="text"
                      className={styles.input}
                      value={Array.isArray(val) ? (val as any[]).join(', ') : (val || '')}
                      onChange={function (e) {
                        handleUserInputChange(input.key, parseInputValue(e.target.value, input.type));
                      }}
                      placeholder={input.placeholder || 'Enter comma-separated values or JSON array'}
                    />
                  )}

                  {(input.type === 'string' || input.type === 'number') && (
                    <input
                      id={'user-input-' + input.key}
                      type={input.type === 'number' ? 'number' : 'text'}
                      className={styles.input}
                      value={val !== undefined ? val : ''}
                      onChange={function (e) {
                        handleUserInputChange(input.key, parseInputValue(e.target.value, input.type));
                      }}
                      placeholder={input.placeholder || ('Enter ' + input.label.toLowerCase())}
                    />
                  )}

                  {input.helpText ? <small className={styles.helpText}>{input.helpText}</small> : null}
                </div>
              );
            })}
          </div>
        )}

        {(method === 'POST' || method === 'PUT' || method === 'PATCH') && (
          <div className={styles.inputGroup}>
            <label className={styles.label}>Request Body</label>
            <pre className={styles.codeBlock}>
              {payload !== undefined
                ? formatJson(payload)
                : (requestBody && String(requestBody).trim())
                  ? String(requestBody)
                  : 'No request body'}
            </pre>
          </div>
        )}

        {/* {showDetails && (
          <div className={styles.inputGroup}>
            <label className={styles.label}>cURL Preview</label>
            <pre className={styles.codeBlock}>{curlPreview}</pre>
          </div>
        )} */}

        <div className={styles.actions}>
          <button
            onClick={makeApiCall}
            disabled={loading || !jwt.trim() || !url.trim()}
            className={styles.button + ' ' + (loading ? (styles as any).loading : '')}
          >
            {loading ? 'Testing...' : 'Test ' + method + ' Request'}
          </button>
          {loading ? (
            <button
              type="button"
              className={styles.button + ' ' + (styles as any).secondary}
              onClick={function () { if (abortRef.current) abortRef.current.abort(); }}
            >
              Cancel
            </button>
          ) : null}
        </div>
      </div>

      {error ? (
        <div className={styles.error}>
          <h4>❌ Error</h4>
          <p>{error.message}</p>
        </div>
      ) : null}

      {response ? (
        <div className={styles.response}>
          <div className={styles.responseHeader}>
            <h4>
              {(response.status >= 200 && response.status < 300 ? '✅' : '❌') +
                ' Response: ' + response.status + ' ' + response.statusText}
            </h4>
          </div>

          {showDetails ? (
            <>
              <div className={styles.section}>
                <h5>Response Data</h5>
                <pre className={styles.codeBlock}>{formatJson(response.data)}</pre>
              </div>

              <div className={styles.section}>
                <h5>Response Headers</h5>
                <pre className={styles.codeBlock}>{formatJson(response.headers)}</pre>
              </div>
            </>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default ApiTester;
