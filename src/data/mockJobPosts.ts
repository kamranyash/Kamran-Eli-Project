export type JobPostStatus = 'OPEN' | 'IN_PROGRESS' | 'FILLED' | 'CANCELLED';

export interface JobPost {
  id: string;
  consumerId: string;
  title: string;
  description: string;
  category: string;
  locationText: string;
  budgetMin?: number;
  budgetMax?: number;
  dueDate?: string;
  status: JobPostStatus;
  images?: string[];
  createdAt: string;
}

const CONSUMER_ID = 'consumer-1';

export const MOCK_JOB_POSTS: JobPost[] = [
  {
    id: 'jp1',
    consumerId: CONSUMER_ID,
    title: 'Lawn mowing and edging',
    description: 'Need regular lawn mowing and edging for a medium-sized yard in Sherman Oaks.',
    category: 'Gardening',
    locationText: 'Sherman Oaks, CA',
    budgetMin: 50,
    budgetMax: 80,
    dueDate: '2026-02-15',
    status: 'OPEN',
    createdAt: '2026-01-20T10:00:00Z',
  },
  {
    id: 'jp2',
    consumerId: CONSUMER_ID,
    title: 'Interior painting - living room',
    description: 'Living room and hallway need a fresh coat. Prefer light gray.',
    category: 'Painting',
    locationText: 'Studio City, CA',
    budgetMin: 200,
    budgetMax: 400,
    dueDate: '2026-02-28',
    status: 'OPEN',
    createdAt: '2026-01-22T14:00:00Z',
  },
  {
    id: 'jp3',
    consumerId: CONSUMER_ID,
    title: 'Garden design consultation',
    description: 'Looking for a landscaper to design a small backyard garden.',
    category: 'Landscaping',
    locationText: 'Sherman Oaks, CA',
    status: 'FILLED',
    createdAt: '2026-01-15T09:00:00Z',
  },
];
