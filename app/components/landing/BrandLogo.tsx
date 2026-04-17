import Link from "next/link";
import Image from "next/image";

interface BrandLogoProps {
  href?: string;
  variant?: "main" | "yellow" | "blue";
  className?: string;
  showFace?: boolean;
}

const logoByVariant = {
  yellow: "/1x/Wordmark%20Yellow.png",
  blue: "/1x/Wordmark%20Blue.png",
} satisfies Record<Exclude<NonNullable<BrandLogoProps["variant"]>, "main">, string>;

export function BrandLogo({
  href = "/",
  variant = "main",
  className = "",
  showFace = true,
}: BrandLogoProps) {
  const isMainVariant = variant === "main";

  return (
    <Link className={`brand-logo ${className}`.trim()} href={href} aria-label="Baby Steps home">
      {isMainVariant ? (
        <span className="brand-logo-combo" aria-hidden="true">
          {showFace ? (
            <span className="brand-logo-face-wrap">
              <Image
                className="brand-logo-face"
                src="/profile/copy-1-transparent.png"
                alt=""
                width={800}
                height={800}
                unoptimized
              />
            </span>
          ) : null}

          <span className="brand-logo-wordmark-wrap">
            <Image
              className="brand-logo-wordmark"
              src="/profile/copy-2-transparent.png"
              alt=""
              width={800}
              height={800}
              unoptimized
            />
          </span>
        </span>
      ) : (
        <Image
          className="brand-logo-image"
          src={logoByVariant[variant]}
          alt="Baby Steps"
          width={220}
          height={90}
          unoptimized
        />
      )}
    </Link>
  );
}
