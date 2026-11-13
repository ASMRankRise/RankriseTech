"use client";

import { useEffect, useState } from "react";

export type AccentId =
	| "vermilion"
	| "volt"
	| "amber"
	| "crimson"
	| "emerald"
	| "blue";

export interface AccentPreset {
	id: AccentId;
	label: string;
	swatch: string;
	darkSwatch: string;
}

export const ACCENT_PRESETS: AccentPreset[] = [
	{
		id: "vermilion",
		label: "Signal Vermilion",
		swatch: "#FF4F1F",
		darkSwatch: "#FF5A2B",
	},
	{
		id: "volt",
		label: "Acid Volt",
		swatch: "#C8FF00",
		darkSwatch: "#C8FF00",
	},
	{
		id: "amber",
		label: "Electric Amber",
		swatch: "#FFB800",
		darkSwatch: "#FFB800",
	},
	{
		id: "crimson",
		label: "Crimson Rose",
		swatch: "#E11D48",
		darkSwatch: "#F43F5E",
	},
	{
		id: "emerald",
		label: "Hyper Emerald",
		swatch: "#00E599",
		darkSwatch: "#00E599",
	},
	{
		id: "blue",
		label: "RankRise Blue",
		swatch: "#1768D5",
		darkSwatch: "#3B82F6",
	},
];

const VALID_ACCENTS: AccentId[] = [
	"vermilion",
	"volt",
	"amber",
	"crimson",
	"emerald",
	"blue",
];

export function AccentThemeDock() {
	const [accent, setAccent] = useState<AccentId>("vermilion");
	const [theme, setTheme] = useState<"light" | "dark">("light");
	const [collapsed, setCollapsed] = useState(false);

	// Sync initial state from localStorage / DOM on mount ONLY — NO setItem in useEffect!
	useEffect(() => {
		try {
			const storedAccent = window.localStorage.getItem(
				"rankrise-accent",
			) as AccentId | null;
			if (storedAccent && VALID_ACCENTS.includes(storedAccent)) {
				setAccent(storedAccent);
				document.documentElement.dataset.accent = storedAccent;
			} else {
				document.documentElement.dataset.accent = "vermilion";
			}

			const storedTheme = window.localStorage.getItem("rankrise-theme");
			if (storedTheme === "dark" || storedTheme === "light") {
				setTheme(storedTheme);
				document.documentElement.dataset.theme = storedTheme;
				document.documentElement.dataset.heroTheme = storedTheme;
			} else {
				document.documentElement.dataset.theme = "light";
				document.documentElement.dataset.heroTheme = "light";
			}
		} catch {
			// In restricted environments or test runs, ignore storage errors
			document.documentElement.dataset.accent = "vermilion";
			document.documentElement.dataset.theme = "light";
			document.documentElement.dataset.heroTheme = "light";
		}

		const handleThemeChange = (e: Event) => {
			const customEvent = e as CustomEvent<{
				theme?: "light" | "dark";
				accent?: AccentId;
			}>;
			if (customEvent.detail?.theme) {
				setTheme(customEvent.detail.theme);
			}
			if (
				customEvent.detail?.accent &&
				VALID_ACCENTS.includes(customEvent.detail.accent)
			) {
				setAccent(customEvent.detail.accent);
			}
		};

		window.addEventListener("rankrise-theme-change", handleThemeChange);
		return () =>
			window.removeEventListener("rankrise-theme-change", handleThemeChange);
	}, []);

	const handleAccentChange = (id: AccentId) => {
		setAccent(id);
		document.documentElement.dataset.accent = id;
		try {
			window.localStorage.setItem("rankrise-accent", id);
		} catch {
			// Ignore storage errors
		}
		window.dispatchEvent(
			new CustomEvent("rankrise-theme-change", {
				detail: { theme, accent: id },
			}),
		);
	};

	const handleThemeToggle = () => {
		const nextTheme = theme === "dark" ? "light" : "dark";
		setTheme(nextTheme);
		document.documentElement.dataset.theme = nextTheme;
		document.documentElement.dataset.heroTheme = nextTheme;
		try {
			window.localStorage.setItem("rankrise-theme", nextTheme);
			window.localStorage.setItem("rankrise-global-hero-theme", nextTheme);
		} catch {
			// Ignore storage errors
		}
		window.dispatchEvent(
			new CustomEvent("rankrise-theme-change", {
				detail: { theme: nextTheme, accent },
			}),
		);
	};

	const currentPreset =
		ACCENT_PRESETS.find((p) => p.id === accent) || ACCENT_PRESETS[0];

	return (
		<aside
			className={`accent-theme-dock${collapsed ? " is-collapsed" : ""}`}
			aria-label="Colour and theme studio"
		>
			<div id="accent-dock-panel" className="accent-dock-panel">
				<div className="accent-dock-label-group">
					<span className="accent-dock-title">Accent</span>
					<span className="accent-dock-active-name">{currentPreset.label}</span>
				</div>

				<div
					className="accent-dock-swatches"
					role="toolbar"
					aria-label="Accent colours"
				>
					{ACCENT_PRESETS.map((preset) => {
						const isSelected = accent === preset.id;
						const color = theme === "dark" ? preset.darkSwatch : preset.swatch;
						return (
							<button
								key={preset.id}
								type="button"
								data-accent={preset.id}
								className={`accent-swatch-btn${isSelected ? " is-active" : ""}`}
								onClick={() => handleAccentChange(preset.id)}
								aria-label={`Select ${preset.label} accent`}
								aria-pressed={isSelected}
							>
								<span
									className="accent-swatch-circle"
									style={{ backgroundColor: color }}
								/>
								{isSelected && (
									<span className="accent-swatch-check" aria-hidden="true">
										<svg
											width="10"
											height="10"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="3.5"
											strokeLinecap="round"
											strokeLinejoin="round"
											aria-hidden="true"
										>
											<polyline points="20 6 9 17 4 12" />
										</svg>
									</span>
								)}
							</button>
						);
					})}
				</div>

				<span className="accent-dock-divider" aria-hidden="true" />

				<button
					type="button"
					className="accent-theme-toggle"
					onClick={handleThemeToggle}
					aria-label={
						theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
					}
					aria-pressed={theme === "dark"}
				>
					{theme === "dark" ? (
						<>
							<svg
								width="15"
								height="15"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								aria-hidden="true"
							>
								<circle cx="12" cy="12" r="4" />
								<path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
							</svg>
							<span className="accent-theme-name">Light</span>
						</>
					) : (
						<>
							<svg
								width="15"
								height="15"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								aria-hidden="true"
							>
								<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
							</svg>
							<span className="accent-theme-name">Dark</span>
						</>
					)}
				</button>
			</div>

			<button
				type="button"
				className="accent-dock-collapse"
				onClick={() => setCollapsed(!collapsed)}
				aria-label={
					collapsed ? "Expand colour studio" : "Minimize colour studio"
				}
				aria-expanded={!collapsed}
				aria-controls="accent-dock-panel"
			>
				{collapsed ? (
					<svg
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						aria-hidden="true"
					>
						<circle cx="12" cy="12" r="10" />
						<path d="m10 8 4 4-4 4" />
					</svg>
				) : (
					<svg
						width="14"
						height="14"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						aria-hidden="true"
					>
						<path d="M18 6 6 18" />
						<path d="m6 6 12 12" />
					</svg>
				)}
			</button>
		</aside>
	);
}

export default AccentThemeDock;
