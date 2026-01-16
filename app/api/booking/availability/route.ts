import { NextRequest, NextResponse } from 'next/server';
import { AvailabilityRequestSchema, AvailabilityResponse } from '@/lib/schemas/booking';
import { fetchAvailability } from '@/lib/agoda/client';
import { normalizeRoomData } from '@/lib/agoda/adapter';
import { APIError, Errors } from '@/lib/api-error';

/**
 * GET /api/booking/availability
 * Fetches room availability from Agoda and returns normalized data
 */
export async function GET(request: NextRequest) {
    try {
        // Parse query parameters
        const { searchParams } = new URL(request.url);
        const rawParams = {
            checkIn: searchParams.get('checkIn') || '',
            checkOut: searchParams.get('checkOut') || '',
            adults: parseInt(searchParams.get('adults') || '2', 10),
            children: parseInt(searchParams.get('children') || '0', 10),
        };

        // Validate with Zod
        const validation = AvailabilityRequestSchema.safeParse(rawParams);
        if (!validation.success) {
            const errorMessage = validation.error.issues.map((e) => e.message).join(', ');
            throw Errors.BadRequest(errorMessage);
        }

        const { checkIn, checkOut, adults, children } = validation.data;

        // Calculate nights for pricing
        const nights = Math.ceil(
            (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)
        );

        // Fetch from Agoda
        const agodaResponse = await fetchAvailability(checkIn, checkOut, adults, children);

        // Normalize the response
        const rooms = normalizeRoomData(agodaResponse, nights);

        // Build response
        const response: AvailabilityResponse = {
            success: true,
            data: {
                rooms,
                searchParams: {
                    checkIn,
                    checkOut,
                    nights,
                    adults,
                    children,
                },
            },
        };

        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error('[Availability API Error]:', error);

        if (error instanceof APIError) {
            return NextResponse.json(error.toJSON(), { status: error.statusCode });
        }

        const fallback = Errors.InternalError();
        return NextResponse.json(fallback.toJSON(), { status: 500 });
    }
}
