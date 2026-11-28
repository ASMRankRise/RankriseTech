"use client";

import Link from "next/link";
import type { SitePage } from "@/lib/data/types";
import { SITE_IDENTITY } from "@/lib/data/site";
import { SERVICES_LIST } from "@/lib/data/services";
import { PRODUCTS } from "@/lib/data/products";
import { INNER_SHOWCASE_COPY } from "@/lib/data/widgets";
import { Icon } from "@/components/ui/icon";
import { LeadForm } from "@/components/ui/lead-form";
import { EditorialSealVisual } from "@/components/ui/section-illustrations";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { IndustriesExplorer } from "./industries-explorer";
import { InsightsGrid } from "./insights-section";
import { ProductCard } from "./products-section";

function serviceGroup(index: number): string {
  return index < 5 ? "Build" : index < 10 ? "Automate" : "Connect";
}

export function InnerShowcases({ page }: { page: SitePage }) {
  if (page.slug === "services") {
    const copy = INNER_SHOWCASE_COPY.services;
    return (
      <section className="section inner-showcase-band">
        <div className="container">
          <ScrollReveal variant="fade-up" className="section-heading heading-split">
            <div>
              <p className="eyebrow">{copy.eyebrow}</p>
              <h2>
                {copy.headingLine1}
                <br />
                {copy.headingLine2}
              </h2>
            </div>
            <p>{copy.lead}</p>
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
                  <Link href={`/services/${s.slug}`} className="inner-card-heading-link">
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
    );
  }

  if (page.slug === "industries") {
    const copy = INNER_SHOWCASE_COPY.industries;
    return (
      <section className="section inner-showcase-band">
        <div className="container">
          <ScrollReveal variant="fade-up" className="section-heading heading-split">
            <div>
              <p className="eyebrow">{copy.eyebrow}</p>
              <h2>
                {copy.headingLine1}
                <br />
                {copy.headingLine2}
              </h2>
            </div>
            <p>{copy.lead}</p>
          </ScrollReveal>
          <IndustriesExplorer />
        </div>
      </section>
    );
  }

  if (page.slug === "products") {
    const copy = INNER_SHOWCASE_COPY.products;
    return (
      <section className="section inner-showcase-band">
        <div className="container">
          <div className="section-heading heading-split">
            <div>
              <p className="eyebrow">{copy.eyebrow}</p>
              <h2>
                {copy.headingLine1}
                <br />
                {copy.headingLine2}
              </h2>
            </div>
            <p>{copy.lead}</p>
          </div>
          <div className="inner-products-grid">
            {PRODUCTS.map((prod, idx) => (
              <ProductCard key={prod.id} product={prod} index={idx} variant="inner" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (page.slug === "insights") {
    const copy = INNER_SHOWCASE_COPY.insights;
    return (
      <section className="section inner-showcase-band">
        <div className="container">
          <div className="section-heading heading-split">
            <div>
              <p className="eyebrow">{copy.eyebrow}</p>
              <h2>{copy.heading}</h2>
            </div>
            <p>{copy.lead}</p>
          </div>
          <InsightsGrid />
        </div>
      </section>
    );
  }

  if (page.slug === "locations/kolhapur") {
    return (
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
    );
  }

  if (page.slug === "careers") {
    return (
      <section className="section inner-showcase-band" id="apply">
        <div className="container">
          <div className="inner-form-wrap">
            <div className="inner-form-intro">
              <p className="eyebrow">Careers</p>
              <h2>Build practical technology with us.</h2>
              <p>
                Submit your profile and resume. Current openings can be updated without changing
                the application flow.
              </p>
            </div>
            <LeadForm type="career" />
          </div>
        </div>
      </section>
    );
  }

  if (page.slug === "investors-partners") {
    return (
      <section className="section inner-showcase-band" id="partner">
        <div className="container">
          <div className="inner-form-wrap">
            <div className="inner-form-intro">
              <p className="eyebrow">Partnerships</p>
              <h2>Start a strategic conversation.</h2>
              <p>Tell us about your organisation and the collaboration you have in mind.</p>
            </div>
            <LeadForm type="partner" />
          </div>
        </div>
      </section>
    );
  }

  if (page.slug === "contact") {
    return (
      <>
        <section className="section inner-showcase-band" id="contact-form">
          <div className="container">
            <div className="inner-form-wrap">
              <div className="inner-form-intro">
                <p className="eyebrow">Project Enquiry</p>
                <h2>Start with the business problem.</h2>
                <p>
                  You do not need a technical specification. Tell us what is not working, what you
                  want to build, or what you want to automate.
                </p>

                <div className="inner-direct-card">
                  <h3>Direct Contact</h3>
                  <div className="inner-direct-rows">
                    <div className="inner-direct-row">
                      <span className="inner-direct-label">Phone</span>
                      <a href={`tel:${SITE_IDENTITY.phoneHref || "+919046734673"}`}>
                        {SITE_IDENTITY.phone}
                      </a>
                    </div>
                    <div className="inner-direct-row">
                      <span className="inner-direct-label">Email</span>
                      <a href={`mailto:${SITE_IDENTITY.email}`}>{SITE_IDENTITY.email}</a>
                    </div>
                    <div className="inner-direct-row">
                      <span className="inner-direct-label">WhatsApp</span>
                      <a href={SITE_IDENTITY.whatsapp} target="_blank" rel="noreferrer">
                        Chat on WhatsApp
                        <Icon name="arrow-up-right" width="14" height="14" />
                      </a>
                    </div>
                    <div className="inner-direct-row">
                      <span className="inner-direct-label">Office</span>
                      <address className="inner-direct-address">{SITE_IDENTITY.address}</address>
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
    );
  }

  return null;
}
