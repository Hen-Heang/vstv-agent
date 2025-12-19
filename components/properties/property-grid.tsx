'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, Bed, Bath, Square, Heart } from 'lucide-react'
import { LOCAL_STORAGE_KEYS, loadLocalJson, saveLocalJson } from '@/lib/local-persistence'

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

export default function PropertyGrid() {
  const [properties, setProperties] = useState<Property[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const local = loadLocalJson<Property[]>(LOCAL_STORAGE_KEYS.properties)
        if (local && Array.isArray(local)) {
          setProperties(local)
          setIsLoading(false)
          return
        }

        const response = await fetch('/api/properties')
        if (response.ok) {
          const data = await response.json()
          setProperties(data)
          saveLocalJson(LOCAL_STORAGE_KEYS.properties, data as unknown as any)
        } else {
          // Fallback to static properties
          console.log('Using fallback properties')
          setProperties([
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
              features: ['Pool', 'Gym', 'Parking'],
              agent: {
                id: 'agent-1',
                name: 'HENG KIMHONG',
                phone: '+855 96 4444 027',
                avatar: '/images/agents/heng-kimhong.html'
              }
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
              features: ['Balcony', 'Security'],
              agent: {
                id: 'agent-2',
                name: 'VIN SOLYVAY',
                phone: '+855 98 261 801',
                avatar: '/images/agents/vin-solyvay.html'
              }
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
              features: ['Garden', 'Garage', 'Pool'],
              agent: {
                id: 'agent-3',
                name: 'HENG RITA',
                phone: '+855 12 345 6789',
                avatar: '/images/agents/Heng-Rita.jpg'
              }
            }
          ])
        }
      } catch (error) {
        console.error('Error fetching properties:', error)
        // Use fallback data
        setProperties([
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

    fetchProperties()
  }, [])

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading properties...</p>
      </div>
    )
  }

  return (
    <div>
      {/* Results Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {properties.length} Properties Found
          </h2>
          <p className="text-gray-600">Showing all available properties</p>
        </div>
        <div className="flex items-center space-x-4">
          <select className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
            <option>Sort by: Newest</option>
            <option>Sort by: Price Low to High</option>
            <option>Sort by: Price High to Low</option>
            <option>Sort by: Area</option>
          </select>
        </div>
      </div>

      {/* Properties Grid */}
      {properties.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No properties available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {properties.map((property) => (
          <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
            <div className="relative h-64">
              <Image
                src={property.images[0] || '/images/placeholders/property-placeholder.jpg'}
                alt={property.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  property.priceType === 'rent' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {property.priceType === 'rent' ? 'For Rent' : 'For Sale'}
                </span>
              </div>
              <button className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                <Heart className="h-4 w-4 text-gray-600" />
              </button>
            </div>
            
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {property.title}
              </h3>
              
              <div className="flex items-center text-gray-600 mb-3">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{property.location}</span>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                {property.bedrooms && (
                  <div className="flex items-center">
                    <Bed className="h-4 w-4 mr-1" />
                    <span>{property.bedrooms}</span>
                  </div>
                )}
                {property.bathrooms && (
                  <div className="flex items-center">
                    <Bath className="h-4 w-4 mr-1" />
                    <span>{property.bathrooms}</span>
                  </div>
                )}
                {property.area && (
                  <div className="flex items-center">
                    <Square className="h-4 w-4 mr-1" />
                    <span>{property.area}m²</span>
                  </div>
                )}
              </div>
              
              <div className="flex flex-wrap gap-1 mb-4">
                {property.features.map((feature, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                  >
                    {feature}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-gray-900">
                  {property.priceType === 'rent' ? `$${property.price}/month` : `$${property.price.toLocaleString()}`}
                </div>
                {property.agent && (
                  <div className="text-sm text-gray-500">
                    Agent: {property.agent.name}
                  </div>
                )}
              </div>
            </CardContent>
            
            <CardFooter className="p-6 pt-0">
              <Button asChild className="w-full">
                <Link href={`/properties/${property.id}`}>
                  View Details
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
        </div>
      )}

      {/* Pagination */}
      <div className="mt-12 flex items-center justify-center">
        <nav className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" className="bg-blue-600 text-white border-blue-600">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </nav>
      </div>
    </div>
  )
}

