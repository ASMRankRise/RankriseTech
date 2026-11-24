import { routeHref } from "./routes";

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
  whatsappBase: "https://wa.me/919046734673",
  whatsapp: "https://wa.me/919046734673?text=Hello%20RankRise%20Technologies%2C%20I%20would%20like%20to%20discuss%20a%20software%20or%20AI%20requirement.",
  asmRankRise: "https://www.asmrankrise.com/",
  trimarkity: "https://trimarkity.app/",
  socialsnap: "https://www.1socialsnap.com/",
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

export const SITE = SITE_IDENTITY;

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

export const SERVICES_LIST = [
  {
    slug: "custom-software-development",
    name: "Custom Software Development",
    href: "/services/custom-software-development",
    keyword: "custom software development company",
    short: "Purpose-built software designed around your workflows, users and business goals.",
    useCases: ["Internal business systems", "Operations platforms", "Customer portals", "Role-based workflow tools", "Industry-specific applications"],
    outcomes: ["Replace disconnected manual processes", "Create one reliable source of business information", "Support future integrations and growth", "Improve visibility across teams"]
  },
  {
    slug: "web-application-development",
    name: "Web Application Development",
    href: "/services/web-application-development",
    keyword: "web application development company",
    short: "Fast, secure and scalable browser-based applications for modern business use cases.",
    useCases: ["Customer portals", "Management dashboards", "Booking platforms", "Marketplaces", "Internal applications"],
    outcomes: ["Access from any modern browser", "Centralise workflows", "Improve user experience", "Integrate with APIs and cloud services"]
  },
  {
    slug: "mobile-app-development",
    name: "Mobile App Development",
    href: "/services/mobile-app-development",
    keyword: "mobile app development company",
    short: "Cross-platform mobile applications designed for practical, everyday use.",
    useCases: ["Customer apps", "Employee apps", "Field-force apps", "Commerce apps", "Subscription apps"],
    outcomes: ["Reach users on mobile", "Support field workflows", "Enable push-led engagement", "Create consistent Android and iOS experiences"]
  },
  {
    slug: "saas-development",
    name: "SaaS Development",
    href: "/services/saas-development",
    keyword: "SaaS development company",
    short: "From MVP to scalable platform, we help turn software ideas into market-ready SaaS products.",
    useCases: ["B2B SaaS", "Subscription platforms", "Multi-tenant applications", "MVPs", "Product modernisation"],
    outcomes: ["Validate product ideas faster", "Create scalable multi-user architecture", "Support subscriptions and roles", "Build for continuous product development"]
  },
  {
    slug: "erp-crm-development",
    name: "ERP & CRM Development",
    href: "/services/erp-crm-development",
    keyword: "ERP CRM development company",
    short: "Custom systems connecting sales, customers, operations, teams and reporting.",
    useCases: ["Lead management", "Sales pipelines", "Inventory", "Operations", "Customer management", "Reporting"],
    outcomes: ["Unify operational data", "Reduce spreadsheet dependence", "Improve accountability", "Create management visibility"]
  },
  {
    slug: "ai-chatbots",
    name: "AI Chatbots",
    href: "/services/ai-chatbots",
    keyword: "AI chatbot development company",
    short: "Conversational AI for customer support, lead qualification and internal assistance.",
    useCases: ["Website enquiries", "Customer support", "Lead qualification", "Knowledge assistance", "Service guidance"],
    outcomes: ["Respond faster", "Handle repetitive questions", "Capture structured leads", "Provide round-the-clock first-line assistance"]
  },
  {
    slug: "ai-agents",
    name: "AI Agents",
    href: "/services/ai-agents",
    keyword: "AI agent development company",
    short: "AI-powered agents designed to analyse information, assist workflows and perform defined tasks.",
    useCases: ["Research assistance", "Document processing", "Operations support", "Task orchestration", "Decision assistance"],
    outcomes: ["Reduce repetitive cognitive work", "Connect multiple tools", "Accelerate information handling", "Support complex multi-step workflows"]
  },
  {
    slug: "workflow-automation",
    name: "Workflow Automation",
    href: "/services/workflow-automation",
    keyword: "workflow automation services",
    short: "Connect systems and automate repetitive steps, approvals, alerts and handoffs.",
    useCases: ["Approvals", "Notifications", "Lead routing", "Data transfers", "Employee workflows", "Reporting"],
    outcomes: ["Reduce manual handoffs", "Improve process consistency", "Shorten turnaround time", "Create traceable workflows"]
  },
  {
    slug: "business-process-automation",
    name: "Business Process Automation",
    href: "/services/business-process-automation",
    keyword: "business process automation company",
    short: "Digitise larger end-to-end processes involving multiple users, systems and stages.",
    useCases: ["Customer onboarding", "Order workflows", "Internal approvals", "Service requests", "Sales processes"],
    outcomes: ["Standardise operations", "Reduce process delays", "Improve ownership", "Create measurable digital processes"]
  },
  {
    slug: "data-analytics-ai-dashboards",
    name: "Data Analytics & AI Dashboards",
    href: "/services/data-analytics-ai-dashboards",
    keyword: "AI dashboard development company",
    short: "Turn business information into dashboards, useful insights and faster decisions.",
    useCases: ["Management dashboards", "Sales analytics", "Operations reporting", "KPI tracking", "AI-assisted insights"],
    outcomes: ["See the right metrics faster", "Combine data from multiple systems", "Spot trends and exceptions", "Improve decision-making"]
  },
  {
    slug: "api-integrations",
    name: "API Integrations",
    href: "/services/api-integrations",
    keyword: "API integration services",
    short: "Connect applications, platforms and third-party services through reliable integrations.",
    useCases: ["CRM integrations", "ERP integrations", "Payment gateways", "Communication tools", "AI platforms", "SaaS integrations"],
    outcomes: ["Reduce duplicate data entry", "Synchronise systems", "Extend existing software", "Create connected business workflows"]
  },
  {
    slug: "cloud-solutions",
    name: "Cloud Solutions",
    href: "/services/cloud-solutions",
    keyword: "cloud solutions company",
    short: "Build, deploy and scale applications using modern cloud infrastructure and DevOps practices.",
    useCases: ["Application hosting", "Cloud deployment", "Infrastructure planning", "Database environments", "Backup planning"],
    outcomes: ["Improve scalability", "Create repeatable deployments", "Support modern applications", "Plan for resilience and growth"]
  }
] as const;

export const services = SERVICES_LIST;

export const INDUSTRIES = [
  { slug: "startups", name: "Startups", href: "/industries/startups", theme: "Agile product foundations and rapid time-to-market.", keyword: "software development for startups", pain: "Startups need to validate ideas quickly without building technology that becomes a bottleneck later.", solutions: ["MVP development", "SaaS platforms", "Web and mobile apps", "AI features", "Cloud architecture"] },
  { slug: "sme", name: "SMEs", href: "/industries/sme", theme: "Operational efficiency and system consolidation.", keyword: "software solutions for SMEs", pain: "Growing SMEs often rely on spreadsheets, disconnected tools and manual approvals that become difficult to manage at scale.", solutions: ["ERP/CRM", "Workflow automation", "Custom business software", "Dashboards", "API integrations"] },
  { slug: "enterprise", name: "Enterprises", href: "/industries/enterprise", theme: "Scalable digital systems and secure integrations.", keyword: "enterprise software development company", pain: "Enterprises need reliable systems that integrate with existing technology, governance and complex operating processes.", solutions: ["Enterprise applications", "System integrations", "Automation", "AI agents", "Analytics"] },
  { slug: "healthcare", name: "Healthcare", href: "/industries/healthcare", theme: "Connected administrative workflows.", keyword: "healthcare software development company", pain: "Healthcare organisations need secure, easy-to-use systems that reduce administrative friction while supporting staff and patient communication.", solutions: ["Patient portals", "Appointment systems", "Workflow automation", "Dashboards", "AI assistants"] },
  { slug: "education-edtech", name: "Education & EdTech", href: "/industries/education-edtech", theme: "Accessible learning platforms and institutional administration.", keyword: "EdTech software development company", pain: "Education providers need flexible digital experiences for learners, educators, administrators and management teams.", solutions: ["Learning platforms", "Student portals", "Management systems", "Mobile apps", "AI-assisted learning tools"] },
  { slug: "manufacturing", name: "Manufacturing", href: "/industries/manufacturing", theme: "Operational visibility and inventory coordination.", keyword: "manufacturing software development company", pain: "Manufacturers often need better visibility across production, inventory, vendors, approvals and operational reporting.", solutions: ["ERP", "Inventory systems", "Workflow automation", "Dashboards", "Industrial integrations"] },
  { slug: "real-estate", name: "Real Estate", href: "/industries/real-estate", theme: "Property portals and automated client follow-ups.", keyword: "real estate software development company", pain: "Real estate teams need stronger control over leads, properties, follow-ups, documents and customer communication.", solutions: ["Real estate CRM", "Property portals", "Lead automation", "Customer apps", "Analytics"] },
  { slug: "retail-ecommerce", name: "Retail & eCommerce", href: "/industries/retail-ecommerce", theme: "Connected customer journeys across web, mobile and orders.", keyword: "eCommerce software development company", pain: "Retail and eCommerce businesses need connected customer journeys and reliable operations across orders, inventory, payments and communication.", solutions: ["Commerce apps", "Order systems", "Integrations", "Customer platforms", "Automation"] },
  { slug: "professional-services", name: "Professional Services", href: "/industries/professional-services", theme: "Client pipelines, scheduling and transparent reporting.", keyword: "software solutions for professional services", pain: "Service businesses need clear client pipelines, task ownership, document workflows and reliable reporting.", solutions: ["CRM", "Client portals", "Workflow systems", "Automation", "Dashboards"] },
  { slug: "government-institutions", name: "Government & Institutions", href: "/industries/government-institutions", theme: "Structured public portals and accountable digital workflows.", keyword: "government software development company", pain: "Institutions need structured digital workflows, role-based access and systems designed around accountability and long-term maintainability.", solutions: ["Portals", "Workflow applications", "Management systems", "Dashboards", "Integrations"] }
] as const;

export const industries = INDUSTRIES;

export const LOCATIONS = [
  { slug: "kolhapur", name: "Kolhapur", href: "/locations/kolhapur", primary: "software development company in Kolhapur", note: "Our registered office is in Kolhapur, enabling direct local engagement alongside remote delivery across India and global markets." },
  { slug: "pune", name: "Pune", href: "/locations/pune", primary: "software development company in Pune", note: "We support Pune businesses remotely and through planned project meetings; this page does not represent a physical RankRise office in Pune." },
  { slug: "mumbai", name: "Mumbai", href: "/locations/mumbai", primary: "software development company in Mumbai", note: "We work with Mumbai-based organisations through remote-first delivery and scheduled project collaboration; no Mumbai office is claimed." },
  { slug: "bengaluru", name: "Bengaluru", href: "/locations/bengaluru", primary: "software development company in Bengaluru", note: "We support Bengaluru startups and businesses remotely, with project engagement structured around requirements and delivery milestones." },
  { slug: "hyderabad", name: "Hyderabad", href: "/locations/hyderabad", primary: "software development company in Hyderabad", note: "Hyderabad clients can engage RankRise Technologies through remote project discovery, implementation and support." },
  { slug: "delhi-ncr", name: "Delhi NCR", href: "/locations/delhi-ncr", primary: "software development company in Delhi NCR", note: "We serve Delhi NCR businesses through remote-first collaboration and scheduled meetings where appropriate." }
] as const;

export const locations = LOCATIONS;

export const INSIGHT_ARTICLES = [
  { slug: "what-is-custom-software-development", title: "What Is Custom Software Development?", href: "/insights/what-is-custom-software-development", keyword: "what is custom software development", intro: "Custom software is built for a specific organisation, workflow or product need instead of forcing a business to adapt to a generic tool.", points: ["When custom software makes sense", "How requirements become features", "Why integrations matter", "How to plan for future scale"] },
  { slug: "custom-software-vs-off-the-shelf", title: "Custom Software vs Off-the-Shelf Software", href: "/insights/custom-software-vs-off-the-shelf", keyword: "custom software vs off the shelf software", intro: "The right choice depends on how unique your workflow is, how quickly you need to launch, what integrations you require and how much control you need over the product roadmap.", points: ["Cost and time trade-offs", "Flexibility", "Ownership and roadmap", "Integration requirements"] },
  { slug: "what-is-ai-automation", title: "What Is AI Automation?", href: "/insights/what-is-ai-automation", keyword: "what is AI automation", intro: "AI automation combines artificial intelligence with workflows so software can interpret information, assist decisions or perform defined tasks with less manual effort.", points: ["Where AI fits", "Where rules-based automation is enough", "Common business use cases", "Human oversight"] },
  { slug: "ai-agents-vs-ai-chatbots", title: "AI Agents vs AI Chatbots", href: "/insights/ai-agents-vs-ai-chatbots", keyword: "AI agent vs chatbot", intro: "Chatbots are primarily conversational, while AI agents can be designed to plan or perform broader multi-step tasks using tools and business data.", points: ["Conversation vs action", "Tool use", "Business workflows", "When to choose each"] },
  { slug: "erp-vs-crm", title: "ERP vs CRM: What Does Your Business Need?", href: "/insights/erp-vs-crm", keyword: "ERP vs CRM", intro: "CRM primarily manages customer and sales relationships, while ERP coordinates wider operational processes such as inventory, finance, procurement and internal workflows.", points: ["Core differences", "Where they overlap", "When to integrate", "Custom development considerations"] },
  { slug: "business-process-automation-guide", title: "Business Process Automation: A Practical Guide", href: "/insights/business-process-automation-guide", keyword: "business process automation", intro: "Business process automation focuses on improving entire workflows, not simply automating isolated clicks or notifications.", points: ["Map the current process", "Identify repetitive steps", "Define exceptions", "Measure outcomes"] }
] as const;

export const insightArticles = INSIGHT_ARTICLES;

export const COMMON_FAQ: Faq[] = [
  { q: "Do you work with startups and established businesses?", a: "Yes. RankRise Technologies works with startups, SMEs, enterprises and institutions. The project approach depends on the maturity, complexity and objectives of the requirement." },
  { q: "Can you sign an NDA before a detailed project discussion?", a: "Where appropriate, project discussions can be supported through suitable non-disclosure arrangements so sensitive business information can be shared with greater confidence." },
  { q: "Do you provide post-launch support?", a: "Yes. Depending on the engagement, support can include maintenance, bug resolution, performance improvements, deployment assistance, upgrades and future feature development." }
];

export const commonFaq = COMMON_FAQ;

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

export const CORE_CAPABILITIES = [
  {
    id: "custom-software",
    name: "Custom Software Development",
    href: "/services/custom-software-development",
    icon: "code",
    description: "Shape business-critical workflows into software built around your needs.",
    context: "Start with the business problem, the people using the system and the workflows that need to connect. A custom software discussion should establish the right scope before choosing an implementation.",
  },
  {
    id: "ai-solutions",
    name: "AI Solutions & Automation",
    href: "/services/ai-solutions-automation",
    icon: "brain",
    description: "Explore intelligence that makes information useful and repetitive work more manageable.",
    context: "Explore whether an AI or machine learning approach fits your challenge. Begin with available data, the decisions it could support and where human review should remain essential.",
  },
  {
    id: "web-application",
    name: "Web Application Development",
    href: "/services/web-application-development",
    icon: "window",
    description: "Create clear, useful digital experiences for your customers and teams.",
    context: "Frame the journeys your web experience needs to support, the audiences it serves and how it fits with your existing systems. Accessibility and clarity belong in the initial discussion.",
  },
  {
    id: "mobile-app",
    name: "Mobile App Development",
    href: "/services/mobile-app-development",
    icon: "phone",
    description: "Bring important journeys to the devices people use every day.",
    context: "Consider the moments where a mobile experience could help your users. Device needs, connectivity, accessibility and integration requirements should guide any proposed scope.",
  },
  {
    id: "cloud-solutions",
    name: "Cloud Solutions",
    href: "/services/cloud-solutions",
    icon: "cloud",
    description: "Plan foundations for evolving systems, thoughtful delivery and operational clarity.",
    context: "Map your current environment, delivery workflow and operational constraints. A cloud and DevOps conversation should clarify ownership, deployment needs and how change will be managed.",
  },
  {
    id: "business-process-automation",
    name: "Business Process Automation",
    href: "/services/business-process-automation",
    icon: "workflow",
    description: "Connect processes, people and technology around practical business change.",
    context: "Identify where disconnected processes or systems create friction. Start with a realistic change agenda, the people it affects and the outcomes that would make the work worthwhile.",
  },
] as const;

export type Capability = (typeof CORE_CAPABILITIES)[number];

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

export const NAVIGATION_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Products", href: "/products" },
  { label: "Insights", href: "/insights" },
  { label: "Global", href: "/global-customers" },
] as const;

export const FOOTER_BUILD_SERVICES = [
  { name: "Custom Software", href: "/services/custom-software-development" },
  { name: "Web Applications", href: "/services/web-application-development" },
  { name: "Mobile Apps", href: "/services/mobile-app-development" },
  { name: "SaaS Development", href: "/services/saas-development" },
  { name: "ERP & CRM", href: "/services/erp-crm-development" },
  { name: "AI Chatbots", href: "/services/ai-chatbots" },
] as const;

export const FOOTER_AUTOMATE_SERVICES = [
  { name: "AI Agents", href: "/services/ai-agents" },
  { name: "Workflow Automation", href: "/services/workflow-automation" },
  { name: "Business Process Automation", href: "/services/business-process-automation" },
  { name: "Data & AI Dashboards", href: "/services/data-analytics-ai-dashboards" },
  { name: "API Integrations", href: "/services/api-integrations" },
  { name: "Cloud Solutions", href: "/services/cloud-solutions" },
] as const;

export const FOOTER_INDUSTRIES = [
  { name: "Startups", href: "/industries/startups" },
  { name: "SMEs", href: "/industries/sme" },
  { name: "Enterprises", href: "/industries/enterprise" },
  { name: "Healthcare", href: "/industries/healthcare" },
  { name: "Education & EdTech", href: "/industries/education-edtech" },
  { name: "Manufacturing", href: "/industries/manufacturing" },
] as const;

export const FOOTER_COMPANY = [
  { name: "About Us", href: "/about" },
  { name: "Products", href: "/products" },
  { name: "Insights", href: "/insights" },
  { name: "Careers", href: "/careers" },
  { name: "Investors & Partners", href: "/investors-partners" },
  { name: "Global Customers", href: "/global-customers" },
] as const;

export const FOOTER_LEGAL = [
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms & Conditions", href: "/terms-conditions" },
  { name: "Cookie Policy", href: "/cookie-policy" },
  { name: "Disclaimer", href: "/disclaimer" },
  { name: "Data Security & Confidentiality", href: "/data-security-confidentiality" },
] as const;

export const FOOTER_SERVICES = FOOTER_BUILD_SERVICES;
export const FOOTER_SOLUTIONS = FOOTER_AUTOMATE_SERVICES;

export type PreviewDetail = {
  title: string;
  intro: string;
  paragraphs?: readonly string[];
  prompts?: readonly string[];
  notice: string;
};

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

export function getProductDetail(product: Product): PreviewDetail {
  return {
    title: product.name,
    intro: product.positioning,
    paragraphs: [product.value, SITE_IDENTITY.productEndorsement],
    notice: "This brief reflects approved product positioning within the RankRise Technologies ecosystem.",
  };
}

export const PREVIEW_DETAILS = {
  about: {
    title: "About RankRise Technologies",
    intro: SITE_IDENTITY.positioning,
    paragraphs: ["The company direction combines custom client technology with four in-house products: TriMarkity, 1SocialSnap, SalesApp and HRMS."],
    notice: "Company details reflect approved identity and leadership for RankRise Technologies.",
  },
  team: {
    title: "Leadership",
    intro: `RankRise Technologies is led by ${SITE_IDENTITY.leadership.join(" and ")}.`,
    notice: "Executive profiles and management details reflect approved corporate records.",
  },
  careers: {
    title: "Careers at RankRise",
    intro: "Explore opportunities to join RankRise Technologies in software engineering, AI, product and operational roles.",
    notice: "Submit job applications directly through the Careers page.",
  },
} as const satisfies Record<string, PreviewDetail>;

function servicePage(s: (typeof SERVICES_LIST)[number]): SitePage {
  return {
    slug: `services/${s.slug}`,
    title: `${s.name} | RankRise Technologies`,
    description: `${s.name} for startups, SMEs and enterprises. Build secure, scalable technology around real business requirements with RankRise Technologies.`,
    primaryKeyword: s.keyword,
    secondaryKeywords: [`${s.name.toLowerCase()} services`, `${s.name.toLowerCase()} solutions`, "software and AI company"],
    h1: s.name,
    eyebrow: "SERVICE",
    lead: `${s.short} We begin with the business problem, define the right scope, and then design a solution that can be maintained and extended as requirements evolve.`,
    schemaType: "Service",
    sections: [
      { heading: `When ${s.name} Makes Sense`, body: `This service is suitable when a standard tool cannot fully support your process, when systems need to connect, or when your team needs a more reliable digital workflow. We focus on practical scope rather than adding complexity for its own sake.`, bullets: [...s.useCases] },
      { heading: "Business Outcomes We Aim For", body: "Technology is valuable only when it changes how the business works. The exact outcome varies by project, but the solution should make processes clearer, faster or easier to manage.", bullets: [...s.outcomes] },
      { heading: "How We Deliver", body: "We move from discovery to requirement definition, UX and architecture, development, integrations, testing, deployment and support. The process is adapted to the project rather than forcing every client into the same template.", bullets: ["Discover", "Define", "Design", "Develop", "Integrate", "Test", "Deploy", "Support"] },
      { heading: "Technology & Integration", body: "Depending on the project, our stack can include Next.js, React, Node.js, Python, FastAPI, Django, Flutter, React Native, PostgreSQL, MongoDB, AWS, Google Cloud, Docker, REST APIs, GraphQL and integrations with AI platforms such as OpenAI, Gemini and Claude." },
      { heading: "Security, Confidentiality & Support", body: "We consider access control, secure integrations, data handling and deployment requirements during solution planning. NDA-based engagement can be used where appropriate, and ongoing maintenance or enhancement support can be scoped separately." }
    ],
    faq: [
      { q: s.name.toLowerCase().startsWith("custom ") ? `Can RankRise Technologies build a ${s.name.toLowerCase()} solution?` : `Can RankRise Technologies build a custom ${s.name.toLowerCase()} solution?`, a: `Yes. We can scope ${s.name.toLowerCase()} around your users, workflows, integrations and business objectives rather than limiting the project to a fixed package.` },
      { q: "Can this integrate with our existing systems?", a: "Often yes. We first review the systems, APIs, data access and security requirements before confirming the right integration approach." },
      { q: "Do you show fixed pricing on the website?", a: "No. Project scope can vary significantly, so we first understand the requirement and then propose an appropriate engagement." },
      ...COMMON_FAQ
    ],
    cta: { label: "Discuss Your Project", href: "/contact" },
    secondaryCta: { label: "View All Services", href: "/services" }
  };
}

function industryPage(i: (typeof INDUSTRIES)[number]): SitePage {
  return {
    slug: `industries/${i.slug}`,
    title: `${i.name} Software & AI Solutions | RankRise Technologies`,
    description: `Software, AI and automation solutions for ${i.name.toLowerCase()} from RankRise Technologies.`,
    primaryKeyword: i.keyword,
    secondaryKeywords: [`AI solutions for ${i.name.toLowerCase()}`, `${i.name.toLowerCase()} automation`, `${i.name.toLowerCase()} digital transformation`],
    h1: `Software & AI Solutions for ${i.name}`,
    eyebrow: "INDUSTRY",
    lead: i.pain,
    schemaType: "Service",
    sections: [
      { heading: `Technology Challenges in ${i.name}`, body: `${i.pain} We start by understanding where information, approvals, users and systems currently break down before proposing technology.` },
      { heading: "Solutions We Can Build", body: `Depending on the organisation, we can combine custom software, AI and automation rather than treating each requirement as an isolated project.`, bullets: [...i.solutions] },
      { heading: "A Business-First Approach", body: "We map the current process, identify users and decision points, define the data and integrations involved, and then choose the simplest architecture that can reliably meet the requirement." },
      { heading: "Relevant Services", body: "Typical projects may combine custom software development, web or mobile applications, ERP/CRM, workflow automation, AI chatbots or agents, dashboards, API integrations and cloud solutions." },
      { heading: "From Pilot to Scale", body: "Where appropriate, a project can begin with a focused MVP or pilot and expand after the workflow is validated. This helps reduce unnecessary complexity while keeping future growth in view." }
    ],
    faq: [
      { q: `Can you customise software for a ${i.name.toLowerCase()} organisation?`, a: "Yes. Requirements are scoped around the organisation's actual users, workflows, integrations and governance needs." },
      { q: `Can AI be added to existing ${i.name.toLowerCase()} systems?`, a: "Potentially. We review the existing application, available APIs or data access, privacy requirements and the specific use case before recommending an AI integration." },
      ...COMMON_FAQ
    ],
    cta: { label: "Discuss Your Project", href: "/contact" },
    secondaryCta: { label: "Explore Services", href: "/services" }
  };
}

function locationPage(l: (typeof LOCATIONS)[number]): SitePage {
  return {
    slug: `locations/${l.slug}`,
    title: `${l.primary.replace(/^./, (c) => c.toUpperCase())} | RankRise Technologies`,
    description: `Custom software, AI automation, SaaS, ERP/CRM, mobile apps and cloud solutions for businesses in ${l.name}.`,
    primaryKeyword: l.primary,
    h1: `Software Development & AI Solutions for ${l.name}`,
    eyebrow: "LOCATION",
    lead: `${l.note} Our service model covers discovery, development, integrations, deployment and ongoing support according to project needs.`,
    schemaType: "WebPage",
    sections: [
      { heading: `Technology Services for ${l.name} Businesses`, body: `We support organisations in ${l.name} with custom software, web and mobile applications, SaaS platforms, ERP/CRM, AI agents, chatbots, workflow automation, dashboards, API integrations and cloud solutions.` },
      { heading: "How Engagement Works", body: "Projects can begin with an online discovery meeting, requirement document or prototype discussion. We define scope, milestones and communication before development begins." },
      { heading: "Industries We Support", body: "Our capabilities are relevant to startups, SMEs, enterprises, healthcare, education, manufacturing, real estate, retail/eCommerce, professional services and institutions." },
      { heading: "Why RankRise Technologies", body: "We combine software engineering, AI and automation under one technology partner, with a practical emphasis on maintainability, scalability, confidentiality and clear project communication." }
    ],
    faq: [
      { q: `Do you have an office in ${l.name}?`, a: l.slug === "kolhapur" ? `Yes. Our registered office is in Kolhapur at ${SITE_IDENTITY.address}.` : `This page represents service availability for ${l.name}; it does not claim a physical RankRise Technologies office in the city.` },
      { q: `Can you handle projects remotely for ${l.name} clients?`, a: "Yes. Discovery, reviews, development coordination and support can be managed remotely, with scheduled meetings where appropriate." },
      ...COMMON_FAQ
    ],
    cta: { label: "Discuss Your Project", href: "/contact" }
  };
}

export const staticPages: SitePage[] = [
  {
    slug: "",
    title: "Software Development & AI Automation | RankRise Technologies",
    description: "RankRise Technologies builds custom software, SaaS products, AI agents, automation, ERP/CRM, dashboards and cloud solutions for India and global customers.",
    primaryKeyword: "software development and AI automation company",
    secondaryKeywords: ["custom software development", "AI automation company", "AI solutions company", "SaaS development", "business automation"],
    h1: "Build Smarter Software. Automate Business. Scale with Confidence.",
    eyebrow: "SOFTWARE • AI • AUTOMATION",
    lead: "RankRise Technologies helps startups, SMEs and enterprises turn business problems into scalable software, intelligent applications and practical AI automation.",
    schemaType: "WebPage",
    sections: [
      { heading: "Technology Built Around Your Business", body: "We start with the way your business actually works—its users, bottlenecks, data, systems and growth plans. Then we design software, AI and automation around those realities instead of forcing you into a generic technology template." },
      { heading: "Software Development", body: "Build custom business systems, web applications, mobile apps, SaaS platforms and ERP/CRM solutions with an architecture designed for your users and future requirements.", bullets: ["Custom Software", "Web Applications", "Mobile Apps", "SaaS", "ERP & CRM"] },
      { heading: "AI Solutions & Automation", body: "Use AI where it creates practical value: customer communication, knowledge assistance, workflow automation, data processing, reporting and multi-step task support.", bullets: ["AI Chatbots", "AI Agents", "Workflow Automation", "Business Process Automation", "AI Dashboards"] },
      { heading: "India & Global Delivery", body: `India-focused engagements are supported by ${SITE_IDENTITY.legalIndia}. Global customer work is supported through ${SITE_IDENTITY.legalUs}. The website presents one common RankRise Technologies technology ecosystem while keeping the legal operating entities transparent.` },
      { heading: "Our Technology Stack", body: "Our capabilities include Next.js, React, Node.js, Python, FastAPI, Django, Flutter, React Native, PostgreSQL, MongoDB, AWS, Google Cloud, Docker, REST, GraphQL and AI integrations using OpenAI, Gemini and Claude." },
      { heading: "Security, Confidentiality & Long-Term Support", body: "We plan for appropriate access controls, secure integrations and deployment practices from the beginning. NDA arrangements can be used where suitable, and post-launch support can cover maintenance, enhancements, scaling and technology upgrades." }
    ],
    faq: [
      { q: "What does RankRise Technologies do?", a: "We provide custom software development, web and mobile applications, SaaS development, ERP/CRM, AI chatbots, AI agents, workflow and business process automation, analytics dashboards, API integrations and cloud solutions." },
      { q: "Do you serve customers outside India?", a: "Yes. India-focused engagements are supported through RankRise Technologies Private Limited, while global customer work can be supported through RankRise Corporation." },
      { q: "Do you sell SaaS products as well as custom services?", a: "Yes. The RankRise ecosystem includes products such as TriMarkity, 1SocialSnap, SalesApp, and HRMS." },
      ...COMMON_FAQ
    ],
    cta: { label: "Discuss Your Project", href: "/contact" },
    secondaryCta: { label: "Explore Services", href: "/services" }
  },
  {
    slug: "about",
    title: "About RankRise Technologies",
    description: "Learn about RankRise Technologies, our India and US entities, leadership, approach, technology capabilities and business-first philosophy.",
    primaryKeyword: "RankRise Technologies",
    h1: "Technology With a Business Purpose",
    eyebrow: "ABOUT",
    lead: "RankRise Technologies was established in 2026 to help businesses use software, AI and automation in ways that are practical, scalable and directly connected to real operating needs.",
    schemaType: "AboutPage",
    sections: [
      { heading: "Our Story", body: "We believe technology projects should begin with a clear business problem, not with a fashionable tool. That principle guides how we approach custom software, AI, automation and cloud solutions for organisations at different stages of growth." },
      { heading: "One Brand, Two Operating Entities", body: `${SITE_IDENTITY.legalIndia} supports India-focused business. ${SITE_IDENTITY.legalUs} supports global customer engagements. Together they operate under the common RankRise Technologies brand and technology ecosystem.` },
      { heading: "Our Vision", body: "To help businesses grow through intelligent, scalable and accessible technology." },
      { heading: "Our Mission", body: "To design and deliver reliable software, AI and automation solutions that simplify operations, improve decision-making and create stronger digital foundations." },
      { heading: "Leadership", body: `${SITE_IDENTITY.leadership.join(" and ")} lead RankRise Technologies across technology architecture, operations, client solutions and global expansion.` },
      { heading: "How We Work", body: "We emphasise clear requirements, practical architecture, transparent communication, confidentiality and long-term maintainability rather than overcomplicating a project." }
    ],
    faq: COMMON_FAQ,
    cta: { label: "Discuss Your Project", href: "/contact" },
    secondaryCta: { label: "Explore Services", href: "/services" }
  },
  {
    slug: "services",
    title: "Software Development & AI Services | RankRise Technologies",
    description: "Explore custom software, web and mobile apps, SaaS, ERP/CRM, AI agents, chatbots, automation, analytics, API integration and cloud services.",
    primaryKeyword: "software and AI services",
    h1: "Software Development & AI Services",
    eyebrow: "SERVICES",
    lead: "One technology partner for custom software, intelligent automation, connected systems and scalable digital products.",
    schemaType: "Service",
    sections: [
      { heading: "Software Development Services", body: "Build the digital product or internal system your business actually needs, from custom applications to SaaS, ERP/CRM and mobile experiences.", bullets: SERVICES_LIST.slice(0, 5).map(s => s.name) },
      { heading: "AI Solutions & Automation", body: "Apply AI and automation to customer communication, business workflows, knowledge tasks, reporting and operations.", bullets: SERVICES_LIST.slice(5, 10).map(s => s.name) },
      { heading: "Integration & Cloud", body: "Connect existing tools through APIs and deploy solutions using cloud infrastructure designed around performance, maintainability and scale.", bullets: SERVICES_LIST.slice(10).map(s => s.name) },
      { heading: "Not Sure What You Need?", body: "You do not need to arrive with a technical specification. Tell us the business problem, the users involved and what you want to improve; we can help define the appropriate technology direction." }
    ],
    faq: COMMON_FAQ,
    cta: { label: "Discuss Your Project", href: "/contact" }
  },
  {
    slug: "services/software-development",
    title: "Software Development Company | RankRise Technologies",
    description: "Custom software, web apps, mobile apps, SaaS and ERP/CRM development for growing businesses.",
    primaryKeyword: "software development company",
    h1: "Software Development That Fits the Business",
    eyebrow: "SOFTWARE DEVELOPMENT",
    lead: "From internal systems to customer-facing products, we build software around real workflows, clear requirements and future scale.",
    schemaType: "Service",
    sections: [
      { heading: "What We Build", body: "Our software development capability covers digital products, operational systems and connected business applications.", bullets: SERVICES_LIST.slice(0, 5).map(s => s.name) },
      { heading: "Business-First Discovery", body: "We first understand users, workflows, decisions, data and integrations. That makes it easier to define a useful MVP, avoid unnecessary features and plan the architecture around what matters." },
      { heading: "Modern Engineering Stack", body: "We work with Next.js, React, Node.js, Python, FastAPI, Django, Flutter, React Native, PostgreSQL, MongoDB, AWS, Google Cloud and Docker, selecting the stack according to the project." },
      { heading: "Designed for Change", body: "Good business software should be maintainable. We plan for future users, modules, integrations, reporting needs and operational changes rather than treating launch as the end of the product." }
    ],
    faq: COMMON_FAQ,
    cta: { label: "Discuss Your Software Project", href: "/contact" },
    secondaryCta: { label: "View Software Services", href: "/services" }
  },
  {
    slug: "services/ai-solutions-automation",
    title: "AI Solutions & Automation Company | RankRise Technologies",
    description: "AI agents, chatbots, workflow automation, business process automation and AI dashboards for practical business use cases.",
    primaryKeyword: "AI automation company",
    h1: "AI Solutions & Automation for Real Business Work",
    eyebrow: "AI & AUTOMATION",
    lead: "We help businesses apply AI where it can genuinely improve communication, information handling, workflows and decisions.",
    schemaType: "Service",
    sections: [
      { heading: "Practical AI Capabilities", body: "Our AI work focuses on usable outcomes rather than demos that never reach operations.", bullets: SERVICES_LIST.slice(5, 10).map(s => s.name) },
      { heading: "AI With Human Oversight", body: "Not every task should be fully autonomous. We design workflows with suitable approval points, auditability and escalation paths where business risk or judgement matters." },
      { heading: "Integrate With Existing Systems", body: "AI can often add more value when connected to existing applications, APIs, data stores, CRMs, internal documents and workflow tools." },
      { heading: "Choose AI Only Where It Helps", body: "Some problems are better solved with rules-based automation or conventional software. We evaluate the requirement before deciding whether AI is actually the right tool." }
    ],
    faq: COMMON_FAQ,
    cta: { label: "Discuss an AI Use Case", href: "/contact" },
    secondaryCta: { label: "View AI Services", href: "/services" }
  },
  {
    slug: "industries",
    title: "Industries We Serve | RankRise Technologies",
    description: "Software, AI and automation solutions for startups, SMEs, enterprises, healthcare, education, manufacturing, real estate and more.",
    primaryKeyword: "industry software and AI solutions",
    h1: "Technology Solutions for Different Industries",
    eyebrow: "INDUSTRIES",
    lead: "The same technology can solve very different problems in different sectors. We tailor the solution around the workflow, users and industry context.",
    sections: [
      { heading: "Industry-Specific Thinking", body: "We avoid simply relabelling the same solution for every sector. Each engagement starts with the actual operating environment, information flow and business objective." },
      { heading: "Industries", body: "Explore dedicated pages for the sectors we support.", bullets: INDUSTRIES.map(i => i.name) }
    ],
    cta: { label: "Discuss Your Industry Requirement", href: "/contact" }
  },
  {
    slug: "products",
    title: "Products | RankRise Technologies",
    description: "Explore RankRise technology products including TriMarkity, 1SocialSnap, SalesApp, and HRMS, with direct access to dedicated product platforms.",
    primaryKeyword: "RankRise technology products",
    h1: "Products Built Within the RankRise Ecosystem",
    eyebrow: "PRODUCTS",
    lead: "Alongside custom technology services, the RankRise ecosystem develops purpose-built SaaS products for business growth, marketing automation, sales execution, and workplace management.",
    schemaType: "WebPage",
    sections: [
      {
        heading: "TriMarkity",
        body: "TriMarkity is an all-in-one B2B growth platform combining lead intelligence, email marketing, cloud telephony, CRM and AI-powered campaign optimisation. Open the dedicated product page here, then continue to the live product website when you are ready.",
        bullets: ["Lead intelligence", "Email marketing", "Cloud telephony", "CRM", "AI campaign optimisation"]
      },
      {
        heading: "1SocialSnap",
        body: "1SocialSnap is an AI-powered social media management and automation product within the RankRise ecosystem. Its internal product page provides an overview before linking directly to the dedicated product website.",
        bullets: ["Social media planning", "Multi-channel publishing", "AI content assistance", "Workflow automation"]
      },
      {
        heading: "SalesApp",
        id: "salesapp",
        body: "SalesApp is a high-velocity sales activity and pipeline management platform designed to turn daily sales interactions into structured, measurable sales performance across leads, follow-ups, and closed deals.",
        bullets: ["Activity & pipeline tracking", "Lead follow-up reminders", "Field-force & inside sales coordination", "Performance analytics"]
      },
      {
        heading: "HRMS",
        id: "hrms",
        body: "HRMS is a comprehensive human resource management platform engineered for people operations, attendance, leaves, employee lifecycle workflows, and organizational transparency.",
        bullets: ["Employee lifecycle management", "Attendance & leave tracking", "Payroll & compliance support", "Self-service employee portal"]
      }
    ],
    cta: { label: "Explore TriMarkity", href: "/products/trimarkity" },
    secondaryCta: { label: "Explore 1SocialSnap", href: "/products/1socialsnap" }
  },
  {
    slug: "products/trimarkity",
    title: "TriMarkity | B2B Growth SaaS Product",
    description: "Explore TriMarkity, a B2B growth SaaS platform for lead intelligence, email marketing, cloud telephony, CRM and AI campaign optimisation.",
    primaryKeyword: "TriMarkity",
    h1: "TriMarkity",
    eyebrow: "RANKRISE PRODUCT",
    lead: "An integrated B2B growth platform designed to bring lead intelligence, outreach, telephony, CRM and AI-supported campaign optimisation into one connected workflow.",
    schemaType: "SoftwareApplication",
    sections: [
      { heading: "What TriMarkity Brings Together", body: "TriMarkity is designed for B2B teams that want fewer disconnected growth tools and better visibility across prospecting, outreach and customer engagement.", bullets: ["Lead intelligence", "Email marketing", "Cloud telephony", "CRM", "AI-powered campaign optimisation"] },
      { heading: "Who It Is For", body: "The product is intended for B2B sales and growth teams that need a more connected approach to lead generation, outreach and follow-up." },
      { heading: "Dedicated Product Experience", body: "Product features, plans, onboarding, demos and live product updates are maintained on the dedicated TriMarkity website so visitors always see the most current product information." }
    ],
    cta: { label: "Visit TriMarkity Website ↗", href: SITE_IDENTITY.trimarkity, external: true },
    secondaryCta: { label: "Back to Products", href: "/products" }
  },
  {
    slug: "products/1socialsnap",
    title: "1SocialSnap | AI Social Media Product",
    description: "Explore 1SocialSnap, an AI-powered social media management and automation product within the RankRise ecosystem.",
    primaryKeyword: "1SocialSnap",
    h1: "1SocialSnap",
    eyebrow: "RANKRISE PRODUCT",
    lead: "An AI-powered product focused on simplifying social media planning, management and automation workflows.",
    schemaType: "SoftwareApplication",
    sections: [
      { heading: "Designed for Social Workflows", body: "1SocialSnap is intended to make social media operations easier to plan and manage through a more connected, AI-assisted experience." },
      { heading: "Product Information Stays Current", body: "Detailed features, live product changes, onboarding and product-specific commercial information are maintained on the dedicated 1SocialSnap website." },
      { heading: "Part of the RankRise Ecosystem", body: "The product sits alongside RankRise Technologies' software, AI and automation capabilities while keeping its own product-focused website and experience." }
    ],
    cta: { label: "Visit 1SocialSnap Website ↗", href: SITE_IDENTITY.socialsnap, external: true },
    secondaryCta: { label: "Back to Products", href: "/products" }
  },
  {
    slug: "global-customers",
    title: "Software & AI Solutions for Global Customers | RankRise Technologies",
    description: "RankRise Corporation supports global customers with software development, AI solutions and automation services.",
    primaryKeyword: "global software development and AI solutions",
    h1: "Software & AI Delivery for Global Customers",
    eyebrow: "GLOBAL",
    lead: `Global customer engagements are supported through ${SITE_IDENTITY.legalUs}, with software engineering and AI capabilities delivered through the common RankRise Technologies ecosystem.`,
    sections: [
      { heading: "Global Technology Services", body: "Global customers can engage RankRise for custom software, SaaS, web and mobile applications, ERP/CRM, AI agents, chatbots, automation, dashboards, integrations and cloud solutions." },
      { heading: "Remote-First Collaboration", body: "Project discovery, design reviews, development coordination and support can be organised remotely with documented requirements, milestones and communication routines." },
      { heading: "One Technology Ecosystem", body: "The India and US entities share a common service and product architecture while the appropriate legal entity can be used for the specific customer engagement." }
    ],
    cta: { label: "Discuss a Global Project", href: "/contact?region=global" }
  },
  {
    slug: "portfolio",
    title: "Portfolio | RankRise Technologies",
    description: "Selected RankRise Technologies projects and case studies will be published here after client approval.",
    h1: "Selected Technology Projects",
    eyebrow: "PORTFOLIO",
    lead: "We are preparing approved case studies for publication. We will not publish fabricated project results, client logos or metrics.",
    noindex: true,
    sections: [
      { heading: "What Future Case Studies Will Show", body: "Each approved case study will explain the business challenge, solution, technology, implementation approach and measurable outcome where the client permits publication." },
      { heading: "Need Relevant Experience?", body: "Tell us what you are planning to build. During a project discussion, we can explain our relevant capabilities without publishing confidential client information." }
    ],
    cta: { label: "Discuss Your Project", href: "/contact" }
  },
  {
    slug: "insights",
    title: "Software, AI & Automation Insights | RankRise Technologies",
    description: "Practical articles about custom software, AI agents, automation, SaaS, ERP/CRM, cloud and digital transformation.",
    primaryKeyword: "software and AI insights",
    h1: "Technology Insights for Growing Businesses",
    eyebrow: "INSIGHTS",
    lead: "Plain-English guidance on software, AI and automation decisions for business owners, product teams and operational leaders.",
    sections: [
      { heading: "What We Write About", body: "Our content focuses on practical technology decisions: when to build custom software, where AI is useful, how automation should be planned and what businesses should consider before investing in a system.", bullets: INSIGHT_ARTICLES.map(a => a.title) }
    ],
    cta: { label: "Discuss Your Technology Requirement", href: "/contact" }
  },
  {
    slug: "careers",
    title: "Careers at RankRise Technologies",
    description: "Explore career opportunities at RankRise Technologies in software development, AI, product, design and business roles.",
    primaryKeyword: "careers at RankRise Technologies",
    h1: "Build Technology That Solves Real Problems",
    eyebrow: "CAREERS",
    lead: "We are building a team that values practical thinking, learning, accountability and clear communication.",
    sections: [
      { heading: "Who We Look For", body: "Depending on open positions, we hire developers, AI engineers, product and UI/UX professionals, interns, and sales professionals." },
      { heading: "Application Details", body: "Applicants can submit their details, portfolio/LinkedIn URL, resume and message directly through our online application form." }
    ],
    cta: { label: "Apply Now", href: "#apply" }
  },
  {
    slug: "investors-partners",
    title: "Investors & Partners | RankRise Technologies",
    description: "Explore strategic partnerships, technology alliances, business collaborations and investor conversations with RankRise Technologies.",
    primaryKeyword: "RankRise Technologies partnerships",
    h1: "Build the Next Opportunity Together",
    eyebrow: "INVESTORS & PARTNERS",
    lead: "We are open to thoughtful conversations with strategic partners, technology collaborators, channel partners and investors aligned with the long-term RankRise ecosystem.",
    sections: [
      { heading: "Strategic Partnerships", body: "We welcome discussions with organisations that can create complementary value through technology, market access, implementation capability or product collaboration." },
      { heading: "Technology Alliances", body: "Potential alliances may involve platforms, cloud providers, implementation partners, specialist engineering teams and other technology ecosystems." },
      { heading: "Investor Conversations", body: "Any investment discussion is based on approved company information. The website will not publish unverified financial projections, valuations or return claims." }
    ],
    cta: { label: "Start a Partnership Conversation", href: "#partner" }
  },
  {
    slug: "contact",
    title: "Contact RankRise Technologies",
    description: "Discuss a software, AI or automation project with RankRise Technologies. Contact our India or global technology team.",
    primaryKeyword: "contact RankRise Technologies",
    h1: "Tell Us What You Want to Build or Improve",
    eyebrow: "CONTACT",
    lead: "You do not need a finished technical specification. Share the business requirement, current problem or product idea and we can take the discussion forward.",
    schemaType: "ContactPage",
    sections: [
      { heading: "India", body: `${SITE_IDENTITY.legalIndia}\n${SITE_IDENTITY.address}\nPhone / WhatsApp: ${SITE_IDENTITY.phone}` },
      { heading: "Global", body: `${SITE_IDENTITY.legalUs} supports global customer engagements. Select Global as the region in the project form.` },
      { heading: "Consultation & Callback", body: "Use our contact form to share your requirement, request a scheduled callback, or book a discovery consultation." }
    ]
  },
  {
    slug: "privacy-policy",
    title: "Privacy Policy | RankRise Technologies",
    description: "Privacy policy for RankRise Technologies website enquiries, forms, analytics and communications.",
    h1: "Privacy Policy",
    eyebrow: "LEGAL",
    lead: "How RankRise Technologies handles website enquiries, submitted information and configured analytics tools.",
    sections: [
      { heading: "Information We Collect", body: "We collect information you submit through enquiry, callback, consultation, careers or partnership forms, including contact details, company details, uploaded documents and project information." },
      { heading: "How We Use Information", body: "Information is used to respond to enquiries, evaluate project or employment requests, communicate about services, improve website operations and meet legal or security obligations." },
      { heading: "Third-Party Services", body: "The website may use hosting, analytics, email delivery, AI or other infrastructure providers. Their processing is subject to their own terms and applicable agreements." },
      { heading: "Retention & Security", body: "We aim to retain information only as reasonably necessary and apply appropriate technical and organisational safeguards based on the nature of the data." },
      { heading: "Contact", body: `For privacy-related questions, contact ${SITE_IDENTITY.email}.` }
    ]
  },
  {
    slug: "terms-conditions",
    title: "Terms & Conditions | RankRise Technologies",
    description: "Website terms and conditions for RankRise Technologies.",
    h1: "Terms & Conditions",
    eyebrow: "LEGAL",
    lead: "General terms governing use of the RankRise Technologies website and the distinction between website information and project-specific agreements.",
    sections: [
      { heading: "Website Information", body: "Website content is provided for general business information and does not itself create a binding commercial engagement." },
      { heading: "Project Engagements", body: "Any development, consulting, product or support engagement is governed by the specific proposal, agreement, scope, commercial terms and other documents accepted by the relevant parties." },
      { heading: "Intellectual Property", body: "Website branding and original site content are protected by applicable intellectual property laws. Project-specific intellectual property terms are defined separately in the relevant agreement." },
      { heading: "External Links", body: "The website may link to external product and ecosystem websites, including TriMarkity, 1SocialSnap and ASM RankRise Services. External sites operate under their own terms and policies." },
      { heading: "Governing Law", body: "Use of this website is governed by the applicable laws of India and the jurisdiction of courts in Kolhapur, Maharashtra." }
    ]
  },
  {
    slug: "cookie-policy",
    title: "Cookie Policy | RankRise Technologies",
    description: "Cookie policy for RankRise Technologies analytics and website preferences.",
    h1: "Cookie Policy",
    eyebrow: "LEGAL",
    lead: "How cookies and similar technologies may be used for essential functionality, preferences, analytics and marketing measurement.",
    sections: [
      { heading: "What Cookies Do", body: "Cookies and similar technologies may support essential website functionality, user preferences, analytics and marketing measurement." },
      { heading: "Analytics", body: "Where enabled, Google Analytics may be used to understand aggregated website usage and conversion events." },
      { heading: "Marketing Measurement", body: "Where enabled and consented to, Meta Pixel or similar tools may be used for campaign measurement." },
      { heading: "Your Choices", body: "Non-essential analytics and marketing tools are activated according to the consent configuration used on the website." }
    ]
  },
  {
    slug: "disclaimer",
    title: "Disclaimer | RankRise Technologies",
    description: "General website disclaimer for RankRise Technologies.",
    h1: "Disclaimer",
    eyebrow: "LEGAL",
    lead: "Important limitations on website information, technical feasibility statements and references to third-party technologies.",
    sections: [
      { heading: "General Information", body: "Information on this website is intended to describe our services, products and capabilities in general terms. It should not be treated as a technical guarantee, legal advice or a binding project commitment." },
      { heading: "Project Feasibility", body: "Technical feasibility, scope, timeline, security requirements and integrations must be evaluated for the specific project before any commitment is made." },
      { heading: "Third-Party Platforms", body: "References to third-party technologies or platforms do not imply ownership or endorsement unless explicitly stated." }
    ]
  },
  {
    slug: "data-security-confidentiality",
    title: "Data Security & Confidentiality | RankRise Technologies",
    description: "Overview of RankRise Technologies' approach to confidentiality, secure development and project information handling.",
    h1: "Data Security & Confidentiality",
    eyebrow: "SECURITY",
    lead: "Security and confidentiality requirements vary by project. We consider them during discovery and architecture rather than treating them as a final checklist.",
    sections: [
      { heading: "Confidential Project Discussions", body: "NDA arrangements can be used where appropriate before sensitive technical or business information is shared." },
      { heading: "Access & Authentication", body: "Projects may include role-based access, authentication controls, secure APIs and least-privilege practices according to the application." },
      { heading: "Data Handling", body: "Data storage, transmission, backups, retention and third-party processing are defined according to the project and applicable requirements." },
      { heading: "Deployment Security", body: "Cloud and deployment controls include secrets management, environment separation, secure configuration and operational monitoring where required." },
      { heading: "Security Practices", body: "We design with privacy and security principles in mind across the entire software development lifecycle." }
    ],
    cta: { label: "Discuss a Confidential Project", href: "/contact" }
  },
  {
    slug: "maintenance",
    title: "Maintenance | RankRise Technologies",
    description: "RankRise Technologies maintenance page.",
    h1: "We're Improving the Experience",
    eyebrow: "MAINTENANCE",
    lead: "If the main website is temporarily unavailable, you can still reach us by phone or WhatsApp.",
    noindex: true,
    sections: [{ heading: "Contact", body: `${SITE_IDENTITY.phone} • ${SITE_IDENTITY.email}` }],
    cta: { label: "WhatsApp Us", href: SITE_IDENTITY.whatsapp, external: true }
  }
];

export const generatedPages: SitePage[] = [
  ...SERVICES_LIST.map(servicePage),
  ...INDUSTRIES.map(industryPage),
  ...LOCATIONS.map(locationPage),
  ...INSIGHT_ARTICLES.map((a): SitePage => ({
    slug: `insights/${a.slug}`,
    title: `${a.title} | RankRise Technologies`,
    description: a.intro,
    primaryKeyword: a.keyword,
    h1: a.title,
    eyebrow: "INSIGHT",
    lead: a.intro,
    schemaType: "Article",
    sections: [
      { heading: "The Practical Answer", body: a.intro },
      ...a.points.map((p, index) => ({
        heading: p,
        body: `This is an important part of the decision because technology choices should be based on the actual workflow, users, data and expected business outcome. ${
          index === 0
            ? "Start by defining the current problem before choosing a platform or architecture."
            : "The right approach depends on context rather than a one-size-fits-all rule."
        }`
      })),
      { heading: "How RankRise Technologies Approaches It", body: "We begin with discovery, define requirements and constraints, and then decide whether custom software, automation, AI or integration is the most appropriate direction." }
    ],
    cta: { label: "Discuss Your Requirement", href: "/contact" },
    secondaryCta: { label: "More Insights", href: "/insights" }
  }))
];

export const ALL_PAGES: SitePage[] = [...staticPages, ...generatedPages];
export const allPages = ALL_PAGES;

export function getSitePageBySlug(slugSegments?: readonly string[]): SitePage | undefined {
  const slug = slugSegments ? slugSegments.join("/") : "";
  return ALL_PAGES.find((p) => p.slug === slug);
}

export const getPage = getSitePageBySlug;

export function pageHref(slug: string): string {
  return slug ? `/${slug}` : "/";
}
