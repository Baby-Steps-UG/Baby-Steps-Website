import Image from "next/image";

const schoolPrinciples = [
  {
    marker: "Listen",
    title: "Start with teachers",
    detail: "Understand classroom routines, device realities, and what genuinely saves a teacher time.",
  },
  {
    marker: "Learn",
    title: "Pilot before promising",
    detail: "Try the experience in focused settings, observe carefully, and improve what does not fit.",
  },
  {
    marker: "Build",
    title: "Keep language central",
    detail: "Shape a Luganda-first classroom experience where the tool supports teaching rather than distracting from it.",
  },
];

const roadmap = [
  { phase: "Now", title: "Family launch", detail: "Make the Luganda learning path strong for children and parents first." },
  { phase: "Next", title: "School conversations", detail: "Listen to teachers and school leaders who want to help shape the classroom experience." },
  { phase: "Later", title: "Thoughtful pilots", detail: "Test the right classroom model before wider school availability." },
];

export function SchoolsPageContent() {
  return (
    <>
      <section className="section schools-coming-intro">
        <div className="section-inner">
          <div className="schools-coming-banner">
            <span className="coming-orbit" aria-hidden="true"><i /><i /><i /></span>
            <div>
              <span className="section-label">Not available yet</span>
              <h2>The school experience deserves its own careful chapter.</h2>
            </div>
            <p>
              We’re not presenting the family app as a finished classroom product. We’re taking
              time to understand what teachers, learners, and school leaders actually need.
            </p>
          </div>

          <div className="school-principle-grid">
            {schoolPrinciples.map((principle, index) => (
              <article key={principle.title}>
                <div><span>0{index + 1}</span><small>{principle.marker}</small></div>
                <h3>{principle.title}</h3>
                <p>{principle.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section school-preview-section">
        <div className="section-inner school-preview-layout">
          <div className="school-preview-copy">
            <span className="section-label section-label-light">A glimpse of the direction</span>
            <h2>Joyful enough for a child. Useful enough for a teacher.</h2>
            <p>
              The same clear activities and culturally familiar learning moments can become a
              strong classroom foundation—but teacher tools, group progress, and onboarding are
              still being shaped.
            </p>
            <a className="btn-gold" href="mailto:hello@babystepslearn.com?subject=I%27m%20interested%20in%20Baby%20Steps%20for%20schools">
              Join the schools interest list <span aria-hidden="true">→</span>
            </a>
          </div>
          <div className="school-preview-screen">
            <span className="school-preview-stamp">Product direction · Not the final school experience</span>
            <Image
              src="/app_screenshots/landscape_learning_hub.png"
              alt="A Baby Steps Luganda learning activity showing the visual direction for a future classroom experience"
              width={2400}
              height={1080}
              unoptimized
            />
          </div>
        </div>
      </section>

      <section className="section school-roadmap-section">
        <div className="section-inner">
          <div className="section-heading split-heading">
            <div><span className="section-label">The road to classrooms</span><h2 className="section-title">No rushed rollout. No empty promises.</h2></div>
            <p className="section-subtitle">A simple direction—not a launch-date promise—showing how we hope to grow from families into schools.</p>
          </div>
          <div className="school-coming-roadmap">
            {roadmap.map((item, index) => (
              <article className={index === 0 ? "active" : ""} key={item.title}>
                <span>{item.phase}</span><h3>{item.title}</h3><p>{item.detail}</p>
              </article>
            ))}
          </div>

          <div className="school-interest-card">
            <div><span>For teachers & school leaders</span><h3>Want to help us build the right thing?</h3><p>Tell us about your school, your language-learning goals, and the classroom reality we should understand.</p></div>
            <a href="mailto:hello@babystepslearn.com?subject=Help%20shape%20Baby%20Steps%20for%20schools">Start a conversation <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>
    </>
  );
}
