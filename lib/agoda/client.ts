/**
 * Agoda API Client
 * Handles all HTTP communication with the Agoda Partner API
 */

import { Errors, APIError } from '../api-error';
import {
    AgodaRawRoomResponse,
    AgodaCreateBookingRequest,
    AgodaCreateBookingResponse,
    AgodaBookingStatusResponse,
} from './types';

const AGODA_BASE_URL = process.env.AGODA_API_URL || 'https://api.agoda.com/partner/v1';

/**
 * Creates authenticated headers for Agoda API calls
 */
function getAgodaHeaders(): HeadersInit {
    const apiKey = process.env.AGODA_API_KEY;
    const siteId = process.env.AGODA_SITE_ID;

    if (!apiKey || !siteId) {
        throw Errors.InternalError('Agoda API credentials not configured');
    }

    return {
        'Content-Type': 'application/json',
        'X-Agoda-Api-Key': apiKey,
        'X-Agoda-Site-Id': siteId,
        Accept: 'application/json',
    };
}

/**
 * Fetches room availability from Agoda
 */
export async function fetchAvailability(
    checkIn: string,
    checkOut: string,
    adults: number,
    children: number
): Promise<AgodaRawRoomResponse> {
    const hotelId = process.env.AGODA_HOTEL_ID;

    if (!hotelId) {
        throw Errors.InternalError('Hotel ID not configured');
    }

    const params = new URLSearchParams({
        hotel_id: hotelId,
        check_in: checkIn,
        check_out: checkOut,
        adults: adults.toString(),
        children: children.toString(),
        currency: 'USD',
    });

    try {
        const response = await fetch(`${AGODA_BASE_URL}/availability?${params}`, {
            method: 'GET',
            headers: getAgodaHeaders(),
            next: { revalidate: 60 }, // Cache for 1 minute
        });

        if (!response.ok) {
            if (response.status === 429) {
                throw Errors.RateLimited();
            }
            if (response.status >= 500) {
                throw Errors.AgodaError('Agoda service temporarily unavailable');
            }
            throw Errors.AgodaError(`Agoda returned status ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        if (error instanceof APIError) throw error;
        throw Errors.AgodaError('Failed to fetch availability');
    }
}

/**
 * Creates a booking with Agoda
 */
export async function createBooking(
    request: AgodaCreateBookingRequest
): Promise<AgodaCreateBookingResponse> {
    try {
        const response = await fetch(`${AGODA_BASE_URL}/bookings`, {
            method: 'POST',
            headers: getAgodaHeaders(),
            body: JSON.stringify(request),
        });

        if (!response.ok) {
            const errorBody = await response.json().catch(() => ({}));

            if (response.status === 409 || errorBody.error_code === 'SOLD_OUT') {
                throw Errors.RoomSoldOut();
            }
            if (response.status === 429) {
                throw Errors.RateLimited();
            }
            if (response.status >= 500) {
                throw Errors.AgodaError('Agoda service temporarily unavailable');
            }
            throw Errors.AgodaError(errorBody.error_message || 'Booking request failed');
        }

        return await response.json();
    } catch (error) {
        if (error instanceof APIError) throw error;
        throw Errors.AgodaError('Failed to create booking');
    }
}

/**
 * Fetches booking status from Agoda
 */
export async function fetchBookingStatus(
    bookingId: string
): Promise<AgodaBookingStatusResponse> {
    try {
        const response = await fetch(`${AGODA_BASE_URL}/bookings/${bookingId}/status`, {
            method: 'GET',
            headers: getAgodaHeaders(),
        });

        if (!response.ok) {
            if (response.status === 404) {
                throw Errors.NotFound('Booking not found');
            }
            throw Errors.AgodaError(`Failed to fetch booking status`);
        }

        return await response.json();
    } catch (error) {
        if (error instanceof APIError) throw error;
        throw Errors.AgodaError('Failed to fetch booking status');
    }
}
