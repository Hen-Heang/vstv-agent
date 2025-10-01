'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MapPin, Bed, Bath, Square, Heart, Share2, Eye, Phone } from 'lucide-react'

const TelegramIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
)

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

interface InteractivePropertyCardProps {
  property: Property
  onFavorite?: (propertyId: number) => void
  onShare?: (propertyId: number) => void
  isFavorite?: boolean
}

export default function InteractivePropertyCard({ 
  property, 
  onFavorite, 
  onShare, 
  isFavorite = false 
}: InteractivePropertyCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onFavorite?.(property.id)
  }

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onShare?.(property.id)
  }

  return (
    <Card 
      className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer transform hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-64 overflow-hidden">
        <Image
          src={property.image}
          alt={property.title}
          fill
          className={`object-cover transition-transform duration-500 group-hover:scale-110 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Loading skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        
        {/* Overlay with actions */}
        <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={handleFavorite}
              className={`p-2 rounded-full transition-all duration-200 ${
                isFavorite 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500'
              }`}
            >
              <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-white/80 text-gray-600 hover:bg-white hover:text-blue-500 transition-all duration-200"
            >
              <Share2 className="h-4 w-4" />
            </button>
          </div>
          
          {/* Quick actions on hover */}
          <div className="absolute bottom-4 left-4 right-4 flex gap-2">
            <Button size="sm" className="flex-1 bg-white/90 text-gray-900 hover:bg-white">
              <Eye className="h-4 w-4 mr-1" />
              Quick View
            </Button>
            <Button size="sm" variant="outline" className="bg-white/90 text-gray-900 hover:bg-white">
              <Phone className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Property type badge */}
        <div className="absolute top-4 left-4">
          <Badge 
            className={`${
              property.priceType === 'rent' 
                ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
            } transition-colors duration-200`}
          >
            {property.priceType === 'rent' ? 'For Rent' : 'For Sale'}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
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
          {property.features.slice(0, 3).map((feature, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {feature}
            </Badge>
          ))}
          {property.features.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{property.features.length - 3} more
            </Badge>
          )}
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
        <div className="w-full grid grid-cols-2 gap-2">
          <Button asChild variant="outline" className="group-hover:border-blue-500 group-hover:text-blue-500 transition-colors duration-200">
            <Link href={`/properties/${property.id}`}>
              View Details
            </Link>
          </Button>
          <Button asChild className="group-hover:bg-blue-600 transition-colors duration-200">
            <a href={`tel:${property.agent.phone}`} className="flex items-center justify-center">
              <TelegramIcon className="h-4 w-4 mr-1" />
              Contact
            </a>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

