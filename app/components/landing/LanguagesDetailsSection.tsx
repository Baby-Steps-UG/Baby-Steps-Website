const learningMoments = ["Listen to stories", "Practise greetings", "Play word games", "Speak with family"];

export function LanguagesDetailsSection() {
  return (
    <section className="section language-moments-section">
      <div className="section-inner">
        <div className="section-heading"><h2 className="section-title">Everyday Luganda</h2></div>
        <ol className="language-moments-grid">
          {learningMoments.map((title, index) => <li key={title}><span aria-hidden="true">0{index + 1}</span><h3>{title}</h3></li>)}
        </ol>
      </div>
    </section>
  );
}
