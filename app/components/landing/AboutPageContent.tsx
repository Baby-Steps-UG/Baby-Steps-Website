const values = ["Ugandan languages & culture", "Learning through play", "Child safety", "Family involvement"];

export function AboutPageContent() {
  return (
    <>
      <section className="section origin-section">
        <div className="section-inner origin-layout">
          <h2 className="section-title">Why Baby Steps exists</h2>
          <div className="origin-story"><p>Baby Steps helps Ugandan children learn the language they share with family. We’re starting with Luganda, through stories, games, and everyday conversation.</p></div>
        </div>
      </section>
      <section className="section values-section">
        <div className="section-inner">
          <div className="section-heading"><h2 className="section-title">Our priorities</h2></div>
          <ol className="values-list">{values.map((title, index) => <li key={title}><span aria-hidden="true">0{index + 1}</span><h3>{title}</h3></li>)}</ol>
        </div>
      </section>
    </>
  );
}
