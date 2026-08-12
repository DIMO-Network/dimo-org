# Replace EmailJS lead forms with server-side Twenty CRM integration

## Problem

The three lead-capture forms in dimo-org (Footer newsletter signup, ChatBot
inquiry, Pricing enterprise modal) call EmailJS directly from the browser using
a public key baked into the client bundle. Anti-spam checks (honeypot, minimum
fill time, submission cooldown) live entirely in client-side JS in
`src/utils/antiSpam.ts`, so they're trivially bypassed by anyone calling the
EmailJS API directly. Leads land in an inbox as loosely-parsed email rather than
structured CRM records.

We're replacing this with a server-side integration into Twenty CRM (Twenty
Cloud, `https://api.twenty.com/rest`), which gives structured lead records
(Person + Opportunity) and lets us enforce anti-spam checks server-side where
they can't be bypassed.

## Architecture

One new serverless function, `api/lead.ts`, deployed alongside the static
Docusaurus build (Vercel supports `/api` functions for any framework with zero
extra build config). All three forms POST to this single endpoint instead of
calling EmailJS directly.

A single shared endpoint (rather than one per form) keeps validation and
Twenty-mapping logic in one place, mirroring the existing shared `antiSpam.ts`
utility. Requests are distinguished by a `source` field.

Credentials (`TWENTY_API_KEY`, `TWENTY_API_URL`) are Vercel environment
variables, server-side only — never shipped to the client.

## Request/response contract

```
POST /api/lead
Content-Type: application/json

{
  "name": string,
  "email": string,
  "phone"?: string,
  "company"?: string,
  "details": string,
  "products": string,
  "source": "newsletter" | "chatbot" | "enterprise",
  "honeypot": string,        // must be empty
  "formStartedAt": number    // client timestamp (ms) when the form was first rendered/focused
}

200 { "ok": true }
400 { "error": string }   // validation or spam-check failure
502 { "error": string }   // Twenty API failure
```

## Server-side logic (`api/lead.ts`)

1. **Validate**
   - Reject (400) if `honeypot` is non-empty.
   - Reject (400) if `Date.now() - formStartedAt < MIN_FILL_TIME_MS` (reuse the
     existing constant from `antiSpam.ts`).
   - Reject (400) if `email` fails the existing email regex.
   - This moves anti-spam enforcement from bypassable client JS to the server —
     the main security improvement of this change.

2. **Upsert Person**
   - `GET /rest/people?filter=emails.primaryEmail[eq]:<email>` to look for an
     existing match.
   - If none found, `POST /rest/people` to create one.
   - Exact field names (e.g. `emails.primaryEmail` vs. a workspace-customized
     field) depend on the target Twenty workspace's schema (Settings → API &
     Webhooks → API docs). Build against Twenty's documented defaults; adjust
     field names against the live workspace during implementation/testing.

3. **Create Opportunity**
   - `POST /rest/opportunities`, linked to the person via `pointOfContactId`.
   - `name`: derived from `source` + company or email (e.g.
     `"Enterprise Inquiry – Acme Corp"`, `"Newsletter Signup – jane@x.com"`).
   - `stage`: default new-lead stage (workspace default).

4. Return `200 { ok: true }` on success. On any Twenty API failure, log details
   server-side (Vercel function logs) and return `502` with a generic error
   message — no internal details leaked to the client.

## Client changes

- `src/theme/Footer/index.tsx`, `src/components/ChatBot/ChatBot.tsx`,
  `src/pages/pricing.tsx`: replace `emailjs.send(...)` calls with
  `fetch('/api/lead', { method: 'POST', body: JSON.stringify(...) })`. Existing
  form state, honeypot field, fill-time tracking, and cooldown UX stay as-is —
  they now double as UX-level friction in addition to the real server-side
  enforcement.
- Remove `@emailjs/browser` from `package.json`.
- Remove `emailjsServiceId` / `emailjsTemplateId` / `emailjsPublicKey` wiring
  from `docusaurus.config.ts`.
- `vercel.json`: drop `https://api.emailjs.com` from the CSP `connect-src`
  directive (no longer needed; requests now go to same-origin `/api/lead`).

## Error handling

- Network/fetch failure or non-2xx response from `/api/lead`: surface the
  existing per-form error UI (each form already has an error state for the
  EmailJS failure path — reuse it).
- Add a client-side fetch timeout (~10s) so a hung request doesn't leave the
  form stuck in a submitting state indefinitely.

## Testing

No test framework exists in this repo currently (confirmed against
`package.json`), so verification is manual:

- `vercel dev` locally; `curl` the endpoint directly with a valid payload, a
  honeypot-filled payload, and a too-fast-fill payload to confirm the 200/400
  split.
- Exercise all three forms manually in a browser: happy path, honeypot
  rejection, and fill-time rejection.
- Confirm a real submission creates the expected Person + Opportunity records in
  the Twenty workspace before calling this done.

## Out of scope

- Changing the anti-spam cooldown mechanism (still client-side localStorage) —
  not part of this change.
- The separate Formcrafts-based "Contact Us" flow on the pricing page (unrelated
  to EmailJS/Twenty).
