import { INDUSTRIES, PUBLISHED_TECH_STACK, SERVICES_LIST, SITE_IDENTITY } from "@/lib/site-content";

type LinkSuggestion = { label: string; href: string };
export type LocalAnswer = { reply: string; links?: LinkSuggestion[] };

const stack = `${PUBLISHED_TECH_STACK.slice(0, -3).join(", ")}, with AI integrations including ${PUBLISHED_TECH_STACK.slice(-3).join(", ")}.`;

function includesAny(q: string, terms: string[]) {
  return terms.some((t) => q.includes(t));
}

export function answerLocally(message: string): LocalAnswer {
  const q = message.toLowerCase().replace(/[^a-z0-9+& ]/g, " ");

  if (includesAny(q, ["hello", "hi ", "hey", "good morning", "good evening"])) {
    return {
      reply:
        "Hello. I’m the RankRise website assistant. Ask me about our software services, AI automation, products, industries, technology stack, careers, office, or how to start a project.",
      links: [
        { label: "Explore services", href: "/services" },
        { label: "Discuss a project", href: "/contact" },
      ],
    };
  }
  if (includesAny(q, ["price", "pricing", "cost", "charges", "budget", "how much"])) {
    return {
      reply:
        "RankRise does not publish fixed pricing because software and AI scope varies by workflows, integrations, users, security and delivery requirements. Share your requirement and the team can evaluate the scope before proposing commercials.",
      links: [{ label: "Discuss your project", href: "/contact" }],
    };
  }
  if (includesAny(q, ["timeline", "how long", "duration", "delivery time", "weeks", "months"])) {
    return {
      reply:
        "Project timelines are not fixed on the website. They depend on scope, integrations, approvals, testing and deployment needs. A discovery discussion is the right first step before giving a realistic timeline.",
      links: [{ label: "Request consultation", href: "/contact" }],
    };
  }
  if (includesAny(q, ["contact", "phone", "whatsapp", "email", "call", "reach you"])) {
    return {
      reply: `You can reach RankRise Technologies on ${SITE_IDENTITY.phone} by phone or WhatsApp. The current website email is ${SITE_IDENTITY.email}.`,
      links: [{ label: "Contact page", href: "/contact" }],
    };
  }
  if (includesAny(q, ["office", "address", "location", "where are you", "kolhapur"])) {
    return {
      reply: `The registered office shown on the website is ${SITE_IDENTITY.address}. RankRise also supports appropriate global customer engagements through RankRise Corporation.`,
      links: [
        { label: "Contact details", href: "/contact" },
        { label: "Global customers", href: "/global-customers" },
      ],
    };
  }
  if (includesAny(q, ["founder", "director", "vajeeda", "sandesh", "leadership", "who owns", "who started"])) {
    return {
      reply: `RankRise Technologies was established in 2026. The leadership names currently approved for the website are ${SITE_IDENTITY.leadership.join(" and ")}.`,
      links: [{ label: "About RankRise", href: "/about" }],
    };
  }
  if (
    includesAny(q, [
      "technology stack",
      "tech stack",
      "technologies",
      "framework",
      "programming",
      "next.js",
      "react",
      "node",
      "python",
      "flutter",
      "aws",
      "cloud",
    ])
  ) {
    return {
      reply: `Our published technology capability includes ${stack} The exact stack is selected according to each project rather than using one stack for every requirement.`,
      links: [
        { label: "Software development", href: "/services/software-development" },
        { label: "Cloud solutions", href: "/services/cloud-solutions" },
      ],
    };
  }
  if (includesAny(q, ["trimarkity", "tri markity"])) {
    return {
      reply:
        "TriMarkity is a RankRise ecosystem B2B growth platform combining lead intelligence, email marketing, cloud telephony, CRM and AI-supported campaign optimisation. The RankRise site introduces it and links to its dedicated product website.",
      links: [
        { label: "TriMarkity overview", href: "/products/trimarkity" },
        { label: "Visit TriMarkity", href: SITE_IDENTITY.trimarkity },
      ],
    };
  }
  if (includesAny(q, ["1socialsnap", "socialsnap", "social snap"])) {
    return {
      reply:
        "1SocialSnap is an AI-powered social media management and automation product within the RankRise ecosystem. Its dedicated product website contains the current product experience.",
      links: [
        { label: "1SocialSnap overview", href: "/products/1socialsnap" },
        { label: "Visit 1SocialSnap", href: SITE_IDENTITY.socialsnap },
      ],
    };
  }
  if (includesAny(q, ["salesapp", "sales app"])) {
    return {
      reply:
        "SalesApp is a RankRise in-house sales management platform designed to turn daily sales activities into structured, measurable sales performance with pipeline tracking, reminders and analytics.",
      links: [
        { label: "SalesApp on Products", href: "/products#salesapp" },
        { label: "View Products", href: "/products" },
      ],
    };
  }
  if (includesAny(q, ["hrms", "human resource", "hr management", "payroll"])) {
    return {
      reply:
        "RankRise HRMS is an in-house human resource management platform engineered for people operations, attendance, leave tracking, and employee lifecycle management.",
      links: [
        { label: "HRMS on Products", href: "/products#hrms" },
        { label: "View Products", href: "/products" },
      ],
    };
  }
  if (includesAny(q, ["product", "saas products", "products you have"])) {
    return {
      reply:
        "The RankRise product ecosystem includes four in-house products: TriMarkity (B2B marketing & sales platform), 1SocialSnap (social media management), SalesApp (sales activity management), and HRMS (human resource management).",
      links: [
        { label: "View products", href: "/products" },
        { label: "TriMarkity", href: "/products/trimarkity" },
        { label: "1SocialSnap", href: "/products/1socialsnap" },
      ],
    };
  }
  if (includesAny(q, ["career", "job", "internship", "hiring", "resume", "cv", "apply"])) {
    return {
      reply:
        "The Careers page accepts applications through the website, including CV/resume upload. Roles can be added or updated as hiring needs change.",
      links: [{ label: "Careers", href: "/careers" }],
    };
  }
  if (includesAny(q, ["investor", "partner", "partnership", "collaboration", "alliance"])) {
    return {
      reply:
        "RankRise has a dedicated Investors & Partners route for strategic partnerships, technology alliances, channel opportunities and appropriate investor conversations. The website does not publish unapproved financial claims.",
      links: [{ label: "Investors & Partners", href: "/investors-partners" }],
    };
  }
  if (includesAny(q, ["nda", "confidential", "security", "privacy", "data security"])) {
    return {
      reply:
        "RankRise can support confidential project discussions and suitable NDA arrangements. Security controls depend on the application and may include authentication, role-based access, secure APIs, environment separation and cloud security practices.",
      links: [{ label: "Security & confidentiality", href: "/data-security-confidentiality" }],
    };
  }
  if (includesAny(q, ["global", "usa", "us company", "international", "outside india", "worldwide"])) {
    return {
      reply:
        "The unified RankRise website represents RankRise Technologies Private Limited for India and RankRise Corporation for appropriate global customer engagements. Core software and AI capabilities are presented in one common website.",
      links: [{ label: "Global customers", href: "/global-customers" }],
    };
  }
  if (
    includesAny(q, [
      "digital marketing",
      "seo",
      "social media marketing",
      "google business",
      "gmb",
      "ads",
      "content marketing",
    ])
  ) {
    return {
      reply:
        "Digital growth services such as SEO, Google Business Profile, social media, content and related marketing services are handled through ASM RankRise Services, which is linked from the RankRise technology ecosystem.",
      links: [{ label: "ASM RankRise", href: SITE_IDENTITY.asmRankRise }],
    };
  }

  for (const service of SERVICES_LIST) {
    const tokens = [
      service.name.toLowerCase(),
      service.slug.replaceAll("-", " "),
      ...service.useCases.map((x) => x.toLowerCase()),
    ];
    if (
      tokens.some((t) => q.includes(t)) ||
      service.name
        .toLowerCase()
        .split(" ")
        .filter((w) => w.length > 4)
        .some((w) => q.includes(w))
    ) {
      return {
        reply: `${service.name} is one of RankRise Technologies’ core services. ${service.short} Typical use cases include ${service.useCases.slice(0, 4).join(", ")}. The right scope depends on your workflow, users, integrations and business objective.`,
        links: [
          { label: `Explore ${service.name}`, href: `/services/${service.slug}` },
          { label: "Discuss your requirement", href: "/contact" },
        ],
      };
    }
  }

  for (const industry of INDUSTRIES) {
    const name = industry.name.toLowerCase();
    if (q.includes(name) || name.split(/\s|&/).filter((w) => w.length > 4).some((w) => q.includes(w))) {
      return {
        reply: `For ${industry.name}, RankRise focuses on the actual operational challenge rather than a generic template. ${industry.pain} Relevant solution areas can include ${industry.solutions.join(", ")}.`,
        links: [
          { label: `${industry.name} solutions`, href: `/industries/${industry.slug}` },
          { label: "Discuss your use case", href: "/contact" },
        ],
      };
    }
  }

  if (includesAny(q, ["service", "what do you do", "what can you do", "offer", "capabilities"])) {
    return {
      reply:
        "RankRise Technologies provides custom software, web applications, mobile apps, SaaS development, ERP/CRM, AI chatbots, AI agents, workflow automation, business process automation, AI/data dashboards, API integrations and cloud solutions.",
      links: [
        { label: "All services", href: "/services" },
        { label: "Industries", href: "/industries" },
      ],
    };
  }
  if (includesAny(q, ["start project", "project", "consultation", "book", "discuss", "requirement"])) {
    return {
      reply:
        "You can start with the Discuss Your Project form. Share your company, contact details, city, service area and requirement document if available. You can also request a callback or consultation from the Contact page.",
      links: [{ label: "Discuss your project", href: "/contact" }],
    };
  }

  return {
    reply:
      "I can answer questions about RankRise software development, AI automation, products (TriMarkity, 1SocialSnap, SalesApp, HRMS), industries, technology stack, careers, partnerships and contact details. If you describe the business problem you want to solve, I can point you to the most relevant service.",
    links: [
      { label: "Explore services", href: "/services" },
      { label: "Discuss your project", href: "/contact" },
    ],
  };
}

export function assistantContext(): string {
  return `RankRise Technologies is a unified technology website representing RankRise Technologies Private Limited for India and RankRise Corporation for appropriate global engagements. Established: 2026. Leadership: ${SITE_IDENTITY.leadership.join(" and ")}. Contact: ${SITE_IDENTITY.phone}; ${SITE_IDENTITY.email}; registered office: ${SITE_IDENTITY.address}. Core services: ${SERVICES_LIST.map((s) => `${s.name}: ${s.short}`).join(" | ")}. Industries: ${INDUSTRIES.map((i) => `${i.name}: ${i.solutions.join(", ")}`).join(" | ")}. Products: TriMarkity (${SITE_IDENTITY.trimarkity}), 1SocialSnap (${SITE_IDENTITY.socialsnap}), SalesApp (/products#salesapp), and HRMS (/products#hrms). Technology stack: ${stack}. No public fixed pricing. Do not invent delivery timelines, certifications, clients, project results or technical feasibility. Digital marketing services are handled through ASM RankRise Services (${SITE_IDENTITY.asmRankRise}).`;
}
