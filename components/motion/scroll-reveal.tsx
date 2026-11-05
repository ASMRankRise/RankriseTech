"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

export type RevealVariant = "fade-up" | "fade-in" | "slide-left" | "slide-right" | "scale-up";

interface ScrollRevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number; // in milliseconds
  duration?: number; // in milliseconds
  className?: string;
  style?: CSSProperties;
  threshold?: number;
  once?: boolean;
  as?: keyof HTMLElementTagNameMap;
}

export function ScrollReveal({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 600,
  className = "",
  style = {},
  threshold = 0.12,
  once = true,
  as: Component = "div",
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasReducedMotion, setHasReducedMotion] = useState(false);

  useEffect(() => {
    // Check reduced motion safely
    if (
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setHasReducedMotion(true);
      setIsVisible(true);
      return;
    }

    // Fallback if IntersectionObserver is unsupported (e.g. jsdom / SSR)
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            setIsVisible(false);
          }
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [once, threshold]);

  // Compute CSS styles based on visibility and variant
  const getTransformStyles = (): CSSProperties => {
    if (hasReducedMotion) {
      return {};
    }

    const baseTransition: CSSProperties = {
      transitionProperty: "opacity, transform",
      transitionDuration: `${duration}ms`,
      transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      transitionDelay: `${delay}ms`,
      willChange: isVisible ? "auto" : "opacity, transform",
    };

    if (isVisible) {
      return {
        ...baseTransition,
        opacity: 1,
        transform: "none",
      };
    }

    switch (variant) {
      case "fade-up":
        return {
          ...baseTransition,
          opacity: 0,
          transform: "translate3d(0, 24px, 0)",
        };
      case "slide-left":
        return {
          ...baseTransition,
          opacity: 0,
          transform: "translate3d(-32px, 0, 0)",
        };
      case "slide-right":
        return {
          ...baseTransition,
          opacity: 0,
          transform: "translate3d(32px, 0, 0)",
        };
      case "scale-up":
        return {
          ...baseTransition,
          opacity: 0,
          transform: "scale3d(0.96, 0.96, 1)",
        };
      case "fade-in":
      default:
        return {
          ...baseTransition,
          opacity: 0,
          transform: "none",
        };
    }
  };

  const Tag = Component as any;

  return (
    <Tag
      ref={ref}
      className={`scroll-reveal-container ${className}`.trim()}
      style={{
        ...style,
        ...getTransformStyles(),
      }}
    >
      {children}
    </Tag>
  );
}
