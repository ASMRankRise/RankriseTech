"use client";

import { useRef, useState, type CSSProperties, type MouseEvent, type ReactNode } from "react";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  spotlightColor?: string;
  id?: string;
  role?: string;
  as?: keyof HTMLElementTagNameMap;
  [key: string]: any;
}

export function SpotlightCard({
  children,
  className = "",
  style = {},
  spotlightColor = "rgba(23, 104, 213, 0.06)",
  as: Component = "div",
  ...props
}: SpotlightCardProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const Tag = Component as any;

  return (
    <Tag
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`spotlight-card relative overflow-hidden ${className}`.trim()}
      style={{
        ...style,
        "--spotlight-x": `${position.x}px`,
        "--spotlight-y": `${position.y}px`,
      } as CSSProperties}
      {...props}
    >
      {/* Subtle interactive spotlight glow layer */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(500px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
        }}
        aria-hidden="true"
      />
      {children}
    </Tag>
  );
}
