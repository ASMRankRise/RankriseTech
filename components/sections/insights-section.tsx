"use client";

import Link from "next/link";
import { INSIGHT_ARTICLES } from "@/lib/data/insights";
import { HOMEPAGE_SECTIONS_COPY } from "@/lib/data/homepage";
import { routeHref } from "@/lib/routes";
import { Icon } from "@/components/ui/icon";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { SpotlightCard } from "@/components/motion/spotlight-card";

export function InsightsGrid({ limit }: { limit?: number }) {
  const articles = typeof limit === "number" ? INSIGHT_ARTICLES.slice(0, limit) : INSIGHT_ARTICLES;

  return (
    <div className="insights-cards-grid">
      {articles.map((article, index) => (
        <ScrollReveal key={article.slug} variant="fade-up" delay={index * 80}>
          <SpotlightCard as="article" className="insight-card">
            <div className="insight-card-top">
              <span className="eyebrow">Perspective</span>
              <span className="insight-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <h3>
              <Link href={article.href}>{article.title}</Link>
            </h3>
            <p>{article.intro}</p>
            <Link className="text-link" href={article.href}>
              Read article
              <Icon name="arrow-up-right" />
            </Link>
          </SpotlightCard>
        </ScrollReveal>
      ))}
    </div>
  );
}

export function InsightsSection() {
  const copy = HOMEPAGE_SECTIONS_COPY.insights;

  return (
    <section
      id="insights"
      className="section insights-section"
      data-section="insights"
      aria-labelledby="insights-heading"
    >
      <div className="container">
        <ScrollReveal variant="fade-up" className="section-heading heading-split">
          <div>
            <p className="eyebrow">{copy.eyebrow}</p>
            <h2 id="insights-heading">{copy.heading}</h2>
          </div>
          <div className="insights-header-lead">
            <p>{copy.lead}</p>
            <Link className="text-link" href={routeHref("/insights")}>
              {copy.ctaLabel}
              <Icon name="arrow-right" />
            </Link>
          </div>
        </ScrollReveal>
        <InsightsGrid limit={3} />
      </div>
    </section>
  );
}
