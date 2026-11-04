export type RouteCategory = "corporate" | "case-studies-index" | "service" | "capability" | "product" | "industry" | "solution" | "legal";
export type RouteProvenance = "report-url" | "previous-proposal" | "task-selected";

export type SiteRoute = {
  label: string;
  path: `/${string}`;
  category: RouteCategory;
  provenance: RouteProvenance;
  sourceLiteral?: `/${string}`;
} & (
  | { status: "live"; contentReady: true }
  | { status: "under-construction"; contentReady: false }
);

function construction<const Path extends `/${string}`>(label: string, path: Path, category: RouteCategory, provenance: RouteProvenance) {
  return {
    label, path, category, provenance,
    ...(provenance === "report-url" ? { sourceLiteral: path } : {}),
    status: "under-construction", contentReady: false,
  } as const;
}

// Finite, user-approved LOCAL scaffold: one live homepage and 52 construction pages.
// The first 22 paths retain the report's literal URL order; approval is not content readiness.
export const SITE_ROUTES = [
  { label: "Home", path: "/", category: "corporate", provenance: "report-url", sourceLiteral: "/", status: "live", contentReady: true },
  construction("About Us", "/about-us/", "corporate", "report-url"),
  construction("Services", "/services/", "corporate", "report-url"),
  construction("Custom Software Development", "/services/custom-software-development/", "service", "report-url"),
  construction("AI & ML Development", "/services/ai-ml-development/", "service", "report-url"),
  construction("Web Development", "/services/web-development/", "service", "report-url"),
  construction("Mobile App Development", "/services/mobile-app-development/", "service", "report-url"),
  construction("SaaS Development", "/services/saas-development/", "service", "report-url"),
  construction("Industries", "/industries/", "corporate", "report-url"),
  construction("Healthcare", "/industries/healthcare/", "industry", "report-url"),
  construction("Fintech", "/industries/fintech/", "industry", "report-url"),
  construction("Products", "/products/", "corporate", "report-url"),
  construction("TriMarkity", "/products/trimarkity/", "product", "report-url"),
  construction("1SocialSnap", "/products/1socialsnap/", "product", "report-url"),
  construction("SalesApp", "/products/salesapp/", "product", "report-url"),
  construction("HRMS", "/products/hrms/", "product", "report-url"),
  construction("Technologies", "/technologies/", "corporate", "report-url"),
  construction("Our Work / Portfolio", "/portfolio/", "corporate", "report-url"),
  construction("Case Studies", "/case-studies/", "case-studies-index", "report-url"),
  construction("Insights", "/insights/", "corporate", "report-url"),
  construction("Meet the Team", "/meet the team", "corporate", "report-url"),
  construction("Contact", "/contact/", "corporate", "report-url"),

  // Seven existing proposals, now selected for local scaffolding without changing their slugs.
  construction("Solutions", "/solutions/", "corporate", "previous-proposal"),
  construction("Cloud & DevOps", "/services/cloud-devops/", "service", "previous-proposal"),
  construction("Digital Transformation", "/services/digital-transformation/", "capability", "previous-proposal"),
  construction("Careers", "/careers/", "corporate", "previous-proposal"),
  construction("Privacy Policy", "/privacy/", "legal", "previous-proposal"),
  construction("Terms & Conditions", "/terms/", "legal", "previous-proposal"),
  construction("Cookie Policy", "/cookies/", "legal", "previous-proposal"),

  // Report-listed pages/themes with slugs selected by the new routing request, not §14 literals.
  construction("AI & Emerging Technologies", "/ai-emerging-technologies/", "corporate", "task-selected"),
  construction("Generative AI Development", "/services/generative-ai-development/", "service", "task-selected"),
  construction("CRM & ERP Development", "/services/crm-erp-development/", "service", "task-selected"),
  construction("UI/UX Design", "/services/ui-ux-design/", "service", "task-selected"),
  construction("API & System Integration", "/services/api-system-integration/", "service", "task-selected"),
  construction("Data Engineering & Analytics", "/services/data-engineering-analytics/", "service", "task-selected"),
  construction("Maintenance & Support", "/services/maintenance-support/", "service", "task-selected"),
  construction("Retail & E-commerce", "/industries/retail-ecommerce/", "industry", "task-selected"),
  construction("Manufacturing", "/industries/manufacturing/", "industry", "task-selected"),
  construction("Education", "/industries/education/", "industry", "task-selected"),
  construction("Real Estate", "/industries/real-estate/", "industry", "task-selected"),
  construction("Logistics", "/industries/logistics/", "industry", "task-selected"),
  construction("SaaS & Technology", "/industries/saas-technology/", "industry", "task-selected"),
  construction("Hospitality", "/industries/hospitality/", "industry", "task-selected"),
  construction("Professional Services", "/industries/professional-services/", "industry", "task-selected"),
  construction("Enterprise Business Platforms", "/solutions/enterprise-platforms/", "solution", "task-selected"),
  construction("CRM", "/solutions/crm/", "solution", "task-selected"),
  construction("HR Management", "/solutions/hr-management/", "solution", "task-selected"),
  construction("Sales Automation", "/solutions/sales-automation/", "solution", "task-selected"),
  construction("Marketing Automation", "/solutions/marketing-automation/", "solution", "task-selected"),
  construction("Workflow Automation", "/solutions/workflow-automation/", "solution", "task-selected"),
  construction("AI-powered Business Intelligence", "/solutions/ai-business-intelligence/", "solution", "task-selected"),
  construction("Custom Portals", "/solutions/custom-portals/", "solution", "task-selected"),
  construction("Digital Transformation", "/solutions/digital-transformation/", "solution", "task-selected"),
] as const satisfies readonly SiteRoute[];

export type CatalogRoute = (typeof SITE_ROUTES)[number];
export type SitePath = CatalogRoute["path"];
export type UnderConstructionRoute = Extract<CatalogRoute, { status: "under-construction" }>;

export const UNDER_CONSTRUCTION_ROUTES = SITE_ROUTES.filter((route): route is UnderConstructionRoute => route.status === "under-construction");

// The literal-space team URL has a specific static wrapper; do not also generate it through the catch-all.
export const STATIC_CONSTRUCTION_ROUTES = UNDER_CONSTRUCTION_ROUTES.filter((route) => route.path === "/meet the team");
export const CATCH_ALL_CONSTRUCTION_ROUTES = UNDER_CONSTRUCTION_ROUTES.filter((route) => route.path !== "/meet the team");

// Compatibility names now describe provenance subsets, not unbuilt-route/temporary-bridge facts.
export const FUTURE_ROUTES = SITE_ROUTES.filter((route) => route.provenance === "report-url").map((route) => ({ ...route, intendedPath: route.path }));
export const PROPOSED_ROUTES = SITE_ROUTES.filter((route) => route.provenance === "previous-proposal").map((route) => ({ ...route, intendedPath: route.path }));

export function routeHref(path: SitePath): string {
  return encodeURI(path);
}

export function routeSegments(path: SitePath): string[] {
  return path === "/" ? [] : path.slice(1).replace(/\/$/, "").split("/");
}

export function getSiteRoute(path: string): CatalogRoute | undefined {
  try {
    const decoded = decodeURI(path);
    if (!decoded.startsWith("/") || decoded.startsWith("//")) return undefined;
    const normalized = decoded === "/" ? "/" : decoded.replace(/\/$/, "");
    return SITE_ROUTES.find((route) => (route.path.replace(/\/$/, "") || "/") === normalized);
  } catch {
    return undefined;
  }
}

// Next supplies decoded segments. Compare them directly: do not decode twice or merge encoded slashes.
export function getSiteRouteBySlug(slug: readonly string[]): CatalogRoute | undefined {
  return SITE_ROUTES.find((route) => {
    const segments = routeSegments(route.path);
    return segments.length === slug.length && segments.every((segment, index) => segment === slug[index]);
  });
}

export const ROUTE_APPROVAL_NOTES = [
  "Preserve the source literal '/meet the team'. Replacing it with '/meet-the-team/' requires an explicit approval decision; it has not been silently normalized.",
  "The user approved 53 local-preview URLs: the live homepage and 52 under-construction pages. Source URL provenance is retained; selected slugs do not establish ready content or public-launch approval.",
  "Digital Transformation at '/services/digital-transformation/' is a retained capability proposal, not a thirteenth report service category.",
  "A public domain, canonical URLs, launch robots policy and sitemap require approval before public deployment.",
] as const;
