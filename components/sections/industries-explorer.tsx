"use client";

import Link from "next/link";
import { useState } from "react";
import { INDUSTRIES } from "@/lib/data/industries";
import { HOMEPAGE_SECTIONS_COPY } from "@/lib/data/homepage";
import { Icon } from "@/components/ui/icon";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

export function IndustriesExplorer({
  onOpenInquiry,
}: {
  onOpenInquiry?: (context?: string) => void;
}) {
  const [activeIndustryIndex, setActiveIndustryIndex] = useState(0);
  const activeIndustry = INDUSTRIES[activeIndustryIndex] ?? INDUSTRIES[0];

  return (
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
              <Link href={industry.href} onFocus={() => setActiveIndustryIndex(index)}>
                <h3>{industry.name}</h3>
                <p>{industry.theme}</p>
              </Link>
              <Icon name="arrow-up-right" width="18" height="18" />
            </li>
          );
        })}
      </ul>
      <aside className="industry-context-card" aria-label="Selected industry context">
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
          {onOpenInquiry ? (
            <button
              type="button"
              className="button button-primary"
              aria-haspopup="dialog"
              aria-controls="preview-dialog"
              onClick={() => onOpenInquiry(`${activeIndustry.name} software solution`)}
            >
              Discuss {activeIndustry.name}
              <Icon name="arrow-up-right" width="16" height="16" />
            </button>
          ) : (
            <Link href="/contact" className="button button-primary">
              Discuss {activeIndustry.name}
              <Icon name="arrow-up-right" width="16" height="16" />
            </Link>
          )}
        </div>
      </aside>
    </div>
  );
}

export function IndustriesSection({
  onOpenInquiry,
}: {
  onOpenInquiry: (context?: string) => void;
}) {
  const copy = HOMEPAGE_SECTIONS_COPY.industries;

  return (
    <section
      id="industries"
      className="section industries-section"
      data-section="industries"
      aria-labelledby="industries-heading"
    >
      <div className="container">
        <ScrollReveal variant="fade-up" className="section-heading heading-split">
          <div>
            <p className="eyebrow">{copy.eyebrow}</p>
            <h2 id="industries-heading">{copy.heading}</h2>
          </div>
          <p>{copy.lead}</p>
        </ScrollReveal>
        <IndustriesExplorer onOpenInquiry={onOpenInquiry} />
      </div>
    </section>
  );
}
