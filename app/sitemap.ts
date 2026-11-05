import type { MetadataRoute } from "next";
import { SITE_ROUTES, routeHref } from "@/lib/routes";
import { siteConfig } from "@/lib/seo/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  return SITE_ROUTES.map((route) => {
    const isHome = route.path === "/";
    return {
      url: `${siteConfig.url}${routeHref(route.path)}`,
      lastModified: currentDate,
      changeFrequency: isHome ? "weekly" : "monthly",
      priority: isHome ? 1.0 : 0.7,
    };
  });
}
