import test, { beforeEach } from "node:test";
import assert from "node:assert/strict";
import {
  CONSENT_COOKIE, PREFERENCE_COOKIES, clearOptionalCookies, getConsent,
  parseQuizProgress, readPreference, saveConsent, savePreference,
} from "../app/lib/site-preferences.ts";

let jar;
let writes;
beforeEach(() => {
  jar = new Map();
  writes = [];
  globalThis.window = { location: { protocol: "https:" } };
  globalThis.document = {
    get cookie() { return [...jar].map(([key, value]) => `${key}=${value}`).join("; "); },
    set cookie(value) {
      writes.push(value);
      const [pair] = value.split(";");
      const split = pair.indexOf("=");
      const key = pair.slice(0, split);
      if (value.includes("Max-Age=0;")) jar.delete(key);
      else jar.set(key, pair.slice(split + 1));
    },
  };
});

test("optional cookies cannot be read or written before consent or after rejection", () => {
  jar.set(PREFERENCE_COOKIES.offer.name, "yes");
  assert.equal(getConsent(), null);
  assert.equal(readPreference("offer"), null);
  savePreference("quiz", "private progress");
  assert.equal(writes.length, 0);
  saveConsent("declined");
  savePreference("offer", "yes");
  assert.equal(getConsent(), "declined");
  assert.deepEqual([...jar.keys()], [CONSENT_COOKIE]);
});

test("opt-in allows bounded cookies with host-only scope and secure attributes", () => {
  saveConsent("allowed");
  savePreference("quiz", JSON.stringify({ selected: "How are you?" }));
  savePreference("offer", "yes");
  assert.equal(readPreference("offer"), "yes");
  assert.deepEqual(JSON.parse(readPreference("quiz")), { selected: "How are you?" });
  assert.ok(writes.every((value) => value.includes("Path=/;") && value.includes("SameSite=Lax; Secure")));
  assert.ok(writes.every((value) => !value.includes("Domain=")));
  assert.ok(writes[0].includes("Max-Age=15552000"));
  assert.ok(writes[1].includes("Max-Age=2592000"));
});

test("revoking consent immediately deletes every optional cookie", () => {
  saveConsent("allowed");
  savePreference("offer", "yes");
  savePreference("quiz", "saved");
  saveConsent("declined");
  assert.deepEqual([...jar.keys()], [CONSENT_COOKIE]);
  assert.equal(readPreference("quiz"), null);
});

test("expired, unknown-version, and malformed consent fail closed", () => {
  for (const value of ["v2.allowed", "%invalid", "allowed"]) {
    jar.set(CONSENT_COOKIE, value);
    assert.equal(getConsent(), null);
    savePreference("quiz", "saved");
    assert.equal(jar.has(PREFERENCE_COOKIES.quiz.name), false);
  }
  jar.delete(CONSENT_COOKIE);
  jar.set(PREFERENCE_COOKIES.quiz.name, "stale");
  clearOptionalCookies();
  assert.equal(jar.size, 0);
});

test("another tab's withdrawal is checked again before each optional write", () => {
  saveConsent("allowed");
  jar.set(CONSENT_COOKIE, "v1.declined");
  savePreference("quiz", "saved");
  assert.equal(jar.has(PREFERENCE_COOKIES.quiz.name), false);
});

test("storage denial never breaks site interactions", () => {
  globalThis.document = {
    get cookie() { throw new Error("blocked"); },
    set cookie(_value) { throw new Error("blocked"); },
  };
  assert.equal(getConsent(), null);
  assert.doesNotThrow(() => saveConsent("allowed"));
  assert.doesNotThrow(() => saveConsent("declined"));
  assert.doesNotThrow(() => savePreference("quiz", "saved"));
  assert.equal(readPreference("quiz"), null);
});

test("local HTTP preview can retain preferences without Secure", () => {
  window.location.protocol = "http:";
  saveConsent("allowed");
  assert.equal(writes[0].includes("Secure"), false);
});

const questions = [
  { options: ["How are you?", "Goodbye"], answer: "How are you?" },
  { options: ["Maama", "Taata"], answer: "Maama" },
  { options: ["Thank you", "Sorry"], answer: "Thank you" },
];
test("quiz progress restores both an answered question and a completed score", () => {
  for (const value of [
    { version: 1, questionIndex: 0, score: 1, selected: "How are you?" },
    { version: 1, questionIndex: 1, score: 1, selected: null },
    { version: 1, questionIndex: 3, score: 2, selected: null },
  ]) assert.deepEqual(parseQuizProgress(JSON.stringify(value), questions), value);
});

test("tampered quiz data cannot produce invalid questions or scores", () => {
  const valid = { version: 1, questionIndex: 0, score: 0, selected: null };
  for (const value of [
    { version: 2 }, { questionIndex: -1 }, { questionIndex: 4 },
    { questionIndex: 1.5 }, { score: -1 }, { score: 10 }, { score: 1 },
    { selected: "not an option" }, { selected: "How are you?", score: 0 },
    { questionIndex: 3, selected: "Thank you" },
  ]) assert.equal(parseQuizProgress(JSON.stringify({ ...valid, ...value }), questions), null);
  for (const raw of [null, "oops", "null", "{}", "[]"]) assert.equal(parseQuizProgress(raw, questions), null);
});
