"use client";

import { WHY_RANKRISE, WHY_RANKRISE_COPY } from "@/lib/data/homepage";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

export function WhyRankRiseSection() {
  return (
    <section
      id="why-rankrise"
      className="section why-section"
      data-section="why-rankrise"
      aria-labelledby="why-heading"
    >
      <div className="container why-grid">
        <ScrollReveal variant="fade-up" className="why-intro">
          <p className="eyebrow">{WHY_RANKRISE_COPY.eyebrow}</p>
          <h2 id="why-heading">{WHY_RANKRISE_COPY.heading}</h2>
          <p className="lead-copy">
            {WHY_RANKRISE_COPY.leadLine1}
            <br />
            {WHY_RANKRISE_COPY.leadLine2}
          </p>
          <p>{WHY_RANKRISE_COPY.description}</p>
        </ScrollReveal>
        <ul className="principle-list">
          {WHY_RANKRISE.map((principle, index) => (
            <li key={principle.title}>
              <span aria-hidden="true">0{index + 1}</span>
              <h3>{principle.title}</h3>
              <p>{principle.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
