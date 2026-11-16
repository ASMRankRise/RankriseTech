// Delivered by Originkit · stack: nextjs · styling: tailwind
/* eslint-disable */
// @ts-nocheck
"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import PlinthTally from "@/components/originkit/ui/stats-01/plinth-tally";
import { routeHref } from "@/lib/routes";

type ThemeMode = "light" | "dark";
type AccentKey = "vermilion" | "volt" | "amber" | "crimson" | "emerald" | "blue";

const ACCENT_PALETTES: Record<AccentKey, { from: string; to: string; accent: string }> = {
  vermilion: { from: "#CC3307", to: "#FF7043", accent: "#FF4F1F" },
  volt: { from: "#7CA600", to: "#C8FF00", accent: "#C8FF00" },
  amber: { from: "#CC8A00", to: "#FFD147", accent: "#FFB800" },
  crimson: { from: "#B91C43", to: "#FB7185", accent: "#E11D48" },
  emerald: { from: "#009E69", to: "#34F5B5", accent: "#00E599" },
  blue: { from: "#1768D5", to: "#5A9CF0", accent: "#3B82F6" },
};

export function SectionStats() {
  const [fontsReady, setFontsReady] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [accent, setAccent] = useState<AccentKey>("vermilion");

  useEffect(() => {
    let on = true;
    if (typeof document !== "undefined" && document.fonts?.load) {
      Promise.all(['400 120px "Archivo Black"'].map((f) => document.fonts.load(f))).finally(
        () => on && setFontsReady(true),
      );
    } else {
      setFontsReady(true);
    }

    const syncTheme = () => {
      if (typeof document === "undefined") return;
      const t = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
      const a = (document.documentElement.dataset.accent as AccentKey) || "vermilion";
      setTheme(t);
      setAccent(ACCENT_PALETTES[a] ? a : "vermilion");
    };

    syncTheme();
    const observer =
      typeof MutationObserver !== "undefined"
        ? new MutationObserver(syncTheme)
        : null;
    observer?.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme", "data-accent"],
    });

    return () => {
      on = false;
      observer?.disconnect();
    };
  }, []);

  const palette = ACCENT_PALETTES[accent];
  const cardBg = theme === "dark" ? "#0B182E" : "#EAF2FF";
  const cardFrom = theme === "dark" ? "#1E427A" : "#8BB5EE";
  const cardTo = theme === "dark" ? "#82B4F5" : "#F4F8FE";
  const cardRim = theme === "dark" ? "#050D1A" : "#102B50";
  const keyBg = theme === "dark" ? "#050D1A" : "#0B1F3B";
  const keyRim = theme === "dark" ? "#020710" : "#071426";

  return (
    <div className="stats-01">
    <section id="about" className="stats company-section" data-section="company-introduction" aria-labelledby="company-heading">
      <div className="head">
        <div>
          <p className="eyebrow">
            <span>Beyond the brief</span>
            <span>RankRise Technologies</span>
          </p>
          <h2 id="company-heading">Beyond Development. We Engineer Possibilities.</h2>
        </div>
        <div>
          <p>
            Custom-built for your challenges. Product-minded by design. RankRise Technologies brings software engineering, AI innovation and digital transformation into one connected direction.
          </p>
          <div style={{ marginTop: "14px" }}>
            <Link className="text-link" href={routeHref("/about")} aria-label="About RankRise">
              About RankRise<span aria-hidden="true"> →</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="stats-01-grid">
        <figure className="stat">
          <div className="stone">
            <span className="num">4</span>
            <div id="stone-4" data-n="4">
              {fontsReady && (
                <PlinthTally
                  glyphs={[
                    { character: "4", from: cardFrom, to: cardTo, rim: cardRim, lean: -5 },
                  ]}
                  background={cardBg}
                  font={{ fontFamily: '"Archivo Black", sans-serif', fontWeight: 400 }}
                  stack="row"
                  spacing={7}
                  scale={80}
                  depth={4}
                  grain={4}
                  sparkles={0}
                  entrance={{ animate: false }}
                  parallax={8}
                  drift={2}
                  smoothing={6}
                  advanced={{ lineWidth: 7, sheenColor: "#FFFFFF", accentColor: palette.accent }}
                  style={{ width: "100%", height: "100%", minWidth: 0, minHeight: 0 }}
                />
              )}
            </div>
          </div>
          <figcaption>
            <b>Proprietary SaaS Products</b>
            <span>TriMarkity, 1SocialSnap, SalesApp, and HRMS built and maintained in-house.</span>
          </figcaption>
        </figure>
        <figure className="stat key">
          <div className="stone">
            <span className="num">6</span>
            <div id="stone-6" data-n="6" data-key="">
              {fontsReady && (
                <PlinthTally
                  glyphs={[
                    { character: "6", from: palette.from, to: palette.to, rim: keyRim, lean: 4 },
                  ]}
                  background={keyBg}
                  font={{ fontFamily: '"Archivo Black", sans-serif', fontWeight: 400 }}
                  stack="row"
                  spacing={7}
                  scale={80}
                  depth={4}
                  grain={4}
                  sparkles={0}
                  entrance={{ animate: false }}
                  parallax={8}
                  drift={2}
                  smoothing={6}
                  advanced={{ lineWidth: 7, sheenColor: "#FFFFFF", accentColor: palette.to }}
                  style={{ width: "100%", height: "100%", minWidth: 0, minHeight: 0 }}
                />
              )}
            </div>
          </div>
          <figcaption>
            <b>Core Engineering Capabilities</b>
            <span>Custom software, AI automation, web & mobile platforms, cloud systems, and BPA.</span>
          </figcaption>
        </figure>
        <figure className="stat">
          <div className="stone">
            <span className="num">10</span>
            <div id="stone-10" data-n="10">
              {fontsReady && (
                <PlinthTally
                  glyphs={[
                    { character: "1", from: cardFrom, to: cardTo, rim: cardRim, lean: -6 },
                    { character: "0", from: cardFrom, to: cardTo, rim: cardRim, lean: 6 },
                  ]}
                  background={cardBg}
                  font={{ fontFamily: '"Archivo Black", sans-serif', fontWeight: 400 }}
                  stack="row"
                  spacing={7}
                  scale={74}
                  depth={4}
                  grain={4}
                  sparkles={0}
                  entrance={{ animate: false }}
                  parallax={8}
                  drift={2}
                  smoothing={6}
                  advanced={{ lineWidth: 7, sheenColor: "#FFFFFF", accentColor: palette.accent }}
                  style={{ width: "100%", height: "100%", minWidth: 0, minHeight: 0 }}
                />
              )}
            </div>
          </div>
          <figcaption>
            <b>Industry Verticals Served</b>
            <span>Startups, SMEs, enterprise, healthcare, manufacturing, real estate, and retail.</span>
          </figcaption>
        </figure>
      </div>
      <div className="foot">
        <span>Dual corporate presence: Maharashtra, India & Delaware, United States.</span>
        <Link href={routeHref("/products")}>Explore in-house products →</Link>
      </div>
    </section>
    </div>
  );
}
