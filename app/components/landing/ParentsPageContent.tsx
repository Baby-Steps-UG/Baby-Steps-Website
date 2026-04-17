const dailyMoments = [
  {
    title: "Before school",
    detail:
      "Open a 5-minute warm-up with greetings, sounds, and quick word practice to start the day with confidence.",
  },
  {
    title: "After school",
    detail:
      "Let your child play one guided game and one short story. It feels like fun, but it reinforces reading and listening.",
  },
  {
    title: "Weekend family time",
    detail:
      "Use family challenges to practice together, celebrate small wins, and keep mother tongue learning alive at home.",
  },
];

const parentSupports = [
  {
    title: "Clear progress at a glance",
    detail:
      "See what your child completed this week, what they enjoyed, and what to practice next without digging through menus.",
  },
  {
    title: "Age-fit activities",
    detail:
      "Content is tailored for ages 3-12, so younger children stay encouraged and older learners stay challenged.",
  },
  {
    title: "A safe, gentle space",
    detail:
      "Learning is playful and culturally familiar with no pressure-based language. Children feel seen, not judged.",
  },
  {
    title: "Rooted in Ugandan life",
    detail:
      "Stories, examples, and sounds reflect everyday moments children already know from home, school, and community.",
  },
];

export function ParentsPageContent() {
  return (
    <>
      <section className="section themed-section">
        <div className="section-inner">
          <div className="section-heading centered">
            <span className="section-label">For Everyday Life</span>
            <h2 className="section-title centered">Built around real family routines</h2>
            <p className="section-subtitle centered">
              Baby Steps fits naturally into your day, whether you have five minutes or a full
              learning session.
            </p>
          </div>

          <div className="info-card-grid three-up">
            {dailyMoments.map((moment) => (
              <article className="info-card" key={moment.title}>
                <h3 className="info-card-title">{moment.title}</h3>
                <p className="info-card-copy">{moment.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="section-heading centered">
            <span className="section-label">Parent Support</span>
            <h2 className="section-title centered">Tools that make your role easier</h2>
            <p className="section-subtitle centered">
              You stay in control of the journey while your child stays motivated.
            </p>
          </div>

          <div className="info-card-grid two-up">
            {parentSupports.map((support) => (
              <article className="info-card" key={support.title}>
                <h3 className="info-card-title">{support.title}</h3>
                <p className="info-card-copy">{support.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
