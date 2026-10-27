"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { readPreference, savePreference } from "../../lib/site-preferences";
import { useCookiePreferences } from "./CookiePreferences";

const ANNOUNCEMENT_HEIGHT_CSS_VAR = "--announcement-banner-height";

export function AnnouncementBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const bannerRef = useRef<HTMLElement | null>(null);
  const { consent, ready } = useCookiePreferences();

  useEffect(() => {
    if (ready && readPreference("offer") === "yes") setIsVisible(false);
  }, [ready, consent]);

  useEffect(() => {
    if (!isVisible) savePreference("offer", "yes");
  }, [isVisible, consent]);

  useEffect(() => {
    const root = document.documentElement;

    const syncBannerHeight = () => {
      const measuredHeight = isVisible ? (bannerRef.current?.offsetHeight ?? 0) : 0;
      root.style.setProperty(ANNOUNCEMENT_HEIGHT_CSS_VAR, `${measuredHeight}px`);
    };

    syncBannerHeight();

    if (!isVisible || !bannerRef.current) {
      return () => {
        root.style.setProperty(ANNOUNCEMENT_HEIGHT_CSS_VAR, "0px");
      };
    }

    const resizeObserver = new ResizeObserver(syncBannerHeight);
    resizeObserver.observe(bannerRef.current);
    window.addEventListener("resize", syncBannerHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", syncBannerHeight);
      root.style.setProperty(ANNOUNCEMENT_HEIGHT_CSS_VAR, "0px");
    };
  }, [isVisible]);

  if (!isVisible) {
    return null;
  }

  return (
    <section
      ref={bannerRef}
      className="announcement-banner"
      aria-label="Waitlist offer"
    >
      <div className="announcement-inner">
        <p className="announcement-copy">
          <Link href="/waitlist">Join the waitlist for a <strong>2-month Premium trial</strong> at launch.</Link>
        </p>
        <button
          type="button"
          className="announcement-close"
          onClick={() => setIsVisible(false)}
          aria-label="Dismiss waitlist offer"
        >
          ×
        </button>
      </div>
    </section>
  );
}
