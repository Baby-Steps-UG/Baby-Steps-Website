import { PageShell } from "../components/landing/PageShell";
import { PageHero } from "../components/landing/PageHero";
import { SchoolsPageContent } from "../components/landing/SchoolsPageContent";

export default function ForSchoolsPage() {
  return (
    <PageShell>
      <PageHero
        variant="schools"
        label="For Schools"
        title="Classroom-ready language learning for Ugandan schools"
        subtitle="Support foundational literacy with a joyful, culturally familiar experience children and teachers can use every term."
        highlights={[
          "Simple onboarding for teachers",
          "Learner-friendly classroom flow",
          "School and network licensing options",
        ]}
      />
      <SchoolsPageContent />
    </PageShell>
  );
}
