import { readFileSync } from "node:fs";
import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import ConstructionPage, { dynamicParams, generateMetadata, generateStaticParams } from "@/app/[...slug]/page";
import TeamPage, { generateMetadata as generateTeamMetadata } from "@/app/meet%20the%20team/page";
import { Homepage } from "@/components/homepage";
import { UnderConstruction } from "@/components/under-construction";
import {
  CATCH_ALL_CONSTRUCTION_ROUTES, FUTURE_ROUTES, getSiteRoute, getSiteRouteBySlug, PROPOSED_ROUTES, ROUTE_APPROVAL_NOTES,
  routeHref, routeSegments, SITE_ROUTES, STATIC_CONSTRUCTION_ROUTES, UNDER_CONSTRUCTION_ROUTES,
} from "@/lib/routes";
import { CONSTRUCTION_COPY, CORE_CAPABILITIES, HOME_SECTION_ORDER, PROCESS_STAGES, PRODUCTS } from "@/lib/site-content";

const { notFound } = vi.hoisted(() => ({
  notFound: vi.fn(() => { throw new Error("NEXT_HTTP_ERROR_FALLBACK;404"); }),
}));
vi.mock("next/navigation", () => ({ notFound }));

// Literal report expectations, independent of the application's content constants.
// §5/p170–p197, p113–p116, p179 and §12/p355–p358.
const SECTION_ORDER = [
  "header", "hero", "company-introduction", "core-capabilities", "in-house-products",
  "ai-emerging-technologies", "industries", "technology-stack", "development-process",
  "portfolio", "why-rankrise", "insights", "final-cta", "footer",
];
const CAPABILITIES = [
  "Custom Software Development", "AI & Machine Learning", "Web & Application Development",
  "Mobile App Development", "Cloud & DevOps", "Digital Transformation",
];
const PRODUCT_NAMES = ["TriMarkity", "1SocialSnap", "SalesApp", "HRMS"];
const PRODUCT_IDS = ["trimarkity", "1socialsnap", "salesapp", "hrms"];
const PRODUCT_PATHS = ["/products/trimarkity/", "/products/1socialsnap/", "/products/salesapp/", "/products/hrms/"];
const CAPABILITY_PATHS = [
  "/services/custom-software-development/", "/services/ai-ml-development/", "/services/web-development/",
  "/services/mobile-app-development/", "/services/cloud-devops/", "/services/digital-transformation/",
];
const REPORT_PATHS = [
  "/", "/about-us/", "/services/", "/services/custom-software-development/",
  "/services/ai-ml-development/", "/services/web-development/", "/services/mobile-app-development/",
  "/services/saas-development/", "/industries/", "/industries/healthcare/", "/industries/fintech/",
  "/products/", "/products/trimarkity/", "/products/1socialsnap/", "/products/salesapp/",
  "/products/hrms/", "/technologies/", "/portfolio/", "/case-studies/", "/insights/",
  "/meet the team", "/contact/",
];
const PROPOSED_PATHS = [
  "/solutions/", "/services/cloud-devops/", "/services/digital-transformation/", "/careers/",
  "/privacy/", "/terms/", "/cookies/",
];
const SELECTED_PATHS = [
  "/ai-emerging-technologies/", "/services/generative-ai-development/", "/services/crm-erp-development/",
  "/services/ui-ux-design/", "/services/api-system-integration/", "/services/data-engineering-analytics/",
  "/services/maintenance-support/", "/industries/retail-ecommerce/", "/industries/manufacturing/",
  "/industries/education/", "/industries/real-estate/", "/industries/logistics/", "/industries/saas-technology/",
  "/industries/hospitality/", "/industries/professional-services/", "/solutions/enterprise-platforms/",
  "/solutions/crm/", "/solutions/hr-management/", "/solutions/sales-automation/", "/solutions/marketing-automation/",
  "/solutions/workflow-automation/", "/solutions/ai-business-intelligence/", "/solutions/custom-portals/",
  "/solutions/digital-transformation/",
];
const ALL_PATHS = [...REPORT_PATHS, ...PROPOSED_PATHS, ...SELECTED_PATHS];
const CONSTRUCTION_EXPECTATIONS = {
  status: "Under construction",
  description: "This page is being prepared.",
  explanation: "In the meantime, explore our engineering direction and four in-house products on the homepage.",
  notice: "Local preview only. Page content and public-launch approvals are pending.",
};
const PROCESS = ["Discover", "Strategize", "Design", "Develop", "Test & Deploy", "Support & Scale"];
const HERO_COPY = "We engineer custom software, AI-powered solutions and scalable digital products that help businesses innovate, automate and grow. From concept to deployment, we turn complex challenges into intelligent digital experiences.";
const INQUIRY_NOTICE = "Preview only. This does not send an inquiry. Approved contact details and inquiry delivery are pending.";
const INITIAL_DRAFT = "The challenge:\n\nWho this should help:\n\nWhat meaningful progress looks like:\n\nConstraints or questions:\n";
const css = readFileSync("app/globals.css", "utf8");
const PREVIEW_URL = "http://127.0.0.1:3000/";
const UNKNOWN_PATH = "/routing-verification-unknown-4f78a/";
// Preserve the real network primitive independently of the memory-only inquiry mocks.
const previewFetch = globalThis.fetch.bind(globalThis);

const dialogPrototype = HTMLDialogElement.prototype;
const originalDialogMethods = {
  showModal: Object.getOwnPropertyDescriptor(dialogPrototype, "showModal"),
  close: Object.getOwnPropertyDescriptor(dialogPrototype, "close"),
};

beforeAll(() => {
  // Supply only missing native primitives. This models open/focus/close events,
  // not layout, inertness or a modal focus trap; those require the browser smoke.
  if (typeof dialogPrototype.showModal !== "function") {
    Object.defineProperty(dialogPrototype, "showModal", {
      configurable: true, writable: true,
      value(this: HTMLDialogElement) {
        if (this.open) return;
        this.open = true;
        const target = this.querySelector<HTMLElement>("[autofocus], button, input, textarea, select, a[href], [tabindex]");
        (target ?? this).focus();
      },
    });
  }
  if (typeof dialogPrototype.close !== "function") {
    Object.defineProperty(dialogPrototype, "close", {
      configurable: true, writable: true,
      value(this: HTMLDialogElement, returnValue?: string) {
        if (!this.open) return;
        if (returnValue !== undefined) this.returnValue = returnValue;
        this.open = false;
        queueMicrotask(() => this.dispatchEvent(new Event("close")));
      },
    });
  }
});

afterEach(async () => {
  cleanup();
  await Promise.resolve();
  document.body.style.overflow = "";
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

afterAll(() => {
  for (const name of ["showModal", "close"] as const) {
    const descriptor = originalDialogMethods[name];
    if (descriptor) Object.defineProperty(dialogPrototype, name, descriptor);
    else Reflect.deleteProperty(dialogPrototype, name);
  }
});

function section(id: string) {
  const element = document.getElementById(id);
  expect(element, `Expected homepage section #${id}`).not.toBeNull();
  return element!;
}

function headingNames(element: HTMLElement, level: number) {
  return within(element).getAllByRole("heading", { level }).map((heading) => heading.textContent);
}

function assertLocalDestinations(root: ParentNode, homepageIds: readonly string[]) {
  const ids = [...root.querySelectorAll("[id]")].map((element) => element.id);
  expect(new Set(ids).size).toBe(ids.length);
  const links = [...root.querySelectorAll<HTMLAnchorElement>("a[href]")];
  expect(links.length).toBeGreaterThan(0);
  for (const link of links) {
    const href = link.getAttribute("href")!;
    expect(href, `Invalid local href: ${href}`).toMatch(/^(?:\/(?!\/)[^\s#]*(?:#[^\s#]+)?|#[^\s#]+)$/);
    const url = new URL(href, PREVIEW_URL);
    expect(url.origin).toBe(new URL(PREVIEW_URL).origin);
    expect(url.search).toBe("");
    const route = getSiteRoute(url.pathname);
    expect(route, `Unknown rendered href: ${href}`).toBeDefined();
    if (url.hash) {
      const anchorIds = href.startsWith("#") || route?.path !== "/" ? ids : homepageIds;
      expect(anchorIds.filter((id) => id === url.hash.slice(1)), `Missing anchor: ${href}`).toHaveLength(1);
    }
  }
  for (const control of root.querySelectorAll("[aria-controls]")) {
    for (const id of control.getAttribute("aria-controls")!.split(/\s+/)) {
      expect(ids.filter((candidate) => candidate === id), `Missing controlled element: ${id}`).toHaveLength(1);
    }
  }
}

function preventJsdomNavigation(container: HTMLElement) {
  // Component clicks verify disclosure state; actual navigation is checked by HTTP and browser.
  container.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a[href]")) event.preventDefault();
  });
}

async function closeDialog(user: ReturnType<typeof userEvent.setup>, opener: HTMLElement) {
  await user.click(screen.getByRole("button", { name: "Close dialog" }));
  expect(section("preview-dialog")).not.toHaveAttribute("open");
  expect(opener).toHaveFocus();
}

describe("initial RankRise homepage regression", () => {
  it("preserves all fourteen labelled sections, exact primary copy and source style safeguards", () => {
    const { container } = render(<Homepage />);
    const sections = [...container.querySelectorAll<HTMLElement>("[data-section]")];
    expect(sections.map((element) => element.dataset.section)).toEqual(SECTION_ORDER);
    expect([...HOME_SECTION_ORDER]).toEqual(SECTION_ORDER);
    expect(screen.getByRole("main")).toHaveAttribute("id", "main-content");
    expect(screen.getByRole("banner", { name: "Site header" })).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/^Building Intelligent Software for a Smarter Digital World\.$/);
    expect(screen.getByText(HERO_COPY)).toBeInTheDocument();
    expect(within(section("home")).getByRole("link", { name: "Explore Our Capabilities" })).toHaveAttribute("href", "#capabilities");
    expect(within(section("home")).getByRole("button", { name: "Discuss Your Project" })).toHaveAttribute("aria-haspopup", "dialog");
    for (const name of [
      "Beyond Development. We Engineer Possibilities.",
      "Innovation That We Build. Products That We Own.",
      "Have an Idea? Let's Engineer It.",
    ]) expect(screen.getByRole("heading", { level: 2, name })).toBeInTheDocument();
    expect(screen.getByText("Building Intelligence. Driving Growth.")).toBeInTheDocument();
    for (const element of sections) {
      const labelIds = element.getAttribute("aria-labelledby")?.split(/\s+/);
      if (labelIds) {
        for (const id of labelIds) {
          expect(section(id)).toHaveRole("heading");
          expect(section(id).textContent?.trim()).not.toBe("");
        }
      } else expect(element.getAttribute("aria-label")?.trim()).toBeTruthy();
    }
    for (const [token, hex] of Object.entries({
      "rankrise-blue": "1768D5", "midnight-navy": "102B50", "sky-blue": "5A9CF0",
      "ice-blue": "EAF2FF", "cloud-white": "F4F8FE", "pure-white": "FFFFFF",
      "slate-ink": "24364B", "steel-grey": "63758A", "soft-blue-grey": "DCE6F2",
    })) expect(css).toMatch(new RegExp(`--${token}:\\s*#${hex};`));
    expect(css).toContain(":focus-visible");
    expect(css).toMatch(/@media\s*\(prefers-reduced-motion:\s*reduce\)/);
    expect(css).toMatch(/animation:\s*none\s*!important/);
    expect(css).toMatch(/transition:\s*none\s*!important/);
    for (const width of [1279, 1023, 739, 479]) expect(css).toContain(`@media (max-width: ${width}px)`);
  });

  it("renders the six literal capabilities and process stages with actual service destinations", () => {
    render(<Homepage />);
    expect(headingNames(section("capabilities"), 3)).toEqual(CAPABILITIES);
    expect(CORE_CAPABILITIES.map((capability) => capability.name)).toEqual(CAPABILITIES);
    expect(headingNames(section("process"), 3)).toEqual(PROCESS);
    expect(PROCESS_STAGES.map((stage) => stage.name)).toEqual(PROCESS);
    for (const [index, name] of CAPABILITIES.entries()) {
      const link = within(section("capabilities")).getByRole("link", { name: `Explore ${name}` });
      expect(link).toHaveAttribute("href", CAPABILITY_PATHS[index]);
      expect(link).not.toHaveAttribute("aria-haspopup");
    }
    expect(CORE_CAPABILITIES.map((capability) => capability.href)).toEqual(CAPABILITY_PATHS);
    expect(within(section("capabilities")).queryByRole("button")).not.toBeInTheDocument();
  });

  it("keeps exactly four prominent products, genuine-imagery gates and actual product destinations", () => {
    render(<Homepage />);
    const products = section("products");
    expect(headingNames(products, 3)).toEqual(PRODUCT_NAMES);
    expect(PRODUCTS.map((product) => product.name)).toEqual(PRODUCT_NAMES);
    expect(products.querySelectorAll("article")).toHaveLength(4);
    expect(within(products).getAllByText("Genuine screenshot slot")).toHaveLength(4);
    expect(within(products).getAllByText("Approved product imagery pending")).toHaveLength(4);
    expect(within(products).getAllByText("A RankRise Technologies Product.")).toHaveLength(4);
    expect(products).toHaveTextContent("Explore their report positioning while verified features and genuine product imagery await approval.");
    expect(products.querySelector("img, iframe, video, canvas")).toBeNull();
    for (const [index, name] of PRODUCT_NAMES.entries()) {
      expect(section(`product-${PRODUCT_IDS[index]}`)).toHaveAttribute("aria-labelledby", `product-${PRODUCT_IDS[index]}-title`);
      const link = within(products).getByRole("link", { name: `Explore ${name}` });
      expect(link).toHaveAttribute("href", PRODUCT_PATHS[index]);
      expect(link).not.toHaveAttribute("aria-haspopup");
    }
    expect(PRODUCTS.map((product) => product.href)).toEqual(PRODUCT_PATHS);
    expect(within(products).queryByRole("button")).not.toBeInTheDocument();
  });

  it("preserves header order and links Solutions, contact and company details to their own pages", () => {
    render(<Homepage />);
    const navigation = screen.getByRole("navigation", { name: "Main navigation" });
    expect([...navigation.querySelectorAll(".navigation-list > li > .navigation-link")].map((item) => item.textContent)).toEqual([
      "Home", "About", "Services", "Solutions", "Products", "Technologies", "Industries", "Insights",
    ]);
    for (const [name, href] of [
      ["Home", "/"], ["About", "/about-us/"], ["Services", "/services/"], ["Solutions", "/solutions/"],
      ["Technologies", "/technologies/"], ["Industries", "/industries/"], ["Insights", "/insights/"],
      ["Let's Talk Business", "/contact/"],
    ]) {
      const link = within(navigation).getByRole("link", { name, exact: true });
      expect(link).toHaveAttribute("href", href);
      expect(link).not.toHaveAttribute("aria-haspopup");
    }
    expect(within(navigation).queryByRole("button", { name: "Solutions" })).not.toBeInTheDocument();
    expect(within(section("about")).getByRole("link", { name: "About RankRise" })).toHaveAttribute("href", "/about-us/");
    for (const wordmark of screen.getAllByRole("link", { name: "RankRise Technologies home" })) {
      expect(wordmark).toHaveAttribute("href", "/");
    }
  });

  it("operates the Products disclosure by keyboard and closes it on Escape, outside click and selection", async () => {
    const user = userEvent.setup();
    const { container } = render(<Homepage />);
    preventJsdomNavigation(container);
    const toggle = within(screen.getByRole("navigation")).getByRole("button", { name: "Products" });
    const dropdown = section("products-dropdown");
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(dropdown).toHaveAttribute("hidden");
    expect(within(dropdown).queryAllByRole("link")).toHaveLength(0);
    toggle.focus();
    await user.keyboard("{Enter}");
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(dropdown).not.toHaveAttribute("hidden");
    const productLinks = [...dropdown.querySelectorAll<HTMLAnchorElement>(":scope > ul > li > a")];
    expect(productLinks.map((link) => link.querySelector("span")?.textContent)).toEqual(PRODUCT_NAMES);
    expect(productLinks.map((link) => link.getAttribute("href"))).toEqual(PRODUCT_PATHS);
    expect(within(dropdown).getByRole("link", { name: "Our in-house products" })).toHaveAttribute("href", "/products/");
    await user.tab();
    expect(within(dropdown).getByRole("link", { name: "Our in-house products" })).toHaveFocus();
    await user.tab();
    expect(productLinks[0]).toHaveFocus();
    await user.keyboard("{Escape}");
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveFocus();
    await user.click(toggle);
    await user.click(screen.getByRole("heading", { level: 1 }));
    expect(dropdown).toHaveAttribute("hidden");
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    await user.click(toggle);
    await user.click(productLinks[2]);
    expect(dropdown).toHaveAttribute("hidden");
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("keeps mobile menu state truthful, closes real page destinations and restores Escape focus", async () => {
    // CSS visibility is deliberately not inferred from jsdom; this tests React state.
    const user = userEvent.setup();
    const { container } = render(<Homepage />);
    preventJsdomNavigation(container);
    const navigation = screen.getByRole("navigation", { name: "Main navigation" });
    const mobileToggle = screen.getByRole("button", { name: "Open navigation" });
    const productsToggle = within(navigation).getByRole("button", { name: "Products" });
    expect(mobileToggle).toHaveAttribute("aria-expanded", "false");
    expect(navigation).not.toHaveClass("is-open");
    await user.click(mobileToggle);
    expect(screen.getByRole("button", { name: "Close navigation" })).toHaveAttribute("aria-expanded", "true");
    expect(navigation).toHaveClass("is-open");
    await user.click(productsToggle);
    await user.keyboard("{Escape}");
    expect(productsToggle).toHaveFocus();
    expect(productsToggle).toHaveAttribute("aria-expanded", "false");
    expect(mobileToggle).toHaveAttribute("aria-expanded", "true");
    await user.keyboard("{Escape}");
    expect(mobileToggle).toHaveFocus();
    expect(mobileToggle).toHaveAttribute("aria-label", "Open navigation");
    await user.click(mobileToggle);
    await user.click(productsToggle);
    await user.click(within(section("products-dropdown")).getByRole("link", { name: /^HRMS\s*Human resource management$/ }));
    expect(mobileToggle).toHaveAttribute("aria-expanded", "false");
    expect(productsToggle).toHaveAttribute("aria-expanded", "false");
    expect(navigation).not.toHaveClass("is-open");
    await user.click(mobileToggle);
    await user.click(within(navigation).getByRole("link", { name: "About", exact: true }));
    expect(navigation).not.toHaveClass("is-open");
    await user.click(mobileToggle);
    const solutions = within(navigation).getByRole("link", { name: "Solutions", exact: true });
    expect(solutions).toHaveAttribute("href", "/solutions/");
    await user.click(solutions);
    expect(navigation).not.toHaveClass("is-open");
    expect(mobileToggle).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    await user.click(mobileToggle);
    await user.click(within(navigation).getByRole("link", { name: "Let's Talk Business" }));
    expect(navigation).not.toHaveClass("is-open");
    expect(mobileToggle).toHaveAttribute("aria-expanded", "false");
  });

  it("renders only real catalog destinations and preserves all 53 finite URLs and source/approval distinctions", () => {
    const { container } = render(<Homepage />);
    const ids = [...container.querySelectorAll("[id]")].map((element) => element.id);
    assertLocalDestinations(container, ids);
    expect(SITE_ROUTES.map((route) => route.path)).toEqual(ALL_PATHS);
    expect(SITE_ROUTES).toHaveLength(53);
    expect(new Set(SITE_ROUTES.map((route) => route.path)).size).toBe(53);
    expect(UNDER_CONSTRUCTION_ROUTES).toHaveLength(52);
    expect(SITE_ROUTES.filter((route) => route.status === "live")).toEqual([getSiteRoute("/")]);
    expect(getSiteRoute("/")).toMatchObject({ status: "live", contentReady: true });
    for (const route of UNDER_CONSTRUCTION_ROUTES) {
      expect(route).toMatchObject({ status: "under-construction", contentReady: false });
      expect(route.path).not.toBe("/");
    }
    const categories = Object.fromEntries([
      "corporate", "service", "capability", "product", "industry", "solution", "legal", "case-studies-index",
    ].map((category) => [category, SITE_ROUTES.filter((route) => route.category === category).length]));
    expect(categories).toEqual({ corporate: 13, service: 12, capability: 1, product: 4, industry: 10, solution: 9, legal: 3, "case-studies-index": 1 });
    expect(FUTURE_ROUTES.map((route) => route.intendedPath)).toEqual(REPORT_PATHS);
    for (const route of FUTURE_ROUTES) {
      expect(route.status).toBe(route.intendedPath === "/" ? "live" : "under-construction");
      expect(route.contentReady).toBe(route.intendedPath === "/");
      expect(route).toMatchObject({ provenance: "report-url", sourceLiteral: route.intendedPath });
      expect(route).not.toHaveProperty("temporary");
    }
    expect(PROPOSED_ROUTES.map((route) => route.intendedPath)).toEqual(PROPOSED_PATHS);
    expect(SITE_ROUTES.filter((route) => route.provenance === "task-selected").map((route) => route.path)).toEqual(SELECTED_PATHS);
    for (const route of SITE_ROUTES.filter((route) => route.provenance !== "report-url")) {
      expect(route).toMatchObject({ status: "under-construction", contentReady: false });
      expect(route).not.toHaveProperty("sourceLiteral");
      expect(route).not.toHaveProperty("temporary");
    }
    expect(ROUTE_APPROVAL_NOTES.join(" ")).toMatch(/\/meet-the-team\/.*requires an explicit approval decision/);
    expect(FUTURE_ROUTES.find((route) => route.label === "Meet the Team")?.intendedPath).toBe("/meet the team");
  });

  it("keeps four source footer columns, six distinct Services and five correctly routed Solutions", () => {
    render(<Homepage />);
    const footer = screen.getByRole("contentinfo", { name: "RankRise Technologies footer" });
    expect(headingNames(footer, 3)).toEqual(["Company", "Services", "Solutions", "Products"]);
    const column = (name: string) => within(footer).getByRole("heading", { level: 3, name }).parentElement!;
    const services = ["Custom Software", "AI/ML", "Web", "Mobile", "Cloud", "SaaS"];
    expect(within(column("Services")).getAllByRole("link").map((link) => link.textContent)).toEqual(services);
    expect(within(column("Services")).getAllByRole("link").map((link) => link.getAttribute("href"))).toEqual([
      ...CAPABILITY_PATHS.slice(0, 5), "/services/saas-development/",
    ]);
    expect([...column("Solutions").querySelectorAll("li")].map((item) => item.textContent)).toEqual([
      "Enterprise", "Automation", "CRM", "HRMS", "Industry Solutions",
    ]);
    expect(within(column("Products")).getAllByRole("link").map((link) => link.textContent)).toEqual(PRODUCT_NAMES);
    expect(within(column("Products")).getAllByRole("link").map((link) => link.getAttribute("href"))).toEqual(PRODUCT_PATHS);
    expect(within(column("Solutions")).getAllByRole("link").map((link) => link.getAttribute("href"))).toEqual([
      "/solutions/enterprise-platforms/", "/solutions/workflow-automation/", "/solutions/crm/",
      "/solutions/hr-management/", "/industries/",
    ]);
    expect(within(column("Solutions")).getByRole("link", { name: "CRM", exact: true })).not.toHaveAttribute("href", "/products/salesapp/");
    expect(within(column("Solutions")).getByRole("link", { name: "HRMS", exact: true })).not.toHaveAttribute("href", "/products/hrms/");
    expect(within(column("Company")).getByRole("link", { name: "Meet the Team" })).toHaveAttribute("href", "/meet%20the%20team");
    for (const [name, href] of [["Privacy Policy", "/privacy/"], ["Terms & Conditions", "/terms/"], ["Cookie Policy", "/cookies/"]]) {
      expect(within(footer).getByRole("link", { name })).toHaveAttribute("href", href);
    }
    expect(within(footer).queryByRole("button")).not.toBeInTheDocument();
  });

  it("gates AI and industry exploration and all nine technology categories without claiming candidate proficiency", () => {
    render(<Homepage />);
    expect(section("ai")).toHaveTextContent("Potential use-case exploration only. These themes are not confirmed delivery capabilities, product features or roadmap commitments.");
    expect(within(section("ai")).getByRole("link", { name: "Explore AI & Emerging Technologies" })).toHaveAttribute("href", "/ai-emerging-technologies/");
    expect(headingNames(section("ai"), 3).slice(0, 4)).toEqual([
      "AI & machine learning", "Generative AI, LLMs & RAG", "AI agents & intelligent automation", "NLP & computer vision",
    ]);
    expect(section("industries")).toHaveTextContent("Potential use-case themes across ten industries. These are areas for exploration, not claims of past delivery or industry certification.");
    expect(headingNames(section("industries"), 3)).toEqual([
      "Healthcare", "Fintech", "Retail & E-commerce", "Manufacturing", "Education", "Real Estate",
      "Logistics", "SaaS & Technology", "Hospitality", "Professional Services",
    ]);
    expect(within(section("industries")).getAllByRole("link").map((link) => link.getAttribute("href"))).toEqual([
      "/industries/healthcare/", "/industries/fintech/", "/industries/retail-ecommerce/", "/industries/manufacturing/",
      "/industries/education/", "/industries/real-estate/", "/industries/logistics/", "/industries/saas-technology/",
      "/industries/hospitality/", "/industries/professional-services/",
    ]);
    const technologies = section("technologies");
    const taxonomy = technologies.querySelector<HTMLElement>(".stack-category-list")!;
    expect(headingNames(taxonomy, 3)).toEqual(["Frontend", "Backend", "Mobile", "AI / ML", "GenAI", "Databases", "Cloud", "DevOps", "Analytics"]);
    const websiteStack = within(technologies).getByRole("heading", { level: 3, name: "This website's stack" }).parentElement!;
    expect(within(websiteStack).getAllByRole("listitem").map((item) => item.textContent)).toEqual(["Next.js", "React", "TypeScript", "Tailwind CSS"]);
    expect(websiteStack).toHaveTextContent("Verified for this website only, not evidence of the team's delivery portfolio.");
    expect(technologies).toHaveTextContent("capability verification pending");
    expect(technologies).toHaveTextContent("Specific team technologies, proficiency and delivery stacks need verification. Candidate tools are intentionally not presented as a logo wall.");
    expect(technologies.querySelector("img")).toBeNull();
  });

  it("keeps portfolio and insights unavailable instead of inventing proof, publications or contact destinations", () => {
    render(<Homepage />);
    expect(section("portfolio")).toHaveTextContent("Approved case studies are not available in this preview.");
    expect(section("portfolio")).toHaveTextContent("No clients, projects, results or screenshots have been invented to fill this space.");
    expect(section("insights")).toHaveTextContent("Approved insights are not available in this preview. Resources will appear after editorial review; no authors, dates or articles have been invented.");
    for (const id of ["portfolio", "insights"]) expect(section(id).querySelector("article, img, time, blockquote, cite")).toBeNull();
    expect(document.querySelector("a[href^='mailto:'], a[href^='tel:'], address")).toBeNull();
    expect(section("why-rankrise")).toHaveTextContent("not a substitute for verified project evidence");
    expect(screen.getByRole("contentinfo")).toHaveTextContent("Approved contact details, inquiry delivery and public-launch information are pending. No analytics or tracking is configured.");
  });

  it("copies only a memory-local brief, acknowledges no delivery and clears edits on native cancellation", async () => {
    const user = userEvent.setup();
    const copy = vi.spyOn(navigator.clipboard, "writeText").mockResolvedValue(undefined);
    const fetch = vi.fn();
    vi.stubGlobal("fetch", fetch);
    const persist = vi.spyOn(Storage.prototype, "setItem");
    render(<Homepage />);
    const opener = screen.getByRole("button", { name: "Discuss Your Project" });
    await user.click(opener);
    const dialog = screen.getByRole("dialog", { name: "Prepare a project brief" }) as HTMLDialogElement;
    expect(dialog.open).toBe(true);
    expect(dialog).toHaveTextContent(INQUIRY_NOTICE);
    expect(dialog).toHaveTextContent("No name, email or contact information is required.");
    expect(dialog).toHaveTextContent("Your draft stays in this page's memory and clears when this dialog closes. Do not include confidential or personal information.");
    expect(document.querySelector("form, input[type='email'], input[type='tel']")).toBeNull();
    expect(document.body.style.overflow).toBe("hidden");
    const draft = within(dialog).getByRole("textbox", { name: "Your working project brief" });
    expect(draft).toHaveValue(INITIAL_DRAFT);
    await user.clear(draft);
    await user.type(draft, "Reduce duplicate handoffs in an internal workflow.");
    await user.click(within(dialog).getByRole("button", { name: "Copy brief" }));
    expect(copy).toHaveBeenCalledExactlyOnceWith("Reduce duplicate handoffs in an internal workflow.");
    expect(within(dialog).getByRole("status")).toHaveTextContent(/^Copied locally\. No inquiry has been sent\.$/);
    await user.type(draft, " Clarify priorities.");
    expect(within(dialog).getByRole("status")).toBeEmptyDOMElement();
    // Browsers translate Escape into a cancel event; jsdom does not.
    const cancel = new Event("cancel", { cancelable: true });
    fireEvent(dialog, cancel);
    expect(cancel.defaultPrevented).toBe(true);
    expect(dialog.open).toBe(false);
    expect(opener).toHaveFocus();
    expect(document.body.style.overflow).toBe("");
    await user.click(opener);
    expect(screen.getByRole("textbox", { name: "Your working project brief" })).toHaveValue(INITIAL_DRAFT);
    expect(screen.getByRole("status")).toBeEmptyDOMElement();
    await closeDialog(user, opener);
    expect(fetch).not.toHaveBeenCalled();
    expect(persist).not.toHaveBeenCalled();
  });

  it("selects a draft when clipboard permission fails and handles native close with focus/scroll restoration", async () => {
    const user = userEvent.setup();
    const copy = vi.spyOn(navigator.clipboard, "writeText").mockRejectedValue(new DOMException("Clipboard denied", "NotAllowedError"));
    render(<Homepage />);
    document.body.style.overflow = "auto";
    const opener = screen.getByRole("button", { name: "Start a Project" });
    await user.click(opener);
    const dialog = screen.getByRole("dialog", { name: "Prepare a project brief" }) as HTMLDialogElement;
    const draft = within(dialog).getByRole("textbox", { name: "Your working project brief" }) as HTMLTextAreaElement;
    await user.clear(draft);
    await user.type(draft, "Review workflow priorities and constraints.");
    await user.click(within(dialog).getByRole("button", { name: "Copy brief" }));
    expect(copy).toHaveBeenCalledExactlyOnceWith(draft.value);
    expect(within(dialog).getByRole("status")).toHaveTextContent("Automatic copy is unavailable. Your draft is selected so you can copy it yourself. No inquiry has been sent.");
    expect(draft).toHaveFocus();
    expect(draft.selectionStart).toBe(0);
    expect(draft.selectionEnd).toBe(draft.value.length);
    await act(async () => { dialog.close(); });
    expect(dialog.open).toBe(false);
    expect(screen.queryByRole("dialog", { name: "Prepare a project brief" })).not.toBeInTheDocument();
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    expect(opener).toHaveFocus();
    expect(document.body.style.overflow).toBe("auto");
  });
});

describe("finite local routing scaffold", () => {
  it("encodes the literal team URL and resolves only exact known paths and decoded segments", () => {
    for (const route of SITE_ROUTES) {
      expect(routeHref(route.path)).toBe(encodeURI(route.path));
      expect(getSiteRoute(route.path)).toBe(route);
      expect(getSiteRoute(routeHref(route.path))).toBe(route);
      expect(getSiteRoute(route.path.replace(/\/$/, "") || "/")).toBe(route);
      expect(getSiteRouteBySlug(routeSegments(route.path))).toBe(route);
    }
    const team = getSiteRoute("/meet the team");
    expect(team).toMatchObject({ label: "Meet the Team", sourceLiteral: "/meet the team" });
    expect(routeHref("/meet the team")).toBe("/meet%20the%20team");
    expect(routeSegments("/meet the team")).toEqual(["meet the team"]);
    expect(getSiteRoute("/meet%20the%20team")).toBe(team);
    expect(getSiteRouteBySlug(["meet the team"])).toBe(team);
    expect(routeSegments("/")).toEqual([]);
    expect(getSiteRouteBySlug([])).toBe(getSiteRoute("/"));
    for (const path of [
      UNKNOWN_PATH, "/meet-the-team/", "/meet%2520the%2520team", "/products/unknown/",
      "/case-studies/unapproved-case/", "/insights/unapproved-article/", "/careers/unapproved-job/",
      "/products%2Ftrimarkity/", "/%E0%A4%A", "//about-us/", "about-us", "https://example.com/about-us/", "#capabilities",
    ]) expect(getSiteRoute(path), path).toBeUndefined();
    for (const slug of [["meet-the-team"], ["meet%20the%20team"], ["products%2Ftrimarkity"], ["products", "unknown"]]) {
      expect(getSiteRouteBySlug(slug), JSON.stringify(slug)).toBeUndefined();
    }
  });

  it("generates 51 catch-all params plus one static Team screen with truthful metadata for all 52 routes", async () => {
    expect(dynamicParams).toBe(false);
    const expected = ALL_PATHS.filter((path) => path !== "/" && path !== "/meet the team").map((path) => ({ slug: path.split("/").filter(Boolean) }));
    expect(generateStaticParams()).toEqual(expected);
    expect(CATCH_ALL_CONSTRUCTION_ROUTES).toHaveLength(51);
    expect(STATIC_CONSTRUCTION_ROUTES).toEqual([getSiteRoute("/meet the team")]);
    expect(new Set(generateStaticParams().map(({ slug }) => JSON.stringify(slug))).size).toBe(51);
    expect(generateStaticParams()).not.toContainEqual({ slug: [] });
    expect(generateStaticParams()).not.toContainEqual({ slug: ["meet the team"] });
    const coveredPaths = [...CATCH_ALL_CONSTRUCTION_ROUTES, ...STATIC_CONSTRUCTION_ROUTES].map((route) => route.path);
    expect(new Set(coveredPaths).size).toBe(52);
    expect(coveredPaths.sort()).toEqual(ALL_PATHS.filter((path) => path !== "/").sort());
    for (const route of UNDER_CONSTRUCTION_ROUTES) {
      const props = { params: Promise.resolve({ slug: routeSegments(route.path) }) };
      const page = route.path === "/meet the team" ? TeamPage() : await ConstructionPage(props);
      expect(page.type).toBe(UnderConstruction);
      expect(page.props).toEqual({ route });
      const metadata = route.path === "/meet the team" ? generateTeamMetadata() : await generateMetadata(props);
      expect(metadata).toEqual({
        title: `${route.label} | RankRise Technologies`,
        description: `${route.label}. This page is being prepared. Local preview only.`,
        robots: { index: false, follow: false },
      });
      expect(metadata).not.toHaveProperty("alternates");
      expect(metadata).not.toHaveProperty("openGraph");
    }
    expect(notFound).not.toHaveBeenCalled();
  });

  it("rejects unknown, renamed, unapproved detail and live-home params in both page and metadata guards", async () => {
    const rejected = [
      [], ["routing-verification-unknown-4f78a"], ["meet-the-team"], ["meet%20the%20team"],
      ["products", "unknown"], ["case-studies", "unapproved-case"], ["insights", "unapproved-article"],
      ["careers", "unapproved-job"], ["products%2Ftrimarkity"],
    ];
    for (const slug of rejected) {
      const props = { params: Promise.resolve({ slug }) };
      await expect(ConstructionPage(props), JSON.stringify(slug)).rejects.toThrow("NEXT_HTTP_ERROR_FALLBACK;404");
      await expect(generateMetadata(props), JSON.stringify(slug)).rejects.toThrow("NEXT_HTTP_ERROR_FALLBACK;404");
    }
    expect(notFound).toHaveBeenCalledTimes(rejected.length * 2);
  });

  it("renders all 52 shared screens with one labelled H1, honest status, usable home links and real shared navigation", () => {
    const homepage = render(<Homepage />);
    const homepageIds = [...homepage.container.querySelectorAll("[id]")].map((element) => element.id);
    cleanup();
    expect(CONSTRUCTION_COPY).toEqual(CONSTRUCTION_EXPECTATIONS);
    for (const route of UNDER_CONSTRUCTION_ROUTES) {
      const { container } = render(<UnderConstruction route={route} />);
      const main = screen.getByRole("main", { name: route.label });
      expect(main).toHaveAttribute("id", "main-content");
      expect(main).toHaveAttribute("aria-labelledby", "construction-heading");
      expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
      expect(within(main).getByRole("heading", { level: 1, name: route.label, exact: true })).toHaveAttribute("id", "construction-heading");
      expect(main.querySelector(".construction-status")).toHaveTextContent(/^Under construction$/);
      for (const copy of Object.values(CONSTRUCTION_EXPECTATIONS)) expect(main).toHaveTextContent(copy);
      expect(within(main).getByRole("link", { name: "Back to homepage" })).toHaveAttribute("href", "/");
      expect(within(main).getByRole("link", { name: "Explore our capabilities" })).toHaveAttribute("href", "/#capabilities");
      expect(main.querySelector(".construction-visual")).toHaveAttribute("aria-hidden", "true");
      expect(main.querySelector(".construction-visual svg")).toHaveAttribute("focusable", "false");
      expect(main.querySelector("img, iframe, video, canvas")).toBeNull();
      expect(container.querySelector("#preview-dialog, form, input, textarea, a[href='#'], a[href^='mailto:'], a[href^='tel:'], address")).toBeNull();
      expect(screen.getByRole("banner", { name: "Site header" })).toBeInTheDocument();
      expect(screen.getByRole("navigation", { name: "Main navigation" })).toBeInTheDocument();
      const footer = screen.getByRole("contentinfo", { name: "RankRise Technologies footer" });
      expect(headingNames(footer, 3)).toEqual(["Company", "Services", "Solutions", "Products"]);
      const productsColumn = within(footer).getByRole("heading", { level: 3, name: "Products" }).parentElement!;
      for (const [index, name] of PRODUCT_NAMES.entries()) {
        expect(within(productsColumn).getByRole("link", { name, exact: true })).toHaveAttribute("href", PRODUCT_PATHS[index]);
      }
      const wordmarks = screen.getAllByRole("link", { name: "RankRise Technologies home" });
      expect(wordmarks).toHaveLength(2);
      for (const wordmark of wordmarks) expect(wordmark).toHaveAttribute("href", "/");
      assertLocalDestinations(container, homepageIds);
      cleanup();
    }
  }, 30_000);

  it("serves all 52 construction URLs, the unchanged homepage and three strict unknown/alias 404s on the existing preview", async ({ signal }) => {
    // This single bounded integration check uses the existing server; the Next mock above
    // affects isolated imported functions only, never the independently running preview.
    async function requestPreview(path: string) {
      const controller = new AbortController();
      const abort = () => controller.abort();
      signal.addEventListener("abort", abort, { once: true });
      const timer = setTimeout(abort, 60_000);
      try {
        const response = await previewFetch(new URL(path, PREVIEW_URL).href, { redirect: "follow", signal: controller.signal });
        const html = await response.text();
        return { status: response.status, document: new DOMParser().parseFromString(html, "text/html") };
      } finally {
        clearTimeout(timer);
        signal.removeEventListener("abort", abort);
      }
    }
    function assertNoindex(document: Document, path: string) {
      const robots = [...document.querySelectorAll<HTMLMetaElement>("meta[name='robots']")].map((meta) => meta.content).join(",");
      expect(robots, `robots metadata: ${path}`).toMatch(/\bnoindex\b/);
      expect(robots, `robots metadata: ${path}`).toMatch(/\bnofollow\b/);
    }
    const homepage = await requestPreview("/");
    expect(homepage.status, PREVIEW_URL).toBe(200);
    expect([...homepage.document.querySelectorAll<HTMLElement>("[data-section]")].map((element) => element.dataset.section)).toEqual(SECTION_ORDER);
    expect(homepage.document.querySelectorAll("h1")).toHaveLength(1);
    expect(homepage.document.querySelector("h1")?.textContent).toBe("Building Intelligent Software for a Smarter Digital World.");
    assertNoindex(homepage.document, "/");
    const homepageIds = [...homepage.document.querySelectorAll("[id]")].map((element) => element.id);
    assertLocalDestinations(homepage.document, homepageIds);
    const responses = [];
    // At most four concurrent requests; allow bounded initial Next compilation without a new server.
    for (let offset = 0; offset < UNDER_CONSTRUCTION_ROUTES.length; offset += 4) {
      responses.push(...await Promise.all(UNDER_CONSTRUCTION_ROUTES.slice(offset, offset + 4).map(async (route) => ({
        route, ...await requestPreview(routeHref(route.path)),
      }))));
    }
    expect(responses).toHaveLength(52);
    expect(new Set(responses.map(({ route }) => route.path)).size).toBe(52);
    for (const path of [UNKNOWN_PATH, "/meet%2520the%2520team", "/meet-the-team/"]) {
      const unknown = await requestPreview(path);
      expect(getSiteRoute(path)).toBeUndefined();
      expect(unknown.status, `HTTP ${path}`).toBe(404);
      expect(unknown.document.querySelector(".construction-page, .construction-status"), path).toBeNull();
    }
    let verifiedRoutes = 0;
    for (const { route, status, document } of responses) {
      // Keep a failing route failing, while still collecting coverage of every other URL.
      expect.soft(status, `HTTP ${routeHref(route.path)}`).toBe(200);
      if (status !== 200) continue;
      expect(document.querySelectorAll("h1"), route.path).toHaveLength(1);
      expect(document.querySelector("h1")?.textContent, route.path).toBe(route.label);
      expect(document.querySelector("main#main-content.construction-page"), route.path).not.toBeNull();
      expect(document.querySelector(".construction-status")?.textContent, route.path).toBe(CONSTRUCTION_EXPECTATIONS.status);
      for (const copy of Object.values(CONSTRUCTION_EXPECTATIONS)) expect(document.querySelector("main")?.textContent, route.path).toContain(copy);
      expect(document.title, route.path).toContain(route.label);
      assertNoindex(document, route.path);
      assertLocalDestinations(document, homepageIds);
      verifiedRoutes += 1;
    }
    const failures = responses.filter(({ status }) => status !== 200).map(({ route, status }) => `${routeHref(route.path)} = ${status}`);
    console.info(`HTTP preview: / = 200 with 14 sections; ${verifiedRoutes}/52 construction routes verified (matching H1/status/noindex/nofollow); 3 unknown/alias URLs = 404 (not construction). Concurrency limit: 4. Failures: ${failures.join(", ") || "none"}.`);
  }, 180_000);
});
