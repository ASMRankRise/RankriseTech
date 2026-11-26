"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { NAVIGATION_ITEMS, PRODUCTS } from "@/lib/site-content";
import { routeHref } from "@/lib/routes";
import { Icon } from "./icon";
import { Wordmark } from "./site-navigation";
import { ScrollProgressBar } from "./motion/scroll-progress";
import { LabelSlideButton } from "./label-slide-button";
import { LiquidNavbar, NimbusIcons, type LiquidNavItem, type NimbusFx } from "@/components/ui/liquid-glass-navbar";

const HEADER_CTA_COLORS: Record<
  string,
  {
    light: {
      fill: string;
      textColor: string;
      hoverFill: string;
      hoverTextColor: string;
      iconBg: string;
      iconColor: string;
      iconHoverBg: string;
      iconHoverColor: string;
    };
    dark: {
      fill: string;
      textColor: string;
      hoverFill: string;
      hoverTextColor: string;
      iconBg: string;
      iconColor: string;
      iconHoverBg: string;
      iconHoverColor: string;
    };
  }
> = {
  vermilion: {
    light: {
      fill: "#FF4F1F",
      textColor: "#FFFFFF",
      hoverFill: "#102B50",
      hoverTextColor: "#FFFFFF",
      iconBg: "#CC3307",
      iconColor: "#FFFFFF",
      iconHoverBg: "#FF4F1F",
      iconHoverColor: "#FFFFFF",
    },
    dark: {
      fill: "#FF5A2B",
      textColor: "#FFFFFF",
      hoverFill: "#FFFFFF",
      hoverTextColor: "#102B50",
      iconBg: "#C43810",
      iconColor: "#FFFFFF",
      iconHoverBg: "#FF4F1F",
      iconHoverColor: "#FFFFFF",
    },
  },
  volt: {
    light: {
      fill: "#C8FF00",
      textColor: "#1A2E05",
      hoverFill: "#102B50",
      hoverTextColor: "#C8FF00",
      iconBg: "#A3D900",
      iconColor: "#1A2E05",
      iconHoverBg: "#C8FF00",
      iconHoverColor: "#102B50",
    },
    dark: {
      fill: "#C8FF00",
      textColor: "#0E1A00",
      hoverFill: "#FFFFFF",
      hoverTextColor: "#0E1A00",
      iconBg: "#99CC00",
      iconColor: "#0E1A00",
      iconHoverBg: "#C8FF00",
      iconHoverColor: "#0E1A00",
    },
  },
  amber: {
    light: {
      fill: "#FFB800",
      textColor: "#261A00",
      hoverFill: "#102B50",
      hoverTextColor: "#FFFFFF",
      iconBg: "#D49500",
      iconColor: "#FFFFFF",
      iconHoverBg: "#FFB800",
      iconHoverColor: "#102B50",
    },
    dark: {
      fill: "#FFB800",
      textColor: "#1F1400",
      hoverFill: "#FFFFFF",
      hoverTextColor: "#1F1400",
      iconBg: "#CC8800",
      iconColor: "#FFFFFF",
      iconHoverBg: "#FFB800",
      iconHoverColor: "#FFFFFF",
    },
  },
  crimson: {
    light: {
      fill: "#E11D48",
      textColor: "#FFFFFF",
      hoverFill: "#102B50",
      hoverTextColor: "#FFFFFF",
      iconBg: "#9F1239",
      iconColor: "#FFFFFF",
      iconHoverBg: "#E11D48",
      iconHoverColor: "#FFFFFF",
    },
    dark: {
      fill: "#F43F5E",
      textColor: "#FFFFFF",
      hoverFill: "#FFFFFF",
      hoverTextColor: "#881337",
      iconBg: "#BE123C",
      iconColor: "#FFFFFF",
      iconHoverBg: "#F43F5E",
      iconHoverColor: "#FFFFFF",
    },
  },
  emerald: {
    light: {
      fill: "#00E599",
      textColor: "#013320",
      hoverFill: "#102B50",
      hoverTextColor: "#00E599",
      iconBg: "#00B377",
      iconColor: "#013320",
      iconHoverBg: "#00E599",
      iconHoverColor: "#102B50",
    },
    dark: {
      fill: "#00E599",
      textColor: "#002919",
      hoverFill: "#FFFFFF",
      hoverTextColor: "#002919",
      iconBg: "#00A36C",
      iconColor: "#002919",
      iconHoverBg: "#00E599",
      iconHoverColor: "#002919",
    },
  },
  blue: {
    light: {
      fill: "#1768D5",
      textColor: "#FFFFFF",
      hoverFill: "#102B50",
      hoverTextColor: "#FFFFFF",
      iconBg: "#0F4FA8",
      iconColor: "#FFFFFF",
      iconHoverBg: "#1768D5",
      iconHoverColor: "#FFFFFF",
    },
    dark: {
      fill: "#3B82F6",
      textColor: "#FFFFFF",
      hoverFill: "#FFFFFF",
      hoverTextColor: "#102B50",
      iconBg: "#1D4ED8",
      iconColor: "#FFFFFF",
      iconHoverBg: "#3B82F6",
      iconHoverColor: "#FFFFFF",
    },
  },
};

const CTA_ARROW_ICON = (
  <svg
    width={14}
    height={14}
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="4" y1="12" x2="12" y2="4" />
    <polyline points="6 4 12 4 12 10" />
  </svg>
);

const navIcon = (d: React.ReactNode) => (
  <svg
    viewBox="0 0 24 24"
    width="15"
    height="15"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {d}
  </svg>
);

const NAV_ICON_MAP: Record<string, { icon: React.ReactNode; fx: NimbusFx }> = {
  Home: { icon: NimbusIcons.home, fx: "glow" },
  About: {
    icon: navIcon(
      <>
        <circle cx="12" cy="8.5" r="3.5" />
        <path d="M5 19.5c1.3-3.2 3.8-4.7 7-4.7s5.7 1.5 7 4.7" />
      </>
    ),
    fx: "wave",
  },
  Services: {
    icon: navIcon(
      <>
        <rect x="3.5" y="4" width="7" height="7" rx="1.5" />
        <rect x="13.5" y="4" width="7" height="7" rx="1.5" />
        <rect x="3.5" y="13" width="7" height="7" rx="1.5" />
        <path d="M13.5 16.5h7M17 13v7" />
      </>
    ),
    fx: "pop",
  },
  Industries: {
    icon: navIcon(
      <>
        <path d="M4 20h16" />
        <path d="M6 20V9l6-4 6 4v11" />
        <path d="M10 20v-5h4v5" />
      </>
    ),
    fx: "pop",
  },
  Products: {
    icon: navIcon(
      <>
        <path d="M12 3.5 4.5 7.7v8.6L12 20.5l7.5-4.2V7.7L12 3.5Z" />
        <path d="M4.5 7.7 12 12l7.5-4.3M12 12v8.5" />
      </>
    ),
    fx: "drop",
  },
  Insights: {
    icon: navIcon(
      <>
        <path d="M6 4.5h9l3.5 3.5V19.5H6z" />
        <path d="M9.5 12h5M9.5 15.5h3.5" />
      </>
    ),
    fx: "wave",
  },
  Global: { icon: NimbusIcons.globe, fx: "spin" },
};

export function ThemedSlideCta({
  label = "Get in touch",
  hoverLabel = "Available 24/7",
  spacerLabel = "Available 24/7",
  ariaLabel,
  ariaHasPopup,
  ariaControls,
  screenReaderLabel,
  link,
  newTab = false,
  className,
  onClick,
  padding = "6px 18px 6px 6px",
  gap = 10,
  fontSize = "12.5px",
  variant = "primary",
  iconAngle = 0,
  accent: accentProp,
  theme: themeProp,
}: {
  label?: string;
  hoverLabel?: string;
  spacerLabel?: string;
  ariaLabel?: string;
  ariaHasPopup?: React.AriaAttributes["aria-haspopup"];
  ariaControls?: string;
  screenReaderLabel?: string;
  link?: string;
  newTab?: boolean;
  className?: string;
  onClick?: () => void;
  padding?: string;
  gap?: number;
  fontSize?: string;
  variant?: "primary" | "secondary";
  iconAngle?: number;
  accent?: string;
  theme?: "light" | "dark";
}) {
  const [accentState, setAccentState] = useState<string>(accentProp ?? "vermilion");
  const [themeState, setThemeState] = useState<"light" | "dark">(themeProp ?? "light");

  useEffect(() => {
    if (accentProp !== undefined && themeProp !== undefined) return;
    const curAccent = document.documentElement.dataset.accent || "vermilion";
    setAccentState(curAccent);
    const curTheme = (document.documentElement.dataset.theme as "light" | "dark") || "light";
    setThemeState(curTheme);

    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ theme?: "light" | "dark"; accent?: string }>;
      if (customEvent.detail?.theme) setThemeState(customEvent.detail.theme);
      if (customEvent.detail?.accent) setAccentState(customEvent.detail.accent);
    };

    window.addEventListener("rankrise-theme-change", handleThemeChange);
    return () => window.removeEventListener("rankrise-theme-change", handleThemeChange);
  }, [accentProp, themeProp]);

  const activeAccent = accentProp ?? accentState;
  const activeTheme = themeProp ?? themeState;
  const activeColorConfig = HEADER_CTA_COLORS[activeAccent] || HEADER_CTA_COLORS.vermilion;
  const ctaColors =
    variant === "secondary"
      ? {
          fill: "rgba(255, 255, 255, 0.08)",
          textColor: "#F4F8FE",
          hoverFill: "rgba(255, 255, 255, 0.16)",
          hoverTextColor: "#FFFFFF",
          iconBg: "rgba(255, 255, 255, 0.14)",
          iconColor: "#FFFFFF",
          iconHoverBg: "#FFFFFF",
          iconHoverColor: "#102B50",
        }
      : activeTheme === "dark"
        ? activeColorConfig.dark
        : activeColorConfig.light;

  return (
    <LabelSlideButton
      label={label}
      hoverLabel={hoverLabel}
      spacerLabel={spacerLabel}
      ariaLabel={ariaLabel}
      ariaHasPopup={ariaHasPopup}
      ariaControls={ariaControls}
      screenReaderLabel={screenReaderLabel}
      link={link}
      newTab={newTab}
      className={className}
      onClick={onClick}
      padding={padding}
      gap={gap}
      rounded={100}
      border={
        variant === "secondary"
          ? {
              borderColor: "rgba(148, 184, 235, 0.36)",
              borderStyle: "solid",
              borderWidth: 1,
            }
          : undefined
      }
      font={{
        fontSize,
        fontWeight: 600,
        letterSpacing: "-0.01em",
        lineHeight: "1.3",
      }}
      colors={{
        fill: ctaColors.fill,
        textColor: ctaColors.textColor,
        hoverFill: ctaColors.hoverFill,
        hoverTextColor: ctaColors.hoverTextColor,
      }}
      icon={{
        side: "left",
        size: 14,
        padding: 8,
        rounded: 100,
        type: "symbol",
        restSymbol: CTA_ARROW_ICON,
        hoverSymbol: CTA_ARROW_ICON,
        restAngle: iconAngle,
        hoverAngle: iconAngle,
        background: ctaColors.iconBg,
        color: ctaColors.iconColor,
        hoverBackground: ctaColors.iconHoverBg,
        hoverColor: ctaColors.iconHoverColor,
      }}
    />
  );
}

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
  const [accent, setAccent] = useState<string>("vermilion");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const headerRef = useRef<HTMLElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);
  const productsToggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const curAccent = document.documentElement.dataset.accent || "vermilion";
    setAccent(curAccent);
    const curTheme = (document.documentElement.dataset.theme as "light" | "dark") || "light";
    setTheme(curTheme);

    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ theme?: "light" | "dark"; accent?: string }>;
      if (customEvent.detail?.theme) setTheme(customEvent.detail.theme);
      if (customEvent.detail?.accent) setAccent(customEvent.detail.accent);
    };

    window.addEventListener("rankrise-theme-change", handleThemeChange);
    return () => window.removeEventListener("rankrise-theme-change", handleThemeChange);
  }, []);

  const activeColorConfig = HEADER_CTA_COLORS[accent] || HEADER_CTA_COLORS.vermilion;
  const ctaColors = theme === "dark" ? activeColorConfig.dark : activeColorConfig.light;

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

  const activeIndex = Math.max(
    0,
    NAVIGATION_ITEMS.findIndex((item) => isActive(item.href))
  );
  const productsIndex = NAVIGATION_ITEMS.findIndex((item) => item.label === "Products");
  const visualActiveIndex = productsOpen && productsIndex >= 0 ? productsIndex : activeIndex;

  const navItems: LiquidNavItem[] = NAVIGATION_ITEMS.map((item) => {
    const meta = NAV_ICON_MAP[item.label];
    if (item.label === "Products") {
      return {
        label: item.label,
        icon: meta?.icon,
        fx: meta?.fx ?? "drop",
        asButton: true,
        className: `navigation-link products-toggle${isActive(item.href) ? " is-active" : ""}`,
        wrapperClassName: "products-navigation",
        ariaExpanded: productsOpen,
        ariaControls: "products-dropdown",
        buttonRef: productsToggleRef,
        onClick: () => setProductsOpen((open) => !open),
        suffix: <Icon name="chevron-down" width="13" height="13" />,
        dropdown: (
          <div className="products-dropdown" id="products-dropdown" hidden={!productsOpen}>
            <Link className="dropdown-overview" href={item.href} onClick={closeMenus}>
              Our in-house products
              <Icon name="arrow-right" width="15" height="15" />
            </Link>
            <ul>
              {PRODUCTS.map((product) => (
                <li key={product.id}>
                  <Link href={product.href} onClick={closeMenus}>
                    <span>{product.name}</span>
                    <small>{product.category}</small>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ),
      };
    }

    return {
      label: item.label,
      href: item.href,
      icon: meta?.icon,
      fx: meta?.fx ?? "pop",
      className: `navigation-link${isActive(item.href) ? " is-active" : ""}`,
      onClick: closeMenus,
    };
  });

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
            <LiquidNavbar
              as="div"
              tone={theme}
              accentColor={ctaColors.fill}
              compact={false}
              hoverFollow
              listClassName="navigation-list"
              className="site-liquid-navbar"
              active={visualActiveIndex}
              items={navItems}
            />

            <ThemedSlideCta
              label="Get in touch"
              hoverLabel="Available 24/7"
              spacerLabel="Available 24/7"
              ariaLabel="Let's Talk Business"
              screenReaderLabel="Let's Talk Business"
              link={routeHref("/contact")}
              newTab={false}
              className="header-cta"
              onClick={closeMenus}
              accent={accent}
              theme={theme}
            />
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
