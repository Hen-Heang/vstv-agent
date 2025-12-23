'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Car,
  Wifi,
  Shield,
  TreePine,
  Dumbbell,
  Coffee,
  Download,
  Share2,
  Heart,
  Star,
  Phone,
  Mail,
  MessageCircle,
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
  X,
  ExternalLink,
  DollarSign
} from 'lucide-react'

interface PropertyDetailProps {
  property: {
    id: string
    title: string
    price: number
    priceType: 'rent' | 'sale'
    location: string
    address: string
    bedrooms: number
    bathrooms: number
    area: number
    parking: number
    yearBuilt: number
    images: string[]
    description: string
    features: string[]
    amenities: string[]
    availabilityInfo?: string
    availabilityDate?: string
    commissionRate?: number
    specialConditions?: string[]
    agent: {
      id: string
      name: string
      phone: string
      email: string
      avatar: string
      rating: number
    }
    coordinates?: {
      lat: number
      lng: number
    }
    pdfUrl?: string
    virtualTourUrl?: string
  }
}

const amenities = [
  { name: 'WiFi', icon: Wifi, color: 'text-blue-600' },
  { name: 'Security', icon: Shield, color: 'text-green-600' },
  { name: 'Garden', icon: TreePine, color: 'text-emerald-600' },
  { name: 'Gym', icon: Dumbbell, color: 'text-purple-600' },
  { name: 'Café', icon: Coffee, color: 'text-orange-600' },
]

export default function PropertyDetail({ property }: PropertyDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [isContactSticky, setIsContactSticky] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  // Sticky contact CTA logic
  useEffect(() => {
    const handleScroll = () => {
      const contactSection = document.getElementById('contact-section')
      if (contactSection) {
        const rect = contactSection.getBoundingClientRect()
        setIsContactSticky(rect.top < 0)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length)
  }

  const goToImage = (index: number) => {
    setCurrentImageIndex(index)
  }

  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      action()
    }
  }

  const formatPrice = (price: number, type: string) => {
    if (type === 'rent') {
      return `$${price.toLocaleString()}/month`
    }
    return `$${price.toLocaleString()}`
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <nav className="bg-white border-b" aria-label="Breadcrumb">
          <div className="container mx-auto px-4 py-3">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <Link href="/" className="text-gray-500 hover:text-gray-700">
                  Home
                </Link>
              </li>
              <li className="text-gray-400">/</li>
              <li>
                <Link href="/properties" className="text-gray-500 hover:text-gray-700">
                  Properties
                </Link>
              </li>
              <li className="text-gray-400">/</li>
              <li className="text-gray-900 font-medium" aria-current="page">
                {property.title}
              </li>
            </ol>
          </div>
        </nav>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Image Gallery */}
              <Card className="overflow-hidden">
                <div className="relative">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <Image
                      src={property.images[currentImageIndex]}
                      alt={`${property.title} - Image ${currentImageIndex + 1}`}
                      fill
                      className="object-cover cursor-pointer"
                      onClick={() => setIsGalleryOpen(true)}
                      priority={currentImageIndex === 0}
                    />
                    
                    {/* Navigation Arrows */}
                    {property.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-all duration-200"
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-all duration-200"
                          aria-label="Next image"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </>
                    )}

                    {/* Image Counter */}
                    <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                      {currentImageIndex + 1} / {property.images.length}
                    </div>

                    {/* Favorite Button */}
                    <button
                      onClick={() => setIsFavorite(!isFavorite)}
                      className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-all duration-200"
                      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      <Heart className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                    </button>
                  </div>

                  {/* Thumbnail Strip */}
                  {property.images.length > 1 && (
                    <div className="p-4 bg-white">
                      <div className="flex space-x-2 overflow-x-auto pb-2">
                        {property.images.map((image, index) => (
                          <button
                            key={index}
                            onClick={() => goToImage(index)}
                            className={`relative flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                              index === currentImageIndex
                                ? 'border-blue-500'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            aria-label={`View image ${index + 1}`}
                          >
                            <Image
                              src={image}
                              alt={`Thumbnail ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Card>

              {/* Property Info */}
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                        {property.title}
                      </CardTitle>
                      <div className="flex items-center text-gray-600 mb-4">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{property.address}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-blue-600">
                        {formatPrice(property.price, property.priceType)}
                      </div>
                      <div className="text-sm text-gray-500 capitalize">
                        {property.priceType}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Property Stats */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <Bed className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                      <div className="text-lg font-semibold">{property.bedrooms}</div>
                      <div className="text-xs text-gray-500">Bedrooms</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <Bath className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                      <div className="text-lg font-semibold">{property.bathrooms}</div>
                      <div className="text-xs text-gray-500">Bathrooms</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <Square className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                      <div className="text-lg font-semibold">{property.area}</div>
                      <div className="text-xs text-gray-500">sq ft</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <Car className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                      <div className="text-lg font-semibold">{property.parking}</div>
                      <div className="text-xs text-gray-500">Parking</div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                    <p className="text-gray-600 leading-relaxed">{property.description}</p>
                  </div>

                  {/* Availability Information */}
                  {(property.availabilityInfo || property.availabilityDate || property.commissionRate || property.specialConditions?.length) && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Availability Information</h3>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        {property.availabilityInfo && (
                          <div className="mb-3">
                            <div className="flex items-center text-blue-800">
                              <Clock className="h-4 w-4 mr-2" />
                              <span className="font-medium">Status: {property.availabilityInfo}</span>
                            </div>
                          </div>
                        )}
                        {property.availabilityDate && (
                          <div className="mb-3">
                            <div className="flex items-center text-blue-800">
                              <Calendar className="h-4 w-4 mr-2" />
                              <span className="font-medium">Available: {new Date(property.availabilityDate).toLocaleDateString()}</span>
                            </div>
                          </div>
                        )}
                        {property.commissionRate && (
                          <div className="mb-3">
                            <div className="flex items-center text-blue-800">
                              <DollarSign className="h-4 w-4 mr-2" />
                              <span className="font-medium">Commission: {property.commissionRate}%</span>
                            </div>
                          </div>
                        )}
                        {property.specialConditions && property.specialConditions.length > 0 && (
                          <div>
                            <div className="text-sm text-blue-700 font-medium mb-2">Special Conditions:</div>
                            <div className="space-y-1">
                              {property.specialConditions.map((condition, index) => (
                                <div key={index} className="flex items-center text-blue-800">
                                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                                  <span className="text-sm">{condition}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Features */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Features</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {property.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-gray-600">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Amenities */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Amenities</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <amenity.icon className={`h-5 w-5 mr-3 ${amenity.color}`} />
                          <span className="text-gray-700">{amenity.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Map Section */}
              {property.coordinates && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                      Location
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600">Interactive map would be here</p>
                        <p className="text-sm text-gray-500">
                          {property.coordinates.lat}, {property.coordinates.lng}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Sticky Contact Card */}
              <div
                id="contact-section"
                className={
                  isContactSticky
                    ? 'relative w-full lg:fixed lg:top-4 lg:right-4 lg:w-80 lg:z-50'
                    : 'relative w-full lg:sticky lg:top-4'
                }
              >
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">Contact Agent</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Agent Info */}
                    <div className="flex items-center space-x-3">
                      <Image
                        src={property.agent.avatar}
                        alt={property.agent.name}
                        width={50}
                        height={50}
                        className="rounded-full object-cover"
                      />
                      <div>
                        <div className="font-semibold text-gray-900">{property.agent.name}</div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                          <span>{property.agent.rating}</span>
                        </div>
                      </div>
                    </div>

                    {/* Contact Buttons */}
                    <div className="space-y-2">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        <Phone className="h-4 w-4 mr-2" />
                        Call Now
                      </Button>
                      <Button variant="outline" className="w-full">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        WhatsApp
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Mail className="h-4 w-4 mr-2" />
                        Email
                      </Button>
                    </div>

                    {/* Schedule Visit */}
                    <div className="pt-4 border-t">
                      <Button variant="outline" className="w-full">
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule Visit
                      </Button>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2 pt-4 border-t">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Share2 className="h-4 w-4 mr-1" />
                        Share
                      </Button>
                      {property.pdfUrl && (
                        <Button variant="outline" size="sm" className="flex-1">
                          <Download className="h-4 w-4 mr-1" />
                          PDF
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Modal */}
      <AnimatePresence>
        {isGalleryOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setIsGalleryOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsGalleryOpen(false)}
                className="absolute top-4 right-4 z-10 p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors"
                aria-label="Close gallery"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="relative">
                <Image
                  src={property.images[currentImageIndex]}
                  alt={`${property.title} - Gallery view`}
                  width={800}
                  height={600}
                  className="rounded-lg"
                />
                
                {property.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors"
                      aria-label="Next image"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </>
                )}
              </div>

              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {property.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
