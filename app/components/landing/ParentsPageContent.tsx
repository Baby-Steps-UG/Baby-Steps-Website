import Image from "next/image";

const dailyMoments = [
  { time: "07:10", title: "A word before school", detail: "Try a five-minute greeting or sound game while the morning is still quiet.", icon: "☀" },
  { time: "16:30", title: "Play after school", detail: "Choose one guided game and let repetition do its gentle work.", icon: "✦" },
  { time: "SAT", title: "A story together", detail: "Listen, laugh, and bring new words into real family conversation.", icon: "♡" },
];

const parentSupports = [
  { marker: "A", title: "See the week clearly", detail: "Know what your child completed, enjoyed, and may want to practise next." },
  { marker: "B", title: "Keep activities age-fit", detail: "Younger children stay encouraged while growing learners keep finding new challenges." },
  { marker: "C", title: "Stay safe and in control", detail: "Parent-only areas, gentle language, and no targeted advertising to children." },
  { marker: "D", title: "Bring learning home", detail: "Activities reflect everyday Ugandan sounds, stories, places, and family moments." },
];

export function ParentsPageContent() {
  return (
    <>
      <section className="section parent-rhythm-section">
        <div className="section-inner">
          <div className="section-heading split-heading">
            <div><span className="section-label">A day with Baby Steps</span><h2 className="section-title">Little moments add up.</h2></div>
            <p className="section-subtitle">No complicated schedules. Baby Steps meets your family in the time you already have.</p>
          </div>

          <div className="routine-grid">
            {dailyMoments.map((moment) => (
              <article className="routine-card" key={moment.title}>
                <div className="routine-meta"><span>{moment.time}</span><i>{moment.icon}</i></div>
                <h3>{moment.title}</h3><p>{moment.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section parent-dashboard-section">
        <div className="section-inner parent-dashboard-layout">
          <div className="parent-dashboard-art">
            <div className="dashboard-phone">
              <Image src="/app_screenshots/portrait_parent_dashboard.png" alt="Baby Steps parent dashboard" width={1080} height={2400} unoptimized />
            </div>
            <div className="dashboard-note"><strong>3 little wins</strong><span>to celebrate this week</span></div>
          </div>
          <div className="parent-dashboard-copy">
            <span className="section-label">The grown-up view</span>
            <h2 className="section-title">Know what to cheer for.</h2>
            <p className="section-subtitle">Progress should feel useful, not overwhelming. See clear signals, then get back to the part that matters: encouragement.</p>
            <div className="support-list">
              {parentSupports.map((support) => (
                <article key={support.title}><span>{support.marker}</span><div><h3>{support.title}</h3><p>{support.detail}</p></div></article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section promise-section">
        <div className="section-inner promise-card">
          <span className="promise-mark" aria-hidden="true">♡</span>
          <div><p className="section-label">Our family promise</p><h2>Safe by design. Gentle by default.</h2></div>
          <p>Children cannot create their own accounts. Grown-ups stay in control of profiles, permissions, reminders, and data choices.</p>
        </div>
      </section>
    </>
  );
}
