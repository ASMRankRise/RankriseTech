"use client";

import Link from "next/link";
import type { SitePage } from "@/lib/site-content";
import {
  SITE_IDENTITY,
  SERVICES_LIST,
  INDUSTRIES,
  INSIGHT_ARTICLES,
  PRODUCTS,
} from "@/lib/site-content";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { AccentThemeDock } from "./accent-theme-dock";
import { LeadForm } from "./lead-form";
import { Icon } from "./icon";
import { SpotlightCard } from "./motion/spotlight-card";
import {
  EditorialSealVisual,
  FinalCtaField,
  InnerHeroIllustration,
  ProductMotif,
} from "./section-illustrations";

function serviceGroup(index: number): string {
  return index < 5 ? "Build" : index < 10 ? "Automate" : "Connect";
}

function visualCaptionForSlug(slug: string): {
  tag: string;
  title: string;
  subtitle: string;
} {
  if (
    slug.includes("ai-") ||
    slug.includes("automation") ||
    slug.includes("chatbot") ||
    slug.includes("agents") ||
    slug.includes("analytics")
  ) {
    return {
      tag: "AI & Automation Architecture",
      title: "Human-in-the-Loop Systems",
      subtitle: "Context ingestion to calibrated inference",
    };
  }
  if (slug.startsWith("industries") || slug.startsWith("locations")) {
    return {
      tag: "Sector Context Matrix",
      title: "Domain-First Workflows",
      subtitle: "Mapped to real operational constraints",
    };
  }
  if (slug.startsWith("products")) {
    return {
      tag: "Proprietary Product Suite",
      title: "Engineered & Owned In-House",
      subtitle: "Modular platforms for sustained operations",
    };
  }
  if (
    slug.startsWith("insights") ||
    slug.startsWith("about") ||
    slug.startsWith("portfolio") ||
    slug.startsWith("global") ||
    slug.startsWith("investors") ||
    slug.startsWith("careers")
  ) {
    return {
      tag: "RankRise Perspective",
      title: "Evidence & Engineering Rigor",
      subtitle: "Clear principles, substantiated delivery",
    };
  }
  return {
    tag: "Business → Technology",
    title: "Software + AI Systems",
    subtitle: "Built around real workflows",
  };
}

export function InnerPage({ page }: { page: SitePage }) {
  const isExcludedCta =
    page.slug.startsWith("contact") ||
    page.slug.startsWith("privacy") ||
    page.slug.startsWith("terms") ||
    page.slug.startsWith("cookie") ||
    page.slug.startsWith("disclaimer") ||
    page.slug.startsWith("data-security");

  const segments = page.slug ? page.slug.split("/").filter(Boolean) : [];
  const visualMeta = visualCaptionForSlug(page.slug);

  return (
    <>
      <SiteHeader activePath={page.slug ? `/${page.slug}` : "/"} />
      <main id="main-content" className="inner-page">
        {/* Inner Hero Header Band */}
        <section className="section inner-hero">
          <div className="container inner-hero-grid">
            <div className="inner-hero-copy">
              {segments.length > 0 && (
                <nav className="inner-breadcrumb" aria-label="Breadcrumbs">
                  <Link href="/">Home</Link>
                  <span className="inner-breadcrumb-sep" aria-hidden="true">
                    /
                  </span>
                  {segments.map((seg, idx) => {
                    const isLast = idx === segments.length - 1;
                    const href = `/${segments.slice(0, idx + 1).join("/")}`;
                    const label = seg
                      .replace(/-/g, " ")
                      .replace(/\b\w/g, (c) => c.toUpperCase());
                    return (
                      <span key={href} className="breadcrumb-item">
                        {isLast ? (
                          <span
                            className="inner-breadcrumb-current"
                            aria-current="page"
                          >
                            {label}
                          </span>
                        ) : (
                          <>
                            <Link href={href}>{label}</Link>
                            <span
                              className="inner-breadcrumb-sep"
                              aria-hidden="true"
                            >
                              /
                            </span>
                          </>
                        )}
                      </span>
                    );
                  })}
                </nav>
              )}

              <p className="eyebrow">
                {page.eyebrow || "RankRise Technologies"}
              </p>

              <h1>{page.h1}</h1>

              <p className="lead-copy">{page.lead}</p>

              {(page.cta || page.secondaryCta) && (
                <div className="hero-actions inner-hero-actions">
                  {page.cta &&
                    (page.cta.external ? (
                      <a
                        className="button button-primary"
                        href={page.cta.href}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {page.cta.label}
                        <Icon name="arrow-up-right" width="16" height="16" />
                      </a>
                    ) : (
                      <Link
                        className="button button-primary"
                        href={page.cta.href}
                      >
                        {page.cta.label}
                        <Icon name="arrow-right" width="16" height="16" />
                      </Link>
                    ))}

                  {page.secondaryCta &&
                    (page.secondaryCta.external ? (
                      <a
                        className="button button-secondary"
                        href={page.secondaryCta.href}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {page.secondaryCta.label}
                      </a>
                    ) : (
                      <Link
                        className="button button-secondary"
                        href={page.secondaryCta.href}
                      >
                        {page.secondaryCta.label}
                      </Link>
                    ))}
                </div>
              )}
            </div>

            <div className="inner-hero-visual">
              <div className="inner-visual-frame">
                <InnerHeroIllustration slug={page.slug} />
                <div className="inner-visual-meta">
                  <span className="inner-visual-tag">{visualMeta.tag}</span>
                  <div className="inner-visual-caption">
                    <strong>{visualMeta.title}</strong>
                    <span>{visualMeta.subtitle}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Numbered Architectural Narrative Ledger */}
        {page.sections && page.sections.length > 0 && (
          <section className="section inner-narrative">
            <div className="container inner-narrative-grid">
              <aside className="inner-narrative-aside">
                <p className="eyebrow">Architecture &amp; Context</p>
                <div className="inner-narrative-count" aria-hidden="true">
                  {String(page.sections.length).padStart(2, "0")}
                </div>
                <p className="inner-narrative-lead">
                  Business-first technology. Clear systems. Practical outcomes.
                </p>
                <div className="inner-narrative-seal" aria-hidden="true">
                  <EditorialSealVisual
                    variant={
                      page.slug.startsWith("insights")
                        ? "insights"
                        : "evidence"
                    }
                  />
                </div>
              </aside>

              <div className="inner-story-list">
                {page.sections.map((section, idx) => (
                  <article
                    className="inner-story-item"
                    key={section.id || idx}
                    id={section.id}
                  >
                    <div className="inner-story-meta">
                      <span>{String(idx + 1).padStart(2, "0")}</span>
                    </div>
                    <div className="inner-story-body">
                      <h2>{section.heading}</h2>
                      {section.body.split("\n").map((para, pIdx) =>
                        para ? <p key={pIdx}>{para}</p> : null
                      )}
                      {section.bullets && section.bullets.length > 0 && (
                        <ul
                          className="inner-bullet-chips"
                          aria-label="Key considerations"
                        >
                          {section.bullets.map((bullet) => (
                            <li key={bullet} className="inner-bullet-chip">
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Showcase: /services */}
        {page.slug === "services" && (
          <section className="section inner-showcase-band">
            <div className="container">
              <div className="section-heading heading-split">
                <div>
                  <p className="eyebrow">Capabilities Directory</p>
                  <h2>
                    Build the system.
                    <br />
                    Automate the work.
                  </h2>
                </div>
                <p>
                  Our service architecture moves from core software engineering
                  to AI automation, integration and cloud — without forcing
                  every problem into the same technology.
                </p>
              </div>

              <div className="inner-bento-grid">
                {SERVICES_LIST.map((s, i) => (
                  <SpotlightCard
                    as="article"
                    className="inner-service-card"
                    key={s.slug}
                  >
                    <div className="inner-service-top">
                      <span className="eyebrow">{serviceGroup(i)}</span>
                      <span className="inner-index-mono" aria-hidden="true">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3>
                      <Link
                        href={`/services/${s.slug}`}
                        className="inner-card-heading-link"
                      >
                        {s.name}
                      </Link>
                    </h3>
                    <p>{s.short}</p>
                    <Link
                      href={`/services/${s.slug}`}
                      className="text-link"
                      aria-label={`Explore ${s.name}`}
                    >
                      Explore capability
                      <Icon name="arrow-up-right" width="16" height="16" />
                    </Link>
                  </SpotlightCard>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Showcase: /industries */}
        {page.slug === "industries" && (
          <section className="section inner-showcase-band">
            <div className="container inner-industries-split">
              <div className="inner-industries-sticky">
                <p className="eyebrow">Industries</p>
                <h2>
                  Different industries.
                  <br />
                  Different operating realities.
                </h2>
                <p className="section-intro">
                  We map the software and AI solution to the workflow, users and
                  information environment of each sector.
                </p>
                <div className="inner-industries-visual" aria-hidden="true">
                  <InnerHeroIllustration slug="industries" />
                </div>
              </div>

              <ul className="industry-list inner-industry-directory">
                {INDUSTRIES.map((x, i) => (
                  <li key={x.slug}>
                    <span className="industry-number" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <Link href={`/industries/${x.slug}`}>
                      <h3>{x.name}</h3>
                      <p>{x.theme}</p>
                    </Link>
                    <Icon name="arrow-up-right" width="18" height="18" />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Showcase: /products */}
        {page.slug === "products" && (
          <section className="section inner-showcase-band">
            <div className="container">
              <div className="section-heading heading-split">
                <div>
                  <p className="eyebrow">In-House Products</p>
                  <h2>
                    Innovation That We Build.
                    <br />
                    Products That We Own.
                  </h2>
                </div>
                <p>
                  RankRise also develops its own technology products. Explore
                  them here, then continue to each product&apos;s dedicated
                  platform or detailed breakdown below.
                </p>
              </div>

              <div className="inner-products-grid">
                {PRODUCTS.map((prod, idx) => (
                  <SpotlightCard
                    as="article"
                    className="product-card inner-product-card"
                    key={prod.id}
                  >
                    <div className="product-content">
                      <div className="product-topline">
                        <span className="eyebrow">{prod.category}</span>
                        <span className="product-number" aria-hidden="true">
                          0{idx + 1}
                        </span>
                      </div>
                      <h3>{prod.name}</h3>
                      <p className="product-headline">{prod.headline}</p>
                      <p className="product-description">
                        {prod.positioning} {prod.value}
                      </p>
                      <Link href={prod.href} className="text-link">
                        Explore {prod.name}
                        <Icon name="arrow-up-right" width="16" height="16" />
                      </Link>
                    </div>
                    <div className="product-media inner-product-specimen">
                      <ProductMotif id={prod.id} />
                    </div>
                  </SpotlightCard>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Showcase: /insights */}
        {page.slug === "insights" && (
          <section className="section inner-showcase-band">
            <div className="container">
              <div className="section-heading heading-split">
                <div>
                  <p className="eyebrow">Insights</p>
                  <h2>Practical technology, explained clearly.</h2>
                </div>
                <p>
                  Thoughtful perspectives on custom engineering, pragmatic AI,
                  and product operations.
                </p>
              </div>

              <div className="insights-cards-grid">
                {INSIGHT_ARTICLES.map((a, i) => (
                  <SpotlightCard
                    as="article"
                    className="insight-card"
                    key={a.slug}
                  >
                    <div className="insight-card-top">
                      <span className="eyebrow">Perspective</span>
                      <span className="insight-number" aria-hidden="true">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3>
                      <Link href={`/insights/${a.slug}`}>{a.title}</Link>
                    </h3>
                    <p>{a.intro}</p>
                    <Link href={`/insights/${a.slug}`} className="text-link">
                      Read article
                      <Icon name="arrow-up-right" width="16" height="16" />
                    </Link>
                  </SpotlightCard>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Showcase: /locations/kolhapur */}
        {page.slug === "locations/kolhapur" && (
          <section className="section inner-showcase-band">
            <div className="container">
              <div className="inner-office-card">
                <div className="inner-office-seal" aria-hidden="true">
                  <EditorialSealVisual variant="evidence" />
                </div>
                <div className="inner-office-copy">
                  <p className="eyebrow">Registered Office</p>
                  <h2>Kolhapur, Maharashtra</h2>
                  <p>{SITE_IDENTITY.address}</p>
                </div>
                <a
                  className="button button-secondary"
                  target="_blank"
                  rel="noreferrer"
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE_IDENTITY.address)}`}
                >
                  Open in Google Maps
                  <Icon name="arrow-up-right" width="16" height="16" />
                </a>
              </div>
            </div>
          </section>
        )}

        {/* Showcase: /careers */}
        {page.slug === "careers" && (
          <section className="section inner-showcase-band" id="apply">
            <div className="container">
              <div className="inner-form-wrap">
                <div className="inner-form-intro">
                  <p className="eyebrow">Careers</p>
                  <h2>Build practical technology with us.</h2>
                  <p>
                    Submit your profile and resume. Current openings can be
                    updated without changing the application flow.
                  </p>
                </div>
                <LeadForm type="career" />
              </div>
            </div>
          </section>
        )}

        {/* Showcase: /investors-partners */}
        {page.slug === "investors-partners" && (
          <section className="section inner-showcase-band" id="partner">
            <div className="container">
              <div className="inner-form-wrap">
                <div className="inner-form-intro">
                  <p className="eyebrow">Partnerships</p>
                  <h2>Start a strategic conversation.</h2>
                  <p>
                    Tell us about your organisation and the collaboration you
                    have in mind.
                  </p>
                </div>
                <LeadForm type="partner" />
              </div>
            </div>
          </section>
        )}

        {/* Showcase: /contact */}
        {page.slug === "contact" && (
          <>
            <section className="section inner-showcase-band" id="contact-form">
              <div className="container">
                <div className="inner-form-wrap">
                  <div className="inner-form-intro">
                    <p className="eyebrow">Project Enquiry</p>
                    <h2>Start with the business problem.</h2>
                    <p>
                      You do not need a technical specification. Tell us what is
                      not working, what you want to build, or what you want to
                      automate.
                    </p>

                    <div className="inner-direct-card">
                      <h3>Direct Contact</h3>
                      <div className="inner-direct-rows">
                        <div className="inner-direct-row">
                          <span className="inner-direct-label">Phone</span>
                          <a
                            href={`tel:${SITE_IDENTITY.phoneHref || "+919046734673"}`}
                          >
                            {SITE_IDENTITY.phone}
                          </a>
                        </div>
                        <div className="inner-direct-row">
                          <span className="inner-direct-label">Email</span>
                          <a href={`mailto:${SITE_IDENTITY.email}`}>
                            {SITE_IDENTITY.email}
                          </a>
                        </div>
                        <div className="inner-direct-row">
                          <span className="inner-direct-label">WhatsApp</span>
                          <a
                            href={SITE_IDENTITY.whatsapp}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Chat on WhatsApp
                            <Icon name="arrow-up-right" width="14" height="14" />
                          </a>
                        </div>
                        <div className="inner-direct-row">
                          <span className="inner-direct-label">Office</span>
                          <address className="inner-direct-address">
                            {SITE_IDENTITY.address}
                          </address>
                        </div>
                      </div>
                    </div>
                  </div>
                  <LeadForm type="project" />
                </div>
              </div>
            </section>

            <section className="section inner-mini-forms">
              <div className="container inner-split-forms">
                <div className="inner-mini-panel">
                  <p className="eyebrow">Callback</p>
                  <h2>Request a Callback</h2>
                  <LeadForm type="callback" />
                </div>
                <div className="inner-mini-panel">
                  <p className="eyebrow">Consultation</p>
                  <h2>Choose a Preferred Time</h2>
                  <LeadForm type="consultation" />
                </div>
              </div>
            </section>
          </>
        )}

        {/* FAQ Accordion */}
        {page.faq && page.faq.length > 0 && (
          <section className="section inner-faq-section">
            <div className="container inner-faq-grid">
              <div className="inner-faq-intro">
                <p className="eyebrow">FAQ</p>
                <h2>Questions, answered.</h2>
              </div>
              <div className="faq-list">
                {page.faq.map((f, i) => (
                  <details key={i} className="faq-item">
                    <summary>
                      <span className="faq-index" aria-hidden="true">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="faq-question-text">{f.q}</span>
                      <span className="faq-plus" aria-hidden="true">
                        +
                      </span>
                    </summary>
                    <p>{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Final CTA Band */}
        {!isExcludedCta && (
          <section className="section final-cta-section inner-final-cta">
            <div className="final-cta-backdrop" aria-hidden="true">
              <FinalCtaField />
            </div>
            <div className="container final-cta-grid">
              <div>
                <p className="eyebrow">
                  The next system starts with a conversation
                </p>
                <h2>What should your business be able to do next?</h2>
              </div>
              <div className="final-cta-copy">
                <p>
                  Bring us the requirement, bottleneck or product idea.
                  We&apos;ll help identify the right technology direction.
                </p>
                <div className="final-cta-actions">
                  <Link className="button button-inverse" href="/contact">
                    Discuss Your Project
                    <Icon name="arrow-up-right" width="16" height="16" />
                  </Link>
                  <button
                    className="button button-secondary"
                    data-open-ai-chat
                    type="button"
                    onClick={() => {
                      if (typeof window !== "undefined") {
                        window.dispatchEvent(new Event("rankrise-ai-open"));
                      }
                    }}
                  >
                    Ask RankRise AI
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
      <AccentThemeDock />
    </>
  );
}

export default InnerPage;
