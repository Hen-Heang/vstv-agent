#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Creating .env.local file...\n');

const envContent = `# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://stofwehocrbkrjphogiy.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# Instructions:
# 1. Go to your Supabase dashboard: https://stofwehocrbkrjphogiy.supabase.co
# 2. Navigate to Settings → API
# 3. Copy the anon/public key (starts with eyJ...)
# 4. Replace 'your_anon_key_here' with the actual key
# 5. Save this file and restart your development server
`;

const envPath = path.join(process.cwd(), '.env.local');

try {
  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env.local file created successfully!');
  console.log('\n📋 Next steps:');
  console.log('1. Get your anon key from Supabase dashboard → Settings → API');
  console.log('2. Replace "your_anon_key_here" with the actual key');
  console.log('3. Save the file');
  console.log('4. Run: npm run test:supabase');
  console.log('5. Run: npm run dev');
  console.log('\n🎉 Your agents will now be loaded from Supabase!');
} catch (error) {
  console.error('❌ Error creating .env.local file:', error.message);
  console.log('\n📝 Please create .env.local manually with this content:');
  console.log(envContent);
}
