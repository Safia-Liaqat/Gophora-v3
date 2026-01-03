// src/utils/providersData.js
export const mockProviders = [
  {
    id: '1',
    name: 'SpaceTech Academy',
    email: 'contact@spacetech.ac',
    type: 'institutional',
    status: 'verified',
    trustScore: 92,
    verificationLevel: 'AI Verified – Institutional Level',
    registrationDate: '2024-01-15',
    lastVerified: '2024-03-20',
    website: 'https://spacetech.ac',
    domainAge: 3,
    opportunities: 12,
    rating: 4.8,
    geminiReason: 'Professional website with 3-year domain history, corporate email matches domain, consistent content about space education.'
  },
  {
    id: '2',
    name: 'Maria Rodriguez',
    email: 'maria@freelancer.com',
    type: 'professional',
    status: 'pending_review',
    trustScore: 67,
    verificationLevel: 'AI Verified – Professional Level',
    registrationDate: '2024-02-10',
    lastVerified: '2024-03-18',
    website: null,
    socialProfiles: [
      { platform: 'linkedin', followers: 1500, accountAge: 2 }
    ],
    opportunities: 5,
    rating: 4.5,
    geminiReason: 'LinkedIn profile 2 years old with consistent activity. Needs additional portfolio links for higher score.'
  },
  {
    id: '3',
    name: 'Cosmic Explorer',
    email: 'explorer@gmail.com',
    type: 'new_talent',
    status: 'pending_review',
    trustScore: 45,
    verificationLevel: 'AI Verified – Explorer Level',
    registrationDate: '2024-03-01',
    lastVerified: '2024-03-19',
    website: null,
    videoIntro: true,
    opportunities: 1,
    rating: null,
    geminiReason: 'New profile with video introduction. Needs more user reviews and activity within the platform.'
  },
  {
    id: '4',
    name: 'Galactic Workshops',
    email: 'info@galacticworkshops.com',
    type: 'institutional',
    status: 'denied',
    trustScore: 32,
    verificationLevel: 'Unverified',
    registrationDate: '2024-02-28',
    lastVerified: '2024-03-15',
    website: 'https://galacticworkshops.com',
    domainAge: 0.5,
    opportunities: 0,
    rating: null,
    geminiReason: 'New domain (6 months), generic website template, no corporate email verification.'
  },
  {
    id: '5',
    name: 'Astro Mentor Pro',
    email: 'admin@astromentor.pro',
    type: 'institutional',
    status: 'verified',
    trustScore: 88,
    verificationLevel: 'AI Verified – Institutional Level',
    registrationDate: '2023-11-05',
    lastVerified: '2024-03-10',
    website: 'https://astromentor.pro',
    domainAge: 2,
    opportunities: 8,
    rating: 4.9,
    geminiReason: 'Established domain with professional content, active blog section, verified contact information.'
  }
];

export const verificationStats = {
  total: 156,
  verified: 89,
  pending: 42,
  denied: 25,
  avgScore: 72
};