export const LOCATIONS = [
  { slug: "kolhapur", name: "Kolhapur", href: "/locations/kolhapur", primary: "software development company in Kolhapur", note: "Our registered office is in Kolhapur, enabling direct local engagement alongside remote delivery across India and global markets." },
  { slug: "pune", name: "Pune", href: "/locations/pune", primary: "software development company in Pune", note: "We support Pune businesses remotely and through planned project meetings; this page does not represent a physical RankRise office in Pune." },
  { slug: "mumbai", name: "Mumbai", href: "/locations/mumbai", primary: "software development company in Mumbai", note: "We work with Mumbai-based organisations through remote-first delivery and scheduled project collaboration; no Mumbai office is claimed." },
  { slug: "bengaluru", name: "Bengaluru", href: "/locations/bengaluru", primary: "software development company in Bengaluru", note: "We support Bengaluru startups and businesses remotely, with project engagement structured around requirements and delivery milestones." },
  { slug: "hyderabad", name: "Hyderabad", href: "/locations/hyderabad", primary: "software development company in Hyderabad", note: "Hyderabad clients can engage RankRise Technologies through remote project discovery, implementation and support." },
  { slug: "delhi-ncr", name: "Delhi NCR", href: "/locations/delhi-ncr", primary: "software development company in Delhi NCR", note: "We serve Delhi NCR businesses through remote-first collaboration and scheduled meetings where appropriate." },
] as const;

export interface GlobeCountry {
  id: string;
  name: string;
  lat: number;
  lng: number;
  widthEstimate: number;
}

export const GLOBE_COUNTRIES: readonly GlobeCountry[] = [
  { id: "in", name: "India", lat: 21.5, lng: 79.0, widthEstimate: 84 },
  { id: "us", name: "United States", lat: 38.8, lng: -98.0, widthEstimate: 128 },
  { id: "gb", name: "United Kingdom", lat: 54.7, lng: -2.8, widthEstimate: 140 },
  { id: "fr", name: "France", lat: 45.2, lng: 2.4, widthEstimate: 92 },
  { id: "ca", name: "Canada", lat: 57.5, lng: -106.0, widthEstimate: 94 },
  { id: "br", name: "Brazil", lat: -12.5, lng: -52.5, widthEstimate: 84 },
  { id: "za", name: "South Africa", lat: -29.0, lng: 24.5, widthEstimate: 120 },
  { id: "ae", name: "UAE", lat: 24.2, lng: 54.3, widthEstimate: 74 },
  { id: "sg", name: "Singapore", lat: 1.35, lng: 103.8, widthEstimate: 108 },
  { id: "jp", name: "Japan", lat: 36.2, lng: 138.0, widthEstimate: 86 },
  { id: "au", name: "Australia", lat: -25.0, lng: 134.0, widthEstimate: 102 },
] as const;
