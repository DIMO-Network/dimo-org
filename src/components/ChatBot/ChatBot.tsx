import React, { useState, useRef, useEffect } from 'react';
import { submitLead } from '../../utils/lead';
import { MessageCircle, X, Send } from 'lucide-react';
import styles from './ChatBot.module.css';
import {
  isValidEmail,
  MIN_FILL_TIME_MS,
  withinCooldown,
  markSubmitted,
} from '../../utils/antiSpam';

const LAST_SUBMIT_KEY = 'dimo_chatbot_last_submit';

const PRODUCT_OPTIONS = [
  { value: 'Ingest', label: 'Ingest – send telematics data to DIMO' },
  { value: 'Storage', label: 'Storage – store data on-prem' },
  { value: 'Consent', label: 'Consent – manage data permissions' },
  { value: 'Access', label: 'Access – build apps using AI and telemetry data' },
  { value: 'Pay', label: 'Pay – handle in-vehicle transactions' },
  { value: 'None', label: 'None of the above' },
];

interface Message {
  from: 'bot' | 'user';
  text: string;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [products, setProducts] = useState<string[]>([]);
  const [, setDetails] = useState('');
  const [input, setInput] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      from: 'bot',
      text: "Hi there! I'm the DIMO assistant. What's your name?",
    },
  ]);
  const [error, setError] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const mountedAt = useRef(Date.now());

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  function addMessages(...msgs: Message[]) {
    setMessages(prev => [...prev, ...msgs]);
  }

  function handleTextSubmit() {
    const value = input.trim();
    if (!value) return;
    setError('');

    if (step === 0) {
      setName(value);
      setInput('');
      addMessages(
        { from: 'user', text: value },
        {
          from: 'bot',
          text: `Nice to meet you, ${value}! What's your email address?`,
        }
      );
      setStep(1);
    } else if (step === 1) {
      if (!isValidEmail(value)) {
        setError('Please enter a valid email address.');
        return;
      }
      setEmail(value);
      setInput('');
      addMessages(
        { from: 'user', text: value },
        {
          from: 'bot',
          text: 'Which products interest you? (select all that apply)',
        }
      );
      setStep(2);
    } else if (step === 3) {
      setDetails(value);
      setInput('');
      addMessages({ from: 'user', text: value });
      sendAndClose(value);
    }
  }

  function handleProductsSubmit() {
    if (products.length === 0) return;
    const label = products.join(', ');
    addMessages(
      { from: 'user', text: label },
      {
        from: 'bot',
        text: 'Great choices! What exactly are you looking for? Tell us a bit more about your needs.',
      }
    );
    setStep(3);
  }

  function toggleProduct(value: string) {
    setProducts(prev =>
      prev.includes(value) ? prev.filter(p => p !== value) : [...prev, value]
    );
  }

  async function sendAndClose(detailsText: string) {
    const isBot =
      Boolean(honeypot) || Date.now() - mountedAt.current < MIN_FILL_TIME_MS;

    if (!isBot && !withinCooldown(LAST_SUBMIT_KEY)) {
      try {
        await submitLead({
          name,
          email: email.trim(),
          details: detailsText,
          products: products.join(', '),
          source: 'chatbot',
          honeypot,
          formStartedAt: mountedAt.current,
        });
        markSubmitted(LAST_SUBMIT_KEY);
      } catch (err) {
        console.error('Lead submission error:', err);
      }
    }

    addMessages({
      from: 'bot',
      text: `Thanks ${name}! Someone from our team will reach out to you at ${email} soon.`,
    });
    setStep(4);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleTextSubmit();
    }
  }

  return (
    <>
      {isOpen && (
        <div className={styles.panel}>
          <div className={styles.header}>
            <span className={styles.headerTitle}>Chat with DIMO</span>
            <button
              className={styles.closeButton}
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>

          <div className={styles.messages}>
            {messages.map((msg, i) => (
              <div
                key={i}
                className={
                  msg.from === 'bot' ? styles.botBubble : styles.userBubble
                }
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className={styles.inputArea}>
            {/* Honeypot: hidden from sighted users and screen readers, but
                bots that auto-fill every field will populate it. */}
            <input
              type="text"
              name="company"
              value={honeypot}
              onChange={e => setHoneypot(e.target.value)}
              className={styles.honeypot}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />
            {step === 2 ? (
              <>
                <div className={styles.checkboxGroup}>
                  {PRODUCT_OPTIONS.map(opt => (
                    <label key={opt.value} className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={products.includes(opt.value)}
                        onChange={() => toggleProduct(opt.value)}
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
                <button
                  className={styles.submitCheckboxes}
                  onClick={handleProductsSubmit}
                  disabled={products.length === 0}
                >
                  Continue
                </button>
              </>
            ) : step === 4 ? null : step === 3 ? (
              <div className={styles.inputRow}>
                <textarea
                  className={styles.textArea}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Tell us about your needs..."
                />
                <button
                  className={styles.sendButton}
                  onClick={handleTextSubmit}
                  disabled={!input.trim()}
                >
                  <Send size={18} />
                </button>
              </div>
            ) : (
              <>
                <div className={styles.inputRow}>
                  <input
                    className={styles.textInput}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={step === 0 ? 'Your name...' : 'Your email...'}
                  />
                  <button
                    className={styles.sendButton}
                    onClick={handleTextSubmit}
                    disabled={!input.trim()}
                  >
                    <Send size={18} />
                  </button>
                </div>
                {error && <div className={styles.errorText}>{error}</div>}
              </>
            )}
          </div>
        </div>
      )}

      <button
        className={styles.toggleButton}
        onClick={() => setIsOpen(o => !o)}
        aria-label="Open chat"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </>
  );
}
