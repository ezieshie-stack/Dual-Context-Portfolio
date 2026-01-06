"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

// Category cards data with actual cover images from each folder
const CATEGORIES = [
    {
        slug: "events",
        title: "EVENTS",
        image: "/images/creative/events/IMG_6594.jpg",
    },
    {
        slug: "lifestyle",
        title: "LIFESTYLE",
        image: "/images/creative/lifestyle/IMG_8846.jpg",
    },
    {
        slug: "portraits",
        title: "PORTRAITS",
        image: "/images/creative/portraits/IMG_3036.jpg",
    },
];

export default function PortfolioPage() {
    return (
        <main className="relative min-h-screen text-white overflow-hidden">
            {/* Ambient background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-[150px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-violet-500/5 blur-[150px]" />
            </div>

            {/* Header */}
            <section className="relative z-10 pt-32 pb-12 px-4 sm:px-6">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-4xl sm:text-5xl font-bold">
                            <span className="bg-gradient-to-r from-purple-400 to-violet-500 bg-clip-text text-transparent">
                                Curated projects
                            </span>
                        </h1>
                        <p className="mt-4 text-lg text-white/60 max-w-xl">
                            A curated selection of visual stories, capturing authentic moments across portraits, events, and experiences.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Category Grid */}
            <section className="relative z-10 pb-20 px-4 sm:px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="grid sm:grid-cols-3 gap-6">
                        {CATEGORIES.map((category, i) => (
                            <motion.div
                                key={category.slug}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + i * 0.1 }}
                            >
                                <Link
                                    href={`/creative/gallery/${category.slug}`}
                                    className="group block relative aspect-[3/4] rounded-2xl overflow-hidden bg-white/5"
                                >
                                    {/* Actual Image */}
                                    <Image
                                        src={category.image}
                                        alt={category.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                    />

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors" />

                                    {/* Title */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <h3 className="text-3xl font-black text-white tracking-wider group-hover:text-purple-400 transition-colors">
                                            {category.title}
                                        </h3>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
