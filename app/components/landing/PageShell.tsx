import type { ReactNode } from "react";

import { AnnouncementBanner } from "./AnnouncementBanner";
import { PersonalizationSection } from "./PersonalizationSection";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

interface PageShellProps {
  children: ReactNode;
}

export function PageShell({ children }: PageShellProps) {
  return (
    <main className="landing-page">
      <SiteHeader />
      <AnnouncementBanner />
      {children}
      <PersonalizationSection />
      <SiteFooter />
    </main>
  );
}
