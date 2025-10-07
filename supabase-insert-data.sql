-- VSTV Agent Data Insertion
-- Run this AFTER creating the tables

-- 1. Insert Services
INSERT INTO services (id, title, description, icon, features, is_active, created_at, updated_at)
VALUES 
  ('service-1', 'Property Sales', 'Find your dream home with our extensive collection of properties for sale across Cambodia.', 'Home', ARRAY['Luxury condos and apartments', 'Family houses and villas', 'Commercial properties', 'Land and development plots', 'Investment opportunities'], true, NOW(), NOW()),
  ('service-2', 'Property Rental', 'Discover comfortable rental properties that suit your lifestyle and budget.', 'Building', ARRAY['Furnished and unfurnished options', 'Short-term and long-term rentals', 'Student accommodations', 'Corporate housing', 'Luxury rentals'], true, NOW(), NOW()),
  ('service-3', 'Property Management', 'Professional property management services to maximize your investment returns.', 'Settings', ARRAY['Tenant screening and management', 'Rent collection and accounting', 'Property maintenance coordination', 'Legal compliance assistance', 'Financial reporting'], true, NOW(), NOW()),
  ('service-4', 'Investment Consulting', 'Expert guidance for real estate investments in Cambodia''s growing market.', 'TrendingUp', ARRAY['Market analysis and trends', 'Investment opportunity assessment', 'Risk evaluation', 'ROI projections', 'Portfolio diversification advice'], true, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- 2. Insert Agents
INSERT INTO agents (id, agent_id, name, role, email, phone, bio, avatar, specialties, languages, experience, properties_sold, rating, is_active, created_at, updated_at)
VALUES 
  ('agent-1', '004', 'HENG KIMHONG', 'Real Estate Agent Supervisor', 'hengkimhong1803@email.com', '+855 96 4444 027', 'With extensive experience in the Cambodian real estate market, Heng Kimhong specializes in luxury properties and investment opportunities. As a supervisor, he leads a team of dedicated agents and has helped hundreds of clients find their dream homes and maximize their investment returns.', '/images/agents/heng-kimhong.html', ARRAY['Luxury Properties', 'Investment Consulting', 'Property Management', 'Team Leadership'], ARRAY['English', 'Khmer', 'Chinese'], 8, 180, 4.9, true, NOW(), NOW()),
  ('agent-2', '003', 'VIN SOLYVAY', 'Real Estate Agent', 'vinsolyvay@gmail.com', '+855 98 261 801', 'Vin Solyvay brings fresh perspective and dedication to the Cambodian real estate market. With a focus on client satisfaction and market expertise, he helps both local and international clients navigate the property landscape with confidence.', '/images/agents/vin-solyvay.html', ARRAY['Residential Properties', 'First-time Buyers', 'Market Analysis', 'Client Relations'], ARRAY['English', 'Khmer'], 5, 85, 4.8, true, NOW(), NOW()),
  ('agent-3', '008', 'HENG RITA', 'Real Estate Agent', 'hengrita@vstvagent.com', '+855 12 345 6789', 'Heng Rita is a dedicated real estate professional with a passion for helping clients find their perfect home. Her attention to detail and excellent customer service make her a trusted advisor in the Cambodian property market.', '/images/agents/Heng-Rita.jpg', ARRAY['Residential Sales', 'Property Rentals', 'Client Relations', 'Market Research'], ARRAY['English', 'Khmer'], 6, 120, 4.9, true, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- 3. Insert Properties
INSERT INTO properties (id, title, description, price, price_type, property_type, bedrooms, bathrooms, area, location, address, latitude, longitude, images, features, is_featured, is_available, agent_id, created_at, updated_at)
VALUES 
  ('property-1', 'Luxury Condo in BKK1', 'This stunning luxury condo in the heart of BKK1 offers modern living with premium amenities.', 1200, 'rent', 'condo', 2, 2, 85, 'BKK1, Phnom Penh', 'Street 123, Building ABC, BKK1, Phnom Penh, Cambodia', 11.5564, 104.9282, ARRAY['/images/properties/featured/luxury-condo-bkk1.jpg', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'], ARRAY['Swimming Pool', 'Fitness Center', 'Parking', '24/7 Security'], true, true, 'agent-1', NOW(), NOW()),
  ('property-2', 'Modern Apartment in Toul Kork', 'Comfortable and modern apartment in a prime location with excellent amenities.', 800, 'rent', 'apartment', 1, 1, 65, 'Toul Kork, Phnom Penh', 'Street 456, Building DEF, Toul Kork, Phnom Penh, Cambodia', 11.5700, 104.8900, ARRAY['/images/properties/featured/modern-apartment-toul-kork.jpg', 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'], ARRAY['Balcony', 'Security', 'WiFi'], true, true, 'agent-2', NOW(), NOW()),
  ('property-3', 'Premium Villa for Sale', 'Exclusive villa in Sen Sok with modern amenities and spacious living areas.', 250000, 'sale', 'villa', 4, 3, 200, 'Sen Sok, Phnom Penh', 'Street 789, Villa Complex, Sen Sok, Phnom Penh, Cambodia', 11.6000, 104.9000, ARRAY['/images/properties/featured/premium-villa-sen-sok.jpg', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'], ARRAY['Garden', 'Garage', 'Pool', 'Security'], true, true, 'agent-3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- 4. Insert Company Information
INSERT INTO company (id, name, description, mission, vision, values, address, phone, email, website, social_media, created_at, updated_at)
VALUES 
  ('company-1', 'VSTV AGENT (CAMBODIA) CO., LTD', 'Your trusted real estate partner in Cambodia. We help you find your dream property with expert guidance and personalized service.', 'To provide exceptional real estate services that help our clients achieve their property goals while maintaining the highest standards of integrity, professionalism, and customer satisfaction.', 'To be Cambodia''s leading real estate agency, recognized for our innovation, expertise, and commitment to excellence.', ARRAY['Trust & Transparency', 'Client-First Approach', 'Excellence & Quality', 'Innovation & Growth'], 'Street 123, Building ABC, Phnom Penh, Cambodia', '+855 12 345 6789', 'info@vstvagent.com', 'https://vstvagent.com', '{"telegram": "@vstvagent", "facebook": "https://facebook.com/vstvagent", "instagram": "https://instagram.com/vstvagent"}', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- 5. Insert Hero Slides
INSERT INTO hero_slides (id, title, subtitle, background_image, cta, cta_secondary, cta_link, cta_secondary_link, "order", is_active, created_at, updated_at)
VALUES 
  ('hero-slide-1', 'Find Your Dream Property in Cambodia', 'Discover premium condos, luxury apartments, and exclusive villas in Cambodia''s most desirable locations with expert guidance.', '/images/company/VSTV-BG.png', 'Explore Properties', 'Contact Agent', '/properties', '/contact', 1, true, NOW(), NOW()),
  ('hero-slide-2', 'Premium Properties in Prime Locations', 'From BKK1 luxury condos to Sen Sok family homes, find your perfect property with Cambodia''s trusted real estate experts.', '/images/properties/featured/luxury-condo-bkk1.jpg', 'View Listings', 'Schedule Tour', '/properties', '/contact', 2, true, NOW(), NOW()),
  ('hero-slide-3', 'Meet Our Expert Agents', 'Professional real estate agents with extensive experience in the Cambodian market. Let our experts guide you to your perfect property.', '/images/agents/Heng-Rita.jpg', 'Meet Our Agents', 'Contact Agent', '/agents', '/agents/008', 3, true, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- 6. Insert Company Info
INSERT INTO company_info (id, name, description, logo, background_image, mission, vision, values, address, phone, email, website, social_media, stats, is_active, created_at, updated_at)
VALUES 
  ('company-info-1', 'VSTV AGENT (CAMBODIA) CO., LTD', 'Your trusted real estate partner in Cambodia. We help you find your dream property with expert guidance and personalized service.', '/images/company/VSTV.png', '/images/company/VSTV-BG.png', 'To provide exceptional real estate services that help our clients achieve their property goals while maintaining the highest standards of integrity, professionalism, and customer satisfaction.', 'To be Cambodia''s leading real estate agency, recognized for our innovation, expertise, and commitment to excellence.', ARRAY['Trust & Transparency', 'Client-First Approach', 'Excellence & Quality', 'Innovation & Growth'], 'Street 123, Building ABC, Phnom Penh, Cambodia', '+855 12 345 6789', 'info@vstvagent.com', 'https://vstvagent.com', '{"telegram": "@vstvagent", "facebook": "https://facebook.com/vstvagent", "instagram": "https://instagram.com/vstvagent"}', '{"propertiesManaged": "1000+", "happyClients": "500+", "yearsExperience": "10+", "marketGrowth": "25%"}', true, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Success message
SELECT 'Database data inserted successfully! ✅' as message;
