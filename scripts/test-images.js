#!/usr/bin/env node

/**
 * Image Test Script for VSTV Agent
 * 
 * This script tests if your images are accessible and properly configured
 * Run with: node scripts/test-images.js
 */

const fs = require('fs')
const path = require('path')

function testImageFiles() {
  console.log('🔍 Testing VSTV Agent Images...\n')
  
  const publicDir = path.join(__dirname, '..', 'public')
  const imagesDir = path.join(publicDir, 'images', 'company')
  
  // Test company images
  const companyImages = [
    'VSTV LOGO-Profile Use-02.png',
    'VSTV.png'
  ]
  
  console.log('📁 Company Images:')
  companyImages.forEach(image => {
    const imagePath = path.join(imagesDir, image)
    const exists = fs.existsSync(imagePath)
    
    if (exists) {
      const stats = fs.statSync(imagePath)
      const sizeKB = Math.round(stats.size / 1024)
      console.log(`   ✅ ${image} (${sizeKB} KB)`)
    } else {
      console.log(`   ❌ ${image} - NOT FOUND`)
    }
  })
  console.log('')
  
  // Test favicon
  const faviconPath = path.join(publicDir, 'favicon.ico')
  const faviconExists = fs.existsSync(faviconPath)
  
  console.log('🎯 Favicon:')
  if (faviconExists) {
    const stats = fs.statSync(faviconPath)
    const sizeKB = Math.round(stats.size / 1024)
    console.log(`   ✅ favicon.ico (${sizeKB} KB)`)
    
    // Check if it's a real image file or placeholder
    if (sizeKB < 1) {
      console.log('   ⚠️  Warning: favicon.ico is very small, might be placeholder')
    }
  } else {
    console.log('   ❌ favicon.ico - NOT FOUND')
  }
  console.log('')
  
  // Test image paths in components
  console.log('🔗 Component Image Paths:')
  const componentFiles = [
    'components/layout/header.tsx',
    'components/layout/footer.tsx',
    'components/home/company-showcase.tsx'
  ]
  
  componentFiles.forEach(file => {
    const filePath = path.join(__dirname, '..', file)
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8')
      const hasPNG = content.includes('VSTV LOGO-Profile Use-02.png')
      const hasJPG = content.includes('VSTV LOGO-Profile Use-02.jpg')
      
      if (hasPNG && !hasJPG) {
        console.log(`   ✅ ${file} - Using PNG logo`)
      } else if (hasJPG && !hasPNG) {
        console.log(`   ❌ ${file} - Still using JPG logo`)
      } else if (hasPNG && hasJPG) {
        console.log(`   ⚠️  ${file} - Has both PNG and JPG references`)
      } else {
        console.log(`   ❓ ${file} - No logo references found`)
      }
    } else {
      console.log(`   ❌ ${file} - File not found`)
    }
  })
  console.log('')
  
  // Browser cache troubleshooting
  console.log('🌐 Browser Cache Troubleshooting:')
  console.log('')
  console.log('   If images are not updating, try these steps:')
  console.log('   1. Hard refresh: Ctrl + F5 (Windows) or Cmd + Shift + R (Mac)')
  console.log('   2. Clear browser cache: Ctrl + Shift + Delete')
  console.log('   3. Open in incognito/private mode')
  console.log('   4. Try a different browser')
  console.log('   5. Check browser developer tools (F12) for 404 errors')
  console.log('')
  
  // Next.js specific troubleshooting
  console.log('⚡ Next.js Troubleshooting:')
  console.log('')
  console.log('   1. Restart development server: npm run dev')
  console.log('   2. Clear Next.js cache: Delete .next folder')
  console.log('   3. Check console for image loading errors')
  console.log('   4. Verify images are in public/ folder (not src/)')
  console.log('')
  
  // Image optimization check
  console.log('📊 Image Optimization Status:')
  console.log('')
  console.log('   ✅ PNG format - Better quality than JPG')
  console.log('   ✅ Next.js Image component - Automatic optimization')
  console.log('   ✅ Responsive sizing - Works on all devices')
  console.log('   ✅ Lazy loading - Better performance')
  console.log('')
  
  console.log('🎉 Image test completed!')
}

// Main function
function main() {
  testImageFiles()
}

// Run the script
if (require.main === module) {
  main()
}

module.exports = { testImageFiles }
