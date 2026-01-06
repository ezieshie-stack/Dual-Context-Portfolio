"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export function AnimatedHeroLogo() {
    const [stage, setStage] = useState(0);

    useEffect(() => {
        // Animation sequence timing
        const timings = [
            { delay: 500, stage: 1 },   // Logo slides in from left
            { delay: 1500, stage: 2 },  // Stick figure jumps onto logo
            { delay: 2200, stage: 3 },  // Stick figure pulls out camera
            { delay: 3000, stage: 4 },  // "THRILLS MOTION" pops up
        ];

        const timeouts = timings.map(({ delay, stage: s }) =>
            setTimeout(() => setStage(s), delay)
        );

        return () => timeouts.forEach(clearTimeout);
    }, []);

    return (
        <div className="relative w-full max-w-lg mx-auto h-[400px] flex flex-col items-center justify-center">
            {/* TM Logo - slides in from left */}
            <motion.div
                className="relative"
                initial={{ x: -300, opacity: 0 }}
                animate={stage >= 1 ? { x: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
                {/* TM Monogram */}
                <svg
                    width="200"
                    height="180"
                    viewBox="0 0 200 180"
                    className="text-purple-500"
                >
                    {/* T Letter */}
                    <motion.path
                        d="M20 20 H100 V40 H70 V160 H50 V40 H20 V20Z"
                        fill="currentColor"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                    />
                    {/* M Letter - overlapping with T */}
                    <motion.path
                        d="M80 40 L110 40 L130 100 L150 40 L180 40 L180 160 L160 160 L160 80 L140 140 L120 140 L100 80 L100 160 L80 160 Z"
                        fill="currentColor"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    />
                </svg>

                {/* Stick Figure - jumps onto logo */}
                <motion.div
                    className="absolute"
                    initial={{ x: -100, y: 100, opacity: 0 }}
                    animate={
                        stage >= 2
                            ? stage >= 3
                                ? { x: 30, y: -30, opacity: 1, rotate: 0 }  // Sitting with camera
                                : { x: 30, y: -30, opacity: 1, rotate: -10 }  // Just landed
                            : {}
                    }
                    transition={{
                        duration: 0.6,
                        ease: "easeOut",
                        type: "spring",
                        bounce: 0.4
                    }}
                >
                    <svg
                        width="60"
                        height="80"
                        viewBox="0 0 60 80"
                        className="text-white"
                    >
                        {/* Head */}
                        <circle cx="30" cy="12" r="10" fill="currentColor" />
                        {/* Body */}
                        <line x1="30" y1="22" x2="30" y2="50" stroke="currentColor" strokeWidth="3" />
                        {/* Legs - sitting pose */}
                        <motion.g
                            animate={stage >= 2 ? { rotate: 0 } : { rotate: -20 }}
                        >
                            <line x1="30" y1="50" x2="15" y2="70" stroke="currentColor" strokeWidth="3" />
                            <line x1="30" y1="50" x2="45" y2="70" stroke="currentColor" strokeWidth="3" />
                        </motion.g>
                        {/* Arms */}
                        <motion.g
                            animate={stage >= 3 ? { rotate: -15 } : { rotate: 0 }}
                            style={{ transformOrigin: "30px 35px" }}
                        >
                            <line x1="30" y1="30" x2="10" y2="40" stroke="currentColor" strokeWidth="3" />
                            <line x1="30" y1="30" x2="50" y2="40" stroke="currentColor" strokeWidth="3" />
                        </motion.g>

                        {/* Camera - appears when pulling out */}
                        <AnimatePresence>
                            {stage >= 3 && (
                                <motion.g
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.3, type: "spring" }}
                                >
                                    <rect x="48" y="25" width="12" height="10" rx="2" fill="#8B5CF6" />
                                    <circle cx="54" cy="30" r="3" fill="#1a1a1a" />
                                    <rect x="52" y="22" width="4" height="4" rx="1" fill="#8B5CF6" />
                                </motion.g>
                            )}
                        </AnimatePresence>
                    </svg>
                </motion.div>
            </motion.div>

            {/* THRILLS MOTION text - pops up from below */}
            <motion.div
                className="mt-8"
                initial={{ y: 50, opacity: 0 }}
                animate={stage >= 4 ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
                <h1 className="text-3xl md:text-4xl font-black tracking-wider text-purple-400">
                    THRILLS MOTION
                </h1>
            </motion.div>

            {/* Subtle sparkle effect when animation completes */}
            <AnimatePresence>
                {stage >= 4 && (
                    <motion.div
                        className="absolute inset-0 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.5, 0] }}
                        transition={{ duration: 1 }}
                    >
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-2 h-2 bg-purple-400 rounded-full"
                                style={{
                                    left: `${20 + i * 15}%`,
                                    top: `${30 + (i % 3) * 20}%`,
                                }}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
                                transition={{ duration: 0.8, delay: i * 0.1 }}
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
