#!/usr/bin/env node

/**
 * Image Setup Script for VSTV Agent
 * 
 * This script helps you download and organize images for your real estate application.
 * Run with: node scripts/setup-images.js
 */

const fs = require('fs')
const path = require('path')
const https = require('https')

// Image URLs to download (you can replace these with your own images)
const imagesToDownload = {
  properties: {
    'luxury-condo-bkk1.jpg': 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    'modern-apartment-toul-kork.jpg': 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    'premium-villa-sen-sok.jpg': 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    'cozy-studio-city-center.jpg': 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    'spacious-family-house.jpg': 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    'high-end-condo-river-view.jpg': 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  agents: {
    'john-doe.jpg': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    'jane-smith.jpg': 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    'mike-johnson.jpg': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    'sarah-wilson.jpg': 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  backgrounds: {
    'hero-phnom-penh.jpg': 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
  }
}

// Function to download an image
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath)
    
    https.get(url, (response) => {
      response.pipe(file)
      
      file.on('finish', () => {
        file.close()
        console.log(`✅ Downloaded: ${path.basename(filepath)}`)
        resolve()
      })
      
      file.on('error', (err) => {
        fs.unlink(filepath, () => {}) // Delete the file on error
        reject(err)
      })
    }).on('error', (err) => {
      reject(err)
    })
  })
}

// Function to create directory if it doesn't exist
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
    console.log(`📁 Created directory: ${dirPath}`)
  }
}

// Main function
async function setupImages() {
  console.log('🚀 Setting up images for VSTV Agent...\n')
  
  const baseDir = path.join(__dirname, '..', 'public', 'images')
  
  try {
    // Download property images
    console.log('📸 Downloading property images...')
    const propertiesDir = path.join(baseDir, 'properties', 'featured')
    ensureDirectoryExists(propertiesDir)
    
    for (const [filename, url] of Object.entries(imagesToDownload.properties)) {
      const filepath = path.join(propertiesDir, filename)
      await downloadImage(url, filepath)
    }
    
    // Download agent images
    console.log('\n👥 Downloading agent images...')
    const agentsDir = path.join(baseDir, 'agents')
    ensureDirectoryExists(agentsDir)
    
    for (const [filename, url] of Object.entries(imagesToDownload.agents)) {
      const filepath = path.join(agentsDir, filename)
      await downloadImage(url, filepath)
    }
    
    // Download background images
    console.log('\n🌅 Downloading background images...')
    const backgroundsDir = path.join(baseDir, 'backgrounds')
    ensureDirectoryExists(backgroundsDir)
    
    for (const [filename, url] of Object.entries(imagesToDownload.backgrounds)) {
      const filepath = path.join(backgroundsDir, filename)
      await downloadImage(url, filepath)
    }
    
    console.log('\n🎉 All images downloaded successfully!')
    console.log('\n📝 Next steps:')
    console.log('1. Replace the downloaded images with your own high-quality photos')
    console.log('2. Optimize images for web (compress, resize if needed)')
    console.log('3. Update the image configurations in utils/images.ts if needed')
    console.log('4. Test the application to ensure all images load correctly')
    
  } catch (error) {
    console.error('❌ Error setting up images:', error.message)
    process.exit(1)
  }
}

// Run the script
if (require.main === module) {
  setupImages()
}

module.exports = { setupImages }
