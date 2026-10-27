import type { Metadata } from "next";
import Link from "next/link";
import { LanguageMiniGame } from "../components/landing/LanguageMiniGame";
import { LanguagesDetailsSection } from "../components/landing/LanguagesDetailsSection";
import { PageShell } from "../components/landing/PageShell";
import { PageHero } from "../components/landing/PageHero";

export const metadata: Metadata = { title: "Luganda" };

export default function LanguagesPage() {
  return (
    <PageShell>
      <PageHero
        variant="languages"
        label="Luganda"
        title="Learn Luganda through play"
        highlights={["Ages 3–12", "Luganda at launch"]}
      />
      <LanguagesDetailsSection />
      <LanguageMiniGame language="Luganda" />
      <section className="section pilot-link-section" aria-labelledby="pilot-link-heading">
        <div className="section-inner pilot-link-card">
          <h2 id="pilot-link-heading">Take part in the Luganda pilot</h2>
          <Link className="btn-primary" href="/waitlist/pilot">View pilot details <span aria-hidden="true">→</span></Link>
        </div>
      </section>
    </PageShell>
  );
}
