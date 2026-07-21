"use client";

import { useEffect, useRef, useState } from "react";

const ANNOUNCEMENT_HEIGHT_CSS_VAR = "--announcement-banner-height";

export function AnnouncementBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const bannerRef = useRef<HTMLElement | null>(null);

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
          <span className="announcement-kicker">For early explorers</span>
          Join the waitlist and receive a <strong>2-month Premium trial</strong> at launch.
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
