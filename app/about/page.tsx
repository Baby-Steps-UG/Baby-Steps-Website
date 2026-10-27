import type { Metadata } from "next";
import { AboutPageContent } from "../components/landing/AboutPageContent";
import { PageShell } from "../components/landing/PageShell";
import { PageHero } from "../components/landing/PageHero";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <PageShell>
      <PageHero
        variant="about"
        label="About"
        title="Made in Uganda"
        highlights={["Luganda at launch", "For ages 3–12"]}
      />
      <AboutPageContent />
    </PageShell>
  );
}
