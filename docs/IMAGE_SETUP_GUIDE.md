# 📸 Image Setup Guide for VSTV Agent

This guide will help you set up and manage images for your VSTV Agent real estate application.

## 🚀 Quick Start

### 1. Download Sample Images (Optional)
```bash
# Run the image setup script to download sample images
node scripts/setup-images.js
```

### 2. Manual Setup
If you prefer to add your own images manually:

1. **Create the directory structure** (already created):
   ```
   public/images/
   ├── properties/featured/
   ├── agents/
   ├── company/
   └── backgrounds/
   ```

2. **Add your images** to the appropriate folders
3. **Update image references** in your components

## 📁 Directory Structure

```
public/images/
├── properties/              # Property listing images
│   ├── featured/           # Featured property images
│   ├── apartments/         # Apartment images
│   ├── condos/            # Condo images
│   ├── villas/            # Villa images
│   └── houses/            # House images
├── agents/                 # Agent profile photos
├── company/               # Company logos and branding
├── backgrounds/           # Background images for hero sections
└── placeholders/          # Placeholder images for development
```

## 🖼️ Image Requirements

### Property Images
- **Format**: JPG, PNG, or WebP
- **Size**: Minimum 1200x800px
- **Quality**: High resolution, well-lit, professional photos
- **Naming**: Descriptive names (e.g., `luxury-condo-bkk1.jpg`)
- **Optimization**: Compress for web without losing quality

### Agent Photos
- **Format**: JPG or PNG
- **Size**: 400x400px (square aspect ratio)
- **Style**: Professional headshots with consistent lighting
- **Naming**: Use agent names (e.g., `john-doe.jpg`)

### Company Images
- **Logo**: SVG format preferred for scalability
- **Backgrounds**: High-resolution images for hero sections
- **Office Photos**: Professional photos of your office/building

## 🔧 Implementation

### Using Local Images in Components

#### Method 1: Direct Path (Recommended)
```jsx
import Image from 'next/image'

<Image
  src="/images/properties/featured/luxury-condo-bkk1.jpg"
  alt="Luxury Condo in BKK1, Phnom Penh"
  width={400}
  height={300}
/>
```

#### Method 2: Using Image Utilities
```jsx
import { propertyImages } from '@/utils/images'
import OptimizedImage from '@/components/ui/optimized-image'

<OptimizedImage
  {...propertyImages.featured.luxuryCondoBKK1}
  className="rounded-lg"
/>
```

### Updating Existing Components

1. **Featured Listings**: Update `components/home/featured-listings.tsx`
2. **Property Cards**: Update `components/properties/interactive-property-card.tsx`
3. **Agent Profiles**: Update agent components with local image paths
4. **Hero Section**: Update background images in hero components

## 🛠️ Image Optimization

### Online Tools
- **TinyPNG**: https://tinypng.com/
- **Squoosh**: https://squoosh.app/
- **ImageOptim**: https://imageoptim.com/

### Command Line Tools
```bash
# Install Sharp for image optimization
npm install sharp

# Optimize images (example script)
node -e "
const sharp = require('sharp');
sharp('input.jpg')
  .resize(1200, 800)
  .jpeg({ quality: 80 })
  .toFile('output.jpg');
"
```

### Next.js Image Optimization
Next.js automatically optimizes images when using the `Image` component:
- Automatic WebP conversion
- Responsive image sizing
- Lazy loading
- Blur placeholder

## 📱 Responsive Images

### Using Next.js Image with Sizes
```jsx
<Image
  src="/images/properties/featured/luxury-condo-bkk1.jpg"
  alt="Luxury Condo"
  width={1200}
  height={800}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  className="w-full h-auto"
/>
```

### Different Sizes for Different Devices
```jsx
// Mobile: 400x300
// Tablet: 800x600  
// Desktop: 1200x800
<Image
  src="/images/properties/featured/luxury-condo-bkk1.jpg"
  alt="Luxury Condo"
  width={1200}
  height={800}
  sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px"
/>
```

## 🎨 Image Styling

### CSS Classes for Images
```css
/* Property card images */
.property-image {
  @apply w-full h-64 object-cover rounded-lg;
}

/* Agent profile photos */
.agent-photo {
  @apply w-20 h-20 rounded-full object-cover;
}

/* Hero background images */
.hero-bg {
  @apply w-full h-screen object-cover;
}
```

### Loading States
```jsx
import OptimizedImage from '@/components/ui/optimized-image'

<OptimizedImage
  src="/images/properties/featured/luxury-condo-bkk1.jpg"
  alt="Luxury Condo"
  width={400}
  height={300}
  className="rounded-lg"
  // Automatically handles loading states
/>
```

## 🔄 Fallback Images

### Using Placeholder Images
```jsx
import { placeholderImages } from '@/utils/images'

const imageSrc = property.image || placeholderImages.property.src
const imageAlt = property.image ? property.alt : 'Property image not available'
```

### Error Handling
```jsx
const [imageError, setImageError] = useState(false)

<Image
  src={imageError ? '/images/placeholders/property-placeholder.jpg' : property.image}
  alt={property.title}
  width={400}
  height={300}
  onError={() => setImageError(true)}
/>
```

## 📊 Performance Tips

1. **Use WebP format** when possible for better compression
2. **Implement lazy loading** for images below the fold
3. **Use appropriate image sizes** for different screen sizes
4. **Compress images** before uploading
5. **Use Next.js Image component** for automatic optimization
6. **Consider using a CDN** for production

## 🚀 Deployment

### Vercel Deployment
Images in the `public` folder are automatically served by Vercel:
- No additional configuration needed
- Automatic optimization
- Global CDN distribution

### Other Hosting Platforms
- Ensure the `public` folder is included in deployment
- Configure proper MIME types for images
- Consider using a CDN for better performance

## 🔍 Troubleshooting

### Common Issues

1. **Images not loading**
   - Check file paths (case-sensitive)
   - Verify images are in the `public` folder
   - Check file permissions

2. **Slow loading**
   - Optimize image sizes
   - Use WebP format
   - Implement lazy loading

3. **Layout shifts**
   - Always specify width and height
   - Use aspect ratio containers
   - Implement skeleton loaders

### Debug Tools
```jsx
// Add to your component for debugging
console.log('Image path:', '/images/properties/featured/luxury-condo-bkk1.jpg')
console.log('Public folder exists:', fs.existsSync('public/images'))
```

## 📝 Checklist

- [ ] Create image directory structure
- [ ] Add property images to `public/images/properties/featured/`
- [ ] Add agent photos to `public/images/agents/`
- [ ] Add company logo to `public/images/company/`
- [ ] Update component image paths
- [ ] Test image loading on all pages
- [ ] Optimize images for web
- [ ] Test responsive behavior
- [ ] Verify accessibility (alt text)
- [ ] Check performance metrics

## 🎯 Next Steps

1. **Replace sample images** with your actual property photos
2. **Optimize images** for better performance
3. **Add more image categories** as needed
4. **Implement image galleries** for property details
5. **Add image upload functionality** for admin users

---

Need help? Check the placeholder generator at `/images/placeholders/placeholder-generator.html` for visual examples and additional guidance.
