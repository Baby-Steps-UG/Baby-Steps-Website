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
    icon: "/profile/copy-3.jpg",
    shortcut: "/profile/copy-3.jpg",
    apple: "/profile/copy-3.jpg",
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
