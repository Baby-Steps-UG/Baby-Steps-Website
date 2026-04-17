interface NavPageIntroProps {
  label: string;
  title: string;
  description: string;
}

export function NavPageIntro({ label, title, description }: NavPageIntroProps) {
  return (
    <section className="section nav-page-intro">
      <div className="section-inner">
        <div className="section-heading centered">
          <span className="section-label">{label}</span>
          <h1 className="section-title centered">{title}</h1>
          <p className="section-subtitle centered">{description}</p>
        </div>
      </div>
    </section>
  );
}
