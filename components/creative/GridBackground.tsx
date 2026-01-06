"use client";

export function GridBackground() {
    return (
        <div
            aria-hidden
            className="pointer-events-none fixed inset-0 z-0"
            style={{
                backgroundImage: `
                    radial-gradient(circle at center, rgba(255,255,255,0.015) 1px, transparent 1px)
                `,
                backgroundSize: "24px 24px",
            }}
        />
    );
}
