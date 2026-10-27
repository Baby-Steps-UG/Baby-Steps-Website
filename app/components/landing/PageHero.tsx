import Image from "next/image";
import Link from "next/link";

interface PageHeroProps {
  variant: "parents" | "schools" | "languages" | "about" | "pricing";
  label: string;
  title: string;
  highlights: string[];
}

export function PageHero({ variant, label, title, highlights }: PageHeroProps) {
  return (
    <section className={`page-hero page-hero-${variant}`} aria-labelledby="page-hero-heading">
      <div className="page-hero-inner">
        <div className="page-hero-copy">
          <nav className="page-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">{label}</span></nav>
          <h1 className="page-hero-title" id="page-hero-heading">{title}</h1>
          <ul className="hero-highlights" aria-label={`${label} features`}>
            {highlights.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <Link className="btn-primary" href="/waitlist">Join the waitlist <span aria-hidden="true">→</span></Link>
        </div>
        <div className="page-hero-visual" aria-hidden="true">
          <div className="page-hero-color-card">
            <Image src="/mascot/shana-wave.png" alt="" className="page-hero-shana" width={1097} height={1434} unoptimized />
          </div>
        </div>
      </div>
    </section>
  );
}
