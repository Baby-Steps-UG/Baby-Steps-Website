import { PageShell } from "../components/landing/PageShell";
import { PageHero } from "../components/landing/PageHero";
import { ParentsPageContent } from "../components/landing/ParentsPageContent";

export default function ForParentsPage() {
  return (
    <PageShell>
      <PageHero
        variant="parents"
        label="For Parents"
        title="Support every step of your child's language journey"
        subtitle="Give your child a joyful, familiar way to build mother tongue confidence from ages 3 to 12."
        highlights={[
          "Short daily sessions",
          "Progress you can understand quickly",
          "Learning rooted in Ugandan life",
        ]}
      />
      <ParentsPageContent />
    </PageShell>
  );
}
