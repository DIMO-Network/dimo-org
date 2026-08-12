import type { VercelRequest, VercelResponse } from '@vercel/node';

const MIN_FILL_TIME_MS = 1500;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TWENTY_API_URL =
  process.env.TWENTY_API_URL || 'https://api.twenty.com/rest';
const TWENTY_API_KEY = process.env.TWENTY_API_KEY;

type LeadSource = 'newsletter' | 'chatbot' | 'enterprise';

interface LeadPayload {
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

function isValidEmail(email: string): boolean {
  return EMAIL_RE.test(email.trim());
}

async function twentyFetch(path: string, init: RequestInit) {
  const res = await fetch(`${TWENTY_API_URL}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${TWENTY_API_KEY}`,
      'Content-Type': 'application/json',
      ...init.headers,
    },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Twenty API ${path} failed: ${res.status} ${body}`);
  }
  return res.json();
}

async function findPersonIdByEmail(email: string): Promise<string | null> {
  const filter = encodeURIComponent(`emails.primaryEmail[eq]:${email}`);
  const data = await twentyFetch(`/people?filter=${filter}`, {
    method: 'GET',
  });
  const person = data?.data?.people?.[0];
  return person?.id ?? null;
}

async function createPerson(
  email: string,
  payload: LeadPayload
): Promise<string> {
  const [firstName, ...rest] = payload.name.trim().split(/\s+/);
  const data = await twentyFetch('/people', {
    method: 'POST',
    body: JSON.stringify({
      name: {
        firstName: firstName || payload.name,
        lastName: rest.join(' '),
      },
      emails: { primaryEmail: email },
      ...(payload.phone
        ? { phones: { primaryPhoneNumber: payload.phone } }
        : {}),
    }),
  });
  return data.data.createPerson.id;
}

const SOURCE_LABELS: Record<LeadSource, string> = {
  newsletter: 'Newsletter Signup',
  chatbot: 'Chatbot Inquiry',
  enterprise: 'Enterprise Inquiry',
};

function detailsToBlocknote(text: string): string {
  const paragraphs = text.split('\n').map((line, i) => ({
    id: `block-${i}`,
    type: 'paragraph',
    props: {
      textColor: 'default',
      backgroundColor: 'default',
      textAlignment: 'left',
    },
    content: line ? [{ type: 'text', text: line, styles: {} }] : [],
    children: [],
  }));
  return JSON.stringify(paragraphs);
}

async function createOpportunity(
  personId: string,
  email: string,
  payload: LeadPayload
): Promise<void> {
  const label = payload.company || email;
  const data = await twentyFetch('/opportunities', {
    method: 'POST',
    body: JSON.stringify({
      name: `${SOURCE_LABELS[payload.source]} - ${label}`,
      pointOfContactId: personId,
    }),
  });
  const opportunityId = data.data.createOpportunity.id;

  const noteBody = [
    payload.products ? `Products: ${payload.products}` : null,
    payload.details ? `Details: ${payload.details}` : null,
  ]
    .filter(Boolean)
    .join('\n');
  if (!noteBody) return;

  const note = await twentyFetch('/notes', {
    method: 'POST',
    body: JSON.stringify({
      title: `${SOURCE_LABELS[payload.source]} - ${label}`,
      bodyV2: { blocknote: detailsToBlocknote(noteBody) },
    }),
  });
  const noteId = note.data.createNote.id;

  await twentyFetch('/noteTargets', {
    method: 'POST',
    body: JSON.stringify({
      noteId,
      targetOpportunityId: opportunityId,
    }),
  });
}

const VALID_SOURCES = new Set<LeadSource>([
  'newsletter',
  'chatbot',
  'enterprise',
]);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const payload = req.body as LeadPayload | undefined | null;

  if (!payload || typeof payload !== 'object') {
    res.status(400).json({ error: 'Invalid submission' });
    return;
  }

  if (!TWENTY_API_KEY) {
    console.error('TWENTY_API_KEY is not configured');
    res
      .status(500)
      .json({ error: 'Failed to submit. Please try again later.' });
    return;
  }

  if (payload.honeypot) {
    res.status(400).json({ error: 'Invalid submission' });
    return;
  }
  if (
    !payload.formStartedAt ||
    Date.now() - payload.formStartedAt < MIN_FILL_TIME_MS
  ) {
    res.status(400).json({ error: 'Invalid submission' });
    return;
  }
  if (!payload.email || !isValidEmail(payload.email)) {
    res.status(400).json({ error: 'Please enter a valid email address.' });
    return;
  }
  if (!payload.name || !payload.source || !VALID_SOURCES.has(payload.source)) {
    res.status(400).json({ error: 'Missing required fields.' });
    return;
  }

  const email = payload.email.trim().toLowerCase();

  try {
    let personId = await findPersonIdByEmail(email);
    if (!personId) {
      personId = await createPerson(email, payload);
    }
    await createOpportunity(personId, email, payload);
    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Twenty CRM lead submission failed:', err);
    res
      .status(502)
      .json({ error: 'Failed to submit. Please try again later.' });
  }
}
