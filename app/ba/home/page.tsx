"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { GlowBackground } from "@/components/ambient/GlowBackground";
import { OrbField } from "@/components/ambient/OrbField";
import { FlowLines } from "@/components/ambient/FlowLines";
import { GlowCard } from "@/components/ambient/GlowCard";
import BAHeader from "@/components/ba/BAHeader";
import Chatbot from "@/components/shared/Chatbot";

// Fade-in animation wrapper
function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay, ease: [0.25, 0.4, 0.25, 1] }}
        >
            {children}
        </motion.div>
    );
}

// Clickable Project Card
function ProjectCard({
    href,
    subtitle,
    title,
    description,
    metric,
    metricLabel,
    tags = []
}: {
    href: string;
    subtitle: string;
    title: string;
    description: string;
    metric: string;
    metricLabel: string;
    tags?: string[];
}) {
    return (
        <Link href={href} className="block group">
            <div className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-white/20">
                {/* glow ring */}
                <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 blur-xl transition duration-500 group-hover:opacity-100 bg-[radial-gradient(600px_circle_at_30%_20%,rgba(255,140,140,0.25),transparent_40%),radial-gradient(600px_circle_at_70%_70%,rgba(120,210,255,0.18),transparent_45%)]" />
                <div className="relative">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold uppercase tracking-wider text-white/50">{subtitle}</span>
                        <svg className="w-4 h-4 text-white/30 transition-all duration-300 group-hover:text-white/70 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
                    <p className="text-sm text-white/60 leading-relaxed mb-4">{description}</p>

                    {/* Tags */}
                    {tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {tags.map((tag, i) => (
                                <span key={i} className="px-2 py-0.5 text-xs rounded-full bg-white/5 text-white/50">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    <div className="pt-4 border-t border-white/10">
                        <span className="text-3xl font-bold text-white">{metric}</span>
                        <span className="ml-2 text-sm text-white/50">{metricLabel}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default function BAHome() {
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });

    // Shrink hero text as user scrolls - fade out before overlap
    const heroScale = useTransform(scrollYProgress, [0, 0.4], [1, 0.8]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
    const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

    return (
        <main className="relative min-h-screen bg-zinc-950 text-white overflow-hidden">
            {/* Header */}
            <BAHeader />

            {/* Ambient Background System */}
            <GlowBackground />
            <FlowLines />
            <OrbField />

            {/* Chatbot */}
            <Chatbot />

            {/* Content Layer */}
            <div className="relative z-10">
                {/* ========================================
            HERO SECTION - SHRINKS ON SCROLL
            ======================================== */}
                <section ref={heroRef} className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-20 overflow-hidden">
                    <motion.div
                        className="max-w-5xl mx-auto text-center"
                        style={{ scale: heroScale, opacity: heroOpacity, y: heroY }}
                    >
                        {/* Main Headline */}
                        <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] sm:leading-[0.95] mb-6 sm:mb-8">
                            Turning messy operations into{" "}
                            <span className="gradient-text">measurable systems</span>
                        </h1>

                        {/* Subheadline - More elaborated */}
                        <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed px-2 sm:px-0">
                            Business Analyst with expertise in end-to-end analytics projects—from root cause analysis
                            and predictive modeling to building dashboards and decision engines. I specialize in turning
                            complex operational challenges into data-driven solutions that teams can actually use.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="#projects" className="btn-primary group">
                                View Flagship Projects
                                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                            <Link href="/David_Ezieshi_Resume.pdf" target="_blank" className="btn-secondary">
                                Download Resume
                            </Link>
                        </div>
                    </motion.div>

                    {/* Scroll indicator */}
                    <motion.div
                        className="absolute bottom-12 left-1/2 -translate-x-1/2"
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{ opacity: heroOpacity }}
                    >
                        <div className="w-6 h-10 rounded-full border border-white/30 flex items-start justify-center p-2">
                            <div className="w-1 h-2 bg-white/50 rounded-full" />
                        </div>
                    </motion.div>
                </section>

                {/* ========================================
            IMPACT METRICS STRIP
            ======================================== */}
                <section className="py-20 border-y border-white/10 glass-dark relative z-20 bg-zinc-950/80">
                    <div className="max-w-6xl mx-auto px-6">
                        <FadeIn>
                            <p className="text-center text-white/40 text-sm uppercase tracking-widest mb-8">
                                Measurable Impact Across Projects
                            </p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center">
                                <div>
                                    <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-1 sm:mb-2">34%</div>
                                    <div className="text-sm text-white/50">SLA Improvement</div>
                                    <div className="text-xs text-white/30 mt-1">Customer Support Optimization</div>
                                </div>
                                <div>
                                    <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-1 sm:mb-2">$2.1M</div>
                                    <div className="text-sm text-white/50">Fraud Flagged</div>
                                    <div className="text-xs text-white/30 mt-1">Automated Detection Pipeline</div>
                                </div>
                                <div>
                                    <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-1 sm:mb-2">89%</div>
                                    <div className="text-sm text-white/50">Prediction Accuracy</div>
                                    <div className="text-xs text-white/30 mt-1">Churn & Retention Model</div>
                                </div>
                                <div>
                                    <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-1 sm:mb-2">40%</div>
                                    <div className="text-sm text-white/50">Time Saved</div>
                                    <div className="text-xs text-white/30 mt-1">Invoice Analytics Dashboard</div>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </section>

                {/* ========================================
            WHAT I DO - NEW SECTION
            ======================================== */}
                <section className="py-16 sm:py-24 px-4 sm:px-6 relative z-20 bg-zinc-950">
                    <div className="max-w-6xl mx-auto">
                        <FadeIn>
                            <div className="grid md:grid-cols-2 gap-12 items-center">
                                <div>
                                    <span className="inline-block px-4 py-2 rounded-full glass text-xs font-semibold uppercase tracking-widest text-white/60 mb-6">
                                        What I Do
                                    </span>
                                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                                        Bridging the gap between <span className="gradient-text">data and decisions</span>
                                    </h2>
                                    <p className="text-white/60 leading-relaxed mb-6">
                                        I work at the intersection of business strategy and technical implementation. My role is to
                                        understand complex operational problems, quantify their impact, and build solutions that
                                        stakeholders can trust and adopt.
                                    </p>
                                    <p className="text-white/60 leading-relaxed">
                                        From SQL queries to predictive models to full-stack dashboards—I own the complete
                                        analytics lifecycle, ensuring that insights translate into tangible business outcomes.
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                    <div className="p-4 rounded-xl glass overflow-hidden">
                                        <div className="w-full h-20 mb-3 rounded-lg overflow-hidden">
                                            <Image src="/images/icon-data-analysis.png" alt="Data Analysis" width={160} height={80} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="font-semibold text-white mb-1">Data Analysis</div>
                                        <div className="text-sm text-white/50">SQL, Python, Statistical Methods</div>
                                    </div>
                                    <div className="p-4 rounded-xl glass overflow-hidden">
                                        <div className="w-full h-20 mb-3 rounded-lg overflow-hidden">
                                            <Image src="/images/icon-predictive-modeling.png" alt="Predictive Modeling" width={160} height={80} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="font-semibold text-white mb-1">Predictive Modeling</div>
                                        <div className="text-sm text-white/50">ML, Feature Engineering, Validation</div>
                                    </div>
                                    <div className="p-4 rounded-xl glass overflow-hidden">
                                        <div className="w-full h-20 mb-3 rounded-lg overflow-hidden">
                                            <Image src="/images/icon-visualization.png" alt="Visualization" width={160} height={80} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="font-semibold text-white mb-1">Visualization</div>
                                        <div className="text-sm text-white/50">Tableau, Dashboards, Storytelling</div>
                                    </div>
                                    <div className="p-4 rounded-xl glass overflow-hidden">
                                        <div className="w-full h-20 mb-3 rounded-lg overflow-hidden">
                                            <Image src="/images/icon-process-optimization.png" alt="Process Optimization" width={160} height={80} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="font-semibold text-white mb-1">Process Optimization</div>
                                        <div className="text-sm text-white/50">Root Cause Analysis, Simulation</div>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </section>

                {/* ========================================
            FEATURED PROJECTS
            ======================================== */}
                <section id="projects" className="py-32 px-6 relative z-20 bg-zinc-950 border-t border-white/10">
                    <div className="max-w-6xl mx-auto">
                        <FadeIn>
                            <div className="text-center mb-16">
                                <span className="inline-block px-4 py-2 rounded-full glass text-xs font-semibold uppercase tracking-widest text-white/60 mb-6">
                                    Flagship Projects
                                </span>
                                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                                    Work that <span className="gradient-text">delivers</span>
                                </h2>
                                <p className="text-white/50 max-w-2xl mx-auto">
                                    Each project represents a complete business problem solved end-to-end—from discovery
                                    and analysis to implementation and measurable results.
                                </p>
                            </div>
                        </FadeIn>

                        {/* Project Grid */}
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            <FadeIn delay={0.1}>
                                <div className="md:col-span-2">
                                    <ProjectCard
                                        href="/ba/project/sla-optimization"
                                        subtitle="Flagship • Operations"
                                        title="Customer Support SLA Optimization"
                                        description="Built a decision engine and ROI simulation model that identified optimal intervention points. Used cohort analysis and Monte Carlo simulation to prioritize high-impact, low-effort improvements."
                                        metric="34%"
                                        metricLabel="improvement"
                                        tags={["SQL", "Python", "Tableau", "Simulation"]}
                                    />
                                </div>
                            </FadeIn>

                            <FadeIn delay={0.2}>
                                <ProjectCard
                                    href="/ba/project/fraud-detection"
                                    subtitle="Flagship • Risk"
                                    title="Fraud Detection Pipeline"
                                    description="SQL-based monitoring with velocity rules, merchant scoring, and daily alerts."
                                    metric="$2.1M"
                                    metricLabel="flagged"
                                    tags={["SQL", "Window Functions", "PostgreSQL"]}
                                />
                            </FadeIn>

                            <FadeIn delay={0.3}>
                                <ProjectCard
                                    href="/ba/project/churn-predictor"
                                    subtitle="Flagship • ML"
                                    title="Churn & Retention Modeling"
                                    description="40+ engineered features, behavioral segmentation, and intervention playbook."
                                    metric="89%"
                                    metricLabel="accuracy"
                                    tags={["Python", "Scikit-learn", "XGBoost"]}
                                />
                            </FadeIn>

                            <FadeIn delay={0.4}>
                                <ProjectCard
                                    href="/ba/project/invoice-analytics"
                                    subtitle="Full-Stack • Web"
                                    title="Invoice Analytics Dashboard"
                                    description="React + FastAPI application with auto-categorization and anomaly detection."
                                    metric="40%"
                                    metricLabel="time saved"
                                    tags={["React", "FastAPI", "TypeScript"]}
                                />
                            </FadeIn>
                        </div>
                    </div>
                </section>

                {/* ========================================
            HOW I THINK
            ======================================== */}
                <section id="framework" className="py-32 px-6 border-t border-white/10 relative z-20 bg-zinc-950">
                    <div className="max-w-6xl mx-auto">
                        <FadeIn>
                            <div className="text-center mb-16">
                                <span className="inline-block px-4 py-2 rounded-full glass text-xs font-semibold uppercase tracking-widest text-white/60 mb-6">
                                    Methodology
                                </span>
                                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                                    How I <span className="gradient-text">think</span>
                                </h2>
                                <p className="text-white/50 max-w-2xl mx-auto">
                                    A systematic approach to solving business problems—from understanding the system
                                    to validating solutions to shipping tools teams will actually adopt.
                                </p>
                            </div>
                        </FadeIn>

                        <div className="grid gap-6 md:grid-cols-3">
                            <FadeIn delay={0.1}>
                                <GlowCard subtitle="01" title="Clarify the system">
                                    Map the complete flow from inputs to outcomes. Identify bottlenecks, dependencies, and hidden
                                    assumptions. Make the problem explicit before jumping to solutions.
                                </GlowCard>
                            </FadeIn>

                            <FadeIn delay={0.2}>
                                <GlowCard subtitle="02" title="Measure + validate">
                                    Establish baselines and define success metrics. Run tests, build prototypes, set thresholds.
                                    Use data to separate signal from noise and validate hypotheses before scaling.
                                </GlowCard>
                            </FadeIn>

                            <FadeIn delay={0.3}>
                                <GlowCard subtitle="03" title="Ship decisions">
                                    Build simulators, dashboards, and automated workflows that teams can actually use.
                                    Focus on adoption—the best analysis is worthless if it sits in a slide deck.
                                </GlowCard>
                            </FadeIn>
                        </div>
                    </div>
                </section>

                {/* ========================================
            CTA SECTION
            ======================================== */}
                <section className="py-32 px-6 relative z-20 bg-zinc-950">
                    <div className="max-w-4xl mx-auto text-center">
                        <FadeIn>
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
                                Ready to work <span className="gradient-text">together</span>?
                            </h2>
                            <p className="text-lg text-white/60 mb-12 max-w-xl mx-auto">
                                Whether you're facing operational challenges, building analytics capabilities,
                                or need help making sense of complex data—let's talk.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link href="/ba/contact" className="btn-primary group">
                                    Start a Conversation
                                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                                <Link href="/David_Ezieshi_Resume.pdf" target="_blank" className="btn-secondary">
                                    View Resume
                                </Link>
                            </div>
                        </FadeIn>
                    </div>
                </section>

                {/* ========================================
            FOOTER
            ======================================== */}
                <footer className="py-12 px-6 border-t border-white/10 relative z-20 bg-zinc-950">
                    <div className="max-w-6xl mx-auto flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full overflow-hidden">
                                <Image src="/images/avatar.png" alt="David Ezieshi" width={40} height={40} className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <span className="text-sm text-white font-medium">David Ezieshi</span>
                                <span className="text-xs text-white/50 block">Business Analyst</span>
                            </div>
                        </div>
                        <div className="flex gap-6 text-sm text-white/50">
                            <Link className="hover:text-white transition-colors" href="/ba/contact">Contact</Link>
                            <a className="hover:text-white transition-colors" href="https://www.linkedin.com/in/david-ezieshi/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                            <a className="hover:text-white transition-colors" href="https://github.com/ezieshie-stack" target="_blank" rel="noopener noreferrer">GitHub</a>
                        </div>
                        <span className="text-sm text-white/30">© {new Date().getFullYear()} All rights reserved</span>
                    </div>
                </footer>
            </div>
        </main>
    );
}
