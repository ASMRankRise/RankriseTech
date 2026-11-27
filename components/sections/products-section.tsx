"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PRODUCTS, type Product } from "@/lib/data/products";
import { SITE_IDENTITY } from "@/lib/data/site";
import { HOMEPAGE_SECTIONS_COPY } from "@/lib/data/homepage";
import { Icon } from "@/components/ui/icon";
import { ProductMotif } from "@/components/ui/section-illustrations";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { SpotlightCard } from "@/components/motion/spotlight-card";

export function ProductCard({
  product,
  index,
  isActive = true,
  variant = "featured",
}: {
  product: Product;
  index: number;
  isActive?: boolean;
  variant?: "featured" | "inner";
}) {
  const isInner = variant === "inner";
  const ctaHref = isInner && product.href.startsWith("/products#") ? "/contact" : product.href;
  const ctaLabel =
    isInner && product.href.startsWith("/products#")
      ? `Request ${product.name} Demo`
      : `Explore ${product.name}`;

  return (
    <SpotlightCard
      as="article"
      className={
        isInner
          ? "product-card inner-product-card"
          : `product-card product-featured${isActive ? " is-active" : " is-inactive"}`
      }
      id={isInner ? undefined : `product-${product.id}`}
      aria-labelledby={isInner ? undefined : `product-${product.id}-title`}
      aria-hidden={isInner ? undefined : !isActive ? undefined : undefined}
    >
      <div className="product-content">
        <div className="product-topline">
          <span className="eyebrow">{product.category}</span>
          <span className="product-number" aria-hidden="true">
            0{index + 1}
          </span>
        </div>
        <h3 id={isInner ? undefined : `product-${product.id}-title`}>{product.name}</h3>
        <p className="product-headline">{product.headline}</p>
        <p className="product-description">
          {product.positioning} {product.value}
        </p>
        {!isInner && <p className="product-endorsement">{SITE_IDENTITY.productEndorsement}</p>}
        <Link className="text-link" href={ctaHref} tabIndex={isActive ? 0 : -1}>
          {ctaLabel}
          <Icon name="arrow-up-right" width={isInner ? 16 : 20} height={isInner ? 16 : 20} />
        </Link>
      </div>
      {isInner ? (
        <div className="product-media inner-product-specimen">
          <ProductMotif id={product.id} />
        </div>
      ) : (
        <figure className="product-media">
          <ProductMotif id={product.id} />
          <figcaption>
            <span>{product.name} Architecture</span>
            <small>{product.category} Platform</small>
          </figcaption>
        </figure>
      )}
    </SpotlightCard>
  );
}

export function ProductsSection() {
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const productScrollFillRef = useRef<HTMLDivElement>(null);
  const productsSectionRef = useRef<HTMLElement>(null);
  const productsTriggerRef = useRef<ScrollTrigger | null>(null);
  const copy = HOMEPAGE_SECTIONS_COPY.products;

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

  return (
    <section
      id="products"
      ref={productsSectionRef}
      className="section products-section"
      data-section="in-house-products"
      aria-labelledby="products-heading"
    >
      <div className="container">
        <ScrollReveal variant="fade-up" className="section-heading products-heading heading-split">
          <div>
            <p className="eyebrow">{copy.eyebrow}</p>
            <h2 id="products-heading">{copy.heading}</h2>
          </div>
          <p>{copy.lead}</p>
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
                  <span className="product-switcher-num" aria-hidden="true">
                    0{index + 1}
                  </span>
                  <span>{product.name}</span>
                </button>
              );
            })}
          </div>
          <div className="product-scroll-track" aria-hidden="true">
            <div ref={productScrollFillRef} className="product-scroll-fill" style={{ width: "25%" }} />
          </div>
        </div>
        <div className="product-stage">
          {PRODUCTS.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              isActive={index === activeProductIndex}
              variant="featured"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
