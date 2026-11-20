"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { CustomEase } from "gsap/CustomEase";
import { PROCESS_STAGES } from "@/lib/site-content";
import { ScrollReveal } from "./motion/scroll-reveal";

const STAGE_META = [
  { code: "01", tag: "SIGNAL // AUDIT" },
  { code: "02", tag: "SCOPE // MATRIX" },
  { code: "03", tag: "SYSTEM // FLOW" },
  { code: "04", tag: "BUILD // ITERATE" },
  { code: "05", tag: "GATE // VERIFY" },
  { code: "06", tag: "SCALE // TELEMETRY" },
] as const;

interface DigitColumnProps {
  digit: number;
}

function DigitColumn({ digit }: DigitColumnProps) {
  const glyphs = Array.from({ length: digit + 1 }, (_, n) => String(n));
  return (
    <span className="prl_col">
      <span className="prl_strip" data-prl-digit={digit}>
        {glyphs.map((glyph) => (
          <span key={glyph} className="prl_glyph">
            {glyph}
          </span>
        ))}
      </span>
    </span>
  );
}

function StageArtwork({ stageIndex }: { stageIndex: number }) {
  const meta = STAGE_META[stageIndex] ?? STAGE_META[0];

  return (
    <div className="prl_media_card" data-stage-visual={stageIndex + 1}>
      <span className="prl_media_tag">{meta.tag}</span>
      <svg
        className="prl_media_svg"
        viewBox="0 0 240 160"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <pattern
            id={`prl-grid-${stageIndex}`}
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 20 0 L 0 0 0 20"
              stroke="currentColor"
              strokeOpacity="0.06"
              strokeWidth="0.75"
            />
          </pattern>
        </defs>
        <rect width="240" height="160" fill={`url(#prl-grid-${stageIndex})`} />

        {stageIndex === 0 && (
          <g>
            <circle cx="120" cy="86" r="46" stroke="currentColor" strokeOpacity="0.16" strokeWidth="1" strokeDasharray="3 4" />
            <circle cx="120" cy="86" r="30" stroke="var(--sky-blue)" strokeOpacity="0.55" strokeWidth="1.25" />
            <circle cx="120" cy="86" r="14" fill="var(--accent-soft-bg)" stroke="var(--accent-highlight)" strokeWidth="1.4" />
            <path d="M120 30v112M64 86h112" stroke="currentColor" strokeOpacity="0.14" strokeWidth="1" />
            <path d="M120 86L154 56" stroke="var(--accent-highlight)" strokeWidth="1.6" strokeLinecap="round" />
            <circle cx="154" cy="56" r="4.5" fill="var(--accent-highlight)" />
            <circle cx="96" cy="102" r="3.5" fill="var(--rankrise-blue)" />
            <circle cx="142" cy="112" r="3" fill="var(--sky-blue)" />
          </g>
        )}

        {stageIndex === 1 && (
          <g>
            <rect x="34" y="42" width="172" height="22" rx="5" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeOpacity="0.16" />
            <rect x="34" y="74" width="172" height="22" rx="5" fill="var(--accent-soft-bg)" stroke="var(--accent-highlight)" strokeOpacity="0.55" />
            <rect x="34" y="106" width="172" height="22" rx="5" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeOpacity="0.16" />
            <rect x="44" y="50" width="68" height="6" rx="3" fill="var(--sky-blue)" fillOpacity="0.55" />
            <rect x="44" y="82" width="108" height="6" rx="3" fill="var(--accent-highlight)" />
            <rect x="44" y="114" width="84" height="6" rx="3" fill="var(--rankrise-blue)" fillOpacity="0.45" />
            <circle cx="186" cy="53" r="4" fill="var(--sky-blue)" />
            <circle cx="186" cy="85" r="4.5" fill="var(--accent-highlight)" />
            <circle cx="186" cy="117" r="4" fill="var(--rankrise-blue)" fillOpacity="0.6" />
          </g>
        )}

        {stageIndex === 2 && (
          <g>
            <rect x="32" y="38" width="76" height="92" rx="8" fill="currentColor" fillOpacity="0.03" stroke="currentColor" strokeOpacity="0.18" />
            <rect x="132" y="38" width="76" height="40" rx="8" fill="var(--accent-soft-bg)" stroke="var(--accent-highlight)" strokeOpacity="0.6" />
            <rect x="132" y="90" width="76" height="40" rx="8" fill="currentColor" fillOpacity="0.04" stroke="var(--sky-blue)" strokeOpacity="0.5" />
            <path d="M44 54h42M44 68h52M44 82h38" stroke="currentColor" strokeOpacity="0.32" strokeWidth="2" strokeLinecap="round" />
            <rect x="44" y="98" width="52" height="18" rx="4" fill="var(--rankrise-blue)" fillOpacity="0.18" stroke="var(--rankrise-blue)" strokeOpacity="0.45" />
            <path d="M108 62c12 0 12 -4 24 -4M108 108c12 0 12 2 24 2" stroke="var(--accent-highlight)" strokeWidth="1.5" strokeDasharray="3 3" />
            <circle cx="148" cy="58" r="5" fill="var(--accent-highlight)" />
            <path d="M160 58h34" stroke="currentColor" strokeOpacity="0.4" strokeWidth="2" strokeLinecap="round" />
          </g>
        )}

        {stageIndex === 3 && (
          <g>
            <path d="M46 116V56h44v60M98 116V44h44v72M150 116V68h44v48" stroke="currentColor" strokeOpacity="0.16" strokeWidth="1.2" />
            <rect x="52" y="64" width="32" height="16" rx="3" fill="var(--sky-blue)" fillOpacity="0.25" stroke="var(--sky-blue)" />
            <rect x="104" y="52" width="32" height="22" rx="3" fill="var(--accent-soft-bg)" stroke="var(--accent-highlight)" />
            <rect x="104" y="82" width="32" height="22" rx="3" fill="var(--rankrise-blue)" fillOpacity="0.2" stroke="var(--rankrise-blue)" />
            <rect x="156" y="76" width="32" height="26" rx="3" fill="var(--sky-blue)" fillOpacity="0.22" stroke="var(--sky-blue)" />
            <path d="M84 72h20M136 92h20" stroke="var(--accent-highlight)" strokeWidth="1.6" strokeLinecap="round" />
            <circle cx="120" cy="44" r="4" fill="var(--accent-highlight)" />
          </g>
        )}

        {stageIndex === 4 && (
          <g>
            <rect x="42" y="42" width="156" height="86" rx="10" fill="currentColor" fillOpacity="0.03" stroke="currentColor" strokeOpacity="0.18" />
            <path d="M42 64h156" stroke="currentColor" strokeOpacity="0.12" />
            <circle cx="58" cy="53" r="3" fill="var(--accent-highlight)" />
            <circle cx="70" cy="53" r="3" fill="var(--sky-blue)" />
            <circle cx="82" cy="53" r="3" fill="currentColor" fillOpacity="0.25" />
            <path d="M62 84l7 7 15-15" stroke="var(--accent-highlight)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M96 84h80" stroke="currentColor" strokeOpacity="0.35" strokeWidth="2" strokeLinecap="round" />
            <path d="M62 108l7 7 15-15" stroke="var(--rankrise-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M96 108h64" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" strokeLinecap="round" />
          </g>
        )}

        {stageIndex === 5 && (
          <g>
            <path d="M36 122h168" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1.2" />
            <path
              d="M44 110 C 76 106, 94 84, 120 76 C 146 68, 166 56, 196 42 L 196 122 L 44 122 Z"
              fill="var(--accent-soft-bg)"
            />
            <path
              d="M44 110 C 76 106, 94 84, 120 76 C 146 68, 166 56, 196 42"
              stroke="var(--accent-highlight)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="84" cy="94" r="4" fill="var(--rankrise-blue)" />
            <circle cx="136" cy="70" r="4" fill="var(--sky-blue)" />
            <circle cx="196" cy="42" r="5" fill="var(--accent-highlight)" />
          </g>
        )}
      </svg>
    </div>
  );
}

export function ProcessPathway() {
  const wrapRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const desktopSvgRef = useRef<SVGSVGElement>(null);
  const desktopGhostRef = useRef<SVGPathElement>(null);
  const desktopPathRef = useRef<SVGPathElement>(null);
  const mobileSvgRef = useRef<SVGSVGElement>(null);
  const mobileGhostRef = useRef<SVGPathElement>(null);
  const mobilePathRef = useRef<SVGPathElement>(null);
  const beadRef = useRef<HTMLSpanElement>(null);
  const stepElsRef = useRef<(HTMLLIElement | null)[]>([]);
  const numElsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const mediaElsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const thresholdsRef = useRef<number[]>(
    PROCESS_STAGES.map((_, idx) => (PROCESS_STAGES.length > 1 ? idx / (PROCESS_STAGES.length - 1) : 0)),
  );
  const activeIdxRef = useRef<number>(-1);

  useEffect(() => {
    const wrapEl = wrapRef.current;
    const railEl = railRef.current;
    const beadEl = beadRef.current;
    const desktopSvg = desktopSvgRef.current;
    const desktopGhost = desktopGhostRef.current;
    const desktopPath = desktopPathRef.current;
    const mobileSvg = mobileSvgRef.current;
    const mobileGhost = mobileGhostRef.current;
    const mobilePath = mobilePathRef.current;

    if (
      !wrapEl ||
      !railEl ||
      !beadEl ||
      !desktopSvg ||
      !desktopGhost ||
      !desktopPath ||
      !mobileSvg ||
      !mobileGhost ||
      !mobilePath
    ) {
      return;
    }
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;

    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, DrawSVGPlugin, CustomEase);
    const prlEase = CustomEase.create("prlEase", "M0,0 C0.3,0.9 0.1,1 1,1");

    const stepNodes = stepElsRef.current.filter((el): el is HTMLLIElement => Boolean(el));
    const mediaNodes = mediaElsRef.current.filter((el): el is HTMLDivElement => Boolean(el));

    const getDigitMeta = (stepIndex: number) => {
      const stepEl = stepNodes[stepIndex];
      if (!stepEl) return { strips: [] as HTMLElement[], hidden: [] as number[], targets: [] as number[] };
      const strips = Array.from(stepEl.querySelectorAll<HTMLElement>(".prl_strip"));
      const hidden: number[] = [];
      const targets: number[] = [];
      for (const strip of strips) {
        const digit = Number.parseInt(strip.dataset.prlDigit || "0", 10);
        const count = digit + 1;
        hidden.push(100 / count);
        targets.push((-100 * digit) / count);
      }
      return { strips, hidden, targets };
    };

    const digitMetaByStep = PROCESS_STAGES.map((_, i) => getDigitMeta(i));
    const stepOpacities = new Array<number>(PROCESS_STAGES.length).fill(-1);
    const mediaShown = new Array<boolean | null>(PROCESS_STAGES.length).fill(null);
    const numRolled = new Array<boolean | null>(PROCESS_STAGES.length).fill(null);

    const applyStepStates = (nextActiveIdx: number, instant = false) => {
      if (nextActiveIdx === activeIdxRef.current && !instant) return;
      activeIdxRef.current = nextActiveIdx;
      setActiveIndex(Math.max(0, nextActiveIdx));

      PROCESS_STAGES.forEach((_, idx) => {
        const stepEl = stepNodes[idx];
        const mediaEl = mediaNodes[idx];
        const { strips, hidden, targets } = digitMetaByStep[idx];
        if (!stepEl) return;

        const isReached = idx <= nextActiveIdx;
        const isCurrent = idx === nextActiveIdx;
        const targetOpacity = isCurrent ? 1 : isReached ? 0.78 : 0.42;

        if (stepOpacities[idx] !== targetOpacity || instant) {
          stepOpacities[idx] = targetOpacity;
          if (instant) {
            gsap.set(stepEl, { opacity: targetOpacity });
          } else {
            gsap.to(stepEl, {
              opacity: targetOpacity,
              duration: 0.5,
              ease: prlEase,
              overwrite: true,
            });
          }
        }

        if (mediaEl && (mediaShown[idx] !== isReached || instant)) {
          mediaShown[idx] = isReached;
          const mediaVars = isReached ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 };
          if (instant) {
            gsap.set(mediaEl, mediaVars);
          } else {
            gsap.to(mediaEl, {
              ...mediaVars,
              duration: isReached ? 0.8 : 0.45,
              delay: isReached ? 0.08 : 0,
              ease: prlEase,
              overwrite: true,
              force3D: true,
            });
          }
        }

        if (strips.length && (numRolled[idx] !== isReached || instant)) {
          numRolled[idx] = isReached;
          const yForStrip = (stripIdx: number) => (isReached ? targets[stripIdx] : hidden[stripIdx]);
          if (instant) {
            strips.forEach((strip, stripIdx) => {
              gsap.set(strip, { yPercent: yForStrip(stripIdx) });
            });
          } else {
            gsap.to(strips, {
              yPercent: (stripIdx: number) => yForStrip(stripIdx),
              duration: 0.6,
              delay: isReached ? 0.16 : 0,
              ease: prlEase,
              stagger: isReached ? 0.05 : -0.05,
              overwrite: true,
              force3D: true,
            });
          }
        }
      });
    };

    let mobileYs: number[] = [];

    const measurePaths = (isMobile: boolean) => {
      if (isMobile) {
        const svgRect = mobileSvg.getBoundingClientRect();
        const w = Math.max(1, Math.round(svgRect.width));
        const h = Math.max(1, Math.round(svgRect.height));
        mobileYs = PROCESS_STAGES.map((_, idx) => {
          const anchorEl = numElsRef.current[idx] || stepNodes[idx];
          if (!anchorEl) return idx * 80;
          const r = anchorEl.getBoundingClientRect();
          return Math.round(r.top - svgRect.top + r.height / 2);
        });
        const y0 = mobileYs[0] ?? 16;
        const yLast = mobileYs[mobileYs.length - 1] ?? Math.max(y0 + 1, h - 16);
        const d = `M ${w / 2} ${y0} L ${w / 2} ${yLast}`;
        mobileSvg.setAttribute("viewBox", `0 0 ${w} ${h}`);
        mobileGhost.setAttribute("d", d);
        mobilePath.setAttribute("d", d);
        thresholdsRef.current = PROCESS_STAGES.map((_, idx) =>
          PROCESS_STAGES.length > 1 ? idx / (PROCESS_STAGES.length - 1) : 0,
        );
        return { activePath: mobilePath, w, h };
      }

      const svgRect = desktopSvg.getBoundingClientRect();
      const w = Math.max(1, Math.round(svgRect.width));
      const h = Math.max(1, Math.round(svgRect.height));
      const d = `M 0 ${h / 2} L ${w} ${h / 2}`;
      desktopSvg.setAttribute("viewBox", `0 0 ${w} ${h}`);
      desktopGhost.setAttribute("d", d);
      desktopPath.setAttribute("d", d);

      thresholdsRef.current = PROCESS_STAGES.map((_, idx) => {
        if (idx === 0) return 0;
        const stepEl = stepNodes[idx];
        if (!stepEl) return idx / (PROCESS_STAGES.length - 1);
        const r = stepEl.getBoundingClientRect();
        return gsap.utils.clamp(0, 1, (r.left + r.width / 2 - svgRect.left) / w);
      });

      return { activePath: desktopPath, w, h };
    };

    const mm = gsap.matchMedia();
    let fontsCancelled = false;

    mm.add(
      {
        isDesktop: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        isMobile: "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
        isReduced: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { isMobile, isReduced } = context.conditions as {
          isDesktop: boolean;
          isMobile: boolean;
          isReduced: boolean;
        };

        wrapEl.style.setProperty("--prl-track", !isMobile && !isReduced ? "260vh" : "auto");
        activeIdxRef.current = -1;

        if (isReduced) {
          gsap.set(beadEl, { clearProps: "x,y,xPercent,yPercent,transform" });
          const isNarrow = window.matchMedia("(max-width: 767px)").matches;
          const { activePath } = measurePaths(isNarrow);
          applyStepStates(PROCESS_STAGES.length - 1, true);
          gsap.set(activePath, { drawSVG: "0% 100%" });
          const rawPath = MotionPathPlugin.getRawPath(activePath);
          MotionPathPlugin.cacheRawPathMeasurements(rawPath);
          const endPt = MotionPathPlugin.getPositionOnPath(rawPath, 1);
          const svgRect = (isNarrow ? mobileSvg : desktopSvg).getBoundingClientRect();
          const railRect = railEl.getBoundingClientRect();
          gsap.set(beadEl, {
            x: svgRect.left - railRect.left + endPt.x,
            y: svgRect.top - railRect.top + endPt.y,
            xPercent: -50,
            yPercent: -50,
          });
          return () => {
            gsap.set([beadEl, activePath, ...stepNodes, ...mediaNodes], { clearProps: "all" });
          };
        }

        // Start with Step 01 illuminated cleanly so the rail reads immediately on entry
        applyStepStates(0, true);
        gsap.set(beadEl, { clearProps: "x,y,xPercent,yPercent,transform" });
        const { activePath } = measurePaths(isMobile);

        const tl = gsap.timeline({
          defaults: { ease: prlEase, force3D: true },
          scrollTrigger: isMobile
            ? {
                trigger: railEl,
                start: () => `top+=${mobileYs[0] ?? 16} 65%`,
                end: () => `top+=${mobileYs[mobileYs.length - 1] ?? 420} 65%`,
                scrub: 0.6,
                invalidateOnRefresh: true,
                refreshPriority: 1,
                onRefreshInit: () => {
                  gsap.set(beadEl, { clearProps: "x,y,xPercent,yPercent,transform" });
                  measurePaths(true);
                },
                onUpdate: (self) => {
                  const pts = thresholdsRef.current;
                  let idx = 0;
                  for (let i = 0; i < pts.length; i++) {
                    if (self.progress >= pts[i] - 0.001) idx = i;
                  }
                  applyStepStates(idx, false);
                },
              }
            : {
                trigger: wrapEl,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.6,
                invalidateOnRefresh: true,
                refreshPriority: 1,
                onRefreshInit: () => {
                  gsap.set(beadEl, { clearProps: "x,y,xPercent,yPercent,transform" });
                  measurePaths(false);
                },
                onUpdate: (self) => {
                  const pts = thresholdsRef.current;
                  let idx = 0;
                  for (let i = 0; i < pts.length; i++) {
                    if (self.progress >= pts[i] - 0.001) idx = i;
                  }
                  applyStepStates(idx, false);
                },
              },
        });

        tl.to(
          beadEl,
          {
            motionPath: {
              path: activePath,
              align: activePath,
              alignOrigin: [0.5, 0.5],
              autoRotate: false,
              start: 0,
              end: 1,
            },
            ease: "none",
            duration: 1,
            immediateRender: true,
          },
          0,
        );

        tl.fromTo(
          activePath,
          { drawSVG: "0% 0%" },
          {
            drawSVG: "0% 100%",
            ease: "none",
            force3D: false,
            duration: 1,
          },
          0,
        );

        triggerRef.current = tl.scrollTrigger ?? null;

        return () => {
          triggerRef.current = null;
          tl.scrollTrigger?.kill(true);
          tl.kill();
          gsap.set([beadEl, activePath, ...stepNodes, ...mediaNodes], { clearProps: "all" });
        };
      },
    );

    if (document.fonts && typeof document.fonts.ready?.then === "function") {
      document.fonts.ready.then(() => {
        if (!fontsCancelled) {
          ScrollTrigger.refresh();
        }
      });
    }

    return () => {
      fontsCancelled = true;
      triggerRef.current = null;
      mm.revert();
    };
  }, []);

  const handleStepActivate = (index: number) => {
    setActiveIndex(index);
    const st = triggerRef.current;
    if (st && typeof window !== "undefined") {
      const pts = thresholdsRef.current;
      const targetProgress = index === 0 ? 0 : Math.min(1, (pts[index] ?? 0) + 0.015);
      const targetY = st.start + (st.end - st.start) * targetProgress;
      const prefersReduced =
        typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({
        top: targetY,
        behavior: prefersReduced ? "auto" : "smooth",
      });
    }
  };

  return (
    <div ref={wrapRef as React.RefObject<HTMLDivElement>} className="prl_wrap" data-anm-process-rail="">
      <div className="prl_stage">
        <div className="container">
          <ScrollReveal variant="fade-up" className="section-heading heading-split">
            <div>
              <p className="eyebrow">Development Process</p>
              <h2 id="process-heading">
                A clear path from
                <br className="desktop-break" /> possibility to progress.
              </h2>
            </div>
            <p>
              A considered working approach, with shared understanding and useful decisions at every
              stage.
            </p>
          </ScrollReveal>

          <div ref={railRef} className="prl_rail" data-anm-prl-rail="">
            <svg
              ref={desktopSvgRef}
              className="prl_svg prl_svg_desktop"
              viewBox="0 0 1200 24"
              aria-hidden="true"
              focusable="false"
            >
              <path ref={desktopGhostRef} className="prl_path_ghost" d="M 0 12 L 1200 12" />
              <path
                ref={desktopPathRef}
                className="prl_path"
                data-anm-prl-path="desktop"
                d="M 0 12 L 1200 12"
              />
            </svg>

            <svg
              ref={mobileSvgRef}
              className="prl_svg prl_svg_mobile"
              viewBox="0 0 56 560"
              aria-hidden="true"
              focusable="false"
            >
              <path ref={mobileGhostRef} className="prl_path_ghost" d="M 28 16 L 28 544" />
              <path
                ref={mobilePathRef}
                className="prl_path"
                data-anm-prl-path="mobile"
                d="M 28 16 L 28 544"
              />
            </svg>

            <span ref={beadRef} className="prl_bead" data-anm-prl-bead="" aria-hidden="true" />

            <ol className="prl_steps">
              {PROCESS_STAGES.map((stage, index) => {
                const isActive = index === activeIndex;
                const isPassed = index <= activeIndex;
                return (
                  <li
                    key={stage.name}
                    ref={(el) => {
                      stepElsRef.current[index] = el;
                    }}
                    className={`prl_step${isPassed ? " is-passed" : ""}${isActive ? " is-active" : ""}`}
                    data-anm-prl-step=""
                  >
                    <div
                      role="button"
                      tabIndex={0}
                      className="prl_step_btn"
                      aria-current={isActive ? "step" : undefined}
                      onClick={() => handleStepActivate(index)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          handleStepActivate(index);
                        }
                      }}
                    >
                      <span
                        ref={(el) => {
                          numElsRef.current[index] = el;
                        }}
                        className="prl_step_num"
                        data-anm-prl-num=""
                        aria-hidden="true"
                      >
                        <DigitColumn digit={0} />
                        <DigitColumn digit={index + 1} />
                      </span>
                      <h3 className="prl_step_title">{stage.name}</h3>
                      <p className="prl_step_text">{stage.description}</p>
                      <div
                        ref={(el) => {
                          mediaElsRef.current[index] = el;
                        }}
                        className="prl_step_media"
                        data-anm-prl-media=""
                        aria-hidden="true"
                      >
                        <StageArtwork stageIndex={index} />
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
