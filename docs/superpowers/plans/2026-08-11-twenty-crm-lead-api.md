# Twenty CRM Lead API Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace client-side EmailJS calls in the three lead-capture forms (Footer newsletter, ChatBot, Pricing enterprise modal) with a server-side `/api/lead` function that validates submissions and creates Person + Opportunity records in Twenty CRM.

**Architecture:** One new Vercel serverless function (`api/lead.ts`) holds `TWENTY_API_KEY`/`TWENTY_API_URL` server-side and does anti-spam validation + Twenty REST calls. All three forms call a shared client helper (`src/utils/lead.ts`) that POSTs to this endpoint instead of calling `emailjs.send()` directly.

**Tech Stack:** Vercel serverless function (`@vercel/node` types), TypeScript, Twenty CRM REST API (`https://api.twenty.com/rest`), existing React/Docusaurus form components.

## Global Constraints

- Twenty API base URL: `https://api.twenty.com/rest` (Twenty Cloud).
- `TWENTY_API_KEY` and `TWENTY_API_URL` must be server-side env vars only — never referenced from client code or `docusaurus.config.ts` `customFields` (that pattern is EmailJS-specific and is being removed).
- Anti-spam constant `MIN_FILL_TIME_MS = 1500` and the email regex must match the existing values in `src/utils/antiSpam.ts` — don't invent new thresholds.
- No test framework exists in this repo (confirmed via `package.json`) — verification is via `vercel dev` + `curl` + manual browser testing, not automated tests.
- Twenty's REST schema is workspace-specific. Field names used below (`emails.primaryEmail`, `pointOfContactId`, etc.) are Twenty's documented defaults — if a live call fails with a schema error, check the workspace's Settings → API & Webhooks docs and adjust field names, not the overall structure.
- Run `npm run check-all` (typecheck + lint + format check) before considering any task done — this is this repo's standing CI gate.

---

### Task 1: Configure Twenty CRM environment variables

**Files:** none (Vercel project config + local `.env.local`, which is gitignored)

**Interfaces:**
- Produces: `TWENTY_API_KEY` and `TWENTY_API_URL` available as `process.env.TWENTY_API_KEY` / `process.env.TWENTY_API_URL` at runtime for `api/lead.ts` (Task 3).

- [ ] **Step 1: Add the env vars to the Vercel project**

Run (values are the Twenty API key and `https://api.twenty.com/rest` provided out-of-band — do not paste the raw key into any command that gets logged to a file that's committed):

```bash
vercel env add TWENTY_API_URL production preview development
vercel env add TWENTY_API_KEY production preview development
```

Each prompts for the value on stdin.

- [ ] **Step 2: Add the same values to `.env.local` for local `vercel dev`**

Append to `.env.local` (already gitignored — confirmed in `.gitignore`):

```
TWENTY_API_URL=https://api.twenty.com/rest
TWENTY_API_KEY=<the key>
```

- [ ] **Step 3: Verify**

Run: `vercel env ls`
Expected: `TWENTY_API_URL` and `TWENTY_API_KEY` listed for Production, Preview, and Development.

---

### Task 2: Shared client-side lead submission helper

**Files:**
- Create: `src/utils/lead.ts`

**Interfaces:**
- Consumes: nothing new (plain `fetch`).
- Produces: `submitLead(input: LeadInput): Promise<void>` and `LeadInput`/`LeadSource` types, imported by Tasks 4–6. `submitLead` throws on any non-2xx response or network error/timeout — callers catch and set their existing error UI state.

- [ ] **Step 1: Create the file**

```ts
// src/utils/lead.ts
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
```

- [ ] **Step 2: Typecheck**

Run: `npm run typecheck`
Expected: no errors related to `src/utils/lead.ts`.

- [ ] **Step 3: Commit**

```bash
git add src/utils/lead.ts
git commit -m "feat: add shared client helper for posting leads to /api/lead"
```

---

### Task 3: Twenty CRM serverless function

**Files:**
- Create: `api/lead.ts`
- Modify: `package.json` (add `@vercel/node` devDependency, remove `@emailjs/browser` — see Task 7 for the removal half; this task only adds `@vercel/node`)

**Interfaces:**
- Consumes: `TWENTY_API_KEY`, `TWENTY_API_URL` from `process.env` (Task 1). `LeadInput` shape from Task 2 (duplicated here as `LeadPayload` since this file runs in a separate serverless bundle, not the Docusaurus client bundle — importing across that boundary isn't supported by Vercel's zero-config function build for non-Next.js projects).
- Produces: `POST /api/lead` — `200 { ok: true }` on success, `400 { error }` on validation/spam failure, `405` on non-POST, `502 { error }` on Twenty API failure. Consumed by `submitLead` (Task 2).

- [ ] **Step 1: Install `@vercel/node` types**

Run: `npm install --save-dev @vercel/node`

- [ ] **Step 2: Create the function**

```ts
// api/lead.ts
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

async function createPerson(payload: LeadPayload): Promise<string> {
  const [firstName, ...rest] = payload.name.trim().split(' ');
  const data = await twentyFetch('/people', {
    method: 'POST',
    body: JSON.stringify({
      name: {
        firstName: firstName || payload.name,
        lastName: rest.join(' ') || '-',
      },
      emails: { primaryEmail: payload.email },
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

async function createOpportunity(
  personId: string,
  payload: LeadPayload
): Promise<void> {
  const label = payload.company || payload.email;
  await twentyFetch('/opportunities', {
    method: 'POST',
    body: JSON.stringify({
      name: `${SOURCE_LABELS[payload.source]} - ${label}`,
      pointOfContactId: personId,
    }),
  });
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const payload = req.body as LeadPayload;

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
  if (!payload.name || !payload.source) {
    res.status(400).json({ error: 'Missing required fields.' });
    return;
  }

  try {
    let personId = await findPersonIdByEmail(payload.email);
    if (!personId) {
      personId = await createPerson(payload);
    }
    await createOpportunity(personId, payload);
    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Twenty CRM lead submission failed:', err);
    res.status(502).json({ error: 'Failed to submit. Please try again later.' });
  }
}
```

- [ ] **Step 3: Verify locally with `vercel dev`**

Run: `vercel dev` (in one terminal), then in another:

```bash
curl -i -X POST http://localhost:3000/api/lead \
  -H 'Content-Type: application/json' \
  -d '{"name":"Test User","email":"test@example.com","details":"test","products":"Newsletter","source":"newsletter","honeypot":"","formStartedAt":'"$(($(date +%s%N)/1000000 - 2000))"'}'
```

Expected: `HTTP/1.1 200` and `{"ok":true}`, and a new Person + Opportunity visible in the Twenty workspace.

Also verify rejection paths:

```bash
# honeypot filled -> 400
curl -i -X POST http://localhost:3000/api/lead -H 'Content-Type: application/json' \
  -d '{"name":"Bot","email":"bot@example.com","details":"x","products":"x","source":"newsletter","honeypot":"filled","formStartedAt":0}'

# too fast -> 400
curl -i -X POST http://localhost:3000/api/lead -H 'Content-Type: application/json' \
  -d '{"name":"Fast","email":"fast@example.com","details":"x","products":"x","source":"newsletter","honeypot":"","formStartedAt":'"$(($(date +%s%N)/1000000))"'}'
```

Expected: both return `400`.

- [ ] **Step 4: Typecheck and lint**

Run: `npm run typecheck && npm run lint`
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add api/lead.ts package.json package-lock.json
git commit -m "feat: add /api/lead serverless function for Twenty CRM integration"
```

---

### Task 4: Wire the Footer newsletter form to `/api/lead`

**Files:**
- Modify: `src/theme/Footer/index.tsx`

**Interfaces:**
- Consumes: `submitLead` from `../../utils/lead` (Task 2).

- [ ] **Step 1: Replace the EmailJS import and `useDocusaurusContext` usage**

In `src/theme/Footer/index.tsx`, replace:

```ts
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import emailjs from '@emailjs/browser';
```

with:

```ts
import { submitLead } from '../../utils/lead';
```

Remove the now-unused `const { siteConfig } = useDocusaurusContext();` line inside `NewsletterSignup()`.

- [ ] **Step 2: Replace the `emailjs.send` call in `handleSubmit`**

Replace:

```ts
      await emailjs.send(
        siteConfig.customFields.emailjsServiceId as string,
        siteConfig.customFields.emailjsTemplateId as string,
        {
          name: 'Newsletter Subscriber',
          email: trimmedEmail,
          products: 'Newsletter',
          details: 'Footer newsletter signup',
        },
        siteConfig.customFields.emailjsPublicKey as string
      );
```

with:

```ts
      await submitLead({
        name: 'Newsletter Subscriber',
        email: trimmedEmail,
        details: 'Footer newsletter signup',
        products: 'Newsletter',
        source: 'newsletter',
        honeypot,
        formStartedAt: mountedAt.current,
      });
```

- [ ] **Step 3: Typecheck**

Run: `npm run typecheck`
Expected: no errors.

- [ ] **Step 4: Manual browser verification**

Run `npm start`, go to any page, scroll to the footer, submit the newsletter form with a real email.
Expected: success state shown ("You're subscribed!"), and a `POST /api/lead` call visible in the browser Network tab returning `200`.

- [ ] **Step 5: Commit**

```bash
git add src/theme/Footer/index.tsx
git commit -m "feat: send newsletter signups through /api/lead instead of EmailJS"
```

---

### Task 5: Wire the ChatBot to `/api/lead`

**Files:**
- Modify: `src/components/ChatBot/ChatBot.tsx`

**Interfaces:**
- Consumes: `submitLead` from `../../utils/lead` (Task 2).

- [ ] **Step 1: Replace the EmailJS import and config wiring**

Replace:

```ts
import emailjs from '@emailjs/browser';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
```

with:

```ts
import { submitLead } from '../../utils/lead';
```

Remove:

```ts
  const { siteConfig } = useDocusaurusContext();
  const EMAILJS_SERVICE_ID = siteConfig.customFields.emailjsServiceId as string;
  const EMAILJS_TEMPLATE_ID = siteConfig.customFields
    .emailjsTemplateId as string;
  const EMAILJS_PUBLIC_KEY = siteConfig.customFields.emailjsPublicKey as string;
```

- [ ] **Step 2: Replace the send call in `sendAndClose`**

Replace:

```ts
  async function sendAndClose(detailsText: string) {
    const isBot =
      Boolean(honeypot) || Date.now() - mountedAt.current < MIN_FILL_TIME_MS;

    if (!isBot && !withinCooldown(LAST_SUBMIT_KEY)) {
      const templateParams = {
        name,
        email,
        products: products.join(', '),
        details: detailsText,
      };

      try {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          templateParams,
          EMAILJS_PUBLIC_KEY
        );
        markSubmitted(LAST_SUBMIT_KEY);
      } catch (err) {
        console.error('EmailJS error:', err);
      }
    }
```

with:

```ts
  async function sendAndClose(detailsText: string) {
    const isBot =
      Boolean(honeypot) || Date.now() - mountedAt.current < MIN_FILL_TIME_MS;

    if (!isBot && !withinCooldown(LAST_SUBMIT_KEY)) {
      try {
        await submitLead({
          name,
          email,
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
```

- [ ] **Step 3: Typecheck**

Run: `npm run typecheck`
Expected: no errors.

- [ ] **Step 4: Manual browser verification**

Run `npm start`, open the chat widget, complete the flow (name → email → products → details).
Expected: closing "thanks" message shown, and a `POST /api/lead` call visible in Network tab returning `200`.

- [ ] **Step 5: Commit**

```bash
git add src/components/ChatBot/ChatBot.tsx
git commit -m "feat: send ChatBot inquiries through /api/lead instead of EmailJS"
```

---

### Task 6: Wire the Pricing enterprise modal to `/api/lead`

**Files:**
- Modify: `src/pages/pricing.tsx`

**Interfaces:**
- Consumes: `submitLead` from `../utils/lead` (Task 2).

- [ ] **Step 1: Replace the EmailJS import and `useDocusaurusContext` usage**

Replace:

```ts
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import emailjs from '@emailjs/browser';
```

with:

```ts
import { submitLead } from '../utils/lead';
```

Remove the now-unused `const { siteConfig } = useDocusaurusContext();` line inside `EnterpriseModal()`.

- [ ] **Step 2: Replace the `emailjs.send` call in `handleSubmit`**

Replace:

```ts
      await emailjs.send(
        siteConfig.customFields.emailjsServiceId as string,
        siteConfig.customFields.emailjsTemplateId as string,
        {
          name: form.name,
          email: form.email,
          products: `Enterprise Inquiry (${planType === 'ai' ? 'AI + Vehicle Data' : 'Vehicle Data Only'})`,
          details: [
            `Company: ${form.company}`,
            `Fleet Size: ${form.fleetSize}`,
            `Details: ${form.details}`,
          ].join('\n'),
        },
        siteConfig.customFields.emailjsPublicKey as string
      );
```

with:

```ts
      await submitLead({
        name: form.name,
        email: form.email,
        company: form.company,
        products: `Enterprise Inquiry (${planType === 'ai' ? 'AI + Vehicle Data' : 'Vehicle Data Only'})`,
        details: [
          `Company: ${form.company}`,
          `Fleet Size: ${form.fleetSize}`,
          `Details: ${form.details}`,
        ].join('\n'),
        source: 'enterprise',
        honeypot,
        formStartedAt: mountedAt.current,
      });
```

- [ ] **Step 3: Typecheck**

Run: `npm run typecheck`
Expected: no errors.

- [ ] **Step 4: Manual browser verification**

Run `npm start`, go to `/pricing`, open the enterprise modal, submit the form.
Expected: success state shown, `POST /api/lead` returns `200` in Network tab.

- [ ] **Step 5: Commit**

```bash
git add src/pages/pricing.tsx
git commit -m "feat: send enterprise inquiries through /api/lead instead of EmailJS"
```

---

### Task 7: Remove EmailJS entirely

**Files:**
- Modify: `package.json` (remove `@emailjs/browser`)
- Modify: `docusaurus.config.ts` (remove `customFields`)
- Modify: `vercel.json` (drop `https://api.emailjs.com` from CSP `connect-src`)

**Interfaces:** none — this is cleanup after Tasks 4–6 have removed all `emailjs`/`customFields.emailjs*` references.

- [ ] **Step 1: Confirm no remaining references**

Run: `grep -rn "emailjs" src/ docusaurus.config.ts`
Expected: no output (Tasks 4–6 already removed all usages).

- [ ] **Step 2: Remove the dependency**

Run: `npm uninstall @emailjs/browser`

- [ ] **Step 3: Remove `customFields` from `docusaurus.config.ts`**

Remove:

```ts
  customFields: {
    emailjsServiceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
    emailjsTemplateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
    emailjsPublicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
  },
```

- [ ] **Step 4: Update the CSP in `vercel.json`**

In the `Content-Security-Policy` value, remove ` https://api.emailjs.com` from the `connect-src` directive (keep the surrounding entries intact — `'self' https://*.algolia.net ... https://api.emailjs.com https://*.dimo.org` becomes `'self' https://*.algolia.net ... https://*.dimo.org`).

- [ ] **Step 5: Full verification**

Run: `npm run check-all && npm run build`
Expected: all pass, build succeeds with no broken links.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json docusaurus.config.ts vercel.json
git commit -m "chore: remove EmailJS now that leads go through /api/lead"
```

---

### Task 8: End-to-end verification

**Files:** none — verification only.

- [ ] **Step 1: Deploy a preview build**

Run: `vercel` (creates a preview deployment)

- [ ] **Step 2: Exercise all three forms on the preview URL**

For each of Footer newsletter, ChatBot, and Pricing enterprise modal:
- Submit with valid data → confirm success UI and a new Person + Opportunity in the Twenty workspace.
- Submit again immediately (within the 24h cooldown) → confirm it silently succeeds client-side without a second `/api/lead` call (existing cooldown behavior, unchanged).

- [ ] **Step 3: Confirm no lingering EmailJS references**

Run: `grep -rn "emailjs" -i . --include="*.ts" --include="*.tsx" --include="*.json" --exclude-dir=node_modules --exclude-dir=.docusaurus --exclude-dir=build`
Expected: no output.

- [ ] **Step 4: Report results to the user before promoting to production**

Summarize: which forms were tested, whether Person/Opportunity records appeared correctly in Twenty, and any field-mapping adjustments needed. Get explicit confirmation before running `vercel --prod` (per this project's deploy confirmation requirement).
