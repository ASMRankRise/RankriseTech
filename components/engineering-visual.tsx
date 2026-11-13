"use client";

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

export function IntelligenceVisual() {
  return (
    <figure className="intelligence-visual">
      <div className="intelligence-figure-top">
        <span className="technical-label">From context to possibility</span>
        <span className="visual-coordinate" aria-hidden="true">AI / EXPLORATION</span>
      </div>
      <div className="ai-showcase-frame">
        <img
          src="/images/showcases/ai-orchestration-ui.jpg"
          alt="AI workflow orchestration and human-in-the-loop reasoning dashboard"
          className="showcase-image ai-showcase-image"
          width={1200}
          height={896}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="intelligence-flow" aria-label="Context to intelligence to action">
        <span>Context</span><span aria-hidden="true">→</span><span>Intelligence</span><span aria-hidden="true">→</span><span>Action</span>
      </div>
      <figcaption>An exploration model, not a confirmed product architecture or delivery commitment.</figcaption>
    </figure>
  );
}
