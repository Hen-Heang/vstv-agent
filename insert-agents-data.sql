-- Insert agents data into Supabase
INSERT INTO agents (
  id, name, email, phone, telegram, position, bio, avatar_url, background_image,
  specialties, languages, experience_years, properties_sold, rating,
  education, certifications, achievements, location, is_active
) VALUES (
  '004',
  'HENG KIMHONG',
  'hengkimhong1803@email.com',
  '+855 96 4444 027',
  '0889832306',
  'Real Estate Agent Supervisor',
  'With extensive experience in the Cambodian real estate market, Heng Kimhong specializes in luxury properties and investment opportunities. As a supervisor, he leads a team of dedicated agents and has helped hundreds of clients find their dream homes and maximize their investment returns.',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  '/images/company/VSTV-BG.png',
  ARRAY['Luxury Properties', 'Investment Consulting', 'Property Management', 'Team Leadership'],
  ARRAY['English', 'Khmer', 'Chinese'],
  8,
  180,
  4.9,
  'Bachelor''s in Business Administration',
  ARRAY['Licensed Real Estate Agent', 'Property Investment Specialist', 'Team Management Certified'],
  ARRAY['Top Performer 2023', 'Team Leadership Award 2022', 'Sales Excellence Award 2021'],
  'Phnom Penh',
  true
);

INSERT INTO agents (
  id, name, email, phone, telegram, position, bio, avatar_url, background_image,
  specialties, languages, experience_years, properties_sold, rating,
  education, certifications, achievements, location, is_active
) VALUES (
  '003',
  'VIN SOLYVAY',
  'vinsolyvay@gmail.com',
  '+855 98 261 801',
  '098261801',
  'Real Estate Agent',
  'Vin Solyvay brings fresh perspective and dedication to the Cambodian real estate market. With a focus on client satisfaction and market expertise, he helps both local and international clients navigate the property landscape with confidence.',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  '/images/company/VSTV-BG.png',
  ARRAY['Residential Properties', 'First-time Buyers', 'Market Analysis', 'Client Relations'],
  ARRAY['English', 'Khmer'],
  5,
  85,
  4.8,
  'Bachelor''s in Business Administration',
  ARRAY['Licensed Real Estate Agent', 'Property Investment Specialist'],
  ARRAY['Rising Star 2023', 'Client Satisfaction Award 2022'],
  'Phnom Penh',
  true
);

INSERT INTO agents (
  id, name, email, phone, telegram, position, bio, avatar_url, background_image,
  specialties, languages, experience_years, properties_sold, rating,
  education, certifications, achievements, location, is_active
) VALUES (
  '008',
  'HENG RITA',
  'rytavsv168@gmail.com',
  '098-261-808',
  'assistant_vstv168',
  'Senior Real Estate Agent',
  'Heng Rita is a senior real estate professional with deep knowledge of the Cambodian property market. She specializes in luxury residential properties and has built strong relationships with both local and international clients.',
  '/images/agents/Heng-Rita.jpg',
  '/images/company/VSTV-BG.png',
  ARRAY['Luxury Residential', 'International Clients', 'Property Investment', 'Market Trends'],
  ARRAY['English', 'Khmer', 'Chinese'],
  7,
  120,
  4.9,
  'Bachelor''s in Business Administration',
  ARRAY['Licensed Real Estate Agent', 'Property Investment Specialist', 'International Property Certified'],
  ARRAY['Senior Agent Excellence 2023', 'International Client Award 2022', 'Sales Excellence Award 2021'],
  'Phnom Penh',
  true
);

INSERT INTO agents (
  id, name, email, phone, telegram, position, bio, avatar_url, background_image,
  specialties, languages, experience_years, properties_sold, rating,
  education, certifications, achievements, location, is_active
) VALUES (
  '009',
  'PENG HOUNANG',
  'Penghounang111@gmail.com',
  '+855 93 76 51 11',
  '093765111',
  'Real Estate Agent Manager',
  'Peng Hounang serves as a Real Estate Agent Manager, bringing strategic leadership and extensive market knowledge to the team. His management experience combined with deep property expertise makes him an invaluable asset to both clients and colleagues.',
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  '/images/company/VSTV-BG.png',
  ARRAY['Strategic Planning', 'Team Management', 'Commercial Properties', 'Investment Analysis'],
  ARRAY['English', 'Khmer', 'Chinese'],
  10,
  200,
  4.9,
  'Master''s in Business Administration',
  ARRAY['Licensed Real Estate Agent', 'Property Investment Specialist', 'Management Certified'],
  ARRAY['Manager Excellence 2023', 'Team Leadership Award 2022', 'Strategic Planning Award 2021'],
  'Phnom Penh',
  true
);

INSERT INTO agents (
  id, name, email, phone, telegram, position, bio, avatar_url, background_image,
  specialties, languages, experience_years, properties_sold, rating,
  education, certifications, achievements, location, is_active
) VALUES (
  '0010',
  'NHEM SAMI',
  'nhemsami@gmail.com',
  '+855 10 773 523',
  '010773523',
  'Real Estate Agent',
  'Nhem Sami is a dedicated real estate professional committed to helping clients find their perfect property. With a focus on residential properties and excellent customer service, he ensures every client receives personalized attention.',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  '/images/company/VSTV-BG.png',
  ARRAY['Residential Properties', 'Customer Service', 'Property Tours', 'Market Research'],
  ARRAY['English', 'Khmer'],
  4,
  65,
  4.7,
  'Bachelor''s in Business Administration',
  ARRAY['Licensed Real Estate Agent', 'Customer Service Certified'],
  ARRAY['Customer Service Excellence 2023', 'Rising Star Award 2022'],
  'Phnom Penh',
  true
);

INSERT INTO agents (
  id, name, email, phone, telegram, position, bio, avatar_url, background_image,
  specialties, languages, experience_years, properties_sold, rating,
  education, certifications, achievements, location, is_active
) VALUES (
  '005',
  'KHUN SINDIKA',
  'khunsingdika@gmail.com',
  '+855 96 616 1180',
  '0966161180',
  'Real Estate Agent',
  'Khun Sindika is a professional real estate agent with a passion for helping clients navigate the property market. Her attention to detail and commitment to excellence make her a trusted advisor for property transactions.',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  '/images/company/VSTV-BG.png',
  ARRAY['Residential Properties', 'Property Valuation', 'Client Relations', 'Market Analysis'],
  ARRAY['English', 'Khmer'],
  6,
  95,
  4.8,
  'Bachelor''s in Business Administration',
  ARRAY['Licensed Real Estate Agent', 'Property Valuation Specialist'],
  ARRAY['Valuation Excellence 2023', 'Client Relations Award 2022'],
  'Phnom Penh',
  true
);

INSERT INTO agents (
  id, name, email, phone, telegram, position, bio, avatar_url, background_image,
  specialties, languages, experience_years, properties_sold, rating,
  education, certifications, achievements, location, is_active
) VALUES (
  '007',
  'OEURN CHET',
  'chetvstv@gmail.com',
  '098-261-807',
  'Salevstv007',
  'Real Estate Agent Supervisor',
  'Oeurn Chet serves as a Real Estate Agent Supervisor, combining leadership skills with extensive property market knowledge. His supervisory role allows him to guide both clients and team members toward successful property transactions.',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  '/images/company/VSTV-BG.png',
  ARRAY['Team Leadership', 'Luxury Properties', 'Investment Consulting', 'Client Management'],
  ARRAY['English', 'Khmer', 'Chinese'],
  9,
  160,
  4.9,
  'Bachelor''s in Business Administration',
  ARRAY['Licensed Real Estate Agent', 'Property Investment Specialist', 'Leadership Certified'],
  ARRAY['Supervisory Excellence 2023', 'Team Leadership Award 2022', 'Sales Excellence Award 2021'],
  'Phnom Penh',
  true
);
