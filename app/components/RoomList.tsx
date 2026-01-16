"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useBooking, Room } from '../context/BookingContext';

// Mock Data (replace with API call)
const MOCK_ROOMS: Room[] = [
    {
        id: '1',
        name: 'Ocean Pool Villa',
        description: 'A private sanctuary suspended over the turquoise lagoon.',
        pricePerNight: 850,
        image: '/images/villa.jpg',
    },
    {
        id: '2',
        name: 'Beachfront Suite',
        description: 'Direct access to the pristine white sands.',
        pricePerNight: 650,
        image: '/images/dining.jpg',
    },
];

export default function RoomList() {
    const { dispatch } = useBooking();
    const [loading, setLoading] = useState(true);

    // Simulate loading
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    const handleSelectRoom = (room: Room) => {
        dispatch({ type: 'SELECT_ROOM', payload: room });
        // Navigation to next step is handled in reducer or here
        dispatch({ type: 'SET_STEP', payload: 'details' });
    };

    if (loading) {
        return <div className="space-y-6">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
        </div>;
    }

    return (
        <div className="space-y-8 pb-10">
            <div className="space-y-2">
                <h2 className="text-3xl" style={{ fontFamily: 'var(--font-hatton), serif' }}>
                    Select Your Sanctuary
                </h2>
                <p className="opacity-70 font-light">
                    Choose from our exclusive collection of villas and suites.
                </p>
            </div>

            <div className="grid gap-8">
                {MOCK_ROOMS.map((room) => (
                    <motion.div
                        key={room.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="group relative bg-white border border-stone-900/10 overflow-hidden"
                    >
                        {/* Image Aspect Ratio Container */}
                        <div className="relative aspect-[16/9] overflow-hidden">
                            <Image
                                src={room.image}
                                alt={room.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>

                        <div className="p-6 space-y-4">
                            <div className="flex justify-between items-start">
                                <h3 className="text-2xl" style={{ fontFamily: 'var(--font-hatton), serif' }}>
                                    {room.name}
                                </h3>
                                <span className="text-lg font-medium">${room.pricePerNight} <span className="text-xs opacity-60 font-normal">/ night</span></span>
                            </div>

                            <p className="text-sm opacity-70 leading-relaxed font-light">
                                {room.description}
                            </p>

                            <button
                                onClick={() => handleSelectRoom(room)}
                                className="w-full mt-4 py-3 border border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-[var(--stone-50)] transition-colors uppercase tracking-widest text-xs font-bold"
                            >
                                Select Room
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

function SkeletonCard() {
    return (
        <div className="w-full h-[400px] bg-black/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-full h-full -translate-x-full animate-[shimmer_1.5s_infinite]" />
        </div>
    );
}
