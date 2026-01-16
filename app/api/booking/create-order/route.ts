import { NextRequest, NextResponse } from 'next/server';
import { CreateOrderRequestSchema, CreateOrderResponse } from '@/lib/schemas/booking';
import { createBooking } from '@/lib/agoda/client';
import { toAgodaBookingRequest, mapAgodaStatus } from '@/lib/agoda/adapter';
import { APIError, Errors } from '@/lib/api-error';
import { AgodaCreateBookingRequest } from '@/lib/agoda/types';

/**
 * POST /api/booking/create-order
 * Creates a booking with Agoda
 */
export async function POST(request: NextRequest) {
    try {
        // Parse request body
        const body = await request.json();

        // Validate with Zod
        const validation = CreateOrderRequestSchema.safeParse(body);
        if (!validation.success) {
            const errorMessage = validation.error.issues.map((e) => e.message).join(', ');
            throw Errors.BadRequest(errorMessage);
        }

        const { roomId, checkIn, checkOut, adults, children, guest, payment } = validation.data;

        // Calculate nights
        const nights = Math.ceil(
            (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)
        );

        // Transform to Agoda request format
        const agodaRequest = toAgodaBookingRequest(
            roomId,
            checkIn,
            checkOut,
            adults,
            children,
            guest,
            payment.token
        ) as AgodaCreateBookingRequest;

        // Create booking with Agoda
        const agodaResponse = await createBooking(agodaRequest);

        // Map status
        const { status, message } = mapAgodaStatus(agodaResponse.status, agodaResponse.error_message);

        // If failed or sold out, throw appropriate error
        if (status === 'failed') {
            if (agodaResponse.status === 'sold_out') {
                throw Errors.RoomSoldOut(message);
            }
            throw Errors.AgodaError(message);
        }

        // Build success response
        const response: CreateOrderResponse = {
            success: true,
            data: {
                bookingId: agodaResponse.booking_id || '',
                status,
                confirmationNumber: agodaResponse.confirmation_number,
                room: {
                    id: roomId,
                    name: agodaResponse.booking_details?.room_name || '',
                    description: '',
                    pricePerNight: agodaResponse.booking_details?.total_price
                        ? agodaResponse.booking_details.total_price / nights
                        : 0,
                    totalPrice: agodaResponse.booking_details?.total_price || 0,
                    currency: agodaResponse.booking_details?.currency || 'USD',
                    imageUrls: [],
                    maxGuests: adults + children,
                },
                guest: {
                    firstName: guest.firstName,
                    lastName: guest.lastName,
                    email: guest.email,
                },
                dates: {
                    checkIn,
                    checkOut,
                    nights,
                },
                pricing: {
                    subtotal: agodaResponse.booking_details?.total_price || 0,
                    taxes: 0, // Would come from Agoda in real implementation
                    total: agodaResponse.booking_details?.total_price || 0,
                    currency: agodaResponse.booking_details?.currency || 'USD',
                },
            },
        };

        return NextResponse.json(response, { status: 201 });
    } catch (error) {
        console.error('[Create Order API Error]:', error);

        if (error instanceof APIError) {
            return NextResponse.json(error.toJSON(), { status: error.statusCode });
        }

        const fallback = Errors.InternalError();
        return NextResponse.json(fallback.toJSON(), { status: 500 });
    }
}
