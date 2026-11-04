import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { UnderConstruction } from "@/components/under-construction";
import { getSiteRoute } from "@/lib/routes";
import { CONSTRUCTION_COPY, SITE_IDENTITY } from "@/lib/site-content";

// Encoded folder spelling matches Next dev lookup; the catalog URL must remain literal.
function teamConstructionRoute() {
  const route = getSiteRoute("/meet the team");
  if (!route || route.status !== "under-construction" || route.contentReady) notFound();
  return route;
}

export function generateMetadata(): Metadata {
  const route = teamConstructionRoute();
  return {
    title: `${route.label} | ${SITE_IDENTITY.name}`,
    description: `${route.label}. ${CONSTRUCTION_COPY.description} Local preview only.`,
    robots: { index: false, follow: false },
  };
}

export default function Page() {
  const route = teamConstructionRoute();
  return <UnderConstruction route={route} />;
}
