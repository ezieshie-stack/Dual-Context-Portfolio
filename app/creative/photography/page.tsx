"use client";

import { motion } from "framer-motion";

// Photography categories
const CATEGORIES = [
    { name: "All", count: 12 },
    { name: "Weddings", count: 4 },
    { name: "Portraits", count: 5 },
    { name: "Lifestyle", count: 3 },
];

// Photo data (placeholder)
const PHOTOS = [
    { id: 1, category: "Weddings", title: "Traditional Ceremony" },
    { id: 2, category: "Portraits", title: "Studio Portrait" },
    { id: 3, category: "Lifestyle", title: "Outdoor Session" },
    { id: 4, category: "Weddings", title: "Reception Moments" },
    { id: 5, category: "Portraits", title: "Creative Lighting" },
    { id: 6, category: "Lifestyle", title: "City Vibes" },
    { id: 7, category: "Weddings", title: "Couple Portraits" },
    { id: 8, category: "Portraits", title: "Fashion Editorial" },
    { id: 9, category: "Lifestyle", title: "Beach Day" },
    { id: 10, category: "Weddings", title: "Dance Floor" },
    { id: 11, category: "Portraits", title: "Natural Light" },
    { id: 12, category: "Portraits", title: "Black and White" },
];

export default function PhotographyPage() {
    return (
        <main className="relative min-h-screen text-white overflow-hidden">
            {/* Ambient background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-[150px]" />
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
                                Photography
                            </span>
                        </h1>
                        <p className="mt-4 text-lg text-white/60 max-w-xl">
                            Capturing moments that tell stories. Weddings, portraits, and lifestyle photography.
                        </p>
                    </motion.div>

                    {/* Category filters */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mt-8 flex flex-wrap gap-3"
                    >
                        {CATEGORIES.map((category, i) => (
                            <button
                                key={category.name}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${i === 0
                                    ? "bg-purple-500 text-black"
                                    : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                                    }`}
                            >
                                {category.name}
                                <span className="ml-2 text-xs opacity-60">({category.count})</span>
                            </button>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Photo Gallery */}
            <section className="relative z-10 pb-20 px-4 sm:px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
                        {PHOTOS.map((photo, i) => (
                            <motion.div
                                key={photo.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + i * 0.05 }}
                                className="break-inside-avoid"
                            >
                                <div
                                    className={`group relative rounded-xl overflow-hidden bg-gradient-to-br from-purple-900/30 to-black cursor-pointer ${i % 3 === 0 ? "aspect-[3/4]" : i % 3 === 1 ? "aspect-square" : "aspect-[4/3]"
                                        }`}
                                >
                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors" />

                                    {/* Content on hover */}
                                    <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div>
                                            <span className="text-xs text-purple-400 uppercase tracking-wider">
                                                {photo.category}
                                            </span>
                                            <h3 className="text-lg font-bold text-white mt-1">
                                                {photo.title}
                                            </h3>
                                        </div>
                                    </div>

                                    {/* Expand icon */}
                                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white">
                                            ⤢
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="relative z-10 py-16 px-4 sm:px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 to-violet-500/5 border border-purple-500/20"
                    >
                        <h3 className="text-2xl font-bold text-white mb-4">
                            Book a Session
                        </h3>
                        <p className="text-white/60 mb-6">
                            Ready to capture your special moments? Let&apos;s create something beautiful together.
                        </p>
                        <a
                            href="/ba/contact"
                            className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-violet-500 text-black font-semibold hover:scale-105 transition-transform"
                        >
                            Get in Touch
                        </a>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
