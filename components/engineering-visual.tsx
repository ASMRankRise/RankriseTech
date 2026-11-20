"use client";

import { AiConstellationCanvas } from "./ai-constellation";

const AI_STAGE_MODES = [
  {
    code: "01 / ML & FORECASTING",
    flow: ["Signals", "Pattern Model", "Decision Support"],
  },
  {
    code: "02 / GENAI & RAG",
    flow: ["Approved Docs", "Retrieval", "Grounded Output"],
  },
  {
    code: "03 / AGENT WORKFLOWS",
    flow: ["Trigger", "Orchestration", "Human Oversight"],
  },
  {
    code: "04 / NLP & VISION",
    flow: ["Text & Frames", "Extraction", "Structured Action"],
  },
] as const;

export function EngineeringVisual() {
  return (
    <figure className="engineering-visual">
      <div className="visual-heading" aria-hidden="true">
        <span className="technical-label">A connected perspective</span>
        <span className="visual-coordinate">RR / ENGINEERING</span>
      </div>
      <div className="hero-showcase-frame">
        <img
          src="/images/showcases/hero-command-dashboard.jpg"
          alt="RankRise engineering systems and telemetry command dashboard preview"
          className="showcase-image hero-showcase-image"
          width={1200}
          height={896}
          loading="eager"
          decoding="async"
        />
      </div>
      <figcaption>
        <span className="visual-caption-title">Intelligence, engineered.</span>
        <span>A visual expression of connected software, intelligence and products.</span>
      </figcaption>
    </figure>
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
