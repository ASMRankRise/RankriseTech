import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InnerPage } from "@/components/inner-page";
import { CATCH_ALL_ROUTES, getSiteRouteBySlug, routeSegments } from "@/lib/routes";
import { getSitePageBySlug } from "@/lib/site-content";
import { constructMetadata } from "@/lib/seo/metadata";
import {
  ArticleSchema,
  BreadcrumbListSchema,
  ServiceSchema,
  SoftwareApplicationSchema,
} from "@/lib/seo/structured-data";

type PageProps = {
  params: Promise<{ slug: string[] }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return CATCH_ALL_ROUTES.map((route) => ({
    slug: routeSegments(route.path),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getSitePageBySlug(slug);
  const route = getSiteRouteBySlug(slug);

  if (!page || !route) {
    return {};
  }

  return constructMetadata({
    title: page.title,
    description: page.description,
    canonical: `/${page.slug}`,
    noIndex: page.noindex ?? route.noindex ?? false,
  });
}

export default async function CatchAllPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getSitePageBySlug(slug);
  const route = getSiteRouteBySlug(slug);

  if (!page || !route) {
    notFound();
  }

  const breadcrumbs = [
    { name: "Home", url: "/" },
    ...slug.map((segment, index) => {
      const href = `/${slug.slice(0, index + 1).join("/")}`;
      const segmentMap: Record<string, string> = {
        "1socialsnap": "1SocialSnap",
        trimarkity: "TriMarkity",
        salesapp: "SalesApp",
        hrms: "HRMS",
      };
      const wordMap: Record<string, string> = {
        Ai: "AI",
        Erp: "ERP",
        Crm: "CRM",
        Api: "API",
        Smes: "SMEs",
        Edtech: "EdTech",
        Saas: "SaaS",
      };
      const name =
        segmentMap[segment.toLowerCase()] ??
        segment
          .replace(/-/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase())
          .replace(/\b(Ai|Erp|Crm|Api|Smes|Edtech|Saas)\b/g, (m) => wordMap[m] ?? m);
      return { name, url: href };
    }),
  ];

  return (
    <>
      <BreadcrumbListSchema items={breadcrumbs} />
      {page.schemaType === "Service" && (
        <ServiceSchema
          name={page.h1}
          description={page.description}
          url={`/${page.slug}`}
        />
      )}
      {page.schemaType === "Article" && (
        <ArticleSchema
          headline={page.h1}
          description={page.description}
          url={`/${page.slug}`}
        />
      )}
      {page.schemaType === "SoftwareApplication" && (
        <SoftwareApplicationSchema
          name={page.h1}
          description={page.description}
          url={`/${page.slug}`}
        />
      )}
      <InnerPage page={page} />
    </>
  );
}
