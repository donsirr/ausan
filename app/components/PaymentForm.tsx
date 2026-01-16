"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { useBooking } from '../context/BookingContext';

// --- Zod Schema ---
const paymentSchema = z.object({
    cardholderName: z.string().min(2, "Cardholder name is required"),
    cardNumber: z.string().regex(/^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/, "Invalid card number"),
    expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, "Invalid expiry (MM/YY)"),
    cvc: z.string().regex(/^\d{3,4}$/, "Invalid CVC"),
});

type PaymentFormData = z.infer<typeof paymentSchema>;

export default function PaymentForm() {
    const { dispatch } = useBooking();
    const { register, handleSubmit, formState: { errors } } = useForm<PaymentFormData>({
        resolver: zodResolver(paymentSchema),
    });

    const onSubmit = (data: PaymentFormData) => {
        console.log("Payment Info Validated:", data);
        // Simulate API tokenization
        dispatch({ type: 'SET_GUEST_DETAILS', payload: { paymentToken: 'tok_mock_123' } });
        dispatch({ type: 'SET_STEP', payload: 'confirmation' });
    };

    return (
        <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="space-y-6"
        >
            <div className="space-y-2 mb-8">
                <h2 className="text-3xl" style={{ fontFamily: 'var(--font-hatton), serif' }}>
                    Secure Payment
                </h2>
                <p className="opacity-70 font-light text-sm">
                    Complete your reservation securely. No charges until check-in.
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Cardholder Name */}
                <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-semibold opacity-80">
                        Cardholder Name
                    </label>
                    <input
                        {...register('cardholderName')}
                        className="w-full bg-transparent border-b border-stone-900/30 py-3 text-lg focus:border-stone-900 focus:outline-none transition-colors"
                        placeholder="JACOB JONES"
                    />
                    {errors.cardholderName && (
                        <p className="text-red-500 text-xs mt-1">{errors.cardholderName.message}</p>
                    )}
                </div>

                {/* Card Number */}
                <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-semibold opacity-80">
                        Card Number
                    </label>
                    <input
                        {...register('cardNumber')}
                        className="w-full bg-transparent border-b border-stone-900/30 py-3 text-lg focus:border-stone-900 focus:outline-none transition-colors font-mono"
                        placeholder="0000 0000 0000 0000"
                    />
                    {errors.cardNumber && (
                        <p className="text-red-500 text-xs mt-1">{errors.cardNumber.message}</p>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-8">
                    {/* Expiry */}
                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest font-semibold opacity-80">
                            Expiry Date
                        </label>
                        <input
                            {...register('expiryDate')}
                            className="w-full bg-transparent border-b border-stone-900/30 py-3 text-lg focus:border-stone-900 focus:outline-none transition-colors font-mono"
                            placeholder="MM/YY"
                        />
                        {errors.expiryDate && (
                            <p className="text-red-500 text-xs mt-1">{errors.expiryDate.message}</p>
                        )}
                    </div>

                    {/* CVC */}
                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest font-semibold opacity-80">
                            CVC
                        </label>
                        <input
                            {...register('cvc')}
                            className="w-full bg-transparent border-b border-stone-900/30 py-3 text-lg focus:border-stone-900 focus:outline-none transition-colors font-mono"
                            placeholder="123"
                            maxLength={4}
                        />
                        {errors.cvc && (
                            <p className="text-red-500 text-xs mt-1">{errors.cvc.message}</p>
                        )}
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full mt-8 py-4 bg-stone-900 text-[var(--stone-50)] uppercase tracking-widest text-xs font-bold hover:opacity-90 transition-opacity"
                >
                    Confirm Reservation
                </button>
            </form>

            <div className="flex items-center justify-center space-x-4 opacity-40 grayscale mt-6">
                {/* Placeholder icons for trust */}
                <div className="h-6 w-10 bg-current"></div>
                <div className="h-6 w-10 bg-current"></div>
                <div className="h-6 w-10 bg-current"></div>
            </div>
        </motion.div>
    );
}
