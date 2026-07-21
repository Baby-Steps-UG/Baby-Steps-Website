import type { Metadata } from "next";

import { LegalDocument } from "../components/landing/LegalDocument";
import { PageShell } from "../components/landing/PageShell";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Baby Steps collects, uses, protects, and manages family and child information.",
};

export default function PrivacyPage() {
  return (
    <PageShell showPersonalization={false}>
      <LegalDocument
        source="privacy_policy.md"
        eyebrow="Privacy, in plain language"
        summary="We designed Baby Steps for young learners and the grown-ups who care for them. This policy explains what information is used, why, and the choices families have."
      />
    </PageShell>
  );
}
