export type LeadSource = 'newsletter' | 'chatbot' | 'enterprise';

export interface LeadInput {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  details: string;
  products: string;
  source: LeadSource;
  honeypot: string;
  formStartedAt: number;
}

const SUBMIT_TIMEOUT_MS = 10_000;

export async function submitLead(input: LeadInput): Promise<void> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), SUBMIT_TIMEOUT_MS);

  try {
    const res = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
      signal: controller.signal,
    });
    if (!res.ok) {
      throw new Error(`Lead submission failed: ${res.status}`);
    }
  } finally {
    clearTimeout(timeout);
  }
}
