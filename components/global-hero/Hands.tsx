"use client";

import Image from "next/image";
import styles from "./global-hero.module.css";

/**
 * Atmospheric hero stage and photographic hands.
 *
 * Source: Figma node 38:5, exported at 2752x1536 with an opaque light
 * background. Rendering that export full-bleed with `mix-blend-mode: multiply`
 * keeps the silhouette arms and removes the light plate, so the hands sit in
 * the stage gradient instead of on top of it. The layer is intentionally
 * over-scanned at the bottom/edges, matching the reference composition where
 * both forearms enter from outside the frame.
 */
export function StageBackdrop({ className = "" }: { className?: string }) {
	return (
		<div className={`${styles.stageBackdropWrapper} ${className}`} aria-hidden="true">
			<div className={styles.handsImageWrapper}>
				<Image
					src="/images/global-hero/figma-hands-38-5.png"
					alt=""
					fill
					priority
					sizes="100vw"
					className={styles.stageHands}
				/>
			</div>

			<div className={styles.edgeVignette} />
		</div>
	);
}

export default StageBackdrop;
