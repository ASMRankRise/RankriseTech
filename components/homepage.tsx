"use client";

import { useState, useRef } from "react";
import {
  AI_EXPLORATIONS,
  CORE_CAPABILITIES,
  FOUR_PILLARS,
  INDUSTRIES,
  PROCESS_STAGES,
  PRODUCTS,
  SITE_IDENTITY,
  STACK_CATEGORIES,
  WEBSITE_STACK,
  WHY_RANKRISE,
  type Product,
} from "@/lib/site-content";
import { routeHref } from "@/lib/routes";
import { EngineeringVisual, IntelligenceVisual } from "./engineering-visual";
import { Icon } from "./icon";
import { PreviewDialog, type DialogState } from "./preview-dialog";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { ScrollReveal } from "./motion/scroll-reveal";
import { SpotlightCard } from "./motion/spotlight-card";
import { InitialPageLoader } from "./motion/page-loader";
import { HeroAnimation } from "./motion/hero-animation";
import { GlobalHero } from "./global-hero";

const CAPABILITY_TAGS: Record<string, string[]> = {
  "custom-software": ["Distributed Architecture", "Modern APIs", "Enterprise Scale"],
  "ai-ml": ["RAG Pipelines", "LLM Integration", "Predictive Systems"],
  "web-app": ["Next.js & React", "High Performance", "Micro-Frontends"],
  "mobile-app": ["iOS & Android", "Offline Sync", "Native Experience"],
  "cloud-devops": ["Infrastructure as Code", "CI/CD Pipelines", "Zero Downtime"],
  "digital-transformation": ["Legacy Modernization", "Process Automation", "System Integration"],
};

const PRODUCT_TELEMETRY: Record<string, string> = {
  trimarkity: "Marketing Intelligence · SaaS",
  "1socialsnap": "Asset Automation · Creative Tech",
  salesapp: "Pipeline Engine · Commercial Tech",
  hrms: "People Operations · Enterprise Tech",
};

const PROCESS_PHASES: Record<string, string> = {
  Discover: "Scope & Objectives",
  Strategize: "Architecture & Stack",
  Design: "UI/UX & Protocols",
  Develop: "Type-Safe Engineering",
  "Test & Deploy": "CI/CD & Observability",
  "Support & Scale": "Performance & Evolution",
};

function ProductPanel({ product, index }: { product: Product; index: number }) {
  return (
    <SpotlightCard
      as="article"
      className={`product-card${index === 0 ? " product-featured" : ""}`}
      id={`product-${product.id}`}
      aria-labelledby={`product-${product.id}-title`}
    >
      <div className="product-content">
        <div className="product-topline">
          <span className="eyebrow">{product.category}</span>
          <span className="product-number" aria-hidden="true">0{index + 1}</span>
        </div>
        <span className="product-telemetry-tag" aria-hidden="true">
          {PRODUCT_TELEMETRY[product.id] || "PROPRIETARY SOFTWARE"}
        </span>
        <h3 id={`product-${product.id}-title`}>{product.name}</h3>
        <p className="product-headline">{product.headline}</p>
        <p className="product-description">{product.positioning} {product.value}</p>
        <p className="product-endorsement">{SITE_IDENTITY.productEndorsement}</p>
        <a className="text-link" href={product.href}>Explore {product.name}<Icon name="arrow-up-right" /></a>
      </div>
      <figure className="product-media">
        <span className="media-corner media-corner-top" aria-hidden="true" />
        <Icon name="image" width="28" height="28" />
        <figcaption>
          <span>Genuine screenshot slot</span>
          <small>Approved product imagery pending</small>
        </figcaption>
        <span className="media-corner media-corner-bottom" aria-hidden="true" />
      </figure>
    </SpotlightCard>
  );
}

interface HomepageProps {
  heroVariant?: "default" | "global";
}

export function Homepage({ heroVariant = "default" }: HomepageProps) {
  const [dialogState, setDialogState] = useState<DialogState | null>(null);
  const heroRef = useRef<HTMLElement>(null);
  const openInquiry = (context?: string) => setDialogState({ kind: "inquiry", context });

  // Split H1 text into lines for GSAP animation
  const splitH1Lines = () => {
    // Two natural semantic lines:
    // Line 1: "Building Intelligent Software for a "
    // Line 2: <span>Smarter Digital World.</span>
    // CSS rule .hero-copy h1 span handles the blue color
    const parts = [
      "Building Intelligent Software for a ",
      <span key="blue">Smarter Digital World.</span>,
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
        {/* Hero Section — conditional rendering based on variant */}
        {heroVariant === "global" ? (
          <GlobalHero onOpenInquiry={openInquiry} />
        ) : (
          <section id="home" ref={heroRef} className="hero-section" data-section="hero" aria-labelledby="hero-heading">
            <HeroAnimation heroRef={heroRef} />
            <div className="container">
              <div className="hero-grid">
                <div className="hero-copy">
                  <p className="eyebrow hero-eyebrow"><span aria-hidden="true" />Engineering a connected future</p>
                  <h1 id="hero-heading">{splitH1Lines()}</h1>
                  <p className="hero-description">{SITE_IDENTITY.heroDescription}</p>
                  <div className="hero-actions">
                    <a className="button button-primary" href="#capabilities">Explore Our Capabilities<Icon name="arrow-right" /></a>
                    <button className="button button-secondary" type="button" aria-haspopup="dialog" aria-controls="preview-dialog" onClick={() => openInquiry()}>Discuss Your Project<Icon name="arrow-up-right" /></button>
                  </div>
                  <div className="hero-telemetry-ribbon" aria-label="System telemetry">
                    <div className="telemetry-item"><span aria-hidden="true" /><span>4 In-House Products</span></div>
                    <div className="telemetry-item"><span aria-hidden="true" /><span>10 Industry Domains</span></div>
                    <div className="telemetry-item"><span aria-hidden="true" /><span>6-Stage Delivery Process</span></div>
                    <div className="telemetry-item"><span aria-hidden="true" /><span>Strict Type-Safe Core</span></div>
                  </div>
                  <p className="hero-preview-note">Initial local preview <span aria-hidden="true">·</span> Built for a considered first look</p>
                </div>
                <div className="hero-visual-wrapper">
                  <span className="hero-hud-card hero-hud-card-top" aria-hidden="true">
                    <span className="status-dot" /> RR-CORE / VERIFIED
                  </span>
                  <EngineeringVisual />
                  <span className="hero-hud-card hero-hud-card-bottom" aria-hidden="true">
                    RUNTIME / NEXT.JS APP ROUTER
                  </span>
                </div>
              </div>
              <ul className="pillar-strip" aria-label="Our four pillars">
                {FOUR_PILLARS.map((pillar, index) => <li key={pillar}><span aria-hidden="true">0{index + 1}</span>{pillar}</li>)}
              </ul>
            </div>
          </section>
        )}

        <section id="about" className="section company-section" data-section="company-introduction" aria-labelledby="company-heading">
          <div className="container company-grid">
            <ScrollReveal variant="fade-up">
              <p className="eyebrow">Beyond the brief</p>
              <h2 id="company-heading">Beyond Development. We Engineer Possibilities.</h2>
            </ScrollReveal>
            <ScrollReveal variant="fade-up" delay={100} className="company-copy">
              <p className="lead-copy">Custom-built for your challenges. Product-minded by design.</p>
              <p>RankRise Technologies brings software engineering, AI innovation and digital transformation into one connected direction. We build custom client technology alongside our own digital products, with a focus on useful experiences and practical business needs.</p>
              <a className="text-link" href={routeHref("/about-us/")}>About RankRise<Icon name="arrow-right" /></a>
            </ScrollReveal>
          </div>
          <div className="container">
            <div className="company-pillars-grid">
              <div className="company-pillar-card">
                <div className="pillar-card-icon"><Icon name="code" width="20" height="20" /></div>
                <h4>Dual-Engine Strategy</h4>
                <p>We build tailored solutions for client challenges while concurrently investing in proprietary software products.</p>
              </div>
              <div className="company-pillar-card">
                <div className="pillar-card-icon"><Icon name="layers" width="20" height="20" /></div>
                <h4>Architectural Discipline</h4>
                <p>Engineered for maintainability, high performance, strict type safety, and clean interface boundaries.</p>
              </div>
              <div className="company-pillar-card">
                <div className="pillar-card-icon"><Icon name="brain" width="20" height="20" /></div>
                <h4>Pragmatic Intelligence</h4>
                <p>Applying machine learning and generative AI where they drive measurable automation and clear business value.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="capabilities" className="section capabilities-section" data-section="core-capabilities" aria-labelledby="capabilities-heading">
          <div className="container">
            <ScrollReveal variant="fade-up" className="section-heading heading-split">
              <div><p className="eyebrow">Core Capabilities</p><h2 id="capabilities-heading">Engineering around<br className="desktop-break" /> what matters.</h2></div>
              <p>From a focused application to a broader digital change, start with the right problem and a clear direction.</p>
            </ScrollReveal>
            <div className="capability-grid">
              {CORE_CAPABILITIES.map((capability, index) => (
                <ScrollReveal key={capability.id} variant="fade-up" delay={index * 60}>
                  <SpotlightCard as="article" className="capability-card">
                    <div className="capability-icon"><Icon name={capability.icon} width="26" height="26" /></div>
                    <h3>{capability.name}</h3>
                    <p>{capability.description}</p>
                    <div className="capability-tags" aria-hidden="true">
                      {CAPABILITY_TAGS[capability.id]?.map((tag) => (
                        <span key={tag} className="capability-badge">{tag}</span>
                      ))}
                    </div>
                    <a className="text-link" href={capability.href} aria-label={`Explore ${capability.name}`}>Explore capability<Icon name="arrow-up-right" width="18" height="18" /></a>
                  </SpotlightCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section id="products" className="section products-section" data-section="in-house-products" aria-labelledby="products-heading">
          <div className="container">
            <ScrollReveal variant="fade-up" className="section-heading products-heading">
              <p className="eyebrow">Our in-house products</p>
              <h2 id="products-heading">Innovation That We Build. Products That We Own.</h2>
              <p>Four distinct product directions. One engineering mindset. Explore their report positioning while verified features and genuine product imagery await approval.</p>
            </ScrollReveal>
            <div className="product-grid">
              {PRODUCTS.map((product, index) => (
                <ScrollReveal key={product.id} variant="fade-up" delay={index * 80} className={index === 0 ? "col-span-full" : undefined}>
                  <ProductPanel product={product} index={index} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section id="ai" className="section ai-section" data-section="ai-emerging-technologies" aria-labelledby="ai-heading">
          <div className="container ai-grid">
            <ScrollReveal variant="fade-up">
              <p className="eyebrow">AI &amp; Emerging Technologies</p>
              <h2 id="ai-heading">Intelligence with<br className="desktop-break" /> a practical purpose.</h2>
              <p className="section-intro">The useful question is not simply what AI can do. It is where it could make work clearer, decisions better informed and processes more connected.</p>
              <div className="ai-areas">{AI_EXPLORATIONS.map((area) => <div key={area.title}><h3>{area.title}</h3><p>{area.description}</p></div>)}</div>
              <p className="small-note ai-scope-note">Potential use-case exploration only. These themes are not confirmed delivery capabilities, product features or roadmap commitments.</p>
              <a className="text-link" href={routeHref("/ai-emerging-technologies/")}>Explore AI &amp; Emerging Technologies<Icon name="arrow-right" /></a>
            </ScrollReveal>
            <ScrollReveal variant="fade-up" delay={120} className="ai-feature">
              <IntelligenceVisual />
              <div className="ai-feature-copy"><h3>Start with the context.<br />Keep people in the loop.</h3><p>Explore relevance, data readiness and human judgment before deciding what to build.</p></div>
            </ScrollReveal>
          </div>
        </section>

        <section id="industries" className="section industries-section" data-section="industries" aria-labelledby="industries-heading">
          <div className="container">
            <ScrollReveal variant="fade-up" className="section-heading heading-split">
              <div><p className="eyebrow">Context comes first</p><h2 id="industries-heading">Industries We Serve</h2></div>
              <p>Potential use-case themes across ten industries. These are areas for exploration, not claims of past delivery or industry certification.</p>
            </ScrollReveal>
            <ul className="industry-list">
              {INDUSTRIES.map((industry, index) => (
                <li key={industry.name}>
                  <span className="industry-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <a href={industry.href}><h3>{industry.name}</h3><p>{industry.theme}</p></a>
                  <Icon name="layers" width="22" height="22" />
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="technologies" className="section technologies-section" data-section="technology-stack" aria-labelledby="technologies-heading">
          <div className="container technology-grid">
            <ScrollReveal variant="fade-up" className="technology-intro">
              <p className="eyebrow">Technology Stack</p>
              <h2 id="technologies-heading">The right foundation.<br />Not just more tools.</h2>
              <p>Technology choices should follow the challenge, the constraints and the people who will own the system.</p>
              <div className="website-stack"><h3>This website&apos;s stack</h3><ul>{WEBSITE_STACK.map((technology) => <li key={technology}>{technology}</li>)}</ul><p>Verified for this website only, not evidence of the team&apos;s delivery portfolio.</p></div>
            </ScrollReveal>
            <ScrollReveal variant="fade-up" delay={100} className="technology-taxonomy">
              <p className="technology-status"><span className="status-dot" aria-hidden="true" />Engineering categories · capability verification pending</p>
              <ul className="stack-category-list">{STACK_CATEGORIES.map((category) => <li key={category.name}><h3>{category.name}</h3><p>{category.context}</p></li>)}</ul>
              <p className="small-note">Specific team technologies, proficiency and delivery stacks need verification. Candidate tools are intentionally not presented as a logo wall.</p>
            </ScrollReveal>
          </div>
        </section>

        <section id="process" className="section process-section" data-section="development-process" aria-labelledby="process-heading">
          <div className="container">
            <ScrollReveal variant="fade-up" className="section-heading heading-split">
              <div><p className="eyebrow">Development Process</p><h2 id="process-heading">A clear path from<br className="desktop-break" /> possibility to progress.</h2></div>
              <p>A considered working approach, with shared understanding and useful decisions at every stage.</p>
            </ScrollReveal>
            <ol className="process-list">
              {PROCESS_STAGES.map((stage, index) => (
                <li key={stage.name}>
                  <span className="process-number" aria-hidden="true">0{index + 1}</span>
                  <h3>{stage.name}</h3>
                  <span className="process-phase-badge" aria-hidden="true">{PROCESS_PHASES[stage.name] || "Phase Milestone"}</span>
                  <p>{stage.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="portfolio" className="section portfolio-section" data-section="portfolio" aria-labelledby="portfolio-heading">
          <div className="container">
            <ScrollReveal variant="fade-up" className="section-heading heading-split">
              <div><p className="eyebrow">Portfolio &amp; Case Studies</p><h2 id="portfolio-heading">Work, backed by evidence.</h2></div>
              <p>Real projects deserve genuine context, approved imagery and substantiated outcomes.</p>
            </ScrollReveal>
            <ScrollReveal variant="fade-up" delay={100} className="evidence-state">
              <div className="evidence-marker" aria-hidden="true"><Icon name="file" width="32" height="32" /></div>
              <div className="evidence-copy"><h3>Evidence first. Always.</h3><p>Approved case studies are not available in this preview.</p><p className="small-note">No clients, projects, results or screenshots have been invented to fill this space.</p></div>
              <button className="button button-secondary" type="button" aria-haspopup="dialog" aria-controls="preview-dialog" onClick={() => openInquiry("A business challenge to explore")}>Discuss your challenge<Icon name="arrow-up-right" /></button>
            </ScrollReveal>
          </div>
        </section>

        <section id="why-rankrise" className="section why-section" data-section="why-rankrise" aria-labelledby="why-heading">
          <div className="container why-grid">
            <ScrollReveal variant="fade-up" className="why-intro"><p className="eyebrow">Our working philosophy</p><h2 id="why-heading">Why RankRise</h2><p className="lead-copy">A considered approach.<br />A shared ambition.</p><p>These principles describe the approach we aim to bring to a partnership, not a substitute for verified project evidence.</p></ScrollReveal>
            <ul className="principle-list">{WHY_RANKRISE.map((principle, index) => <li key={principle.title}><span aria-hidden="true">0{index + 1}</span><h3>{principle.title}</h3><p>{principle.description}</p></li>)}</ul>
          </div>
        </section>

        <section id="insights" className="section insights-section" data-section="insights" aria-labelledby="insights-heading">
          <div className="container insights-grid">
            <ScrollReveal variant="fade-up"><div><p className="eyebrow">Insights</p><h2 id="insights-heading">Ideas worth sharing.<br />When they&apos;re ready.</h2><p className="section-intro">A place for thoughtful perspectives on software, intelligence and digital change.</p></div></ScrollReveal>
            <ScrollReveal variant="fade-up" delay={100} className="insights-state"><span className="insights-symbol" aria-hidden="true"><Icon name="file" width="40" height="40" /></span><h3>Useful perspectives.<br />Not placeholder content.</h3><p>Approved insights are not available in this preview. Resources will appear after editorial review; no authors, dates or articles have been invented.</p><button className="text-link" type="button" aria-haspopup="dialog" aria-controls="preview-dialog" onClick={() => openInquiry("A technology conversation")}>Prepare a conversation<Icon name="arrow-right" /></button></ScrollReveal>
          </div>
        </section>

        <section id="contact" className="section final-cta-section" data-section="final-cta" aria-labelledby="contact-heading">
          <div className="container final-cta-grid">
            <ScrollReveal variant="fade-up"><div><p className="eyebrow">Your next possibility</p><h2 id="contact-heading">Have an Idea? Let&apos;s Engineer It.</h2></div></ScrollReveal>
            <ScrollReveal variant="fade-up" delay={100} className="final-cta-copy"><p>Bring your challenge, your ambition or your next product idea. Start with a clear brief.</p><button className="button button-inverse" type="button" aria-haspopup="dialog" aria-controls="preview-dialog" onClick={() => openInquiry()}>Start a Project<Icon name="arrow-up-right" /></button><p className="final-preview-note">Local preview only. No inquiry is sent. Approved contact details and delivery are pending.</p></ScrollReveal>
          </div>
        </section>
      </main>
      <SiteFooter />
      <PreviewDialog state={dialogState} onDismiss={() => setDialogState(null)} onPrepareBrief={openInquiry} />
    </>
  );
}

export default Homepage;
