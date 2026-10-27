const features = [
  { title: "Stories, songs & games", tone: "blue", icon: "Aa" },
  { title: "10-minute sessions", tone: "orange", icon: "10" },
  { title: "Parent progress tracking", tone: "gold", icon: "✓" },
];

export function AgeJourneySection() {
  return (
    <section className="section value-prop-section" id="why-baby-steps">
      <div className="section-inner">
        <div className="section-heading"><h2 className="section-title">Learning for ages 3–12</h2></div>
        <div className="value-card-grid">
          {features.map((feature) => (
            <article className={`value-card value-card-${feature.tone}`} key={feature.title}>
              <span className="value-card-marker" aria-hidden="true">{feature.icon}</span>
              <h3>{feature.title}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
