import { SITE_IDENTITY } from "./site";
import type { PreviewDetail } from "./types";

export const PRODUCTS = [
  {
    id: "trimarkity",
    name: "TriMarkity",
    href: "/products/trimarkity",
    category: "B2B marketing & sales",
    headline: "One Platform. Smarter B2B Growth.",
    positioning: "An integrated B2B marketing and sales platform.",
    value: "A connected direction for B2B marketing and sales.",
  },
  {
    id: "1socialsnap",
    name: "1SocialSnap",
    href: "/products/1socialsnap",
    category: "Social media management",
    headline: "Simplify Social Media. Amplify Your Presence.",
    positioning: "A social media management and publishing platform.",
    value: "A clearer approach to managing your social presence.",
  },
  {
    id: "salesapp",
    name: "SalesApp",
    href: "/products#salesapp",
    category: "Sales management",
    headline: "Turn Sales Activities Into Sales Performance.",
    positioning: "A sales management platform.",
    value: "A focused direction for organizing sales activity.",
  },
  {
    id: "hrms",
    name: "HRMS",
    href: "/products#hrms",
    category: "Human resource management",
    headline: "Smarter People Management. Better Workplaces.",
    positioning: "A human resource management platform.",
    value: "A considered foundation for people operations.",
  },
] as const;

export type Product = (typeof PRODUCTS)[number];

export function getProductDetail(product: Product): PreviewDetail {
  return {
    title: product.name,
    intro: product.positioning,
    paragraphs: [product.value, SITE_IDENTITY.productEndorsement],
    notice: "This brief reflects approved product positioning within the RankRise Technologies ecosystem.",
  };
}
