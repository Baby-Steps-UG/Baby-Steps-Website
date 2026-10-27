import type { Metadata } from "next";
import { PageShell } from "../components/landing/PageShell";
import { PageHero } from "../components/landing/PageHero";
import { PricingSection } from "../components/landing/PricingSection";

export const metadata: Metadata = { title: "Pricing" };

export default function PricingPage() {
  return (
    <PageShell>
      <PageHero
        variant="pricing"
        label="Pricing"
        title="Pricing coming soon"
        highlights={["Family plans in development", "School pricing to follow"]}
      />
      <PricingSection />
    </PageShell>
  );
}
