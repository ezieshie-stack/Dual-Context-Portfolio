import type { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        default: "David Ezieshi | Business Analyst",
        template: "%s | David Ezieshi"
    },
    description: "Business Analyst specializing in data-driven solutions, predictive modeling, and operational optimization.",
};

export default function BALayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {children}
        </>
    );
}
