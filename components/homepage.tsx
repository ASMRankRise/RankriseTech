"use client";

import { useState, useRef } from "react";
import { FOUR_PILLARS, SITE_IDENTITY } from "@/lib/data/site";
import { DEFAULT_HERO_COPY, HOMEPAGE_SECTIONS_COPY } from "@/lib/data/homepage";
import { routeHref } from "@/lib/routes";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { AccentThemeDock } from "@/components/layout/accent-theme-dock";
import { GlobalHero } from "@/components/hero/global-hero";
import { CompanyStats } from "@/components/sections/company-stats";
import { CapabilitiesSection } from "@/components/sections/capabilities-section";
import { ProductsSection } from "@/components/sections/products-section";
import { IndustriesSection } from "@/components/sections/industries-explorer";
import { ProcessPathway } from "@/components/sections/process-pathway";
import { PortfolioSection } from "@/components/sections/portfolio-section";
import { WhyRankRiseSection } from "@/components/sections/why-rankrise-section";
import { InsightsSection } from "@/components/sections/insights-section";
import { EngineeringVisual } from "@/components/ui/engineering-visual";
import { Icon } from "@/components/ui/icon";
import { PreviewDialog, type DialogState } from "@/components/ui/preview-dialog";
import { EntryPointCta } from "@/components/ui/entry-point-cta";
import { InitialPageLoader } from "@/components/motion/page-loader";
import { HeroAnimation } from "@/components/motion/hero-animation";

interface HomepageProps {
  heroVariant?: "default" | "global";
}

export function Homepage({ heroVariant = "default" }: HomepageProps) {
  const [dialogState, setDialogState] = useState<DialogState | null>(null);
  const heroRef = useRef<HTMLElement>(null);
  const openInquiry = (context?: string) => setDialogState({ kind: "inquiry", context });

  const splitH1Lines = () => {
    const parts = [
      DEFAULT_HERO_COPY.headlineLead,
      <span key="blue">{DEFAULT_HERO_COPY.headlineHighlight}</span>,
    ];
    return parts.map((part, i) => (
      <span key={i} className="split-line" style={{ display: "block" }}>
        {part}
      </span>
    ));
  };

  return (
    <>
      <InitialPageLoader />
      <SiteHeader overHero={heroVariant === "global"} activePath="/" />
      <main id="main-content">
        <div className="hero-pin-stage">
          {heroVariant === "global" ? (
            <GlobalHero onOpenInquiry={openInquiry} />
          ) : (
            <section id="home" ref={heroRef} className="hero-section" data-section="hero" aria-labelledby="hero-heading">
              <HeroAnimation heroRef={heroRef} />
              <div className="container">
                <div className="hero-grid">
                  <div className="hero-copy">
                    <p className="eyebrow hero-eyebrow"><span aria-hidden="true" />{DEFAULT_HERO_COPY.eyebrow}</p>
                    <h1 id="hero-heading">{splitH1Lines()}</h1>
                    <p className="hero-description">{SITE_IDENTITY.heroDescription}</p>
                    <div className="hero-actions">
                      <a className="button button-primary" href="#capabilities">
                        {DEFAULT_HERO_COPY.primaryCta}<Icon name="arrow-right" />
                      </a>
                      <button
                        className="button button-secondary"
                        type="button"
                        aria-haspopup="dialog"
                        aria-controls="preview-dialog"
                        onClick={() => openInquiry()}
                      >
                        {DEFAULT_HERO_COPY.secondaryCta}<Icon name="arrow-up-right" />
                      </button>
                    </div>
                    <div className="hero-telemetry-ribbon" aria-label="System telemetry">
                      {DEFAULT_HERO_COPY.telemetry.map((item) => (
                        <div key={item} className="telemetry-item">
                          <span aria-hidden="true" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                    <p className="hero-preview-note">
                      {DEFAULT_HERO_COPY.previewNote} <span aria-hidden="true">·</span> {DEFAULT_HERO_COPY.previewNoteSub}
                    </p>
                  </div>
                  <div className="hero-visual-wrapper">
                    <span className="hero-hud-card hero-hud-card-top" aria-hidden="true">
                      <span className="status-dot" /> {DEFAULT_HERO_COPY.hudTop}
                    </span>
                    <EngineeringVisual />
                    <span className="hero-hud-card hero-hud-card-bottom" aria-hidden="true">
                      {DEFAULT_HERO_COPY.hudBottom}
                    </span>
                  </div>
                </div>
                <ul className="pillar-strip" aria-label="Our four pillars">
                  {FOUR_PILLARS.map((pillar, index) => (
                    <li key={pillar}>
                      <span aria-hidden="true">0{index + 1}</span>
                      {pillar}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}
        </div>

        <div className="homepage-cover-stack">
          <div className="section-two-cover">
            <CompanyStats />
          </div>

          <CapabilitiesSection />

          <ProductsSection />

          <IndustriesSection onOpenInquiry={openInquiry} />

          <section id="process" className="section process-section" data-section="development-process" aria-labelledby="process-heading">
            <ProcessPathway />
          </section>

          <PortfolioSection />

          <WhyRankRiseSection />

          <InsightsSection />

          <EntryPointCta
            id="contact"
            dataSection="final-cta"
            headingId="contact-heading"
            theme="night"
            href={routeHref("/contact")}
            eyebrow={HOMEPAGE_SECTIONS_COPY.finalCta.eyebrow}
            headline={<>Have an Idea? Let&apos;s Engineer It.</>}
            details={[
              SITE_IDENTITY.email,
              SITE_IDENTITY.phone,
              HOMEPAGE_SECTIONS_COPY.finalCta.locationSummary,
            ]}
          />
        </div>
      </main>
      <SiteFooter />
      <PreviewDialog state={dialogState} onDismiss={() => setDialogState(null)} onPrepareBrief={openInquiry} />
      <AccentThemeDock />
    </>
  );
}

export default Homepage;
