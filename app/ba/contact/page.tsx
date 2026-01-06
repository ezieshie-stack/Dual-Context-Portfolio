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

// Contact information - Updated with real URLs
const CONTACT_INFO = {
    email: "Ezieshie@gmail.com",
    linkedin: "https://www.linkedin.com/in/david-ezieshi/",
    github: "https://github.com/ezieshie-stack",
    calendly: "https://calendly.com/ezieshie",
};

export default function ContactPage() {
    const contactOptions = [
        {
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            title: "Email",
            description: "For detailed inquiries or project discussions",
            action: `mailto:${CONTACT_INFO.email}`,
            actionLabel: "Send Email",
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
            ),
            title: "LinkedIn",
            description: "Connect professionally and stay updated",
            action: CONTACT_INFO.linkedin,
            actionLabel: "View Profile",
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
            ),
            title: "GitHub",
            description: "Explore my projects and code",
            action: CONTACT_INFO.github,
            actionLabel: "View Code",
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            ),
            title: "Schedule a Call",
            description: "Book a 30-minute introductory chat",
            action: CONTACT_INFO.calendly,
            actionLabel: "Book Time",
        },
    ];

    return (
        <main className="relative min-h-screen bg-zinc-950 text-white overflow-hidden">
            <BAHeader />
            <GlowBackground />
            <FlowLines />
            <OrbField />
            <Chatbot />

            <div className="relative z-10 pt-32 pb-20 px-4 sm:px-6">
                <div className="max-w-3xl mx-auto">
                    {/* Header */}
                    <FadeIn>
                        <div className="text-center mb-12">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
                                Let's <span className="gradient-text">Connect</span>
                            </h1>
                            <p className="text-lg text-white/60 max-w-xl mx-auto">
                                Whether you're facing operational challenges, building analytics capabilities,
                                or just want to chat about data—I'd love to hear from you.
                            </p>
                        </div>
                    </FadeIn>

                    {/* Contact Options Grid */}
                    <FadeIn delay={0.1}>
                        <div className="grid gap-4 sm:grid-cols-2 mb-12">
                            {contactOptions.map((option, i) => (
                                <a
                                    key={i}
                                    href={option.action}
                                    target={option.action.startsWith("mailto") ? undefined : "_blank"}
                                    rel="noopener noreferrer"
                                    className="group p-6 rounded-2xl glass hover:border-white/20 transition-all"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-500/20 to-amber-500/20 flex items-center justify-center text-white/70 group-hover:text-white transition-colors">
                                            {option.icon}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-white mb-1">{option.title}</h3>
                                            <p className="text-sm text-white/50 mb-3">{option.description}</p>
                                            <span className="inline-flex items-center gap-1 text-sm font-medium text-white/70 group-hover:text-white transition-colors">
                                                {option.actionLabel}
                                                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </FadeIn>

                    {/* Quick Note */}
                    <FadeIn delay={0.2}>
                        <div className="text-center p-6 rounded-2xl glass">
                            <div className="flex justify-center mb-4">
                                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/10">
                                    <Image
                                        src="/images/avatar.png"
                                        alt="David Ezieshi"
                                        width={64}
                                        height={64}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                            <p className="text-white/60 mb-4">
                                I typically respond within 24 hours. For quick questions,
                                feel free to use the chat widget in the corner!
                            </p>
                            <Link href="/ba/home" className="btn-secondary text-sm">
                                ← Back to Home
                            </Link>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </main>
    );
}
