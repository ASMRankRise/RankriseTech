import type { Metadata } from "next";
import { siteConfig } from "./site-config";

export interface MetadataOptions {
  title?: string;
  description?: string;
  canonical?: string;
  noIndex?: boolean;
  type?: "website" | "article";
  image?: string;
}

/**
 * Construct centralized, reusable Next.js metadata objects.
 * Supports canonical URLs, Open Graph, Twitter/X cards, and robots directives.
 */
export function constructMetadata({
  title,
  description = siteConfig.defaultDescription,
  canonical,
  noIndex = false,
  type = "website",
  image,
}: MetadataOptions = {}): Metadata {
  const fullTitle = title
    ? `${title} | ${siteConfig.name}`
    : siteConfig.defaultTitle;

  const canonicalUrl = canonical
    ? `${siteConfig.url}${canonical.startsWith("/") ? canonical : `/${canonical}`}`
    : undefined;

  const ogImages = image
    ? [{ url: image.startsWith("http") ? image : `${siteConfig.url}${image}` }]
    : undefined;

  return {
    title: fullTitle,
    description,
    alternates: canonicalUrl ? { canonical: canonicalUrl } : undefined,
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: fullTitle,
      description,
      type,
      siteName: siteConfig.name,
      url: canonicalUrl || siteConfig.url,
      images: ogImages,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: fullTitle,
      description,
      site: siteConfig.social.twitter,
      images: ogImages ? [ogImages[0].url] : undefined,
    },
  };
}
