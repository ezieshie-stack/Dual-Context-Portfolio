"use client";

import Link from "next/link";
import contactData from "@/data/contact.json";

export default function CreativeFooter() {
    return (
        <footer className="relative z-20 border-t border-white/10 bg-[#050505]">
            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Top Row */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
                    {/* Logo */}
                    <Link href="/creative/home" className="text-2xl font-bold tracking-wider">
                        THRILLS MOTION
                    </Link>

                    {/* Navigation */}
                    <nav className="flex flex-wrap gap-6 text-sm text-white/60">
                        <Link href="/creative/home" className="hover:text-violet-400 transition-colors">
                            Home
                        </Link>
                        <Link href="/creative/portfolio" className="hover:text-violet-400 transition-colors">
                            Work
                        </Link>
                        <Link href="/creative/contact" className="hover:text-violet-400 transition-colors">
                            Contact
                        </Link>
                    </nav>
                </div>

                {/* Divider */}
                <div className="border-t border-white/10 my-8" />

                {/* Bottom Row */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    {/* Copyright */}
                    <p className="text-sm text-white/40">
                        © {new Date().getFullYear()} Thrills Motion. All rights reserved.
                    </p>

                    {/* Social Links */}
                    <div className="flex gap-6">
                        <a
                            href={contactData.creative.socials.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/40 hover:text-violet-400 transition-colors text-sm"
                        >
                            Instagram
                        </a>
                        <a
                            href={contactData.creative.socials.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/40 hover:text-violet-400 transition-colors text-sm"
                        >
                            LinkedIn
                        </a>
                        <a
                            href={contactData.creative.socials.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/40 hover:text-violet-400 transition-colors text-sm"
                        >
                            Twitter
                        </a>
                    </div>

                    {/* Switch to BA */}
                    <Link
                        href="/ba/home"
                        className="text-sm text-white/40 hover:text-white transition-colors"
                    >
                        → BA Portfolio
                    </Link>
                </div>
            </div>
        </footer>
    );
}
