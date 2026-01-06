"use client";

import { motion } from "framer-motion";

type Orb = {
    className: string;
    style: React.CSSProperties;
    drift: { x: number; y: number; duration: number };
};

const ORBS: Orb[] = [
    {
        className: "bg-rose-400/20",
        style: { width: 220, height: 220, top: "18%", left: "58%" },
        drift: { x: 18, y: -12, duration: 14 },
    },
    {
        className: "bg-amber-300/18",
        style: { width: 160, height: 160, top: "56%", left: "14%" },
        drift: { x: -14, y: 10, duration: 16 },
    },
    {
        className: "bg-sky-300/14",
        style: { width: 260, height: 260, top: "62%", left: "68%" },
        drift: { x: 10, y: 16, duration: 18 },
    },
];

export function OrbField() {
    return (
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            {ORBS.map((orb, i) => (
                <motion.div
                    key={i}
                    className={`absolute rounded-full blur-2xl ${orb.className}`}
                    style={orb.style}
                    animate={{ x: [0, orb.drift.x, 0], y: [0, orb.drift.y, 0] }}
                    transition={{
                        duration: orb.drift.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
}
