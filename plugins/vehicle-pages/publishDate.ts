// Shared "is this live yet?" check for scheduled AEO content. Builds are the
// clock: a page dated today (UTC) appears on the first production build of
// that day, which the daily-publish workflow triggers.
export function buildNow(): Date {
  return process.env.AEO_NOW ? new Date(process.env.AEO_NOW) : new Date();
}

export function isLive(dateStr: string, now: Date = buildNow()): boolean {
  // Vercel preview deploys set this so reviewers can see scheduled pages.
  if (process.env.AEO_INCLUDE_FUTURE === '1') return true;
  return dateStr.slice(0, 10) <= now.toISOString().slice(0, 10);
}
