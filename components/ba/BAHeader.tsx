"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function BAHeader() {
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Show glass effect when scrolled
            setScrolled(currentScrollY > 50);

            // Faster hide/show: only need 5px difference and 80px threshold
            if (currentScrollY > lastScrollY.current + 5 && currentScrollY > 80) {
                setHidden(true);
                setMobileMenuOpen(false);
            } else if (currentScrollY < lastScrollY.current - 5) {
                setHidden(false);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const pathname = usePathname();
    const isActive = (path: string) => pathname === path;

    // Function to scroll to projects section (fixes same-hash bug)
    const scrollToProjects = (e: React.MouseEvent) => {
        // If we're already on the home page, prevent default and scroll manually
        if (pathname === '/ba/home' || pathname.startsWith('/ba/home')) {
            e.preventDefault();
            const projectsSection = document.getElementById('projects');
            if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-200 ${hidden ? "-translate-y-full" : "translate-y-0"
                    } ${scrolled
                        ? "py-2 sm:py-3 glass border-b border-white/10"
                        : "py-3 sm:py-5 bg-transparent"
                    }`}
            >
                <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
                    {/* Logo / Brand with Avatar */}
                    <Link href="/ba/home" className="flex items-center gap-2 sm:gap-3">
                        <div className={`rounded-full overflow-hidden transition-all duration-200 ${scrolled ? "w-8 h-8 sm:w-9 sm:h-9" : "w-9 h-9 sm:w-11 sm:h-11"
                            }`}>
                            <Image
                                src="/images/avatar.png"
                                alt="David Ezieshi"
                                width={44}
                                height={44}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <span className={`font-semibold text-white transition-all duration-200 block ${scrolled ? "text-sm sm:text-base" : "text-base sm:text-lg"
                                }`}>
                                David Ezieshi
                            </span>
                            <span className="text-[9px] sm:text-[10px] text-white/50 font-medium uppercase tracking-widest">
                                Business Analyst
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        <Link
                            href="/ba/home"
                            className={`text-sm font-medium transition-colors relative ${isActive("/ba/home")
                                ? "text-white"
                                : "text-white/60 hover:text-white"
                                }`}
                        >
                            Home
                            {isActive("/ba/home") && (
                                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-rose-500 to-amber-500 rounded-full" />
                            )}
                        </Link>
                        <Link
                            href="/ba/home#projects"
                            onClick={scrollToProjects}
                            className={`text-sm font-medium transition-colors relative ${pathname.startsWith("/ba/project")
                                ? "text-white"
                                : "text-white/60 hover:text-white"
                                }`}
                        >
                            Projects
                            {pathname.startsWith("/ba/project") && (
                                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-rose-500 to-amber-500 rounded-full" />
                            )}
                        </Link>
                        <Link
                            href="/ba/about"
                            className={`text-sm font-medium transition-colors relative ${isActive("/ba/about")
                                ? "text-white"
                                : "text-white/60 hover:text-white"
                                }`}
                        >
                            About
                            {isActive("/ba/about") && (
                                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-rose-500 to-amber-500 rounded-full" />
                            )}
                        </Link>
                    </nav>

                    {/* Right side: Resume + Mobile Menu */}
                    <div className="flex items-center gap-2 sm:gap-4">
                        <Link
                            href="/Thrillsmotions"
                            className="hidden lg:block text-xs font-medium text-white/50 hover:text-white transition-colors px-3 py-1.5 rounded-full border border-white/10 hover:border-white/25"
                        >
                            Switch to Creative →
                        </Link>
                        <Link
                            href="/David_Ezieshi_Resume.pdf"
                            target="_blank"
                            className="text-xs sm:text-sm font-medium text-zinc-950 bg-white hover:bg-white/90 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-all hover:scale-105"
                        >
                            Resume
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden w-11 h-11 flex items-center justify-center rounded-full glass"
                        >
                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {mobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="fixed top-16 left-0 right-0 z-[100] md:hidden"
                    >
                        <div className="mx-4 p-4 rounded-2xl bg-zinc-900/95 backdrop-blur-xl border border-white/10 shadow-2xl">
                            <nav className="flex flex-col gap-3">
                                <Link
                                    href="/ba/home"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium ${isActive("/ba/home") ? "bg-white/10 text-white" : "text-white/70"
                                        }`}
                                >
                                    Home
                                </Link>
                                <Link
                                    href="/ba/home#projects"
                                    onClick={(e) => { scrollToProjects(e); setMobileMenuOpen(false); }}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium ${pathname.startsWith("/ba/project") ? "bg-white/10 text-white" : "text-white/70"
                                        }`}
                                >
                                    Projects
                                </Link>
                                <Link
                                    href="/ba/about"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium ${isActive("/ba/about") ? "bg-white/10 text-white" : "text-white/70"
                                        }`}
                                >
                                    About
                                </Link>
                                <hr className="border-white/10" />
                                <Link
                                    href="/Thrillsmotions"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="px-4 py-2 rounded-lg text-sm font-medium text-white/50"
                                >
                                    Switch to Creative →
                                </Link>
                            </nav>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
