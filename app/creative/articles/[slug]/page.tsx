"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use } from "react";

// Articles data
const ARTICLES: Record<string, {
    title: string;
    date: string;
    category: string;
    readTime: string;
    content: string[];
}> = {
    "redefining-smartphones": {
        title: "Redefining Smartphones: From Smart to Smarter",
        date: "January 2024",
        category: "Technology",
        readTime: "5 min read",
        content: [
            "The smartphone industry is undergoing its most significant transformation since the introduction of the touchscreen. With the integration of AI directly into mobile devices, we're witnessing the dawn of truly intelligent computing in our pockets.",
            "Samsung's Galaxy AI features represent a glimpse into this future. From real-time translation during phone calls to AI-powered photo editing that can remove objects and fill in backgrounds naturally, these aren't just incremental improvements—they're fundamental shifts in how we interact with our devices.",
            "But what does this mean for creators? For photographers and videographers, AI-powered editing tools are democratizing high-end post-production. Features that once required expensive software and hours of manual work can now be accomplished with a tap.",
            "The implications extend beyond creative work. AI assistants are becoming genuinely useful, capable of understanding context and providing relevant assistance without constant prompting. The smartphone is evolving from a tool we use into a partner that understands our needs.",
            "As we move forward, the question isn't whether AI will transform mobile computing—it's how quickly we can adapt to these new capabilities and integrate them into our creative and professional workflows.",
        ],
    },
    "music-copyright": {
        title: "Music Copyright: What You Should Know as an Artist",
        date: "December 2023",
        category: "Industry",
        readTime: "7 min read",
        content: [
            "As a creator in the digital age, understanding music copyright isn't optional—it's essential. Whether you're a musician, content creator, or visual artist who uses music in your work, the legal landscape can be complex and unforgiving.",
            "At its core, music copyright protects two separate things: the composition (melody, lyrics, structure) and the recording (the specific performance captured in audio). These often belong to different parties, which is why licensing can be complicated.",
            "For content creators using music in videos or presentations, the safest path is royalty-free music or proper licensing through services like Artlist, Epidemic Sound, or direct agreements with artists. Using copyrighted music without permission can result in content takedowns, monetization claims, or legal action.",
            "For musicians, registering your work with performing rights organizations (PROs) like ASCAP, BMI, or SOCAN is crucial for collecting royalties. Additionally, consider registering copyrights with your national copyright office for stronger legal protection.",
            "The digital landscape is constantly evolving, with new platforms and distribution methods emerging regularly. Staying informed about copyright developments isn't just about protection—it's about maximizing the value of your creative work.",
        ],
    },
    "gen-z": {
        title: "Understanding Gen Z: The Digital Native Generation",
        date: "November 2023",
        category: "Culture",
        readTime: "4 min read",
        content: [
            "Gen Z, born between 1997 and 2012, represents the first generation of true digital natives. They've never known a world without the internet, smartphones, or social media, and this has fundamentally shaped their approach to creativity, work, and culture.",
            "For brands and creators looking to connect with this demographic, authenticity isn't just preferred—it's required. Gen Z has developed sophisticated filters for detecting inauthenticity, having been raised in an environment saturated with advertising and curated content.",
            "Their creative expression tends toward the raw and immediate. Platforms like TikTok thrive because they reward spontaneity and personality over polish. This doesn't mean production value doesn't matter—it means it should serve the content rather than mask superficiality.",
            "In the workplace, Gen Z brings different expectations. They value purpose alongside pay, seek work-life integration rather than balance, and expect workplace technology to match the seamless experiences they have in their personal lives.",
            "Understanding Gen Z isn't about pandering to trends—it's about recognizing how digital immersion has created new values and expectations that will increasingly shape our cultural and professional landscapes.",
        ],
    },
};

export default function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const article = ARTICLES[slug];

    if (!article) {
        notFound();
    }

    return (
        <main className="relative min-h-screen text-white overflow-hidden">
            {/* Ambient background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-purple-500/5 blur-[150px]" />
            </div>

            {/* Article Header */}
            <section className="relative z-10 pt-32 pb-8 px-4 sm:px-6">
                <article className="max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Link
                            href="/creative/articles"
                            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-purple-400 transition-colors mb-8"
                        >
                            ← Back to Articles
                        </Link>

                        <div className="flex flex-wrap items-center gap-3 mb-6">
                            <span className="px-3 py-1 text-xs rounded-full bg-purple-500/20 text-purple-400">
                                {article.category}
                            </span>
                            <span className="text-sm text-white/40">{article.date}</span>
                            <span className="text-white/20">•</span>
                            <span className="text-sm text-white/40">{article.readTime}</span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                            {article.title}
                        </h1>
                    </motion.div>
                </article>
            </section>

            {/* Article Content */}
            <section className="relative z-10 py-8 px-4 sm:px-6">
                <article className="max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="prose prose-lg prose-invert prose-purple max-w-none"
                    >
                        {article.content.map((paragraph, i) => (
                            <p key={i} className="text-lg text-white/80 leading-relaxed mb-6">
                                {paragraph}
                            </p>
                        ))}
                    </motion.div>
                </article>
            </section>

            {/* Author & Share */}
            <section className="relative z-10 py-12 px-4 sm:px-6">
                <div className="max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-white/5 border border-white/10"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-violet-500" />
                            <div>
                                <p className="font-medium text-white">David Ezieshi</p>
                                <p className="text-sm text-white/50">Thrills Motion</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button className="px-4 py-2 rounded-full text-sm bg-white/10 text-white/70 hover:bg-white/20 transition-colors">
                                Share on LinkedIn
                            </button>
                            <button className="px-4 py-2 rounded-full text-sm bg-white/10 text-white/70 hover:bg-white/20 transition-colors">
                                Copy Link
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* More Articles */}
            <section className="relative z-10 py-12 px-4 sm:px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <Link
                        href="/creative/articles"
                        className="inline-block px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors"
                    >
                        Read More Articles
                    </Link>
                </div>
            </section>
        </main>
    );
}
