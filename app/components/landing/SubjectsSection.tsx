const subjects = [
  {
    title: "🗣️ Luganda",
    tone: "blue",
  },
  {
    title: "🗣️ Runyankole",
    tone: "orange",
  },
  {
    title: "🗣️ Acholi",
    tone: "gold",
  },
  {
    title: "🗣️ Lusoga",
    tone: "blue",
  },
  {
    title: "🗣️ Ateso",
    tone: "orange",
  },
  {
    title: "🗣️ Rutooro",
    tone: "gold",
  },
  {
    title: "🗣️ Lugbara",
    tone: "blue",
  },
  {
    title: "🗣️ More coming...",
    tone: "orange",
  },
];

export function SubjectsSection() {
  return (
    <section className="section languages-section" id="languages">
      <div className="section-inner">
        <div className="section-heading centered">
          <span className="section-label">Languages</span>
          <h2 className="section-title">
            Uganda&apos;s languages, <span className="accent-orange">celebrated</span>
          </h2>
          <p className="section-subtitle">
            We believe every child deserves to learn in the language of their heart.
          </p>
        </div>

        <div className="lang-pills">
          {subjects.map((subject) => (
            <span className={`lang-pill ${subject.tone}`} key={subject.title}>
              {subject.title}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
