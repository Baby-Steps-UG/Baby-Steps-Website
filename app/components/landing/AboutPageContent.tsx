const coreValues = [
  { marker: "R", title: "Rooted", detail: "Ugandan language, sound, story, and everyday life are the starting point—not decoration." },
  { marker: "J", title: "Joyful", detail: "Learning should feel like play. We celebrate every honest attempt and every small win." },
  { marker: "S", title: "Safe", detail: "Children explore calmly in a space designed for their age, attention, and wellbeing." },
  { marker: "E", title: "Empowering", detail: "Every language is treated as a strength and every child’s identity as something worth seeing." },
  { marker: "C", title: "Credible", detail: "Warm on the surface, thoughtful underneath, and built to earn long-term trust." },
];

export function AboutPageContent() {
  return (
    <>
      <section className="section origin-section">
        <div className="section-inner origin-layout">
          <div><span className="section-label">Why we began</span><h2 className="section-title">A first language is never “just” a language.</h2></div>
          <div className="origin-story"><p>It is the voice of a grandparent. The rhythm of a market. The joke that only lands at home. It is identity, confidence, and belonging.</p><p>Baby Steps began with a simple conviction: Ugandan children deserve learning experiences that reflect that richness back to them.</p></div>
        </div>
        <div className="section-inner belief-banner"><span>We don’t import a foreign idea of childhood.</span><strong>We reflect the one that already exists here.</strong></div>
      </section>

      <section className="section values-section">
        <div className="section-inner">
          <div className="section-heading split-heading"><div><span className="section-label">What guides us</span><h2 className="section-title">Five values. One clear direction.</h2></div><p className="section-subtitle">Every screen, story, and partnership should feel recognisably Baby Steps.</p></div>
          <div className="values-list">
            {coreValues.map((value, index) => <article key={value.title}><span>{value.marker}</span><h3>{value.title}</h3><p>{value.detail}</p><small>0{index + 1}</small></article>)}
          </div>
        </div>
      </section>

      <section className="section audience-section">
        <div className="section-inner audience-grid">
          <div className="audience-intro"><span className="section-label section-label-light">Built together</span><h2>Children at the centre. Grown-ups beside them.</h2></div>
          <article><span>For children</span><h3>“I can do this.”</h3><p>A companion for curiosity, listening, speaking, and early reading without fear of mistakes.</p></article>
          <article><span>For parents</span><h3>“I know what comes next.”</h3><p>A practical way to protect language identity while supporting a joyful learning rhythm.</p></article>
          <article><span>For teachers</span><h3>“This fits my classroom.”</h3><p>A familiar, flexible tool for foundational literacy and language confidence at scale.</p></article>
        </div>
      </section>
    </>
  );
}
