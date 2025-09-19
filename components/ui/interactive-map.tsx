'use client'

import { useState, useEffect } from 'react'
import { MapPin, Navigation, ZoomIn, ZoomOut, Layers } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface MapMarker {
  id: number
  lat: number
  lng: number
  title: string
  price: string
  type: 'rent' | 'sale'
  image: string
}

interface InteractiveMapProps {
  markers?: MapMarker[]
  center?: { lat: number; lng: number }
  zoom?: number
  className?: string
}

export default function InteractiveMap({ 
  markers = [], 
  center = { lat: 11.5564, lng: 104.9282 }, 
  zoom = 12,
  className = ''
}: InteractiveMapProps) {
  const [currentZoom, setCurrentZoom] = useState(zoom)
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null)
  const [mapLayers, setMapLayers] = useState<'satellite' | 'street' | 'hybrid'>('street')
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Mock markers for demonstration
  const defaultMarkers: MapMarker[] = [
    {
      id: 1,
      lat: 11.5564,
      lng: 104.9282,
      title: "Luxury Condo in BKK1",
      price: "$1,200/month",
      type: "rent",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    },
    {
      id: 2,
      lat: 11.5700,
      lng: 104.8900,
      title: "Modern Apartment in Toul Kork",
      price: "$800/month",
      type: "rent",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    },
    {
      id: 3,
      lat: 11.5400,
      lng: 104.9500,
      title: "Premium Villa for Sale",
      price: "$250,000",
      type: "sale",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    }
  ]

  const displayMarkers = markers.length > 0 ? markers : defaultMarkers

  const handleZoomIn = () => {
    setCurrentZoom(prev => Math.min(prev + 1, 20))
  }

  const handleZoomOut = () => {
    setCurrentZoom(prev => Math.max(prev - 1, 1))
  }

  const handleLayerChange = (layer: 'satellite' | 'street' | 'hybrid') => {
    setMapLayers(layer)
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  return (
    <div className={`relative bg-gray-100 rounded-lg overflow-hidden ${className} ${isFullscreen ? 'fixed inset-0 z-50 rounded-none' : ''}`}>
      {/* Map Container */}
      <div className="relative h-64 md:h-96 lg:h-[500px] bg-gradient-to-br from-blue-100 to-green-100">
        {/* Mock Map Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-200 via-green-200 to-yellow-200 opacity-50" />
        
        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={handleZoomIn}
            className="w-10 h-10 p-0"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={handleZoomOut}
            className="w-10 h-10 p-0"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={toggleFullscreen}
            className="w-10 h-10 p-0"
          >
            <Navigation className="h-4 w-4" />
          </Button>
        </div>

        {/* Layer Controls */}
        <div className="absolute top-4 left-4">
          <div className="flex gap-1 bg-white rounded-lg p-1 shadow-lg">
            {(['street', 'satellite', 'hybrid'] as const).map((layer) => (
              <Button
                key={layer}
                size="sm"
                variant={mapLayers === layer ? "default" : "ghost"}
                onClick={() => handleLayerChange(layer)}
                className="text-xs capitalize"
              >
                {layer}
              </Button>
            ))}
          </div>
        </div>

        {/* Property Markers */}
        {displayMarkers.map((marker) => (
          <div
            key={marker.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            style={{
              left: `${((marker.lng - center.lng + 0.1) / 0.2) * 100}%`,
              top: `${((marker.lat - center.lat + 0.1) / 0.2) * 100}%`,
            }}
            onClick={() => setSelectedMarker(marker)}
          >
            <div className={`relative transition-all duration-200 hover:scale-110 ${
              selectedMarker?.id === marker.id ? 'scale-110' : ''
            }`}>
              <div className={`w-6 h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center ${
                marker.type === 'rent' ? 'bg-green-500' : 'bg-blue-500'
              }`}>
                <MapPin className="h-3 w-3 text-white" />
              </div>
              
              {/* Marker Pulse Animation */}
              <div className={`absolute inset-0 rounded-full ${
                marker.type === 'rent' ? 'bg-green-500' : 'bg-blue-500'
              } animate-ping opacity-20`} />
            </div>
          </div>
        ))}

        {/* Map Info */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
          <div className="text-sm text-gray-600">
            <div className="font-semibold">Phnom Penh, Cambodia</div>
            <div className="text-xs">{displayMarkers.length} properties found</div>
          </div>
        </div>
      </div>

      {/* Property Details Panel */}
      {selectedMarker && (
        <div className="absolute bottom-4 right-4 w-80 bg-white rounded-lg shadow-xl border p-4 animate-in slide-in-from-bottom-4">
          <div className="flex items-start gap-3">
            <img
              src={selectedMarker.image}
              alt={selectedMarker.title}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">{selectedMarker.title}</h3>
              <div className="flex items-center gap-2 mb-2">
                <Badge 
                  variant={selectedMarker.type === 'rent' ? 'default' : 'secondary'}
                  className={selectedMarker.type === 'rent' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}
                >
                  {selectedMarker.type === 'rent' ? 'For Rent' : 'For Sale'}
                </Badge>
                <span className="text-sm font-medium text-gray-900">{selectedMarker.price}</span>
              </div>
              <Button size="sm" className="w-full">
                View Details
              </Button>
            </div>
            <button
              onClick={() => setSelectedMarker(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>For Rent</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span>For Sale</span>
          </div>
        </div>
      </div>
    </div>
  )
}

