/**
 * Agoda Adapter
 * Transforms complex Agoda API responses into clean UI-friendly schemas
 */

import { Room } from '../schemas/booking';
import { AgodaRawRoom, AgodaRawRoomResponse } from './types';
import { APIError, Errors } from '../api-error';

/**
 * Normalizes a single Agoda room object into our clean Room interface
 */
export function normalizeRoom(raw: AgodaRawRoom, nights: number = 1): Room {
    // Sort images, primary first
    const sortedImages = [...raw.images].sort((a, b) =>
        a.is_primary === b.is_primary ? 0 : a.is_primary ? -1 : 1
    );

    // Extract amenity names
    const amenityNames = raw.amenities?.map((a) => a.name) ?? [];

    // Build cancellation policy string
    let cancellationPolicy = 'See property for details';
    if (raw.policies?.cancellation) {
        const { type, description } = raw.policies.cancellation;
        if (type === 'free') {
            cancellationPolicy = `Free cancellation. ${description}`;
        } else if (type === 'non_refundable') {
            cancellationPolicy = 'Non-refundable';
        } else {
            cancellationPolicy = description;
        }
    }

    return {
        id: raw.room_id,
        name: raw.room_name,
        description: raw.room_description?.short || raw.room_description?.long || '',
        pricePerNight: raw.pricing.nightly_rate,
        totalPrice: raw.pricing.total_amount,
        currency: raw.pricing.currency_code,
        imageUrls: sortedImages.map((img) => img.url),
        maxGuests: raw.occupancy.max_occupancy,
        amenities: amenityNames,
        cancellationPolicy,
    };
}

/**
 * Normalizes the full Agoda availability response
 * Handles "No Availability" gracefully
 */
export function normalizeRoomData(
    agodaRaw: AgodaRawRoomResponse,
    nights: number = 1
): Room[] {
    // Handle explicit no availability status
    if (agodaRaw.status === 'no_availability') {
        return []; // Return empty array, let caller handle UI messaging
    }

    // Handle error status
    if (agodaRaw.status === 'error') {
        throw Errors.AgodaError(agodaRaw.error_message || 'Agoda returned an error');
    }

    // Filter out sold-out rooms and normalize
    const availableRooms = agodaRaw.rooms.filter(
        (room) => room.availability.status === 'available'
    );

    if (availableRooms.length === 0) {
        return []; // Graceful "no availability"
    }

    return availableRooms.map((room) => normalizeRoom(room, nights));
}

/**
 * Maps our booking request to Agoda's expected format
 */
export function toAgodaBookingRequest(
    roomId: string,
    checkIn: string,
    checkOut: string,
    adults: number,
    children: number,
    guest: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        specialRequests?: string;
    },
    paymentToken: string
): object {
    return {
        hotel_id: process.env.AGODA_HOTEL_ID,
        room_id: roomId,
        check_in_date: checkIn,
        check_out_date: checkOut,
        guest_count: {
            adults,
            children,
        },
        guest_details: {
            first_name: guest.firstName,
            last_name: guest.lastName,
            email: guest.email,
            phone: guest.phone,
            special_requests: guest.specialRequests,
        },
        payment: {
            method: 'credit_card',
            token: paymentToken,
        },
        partner_reference: `AUSAN-${Date.now()}`,
    };
}

/**
 * Maps Agoda booking status codes to user-friendly messages
 */
export function mapAgodaStatus(
    agodaStatus: 'confirmed' | 'pending' | 'failed' | 'sold_out',
    errorMessage?: string
): { status: 'pending' | 'confirmed' | 'failed'; message?: string } {
    switch (agodaStatus) {
        case 'confirmed':
            return { status: 'confirmed', message: 'Your booking has been confirmed!' };
        case 'pending':
            return { status: 'pending', message: 'Your booking is being processed...' };
        case 'sold_out':
            return {
                status: 'failed',
                message: 'This villa was just booked, please select another.',
            };
        case 'failed':
        default:
            return {
                status: 'failed',
                message: errorMessage || 'Booking failed. Please try again.',
            };
    }
}
