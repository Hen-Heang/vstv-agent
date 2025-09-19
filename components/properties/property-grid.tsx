import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, Bed, Bath, Square, Heart } from 'lucide-react'

const mockProperties = [
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
    features: ["Pool", "Gym", "Parking"],
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
    features: ["Balcony", "Security"],
    agent: {
      name: "Jane Smith",
      phone: "+855 12 345 6789"
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
      phone: "+855 12 345 6789"
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
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    features: ["Furnished", "WiFi"],
    agent: {
      name: "Sarah Wilson",
      phone: "+855 12 345 6789"
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
      phone: "+855 12 345 6789"
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
      phone: "+855 12 345 6789"
    }
  }
]

export default function PropertyGrid() {
  return (
    <div>
      {/* Results Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {mockProperties.length} Properties Found
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
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {mockProperties.map((property) => (
          <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
            <div className="relative h-64">
              <Image
                src={property.image}
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
                <div className="flex items-center">
                  <Bed className="h-4 w-4 mr-1" />
                  <span>{property.bedrooms}</span>
                </div>
                <div className="flex items-center">
                  <Bath className="h-4 w-4 mr-1" />
                  <span>{property.bathrooms}</span>
                </div>
                <div className="flex items-center">
                  <Square className="h-4 w-4 mr-1" />
                  <span>{property.area}m²</span>
                </div>
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
                <div className="text-sm text-gray-500">
                  Agent: {property.agent.name}
                </div>
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

