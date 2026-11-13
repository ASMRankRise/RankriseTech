// Label Slide Button — Originkit
"use client";

import { type Transition, useAnimate, useReducedMotion } from "motion/react";
import type * as React from "react";
import { useEffect, useLayoutEffect, useRef } from "react";

export type Colors = {
	fill?: string;
	textColor?: string;
	hoverFill?: string;
	hoverTextColor?: string;
};

export type IconConfig = {
	type?: "icon" | "symbol" | "image";
	icon?:
		| "arrow"
		| "chevron"
		| "plus"
		| "star"
		| "arrowDiagonal"
		| "check"
		| string
		| React.ReactNode;
	symbol?: React.ReactNode;
	restSymbol?: React.ReactNode;
	hoverSymbol?: React.ReactNode;
	image?: string | { src?: string; srcSet?: string; alt?: string };
	background?: string;
	color?: string;
	hoverBackground?: string;
	hoverColor?: string;
	badgeSize?: number;
	size?: number;
	iconSize?: number;
	padding?: number;
	rounded?: number;
	inset?: number;
	badgeInset?: number;
	direction?: number | string;
	restAngle?: number | string;
	hoverAngle?: number | string;
	angle?: number | string;
	side?: "left" | "right";
	position?: "left" | "right";
};

export interface AnimatedButtonProps {
	label?: React.ReactNode;
	hoverLabel?: React.ReactNode;
	spacerLabel?: React.ReactNode;
	ariaLabel?: string;
	screenReaderLabel?: string;
	font?: React.CSSProperties;
	padding?: string;
	rounded?: number;
	fill?: string;
	textColor?: string;
	colors?: Colors;
	border?: Record<string, unknown> | number;
	icon?: IconConfig;
	arrow?: IconConfig;
	gap?: number;
	link?: string;
	transition?: Transition;
	newTab?: boolean;
	style?: React.CSSProperties;
	className?: string;
	onClick?: React.MouseEventHandler<HTMLElement>;
}

const borderWidthOf = (b: unknown): number => {
	if (!b) return 0;
	if (typeof b === "number") return b;
	const num = (v: unknown) => {
		if (typeof v === "number") return v;
		const parsed = Number.parseFloat(String(v ?? ""));
		return Number.isFinite(parsed) ? parsed : 0;
	};
	if (typeof b === "object" && b !== null) {
		const obj = b as Record<string, unknown>;
		const sides = [
			obj.borderTopWidth,
			obj.borderRightWidth,
			obj.borderBottomWidth,
			obj.borderLeftWidth,
		].filter((v) => v !== undefined && v !== null);
		if (sides.length) return Math.max(...sides.map(num));
		return num(obj.borderWidth);
	}
	return 0;
};

const radiusFromPercent = (w: number, h: number, pct: number) =>
	(Math.min(w, h) / 2) * (Math.max(0, Math.min(100, pct)) / 100);

const useIsoLayoutEffect =
	typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function LabelSlideButton(props: AnimatedButtonProps) {
	const {
		label = "TALK BUSINESS",
		hoverLabel,
		spacerLabel,
		ariaLabel,
		screenReaderLabel,
		font = {
			fontSize: "13px",
			fontWeight: 600,
			letterSpacing: "-0.01em",
		},
		padding = "6px 18px 6px 6px",
		rounded = 100,
		fill: fillProp,
		textColor: textColorProp,
		colors = {
			fill: "var(--cta-bg, #1768d5)",
			textColor: "var(--cta-fg, #ffffff)",
			hoverFill: "var(--cta-hover-bg, #102b50)",
			hoverTextColor: "var(--cta-hover-fg, #ffffff)",
		},
		border,
		icon: iconProps,
		arrow: arrowProps,
		gap = 10,
		link = "",
		transition = {
			ease: [0.16, 1, 0.3, 1],
			type: "tween",
			duration: 0.32,
		} as Transition,
		newTab = false,
		style,
		className,
		onClick,
	} = props;

	const fill = colors?.fill ?? fillProp ?? "#1768d5";
	const textColor = colors?.textColor ?? textColorProp ?? "#ffffff";
	const hoverFill = colors?.hoverFill ?? fill;
	const hoverTextColor = colors?.hoverTextColor ?? textColor;

	const iconObj: IconConfig = iconProps || arrowProps || {};
	const {
		symbol = "↗",
		restSymbol = symbol,
		hoverSymbol = restSymbol,
		background: iconBg = "rgba(255, 255, 255, 0.16)",
		color: iconColor = "#ffffff",
		hoverBackground = iconBg,
		hoverColor = iconColor,
		size = 14,
		padding: iconPadding = 8,
		rounded: iconRounded = 100,
		angle = 0,
		restAngle = angle,
		hoverAngle = typeof iconObj.hoverAngle !== "undefined"
			? iconObj.hoverAngle
			: 45,
		side = "left",
	} = iconObj;

	const [, animate] = useAnimate();
	const rootRef = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);
	const labelUpRef = useRef<HTMLSpanElement>(null);
	const labelDownRef = useRef<HTMLSpanElement>(null);
	const badgeRef = useRef<HTMLSpanElement>(null);
	const hovered = useRef(false);
	const reducedMotion = useReducedMotion();

	const isLeft = side === "left";
	const bWidth = borderWidthOf(border);

	// ResizeObserver for concentric pill radius calculation
	useIsoLayoutEffect(() => {
		const root = rootRef.current;
		if (!root) return;

		const apply = () => {
			const w = root.offsetWidth;
			const h = root.offsetHeight;
			if (!w || !h) return;
			const radius = radiusFromPercent(w, h, rounded);
			root.style.borderRadius = `${radius}px`;
		};

		apply();
		if (typeof ResizeObserver !== "undefined") {
			const ro = new ResizeObserver(apply);
			ro.observe(root);
			return () => ro.disconnect();
		}
	}, [rounded]);

	const opts = () => (reducedMotion ? { duration: 0 } : transition);

	const onEnter = () => {
		hovered.current = true;
		if (rootRef.current) {
			animate(
				rootRef.current,
				{
					backgroundColor: hoverFill,
					color: hoverTextColor,
				},
				opts(),
			);
		}
		if (labelUpRef.current) {
			animate(labelUpRef.current, { y: "-100%", opacity: 0 }, opts());
		}
		if (labelDownRef.current) {
			animate(labelDownRef.current, { y: "0%", opacity: 1 }, opts());
		}
		if (badgeRef.current) {
			animate(
				badgeRef.current,
				{
					rotate: hoverAngle,
					x: 2,
					y: -2,
					backgroundColor: hoverBackground,
					color: hoverColor,
				},
				opts(),
			);
		}
	};

	const onLeave = () => {
		hovered.current = false;
		if (rootRef.current) {
			animate(
				rootRef.current,
				{
					backgroundColor: fill,
					color: textColor,
				},
				opts(),
			);
		}
		if (labelUpRef.current) {
			animate(labelUpRef.current, { y: "0%", opacity: 1 }, opts());
		}
		if (labelDownRef.current) {
			animate(labelDownRef.current, { y: "100%", opacity: 0 }, opts());
		}
		if (badgeRef.current) {
			animate(
				badgeRef.current,
				{
					rotate: restAngle,
					x: 0,
					y: 0,
					backgroundColor: iconBg,
					color: iconColor,
				},
				opts(),
			);
		}
	};

	// Synchronize dynamic background and text color on theme/accent changes when not hovered
	useEffect(() => {
		if (!hovered.current && rootRef.current) {
			rootRef.current.style.backgroundColor = fill;
			rootRef.current.style.color = textColor;
		}
		if (!hovered.current && badgeRef.current) {
			badgeRef.current.style.backgroundColor = iconBg;
			badgeRef.current.style.color = iconColor;
		}
	}, [fill, textColor, iconBg, iconColor]);

	const badgeRadius = `${Math.max(0, Math.min(100, iconRounded))}%`;
	const displayHoverLabel = hoverLabel ?? label;
	const computedSpacer =
		spacerLabel ??
		(typeof label === "string" && typeof displayHoverLabel === "string"
			? label.length >= displayHoverLabel.length
				? label
				: displayHoverLabel
			: displayHoverLabel || label);

	const content = (
		<>
			<span
				ref={badgeRef}
				aria-hidden="true"
				style={{
					display: "inline-flex",
					alignItems: "center",
					justifyContent: "center",
					width: `${size + iconPadding * 2}px`,
					height: `${size + iconPadding * 2}px`,
					minWidth: `${size + iconPadding * 2}px`,
					borderRadius: badgeRadius,
					backgroundColor: iconBg,
					color: iconColor,
					transform: `rotate(${restAngle}deg)`,
					transformOrigin: "center",
					willChange: "transform",
					fontSize: `${size}px`,
					lineHeight: 1,
					pointerEvents: "none",
				}}
			>
				{restSymbol}
			</span>

			<span
				style={{
					position: "relative",
					display: "inline-flex",
					alignItems: "center",
					justifyContent: "center",
					overflow: "hidden",
					lineHeight: "inherit",
				}}
			>
				{/* Invisible spacer defines the exact intrinsic width and height */}
				<span
					aria-hidden="true"
					style={{
						visibility: "hidden",
						pointerEvents: "none",
						userSelect: "none",
						display: "inline-flex",
						alignItems: "center",
						justifyContent: "center",
						whiteSpace: "nowrap",
					}}
				>
					{computedSpacer}
				</span>

				{/* Primary resting label */}
				<span
					ref={labelUpRef}
					style={{
						position: "absolute",
						inset: 0,
						display: "inline-flex",
						alignItems: "center",
						justifyContent: "center",
						whiteSpace: "nowrap",
						willChange: "transform, opacity",
					}}
				>
					{label}
				</span>

				{/* Sliding incoming label */}
				<span
					ref={labelDownRef}
					aria-hidden="true"
					style={{
						position: "absolute",
						inset: 0,
						display: "inline-flex",
						alignItems: "center",
						justifyContent: "center",
						whiteSpace: "nowrap",
						transform: "translateY(100%)",
						opacity: 0,
						willChange: "transform, opacity",
					}}
				>
					{displayHoverLabel}
				</span>
			</span>

			{screenReaderLabel && (
				<span className="sr-only">{screenReaderLabel}</span>
			)}
		</>
	);

	const commonStyle: React.CSSProperties = {
		position: "relative",
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: isLeft ? "row" : "row-reverse",
		padding,
		gap: `${gap}px`,
		backgroundColor: fill,
		color: textColor,
		border:
			typeof border === "object" && border !== null
				? `${bWidth}px ${(border as Record<string, string>).borderStyle || "solid"} ${(border as Record<string, string>).borderColor || "transparent"}`
				: "none",
		cursor: "pointer",
		textDecoration: "none",
		overflow: "hidden",
		boxSizing: "border-box",
		...font,
		...style,
	};

	const computedAriaLabel =
		ariaLabel ?? (typeof label === "string" ? label : undefined);

	if (link) {
		return (
			<a
				ref={rootRef as React.RefObject<HTMLAnchorElement>}
				href={link}
				target={newTab ? "_blank" : undefined}
				rel={newTab ? "noopener noreferrer" : undefined}
				className={className}
				onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
				aria-label={computedAriaLabel}
				onMouseEnter={onEnter}
				onMouseLeave={onLeave}
				onFocus={onEnter}
				onBlur={onLeave}
				style={commonStyle}
			>
				{content}
			</a>
		);
	}

	return (
		<button
			ref={rootRef as React.RefObject<HTMLButtonElement>}
			type="button"
			className={className}
			onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
			aria-label={computedAriaLabel}
			onMouseEnter={onEnter}
			onMouseLeave={onLeave}
			onFocus={onEnter}
			onBlur={onLeave}
			style={commonStyle}
		>
			{content}
		</button>
	);
}

export default LabelSlideButton;
