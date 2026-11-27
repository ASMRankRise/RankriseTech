export const PROCESS_STAGES = [
  { name: "Discover", code: "01", tag: "SIGNAL // AUDIT", description: "Understand your goals, users and the challenge that matters." },
  { name: "Strategize", code: "02", tag: "SCOPE // MATRIX", description: "Align priorities, define scope and make a considered plan." },
  { name: "Design", code: "03", tag: "SYSTEM // FLOW", description: "Turn the direction into clear journeys and a coherent system." },
  { name: "Develop", code: "04", tag: "BUILD // ITERATE", description: "Build in purposeful increments with room for useful feedback." },
  { name: "Test & Deploy", code: "05", tag: "GATE // VERIFY", description: "Evaluate the work against agreed needs and prepare its release." },
  { name: "Support & Scale", code: "06", tag: "SCALE // TELEMETRY", description: "Plan for ongoing ownership, improvement and changing needs." },
] as const;

export const WHY_RANKRISE = [
  { title: "End-to-end engineering", description: "Consider the whole journey, not just the implementation." },
  { title: "Practical AI approach", description: "Let the problem lead. Use intelligence where it has a clear purpose." },
  { title: "In-house product experience", description: "Bring a product mindset to usability, iteration and the long view." },
  { title: "Multi-industry focus", description: "Start with the context of each industry, rather than a one-size-fits-all answer." },
  { title: "Scalable architecture", description: "Make thoughtful foundations for systems that need to evolve." },
  { title: "Long-term partnership", description: "Value clarity, shared decisions and continuity beyond the first release." },
] as const;

export const GLOBAL_HERO_COPY = {
  headlineLead: "Building Intelligent Software",
  headlineHighlight: "for a Smarter Digital World.",
  description:
    "We engineer custom software, AI-powered solutions and scalable digital products that help businesses innovate, automate and grow.",
  ctaLabel: "Start a Project",
  glassCards: [
    {
      title: "AI-Powered Solutions",
      description: "Custom software, intelligent automation, and scalable cloud architectures.",
    },
    {
      title: "In-House Products",
      description: "TriMarkity, 1SocialSnap, SalesApp, and HRMS enterprise suite.",
    },
  ],
} as const;

export const DEFAULT_HERO_COPY = {
  eyebrow: "Engineering a connected future",
  headlineLead: "Building Intelligent Software for a ",
  headlineHighlight: "Smarter Digital World.",
  primaryCta: "Explore Our Capabilities",
  secondaryCta: "Discuss Your Project",
  telemetry: [
    "4 In-House Products",
    "10 Industry Domains",
    "6-Stage Delivery Process",
    "Strict Type-Safe Core",
  ],
  previewNote: "Building Intelligence",
  previewNoteSub: "Driving Growth",
  hudTop: "RR-CORE / VERIFIED",
  hudBottom: "RUNTIME / NEXT.JS APP ROUTER",
} as const;

export const COMPANY_STATS_COPY = {
  eyebrowPrimary: "Beyond the brief",
  eyebrowSecondary: "RankRise Technologies",
  heading: "Beyond Development. We Engineer Possibilities.",
  description:
    "Custom-built for your challenges. Product-minded by design. RankRise Technologies brings software engineering, AI innovation and digital transformation into one connected direction.",
  aboutLabel: "About RankRise",
  footerText: "Dual corporate presence: Maharashtra, India & Delaware, United States.",
  footerLinkLabel: "Explore in-house products →",
  stats: [
    {
      id: "stone-4",
      value: "4",
      isKey: false,
      scale: 80,
      glyphs: [{ character: "4", lean: -5 }],
      title: "Proprietary SaaS Products",
      description: "TriMarkity, 1SocialSnap, SalesApp, and HRMS built and maintained in-house.",
    },
    {
      id: "stone-6",
      value: "6",
      isKey: true,
      scale: 80,
      glyphs: [{ character: "6", lean: 4 }],
      title: "Core Engineering Capabilities",
      description: "Custom software, AI automation, web & mobile platforms, cloud systems, and BPA.",
    },
    {
      id: "stone-10",
      value: "10",
      isKey: false,
      scale: 74,
      glyphs: [
        { character: "1", lean: -6 },
        { character: "0", lean: 6 },
      ],
      title: "Industry Verticals Served",
      description: "Startups, SMEs, enterprise, healthcare, manufacturing, real estate, and retail.",
    },
  ],
} as const;

export const PORTFOLIO_SLOTS = [
  {
    index: "01",
    tag: "Showcase Slot · Web & Cloud",
    title: "Case Study 1",
    summary:
      "Preview slot for an approved enterprise platform architecture, integration topology, and verified delivery scope.",
    status: "Awaiting approved publication",
  },
  {
    index: "02",
    tag: "Showcase Slot · AI & Automation",
    title: "Case Study 2",
    summary:
      "Preview slot for an approved intelligent workflow, orchestration pipeline, and operational outcome.",
    status: "Awaiting approved publication",
  },
  {
    index: "03",
    tag: "Showcase Slot · Product Engineering",
    title: "Case Study 3",
    summary:
      "Preview slot for an approved digital product build, multi-tenant system design, and release milestone.",
    status: "Awaiting approved publication",
  },
] as const;

export const WHY_RANKRISE_COPY = {
  eyebrow: "Our working philosophy",
  heading: "Why RankRise",
  leadLine1: "A considered approach.",
  leadLine2: "A shared ambition.",
  description:
    "These core principles define every engagement: clear communication, architectural rigor, and technology engineered to create tangible business momentum.",
} as const;

export const HOMEPAGE_SECTIONS_COPY = {
  capabilities: {
    eyebrow: "Core Capabilities",
    headingLine1: "Engineering around",
    headingLine2: "what matters.",
    lead: "From a focused application to a broader digital change, start with the right problem and a clear direction.",
  },
  products: {
    eyebrow: "Our in-house products",
    heading: "Innovation That We Build. Products That We Own.",
    lead: "Four distinct product directions. One engineering mindset. Purpose-built platforms designed to streamline operations, enhance social engagement, and accelerate growth.",
  },
  industries: {
    eyebrow: "Context comes first",
    heading: "Industries We Serve",
    lead: "Specialized domain insights and tailored technology solutions engineered across ten core industry sectors.",
  },
  portfolio: {
    eyebrow: "Portfolio & Case Studies",
    heading: "Selected Technology Projects",
  },
  insights: {
    eyebrow: "Insights",
    heading: "Ideas worth sharing.",
    lead: "Thoughtful perspectives on software engineering, pragmatic AI architecture, and digital transformation.",
    ctaLabel: "Explore all insights",
  },
  finalCta: {
    eyebrow: "Your next possibility · RankRise Technologies",
    headline: "Have an Idea? Let's Engineer It.",
    locationSummary: "Kolhapur, India · US & Global",
  },
} as const;

export const AI_STAGE_MODES = [
  {
    code: "01 / ML & FORECASTING",
    flow: ["Signals", "Pattern Model", "Decision Support"],
  },
  {
    code: "02 / GENAI & RAG",
    flow: ["Approved Docs", "Retrieval", "Grounded Output"],
  },
  {
    code: "03 / AGENT WORKFLOWS",
    flow: ["Trigger", "Orchestration", "Human Oversight"],
  },
  {
    code: "04 / NLP & VISION",
    flow: ["Text & Frames", "Extraction", "Structured Action"],
  },
] as const;
