import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Baby Steps - Your Mother Tongue, Your Superpower",
  description:
    "Baby Steps is a safe and joyful space where Ugandan children begin learning in their mother tongue.",
  icons: {
    icon: "/profile/copy-2-transparent.png",
    shortcut: "/profile/copy-2-transparent.png",
    apple: "/profile/copy-2-transparent.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${quicksand.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
