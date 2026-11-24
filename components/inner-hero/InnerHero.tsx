"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { SitePage } from "@/lib/site-content";
import { SITE_IDENTITY } from "@/lib/site-content";
import { LabelSlideButton } from "../label-slide-button";
import { Icon } from "../icon";
import Globe from "../global-hero/originkit-globe";
import styles from "./inner-hero.module.css";

const GLOBE_DOTS_DARK = { color: "#ffffff", size: 5, density: 8, allDots: false };
const GLOBE_DOTS_LIGHT = { color: "#1768d5", size: 5, density: 8, allDots: false };

let hasPlayedInnerEntrance = false;

function readClientHeroTheme(): { lightMode: boolean; accent: string } {
	try {
		const stored =
			window.localStorage.getItem("rankrise-theme") ||
			window.localStorage.getItem("rankrise-global-hero-theme") ||
			document.documentElement.dataset.theme;
		const storedAccent =
			window.localStorage.getItem("rankrise-accent") ||
			document.documentElement.dataset.accent;
		return {
			lightMode: stored !== "dark",
			accent: storedAccent || "vermilion",
		};
	} catch {
		return { lightMode: true, accent: "vermilion" };
	}
}

function supportsRefraction() {
	if (typeof window === "undefined" || typeof CSS === "undefined") return false;
	const ua = navigator.userAgent;
	return (
		/Chrome\/|Chromium\/|Edg\//.test(ua) &&
		!/Firefox\//.test(ua) &&
		!!(CSS as unknown as { supports?: (prop: string, val: string) => boolean }).supports?.(
			"backdrop-filter",
			"url(#a)"
		)
	);
}

const ACCENT_HERO_CONFIG: Record<
	string,
	{
		light: {
			fill: string;
			textColor: string;
			borderColor: string;
			iconBg: string;
			iconColor: string;
			markerColor: string;
			markerTint: string;
		};
		dark: {
			fill: string;
			textColor: string;
			borderColor: string;
			iconBg: string;
			iconColor: string;
			markerColor: string;
			markerTint: string;
		};
	}
> = {
	vermilion: {
		light: {
			fill: "#FF4F1F",
			textColor: "#FFFFFF",
			borderColor: "rgba(255, 79, 31, 0.45)",
			iconBg: "#CC3307",
			iconColor: "#FFFFFF",
			markerColor: "#FF4F1F",
			markerTint: "rgba(255, 79, 31, 0.13)",
		},
		dark: {
			fill: "#FF5A2B",
			textColor: "#FFFFFF",
			borderColor: "rgba(255, 122, 82, 0.55)",
			iconBg: "#C43810",
			iconColor: "#FFFFFF",
			markerColor: "#FF7A52",
			markerTint: "rgba(255, 122, 82, 0.16)",
		},
	},
	volt: {
		light: {
			fill: "#C8FF00",
			textColor: "#1A2E05",
			borderColor: "rgba(163, 217, 0, 0.4)",
			iconBg: "#A3D900",
			iconColor: "#1A2E05",
			markerColor: "#8AB800",
			markerTint: "rgba(200, 255, 0, 0.18)",
		},
		dark: {
			fill: "#C8FF00",
			textColor: "#0E1A00",
			borderColor: "rgba(200, 255, 0, 0.6)",
			iconBg: "#99CC00",
			iconColor: "#0E1A00",
			markerColor: "#C8FF00",
			markerTint: "rgba(200, 255, 0, 0.16)",
		},
	},
	amber: {
		light: {
			fill: "#FFB800",
			textColor: "#261A00",
			borderColor: "rgba(212, 149, 0, 0.4)",
			iconBg: "#D49500",
			iconColor: "#FFFFFF",
			markerColor: "#FFB800",
			markerTint: "rgba(255, 184, 0, 0.15)",
		},
		dark: {
			fill: "#FFB800",
			textColor: "#1F1400",
			borderColor: "rgba(255, 201, 51, 0.55)",
			iconBg: "#CC8800",
			iconColor: "#FFFFFF",
			markerColor: "#FFC933",
			markerTint: "rgba(255, 184, 0, 0.18)",
		},
	},
	crimson: {
		light: {
			fill: "#E11D48",
			textColor: "#FFFFFF",
			borderColor: "rgba(225, 29, 72, 0.45)",
			iconBg: "#9F1239",
			iconColor: "#FFFFFF",
			markerColor: "#E11D48",
			markerTint: "rgba(225, 29, 72, 0.12)",
		},
		dark: {
			fill: "#F43F5E",
			textColor: "#FFFFFF",
			borderColor: "rgba(251, 113, 133, 0.55)",
			iconBg: "#BE123C",
			iconColor: "#FFFFFF",
			markerColor: "#FB7185",
			markerTint: "rgba(251, 113, 133, 0.16)",
		},
	},
	emerald: {
		light: {
			fill: "#00E599",
			textColor: "#013320",
			borderColor: "rgba(0, 179, 119, 0.4)",
			iconBg: "#00B377",
			iconColor: "#013320",
			markerColor: "#059669",
			markerTint: "rgba(0, 229, 153, 0.14)",
		},
		dark: {
			fill: "#00E599",
			textColor: "#002919",
			borderColor: "rgba(0, 229, 153, 0.55)",
			iconBg: "#00A36C",
			iconColor: "#002919",
			markerColor: "#00E599",
			markerTint: "rgba(0, 229, 153, 0.16)",
		},
	},
	blue: {
		light: {
			fill: "#1768D5",
			textColor: "#FFFFFF",
			borderColor: "rgba(23, 104, 213, 0.35)",
			iconBg: "#0F4FA8",
			iconColor: "#FFFFFF",
			markerColor: "#1768D5",
			markerTint: "rgba(23, 104, 213, 0.12)",
		},
		dark: {
			fill: "#3B82F6",
			textColor: "#FFFFFF",
			borderColor: "rgba(59, 130, 246, 0.45)",
			iconBg: "#1D4ED8",
			iconColor: "#FFFFFF",
			markerColor: "#3B82F6",
			markerTint: "rgba(59, 130, 246, 0.16)",
		},
	},
};

const ABOUT_PROOF_CARDS = [
	{
		label: "01 · Dual Entities",
		title: "One Brand, Two Entities",
		desc: `${SITE_IDENTITY.legalIndia} (India) & ${SITE_IDENTITY.legalUs} (US).`,
	},
	{
		label: "02 · Leadership",
		title: "Founder-Led Architecture",
		desc: `${SITE_IDENTITY.leadership.join(" & ")} across engineering, operations and global delivery.`,
	},
	{
		label: "03 · In-House Suite",
		title: "4 Owned Platforms",
		desc: "TriMarkity, 1SocialSnap, SalesApp, and HRMS — built and operated in-house.",
	},
] as const;

const SEGMENT_MAP: Record<string, string> = {
	"1socialsnap": "1SocialSnap",
	trimarkity: "TriMarkity",
	salesapp: "SalesApp",
	hrms: "HRMS",
};

const WORD_MAP: Record<string, string> = {
	Ai: "AI",
	Erp: "ERP",
	Crm: "CRM",
	Api: "API",
	Smes: "SMEs",
	Edtech: "EdTech",
	Saas: "SaaS",
};

function formatSegment(seg: string): string {
	return (
		SEGMENT_MAP[seg.toLowerCase()] ??
		seg
			.replace(/-/g, " ")
			.replace(/\b\w/g, (c) => c.toUpperCase())
			.replace(/\b(Ai|Erp|Crm|Api|Smes|Edtech|Saas)\b/g, (m) => WORD_MAP[m] ?? m)
	);
}

export function InnerHero({ page }: { page: SitePage }) {
	const heroRef = useRef<HTMLElement>(null);
	const [lightMode, setLightMode] = useState(() =>
		hasPlayedInnerEntrance ? readClientHeroTheme().lightMode : true
	);
	const [accent, setAccent] = useState<string>(() =>
		hasPlayedInnerEntrance ? readClientHeroTheme().accent : "vermilion"
	);
	const [hasLoaded, setHasLoaded] = useState(() => hasPlayedInnerEntrance);
	const [animationComplete, setAnimationComplete] = useState(() => hasPlayedInnerEntrance);
	const [refract, setRefract] = useState(false);
	const [reducedMotion, setReducedMotion] = useState(false);

	useEffect(() => {
		setRefract(supportsRefraction());
		if (typeof window.matchMedia !== "function") return;
		const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
		const sync = () => setReducedMotion(mediaQuery.matches);
		sync();
		mediaQuery.addEventListener("change", sync);
		return () => mediaQuery.removeEventListener("change", sync);
	}, []);

	useEffect(() => {
		const mediaQuery =
			typeof window.matchMedia === "function"
				? window.matchMedia("(prefers-reduced-motion: reduce)")
				: null;
		if (mediaQuery?.matches || hasPlayedInnerEntrance) {
			hasPlayedInnerEntrance = true;
			setHasLoaded(true);
			setAnimationComplete(true);
			return;
		}

		let frameId1 = 0;
		let frameId2 = 0;
		frameId1 = window.requestAnimationFrame(() => {
			frameId2 = window.requestAnimationFrame(() => {
				hasPlayedInnerEntrance = true;
				setHasLoaded(true);
			});
		});

		const timer = setTimeout(() => {
			hasPlayedInnerEntrance = true;
			setAnimationComplete(true);
		}, 1400);

		return () => {
			window.cancelAnimationFrame(frameId1);
			window.cancelAnimationFrame(frameId2);
			clearTimeout(timer);
		};
	}, []);

	useEffect(() => {
		try {
			const stored =
				window.localStorage.getItem("rankrise-theme") ||
				window.localStorage.getItem("rankrise-global-hero-theme") ||
				document.documentElement.dataset.theme;
			if (stored === "dark") setLightMode(false);
			else setLightMode(true);

			const storedAccent =
				window.localStorage.getItem("rankrise-accent") ||
				document.documentElement.dataset.accent;
			if (storedAccent) setAccent(storedAccent);
		} catch {}

		const handleThemeChange = (e: Event) => {
			const customEvent = e as CustomEvent<{
				theme?: "light" | "dark";
				accent?: string;
			}>;
			if (customEvent.detail?.theme) {
				setLightMode(customEvent.detail.theme === "light");
			}
			if (customEvent.detail?.accent) {
				setAccent(customEvent.detail.accent);
			}
		};

		window.addEventListener("rankrise-theme-change", handleThemeChange);
		return () => window.removeEventListener("rankrise-theme-change", handleThemeChange);
	}, []);

	useEffect(() => {
		document.documentElement.dataset.heroTheme = lightMode ? "light" : "dark";
		return () => {
			delete document.documentElement.dataset.heroTheme;
		};
	}, [lightMode]);

	useEffect(() => {
		const root = heroRef.current;
		if (!root) return;
		const mediaQuery =
			typeof window.matchMedia === "function"
				? window.matchMedia("(prefers-reduced-motion: reduce)")
				: null;
		let frameId = 0;
		const updateParallax = () => {
			frameId = 0;
			const scroll = mediaQuery?.matches ? 0 : window.scrollY;
			root.style.setProperty("--inner-parallax", `${Math.max(-58, -scroll * 0.13)}px`);
			root.style.setProperty("--inner-cards-parallax", `${Math.max(-18, -scroll * 0.04)}px`);
		};
		const handleScroll = () => {
			if (!frameId) frameId = window.requestAnimationFrame(updateParallax);
		};
		window.addEventListener("scroll", handleScroll, { passive: true });
		mediaQuery?.addEventListener("change", updateParallax);
		updateParallax();
		return () => {
			window.removeEventListener("scroll", handleScroll);
			mediaQuery?.removeEventListener("change", updateParallax);
			if (frameId) window.cancelAnimationFrame(frameId);
			root.style.removeProperty("--inner-parallax");
			root.style.removeProperty("--inner-cards-parallax");
		};
	}, []);

	useEffect(() => {
		const root = heroRef.current;
		if (!root) return;
		const mediaQuery =
			typeof window.matchMedia === "function"
				? window.matchMedia("(prefers-reduced-motion: reduce)")
				: null;
		if (mediaQuery?.matches) return;

		let targetX = 0;
		let targetY = 0;
		let currentX = 0;
		let currentY = 0;
		let frameId = 0;

		const render = () => {
			currentX += (targetX - currentX) * 0.08;
			currentY += (targetY - currentY) * 0.08;
			root.style.setProperty("--globe-cursor-x", `${currentX.toFixed(2)}px`);
			root.style.setProperty("--globe-cursor-y", `${currentY.toFixed(2)}px`);
			frameId = window.requestAnimationFrame(render);
		};

		const handlePointerMove = (event: PointerEvent) => {
			if (event.pointerType !== "mouse") return;
			const horizontal = event.clientX / window.innerWidth - 0.5;
			const vertical = event.clientY / window.innerHeight - 0.5;
			targetX = horizontal * 44;
			targetY = vertical * 16;
		};

		const handlePointerLeave = () => {
			targetX = 0;
			targetY = 0;
		};

		root.addEventListener("pointermove", handlePointerMove);
		root.addEventListener("pointerleave", handlePointerLeave);
		frameId = window.requestAnimationFrame(render);

		return () => {
			root.removeEventListener("pointermove", handlePointerMove);
			root.removeEventListener("pointerleave", handlePointerLeave);
			window.cancelAnimationFrame(frameId);
			root.style.removeProperty("--globe-cursor-x");
			root.style.removeProperty("--globe-cursor-y");
		};
	}, []);

	const heroAccent = ACCENT_HERO_CONFIG[accent] || ACCENT_HERO_CONFIG.vermilion;
	const modeConfig = lightMode ? heroAccent.light : heroAccent.dark;
	const globeMarkerConfig = useMemo(
		() => ({ markers: [], color: modeConfig.markerColor, size: 40 }),
		[modeConfig.markerColor]
	);

	const segments = page.slug ? page.slug.split("/").filter(Boolean) : [];
	const words = page.h1.trim().split(/\s+/);
	const hasSplitH1 = words.length >= 3;
	const leadWords = hasSplitH1 ? words.slice(0, -2).join(" ") : "";
	const highlightWords = hasSplitH1 ? words.slice(-2).join(" ") : page.h1;

	const cards =
		page.slug === "about"
			? ABOUT_PROOF_CARDS
			: (page.sections || []).slice(0, 3).map((section, idx) => ({
					label: String(idx + 1).padStart(2, "0"),
					title: section.heading,
					desc: section.body.split("\n")[0] || "",
				}));

	const eyebrowText =
		page.slug === "about"
			? `${page.eyebrow || "ABOUT"} · EST. ${SITE_IDENTITY.established}`
			: page.eyebrow || "RankRise Technologies";

	return (
		<section
			ref={heroRef}
			id="inner-hero"
			className={`${styles.heroSection}${lightMode ? ` ${styles.lightMode}` : ""}${
				hasLoaded ? ` ${styles.sceneLoaded}` : ""
			}${animationComplete ? ` ${styles.animationComplete}` : ""}`}
			data-section="inner-hero"
			data-refract={refract ? "on" : "off"}
			aria-labelledby="inner-hero-heading"
			style={
				{
					"--accent-highlight": modeConfig.markerColor,
					"--accent-marker-tint": modeConfig.markerTint,
				} as React.CSSProperties
			}
		>
			<svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
				<filter id="inner-glass-refract" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
					<feTurbulence type="fractalNoise" baseFrequency="0.006 0.02" numOctaves="2" seed="7" result="noise" />
					<feGaussianBlur in="noise" stdDeviation="2" result="soft" />
					<feDisplacementMap in="SourceGraphic" in2="soft" scale="60" xChannelSelector="R" yChannelSelector="G" />
				</filter>
			</svg>

			<div className={styles.heroFrame}>
				<div className={styles.edgeVignette} aria-hidden="true" />

				<div className={styles.globeLayer} data-globe-layer aria-hidden="true">
					<div
						className={`${styles.globeScaleWrapper} ${
							hasLoaded ? styles.globeScaleLoaded : styles.globeScaleInitial
						}`}
					>
						<Globe
							speed={reducedMotion ? 0 : 2}
							scale={6.7}
							dots={lightMode ? GLOBE_DOTS_LIGHT : GLOBE_DOTS_DARK}
							oceanColor={
								lightMode
									? "rgba(240, 248, 255, 0.35)"
									: "rgba(6, 23, 47, 0.25)"
							}
							outlineColor={
								lightMode
									? accent === "blue"
										? "#1768d5"
										: modeConfig.markerColor
									: "#aee0fd"
							}
							markerConfig={globeMarkerConfig}
							showGrid={false}
							style={{ transform: "translateY(21%)" }}
						/>
					</div>
				</div>

				{/* Upper Center Content */}
				<div className={styles.heroContent}>
					{segments.length > 0 && (
						<nav className={styles.breadcrumb} aria-label="Breadcrumbs">
							<Link href="/">Home</Link>
							<span className={styles.breadcrumbSep} aria-hidden="true">
								/
							</span>
							{segments.map((seg, idx) => {
								const isLast = idx === segments.length - 1;
								const href = `/${segments.slice(0, idx + 1).join("/")}`;
								const label = formatSegment(seg);
								return (
									<span key={href} className={styles.breadcrumbItem}>
										{isLast ? (
											<span className={styles.breadcrumbCurrent} aria-current="page">
												{label}
											</span>
										) : (
											<>
												<Link href={href}>{label}</Link>
												<span className={styles.breadcrumbSep} aria-hidden="true">
													/
												</span>
											</>
										)}
									</span>
								);
							})}
						</nav>
					)}

					<p className={styles.eyebrow}>{eyebrowText}</p>

					<div
						className={`${styles.heroCopyWrapper} ${
							hasLoaded ? styles.copyLoaded : styles.copyInitial
						}`}
					>
						<h1 id="inner-hero-heading" className={styles.headline}>
							{hasSplitH1 && (
								<>
									<span className={styles.headlineLine}>{leadWords}</span>{" "}
								</>
							)}
							<span className={`${styles.headlineLine} ${styles.headlineHighlight}`}>
								<span className={styles.headlineHighlightText}>{highlightWords}</span>
								<svg
									viewBox="0 0 400 24"
									preserveAspectRatio="none"
									className={styles.handDrawnUnderline}
									aria-hidden="true"
								>
									<path
										d="M 4 14 Q 100 4, 200 13 T 396 11 Q 280 18, 160 17 T 8 19"
										stroke="var(--accent-highlight, currentColor)"
										strokeWidth="3"
										strokeLinecap="round"
										strokeLinejoin="round"
										fill="none"
										opacity="0.9"
									/>
								</svg>
							</span>
						</h1>

						<p className={styles.description}>{page.lead}</p>
					</div>

					{(page.cta || page.secondaryCta) && (
						<div
							className={`${styles.ctaWrapper} ${
								hasLoaded ? styles.ctaLoaded : styles.ctaInitial
							}`}
						>
							{page.cta && (
								<LabelSlideButton
									label={page.cta.label}
									hoverLabel={page.cta.external ? "Open platform" : "Start a conversation"}
									spacerLabel={
										page.cta.label.length > 20 ? page.cta.label : "Start a conversation"
									}
									link={page.cta.href}
									newTab={Boolean(page.cta.external)}
									padding="6px 22px 6px 6px"
									gap={14}
									rounded={100}
									colors={{
										fill: modeConfig.fill,
										textColor: modeConfig.textColor,
										hoverFill: modeConfig.fill,
										hoverTextColor: modeConfig.textColor,
									}}
									icon={{
										side: "left",
										size: 16,
										padding: 11,
										rounded: 100,
										type: "symbol",
										restSymbol: (
											<Icon
												name={page.cta.external ? "arrow-up-right" : "arrow-right"}
												width="16"
												height="16"
											/>
										),
										hoverSymbol: (
											<Icon
												name={page.cta.external ? "arrow-up-right" : "arrow-right"}
												width="16"
												height="16"
											/>
										),
										restAngle: 0,
										hoverAngle: 0,
										background: modeConfig.iconBg,
										color: modeConfig.iconColor,
										hoverBackground: modeConfig.iconBg,
										hoverColor: modeConfig.iconColor,
									}}
									font={{
										fontSize: "0.92rem",
										fontWeight: 600,
										letterSpacing: "-0.01em",
									}}
									border={{
										borderColor: modeConfig.borderColor,
										borderStyle: "solid",
										borderWidth: 1,
									}}
								/>
							)}

							{page.secondaryCta &&
								(page.secondaryCta.external ? (
									<a
										href={page.secondaryCta.href}
										target="_blank"
										rel="noreferrer"
										className={styles.secondaryCta}
									>
										<span>{page.secondaryCta.label}</span>
										<Icon name="arrow-up-right" width="15" height="15" />
									</a>
								) : (
									<Link href={page.secondaryCta.href} className={styles.secondaryCta}>
										<span>{page.secondaryCta.label}</span>
										<Icon name="arrow-right" width="15" height="15" />
									</Link>
								))}
						</div>
					)}
				</div>

				{/* Floating Nimbus Liquid Glass Callouts */}
				{cards.length > 0 && (
					<div className={styles.cardsContainer} data-count={cards.length}>
						{cards.map((card, idx) => {
							const slotClass =
								idx === 0
									? styles.cardSlot0
									: idx === 1
										? styles.cardSlot1
										: styles.cardSlot2;
							const initialClass =
								idx === 1 ? styles.cardInitialRight : styles.cardInitialLeft;
							return (
								<article
									key={card.label}
									className={`${styles.glassCard} ${slotClass} ${
										hasLoaded ? styles.cardLoaded : initialClass
									}`}
								>
									<span className={styles.glassCardEyebrow}>{card.label}</span>
									<p className={styles.glassCardTitle}>{card.title}</p>
									<p className={styles.glassCardDesc}>{card.desc}</p>
								</article>
							);
						})}
					</div>
				)}
			</div>
		</section>
	);
}

export default InnerHero;
