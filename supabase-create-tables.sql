-- VSTV Agent Database Schema Creation
-- Run this in your Supabase SQL Editor FIRST

-- 1. Create Services Table
CREATE TABLE IF NOT EXISTS services (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  features TEXT[],
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create Agents Table
CREATE TABLE IF NOT EXISTS agents (
  id TEXT PRIMARY KEY,
  agent_id TEXT UNIQUE,
  name TEXT NOT NULL,
  role TEXT,
  email TEXT UNIQUE,
  phone TEXT,
  bio TEXT,
  avatar TEXT,
  specialties TEXT[],
  languages TEXT[],
  experience INTEGER DEFAULT 0,
  properties_sold INTEGER DEFAULT 0,
  rating DECIMAL(3,2) DEFAULT 0.0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create Properties Table
CREATE TABLE IF NOT EXISTS properties (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  price DECIMAL(12,2) NOT NULL,
  price_type TEXT NOT NULL,
  property_type TEXT NOT NULL,
  bedrooms INTEGER,
  bathrooms INTEGER,
  area DECIMAL(8,2),
  location TEXT,
  address TEXT,
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  images TEXT[],
  features TEXT[],
  is_featured BOOLEAN DEFAULT false,
  is_available BOOLEAN DEFAULT true,
  agent_id TEXT REFERENCES agents(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create Company Table
CREATE TABLE IF NOT EXISTS company (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  mission TEXT,
  vision TEXT,
  values TEXT[],
  address TEXT,
  phone TEXT,
  email TEXT,
  website TEXT,
  social_media JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Create Hero Slides Table
CREATE TABLE IF NOT EXISTS hero_slides (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  background_image TEXT,
  cta TEXT,
  cta_secondary TEXT,
  cta_link TEXT,
  cta_secondary_link TEXT,
  "order" INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Create Company Info Table
CREATE TABLE IF NOT EXISTS company_info (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  logo TEXT,
  background_image TEXT,
  mission TEXT,
  vision TEXT,
  values TEXT[],
  address TEXT,
  phone TEXT,
  email TEXT,
  website TEXT,
  social_media JSONB,
  stats JSONB,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Success message
SELECT 'Database tables created successfully! ✅' as message;
