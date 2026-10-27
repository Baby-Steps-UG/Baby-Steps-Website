import Image from "next/image";

const dailyMoments = [
  { title: "Morning greetings", icon: "☀" },
  { title: "After-school games", icon: "✦" },
  { title: "Stories together", icon: "♡" },
];
const supports = ["Weekly activity overview", "Individual child profiles", "Age-appropriate activities", "Parent-only settings"];

export function ParentsPageContent() {
  return (
    <>
      <section className="section parent-rhythm-section">
        <div className="section-inner">
          <div className="section-heading"><h2 className="section-title">Learning at home</h2></div>
          <div className="routine-grid">
            {dailyMoments.map((moment) => <article className="routine-card" key={moment.title}><span className="routine-icon" aria-hidden="true">{moment.icon}</span><h3>{moment.title}</h3></article>)}
          </div>
        </div>
      </section>
      <section className="section parent-dashboard-section">
        <div className="section-inner parent-dashboard-layout">
          <div className="parent-dashboard-art">
            <div className="dashboard-phone"><Image src="/app_screenshots/portrait_parent_dashboard.png" alt="Baby Steps parent dashboard" width={1080} height={2400} unoptimized /></div>
          </div>
          <div className="parent-dashboard-copy">
            <h2 className="section-title">Your child’s progress</h2>
            <ul className="support-list">{supports.map((title) => <li key={title}><span aria-hidden="true">✓</span>{title}</li>)}</ul>
          </div>
        </div>
      </section>
      <section className="section promise-section">
        <div className="section-inner promise-card">
          <span className="promise-mark" aria-hidden="true">♡</span>
          <h2>Parents manage every account</h2>
          <p>Children cannot create accounts. Parents control profiles, permissions, reminders, and data choices.</p>
        </div>
      </section>
    </>
  );
}
