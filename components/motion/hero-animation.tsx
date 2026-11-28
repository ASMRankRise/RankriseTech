"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface HeroAnimationProps {
  /** Hero section container element reference */
  heroRef: React.RefObject<HTMLElement | null>;
}

export function HeroAnimation({ heroRef }: HeroAnimationProps) {
  const ctxRef = useRef<gsap.Context | null>(null);
  const mmRef = useRef<gsap.MatchMedia | null>(null);
  const parallaxRef = useRef<{
    groundQuickTo: gsap.QuickToFunc | null;
    coreQuickTo: gsap.QuickToFunc | null;
    hudTopQuickTo: gsap.QuickToFunc | null;
    hudBottomQuickTo: gsap.QuickToFunc | null;
    heroRect: DOMRect | null;
    rafId: number | null;
  }>({
    groundQuickTo: null,
    coreQuickTo: null,
    hudTopQuickTo: null,
    hudBottomQuickTo: null,
    heroRect: null,
    rafId: null,
  });

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    // Check if we're in a browser environment with matchMedia support
    const hasMatchMedia =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function";

    if (!hasMatchMedia) {
      // In SSR/jsdom: immediately show final state, no animations
      const elements = hero.querySelectorAll<HTMLElement>([
        ".hero-eyebrow",
        ".hero-copy h1 .split-line",
        "#hero-heading",
        ".hero-description",
        ".hero-actions .button",
        ".hero-telemetry-ribbon .telemetry-item",
        ".hero-hud-card-top",
        ".hero-hud-card-bottom",
        ".engineering-svg .animated-circuit-path",
        ".engineering-svg .animated-iso-float",
        ".engineering-svg .animated-node-pulse",
      ].join(","));

      elements.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      return;
    }

    const mm = gsap.matchMedia();
    mmRef.current = mm;

    mm.add("(prefers-reduced-motion: reduce)", () => {
      // Reduced motion: immediately show final state, no animations
      const elements = hero.querySelectorAll<HTMLElement>([
        ".hero-eyebrow",
        ".hero-copy h1 .split-line",
        "#hero-heading",
        ".hero-description",
        ".hero-actions .button",
        ".hero-telemetry-ribbon .telemetry-item",
        ".hero-hud-card-top",
        ".hero-hud-card-bottom",
        ".engineering-svg .animated-circuit-path",
        ".engineering-svg .animated-iso-float",
        ".engineering-svg .animated-node-pulse",
      ].join(","));

      elements.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        // Select all elements
        const eyebrow = hero.querySelector<HTMLElement>(".hero-eyebrow");
        const heading = hero.querySelector<HTMLElement>("#hero-heading");
        const h1Lines = hero.querySelectorAll<HTMLElement>(".hero-copy h1 .split-line");
        const h1Targets = h1Lines.length > 0 ? Array.from(h1Lines) : heading ? [heading] : [];
        const description = hero.querySelector<HTMLElement>(".hero-description");
        const buttons = hero.querySelectorAll<HTMLElement>(".hero-actions .button");
        const telemetryItems = hero.querySelectorAll<HTMLElement>(".hero-telemetry-ribbon .telemetry-item");
        const hudTop = hero.querySelector<HTMLElement>(".hero-hud-card-top");
        const hudBottom = hero.querySelector<HTMLElement>(".hero-hud-card-bottom");
        const circuitPaths = hero.querySelectorAll<SVGPathElement>(".engineering-svg .animated-circuit-path");
        const isoFloatGroup = hero.querySelector<SVGGElement>(".engineering-svg .animated-iso-float");
        const nodePulses = hero.querySelectorAll<SVGCircleElement>(".engineering-svg .animated-node-pulse");
        const coreNode = hero.querySelector<SVGCircleElement>(".engineering-svg .core-node");
        const satelliteNodes = hero.querySelectorAll<SVGCircleElement>(".engineering-svg .satellite-node");
        const satelliteLabels = hero.querySelectorAll<SVGTextElement>(".engineering-svg .satellite-label");
        const conduitPulses = hero.querySelectorAll<SVGCircleElement>(".engineering-svg .conduit-pulse");

        // State 0: Set initial states (opacity 0, transformed) - runs instantly, no CLS
        gsap.set([eyebrow, h1Targets, description, buttons, telemetryItems, hudTop, hudBottom], {
          opacity: 0,
          force3D: true,
        });

        gsap.set(hudTop, { x: 60, force3D: true });
        gsap.set(hudBottom, { x: -60, force3D: true });

        // SVG circuit paths - prepare for strokeDashoffset animation
        circuitPaths.forEach((path) => {
          const length = path.getTotalLength();
          gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: length,
            force3D: true,
          });
        });

        // Isometric group - prepare for elevation
        gsap.set(isoFloatGroup, {
          y: 30,
          scale: 0.95,
          transformOrigin: "center center",
          force3D: true,
        });

        // Node pulses - initial state
        gsap.set(nodePulses, { opacity: 0.3, force3D: true });

        // Conduit pulses - initial hidden state
        gsap.set(conduitPulses, { opacity: 0, force3D: true });

        // ============================================================
        // State 1: Typography & Narrative Ingress (0.0s – 0.65s)
        // ============================================================

        if (eyebrow) {
          gsap.fromTo(
            eyebrow,
            { opacity: 0, scale: 0.85, transformOrigin: "center center" },
            { opacity: 1, scale: 1, duration: 0.45, ease: "power3.out", delay: 0.05 }
          );
        }

        if (h1Targets.length > 0) {
          gsap.fromTo(
            h1Targets,
            { opacity: 0, y: 40, force3D: true },
            {
              opacity: 1,
              y: 0,
              duration: 0.65,
              ease: "power3.out",
              stagger: h1Lines.length > 0 ? 0.06 : 0,
              delay: 0.1,
            }
          );
        }

        if (description) {
          gsap.to(description, {
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
            delay: 0.2,
          });
        }

        if (buttons.length > 0) {
          gsap.fromTo(
            buttons,
            { opacity: 0, scale: 0.7, force3D: true },
            {
              opacity: 1,
              scale: 1,
              duration: 0.55,
              ease: "back.out(1.2)",
              stagger: 0.08,
              delay: 0.25,
            }
          );
        }

        if (telemetryItems.length > 0) {
          gsap.fromTo(
            telemetryItems,
            { opacity: 0, y: 20, force3D: true },
            {
              opacity: 1,
              y: 0,
              duration: 0.4,
              ease: "power2.out",
              stagger: 0.07,
              delay: 0.3,
            }
          );
        }

        // ============================================================
        // State 2: Visual Vector Tracing & Elevation (0.35s – 1.25s)
        // ============================================================

        if (circuitPaths.length > 0) {
          gsap.to(circuitPaths, {
            strokeDashoffset: 0,
            duration: 1.0,
            ease: "power2.inOut",
            stagger: 0.03,
            delay: 0.35,
          });
        }

        if (isoFloatGroup) {
          gsap.to(isoFloatGroup, {
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: "expo.out",
            delay: 0.4,
          });
        }

        if (hudTop) {
          gsap.to(hudTop, {
            x: 0,
            opacity: 1,
            duration: 0.65,
            ease: "expo.out",
            delay: 0.5,
          });
        }

        if (hudBottom) {
          gsap.to(hudBottom, {
            x: 0,
            opacity: 1,
            duration: 0.65,
            ease: "expo.out",
            delay: 0.55,
          });
        }

        // ============================================================
        // State 3: Ambient Equilibrium (1.25s+)
        // ============================================================

        // Core micro-float (sine.inOut, yoyo, repeat: -1)
        if (isoFloatGroup) {
          gsap.to(isoFloatGroup, {
            y: "-=4",
            duration: 3.5,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: 1.25,
          });
        }

        // Circuit pulse loop - continuous subtle animation
        if (circuitPaths.length > 0) {
          gsap.to(circuitPaths, {
            opacity: 0.6,
            duration: 2.5,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: 1.25,
          });
        }

        // Node pulses - subtle breathing
        if (nodePulses.length > 0) {
          gsap.to(nodePulses, {
            opacity: 1,
            scale: 1.15,
            duration: 2,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: 1.3,
            stagger: 0.1,
            transformOrigin: "center center",
          });
        }

        // ============================================================
        // Conduit Data Beams - Traveling Vector Signal Pulses
        // ============================================================
        // Coordinates for central core and three satellite nodes:
        // Core: (280, 132)
        // SYSTEMS (left): ~(79, 371) - the text position, node is around (115, 318)
        // PRODUCTS (right): ~(365, 371) - the text position, node is around (384, 255)
        // INTELLIGENCE (top): ~(304, 68) - the text position, core top is (280, 64)

        const coreX = 280;
        const coreY = 132;

        // Target positions for pulses (satellite node positions)
        const systemsTarget = { x: 115, y: 318 }; // Left conduit endpoint
        const productsTarget = { x: 384, y: 255 }; // Right conduit endpoint
        const intelligenceTarget = { x: 280, y: 64 }; // Top conduit endpoint

        const pulseConfigs = [
          { pulse: conduitPulses[0], target: systemsTarget, delay: 0, duration: 3.5, color: "var(--rankrise-blue)" },
          { pulse: conduitPulses[1], target: productsTarget, delay: 1.2, duration: 3.8, color: "var(--sky-blue)" },
          { pulse: conduitPulses[2], target: intelligenceTarget, delay: 2.4, duration: 3.2, color: "var(--rankrise-blue)" },
        ];

        pulseConfigs.forEach(({ pulse, target, delay, duration, color }) => {
          if (!pulse) return;

          const pulseTimeline = gsap.timeline({
            repeat: -1,
            delay: 1.25 + delay, // Start after State 2 completes
          });

          pulseTimeline
            // Reset to core position
            .set(pulse, {
              cx: coreX,
              cy: coreY,
              opacity: 0,
              scale: 0.5,
              fill: color,
              force3D: true,
            })
            // Travel outward from core to target
            .to(pulse, {
              cx: target.x,
              cy: target.y,
              opacity: 1,
              scale: 1,
              duration: duration * 0.7,
              ease: "power2.out",
            })
            // Hold briefly at target with glow
            .to(pulse, {
              opacity: 1,
              scale: 1.3,
              duration: 0.2,
              ease: "power2.out",
            })
            // Fade out quickly
            .to(pulse, {
              opacity: 0,
              scale: 0.3,
              duration: duration * 0.3,
              ease: "power2.in",
            });

          // Harmonic pulse glow on the target satellite node when pulse arrives
          // Find the corresponding satellite node
          let targetNode: SVGCircleElement | null = null;
          let targetLabel: SVGTextElement | null = null;

          if (target === systemsTarget) {
            targetNode = satelliteNodes[0] || null; // First satellite node (left)
            targetLabel = satelliteLabels[0] || null; // SYSTEMS label
          } else if (target === productsTarget) {
            targetNode = satelliteNodes[1] || null; // Second satellite node (right)
            targetLabel = satelliteLabels[1] || null; // PRODUCTS label
          } else if (target === intelligenceTarget) {
            targetNode = coreNode; // Top node is the core's top circle
            targetLabel = satelliteLabels[2] || null; // INTELLIGENCE label
          }

          if (targetNode) {
            const nodeTimeline = gsap.timeline({
              repeat: -1,
              delay: 1.25 + delay + duration * 0.7, // Sync with pulse arrival
            });

            nodeTimeline
              .to(targetNode, {
                scale: 1.25,
                opacity: 1,
                duration: 0.35,
                ease: "power2.out",
                transformOrigin: "center center",
              })
              .to(targetNode, {
                scale: 1,
                opacity: 0.7,
                duration: 0.4,
                ease: "power2.inOut",
                transformOrigin: "center center",
              });
          }

          if (targetLabel) {
            const labelTimeline = gsap.timeline({
              repeat: -1,
              delay: 1.25 + delay + duration * 0.7,
            });

            labelTimeline
              .to(targetLabel, {
                scale: 1.1,
                opacity: 1,
                duration: 0.35,
                ease: "power2.out",
                transformOrigin: "center center",
              })
              .to(targetLabel, {
                scale: 1,
                opacity: 1,
                duration: 0.4,
                ease: "power2.inOut",
                transformOrigin: "center center",
              });
          }
        });

        // ============================================================
        // 3D Multi-Plane Pointer Parallax
        // Only on devices with fine pointer (mouse) and hover support
        // ============================================================
        const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

        if (hasFinePointer && isoFloatGroup && hudTop && hudBottom) {
          const visualWrapper = hero.querySelector<HTMLElement>(".hero-visual-wrapper");
          const engineeringVisual = hero.querySelector<HTMLElement>(".engineering-visual");
          const groundPlane = hero.querySelector<HTMLElement>(".engineering-svg"); // Substrate/ground

          if (visualWrapper) {
            // Create quickTo functions for 60fps buttery smooth parallax
            const groundQuickTo = gsap.quickTo(groundPlane, "x", { duration: 0.6, ease: "power3.out" });
            const groundQuickToY = gsap.quickTo(groundPlane, "y", { duration: 0.6, ease: "power3.out" });

            const coreQuickToX = gsap.quickTo(isoFloatGroup, "x", { duration: 0.5, ease: "power3.out" });
            const coreQuickToY = gsap.quickTo(isoFloatGroup, "y", { duration: 0.5, ease: "power3.out" });
            const coreQuickToRotateX = gsap.quickTo(isoFloatGroup, "rotationX", { duration: 0.5, ease: "power3.out" });
            const coreQuickToRotateY = gsap.quickTo(isoFloatGroup, "rotationY", { duration: 0.5, ease: "power3.out" });

            const hudTopQuickToX = gsap.quickTo(hudTop, "x", { duration: 0.4, ease: "power3.out" });
            const hudTopQuickToY = gsap.quickTo(hudTop, "y", { duration: 0.4, ease: "power3.out" });
            const hudTopQuickToRotateZ = gsap.quickTo(hudTop, "rotation", { duration: 0.4, ease: "power3.out" });

            const hudBottomQuickToX = gsap.quickTo(hudBottom, "x", { duration: 0.4, ease: "power3.out" });
            const hudBottomQuickToY = gsap.quickTo(hudBottom, "y", { duration: 0.4, ease: "power3.out" });
            const hudBottomQuickToRotateZ = gsap.quickTo(hudBottom, "rotation", { duration: 0.4, ease: "power3.out" });

            parallaxRef.current.groundQuickTo = groundQuickTo;
            parallaxRef.current.coreQuickTo = coreQuickToX;
            parallaxRef.current.hudTopQuickTo = hudTopQuickToX;
            parallaxRef.current.hudBottomQuickTo = hudBottomQuickToX;

            const handleMouseMove = (e: MouseEvent) => {
              if (!visualWrapper) return;

              const rect = visualWrapper.getBoundingClientRect();
              const centerX = rect.left + rect.width / 2;
              const centerY = rect.top + rect.height / 2;

              // Normalized mouse position (-1 to 1)
              const deltaX = (e.clientX - centerX) / (rect.width / 2);
              const deltaY = (e.clientY - centerY) / (rect.height / 2);

              // Clamp to reasonable bounds
              const clampedX = Math.max(-1, Math.min(1, deltaX));
              const clampedY = Math.max(-1, Math.min(1, deltaY));

              // Ground plane / substrate: subtle anchor translation (±3px, ±2px)
              groundQuickTo(clampedX * 3);
              groundQuickToY(clampedY * 2);

              // Core plane: subtle 3D rotational tilt + translation
              // rotateY: ±5deg, rotateX: ±4deg, x: ±8px
              coreQuickToRotateY(clampedX * 5);
              coreQuickToRotateX(-clampedY * 4); // Invert Y for natural tilt
              coreQuickToX(clampedX * 8);

              // Foreground HUD cards: elevated floating parallax
              // Top card: x: ±16px, y: ±12px, rotateZ: ±1.5deg
              hudTopQuickToX(clampedX * 16);
              hudTopQuickToY(clampedY * 12);
              hudTopQuickToRotateZ(clampedX * 1.5);

              // Bottom card: x: ±16px, y: ±12px, rotateZ: ±1.5deg (opposite rotation for depth)
              hudBottomQuickToX(clampedX * 16);
              hudBottomQuickToY(clampedY * 12);
              hudBottomQuickToRotateZ(-clampedX * 1.5);
            };

            const handlePointerLeave = () => {
              // Smoothly animate all layers back to resting baseline
              gsap.to(groundPlane, { x: 0, y: 0, duration: 0.8, ease: "power2.out" });
              gsap.to(isoFloatGroup, {
                x: 0,
                y: 0,
                rotationX: 0,
                rotationY: 0,
                duration: 0.8,
                ease: "power2.out",
              });
              gsap.to(hudTop, {
                x: 0,
                y: 0,
                rotation: 0,
                duration: 0.8,
                ease: "power2.out",
              });
              gsap.to(hudBottom, {
                x: 0,
                y: 0,
                rotation: 0,
                duration: 0.8,
                ease: "power2.out",
              });
            };

            visualWrapper.addEventListener("mousemove", handleMouseMove);
            visualWrapper.addEventListener("pointerleave", handlePointerLeave);

            // Store cleanup function
            parallaxRef.current.rafId = 0; // Marker that parallax is active
            (parallaxRef.current as any).cleanup = () => {
              visualWrapper.removeEventListener("mousemove", handleMouseMove);
              visualWrapper.removeEventListener("pointerleave", handlePointerLeave);
            };
          }
        }

      }, hero);

      ctxRef.current = ctx;
    });

    return () => {
      // Cleanup parallax event listeners
      if ((parallaxRef.current as any).cleanup) {
        (parallaxRef.current as any).cleanup();
      }
      // Cleanup GSAP context and matchMedia
      if (ctxRef.current) {
        ctxRef.current.revert();
      }
      if (mmRef.current) {
        mmRef.current.revert();
      }
    };
  }, [heroRef]);

  return null;
}