import type { ReactNode } from "react";
import styles from "./global-hero.module.css";

export default function GlassCard({
	children,
}: {
	children: ReactNode;
}) {
	return <div className={styles.glassCard}>{children}</div>;
}
