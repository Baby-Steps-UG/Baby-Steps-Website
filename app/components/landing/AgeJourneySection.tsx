const valueProps = [
  {
    marker: "01",
    eyebrow: "Meet them where they are",
    title: "Made for every little learner",
    description:
      "Children build language, literacy, and numeracy foundations through playful activities designed for Ugandan learners from age 3 to 12.",
    note: "Age-aware paths · Gentle pacing",
    tone: "blue",
  },
  {
    marker: "02",
    eyebrow: "Play is serious learning",
    title: "Joy first. Progress follows.",
    description:
      "Guided by friendly characters, children explore stories, songs, and mini-games that make learning feel exciting and familiar.",
    note: "Stories · Songs · Games",
    tone: "orange",
  },
  {
    marker: "03",
    eyebrow: "One family, many rhythms",
    title: "Fits into real family life",
    description:
      "Start with a few minutes at home, build a classroom rhythm, and see clear progress as confidence grows one word at a time.",
    note: "At home now · Classroom vision ahead",
    tone: "gold",
  },
];

export function AgeJourneySection() {
  return (
    <section className="section value-prop-section" id="why-baby-steps">
      <div className="section-inner">
        <div className="section-heading split-heading value-prop-intro">
          <div>
            <span className="section-label">Why Baby Steps</span>
            <h2 className="section-title">
              Built for the whole <span className="accent-orange">learning journey.</span>
            </h2>
          </div>
          <p className="section-subtitle">
            Warm enough for a first word. Rich enough for a growing reader. Always rooted in
            Ugandan culture.
          </p>
        </div>

        <div className="value-card-grid">
          {valueProps.map((value) => (
            <article className={`value-card value-card-${value.tone}`} key={value.title}>
              <div className="value-card-topline">
                <span className="value-card-marker">{value.marker}</span>
                <span className="value-card-doodle" aria-hidden="true">✦</span>
              </div>
              <p className="value-card-eyebrow">{value.eyebrow}</p>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
              <span className="value-card-note">{value.note}</span>
            </article>
          ))}
        </div>

        <div className="credibility-strip">
          <p><strong>Playful on the surface.</strong> Thoughtful underneath.</p>
          <div>
            <span>Educator-informed</span>
            <span>Child-safe by design</span>
            <span>Classroom vision ahead</span>
          </div>
        </div>
      </div>
    </section>
  );
}
