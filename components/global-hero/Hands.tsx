"use client";

import Image from "next/image";
import styles from "./global-hero.module.css";

interface HandProps {
  className?: string;
  side?: "left" | "right";
  size?: number;
  width?: number;
  height?: number;
}

/**
 * Photographic Hand Component — Lower-Left Hand
 *
 * Extracted directly from reference asset heroreference.png using OpenCV GrabCut
 * polygon segmentation, edge matting, and recolored from orange rim to RankRise
 * brand blue without altering the photographic form.
 *
 * Positioned in lower-left cupping the globe.
 */
export function LeftHand({ className = "", size = 240, width, height }: HandProps) {
  const h = height ?? size;
  const w = width ?? Math.round((h * 196) / 206);

  return (
    <div
      className={`${styles.photographicHand} ${styles.handLowerLeft} ${className}`}
      role="img"
      aria-label="Lower-left human hand cradling the global network"
    >
      <Image
        src="/images/global-hero/hand-lower-left.png"
        alt="Lower-left human hand cradling the global network"
        width={w}
        height={h}
        className={styles.handImage}
        priority
      />
    </div>
  );
}

/**
 * Photographic Hand Component — Upper-Right Hand
 *
 * Extracted directly from reference asset heroreference.png using OpenCV GrabCut
 * polygon segmentation, edge matting, and recolored from orange rim to RankRise
 * brand blue without altering the photographic form.
 *
 * Positioned in upper-right reaching toward the globe.
 */
export function RightHand({ className = "", size = 340, width, height }: HandProps) {
  const w = width ?? size;
  const h = height ?? Math.round((w * 191) / 357);

  return (
    <div
      className={`${styles.photographicHand} ${styles.handUpperRight} ${className}`}
      role="img"
      aria-label="Upper-right human hand reaching toward the global network"
    >
      <Image
        src="/images/global-hero/hand-upper-right.png"
        alt="Upper-right human hand reaching toward the global network"
        width={w}
        height={h}
        className={styles.handImage}
        priority
      />
    </div>
  );
}

/**
 * Combined Photographic Hands Component
 * Convenience export rendering both exact photographic hands around the globe.
 */
export function PhotographicHands({ className = "" }: { className?: string }) {
  return (
    <>
      <LeftHand className={className} />
      <RightHand className={className} />
    </>
  );
}

export default PhotographicHands;
