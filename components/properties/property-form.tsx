'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { X, Plus, Upload, Save, ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'
import { LOCAL_STORAGE_KEYS, loadLocalJson, saveLocalJson, upsertById } from '@/lib/local-persistence'
import type { Property as StoredProperty } from '@/lib/static-store'

interface Property {
  id?: string
  title: string
  description: string
  price: number
  priceType: string
  propertyType: string
  bedrooms: number | null
  bathrooms: number | null
  area: number | null
  location: string
  address: string
  latitude: number | null
  longitude: number | null
  images: string[]
  features: string[]
  isFeatured: boolean
  isAvailable: boolean
  availabilityInfo: string
  availabilityDate: string
  commissionRate: number | null
  specialConditions: string[]
  agentId: string
}

interface Agent {
  id: string
  name: string
  agentId: string
}

interface PropertyFormProps {
  property?: Property
  onSuccess?: () => void
  onCancel?: () => void
}

export default function PropertyForm({ property, onSuccess, onCancel }: PropertyFormProps) {
  const router = useRouter()
  const [agents, setAgents] = useState<Agent[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [newFeature, setNewFeature] = useState('')
  const [newCondition, setNewCondition] = useState('')
  
  const [formData, setFormData] = useState<Property>({
    title: property?.title || '',
    description: property?.description || '',
    price: property?.price || 0,
    priceType: property?.priceType || 'rent',
    propertyType: property?.propertyType || 'apartment',
    bedrooms: property?.bedrooms || null,
    bathrooms: property?.bathrooms || null,
    area: property?.area || null,
    location: property?.location || '',
    address: property?.address || '',
    latitude: property?.latitude || null,
    longitude: property?.longitude || null,
    images: property?.images || [],
    features: property?.features || [],
    isFeatured: property?.isFeatured || false,
    isAvailable: property?.isAvailable || true,
    availabilityInfo: property?.availabilityInfo || '',
    availabilityDate: property?.availabilityDate || '',
    commissionRate: property?.commissionRate || null,
    specialConditions: property?.specialConditions || [],
    agentId: property?.agentId || ''
  })

  // Fetch agents for dropdown
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await fetch('/api/agents')
        if (response.ok) {
          const data = await response.json()
          setAgents(data)
        }
      } catch (error) {
        console.error('Error fetching agents:', error)
      }
    }
    fetchAgents()
  }, [])

  const handleInputChange = (field: keyof Property, value: string | number | boolean | string[] | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formData.images]
    newImages[index] = value
    handleInputChange('images', newImages)
  }

  const addImage = () => {
    handleInputChange('images', [...formData.images, ''])
  }

  const removeImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index)
    handleInputChange('images', newImages)
  }

  const addFeature = () => {
    if (newFeature.trim()) {
      handleInputChange('features', [...formData.features, newFeature.trim()])
      setNewFeature('')
    }
  }

  const removeFeature = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index)
    handleInputChange('features', newFeatures)
  }

  const addCondition = () => {
    if (newCondition.trim()) {
      handleInputChange('specialConditions', [...formData.specialConditions, newCondition.trim()])
      setNewCondition('')
    }
  }

  const removeCondition = (index: number) => {
    const newConditions = formData.specialConditions.filter((_, i) => i !== index)
    handleInputChange('specialConditions', newConditions)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const now = new Date().toISOString()
      const normalized = {
        ...formData,
        price: Number(formData.price),
        bedrooms: formData.bedrooms ? Number(formData.bedrooms) : null,
        bathrooms: formData.bathrooms ? Number(formData.bathrooms) : null,
        area: formData.area ? Number(formData.area) : null,
        latitude: formData.latitude ? Number(formData.latitude) : null,
        longitude: formData.longitude ? Number(formData.longitude) : null,
        commissionRate: formData.commissionRate ? Number(formData.commissionRate) : null,
        availabilityDate: formData.availabilityDate || now,
      }

      let existing = loadLocalJson<StoredProperty[]>(LOCAL_STORAGE_KEYS.properties)
      if (!existing) {
        try {
          const response = await fetch('/api/properties')
          if (response.ok) existing = (await response.json()) as StoredProperty[]
        } catch {
          // ignore
        }
      }

      const agent = agents.find((a) => a.id === normalized.agentId)
      const id = property?.id ?? (globalThis.crypto?.randomUUID?.() ?? `property-${Date.now()}`)

      const nextProperty: StoredProperty = {
        id,
        title: normalized.title,
        description: normalized.description || '',
        price: normalized.price,
        priceType: normalized.priceType as StoredProperty['priceType'],
        propertyType: normalized.propertyType,
        bedrooms: normalized.bedrooms,
        bathrooms: normalized.bathrooms,
        area: normalized.area,
        location: normalized.location,
        address: normalized.address || normalized.location,
        latitude: normalized.latitude,
        longitude: normalized.longitude,
        images: normalized.images || [],
        features: normalized.features || [],
        isFeatured: Boolean(normalized.isFeatured),
        isAvailable: Boolean(normalized.isAvailable),
        availabilityInfo: normalized.availabilityInfo || '',
        availabilityDate: normalized.availabilityDate,
        commissionRate: normalized.commissionRate,
        specialConditions: normalized.specialConditions || [],
        createdAt: (property?.id && (existing?.find((p) => p.id === property.id)?.createdAt)) || now,
        updatedAt: now,
        agentId: normalized.agentId,
        agent: agent
          ? { id: agent.id, name: agent.name, agentId: agent.id, phone: null, avatar: null }
          : undefined,
      }

      const next = upsertById(existing ?? [], nextProperty)
      saveLocalJson(LOCAL_STORAGE_KEYS.properties, next as unknown as any)

      toast.success(property?.id ? 'Property updated (saved on this device)!' : 'Property created (saved on this device)!')
      if (onSuccess) onSuccess()
      else router.push('/admin/properties')
    } catch (error) {
      console.error('Error saving property:', error)
      toast.error('Failed to save property')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-6">
        {onCancel && (
          <Button variant="outline" onClick={onCancel} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        )}
        <h1 className="text-3xl font-bold">
          {property?.id ? 'Edit Property' : 'Add New Property'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Property Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="e.g., Luxury Condo in BKK1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="price">Price *</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  placeholder="1200"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="priceType">Price Type *</Label>
                <Select value={formData.priceType} onValueChange={(value) => handleInputChange('priceType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select price type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rent">Rent</SelectItem>
                    <SelectItem value="sale">Sale</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="propertyType">Property Type *</Label>
                <Select value={formData.propertyType} onValueChange={(value) => handleInputChange('propertyType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="condo">Condo</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="land">Land</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe the property..."
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Property Details */}
        <Card>
          <CardHeader>
            <CardTitle>Property Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Input
                  id="bedrooms"
                  type="number"
                  value={formData.bedrooms || ''}
                  onChange={(e) => handleInputChange('bedrooms', e.target.value || null)}
                  placeholder="2"
                />
              </div>
              <div>
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <Input
                  id="bathrooms"
                  type="number"
                  value={formData.bathrooms || ''}
                  onChange={(e) => handleInputChange('bathrooms', e.target.value || null)}
                  placeholder="2"
                />
              </div>
              <div>
                <Label htmlFor="area">Area (sqm)</Label>
                <Input
                  id="area"
                  type="number"
                  value={formData.area || ''}
                  onChange={(e) => handleInputChange('area', e.target.value || null)}
                  placeholder="85"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="BKK1, Phnom Penh"
                  required
                />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Street 123, Building ABC"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="latitude">Latitude</Label>
                <Input
                  id="latitude"
                  type="number"
                  step="any"
                  value={formData.latitude || ''}
                  onChange={(e) => handleInputChange('latitude', e.target.value || null)}
                  placeholder="11.5564"
                />
              </div>
              <div>
                <Label htmlFor="longitude">Longitude</Label>
                <Input
                  id="longitude"
                  type="number"
                  step="any"
                  value={formData.longitude || ''}
                  onChange={(e) => handleInputChange('longitude', e.target.value || null)}
                  placeholder="104.9282"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Images */}
        <Card>
          <CardHeader>
            <CardTitle>Property Images</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.images.map((image, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={image}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  placeholder="Image URL"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeImage(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addImage} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Image
            </Button>
          </CardContent>
        </Card>

        {/* Features */}
        <Card>
          <CardHeader>
            <CardTitle>Property Features</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2 mb-4">
              {formData.features.map((feature, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {feature}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => removeFeature(index)}
                  />
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                placeholder="Add feature (e.g., Swimming Pool)"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
              />
              <Button type="button" onClick={addFeature}>
                Add
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Availability & Commission */}
        <Card>
          <CardHeader>
            <CardTitle>Availability & Commission</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="availabilityInfo">Availability Info</Label>
                <Input
                  id="availabilityInfo"
                  value={formData.availabilityInfo}
                  onChange={(e) => handleInputChange('availabilityInfo', e.target.value)}
                  placeholder="Available September"
                />
              </div>
              <div>
                <Label htmlFor="availabilityDate">Availability Date</Label>
                <Input
                  id="availabilityDate"
                  type="date"
                  value={formData.availabilityDate}
                  onChange={(e) => handleInputChange('availabilityDate', e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="commissionRate">Commission Rate (%)</Label>
              <Input
                id="commissionRate"
                type="number"
                step="0.01"
                value={formData.commissionRate || ''}
                onChange={(e) => handleInputChange('commissionRate', e.target.value || null)}
                placeholder="4.0"
              />
            </div>

            <div>
              <Label>Special Conditions</Label>
              <div className="flex flex-wrap gap-2 mb-4">
                {formData.specialConditions.map((condition, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {condition}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => removeCondition(index)}
                    />
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newCondition}
                  onChange={(e) => setNewCondition(e.target.value)}
                  placeholder="Add condition (e.g., Exclude Management Fee)"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCondition())}
                />
                <Button type="button" onClick={addCondition}>
                  Add
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Agent & Status */}
        <Card>
          <CardHeader>
            <CardTitle>Agent & Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="agentId">Assigned Agent *</Label>
              <Select value={formData.agentId} onValueChange={(value) => handleInputChange('agentId', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an agent" />
                </SelectTrigger>
                <SelectContent>
                  {agents.map((agent) => (
                    <SelectItem key={agent.id} value={agent.id}>
                      {agent.name} ({agent.agentId})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-6">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isFeatured"
                  checked={formData.isFeatured}
                  onCheckedChange={(checked) => handleInputChange('isFeatured', checked)}
                />
                <Label htmlFor="isFeatured">Featured Property</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isAvailable"
                  checked={formData.isAvailable}
                  onCheckedChange={(checked) => handleInputChange('isAvailable', checked)}
                />
                <Label htmlFor="isAvailable">Available</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Buttons */}
        <div className="flex gap-4 justify-end">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={isLoading} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            {isLoading ? 'Saving...' : (property?.id ? 'Update Property' : 'Create Property')}
          </Button>
        </div>
      </form>
    </div>
  )
}

