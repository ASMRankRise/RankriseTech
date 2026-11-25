"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  CORE_CAPABILITIES,
  FOUR_PILLARS,
  INDUSTRIES,
  INSIGHT_ARTICLES,
  PROCESS_STAGES,
  PRODUCTS,
  SITE_IDENTITY,
  WHY_RANKRISE,
  type Product,
} from "@/lib/site-content";
import { routeHref } from "@/lib/routes";
import { EngineeringVisual } from "./engineering-visual";
import {
  CapabilitySchematic,
  EditorialSealVisual,
  FinalCtaField,
  ProductMotif,
} from "./section-illustrations";
import { ProcessPathway } from "./process-pathway";
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
import Stats01 from "@/components/originkit/stats-01";

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

function ProductPanel({
  product,
  index,
  isActive,
}: {
  product: Product;
  index: number;
  isActive: boolean;
}) {
  return (
    <SpotlightCard
      as="article"
      className={`product-card product-featured${isActive ? " is-active" : " is-inactive"}`}
      id={`product-${product.id}`}
      aria-labelledby={`product-${product.id}-title`}
      aria-hidden={!isActive ? undefined : undefined}
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
        <Link className="text-link" href={product.href} tabIndex={isActive ? 0 : -1}>
          Explore {product.name}<Icon name="arrow-up-right" />
        </Link>
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

function getCapabilitySpanClass(index: number, total: number): string {
  if (index === total - 1 && total % 2 === 1) {
    return "capability-span-3";
  }
  const pairIndex = Math.floor(index / 2);
  const posInPair = index % 2;
  const isTwoWide = pairIndex % 2 === 0 ? posInPair === 0 : posInPair === 1;
  return isTwoWide ? "capability-span-2" : "capability-span-1";
}

interface HomepageProps {
  heroVariant?: "default" | "global";
}

export function Homepage({ heroVariant = "default" }: HomepageProps) {
  const [dialogState, setDialogState] = useState<DialogState | null>(null);
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const [activeIndustryIndex, setActiveIndustryIndex] = useState(0);
  const productScrollFillRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const productsSectionRef = useRef<HTMLElement>(null);
  const productsTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    const sectionEl = productsSectionRef.current;
    if (!sectionEl || typeof window === "undefined" || typeof window.matchMedia !== "function") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(min-width: 740px) and (min-height: 620px)", () => {
      const st = ScrollTrigger.create({
        trigger: sectionEl,
        start: "top top",
        end: () => `+=${PRODUCTS.length * 520}`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: true,
        invalidateOnRefresh: true,
        refreshPriority: 10,
        onUpdate: (self) => {
          if (productScrollFillRef.current) {
            productScrollFillRef.current.style.width = `${Math.max(25, Math.round(self.progress * 100))}%`;
          }
          const idx = Math.min(
            PRODUCTS.length - 1,
            Math.max(0, Math.floor(self.progress * PRODUCTS.length)),
          );
          setActiveProductIndex((prev) => (prev === idx ? prev : idx));
        },
      });
      productsTriggerRef.current = st;
      ScrollTrigger.refresh();

      return () => {
        productsTriggerRef.current = null;
      };
    });

    return () => {
      productsTriggerRef.current = null;
      mm.revert();
    };
  }, []);

  const selectProduct = (index: number) => {
    setActiveProductIndex(index);
    const st = productsTriggerRef.current;
    if (st && typeof window !== "undefined") {
      const targetProgress = (index + 0.15) / PRODUCTS.length;
      const targetY = st.start + (st.end - st.start) * targetProgress;
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  };
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
        <div className="hero-pin-stage">
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
        </div>

        <div className="homepage-cover-stack">
          {/* SECTION 2: COMPANY INTRODUCTION (ORIGINKIT STATS-01 INTEGRATION) */}
          <div className="section-two-cover">
            <Stats01 />
          </div>

        <section id="capabilities" className="section capabilities-section" data-section="core-capabilities" aria-labelledby="capabilities-heading">
          <div className="container">
            <ScrollReveal variant="fade-up" className="section-heading heading-split">
              <div><p className="eyebrow">Core Capabilities</p><h2 id="capabilities-heading">Engineering around<br className="desktop-break" /> what matters.</h2></div>
              <p>From a focused application to a broader digital change, start with the right problem and a clear direction.</p>
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
                      <div className="capability-icon"><Icon name={capability.icon} width="22" height="22" /></div>
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

        <section id="products" ref={productsSectionRef} className="section products-section" data-section="in-house-products" aria-labelledby="products-heading">
          <div className="container">
            <ScrollReveal variant="fade-up" className="section-heading products-heading heading-split">
              <div>
                <p className="eyebrow">Our in-house products</p>
                <h2 id="products-heading">Innovation That We Build. Products That We Own.</h2>
              </div>
              <p>Four distinct product directions. One engineering mindset. Purpose-built platforms designed to streamline operations, enhance social engagement, and accelerate growth.</p>
            </ScrollReveal>
            <div className="product-switcher-row">
              <div className="product-switcher" role="tablist" aria-label="In-house product selector">
                {PRODUCTS.map((product, index) => {
                  const isActive = index === activeProductIndex;
                  return (
                    <button
                      key={product.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-controls={`product-${product.id}`}
                      className={`product-switcher-tab${isActive ? " is-active" : ""}`}
                      onClick={() => selectProduct(index)}
                      onKeyDown={(event) => {
                        if (event.key === "ArrowRight") {
                          event.preventDefault();
                          selectProduct((index + 1) % PRODUCTS.length);
                        } else if (event.key === "ArrowLeft") {
                          event.preventDefault();
                          selectProduct((index - 1 + PRODUCTS.length) % PRODUCTS.length);
                        }
                      }}
                    >
                      <span className="product-switcher-num" aria-hidden="true">0{index + 1}</span>
                      <span>{product.name}</span>
                    </button>
                  );
                })}
              </div>
              <div className="product-scroll-track" aria-hidden="true">
                <div
                  ref={productScrollFillRef}
                  className="product-scroll-fill"
                  style={{ width: "25%" }}
                />
              </div>
            </div>
            <div className="product-stage">
              {PRODUCTS.map((product, index) => (
                <ProductPanel
                  key={product.id}
                  product={product}
                  index={index}
                  isActive={index === activeProductIndex}
                />
              ))}
            </div>
          </div>
        </section>

        <section id="industries" className="section industries-section" data-section="industries" aria-labelledby="industries-heading">
          <div className="container">
            <ScrollReveal variant="fade-up" className="section-heading heading-split">
              <div><p className="eyebrow">Context comes first</p><h2 id="industries-heading">Industries We Serve</h2></div>
              <p>Specialized domain insights and tailored technology solutions engineered across ten core industry sectors.</p>
            </ScrollReveal>
            <div className="industries-explorer">
              <ul className="industry-list">
                {INDUSTRIES.map((industry, index) => {
                  const isActive = index === activeIndustryIndex;
                  return (
                    <li
                      key={industry.name}
                      className={isActive ? "is-active" : undefined}
                      onMouseEnter={() => setActiveIndustryIndex(index)}
                    >
                      <span className="industry-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                      <Link
                        href={industry.href}
                        onFocus={() => setActiveIndustryIndex(index)}
                      >
                        <h3>{industry.name}</h3>
                        <p>{industry.theme}</p>
                      </Link>
                      <Icon name="arrow-up-right" width="18" height="18" />
                    </li>
                  );
                })}
              </ul>
              <aside className="industry-context-card" aria-label="Selected industry context">
                {(() => {
                  const activeIndustry = INDUSTRIES[activeIndustryIndex] ?? INDUSTRIES[0];
                  return (
                    <>
                      <div className="industry-context-top">
                        <span className="eyebrow">
                          {String(activeIndustryIndex + 1).padStart(2, "0")} / Sector Brief
                        </span>
                        <span className="industry-context-tag" aria-hidden="true">Hover any sector</span>
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
                        <button
                          type="button"
                          className="button button-primary"
                          aria-haspopup="dialog"
                          aria-controls="preview-dialog"
                          onClick={() => openInquiry(`${activeIndustry.name} software solution`)}
                        >
                          Discuss {activeIndustry.name}
                          <Icon name="arrow-up-right" width="16" height="16" />
                        </button>
                      </div>
                    </>
                  );
                })()}
              </aside>
            </div>
          </div>
        </section>

        <section id="process" className="section process-section" data-section="development-process" aria-labelledby="process-heading">
          <ProcessPathway />
        </section>

        <section id="portfolio" className="section portfolio-section" data-section="portfolio" aria-labelledby="portfolio-heading">
          <div className="container">
            <ScrollReveal variant="fade-up" className="section-heading heading-split">
              <div><p className="eyebrow">Portfolio &amp; Case Studies</p><h2 id="portfolio-heading">Selected Technology Projects</h2></div>
              <p>We are preparing approved case studies for publication. We will not publish fabricated project results, client logos or metrics.</p>
            </ScrollReveal>
            <ScrollReveal variant="fade-up" delay={100} className="evidence-state">
              <span className="media-corner media-corner-top" aria-hidden="true" />
              <span className="media-corner media-corner-bottom" aria-hidden="true" />
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
        </div>
      </main>
      <SiteFooter />
      <PreviewDialog state={dialogState} onDismiss={() => setDialogState(null)} onPrepareBrief={openInquiry} />
      <AccentThemeDock />
    </>
  );
}

export default Homepage;
