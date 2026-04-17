type PageHeroVariant = "parents" | "schools" | "languages" | "about" | "pricing";

interface PageHeroProps {
  variant: PageHeroVariant;
  label: string;
  title: string;
  subtitle: string;
  highlights: string[];
}

const visualCopyByVariant: Record<
  PageHeroVariant,
  {
    ribbon: string;
    cards: [string, string, string];
  }
> = {
  parents: {
    ribbon: "Family Rhythm",
    cards: ["Daily 10-min routines", "At-home parent prompts", "Progress you can read fast"],
  },
  schools: {
    ribbon: "Classroom Ready",
    cards: ["Term setup in minutes", "Teacher guided playlists", "Group progress snapshots"],
  },
  languages: {
    ribbon: "Language Paths",
    cards: ["Audio-first vocabulary", "Story and game loops", "Built for Ugandan contexts"],
  },
  about: {
    ribbon: "Made In Uganda",
    cards: ["Culturally rooted design", "Joyful early learning", "Built with families and schools"],
  },
  pricing: {
    ribbon: "Simple Plans",
    cards: ["Family tiers", "School licenses", "Supportive onboarding"],
  },
};

export function PageHero({ variant, label, title, subtitle, highlights }: PageHeroProps) {
  const visual = visualCopyByVariant[variant];

  return (
    <section className={`hero page-hero page-hero-${variant}`} aria-labelledby="page-hero-heading">
      <div className="hero-pattern" aria-hidden="true" />
      <div className="hero-inner">
        <div className="hero-copy">
          <span className="section-label page-hero-label">{label}</span>
          <h1 className="hero-title" id="page-hero-heading">
            {title}
          </h1>

          <p className="hero-subtitle">{subtitle}</p>

          <div className="hero-highlights" aria-label={`${label} highlights`}>
            {highlights.map((item) => (
              <span className="hero-highlight-pill" key={item}>
                {item}
              </span>
            ))}
          </div>

          <a className="btn-primary page-hero-cta" href="#download">
            Join Waitlist
          </a>
        </div>

        <div className="hero-visual page-hero-visual" aria-hidden="true">
          <div className="page-hero-art">
            <div className="page-hero-orbit page-hero-orbit-a" />
            <div className="page-hero-orbit page-hero-orbit-b" />
            <div className="page-hero-orbit page-hero-orbit-c" />

            <span className="page-hero-ribbon">{visual.ribbon}</span>

            <div className="page-hero-panel-grid">
              {visual.cards.map((card) => (
                <span className="page-hero-panel" key={card}>
                  {card}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
