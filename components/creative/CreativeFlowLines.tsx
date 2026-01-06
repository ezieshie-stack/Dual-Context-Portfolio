"use client";

import { motion } from "framer-motion";

export function CreativeFlowLines() {
    return (
        <svg
            aria-hidden
            className="pointer-events-none fixed inset-0 h-full w-full opacity-10 z-0"
            viewBox="0 0 1200 700"
            preserveAspectRatio="none"
        >
            <defs>
                <linearGradient id="purpleGlow" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="rgba(168,85,247,0)" />
                    <stop offset="35%" stopColor="rgba(139,92,246,0.3)" />
                    <stop offset="65%" stopColor="rgba(192,132,252,0.2)" />
                    <stop offset="100%" stopColor="rgba(168,85,247,0)" />
                </linearGradient>
                <linearGradient id="violetGlow" x1="0" y1="0" x2="1" y2="0.5">
                    <stop offset="0%" stopColor="rgba(139,92,246,0)" />
                    <stop offset="50%" stopColor="rgba(167,139,250,0.25)" />
                    <stop offset="100%" stopColor="rgba(139,92,246,0)" />
                </linearGradient>
                <filter id="creativeSoftGlow">
                    <feGaussianBlur stdDeviation="5" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* Primary flowing line - Lowered & Thinner */}
            <motion.path
                d="M-50,600 C150,550 400,650 650,550 C900,450 1100,500 1250,450"
                fill="none"
                stroke="url(#purpleGlow)"
                strokeWidth="1.5"
                filter="url(#creativeSoftGlow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 3, ease: "easeInOut" }}
            />

            {/* Secondary line - Raised & Thinner */}
            <motion.path
                d="M-50,150 C200,50 450,150 700,100 C950,50 1100,120 1250,80"
                fill="none"
                stroke="url(#violetGlow)"
                strokeWidth="1"
                filter="url(#creativeSoftGlow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 3.5, delay: 0.5, ease: "easeInOut" }}
            />

            {/* Accent line - Subtle */}
            <motion.path
                d="M0,680 C300,650 600,690 900,660 C1100,640 1200,660 1250,650"
                fill="none"
                stroke="rgba(192,132,252,0.15)"
                strokeWidth="0.8"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 4, delay: 1, ease: "easeInOut" }}
            />
        </svg>
    );
}
