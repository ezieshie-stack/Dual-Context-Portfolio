import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            keyframes: {
                floatSlow: {
                    "0%,100%": { transform: "translate3d(0,0,0) scale(1)" },
                    "50%": { transform: "translate3d(40px, 20px, 0) scale(1.05)" },
                },
                floatSlow2: {
                    "0%,100%": { transform: "translate3d(0,0,0) scale(1)" },
                    "50%": { transform: "translate3d(-35px, 25px, 0) scale(1.06)" },
                },
                floatSlow3: {
                    "0%,100%": { transform: "translate3d(0,0,0) scale(1)" },
                    "50%": { transform: "translate3d(25px, -25px, 0) scale(1.04)" },
                },
                orb1: {
                    "0%": { transform: "translate3d(0,0,0)", opacity: "0.65" },
                    "50%": { transform: "translate3d(30px, -18px, 0)", opacity: "1" },
                    "100%": { transform: "translate3d(0,0,0)", opacity: "0.65" },
                },
                orb2: {
                    "0%": { transform: "translate3d(0,0,0)", opacity: "0.7" },
                    "50%": { transform: "translate3d(-26px, 22px, 0)", opacity: "1" },
                    "100%": { transform: "translate3d(0,0,0)", opacity: "0.7" },
                },
                orb3: {
                    "0%": { transform: "translate3d(0,0,0)", opacity: "0.6" },
                    "50%": { transform: "translate3d(18px, 20px, 0)", opacity: "1" },
                    "100%": { transform: "translate3d(0,0,0)", opacity: "0.6" },
                },
            },
            animation: {
                floatSlow: "floatSlow 12s ease-in-out infinite",
                floatSlow2: "floatSlow2 14s ease-in-out infinite",
                floatSlow3: "floatSlow3 16s ease-in-out infinite",
                orb1: "orb1 8s ease-in-out infinite",
                orb2: "orb2 9s ease-in-out infinite",
                orb3: "orb3 10s ease-in-out infinite",
            },
        },
    },
    plugins: [],
};

export default config;
