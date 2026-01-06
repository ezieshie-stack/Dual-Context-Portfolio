"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, use } from "react";
import Link from "next/link";
import Image from "next/image";

// Image data for each category
const GALLERY_IMAGES: Record<string, string[]> = {
    events: [
        "IMG_6062.jpg", "IMG_6293.jpg", "IMG_6413.jpg", "IMG_6431.jpg",
        "IMG_6445.jpg", "IMG_6453.jpg", "IMG_6454.jpg", "IMG_6471.jpg",
        "IMG_6481.jpg", "IMG_6515.jpg", "IMG_6517.jpg", "IMG_6594.jpg",
        "IMG_6663.jpg", "IMG_6667.jpg"
    ],
    lifestyle: [
        "DSC02801.jpg", "DSC02810.jpg", "DSC02860.jpg", "DSC02863.jpg",
        "DSC02866.jpg", "DSC02869.jpg", "DSC02880.jpg", "DSC02928.jpg",
        "DSC_2623.jpg", "IMG_0924.jpg", "IMG_0926.jpg", "IMG_0930.jpg",
        "IMG_0931.jpg", "IMG_0961.jpg", "IMG_0964.jpg", "IMG_1002.jpg",
        "IMG_3368.jpg", "IMG_3380.jpg", "IMG_3382.jpg", "IMG_3389.jpg",
        "IMG_3749.jpg", "IMG_3770.jpg", "IMG_3782.jpg", "IMG_3834.jpg",
        "IMG_4078.jpg", "IMG_4111.jpg", "IMG_8787.jpg", "IMG_8788.jpg",
        "IMG_8791.jpg", "IMG_8799.jpg", "IMG_8806.jpg", "IMG_8808.jpg",
        "IMG_8833.jpg", "IMG_8834.jpg", "IMG_8845.jpg", "IMG_8846.jpg",
        "IMG_8850.jpg", "IMG_8860.jpg", "IMG_8865.jpg", "IMG_8887.jpg",
        "IMG_8888.jpg", "IMG_9123.jpg", "IMG_9138.jpg", "IMG_9142.jpg",
        "IMG_9856.jpg", "IMG_9957.jpg", "IMG_9989.jpg", "IMG_9990.jpg",
        "little.kiki_-20210101-0004.jpg"
    ],
    portraits: [
        "IMG_1005.jpg", "IMG_1006.jpg", "IMG_3025.jpg", "IMG_3031.jpg",
        "IMG_3032.jpg", "IMG_3034.jpg", "IMG_3035.jpg", "IMG_3036.jpg",
        "IMG_3039.jpg", "IMG_3040.jpg", "IMG_3043.jpg", "IMG_3044.jpg",
        "IMG_3045.jpg", "IMG_3047.jpg", "IMG_3048.jpg", "IMG_3050.jpg",
        "IMG_3053.jpg", "IMG_3054.jpg", "IMG_3056.jpg", "IMG_3058.jpg",
        "IMG_3061.jpg", "IMG_3062.jpg", "IMG_3077.jpg", "IMG_3084.jpg",
        "IMG_3098.jpg", "IMG_3124.jpg", "IMG_3130.jpg", "IMG_3142.jpg",
        "IMG_3155.jpg", "IMG_3168.jpg", "IMG_3176.jpg", "IMG_3177.jpg",
        "IMG_3178.jpg", "IMG_3181.jpg", "IMG_3185.jpg", "IMG_3186.jpg",
        "IMG_3188.jpg", "IMG_7404.jpg", "IMG_7406.jpg", "IMG_7408.jpg",
        "IMG_7415.jpg", "IMG_7418.jpg", "IMG_7419.jpg", "IMG_7420.jpg",
        "IMG_7421.jpg", "IMG_7422.jpg", "IMG_7423.jpg", "IMG_7425.jpg",
        "IMG_7427.jpg", "IMG_7466.jpg", "IMG_7470.jpg", "IMG_8588.jpg",
        "IMG_8599.jpg", "IMG_8605.jpg", "IMG_8609.jpg", "IMG_8757.jpg",
        "IMG_8779.jpg", "IMG_8782.jpg", "IMG_8783.jpg", "IMG_8786.jpg"
    ]
};

// Get column classes based on image count
const getColumnClasses = (imageCount: number) => {
    if (imageCount <= 15) {
        return "columns-2 md:columns-3 lg:columns-3"; // Fewer columns for less images
    } else if (imageCount <= 30) {
        return "columns-2 md:columns-3 lg:columns-4";
    } else {
        return "columns-3 md:columns-4 lg:columns-5"; // More columns for many images
    }
};

interface GalleryPageProps {
    params: Promise<{ category: string }>;
}

export default function GalleryPage({ params }: GalleryPageProps) {
    const { category } = use(params);
    const [hoveredImage, setHoveredImage] = useState<number | null>(null);

    // Scroll tracking for hiding header
    const { scrollY } = useScroll();
    const headerOpacity = useTransform(scrollY, [0, 100, 150], [1, 1, 0]);
    const headerY = useTransform(scrollY, [0, 100, 150], [0, 0, -100]);

    const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);
    const images = GALLERY_IMAGES[category] || [];
    const columnClasses = getColumnClasses(images.length);

    return (
        <main className="relative min-h-screen text-white bg-[#050505]">
            {/* Header - hides on scroll */}
            <motion.div
                className="fixed top-20 left-4 z-20 pointer-events-auto"
                style={{ opacity: headerOpacity, y: headerY }}
            >
                <Link
                    href="/creative/portfolio"
                    className="text-xs text-white/60 uppercase tracking-widest hover:text-violet-400 transition-colors mb-2 inline-block pointer-events-auto"
                >
                    ← Back
                </Link>
                <h1 className="text-3xl md:text-5xl font-black uppercase">
                    <span className="bg-gradient-to-r from-purple-400 to-violet-500 bg-clip-text text-transparent">
                        {categoryTitle}
                    </span>
                </h1>
            </motion.div>

            {/* Full-Screen Masonry Grid - no padding, fills screen */}
            <div className="min-h-screen">
                <div className={`${columnClasses} gap-1`}>
                    {images.map((imageName, i) => (
                        <motion.div
                            key={imageName}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.02 * i, duration: 0.4 }}
                            className="break-inside-avoid overflow-hidden cursor-pointer"
                            onMouseEnter={() => setHoveredImage(i)}
                            onMouseLeave={() => setHoveredImage(null)}
                        >
                            <div className="relative overflow-hidden">
                                {/* Image with natural aspect ratio */}
                                <Image
                                    src={`/images/creative/${category}/${imageName}`}
                                    alt={`${categoryTitle} photo ${i + 1}`}
                                    width={800}
                                    height={1200}
                                    className="w-full h-auto object-cover transition-transform duration-500"
                                    style={{
                                        transform: hoveredImage === i ? "scale(1.05)" : "scale(1)",
                                    }}
                                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                />

                                {/* Subtle overlay on hover */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"
                                    animate={{
                                        opacity: hoveredImage === i ? 0 : 0.2,
                                    }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </main>
    );
}
