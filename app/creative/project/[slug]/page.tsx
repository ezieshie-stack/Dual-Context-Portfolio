"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use } from "react";

// Project data
const PROJECTS: Record<string, {
    title: string;
    category: string;
    year: string;
    description: string;
    longDescription: string;
    client?: string;
    tags: string[];
    images: string[];
}> = {
    "vitaglow": {
        title: "VITAGLOW",
        category: "Brand Identity",
        year: "2024",
        description: "Visual branding and product photography for wellness brand",
        longDescription: "VITAGLOW is a modern wellness brand focused on natural beauty products. The project involved creating a complete visual identity including product photography, brand guidelines, and marketing materials that capture the brand's essence of natural radiance and self-care.",
        client: "VITAGLOW Wellness",
        tags: ["Branding", "Photography", "Product", "Wellness"],
        images: ["/images/creative/vitaglow-1.jpg", "/images/creative/vitaglow-2.jpg", "/images/creative/vitaglow-3.jpg"],
    },
    "raylux": {
        title: "RAYLUX",
        category: "Marketing",
        year: "2024",
        description: "Creative marketing assets for premium eyewear collection",
        longDescription: "RAYLUX is a premium eyewear brand that required sophisticated marketing materials. The campaign focused on lifestyle photography and brand storytelling to position the product as a fashion statement for the modern professional.",
        client: "RAYLUX Eyewear",
        tags: ["Marketing", "Fashion", "Lifestyle", "Campaign"],
        images: ["/images/creative/raylux-1.jpg", "/images/creative/raylux-2.jpg", "/images/creative/raylux-3.jpg"],
    },
    "best-bakery": {
        title: "BEST BAKERY",
        category: "Commercial",
        year: "2023",
        description: "Commercial food and brand photography",
        longDescription: "Best Bakery is a local artisan bakery that wanted to elevate their brand presence. The project included mouthwatering food photography, menu design, and social media content that showcases the craftsmanship behind each baked good.",
        client: "Best Bakery Co.",
        tags: ["Food", "Commercial", "Photography", "Social Media"],
        images: ["/images/creative/bakery-1.jpg", "/images/creative/bakery-2.jpg", "/images/creative/bakery-3.jpg"],
    },
    "zynth": {
        title: "ZYNTH",
        category: "Brand Identity",
        year: "2023",
        description: "Modern brand identity and visual design",
        longDescription: "ZYNTH is a tech startup requiring a fresh, modern brand identity. The project encompassed logo design, color palette development, typography selection, and comprehensive brand guidelines to ensure consistency across all touchpoints.",
        client: "ZYNTH Technologies",
        tags: ["Branding", "Design", "Identity", "Tech"],
        images: ["/images/creative/zynth-1.jpg", "/images/creative/zynth-2.jpg", "/images/creative/zynth-3.jpg"],
    },
};

export default function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const project = PROJECTS[slug];

    if (!project) {
        notFound();
    }

    return (
        <main className="relative min-h-screen text-white overflow-hidden">
            {/* Ambient background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-[150px]" />
            </div>

            {/* Header */}
            <section className="relative z-10 pt-32 pb-8 px-4 sm:px-6">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Link
                            href="/creative/portfolio"
                            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-purple-400 transition-colors mb-6"
                        >
                            ← Back to Portfolio
                        </Link>

                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-sm text-purple-400 uppercase tracking-wider">
                                {project.category}
                            </span>
                            <span className="text-white/30">•</span>
                            <span className="text-sm text-white/40">{project.year}</span>
                        </div>

                        <h1 className="text-4xl sm:text-6xl font-bold text-white">
                            {project.title}
                        </h1>

                        {project.client && (
                            <p className="mt-4 text-lg text-white/40">
                                Client: {project.client}
                            </p>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* Hero Image */}
            <section className="relative z-10 py-8 px-4 sm:px-6">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="aspect-[16/9] rounded-2xl overflow-hidden bg-gradient-to-br from-purple-900/50 to-black"
                    >
                        {/* Placeholder - replace with actual image */}
                        <div className="w-full h-full flex items-center justify-center text-white/20 text-2xl">
                            Project Hero Image
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Description */}
            <section className="relative z-10 py-12 px-4 sm:px-6">
                <div className="max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h2 className="text-2xl font-bold text-white mb-4">About the Project</h2>
                        <p className="text-lg text-white/70 leading-relaxed">
                            {project.longDescription}
                        </p>

                        <div className="mt-8 flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1.5 text-sm rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Gallery */}
            <section className="relative z-10 py-12 px-4 sm:px-6">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <h2 className="text-2xl font-bold text-white mb-8">Gallery</h2>
                        <div className="grid sm:grid-cols-2 gap-6">
                            {project.images.map((_, i) => (
                                <div
                                    key={i}
                                    className="aspect-[4/3] rounded-xl overflow-hidden bg-gradient-to-br from-purple-900/30 to-black flex items-center justify-center text-white/20"
                                >
                                    Image {i + 1}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* CTA */}
            <section className="relative z-10 py-16 px-4 sm:px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 to-violet-500/5 border border-purple-500/20"
                    >
                        <h3 className="text-2xl font-bold text-white mb-4">
                            Interested in similar work?
                        </h3>
                        <p className="text-white/60 mb-6">
                            Let&apos;s discuss how we can bring your vision to life.
                        </p>
                        <Link
                            href="/ba/contact"
                            className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-violet-500 text-black font-semibold hover:scale-105 transition-transform"
                        >
                            Get in Touch
                        </Link>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
