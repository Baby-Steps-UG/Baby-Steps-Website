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
    <main className="landing-page">
      <SiteHeader />
      <AnnouncementBanner />
      {children}
      {showPersonalization ? <PersonalizationSection /> : null}
      <SiteFooter />
    </main>
  );
}
