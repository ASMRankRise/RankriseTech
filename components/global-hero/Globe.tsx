"use client";

import styles from "./global-hero.module.css";

interface GlobeProps {
  className?: string;
  size?: number;
}

/**
 * Static Wireframe Network Globe component
 *
 * Faithfully mirrors the reference composition: an interconnected, glowing
 * 3D wireframe constellation globe with latitude/longitude rings, network
 * vertices, and global enterprise delivery hubs.
 *
 * Corrected from the previous flawed implementation which rendered a literal
 * door key from misinterpreting "globe is key" (essential/foundational).
 *
 * Built with pure accessible SVG using RankRise brand blue palette tokens.
 */
export function Globe({ className = "", size = 360 }: GlobeProps) {
  // Constellation network nodes projected onto sphere surface (r = 135)
  // Projected (x, y) coordinates on a 360x360 viewBox centered at (180, 180)
  const nodes = [
    { id: "na-w", x: 105, y: 155, r: 3.5, label: "North America", hub: true },
    { id: "na-e", x: 145, y: 140, r: 3 },
    { id: "na-s", x: 130, y: 185, r: 2.5 },
    { id: "uk", x: 188, y: 122, r: 3.5, label: "United Kingdom", hub: true },
    { id: "eu-c", x: 215, y: 138, r: 3, label: "Europe", hub: true },
    { id: "eu-s", x: 205, y: 165, r: 2.5 },
    { id: "me", x: 235, y: 175, r: 3 },
    { id: "in", x: 258, y: 195, r: 3.5, label: "Asia Hub", hub: true },
    { id: "ea", x: 285, y: 165, r: 3 },
    { id: "ap", x: 275, y: 220, r: 2.5 },
    { id: "sa-n", x: 140, y: 225, r: 3 },
    { id: "sa-s", x: 155, y: 260, r: 2.5 },
    { id: "af-w", x: 185, y: 205, r: 2.5 },
    { id: "af-e", x: 220, y: 225, r: 2.5 },
    { id: "arc", x: 180, y: 65, r: 2 },
    { id: "ant", x: 180, y: 300, r: 2 },
    // Intermediate mesh points
    { id: "m1", x: 120, y: 115, r: 2 },
    { id: "m2", x: 160, y: 100, r: 2 },
    { id: "m3", x: 240, y: 110, r: 2 },
    { id: "m4", x: 260, y: 135, r: 2 },
    { id: "m5", x: 165, y: 165, r: 2 },
    { id: "m6", x: 175, y: 245, r: 2 },
    { id: "m7", x: 245, y: 255, r: 2 },
    { id: "m8", x: 95, y: 195, r: 2 },
    { id: "m9", x: 110, y: 235, r: 2 },
    { id: "m10", x: 295, y: 195, r: 2 },
  ];

  // Interconnecting constellation edges
  const edges: [string, string][] = [
    ["na-w", "na-e"],
    ["na-w", "na-s"],
    ["na-w", "m1"],
    ["na-w", "m8"],
    ["na-e", "uk"],
    ["na-e", "m2"],
    ["na-e", "m5"],
    ["na-s", "sa-n"],
    ["na-s", "m5"],
    ["m8", "m9"],
    ["m9", "sa-n"],
    ["sa-n", "sa-s"],
    ["sa-n", "af-w"],
    ["uk", "eu-c"],
    ["uk", "m2"],
    ["uk", "arc"],
    ["m2", "arc"],
    ["eu-c", "eu-s"],
    ["eu-c", "m3"],
    ["eu-c", "m4"],
    ["m3", "m4"],
    ["m3", "arc"],
    ["m4", "ea"],
    ["eu-s", "me"],
    ["eu-s", "af-w"],
    ["me", "in"],
    ["me", "af-e"],
    ["in", "ea"],
    ["in", "ap"],
    ["ea", "m10"],
    ["m10", "ap"],
    ["af-w", "af-e"],
    ["af-w", "m6"],
    ["af-e", "m7"],
    ["m6", "ant"],
    ["m7", "ant"],
    ["sa-s", "ant"],
    ["ap", "m7"],
    ["m5", "af-w"],
    ["m5", "eu-s"],
  ];

  const nodeMap = new Map(nodes.map((n) => [n.id, n]));

  return (
    <svg
      className={`${styles.globe} ${className}`}
      width={size}
      height={size}
      viewBox="0 0 360 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Worldwide wireframe network globe representing global software engineering and delivery capability"
    >
      <defs>
        {/* Core sphere radial gradient — elegant white/blue illumination */}
        <radialGradient id="globeCoreGlow" cx="45%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="35%" stopColor="#E0F2FE" stopOpacity="0.75" />
          <stop offset="70%" stopColor="#BAE6FD" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#0284C7" stopOpacity="0.08" />
        </radialGradient>

        {/* Atmosphere outer rim glow */}
        <radialGradient id="atmoGlow" cx="50%" cy="50%" r="50%">
          <stop offset="75%" stopColor="#38BDF8" stopOpacity="0" />
          <stop offset="92%" stopColor="#0284C7" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#0066CC" stopOpacity="0.45" />
        </radialGradient>

        {/* Node pulse glow filter */}
        <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Atmospheric outer glow */}
        <filter id="haloGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Atmospheric outer aura */}
      <circle
        cx="180"
        cy="180"
        r="142"
        fill="none"
        stroke="#38BDF8"
        strokeWidth="1.5"
        strokeOpacity="0.3"
        filter="url(#haloGlow)"
      />

      {/* Outer boundary sphere ring */}
      <circle
        cx="180"
        cy="180"
        r="135"
        fill="url(#globeCoreGlow)"
        stroke="#0284C7"
        strokeWidth="1.2"
        strokeOpacity="0.5"
      />
      <circle
        cx="180"
        cy="180"
        r="135"
        fill="url(#atmoGlow)"
      />

      {/* Latitude Rings (perspective tilted 15 degrees) */}
      <g stroke="#0284C7" strokeOpacity="0.22" strokeWidth="0.8" fill="none">
        {/* Equator */}
        <ellipse cx="180" cy="180" rx="135" ry="38" transform="rotate(-8 180 180)" />
        {/* Tropic of Cancer / North latitudes */}
        <ellipse cx="180" cy="135" rx="122" ry="32" transform="rotate(-8 180 135)" />
        <ellipse cx="180" cy="98" rx="98" ry="24" transform="rotate(-8 180 98)" />
        <ellipse cx="180" cy="68" rx="64" ry="16" transform="rotate(-8 180 68)" />
        {/* Tropic of Capricorn / South latitudes */}
        <ellipse cx="180" cy="225" rx="122" ry="32" transform="rotate(-8 180 225)" />
        <ellipse cx="180" cy="262" rx="98" ry="24" transform="rotate(-8 180 262)" />
        <ellipse cx="180" cy="292" rx="64" ry="16" transform="rotate(-8 180 292)" />
      </g>

      {/* Longitude Arcs */}
      <g stroke="#0284C7" strokeOpacity="0.18" strokeWidth="0.8" fill="none">
        {/* Prime meridian and secondary meridians */}
        <ellipse cx="180" cy="180" rx="36" ry="135" transform="rotate(8 180 180)" />
        <ellipse cx="180" cy="180" rx="75" ry="135" transform="rotate(8 180 180)" />
        <ellipse cx="180" cy="180" rx="112" ry="135" transform="rotate(8 180 180)" />
        {/* Central vertical axis */}
        <line x1="180" y1="45" x2="180" y2="315" stroke="#0066CC" strokeOpacity="0.12" strokeDasharray="3 3" />
      </g>

      {/* Constellation Network Mesh Edges */}
      <g stroke="#0284C7" strokeOpacity="0.45" strokeWidth="1.1">
        {edges.map(([fromId, toId], idx) => {
          const from = nodeMap.get(fromId);
          const to = nodeMap.get(toId);
          if (!from || !to) return null;
          return (
            <line
              key={`edge-${idx}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              strokeOpacity={idx % 3 === 0 ? "0.65" : "0.35"}
              stroke="#0284C7"
            />
          );
        })}
      </g>

      {/* Constellation Network Mesh Nodes */}
      <g filter="url(#nodeGlow)">
        {nodes.map((node) => {
          const isHub = !!node.hub;
          return (
            <g key={node.id}>
              {/* Outer pulse ring for major hubs */}
              {isHub && (
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.r * 2.2}
                  fill="#38BDF8"
                  fillOpacity="0.2"
                />
              )}
              {/* Node core */}
              <circle
                cx={node.x}
                cy={node.y}
                r={node.r}
                fill={isHub ? "#FFFFFF" : "#38BDF8"}
                stroke="#0066CC"
                strokeWidth={isHub ? "1.5" : "0.8"}
              />
            </g>
          );
        })}
      </g>

      {/* Global Hub Badges — styled like reference cards */}
      <g fontSize="10" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="500">
        {/* North America badge */}
        <g transform="translate(48, 140)">
          <rect
            x="0"
            y="0"
            width="82"
            height="20"
            rx="10"
            fill="#FFFFFF"
            fillOpacity="0.9"
            stroke="#0284C7"
            strokeWidth="0.8"
            filter="drop-shadow(0 2px 4px rgba(2, 132, 199, 0.15))"
          />
          <circle cx="10" cy="10" r="3" fill="#0066CC" />
          <text x="18" y="13.5" fill="#0A2540">
            N. America
          </text>
        </g>

        {/* United Kingdom badge */}
        <g transform="translate(192, 105)">
          <rect
            x="0"
            y="0"
            width="80"
            height="20"
            rx="10"
            fill="#FFFFFF"
            fillOpacity="0.9"
            stroke="#0284C7"
            strokeWidth="0.8"
            filter="drop-shadow(0 2px 4px rgba(2, 132, 199, 0.15))"
          />
          <circle cx="10" cy="10" r="3" fill="#0066CC" />
          <text x="18" y="13.5" fill="#0A2540">
            United Kingdom
          </text>
        </g>

        {/* Europe Hub badge */}
        <g transform="translate(225, 142)">
          <rect
            x="0"
            y="0"
            width="62"
            height="20"
            rx="10"
            fill="#FFFFFF"
            fillOpacity="0.9"
            stroke="#0284C7"
            strokeWidth="0.8"
            filter="drop-shadow(0 2px 4px rgba(2, 132, 199, 0.15))"
          />
          <circle cx="10" cy="10" r="3" fill="#0066CC" />
          <text x="18" y="13.5" fill="#0A2540">
            Europe
          </text>
        </g>

        {/* Asia Pacific badge */}
        <g transform="translate(230, 235)">
          <rect
            x="0"
            y="0"
            width="72"
            height="20"
            rx="10"
            fill="#FFFFFF"
            fillOpacity="0.9"
            stroke="#0284C7"
            strokeWidth="0.8"
            filter="drop-shadow(0 2px 4px rgba(2, 132, 199, 0.15))"
          />
          <circle cx="10" cy="10" r="3" fill="#0066CC" />
          <text x="18" y="13.5" fill="#0A2540">
            Asia Hub
          </text>
        </g>
      </g>
    </svg>
  );
}

export default Globe;
