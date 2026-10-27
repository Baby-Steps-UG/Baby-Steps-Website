import Image from "next/image";
import Link from "next/link";
import { StoreAvailability } from "./StoreAvailability";

export function HeroSection() {
  return (
    <section className="hero" id="home" aria-labelledby="hero-heading">
      <div className="hero-doodle hero-doodle-one" aria-hidden="true">∿</div>
      <div className="hero-doodle hero-doodle-two" aria-hidden="true">✦</div>

      <div className="hero-inner">
        <div className="hero-copy">
          <h1 className="hero-title" id="hero-heading">
            Luganda learning<br />
            <span>for kids.</span>
          </h1>

          <div className="cta-row">
            <Link className="btn-primary" href="/waitlist">
              Join the waitlist <span aria-hidden="true">→</span>
            </Link>
            <a className="hero-text-link" href="#inside-baby-steps">
              Explore the app <span aria-hidden="true">↓</span>
            </a>
          </div>
          <StoreAvailability />
        </div>

        <div className="hero-visual">
          <div className="hero-stage">
            <div className="hero-sun" aria-hidden="true" />
            <div className="hero-speech" aria-label="Shana says Oli otya?">
              <strong lang="lg">Oli otya?</strong>
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
            <div className="hero-ground" aria-hidden="true">
              <i /><i /><i /><i /><i />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
