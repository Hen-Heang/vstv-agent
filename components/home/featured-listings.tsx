import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, Bed, Bath, Square } from 'lucide-react'

const featuredProperties = [
  {
    id: 1,
    title: "Luxury Condo in BKK1",
    price: 1200,
    priceType: "rent",
    location: "BKK1, Phnom Penh",
    bedrooms: 2,
    bathrooms: 2,
    area: 85,
    image: "/images/properties/featured/luxury-condo-bkk1.jpg",
    features: ["Pool", "Gym", "Parking"]
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
    image: "/images/properties/featured/modern-apartment-toul-kork.jpg",
    features: ["Balcony", "Security"]
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
    image: "/images/properties/featured/premium-villa-sen-sok.jpg",
    features: ["Garden", "Garage", "Pool"]
  }
]

export default function FeaturedListings() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Featured Listings
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Discover our handpicked selection of premium properties
          </p>
        </div>
        
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {featuredProperties.map((property) => (
            <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-64">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    property.priceType === 'rent' 
                      ? 'bg-brand-accent-100 text-brand-accent-800' 
                      : 'bg-brand-primary-100 text-brand-primary-800'
                  }`}>
                    {property.priceType === 'rent' ? 'For Rent' : 'For Sale'}
                  </span>
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
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
                      className="px-2 py-1 text-xs bg-brand-neutral-100 text-brand-neutral-700 rounded"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                
                <div className="text-2xl font-bold text-gray-900 mb-4">
                  {property.priceType === 'rent' ? `$${property.price}/month` : `$${property.price.toLocaleString()}`}
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
        
        <div className="mt-12 text-center">
          <Button variant="outline" size="lg" asChild>
            <Link href="/properties">
              View All Properties
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

