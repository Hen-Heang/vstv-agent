# 🔑 How to Get Your Supabase Anon Key

## Step 1: Go to Your Supabase Dashboard
1. Open your browser and go to: https://stofwehocrbkrjphogiy.supabase.co
2. Sign in to your Supabase account

## Step 2: Navigate to API Settings
1. In your Supabase dashboard, look for **Settings** in the left sidebar
2. Click on **Settings** → **API**

## Step 3: Copy Your Anon Key
1. You'll see a section called **Project API keys**
2. Look for **anon/public** key (it starts with `eyJ...`)
3. Copy the entire key (it's a long string)

## Step 4: Update Your .env.local File
1. Open the `.env.local` file in your project root
2. Replace `your_anon_key_here` with the actual key you copied
3. Save the file

## Step 5: Test the Connection
Run this command to test if it's working:
```bash
npm run test:supabase
```

## Step 6: Restart Your Development Server
```bash
npm run dev
```

## 🎉 That's It!
Your agents will now be loaded from Supabase instead of static data!

---

**Example of what your .env.local should look like:**
```
NEXT_PUBLIC_SUPABASE_URL=https://stofwehocrbkrjphogiy.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...your_actual_key_here
```
