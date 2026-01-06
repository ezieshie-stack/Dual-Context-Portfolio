"use client";

import { motion } from "framer-motion";
import Link from "next/link";

// Articles data
const ARTICLES = [
    {
        slug: "redefining-smartphones",
        title: "Redefining Smartphones: From Smart to Smarter",
        excerpt: "A deep dive into AI-powered features and the future of mobile technology, exploring how Samsung Galaxy AI is changing the game.",
        date: "2024",
        category: "Technology",
        readTime: "5 min read",
    },
    {
        slug: "music-copyright",
        title: "Music Copyright: What You Should Know as an Artist",
        excerpt: "An essential guide for creators navigating the complex world of music rights, licensing, and protecting your creative work.",
        date: "2024",
        category: "Industry",
        readTime: "7 min read",
    },
    {
        slug: "gen-z",
        title: "Understanding Gen Z: The Digital Native Generation",
        excerpt: "Cultural analysis of the generation that's reshaping digital culture, work ethics, and creative expression.",
        date: "2023",
        category: "Culture",
        readTime: "4 min read",
    },
];

export default function ArticlesPage() {
    return (
        <main className="relative min-h-screen text-white overflow-hidden">
            {/* Ambient background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-[150px]" />
            </div>

            {/* Header */}
            <section className="relative z-10 pt-32 pb-12 px-4 sm:px-6">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-4xl sm:text-5xl font-bold">
                            <span className="bg-gradient-to-r from-purple-400 to-violet-500 bg-clip-text text-transparent">
                                Articles
                            </span>
                        </h1>
                        <p className="mt-4 text-lg text-white/60 max-w-xl">
                            Thoughts on technology, creativity, and the intersection of art and innovation.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Articles List */}
            <section className="relative z-10 pb-20 px-4 sm:px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="space-y-6">
                        {ARTICLES.map((article, i) => (
                            <motion.div
                                key={article.slug}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + i * 0.1 }}
                            >
                                <Link
                                    href={`/creative/articles/${article.slug}`}
                                    className="group block p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/30 hover:bg-purple-500/5 transition-all"
                                >
                                    <div className="flex flex-wrap items-center gap-3 mb-4">
                                        <span className="px-3 py-1 text-xs rounded-full bg-purple-500/20 text-purple-400">
                                            {article.category}
                                        </span>
                                        <span className="text-sm text-white/40">{article.date}</span>
                                        <span className="text-white/20">•</span>
                                        <span className="text-sm text-white/40">{article.readTime}</span>
                                    </div>
                                    <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">
                                        {article.title}
                                    </h2>
                                    <p className="mt-3 text-white/60 leading-relaxed">
                                        {article.excerpt}
                                    </p>
                                    <div className="mt-4 text-sm text-purple-400 group-hover:translate-x-2 transition-transform">
                                        Read Article →
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
