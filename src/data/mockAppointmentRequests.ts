export type AppointmentRequestStatus = 'PENDING' | 'CONFIRMED' | 'DECLINED' | 'CANCELLED';

export interface AppointmentRequest {
  id: string;
  consumerId: string;
  providerId: string;
  jobId?: string;
  startTime: string;
  endTime: string;
  note: string;
  status: AppointmentRequestStatus;
  providerName: string;
  createdAt: string;
}

export const MOCK_APPOINTMENT_REQUESTS: AppointmentRequest[] = [
  {
    id: 'ar1',
    consumerId: 'consumer-1',
    providerId: 'b1',
    jobId: 'jp1',
    startTime: '2026-02-10T14:00:00',
    endTime: '2026-02-10T15:30:00',
    note: 'Please bring lawn mower. Gate code 1234.',
    status: 'PENDING',
    providerName: 'Shayfer Gardening LLC',
    createdAt: '2026-01-25T10:00:00Z',
  },
  {
    id: 'ar2',
    consumerId: 'consumer-1',
    providerId: 'b3',
    startTime: '2026-01-20T09:00:00',
    endTime: '2026-01-20T10:00:00',
    note: 'Initial consultation',
    status: 'CONFIRMED',
    providerName: 'Green Thumb Landscaping',
    createdAt: '2026-01-18T12:00:00Z',
  },
];
