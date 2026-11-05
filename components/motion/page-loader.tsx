"use client";

import { useEffect, useState } from "react";

export function InitialPageLoader() {
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Check if session has already loaded or if reduced motion is requested
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setLoading(false);
      setVisible(false);
      return;
    }

    // Fast, non-blocking initial entrance: dismiss after 300ms
    const timer = setTimeout(() => {
      setLoading(false);
      const exitTimer = setTimeout(() => {
        setVisible(false);
      }, 400);
      return () => clearTimeout(exitTimer);
    }, 280);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="page-loader-barrier"
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255, 255, 255, 0.96)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        opacity: loading ? 1 : 0,
        pointerEvents: loading ? "auto" : "none",
        transition: "opacity 380ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "18px",
          transform: loading ? "scale(1)" : "scale(1.04)",
          transition: "transform 380ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            lineHeight: 1,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-manrope), sans-serif",
              fontSize: "28px",
              fontWeight: 750,
              letterSpacing: "-1px",
              color: "#102B50",
            }}
          >
            RankRise
          </span>
          <span
            style={{
              marginTop: "6px",
              fontSize: "9px",
              fontWeight: 600,
              letterSpacing: "2.8px",
              textTransform: "uppercase",
              color: "#1768D5",
            }}
          >
            Technologies
          </span>
        </div>
        {/* Subtle, refined loading line */}
        <div
          style={{
            width: "140px",
            height: "2px",
            backgroundColor: "#EAF2FF",
            borderRadius: "9999px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              width: "50%",
              background: "linear-gradient(90deg, #1768D5, #5A9CF0)",
              borderRadius: "9999px",
              animation: "loader-slide 1s infinite ease-in-out",
            }}
          />
        </div>
      </div>
    </div>
  );
}
