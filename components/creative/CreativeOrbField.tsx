"use client";

import { motion } from "framer-motion";

type Orb = {
    className: string;
    style: React.CSSProperties;
    drift: { x: number; y: number; duration: number };
};

const ORBS: Orb[] = [
    {
        className: "bg-purple-400/25",
        style: { width: 280, height: 280, top: "12%", left: "65%" },
        drift: { x: 20, y: -15, duration: 12 },
    },
    {
        className: "bg-violet-500/20",
        style: { width: 200, height: 200, top: "50%", left: "10%" },
        drift: { x: -18, y: 14, duration: 15 },
    },
    {
        className: "bg-fuchsia-400/18",
        style: { width: 320, height: 320, top: "65%", left: "72%" },
        drift: { x: 12, y: 18, duration: 18 },
    },
    {
        className: "bg-indigo-400/15",
        style: { width: 180, height: 180, top: "30%", left: "25%" },
        drift: { x: -10, y: -12, duration: 20 },
    },
];

export function CreativeOrbField() {
    return (
        <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden z-0">
            {ORBS.map((orb, i) => (
                <motion.div
                    key={i}
                    className={`absolute rounded-full blur-3xl ${orb.className}`}
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
