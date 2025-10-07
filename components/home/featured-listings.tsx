'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, Bed, Bath, Square } from 'lucide-react'

interface Property {
  id: string
  title: string
  price: number
  priceType: string
  location: string
  bedrooms: number | null
  bathrooms: number | null
  area: number | null
  images: string[]
  features: string[]
  agent?: {
    id: string
    name: string
    phone: string | null
    avatar: string | null
  }
}

export default function FeaturedListings() {
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        const response = await fetch('/api/featured-properties')
        if (response.ok) {
          const properties = await response.json()
          setFeaturedProperties(properties)
        } else {
          // Fallback to static featured properties
          console.log('Using fallback featured properties')
          setFeaturedProperties([
            {
              id: 'property-1',
              title: 'Luxury Condo in BKK1',
              price: 1200,
              priceType: 'rent',
              location: 'BKK1, Phnom Penh',
              bedrooms: 2,
              bathrooms: 2,
              area: 85,
              images: ['/images/properties/featured/luxury-condo-bkk1.jpg'],
              features: ['Pool', 'Gym', 'Parking']
            },
            {
              id: 'property-2',
              title: 'Modern Apartment in Toul Kork',
              price: 800,
              priceType: 'rent',
              location: 'Toul Kork, Phnom Penh',
              bedrooms: 1,
              bathrooms: 1,
              area: 65,
              images: ['/images/properties/featured/modern-apartment-toul-kork.jpg'],
              features: ['Balcony', 'Security']
            },
            {
              id: 'property-3',
              title: 'Premium Villa for Sale',
              price: 250000,
              priceType: 'sale',
              location: 'Sen Sok, Phnom Penh',
              bedrooms: 4,
              bathrooms: 3,
              area: 200,
              images: ['/images/properties/featured/premium-villa-sen-sok.jpg'],
              features: ['Garden', 'Garage', 'Pool']
            }
          ])
        }
      } catch (error) {
        console.error('Error fetching featured properties:', error)
        // Use fallback data
        setFeaturedProperties([
          {
            id: 'property-1',
            title: 'Luxury Condo in BKK1',
            price: 1200,
            priceType: 'rent',
            location: 'BKK1, Phnom Penh',
            bedrooms: 2,
            bathrooms: 2,
            area: 85,
            images: ['/images/properties/featured/luxury-condo-bkk1.jpg'],
            features: ['Pool', 'Gym', 'Parking']
          }
        ])
      } finally {
        setIsLoading(false)
      }
    }

    fetchFeaturedProperties()
  }, [])

  if (isLoading) {
    return (
      <section className="py-12 sm:py-16 md:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading featured properties...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            Featured Listings
          </h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg leading-7 sm:leading-8 text-gray-600">
            Discover our handpicked selection of premium properties
          </p>
        </div>
        
        {featuredProperties.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No featured properties available at the moment.</p>
          </div>
        ) : (
          <div className="mx-auto mt-8 sm:mt-12 md:mt-16 lg:mt-20 grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {featuredProperties.map((property) => (
              <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48 sm:h-56 md:h-64">
                  <Image
                    src={property.images[0] || '/images/placeholders/property-placeholder.jpg'}
                    alt={property.title}
                    fill
                    className="object-cover"
                  />
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                  <span className={`px-2 py-1 sm:px-3 text-xs font-semibold rounded-full ${
                    property.priceType === 'rent' 
                      ? 'bg-brand-accent-100 text-brand-accent-800' 
                      : 'bg-brand-primary-100 text-brand-primary-800'
                  }`}>
                    {property.priceType === 'rent' ? 'For Rent' : 'For Sale'}
                  </span>
                </div>
              </div>
              
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  {property.title}
                </h3>
                
                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">{property.location}</span>
                </div>
                
                <div className="flex items-center space-x-3 sm:space-x-4 text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                  {property.bedrooms && (
                    <div className="flex items-center">
                      <Bed className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
                      <span>{property.bedrooms}</span>
                    </div>
                  )}
                  {property.bathrooms && (
                    <div className="flex items-center">
                      <Bath className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
                      <span>{property.bathrooms}</span>
                    </div>
                  )}
                  {property.area && (
                    <div className="flex items-center">
                      <Square className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
                      <span>{property.area}m²</span>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-1 mb-3 sm:mb-4">
                  {property.features.map((feature, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs bg-brand-neutral-100 text-brand-neutral-700 rounded"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                
                <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                  {property.priceType === 'rent' ? `$${property.price}/month` : `$${property.price.toLocaleString()}`}
                </div>
              </CardContent>
              
              <CardFooter className="p-4 sm:p-6 pt-0">
                <Button asChild className="w-full text-sm sm:text-base">
                  <Link href={`/properties/${property.id}`}>
                    View Details
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
          </div>
        )}
        
        <div className="mt-8 sm:mt-12 text-center">
          <Button variant="outline" size="lg" asChild className="text-sm sm:text-base">
            <Link href="/properties">
              View All Properties
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

