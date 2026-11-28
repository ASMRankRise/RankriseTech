"use client";

import Link from "next/link";
import type { SitePage } from "@/lib/data/types";
import { SITE_IDENTITY } from "@/lib/data/site";
import { INNER_SHOWCASE_COPY } from "@/lib/data/widgets";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { AccentThemeDock } from "@/components/layout/accent-theme-dock";
import { InnerHero } from "@/components/hero/inner-hero";
import { InnerShowcases } from "@/components/sections/inner-showcases";
import { Icon } from "@/components/ui/icon";
import { EditorialSealVisual, FinalCtaField } from "@/components/ui/section-illustrations";

export function InnerPage({ page }: { page: SitePage }) {
  const isExcludedCta =
    page.slug.startsWith("contact") ||
    page.slug.startsWith("privacy") ||
    page.slug.startsWith("terms") ||
    page.slug.startsWith("cookie") ||
    page.slug.startsWith("disclaimer") ||
    page.slug.startsWith("data-security");

  const finalCtaCopy = INNER_SHOWCASE_COPY.finalCta;

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
                    variant={page.slug.startsWith("insights") ? "insights" : "evidence"}
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
                  <article className="inner-story-item" key={section.id || idx} id={section.id}>
                    <div className="inner-story-meta">
                      <span>{String(idx + 1).padStart(2, "0")}</span>
                    </div>
                    <div className="inner-story-body">
                      <h2>{section.heading}</h2>
                      {section.body
                        .split("\n")
                        .map((para, pIdx) => (para ? <p key={pIdx}>{para}</p> : null))}
                      {section.bullets && section.bullets.length > 0 && (
                        <ul className="inner-bullet-chips" aria-label="Key considerations">
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

        <InnerShowcases page={page} />

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
                <p className="eyebrow">{finalCtaCopy.eyebrow}</p>
                <h2>{finalCtaCopy.heading}</h2>
              </div>
              <div className="final-cta-copy">
                <p>{finalCtaCopy.lead}</p>
                <div className="final-cta-actions">
                  <Link className="button button-inverse" href="/contact">
                    {finalCtaCopy.primaryCta}
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
                    {finalCtaCopy.secondaryCta}
                  </button>
                </div>
                <div className="final-contact-direct" aria-label="Direct contact details">
                  <a href={`tel:${SITE_IDENTITY.phoneHref}`} className="final-contact-link">
                    <Icon name="phone" width="15" height="15" />
                    <span>{SITE_IDENTITY.phone}</span>
                  </a>
                  <span className="final-contact-sep" aria-hidden="true">
                    ·
                  </span>
                  <a href={`mailto:${SITE_IDENTITY.email}`} className="final-contact-link">
                    <span className="email-symbol" aria-hidden="true">
                      ✉
                    </span>
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
