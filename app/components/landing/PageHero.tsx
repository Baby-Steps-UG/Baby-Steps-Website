import Image from "next/image";
import Link from "next/link";

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
  { note: string; stat: string; statLabel: string; cardTitle: string }
> = {
  parents: {
    note: "Made for real family rhythms",
    stat: "10 min",
    statLabel: "is enough for a meaningful little step",
    cardTitle: "This week’s gentle focus",
  },
  schools: {
    note: "The classroom chapter comes next",
    stat: "Soon",
    statLabel: "school pilots are part of our next chapter",
    cardTitle: "Schools interest list is open",
  },
  languages: {
    note: "Luganda first. Carefully built.",
    stat: "1 path",
    statLabel: "Luganda is where the journey begins",
    cardTitle: "More languages, over time",
  },
  about: {
    note: "Made in Uganda, with purpose",
    stat: "1 belief",
    statLabel: "every child’s first language matters",
    cardTitle: "Rooted · Joyful · Safe",
  },
  pricing: {
    note: "Clear plans are taking shape",
    stat: "Soon",
    statLabel: "family-friendly pricing before launch",
    cardTitle: "No prices published yet",
  },
};

export function PageHero({ variant, label, title, subtitle, highlights }: PageHeroProps) {
  const visual = visualCopyByVariant[variant];

  return (
    <section className={`page-hero page-hero-${variant}`} aria-labelledby="page-hero-heading">
      <div className="page-hero-inner">
        <div className="page-hero-copy">
          <div className="page-breadcrumb"><Link href="/">Home</Link><span>/</span>{label}</div>
          <span className="section-label">{label}</span>
          <h1 className="page-hero-title" id="page-hero-heading">{title}</h1>
          <p className="page-hero-subtitle">{subtitle}</p>

          <div className="hero-highlights" aria-label={`${label} highlights`}>
            {highlights.map((item) => <span key={item}>✓ {item}</span>)}
          </div>

          <Link className="btn-primary" href="/waitlist">
            Join the early explorers <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="page-hero-visual">
          <div className="page-hero-color-card">
            <p>{visual.note}</p>
            <div className="page-hero-stat"><strong>{visual.stat}</strong><span>{visual.statLabel}</span></div>
            <Image
              src="/mascot/shana-wave.png"
              alt="Shana, the Baby Steps learning companion"
              className="page-hero-shana"
              width={1097}
              height={1434}
              unoptimized
            />
          </div>
          <div className="page-hero-float-card">
            <span aria-hidden="true">✦</span>
            <p>{visual.cardTitle}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
