import { NextRequest, NextResponse } from 'next/server';
import { BookingStatusRequestSchema, BookingStatusResponse } from '@/lib/schemas/booking';
import { fetchBookingStatus } from '@/lib/agoda/client';
import { APIError, Errors } from '@/lib/api-error';

/**
 * GET /api/booking/booking-status
 * Polls for booking confirmation status
 */
export async function GET(request: NextRequest) {
    try {
        // Parse query parameters
        const { searchParams } = new URL(request.url);
        const rawParams = {
            bookingId: searchParams.get('bookingId') || '',
        };

        // Validate with Zod
        const validation = BookingStatusRequestSchema.safeParse(rawParams);
        if (!validation.success) {
            const errorMessage = validation.error.issues.map((e) => e.message).join(', ');
            throw Errors.BadRequest(errorMessage);
        }

        const { bookingId } = validation.data;

        // Fetch status from Agoda
        const agodaResponse = await fetchBookingStatus(bookingId);

        // Build response
        const response: BookingStatusResponse = {
            success: true,
            data: {
                bookingId: agodaResponse.booking_id,
                status: agodaResponse.status,
                confirmationNumber: agodaResponse.confirmation_number,
                message: agodaResponse.message,
            },
        };

        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error('[Booking Status API Error]:', error);

        if (error instanceof APIError) {
            return NextResponse.json(error.toJSON(), { status: error.statusCode });
        }

        const fallback = Errors.InternalError();
        return NextResponse.json(fallback.toJSON(), { status: 500 });
    }
}
