"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function ContextSwitcher() {
    const pathname = usePathname();
    const [activeContext, setActiveContext] = useState<"ba" | "creative" | null>(null);

    useEffect(() => {
        if (pathname?.startsWith("/ba")) {
            setActiveContext("ba");
        } else if (pathname?.startsWith("/creative")) {
            setActiveContext("creative");
        } else {
            setActiveContext(null);
        }
    }, [pathname]);

    // Don't render on splash screen
    if (!activeContext) return null;

    return (
        <div className="flex items-center gap-1 p-1 bg-neutral-100 rounded-full border border-neutral-200">
            <Link
                href="/ba/home"
                className={cn(
                    "relative px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
                    activeContext === "ba"
                        ? "text-neutral-900"
                        : "text-neutral-500 hover:text-neutral-700"
                )}
            >
                {activeContext === "ba" && (
                    <motion.div
                        layoutId="context-pill"
                        className="absolute inset-0 bg-white shadow-sm rounded-full -z-10"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                )}
                Business
            </Link>

            <Link
                href="/creative/home"
                className={cn(
                    "relative px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
                    activeContext === "creative"
                        ? "text-white"
                        : "text-neutral-500 hover:text-neutral-700"
                )}
            >
                {activeContext === "creative" && (
                    <motion.div
                        layoutId="context-pill"
                        className="absolute inset-0 bg-purple-600 shadow-sm rounded-full -z-10"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                )}
                Creative
            </Link>
        </div>
    );
}
