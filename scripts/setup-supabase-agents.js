#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

console.log('🚀 Setting up Supabase agents database...\n');

try {
  // Check if Supabase CLI is installed
  try {
    execSync('supabase --version', { stdio: 'pipe' });
    console.log('✅ Supabase CLI found');
  } catch (error) {
    console.log('❌ Supabase CLI not found. Please install it first:');
    console.log('   npm install -g supabase');
    console.log('   or visit: https://supabase.com/docs/guides/cli');
    process.exit(1);
  }

  console.log('\n📋 Next steps:');
  console.log('1. Run the SQL schema in your Supabase dashboard:');
  console.log('   - Go to your Supabase project dashboard');
  console.log('   - Navigate to SQL Editor');
  console.log('   - Copy and paste the contents of supabase-agents-schema.sql');
  console.log('   - Execute the SQL');
  
  console.log('\n2. Set up your environment variables in .env.local:');
  console.log('   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url');
  console.log('   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key');
  
  console.log('\n3. Run the seeding script:');
  console.log('   npm run seed:agents');
  
  console.log('\n4. Test the setup by running:');
  console.log('   npm run dev');
  
  console.log('\n🎉 Setup instructions complete!');
  
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
