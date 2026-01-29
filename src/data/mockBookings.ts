export type PaymentMethod = 'Venmo' | 'Zelle' | 'Card' | 'Cash' | 'Bank Transfer';
export type BookingStatus = 'incomplete' | 'completed' | 'pending' | 'cancelled';

export interface Booking {
  id: string;
  clientName: string;
  address: string;
  date: string;
  time: string;
  price: number;
  paymentMethod: PaymentMethod;
  status: BookingStatus;
  jobTitle?: string;
}

export const MOCK_BOOKINGS: Booking[] = [
  {
    id: '1',
    clientName: 'Melissa Shayfer',
    address: '3839 Scadlock Lane',
    date: '2026-01-25',
    time: '1:00 PM - 2:00 PM',
    price: 88,
    paymentMethod: 'Bank Transfer',
    status: 'incomplete',
    jobTitle: 'Gardening',
  },
  {
    id: '2',
    clientName: 'John Smith',
    address: '123 Main St',
    date: '2026-01-28',
    time: '10:00 AM - 11:00 AM',
    price: 120,
    paymentMethod: 'Venmo',
    status: 'incomplete',
    jobTitle: 'Lawn Mowing',
  },
];
