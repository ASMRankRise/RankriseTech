export const HOME_SECTION_ORDER = [
  "header",
  "hero",
  "company-introduction",
  "core-capabilities",
  "in-house-products",
  "industries",
  "development-process",
  "portfolio",
  "why-rankrise",
  "insights",
  "final-cta",
  "footer",
] as const;

export const SITE_IDENTITY = {
  name: "RankRise Technologies",
  legalIndia: "RankRise Technologies Private Limited",
  legalUs: "RankRise Corporation",
  established: "2026",
  leadership: ["Vajeeda Abdul Mulla", "Sandesh Pandit"],
  phone: "+91 90467 34673",
  phoneHref: "+919046734673",
  email: "hello@rankrisetech.in",
  address: "410, Krystel Square, Near Khanvilkar Petrol Pump, Nagala Park, Kolhapur, Maharashtra – 416003, India",
  postalAddress: {
    streetAddress: "410, Krystel Square, Near Khanvilkar Petrol Pump, Nagala Park",
    addressLocality: "Kolhapur",
    addressRegion: "Maharashtra",
    postalCode: "416003",
    addressCountry: "IN",
  },
  whatsappBase: "https://wa.me/919046734673",
  whatsapp: "https://wa.me/919046734673?text=Hello%20RankRise%20Technologies%2C%20I%20would%20like%20to%20discuss%20a%20software%20or%20AI%20requirement.",
  asmRankRise: "https://www.asmrankrise.com/",
  trimarkity: "https://trimarkity.app/",
  socialsnap: "https://www.1socialsnap.com/",
  sameAs: [
    "https://www.asmrankrise.com/",
    "https://trimarkity.app/",
    "https://www.1socialsnap.com/",
  ],
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.rankrisetech.in",
  tagline: "Building Intelligence. Driving Growth.",
  positioning:
    "RankRise Technologies builds intelligent software, AI-powered solutions and scalable digital products that help organizations innovate, automate and grow.",
  heroTitle: "Building Intelligent Software for a Smarter Digital World.",
  heroDescription:
    "We engineer custom software, AI-powered solutions and scalable digital products that help businesses innovate, automate and grow. From concept to deployment, we turn complex challenges into intelligent digital experiences.",
  inquiryNotice:
    "Preview only. This does not send an inquiry. Approved contact details and inquiry delivery are pending.",
  productEndorsement: "A RankRise Technologies Product.",
} as const;

export const FOUR_PILLARS = [
  "Software Engineering",
  "AI & Innovation",
  "In-house Products",
  "Digital Transformation",
] as const;

export const WEBSITE_STACK = ["Next.js", "React", "TypeScript", "Tailwind CSS"] as const;

export const PUBLISHED_TECH_STACK = [
  "Next.js",
  "React",
  "Node.js",
  "Python",
  "FastAPI",
  "Django",
  "Flutter",
  "React Native",
  "PostgreSQL",
  "MongoDB",
  "AWS",
  "Google Cloud",
  "Docker",
  "REST APIs",
  "GraphQL",
  "OpenAI",
  "Gemini",
  "Claude",
] as const;

export const STACK_CATEGORIES = [
  { name: "Frontend", context: "Interfaces & web experiences" },
  { name: "Backend", context: "Application logic & integrations" },
  { name: "Mobile", context: "Device-centered experiences" },
  { name: "AI / ML", context: "Data-informed intelligence" },
  { name: "GenAI", context: "Context-led generative systems" },
  { name: "Databases", context: "Information foundations" },
  { name: "Cloud", context: "Infrastructure choices" },
  { name: "DevOps", context: "Delivery & operations" },
  { name: "Analytics", context: "Measurement & interpretation" },
] as const;

export const AI_EXPLORATIONS = [
  {
    title: "AI & machine learning",
    description: "Explore pattern recognition and predictive analytics as inputs to more informed decisions.",
  },
  {
    title: "Generative AI, LLMs & RAG",
    description: "Consider GenAI assistants and retrieval-augmented generation grounded in approved organizational knowledge.",
  },
  {
    title: "AI agents & intelligent automation",
    description: "Evaluate task coordination and repeatable workflows with appropriate human oversight.",
  },
  {
    title: "NLP & computer vision",
    description: "Explore ways to make text and visual information more useful within a defined business context.",
  },
] as const;
