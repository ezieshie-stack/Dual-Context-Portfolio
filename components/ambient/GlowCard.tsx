import React from "react";

export function GlowCard({
    title,
    subtitle,
    metric,
    metricLabel,
    children,
}: {
    title: string;
    subtitle?: string;
    metric?: string;
    metricLabel?: string;
    children?: React.ReactNode;
}) {
    return (
        <div className="group relative rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur-xl transition hover:-translate-y-1 hover:border-white/15">
            {/* glow ring */}
            <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 blur-xl transition group-hover:opacity-100 bg-[radial-gradient(600px_circle_at_30%_20%,rgba(255,140,140,0.25),transparent_40%),radial-gradient(600px_circle_at_70%_70%,rgba(120,210,255,0.18),transparent_45%)]" />
            <div className="relative">
                {subtitle && (
                    <div className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-2">{subtitle}</div>
                )}
                <div className="text-xl font-semibold text-white">{title}</div>
                {children && <div className="mt-3 text-sm text-white/60 leading-relaxed">{children}</div>}
                {metric && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                        <span className="text-3xl font-bold text-white">{metric}</span>
                        {metricLabel && <span className="ml-2 text-sm text-white/50">{metricLabel}</span>}
                    </div>
                )}
            </div>
        </div>
    );
}
