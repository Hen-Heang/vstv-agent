'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import OptimizedImage from '@/components/ui/optimized-image'
import { Upload, Eye, Download, Trash2, CheckCircle, AlertCircle } from 'lucide-react'

interface ImageFile {
  name: string
  path: string
  size: string
  type: 'property' | 'agent' | 'company' | 'background'
  status: 'uploaded' | 'processing' | 'error'
}

export default function ImageManager() {
  const [images] = useState<ImageFile[]>([
    {
      name: 'luxury-condo-bkk1.jpg',
      path: '/images/properties/featured/luxury-condo-bkk1.jpg',
      size: '245 KB',
      type: 'property',
      status: 'uploaded'
    },
    {
      name: 'john-doe.jpg',
      path: '/images/agents/john-doe.jpg',
      size: '89 KB',
      type: 'agent',
      status: 'uploaded'
    },
    {
      name: 'hero-phnom-penh.jpg',
      path: '/images/backgrounds/hero-phnom-penh.jpg',
      size: '1.2 MB',
      type: 'background',
      status: 'uploaded'
    }
  ])

  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'property': return 'bg-blue-100 text-blue-800'
      case 'agent': return 'bg-green-100 text-green-800'
      case 'company': return 'bg-purple-100 text-purple-800'
      case 'background': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'uploaded': return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'processing': return <div className="h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      case 'error': return <AlertCircle className="h-4 w-4 text-red-500" />
      default: return null
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Image Manager</h1>
        <p className="text-gray-600">Manage and organize your property and agent images</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Image List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>All Images ({images.length})</CardTitle>
                <Button>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Images
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                      <OptimizedImage
                        src={image.path}
                        alt={image.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-gray-900 truncate">{image.name}</h3>
                        {getStatusIcon(image.status)}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Badge className={getTypeColor(image.type)}>
                          {image.type}
                        </Badge>
                        <span>{image.size}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedImage(image.path)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Image Preview */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Image Preview</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedImage ? (
                <div className="space-y-4">
                  <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                    <OptimizedImage
                      src={selectedImage}
                      alt="Preview"
                      width={400}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-sm text-gray-600">
                    <p><strong>Path:</strong> {selectedImage}</p>
                    <p><strong>Status:</strong> Loaded successfully</p>
                  </div>
                </div>
              ) : (
                <div className="aspect-video rounded-lg bg-gray-100 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <Eye className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>Select an image to preview</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Image Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Images</span>
                  <span className="font-medium">{images.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Property Images</span>
                  <span className="font-medium">{images.filter(img => img.type === 'property').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Agent Photos</span>
                  <span className="font-medium">{images.filter(img => img.type === 'agent').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Background Images</span>
                  <span className="font-medium">{images.filter(img => img.type === 'background').length}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

