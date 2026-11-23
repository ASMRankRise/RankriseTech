import { readFileSync } from "node:fs";
import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import CatchAllPage, { dynamicParams, generateMetadata, generateStaticParams } from "@/app/[...slug]/page";
import { ACCENT_PRESETS } from "@/components/accent-theme-dock";
import { Homepage } from "@/components/homepage";
import { InnerPage } from "@/components/inner-page";
import {
  CATCH_ALL_ROUTES,
  getSiteRoute,
  getSiteRouteBySlug,
  ROUTE_APPROVAL_NOTES,
  routeHref,
  routeSegments,
  SITE_ROUTES,
  STATIC_ROUTES,
} from "@/lib/routes";
import {
  AI_EXPLORATIONS,
  CORE_CAPABILITIES,
  FOOTER_AUTOMATE_SERVICES,
  FOOTER_BUILD_SERVICES,
  FOOTER_COMPANY,
  FOOTER_INDUSTRIES,
  FOOTER_LEGAL,
  getSitePageBySlug,
  HOME_SECTION_ORDER,
  INDUSTRIES,
  INSIGHT_ARTICLES,
  NAVIGATION_ITEMS,
  PROCESS_STAGES,
  PRODUCTS,
  PUBLISHED_TECH_STACK,
  SITE_IDENTITY,
  STACK_CATEGORIES,
  WEBSITE_STACK,
  WHY_RANKRISE,
} from "@/lib/site-content";
import { answerLocally, assistantContext } from "@/lib/assistant";

const { notFound } = vi.hoisted(() => ({
  notFound: vi.fn(() => {
    throw new Error("NEXT_HTTP_ERROR_FALLBACK;404");
  }),
}));
vi.mock("next/navigation", () => ({ notFound }));

const SECTION_ORDER = [
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
];

const CAPABILITY_NAMES = [
  "Custom Software Development",
  "AI Solutions & Automation",
  "Web Application Development",
  "Mobile App Development",
  "Cloud Solutions",
  "Business Process Automation",
];

const CAPABILITY_PATHS = [
  "/services/custom-software-development",
  "/services/ai-solutions-automation",
  "/services/web-application-development",
  "/services/mobile-app-development",
  "/services/cloud-solutions",
  "/services/business-process-automation",
];

const PRODUCT_NAMES = ["TriMarkity", "1SocialSnap", "SalesApp", "HRMS"];
const PRODUCT_IDS = ["trimarkity", "1socialsnap", "salesapp", "hrms"];
const PRODUCT_PATHS = [
  "/products/trimarkity",
  "/products/1socialsnap",
  "/products#salesapp",
  "/products#hrms",
];

const PROCESS = ["Discover", "Strategize", "Design", "Develop", "Test & Deploy", "Support & Scale"];
const HERO_COPY =
  "We engineer custom software, AI-powered solutions and scalable digital products that help businesses innovate, automate and grow. From concept to deployment, we turn complex challenges into intelligent digital experiences.";

const css = readFileSync("app/globals.css", "utf8");
const PREVIEW_URL = process.env.PREVIEW_URL || "http://127.0.0.1:3001/";
const UNKNOWN_PATH = "/routing-verification-unknown-4f78a/";
const previewFetch = globalThis.fetch.bind(globalThis);

const dialogPrototype = HTMLDialogElement.prototype;
const originalDialogMethods = {
  showModal: Object.getOwnPropertyDescriptor(dialogPrototype, "showModal"),
  close: Object.getOwnPropertyDescriptor(dialogPrototype, "close"),
};

beforeAll(() => {
  if (typeof dialogPrototype.showModal !== "function") {
    Object.defineProperty(dialogPrototype, "showModal", {
      configurable: true,
      writable: true,
      value(this: HTMLDialogElement) {
        if (this.open) return;
        this.open = true;
        const target = this.querySelector<HTMLElement>(
          "[autofocus], button, input, textarea, select, a[href], [tabindex]"
        );
        (target ?? this).focus();
      },
    });
  }
  if (typeof dialogPrototype.close !== "function") {
    Object.defineProperty(dialogPrototype, "close", {
      configurable: true,
      writable: true,
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
  delete document.documentElement.dataset.accent;
  delete document.documentElement.dataset.theme;
  delete document.documentElement.dataset.heroTheme;
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
  return within(element)
    .getAllByRole("heading", { level })
    .map((heading) => heading.textContent);
}

function assertLocalDestinations(root: ParentNode, homepageIds: readonly string[]) {
  const ids = [...root.querySelectorAll("[id]")].map((element) => element.id);
  if (root instanceof HTMLElement) {
    expect(new Set(ids).size).toBe(ids.length);
  } else {
    expect(new Set(ids).size).toBeGreaterThan(0);
  }
  const links = [...root.querySelectorAll<HTMLAnchorElement>("a[href]")];
  expect(links.length).toBeGreaterThan(0);
  for (const link of links) {
    const href = link.getAttribute("href")!;
    if (
      href.startsWith("tel:") ||
      href.startsWith("mailto:") ||
      href.startsWith("https:") ||
      href.startsWith("http:")
    ) {
      continue;
    }
    expect(href, `Invalid local href: ${href}`).toMatch(
      /^(?:\/(?!\/)[^\s#]*(?:#[^\s#]+)?|#[^\s#]+)$/
    );
    const url = new URL(href, PREVIEW_URL);
    expect(url.origin).toBe(new URL(PREVIEW_URL).origin);
    const route = getSiteRoute(url.pathname);
    if (url.pathname === "/locations") {
      continue;
    }
    expect(route, `Unknown rendered href: ${href}`).toBeDefined();
    if (url.hash && (href.startsWith("#") || route?.path === "/")) {
      const anchorIds = href.startsWith("#") ? ids : homepageIds;
      if (root instanceof HTMLElement) {
        expect(
          anchorIds.filter((id) => id === url.hash.slice(1)),
          `Missing anchor: ${href}`
        ).toHaveLength(1);
      } else {
        expect(
          anchorIds.filter((id) => id === url.hash.slice(1)).length,
          `Missing anchor: ${href}`
        ).toBeGreaterThanOrEqual(1);
      }
    }
  }
  for (const control of root.querySelectorAll("[aria-controls]")) {
    for (const id of control.getAttribute("aria-controls")!.split(/\s+/)) {
      if (root instanceof HTMLElement) {
        expect(
          ids.filter((candidate) => candidate === id),
          `Missing controlled element: ${id}`
        ).toHaveLength(1);
      } else {
        expect(
          ids.filter((candidate) => candidate === id).length,
          `Missing controlled element: ${id}`
        ).toBeGreaterThanOrEqual(1);
      }
    }
  }
}

function preventJsdomNavigation(container: HTMLElement) {
  container.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a[href]")) {
      event.preventDefault();
    }
  });
}

describe("RankRise homepage regression & design invariants", () => {
  it("preserves all fourteen labelled sections, exact primary copy and design tokens", () => {
    const { container } = render(<Homepage />);
    const sections = [...container.querySelectorAll<HTMLElement>("[data-section]")];
    expect(sections.map((element) => element.dataset.section)).toEqual(SECTION_ORDER);
    expect([...HOME_SECTION_ORDER]).toEqual(SECTION_ORDER);
    expect(screen.getByRole("main")).toHaveAttribute("id", "main-content");
    expect(screen.getByRole("banner", { name: "Site header" })).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      /^Building Intelligent Software for a Smarter Digital World\.$/
    );
    expect(screen.getByText(HERO_COPY)).toBeInTheDocument();
    expect(
      within(section("home")).getByRole("link", { name: "Explore Our Capabilities" })
    ).toHaveAttribute("href", "#capabilities");
    expect(
      within(section("home")).getByRole("button", { name: "Discuss Your Project" })
    ).toHaveAttribute("aria-haspopup", "dialog");
    for (const name of [
      "Beyond Development. We Engineer Possibilities.",
      "Innovation That We Build. Products That We Own.",
      "Have an Idea? Let's Engineer It.",
    ]) {
      expect(screen.getByRole("heading", { level: 2, name })).toBeInTheDocument();
    }
    expect(container.querySelector(".hero-preview-note")).toHaveTextContent(
      "Building Intelligence · Driving Growth"
    );
    for (const element of sections) {
      const labelIds = element.getAttribute("aria-labelledby")?.split(/\s+/);
      if (labelIds) {
        for (const id of labelIds) {
          expect(section(id)).toHaveRole("heading");
          expect(section(id).textContent?.trim()).not.toBe("");
        }
      } else {
        expect(element.getAttribute("aria-label")?.trim()).toBeTruthy();
      }
    }
    for (const [token, hex] of Object.entries({
      "rankrise-blue": "1768D5",
      "midnight-navy": "102B50",
      "sky-blue": "5A9CF0",
      "ice-blue": "EAF2FF",
      "cloud-white": "F4F8FE",
      "pure-white": "FFFFFF",
      "slate-ink": "24364B",
      "steel-grey": "63758A",
      "soft-blue-grey": "DCE6F2",
    })) {
      expect(css).toMatch(new RegExp(`--${token}:\\s*#${hex};`));
    }
    expect(css).toContain(":focus-visible");
    expect(css).toMatch(/@media\s*\(prefers-reduced-motion:\s*reduce\)/);
    expect(css).toMatch(/animation:\s*none\s*!important/);
    expect(css).toMatch(/transition:\s*none\s*!important/);
    for (const width of [1279, 1023, 739, 479]) {
      expect(css).toContain(`@media (max-width: ${width}px)`);
    }
  });

  it("renders the six core capabilities and process stages with actual service destinations", () => {
    render(<Homepage />);
    expect(headingNames(section("capabilities"), 3)).toEqual(CAPABILITY_NAMES);
    expect(CORE_CAPABILITIES.map((capability) => capability.name)).toEqual(CAPABILITY_NAMES);
    expect(headingNames(section("process"), 3)).toEqual(PROCESS);
    expect(PROCESS_STAGES.map((stage) => stage.name)).toEqual(PROCESS);
    for (const [index, name] of CAPABILITY_NAMES.entries()) {
      const link = within(section("capabilities")).getByRole("link", {
        name: `Explore ${name}`,
      });
      expect(link).toHaveAttribute("href", CAPABILITY_PATHS[index]);
      expect(link).not.toHaveAttribute("aria-haspopup");
    }
    expect(CORE_CAPABILITIES.map((capability) => capability.href)).toEqual(CAPABILITY_PATHS);
  });

  it("keeps exactly four prominent products, genuine architecture motifs and actual product destinations", () => {
    render(<Homepage />);
    const products = section("products");
    expect(headingNames(products, 3)).toEqual(PRODUCT_NAMES);
    expect(PRODUCTS.map((product) => product.name)).toEqual(PRODUCT_NAMES);
    expect(products.querySelectorAll("article")).toHaveLength(4);
    expect(within(products).getAllByText("A RankRise Technologies Product.")).toHaveLength(4);
    for (const [index, name] of PRODUCT_NAMES.entries()) {
      expect(section(`product-${PRODUCT_IDS[index]}`)).toHaveAttribute(
        "aria-labelledby",
        `product-${PRODUCT_IDS[index]}-title`
      );
      const link = within(products).getByRole("link", { name: `Explore ${name}` });
      expect(link).toHaveAttribute("href", PRODUCT_PATHS[index]);
      expect(link).not.toHaveAttribute("aria-haspopup");
    }
    expect(PRODUCTS.map((product) => product.href)).toEqual(PRODUCT_PATHS);
  });

  it("preserves header order and links main navigation and header CTA to their destinations", () => {
    render(<Homepage />);
    const navigation = screen.getByRole("navigation", { name: "Main navigation" });
    expect(
      [...navigation.querySelectorAll(".navigation-list > li > .navigation-link")].map(
        (item) => item.textContent?.trim()
      )
    ).toEqual(["Home", "About", "Services", "Industries", "Products", "Insights", "Global"]);
    for (const [name, href] of [
      ["Home", "/"],
      ["About", "/about"],
      ["Services", "/services"],
      ["Industries", "/industries"],
      ["Insights", "/insights"],
      ["Global", "/global-customers"],
    ]) {
      const link = within(navigation).getByRole("link", { name, exact: true });
      expect(link).toHaveAttribute("href", href);
      expect(link).not.toHaveAttribute("aria-haspopup");
    }
    const cta = within(navigation).getByRole("link", { name: "Let's Talk Business" });
    expect(cta).toHaveAttribute("href", "/contact");
    expect(within(section("about")).getByRole("link", { name: "About RankRise" })).toHaveAttribute(
      "href",
      "/about"
    );
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
    toggle.focus();
    await user.keyboard("{Enter}");
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(dropdown).not.toHaveAttribute("hidden");
    const productLinks = [...dropdown.querySelectorAll<HTMLAnchorElement>(":scope > ul > li > a")];
    expect(productLinks.map((link) => link.querySelector("span")?.textContent)).toEqual(
      PRODUCT_NAMES
    );
    expect(productLinks.map((link) => link.getAttribute("href"))).toEqual(PRODUCT_PATHS);
    expect(within(dropdown).getByRole("link", { name: "Our in-house products" })).toHaveAttribute(
      "href",
      "/products"
    );
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

  it("keeps mobile menu state truthful, toggles navigation, and restores Escape focus", async () => {
    const user = userEvent.setup();
    const { container } = render(<Homepage />);
    preventJsdomNavigation(container);
    const navigation = screen.getByRole("navigation", { name: "Main navigation" });
    const mobileToggle = screen.getByRole("button", { name: "Open navigation" });
    const productsToggle = within(navigation).getByRole("button", { name: "Products" });
    expect(mobileToggle).toHaveAttribute("aria-expanded", "false");
    expect(navigation).not.toHaveClass("is-open");
    await user.click(mobileToggle);
    expect(screen.getByRole("button", { name: "Close navigation" })).toHaveAttribute(
      "aria-expanded",
      "true"
    );
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
    await user.click(within(navigation).getByRole("link", { name: "About", exact: true }));
    expect(navigation).not.toHaveClass("is-open");
    expect(mobileToggle).toHaveAttribute("aria-expanded", "false");
  });

  it("renders only real catalog destinations and verifies all 55 canonical URLs and indexability rules", () => {
    const { container } = render(<Homepage />);
    const ids = [...container.querySelectorAll("[id]")].map((element) => element.id);
    assertLocalDestinations(container, ids);
    expect(SITE_ROUTES).toHaveLength(55);
    expect(STATIC_ROUTES).toHaveLength(1);
    expect(CATCH_ALL_ROUTES).toHaveLength(54);
    expect(new Set(SITE_ROUTES.map((route) => route.path)).size).toBe(55);
    for (const route of SITE_ROUTES) {
      expect(route.status).toBe("live");
      expect(route.contentReady).toBe(true);
    }
    const noindexRoutes = SITE_ROUTES.filter((route) => route.noindex).map((route) => route.path);
    expect(noindexRoutes).toEqual(["/portfolio", "/maintenance"]);
    expect(SITE_ROUTES.filter((route) => !route.noindex)).toHaveLength(53);
    const categories = Object.fromEntries(
      [
        "corporate",
        "service",
        "product",
        "industry",
        "location",
        "insight",
        "legal",
        "utility",
      ].map((category) => [
        category,
        SITE_ROUTES.filter((route) => route.category === category).length,
      ])
    );
    expect(categories).toEqual({
      corporate: 11,
      service: 14,
      product: 2,
      industry: 10,
      location: 6,
      insight: 6,
      legal: 5,
      utility: 1,
    });
    expect(ROUTE_APPROVAL_NOTES.join(" ")).toMatch(
      /Exact 55 URLs approved and implemented matching demo2 SEO_ROUTE_MAP\.csv/
    );
  });

  it("renders footer with real contact info, dual legal entities, engineering, AI & automation, industries and company columns", () => {
    render(<Homepage />);
    const footer = screen.getByRole("contentinfo", { name: "RankRise Technologies footer" });
    expect(headingNames(footer, 3)).toEqual([
      "Reach Us",
      "Engineering",
      "AI & Automation",
      "Industries",
      "Company",
    ]);
    const reachUs = within(footer).getByRole("heading", { level: 3, name: "Reach Us" }).parentElement!;
    expect(within(reachUs).getByRole("link", { name: SITE_IDENTITY.phone })).toHaveAttribute(
      "href",
      `tel:${SITE_IDENTITY.phoneHref}`
    );
    expect(within(reachUs).getByRole("link", { name: SITE_IDENTITY.email })).toHaveAttribute(
      "href",
      `mailto:${SITE_IDENTITY.email}`
    );
    expect(reachUs.querySelector("address")).toHaveTextContent(SITE_IDENTITY.address);

    const column = (name: string) =>
      within(footer).getByRole("heading", { level: 3, name }).parentElement!;
    expect(within(column("Engineering")).getAllByRole("link").map((link) => link.textContent)).toEqual(
      FOOTER_BUILD_SERVICES.map((s) => s.name)
    );
    expect(within(column("Engineering")).getAllByRole("link").map((link) => link.getAttribute("href"))).toEqual(
      FOOTER_BUILD_SERVICES.map((s) => s.href)
    );
    expect(within(column("AI & Automation")).getAllByRole("link").map((link) => link.textContent)).toEqual(
      FOOTER_AUTOMATE_SERVICES.map((s) => s.name)
    );
    expect(within(column("AI & Automation")).getAllByRole("link").map((link) => link.getAttribute("href"))).toEqual(
      FOOTER_AUTOMATE_SERVICES.map((s) => s.href)
    );
    expect(within(column("Industries")).getAllByRole("link").map((link) => link.textContent)).toEqual(
      FOOTER_INDUSTRIES.map((s) => s.name)
    );
    expect(within(column("Company")).getAllByRole("link").map((link) => link.textContent)).toEqual(
      FOOTER_COMPANY.map((s) => s.name)
    );

    const productsStrip = footer.querySelector(".footer-products-strip")!;
    expect(within(productsStrip).getAllByRole("link").map((link) => link.getAttribute("href"))).toEqual(
      PRODUCT_PATHS
    );

    const legalActions = footer.querySelector(".legal-actions")!;
    expect(within(legalActions).getAllByRole("link").map((link) => link.textContent?.trim())).toEqual(
      FOOTER_LEGAL.map((l) => l.name)
    );
    expect(within(legalActions).getAllByRole("link").map((link) => link.getAttribute("href"))).toEqual(
      FOOTER_LEGAL.map((l) => l.href)
    );
    expect(footer.querySelector(".footer-copyright")).toHaveTextContent(
      `${SITE_IDENTITY.legalIndia} & ${SITE_IDENTITY.legalUs}`
    );
  });

  it("renders AI section with service link, 10 demo2 industries, published technology stack and 9 stack categories", () => {
    render(<Homepage />);
    const ai = section("ai");
    expect(
      within(ai).getByRole("link", { name: "Explore AI & Emerging Technologies" })
    ).toHaveAttribute("href", "/services/ai-solutions-automation");
    const matrix = ai.querySelector<HTMLElement>(".ai-matrix-grid")!;
    expect(headingNames(matrix, 3)).toEqual(AI_EXPLORATIONS.map((area) => area.title));

    const industries = section("industries");
    expect(headingNames(industries, 3)).toEqual(INDUSTRIES.map((industry) => industry.name));
    expect(within(industries).getAllByRole("link").map((link) => link.getAttribute("href"))).toEqual(
      INDUSTRIES.map((industry) => industry.href)
    );

    const technologies = section("technologies");
    const taxonomy = technologies.querySelector<HTMLElement>(".stack-category-list")!;
    expect(headingNames(taxonomy, 3)).toEqual(STACK_CATEGORIES.map((c) => c.name));
    const publishedList = technologies.querySelector<HTMLElement>(".published-stack-list")!;
    expect(
      within(publishedList)
        .getAllByRole("listitem")
        .map((item) => item.textContent)
    ).toEqual([...PUBLISHED_TECH_STACK]);
    const websiteStack = technologies.querySelector<HTMLElement>(".website-stack")!;
    expect(
      within(websiteStack)
        .getAllByRole("listitem")
        .map((item) => item.textContent)
    ).toEqual([...WEBSITE_STACK]);
  });

  it("renders honest portfolio messaging and 3 insight article cards linking to real routes", () => {
    render(<Homepage />);
    const portfolio = section("portfolio");
    expect(portfolio).toHaveTextContent(
      "We are preparing approved case studies for publication. We will not publish fabricated project results, client logos or metrics."
    );
    expect(within(portfolio).getByRole("link", { name: "View Portfolio Overview" })).toHaveAttribute(
      "href",
      "/portfolio"
    );
    expect(
      within(portfolio).getByRole("button", { name: "Discuss your challenge" })
    ).toHaveAttribute("aria-haspopup", "dialog");

    const insights = section("insights");
    expect(within(insights).getByRole("link", { name: "Explore all insights" })).toHaveAttribute(
      "href",
      "/insights"
    );
    const insightCards = within(insights).getAllByRole("article");
    expect(insightCards).toHaveLength(3);
    for (const [index, card] of insightCards.entries()) {
      const article = INSIGHT_ARTICLES[index];
      expect(within(card).getByRole("heading", { level: 3 })).toHaveTextContent(article.title);
      expect(within(card).getByRole("link", { name: "Read article" })).toHaveAttribute(
        "href",
        article.href
      );
    }

    const contact = section("contact");
    expect(
      within(contact).getByRole("link", { name: SITE_IDENTITY.phone })
    ).toHaveAttribute("href", `tel:${SITE_IDENTITY.phoneHref}`);
    expect(
      within(contact).getByRole("link", { name: SITE_IDENTITY.email })
    ).toHaveAttribute("href", `mailto:${SITE_IDENTITY.email}`);
    expect(within(contact).getByRole("link", { name: "Contact Page" })).toHaveAttribute(
      "href",
      "/contact"
    );
    expect(
      within(contact).getByRole("button", { name: "Start a Project" })
    ).toHaveAttribute("aria-haspopup", "dialog");
  });

  it("opens interactive LeadForm in preview dialog, submits inquiry via POST /api/submit, and handles errors", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, message: "Inquiry saved." }),
    });
    vi.stubGlobal("fetch", fetchMock);

    render(<Homepage />);
    const opener = screen.getByRole("button", { name: "Discuss Your Project" });
    await user.click(opener);

    const dialog = screen.getByRole("dialog", { name: "Discuss Your Project" }) as HTMLDialogElement;
    expect(dialog.open).toBe(true);
    expect(document.body.style.overflow).toBe("hidden");

    const form = dialog.querySelector("form.lead-form")!;
    expect(form).not.toBeNull();

    await user.type(within(dialog).getByLabelText(/Name\*/), "Aarav Sharma");
    await user.type(within(dialog).getByLabelText(/Company Name/), "Acme Innovations");
    await user.type(within(dialog).getByLabelText(/Phone Number\*/), "+91 90467 34673");
    await user.type(within(dialog).getByLabelText(/Email\*/), "aarav@example.com");
    await user.type(within(dialog).getByLabelText(/City/), "Kolhapur");
    await user.type(
      within(dialog).getByLabelText(/Brief Requirement/),
      "Looking for a custom software and AI automation platform."
    );

    const submitBtn = within(dialog).getByRole("button", { name: "Discuss Your Project" });
    await user.click(submitBtn);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/submit",
      expect.objectContaining({ method: "POST" })
    );
    expect(within(dialog).getByRole("status")).toHaveTextContent(
      "Thank you. Your details have been received."
    );

    // Test submission failure handling
    fetchMock.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "Inquiry delivery failed. Please retry." }),
    });
    fireEvent.submit(form);
    await act(async () => {
      await Promise.resolve();
    });
    expect(within(dialog).getByRole("status")).toHaveTextContent(
      "Inquiry delivery failed. Please retry."
    );

    // Close dialog
    const closeBtn = within(dialog).getByRole("button", { name: "Close dialog" });
    await user.click(closeBtn);
    expect(dialog.open).toBe(false);
    expect(document.body.style.overflow).toBe("");
    expect(opener).toHaveFocus();
  });

  it("renders Colour & Theme Studio dock with all 6 accent presets, toggles accent and theme attributes", async () => {
    const user = userEvent.setup();
    render(<Homepage />);

    const studio =
      screen.queryByRole("region", { name: "Colour and theme studio" }) ??
      screen.getByRole("complementary", { name: "Colour and theme studio" });
    expect(studio).toHaveAttribute("aria-label", "Colour and theme studio");

    expect(ACCENT_PRESETS.map((preset) => preset.label)).toEqual([
      "Signal Vermilion",
      "Acid Volt",
      "Electric Amber",
      "Crimson Rose",
      "Hyper Emerald",
      "RankRise Blue",
    ]);

    const toolbar = within(studio).getByRole("toolbar", { name: "Accent colours" });
    for (const preset of ACCENT_PRESETS) {
      expect(
        within(toolbar).getByRole("button", { name: `Select ${preset.label} accent` })
      ).toHaveAttribute("data-accent", preset.id);
    }

    expect(document.documentElement.dataset.accent).toBe("vermilion");
    expect(
      within(toolbar).getByRole("button", { name: "Select Signal Vermilion accent" })
    ).toHaveAttribute("aria-pressed", "true");
    expect(studio.querySelector(".accent-dock-active-name")).toHaveTextContent("Signal Vermilion");

    for (const preset of ACCENT_PRESETS) {
      const button = within(toolbar).getByRole("button", { name: `Select ${preset.label} accent` });
      await user.click(button);
      expect(document.documentElement.dataset.accent).toBe(preset.id);
      expect(button).toHaveAttribute("aria-pressed", "true");
      expect(studio.querySelector(".accent-dock-active-name")).toHaveTextContent(preset.label);
    }

    expect(document.documentElement.dataset.theme).toBe("light");
    expect(document.documentElement.dataset.heroTheme).toBe("light");
    const themeToggle = within(studio).getByRole("button", { name: "Switch to dark mode" });
    expect(themeToggle).toHaveAttribute("aria-pressed", "false");

    await user.click(themeToggle);
    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(document.documentElement.dataset.heroTheme).toBe("dark");
    expect(themeToggle).toHaveAttribute("aria-pressed", "true");
    expect(themeToggle).toHaveAttribute("aria-label", "Switch to light mode");

    await user.click(themeToggle);
    expect(document.documentElement.dataset.theme).toBe("light");
    expect(document.documentElement.dataset.heroTheme).toBe("light");
    expect(themeToggle).toHaveAttribute("aria-pressed", "false");
    expect(themeToggle).toHaveAttribute("aria-label", "Switch to dark mode");

    const header = screen.getByRole("banner", { name: "Site header" });
    const nav = within(header).getByRole("navigation", { name: "Main navigation" });
    const cta = within(nav).getByRole("link", { name: "Let's Talk Business" });
    expect(cta).toHaveAttribute("href", "/contact");
    expect(cta).toHaveClass("header-cta");
    expect(cta).toHaveAttribute("aria-label", "Let's Talk Business");
  });
});

describe("unified 55-route catalog and App Router catch-all", () => {
  it("resolves all 55 canonical routes and rejects unapproved/malformed paths", () => {
    for (const route of SITE_ROUTES) {
      expect(routeHref(route.path)).toBe(encodeURI(route.path));
      expect(getSiteRoute(route.path)).toBe(route);
      expect(getSiteRoute(routeHref(route.path))).toBe(route);
      expect(getSiteRoute(route.path.replace(/\/$/, "") || "/")).toBe(route);
      expect(getSiteRouteBySlug(routeSegments(route.path))).toBe(route);
    }
    expect(routeSegments("/")).toEqual([]);
    expect(getSiteRouteBySlug([])).toBe(getSiteRoute("/"));

    for (const path of [
      UNKNOWN_PATH,
      "/meet the team",
      "/meet%20the%20team",
      "/meet-the-team/",
      "/products/unknown/",
      "/case-studies/unapproved-case/",
      "/insights/unapproved-article/",
      "/careers/unapproved-job/",
      "/products%2Ftrimarkity/",
      "//about",
      "about",
      "https://example.com/about",
      "#capabilities",
    ]) {
      expect(getSiteRoute(path), path).toBeUndefined();
    }

    for (const slug of [
      ["meet-the-team"],
      ["meet the team"],
      ["products%2Ftrimarkity"],
      ["products", "unknown"],
    ]) {
      expect(getSiteRouteBySlug(slug), JSON.stringify(slug)).toBeUndefined();
    }
  });

  it("generates 54 catch-all params with dynamicParams false and truthful metadata for all 54 routes", async () => {
    expect(dynamicParams).toBe(false);
    const expected = CATCH_ALL_ROUTES.map((route) => ({
      slug: routeSegments(route.path),
    }));
    expect(generateStaticParams()).toEqual(expected);
    expect(generateStaticParams()).toHaveLength(54);
    expect(new Set(generateStaticParams().map(({ slug }) => JSON.stringify(slug))).size).toBe(54);
    expect(generateStaticParams()).not.toContainEqual({ slug: [] });

    for (const route of CATCH_ALL_ROUTES) {
      const props = { params: Promise.resolve({ slug: routeSegments(route.path) }) };
      const metadata = await generateMetadata(props);
      expect(metadata.title).toBeDefined();
      expect(metadata.description).toBeDefined();
      if (route.path === "/portfolio" || route.path === "/maintenance") {
        expect(metadata.robots).toEqual({ index: false, follow: false });
      } else {
        expect(metadata.robots).toEqual({ index: true, follow: true });
      }
      expect(metadata.alternates?.canonical).toBe(`https://www.rankrisetech.in${route.path}`);

      const page = await CatchAllPage(props);
      expect(page).toBeDefined();
    }
    expect(notFound).not.toHaveBeenCalled();
  });

  it("rejects unknown and unapproved detail slugs with notFound() in CatchAllPage and empty metadata", async () => {
    const rejected = [
      ["routing-verification-unknown-4f78a"],
      ["meet-the-team"],
      ["meet the team"],
      ["products", "unknown"],
      ["services", "unknown"],
      ["industries", "unknown"],
      ["case-studies", "unapproved-case"],
      ["careers", "unapproved-job"],
      ["products%2Ftrimarkity"],
    ];
    for (const slug of rejected) {
      const props = { params: Promise.resolve({ slug }) };
      await expect(CatchAllPage(props), JSON.stringify(slug)).rejects.toThrow(
        "NEXT_HTTP_ERROR_FALLBACK;404"
      );
      const metadata = await generateMetadata(props);
      expect(metadata).toEqual({});
    }
    expect(notFound).toHaveBeenCalledTimes(rejected.length);
  });

  it("renders InnerPage with breadcrumbs, narrative sections, and semantic schema", () => {
    const service = getSitePageBySlug(["services", "custom-software-development"])!;
    expect(service).toBeDefined();
    const { container } = render(<InnerPage page={service} />);
    expect(screen.getByRole("main")).toHaveAttribute("id", "main-content");
    expect(
      screen.getByRole("heading", { level: 1, name: "Custom Software Development" })
    ).toBeInTheDocument();
    const breadcrumbs = screen.getByRole("navigation", { name: "Breadcrumbs" });
    expect(breadcrumbs).toBeInTheDocument();
    expect(within(breadcrumbs).getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(within(breadcrumbs).getByRole("link", { name: "Services" })).toHaveAttribute("href", "/services");
    expect(screen.getByRole("heading", { level: 2, name: /When Custom Software Development Makes Sense/ })).toBeInTheDocument();
    expect(screen.getByRole("contentinfo", { name: "RankRise Technologies footer" })).toBeInTheDocument();
  });
});

describe("local assistant unit coverage (answerLocally)", () => {
  it("provides helpful answers and direct links for services, products, contact, office, and leadership", () => {
    const greeting = answerLocally("hello");
    expect(greeting.reply).toContain("RankRise website assistant");
    expect(greeting.links).toEqual([
      { label: "Explore services", href: "/services" },
      { label: "Discuss a project", href: "/contact" },
    ]);

    const pricing = answerLocally("how much does a project cost?");
    expect(pricing.reply).toContain("RankRise does not publish fixed pricing");
    expect(pricing.links).toEqual([{ label: "Discuss your project", href: "/contact" }]);

    const customDev = answerLocally("tell me about custom software development");
    expect(customDev.reply).toContain("Custom Software Development is one of RankRise Technologies’ core services");
    expect(customDev.links).toEqual([
      { label: "Explore Custom Software Development", href: "/services/custom-software-development" },
      { label: "Discuss your requirement", href: "/contact" },
    ]);

    const chatbots = answerLocally("do you build AI chatbots?");
    expect(chatbots.reply).toContain("AI Chatbots is one of RankRise Technologies’ core services");

    const automation = answerLocally("workflow automation");
    expect(automation.reply).toContain("Workflow Automation is one of RankRise Technologies’ core services");

    const cloud = answerLocally("cloud infrastructure");
    expect(cloud.reply).toContain("Our published technology capability includes");
    expect(cloud.links).toEqual([
      { label: "Software development", href: "/services/software-development" },
      { label: "Cloud solutions", href: "/services/cloud-solutions" },
    ]);

    // All 4 products
    const trimarkity = answerLocally("tell me about trimarkity");
    expect(trimarkity.reply).toContain("TriMarkity is a RankRise ecosystem B2B growth platform");
    expect(trimarkity.links).toEqual([
      { label: "TriMarkity overview", href: "/products/trimarkity" },
      { label: "Visit TriMarkity", href: SITE_IDENTITY.trimarkity },
    ]);

    const socialsnap = answerLocally("what is 1socialsnap?");
    expect(socialsnap.reply).toContain("1SocialSnap is an AI-powered social media management");
    expect(socialsnap.links).toEqual([
      { label: "1SocialSnap overview", href: "/products/1socialsnap" },
      { label: "Visit 1SocialSnap", href: SITE_IDENTITY.socialsnap },
    ]);

    const salesapp = answerLocally("tell me about salesapp");
    expect(salesapp.reply).toContain("SalesApp is a RankRise in-house sales management platform");
    expect(salesapp.links).toEqual([
      { label: "SalesApp on Products", href: "/products#salesapp" },
      { label: "View Products", href: "/products" },
    ]);

    const hrms = answerLocally("do you have an HRMS system?");
    expect(hrms.reply).toContain("RankRise HRMS is an in-house human resource management platform");
    expect(hrms.links).toEqual([
      { label: "HRMS on Products", href: "/products#hrms" },
      { label: "View Products", href: "/products" },
    ]);

    const allProducts = answerLocally("what products do you offer?");
    expect(allProducts.reply).toContain("TriMarkity");
    expect(allProducts.reply).toContain("1SocialSnap");
    expect(allProducts.reply).toContain("SalesApp");
    expect(allProducts.reply).toContain("HRMS");

    // Contact & Office
    const contact = answerLocally("how can I contact or call you?");
    expect(contact.reply).toContain(SITE_IDENTITY.phone);
    expect(contact.reply).toContain(SITE_IDENTITY.email);

    const office = answerLocally("where is your office in kolhapur?");
    expect(office.reply).toContain(SITE_IDENTITY.address);

    // Leadership
    const leadership = answerLocally("who is the founder or director?");
    expect(leadership.reply).toContain(SITE_IDENTITY.leadership.join(" and "));

    // Tech stack
    const stackAns = answerLocally("what tech stack do you use?");
    expect(stackAns.reply).toContain("Next.js, React, Node.js");

    // Assistant context
    const context = assistantContext();
    expect(context).toContain(SITE_IDENTITY.legalIndia);
    expect(context).toContain(SITE_IDENTITY.legalUs);
    expect(context).toContain(SITE_IDENTITY.leadership.join(" and "));
    expect(context).toContain("TriMarkity");
    expect(context).toContain("1SocialSnap");
    expect(context).toContain("SalesApp");
    expect(context).toContain("HRMS");
  });
});

describe("HTTP preview integration against 127.0.0.1:3001", () => {
  it("serves homepage and all 54 catch-all routes with 200 OK, truthful robots directives, and 404 for unknown paths", async ({ signal }) => {
    async function requestPreview(path: string) {
      const controller = new AbortController();
      const abort = () => controller.abort();
      signal.addEventListener("abort", abort, { once: true });
      const timer = setTimeout(abort, 60_000);
      try {
        const response = await previewFetch(new URL(path, PREVIEW_URL).href, {
          redirect: "follow",
          signal: controller.signal,
        });
        const html = await response.text();
        return {
          status: response.status,
          document: new DOMParser().parseFromString(html, "text/html"),
        };
      } finally {
        clearTimeout(timer);
        signal.removeEventListener("abort", abort);
      }
    }

    function getRobots(document: Document) {
      return [...document.querySelectorAll<HTMLMetaElement>("meta[name='robots']")]
        .map((meta) => meta.content)
        .join(",");
    }

    const homepage = await requestPreview("/");
    expect(homepage.status, PREVIEW_URL).toBe(200);
    const sections = [
      ...new Set(
        [...homepage.document.querySelectorAll<HTMLElement>("[data-section]")].map(
          (element) => element.dataset.section
        )
      ),
    ];
    expect(sections).toEqual(SECTION_ORDER);
    expect(homepage.document.querySelectorAll("h1").length).toBeGreaterThanOrEqual(1);
    expect(homepage.document.querySelector("h1")?.textContent).toContain(
      "Building Intelligent Software for a Smarter Digital World."
    );
    expect(getRobots(homepage.document)).not.toMatch(/\bnoindex\b/);

    const homepageIds = [...homepage.document.querySelectorAll("[id]")].map(
      (element) => element.id
    );
    assertLocalDestinations(homepage.document, homepageIds);

    const responses = [];
    for (let offset = 0; offset < CATCH_ALL_ROUTES.length; offset += 4) {
      responses.push(
        ...(await Promise.all(
          CATCH_ALL_ROUTES.slice(offset, offset + 4).map(async (route) => ({
            route,
            ...(await requestPreview(routeHref(route.path))),
          }))
        ))
      );
    }
    expect(responses).toHaveLength(54);
    expect(new Set(responses.map(({ route }) => route.path)).size).toBe(54);

    for (const path of [
      UNKNOWN_PATH,
      "/meet%20the%20team",
      "/meet-the-team/",
      "/products/unknown/",
    ]) {
      const unknown = await requestPreview(path);
      expect(getSiteRoute(path)).toBeUndefined();
      expect(unknown.status, `HTTP ${path}`).toBe(404);
    }

    let verifiedRoutes = 0;
    for (const { route, status, document } of responses) {
      expect.soft(status, `HTTP ${routeHref(route.path)}`).toBe(200);
      if (status !== 200) continue;
      expect(document.querySelectorAll("h1"), route.path).toHaveLength(1);
      const robots = getRobots(document);
      if (route.path === "/portfolio" || route.path === "/maintenance") {
        expect(robots, `robots on ${route.path}`).toMatch(/\bnoindex\b/);
        expect(robots, `robots on ${route.path}`).toMatch(/\bnofollow\b/);
      } else {
        expect(robots, `robots on ${route.path}`).not.toMatch(/\bnoindex\b/);
      }
      assertLocalDestinations(document, homepageIds);
      verifiedRoutes += 1;
    }
    const failures = responses
      .filter(({ status }) => status !== 200)
      .map(({ route, status }) => `${routeHref(route.path)} = ${status}`);
    console.info(
      `HTTP preview: / = 200 with 14 sections; ${verifiedRoutes}/54 live catch-all routes verified; unknown/alias URLs = 404. Concurrency limit: 4. Failures: ${failures.join(", ") || "none"}.`
    );
  }, 180_000);
});
