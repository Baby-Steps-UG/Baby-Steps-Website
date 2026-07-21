import type { Metadata } from "next";

import { LegalDocument } from "../components/landing/LegalDocument";
import { PageShell } from "../components/landing/PageShell";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern use of the Baby Steps app and related learning services.",
};

export default function TermsPage() {
  return (
    <PageShell showPersonalization={false}>
      <LegalDocument
        source="terms_of_service.md"
        eyebrow="The terms we learn by"
        summary="These terms set clear expectations for using Baby Steps as a parent, guardian, educator, or school."
      />
    </PageShell>
  );
}
