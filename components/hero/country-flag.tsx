import { GLOBE_COUNTRIES, type GlobeCountry } from "@/lib/data/locations";
import type { ProjectedGlobeLocation } from "./globe-canvas";

export { GLOBE_COUNTRIES, type GlobeCountry };

export function CountryFlag({ code }: { code: string }) {
	switch (code) {
		case "in":
			return (
				<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
					<rect width="24" height="8" y="0" fill="#FF9933" />
					<rect width="24" height="8" y="8" fill="#FFFFFF" />
					<rect width="24" height="8" y="16" fill="#138808" />
					<circle cx="12" cy="12" r="2.8" fill="none" stroke="#000080" strokeWidth="0.9" />
					<circle cx="12" cy="12" r="0.8" fill="#000080" />
				</svg>
			);
		case "us":
			return (
				<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
					<rect width="24" height="24" fill="#FFFFFF" />
					<rect width="24" height="2.4" y="0" fill="#B22234" />
					<rect width="24" height="2.4" y="4.8" fill="#B22234" />
					<rect width="24" height="2.4" y="9.6" fill="#B22234" />
					<rect width="24" height="2.4" y="14.4" fill="#B22234" />
					<rect width="24" height="2.4" y="19.2" fill="#B22234" />
					<rect width="12" height="12" x="0" y="0" fill="#3C3B6E" />
					<circle cx="3" cy="3" r="0.8" fill="#FFFFFF" />
					<circle cx="6.5" cy="3" r="0.8" fill="#FFFFFF" />
					<circle cx="10" cy="3" r="0.8" fill="#FFFFFF" />
					<circle cx="4.75" cy="6" r="0.8" fill="#FFFFFF" />
					<circle cx="8.25" cy="6" r="0.8" fill="#FFFFFF" />
					<circle cx="3" cy="9" r="0.8" fill="#FFFFFF" />
					<circle cx="6.5" cy="9" r="0.8" fill="#FFFFFF" />
					<circle cx="10" cy="9" r="0.8" fill="#FFFFFF" />
				</svg>
			);
		case "gb":
			return (
				<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
					<rect width="24" height="24" fill="#012169" />
					<path d="M0 0 L24 24 M24 0 L0 24" stroke="#FFFFFF" strokeWidth="4.2" />
					<path d="M0 0 L24 24 M24 0 L0 24" stroke="#C8102E" strokeWidth="2.1" />
					<path d="M12 0 V24 M0 12 H24" stroke="#FFFFFF" strokeWidth="6" />
					<path d="M12 0 V24 M0 12 H24" stroke="#C8102E" strokeWidth="3.4" />
				</svg>
			);
		case "fr":
			return (
				<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
					<rect width="8" height="24" x="0" fill="#002395" />
					<rect width="8" height="24" x="8" fill="#FFFFFF" />
					<rect width="8" height="24" x="16" fill="#ED2939" />
				</svg>
			);
		case "ca":
			return (
				<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
					<rect width="24" height="24" fill="#FFFFFF" />
					<rect width="5.5" height="24" x="0" fill="#FF0000" />
					<rect width="5.5" height="24" x="18.5" fill="#FF0000" />
					<path
						d="M12 5.2 L13.1 8.4 L15.5 7.4 L14.6 10.6 L16.8 11.1 L15.8 12.8 L16.4 13.7 L13 13.6 L13.2 17.6 H10.8 L11 13.6 L7.6 13.7 L8.2 12.8 L7.2 11.1 L9.4 10.6 L8.5 7.4 L10.9 8.4 Z"
						fill="#FF0000"
					/>
				</svg>
			);
		case "br":
			return (
				<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
					<rect width="24" height="24" fill="#009B3A" />
					<polygon points="12,3.5 21.5,12 12,20.5 2.5,12" fill="#FEDF00" />
					<circle cx="12" cy="12" r="4.4" fill="#002776" />
					<path d="M8.1 11.4 Q12 10.1 15.9 12.7" fill="none" stroke="#FFFFFF" strokeWidth="1.1" />
				</svg>
			);
		case "za":
			return (
				<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
					<rect width="24" height="12" y="0" fill="#E03C31" />
					<rect width="24" height="12" y="12" fill="#001489" />
					<path d="M0 3.2 L10.5 12 L0 20.8 V3.2 Z" fill="#FFB81C" />
					<path d="M0 0 L11.5 9.5 H24 V14.5 H11.5 L0 24" fill="none" stroke="#FFFFFF" strokeWidth="4.4" />
					<path d="M0 0 L11.5 9.5 H24 V14.5 H11.5 L0 24" fill="none" stroke="#007749" strokeWidth="2.8" />
					<polygon points="0,4.8 8.2,12 0,19.2" fill="#000000" />
				</svg>
			);
		case "ae":
			return (
				<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
					<rect width="24" height="8" y="0" fill="#00732F" />
					<rect width="24" height="8" y="8" fill="#FFFFFF" />
					<rect width="24" height="8" y="16" fill="#000000" />
					<rect width="7" height="24" x="0" y="0" fill="#FF0000" />
				</svg>
			);
		case "sg":
			return (
				<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
					<rect width="24" height="12" y="0" fill="#EF3340" />
					<rect width="24" height="12" y="12" fill="#FFFFFF" />
					<circle cx="7.4" cy="6.4" r="3.4" fill="#FFFFFF" />
					<circle cx="8.6" cy="6.4" r="3.1" fill="#EF3340" />
					<circle cx="9.6" cy="4.4" r="0.65" fill="#FFFFFF" />
					<circle cx="11.2" cy="5.7" r="0.65" fill="#FFFFFF" />
					<circle cx="10.7" cy="7.8" r="0.65" fill="#FFFFFF" />
					<circle cx="8.5" cy="7.8" r="0.65" fill="#FFFFFF" />
					<circle cx="8.1" cy="5.7" r="0.65" fill="#FFFFFF" />
				</svg>
			);
		case "jp":
			return (
				<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
					<rect width="24" height="24" fill="#FFFFFF" />
					<circle cx="12" cy="12" r="5.5" fill="#BC002D" />
				</svg>
			);
		case "au":
			return (
				<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
					<rect width="24" height="24" fill="#012169" />
					<path d="M0 0 L12 11 M12 0 L0 11" stroke="#FFFFFF" strokeWidth="2.4" />
					<path d="M0 0 L12 11 M12 0 L0 11" stroke="#E4002B" strokeWidth="1.1" />
					<path d="M6 0 V11 M0 5.5 H12" stroke="#FFFFFF" strokeWidth="3.2" />
					<path d="M6 0 V11 M0 5.5 H12" stroke="#E4002B" strokeWidth="1.8" />
					<circle cx="6" cy="17.5" r="2.1" fill="#FFFFFF" />
					<circle cx="17.5" cy="6" r="1.1" fill="#FFFFFF" />
					<circle cx="20.2" cy="11" r="1.1" fill="#FFFFFF" />
					<circle cx="15.2" cy="12.5" r="1.1" fill="#FFFFFF" />
					<circle cx="18" cy="18.2" r="1.2" fill="#FFFFFF" />
				</svg>
			);
		default:
			return (
				<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
					<circle cx="12" cy="12" r="10" fill="#1768D5" />
				</svg>
			);
	}
}

const COUNTRY_BY_ID = new Map(GLOBE_COUNTRIES.map((country) => [country.id, country]));

function smoothstep(edge0: number, edge1: number, x: number): number {
	const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
	return t * t * (3 - 2 * t);
}

/**
 * Updates DOM transforms and collision-faded opacities for projected globe country pills.
 */
export function projectCountryPills(
	projected: ProjectedGlobeLocation[],
	viewport: { width: number; height: number },
	pillElements: Record<string, HTMLDivElement | null>,
	entranceAlpha: number
) {
	const isMobile = viewport.width <= 768;
	const widthScale = isMobile ? 0.88 : 1;
	const pillHeight = isMobile ? 24 : 28;
	const padX = 6;
	const padY = 4;

	const visibleItems: ProjectedGlobeLocation[] = [];
	for (let i = 0; i < projected.length; i++) {
		const item = projected[i];
		if (!item.visible) {
			const el = pillElements[item.id];
			if (el) {
				el.style.opacity = "0";
				el.style.visibility = "hidden";
			}
		} else {
			visibleItems.push(item);
		}
	}

	visibleItems.sort((a, b) => b.facing - a.facing);

	const placed: Array<{
		x: number;
		y: number;
		halfW: number;
		halfH: number;
		alpha: number;
	}> = [];

	for (let i = 0; i < visibleItems.length; i++) {
		const item = visibleItems[i];
		const el = pillElements[item.id];
		if (!el) continue;

		const horizonAlpha = smoothstep(0.06, 0.28, item.facing);
		const depthScale = 0.88 + 0.12 * smoothstep(0.06, 0.45, item.facing);
		const widthEstimate = COUNTRY_BY_ID.get(item.id)?.widthEstimate ?? 96;
		const halfW = widthEstimate * widthScale * depthScale * 0.5 + padX;
		const halfH = pillHeight * depthScale * 0.5 + padY;

		let collisionFade = 1;
		for (let j = 0; j < placed.length; j++) {
			const p = placed[j];
			const dx = Math.abs(item.x - p.x);
			const dy = Math.abs(item.y - p.y);
			const reqW = halfW + p.halfW;
			const reqH = halfH + p.halfH;
			if (dx < reqW && dy < reqH) {
				const overlap = Math.max(0, 1 - Math.max(dx / reqW, dy / reqH));
				const fade = 1 - smoothstep(0, 0.35, overlap) * p.alpha;
				if (fade < collisionFade) collisionFade = fade;
			}
		}

		const finalOpacity = entranceAlpha * horizonAlpha * collisionFade;
		if (finalOpacity > 0.08) {
			placed.push({
				x: item.x,
				y: item.y,
				halfW,
				halfH,
				alpha: finalOpacity,
			});
		}

		el.style.opacity = finalOpacity.toFixed(3);
		el.style.visibility = finalOpacity > 0.01 ? "visible" : "hidden";
		el.style.transform = `translate3d(${item.x.toFixed(2)}px, ${item.y.toFixed(2)}px, 0) translate(-50%, -50%) scale(${depthScale.toFixed(3)})`;
	}
}
