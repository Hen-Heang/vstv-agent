#!/usr/bin/env node

/**
 * Favicon Generator Script for VSTV Agent
 * 
 * This script helps create a favicon from your VSTV logo
 * Run with: node scripts/create-favicon.js
 */

const fs = require('fs')
const path = require('path')

function createFaviconInstructions() {
  console.log('🎯 VSTV Agent - Favicon Creation Guide\n')
  
  console.log('📁 Your Logo Files:')
  console.log('   ✅ VSTV LOGO-Profile Use-02.png (396 KB) - Main logo')
  console.log('   ✅ VSTV.png (319 KB) - Simple logo (perfect for favicon)\n')
  
  console.log('🔧 Favicon Creation Options:\n')
  
  console.log('1️⃣  ONLINE TOOLS (Recommended):')
  console.log('   🌐 Favicon.io: https://favicon.io/favicon-generator/')
  console.log('      - Upload your VSTV.png file')
  console.log('      - Generates all sizes automatically')
  console.log('      - Downloads favicon.ico and other formats\n')
  
  console.log('   🌐 RealFaviconGenerator: https://realfavicongenerator.net/')
  console.log('      - More advanced options')
  console.log('      - Generates for all platforms (iOS, Android, etc.)\n')
  
  console.log('2️⃣  MANUAL CREATION:')
  console.log('   📐 Required Sizes:')
  console.log('      - 16x16px (browser tab)')
  console.log('      - 32x32px (browser tab, bookmarks)')
  console.log('      - 48x48px (desktop shortcuts)')
  console.log('      - 180x180px (Apple touch icon)\n')
  
  console.log('3️⃣  QUICK SETUP:')
  console.log('   📝 Steps:')
  console.log('      1. Go to https://favicon.io/favicon-generator/')
  console.log('      2. Upload your VSTV.png file')
  console.log('      3. Download the generated favicon package')
  console.log('      4. Copy favicon.ico to public/ folder')
  console.log('      5. Update your layout.tsx with icon links\n')
  
  console.log('📋 Files to Add to public/ folder:')
  console.log('   - favicon.ico (16x16, 32x32)')
  console.log('   - apple-touch-icon.png (180x180)')
  console.log('   - favicon-16x16.png')
  console.log('   - favicon-32x32.png\n')
  
  console.log('🔗 Add to app/layout.tsx:')
  console.log('   ```tsx')
  console.log('   export const metadata: Metadata = {')
  console.log('     // ... existing metadata')
  console.log('     icons: {')
  console.log('       icon: "/favicon.ico",')
  console.log('       apple: "/apple-touch-icon.png",')
  console.log('     },')
  console.log('   }')
  console.log('   ```\n')
  
  console.log('✅ Current Status:')
  console.log('   - Your PNG logos are integrated in the website')
  console.log('   - Header, footer, and showcase use your new logos')
  console.log('   - Ready to add favicon for complete branding\n')
  
  console.log('🎉 Your VSTV Agent website now uses your updated PNG logos!')
}

// Check current favicon status
function checkFaviconStatus() {
  console.log('🔍 Checking current favicon status...\n')
  
  const publicDir = path.join(__dirname, '..', 'public')
  const faviconPath = path.join(publicDir, 'favicon.ico')
  
  if (fs.existsSync(faviconPath)) {
    const stats = fs.statSync(faviconPath)
    console.log('✅ favicon.ico exists')
    console.log(`   Size: ${Math.round(stats.size / 1024)} KB`)
    console.log(`   Last modified: ${stats.mtime.toLocaleDateString()}\n`)
  } else {
    console.log('❌ favicon.ico not found')
    console.log('   You need to create a favicon from your VSTV logo\n')
  }
  
  // Check for other icon files
  const iconFiles = [
    'apple-touch-icon.png',
    'favicon-16x16.png',
    'favicon-32x32.png'
  ]
  
  console.log('📱 Other icon files:')
  iconFiles.forEach(file => {
    const filePath = path.join(publicDir, file)
    if (fs.existsSync(filePath)) {
      console.log(`   ✅ ${file}`)
    } else {
      console.log(`   ❌ ${file}`)
    }
  })
  console.log('')
}

// Main function
function main() {
  checkFaviconStatus()
  createFaviconInstructions()
}

// Run the script
if (require.main === module) {
  main()
}

module.exports = { createFaviconInstructions, checkFaviconStatus }



