"use client";

import Image from "next/image";
import { AI_STAGE_MODES } from "@/lib/data/homepage";
import { AiConstellationCanvas } from "./ai-constellation";

export function EngineeringVisual() {
  return (
    <figure className="engineering-visual">
      <div className="visual-heading" aria-hidden="true">
        <span className="technical-label">A connected perspective</span>
        <span className="visual-coordinate">RR / ENGINEERING</span>
      </div>
      <div className="hero-showcase-frame">
        <Image
          src="/images/showcases/hero-command-dashboard.jpg"
          alt="RankRise engineering systems and telemetry command dashboard preview"
          className="showcase-image hero-showcase-image"
          width={1200}
          height={896}
          quality={90}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 55vw, 680px"
          priority
        />
      </div>
      <figcaption>
        <span className="visual-caption-title">Intelligence, engineered.</span>
        <span>A visual expression of connected software, intelligence and products.</span>
      </figcaption>
    </figure>
  );
}

export interface AiExplorationArea {
  readonly title: string;
  readonly description: string;
}

function AiModeSchematic({ modeIndex, isActive }: { modeIndex: number; isActive: boolean }) {
  const accent = isActive ? "var(--accent-highlight, #FF5A2B)" : "#60A5FA";

  switch (modeIndex) {
    case 0:
      return (
        <svg viewBox="0 0 260 112" fill="none" className="ai-schematic-svg">
          <defs>
            <linearGradient id="ai-ml-band" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.06" />
              <stop offset="65%" stopColor="#60A5FA" stopOpacity="0.24" />
              <stop offset="100%" stopColor={accent} stopOpacity="0.26" />
            </linearGradient>
          </defs>
          <path d="M16 92H244" stroke="rgba(148,184,235,0.22)" strokeWidth="1" strokeDasharray="3 4" />
          <path d="M16 60H244" stroke="rgba(148,184,235,0.16)" strokeWidth="1" strokeDasharray="3 4" />
          <path d="M16 28H244" stroke="rgba(148,184,235,0.14)" strokeWidth="1" strokeDasharray="3 4" />
          <path
            d="M16 80 C52 72, 82 48, 118 54 C150 58, 178 32, 224 22 L224 44 C178 52, 150 74, 118 70 C82 66, 52 86, 16 90 Z"
            fill="url(#ai-ml-band)"
          />
          <path
            d="M16 85 C52 79, 82 57, 118 62 C150 66, 178 42, 224 33"
            stroke="#7CB5FA"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M16 74 C56 68, 86 64, 126 48 C160 35, 190 46, 224 33"
            stroke="rgba(201,222,247,0.45)"
            strokeWidth="1.25"
            strokeDasharray="4 3"
          />
          <circle cx="82" cy="60" r="3" fill="#93C5FD" />
          <circle cx="150" cy="57" r="3" fill="#93C5FD" />
          <circle cx="224" cy="33" r="10" fill={accent} fillOpacity="0.2" />
          <circle cx="224" cy="33" r="4.5" fill={accent} stroke="#FFFFFF" strokeWidth="1.5" />
        </svg>
      );
    case 1:
      return (
        <svg viewBox="0 0 260 112" fill="none" className="ai-schematic-svg">
          <rect x="18" y="18" width="54" height="20" rx="4" fill="rgba(90,156,240,0.14)" stroke="rgba(148,184,235,0.42)" />
          <line x1="26" y1="25" x2="58" y2="25" stroke="#93C5FD" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="26" y1="31" x2="48" y2="31" stroke="rgba(201,222,247,0.5)" strokeWidth="1.4" strokeLinecap="round" />

          <rect x="18" y="46" width="54" height="20" rx="4" fill="rgba(90,156,240,0.18)" stroke="rgba(148,184,235,0.5)" />
          <line x1="26" y1="53" x2="62" y2="53" stroke="#93C5FD" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="26" y1="59" x2="52" y2="59" stroke="rgba(201,222,247,0.5)" strokeWidth="1.4" strokeLinecap="round" />

          <rect x="18" y="74" width="54" height="20" rx="4" fill="rgba(90,156,240,0.14)" stroke="rgba(148,184,235,0.42)" />
          <line x1="26" y1="81" x2="56" y2="81" stroke="#93C5FD" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="26" y1="87" x2="46" y2="87" stroke="rgba(201,222,247,0.5)" strokeWidth="1.4" strokeLinecap="round" />

          <path d="M72 28 C110 28, 120 56, 154 56" stroke="#60A5FA" strokeWidth="1.5" strokeDasharray="3 3" />
          <path d="M72 56 L154 56" stroke="#93C5FD" strokeWidth="1.8" />
          <path d="M72 84 C110 84, 120 56, 154 56" stroke="#60A5FA" strokeWidth="1.5" strokeDasharray="3 3" />

          <rect x="122" y="40" width="32" height="32" rx="8" fill="#0B1F3B" stroke="rgba(148,184,235,0.45)" />
          <circle cx="138" cy="56" r="5" fill="#60A5FA" fillOpacity="0.28" stroke="#93C5FD" strokeWidth="1.4" />

          <line x1="154" y1="56" x2="188" y2="56" stroke={accent} strokeWidth="2" />
          <rect x="188" y="34" width="54" height="44" rx="8" fill="rgba(90,156,240,0.16)" stroke={accent} strokeWidth="1.5" />
          <circle cx="203" cy="49" r="4" fill={accent} />
          <line x1="212" y1="49" x2="233" y2="49" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="198" y1="60" x2="232" y2="60" stroke="rgba(201,222,247,0.65)" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="198" y1="67" x2="224" y2="67" stroke="rgba(201,222,247,0.45)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 2:
      return (
        <svg viewBox="0 0 260 112" fill="none" className="ai-schematic-svg">
          <path d="M44 56 H104" stroke="#60A5FA" strokeWidth="1.6" />
          <path d="M156 56 H216" stroke={accent} strokeWidth="1.8" />
          <path d="M130 22 V36" stroke="rgba(148,184,235,0.45)" strokeWidth="1.4" strokeDasharray="2 3" />
          <path d="M130 76 V90" stroke="rgba(148,184,235,0.45)" strokeWidth="1.4" strokeDasharray="2 3" />

          <rect x="20" y="42" width="32" height="28" rx="6" fill="rgba(90,156,240,0.16)" stroke="rgba(148,184,235,0.5)" />
          <circle cx="36" cy="56" r="4.5" fill="#93C5FD" />

          <circle cx="130" cy="18" r="7" fill="rgba(90,156,240,0.2)" stroke="#60A5FA" strokeWidth="1.3" />
          <circle cx="130" cy="94" r="7" fill="rgba(90,156,240,0.2)" stroke="#60A5FA" strokeWidth="1.3" />

          <circle cx="130" cy="56" r="24" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="1.6" strokeDasharray="5 3" />
          <circle cx="130" cy="56" r="14" fill="#0B1F3B" stroke="#FFFFFF" strokeOpacity="0.65" strokeWidth="1.3" />
          <path d="M124 56 L128.5 60.5 L137 51.5" stroke={accent} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />

          <rect x="208" y="42" width="32" height="28" rx="6" fill="rgba(90,156,240,0.18)" stroke={accent} strokeWidth="1.5" />
          <line x1="216" y1="52" x2="232" y2="52" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="216" y1="60" x2="228" y2="60" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 260 112" fill="none" className="ai-schematic-svg">
          <rect x="22" y="20" width="94" height="72" rx="7" fill="rgba(90,156,240,0.08)" stroke="rgba(148,184,235,0.34)" />
          <path d="M32 36 V28 H40 M98 28 H106 V36 M32 76 V84 H40 M98 84 H106 V76" stroke="#93C5FD" strokeWidth="1.6" strokeLinecap="round" />
          <rect x="44" y="38" width="50" height="36" rx="4" fill="rgba(90,156,240,0.18)" stroke="rgba(148,184,235,0.45)" />
          <line x1="26" y1="56" x2="112" y2="56" stroke={accent} strokeWidth="2" />
          <circle cx="69" cy="56" r="6" fill={accent} fillOpacity="0.25" stroke={accent} strokeWidth="1.4" />

          <path d="M116 42 H158" stroke="#60A5FA" strokeWidth="1.5" strokeDasharray="3 3" />
          <path d="M116 56 H158" stroke={accent} strokeWidth="1.8" />
          <path d="M116 70 H158" stroke="#60A5FA" strokeWidth="1.5" strokeDasharray="3 3" />

          <rect x="160" y="24" width="78" height="16" rx="4" fill="rgba(90,156,240,0.16)" stroke="rgba(148,184,235,0.42)" />
          <line x1="170" y1="32" x2="220" y2="32" stroke="#E2EEFD" strokeWidth="1.6" strokeLinecap="round" />

          <rect x="160" y="48" width="78" height="16" rx="4" fill="rgba(90,156,240,0.2)" stroke={accent} strokeWidth="1.4" />
          <circle cx="170" cy="56" r="3" fill={accent} />
          <line x1="179" y1="56" x2="226" y2="56" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />

          <rect x="160" y="72" width="78" height="16" rx="4" fill="rgba(90,156,240,0.14)" stroke="rgba(148,184,235,0.38)" />
          <line x1="170" y1="80" x2="212" y2="80" stroke="#93C5FD" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
  }
}

export function AiCapabilityMatrix({
  areas,
  activeIndex,
  onSelect,
}: {
  areas: readonly AiExplorationArea[];
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="ai-matrix-grid">
      {areas.map((area, index) => {
        const mode = AI_STAGE_MODES[index] ?? AI_STAGE_MODES[0];
        const isActive = index === activeIndex;
        return (
          <button
            key={area.title}
            type="button"
            className={`ai-matrix-card${isActive ? " is-active" : ""}`}
            aria-pressed={isActive}
            onClick={() => onSelect(index)}
            onMouseEnter={() => onSelect(index)}
            onFocus={() => onSelect(index)}
          >
            <div className="ai-matrix-stage">
              <div className="ai-matrix-stage-bar">
                <span className="ai-matrix-code">{mode.code}</span>
                <span className="ai-matrix-status" aria-hidden="true" />
              </div>
              <div className="ai-matrix-schematic" aria-hidden="true">
                <AiModeSchematic modeIndex={index} isActive={isActive} />
              </div>
              <div className="ai-matrix-flow" aria-hidden="true">
                {mode.flow.join(" → ")}
              </div>
            </div>
            <div className="ai-matrix-body">
              <h3>{area.title}</h3>
              <p>{area.description}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export function AiPrincipleCard({ activeIndex }: { activeIndex: number }) {
  const activeMode = AI_STAGE_MODES[activeIndex] ?? AI_STAGE_MODES[0];

  return (
    <div className="ai-principle-card">
      <p className="ai-principle-eyebrow">GUIDING PRINCIPLE</p>
      <h3 className="ai-principle-heading">Start with the context. Keep people in the loop.</h3>
      <p className="ai-principle-copy">
        Explore relevance, data readiness and human judgment before deciding what to build.
      </p>
      <div className="ai-principle-inspector" aria-live="polite">
        <span className="ai-principle-mode-code">{activeMode.code}</span>
        <span className="ai-principle-mode-flow">{activeMode.flow.join(" → ")}</span>
      </div>
      <div className="ai-principle-badges">
        <span className="ai-principle-badge">Approved Pipelines</span>
        <span className="ai-principle-badge">Human Oversight</span>
      </div>
    </div>
  );
}

export function IntelligenceVisual({ activeMode = 0 }: { activeMode?: number }) {
  const mode = AI_STAGE_MODES[activeMode] ?? AI_STAGE_MODES[0];

  return (
    <figure className="intelligence-visual">
      <div className="intelligence-figure-top">
        <span className="technical-label">From context to possibility</span>
        <span className="visual-coordinate" aria-hidden="true">{mode.code}</span>
      </div>
      <div className="ai-showcase-frame ai-constellation-frame">
        <AiConstellationCanvas activeMode={activeMode} />
        <div className="ai-constellation-hud" aria-hidden="true">
          <span>INTERACTIVE NODE TOPOLOGY</span>
          <span>MOVE CURSOR TO CONNECT</span>
        </div>
      </div>
      <div className="intelligence-flow" aria-label="Context to intelligence to action">
        <span>{mode.flow[0]}</span>
        <span aria-hidden="true">→</span>
        <span>{mode.flow[1]}</span>
        <span aria-hidden="true">→</span>
        <span>{mode.flow[2]}</span>
      </div>
      <figcaption>An exploration model, not a confirmed product architecture or delivery commitment.</figcaption>
    </figure>
  );
}
