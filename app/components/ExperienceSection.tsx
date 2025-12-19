"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const experiences = [
    {
        title: "Private Villas",
        description: "Wake up to the sound of waves in your own private sanctuary over the water, designed for absolute seclusion and comfort.",
        image: "/images/villa.png",
        cta: "Discover More",
    },
    {
        title: "Gourmet Dining",
        description: "Savor exquisite flavors freshly prepared by our world-class chefs under the stars, blending local ingredients with global culinary art.",
        image: "/images/dining.png",
        cta: "View Menus",
    },
    {
        title: "Wellness & Spa",
        description: "Rejuvenate your body and mind with treatments inspired by ancient island traditions, surrounded by the calming sounds of nature.",
        image: "/images/spa.png",
        cta: "Relax Now",
    },
];

export default function ExperienceSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    return (
        // Height is number of items * 100vh to allow enough scrolling space (scrubbing)
        <div ref={containerRef} id="experiences" className="relative h-[300vh] bg-stone-900 font-sans">
            <div className="sticky top-0 h-screen overflow-hidden">
                {experiences.map((exp, i) => {
                    // Calculate range for this card's reveal
                    // Since we have 3 items total, and we want to scroll through them.
                    // Card 0 is the base.
                    // Card 1 reveals from 0% to 50% of the scroll progress?
                    // We distributed 300vh.
                    // 0-100vh: Card 1 static.
                    // 100-200vh: Card 2 reveals over Card 1.
                    // 200-300vh: Card 3 reveals over Card 2.

                    // Normalized ranges:
                    // Card 1: 0 - 0 
                    // Card 2: 0 - 0.5 (of the scrollable area actually)
                    // Let's simpler logic:
                    // scrollYProgress 0 -> 1
                    // i=0: always visible (base layer)
                    // i=1: reveals from 0.0 to 0.5
                    // i=2: reveals from 0.5 to 1.0

                    const start = (i - 1) / (experiences.length - 1); // For i=1: 0. For i=2: 0.5
                    const end = i / (experiences.length - 1);       // For i=1: 0.5. For i=2: 1.0

                    // If it's the first card, no transform needed, it's the base.
                    if (i === 0) {
                        return <Card key={i} experience={exp} zIndex={i} progress={scrollYProgress} range={[0, 0]} isBase={true} />;
                    }

                    return (
                        <Card
                            key={i}
                            experience={exp}
                            zIndex={i}
                            progress={scrollYProgress}
                            range={[start, end]}
                            isBase={false}
                        />
                    );
                })}
            </div>
        </div>
    );
}

function Card({
    experience,
    zIndex,
    progress,
    range,
    isBase
}: {
    experience: typeof experiences[0];
    zIndex: number;
    progress: MotionValue<number>;
    range: [number, number];
    isBase: boolean;
}) {
    // Reveal effect: clip-path "curtain" from bottom-up or simple opacity?
    // User asked for "sync with scroll". Clip path is very tangible.
    // Let's do a clip-path inset from bottom.
    // Range [start, end] => clip path 100% -> 0%

    const clipProgress = useTransform(progress, range, [100, 0]);
    const clipPath = useTransform(clipProgress, (val) => {
        // If it's base, always fully visible (inset 0).
        if (isBase) return `inset(0% 0 0 0)`;
        // Otherwise calculate inset from bottom (revealing from top? or revealing from bottom?)
        // Let's reveal from bottom to top for a "rising" effect, or just a simple wipe.
        // inset(top right bottom left)
        // Reveal from bottom: inset(0 0 val% 0) means it is clipped from bottom. 
        // Wait, standard parallax usually wipes UP. meaning the new slide comes from the bottom.
        // So initially it is `inset(100% 0 0 0)` (all clipped from top). as val -> 0, it reveals.
        // Let's try revealing from the Bottom: `inset(${val}% 0 0 0)` triggers a wipe from top down?
        // No, `inset(100% 0 0 0)` means visible region starts at 100% top (hidden).
        // `inset(0% 0 0 0)` means visible region starts at 0% top (fully visible).
        // So this wipes Top-to-Bottom. Like a curtain falling.
        return `inset(${val}% 0 0 0)`;
    });

    const textOpacity = useTransform(progress, range, [0, 1]);
    const textY = useTransform(progress, range, [100, 0]);

    return (
        <motion.div
            className="absolute inset-0 w-full h-full"
            style={{ zIndex, clipPath }}
        >
            <Image
                src={experience.image}
                alt={experience.title}
                fill
                className="object-cover"
                quality={90}
                priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute bottom-0 left-0 p-8 md:p-16 lg:p-24 w-full">
                <motion.div style={{ opacity: isBase ? 1 : textOpacity, y: isBase ? 0 : textY }}>
                    <h3 className="text-4xl md:text-5xl lg:text-6xl text-white mb-6 tracking-tight" style={{ fontFamily: 'var(--font-hatton), serif' }}>
                        {experience.title}
                    </h3>
                    <p className="text-white/80 text-lg md:text-xl max-w-lg mb-8" style={{ fontFamily: 'var(--font-messina), sans-serif' }}>
                        {experience.description}
                    </p>
                    <span className="inline-flex items-center space-x-2 text-white text-xs font-bold tracking-[0.2em] uppercase border-b border-white/30 pb-2 hover:border-white transition-colors cursor-pointer">
                        <span>{experience.cta}</span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </span>
                </motion.div>
            </div>
        </motion.div>
    );
}
