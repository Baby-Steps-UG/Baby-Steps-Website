import { PageShell } from "../components/landing/PageShell";
import { PageHero } from "../components/landing/PageHero";
import { PricingSection } from "../components/landing/PricingSection";

export default function PricingPage() {
  return (
    <PageShell>
      <PageHero
        variant="pricing"
        label="Pricing · Coming Soon"
        title="Simple plans are taking shape"
        subtitle="We’re finalising the right mix of access, value, and flexibility for families. Clear prices will be shared before launch."
        highlights={[
          "No prices published yet",
          "Family-friendly options in progress",
          "Schools pricing will come later",
        ]}
      />
      <PricingSection />
    </PageShell>
  );
}
