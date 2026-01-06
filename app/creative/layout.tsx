import type { Metadata } from "next";
import { CreativeHeader } from "@/components/creative/CreativeHeader";
import CreativeFooter from "@/components/creative/CreativeFooter";
import { GridBackground } from "@/components/creative/GridBackground";
import { CreativeLiquidOrbs } from "@/components/creative/CreativeLiquidOrbs";
import { CreativeFlowLines } from "@/components/creative/CreativeFlowLines";
import { SmoothScroll } from "@/components/creative/SmoothScroll";
import Chatbot from "@/components/shared/Chatbot";

export const metadata: Metadata = {
    title: {
        default: "Thrills Motion | Creative Studio",
        template: "%s | Thrills Motion"
    },
    description: "Visual storytelling through event, lifestyle, and portrait photography.",
};

export default function CreativeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#050505] text-white relative overflow-hidden">
            <SmoothScroll />
            {/* Background Effects */}
            <GridBackground />
            <CreativeLiquidOrbs />
            <CreativeFlowLines />
            {/* GlowBorder Removed */}{" "}
            {/* Content */}
            <CreativeHeader />
            <div className="relative z-10">
                {children}
            </div>
            <CreativeFooter />
            <Chatbot />
        </div>
    );
}
