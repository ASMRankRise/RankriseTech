"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { INDUSTRIES } from "@/lib/data/industries";
import { HOMEPAGE_SECTIONS_COPY } from "@/lib/data/homepage";
import { Icon } from "@/components/ui/icon";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import RadialRevealButton from "@/components/originkit/ui/radial-reveal-button";

export function IndustriesExplorer({
  onOpenInquiry,
}: {
  onOpenInquiry?: (context?: string) => void;
}) {
  const router = useRouter();
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
          <div
            style={{ display: "inline-block" }}
            onClick={() => {
              if (onOpenInquiry) {
                onOpenInquiry(`${activeIndustry.name} software solution`);
              } else {
                router.push("/contact");
              }
            }}
          >
            <RadialRevealButton
              label={`Discuss ${activeIndustry.name}`}
              padding="12px 22px"
              gap={8}
              rounded={100}
              addIcon={true}
              icon={{
                type: "symbol",
                symbol: "↗",
                side: "right",
                size: 16,
                color: "#FFFFFF",
                hoverColor: "#FFFFFF",
              }}
              font={{
                fontSize: "0.95rem",
                fontWeight: 600,
                letterSpacing: "-0.01em",
                lineHeight: "1.4",
              }}
              colors={{
                fill: "var(--rankrise-blue)",
                textColor: "#FFFFFF",
                hoverFill: "#FF4F1F",
                hoverTextColor: "#FFFFFF",
              }}
              border={{
                borderWidth: 0,
              }}
            />
          </div>
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
