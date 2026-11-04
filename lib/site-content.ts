import { routeHref } from "./routes";

export const HOME_SECTION_ORDER = [
  "header",
  "hero",
  "company-introduction",
  "core-capabilities",
  "in-house-products",
  "ai-emerging-technologies",
  "industries",
  "technology-stack",
  "development-process",
  "portfolio",
  "why-rankrise",
  "insights",
  "final-cta",
  "footer",
] as const;

export const SITE_IDENTITY = {
  name: "RankRise Technologies",
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

export const CONSTRUCTION_COPY = {
  status: "Under construction",
  description: "This page is being prepared.",
  explanation: "In the meantime, explore our engineering direction and four in-house products on the homepage.",
  notice: "Local preview only. Page content and public-launch approvals are pending.",
} as const;

export const FOUR_PILLARS = [
  "Software Engineering",
  "AI & Innovation",
  "In-house Products",
  "Digital Transformation",
] as const;

export const NAVIGATION_ITEMS = [
  { label: "Home", href: routeHref("/") },
  { label: "About", href: routeHref("/about-us/") },
  { label: "Services", href: routeHref("/services/") },
  { label: "Solutions", href: routeHref("/solutions/") },
  { label: "Products", href: routeHref("/products/") },
  { label: "Technologies", href: routeHref("/technologies/") },
  { label: "Industries", href: routeHref("/industries/") },
  { label: "Insights", href: routeHref("/insights/") },
] as const;

export type PreviewDetail = {
  title: string;
  intro: string;
  paragraphs?: readonly string[];
  prompts?: readonly string[];
  notice: string;
};

export const CORE_CAPABILITIES = [
  {
    id: "custom-software",
    name: "Custom Software Development",
    href: routeHref("/services/custom-software-development/"),
    icon: "code",
    description: "Shape business-critical workflows into software built around your needs.",
    context: "Start with the business problem, the people using the system and the workflows that need to connect. A custom software discussion should establish the right scope before choosing an implementation.",
  },
  {
    id: "ai-machine-learning",
    name: "AI & Machine Learning",
    href: routeHref("/services/ai-ml-development/"),
    icon: "brain",
    description: "Explore intelligence that makes information useful and repetitive work more manageable.",
    context: "Explore whether an AI or machine learning approach fits your challenge. Begin with available data, the decisions it could support and where human review should remain essential.",
  },
  {
    id: "web-application",
    name: "Web & Application Development",
    href: routeHref("/services/web-development/"),
    icon: "window",
    description: "Create clear, useful digital experiences for your customers and teams.",
    context: "Frame the journeys your web experience needs to support, the audiences it serves and how it fits with your existing systems. Accessibility and clarity belong in the initial discussion.",
  },
  {
    id: "mobile-app",
    name: "Mobile App Development",
    href: routeHref("/services/mobile-app-development/"),
    icon: "phone",
    description: "Bring important journeys to the devices people use every day.",
    context: "Consider the moments where a mobile experience could help your users. Device needs, connectivity, accessibility and integration requirements should guide any proposed scope.",
  },
  {
    id: "cloud-devops",
    name: "Cloud & DevOps",
    href: routeHref("/services/cloud-devops/"),
    icon: "cloud",
    description: "Plan foundations for evolving systems, thoughtful delivery and operational clarity.",
    context: "Map your current environment, delivery workflow and operational constraints. A cloud and DevOps conversation should clarify ownership, deployment needs and how change will be managed.",
  },
  {
    id: "digital-transformation",
    name: "Digital Transformation",
    href: routeHref("/services/digital-transformation/"),
    icon: "workflow",
    description: "Connect processes, people and technology around practical business change.",
    context: "Identify where disconnected processes or systems create friction. Start with a realistic change agenda, the people it affects and the outcomes that would make the work worthwhile.",
  },
] as const;

export type Capability = (typeof CORE_CAPABILITIES)[number];

export function getCapabilityDetail(capability: Capability): PreviewDetail {
  return {
    title: capability.name,
    intro: capability.context,
    prompts: [
      "What business challenge should this address?",
      "Who will use it, and how does the work happen today?",
      "What would meaningful progress look like?",
    ],
    notice: "This is a local discussion brief, not a confirmed delivery scope. Capabilities and technology choices require validation.",
  };
}

export const PRODUCTS = [
  {
    id: "trimarkity",
    name: "TriMarkity",
    href: routeHref("/products/trimarkity/"),
    category: "B2B marketing & sales",
    headline: "One Platform. Smarter B2B Growth.",
    positioning: "An integrated B2B marketing and sales platform.",
    value: "A connected direction for B2B marketing and sales.",
  },
  {
    id: "1socialsnap",
    name: "1SocialSnap",
    href: routeHref("/products/1socialsnap/"),
    category: "Social media management",
    headline: "Simplify Social Media. Amplify Your Presence.",
    positioning: "A social media management and publishing platform.",
    value: "A clearer approach to managing your social presence.",
  },
  {
    id: "salesapp",
    name: "SalesApp",
    href: routeHref("/products/salesapp/"),
    category: "Sales management",
    headline: "Turn Sales Activities Into Sales Performance.",
    positioning: "A sales management platform.",
    value: "A focused direction for organizing sales activity.",
  },
  {
    id: "hrms",
    name: "HRMS",
    href: routeHref("/products/hrms/"),
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
    notice: "This brief reflects report positioning, not a verified feature list or demonstration. Live features, genuine UI and product/demo destinations await approval.",
  };
}

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

export const INDUSTRIES = [
  { name: "Healthcare", href: routeHref("/industries/healthcare/"), theme: "Connected administrative workflows." },
  { name: "Fintech", href: routeHref("/industries/fintech/"), theme: "More coherent financial operations." },
  { name: "Retail & E-commerce", href: routeHref("/industries/retail-ecommerce/"), theme: "Smoother commerce and customer journeys." },
  { name: "Manufacturing", href: routeHref("/industries/manufacturing/"), theme: "Operational visibility and coordination." },
  { name: "Education", href: routeHref("/industries/education/"), theme: "Accessible learning and administration." },
  { name: "Real Estate", href: routeHref("/industries/real-estate/"), theme: "Clearer property and relationship workflows." },
  { name: "Logistics", href: routeHref("/industries/logistics/"), theme: "Coordination across movement and operations." },
  { name: "SaaS & Technology", href: routeHref("/industries/saas-technology/"), theme: "Product foundations and internal efficiency." },
  { name: "Hospitality", href: routeHref("/industries/hospitality/"), theme: "Connected guest and operational journeys." },
  { name: "Professional Services", href: routeHref("/industries/professional-services/"), theme: "Knowledge, scheduling and client workflows." },
] as const;

export const WEBSITE_STACK = ["Next.js", "React", "TypeScript", "Tailwind CSS"] as const;

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

export const PROCESS_STAGES = [
  { name: "Discover", description: "Understand your goals, users and the challenge that matters." },
  { name: "Strategize", description: "Align priorities, define scope and make a considered plan." },
  { name: "Design", description: "Turn the direction into clear journeys and a coherent system." },
  { name: "Develop", description: "Build in purposeful increments with room for useful feedback." },
  { name: "Test & Deploy", description: "Evaluate the work against agreed needs and prepare its release." },
  { name: "Support & Scale", description: "Plan for ongoing ownership, improvement and changing needs." },
] as const;

export const WHY_RANKRISE = [
  { title: "End-to-end engineering", description: "Consider the whole journey, not just the implementation." },
  { title: "Practical AI approach", description: "Let the problem lead. Use intelligence where it has a clear purpose." },
  { title: "In-house product experience", description: "Bring a product mindset to usability, iteration and the long view." },
  { title: "Multi-industry focus", description: "Start with the context of each industry, rather than a one-size-fits-all answer." },
  { title: "Scalable architecture", description: "Make thoughtful foundations for systems that need to evolve." },
  { title: "Long-term partnership", description: "Value clarity, shared decisions and continuity beyond the first release." },
] as const;

export const PREVIEW_DETAILS = {
  about: {
    title: "About RankRise Technologies",
    intro: SITE_IDENTITY.positioning,
    paragraphs: ["The company direction combines custom client technology with four in-house products: TriMarkity, 1SocialSnap, SalesApp and HRMS."],
    notice: "Company history, leadership information and verified credentials have not been supplied for this local preview.",
  },
  team: {
    title: "Meet the Team",
    intro: "The people behind the work should be introduced with approved names, roles and genuine profiles.",
    notice: "Approved team information and photography are not available in this preview. No profiles have been invented.",
  },
  careers: {
    title: "Careers at RankRise",
    intro: "Career information will be published when approved roles and an application destination are available.",
    notice: "There are no verified open positions or application contact details in this preview. This dialog does not accept applications.",
  },
  enterprise: {
    title: "Enterprise solutions",
    intro: "Explore how connected software could support your organization's workflows, information and evolving priorities.",
    prompts: ["Which systems or processes need to work together?", "What constraints and ownership needs should shape the discussion?"],
    notice: "This is a potential solution theme, not a confirmed implementation, certification or promised outcome.",
  },
  crm: {
    title: "CRM solutions",
    intro: "Explore how a customer relationship management solution could support your organization's relationship workflows and information needs.",
    prompts: ["Which relationship processes need a clearer view?", "What existing information, systems and ownership needs should shape the discussion?"],
    notice: "This is a potential solution theme, not a verified delivery capability or a CRM feature claim about any in-house product.",
  },
  saas: {
    title: "SaaS Development",
    intro: "The report includes SaaS development as a service direction. Explore whether a software-as-a-service model could fit your product idea, users and ongoing ownership needs.",
    prompts: ["Who would use the product, and what problem would it address?", "What priorities and constraints should shape a possible scope?"],
    notice: "Potential SaaS discussion only. Delivery capabilities, feature scope and technology choices require validation; no live platform or feature commitment is implied.",
  },
  privacy: {
    title: "Privacy notice",
    intro: "Approved privacy information is not available in this local preview.",
    notice: "No inquiry backend, analytics or tracking has been configured. Project drafts remain in page memory only. Approved legal text is required before a public launch.",
  },
  terms: {
    title: "Terms of use",
    intro: "Approved terms are not available in this local preview.",
    notice: "This notice is not legal boilerplate or an approved agreement. Terms must be reviewed and approved before a public launch.",
  },
  cookies: {
    title: "Cookie information",
    intro: "No analytics or tracking cookies have been configured for this preview.",
    notice: "An approved cookie notice and any necessary consent approach depend on the final launch configuration. They are not implemented here.",
  },
} as const satisfies Record<string, PreviewDetail>;

// Report §12/p356 footer categories are distinct from the six homepage capabilities.
export const FOOTER_SERVICES = [
  { name: "Custom Software", href: routeHref("/services/custom-software-development/") },
  { name: "AI/ML", href: routeHref("/services/ai-ml-development/") },
  { name: "Web", href: routeHref("/services/web-development/") },
  { name: "Mobile", href: routeHref("/services/mobile-app-development/") },
  { name: "Cloud", href: routeHref("/services/cloud-devops/") },
  { name: "SaaS", href: routeHref("/services/saas-development/") },
] as const;

export const FOOTER_SOLUTIONS = [
  { name: "Enterprise", href: routeHref("/solutions/enterprise-platforms/") },
  { name: "Automation", href: routeHref("/solutions/workflow-automation/") },
  { name: "CRM", href: routeHref("/solutions/crm/") },
  { name: "HRMS", href: routeHref("/solutions/hr-management/") },
  { name: "Industry Solutions", href: routeHref("/industries/") },
] as const;
