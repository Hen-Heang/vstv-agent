# Images Directory Structure

This directory contains all the static images for the VSTV Agent application.

## Directory Structure

```
public/images/
├── properties/          # Property listing images
│   ├── featured/       # Featured property images
│   ├── apartments/     # Apartment images
│   ├── condos/         # Condo images
│   ├── villas/         # Villa images
│   └── houses/         # House images
├── agents/             # Agent profile photos
├── company/            # Company logos and branding
├── icons/              # Custom icons and graphics
├── backgrounds/        # Background images for hero sections
└── placeholders/       # Placeholder images
```

## Image Guidelines

### Property Images
- **Format**: JPG or WebP (preferred for better compression)
- **Size**: 1200x800px minimum for property cards
- **Quality**: High quality, well-lit, professional photos
- **Naming**: Use descriptive names like `luxury-condo-bkk1-01.jpg`

### Agent Photos
- **Format**: JPG or PNG
- **Size**: 400x400px (square aspect ratio)
- **Style**: Professional headshots with consistent lighting
- **Naming**: Use agent names like `john-doe.jpg`

### Company Images
- **Logo**: SVG format preferred for scalability
- **Backgrounds**: High-resolution images for hero sections
- **Icons**: PNG with transparent background

## Usage Examples

```jsx
// Static import (recommended for small images)
import logo from '/images/company/logo.svg'
import agentPhoto from '/images/agents/john-doe.jpg'

// Dynamic import with Next.js Image component
<Image
  src="/images/properties/featured/luxury-condo-01.jpg"
  alt="Luxury Condo in BKK1"
  width={400}
  height={300}
/>
```
