import Link from "next/link";

export default function BAFooter() {
    return (
        <footer className="bg-neutral-50 border-t border-neutral-200 py-12 mt-auto">
            <div className="max-w-6xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    {/* Brand */}
                    <div className="text-center md:text-left">
                        <p className="font-semibold text-neutral-900">David Thrills</p>
                        <p className="text-sm text-neutral-500">Business Analyst & Process Optimizer</p>
                    </div>

                    {/* Quick Links */}
                    <nav className="flex items-center gap-6 text-sm text-neutral-600">
                        <Link href="/ba/home" className="hover:text-neutral-900 transition-colors">
                            Home
                        </Link>
                        <Link href="/ba/about" className="hover:text-neutral-900 transition-colors">
                            About
                        </Link>
                        <Link href="/ba/home#projects" className="hover:text-neutral-900 transition-colors">
                            Projects
                        </Link>
                    </nav>

                    {/* Copyright */}
                    <p className="text-xs text-neutral-400">
                        © {new Date().getFullYear()} David Thrills. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
