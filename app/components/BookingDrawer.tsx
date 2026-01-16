"use client";

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBooking, BookingStep } from '../context/BookingContext';
import RoomList from './RoomList';
import PaymentForm from './PaymentForm';

// --- Placeholder Components for missing steps ---

const StepPlaceholder = ({ title, onNext }: { title: string; onNext: () => void }) => (
    <motion.div
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="space-y-6"
    >
        <h2 className="text-3xl" style={{ fontFamily: 'var(--font-hatton), serif' }}>{title}</h2>
        <p className="opacity-70 font-light">This step is under construction properly.</p>
        <button onClick={onNext} className="btn-primary mt-4 border-b border-current pb-1 uppercase text-xs tracking-widest">
            Proceed (Dev Skip)
        </button>
    </motion.div>
);

const SearchStep = () => {
    const { dispatch } = useBooking();
    return (
        <div className="space-y-6">
            <h2 className="text-3xl" style={{ fontFamily: 'var(--font-hatton), serif' }}>Check Availability</h2>
            <div className="space-y-4">
                {/* Search Form Inputs would go here */}
                <div className="p-4 border border-stone-900/20">
                    <p className="opacity-50 text-sm">Select Dates...</p>
                </div>
            </div>
            <button
                onClick={() => dispatch({ type: 'SET_STEP', payload: 'results' })}
                className="w-full py-4 bg-stone-900 text-[var(--stone-50)] uppercase tracking-widest text-xs font-bold"
            >
                Search Rooms
            </button>
        </div>
    );
}

const ConfirmationStep = () => (
    <div className="text-center space-y-6 py-20">
        <h2 className="text-4xl" style={{ fontFamily: 'var(--font-hatton), serif' }}>Thank You</h2>
        <p>Your sanctuary awaits.</p>
    </div>
)

// --- Drawer Component ---

export default function BookingDrawer() {
    const { state, dispatch } = useBooking();
    const { isDrawerOpen, step } = state;

    // Render the current step content
    const renderStep = () => {
        switch (step) {
            case 'search':
                return <SearchStep />;
            case 'results':
                return <RoomList />;
            case 'details':
                return <StepPlaceholder title="Room Details" onNext={() => dispatch({ type: 'SET_STEP', payload: 'guest_info' })} />;
            case 'guest_info':
                return <StepPlaceholder title="Guest Information" onNext={() => dispatch({ type: 'SET_STEP', payload: 'payment' })} />;
            case 'payment':
                return <PaymentForm />;
            case 'confirmation':
                return <ConfirmationStep />;
            default:
                return null;
        }
    };

    // Close with Escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') dispatch({ type: 'CLOSE_DRAWER' });
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [dispatch]);

    // Lock Body Scroll
    useEffect(() => {
        if (isDrawerOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isDrawerOpen]);

    return (
        <AnimatePresence>
            {isDrawerOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => dispatch({ type: 'CLOSE_DRAWER' })}
                        className="fixed inset-0 bg-black/40 z-40 will-change-opacity"
                    />

                    {/* Drawer Panel */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: '0%' }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className="fixed top-0 right-0 h-full w-full md:w-[600px] bg-[var(--stone-50)] text-stone-900 shadow-2xl z-50 overflow-y-auto will-change-transform"
                        data-lenis-prevent
                    >
                        <div className="flex flex-col min-h-full">

                            {/* Header */}
                            <div className="flex items-center justify-between p-6 md:p-10 border-b border-stone-900/10">
                                <div className="flex items-center space-x-2 text-xs uppercase tracking-widest opacity-60">
                                    <span className={step === 'search' ? 'font-bold opacity-100' : ''}>01</span>
                                    <span>/</span>
                                    <span className={step === 'results' ? 'font-bold opacity-100' : ''}>02</span>
                                    <span>/</span>
                                    <span className={step === 'details' ? 'font-bold opacity-100' : ''}>03</span>
                                    <span>/</span>
                                    <span className={step === 'payment' ? 'font-bold opacity-100' : ''}>05</span>
                                </div>

                                <button
                                    onClick={() => dispatch({ type: 'CLOSE_DRAWER' })}
                                    className="group flex items-center space-x-2 text-xs uppercase tracking-widest hover:opacity-70 transition-opacity"
                                >
                                    <span>Close</span>
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="stroke-current group-hover:rotate-90 transition-transform duration-300">
                                        <path d="M1 1L13 13M1 13L13 1" strokeWidth="1.5" strokeLinecap="square" />
                                    </svg>
                                </button>
                            </div>

                            {/* Content Area */}
                            <div className="flex-1 p-6 md:p-10">
                                {renderStep()}
                            </div>

                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
