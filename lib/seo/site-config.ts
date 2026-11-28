import { SITE_IDENTITY } from "@/lib/site-content";

export const siteConfig = {
  name: SITE_IDENTITY.name,
  legalIndia: SITE_IDENTITY.legalIndia,
  legalUs: SITE_IDENTITY.legalUs,
  positioning: SITE_IDENTITY.positioning,
  tagline: SITE_IDENTITY.tagline,
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.rankrisetech.in",
  phone: SITE_IDENTITY.phone,
  phoneHref: SITE_IDENTITY.phoneHref,
  email: SITE_IDENTITY.email,
  address: SITE_IDENTITY.address,
  defaultTitle: `${SITE_IDENTITY.name} | ${SITE_IDENTITY.tagline}`,
  titleTemplate: `%s | ${SITE_IDENTITY.name}`,
  defaultDescription: SITE_IDENTITY.positioning,
  social: {
    twitter: "@rankrisetech",
  },
} as const;

export type SiteConfig = typeof siteConfig;
