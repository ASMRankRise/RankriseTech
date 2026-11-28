"use client";

import Link from "next/link";
import { CORE_CAPABILITIES } from "@/lib/data/services";
import { HOMEPAGE_SECTIONS_COPY } from "@/lib/data/homepage";
import { Icon } from "@/components/ui/icon";
import { CapabilitySchematic } from "@/components/ui/section-illustrations";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

function getCapabilitySpanClass(index: number, total: number): string {
  if (index === total - 1 && total % 2 === 1) {
    return "capability-span-3";
  }
  const pairIndex = Math.floor(index / 2);
  const posInPair = index % 2;
  const isTwoWide = pairIndex % 2 === 0 ? posInPair === 0 : posInPair === 1;
  return isTwoWide ? "capability-span-2" : "capability-span-1";
}

export function CapabilitiesSection() {
  const copy = HOMEPAGE_SECTIONS_COPY.capabilities;

  return (
    <section
      id="capabilities"
      className="section capabilities-section"
      data-section="core-capabilities"
      aria-labelledby="capabilities-heading"
    >
      <div className="container">
        <ScrollReveal variant="fade-up" className="section-heading heading-split">
          <div>
            <p className="eyebrow">{copy.eyebrow}</p>
            <h2 id="capabilities-heading">
              {copy.headingLine1}
              <br className="desktop-break" /> {copy.headingLine2}
            </h2>
          </div>
          <p>{copy.lead}</p>
        </ScrollReveal>
        <div className="capability-grid">
          {CORE_CAPABILITIES.map((capability, index) => (
            <ScrollReveal
              key={capability.id}
              variant="fade-up"
              delay={index * 60}
              className={getCapabilitySpanClass(index, CORE_CAPABILITIES.length)}
            >
              <article className="capability-card">
                <div className="capability-card-top">
                  <div className="capability-icon">
                    <Icon name={capability.icon} width="22" height="22" />
                  </div>
                  <div className="capability-schematic-slot" aria-hidden="true">
                    <CapabilitySchematic id={capability.id} />
                  </div>
                </div>
                <h3>{capability.name}</h3>
                <p>{capability.description}</p>
                <Link
                  className="capability-arrow-link"
                  href={capability.href}
                  aria-label={`Explore ${capability.name}`}
                >
                  <span className="capability-arrow-icon is-primary" aria-hidden="true">
                    <Icon name="arrow-up-right" width="20" height="20" />
                  </span>
                  <span className="capability-arrow-icon is-incoming" aria-hidden="true">
                    <Icon name="arrow-up-right" width="20" height="20" />
                  </span>
                </Link>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
