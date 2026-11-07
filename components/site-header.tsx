"use client";

import { useEffect, useRef, useState } from "react";
import { NAVIGATION_ITEMS, PRODUCTS } from "@/lib/site-content";
import { routeHref } from "@/lib/routes";
import { Icon } from "./icon";
import { Wordmark } from "./site-navigation";
import { ScrollProgressBar } from "./motion/scroll-progress";

/**
 * Shared floating glass header used by every local route.
 *
 * Visual reference: the hero design (centred translucent navigation pill,
 * wordmark at the left, single demo CTA at the right). It is deliberately
 * independent of the hero so it can be reused by the homepage and every
 * construction route without duplicating markup.
 *
 * `overHero` switches the header into the fixed, transparent treatment used
 * above the full-viewport hero. On all other pages it stays in the document
 * flow as a sticky light bar.
 */
export function SiteHeader({
  overHero = false,
  activePath = "/",
}: {
  overHero?: boolean;
  activePath?: string;
}) {
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
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
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

  function isActive(href: string) {
    if (href === "/") return activePath === "/";
    return activePath === href || activePath.startsWith(href);
  }

  return (
    <>
      <ScrollProgressBar />
      <header
        ref={headerRef}
        className={`site-header${overHero ? " is-over-hero" : ""}${isScrolled ? " is-scrolled" : ""}`}
        data-section="header"
        aria-label="Site header"
      >
        <div className="header-inner">
          <Wordmark />

          <nav
            id="primary-navigation"
            className={`primary-navigation${mobileOpen ? " is-open" : ""}`}
            aria-label="Main navigation"
          >
            <ul className="navigation-list">
              {NAVIGATION_ITEMS.map((item) => (
                <li
                  key={item.label}
                  className={item.label === "Products" ? "products-navigation" : undefined}
                >
                  {item.label === "Products" ? (
                    <>
                      <button
                        className={`navigation-link products-toggle${isActive(item.href) ? " is-active" : ""}`}
                        type="button"
                        ref={productsToggleRef}
                        aria-expanded={productsOpen}
                        aria-controls="products-dropdown"
                        onClick={() => setProductsOpen(!productsOpen)}
                      >
                        Products
                        <Icon name="chevron-down" width="13" height="13" />
                      </button>
                      <div
                        className="products-dropdown"
                        id="products-dropdown"
                        hidden={!productsOpen}
                      >
                        <a className="dropdown-overview" href={item.href} onClick={closeMenus}>
                          Our in-house products
                          <Icon name="arrow-right" width="15" height="15" />
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
                    <a
                      className={`navigation-link${isActive(item.href) ? " is-active" : ""}`}
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      onClick={closeMenus}
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>

            <a
              className="header-cta"
              href={routeHref("/contact/")}
              onClick={closeMenus}
            >
              Let&apos;s Talk Business
              <Icon name="arrow-up-right" width="14" height="14" />
            </a>
          </nav>

          <div className="header-actions">
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
              <Icon name={mobileOpen ? "close" : "menu"} width="20" height="20" />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

export default SiteHeader;
