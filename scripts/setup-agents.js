const { execSync } = require('child_process');
const path = require('path');

console.log('🚀 Setting up agents database...');

try {
  // Generate Prisma client
  console.log('📦 Generating Prisma client...');
  execSync('npx prisma generate', { stdio: 'inherit' });

  // Push schema to database
  console.log('🗄️ Pushing schema to database...');
  execSync('npx prisma db push', { stdio: 'inherit' });

  // Seed agents data
  console.log('🌱 Seeding agents data...');
  execSync('npx tsx lib/seed-agents.ts', { stdio: 'inherit' });

  console.log('✅ Agents setup completed successfully!');
  console.log('');
  console.log('📋 What was done:');
  console.log('  • Updated Agent model with all ID card fields');
  console.log('  • Created database tables');
  console.log('  • Seeded 7 agents with real data from ID cards');
  console.log('  • Created API routes for agent management');
  console.log('');
  console.log('🎯 Next steps:');
  console.log('  • Update agent images with real photos from ID cards');
  console.log('  • Test agent pages at /agents');
  console.log('  • Test individual agent pages like /agents/004');

} catch (error) {
  console.error('❌ Error setting up agents:', error.message);
  process.exit(1);
}
