"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // Auto-rotate slider
    useEffect(() => {
        if (isHovered) return;

        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % 3);
        }, 5000);

        return () => clearInterval(timer);
    }, [isHovered]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");
        await new Promise(resolve => setTimeout(resolve, 1500));
        setStatus("sent");
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <main className="relative min-h-screen text-white">
            {/* Vertical Grid Lines (Dashed/Poker Dot) */}



            <div className="max-w-7xl mx-auto px-6 py-24">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Left: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Section Header */}
                        <div className="flex items-start gap-4 mb-8">
                            <span className="text-xs text-white/40 tracking-widest">03</span>
                            <span className="text-xs text-white/40 tracking-widest">//</span>
                            <span className="text-xs text-violet-400 uppercase tracking-widest">CONTACT</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight mb-6">
                            START A<br />PROJECT.
                        </h1>

                        <p className="text-white/50 mb-12 max-w-md">
                            Ready to elevate your visual identity? Let&apos;s craft something exceptional.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-[10px] uppercase tracking-widest text-white/40 mb-3">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    className="w-full px-0 py-3 bg-transparent border-b border-white/20 text-white placeholder-white/20 focus:outline-none focus:border-violet-400 transition-colors"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-[10px] uppercase tracking-widest text-white/40 mb-3">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                    className="w-full px-0 py-3 bg-transparent border-b border-white/20 text-white placeholder-white/20 focus:outline-none focus:border-violet-400 transition-colors"
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-[10px] uppercase tracking-widest text-white/40 mb-3">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    required
                                    rows={4}
                                    className="w-full px-0 py-3 bg-transparent border-b border-white/20 text-white placeholder-white/20 focus:outline-none focus:border-violet-400 transition-colors resize-none"
                                    placeholder="Tell me about your project..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={status === "sending"}
                                className="mt-8 px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-white/90 transition-colors uppercase tracking-wide text-sm disabled:opacity-50"
                            >
                                {status === "sending" ? "Sending..." : status === "sent" ? "Sent!" : "Submit Now"}
                            </button>

                            {status === "sent" && (
                                <p className="text-violet-400 text-sm mt-4">
                                    Thank you. I will be in touch shortly.
                                </p>
                            )}
                        </form>
                    </motion.div>

                    {/* Right: Image Slider */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        layout
                        className="rounded-2xl overflow-hidden bg-white/5 sticky top-24 relative"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentSlide}
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                layout
                            >
                                <Image
                                    src={
                                        currentSlide === 0
                                            ? "/images/creative/events/IMG_6594.jpg"
                                            : currentSlide === 1
                                                ? "/images/creative/lifestyle/IMG_8846.jpg"
                                                : "/images/creative/portraits/IMG_3036.jpg"
                                    }
                                    alt={
                                        currentSlide === 0
                                            ? "Events Photography"
                                            : currentSlide === 1
                                                ? "Lifestyle Photography"
                                                : "Portrait Photography"
                                    }
                                    width={800}
                                    height={1200}
                                    className="w-full h-auto"
                                    priority
                                />
                            </motion.div>
                        </AnimatePresence>
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                        {/* Category label */}
                        <div className="absolute bottom-4 left-4 text-xs uppercase tracking-widest text-white/70">
                            {currentSlide === 0 ? "Events" : currentSlide === 1 ? "Lifestyle" : "Portraits"}
                        </div>
                        {/* Slider dots */}
                        <div className="absolute bottom-4 right-4 flex gap-2">
                            {[0, 1, 2].map((i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentSlide(i)}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${currentSlide === i
                                        ? "bg-violet-400 w-6"
                                        : "bg-white/30 hover:bg-white/50"
                                        }`}
                                />
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
            {/* Footer */}
            <section className="py-16 px-6 border-t border-white/10">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center text-xs text-white/30">
                        <span>© 2025 THRILLS MOTION</span>
                        <div className="flex gap-8">
                            <a href={`mailto:${contactData.creative.email}`} className="hover:text-white transition-colors">
                                {contactData.creative.email}
                            </a>
                            <a href={contactData.creative.socials.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                                Instagram ↗
                            </a>
                            <a href="https://linkedin.com/in/david-ezieshi" className="hover:text-white transition-colors">
                                LinkedIn ↗
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </main >
    );
}
