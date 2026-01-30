import type { Business } from './mockBusinesses';
import { MOCK_BUSINESSES } from './mockBusinesses';

export interface ProviderProfile {
  id: string;
  userId: string;
  businessName: string;
  bio: string;
  skills: string[];
  hourlyRate?: number;
  serviceArea: string;
  photos: string[];
  phone?: string;
  email?: string;
  category: string;
  location: string;
}

function businessToProvider(b: Business, index: number): ProviderProfile {
  return {
    id: b.id,
    userId: `user-${b.id}`,
    businessName: b.name,
    bio: b.description,
    skills: b.services ?? [],
    hourlyRate: index === 0 ? 45 : index === 1 ? 60 : 55,
    serviceArea: b.location,
    photos: b.photoUri ? [b.photoUri] : [],
    phone: b.phone,
    email: b.email,
    category: b.category,
    location: b.location,
  };
}

export const MOCK_PROVIDERS: ProviderProfile[] = MOCK_BUSINESSES.map((b, i) => businessToProvider(b, i));
