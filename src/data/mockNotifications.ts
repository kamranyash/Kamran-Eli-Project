export interface Notification {
  id: string;
  title: string;
  message: string;
  timeAgo: string;
  type: 'booking_change' | 'reschedule' | 'new_booking' | 'cancelled' | 'payment';
}

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    title: 'Booking rescheduled',
    message: 'Gardening at 3839 Scadlock Lane (Melissa Shayfer) was moved to Jan 28, 2026.',
    timeAgo: '2 hours ago',
    type: 'reschedule',
  },
  {
    id: '2',
    title: 'New booking',
    message: 'John Smith requested a lawn mowing at 123 Main St for Jan 28.',
    timeAgo: '1 day ago',
    type: 'new_booking',
  },
  {
    id: '3',
    title: 'Booking change',
    message: 'Payment status updated for 3839 Scadlock Lane – now marked pending.',
    timeAgo: '2 days ago',
    type: 'booking_change',
  },
];
