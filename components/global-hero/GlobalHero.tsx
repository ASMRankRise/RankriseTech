"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Globe } from "./Globe";
import styles from "./global-hero.module.css";
import { StageBackdrop } from "./Hands";

// Browser-only glass layer: its displacement and backdrop filters need the DOM.
// Keeping it out of SSR also avoids hydration warnings on the floating cards.
const LiquidGlass = dynamic(() => import("liquid-glass-react"), { ssr: false });

/**
 * Global Hero — brand-blue atmospheric reference composition.
 *
 * - Layered blue stage layout inspired by heroreference.png
 * - Full-size photographic hands cupping the interactive network globe
 * - Cursor-driven horizontal globe parallax plus a subtle scroll drift
 * - Truthful RankRise copy, honest inquiry integration and a light/dark stage
 *
 * Navigation intentionally lives in the shared SiteHeader component.
 */
export function GlobalHero({
	onOpenInquiry,
}: {
	onOpenInquiry: (context?: string) => void;
}) {
	const heroRef = useRef<HTMLElement>(null);
	const [lightMode, setLightMode] = useState(false);
	const [themeLoaded, setThemeLoaded] = useState(false);

	useEffect(() => {
		const stored = window.localStorage.getItem("rankrise-global-hero-theme");
		if (stored === "light") setLightMode(true);
		else if (stored === "dark") setLightMode(false);
		setThemeLoaded(true);
	}, []);

	useEffect(() => {
		if (themeLoaded) {
			window.localStorage.setItem(
				"rankrise-global-hero-theme",
				lightMode ? "light" : "dark",
			);
		}
		// Expose the hero tone to the shared header so its glass adapts too.
		document.documentElement.dataset.heroTheme = lightMode ? "light" : "dark";
		return () => {
			delete document.documentElement.dataset.heroTheme;
		};
	}, [lightMode, themeLoaded]);

	// Scroll drift keeps the artwork alive as the page moves.
	useEffect(() => {
		const root = heroRef.current;
		if (!root) return;
		const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
		let frameId = 0;
		const updateParallax = () => {
			frameId = 0;
			const scroll = mediaQuery.matches ? 0 : window.scrollY;
			root.style.setProperty("--hero-parallax", `${Math.max(-58, -scroll * 0.13)}px`);
			root.style.setProperty("--hero-hands-parallax", `${Math.max(-34, -scroll * 0.075)}px`);
			root.style.setProperty("--hero-cards-parallax", `${Math.max(-22, -scroll * 0.045)}px`);
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
			currentX += (targetX - currentX) * 0.085;
			currentY += (targetY - currentY) * 0.085;
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

	return (
		<section
			ref={heroRef}
			id="home"
			className={`${styles.heroSection}${lightMode ? ` ${styles.lightMode}` : ""}`}
			data-section="hero"
			aria-labelledby="hero-heading"
		>
			<div className={styles.heroFrame}>
				<StageBackdrop />

				<div className={styles.globeLayer} data-globe-layer>
					<Globe lightMode={lightMode} />
				</div>

				<div className={styles.heroContent}>
					<h1 id="hero-heading" className={styles.headline}>
						<span className={styles.headlineLine}>Building Intelligent Software</span>
						<span className={`${styles.headlineLine} ${styles.headlineHighlight}`}>
							for a Smarter Digital World.
						</span>
					</h1>

					<p className={styles.description}>
						We engineer custom software, AI-powered solutions and scalable digital
						products that help businesses innovate, automate and grow.
					</p>

					<div className={styles.ctaWrapper}>
						<button
							type="button"
							className={styles.startProjectBtn}
							onClick={() => onOpenInquiry("Start a Project — Global Hero")}
							aria-haspopup="dialog"
							aria-controls="preview-dialog"
						>
							Start a Project
						</button>
					</div>
				</div>

				<div className={styles.cardsContainer}>
					<div className={`${styles.glassCard} ${styles.glassCardLeft}`}>
						<LiquidGlass
							className={styles.liquidLayer}
							style={{
								position: "absolute",
								top: "50%",
								left: "50%",
								width: "100%",
								height: "100%",
							}}
							cornerRadius={14}
							blurAmount={0.65}
							saturation={170}
							displacementScale={70}
							aberrationIntensity={2}
							elasticity={0.15}
							overLight={lightMode}
							padding="0"
						>
							<span className={styles.liquidLayerContent} aria-hidden="true" />
						</LiquidGlass>
						<div className={styles.glassCardBody}>
							<p className={styles.glassCardTitle}>AI-Powered Solutions</p>
							<p className={styles.glassCardDesc}>
								Custom software, intelligent automation, and scalable cloud
								architectures.
							</p>
						</div>
					</div>

					<div className={`${styles.glassCard} ${styles.glassCardRight}`}>
						<LiquidGlass
							className={styles.liquidLayer}
							style={{
								position: "absolute",
								top: "50%",
								left: "50%",
								width: "100%",
								height: "100%",
							}}
							cornerRadius={14}
							blurAmount={0.65}
							saturation={170}
							displacementScale={70}
							aberrationIntensity={2}
							elasticity={0.15}
							overLight={lightMode}
							padding="0"
						>
							<span className={styles.liquidLayerContent} aria-hidden="true" />
						</LiquidGlass>
						<div className={styles.glassCardBody}>
							<p className={styles.glassCardTitle}>In-House Products</p>
							<p className={styles.glassCardDesc}>
								TriMarkity, 1SocialSnap, SalesApp, and HRMS enterprise suite.
							</p>
						</div>
					</div>
				</div>

				<button
					type="button"
					className={styles.themeToggle}
					aria-label={lightMode ? "Switch to dark theme" : "Switch to light theme"}
					aria-pressed={lightMode}
					onClick={() => setLightMode((mode) => !mode)}
				>
					{lightMode ? (
						<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
							<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
						</svg>
					) : (
						<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
							<circle cx="12" cy="12" r="4" />
							<path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
						</svg>
					)}
				</button>
			</div>
		</section>
	);
}

export default GlobalHero;
