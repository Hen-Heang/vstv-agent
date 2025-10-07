const { execSync } = require('child_process')
const path = require('path')

console.log('🚀 Starting database migration and seeding process...')

try {
  // 1. Generate Prisma client
  console.log('📦 Generating Prisma client...')
  execSync('npx prisma generate', { stdio: 'inherit' })

  // 2. Push database schema
  console.log('🗄️ Pushing database schema...')
  execSync('npx prisma db push', { stdio: 'inherit' })

  // 3. Run the complete seed script
  console.log('🌱 Seeding database with complete data...')
  execSync('npx tsx lib/seed-complete.ts', { stdio: 'inherit' })

  console.log('✅ Database migration and seeding completed successfully!')
  console.log('🎉 Your application is now ready with database-driven content!')
  
} catch (error) {
  console.error('❌ Error during migration and seeding:', error.message)
  process.exit(1)
}
