#!/usr/bin/env node

/**
 * Company Image Optimization Script for VSTV Agent
 * 
 * This script helps optimize your company logo and cover images for web use.
 * Run with: node scripts/optimize-company-images.js
 */

const fs = require('fs')
const path = require('path')

// Image optimization recommendations
const imageOptimizations = {
  logo: {
    path: '/images/company/VSTV LOGO-Profile Use-02.png',
    recommendations: [
      'PNG format is excellent for logos with transparency',
      'Create multiple sizes: 32x32, 64x64, 128x128, 256x256',
      'Create a favicon.ico file (32x32 or 16x16)',
      'Consider creating SVG version for scalability'
    ],
    webFormats: ['PNG', 'SVG', 'WebP'],
    sizes: [
      { name: 'favicon', size: '32x32' },
      { name: 'header-small', size: '40x40' },
      { name: 'header-large', size: '80x80' },
      { name: 'footer', size: '48x48' },
      { name: 'profile', size: '150x150' }
    ]
  },
  logoSimple: {
    path: '/images/company/VSTV.png',
    recommendations: [
      'Simple logo version - perfect for small spaces',
      'Great for favicon and mobile navigation',
      'Consider creating multiple sizes',
      'PNG format maintains quality'
    ],
    webFormats: ['PNG', 'SVG', 'WebP'],
    sizes: [
      { name: 'favicon', size: '32x32' },
      { name: 'mobile-nav', size: '24x24' },
      { name: 'small-icon', size: '16x16' }
    ]
  },
  cover: {
    path: '/images/company/CSTV-Cover-24-06-25.jpg',
    recommendations: [
      'Optimize for web (compress to 80-90% quality)',
      'Create responsive versions for different screen sizes',
      'Consider creating a WebP version for better compression',
      'Ensure the image works well as a hero background'
    ],
    webFormats: ['JPG', 'WebP'],
    sizes: [
      { name: 'hero-mobile', size: '768x432' },
      { name: 'hero-tablet', size: '1024x576' },
      { name: 'hero-desktop', size: '1920x1080' },
      { name: 'about-page', size: '800x600' }
    ]
  }
}

function generateOptimizationReport() {
  console.log('🎨 VSTV Agent - Company Image Optimization Report\n')
  
  Object.entries(imageOptimizations).forEach(([imageType, config]) => {
    console.log(`📸 ${imageType.toUpperCase()} IMAGE`)
    console.log(`   Path: ${config.path}`)
    console.log(`   Current Format: ${path.extname(config.path).toUpperCase()}`)
    console.log('')
    
    console.log('   📋 RECOMMENDATIONS:')
    config.recommendations.forEach((rec, index) => {
      console.log(`   ${index + 1}. ${rec}`)
    })
    console.log('')
    
    console.log('   🎯 OPTIMIZED SIZES NEEDED:')
    config.sizes.forEach((size) => {
      console.log(`   - ${size.name}: ${size.size}px`)
    })
    console.log('')
    
    console.log('   📱 WEB-FRIENDLY FORMATS:')
    config.webFormats.forEach((format) => {
      console.log(`   - ${format}`)
    })
    console.log('')
    console.log('─'.repeat(60))
    console.log('')
  })
  
  console.log('🛠️  OPTIMIZATION TOOLS:')
  console.log('')
  console.log('   Online Tools:')
  console.log('   - TinyPNG: https://tinypng.com/')
  console.log('   - Squoosh: https://squoosh.app/')
  console.log('   - Favicon Generator: https://favicon.io/')
  console.log('   - ImageOptim: https://imageoptim.com/')
  console.log('')
  console.log('   Command Line:')
  console.log('   - ImageMagick: convert input.jpg -resize 40x40 output.png')
  console.log('   - Sharp (Node.js): npm install sharp')
  console.log('')
  
  console.log('📝 NEXT STEPS:')
  console.log('')
  console.log('   1. Create favicon.ico from your logo (32x32px)')
  console.log('   2. Optimize cover image for web (compress to 80-90% quality)')
  console.log('   3. Create multiple logo sizes for different use cases')
  console.log('   4. Consider creating a WebP version of your cover image')
  console.log('   5. Test images on different devices and screen sizes')
  console.log('')
  
  console.log('✅ CURRENT IMPLEMENTATION:')
  console.log('')
  console.log('   Your company images are already integrated into:')
  console.log('   - Header navigation (logo)')
  console.log('   - Footer (logo)')
  console.log('   - Hero section (cover image)')
  console.log('   - About page (cover image)')
  console.log('   - Company showcase section')
  console.log('   - Social media metadata (Open Graph)')
  console.log('')
  
  console.log('🎉 Your VSTV Agent branding is now live!')
}

// Check if images exist
function checkImageFiles() {
  console.log('🔍 Checking company image files...\n')
  
  const baseDir = path.join(__dirname, '..', 'public', 'images', 'company')
  
  Object.entries(imageOptimizations).forEach(([imageType, config]) => {
    const imagePath = path.join(baseDir, path.basename(config.path))
    const exists = fs.existsSync(imagePath)
    
    console.log(`${exists ? '✅' : '❌'} ${imageType.toUpperCase()}: ${path.basename(config.path)}`)
    
    if (exists) {
      const stats = fs.statSync(imagePath)
      const sizeKB = Math.round(stats.size / 1024)
      console.log(`   Size: ${sizeKB} KB`)
      console.log(`   Last modified: ${stats.mtime.toLocaleDateString()}`)
    }
    console.log('')
  })
}

// Main function
function main() {
  checkImageFiles()
  generateOptimizationReport()
}

// Run the script
if (require.main === module) {
  main()
}

module.exports = { generateOptimizationReport, checkImageFiles }
