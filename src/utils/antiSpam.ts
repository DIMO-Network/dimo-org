export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const MIN_FILL_TIME_MS = 1500;
const COOLDOWN_MS = 24 * 60 * 60 * 1000;

export function isValidEmail(email: string): boolean {
  return EMAIL_RE.test(email.trim());
}

export function withinCooldown(storageKey: string): boolean {
  const last = Number(localStorage.getItem(storageKey) || 0);
  return Boolean(last) && Date.now() - last < COOLDOWN_MS;
}

export function markSubmitted(storageKey: string): void {
  localStorage.setItem(storageKey, String(Date.now()));
}
