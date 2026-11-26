"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Globe, { type ProjectedGlobeLocation } from "./originkit-globe";
import { GLOBE_COUNTRIES, CountryFlag, projectCountryPills } from "./globe-countries";
import styles from "./global-hero.module.css";
import { StageBackdrop } from "./Hands";
import ArrowRevealButton from "./arrow-reveal-button";

function smoothstep(edge0: number, edge1: number, x: number): number {
	const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
	return t * t * (3 - 2 * t);
}

/* Stable prop identities: the globe re-runs its scene effect when these change. */
const GLOBE_DOTS_DARK = { color: "#ffffff", size: 5, density: 8, allDots: false };
const GLOBE_DOTS_LIGHT = { color: "#1768d5", size: 5, density: 8, allDots: false };

// Once the hero entrance has run in this browser session, return SPA navigations
// back to "/" settle immediately instead of replaying the 1.8s staggered reveal.
let hasPlayedHeroEntrance = false;

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

/**
 * Global Hero — brand-blue atmospheric reference composition.
 *
 * - Layered blue stage layout inspired by heroreference.png
 * - Full-size photographic hands cupping the interactive network globe
 * - Cinematic globe expansion and arriving scene elements from sides/top/bottom
 * - Cursor-driven horizontal globe parallax plus a subtle scroll drift
 * - Truthful RankRise copy, honest inquiry integration and a light/dark stage
 *
 * Navigation intentionally lives in the shared SiteHeader component.
 */
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

export function GlobalHero({
	onOpenInquiry,
}: {
	onOpenInquiry: (context?: string) => void;
}) {
	const heroRef = useRef<HTMLElement>(null);
	const [lightMode, setLightMode] = useState(() =>
		hasPlayedHeroEntrance ? readClientHeroTheme().lightMode : true
	);
	const [accent, setAccent] = useState<string>(() =>
		hasPlayedHeroEntrance ? readClientHeroTheme().accent : "vermilion"
	);
	const [reducedMotion, setReducedMotion] = useState(false);
	const [hasLoaded, setHasLoaded] = useState(() => hasPlayedHeroEntrance);
	const [animationComplete, setAnimationComplete] = useState(() => hasPlayedHeroEntrance);
	const [refract, setRefract] = useState(false);

	const pillRefs = useRef<Record<string, HTMLDivElement | null>>({});
	const skipEntranceRef = useRef(hasPlayedHeroEntrance);
	const reducedMotionRef = useRef(false);
	const mountTimeRef = useRef(0);

	useEffect(() => {
		mountTimeRef.current = performance.now();
	}, []);

	useEffect(() => {
		setRefract(supportsRefraction());
	}, []);

	useEffect(() => {
		const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
		const sync = () => {
			reducedMotionRef.current = mediaQuery.matches;
			setReducedMotion(mediaQuery.matches);
		};
		sync();
		mediaQuery.addEventListener("change", sync);
		return () => mediaQuery.removeEventListener("change", sync);
	}, []);

	useEffect(() => {
		const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
		if (mediaQuery.matches || hasPlayedHeroEntrance) {
			hasPlayedHeroEntrance = true;
			setHasLoaded(true);
			setAnimationComplete(true);
			return;
		}

		// Double rAF guarantees the initial offscreen/hidden state paints first
		// so CSS entrance transitions on the glass cards and stage elements fire.
		let frameId1 = 0;
		let frameId2 = 0;
		frameId1 = window.requestAnimationFrame(() => {
			frameId2 = window.requestAnimationFrame(() => {
				hasPlayedHeroEntrance = true;
				setHasLoaded(true);
			});
		});

		const timer = setTimeout(() => {
			hasPlayedHeroEntrance = true;
			setAnimationComplete(true);
		}, 1800);

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
		// Expose the hero tone to the shared header so its glass adapts too.
		document.documentElement.dataset.heroTheme = lightMode ? "light" : "dark";
		return () => {
			delete document.documentElement.dataset.heroTheme;
		};
	}, [lightMode]);

	// Scroll drift keeps the artwork alive as the page moves.
	useEffect(() => {
		const root = heroRef.current;
		if (!root) return;
		const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
		let frameId = 0;
		let lastP1 = Number.NaN;
		let lastP2 = Number.NaN;
		let lastP3 = Number.NaN;
		const updateParallax = () => {
			frameId = 0;
			const scroll = mediaQuery.matches ? 0 : window.scrollY;
			const p1 = Math.max(-58, -scroll * 0.13);
			const p2 = Math.max(-34, -scroll * 0.075);
			const p3 = Math.max(-22, -scroll * 0.045);
			if (p1 !== lastP1) {
				lastP1 = p1;
				root.style.setProperty("--hero-parallax", `${p1}px`);
			}
			if (p2 !== lastP2) {
				lastP2 = p2;
				root.style.setProperty("--hero-hands-parallax", `${p2}px`);
			}
			if (p3 !== lastP3) {
				lastP3 = p3;
				root.style.setProperty("--hero-cards-parallax", `${p3}px`);
			}
		};
		const handleScroll = () => {
			if (!frameId) frameId = window.requestAnimationFrame(updateParallax);
		};
		window.addEventListener("scroll", handleScroll, { passive: true });
		mediaQuery.addEventListener("change", updateParallax);
		updateParallax();
		return () => {
			window.removeEventListener("scroll", handleScroll);
			mediaQuery.removeEventListener("change", updateParallax);
			if (frameId) window.cancelAnimationFrame(frameId);
			root.style.removeProperty("--hero-parallax");
			root.style.removeProperty("--hero-hands-parallax");
			root.style.removeProperty("--hero-cards-parallax");
		};
	}, []);

	// The globe follows the cursor horizontally (with a gentle vertical echo).
	// Values are damped so the movement reads as depth, not a pointer-follow toy.
	useEffect(() => {
		const root = heroRef.current;
		if (!root) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

		let targetX = 0;
		let targetY = 0;
		let currentX = 0;
		let currentY = 0;
		let frameId = 0;

		const render = () => {
			const dx = targetX - currentX;
			const dy = targetY - currentY;
			if (Math.abs(dx) < 0.04 && Math.abs(dy) < 0.04) {
				currentX = targetX;
				currentY = targetY;
				root.style.setProperty("--globe-cursor-x", `${currentX.toFixed(2)}px`);
				root.style.setProperty("--globe-cursor-y", `${currentY.toFixed(2)}px`);
				frameId = 0;
				return;
			}
			currentX += dx * 0.085;
			currentY += dy * 0.085;
			root.style.setProperty("--globe-cursor-x", `${currentX.toFixed(2)}px`);
			root.style.setProperty("--globe-cursor-y", `${currentY.toFixed(2)}px`);
			frameId = window.requestAnimationFrame(render);
		};

		const handlePointerMove = (event: PointerEvent) => {
			if (event.pointerType === "touch") return;
			const horizontal = event.clientX / window.innerWidth - 0.5;
			const vertical = event.clientY / window.innerHeight - 0.5;
			targetX = horizontal * 44;
			targetY = vertical * 16;
			if (!frameId) frameId = window.requestAnimationFrame(render);
		};

		const handlePointerLeave = () => {
			targetX = 0;
			targetY = 0;
			if (!frameId) frameId = window.requestAnimationFrame(render);
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

	const handleProjectLocations = useCallback(
		(projected: ProjectedGlobeLocation[], viewport: { width: number; height: number }) => {
			const entranceAlpha =
				skipEntranceRef.current || reducedMotionRef.current
					? 1
					: smoothstep(
							0,
							1,
							(performance.now() - mountTimeRef.current - 380) / 550
					  );
			projectCountryPills(projected, viewport, pillRefs.current, entranceAlpha);
		},
		[]
	);

	return (
		<section
			ref={heroRef}
			id="home"
			className={`${styles.heroSection}${lightMode ? ` ${styles.lightMode}` : ""}${
				hasLoaded ? ` ${styles.sceneLoaded}` : ""
			}${animationComplete ? ` ${styles.animationComplete}` : ""}`}
			data-section="hero"
			data-refract={refract ? "on" : "off"}
			aria-labelledby="hero-heading"
			style={
				{
					"--accent-highlight": modeConfig.markerColor,
					"--accent-marker-tint": modeConfig.markerTint,
				} as React.CSSProperties
			}
		>
			<div className={styles.heroFrame}>
				<StageBackdrop />

				<div className={styles.globeLayer} data-globe-layer>
					{/* Hero reference: sphere centre sits ~53% down the stage, not centred. */}
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
							locationAnchors={GLOBE_COUNTRIES}
							onProjectLocations={handleProjectLocations}
						/>
					</div>
				</div>

				<div className={styles.countryLabelsLayer} data-country-labels aria-hidden="true">
					<div className={styles.countryLabelsStage}>
						{GLOBE_COUNTRIES.map((country) => (
							<div
								key={country.id}
								ref={(el) => {
									pillRefs.current[country.id] = el;
								}}
								className={styles.countryGlassPill}
								data-country={country.id}
							>
								<span className={styles.countryName}>{country.name}</span>
								<span className={styles.countryFlag}>
									<CountryFlag code={country.id} />
								</span>
							</div>
						))}
					</div>
				</div>

				<div className={styles.heroContent}>
					<div
						className={`${styles.heroCopyWrapper} ${
							hasLoaded ? styles.copyLoaded : styles.copyInitial
						}`}
					>
						<h1 id="hero-heading" className={styles.headline}>
							<span className={styles.headlineLine}>Building Intelligent Software</span>{" "}
							<span className={`${styles.headlineLine} ${styles.headlineHighlight}`}>
								<svg
									viewBox="0 0 400 70"
									preserveAspectRatio="none"
									className={styles.handHighlighter}
									aria-hidden="true"
								>
									<path
										className={styles.handHighlighterBase}
										d="M 10 18 C 68 10, 152 13, 238 11 C 312 9, 368 12, 395 16 L 389 56 C 325 60, 240 56, 156 59 C 88 61, 32 58, 5 53 Z"
										fill="var(--accent-highlight, #FF4F1F)"
									/>
									<path
										className={styles.handHighlighterPass}
										d="M 16 24 C 95 17, 210 21, 304 18 C 348 17, 376 19, 391 22 L 386 49 C 310 53, 195 49, 102 52 C 52 53, 24 51, 11 47 Z"
										fill="var(--accent-highlight, #FF4F1F)"
									/>
								</svg>
								<span className={styles.headlineHighlightText}>
									for a Smarter Digital World.
								</span>
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

						<p className={styles.description}>
							We engineer custom software, AI-powered solutions and scalable digital
							products that help businesses innovate, automate and grow.
						</p>
					</div>

					<div
						className={`${styles.ctaWrapper} ${
							hasLoaded ? styles.ctaLoaded : styles.ctaInitial
						}`}
						onClick={() => onOpenInquiry("Start a Project")}
					>
						<ArrowRevealButton
							label="Start a Project"
							padding="6px 22px 6px 6px"
							gap={12}
							rounded={100}
							colors={{
								fill: modeConfig.fill,
								textColor: modeConfig.textColor,
							}}
							border={{
								borderColor: modeConfig.borderColor,
								borderStyle: "solid",
								borderWidth: 1,
								borderTopWidth: 1,
								borderLeftWidth: 1,
								borderRightWidth: 1,
								borderBottomWidth: 1,
							}}
							font={{
								fontSize: "0.92rem",
								fontWeight: 600,
								letterSpacing: "-0.01em",
							}}
							icon={{
								side: "left",
								size: 16,
								type: "icon",
								icon: "arrow",
								color: modeConfig.iconColor,
								padding: 11,
								rounded: 100,
								restAngle: 0,
								hoverAngle: 0,
								background: modeConfig.iconBg,
							}}
						/>
					</div>
				</div>

			<svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
				<filter id="hero-glass-refract" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
					<feTurbulence type="fractalNoise" baseFrequency="0.006 0.02" numOctaves="2" seed="7" result="noise" />
					<feGaussianBlur in="noise" stdDeviation="2" result="soft" />
					<feDisplacementMap in="SourceGraphic" in2="soft" scale="60" xChannelSelector="R" yChannelSelector="G" />
				</filter>
			</svg>

			<div className={styles.cardsContainer}>
					<div
						className={`${styles.glassCard} ${styles.glassCardLeft} ${
							hasLoaded ? styles.cardLeftLoaded : styles.cardLeftInitial
						}`}
					>
						<div className={styles.glassCardBody}>
							<p className={styles.glassCardTitle}>AI-Powered Solutions</p>
							<p className={styles.glassCardDesc}>
								Custom software, intelligent automation, and scalable cloud
								architectures.
							</p>
						</div>
					</div>

					<div
						className={`${styles.glassCard} ${styles.glassCardRight} ${
							hasLoaded ? styles.cardRightLoaded : styles.cardRightInitial
						}`}
					>
						<div className={styles.glassCardBody}>
							<p className={styles.glassCardTitle}>In-House Products</p>
							<p className={styles.glassCardDesc}>
								TriMarkity, 1SocialSnap, SalesApp, and HRMS enterprise suite.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default GlobalHero;
