"use client";

// Optimized OrbField using CSS animations instead of Framer Motion
// CSS animations are GPU-accelerated and more performant

export function OrbField() {
    return (
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            {/* Orb 1 */}
            <div
                className="absolute rounded-full blur-2xl bg-rose-400/20 animate-drift-1"
                style={{ width: 220, height: 220, top: "18%", left: "58%" }}
            />
            {/* Orb 2 */}
            <div
                className="absolute rounded-full blur-2xl bg-amber-300/18 animate-drift-2"
                style={{ width: 160, height: 160, top: "56%", left: "14%" }}
            />
            {/* Orb 3 */}
            <div
                className="absolute rounded-full blur-2xl bg-sky-300/14 animate-drift-3"
                style={{ width: 260, height: 260, top: "62%", left: "68%" }}
            />
        </div>
    );
}
