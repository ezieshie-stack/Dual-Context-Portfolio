"use client";

export function GlowBorder() {
    return (
        <div
            aria-hidden
            className="pointer-events-none fixed inset-0 z-10"
            style={{
                boxShadow: `
                    inset 0 0 120px 40px rgba(147, 51, 234, 0.12),
                    inset 0 0 80px 20px rgba(168, 85, 247, 0.08),
                    inset 0 0 40px 10px rgba(139, 92, 246, 0.06)
                `,
            }}
        >
            {/* Top glow */}
            <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{
                    background: "linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.5), transparent)",
                    boxShadow: "0 0 20px 5px rgba(147, 51, 234, 0.3), 0 0 40px 10px rgba(139, 92, 246, 0.15)",
                }}
            />
            {/* Bottom glow */}
            <div
                className="absolute bottom-0 left-0 right-0 h-[2px]"
                style={{
                    background: "linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.5), transparent)",
                    boxShadow: "0 0 20px 5px rgba(147, 51, 234, 0.3), 0 0 40px 10px rgba(139, 92, 246, 0.15)",
                }}
            />
            {/* Left glow */}
            <div
                className="absolute top-0 bottom-0 left-0 w-[2px]"
                style={{
                    background: "linear-gradient(180deg, transparent, rgba(168, 85, 247, 0.5), transparent)",
                    boxShadow: "0 0 20px 5px rgba(147, 51, 234, 0.3), 0 0 40px 10px rgba(139, 92, 246, 0.15)",
                }}
            />
            {/* Right glow */}
            <div
                className="absolute top-0 bottom-0 right-0 w-[2px]"
                style={{
                    background: "linear-gradient(180deg, transparent, rgba(168, 85, 247, 0.5), transparent)",
                    boxShadow: "0 0 20px 5px rgba(147, 51, 234, 0.3), 0 0 40px 10px rgba(139, 92, 246, 0.15)",
                }}
            />
        </div>
    );
}
