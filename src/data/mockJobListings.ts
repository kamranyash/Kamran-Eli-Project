export interface JobListing {
  id: string;
  clientName: string;
  clientAvatar?: string;
  description: string;
  location: string;
  imagePlaceholder?: string;
  category: string;
}

export const MOCK_JOB_LISTINGS: JobListing[] = [
  {
    id: '1',
    clientName: 'John',
    description:
      "Hi! My name is john, I need work done on my house in Studio city, I am looking for someone well versed in painting. Please reach out if you are available.",
    location: 'Studio City',
    category: 'Painting',
  },
  {
    id: '2',
    clientName: 'Stephanie',
    description:
      "Hi! My name is Stephanie, I am in need of a gardener for a house that I just moved into. If you are near sherman oaks please reach out for further information!",
    location: 'Sherman Oaks',
    category: 'Gardening',
  },
];
