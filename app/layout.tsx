import type { Metadata } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import { SITE_IDENTITY } from "@/lib/site-content";
import "./globals.css";

const inter = localFont({
  src: "../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});

const manrope = localFont({
  src: "../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2",
  variable: "--font-manrope",
  weight: "200 800",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RankRise Technologies | Building Intelligence. Driving Growth.",
  description: SITE_IDENTITY.positioning,
  robots: { index: false, follow: false },
  openGraph: {
    title: SITE_IDENTITY.name,
    description: SITE_IDENTITY.positioning,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: SITE_IDENTITY.name,
    description: SITE_IDENTITY.positioning,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
