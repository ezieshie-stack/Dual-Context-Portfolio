"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

export function CreativeHeader() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [time, setTime] = useState("");

    // Scroll tracking for hiding header
    const { scrollY } = useScroll();
    const headerOpacity = useTransform(scrollY, [0, 80, 120], [1, 1, 0]);
    const headerY = useTransform(scrollY, [0, 80, 120], [0, 0, -60]);

    // Clock Logic
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            // Format: HH:MM:SS PM/AM
            setTime(now.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const menuItems = [
        { label: "HOME", href: "/creative/home" },
        { label: "WORK", href: "/creative/portfolio" },
        { label: "CONTACT", href: "/creative/contact" },
    ];

    return (
        <>
            {/* Fixed Global Header - hides on scroll */}
            <motion.header
                className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex justify-between items-start pointer-events-none mix-blend-difference text-white"
                style={{ opacity: headerOpacity, y: headerY }}
            >
                {/* Left: Local Time */}
                <div className="font-mono text-xs tracking-widest pointer-events-auto">
                    LOCAL / {time} N
                </div>

                {/* Center: 4-Dot Menu Trigger */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="pointer-events-auto group relative w-10 h-10 flex items-center justify-center -mt-2"
                >
                    {/* The "4 Dotted Square" Icon */}
                    <div className={`grid grid-cols-2 gap-1 transition-all duration-300 ${menuOpen ? "scale-0 rotate-180" : "scale-100 rotate-0"}`}>
                        <div className="w-1 h-1 bg-white rounded-sm" />
                        <div className="w-1 h-1 bg-white rounded-sm" />
                        <div className="w-1 h-1 bg-white rounded-sm" />
                        <div className="w-1 h-1 bg-white rounded-sm" />
                    </div>

                    {/* Close 'X' icon (visible when open) */}
                    <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${menuOpen ? "opacity-100 rotate-0" : "opacity-0 rotate-90"}`}>
                        <span className="block w-4 h-0.5 bg-white absolute rotate-45" />
                        <span className="block w-4 h-0.5 bg-white absolute -rotate-45" />
                    </div>


                </button>

                {/* Right: Contact Button */}
                <Link
                    href="/creative/contact"
                    className="pointer-events-auto px-5 py-2 border border-white/20 rounded-full hover:bg-white hover:text-black transition-colors text-xs font-bold uppercase tracking-wide bg-black/50 backdrop-blur-md"
                >
                    Contact Now
                </Link>
            </motion.header>

            {/* Moving Line (Scanning Effect) - Optional aesthetic addition */}
            <motion.div
                className="fixed top-[88px] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent z-40 animate-pulse pointer-events-none"
                style={{ opacity: headerOpacity }}
            />

            {/* Full Screen Menu Overlay */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-xl z-40 flex items-center justify-center"
                    >
                        {/* No internal grid lines - adopts background theme via transparency */}

                        {/* Menu Links */}
                        <nav className="relative z-10 flex flex-col items-center justify-center gap-2 text-center">
                            {menuItems.map((item, i) => (
                                <motion.div
                                    key={item.label}
                                    initial={{ y: 40, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: 20, opacity: 0 }}
                                    transition={{ delay: 0.1 + i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <Link
                                        href={item.href}
                                        onClick={() => setMenuOpen(false)}
                                        className="block text-5xl md:text-7xl lg:text-8xl font-black text-white hover:text-white/50 transition-colors tracking-tighter leading-none"
                                    >
                                        {item.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        {/* Footer in Menu */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="absolute bottom-8 left-0 right-0 px-8 flex justify-between text-xs text-white/40 uppercase tracking-widest font-mono"
                        >
                            <span>©2024 All Rights Reserved</span>
                            <div className="flex gap-4">
                                <a href="#" className="hover:text-white transition-colors">Instagram ↗</a>
                                <a href="#" className="hover:text-white transition-colors">Dribbble ↗</a>
                                <a href="#" className="hover:text-white transition-colors">Twitter ↗</a>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
