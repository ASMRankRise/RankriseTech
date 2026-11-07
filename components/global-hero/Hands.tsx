"use client";

import Image from "next/image";
import styles from "./global-hero.module.css";

/**
 * Photographic Hands & Atmospheric Stage Backdrop
 *
 * Sourced directly from Figma:
 * - Gradient: node 38:14 (/images/global-hero/figma-gradient-38-14.png)
 * - Separated Hands: node 38:5 (/images/global-hero/figma-hands-38-5.png)
 *
 * Geometric Alignment:
 * - Hands aspect ratio: 2752x1536 (1.791666...)
 * - At 1024px viewport width: width 1024px, height 572px anchored to BOTTOM
 * - Upper right entry near y: 305, lower left entry near y: 730
 * - Multiply blend mode integrates authentic photographic hands into the user gradient.
 */

export function StageBackdrop({ className = "" }: { className?: string }) {
	return (
		<div
			className={`${styles.stageBackdropWrapper} ${className}`}
			aria-hidden="true"
		>
			{/* 1. Base User-Added Gradient from Figma node 38:14 (Full Bleed) */}
			<Image
				src="/images/global-hero/figma-gradient-38-14.png"
				alt=""
				fill
				priority
				sizes="100vw"
				className={styles.stageGradient}
			/>

			{/* 2. Photographic Hands from Figma node 38:5 (Anchored to lower stage) */}
			<div className={styles.handsImageWrapper}>
				<Image
					 src="/images/global-hero/figma-export-hands-863bd.png"
					alt=""
					fill
					priority
					sizes="(max-width: 1024px) 100vw, 1024px"
					className={styles.stageHands}
				/>
			</div>

			{/* 3. Cinematic Edge Vignette */}
			<div className={styles.edgeVignette} />
		</div>
	);
}

export function LeftHand(_props?: { className?: string }) {
	return null;
}

export function RightHand(_props?: { className?: string }) {
	return null;
}

export function PhotographicHands({ className = "" }: { className?: string }) {
	return <StageBackdrop className={className} />;
}

export default StageBackdrop;
