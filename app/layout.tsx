import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import { CookiePreferencesProvider } from "./components/landing/CookiePreferences";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://babystepslearn.com"),
  title: {
    default: "Baby Steps | Luganda learning for kids",
    template: "%s | Baby Steps",
  },
  description:
    "Joyful mother-tongue learning for Ugandan children ages 3–12 through stories, games, songs, and everyday discovery.",
  keywords: [
      "Luganda learning",
    "mother tongue learning",
    "children's learning app",
    "Luganda",
  ],
  icons: {
    icon: "/profile/copy-3.jpg",
    shortcut: "/profile/copy-3.jpg",
    apple: "/profile/copy-3.jpg",
  },
  openGraph: {
    type: "website",
    locale: "en_UG",
    siteName: "Baby Steps",
    title: "Baby Steps | Luganda learning for kids",
    description: "Mother-tongue learning made joyful for Ugandan children.",
    images: [{ url: "/og.png", width: 1732, height: 909, alt: "Baby Steps Luganda learning app" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Baby Steps | Luganda learning for kids",
    description: "Mother-tongue learning made joyful for Ugandan children.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${quicksand.variable} antialiased`}>
        <CookiePreferencesProvider>{children}</CookiePreferencesProvider>
      </body>
    </html>
  );
}
