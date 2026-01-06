import Link from "next/link";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-8 lg:p-24 bg-neutral-900 text-white">
            <div className="z-10 max-w-5xl w-full flex flex-col items-center text-center font-mono text-sm lg:flex">

                <h1 className="text-4xl md:text-6xl font-sans font-bold mb-12 tracking-tight">
                    What would you like to explore?
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">

                    {/* OPTION A: Business Analysis */}
                    <Link
                        href="/ba/home"
                        className="group relative flex flex-col items-center justify-center p-12 border border-neutral-700 bg-neutral-800/50 hover:bg-neutral-800 transition-all duration-300 rounded-xl hover:scale-[1.02] hover:shadow-2xl hover:border-blue-500/50"
                    >
                        <h2 className="text-2xl font-bold mb-4 group-hover:text-blue-400 transition-colors">
                            Business Analysis<br />& Optimization
                        </h2>
                        <p className="text-neutral-400 max-w-xs">
                            Systems thinking, ROI modeling, and end-to-end operational analytics.
                        </p>
                    </Link>

                    {/* OPTION B: Creative Work */}
                    <Link
                        href="/creative/home"
                        className="group relative flex flex-col items-center justify-center p-12 border border-neutral-700 bg-neutral-800/50 hover:bg-neutral-800 transition-all duration-300 rounded-xl hover:scale-[1.02] hover:shadow-2xl hover:border-purple-500/50"
                    >
                        <h2 className="text-2xl font-bold mb-4 group-hover:text-purple-400 transition-colors">
                            Creative Work<br />& Vibe Coding
                        </h2>
                        <p className="text-neutral-400 max-w-xs">
                            Visual design, fluid motion, and aesthetic experiments.
                        </p>
                    </Link>

                </div>
            </div>
        </main>
    );
}
