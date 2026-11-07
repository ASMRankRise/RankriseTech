"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icon";
import { routeHref } from "@/lib/routes";
import { Globe } from "./Globe";
import styles from "./global-hero.module.css";
import { StageBackdrop } from "./Hands";

/**
 * Global Hero — Reference Recreation Composition
 *
 * Implements the user-approved atmospheric full-viewport hero reference
 * (heroreference.png) using authentic Figma source layers:
 * - User-added atmospheric background gradient (Figma node 38:14)
 * - Separated photographic hands (Figma node 38:5)
 * - Interactive Canvas 2D illuminated network constellation globe (Figma node 39:3)
 * - Reference UI composition verified in Figma frame 47:2
 *
 * Truthful RankRise branding, accessible navigation with native keyboard-operable
 * Products dropdown, honest inquiry dialog integration, and responsive layout.
 */
export function GlobalHero({
	onOpenInquiry,
}: {
	onOpenInquiry: (context?: string) => void;
}) {
	const heroRef = useRef<HTMLElement>(null);
	const [mobileOpen, setMobileOpen] = useState(false);
	const [productsOpen, setProductsOpen] = useState(false);
	const [lightMode, setLightMode] = useState(true);
	const productsRef = useRef<HTMLDetailsElement>(null);
	const themeReady = useRef(false);

	useEffect(() => {
		const stored = window.localStorage.getItem("rankrise-global-hero-theme");
		if (stored === "dark") setLightMode(false);
		themeReady.current = true;
	}, []);

	useEffect(() => {
		if (themeReady.current) {
			window.localStorage.setItem("rankrise-global-hero-theme", lightMode ? "light" : "dark");
		}
	}, [lightMode]);

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				productsRef.current &&
				!productsRef.current.contains(event.target as Node)
			) {
				setProductsOpen(false);
			}
		};
		document.addEventListener("click", handleClickOutside);
		return () => document.removeEventListener("click", handleClickOutside);
	}, []);

	// Close mobile menu on Escape key
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setMobileOpen(false);
				setProductsOpen(false);
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);

	return (
		<section
			ref={heroRef}
			id="home"
			className={`${styles.heroSection} ${lightMode ? styles.lightMode : styles.darkMode}`}
			data-section="hero"
			aria-labelledby="hero-heading"
		>
			{/* Atmospheric Background & Photographic Hands Layers */}
			<StageBackdrop />

			{/* Interactive Network Globe Canvas Layer */}
			<div className={styles.globeLayer}>
				<Globe lightMode={lightMode} />
			</div>

			{/* Floating Top Navigation Header */}
			<header className={styles.headerBar}>
				{/* RankRise Brand Wordmark */}
				<a
					href={routeHref("/")}
					className={styles.brandWordmark}
					aria-label="RankRise Technologies — Home"
				>
					<span className={styles.brandName}>RankRise</span>
					<span className={styles.brandDescriptor}>Technologies</span>
				</a>

				{/* Centered Glass Nav Pill (Desktop) */}
				<nav className={styles.navPill} aria-label="Primary navigation">
					<ul className={styles.navList}>
						<li>
							<a
								href={routeHref("/")}
								className={`${styles.navLink} ${styles.navLinkActive}`}
							>
								Home
							</a>
						</li>
						<li>
							<a href={routeHref("/about-us/")} className={styles.navLink}>
								About
							</a>
						</li>
						<li>
							<a href={routeHref("/services/")} className={styles.navLink}>
								Services
							</a>
						</li>
						<li>
							<a href={routeHref("/solutions/")} className={styles.navLink}>
								Solutions
							</a>
						</li>
						<li className={styles.navDropdownItem}>
							<details
								ref={productsRef}
								className={styles.navDetails}
								open={productsOpen}
								onToggle={(e) =>
									setProductsOpen((e.target as HTMLDetailsElement).open)
								}
							>
								<summary className={styles.navSummary}>
									Products
									<Icon
										name="chevron-down"
										width="12"
										height="12"
										className={styles.chevronIcon}
										aria-hidden="true"
									/>
								</summary>
								<div className={styles.navDropdownMenu}>
									<a
										href={routeHref("/products/")}
										className={styles.dropdownOverview}
										onClick={() => setProductsOpen(false)}
									>
										Products Overview
									</a>
									<a
										href={routeHref("/products/trimarkity/")}
										className={styles.dropdownLink}
										onClick={() => setProductsOpen(false)}
									>
										TriMarkity
									</a>
									<a
										href={routeHref("/products/1socialsnap/")}
										className={styles.dropdownLink}
										onClick={() => setProductsOpen(false)}
									>
										1SocialSnap
									</a>
									<a
										href={routeHref("/products/salesapp/")}
										className={styles.dropdownLink}
										onClick={() => setProductsOpen(false)}
									>
										SalesApp
									</a>
									<a
										href={routeHref("/products/hrms/")}
										className={styles.dropdownLink}
										onClick={() => setProductsOpen(false)}
									>
										HRMS
									</a>
								</div>
							</details>
						</li>
						<li>
							<a href={routeHref("/technologies/")} className={styles.navLink}>
								Technologies
							</a>
						</li>
						<li>
							<a href={routeHref("/industries/")} className={styles.navLink}>
								Industries
							</a>
						</li>
						<li>
							<a href={routeHref("/insights/")} className={styles.navLink}>
								Insights
							</a>
						</li>
					</ul>
				</nav>

				{/* Right CTA Button — Book a Demo */}
				<div className={styles.headerActions}>
					<button type="button" className={styles.themeToggle} aria-label={`Use ${lightMode ? "dark" : "light"} hero theme`} aria-pressed={lightMode} onClick={() => setLightMode((mode) => !mode)}>
						{lightMode ? "Dark" : "Light"}
					</button>
					<button
						type="button"
						className={styles.bookDemoBtn}
						onClick={() => onOpenInquiry("Book a Demo — Global Hero")}
						aria-haspopup="dialog"
						aria-controls="preview-dialog"
					>
						Book a Demo
					</button>

					{/* Mobile Menu Toggle */}
					<button
						type="button"
						className={styles.mobileToggle}
						aria-expanded={mobileOpen}
						aria-controls="mobile-nav-panel"
						aria-label={
							mobileOpen ? "Close navigation menu" : "Open navigation menu"
						}
						onClick={() => setMobileOpen((open) => !open)}
					>
						<Icon
							name={mobileOpen ? "close" : "menu"}
							width="20"
							height="20"
							aria-hidden="true"
						/>
					</button>
				</div>
			</header>

			{/* Mobile Navigation Panel */}
			<nav
				id="mobile-nav-panel"
				className={`${styles.mobileNav} ${mobileOpen ? styles.mobileNavOpen : ""}`}
				aria-label="Mobile navigation"
			>
				<ul className={styles.mobileNavList}>
					<li>
						<a
							href={routeHref("/")}
							className={styles.mobileNavLink}
							onClick={() => setMobileOpen(false)}
						>
							Home
						</a>
					</li>
					<li>
						<a
							href={routeHref("/about-us/")}
							className={styles.mobileNavLink}
							onClick={() => setMobileOpen(false)}
						>
							About
						</a>
					</li>
					<li>
						<a
							href={routeHref("/services/")}
							className={styles.mobileNavLink}
							onClick={() => setMobileOpen(false)}
						>
							Services
						</a>
					</li>
					<li>
						<a
							href={routeHref("/solutions/")}
							className={styles.mobileNavLink}
							onClick={() => setMobileOpen(false)}
						>
							Solutions
						</a>
					</li>
					<li className={styles.mobileDropdownItem}>
						<details className={styles.mobileDetails} open>
							<summary className={styles.mobileSummary}>
								Products
								<Icon
									name="chevron-down"
									width="12"
									height="12"
									aria-hidden="true"
								/>
							</summary>
							<ul className={styles.mobileSubList}>
								<li>
									<a
										href={routeHref("/products/")}
										className={styles.mobileSubLink}
										onClick={() => setMobileOpen(false)}
									>
										Products Overview
									</a>
								</li>
								<li>
									<a
										href={routeHref("/products/trimarkity/")}
										className={styles.mobileSubLink}
										onClick={() => setMobileOpen(false)}
									>
										TriMarkity
									</a>
								</li>
								<li>
									<a
										href={routeHref("/products/1socialsnap/")}
										className={styles.mobileSubLink}
										onClick={() => setMobileOpen(false)}
									>
										1SocialSnap
									</a>
								</li>
								<li>
									<a
										href={routeHref("/products/salesapp/")}
										className={styles.mobileSubLink}
										onClick={() => setMobileOpen(false)}
									>
										SalesApp
									</a>
								</li>
								<li>
									<a
										href={routeHref("/products/hrms/")}
										className={styles.mobileSubLink}
										onClick={() => setMobileOpen(false)}
									>
										HRMS
									</a>
								</li>
							</ul>
						</details>
					</li>
					<li>
						<a
							href={routeHref("/technologies/")}
							className={styles.mobileNavLink}
							onClick={() => setMobileOpen(false)}
						>
							Technologies
						</a>
					</li>
					<li>
						<a
							href={routeHref("/industries/")}
							className={styles.mobileNavLink}
							onClick={() => setMobileOpen(false)}
						>
							Industries
						</a>
					</li>
					<li>
						<a
							href={routeHref("/insights/")}
							className={styles.mobileNavLink}
							onClick={() => setMobileOpen(false)}
						>
							Insights
						</a>
					</li>
					<li className={styles.mobileCtaItem}>
						<button
							type="button"
							className={styles.mobileCtaBtn}
							onClick={() => {
								setMobileOpen(false);
								onOpenInquiry("Book a Demo — Mobile Nav");
							}}
							aria-haspopup="dialog"
							aria-controls="preview-dialog"
						>
							Book a Demo
						</button>
					</li>
				</ul>
			</nav>

			{/* Upper Center Content (~16% to 38% height) */}
			<div className={styles.heroContent}>
				<h1 id="hero-heading" className={styles.headline}>
					<span className={styles.headlineLine}>
						Building Intelligent Software
					</span>
					<span
						className={`${styles.headlineLine} ${styles.headlineHighlight}`}
					>
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

			{/* Lower Flanking Glass Callout Cards */}
			<div className={styles.cardsContainer}>
				{/* Left Callout Card */}
				<div className={`${styles.glassCard} ${styles.glassCardLeft}`}>
					<p className={styles.glassCardTitle}>AI-Powered Solutions</p>
					<p className={styles.glassCardDesc}>
						Custom software, intelligent automation, and scalable cloud
						architectures.
					</p>
				</div>

				{/* Right Callout Card */}
				<div className={`${styles.glassCard} ${styles.glassCardRight}`}>
					<p className={styles.glassCardTitle}>In-House Products</p>
					<p className={styles.glassCardDesc}>
						TriMarkity, 1SocialSnap, SalesApp, and HRMS enterprise suite.
					</p>
				</div>
			</div>
		</section>
	);
}

export default GlobalHero;
