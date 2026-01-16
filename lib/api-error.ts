/**
 * Standardized API Error Class
 * Used throughout the backend to ensure consistent error responses
 */
export class APIError extends Error {
    public readonly statusCode: number;
    public readonly code: string;
    public readonly isOperational: boolean;

    constructor(
        message: string,
        statusCode: number = 500,
        code: string = 'INTERNAL_ERROR',
        isOperational: boolean = true
    ) {
        super(message);
        this.statusCode = statusCode;
        this.code = code;
        this.isOperational = isOperational;

        // Maintains proper stack trace for where our error was thrown
        Error.captureStackTrace(this, this.constructor);
    }

    toJSON() {
        return {
            success: false,
            error: {
                message: this.message,
                code: this.code,
                statusCode: this.statusCode,
            },
        };
    }
}

// --- Common Error Factories ---

export const Errors = {
    BadRequest: (message: string = 'Invalid request') =>
        new APIError(message, 400, 'BAD_REQUEST'),

    Unauthorized: (message: string = 'Authentication required') =>
        new APIError(message, 401, 'UNAUTHORIZED'),

    NotFound: (message: string = 'Resource not found') =>
        new APIError(message, 404, 'NOT_FOUND'),

    NoAvailability: (message: string = 'No rooms available for the selected dates') =>
        new APIError(message, 404, 'NO_AVAILABILITY'),

    RoomSoldOut: (message: string = 'This villa was just booked, please select another.') =>
        new APIError(message, 409, 'ROOM_SOLD_OUT'),

    AgodaError: (message: string = 'Failed to communicate with booking provider') =>
        new APIError(message, 502, 'AGODA_ERROR'),

    RateLimited: (message: string = 'Too many requests, please try again later') =>
        new APIError(message, 429, 'RATE_LIMITED'),

    InternalError: (message: string = 'An unexpected error occurred') =>
        new APIError(message, 500, 'INTERNAL_ERROR'),
};
