import Link from "next/link";

const subjects = [
  { title: "Luganda", region: "Central Uganda", tone: "blue" },
  { title: "Runyankole", region: "Western Uganda", tone: "orange" },
  { title: "Acholi", region: "Northern Uganda", tone: "gold" },
  { title: "Lusoga", region: "Eastern Uganda", tone: "orange" },
  { title: "Ateso", region: "North-Eastern Uganda", tone: "blue" },
  { title: "Rutooro", region: "Western Uganda", tone: "gold" },
  { title: "Lugbara", region: "West Nile", tone: "blue" },
];

export function SubjectsSection() {
  return (
    <section className="section languages-section" id="languages">
      <div className="section-inner language-home-layout">
        <div className="language-home-copy">
          <span className="section-label">Languages</span>
          <h2 className="section-title">
            The language of home belongs <span className="accent-orange">everywhere.</span>
          </h2>
          <p className="section-subtitle">
            Baby Steps is growing a joyful home for Uganda’s mother tongues—one carefully built
            language path at a time.
          </p>
          <Link className="btn-dark" href="/languages">
            Explore every language <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="language-cloud" aria-label="Languages available in Baby Steps">
          {subjects.map((subject, index) => (
            <div className={`language-chip language-chip-${subject.tone}`} key={subject.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{subject.title}</strong>
              <small>{subject.region}</small>
            </div>
          ))}
          <div className="language-chip language-chip-more">
            <span>+</span><strong>More coming</strong><small>We’re just getting started</small>
          </div>
        </div>
      </div>
    </section>
  );
}
