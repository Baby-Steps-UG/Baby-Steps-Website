import type { ReactNode } from "react";

import { AnnouncementBanner } from "./AnnouncementBanner";
import { PersonalizationSection } from "./PersonalizationSection";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

interface PageShellProps {
  children: ReactNode;
  showPersonalization?: boolean;
}

export function PageShell({ children, showPersonalization = true }: PageShellProps) {
  return (
    <div className="landing-page">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <AnnouncementBanner />
      <main id="main-content" tabIndex={-1}>
        {children}
        {showPersonalization ? <PersonalizationSection /> : null}
      </main>
      <SiteFooter />
    </div>
  );
}
