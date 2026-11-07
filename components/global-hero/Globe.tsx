"use client";

import { useEffect, useRef } from "react";
import styles from "./global-hero.module.css";

/**
 * Interactive Globe Canvas
 *
 * Source: Figma node 39:3 ("Interactive Globe" CODE LAYER)
 * Provenance: file://figma/code-layer/source/1Tn73UkZNQHqCTkKXqYiGk/39%3A3/src/App.tsx
 *
 * Geometry:
 * - At 1024x768: Center (512, 534), radius 168 (diameter 336)
 * - Ratio-scaled responsively: centerX = width * 0.5, centerY = height * (534/768), radius = height * (168/768)
 * - 280-point Fibonacci sphere with 3D projection, depth perspective, and spatial connections
 * - 150 orbit particles with dynamic depth waves, orbital velocity, and celestial glow
 * - Drag-to-rotate interaction with pointer capture and inertia damping
 * - Scroll-wheel zoom with bounded range [0.78, 1.24]
 * - Accessible reduced-motion handling
 */

type Point3D = {
	x: number;
	y: number;
	z: number;
	size: number;
	pulse: number;
};

type OrbitParticle = {
	angle: number;
	distance: number;
	speed: number;
	size: number;
	depth: number;
	opacity: number;
};

const TAU = Math.PI * 2;

function seededRandom(seed: number) {
	let value = seed >>> 0;
	return () => {
		value = (value * 1664525 + 1013904223) >>> 0;
		return value / 4294967296;
	};
}

function createSphere() {
	const random = seededRandom(3846);
	const points: Point3D[] = [];
	const count = 280;
	const goldenAngle = Math.PI * (3 - Math.sqrt(5));

	for (let index = 0; index < count; index += 1) {
		const y = 1 - (index / (count - 1)) * 2;
		const radial = Math.sqrt(1 - y * y);
		const angle = goldenAngle * index + (random() - 0.5) * 0.14;
		const unevenRadius = 0.91 + random() * 0.12;

		points.push({
			x: Math.cos(angle) * radial * unevenRadius,
			y: (y + (random() - 0.5) * 0.035) * unevenRadius,
			z: Math.sin(angle) * radial * unevenRadius,
			size: 0.55 + random() * 1.65,
			pulse: random() * TAU,
		});
	}

	const connections: Array<[number, number]> = [];
	points.forEach((point, index) => {
		const nearby = points
			.map((candidate, candidateIndex) => ({
				index: candidateIndex,
				distance:
					(point.x - candidate.x) ** 2 +
					(point.y - candidate.y) ** 2 +
					(point.z - candidate.z) ** 2,
			}))
			.filter((candidate) => candidate.index > index)
			.sort((a, b) => a.distance - b.distance)
			.slice(0, 3);

		nearby.forEach((candidate) => {
			if (candidate.distance < 0.105) connections.push([index, candidate.index]);
		});
	});

	return { points, connections };
}

function createOrbitParticles() {
	const random = seededRandom(9301);
	return Array.from(
		{ length: 150 },
		(): OrbitParticle => ({
			angle: random() * TAU,
			distance: 1.1 + random() * 1.48,
			speed: (0.025 + random() * 0.085) * (random() > 0.18 ? 1 : -1),
			size: 0.45 + random() ** 2 * 5,
			depth: random() * TAU,
			opacity: 0.12 + random() * 0.68,
		}),
	);
}

interface GlobeProps {
	className?: string;
	lightMode?: boolean;
}

export function Globe({ className = "", lightMode = false }: GlobeProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const context = canvas.getContext("2d");
		if (!context) return;

		const { points, connections } = createSphere();
		const particles = createOrbitParticles();
		let frameId = 0;
		let width = 0;
		let height = 0;
		let pixelRatio = 1;
		let rotationX = -0.08;
		let rotationY = 0.1;
		let targetRotationX = rotationX;
		let targetRotationY = rotationY;
		let zoom = 1;
		let targetZoom = 1;
		let dragging = false;
		let pointerX = 0;
		let pointerY = 0;
		let lastPointerX = 0;
		let lastPointerY = 0;
		let lastInteraction = 0;

		const prefersReducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;

		const resize = () => {
			const bounds = canvas.getBoundingClientRect();
			width = bounds.width;
			height = bounds.height;
			pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
			canvas.width = Math.round(width * pixelRatio);
			canvas.height = Math.round(height * pixelRatio);
			context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
		};

		const rotatePoint = (point: Point3D) => {
			const cosY = Math.cos(rotationY);
			const sinY = Math.sin(rotationY);
			const x1 = point.x * cosY - point.z * sinY;
			const z1 = point.x * sinY + point.z * cosY;
			const cosX = Math.cos(rotationX);
			const sinX = Math.sin(rotationX);

			return {
				x: x1,
				y: point.y * cosX - z1 * sinX,
				z: point.y * sinX + z1 * cosX,
			};
		};

		const draw = (timestamp: number) => {
			const time = timestamp / 1000;
			const isMobile = width < 768;

			// Exact target geometry: At 1024x768 -> Center (512, 534), radius 168 (diam 336)
			const centerX = width * 0.5;
			const centerY = isMobile ? height * 0.62 : height * (534 / 768);
			const baseRadius = isMobile
				? Math.min(width, height) * 0.25
				: height * (168 / 768);
			const radius = baseRadius * zoom;

			if (!prefersReducedMotion && !dragging && timestamp - lastInteraction > 900) {
				targetRotationY += 0.0019;
			}
			rotationX += (targetRotationX - rotationX) * 0.075;
			rotationY += (targetRotationY - rotationY) * 0.075;
			zoom += (targetZoom - zoom) * 0.08;

			context.clearRect(0, 0, width, height);

			// Atmospheric Glow scaled to target radius
			const atmosphericGlow = context.createRadialGradient(
				centerX,
				centerY,
				radius * 0.1,
				centerX,
				centerY,
				radius * 1.6,
			);
			atmosphericGlow.addColorStop(0, "rgba(172, 205, 235, 0.22)");
			atmosphericGlow.addColorStop(0.42, "rgba(104, 145, 181, 0.1)");
			atmosphericGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
			context.fillStyle = atmosphericGlow;
			context.fillRect(
				centerX - radius * 1.6,
				centerY - radius * 1.6,
				radius * 3.2,
				radius * 3.2,
			);

			// Orbiting ambient particles
			particles.forEach((particle) => {
				const orbitAngle = particle.angle + time * particle.speed;
				const depthWave = Math.sin(
					particle.depth + time * particle.speed * 1.8,
				);
				const x =
					centerX +
					Math.cos(orbitAngle) * particle.distance * radius +
					Math.sin(particle.depth) * radius * 0.14;
				const y =
					centerY +
					Math.sin(orbitAngle) * particle.distance * radius * 0.55 +
					depthWave * radius * 0.15;
				const depth = 0.45 + depthWave * 0.55;
				const particleSize = particle.size * (0.58 + depth * 0.72);

				context.beginPath();
				context.arc(x, y, particleSize, 0, TAU);
				context.fillStyle = lightMode
					? `rgba(31, 119, 198, ${particle.opacity * (0.18 + depth * 0.48)})`
					: `rgba(220, 234, 247, ${particle.opacity * (0.18 + depth * 0.52)})`;
				context.shadowColor = lightMode ? "rgba(71, 158, 230, 0.45)" : "rgba(200, 225, 247, 0.62)";
				context.shadowBlur = particleSize > 2 ? particleSize * 2.5 : 0;
				context.fill();
			});
			context.shadowBlur = 0;

			// Projected 3D sphere points
			const projected = points.map((point) => {
				const rotated = rotatePoint(point);
				const perspective = 3.25 / (3.25 - rotated.z);
				return {
					...point,
					x2d: centerX + rotated.x * radius * perspective,
					y2d: centerY + rotated.y * radius * perspective,
					z2d: rotated.z,
					perspective,
				};
			});

			// Wireframe connection lines
			connections.forEach(([startIndex, endIndex]) => {
				const start = projected[startIndex];
				const end = projected[endIndex];
				const depth = (start.z2d + end.z2d) * 0.5;
				const alpha = Math.max(0.08, 0.2 + depth * 0.28);

				context.beginPath();
				context.moveTo(start.x2d, start.y2d);
				context.lineTo(end.x2d, end.y2d);
				context.strokeStyle = lightMode
					? `rgba(30, 114, 187, ${alpha * 1.08})`
					: `rgba(225, 240, 252, ${alpha})`;
				context.lineWidth = depth > 0.35 ? 0.72 : 0.42;
				context.stroke();
			});

			// Glowing nodes
			projected
				.sort((a, b) => a.z2d - b.z2d)
				.forEach((point) => {
					const depth = (point.z2d + 1) / 2;
					const pulse = 0.78 + Math.sin(time * 2.1 + point.pulse) * 0.22;
					const size = point.size * point.perspective * (0.66 + depth * 0.64);

					context.beginPath();
					context.arc(point.x2d, point.y2d, Math.max(0.42, size), 0, TAU);
					context.fillStyle = lightMode
						? `rgba(22, 103, 176, ${0.32 + depth * 0.64})`
						: `rgba(241, 248, 255, ${0.3 + depth * 0.66})`;
					context.shadowColor = lightMode ? "rgba(77, 166, 239, 0.72)" : "rgba(210, 235, 255, 0.95)";
					context.shadowBlur = depth > 0.55 ? size * 3.8 * pulse : 0;
					context.fill();
				});
			context.shadowBlur = 0;

			// Glowing Rim Gradient
			const rim = context.createRadialGradient(
				centerX - radius * 0.18,
				centerY - radius * 0.22,
				radius * 0.68,
				centerX,
				centerY,
				radius * 1.08,
			);
			rim.addColorStop(0, "rgba(255, 255, 255, 0)");
			rim.addColorStop(0.84, "rgba(205, 230, 249, 0.03)");
			rim.addColorStop(0.93, "rgba(224, 240, 253, 0.15)");
			rim.addColorStop(1, "rgba(255, 255, 255, 0)");
			context.fillStyle = rim;
			context.beginPath();
			context.arc(centerX, centerY, radius * 1.08, 0, TAU);
			context.fill();

			if (!prefersReducedMotion) {
				frameId = requestAnimationFrame(draw);
			}
		};

		const handlePointerDown = (event: PointerEvent) => {
			if (prefersReducedMotion) return;
			dragging = true;
			lastPointerX = event.clientX;
			lastPointerY = event.clientY;
			lastInteraction = performance.now();
			canvas.setPointerCapture(event.pointerId);
			canvas.classList.add(styles.isDragging);
		};

		const handlePointerMove = (event: PointerEvent) => {
			if (prefersReducedMotion) return;
			const bounds = canvas.getBoundingClientRect();
			pointerX = (event.clientX - bounds.left) / bounds.width - 0.5;
			pointerY = (event.clientY - bounds.top) / bounds.height - 0.5;

			if (dragging) {
				targetRotationY += (event.clientX - lastPointerX) * 0.009;
				targetRotationX = Math.max(
					-1.15,
					Math.min(1.15, targetRotationX + (event.clientY - lastPointerY) * 0.009),
				);
				lastPointerX = event.clientX;
				lastPointerY = event.clientY;
				lastInteraction = performance.now();
			} else {
				targetRotationY += pointerX * 0.0008;
				targetRotationX += (pointerY * 0.16 - targetRotationX) * 0.008;
			}
		};

		const handlePointerUp = (event: PointerEvent) => {
			dragging = false;
			lastInteraction = performance.now();
			if (canvas.hasPointerCapture(event.pointerId)) {
				canvas.releasePointerCapture(event.pointerId);
			}
			canvas.classList.remove(styles.isDragging);
		};

		const handleWheel = (event: WheelEvent) => {
			if (prefersReducedMotion) return;
			event.preventDefault();
			targetZoom = Math.max(
				0.78,
				Math.min(1.24, targetZoom - event.deltaY * 0.0007),
			);
			lastInteraction = performance.now();
		};

		const observer = new ResizeObserver(resize);
		observer.observe(canvas);
		resize();
		frameId = requestAnimationFrame(draw);

		canvas.addEventListener("pointerdown", handlePointerDown);
		canvas.addEventListener("pointermove", handlePointerMove);
		canvas.addEventListener("pointerup", handlePointerUp);
		canvas.addEventListener("pointercancel", handlePointerUp);
		canvas.addEventListener("wheel", handleWheel, { passive: false });

		return () => {
			cancelAnimationFrame(frameId);
			observer.disconnect();
			canvas.removeEventListener("pointerdown", handlePointerDown);
			canvas.removeEventListener("pointermove", handlePointerMove);
			canvas.removeEventListener("pointerup", handlePointerUp);
			canvas.removeEventListener("pointercancel", handlePointerUp);
			canvas.removeEventListener("wheel", handleWheel);
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			className={`${styles.globeCanvas} ${className}`}
			aria-label="Interactive illuminated network constellation globe. Drag to rotate and scroll to zoom."
		/>
	);
}

export default Globe;
