"use client";

import { motion, AnimatePresence } from "framer-motion";

interface NewsletterModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function NewsletterModal({ isOpen, onClose }: NewsletterModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70]"
                    />

                    {/* Modal Container */}
                    <div className="fixed inset-0 flex items-center justify-center z-[80] p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-stone-900 border border-stone-800 p-8 md:p-12 max-w-lg w-full relative pointer-events-auto shadow-2xl"
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-stone-500 hover:text-white transition-colors"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>

                            <div className="text-center">
                                <span className="text-stone-400 text-xs font-bold tracking-[0.2em] uppercase mb-4 block" style={{ fontFamily: 'var(--font-messina), sans-serif' }}>
                                    Stay Updated
                                </span>
                                <h2 className="text-3xl md:text-4xl text-white font-serif mb-4" style={{ fontFamily: 'var(--font-hatton), serif' }}>
                                    Your Next Getaway
                                </h2>
                                <p className="text-stone-400 mb-8 font-light leading-relaxed" style={{ fontFamily: 'var(--font-messina), sans-serif' }}>
                                    Sign up for exclusive offers, travel inspiration, and the latest news from Ausan Beachfront.
                                </p>

                                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            placeholder="Your Email Address"
                                            className="w-full bg-stone-800 border-none text-white placeholder-stone-500 px-6 py-4 focus:ring-1 focus:ring-teal-500 outline-none transition-all"
                                            style={{ fontFamily: 'var(--font-messina), sans-serif' }}
                                        />
                                    </div>
                                    <button
                                        className="w-full bg-white text-stone-900 font-bold uppercase tracking-[0.2em] text-xs py-4 hover:bg-teal-200 transition-colors"
                                        style={{ fontFamily: 'var(--font-messina), sans-serif' }}
                                    >
                                        Subscribe
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
