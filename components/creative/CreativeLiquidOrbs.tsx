"use client";

import { useEffect, useRef, useState, memo } from "react";

type Orb = {
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    hue: number;
};

const EDGE_ZONE = 0.25;

// Memoized orb component
const GlossyBubble = memo(function GlossyBubble({ orb }: { orb: Orb }) {
    const { size, hue, x, y } = orb;

    return (
        <div
            className="absolute left-0 top-0"
            style={{
                width: size,
                height: size,
                transform: `translate3d(${x - size / 2}px, ${y - size / 2}px, 0)`,
                willChange: "transform",
                contain: "layout style paint",
            }}
        >
            {/* Soft ambient glow - 3% opacity */}
            <div
                className="absolute rounded-full"
                style={{
                    inset: -size * 0.05,
                    background: `radial-gradient(circle, hsla(${hue}, 40%, 35%, 0.03) 0%, transparent 55%)`,
                    filter: "blur(3px)",
                }}
            />

            {/* Base sphere */}
            <div
                className="absolute inset-0 rounded-full"
                style={{
                    background: `
                        radial-gradient(circle at 30% 25%, hsla(${hue}, 55%, 70%, 0.12) 0%, transparent 30%),
                        radial-gradient(circle at 50% 50%, hsla(${hue}, 65%, 50%, 0.9) 0%, hsla(${hue}, 60%, 40%, 0.85) 45%, hsla(${hue}, 50%, 28%, 0.8) 75%, hsla(${hue}, 40%, 18%, 0.75) 100%)
                    `,
                }}
            />

            {/* Fresnel rim */}
            <div
                className="absolute inset-0 rounded-full"
                style={{
                    background: `radial-gradient(circle at 50% 50%, transparent 60%, hsla(${hue}, 55%, 65%, 0.18) 80%, hsla(${hue}, 45%, 75%, 0.25) 95%, hsla(${hue}, 35%, 80%, 0.15) 100%)`,
                }}
            />

            {/* Subsurface scattering */}
            <div
                className="absolute inset-[18%] rounded-full"
                style={{
                    background: `radial-gradient(circle at 55% 55%, hsla(${hue + 8}, 60%, 60%, 0.2) 0%, transparent 65%)`,
                    filter: "blur(2px)",
                }}
            />

            {/* Primary specular */}
            <div
                className="absolute"
                style={{
                    width: size * 0.24,
                    height: size * 0.14,
                    top: size * 0.14,
                    left: size * 0.18,
                    borderRadius: "50%",
                    background: `radial-gradient(ellipse at 50% 60%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.5) 35%, rgba(255,255,255,0.15) 65%, transparent 100%)`,
                    transform: "rotate(-18deg)",
                }}
            />

            {/* Secondary specular */}
            <div
                className="absolute rounded-full"
                style={{
                    width: size * 0.05,
                    height: size * 0.035,
                    top: size * 0.24,
                    left: size * 0.35,
                    background: "rgba(255, 255, 255, 0.95)",
                }}
            />

            {/* Bottom caustic */}
            <div
                className="absolute"
                style={{
                    width: size * 0.35,
                    height: size * 0.1,
                    bottom: size * 0.14,
                    left: size * 0.38,
                    borderRadius: "50%",
                    background: `radial-gradient(ellipse at 50% 30%, hsla(${hue}, 45%, 65%, 0.1) 0%, transparent 100%)`,
                    filter: "blur(1.5px)",
                }}
            />
        </div>
    );
});

export function CreativeLiquidOrbs() {
    const [orbs, setOrbs] = useState<Orb[]>([]);
    const orbsDataRef = useRef<Orb[]>([]);
    const animationRef = useRef<number>(0);
    const lastUpdateRef = useRef<number>(0);
    const UPDATE_INTERVAL = 50; // Update React state every 50ms (20fps for React, smoother physics internally)

    // Initialize orbs
    useEffect(() => {
        const w = window.innerWidth;
        const h = window.innerHeight;

        const initialOrbs: Orb[] = [
            { id: 0, x: w * 0.12, y: h * 0.2, vx: 0.4, vy: -0.3, size: 100, hue: 280 },
            { id: 1, x: w * 0.08, y: h * 0.55, vx: -0.3, vy: 0.25, size: 70, hue: 265 },
            { id: 2, x: w * 0.88, y: h * 0.25, vx: 0.25, vy: 0.3, size: 120, hue: 290 },
            { id: 3, x: w * 0.15, y: h * 0.8, vx: -0.2, vy: -0.28, size: 55, hue: 275 },
            { id: 4, x: w * 0.85, y: h * 0.7, vx: 0.28, vy: -0.22, size: 85, hue: 285 },
            { id: 5, x: w * 0.92, y: h * 0.45, vx: -0.2, vy: 0.25, size: 45, hue: 295 },
        ];

        orbsDataRef.current = initialOrbs;
        setOrbs(initialOrbs);
    }, []);

    // Physics loop
    useEffect(() => {
        if (orbs.length === 0) return;

        const animate = (timestamp: number) => {
            const data = orbsDataRef.current;
            const w = window.innerWidth;
            const h = window.innerHeight;

            // Update physics
            for (const orb of data) {
                orb.x += orb.vx;
                orb.y += orb.vy;

                const radius = orb.size / 2;
                const leftEdge = w * EDGE_ZONE;
                const rightEdge = w * (1 - EDGE_ZONE);

                // Bounce off edges
                if (orb.x < leftEdge) {
                    if (orb.x < radius) { orb.x = radius; orb.vx = Math.abs(orb.vx); }
                    if (orb.x > leftEdge - radius) { orb.vx = -Math.abs(orb.vx); }
                } else if (orb.x > rightEdge) {
                    if (orb.x > w - radius) { orb.x = w - radius; orb.vx = -Math.abs(orb.vx); }
                    if (orb.x < rightEdge + radius) { orb.vx = Math.abs(orb.vx); }
                }

                if (orb.y < radius) { orb.y = radius; orb.vy = Math.abs(orb.vy); }
                if (orb.y > h - radius) { orb.y = h - radius; orb.vy = -Math.abs(orb.vy); }
            }

            // Collision detection
            for (let i = 0; i < data.length; i++) {
                for (let j = i + 1; j < data.length; j++) {
                    const orb1 = data[i];
                    const orb2 = data[j];
                    const dx = orb2.x - orb1.x;
                    const dy = orb2.y - orb1.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const minDist = (orb1.size + orb2.size) / 2;

                    if (dist < minDist && dist > 0) {
                        const nx = dx / dist;
                        const ny = dy / dist;
                        const dvn = (orb1.vx - orb2.vx) * nx + (orb1.vy - orb2.vy) * ny;

                        if (dvn > 0) {
                            orb1.vx -= dvn * nx * 0.9;
                            orb1.vy -= dvn * ny * 0.9;
                            orb2.vx += dvn * nx * 0.9;
                            orb2.vy += dvn * ny * 0.9;

                            const overlap = (minDist - dist) / 2;
                            orb1.x -= overlap * nx;
                            orb1.y -= overlap * ny;
                            orb2.x += overlap * nx;
                            orb2.y += overlap * ny;
                        }
                    }
                }
            }

            // Batch React updates at lower frequency
            if (timestamp - lastUpdateRef.current > UPDATE_INTERVAL) {
                lastUpdateRef.current = timestamp;
                setOrbs(data.map(o => ({ ...o })));
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationRef.current);
    }, [orbs.length]);

    return (
        <div
            aria-hidden
            className="pointer-events-none fixed inset-0 overflow-hidden"
            style={{ zIndex: 1, contain: "strict" }}
        >
            {orbs.map(orb => (
                <GlossyBubble key={orb.id} orb={orb} />
            ))}
        </div>
    );
}
