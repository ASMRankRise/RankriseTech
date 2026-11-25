import type { Metadata } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import { SITE_IDENTITY } from "@/lib/site-content";
import { OrganizationSchema, WebSiteSchema } from "@/lib/seo/structured-data";
import { FloatingActions } from "@/components/floating-actions";
import { ChatWidget } from "@/components/chat-widget";
import { CookieBanner } from "@/components/cookie-banner";
import { Analytics } from "@/components/analytics";
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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.rankrisetech.in"),
  title: {
    default: `${SITE_IDENTITY.name} | ${SITE_IDENTITY.tagline}`,
    template: `%s | ${SITE_IDENTITY.name}`,
  },
  description: SITE_IDENTITY.positioning,
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: `${SITE_IDENTITY.name} | ${SITE_IDENTITY.tagline}`,
    description: SITE_IDENTITY.positioning,
    type: "website",
    siteName: SITE_IDENTITY.name,
    images: [{ url: "/og-image.svg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_IDENTITY.name} | ${SITE_IDENTITY.tagline}`,
    description: SITE_IDENTITY.positioning,
    images: ["/og-image.svg"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="light"
      data-hero-theme="light"
      data-accent="vermilion"
      className={`${inter.variable} ${manrope.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap"
        />
        <OrganizationSchema />
        <WebSiteSchema />
      </head>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        {children}
        <FloatingActions />
        <ChatWidget />
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  );
}
