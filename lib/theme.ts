export type AccentId =
  | "vermilion"
  | "volt"
  | "amber"
  | "crimson"
  | "emerald"
  | "blue";

export type ThemeMode = "light" | "dark";

export interface AccentPreset {
  id: AccentId;
  label: string;
  swatch: string;
  darkSwatch: string;
}

export const ACCENT_PRESETS: AccentPreset[] = [
  { id: "vermilion", label: "Signal Vermilion", swatch: "#FF4F1F", darkSwatch: "#FF5A2B" },
  { id: "volt", label: "Acid Volt", swatch: "#C8FF00", darkSwatch: "#C8FF00" },
  { id: "amber", label: "Electric Amber", swatch: "#FFB800", darkSwatch: "#FFB800" },
  { id: "crimson", label: "Crimson Rose", swatch: "#E11D48", darkSwatch: "#F43F5E" },
  { id: "emerald", label: "Hyper Emerald", swatch: "#00E599", darkSwatch: "#00E599" },
  { id: "blue", label: "RankRise Blue", swatch: "#1768D5", darkSwatch: "#3B82F6" },
];

export const VALID_ACCENTS: AccentId[] = [
  "vermilion",
  "volt",
  "amber",
  "crimson",
  "emerald",
  "blue",
];

export type HeroModeColors = {
  fill: string;
  textColor: string;
  borderColor: string;
  iconBg: string;
  iconColor: string;
  markerColor: string;
  markerTint: string;
};

export const ACCENT_HERO_CONFIG: Record<
  string,
  { light: HeroModeColors; dark: HeroModeColors }
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

export type HeaderCtaModeColors = {
  fill: string;
  textColor: string;
  hoverFill: string;
  hoverTextColor: string;
  iconBg: string;
  iconColor: string;
  iconHoverBg: string;
  iconHoverColor: string;
};

export const HEADER_CTA_COLORS: Record<
  string,
  { light: HeaderCtaModeColors; dark: HeaderCtaModeColors }
> = {
  vermilion: {
    light: { fill: "#FF4F1F", textColor: "#FFFFFF", hoverFill: "#102B50", hoverTextColor: "#FFFFFF", iconBg: "#CC3307", iconColor: "#FFFFFF", iconHoverBg: "#FF4F1F", iconHoverColor: "#FFFFFF" },
    dark: { fill: "#FF5A2B", textColor: "#FFFFFF", hoverFill: "#FFFFFF", hoverTextColor: "#102B50", iconBg: "#C43810", iconColor: "#FFFFFF", iconHoverBg: "#FF4F1F", iconHoverColor: "#FFFFFF" },
  },
  volt: {
    light: { fill: "#C8FF00", textColor: "#1A2E05", hoverFill: "#102B50", hoverTextColor: "#C8FF00", iconBg: "#A3D900", iconColor: "#1A2E05", iconHoverBg: "#C8FF00", iconHoverColor: "#102B50" },
    dark: { fill: "#C8FF00", textColor: "#0E1A00", hoverFill: "#FFFFFF", hoverTextColor: "#0E1A00", iconBg: "#99CC00", iconColor: "#0E1A00", iconHoverBg: "#C8FF00", iconHoverColor: "#0E1A00" },
  },
  amber: {
    light: { fill: "#FFB800", textColor: "#261A00", hoverFill: "#102B50", hoverTextColor: "#FFFFFF", iconBg: "#D49500", iconColor: "#FFFFFF", iconHoverBg: "#FFB800", iconHoverColor: "#102B50" },
    dark: { fill: "#FFB800", textColor: "#1F1400", hoverFill: "#FFFFFF", hoverTextColor: "#1F1400", iconBg: "#CC8800", iconColor: "#FFFFFF", iconHoverBg: "#FFB800", iconHoverColor: "#FFFFFF" },
  },
  crimson: {
    light: { fill: "#E11D48", textColor: "#FFFFFF", hoverFill: "#102B50", hoverTextColor: "#FFFFFF", iconBg: "#9F1239", iconColor: "#FFFFFF", iconHoverBg: "#E11D48", iconHoverColor: "#FFFFFF" },
    dark: { fill: "#F43F5E", textColor: "#FFFFFF", hoverFill: "#FFFFFF", hoverTextColor: "#881337", iconBg: "#BE123C", iconColor: "#FFFFFF", iconHoverBg: "#F43F5E", iconHoverColor: "#FFFFFF" },
  },
  emerald: {
    light: { fill: "#00E599", textColor: "#013320", hoverFill: "#102B50", hoverTextColor: "#00E599", iconBg: "#00B377", iconColor: "#013320", iconHoverBg: "#00E599", iconHoverColor: "#102B50" },
    dark: { fill: "#00E599", textColor: "#002919", hoverFill: "#FFFFFF", hoverTextColor: "#002919", iconBg: "#00A36C", iconColor: "#002919", iconHoverBg: "#00E599", iconHoverColor: "#002919" },
  },
  blue: {
    light: { fill: "#1768D5", textColor: "#FFFFFF", hoverFill: "#102B50", hoverTextColor: "#FFFFFF", iconBg: "#0F4FA8", iconColor: "#FFFFFF", iconHoverBg: "#1768D5", iconHoverColor: "#FFFFFF" },
    dark: { fill: "#3B82F6", textColor: "#FFFFFF", hoverFill: "#FFFFFF", hoverTextColor: "#102B50", iconBg: "#1D4ED8", iconColor: "#FFFFFF", iconHoverBg: "#3B82F6", iconHoverColor: "#FFFFFF" },
  },
};

export const STATS_ACCENT_PALETTES: Record<AccentId, { from: string; to: string; accent: string }> = {
  vermilion: { from: "#CC3307", to: "#FF7043", accent: "#FF4F1F" },
  volt: { from: "#7CA600", to: "#C8FF00", accent: "#C8FF00" },
  amber: { from: "#CC8A00", to: "#FFD147", accent: "#FFB800" },
  crimson: { from: "#B91C43", to: "#FB7185", accent: "#E11D48" },
  emerald: { from: "#009E69", to: "#34F5B5", accent: "#00E599" },
  blue: { from: "#1768D5", to: "#5A9CF0", accent: "#3B82F6" },
};

export const GLOBE_DOTS_DARK = { color: "#ffffff", size: 5, density: 8, allDots: false };
export const GLOBE_DOTS_LIGHT = { color: "#1768d5", size: 5, density: 8, allDots: false };

export function readClientHeroTheme(): { lightMode: boolean; accent: string } {
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

export function supportsRefraction(): boolean {
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
