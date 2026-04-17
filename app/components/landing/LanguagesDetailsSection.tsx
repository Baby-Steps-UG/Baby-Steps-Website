import { languageProfiles, type QuizLanguage } from "./languageData";

interface LanguagesDetailsSectionProps {
  selectedLanguage: QuizLanguage;
  onSelectLanguage: (language: QuizLanguage) => void;
}

export function LanguagesDetailsSection({
  selectedLanguage,
  onSelectLanguage,
}: LanguagesDetailsSectionProps) {
  return (
    <section className="section themed-section">
      <div className="section-inner">
        <div className="section-heading centered">
          <span className="section-label">Languages We Support</span>
          <h2 className="section-title centered">A growing home for Ugandan mother tongues</h2>
          <p className="section-subtitle centered">
            Each language path is crafted to feel culturally familiar, playful, and age-appropriate
            for learners from 3 to 12.
          </p>
        </div>

        <p className="languages-scroll-hint">Swipe and tap a language card to load its quiz.</p>

        <div className="languages-scroll-row" aria-label="Select quiz language" role="list">
          {languageProfiles.map((language) => {
            const isActive = selectedLanguage === language.name;

            return (
              <button
                key={language.name}
                aria-pressed={isActive}
                className={`language-scroll-card ${isActive ? "active" : ""}`.trim()}
                onClick={() => onSelectLanguage(language.name)}
                role="listitem"
                type="button"
              >
                <span className="language-scroll-tag">Tap to play quiz</span>
                <h3 className="language-scroll-title">{language.name}</h3>
                <p className="language-scroll-region">{language.region}</p>
                <p className="language-scroll-focus">{language.focus}</p>
              </button>
            );
          })}
        </div>

        <p className="languages-selected-note">Current quiz language: {selectedLanguage}</p>
      </div>
    </section>
  );
}
