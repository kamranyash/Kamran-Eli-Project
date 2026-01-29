export interface Business {
  id: string;
  name: string;
  description: string;
  phone: string;
  email: string;
  category: string;
  location: string;
  photoUri?: string;
  services?: string[];
}

export const MOCK_BUSINESSES: Business[] = [
  {
    id: 'b1',
    name: 'Shayfer Gardening LLC',
    description: 'Professional lawn care, gardening, and landscaping in the greater LA area. Licensed and insured.',
    phone: '(818) 555-0123',
    email: 'contact@shayfergarden.com',
    category: 'Gardening',
    location: 'Sherman Oaks, CA',
    services: ['Lawn mowing', 'Garden design', 'Hedge trimming', 'Seasonal cleanup'],
  },
  {
    id: 'b2',
    name: 'Studio City Paint Co',
    description: 'Residential and commercial painting. Interior, exterior, and touch-ups. Free estimates.',
    phone: '(323) 555-0456',
    email: 'hello@studiocitypaint.com',
    category: 'Painting',
    location: 'Studio City, CA',
    services: ['Interior painting', 'Exterior painting', 'Cabinet refinishing', 'Color consultation'],
  },
  {
    id: 'b3',
    name: 'Green Thumb Landscaping',
    description: 'Full-service landscaping and hardscaping. Patios, irrigation, and custom designs.',
    phone: '(310) 555-0789',
    email: 'info@greenthumb.com',
    category: 'Landscaping',
    location: 'Sherman Oaks, CA',
    services: ['Landscape design', 'Irrigation', 'Hardscaping', 'Maintenance'],
  },
];
