# Supabase Agents Setup Guide

This guide will help you set up Supabase to store and manage agent data dynamically instead of using static data.

## 🚀 Quick Setup

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up/Login and create a new project
3. Wait for the project to be ready (usually 2-3 minutes)

### 2. Get Your Project Credentials

1. Go to your Supabase project dashboard
2. Navigate to **Settings** → **API**
3. Copy the following values:
   - **Project URL** (looks like: `https://your-project.supabase.co`)
   - **Anon/Public Key** (starts with `eyJ...`)

### 3. Set Up Environment Variables

Create or update your `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### 4. Create Database Schema

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy the contents of `supabase-agents-schema.sql` and paste it
4. Click **Run** to execute the SQL

### 5. Seed the Database

Run the following command to populate your database with agent data:

```bash
npm run seed:agents
```

### 6. Test the Setup

Start your development server:

```bash
npm run dev
```

Visit `/agents` to see your agents loaded from Supabase!

## 🔧 Manual Setup (Alternative)

If you prefer to set up manually:

### Step 1: Create the Agents Table

In your Supabase SQL Editor, run:

```sql
CREATE TABLE IF NOT EXISTS agents (
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
```

### Step 2: Set Up Security

```sql
-- Enable Row Level Security
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;

-- Allow public read access to active agents
CREATE POLICY "Allow public read access to active agents" ON agents
  FOR SELECT USING (is_active = true);

-- Allow authenticated users to manage agents
CREATE POLICY "Allow authenticated users to manage agents" ON agents
  FOR ALL USING (auth.role() = 'authenticated');
```

### Step 3: Create Indexes

```sql
CREATE INDEX IF NOT EXISTS idx_agents_is_active ON agents(is_active);
CREATE INDEX IF NOT EXISTS idx_agents_position ON agents(position);
CREATE INDEX IF NOT EXISTS idx_agents_rating ON agents(rating);
```

## 🎯 Features You'll Get

### ✅ Dynamic Agent Management
- **Create** new agents through the admin interface
- **Update** existing agent information
- **Delete** agents (soft delete - marks as inactive)
- **View** all agents with real-time data

### ✅ Full CRUD Operations
- All agent data is now stored in Supabase
- Real-time updates across the application
- Proper data validation and error handling
- Secure access controls

### ✅ Admin Interface
- Edit agents directly from the agent detail page
- Add new agents through the form
- Delete agents with confirmation
- All changes are immediately reflected

## 🔍 Troubleshooting

### Common Issues:

1. **"Supabase client not configured"**
   - Check your `.env.local` file has the correct environment variables
   - Restart your development server

2. **"Table doesn't exist"**
   - Make sure you ran the SQL schema in Supabase
   - Check the table exists in your Supabase dashboard

3. **"Permission denied"**
   - Check your RLS policies are set up correctly
   - Ensure your API keys have the right permissions

4. **"No agents showing"**
   - Run `npm run seed:agents` to populate the database
   - Check the agents table in Supabase dashboard

### Getting Help:

1. Check the Supabase dashboard for any errors
2. Look at the browser console for client-side errors
3. Check the terminal for server-side errors
4. Verify your environment variables are correct

## 🎉 Success!

Once everything is set up, you'll have:

- ✅ Dynamic agent data from Supabase
- ✅ Full CRUD operations
- ✅ Real-time updates
- ✅ Secure data management
- ✅ No more static data!

Your agents are now fully manageable through the database! 🚀
