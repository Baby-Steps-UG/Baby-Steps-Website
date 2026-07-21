import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="hero" id="home" aria-labelledby="hero-heading">
      <div className="hero-doodle hero-doodle-one" aria-hidden="true">∿</div>
      <div className="hero-doodle hero-doodle-two" aria-hidden="true">✦</div>

      <div className="hero-inner">
        <div className="hero-copy">
          <p className="hero-eyebrow"><span /> Made in Uganda · Built for ages 3–12</p>
          <h1 className="hero-title" id="hero-heading">
            Small steps.<br />
            <span>Big roots.</span>
          </h1>

          <p className="hero-subtitle">
            A joyful learning app where Ugandan children grow confident in the language of home—
            through stories, games, songs, and everyday discovery.
          </p>

          <div className="cta-row">
            <Link className="btn-primary" href="/waitlist">
              Join the early explorers <span aria-hidden="true">→</span>
            </Link>
            <a className="hero-text-link" href="#inside-baby-steps">
              See how children learn <span aria-hidden="true">↓</span>
            </a>
          </div>

          <div className="hero-trust-row" aria-label="Baby Steps benefits">
            <span><b>7</b> Ugandan languages</span>
            <span><b>10 min</b> playful sessions</span>
            <span><b>0</b> ads for children</span>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-stage">
            <div className="hero-sun" aria-hidden="true" />
            <div className="hero-speech" aria-label="Shana says Oli otya?">
              <span>Shana says</span>
              <strong>Oli otya?</strong>
            </div>
            <Image
              className="hero-mascot-image"
              src="/mascot/shana-wave.png"
              alt="Shana, the Baby Steps mascot, waving and carrying a storybook"
              width={1097}
              height={1434}
              priority
              unoptimized
            />
            <div className="hero-mini-card hero-mini-card-left" aria-hidden="true">
              <span className="mini-card-icon">Aa</span>
              <p><strong>Words that feel</strong><br />like home</p>
            </div>
            <div className="hero-mini-card hero-mini-card-right" aria-hidden="true">
              <span className="mini-card-check">✓</span>
              <p><strong>Little win!</strong><br />3 words mastered</p>
            </div>
            <div className="hero-ground" aria-hidden="true">
              <i /><i /><i /><i /><i />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
