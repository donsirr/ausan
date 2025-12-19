"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        // Disable scrolling
        document.body.style.overflow = "hidden";

        // Counter animation
        const interval = setInterval(() => {
            setCounter((prev) => {
                if (prev < 100) {
                    return prev + 1;
                } else {
                    clearInterval(interval);
                    return 100;
                }
            });
        }, 20); // 20ms * 100 = 2000ms total duration roughly

        // Complete loading after the counter finishes + a small buffer
        const timer = setTimeout(() => {
            setIsLoading(false);
            document.body.style.overflow = "unset";
        }, 2500);

        return () => {
            clearInterval(interval);
            clearTimeout(timer);
            document.body.style.overflow = "unset";
        };
    }, []);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[100] bg-stone-950 flex flex-col items-center justify-center font-serif text-white overflow-hidden"
                    initial={{ y: 0 }}
                    exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
                >
                    {/* Logo / Text */}
                    <div className="overflow-hidden mb-4 px-4 py-4 text-center">
                        <motion.h1
                            className="text-3xl md:text-5xl lg:text-7xl tracking-tight leading-relaxed"
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                            style={{ fontFamily: 'var(--font-hatton), serif' }}
                        >
                            Ausan Beachfront
                        </motion.h1>
                    </div>

                    {/* Counter */}
                    <div className="absolute bottom-10 right-10 md:bottom-20 md:right-20">
                        <span
                            className="text-xl md:text-3xl font-light opacity-80 tabular-nums"
                            style={{ fontFamily: 'var(--font-hatton), serif' }}
                        >
                            {counter}%
                        </span>
                    </div>

                    {/* Loading Bar (Optional line) */}
                    <div className="absolute left-0 top-0 h-1 bg-white/20 w-full">
                        <motion.div
                            className="h-full bg-white"
                            initial={{ width: 0 }}
                            animate={{ width: `${counter}%` }}
                            transition={{ ease: "linear", duration: 0.02 }} // visual sync mostly handled by state update rate
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
