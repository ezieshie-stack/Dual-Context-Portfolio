export function GlowBackground() {
    return (
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            {/* base vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_20%_10%,rgba(255,120,120,0.18),transparent_60%),radial-gradient(900px_500px_at_80%_20%,rgba(255,210,130,0.12),transparent_55%),radial-gradient(900px_700px_at_60%_85%,rgba(120,210,255,0.10),transparent_60%)]" />

            {/* soft blobs */}
            <div className="absolute -top-24 -left-24 h-[420px] w-[420px] rounded-full bg-rose-500/20 blur-3xl" />
            <div className="absolute top-10 right-[-120px] h-[520px] w-[520px] rounded-full bg-amber-400/15 blur-3xl" />
            <div className="absolute bottom-[-160px] left-[30%] h-[520px] w-[520px] rounded-full bg-sky-400/10 blur-3xl" />

            {/* subtle grid */}
            <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,rgba(255,255,255,0.25)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.25)_1px,transparent_1px)] [background-size:72px_72px]" />

            {/* vignette edges */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.65)_75%)]" />
        </div>
    );
}
