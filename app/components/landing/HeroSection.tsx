import Image from "next/image";

export function HeroSection() {
  return (
    <section className="hero" id="home" aria-labelledby="hero-heading">
      <div className="hero-pattern" aria-hidden="true" />
      <div className="hero-inner">
        <div className="hero-copy">
          <h1 className="hero-title" id="hero-heading">
            Your Mother Tongue
            <br />
            is Your <span>Superpower</span>
          </h1>

          <p className="hero-subtitle">
            Baby Steps is a safe, joyful learning space for Ugandan children ages 3-12 to build
            confidence in their mother tongue through stories, games, and everyday discovery.
          </p>

          <div className="app-store-button-stack left-aligned" aria-label="Download Baby Steps">
            <a
              href="#download"
              className="app-store-link-block store-badge-ios"
              aria-label="Go to waitlist for iOS"
            >
              <Image
                src="/store/app-store-badge.svg"
                alt="Download on the App Store"
                className="app-store-button app-store-button-ios"
                width={239}
                height={80}
                unoptimized
              />
            </a>

            <a
              href="#download"
              className="google-play-link-block store-badge-google"
              aria-label="Go to waitlist for Android"
            >
              <Image
                src="/store/google-play-badge.png"
                alt="Get it on Google Play"
                className="app-store-button app-store-button-google"
                width={564}
                height={168}
                unoptimized
              />
            </a>
          </div>

          <p className="hero-store-note">Coming soon on iOS and Android</p>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="mascot-wrapper">
            <div className="mascot-blob" />
            <span className="hero-spark spark-1">⭐</span>
            <span className="hero-spark spark-2">✨</span>
            <span className="hero-spark spark-3">🌟</span>

            <Image
              className="hero-mascot-image"
              src="/SVG/Mascot.svg"
              alt=""
              width={824}
              height={1080}
              unoptimized
            />
          </div>
        </div>
      </div>
    </section>
  );
}
