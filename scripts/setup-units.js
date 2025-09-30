import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

console.log('🚀 Setting up Unit Management System...\n');

try {
  // Check if we're in the right directory
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  
  if (!fs.existsSync(packageJsonPath)) {
    console.error('❌ Please run this script from the project root directory');
    process.exit(1);
  }

  console.log('📦 Installing additional dependencies...');
  execSync('npm install jspdf jspdf-autotable @types/jspdf', { stdio: 'inherit' });

  console.log('\n🗄️  Database setup instructions:');
  console.log('1. Make sure your PostgreSQL database is running');
  console.log('2. Update your .env file with the correct DATABASE_URL');
  console.log('3. Run: npx prisma db push');
  console.log('4. Run: npx prisma generate');
  console.log('5. (Optional) Run: npm run db:seed to populate sample data');

  console.log('\n✨ Unit Management System is ready!');
  console.log('\n📋 Features implemented:');
  console.log('✅ Unit CRUD operations (Create, Read, Update, Delete)');
  console.log('✅ Search and filter units');
  console.log('✅ Export to PDF with professional formatting');
  console.log('✅ Export to CSV for spreadsheet compatibility');
  console.log('✅ Responsive design for mobile and desktop');
  console.log('✅ Status management (Available, Sold, Rented, Negotiate)');
  console.log('✅ Agent assignment and tracking');
  console.log('✅ Remarks and notes system');

  console.log('\n🌐 Access your unit management at: http://localhost:3000/units');
  console.log('\n📊 The system includes:');
  console.log('- Dashboard with unit statistics');
  console.log('- Advanced search and filtering');
  console.log('- Bulk operations support');
  console.log('- Professional PDF reports');
  console.log('- Mobile-responsive interface');

} catch (error) {
  console.error('❌ Setup failed:', error.message);
  process.exit(1);
}
