export function FlowLines() {
    return (
        <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full opacity-30"
            viewBox="0 0 1200 700"
            preserveAspectRatio="none"
        >
            <defs>
                <linearGradient id="glow" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="rgba(255,120,120,0)" />
                    <stop offset="45%" stopColor="rgba(255,160,120,0.55)" />
                    <stop offset="70%" stopColor="rgba(120,210,255,0.45)" />
                    <stop offset="100%" stopColor="rgba(255,210,130,0)" />
                </linearGradient>
                <filter id="softGlow">
                    <feGaussianBlur stdDeviation="2.5" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            <path
                d="M-50,520 C180,380 260,610 430,520 C650,400 710,470 840,380 C980,280 1050,330 1250,210"
                fill="none"
                stroke="url(#glow)"
                strokeWidth="2.2"
                filter="url(#softGlow)"
                className="flow-line"
            />
            <path
                d="M-60,260 C150,120 280,260 420,210 C640,130 760,190 910,120 C1040,60 1120,90 1260,40"
                fill="none"
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="1.2"
                className="flow-line flow-line--alt"
            />
        </svg>
    );
}
