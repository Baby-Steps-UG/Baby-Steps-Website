interface NavPageIntroProps {
  title: string;
}

export function NavPageIntro({ title }: NavPageIntroProps) {
  return (
    <section className="section nav-page-intro">
      <div className="section-inner">
        <div className="section-heading centered">
          <h1 className="section-title centered">{title}</h1>
        </div>
      </div>
    </section>
  );
}
