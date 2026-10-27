"use client";

import Link from "next/link";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { clearOptionalCookies, getConsent, saveConsent, type Consent } from "../../lib/site-preferences";

const CookieContext = createContext<{ consent: Consent; ready: boolean; openSettings: () => void } | null>(null);

export function useCookiePreferences() {
  const context = useContext(CookieContext);
  if (!context) throw new Error("Cookie preferences require CookiePreferencesProvider.");
  return context;
}

export function CookieSettingsButton() {
  const { openSettings } = useCookiePreferences();
  return <button className="footer-cookie-button" type="button" onClick={openSettings}>Cookie settings</button>;
}

export function CookiePreferencesProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<Consent>(null);
  const [ready, setReady] = useState(false);
  const [optional, setOptional] = useState(false);
  const [status, setStatus] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const sync = () => {
      const saved = getConsent();
      if (saved !== "allowed") clearOptionalCookies();
      setConsent(saved);
      setReady(true);
    };
    sync();
    window.addEventListener("focus", sync);
    const onVisibility = () => { if (document.visibilityState === "visible") sync(); };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("focus", sync);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const choose = (allow: boolean) => {
    const next = allow ? "allowed" : "declined";
    saveConsent(next);
    setConsent(next);
    setStatus("Your cookie choice is saved.");
    dialogRef.current?.close();
  };

  const openSettings = () => {
    setOptional(consent === "allowed");
    dialogRef.current?.showModal();
  };

  return (
    <CookieContext.Provider value={{ consent, ready, openSettings }}>
      {children}
      {ready && consent === null && (
        <section className="cookie-banner" aria-labelledby="cookie-banner-title">
          <div>
            <h2 id="cookie-banner-title">Cookies</h2>
            <p>We use cookies to help the site run smoothly. Optional cookies are up to you. <Link href="/privacy#website-cookies">Learn more</Link></p>
          </div>
          <div className="cookie-actions">
            <button className="cookie-choice" type="button" onClick={() => choose(false)}>No thanks</button>
            <button className="cookie-choice" type="button" onClick={() => choose(true)}>Allow cookies</button>
          </div>
        </section>
      )}
      <dialog className="cookie-dialog" ref={dialogRef} aria-labelledby="cookie-settings-title" aria-describedby="cookie-settings-description">
        <h2 id="cookie-settings-title">Cookie settings</h2>
        <p id="cookie-settings-description">Choose whether to allow optional cookies. The site works either way.</p>
        <label className="cookie-option">
          <input type="checkbox" checked={optional} onChange={(event) => setOptional(event.target.checked)} />
          Allow optional cookies
        </label>
        <p>You can change your mind anytime. <Link href="/privacy#website-cookies" onClick={() => dialogRef.current?.close()}>Learn more</Link></p>
        <div className="cookie-actions">
          <button className="cookie-choice" type="button" onClick={() => dialogRef.current?.close()}>Cancel</button>
          <button className="cookie-choice" type="button" onClick={() => choose(optional)}>Save preferences</button>
        </div>
      </dialog>
      <p className="sr-only" role="status">{status}</p>
    </CookieContext.Provider>
  );
}
