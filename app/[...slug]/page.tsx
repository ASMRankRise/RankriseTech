import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { UnderConstruction } from "@/components/under-construction";
import { CATCH_ALL_CONSTRUCTION_ROUTES, getSiteRouteBySlug, routeSegments } from "@/lib/routes";
import { CONSTRUCTION_COPY, SITE_IDENTITY } from "@/lib/site-content";

type ConstructionPageProps = { params: Promise<{ slug: string[] }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return CATCH_ALL_CONSTRUCTION_ROUTES.map((route) => ({ slug: routeSegments(route.path) }));
}

async function constructionRoute(params: ConstructionPageProps["params"]) {
  const { slug } = await params;
  const route = getSiteRouteBySlug(slug);
  if (!route || route.status !== "under-construction" || route.contentReady) notFound();
  return route;
}

export async function generateMetadata({ params }: ConstructionPageProps): Promise<Metadata> {
  const route = await constructionRoute(params);
  return {
    title: `${route.label} | ${SITE_IDENTITY.name}`,
    description: `${route.label}. ${CONSTRUCTION_COPY.description} Local preview only.`,
    robots: { index: false, follow: false },
  };
}

export default async function Page({ params }: ConstructionPageProps) {
  const route = await constructionRoute(params);
  return <UnderConstruction route={route} />;
}
