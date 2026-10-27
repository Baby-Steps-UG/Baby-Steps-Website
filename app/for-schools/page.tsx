import type { Metadata } from "next";
import { PageShell } from "../components/landing/PageShell";
import { PageHero } from "../components/landing/PageHero";
import { SchoolsPageContent } from "../components/landing/SchoolsPageContent";

export const metadata: Metadata = { title: "For schools" };

export default function ForSchoolsPage() {
  return (
    <PageShell>
      <PageHero
        variant="schools"
        label="For schools"
        title="Baby Steps for schools is coming soon"
        highlights={["Teacher feedback", "Classroom pilots planned"]}
      />
      <SchoolsPageContent />
    </PageShell>
  );
}
