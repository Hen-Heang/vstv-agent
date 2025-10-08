-- Insert sample hero slides data with correct image paths
INSERT INTO hero_slides (title, subtitle, background_image, cta, cta_secondary, cta_link, cta_secondary_link, "order", is_active) VALUES
(
  'Find Your Dream Property in Cambodia',
  'Discover premium condos, luxury apartments, and exclusive villas in Cambodia''s most desirable locations with expert guidance.',
  '/images/company/VSTV-BG.png',
  'Explore Properties',
  'Contact Agent',
  '/properties',
  '/contact',
  0,
  true
),
(
  'Premium Properties in Prime Locations',
  'From BKK1 luxury condos to Sen Sok family homes, find your perfect property with Cambodia''s trusted real estate experts.',
  '/images/properties/featured/luxury-condo-bkk1.jpg',
  'View Listings',
  'Schedule Tour',
  '/properties',
  '/contact',
  1,
  true
),
(
  'Meet Our Expert Agents',
  'Professional real estate agents with extensive experience in the Cambodian market. Let our experts guide you to your perfect property.',
  '/images/agents/Heng-Rita.jpg',
  'Meet Our Agents',
  'Contact Agent',
  '/agents',
  '/agents/008',
  2,
  true
),
(
  'Luxury Living in Phnom Penh',
  'Experience the finest in Cambodian real estate with our curated selection of premium properties in the heart of Phnom Penh.',
  '/images/backgrounds/hero-phnom-penh.jpg',
  'Discover Luxury',
  'Schedule Viewing',
  '/properties',
  '/contact',
  3,
  true
),
(
  'Investment Opportunities Await',
  'Unlock the potential of Cambodia''s growing real estate market with our expert investment guidance and premium property portfolio.',
  '/images/properties/featured/premium-villa-sen-sok.jpg',
  'Investment Guide',
  'Get Consultation',
  '/services',
  '/contact',
  4,
  true
),
(
  'Modern Apartments in City Center',
  'Discover contemporary living in the heart of Phnom Penh with our selection of modern apartments featuring city views and premium amenities.',
  '/images/properties/featured/modern-apartment-toul-kork.jpg',
  'View Apartments',
  'Schedule Tour',
  '/properties',
  '/contact',
  5,
  true
),
(
  'High-End Condos with River Views',
  'Experience luxury living with stunning river views in our premium condominium collection, featuring world-class amenities and prime locations.',
  '/images/properties/featured/high-end-condo-river-view.jpg',
  'Explore Condos',
  'Get Consultation',
  '/properties',
  '/contact',
  6,
  true
);
