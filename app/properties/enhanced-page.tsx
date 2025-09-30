'use client'

import { useState, useEffect } from 'react'
// import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import PropertySearch from '@/components/properties/property-search'
import InteractivePropertyCard from '@/components/properties/interactive-property-card'
import InteractiveMap from '@/components/ui/interactive-map'
import PropertyComparison from '@/components/properties/property-comparison'
import { Grid, List, Map, Heart } from 'lucide-react'

interface Property {
  id: number
  title: string
  price: number
  priceType: 'rent' | 'sale'
  location: string
  bedrooms: number
  bathrooms: number
  area: number
  image: string
  features: string[]
  agent: {
    name: string
    phone: string
  }
}

interface SearchFilters {
  query: string
  location: string
  priceType: string
  propertyType: string
  minPrice: string
  maxPrice: string
  bedrooms: string
  bathrooms: string
}

const mockProperties: Property[] = [
  {
    id: 1,
    title: "Luxury Condo in BKK1",
    price: 1200,
    priceType: "rent",
    location: "BKK1, Phnom Penh",
    bedrooms: 2,
    bathrooms: 2,
    area: 85,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    features: ["Swimming Pool", "Fitness Center", "Parking", "24/7 Security"],
    agent: {
      name: "John Doe",
      phone: "+855 12 345 6789"
    }
  },
  {
    id: 2,
    title: "Modern Apartment in Toul Kork",
    price: 800,
    priceType: "rent",
    location: "Toul Kork, Phnom Penh",
    bedrooms: 1,
    bathrooms: 1,
    area: 65,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    features: ["Balcony", "Security", "WiFi"],
    agent: {
      name: "Jane Smith",
      phone: "+855 12 345 6788"
    }
  },
  {
    id: 3,
    title: "Premium Villa for Sale",
    price: 250000,
    priceType: "sale",
    location: "Sen Sok, Phnom Penh",
    bedrooms: 4,
    bathrooms: 3,
    area: 200,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    features: ["Garden", "Garage", "Pool"],
    agent: {
      name: "Mike Johnson",
      phone: "+855 12 345 6787"
    }
  },
  {
    id: 4,
    title: "Cozy Studio in City Center",
    price: 500,
    priceType: "rent",
    location: "City Center, Phnom Penh",
    bedrooms: 1,
    bathrooms: 1,
    area: 45,
    image: "https://images.unsplash.com/photo-1502672260266-1c1efd93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    features: ["Furnished", "WiFi"],
    agent: {
      name: "Sarah Wilson",
      phone: "+855 12 345 6786"
    }
  },
  {
    id: 5,
    title: "Spacious Family House",
    price: 180000,
    priceType: "sale",
    location: "Chroy Changvar, Phnom Penh",
    bedrooms: 3,
    bathrooms: 2,
    area: 150,
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    features: ["Garden", "Parking", "Security"],
    agent: {
      name: "David Brown",
      phone: "+855 12 345 6785"
    }
  },
  {
    id: 6,
    title: "High-End Condo with River View",
    price: 2000,
    priceType: "rent",
    location: "Tonle Bassac, Phnom Penh",
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    features: ["River View", "Pool", "Gym", "Concierge"],
    agent: {
      name: "Lisa Chen",
      phone: "+855 12 345 6784"
    }
  }
]

export default function EnhancedPropertiesPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('grid')
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    location: '',
    priceType: '',
    propertyType: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: ''
  })
  const [favoriteProperties, setFavoriteProperties] = useState<number[]>([])
  const [comparisonProperties, setComparisonProperties] = useState<Property[]>([])
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(mockProperties)

  useEffect(() => {
    // Filter properties based on search criteria
    let filtered = mockProperties

    if (filters.query) {
      filtered = filtered.filter(property =>
        property.title.toLowerCase().includes(filters.query.toLowerCase()) ||
        property.location.toLowerCase().includes(filters.query.toLowerCase())
      )
    }

    if (filters.location) {
      filtered = filtered.filter(property =>
        property.location.toLowerCase().includes(filters.location.toLowerCase())
      )
    }

    if (filters.priceType) {
      filtered = filtered.filter(property => property.priceType === filters.priceType)
    }

    if (filters.bedrooms) {
      filtered = filtered.filter(property => property.bedrooms >= parseInt(filters.bedrooms))
    }

    if (filters.minPrice) {
      filtered = filtered.filter(property => property.price >= parseInt(filters.minPrice))
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(property => property.price <= parseInt(filters.maxPrice))
    }

    setFilteredProperties(filtered)
  }, [filters])

  const handleFavorite = (propertyId: number) => {
    setFavoriteProperties(prev =>
      prev.includes(propertyId)
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    )
  }

  // const handleAddToComparison = (property: Property) => {
  //   if (comparisonProperties.length < 3 && !comparisonProperties.find(p => p.id === property.id)) {
  //     setComparisonProperties(prev => [...prev, property])
  //   }
  // }

  const handleRemoveFromComparison = (propertyId: number) => {
    setComparisonProperties(prev => prev.filter(p => p.id !== propertyId))
  }

  const handleClearComparison = () => {
    setComparisonProperties([])
  }

  const handleShare = (propertyId: number) => {
    // Implement share functionality
    console.log('Sharing property:', propertyId)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Properties
            </h1>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Find your perfect property from our extensive collection
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <PropertySearch onFiltersChange={setFilters} />
        </div>

        {/* View Controls */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">View:</span>
              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-none border-x"
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'map' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('map')}
                  className="rounded-l-none"
                >
                  <Map className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge variant="secondary">
                {filteredProperties.length} properties found
              </Badge>
              {favoriteProperties.length > 0 && (
                <Badge variant="outline" className="text-red-600">
                  <Heart className="h-3 w-3 mr-1 fill-current" />
                  {favoriteProperties.length} favorites
                </Badge>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <select className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
              <option>Sort by: Newest</option>
              <option>Sort by: Price Low to High</option>
              <option>Sort by: Price High to Low</option>
              <option>Sort by: Area</option>
            </select>
          </div>
        </div>

        {/* Content based on view mode */}
        {viewMode === 'map' ? (
          <InteractiveMap />
        ) : (
          <div className={`grid gap-8 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {filteredProperties.map((property) => (
              <InteractivePropertyCard
                key={property.id}
                property={property}
                isFavorite={favoriteProperties.includes(property.id)}
                onFavorite={handleFavorite}
                onShare={handleShare}
              />
            ))}
          </div>
        )}

        {/* Load More */}
        {viewMode !== 'map' && (
          <div className="mt-12 text-center">
            <Button variant="outline" size="lg">
              Load More Properties
            </Button>
          </div>
        )}
      </div>

      {/* Property Comparison */}
      <PropertyComparison
        properties={comparisonProperties}
        onRemoveProperty={handleRemoveFromComparison}
        onClearAll={handleClearComparison}
      />
    </div>
  )
}

