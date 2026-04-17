import { AgeJourneySection } from "./components/landing/AgeJourneySection";
import { FeaturesSection } from "./components/landing/FeaturesSection";
import { HeroSection } from "./components/landing/HeroSection";
import { MethodSection } from "./components/landing/MethodSection";
import { PageShell } from "./components/landing/PageShell";
import { SubjectsSection } from "./components/landing/SubjectsSection";
import { TestimonialsSection } from "./components/landing/TestimonialsSection";

export default function Home() {
  return (
    <PageShell>
      <HeroSection />
      <AgeJourneySection />
      <MethodSection />
      <FeaturesSection />
      <TestimonialsSection />
      <SubjectsSection />
    </PageShell>
  );
}
