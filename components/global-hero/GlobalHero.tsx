"use client";

import { useState, useRef, useEffect } from "react";
import { Globe } from "./Globe";
import { LeftHand, RightHand } from "./Hands";
import { Icon } from "@/components/icon";
import styles from "./global-hero.module.css";
import { SITE_IDENTITY } from "@/lib/site-content";
import { routeHref } from "@/lib/routes";

/**
 * Global Hero — static alternative hero composition
 *
 * Visual departure from the default hero: white/RankRise-blue theme with
 * actual photographic hands extracted from reference asset heroreference.png
 * (OpenCV GrabCut + alpha matting, recolored to RankRise blue rim lighting),
 * cradling a 3D wireframe network globe, glassmorphic navigation, and honest
 * "Book a Demo" CTA that opens the existing inquiry dialog.
 *
 * Source-doc headline/subheadline adapted from report §3.2 and §5.
 * RankRise branding throughout.
 *
 * Accessible, responsive, reduced-motion aware. Static phase (no animation).
 */
export function GlobalHero({
  onOpenInquiry,
}: {
  onOpenInquiry: (context?: string) => void;
}) {
  const heroRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Glassmorphic header scroll state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Split H1 into two semantic lines for styling
  const headlineLines = [
    "Building Intelligent Software",
    <span key="highlight" className={styles.headlineHighlight}>
      for a Smarter Digital World.
    </span>,
  ];

  return (
    <>
      {/* Glassmorphic Navigation — sticky, accessible */}
      <header
        className={`${styles.globalHeader} ${isScrolled ? styles.scrolled : ""}`}
        role="banner"
      >
        <div className={styles.headerInner}>
          {/* RankRise Wordmark */}
          <a
            href={routeHref("/")}
            className={styles.wordmark}
            aria-label="RankRise Technologies — Home"
          >
            <span className={styles.wordmarkName}>RankRise</span>
            <span className={styles.wordmarkDescriptor}>Technologies</span>
          </a>

          {/* Desktop Navigation */}
          <nav className={styles.primaryNav} aria-label="Primary navigation">
            <ul className={styles.navList}>
              <li>
                <a href={routeHref("/")} className={styles.navLink}>
                  Home
                </a>
              </li>
              <li>
                <a href={routeHref("/about-us/")} className={styles.navLink}>
                  About
                </a>
              </li>
              <li>
                <a href={routeHref("/services/")} className={styles.navLink}>
                  Services
                </a>
              </li>
              <li>
                <a href={routeHref("/solutions/")} className={styles.navLink}>
                  Solutions
                </a>
              </li>
              <li>
                <a href={routeHref("/products/")} className={styles.navLink}>
                  Products
                </a>
              </li>
              <li>
                <a href={routeHref("/technologies/")} className={styles.navLink}>
                  Technologies
                </a>
              </li>
              <li>
                <a href={routeHref("/industries/")} className={styles.navLink}>
                  Industries
                </a>
              </li>
              <li>
                <a href={routeHref("/insights/")} className={styles.navLink}>
                  Insights
                </a>
              </li>
            </ul>
          </nav>

          {/* Header CTA — "Book a Demo" opens honest inquiry dialog */}
          <button
            type="button"
            className={styles.headerCta}
            onClick={() => onOpenInquiry("Book a Demo — Global Hero")}
            aria-haspopup="dialog"
            aria-controls="preview-dialog"
          >
            Book a Demo
            <Icon name="arrow-up-right" width="16" height="16" aria-hidden="true" />
          </button>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className={styles.mobileToggle}
            aria-expanded="false"
            aria-controls="mobile-menu"
            aria-label="Open navigation menu"
          >
            <Icon name="menu" width="22" height="22" aria-hidden="true" />
          </button>
        </div>

        {/* Mobile navigation panel */}
        <div
          id="mobile-menu"
          className={styles.mobileNav}
          role="navigation"
          aria-label="Mobile navigation"
        >
          <ul className={styles.mobileNavList}>
            <li>
              <a href={routeHref("/")} className={styles.mobileNavLink}>
                Home
              </a>
            </li>
            <li>
              <a href={routeHref("/about-us/")} className={styles.mobileNavLink}>
                About
              </a>
            </li>
            <li>
              <a href={routeHref("/services/")} className={styles.mobileNavLink}>
                Services
              </a>
            </li>
            <li>
              <a href={routeHref("/solutions/")} className={styles.mobileNavLink}>
                Solutions
              </a>
            </li>
            <li>
              <a href={routeHref("/products/")} className={styles.mobileNavLink}>
                Products
              </a>
            </li>
            <li>
              <a href={routeHref("/technologies/")} className={styles.mobileNavLink}>
                Technologies
              </a>
            </li>
            <li>
              <a href={routeHref("/industries/")} className={styles.mobileNavLink}>
                Industries
              </a>
            </li>
            <li>
              <a href={routeHref("/insights/")} className={styles.mobileNavLink}>
                Insights
              </a>
            </li>
            <li>
              <button
                type="button"
                className={styles.mobileCta}
                onClick={() => onOpenInquiry("Book a Demo — Mobile Nav")}
                aria-haspopup="dialog"
                aria-controls="preview-dialog"
              >
                Book a Demo
                <Icon name="arrow-up-right" width="16" height="16" aria-hidden="true" />
              </button>
            </li>
          </ul>
        </div>
      </header>

      {/* Hero Section */}
      <section
        ref={heroRef}
        id="home"
        className={styles.heroSection}
        data-section="hero"
        aria-labelledby="hero-heading"
      >
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            {/* Left: Copy */}
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>
                <span className={styles.eyebrowDot} aria-hidden="true" />
                Engineering a connected future
              </p>

              <h1 id="hero-heading" className={styles.headline}>
                {headlineLines.map((line, i) => (
                  <span key={i} className={styles.headlineLine} style={{ display: "block" }}>
                    {line}
                  </span>
                ))}
              </h1>

              <p className={styles.description}>
                {SITE_IDENTITY.heroDescription}
              </p>

              <div className={styles.heroActions}>
                <a
                  className={`${styles.button} ${styles.buttonPrimary}`}
                  href="#capabilities"
                >
                  Explore Our Capabilities
                  <Icon name="arrow-right" width="18" height="18" aria-hidden="true" />
                </a>
                <button
                  type="button"
                  className={`${styles.button} ${styles.buttonSecondary}`}
                  onClick={() => onOpenInquiry()}
                  aria-haspopup="dialog"
                  aria-controls="preview-dialog"
                >
                  Discuss Your Project
                  <Icon name="arrow-up-right" width="18" height="18" aria-hidden="true" />
                </button>
              </div>

              <p className={styles.previewNote}>
                Global Hero variant · White/Blue theme · Local preview (?hero=global)
              </p>
            </div>

            {/* Right: Visual — Photographic Hands + Wireframe Globe */}
            <div className={styles.heroVisualWrapper} aria-hidden="true">
              <div className={styles.handsGlobeContainer}>
                {/* Lower-left photographic hand cupping the globe */}
                <div className={`${styles.handWrapper} ${styles.leftHandWrapper}`}>
                  <LeftHand size={280} />
                </div>

                {/* Wireframe network globe centered between hands */}
                <div className={styles.globeWrapper}>
                  <Globe size={360} />
                </div>

                {/* Upper-right photographic hand reaching toward the globe */}
                <div className={`${styles.handWrapper} ${styles.rightHandWrapper}`}>
                  <RightHand size={330} />
                </div>

              </div>
            </div>
          </div>

          {/* Pillar strip — four brand pillars */}
          <ul className={styles.pillarStrip} aria-label="Our four pillars">
            {[
              "Software Engineering",
              "AI & Innovation",
              "In-house Products",
              "Digital Transformation",
            ].map((pillar, index) => (
              <li key={pillar}>
                <span aria-hidden="true">0{index + 1}</span>
                {pillar}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

export default GlobalHero;
