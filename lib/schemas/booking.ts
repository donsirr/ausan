import { z } from 'zod';

// --- Request Schemas ---

export const AvailabilityRequestSchema = z.object({
    checkIn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
    checkOut: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
    adults: z.number().int().min(1).max(10),
    children: z.number().int().min(0).max(6).optional().default(0),
}).refine(
    (data) => new Date(data.checkIn) < new Date(data.checkOut),
    { message: 'Check-out date must be after check-in date' }
).refine(
    (data) => new Date(data.checkIn) >= new Date(new Date().toDateString()),
    { message: 'Check-in date cannot be in the past' }
);

export const CreateOrderRequestSchema = z.object({
    roomId: z.string().min(1, 'Room ID is required'),
    checkIn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
    checkOut: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
    adults: z.number().int().min(1).max(10),
    children: z.number().int().min(0).max(6).optional().default(0),
    guest: z.object({
        firstName: z.string().min(1, 'First name is required').max(50),
        lastName: z.string().min(1, 'Last name is required').max(50),
        email: z.string().email('Invalid email address'),
        phone: z.string().min(5, 'Phone number is required').max(20),
        specialRequests: z.string().max(500).optional(),
    }),
    payment: z.object({
        token: z.string().min(1, 'Payment token is required'), // Stripe/payment processor token
    }),
});

export const BookingStatusRequestSchema = z.object({
    bookingId: z.string().min(1, 'Booking ID is required'),
});

// --- Response Schemas (for type safety) ---

export const RoomSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    pricePerNight: z.number(),
    totalPrice: z.number(),
    currency: z.string().default('USD'),
    imageUrls: z.array(z.string()),
    maxGuests: z.number(),
    amenities: z.array(z.string()).optional(),
    cancellationPolicy: z.string().optional(),
});

export const AvailabilityResponseSchema = z.object({
    success: z.boolean(),
    data: z.object({
        rooms: z.array(RoomSchema),
        searchParams: z.object({
            checkIn: z.string(),
            checkOut: z.string(),
            nights: z.number(),
            adults: z.number(),
            children: z.number(),
        }),
    }),
});

export const CreateOrderResponseSchema = z.object({
    success: z.boolean(),
    data: z.object({
        bookingId: z.string(),
        status: z.enum(['pending', 'confirmed', 'failed']),
        confirmationNumber: z.string().optional(),
        room: RoomSchema,
        guest: z.object({
            firstName: z.string(),
            lastName: z.string(),
            email: z.string(),
        }),
        dates: z.object({
            checkIn: z.string(),
            checkOut: z.string(),
            nights: z.number(),
        }),
        pricing: z.object({
            subtotal: z.number(),
            taxes: z.number(),
            total: z.number(),
            currency: z.string(),
        }),
    }),
});

export const BookingStatusResponseSchema = z.object({
    success: z.boolean(),
    data: z.object({
        bookingId: z.string(),
        status: z.enum(['pending', 'confirmed', 'cancelled', 'failed']),
        confirmationNumber: z.string().optional(),
        message: z.string().optional(),
    }),
});

// --- TypeScript Types ---

export type AvailabilityRequest = z.infer<typeof AvailabilityRequestSchema>;
export type CreateOrderRequest = z.infer<typeof CreateOrderRequestSchema>;
export type BookingStatusRequest = z.infer<typeof BookingStatusRequestSchema>;
export type Room = z.infer<typeof RoomSchema>;
export type AvailabilityResponse = z.infer<typeof AvailabilityResponseSchema>;
export type CreateOrderResponse = z.infer<typeof CreateOrderResponseSchema>;
export type BookingStatusResponse = z.infer<typeof BookingStatusResponseSchema>;
