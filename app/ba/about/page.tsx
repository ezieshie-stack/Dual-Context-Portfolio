"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { GlowBackground } from "@/components/ambient/GlowBackground";
import { OrbField } from "@/components/ambient/OrbField";
import { FlowLines } from "@/components/ambient/FlowLines";
import BAHeader from "@/components/ba/BAHeader";
import Chatbot from "@/components/shared/Chatbot";

// Animation wrapper
function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay }}
        >
            {children}
        </motion.div>
    );
}

export default function AboutPage() {
    const skills = [
        { category: "Data & Analytics", items: ["SQL (Window Functions, CTEs)", "Python (Pandas, NumPy)", "Statistical Analysis", "A/B Testing"] },
        { category: "Visualization", items: ["Tableau", "Power BI", "Recharts", "Excel Dashboards"] },
        { category: "Process & Systems", items: ["Root Cause Analysis", "Process Mapping", "Requirements Gathering", "Stakeholder Management"] },
        { category: "Technical", items: ["React / Next.js", "TypeScript", "FastAPI", "Git / GitHub"] },
    ];

    const methodology = [
        { step: "1", title: "Clarify the System", description: "Map the current state, identify stakeholders, and understand the business context before jumping to solutions." },
        { step: "2", title: "Measure & Validate", description: "Establish baselines, define success metrics, and validate assumptions with data before proposing changes." },
        { step: "3", title: "Simulate & Test", description: "Model potential outcomes, run scenarios, and use data to de-risk decisions before implementation." },
        { step: "4", title: "Ship & Iterate", description: "Deliver working solutions that teams can actually use, then measure results and optimize continuously." },
    ];

    return (
        <main className="relative min-h-screen bg-zinc-950 text-white overflow-hidden">
            <BAHeader />
            <GlowBackground />
            <FlowLines />
            <OrbField />
            <Chatbot />

            <div className="relative z-10 pt-32 pb-20 px-4 sm:px-6">
                <div className="max-w-4xl mx-auto">
                    {/* Hero Section */}
                    <FadeIn>
                        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 mb-12">
                            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-2 border-white/10">
                                <Image
                                    src="/images/avatar.png"
                                    alt="David Ezieshi"
                                    width={144}
                                    height={144}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="text-center sm:text-left">
                                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-2">
                                    David Ezieshi
                                </h1>
                                <p className="text-lg text-white/60 mb-4">
                                    Business Analyst & Process Optimizer
                                </p>
                                <div className="flex flex-wrap justify-center sm:justify-start gap-3">
                                    <Link href="/David_Ezieshi_Resume.pdf" target="_blank" className="btn-primary text-sm">
                                        Download Resume
                                    </Link>
                                    <Link href="/ba/contact" className="btn-secondary text-sm">
                                        Get in Touch
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </FadeIn>

                    {/* Bio Section */}
                    <FadeIn delay={0.1}>
                        <section className="mb-16">
                            <h2 className="text-2xl font-bold mb-4">About Me</h2>
                            <div className="space-y-4 text-white/70 leading-relaxed">
                                <p>
                                    I'm a Business Analyst focused on optimization, automation, and data-driven decision-making.
                                    I turn messy operations into measurable, automated, optimized systems.
                                </p>
                                <p>
                                    With strong experience in SQL, Python, statistical analysis, and end-to-end analytics projects,
                                    I specialize in bridging business problems, user needs, and technical execution. My flagship
                                    projects include SLA optimization, fraud detection, churn prediction, and invoice analytics.
                                </p>
                                <p>
                                    I approach every problem systematically: first understand the system, then measure what matters,
                                    simulate different scenarios, and finally ship solutions that teams can actually use.
                                </p>
                            </div>
                        </section>
                    </FadeIn>

                    {/* Skills Grid */}
                    <FadeIn delay={0.15}>
                        <section className="mb-16">
                            <h2 className="text-2xl font-bold mb-6">Skills & Tools</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {skills.map((skill, i) => (
                                    <div key={i} className="p-5 rounded-xl glass">
                                        <h3 className="font-semibold text-white mb-3">{skill.category}</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {skill.items.map((item, j) => (
                                                <span key={j} className="px-3 py-1 text-sm rounded-full bg-white/10 text-white/70">
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </FadeIn>

                    {/* Methodology */}
                    <FadeIn delay={0.2}>
                        <section className="mb-16">
                            <h2 className="text-2xl font-bold mb-6">How I Work</h2>
                            <div className="space-y-4">
                                {methodology.map((step, i) => (
                                    <div key={i} className="flex gap-4 p-4 rounded-xl glass">
                                        <span className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-amber-500 flex items-center justify-center font-bold">
                                            {step.step}
                                        </span>
                                        <div>
                                            <h3 className="font-semibold text-white mb-1">{step.title}</h3>
                                            <p className="text-sm text-white/60">{step.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </FadeIn>

                    {/* CTA */}
                    <FadeIn delay={0.25}>
                        <section className="text-center p-8 rounded-2xl glass">
                            <h2 className="text-2xl font-bold mb-4">Let's Work Together</h2>
                            <p className="text-white/60 mb-6 max-w-lg mx-auto">
                                Looking for a Business Analyst who can bridge data and decisions? Let's talk about how I can help.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Link href="/ba/contact" className="btn-primary">
                                    Start a Conversation
                                </Link>
                                <Link href="/ba/home#projects" className="btn-secondary">
                                    View Projects
                                </Link>
                            </div>
                        </section>
                    </FadeIn>
                </div>
            </div>
        </main>
    );
}
