import { SITE_IDENTITY } from "./site";

export const CHAT_WIDGET_COPY = {
  quickPrompts: [
    "What services do you offer?",
    "Can you build AI agents?",
    "What is TriMarkity?",
    "How do I start a project?",
  ] as const,
  initialMessages: [
    {
      role: "assistant" as const,
      text: "Hi — I’m the RankRise assistant. Tell me what you want to build, automate or improve, or ask me about our services and products.",
    },
  ],
  title: "RankRise AI",
  subtitle: "Website assistant",
  placeholder: "Ask RankRise anything…",
  fallbackReply: "Please use Discuss Your Project for a detailed conversation.",
  errorReply: "I could not connect just now. You can still use our project form to get in touch.",
  disclaimer: "AI answers company questions. Project scope still needs human review.",
} as const;

export const LEAD_FORM_COPY = {
  maxFileSizeBytes: 4 * 1024 * 1024,
  fileTooLargeError: "File exceeds the 4 MB limit. Please select a smaller file.",
  submitLabels: {
    career: "Submit Application",
    partner: "Start Conversation",
    callback: "Request Callback",
    consultation: "Request Consultation",
    project: "Discuss Your Project",
  },
  regionOptions: ["India", "Global"] as const,
} as const;

export const COOKIE_BANNER_COPY = {
  title: "Cookie preferences",
  essentialLabel: "Essential Only",
  acceptLabel: "Accept All",
} as const;

export const ABOUT_PROOF_CARDS = [
  {
    label: "01 · Dual Entities",
    title: "One Brand, Two Entities",
    desc: `${SITE_IDENTITY.legalIndia} (India) & ${SITE_IDENTITY.legalUs} (US).`,
  },
  {
    label: "02 · Leadership",
    title: "Founder-Led Architecture",
    desc: `${SITE_IDENTITY.leadership.join(" & ")} across engineering, operations and global delivery.`,
  },
  {
    label: "03 · In-House Suite",
    title: "4 Owned Platforms",
    desc: "TriMarkity, 1SocialSnap, SalesApp, and HRMS — built and operated in-house.",
  },
] as const;

export const INNER_SHOWCASE_COPY = {
  services: {
    eyebrow: "Capabilities Directory",
    headingLine1: "Build the system.",
    headingLine2: "Automate the work.",
    lead: "Our service architecture moves from core software engineering to AI automation, integration and cloud — without forcing every problem into the same technology.",
  },
  industries: {
    eyebrow: "Context comes first",
    headingLine1: "Different industries.",
    headingLine2: "Different operating realities.",
    lead: "We map the software and AI solution to the workflow, users and information environment of each sector.",
  },
  products: {
    eyebrow: "In-House Products",
    headingLine1: "Innovation That We Build.",
    headingLine2: "Products That We Own.",
    lead: "RankRise also develops its own technology products. Explore them here, then continue to each product's dedicated platform or detailed breakdown below.",
  },
  insights: {
    eyebrow: "Insights",
    heading: "Practical technology, explained clearly.",
    lead: "Thoughtful perspectives on custom engineering, pragmatic AI, and product operations.",
  },
  finalCta: {
    eyebrow: "The next system starts with a conversation",
    heading: "What should your business be able to do next?",
    lead: "Bring us the requirement, bottleneck or product idea. We'll help identify the right technology direction.",
    primaryCta: "Discuss Your Project",
    secondaryCta: "Ask RankRise AI",
  },
} as const;
