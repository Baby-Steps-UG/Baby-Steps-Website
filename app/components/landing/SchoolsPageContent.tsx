import Image from "next/image";

const roadmap = [
  { phase: "First", title: "Family app launch" },
  { phase: "Next", title: "Teacher feedback" },
  { phase: "Later", title: "Classroom pilots" },
];

export function SchoolsPageContent() {
  return (
    <>
      <section className="section school-preview-section">
        <div className="section-inner school-preview-layout">
          <div className="school-preview-copy">
            <h2>Help shape Baby Steps for schools</h2>
            <p>Teacher tools and classroom pilots are in development. A school launch date has not been set.</p>
            <a className="btn-gold" href="mailto:hello@babystepslearn.com?subject=Baby%20Steps%20for%20schools">Contact the schools team <span aria-hidden="true">→</span></a>
          </div>
          <figure className="school-preview-screen">
            <figcaption className="school-preview-stamp">Family app preview</figcaption>
            <Image src="/app_screenshots/landscape_learning_hub.png" alt="Luganda activities in the current family app" width={2400} height={1080} unoptimized />
          </figure>
        </div>
      </section>
      <section className="section school-roadmap-section">
        <div className="section-inner">
          <div className="section-heading"><h2 className="section-title">School rollout</h2></div>
          <ol className="school-coming-roadmap">
            {roadmap.map((item, index) => <li className={index === 0 ? "active" : ""} key={item.title}><span>{item.phase}</span><h3>{item.title}</h3></li>)}
          </ol>
        </div>
      </section>
    </>
  );
}
