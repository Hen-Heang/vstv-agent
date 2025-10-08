-- Create hero_slides table
CREATE TABLE IF NOT EXISTS hero_slides (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  background_image TEXT NOT NULL,
  cta TEXT NOT NULL,
  cta_secondary TEXT NOT NULL,
  cta_link TEXT,
  cta_secondary_link TEXT,
  "order" INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for ordering
CREATE INDEX IF NOT EXISTS idx_hero_slides_order ON hero_slides("order");

-- Create index for active slides
CREATE INDEX IF NOT EXISTS idx_hero_slides_active ON hero_slides(is_active);

-- Enable RLS (Row Level Security)
ALTER TABLE hero_slides ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access to active hero slides" ON hero_slides
  FOR SELECT USING (is_active = true);

-- Create policy for authenticated users to manage hero slides
CREATE POLICY "Allow authenticated users to manage hero slides" ON hero_slides
  FOR ALL USING (auth.role() = 'authenticated');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_hero_slides_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_hero_slides_updated_at
  BEFORE UPDATE ON hero_slides
  FOR EACH ROW
  EXECUTE FUNCTION update_hero_slides_updated_at();
