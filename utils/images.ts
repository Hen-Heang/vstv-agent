// Image utility functions for VSTV Agent

export interface ImageConfig {
  src: string
  alt: string
  width?: number
  height?: number
  priority?: boolean
  quality?: number
}

// Property image configurations
export const propertyImages = {
  featured: {
    luxuryCondoBKK1: {
      src: '/images/properties/featured/luxury-condo-bkk1.jpg',
      alt: 'Luxury Condo in BKK1, Phnom Penh',
      width: 1000,
      height: 667
    },
    modernApartmentToulKork: {
      src: '/images/properties/featured/modern-apartment-toul-kork.jpg',
      alt: 'Modern Apartment in Toul Kork, Phnom Penh',
      width: 1000,
      height: 667
    },
    premiumVillaSenSok: {
      src: '/images/properties/featured/premium-villa-sen-sok.jpg',
      alt: 'Premium Villa in Sen Sok, Phnom Penh',
      width: 1000,
      height: 667
    },
    cozyStudioCityCenter: {
      src: '/images/properties/featured/cozy-studio-city-center.jpg',
      alt: 'Cozy Studio in City Center, Phnom Penh',
      width: 1000,
      height: 667
    },
    spaciousFamilyHouse: {
      src: '/images/properties/featured/spacious-family-house.jpg',
      alt: 'Spacious Family House in Chroy Changvar',
      width: 1000,
      height: 667
    },
    highEndCondoRiverView: {
      src: '/images/properties/featured/high-end-condo-river-view.jpg',
      alt: 'High-End Condo with River View in Tonle Bassac',
      width: 1000,
      height: 667
    }
  }
}

// Agent image configurations
export const agentImages = {
  johnDoe: {
    src: '/images/agents/john-doe.jpg',
    alt: 'John Doe - Senior Real Estate Agent',
    width: 400,
    height: 400
  },
  janeSmith: {
    src: '/images/agents/jane-smith.jpg',
    alt: 'Jane Smith - Real Estate Specialist',
    width: 400,
    height: 400
  },
  mikeJohnson: {
    src: '/images/agents/mike-johnson.jpg',
    alt: 'Mike Johnson - Property Investment Advisor',
    width: 400,
    height: 400
  },
  sarahWilson: {
    src: '/images/agents/sarah-wilson.jpg',
    alt: 'Sarah Wilson - Rental Specialist',
    width: 400,
    height: 400
  }
}

// Company and background images
export const companyImages = {
  logo: {
    src: '/images/company/VSTV.png',
    alt: 'VSTV Agent Logo',
    width: 120,
    height: 80
  },
  logoProfile: {
    src: '/images/company/VSTV LOGO-Profile Use-02.png',
    alt: 'VSTV Agent Profile Logo',
    width: 150,
    height: 150
  },
  logoSimple: {
    src: '/images/company/VSTV.png',
    alt: 'VSTV Logo Simple',
    width: 100,
    height: 100
  },
  cover: {
    src: '/images/company/VSTV.png',
    alt: 'VSTV Agent Company Cover',
    width: 1920,
    height: 1080
  },
  heroBackground: {
    src: '/images/company/VSTV.png',
    alt: 'VSTV Agent Company Background',
    width: 1920,
    height: 1080
  },
  officeBuilding: {
    src: '/images/company/VSTV.png',
    alt: 'VSTV Agent Office Building',
    width: 800,
    height: 600
  }
}

// Placeholder images for development
export const placeholderImages = {
  property: {
    src: '/images/placeholders/property-placeholder.jpg',
    alt: 'Property Image Placeholder',
    width: 400,
    height: 300
  },
  agent: {
    src: '/images/placeholders/agent-placeholder.jpg',
    alt: 'Agent Photo Placeholder',
    width: 400,
    height: 400
  }
}

// Utility function to get image with fallback
export function getImageWithFallback(
  primaryImage: ImageConfig,
  fallbackImage: ImageConfig = placeholderImages.property
): ImageConfig {
  return {
    ...primaryImage,
    // In a real app, you might want to check if the image exists
    // For now, we'll use the primary image
  }
}

// Generate optimized image URLs for different sizes
export function getOptimizedImageUrl(
  baseSrc: string,
  width: number,
  height?: number,
  quality: number = 75
): string {
  // In a real application, you might use a service like Cloudinary or ImageKit
  // For now, we'll return the base source
  return baseSrc
}

// Image loading states
export const imageLoadingStates = {
  loading: 'animate-pulse bg-gray-200',
  loaded: 'opacity-100',
  error: 'bg-gray-100 flex items-center justify-center'
}

// Common image sizes for different use cases
export const imageSizes = {
  thumbnail: { width: 150, height: 150 },
  card: { width: 400, height: 300 },
  hero: { width: 1200, height: 600 },
  fullscreen: { width: 1920, height: 1080 },
  avatar: { width: 100, height: 100 },
  agent: { width: 400, height: 400 }
}
