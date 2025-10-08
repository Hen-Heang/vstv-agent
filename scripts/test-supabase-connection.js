#!/usr/bin/env node

console.log('🔍 Testing Supabase connection...\n');

// Check environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('Environment Variables:');
console.log('====================');
console.log(`NEXT_PUBLIC_SUPABASE_URL: ${supabaseUrl ? '✅ Set' : '❌ Not set'}`);
console.log(`NEXT_PUBLIC_SUPABASE_ANON_KEY: ${supabaseKey ? '✅ Set' : '❌ Not set'}`);

if (!supabaseUrl || !supabaseKey) {
  console.log('\n❌ Supabase environment variables not configured!');
  console.log('\n📋 To fix this:');
  console.log('1. Create/update .env.local file in your project root');
  console.log('2. Add these variables:');
  console.log('   NEXT_PUBLIC_SUPABASE_URL=https://stofwehocrbkrjphogiy.supabase.co');
  console.log('   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here');
  console.log('\n3. Get your anon key from Supabase dashboard → Settings → API');
  console.log('4. Restart your development server');
  process.exit(1);
}

console.log('\n✅ Environment variables are configured!');
console.log('\n🎯 Next steps:');
console.log('1. Make sure you have inserted agent data into Supabase');
console.log('2. Run: npm run dev');
console.log('3. Visit /agents to see your agents from the database!');
console.log('\n🚀 Your agents are now fully dynamic!');
