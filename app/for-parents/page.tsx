import type { Metadata } from "next";
import { PageShell } from "../components/landing/PageShell";
import { PageHero } from "../components/landing/PageHero";
import { ParentsPageContent } from "../components/landing/ParentsPageContent";

export const metadata: Metadata = { title: "For parents" };

export default function ForParentsPage() {
  return (
    <PageShell>
      <PageHero
        variant="parents"
        label="For parents"
        title="Luganda learning at home"
        highlights={["Ages 3–12", "Individual child profiles", "Parent controls"]}
      />
      <ParentsPageContent />
    </PageShell>
  );
}
