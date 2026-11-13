export type RouteCategory =
  | "corporate"
  | "service"
  | "product"
  | "industry"
  | "location"
  | "insight"
  | "legal"
  | "utility";

export type RouteProvenance = "approved-live" | "report-url" | "task-selected";

export type SiteRoute = {
  label: string;
  path: `/${string}`;
  category: RouteCategory;
  provenance?: RouteProvenance;
  sourceLiteral?: string;
  status: "live";
  contentReady: true;
  noindex?: boolean;
};

export const SITE_ROUTES: readonly SiteRoute[] = [
  { label: "Home", path: "/", category: "corporate", provenance: "approved-live", status: "live", contentReady: true },
  { label: "About Us", path: "/about", category: "corporate", provenance: "approved-live", status: "live", contentReady: true },
  { label: "Services", path: "/services", category: "corporate", provenance: "approved-live", status: "live", contentReady: true },
  { label: "Software Development", path: "/services/software-development", category: "service", provenance: "approved-live", status: "live", contentReady: true },
  { label: "AI Solutions & Automation", path: "/services/ai-solutions-automation", category: "service", provenance: "approved-live", status: "live", contentReady: true },
  { label: "Industries", path: "/industries", category: "corporate", provenance: "approved-live", status: "live", contentReady: true },
  { label: "Products", path: "/products", category: "corporate", provenance: "approved-live", status: "live", contentReady: true },
  { label: "TriMarkity", path: "/products/trimarkity", category: "product", provenance: "approved-live", status: "live", contentReady: true },
  { label: "1SocialSnap", path: "/products/1socialsnap", category: "product", provenance: "approved-live", status: "live", contentReady: true },
  { label: "Global Customers", path: "/global-customers", category: "corporate", provenance: "approved-live", status: "live", contentReady: true },
  { label: "Portfolio", path: "/portfolio", category: "corporate", provenance: "approved-live", status: "live", contentReady: true, noindex: true },
  { label: "Insights", path: "/insights", category: "corporate", provenance: "approved-live", status: "live", contentReady: true },
  { label: "Careers", path: "/careers", category: "corporate", provenance: "approved-live", status: "live", contentReady: true },
  { label: "Investors & Partners", path: "/investors-partners", category: "corporate", provenance: "approved-live", status: "live", contentReady: true },
  { label: "Contact", path: "/contact", category: "corporate", provenance: "approved-live", status: "live", contentReady: true },
  { label: "Privacy Policy", path: "/privacy-policy", category: "legal", provenance: "approved-live", status: "live", contentReady: true },
  { label: "Terms & Conditions", path: "/terms-conditions", category: "legal", provenance: "approved-live", status: "live", contentReady: true },
  { label: "Cookie Policy", path: "/cookie-policy", category: "legal", provenance: "approved-live", status: "live", contentReady: true },
  { label: "Disclaimer", path: "/disclaimer", category: "legal", provenance: "approved-live", status: "live", contentReady: true },
  { label: "Data Security & Confidentiality", path: "/data-security-confidentiality", category: "legal", provenance: "approved-live", status: "live", contentReady: true },
  { label: "Maintenance", path: "/maintenance", category: "utility", provenance: "approved-live", status: "live", contentReady: true, noindex: true },
  { label: "Custom Software Development", path: "/services/custom-software-development", category: "service", provenance: "approved-live", status: "live", contentReady: true },
  { label: "Web Application Development", path: "/services/web-application-development", category: "service", provenance: "approved-live", status: "live", contentReady: true },
  { label: "Mobile App Development", path: "/services/mobile-app-development", category: "service", provenance: "approved-live", status: "live", contentReady: true },
  { label: "SaaS Development", path: "/services/saas-development", category: "service", provenance: "approved-live", status: "live", contentReady: true },
  { label: "ERP & CRM Development", path: "/services/erp-crm-development", category: "service", provenance: "approved-live", status: "live", contentReady: true },
  { label: "AI Chatbots", path: "/services/ai-chatbots", category: "service", provenance: "approved-live", status: "live", contentReady: true },
  { label: "AI Agents", path: "/services/ai-agents", category: "service", provenance: "approved-live", status: "live", contentReady: true },
  { label: "Workflow Automation", path: "/services/workflow-automation", category: "service", provenance: "approved-live", status: "live", contentReady: true },
  { label: "Business Process Automation", path: "/services/business-process-automation", category: "service", provenance: "approved-live", status: "live", contentReady: true },
  { label: "Data Analytics & AI Dashboards", path: "/services/data-analytics-ai-dashboards", category: "service", provenance: "approved-live", status: "live", contentReady: true },
  { label: "API Integrations", path: "/services/api-integrations", category: "service", provenance: "approved-live", status: "live", contentReady: true },
  { label: "Cloud Solutions", path: "/services/cloud-solutions", category: "service", provenance: "approved-live", status: "live", contentReady: true },
  { label: "Startups", path: "/industries/startups", category: "industry", provenance: "approved-live", status: "live", contentReady: true },
  { label: "SMEs", path: "/industries/sme", category: "industry", provenance: "approved-live", status: "live", contentReady: true },
  { label: "Enterprises", path: "/industries/enterprise", category: "industry", provenance: "approved-live", status: "live", contentReady: true },
  { label: "Healthcare", path: "/industries/healthcare", category: "industry", provenance: "approved-live", status: "live", contentReady: true },
  { label: "Education & EdTech", path: "/industries/education-edtech", category: "industry", provenance: "approved-live", status: "live", contentReady: true },
  { label: "Manufacturing", path: "/industries/manufacturing", category: "industry", provenance: "approved-live", status: "live", contentReady: true },
  { label: "Real Estate", path: "/industries/real-estate", category: "industry", provenance: "approved-live", status: "live", contentReady: true },
  { label: "Retail & eCommerce", path: "/industries/retail-ecommerce", category: "industry", provenance: "approved-live", status: "live", contentReady: true },
  { label: "Professional Services", path: "/industries/professional-services", category: "industry", provenance: "approved-live", status: "live", contentReady: true },
  { label: "Government & Institutions", path: "/industries/government-institutions", category: "industry", provenance: "approved-live", status: "live", contentReady: true },
  { label: "Kolhapur", path: "/locations/kolhapur", category: "location", provenance: "approved-live", status: "live", contentReady: true },
  { label: "Pune", path: "/locations/pune", category: "location", provenance: "approved-live", status: "live", contentReady: true },
  { label: "Mumbai", path: "/locations/mumbai", category: "location", provenance: "approved-live", status: "live", contentReady: true },
  { label: "Bengaluru", path: "/locations/bengaluru", category: "location", provenance: "approved-live", status: "live", contentReady: true },
  { label: "Hyderabad", path: "/locations/hyderabad", category: "location", provenance: "approved-live", status: "live", contentReady: true },
  { label: "Delhi NCR", path: "/locations/delhi-ncr", category: "location", provenance: "approved-live", status: "live", contentReady: true },
  { label: "What Is Custom Software Development?", path: "/insights/what-is-custom-software-development", category: "insight", provenance: "approved-live", status: "live", contentReady: true },
  { label: "Custom Software vs Off-the-Shelf", path: "/insights/custom-software-vs-off-the-shelf", category: "insight", provenance: "approved-live", status: "live", contentReady: true },
  { label: "What Is AI Automation?", path: "/insights/what-is-ai-automation", category: "insight", provenance: "approved-live", status: "live", contentReady: true },
  { label: "AI Agents vs AI Chatbots", path: "/insights/ai-agents-vs-ai-chatbots", category: "insight", provenance: "approved-live", status: "live", contentReady: true },
  { label: "ERP vs CRM", path: "/insights/erp-vs-crm", category: "insight", provenance: "approved-live", status: "live", contentReady: true },
  { label: "Business Process Automation Guide", path: "/insights/business-process-automation-guide", category: "insight", provenance: "approved-live", status: "live", contentReady: true },
] as const satisfies readonly SiteRoute[];

export type CatalogRoute = (typeof SITE_ROUTES)[number];
export type SitePath = CatalogRoute["path"];
export type UnderConstructionRoute = SiteRoute;

export const STATIC_ROUTES = SITE_ROUTES.filter((route) => route.path === "/");
export const CATCH_ALL_ROUTES = SITE_ROUTES.filter((route) => route.path !== "/");

export const UNDER_CONSTRUCTION_ROUTES: readonly UnderConstructionRoute[] = [];
export const STATIC_CONSTRUCTION_ROUTES: readonly UnderConstructionRoute[] = [];
export const CATCH_ALL_CONSTRUCTION_ROUTES: readonly UnderConstructionRoute[] = CATCH_ALL_ROUTES;

export const FUTURE_ROUTES = SITE_ROUTES.map((route) => ({ ...route, intendedPath: route.path }));
export const PROPOSED_ROUTES: typeof FUTURE_ROUTES = [];

export function routeHref(path: string): string {
  return encodeURI(path);
}

export function routeSegments(path: string): string[] {
  if (path === "/" || path === "") return [];
  return path.replace(/^\/+/, "").replace(/\/+$/, "").split("/");
}

export function getSiteRoute(path: string): CatalogRoute | undefined {
  try {
    const decoded = decodeURI(path);
    if (!decoded.startsWith("/") || decoded.startsWith("//")) return undefined;
    const normalized = decoded === "/" ? "/" : decoded.replace(/\/+$/, "");
    return SITE_ROUTES.find((route) => (route.path.replace(/\/+$/, "") || "/") === normalized);
  } catch {
    return undefined;
  }
}

export function getSiteRouteBySlug(slug: readonly string[]): CatalogRoute | undefined {
  return SITE_ROUTES.find((route) => {
    const segments = routeSegments(route.path);
    return segments.length === slug.length && segments.every((segment, index) => segment === slug[index]);
  });
}

export const ROUTE_APPROVAL_NOTES = [
  "Exact 55 URLs approved and implemented matching demo2 SEO_ROUTE_MAP.csv without trailing slashes.",
  "All preview guardrails lifted: 53 routes are fully indexable, with only /portfolio and /maintenance marked noindex.",
  "Unified RankRise Technologies digital presence representing RankRise Technologies Private Limited (India) and RankRise Corporation (US).",
] as const;
