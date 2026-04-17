import { PageShell } from "../components/landing/PageShell";
import { PageHero } from "../components/landing/PageHero";
import { PricingSection } from "../components/landing/PricingSection";

export default function PricingPage() {
  return (
    <PageShell>
      <PageHero
        variant="pricing"
        label="Pricing"
        title="Simple plans for families and schools"
        subtitle="Choose a plan that fits your family or school today, then scale as your learning goals grow."
        highlights={[
          "Family plans from free to premium",
          "School licensing for classrooms and networks",
          "Clear options with guided onboarding",
        ]}
      />
      <PricingSection />
    </PageShell>
  );
}
