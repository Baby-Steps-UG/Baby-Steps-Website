import { LanguageMiniGame } from "../components/landing/LanguageMiniGame";
import { LanguagesDetailsSection } from "../components/landing/LanguagesDetailsSection";
import { PageShell } from "../components/landing/PageShell";
import { PageHero } from "../components/landing/PageHero";

export default function LanguagesPage() {
  return (
    <PageShell>
      <PageHero
        variant="languages"
        label="Luganda first"
        title="Our language journey starts with Luganda"
        subtitle="We are focusing deeply on one launch language—creating a joyful Luganda path through listening, stories, everyday words, and playful challenges."
        highlights={[
          "Luganda available at launch",
          "Designed for ages 3–12",
          "More languages are our future vision",
        ]}
      />
      <LanguagesDetailsSection />
      <LanguageMiniGame language="Luganda" />
    </PageShell>
  );
}
