-- First, let's check what columns exist and fix the table structure
-- Run this in your Supabase SQL Editor

-- Drop the existing table if it has issues
DROP TABLE IF EXISTS agents CASCADE;

-- Create the agents table with the correct structure
CREATE TABLE agents (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  telegram TEXT,
  position TEXT,
  bio TEXT,
  avatar_url TEXT,
  background_image TEXT DEFAULT '/images/company/VSTV-BG.png',
  specialties TEXT[] DEFAULT '{}',
  languages TEXT[] DEFAULT '{}',
  experience_years INTEGER DEFAULT 0,
  properties_sold INTEGER DEFAULT 0,
  rating DECIMAL(2,1) DEFAULT 0.0,
  education TEXT,
  certifications TEXT[] DEFAULT '{}',
  achievements TEXT[] DEFAULT '{}',
  location TEXT DEFAULT 'Phnom Penh',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_agents_is_active ON agents(is_active);
CREATE INDEX idx_agents_position ON agents(position);
CREATE INDEX idx_agents_rating ON agents(rating);

-- Enable Row Level Security (RLS)
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access to active agents" ON agents
  FOR SELECT USING (is_active = true);

-- Create policies for authenticated users to manage agents
CREATE POLICY "Allow authenticated users to manage agents" ON agents
  FOR ALL USING (auth.role() = 'authenticated');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_agents_updated_at 
  BEFORE UPDATE ON agents 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();
