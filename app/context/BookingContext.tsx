"use client";

import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// --- Types ---

export type BookingStep =
  | 'search'
  | 'results'
  | 'details'
  | 'guest_info'
  | 'payment'
  | 'confirmation';

export interface SearchParams {
  checkIn: Date | null;
  checkOut: Date | null;
  adults: number;
  children: number;
}

export interface Room {
  id: string;
  name: string;
  description: string;
  pricePerNight: number;
  image: string;
  // Add other matching Backend API schema fields here as needed
}

export interface GuestDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests?: string;
  paymentToken?: string;
}

interface BookingState {
  step: BookingStep;
  searchParams: SearchParams;
  selectedRoom: Room | null;
  guestDetails: GuestDetails;
  isDrawerOpen: boolean;
}

type BookingAction =
  | { type: 'SET_STEP'; payload: BookingStep }
  | { type: 'SET_SEARCH_PARAMS'; payload: Partial<SearchParams> }
  | { type: 'SELECT_ROOM'; payload: Room }
  | { type: 'SET_GUEST_DETAILS'; payload: Partial<GuestDetails> }
  | { type: 'OPEN_DRAWER' }
  | { type: 'CLOSE_DRAWER' }
  | { type: 'RESET_BOOKING' }
  | { type: 'RESTART_BOOKING' };

// --- Initial State ---

const initialState: BookingState = {
  step: 'search',
  searchParams: {
    checkIn: null,
    checkOut: null,
    adults: 2,
    children: 0,
  },
  selectedRoom: null,
  guestDetails: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  },
  isDrawerOpen: false,
};

// --- Reducer ---

function bookingReducer(state: BookingState, action: BookingAction): BookingState {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, step: action.payload };
    case 'SET_SEARCH_PARAMS':
      return { ...state, searchParams: { ...state.searchParams, ...action.payload } };
    case 'SELECT_ROOM':
      return { ...state, selectedRoom: action.payload, step: 'details' }; // Auto-advance example logic
    case 'SET_GUEST_DETAILS':
      return { ...state, guestDetails: { ...state.guestDetails, ...action.payload } };
    case 'OPEN_DRAWER':
      return { ...state, isDrawerOpen: true };
    case 'CLOSE_DRAWER':
      return { ...state, isDrawerOpen: false };
    case 'RESET_BOOKING':
      return initialState;
    case 'RESTART_BOOKING':
      return { ...initialState, isDrawerOpen: true };
    default:
      return state;
  }
}

// --- Context ---

const BookingContext = createContext<{
  state: BookingState;
  dispatch: React.Dispatch<BookingAction>;
} | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  return (
    <BookingContext.Provider value={{ state, dispatch }}>
      {children}
    </BookingContext.Provider>
  );
}

// --- Hook ---

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
