/**
 * Agoda Partner API Raw Response Types
 * These represent the complex/nested structure Agoda actually returns
 */

export interface AgodaRawRoomResponse {
    hotel_id: string;
    rooms: AgodaRawRoom[];
    status: 'success' | 'error' | 'no_availability';
    error_message?: string;
}

export interface AgodaRawRoom {
    room_id: string;
    room_type_code: string;
    room_name: string;
    room_description: {
        short: string;
        long: string;
        highlights?: string[];
    };
    pricing: {
        currency_code: string;
        nightly_rate: number;
        total_amount: number;
        tax_amount: number;
        exclusive_rate: number;
        show_price: boolean;
    };
    images: {
        url: string;
        caption?: string;
        is_primary: boolean;
    }[];
    occupancy: {
        max_adults: number;
        max_children: number;
        max_occupancy: number;
    };
    amenities: {
        code: string;
        name: string;
        category: string;
    }[];
    policies: {
        cancellation: {
            type: 'free' | 'non_refundable' | 'partial';
            description: string;
            deadline?: string;
        };
        check_in_time: string;
        check_out_time: string;
    };
    availability: {
        status: 'available' | 'sold_out' | 'on_request';
        rooms_left?: number;
    };
}

export interface AgodaCreateBookingRequest {
    hotel_id: string;
    room_id: string;
    check_in_date: string;
    check_out_date: string;
    guest_count: {
        adults: number;
        children: number;
    };
    guest_details: {
        first_name: string;
        last_name: string;
        email: string;
        phone: string;
        special_requests?: string;
    };
    payment: {
        method: 'credit_card';
        token: string;
    };
    partner_reference?: string;
}

export interface AgodaCreateBookingResponse {
    status: 'confirmed' | 'pending' | 'failed' | 'sold_out';
    booking_id?: string;
    confirmation_number?: string;
    error_code?: string;
    error_message?: string;
    booking_details?: {
        room_name: string;
        check_in: string;
        check_out: string;
        total_price: number;
        currency: string;
    };
}

export interface AgodaBookingStatusResponse {
    booking_id: string;
    status: 'pending' | 'confirmed' | 'cancelled' | 'failed';
    confirmation_number?: string;
    last_updated: string;
    message?: string;
}
