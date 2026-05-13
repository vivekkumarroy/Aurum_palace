import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Aurum Palace — Where Timeless Luxury Meets Royal Hospitality",
  description:
    "Experience unparalleled royal hospitality at The Aurum Palace. Ultra-luxury suites, Michelin-star dining, destination weddings, and world-class wellness.",
  keywords: "luxury hotel, royal suites, Michelin dining, destination wedding, spa, The Aurum Palace",
  openGraph: {
    title: "The Aurum Palace — Where Timeless Luxury Meets Royal Hospitality",
    description: "Experience unparalleled royal hospitality at The Aurum Palace.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
