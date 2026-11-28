"use client";

import Link from "next/link";
import { HOMEPAGE_SECTIONS_COPY, PORTFOLIO_SLOTS } from "@/lib/data/homepage";
import { routeHref } from "@/lib/routes";
import { Icon } from "@/components/ui/icon";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { SpotlightCard } from "@/components/motion/spotlight-card";

export function PortfolioSection() {
  const copy = HOMEPAGE_SECTIONS_COPY.portfolio;

  return (
    <section
      id="portfolio"
      className="section portfolio-section"
      data-section="portfolio"
      aria-labelledby="portfolio-heading"
    >
      <div className="container">
        <ScrollReveal variant="fade-up" className="section-heading">
          <div>
            <p className="eyebrow">{copy.eyebrow}</p>
            <h2 id="portfolio-heading">{copy.heading}</h2>
          </div>
        </ScrollReveal>
        <div className="portfolio-preview-grid" aria-label="Case study showcase slots">
          {PORTFOLIO_SLOTS.map((slot, idx) => (
            <ScrollReveal key={slot.index} variant="fade-up" delay={idx * 80}>
              <SpotlightCard className="portfolio-preview-card">
                <div className="portfolio-preview-top">
                  <span className="eyebrow">{slot.tag}</span>
                  <span className="portfolio-preview-index" aria-hidden="true">
                    {slot.index}
                  </span>
                </div>
                <h3>{slot.title}</h3>
                <p>{slot.summary}</p>
                <div className="portfolio-preview-footer">
                  <span className="portfolio-preview-status">{slot.status}</span>
                  <Link className="text-link" href={routeHref("/portfolio")}>
                    Preview layout
                    <Icon name="arrow-up-right" />
                  </Link>
                </div>
              </SpotlightCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
