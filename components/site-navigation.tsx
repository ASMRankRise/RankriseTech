"use client";

import { useEffect, useRef, useState } from "react";
import { NAVIGATION_ITEMS, PRODUCTS } from "@/lib/site-content";
import { routeHref } from "@/lib/routes";
import { Icon } from "./icon";
import { ScrollProgressBar } from "./motion/scroll-progress";

export function Wordmark() {
  return (
    <a className="wordmark" href={routeHref("/")} aria-label="RankRise Technologies home">
      <span className="wordmark-name">RankRise</span>
      <span className="wordmark-descriptor">Technologies</span>
    </a>
  );
}

export function SiteNavigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);
  const productsToggleRef = useRef<HTMLButtonElement>(null);

  function closeMenus() {
    setMobileOpen(false);
    setProductsOpen(false);
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen && !productsOpen) return;

    function handlePointerDown(event: PointerEvent) {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) {
        setMobileOpen(false);
        setProductsOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      if (productsOpen) {
        setProductsOpen(false);
        productsToggleRef.current?.focus();
      } else {
        setMobileOpen(false);
        mobileToggleRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [mobileOpen, productsOpen]);

  return (
    <>
      <ScrollProgressBar />
      <header
        className={`site-header${isScrolled ? " is-scrolled" : ""}`}
        data-section="header"
        aria-label="Site header"
        ref={headerRef}
      >
        <div className="container header-inner">
          <Wordmark />
          <button
            className="mobile-toggle"
            type="button"
            ref={mobileToggleRef}
            aria-expanded={mobileOpen}
            aria-controls="primary-navigation"
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            onClick={() => {
              setMobileOpen(!mobileOpen);
              setProductsOpen(false);
            }}
          >
            <span>Menu</span>
            <Icon name={mobileOpen ? "close" : "menu"} />
          </button>
          <nav
            id="primary-navigation"
            className={`primary-navigation${mobileOpen ? " is-open" : ""}`}
            aria-label="Main navigation"
          >
            <ul className="navigation-list">
              {NAVIGATION_ITEMS.map((item) => (
                <li key={item.label} className={item.label === "Products" ? "products-navigation" : undefined}>
                  {item.label === "Products" ? (
                    <>
                      <button
                        className="navigation-link products-toggle"
                        type="button"
                        ref={productsToggleRef}
                        aria-expanded={productsOpen}
                        aria-controls="products-dropdown"
                        onClick={() => setProductsOpen(!productsOpen)}
                      >
                        Products<Icon name="chevron-down" width="14" height="14" />
                      </button>
                      <div className="products-dropdown" id="products-dropdown" hidden={!productsOpen}>
                        <a className="dropdown-overview" href={item.href} onClick={closeMenus}>
                          Our in-house products<Icon name="arrow-right" />
                        </a>
                        <ul>
                          {PRODUCTS.map((product) => (
                            <li key={product.id}>
                              <a href={product.href} onClick={closeMenus}>
                                <span>{product.name}</span>
                                <small>{product.category}</small>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  ) : (
                    <a className="navigation-link" href={item.href} onClick={closeMenus}>
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
            <a
              className="button button-primary button-small header-cta"
              href={routeHref("/contact/")}
              onClick={closeMenus}
            >
              Let&apos;s Talk Business<Icon name="arrow-up-right" width="16" height="16" />
            </a>
          </nav>
        </div>
      </header>
    </>
  );
}
