/** All website cookies live here. Optional writes must pass the consent check. */
export const CONSENT_COOKIE = "bs_cookie_consent";
export const CONSENT_DAYS = 180;
export const PREFERENCE_COOKIES = {
  offer: { name: "bs_offer_dismissed", days: 180 },
  quiz: { name: "bs_luganda_quiz", days: 30 },
} as const;

export type Consent = "allowed" | "declined" | null;
type Preference = keyof typeof PREFERENCE_COOKIES;

function readCookie(name: string): string | null {
  try {
    const entry = document.cookie.split("; ").find((item) => item.startsWith(`${name}=`));
    return entry ? decodeURIComponent(entry.slice(name.length + 1)) : null;
  } catch {
    return null;
  }
}

function writeCookie(name: string, value: string, days: number) {
  try {
    const secure = window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${days * 86400}; SameSite=Lax${secure}`;
  } catch {
    // Browsers that block storage can still use every feature for this visit.
  }
}

export function getConsent(): Consent {
  const value = readCookie(CONSENT_COOKIE);
  return value === "v1.allowed" ? "allowed" : value === "v1.declined" ? "declined" : null;
}

export function clearOptionalCookies() {
  Object.values(PREFERENCE_COOKIES).forEach(({ name }) => writeCookie(name, "", 0));
}

export function saveConsent(consent: Exclude<Consent, null>) {
  writeCookie(CONSENT_COOKIE, `v1.${consent}`, CONSENT_DAYS);
  if (consent !== "allowed") clearOptionalCookies();
}

export function readPreference(key: Preference): string | null {
  return getConsent() === "allowed" ? readCookie(PREFERENCE_COOKIES[key].name) : null;
}

export function savePreference(key: Preference, value: string) {
  if (getConsent() !== "allowed") return;
  const { name, days } = PREFERENCE_COOKIES[key];
  writeCookie(name, value, days);
}

export interface QuizProgress {
  version: 1;
  questionIndex: number;
  score: number;
  selected: string | null;
}

export function parseQuizProgress(raw: string | null, questions: { options: string[]; answer: string }[]): QuizProgress | null {
  if (!raw) return null;
  try {
    const value = JSON.parse(raw);
    const { version, questionIndex, score, selected } = value;
    if (version !== 1 || !Number.isInteger(questionIndex) || questionIndex < 0 || questionIndex > questions.length) return null;
    if (!Number.isInteger(score) || score < 0 || score > questions.length) return null;
    if (questionIndex === questions.length) return selected === null ? { version, questionIndex, score, selected } : null;
    const question = questions[questionIndex];
    if (selected !== null && !question.options.includes(selected)) return null;
    const earned = selected === question.answer ? 1 : 0;
    if (score < earned || score > questionIndex + earned) return null;
    return { version, questionIndex, score, selected };
  } catch {
    return null;
  }
}
