"use client";

import { useEffect, useRef } from "react";

export interface AiConstellationProps {
  activeMode: number;
}

interface Node3D {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  radius: number;
  hub: boolean;
}

const ACCENT_HEX: Record<string, { primary: string; secondary: string }> = {
  vermilion: { primary: "#FF5A2B", secondary: "#5A9CF0" },
  volt: { primary: "#C8FF00", secondary: "#5A9CF0" },
  amber: { primary: "#FFB800", secondary: "#5A9CF0" },
  crimson: { primary: "#F43F5E", secondary: "#5A9CF0" },
  emerald: { primary: "#00E599", secondary: "#5A9CF0" },
  blue: { primary: "#5A9CF0", secondary: "#93C5FD" },
};

function createNodes(count: number): Node3D[] {
  const nodes: Node3D[] = [];
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const spread = 0.35 + ((i * 37) % 100) / 155;
    nodes.push({
      x: Math.cos(angle * 2.3) * spread,
      y: Math.sin(angle * 1.7) * spread * 0.78,
      z: (((i * 53) % 100) / 50 - 1) * 0.65,
      vx: (((i * 17) % 100) / 100 - 0.5) * 0.0014,
      vy: (((i * 29) % 100) / 100 - 0.5) * 0.0014,
      vz: (((i * 43) % 100) / 100 - 0.5) * 0.0011,
      radius: i % 7 === 0 ? 3.4 : 1.7 + (i % 3) * 0.55,
      hub: i % 7 === 0,
    });
  }
  return nodes;
}

export function AiConstellationCanvas({ activeMode }: AiConstellationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const modeRef = useRef<number>(activeMode);
  modeRef.current = activeMode;

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas || typeof window === "undefined") return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let accentColors = ACCENT_HEX.vermilion;
    const syncAccent = () => {
      const accent = document.documentElement.dataset.accent || "vermilion";
      accentColors = ACCENT_HEX[accent] ?? ACCENT_HEX.vermilion;
    };
    syncAccent();

    const observer =
      typeof MutationObserver !== "undefined"
        ? new MutationObserver(syncAccent)
        : null;
    observer?.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-accent", "data-theme"],
    });

    const nodes = createNodes(42);
    const pointer = { x: 0, y: 0, tx: 0, ty: 0, active: false };
    let width = 560;
    let height = 340;
    let rafId = 0;
    let tick = 0;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = Math.max(280, Math.round(rect.width) || 560);
      height = Math.max(220, Math.round(rect.height) || 340);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(resize) : null;
    ro?.observe(container);

    const onPointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      pointer.tx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.ty = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      pointer.active = true;
    };
    const onPointerLeave = () => {
      pointer.tx = 0;
      pointer.ty = 0;
      pointer.active = false;
    };

    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerleave", onPointerLeave);

    const drawFrame = () => {
      tick += 0.016;
      const mode = modeRef.current;

      pointer.x += (pointer.tx - pointer.x) * 0.08;
      pointer.y += (pointer.ty - pointer.y) * 0.08;

      const rotY = pointer.x * 0.38 + (reducedMotion ? 0 : tick * (0.14 + mode * 0.03));
      const rotX = -pointer.y * 0.26 + Math.sin(tick * 0.4) * 0.08;
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      ctx.clearRect(0, 0, width, height);

      // Subtle radial glow centered in the stage
      const grad = ctx.createRadialGradient(
        width * (0.5 + pointer.x * 0.14),
        height * (0.5 + pointer.y * 0.14),
        12,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.65
      );
      grad.addColorStop(0, "rgba(90, 156, 240, 0.16)");
      grad.addColorStop(0.55, "rgba(23, 104, 213, 0.05)");
      grad.addColorStop(1, "rgba(7, 19, 38, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      const projected: { sx: number; sy: number; depth: number; r: number; hub: boolean }[] = [];
      const scale = Math.min(width, height) * 0.58;

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        if (!reducedMotion) {
          n.x += n.vx * (1 + mode * 0.15);
          n.y += n.vy * (1 + mode * 0.15);
          n.z += n.vz;
          if (Math.abs(n.x) > 0.92) n.vx *= -1;
          if (Math.abs(n.y) > 0.78) n.vy *= -1;
          if (Math.abs(n.z) > 0.78) n.vz *= -1;
        }

        // Rotate in 3D
        const x1 = n.x * cosY - n.z * sinY;
        const z1 = n.z * cosY + n.x * sinY;
        const y2 = n.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + n.y * sinX;

        const perspective = 2.1 / (2.5 - z2);
        const sx = width * 0.5 + x1 * scale * perspective;
        const sy = height * 0.5 + y2 * scale * perspective;
        const depth = Math.max(0.25, Math.min(1, (z2 + 1) / 2));

        projected.push({
          sx,
          sy,
          depth,
          r: n.radius * perspective * 0.9,
          hub: n.hub || i % 9 === mode,
        });
      }

      const maxDist = Math.min(width, height) * (0.28 + mode * 0.02);

      // Connect nearby 3D nodes
      ctx.lineWidth = 1;
      for (let i = 0; i < projected.length; i++) {
        const a = projected[i];
        for (let j = i + 1; j < projected.length; j++) {
          const b = projected[j];
          const dx = a.sx - b.sx;
          const dy = a.sy - b.sy;
          const dist = Math.hypot(dx, dy);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.34 * ((a.depth + b.depth) * 0.5);
            ctx.strokeStyle =
              a.hub && b.hub
                ? `${accentColors.primary}${Math.round(Math.min(0.65, alpha * 1.8) * 255)
                    .toString(16)
                    .padStart(2, "0")}`
                : `rgba(148, 184, 235, ${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(a.sx, a.sy);
            ctx.lineTo(b.sx, b.sy);
            ctx.stroke();
          }
        }
      }

      // Connect pointer as an active node when hovering
      if (pointer.active) {
        const px = ((pointer.x + 1) * 0.5) * width;
        const py = ((pointer.y + 1) * 0.5) * height;
        const pointerReach = maxDist * 1.35;

        for (let i = 0; i < projected.length; i++) {
          const a = projected[i];
          const dist = Math.hypot(a.sx - px, a.sy - py);
          if (dist < pointerReach) {
            const alpha = (1 - dist / pointerReach) * 0.65;
            ctx.strokeStyle = accentColors.primary;
            ctx.globalAlpha = alpha;
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(a.sx, a.sy);
            ctx.stroke();
          }
        }
        ctx.globalAlpha = 1;
        ctx.fillStyle = accentColors.primary;
        ctx.beginPath();
        ctx.arc(px, py, 3.6, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw projected nodes
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        ctx.globalAlpha = 0.35 + p.depth * 0.65;
        ctx.fillStyle = p.hub ? accentColors.primary : accentColors.secondary;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, p.r, 0, Math.PI * 2);
        ctx.fill();

        if (p.hub) {
          ctx.globalAlpha = 0.22 * p.depth;
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, p.r * 2.4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;

      if (!reducedMotion) {
        rafId = requestAnimationFrame(drawFrame);
      }
    };

    drawFrame();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      ro?.disconnect();
      observer?.disconnect();
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className="ai-constellation-stage" aria-hidden="true">
      <canvas ref={canvasRef} className="ai-constellation-canvas" />
    </div>
  );
}
