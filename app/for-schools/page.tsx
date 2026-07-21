import { PageShell } from "../components/landing/PageShell";
import { PageHero } from "../components/landing/PageHero";
import { SchoolsPageContent } from "../components/landing/SchoolsPageContent";

export default function ForSchoolsPage() {
  return (
    <PageShell>
      <PageHero
        variant="schools"
        label="For Schools · Coming Soon"
        title="The classroom chapter is coming next"
        subtitle="Baby Steps for schools is not available yet. We’re listening first, shaping a Luganda-first classroom vision with the care teachers and learners deserve."
        highlights={[
          "Teacher conversations first",
          "Thoughtful pilots before rollout",
          "Schools interest list now open",
        ]}
      />
      <SchoolsPageContent />
    </PageShell>
  );
}
