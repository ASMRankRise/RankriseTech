"use client";

export function EngineeringVisual() {
  return (
    <figure className="engineering-visual">
      <div className="visual-heading" aria-hidden="true">
        <span className="technical-label">A connected perspective</span>
        <span className="visual-coordinate">RR / ENGINEERING</span>
      </div>
      <svg className="engineering-svg" viewBox="0 0 560 470" fill="none" aria-hidden="true" focusable="false">
        <g stroke="var(--soft-blue-grey)" strokeWidth="1">
          <path d="m38 310 242-140 242 140-242 140L38 310Z" fill="var(--cloud-white)" />
          <path d="m86 282 242 140M134 254l242 140M183 226l242 140M231 198l242 140M86 338l242-140M134 366l242-140M183 394l242-140M231 422l242-140" />
          <path d="M280 42v405M38 310h484" strokeDasharray="3 7" className="animated-circuit-path" />
          <path d="M64 87h24M76 75v24M484 87h24M496 75v24M64 412h24M76 400v24M484 412h24M496 400v24" />
        </g>

        {/* Conduit data pulse elements - traveling signal packets */}
        <g className="conduit-pulses" stroke="none" fill="none">
          {/* Pulse: Central core (280,132) → SYSTEMS node (79,371) - left conduit */}
          <circle
            className="conduit-pulse conduit-pulse-systems"
            cx="280"
            cy="132"
            r="4"
            fill="var(--rankrise-blue)"
            opacity="0"
            filter="url(#pulse-glow)"
          />
          {/* Pulse: Central core (280,132) → PRODUCTS node (365,371) - right conduit */}
          <circle
            className="conduit-pulse conduit-pulse-products"
            cx="280"
            cy="132"
            r="4"
            fill="var(--sky-blue)"
            opacity="0"
            filter="url(#pulse-glow)"
          />
          {/* Pulse: Central core (280,132) → INTELLIGENCE node (304,68) - top conduit */}
          <circle
            className="conduit-pulse conduit-pulse-intelligence"
            cx="280"
            cy="132"
            r="4"
            fill="var(--rankrise-blue)"
            opacity="0"
            filter="url(#pulse-glow)"
          />
        </g>

        {/* Glow filter for pulse effects */}
        <defs>
          <filter id="pulse-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g stroke="var(--rankrise-blue)" strokeWidth="1.5" strokeLinejoin="round" className="animated-iso-float">
          <path d="m115 321 77-45 88 51 97-56 65 38" />
          <path d="m166 205 49 28 65-38 104 60" strokeDasharray="4 5" className="animated-circuit-path" />
          <path d="M280 195v132" />
          <path d="m226 297 54-31 54 31-54 31-54-31Z" fill="var(--ice-blue)" />
          <path d="M226 297v34l54 31 54-31v-34l-54 31-54-31Z" fill="var(--pure-white)" />
          <path d="M280 328v34" />
          <path d="m226 252 54-31 54 31-54 31-54-31Z" fill="var(--sky-blue)" />
          <path d="M226 252v30l54 31 54-31v-30l-54 31-54-31Z" fill="var(--ice-blue)" />
          <path d="M280 283v30" />
          <path d="m226 207 54-31 54 31-54 31-54-31Z" fill="var(--rankrise-blue)" />
          <path d="m226 207 54 31v30l-54-31v-30Z" fill="var(--midnight-navy)" />
          <path d="m280 238 54-31v30l-54 31v-30Z" fill="var(--sky-blue)" />
        </g>
        <g stroke="var(--rankrise-blue)" strokeWidth="1.5">
          <ellipse cx="280" cy="132" rx="74" ry="42" />
          <ellipse cx="280" cy="132" rx="48" ry="27" stroke="var(--sky-blue)" />
          <path d="M206 132v29M354 132v29M280 90V64" strokeDasharray="3 5" className="animated-circuit-path" />
          <circle cx="280" cy="132" r="6" fill="var(--rankrise-blue)" className="animated-node-pulse core-node" />
          <circle cx="280" cy="64" r="3" fill="var(--pure-white)" />
        </g>
        <g stroke="var(--rankrise-blue)" strokeWidth="1.3" strokeLinejoin="round">
          <path d="m86 301 29-17 29 17-29 17-29-17Z" fill="var(--ice-blue)" />
          <path d="M86 301v24l29 17 29-17v-24l-29 17-29-17Z" fill="var(--pure-white)" />
          <path d="M115 318v24" />
          <path d="m408 296 29-17 29 17-29 17-29-17Z" fill="var(--sky-blue)" />
          <path d="M408 296v24l29 17 29-17v-24l-29 17-29-17Z" fill="var(--ice-blue)" />
          <path d="M437 313v24" />
          <path d="m143 194 23-13 23 13-23 13-23-13Z" fill="var(--pure-white)" />
          <path d="M143 194v20l23 13 23-13v-20l-23 13-23-13Z" fill="var(--ice-blue)" />
          <path d="M166 207v20" />
          <circle cx="384" cy="255" r="5" fill="var(--pure-white)" className="animated-node-pulse satellite-node" />
        </g>
        <g fill="var(--slate-ink)" fontSize="11" fontFamily="var(--font-inter), sans-serif" letterSpacing="1.5">
          <text x="79" y="371" className="satellite-label systems-label">SYSTEMS</text>
          <text x="365" y="371" className="satellite-label products-label">PRODUCTS</text>
          <text x="304" y="68" className="satellite-label intelligence-label">INTELLIGENCE</text>
        </g>
      </svg>
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
      <svg viewBox="0 0 480 310" fill="none" aria-hidden="true" focusable="false">
        <g stroke="var(--sky-blue)" strokeWidth="1" opacity="0.45">
          <circle cx="240" cy="157" r="122" />
          <circle cx="240" cy="157" r="93" />
          <path d="M37 157h406M240 12v290M83 35l314 244M83 279 397 35" strokeDasharray="3 6" className="animated-circuit-path" />
        </g>
        <g stroke="var(--sky-blue)" strokeWidth="1.5">
          <path d="M111 111h61l34 46M369 111h-61l-34 46M111 216h61l34-59M369 216h-61l-34-59M240 54v52M240 208v52" />
          <path d="m240 106 45 26v50l-45 26-45-26v-50l45-26Z" fill="var(--rankrise-blue)" className="animated-node-pulse" />
          <path d="m195 132 45 26 45-26M240 158v50" stroke="var(--ice-blue)" />
          <circle cx="111" cy="111" r="7" fill="var(--midnight-navy)" className="animated-node-pulse" />
          <circle cx="369" cy="111" r="7" fill="var(--midnight-navy)" className="animated-node-pulse" />
          <circle cx="111" cy="216" r="7" fill="var(--midnight-navy)" className="animated-node-pulse" />
          <circle cx="369" cy="216" r="7" fill="var(--midnight-navy)" className="animated-node-pulse" />
          <circle cx="240" cy="54" r="7" fill="var(--midnight-navy)" className="animated-node-pulse" />
          <circle cx="240" cy="260" r="7" fill="var(--midnight-navy)" className="animated-node-pulse" />
        </g>
      </svg>
      <div className="intelligence-flow" aria-label="Context to intelligence to action">
        <span>Context</span><span aria-hidden="true">→</span><span>Intelligence</span><span aria-hidden="true">→</span><span>Action</span>
      </div>
      <figcaption>An exploration model, not a confirmed product architecture or delivery commitment.</figcaption>
    </figure>
  );
}