"use client";

import { useState } from "react";
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
import { InnerHero } from "./inner-hero/InnerHero";
import { LeadForm } from "./lead-form";
import { Icon } from "./icon";
import { ScrollReveal } from "./motion/scroll-reveal";
import { SpotlightCard } from "./motion/spotlight-card";
import {
  EditorialSealVisual,
  FinalCtaField,
  ProductMotif,
} from "./section-illustrations";

function serviceGroup(index: number): string {
  return index < 5 ? "Build" : index < 10 ? "Automate" : "Connect";
}

export function InnerPage({ page }: { page: SitePage }) {
  const [activeIndustryIndex, setActiveIndustryIndex] = useState(0);
  const isExcludedCta =
    page.slug.startsWith("contact") ||
    page.slug.startsWith("privacy") ||
    page.slug.startsWith("terms") ||
    page.slug.startsWith("cookie") ||
    page.slug.startsWith("disclaimer") ||
    page.slug.startsWith("data-security");

  return (
    <>
      <SiteHeader overHero activePath={page.slug ? `/${page.slug}` : "/"} />
      <main id="main-content" className="inner-page">
        <InnerHero page={page} />

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

              <div
                className="inner-story-list"
                data-layout={
                  page.sections.length >= 4 && !page.slug.startsWith("insights")
                    ? "grid"
                    : "stack"
                }
              >
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
                      {page.slug === "products" &&
                        (section.id === "salesapp" || section.id === "hrms") && (
                          <Link href="/contact" className="text-link">
                            Request {section.id === "salesapp" ? "SalesApp" : "HRMS"} Demo
                            <Icon name="arrow-right" width="16" height="16" />
                          </Link>
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
              <ScrollReveal variant="fade-up" className="section-heading heading-split">
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
              </ScrollReveal>

              <div className="inner-bento-grid">
                {SERVICES_LIST.map((s, i) => (
                  <article className="inner-service-card" key={s.slug}>
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
                      className="capability-arrow-link"
                      aria-label={`Explore ${s.name}`}
                    >
                      <span className="capability-arrow-icon is-primary" aria-hidden="true">
                        <Icon name="arrow-up-right" width="20" height="20" />
                      </span>
                      <span className="capability-arrow-icon is-incoming" aria-hidden="true">
                        <Icon name="arrow-up-right" width="20" height="20" />
                      </span>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Showcase: /industries */}
        {page.slug === "industries" && (
          <section className="section inner-showcase-band">
            <div className="container">
              <ScrollReveal variant="fade-up" className="section-heading heading-split">
                <div>
                  <p className="eyebrow">Context comes first</p>
                  <h2>
                    Different industries.
                    <br />
                    Different operating realities.
                  </h2>
                </div>
                <p>
                  We map the software and AI solution to the workflow, users and
                  information environment of each sector.
                </p>
              </ScrollReveal>

              <div className="industries-explorer">
                <ul className="industry-list">
                  {INDUSTRIES.map((industry, index) => {
                    const isActive = index === activeIndustryIndex;
                    return (
                      <li
                        key={industry.slug}
                        className={isActive ? "is-active" : undefined}
                        onMouseEnter={() => setActiveIndustryIndex(index)}
                      >
                        <span className="industry-number" aria-hidden="true">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <Link
                          href={`/industries/${industry.slug}`}
                          onFocus={() => setActiveIndustryIndex(index)}
                        >
                          <h3>{industry.name}</h3>
                          <p>{industry.theme}</p>
                        </Link>
                        <Icon name="arrow-up-right" width="18" height="18" />
                      </li>
                    );
                  })}
                </ul>
                <aside className="industry-context-card" aria-label="Selected industry context">
                  {(() => {
                    const activeIndustry = INDUSTRIES[activeIndustryIndex] ?? INDUSTRIES[0];
                    return (
                      <>
                        <div className="industry-context-top">
                          <span className="eyebrow">
                            {String(activeIndustryIndex + 1).padStart(2, "0")} / Sector Brief
                          </span>
                          <span className="industry-context-tag" aria-hidden="true">
                            Hover any sector
                          </span>
                        </div>
                        <p className="industry-context-title">{activeIndustry.name}</p>
                        <p className="industry-context-pain">{activeIndustry.pain}</p>
                        <div className="industry-solutions-block">
                          <p className="industry-solutions-label">Typical Solution Directions</p>
                          <ul className="industry-solutions-chips">
                            {activeIndustry.solutions.map((solution) => (
                              <li key={solution}>{solution}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="industry-context-footer">
                          <Link href="/contact" className="button button-primary">
                            Discuss {activeIndustry.name}
                            <Icon name="arrow-up-right" width="16" height="16" />
                          </Link>
                        </div>
                      </>
                    );
                  })()}
                </aside>
              </div>
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
                      {prod.href.startsWith("/products#") ? (
                        <Link href="/contact" className="text-link">
                          Request {prod.name} Demo
                          <Icon name="arrow-up-right" width="16" height="16" />
                        </Link>
                      ) : (
                        <Link href={prod.href} className="text-link">
                          Explore {prod.name}
                          <Icon name="arrow-up-right" width="16" height="16" />
                        </Link>
                      )}
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
                  <ScrollReveal key={a.slug} variant="fade-up" delay={i * 80}>
                    <SpotlightCard
                      as="article"
                      className="insight-card"
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
                  </ScrollReveal>
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
                <div className="final-contact-direct" aria-label="Direct contact details">
                  <a href={`tel:${SITE_IDENTITY.phoneHref}`} className="final-contact-link">
                    <Icon name="phone" width="15" height="15" />
                    <span>{SITE_IDENTITY.phone}</span>
                  </a>
                  <span className="final-contact-sep" aria-hidden="true">·</span>
                  <a href={`mailto:${SITE_IDENTITY.email}`} className="final-contact-link">
                    <span className="email-symbol" aria-hidden="true">✉</span>
                    <span>{SITE_IDENTITY.email}</span>
                  </a>
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
