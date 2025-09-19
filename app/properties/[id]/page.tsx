import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, Bed, Bath, Square, Car, Wifi, Shield, Heart, Share2, Phone, MessageCircle } from 'lucide-react'

// Mock data - in real app, this would come from database
const mockProperty = {
  id: 1,
  title: "Luxury Condo in BKK1",
  description: "This stunning luxury condo in the heart of BKK1 offers modern living with premium amenities. Located in one of Phnom Penh's most prestigious areas, this property provides easy access to embassies, international schools, and upscale shopping centers.",
  price: 1200,
  priceType: "rent",
  location: "BKK1, Phnom Penh",
  address: "Street 123, Building ABC, BKK1, Phnom Penh, Cambodia",
  bedrooms: 2,
  bathrooms: 2,
  area: 85,
  images: [
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  ],
  features: ["Swimming Pool", "Fitness Center", "Parking", "24/7 Security", "High-Speed WiFi", "Air Conditioning", "Balcony", "Modern Kitchen"],
  agent: {
    id: 1,
    name: "John Doe",
    phone: "+855 12 345 6789",
    telegram: "@johndoe",
    email: "john@vstvagent.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    bio: "Experienced real estate agent with 8+ years in the Cambodian market. Specializes in luxury properties and investment opportunities.",
    experience: 8
  },
  coordinates: {
    lat: 11.5564,
    lng: 104.9282
  }
}

interface PropertyDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({ params }: PropertyDetailPageProps) {
  const { id } = await params
  const property = mockProperty // In real app, fetch from database
  
  return {
    title: `${property.title} - VSTV Agent`,
    description: property.description,
  }
}

export default async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const { id } = await params
  const property = mockProperty // In real app, fetch from database based on id
  
  if (!property) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <Link href="/" className="text-gray-400 hover:text-gray-500">
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="text-gray-400 mx-2">/</span>
                  <Link href="/properties" className="text-gray-400 hover:text-gray-500">
                    Properties
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="text-gray-400 mx-2">/</span>
                  <span className="text-gray-900 font-medium">{property.title}</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="mb-8">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="relative h-96 sm:h-[500px]">
                  <Image
                    src={property.images[0]}
                    alt={property.title}
                    fill
                    className="object-cover rounded-lg"
                    priority
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {property.images.slice(1, 5).map((image, index) => (
                    <div key={index} className="relative h-48">
                      <Image
                        src={image}
                        alt={`${property.title} ${index + 2}`}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Property Details */}
            <Card className="mb-8">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
                      {property.title}
                    </CardTitle>
                    <div className="flex items-center text-gray-600 mb-4">
                      <MapPin className="h-5 w-5 mr-2" />
                      <span>{property.address}</span>
                    </div>
                    <div className="text-3xl font-bold text-blue-600">
                      {property.priceType === 'rent' ? `$${property.price}/month` : `$${property.price.toLocaleString()}`}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Heart className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-6 mb-6">
                  <div className="text-center">
                    <Bed className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{property.bedrooms}</div>
                    <div className="text-sm text-gray-600">Bedrooms</div>
                  </div>
                  <div className="text-center">
                    <Bath className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{property.bathrooms}</div>
                    <div className="text-sm text-gray-600">Bathrooms</div>
                  </div>
                  <div className="text-center">
                    <Square className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{property.area}</div>
                    <div className="text-sm text-gray-600">m²</div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Description</h3>
                  <p className="text-gray-600 leading-relaxed">{property.description}</p>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Features & Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Map */}
            <Card>
              <CardHeader>
                <CardTitle>Location</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-600">Interactive Map</p>
                    <p className="text-sm text-gray-500">Google Maps integration would go here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Agent Card */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Contact Agent</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-6">
                  <Image
                    src={property.agent.avatar}
                    alt={property.agent.name}
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{property.agent.name}</h3>
                    <p className="text-sm text-gray-600">{property.agent.experience}+ years experience</p>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-6">{property.agent.bio}</p>
                
                <div className="space-y-3">
                  <Button className="w-full" asChild>
                    <a href={`tel:${property.agent.phone}`} className="flex items-center justify-center">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Now
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <a href={`https://t.me/${property.agent.telegram}`} className="flex items-center justify-center">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Telegram
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <a href={`mailto:${property.agent.email}`} className="flex items-center justify-center">
                      Email Agent
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Schedule Visit */}
            <Card>
              <CardHeader>
                <CardTitle>Schedule a Visit</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Interested in viewing this property? Contact us to schedule a visit.
                </p>
                <Button className="w-full" asChild>
                  <Link href="/contact">
                    Schedule Visit
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
