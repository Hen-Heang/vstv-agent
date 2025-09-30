'use client'

import { useState } from 'react'
import { X, Plus, Trash2, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'

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

interface PropertyComparisonProps {
  properties: Property[]
  onRemoveProperty: (propertyId: number) => void
  onClearAll: () => void
  maxProperties?: number
}

export default function PropertyComparison({ 
  properties, 
  onRemoveProperty, 
  onClearAll,
  maxProperties = 3 
}: PropertyComparisonProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  if (properties.length === 0) {
    return null
  }

  // const allFeatures = Array.from(
  //   new Set(properties.flatMap(p => p.features))
  // )

  return (
    <div className="fixed bottom-4 left-4 right-4 z-40">
      <Card className="shadow-2xl border-2 border-blue-200">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <span>Property Comparison</span>
              <Badge variant="secondary">{properties.length}/{maxProperties}</Badge>
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-blue-600 hover:text-blue-700"
              >
                {isExpanded ? 'Collapse' : 'Expand'}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearAll}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {isExpanded && (
          <CardContent className="pt-0">
            <div className="overflow-x-auto">
              <div className="min-w-full">
                {/* Property Headers */}
                <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${properties.length}, 1fr)` }}>
                  {/* Feature Labels Column */}
                  <div className="space-y-4">
                    <div className="h-32"></div> {/* Image space */}
                    <div className="font-semibold text-gray-900">Title</div>
                    <div className="font-semibold text-gray-900">Price</div>
                    <div className="font-semibold text-gray-900">Location</div>
                    <div className="font-semibold text-gray-900">Bedrooms</div>
                    <div className="font-semibold text-gray-900">Bathrooms</div>
                    <div className="font-semibold text-gray-900">Area</div>
                    <div className="font-semibold text-gray-900">Features</div>
                    <div className="font-semibold text-gray-900">Agent</div>
                    <div className="font-semibold text-gray-900">Actions</div>
                  </div>

                  {/* Property Data Columns */}
                  {properties.map((property) => (
                    <div key={property.id} className="space-y-4">
                      {/* Property Image */}
                      <div className="relative h-32 rounded-lg overflow-hidden">
                        <Image
                          src={property.image}
                          alt={property.title}
                          fill
                          className="object-cover"
                        />
                        <button
                          onClick={() => onRemoveProperty(property.id)}
                          className="absolute top-2 right-2 p-1 bg-white/80 rounded-full hover:bg-white transition-colors"
                        >
                          <X className="h-4 w-4 text-gray-600" />
                        </button>
                      </div>

                      {/* Property Details */}
                      <div className="text-sm font-medium text-gray-900 line-clamp-2">
                        {property.title}
                      </div>

                      <div className="text-lg font-bold text-blue-600">
                        {property.priceType === 'rent' ? `$${property.price}/month` : `$${property.price.toLocaleString()}`}
                      </div>

                      <div className="text-sm text-gray-600">
                        {property.location}
                      </div>

                      <div className="text-sm text-gray-900">
                        {property.bedrooms}
                      </div>

                      <div className="text-sm text-gray-900">
                        {property.bathrooms}
                      </div>

                      <div className="text-sm text-gray-900">
                        {property.area}m²
                      </div>

                      <div className="space-y-1">
                        {property.features.slice(0, 3).map((feature, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                        {property.features.length > 3 && (
                          <div className="text-xs text-gray-500">
                            +{property.features.length - 3} more
                          </div>
                        )}
                      </div>

                      <div className="text-sm text-gray-600">
                        {property.agent.name}
                      </div>

                      <div className="space-y-2">
                        <Button size="sm" className="w-full">
                          View Details
                        </Button>
                        <Button size="sm" variant="outline" className="w-full">
                          Contact Agent
                        </Button>
                      </div>
                    </div>
                  ))}

                  {/* Add More Properties */}
                  {properties.length < maxProperties && (
                    <div className="flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mb-4">
                          <Plus className="h-8 w-8 text-gray-400" />
                        </div>
                        <p className="text-sm text-gray-500">Add more properties to compare</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Comparison Actions */}
            <div className="mt-6 pt-4 border-t flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Compare {properties.length} properties
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={onClearAll}>
                  Clear All
                </Button>
                <Button>
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Compare Now
                </Button>
              </div>
            </div>
          </CardContent>
        )}

        {/* Collapsed View */}
        {!isExpanded && (
          <CardContent className="pt-0">
            <div className="flex items-center gap-4">
              {properties.map((property) => (
                <div key={property.id} className="flex items-center gap-3 flex-1">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                    <Image
                      src={property.image}
                      alt={property.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">
                      {property.title}
                    </div>
                    <div className="text-sm text-blue-600 font-semibold">
                      {property.priceType === 'rent' ? `$${property.price}/month` : `$${property.price.toLocaleString()}`}
                    </div>
                  </div>
                  <button
                    onClick={() => onRemoveProperty(property.id)}
                    className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              
              {properties.length < maxProperties && (
                <div className="flex items-center justify-center w-12 h-12 border-2 border-dashed border-gray-300 rounded-lg">
                  <Plus className="h-6 w-6 text-gray-400" />
                </div>
              )}
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}

