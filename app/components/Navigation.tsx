"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Navigation() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const menuItems = [
        { label: "About", href: "#" },
        { label: "Experiences", href: "#experiences" },
        { label: "Gallery", href: "#" },
        { label: "Contact", href: "#" },
    ];

    return (
        <>
            <nav
                className={`fixed w-full z-50 flex items-center justify-between px-6 md:px-12 transition-all duration-300 ${isScrolled ? "py-4 bg-stone-900/90 backdrop-blur-md shadow-lg" : "py-6 bg-transparent"
                    }`}
            >
                {/* Menu Toggle */}
                <button
                    onClick={() => setIsMenuOpen(true)}
                    className="group flex items-center space-x-3 text-white hover:text-white/80 transition-colors"
                >
                    <div className="flex flex-col space-y-1.5 w-6">
                        <span className="block w-full h-px bg-current group-hover:w-4 transition-all duration-300"></span>
                        <span className="block w-full h-px bg-current"></span>
                    </div>
                    <span className="text-xs font-bold tracking-[0.2em] uppercase hidden md:inline-block">Menu</span>
                </button>

                {/* Logo */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                    <Link href="/" className="flex flex-col items-center group">
                        <span className="text-lg font-serif text-white tracking-[0.3em] uppercase group-hover:opacity-80 transition-opacity">
                            Ausan
                        </span>
                    </Link>
                </div>

                {/* Contact CTA */}
                <button className="hidden md:block border border-white/30 text-white px-6 py-2 rounded-sm text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-white hover:text-stone-900 transition-all backdrop-blur-sm">
                    Book Now
                </button>
            </nav>

            {/* Full Screen Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[60] bg-stone-950 flex flex-col justify-center items-center"
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className="absolute top-6 right-6 md:top-8 md:right-12 text-white/50 hover:text-white transition-colors"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>

                        {/* Menu Items */}
                        <div className="flex flex-col items-center space-y-8">
                            {menuItems.map((item, index) => (
                                <motion.div
                                    key={item.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                                >
                                    <RollingLettersLink
                                        href={item.href}
                                        label={item.label}
                                        onClick={() => setIsMenuOpen(false)}
                                    />
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-16 text-white/30 text-xs tracking-[0.2em] uppercase">
                            Ausan Beachfront
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

function RollingLettersLink({ href, label, onClick }: { href: string; label: string; onClick: () => void }) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className="group block overflow-hidden"
        >
            <div className="flex justify-center">
                {label.split('').map((char, i) => (
                    <span key={i} className="relative overflow-hidden">
                        <span
                            className="block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full"
                            style={{ transitionDelay: `${i * 30}ms` }}
                        >
                            <span
                                className="block text-3xl md:text-5xl font-serif text-white py-3 leading-tight"
                                style={{ fontFamily: 'var(--font-hatton), serif' }}
                            >
                                {char === " " ? "\u00A0" : char}
                            </span>
                            <span
                                className="absolute top-full left-0 block text-3xl md:text-5xl font-serif text-white py-3 leading-tight"
                                style={{ fontFamily: 'var(--font-hatton), serif' }}
                            >
                                {char === " " ? "\u00A0" : char}
                            </span>
                        </span>
                    </span>
                ))}
            </div>
        </Link>
    );
}
