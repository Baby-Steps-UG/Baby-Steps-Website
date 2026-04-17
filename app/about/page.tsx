import { AboutPageContent } from "../components/landing/AboutPageContent";
import { PageShell } from "../components/landing/PageShell";
import { PageHero } from "../components/landing/PageHero";

export default function AboutPage() {
  return (
    <PageShell>
      <PageHero
        variant="about"
        label="About"
        title="Built in Uganda, for Ugandan learners"
        subtitle="Baby Steps exists to help children grow in language, identity, and confidence through learning that feels like home."
        highlights={[
          "Rooted in local culture",
          "Warm, joyful learning experiences",
          "Trusted by families and schools",
        ]}
      />
      <AboutPageContent />
    </PageShell>
  );
}
