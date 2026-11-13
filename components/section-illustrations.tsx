"use client";

import { useId } from "react";

type SvgBaseProps = {
  className?: string;
};

function joinClasses(...parts: Array<string | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/**
 * CapabilitySchematic
 * Crisp architectural micro-diagram for each core capability card.
 * Supports both CORE_CAPABILITIES ids ("ai-machine-learning", "web-application")
 * and short aliases ("ai-ml", "web-app").
 */
export function CapabilitySchematic({ id, className }: { id: string; className?: string }) {
  const uid = useId().replace(/:/g, "");
  const normalized =
    id === "ai-machine-learning"
      ? "ai-ml"
      : id === "web-application"
        ? "web-app"
        : id;

  return (
    <svg
      className={joinClasses("rr-svg-illustration", "rr-capability-schematic", className)}
      data-schematic={normalized}
      viewBox="0 0 120 44"
      width="100%"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {/* Subtle architectural baseline & registration ticks */}
      <g stroke="currentColor" strokeOpacity="0.14" strokeWidth="0.75">
        <path d="M4 22h112" strokeDasharray="2 4" />
        <path d="M4 6h4M4 6v4M116 6h-4M116 6v4M4 38h4M4 38v-4M116 38h-4M116 38v-4" />
      </g>

      {normalized === "custom-software" && (
        <g strokeLinecap="round" strokeLinejoin="round">
          {/* Modular bounded contexts wired to an interface bus */}
          <rect x="12" y="10" width="22" height="24" rx="3" fill="var(--sky-blue)" fillOpacity="0.1" stroke="currentColor" strokeOpacity="0.55" strokeWidth="1.25" />
          <path d="M17 17h12M17 22h8M17 27h10" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.1" />
          <rect x="49" y="8" width="22" height="28" rx="3" fill="var(--rankrise-blue)" fillOpacity="0.14" stroke="var(--sky-blue)" strokeWidth="1.35" />
          <path d="M54 15h12M54 22h12M54 29h7" stroke="var(--sky-blue)" strokeWidth="1.15" />
          <rect x="86" y="10" width="22" height="24" rx="3" fill="var(--sky-blue)" fillOpacity="0.1" stroke="currentColor" strokeOpacity="0.55" strokeWidth="1.25" />
          <path d="M91 17h12M91 22h9M91 27h12" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.1" />
          {/* Inter-service connectors & boundary ports */}
          <path d="M34 22h15M71 22h15" stroke="var(--sky-blue)" strokeWidth="1.3" />
          <rect x="33" y="20" width="3" height="4" rx="0.75" fill="var(--accent-highlight)" />
          <rect x="84" y="20" width="3" height="4" rx="0.75" fill="var(--sky-blue)" />
          <circle cx="60" cy="8" r="2.2" fill="var(--accent-highlight)" />
        </g>
      )}

      {normalized === "ai-ml" && (
        <g strokeLinecap="round" strokeLinejoin="round">
          {/* 3-layer context-to-inference topology */}
          <g stroke="var(--sky-blue)" strokeOpacity="0.6" strokeWidth="1.15">
            <path d="M22 11 56 16M22 22 56 16M22 22 56 28M22 33 56 28M22 11 56 28M22 33 56 16" />
            <path d="M56 16 92 22M56 28 92 22" strokeOpacity="0.85" strokeWidth="1.3" />
          </g>
          {/* Input context nodes */}
          <circle cx="22" cy="11" r="3" fill="var(--sky-blue)" fillOpacity="0.2" stroke="currentColor" strokeOpacity="0.65" strokeWidth="1.2" />
          <circle cx="22" cy="22" r="3" fill="var(--sky-blue)" fillOpacity="0.2" stroke="currentColor" strokeOpacity="0.65" strokeWidth="1.2" />
          <circle cx="22" cy="33" r="3" fill="var(--sky-blue)" fillOpacity="0.2" stroke="currentColor" strokeOpacity="0.65" strokeWidth="1.2" />
          {/* Hidden synthesis nodes */}
          <circle cx="56" cy="16" r="3.6" fill="var(--rankrise-blue)" fillOpacity="0.22" stroke="var(--sky-blue)" strokeWidth="1.3" />
          <circle cx="56" cy="28" r="3.6" fill="var(--rankrise-blue)" fillOpacity="0.22" stroke="var(--sky-blue)" strokeWidth="1.3" />
          {/* Output inference prism */}
          <path d="m92 14 7 8-7 8-7-8 7-8Z" fill="var(--rankrise-blue)" fillOpacity="0.2" stroke="var(--accent-highlight)" strokeWidth="1.4" />
          <circle cx="92" cy="22" r="2.1" fill="var(--accent-highlight)" />
        </g>
      )}

      {normalized === "web-app" && (
        <g strokeLinecap="round" strokeLinejoin="round">
          {/* Abstract layered responsive viewport planes (no fake UI) */}
          <rect x="16" y="8" width="66" height="28" rx="3" fill="var(--sky-blue)" fillOpacity="0.08" stroke="currentColor" strokeOpacity="0.6" strokeWidth="1.25" />
          <path d="M16 15h66M36 15v21" stroke="currentColor" strokeOpacity="0.28" strokeWidth="1" />
          <rect x="42" y="19" width="16" height="12" rx="1.5" fill="var(--rankrise-blue)" fillOpacity="0.16" stroke="var(--sky-blue)" strokeWidth="1.1" />
          <rect x="62" y="19" width="14" height="5" rx="1" fill="var(--sky-blue)" fillOpacity="0.25" />
          <rect x="62" y="27" width="14" height="4" rx="1" fill="currentColor" fillOpacity="0.18" />
          {/* Secondary responsive frame */}
          <rect x="74" y="13" width="30" height="23" rx="3" fill="var(--rankrise-blue)" fillOpacity="0.14" stroke="var(--sky-blue)" strokeWidth="1.3" />
          <path d="M80 20h18M80 25h12M80 30h15" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.15" />
          <circle cx="98" cy="13" r="2.3" fill="var(--accent-highlight)" />
        </g>
      )}

      {normalized === "mobile-app" && (
        <g strokeLinecap="round" strokeLinejoin="round">
          {/* Sleek edge device frame + sync telemetry arcs */}
          <rect x="24" y="6" width="22" height="32" rx="4" fill="var(--sky-blue)" fillOpacity="0.1" stroke="currentColor" strokeOpacity="0.72" strokeWidth="1.3" />
          <path d="M32 10h6M33 34h4" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.2" />
          <rect x="28" y="14" width="14" height="15" rx="1.5" fill="var(--rankrise-blue)" fillOpacity="0.16" stroke="var(--sky-blue)" strokeWidth="1" />
          {/* Concentric wireless/sync propagation */}
          <path d="M56 16a10 10 0 0 1 0 12" stroke="var(--sky-blue)" strokeWidth="1.3" />
          <path d="M63 12a16 16 0 0 1 0 20" stroke="var(--sky-blue)" strokeOpacity="0.65" strokeWidth="1.25" />
          <path d="M70 8a22 22 0 0 1 0 28" stroke="currentColor" strokeOpacity="0.32" strokeWidth="1.15" strokeDasharray="3 3" />
          {/* Cloud edge anchor */}
          <path d="M84 22h11" stroke="var(--accent-highlight)" strokeWidth="1.3" />
          <circle cx="98" cy="22" r="5" fill="var(--rankrise-blue)" fillOpacity="0.18" stroke="var(--accent-highlight)" strokeWidth="1.35" />
          <circle cx="98" cy="22" r="2" fill="var(--accent-highlight)" />
        </g>
      )}

      {normalized === "cloud-devops" && (
        <g strokeLinecap="round" strokeLinejoin="round">
          {/* Pipeline rail passing through staged gates into dual-region cluster */}
          <path d="M12 22h74" stroke="var(--sky-blue)" strokeOpacity="0.65" strokeWidth="1.3" />
          <path d="m22 16 6 6-6 6-6-6 6-6Z" fill="var(--sky-blue)" fillOpacity="0.18" stroke="currentColor" strokeOpacity="0.7" strokeWidth="1.2" />
          <path d="m46 15 7 7-7 7-7-7 7-7Z" fill="var(--rankrise-blue)" fillOpacity="0.22" stroke="var(--sky-blue)" strokeWidth="1.3" />
          <circle cx="68" cy="22" r="4" fill="var(--accent-highlight)" fillOpacity="0.2" stroke="var(--accent-highlight)" strokeWidth="1.35" />
          {/* Dual availability ring */}
          <circle cx="94" cy="22" r="11" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.15" strokeDasharray="3 3" />
          <circle cx="94" cy="22" r="6.5" fill="var(--sky-blue)" fillOpacity="0.14" stroke="var(--sky-blue)" strokeWidth="1.3" />
          <circle cx="94" cy="22" r="2.2" fill="var(--accent-highlight)" />
        </g>
      )}

      {normalized === "digital-transformation" && (
        <g strokeLinecap="round" strokeLinejoin="round">
          {/* Disconnected legacy fragments converging through prism to aligned grid */}
          <rect x="13" y="10" width="10" height="8" rx="1.5" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.15" strokeDasharray="2.5 2" />
          <rect x="17" y="25" width="11" height="8" rx="1.5" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.15" strokeDasharray="2.5 2" />
          <path d="M23 14c12 0 18 8 28 8M28 29c10 0 14-7 23-7" stroke="var(--sky-blue)" strokeOpacity="0.65" strokeWidth="1.2" />
          {/* Transformation prism */}
          <path d="m58 10 9 12-9 12-9-12 9-12Z" fill="var(--rankrise-blue)" fillOpacity="0.18" stroke="var(--accent-highlight)" strokeWidth="1.35" />
          <path d="M67 22h13" stroke="var(--accent-highlight)" strokeWidth="1.35" />
          {/* Unified connected nodes */}
          <rect x="82" y="11" width="9" height="9" rx="2" fill="var(--sky-blue)" fillOpacity="0.22" stroke="var(--sky-blue)" strokeWidth="1.2" />
          <rect x="96" y="11" width="9" height="9" rx="2" fill="var(--sky-blue)" fillOpacity="0.22" stroke="var(--sky-blue)" strokeWidth="1.2" />
          <rect x="82" y="24" width="9" height="9" rx="2" fill="var(--sky-blue)" fillOpacity="0.22" stroke="var(--sky-blue)" strokeWidth="1.2" />
          <rect x="96" y="24" width="9" height="9" rx="2" fill="var(--rankrise-blue)" fillOpacity="0.28" stroke="var(--accent-highlight)" strokeWidth="1.25" />
        </g>
      )}

      {!["custom-software", "ai-ml", "web-app", "mobile-app", "cloud-devops", "digital-transformation"].includes(normalized) && (
        <g stroke="var(--sky-blue)" strokeWidth="1.3">
          <rect x="44" y="10" width="32" height="24" rx="4" fill="var(--sky-blue)" fillOpacity="0.12" />
          <circle cx="60" cy="22" r="4" fill="var(--accent-highlight)" id={uid} />
        </g>
      )}
    </svg>
  );
}

/**
 * ProductMotif
 * Distinct abstract geometric/architectural centerpiece per in-house product.
 * Pure <svg>, zero fake UI screens or metrics.
 */
export function ProductMotif({ id, className }: { id: string; className?: string }) {
  const uid = useId().replace(/:/g, "");
  const gradId = `rr-pm-grad-${uid}`;

  return (
    <svg
      className={joinClasses("rr-svg-illustration", "rr-product-motif", className)}
      data-product-motif={id}
      viewBox="0 0 320 180"
      width="100%"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id={gradId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--sky-blue)" stopOpacity="0.26" />
          <stop offset="65%" stopColor="var(--rankrise-blue)" stopOpacity="0.08" />
          <stop offset="100%" stopColor="var(--rankrise-blue)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Subtle architectural coordinate hairlines */}
      <g stroke="currentColor" strokeOpacity="0.11" strokeWidth="0.85">
        <path d="M16 90h288M160 12v156" strokeDasharray="3 5" />
        <path d="M24 22h10M24 22v10M296 22h-10M296 22v10M24 158h10M24 158v-10M296 158h-10M296 158v-10" />
      </g>

      <circle cx="160" cy="90" r="82" fill={`url(#${gradId})`} />

      {id === "trimarkity" && (
        <g strokeLinecap="round" strokeLinejoin="round">
          {/* Orbital telemetry rings */}
          <ellipse
            cx="160"
            cy="90"
            rx="116"
            ry="42"
            transform="rotate(-14 160 90)"
            stroke="var(--sky-blue)"
            strokeOpacity="0.45"
            strokeWidth="1.2"
          />
          <ellipse
            cx="160"
            cy="90"
            rx="88"
            ry="30"
            transform="rotate(14 160 90)"
            stroke="currentColor"
            strokeOpacity="0.28"
            strokeWidth="1.1"
            strokeDasharray="4 5"
          />
          <circle cx="160" cy="90" r="56" stroke="currentColor" strokeOpacity="0.16" strokeWidth="1" />

          {/* Dispersion vectors */}
          <path d="M60 112 126 95M260 68l-66 17M160 28v30" stroke="var(--sky-blue)" strokeOpacity="0.5" strokeWidth="1.1" />

          {/* Tripartite signal prism */}
          <path d="m160 44 40 68h-80l40-68Z" fill="var(--rankrise-blue)" fillOpacity="0.16" stroke="var(--sky-blue)" strokeWidth="1.6" />
          <path d="M160 44v44l40 24M160 88l-40 24" stroke="var(--sky-blue)" strokeOpacity="0.8" strokeWidth="1.2" />
          <path d="m160 66 17 29h-34l17-29Z" fill="var(--sky-blue)" fillOpacity="0.24" stroke="currentColor" strokeOpacity="0.65" strokeWidth="1.1" />

          {/* Orbital telemetry nodes */}
          <circle cx="58" cy="113" r="4" fill="var(--sky-blue)" fillOpacity="0.25" stroke="var(--sky-blue)" strokeWidth="1.3" />
          <circle cx="262" cy="67" r="4.5" fill="var(--accent-highlight)" fillOpacity="0.22" stroke="var(--accent-highlight)" strokeWidth="1.4" />
          <circle cx="262" cy="67" r="2" fill="var(--accent-highlight)" />
          <circle cx="160" cy="88" r="3.5" fill="var(--accent-highlight)" />
        </g>
      )}

      {id === "1socialsnap" && (
        <g strokeLinecap="round" strokeLinejoin="round">
          {/* Rhythmic cadence grid & aperture framing */}
          <g stroke="currentColor" strokeOpacity="0.2" strokeWidth="1">
            <rect x="52" y="34" width="46" height="32" rx="4" fill="var(--sky-blue)" fillOpacity="0.06" />
            <rect x="108" y="34" width="46" height="32" rx="4" fill="var(--sky-blue)" fillOpacity="0.1" />
            <rect x="166" y="34" width="46" height="32" rx="4" fill="var(--rankrise-blue)" fillOpacity="0.14" stroke="var(--sky-blue)" strokeOpacity="0.6" />
            <rect x="222" y="34" width="46" height="32" rx="4" fill="var(--sky-blue)" fillOpacity="0.06" />

            <rect x="52" y="74" width="46" height="32" rx="4" fill="var(--sky-blue)" fillOpacity="0.09" />
            <rect x="108" y="74" width="46" height="32" rx="4" fill="var(--rankrise-blue)" fillOpacity="0.18" stroke="var(--sky-blue)" strokeWidth="1.4" />
            <rect x="166" y="74" width="46" height="32" rx="4" fill="var(--sky-blue)" fillOpacity="0.08" />
            <rect x="222" y="74" width="46" height="32" rx="4" fill="var(--sky-blue)" fillOpacity="0.1" />

            <rect x="52" y="114" width="46" height="32" rx="4" fill="var(--sky-blue)" fillOpacity="0.05" />
            <rect x="108" y="114" width="46" height="32" rx="4" fill="var(--sky-blue)" fillOpacity="0.08" />
            <rect x="166" y="114" width="46" height="32" rx="4" fill="var(--sky-blue)" fillOpacity="0.09" />
            <rect x="222" y="114" width="46" height="32" rx="4" fill="var(--rankrise-blue)" fillOpacity="0.14" stroke="var(--sky-blue)" strokeOpacity="0.5" />
          </g>

          {/* Synchronized cadence timing wave */}
          <path
            d="M32 104c28-30 56-30 84 0s56 30 84 0 56-30 88 0"
            stroke="var(--sky-blue)"
            strokeWidth="1.6"
          />

          {/* Precision aperture frame locking active cadence node */}
          <path d="M102 82v-14h14M160 82v-14h-14M102 98v14h14M160 98v14h-14" stroke="var(--accent-highlight)" strokeWidth="1.7" />
          <circle cx="131" cy="90" r="4" fill="var(--accent-highlight)" />
          <circle cx="189" cy="50" r="3" fill="var(--sky-blue)" />
          <circle cx="245" cy="130" r="3" fill="var(--sky-blue)" />
        </g>
      )}

      {id === "salesapp" && (
        <g strokeLinecap="round" strokeLinejoin="round">
          {/* Converging trajectory vectors through calibrated stage gates */}
          <g stroke="var(--sky-blue)" strokeWidth="1.35">
            <path d="M36 42C96 42 150 64 252 90" strokeOpacity="0.55" />
            <path d="M36 66C100 66 155 78 252 90" strokeOpacity="0.72" />
            <path d="M36 90h216" stroke="var(--accent-highlight)" strokeWidth="1.65" />
            <path d="M36 114C100 114 155 102 252 90" strokeOpacity="0.72" />
            <path d="M36 138C96 138 150 116 252 90" strokeOpacity="0.55" />
          </g>

          {/* Stage gates */}
          <path d="M104 34v112M164 46v88M218 62v56" stroke="currentColor" strokeOpacity="0.22" strokeWidth="1" strokeDasharray="3 4" />
          <rect x="100" y="61" width="8" height="58" rx="4" fill="var(--sky-blue)" fillOpacity="0.14" stroke="var(--sky-blue)" strokeWidth="1.15" />
          <rect x="160" y="70" width="8" height="40" rx="4" fill="var(--rankrise-blue)" fillOpacity="0.18" stroke="var(--sky-blue)" strokeWidth="1.25" />

          {/* Focal apex diamond & resonance rings */}
          <circle cx="262" cy="90" r="24" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="3 4" />
          <circle cx="262" cy="90" r="15" stroke="var(--sky-blue)" strokeOpacity="0.55" strokeWidth="1.2" />
          <path d="m262 77 13 13-13 13-13-13 13-13Z" fill="var(--rankrise-blue)" fillOpacity="0.25" stroke="var(--accent-highlight)" strokeWidth="1.6" />
          <circle cx="262" cy="90" r="3" fill="var(--accent-highlight)" />

          {/* Source vector origin dots */}
          <circle cx="36" cy="42" r="2.5" fill="var(--sky-blue)" />
          <circle cx="36" cy="66" r="2.5" fill="var(--sky-blue)" />
          <circle cx="36" cy="90" r="3" fill="var(--accent-highlight)" />
          <circle cx="36" cy="114" r="2.5" fill="var(--sky-blue)" />
          <circle cx="36" cy="138" r="2.5" fill="var(--sky-blue)" />
        </g>
      )}

      {id === "hrms" && (
        <g strokeLinecap="round" strokeLinejoin="round">
          {/* Concentric organizational constellation rings */}
          <circle cx="160" cy="90" r="62" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1" strokeDasharray="3 5" />
          <circle cx="160" cy="90" r="38" stroke="var(--sky-blue)" strokeOpacity="0.45" strokeWidth="1.2" />

          {/* Cohesion bonds */}
          <g stroke="var(--sky-blue)" strokeOpacity="0.65" strokeWidth="1.25">
            <path d="M160 90 108 58M160 90 212 58M160 90 96 108M160 90 224 108M160 90v54M160 90V32" />
            <path d="M108 58 160 32 212 58 224 108 160 144 96 108 108 58Z" strokeOpacity="0.35" strokeWidth="1" />
          </g>

          {/* Outer team cluster nodes */}
          <circle cx="160" cy="32" r="6" fill="var(--sky-blue)" fillOpacity="0.2" stroke="var(--sky-blue)" strokeWidth="1.3" />
          <circle cx="108" cy="58" r="7" fill="var(--rankrise-blue)" fillOpacity="0.2" stroke="currentColor" strokeOpacity="0.7" strokeWidth="1.3" />
          <circle cx="212" cy="58" r="7" fill="var(--rankrise-blue)" fillOpacity="0.2" stroke="var(--sky-blue)" strokeWidth="1.35" />
          <circle cx="96" cy="108" r="6.5" fill="var(--sky-blue)" fillOpacity="0.18" stroke="var(--sky-blue)" strokeWidth="1.3" />
          <circle cx="224" cy="108" r="6.5" fill="var(--sky-blue)" fillOpacity="0.18" stroke="currentColor" strokeOpacity="0.7" strokeWidth="1.3" />
          <circle cx="160" cy="144" r="6" fill="var(--sky-blue)" fillOpacity="0.2" stroke="var(--sky-blue)" strokeWidth="1.3" />

          {/* Inner focal hexagon & core beacon */}
          <path d="m160 72 16 9v18l-16 9-16-9V81l16-9Z" fill="var(--rankrise-blue)" fillOpacity="0.24" stroke="var(--accent-highlight)" strokeWidth="1.5" />
          <circle cx="160" cy="90" r="4" fill="var(--accent-highlight)" />
        </g>
      )}
    </svg>
  );
}

/**
 * StackBlueprintVisual
 * Four-stratum isometric architectural stack diagram:
 * Frontend / Runtime / API & Data / Cloud (no vendor logos).
 */
export function StackBlueprintVisual({ className }: SvgBaseProps) {
  const strata = [
    { label: "01 / FRONTEND", y: 48, accent: false },
    { label: "02 / RUNTIME", y: 102, accent: false },
    { label: "03 / API & DATA", y: 156, accent: true },
    { label: "04 / CLOUD", y: 210, accent: false },
  ] as const;

  return (
    <svg
      className={joinClasses("rr-svg-illustration", "rr-stack-blueprint", className)}
      viewBox="0 0 460 280"
      width="100%"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {/* Blueprint reference frame */}
      <g stroke="currentColor" strokeOpacity="0.14" strokeWidth="0.85">
        <path d="M24 24h412M24 256h412" strokeDasharray="3 6" />
        <path d="M170 18v244" strokeDasharray="2 5" />
      </g>

      {/* Vertical telemetry spine conduits piercing all 4 strata */}
      <g stroke="var(--sky-blue)" strokeOpacity="0.55" strokeWidth="1.25">
        <path d="M126 50v172" />
        <path d="M170 36v196" stroke="var(--accent-highlight)" strokeOpacity="0.7" strokeDasharray="4 4" />
        <path d="M214 50v172" />
      </g>

      {strata.map((layer) => (
        <g key={layer.label}>
          {/* Isometric stratum plane */}
          <path
            d={`m66 ${layer.y} 104-32 104 32-104 32-104-32Z`}
            fill={layer.accent ? "var(--rankrise-blue)" : "var(--sky-blue)"}
            fillOpacity={layer.accent ? "0.2" : "0.1"}
            stroke={layer.accent ? "var(--accent-highlight)" : "var(--sky-blue)"}
            strokeWidth={layer.accent ? "1.5" : "1.25"}
            strokeLinejoin="round"
          />
          {/* Subtle stratum edge thickness */}
          <path
            d={`m66 ${layer.y} 104 32 104-32v6l-104 32-104-32v-6Z`}
            fill="currentColor"
            fillOpacity="0.06"
            stroke="currentColor"
            strokeOpacity="0.22"
            strokeWidth="0.9"
            strokeLinejoin="round"
          />
          {/* Internal isometric cross-partitions */}
          <path
            d={`m118 ${layer.y - 16} l104 32 M118 ${layer.y + 16} l104-32`}
            stroke="currentColor"
            strokeOpacity="0.16"
            strokeWidth="0.85"
          />
          {/* Conduit junction node */}
          <circle
            cx="170"
            cy={layer.y}
            r={layer.accent ? "4" : "3"}
            fill={layer.accent ? "var(--accent-highlight)" : "var(--sky-blue)"}
          />
          {/* Callout leader line */}
          <path
            d={`M278 ${layer.y}h40`}
            stroke={layer.accent ? "var(--accent-highlight)" : "currentColor"}
            strokeOpacity={layer.accent ? "0.85" : "0.3"}
            strokeWidth="1.1"
          />
          <circle
            cx="278"
            cy={layer.y}
            r="2"
            fill={layer.accent ? "var(--accent-highlight)" : "var(--sky-blue)"}
          />
          {/* Architectural layer label */}
          <text
            x="328"
            y={layer.y + 3.5}
            fill="currentColor"
            fillOpacity={layer.accent ? "0.95" : "0.72"}
            fontSize="10"
            fontWeight="600"
            fontFamily="var(--font-inter), sans-serif"
            letterSpacing="1.4"
          >
            {layer.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

/**
 * ProcessConduitLine
 * Precision architectural milestone conduit connecting the 6 process stages.
 */
export function ProcessConduitLine({ className }: SvgBaseProps) {
  const milestones = [100, 300, 500, 700, 900, 1100];
  const connectors = [200, 400, 600, 800, 1000];

  return (
    <svg
      className={joinClasses("rr-svg-illustration", "rr-process-conduit", className)}
      viewBox="0 0 1200 40"
      width="100%"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {/* Primary architectural rail */}
      <path d="M40 20h1120" stroke="currentColor" strokeOpacity="0.16" strokeWidth="1" />
      {/* Active telemetry trace */}
      <path
        d="M100 20h1000"
        stroke="var(--sky-blue)"
        strokeOpacity="0.65"
        strokeWidth="1.5"
        strokeDasharray="6 6"
        className="animated-circuit-path"
      />

      {/* Directional stage ticks */}
      {connectors.map((x) => (
        <path
          key={x}
          d={`m${x - 4} 15 5 5-5 5`}
          stroke="var(--sky-blue)"
          strokeOpacity="0.7"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}

      {/* 6 calibrated stage milestone nodes */}
      {milestones.map((x, idx) => {
        const isTerminal = idx === 0 || idx === milestones.length - 1;
        return (
          <g key={x}>
            <circle
              cx={x}
              cy="20"
              r="9"
              fill="var(--rankrise-blue)"
              fillOpacity="0.12"
              stroke={isTerminal ? "var(--accent-highlight)" : "var(--sky-blue)"}
              strokeWidth="1.35"
            />
            <circle
              cx={x}
              cy="20"
              r="3"
              fill={isTerminal ? "var(--accent-highlight)" : "var(--sky-blue)"}
            />
          </g>
        );
      })}
    </svg>
  );
}

/**
 * EditorialSealVisual
 * Bespoke architectural blueprint seal ("evidence") or editorial compass ("insights")
 * replacing generic document icons in #portfolio and #insights.
 */
export function EditorialSealVisual({
  variant,
  className,
}: {
  variant: "evidence" | "insights";
  className?: string;
}) {
  return (
    <svg
      className={joinClasses("rr-svg-illustration", "rr-editorial-seal", className)}
      data-seal-variant={variant}
      viewBox="0 0 88 88"
      width="72"
      height="72"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {/* Outer calibrated ring */}
      <circle cx="44" cy="44" r="38" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="3 4" />
      <circle cx="44" cy="44" r="30" fill="var(--sky-blue)" fillOpacity="0.08" stroke="var(--sky-blue)" strokeWidth="1.3" />
      {/* Precision registration ticks */}
      <path d="M44 2v8M44 78v8M2 44h8M78 44h8" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.15" strokeLinecap="round" />

      {variant === "evidence" ? (
        <g strokeLinecap="round" strokeLinejoin="round">
          {/* Architectural drafting octagon + verification caliper */}
          <path
            d="m44 20 17 7 7 17-7 17-17 7-17-7-7-17 7-17 17-7Z"
            fill="var(--rankrise-blue)"
            fillOpacity="0.14"
            stroke="currentColor"
            strokeOpacity="0.72"
            strokeWidth="1.35"
          />
          <path d="m32 44 8 8 16-16" stroke="var(--accent-highlight)" strokeWidth="2.1" />
          <circle cx="44" cy="20" r="2.2" fill="var(--sky-blue)" />
          <circle cx="44" cy="68" r="2.2" fill="var(--sky-blue)" />
        </g>
      ) : (
        <g strokeLinecap="round" strokeLinejoin="round">
          {/* Editorial compass rose & orbital meridian */}
          <ellipse
            cx="44"
            cy="44"
            rx="24"
            ry="11"
            transform="rotate(-28 44 44)"
            stroke="var(--sky-blue)"
            strokeOpacity="0.65"
            strokeWidth="1.2"
          />
          <path
            d="m44 18 6 20 20 6-20 6-6 20-6-20-20-6 20-6 6-20Z"
            fill="var(--rankrise-blue)"
            fillOpacity="0.18"
            stroke="currentColor"
            strokeOpacity="0.8"
            strokeWidth="1.3"
          />
          <circle cx="44" cy="44" r="4" fill="var(--accent-highlight)" />
          <circle cx="62" cy="26" r="2.3" fill="var(--sky-blue)" />
        </g>
      )}
    </svg>
  );
}

/**
 * FinalCtaField
 * Restrained geometric/orbital coordinate SVG backdrop for #contact.
 * Always pointer-events: none and rendered behind foreground CTA content.
 */
export function FinalCtaField({ className }: SvgBaseProps) {
  const uid = useId().replace(/:/g, "");
  const glowId = `rr-cta-glow-${uid}`;

  return (
    <svg
      className={joinClasses("rr-svg-illustration", "rr-final-cta-field", className)}
      viewBox="0 0 1440 460"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      aria-hidden="true"
      focusable="false"
      style={{ pointerEvents: "none" }}
    >
      <defs>
        <radialGradient id={glowId} cx="78%" cy="48%" r="48%">
          <stop offset="0%" stopColor="#5A9CF0" stopOpacity="0.22" />
          <stop offset="55%" stopColor="#1768D5" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#102B50" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1440" height="460" fill={`url(#${glowId})`} />

      {/* Subtle architectural coordinate grid */}
      <g stroke="#FFFFFF" strokeOpacity="0.07" strokeWidth="1">
        <path d="M0 115h1440M0 230h1440M0 345h1440" />
        <path d="M240 0v460M560 0v460M880 0v460M1160 0v460" />
      </g>

      {/* Concentric orbital coordinate rings centered on right focal axis */}
      <g stroke="#FFFFFF" strokeOpacity="0.14" strokeWidth="1">
        <circle cx="1160" cy="230" r="130" />
        <circle cx="1160" cy="230" r="220" strokeDasharray="5 7" />
        <circle cx="1160" cy="230" r="320" strokeOpacity="0.1" />
        <circle cx="1160" cy="230" r="430" strokeOpacity="0.06" strokeDasharray="3 8" />
      </g>

      {/* Tilted orbital ellipse */}
      <ellipse
        cx="1160"
        cy="230"
        rx="360"
        ry="120"
        transform="rotate(-16 1160 230)"
        stroke="#5A9CF0"
        strokeOpacity="0.26"
        strokeWidth="1.2"
      />

      {/* Precision crosshair markers */}
      <g stroke="#FFFFFF" strokeOpacity="0.24" strokeWidth="1.2" strokeLinecap="round">
        <path d="M233 115h14M240 108v14" />
        <path d="M873 345h14M880 338v14" />
        <path d="M1153 230h14M1160 223v14" />
      </g>

      {/* Restrained orbital signal beacons */}
      <circle cx="940" cy="230" r="3.5" fill="#5A9CF0" fillOpacity="0.7" />
      <circle cx="1290" cy="186" r="4.5" fill="var(--accent-highlight, #FF7043)" fillOpacity="0.85" />
      <circle cx="1078" cy="118" r="3" fill="#FFFFFF" fillOpacity="0.45" />
    </svg>
  );
}
