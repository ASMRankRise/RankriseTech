export type PageSection = {
  heading: string;
  body: string;
  bullets?: string[];
  id?: string;
};

export type Faq = { q: string; a: string };

export type SitePage = {
  slug: string;
  title: string;
  eyebrow?: string;
  description: string;
  primaryKeyword?: string;
  secondaryKeywords?: string[];
  h1: string;
  lead: string;
  sections: PageSection[];
  faq?: Faq[];
  cta?: { label: string; href: string; external?: boolean };
  secondaryCta?: { label: string; href: string; external?: boolean };
  noindex?: boolean;
  schemaType?: "WebPage" | "Service" | "Article" | "SoftwareApplication" | "AboutPage" | "ContactPage";
};

export type PreviewDetail = {
  title: string;
  intro: string;
  paragraphs?: readonly string[];
  prompts?: readonly string[];
  notice: string;
};
