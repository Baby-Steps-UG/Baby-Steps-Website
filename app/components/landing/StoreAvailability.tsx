import Image from "next/image";

export function StoreAvailability() {
  return (
    <ul className="store-availability" aria-label="App availability">
      <li>
        <Image src="/store/app-store-coming-soon.webp" alt="Coming soon on the App Store" width={2560} height={759} unoptimized />
      </li>
      <li>
        <Image src="/store/google-play-coming-soon.webp" alt="Coming soon on Google Play" width={2560} height={759} unoptimized />
      </li>
    </ul>
  );
}
