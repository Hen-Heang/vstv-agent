#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

console.log('🔧 Interactive Supabase Setup\n');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('📋 To get your Supabase anon key:');
console.log('1. Go to: https://stofwehocrbkrjphogiy.supabase.co');
console.log('2. Navigate to Settings → API');
console.log('3. Copy the anon/public key (starts with eyJ...)');
console.log('');

rl.question('Enter your Supabase anon key: ', (anonKey) => {
  if (!anonKey || anonKey.trim() === '') {
    console.log('❌ No key provided. Please run this script again with your anon key.');
    rl.close();
    return;
  }

  const envContent = `# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://stofwehocrbkrjphogiy.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=${anonKey.trim()}
`;

  const envPath = path.join(process.cwd(), '.env.local');

  try {
    fs.writeFileSync(envPath, envContent);
    console.log('\n✅ .env.local file updated successfully!');
    console.log('\n🎯 Next steps:');
    console.log('1. Run: npm run test:supabase');
    console.log('2. Run: npm run dev');
    console.log('3. Visit /agents to see your dynamic data!');
    console.log('\n🎉 Your agents will now be loaded from Supabase!');
  } catch (error) {
    console.error('❌ Error updating .env.local:', error.message);
  }

  rl.close();
});
