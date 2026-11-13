"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import {
  AI_EXPLORATIONS,
  CORE_CAPABILITIES,
  FOUR_PILLARS,
  INDUSTRIES,
  INSIGHT_ARTICLES,
  PROCESS_STAGES,
  PRODUCTS,
  PUBLISHED_TECH_STACK,
  SITE_IDENTITY,
  STACK_CATEGORIES,
  WEBSITE_STACK,
  WHY_RANKRISE,
  type Product,
} from "@/lib/site-content";
import { routeHref } from "@/lib/routes";
import { EngineeringVisual, IntelligenceVisual } from "./engineering-visual";
import {
  CapabilitySchematic,
  EditorialSealVisual,
  FinalCtaField,
  ProcessConduitLine,
  ProductMotif,
  StackBlueprintVisual,
} from "./section-illustrations";
import { Icon } from "./icon";
import { PreviewDialog, type DialogState } from "./preview-dialog";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { ScrollReveal } from "./motion/scroll-reveal";
import { SpotlightCard } from "./motion/spotlight-card";
import { InitialPageLoader } from "./motion/page-loader";
import { HeroAnimation } from "./motion/hero-animation";
import { GlobalHero } from "./global-hero";
import { AccentThemeDock } from "./accent-theme-dock";

const COMPANY_PILLARS = [
  {
    icon: "code",
    title: "Dual-Engine Strategy",
    description:
      "We build tailored solutions for client challenges while concurrently investing in proprietary software products.",
  },
  {
    icon: "layers",
    title: "Architectural Discipline",
    description:
      "Engineered for maintainability, high performance, strict type safety, and clean interface boundaries.",
  },
  {
    icon: "brain",
    title: "Pragmatic Intelligence",
    description:
      "Applying machine learning and generative AI where they drive measurable automation and clear business value.",
  },
] as const;

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
        <h3 id={`product-${product.id}-title`}>{product.name}</h3>
        <p className="product-headline">{product.headline}</p>
        <p className="product-description">{product.positioning} {product.value}</p>
        <p className="product-endorsement">{SITE_IDENTITY.productEndorsement}</p>
        <Link className="text-link" href={product.href}>Explore {product.name}<Icon name="arrow-up-right" /></Link>
      </div>
      <figure className="product-media">
        <ProductMotif id={product.id} />
        <figcaption>
          <span>{product.name} Architecture</span>
          <small>{product.category} Platform</small>
        </figcaption>
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
                  <p className="hero-preview-note">Building Intelligence <span aria-hidden="true">·</span> Driving Growth</p>
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
              <Link className="text-link" href={routeHref("/about")}>About RankRise<Icon name="arrow-right" /></Link>
            </ScrollReveal>
          </div>
          <div className="container">
            <div className="company-pillars-ledger">
              {COMPANY_PILLARS.map((pillar, index) => (
                <div key={pillar.title} className="company-pillar-item">
                  <ScrollReveal variant="fade-up" delay={index * 60}>
                    <div className="pillar-item-icon" aria-hidden="true">
                      <Icon name={pillar.icon} width="18" height="18" />
                    </div>
                    <h3>{pillar.title}</h3>
                    <p>{pillar.description}</p>
                  </ScrollReveal>
                </div>
              ))}
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
                    <div className="capability-card-top">
                      <div className="capability-icon"><Icon name={capability.icon} width="22" height="22" /></div>
                      <div className="capability-schematic-slot" aria-hidden="true">
                        <CapabilitySchematic id={capability.id} />
                      </div>
                    </div>
                    <h3>{capability.name}</h3>
                    <p>{capability.description}</p>
                    <Link className="text-link" href={capability.href} aria-label={`Explore ${capability.name}`}>Explore capability<Icon name="arrow-up-right" width="18" height="18" /></Link>
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
              <p>Four distinct product directions. One engineering mindset. Purpose-built platforms designed to streamline operations, enhance social engagement, and accelerate growth.</p>
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
              <p className="small-note ai-scope-note">Practical AI integration tailored to your existing data pipelines, operational workflows, and security guardrails.</p>
              <Link className="text-link" href={routeHref("/services/ai-solutions-automation")}>Explore AI &amp; Emerging Technologies<Icon name="arrow-right" /></Link>
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
              <p>Specialized domain insights and tailored technology solutions engineered across ten core industry sectors.</p>
            </ScrollReveal>
            <ul className="industry-list">
              {INDUSTRIES.map((industry, index) => (
                <li key={industry.name}>
                  <span className="industry-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <Link href={industry.href}><h3>{industry.name}</h3><p>{industry.theme}</p></Link>
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
              <div className="website-stack">
                <h3>This website&apos;s stack</h3>
                <ul>{WEBSITE_STACK.map((technology) => <li key={technology}>{technology}</li>)}</ul>
                <p>Engineered with Next.js App Router, React, TypeScript, and modern styling.</p>
              </div>
              <div className="published-stack-wrap">
                <h3>Core Production Technologies</h3>
                <ul className="published-stack-list">
                  {PUBLISHED_TECH_STACK.map((technology) => (
                    <li key={technology} className="published-stack-item">{technology}</li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
            <ScrollReveal variant="fade-up" delay={100} className="technology-taxonomy">
              <p className="technology-status"><span className="status-dot" aria-hidden="true" />Engineering categories &amp; production capabilities</p>
              <div className="stack-blueprint-frame" aria-hidden="true">
                <StackBlueprintVisual />
              </div>
              <ul className="stack-category-list">{STACK_CATEGORIES.map((category) => <li key={category.name}><h3>{category.name}</h3><p>{category.context}</p></li>)}</ul>
            </ScrollReveal>
          </div>
        </section>

        <section id="process" className="section process-section" data-section="development-process" aria-labelledby="process-heading">
          <div className="container">
            <ScrollReveal variant="fade-up" className="section-heading heading-split">
              <div><p className="eyebrow">Development Process</p><h2 id="process-heading">A clear path from<br className="desktop-break" /> possibility to progress.</h2></div>
              <p>A considered working approach, with shared understanding and useful decisions at every stage.</p>
            </ScrollReveal>
            <div className="process-conduit-wrap" aria-hidden="true">
              <ProcessConduitLine />
            </div>
            <ol className="process-list">
              {PROCESS_STAGES.map((stage, index) => (
                <li key={stage.name}>
                  <span className="process-number" aria-hidden="true">0{index + 1}</span>
                  <h3>{stage.name}</h3>
                  <p>{stage.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="portfolio" className="section portfolio-section" data-section="portfolio" aria-labelledby="portfolio-heading">
          <div className="container">
            <ScrollReveal variant="fade-up" className="section-heading heading-split">
              <div><p className="eyebrow">Portfolio &amp; Case Studies</p><h2 id="portfolio-heading">Selected Technology Projects</h2></div>
              <p>We are preparing approved case studies for publication. We will not publish fabricated project results, client logos or metrics.</p>
            </ScrollReveal>
            <ScrollReveal variant="fade-up" delay={100} className="evidence-state">
              <div className="evidence-marker" aria-hidden="true"><EditorialSealVisual variant="evidence" /></div>
              <div className="evidence-copy">
                <h3>Authentic Delivery Over Manufactured Proof</h3>
                <p>Every case study represents genuine technical challenges, specific solution architectures, and validated business impact.</p>
                <p className="small-note">Explore our portfolio overview or speak directly with our engineering team to discuss relevant domain experience.</p>
              </div>
              <div className="portfolio-actions">
                <Link className="button button-secondary" href={routeHref("/portfolio")}>View Portfolio Overview<Icon name="arrow-right" /></Link>
                <button className="button button-primary" type="button" aria-haspopup="dialog" aria-controls="preview-dialog" onClick={() => openInquiry("A business challenge to explore")}>Discuss your challenge<Icon name="arrow-up-right" /></button>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section id="why-rankrise" className="section why-section" data-section="why-rankrise" aria-labelledby="why-heading">
          <div className="container why-grid">
            <ScrollReveal variant="fade-up" className="why-intro">
              <p className="eyebrow">Our working philosophy</p>
              <h2 id="why-heading">Why RankRise</h2>
              <p className="lead-copy">A considered approach.<br />A shared ambition.</p>
              <p>These core principles define every engagement: clear communication, architectural rigor, and technology engineered to create tangible business momentum.</p>
            </ScrollReveal>
            <ul className="principle-list">{WHY_RANKRISE.map((principle, index) => <li key={principle.title}><span aria-hidden="true">0{index + 1}</span><h3>{principle.title}</h3><p>{principle.description}</p></li>)}</ul>
          </div>
        </section>

        <section id="insights" className="section insights-section" data-section="insights" aria-labelledby="insights-heading">
          <div className="container">
            <ScrollReveal variant="fade-up" className="section-heading heading-split">
              <div>
                <p className="eyebrow">Insights</p>
                <h2 id="insights-heading">Ideas worth sharing.</h2>
              </div>
              <div className="insights-header-lead">
                <p>Thoughtful perspectives on software engineering, pragmatic AI architecture, and digital transformation.</p>
                <Link className="text-link" href={routeHref("/insights")}>Explore all insights<Icon name="arrow-right" /></Link>
              </div>
            </ScrollReveal>
            <div className="insights-cards-grid">
              {INSIGHT_ARTICLES.slice(0, 3).map((article, index) => (
                <ScrollReveal key={article.slug} variant="fade-up" delay={index * 80}>
                  <SpotlightCard as="article" className="insight-card">
                    <div className="insight-card-top">
                      <span className="eyebrow">Perspective</span>
                      <span className="insight-number" aria-hidden="true">0{index + 1}</span>
                    </div>
                    <h3><Link href={article.href}>{article.title}</Link></h3>
                    <p>{article.intro}</p>
                    <Link className="text-link" href={article.href}>
                      Read article<Icon name="arrow-up-right" />
                    </Link>
                  </SpotlightCard>
                </ScrollReveal>
              ))}
            </div>
            <div className="insights-seal-row" aria-hidden="true">
              <EditorialSealVisual variant="insights" />
            </div>
          </div>
        </section>

        <section id="contact" className="section final-cta-section" data-section="final-cta" aria-labelledby="contact-heading">
          <div className="final-cta-backdrop" aria-hidden="true">
            <FinalCtaField />
          </div>
          <div className="container final-cta-grid">
            <ScrollReveal variant="fade-up">
              <div>
                <p className="eyebrow">Your next possibility</p>
                <h2 id="contact-heading">Have an Idea? Let&apos;s Engineer It.</h2>
              </div>
            </ScrollReveal>
            <ScrollReveal variant="fade-up" delay={100} className="final-cta-copy">
              <p>Bring your challenge, your ambition or your next product idea. Start with a clear brief or reach out to our team directly.</p>
              <div className="final-cta-actions">
                <button className="button button-inverse" type="button" aria-haspopup="dialog" aria-controls="preview-dialog" onClick={() => openInquiry()}>Start a Project<Icon name="arrow-up-right" /></button>
                <Link className="button button-secondary" href={routeHref("/contact")}>Contact Page<Icon name="arrow-right" /></Link>
              </div>
              <div className="final-contact-direct" aria-label="Direct contact details">
                <a href={`tel:${SITE_IDENTITY.phoneHref}`} className="final-contact-link">
                  <Icon name="phone" width="15" height="15" />
                  <span>{SITE_IDENTITY.phone}</span>
                </a>
                <span className="final-contact-sep" aria-hidden="true">·</span>
                <a href={`mailto:${SITE_IDENTITY.email}`} className="final-contact-link">
                  <span className="email-symbol" aria-hidden="true">✉</span>
                  <span>{SITE_IDENTITY.email}</span>
                </a>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <SiteFooter />
      <PreviewDialog state={dialogState} onDismiss={() => setDialogState(null)} onPrepareBrief={openInquiry} />
      <AccentThemeDock />
    </>
  );
}

export default Homepage;
