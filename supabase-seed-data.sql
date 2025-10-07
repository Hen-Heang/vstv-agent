-- VSTV Agent Database Seeding Script
-- Run this in your Supabase SQL Editor

-- 1. Insert Agents
INSERT INTO agents (id, agent_id, name, role, email, phone, bio, avatar, specialties, languages, experience, properties_sold, rating, is_active, created_at, updated_at)
VALUES 
  (
    'agent-1',
    '004',
    'HENG KIMHONG',
    'Real Estate Agent Supervisor',
    'hengkimhong1803@email.com',
    '+855 96 4444 027',
    'With extensive experience in the Cambodian real estate market, Heng Kimhong specializes in luxury properties and investment opportunities. As a supervisor, he leads a team of dedicated agents and has helped hundreds of clients find their dream homes and maximize their investment returns.',
    '/images/agents/heng-kimhong.html',
    ARRAY['Luxury Properties', 'Investment Consulting', 'Property Management', 'Team Leadership'],
    ARRAY['English', 'Khmer', 'Chinese'],
    8,
    180,
    4.9,
    true,
    NOW(),
    NOW()
  ),
  (
    'agent-2',
    '003',
    'VIN SOLYVAY',
    'Real Estate Agent',
    'vinsolyvay@gmail.com',
    '+855 98 261 801',
    'Vin Solyvay brings fresh perspective and dedication to the Cambodian real estate market. With a focus on client satisfaction and market expertise, he helps both local and international clients navigate the property landscape with confidence.',
    '/images/agents/vin-solyvay.html',
    ARRAY['Residential Properties', 'First-time Buyers', 'Market Analysis', 'Client Relations'],
    ARRAY['English', 'Khmer'],
    5,
    85,
    4.8,
    true,
    NOW(),
    NOW()
  ),
  (
    'agent-3',
    '008',
    'HENG RITA',
    'Real Estate Agent',
    'hengrita@vstvagent.com',
    '+855 12 345 6789',
    'Heng Rita is a dedicated real estate professional with a passion for helping clients find their perfect home. Her attention to detail and excellent customer service make her a trusted advisor in the Cambodian property market.',
    '/images/agents/Heng-Rita.jpg',
    ARRAY['Residential Sales', 'Property Rentals', 'Client Relations', 'Market Research'],
    ARRAY['English', 'Khmer'],
    6,
    120,
    4.9,
    true,
    NOW(),
    NOW()
  )
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  role = EXCLUDED.role,
  email = EXCLUDED.email,
  phone = EXCLUDED.phone,
  bio = EXCLUDED.bio,
  avatar = EXCLUDED.avatar,
  specialties = EXCLUDED.specialties,
  languages = EXCLUDED.languages,
  experience = EXCLUDED.experience,
  properties_sold = EXCLUDED.properties_sold,
  rating = EXCLUDED.rating,
  is_active = EXCLUDED.is_active,
  updated_at = NOW();

-- 2. Insert Services
INSERT INTO services (id, title, description, icon, features, is_active, created_at, updated_at)
VALUES 
  (
    'service-1',
    'Property Sales',
    'Find your dream home with our extensive collection of properties for sale across Cambodia.',
    'Home',
    ARRAY['Luxury condos and apartments', 'Family houses and villas', 'Commercial properties', 'Land and development plots', 'Investment opportunities'],
    true,
    NOW(),
    NOW()
  ),
  (
    'service-2',
    'Property Rental',
    'Discover comfortable rental properties that suit your lifestyle and budget.',
    'Building',
    ARRAY['Furnished and unfurnished options', 'Short-term and long-term rentals', 'Student accommodations', 'Corporate housing', 'Luxury rentals'],
    true,
    NOW(),
    NOW()
  ),
  (
    'service-3',
    'Property Management',
    'Professional property management services to maximize your investment returns.',
    'Settings',
    ARRAY['Tenant screening and management', 'Rent collection and accounting', 'Property maintenance coordination', 'Legal compliance assistance', 'Financial reporting'],
    true,
    NOW(),
    NOW()
  ),
  (
    'service-4',
    'Investment Consulting',
    'Expert guidance for real estate investments in Cambodia''s growing market.',
    'TrendingUp',
    ARRAY['Market analysis and trends', 'Investment opportunity assessment', 'Risk evaluation', 'ROI projections', 'Portfolio diversification advice'],
    true,
    NOW(),
    NOW()
  )
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  icon = EXCLUDED.icon,
  features = EXCLUDED.features,
  is_active = EXCLUDED.is_active,
  updated_at = NOW();

-- 3. Insert Properties
INSERT INTO properties (id, title, description, price, price_type, property_type, bedrooms, bathrooms, area, location, address, latitude, longitude, images, features, is_featured, is_available, agent_id, created_at, updated_at)
VALUES 
  (
    'property-1',
    'Luxury Condo in BKK1',
    'This stunning luxury condo in the heart of BKK1 offers modern living with premium amenities.',
    1200,
    'rent',
    'condo',
    2,
    2,
    85,
    'BKK1, Phnom Penh',
    'Street 123, Building ABC, BKK1, Phnom Penh, Cambodia',
    11.5564,
    104.9282,
    ARRAY['/images/properties/featured/luxury-condo-bkk1.jpg', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'],
    ARRAY['Swimming Pool', 'Fitness Center', 'Parking', '24/7 Security'],
    true,
    true,
    'agent-1',
    NOW(),
    NOW()
  ),
  (
    'property-2',
    'Modern Apartment in Toul Kork',
    'Comfortable and modern apartment in a prime location with excellent amenities.',
    800,
    'rent',
    'apartment',
    1,
    1,
    65,
    'Toul Kork, Phnom Penh',
    'Street 456, Building DEF, Toul Kork, Phnom Penh, Cambodia',
    11.5700,
    104.8900,
    ARRAY['/images/properties/featured/modern-apartment-toul-kork.jpg', 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'],
    ARRAY['Balcony', 'Security', 'WiFi'],
    true,
    true,
    'agent-2',
    NOW(),
    NOW()
  ),
  (
    'property-3',
    'Premium Villa for Sale',
    'Exclusive villa in Sen Sok with modern amenities and spacious living areas.',
    250000,
    'sale',
    'villa',
    4,
    3,
    200,
    'Sen Sok, Phnom Penh',
    'Street 789, Villa Complex, Sen Sok, Phnom Penh, Cambodia',
    11.6000,
    104.9000,
    ARRAY['/images/properties/featured/premium-villa-sen-sok.jpg', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'],
    ARRAY['Garden', 'Garage', 'Pool', 'Security'],
    true,
    true,
    'agent-3',
    NOW(),
    NOW()
  )
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  price_type = EXCLUDED.price_type,
  property_type = EXCLUDED.property_type,
  bedrooms = EXCLUDED.bedrooms,
  bathrooms = EXCLUDED.bathrooms,
  area = EXCLUDED.area,
  location = EXCLUDED.location,
  address = EXCLUDED.address,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  images = EXCLUDED.images,
  features = EXCLUDED.features,
  is_featured = EXCLUDED.is_featured,
  is_available = EXCLUDED.is_available,
  agent_id = EXCLUDED.agent_id,
  updated_at = NOW();

-- 4. Insert Company Information
INSERT INTO company (id, name, description, mission, vision, values, address, phone, email, website, social_media, created_at, updated_at)
VALUES 
  (
    'company-1',
    'VSTV AGENT (CAMBODIA) CO., LTD',
    'Your trusted real estate partner in Cambodia. We help you find your dream property with expert guidance and personalized service.',
    'To provide exceptional real estate services that help our clients achieve their property goals while maintaining the highest standards of integrity, professionalism, and customer satisfaction.',
    'To be Cambodia''s leading real estate agency, recognized for our innovation, expertise, and commitment to excellence.',
    ARRAY['Trust & Transparency', 'Client-First Approach', 'Excellence & Quality', 'Innovation & Growth'],
    'Street 123, Building ABC, Phnom Penh, Cambodia',
    '+855 12 345 6789',
    'info@vstvagent.com',
    'https://vstvagent.com',
    '{"telegram": "@vstvagent", "facebook": "https://facebook.com/vstvagent", "instagram": "https://instagram.com/vstvagent"}',
    NOW(),
    NOW()
  )
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  mission = EXCLUDED.mission,
  vision = EXCLUDED.vision,
  values = EXCLUDED.values,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  email = EXCLUDED.email,
  website = EXCLUDED.website,
  social_media = EXCLUDED.social_media,
  updated_at = NOW();

-- Success message
SELECT 'Database seeding completed successfully! ✅' as message;
