"use client";

import { useState } from "react";

import { LanguageMiniGame } from "../components/landing/LanguageMiniGame";
import { LanguagesDetailsSection } from "../components/landing/LanguagesDetailsSection";
import { PageShell } from "../components/landing/PageShell";
import { PageHero } from "../components/landing/PageHero";
import type { QuizLanguage } from "../components/landing/languageData";

export default function LanguagesPage() {
  const [selectedLanguage, setSelectedLanguage] = useState<QuizLanguage>("Luganda");

  return (
    <PageShell>
      <PageHero
        variant="languages"
        label="Languages"
        title="Mother tongue learning rooted in Uganda"
        subtitle="Explore the languages available in Baby Steps and how children practice through stories, listening, and playful challenges."
        highlights={[
          "Language paths designed for ages 3-12",
          "Vocabulary, stories, and audio practice",
          "More Ugandan languages on the way",
        ]}
      />
      <LanguagesDetailsSection
        selectedLanguage={selectedLanguage}
        onSelectLanguage={setSelectedLanguage}
      />
      <LanguageMiniGame language={selectedLanguage} />
    </PageShell>
  );
}
