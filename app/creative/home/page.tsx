"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import homeData from "../../../data/home.json";

// CountUp Component
function CountUp({ end, suffix = "", duration = 2 }: { end: number; suffix?: string; duration?: number }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (!isInView) return;

        let startTime: number;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

            // Easing function for smooth deceleration
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeOut * end));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [isInView, end, duration]);

    return <span ref={ref}>{count}{suffix}</span>;
}

// Stats Section Component
function StatsSection() {
    return (
        <section className="py-24 px-6 border-t border-white/10">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <span className="text-xs text-violet-400 uppercase tracking-widest">STATS</span>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
                    {homeData.stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="text-center"
                        >
                            <p className="text-5xl md:text-7xl font-black text-white mb-4">
                                <CountUp end={stat.value} suffix={stat.suffix} />
                            </p>
                            <p className="text-xs text-white/40 uppercase tracking-widest">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}


export default function CreativeHome() {
    const [currentTime, setCurrentTime] = useState("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true
            }));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const [currentSlide, setCurrentSlide] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // Auto-rotate slider
    useEffect(() => {
        if (isHovered) return;

        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % 3);
        }, 5000); // 5 seconds per slide

        return () => clearInterval(timer);
    }, [isHovered]);

    return (
        <main className="relative min-h-screen text-white">


            {/* Hero Section */}
            <section className="min-h-screen flex flex-col px-6 pt-24">
                {/* Top Bar Removed (Handled by Global Header) */}

                {/* Main Title */}
                <div className="flex-1 flex flex-col justify-center items-center text-center">
                    <h1 className="text-[clamp(4rem,15vw,12rem)] font-black leading-[0.85] tracking-tighter uppercase">
                        {/* THRILLS - rises from below */}
                        <div className="overflow-hidden">
                            <motion.div
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                            >
                                {homeData.hero.title_line1}
                            </motion.div>
                        </div>
                        {/* MOTION - rises from below with slight delay */}
                        <div className="overflow-hidden">
                            <motion.span
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                className="block bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent"
                            >
                                {homeData.hero.title_line2}
                            </motion.span>
                        </div>
                    </h1>
                </div>

                {/* Info Row */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="grid grid-cols-3 gap-4 py-12 border-t border-white/10 max-w-4xl mx-auto w-full"
                >
                    <div className="text-center">
                        <p className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Based in</p>
                        <p className="text-sm font-medium">{homeData.hero.based_in}</p>
                    </div>
                    <div className="text-center border-l border-r border-white/10">
                        <p className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Available</p>
                        <p className="text-sm font-medium">{homeData.hero.available}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Role</p>
                        <p className="text-sm font-medium">{homeData.hero.role}</p>
                    </div>
                </motion.div>


            </section>

            {/* About Section */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-8"
                    >
                        <span className="text-xs text-violet-400 uppercase tracking-widest">ABOUT</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-bold leading-tight max-w-4xl mb-16"
                    >
                        {homeData.about.heading}
                    </motion.h2>

                    <div className="grid md:grid-cols-2 gap-16">
                        <div
                            className="space-y-6"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            {/* Slider Indicators */}
                            <div className="flex gap-2 mb-4">
                                {[0, 1, 2].map((i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentSlide(i)}
                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${currentSlide === i
                                            ? "bg-violet-400 w-6"
                                            : "bg-violet-400/30 hover:bg-violet-400/50"
                                            }`}
                                        aria-label={`Go to slide ${i + 1}`}
                                    />
                                ))}
                            </div>

                            {/* Slider Content */}
                            <div className="relative min-h-[160px]">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentSlide}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.4 }}
                                        className="absolute inset-0"
                                    >
                                        <h3 className="text-xl font-bold uppercase mb-4">
                                            {homeData.about.slides[currentSlide].title}
                                        </h3>
                                        <p className="text-white/60 leading-relaxed">
                                            {homeData.about.slides[currentSlide].desc}
                                        </p>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Image Slider - container adjusts to image size */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            layout
                            className="rounded-2xl overflow-hidden bg-white/5 relative"
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
                            {/* Slider arrows */}
                            <button
                                onClick={() => setCurrentSlide((prev) => (prev - 1 + 3) % 3)}
                                className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
                            >
                                ←
                            </button>
                            <button
                                onClick={() => setCurrentSlide((prev) => (prev + 1) % 3)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
                            >
                                →
                            </button>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <StatsSection />

            {/* Approach Section */}
            <section className="py-24 px-6 border-t border-white/10">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-8"
                    >
                        <span className="text-xs text-violet-400 uppercase tracking-widest">APPROACH</span>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8 mt-16">
                        {homeData.approach.steps.map((phase, i) => (
                            <motion.div
                                key={phase.num}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group"
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <span className="text-5xl font-black text-white/10 group-hover:text-violet-400/30 transition-colors">
                                        {phase.num}
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold mb-3">{phase.title}</h3>
                                <p className="text-white/50 text-sm leading-relaxed">{phase.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Experience Section */}
            <section className="py-24 px-6 border-t border-white/10">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-black uppercase mb-4">{homeData.experience.heading}</h2>
                        <span className="text-xs text-violet-400 uppercase tracking-widest">{homeData.experience.subheading}</span>
                    </motion.div>

                    <div className="space-y-16">
                        {homeData.experience.roles.map((role, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="grid md:grid-cols-[1fr_2fr] gap-8 border-l-2 border-violet-400/30 pl-8"
                            >
                                <div>
                                    <span className="inline-block w-3 h-3 bg-violet-400 rounded-full -ml-[41px] mb-4" />
                                    <h3 className="text-xl font-bold uppercase">{role.title}</h3>
                                    <p className="text-white/60 text-sm mt-2">{role.company}</p>
                                    <p className="text-white/40 text-xs mt-1">{role.date}</p>
                                    {role.location && <p className="text-white/40 text-xs">{role.location}</p>}
                                </div>
                                <ul className="text-white/60 text-sm leading-relaxed space-y-2 list-disc list-inside">
                                    {role.description.map((desc, j) => (
                                        <li key={j}>{desc}</li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Portrait / Bio Section */}
            <section className="py-24 px-6 border-t border-white/10">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Portrait */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="w-48 h-48 mx-auto rounded-full overflow-hidden bg-white/5 mb-12 relative"
                    >
                        <Image
                            src="/images/creative/profile.jpg"
                            alt="David Profile"
                            fill
                            className="object-cover"
                        />
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-lg md:text-xl text-white/70 leading-relaxed mb-12"
                    >
                        {homeData.bio.text_part1} <span className="text-white font-medium">{homeData.bio.highlight1}</span> {homeData.bio.text_part2}{" "}
                        <span className="text-white font-medium">{homeData.bio.highlight2}</span>{homeData.bio.text_part3}
                    </motion.p>

                    {/* Social Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex justify-center gap-8"
                    >
                        {["Instagram", "LinkedIn", "Twitter"].map((social) => (
                            <a
                                key={social}
                                href="#"
                                className="text-sm text-white/40 hover:text-violet-400 transition-colors flex items-center gap-1"
                            >
                                {social} <span className="text-xs">↗</span>
                            </a>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Footer Title */}
            <section className="py-24 px-6 border-t border-white/10">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-end mb-8">
                        <span className="text-xs text-white/30">© {homeData.footer.copyright_year}</span>
                        <a href="#" className="text-xs text-white/30 hover:text-white transition-colors">
                            BACK TO TOP ↑
                        </a>
                    </div>
                    <h2 className="text-[clamp(3rem,12vw,10rem)] font-black leading-[0.85] tracking-tighter uppercase text-center text-white/[0.08]">
                        {homeData.footer.title}
                    </h2>
                </div>
            </section>
        </main >
    );
}
