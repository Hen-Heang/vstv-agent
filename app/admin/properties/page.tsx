'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye,
  MapPin,
  Bed,
  Bath,
  Square,
  DollarSign
} from 'lucide-react'
import { toast } from 'sonner'
import PropertyForm from '@/components/properties/property-form'

interface Property {
  id: string
  title: string
  price: number
  priceType: string
  propertyType: string
  location: string
  bedrooms: number | null
  bathrooms: number | null
  area: number | null
  images: string[]
  features: string[]
  isFeatured: boolean
  isAvailable: boolean
  agent: {
    id: string
    name: string
    agentId: string
  }
  createdAt: string
}

export default function PropertiesManagement() {
  const router = useRouter()
  const [properties, setProperties] = useState<Property[]>([])
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showForm, setShowForm] = useState(false)
  const [editingProperty, setEditingProperty] = useState<{
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
  } | null>(null)

  useEffect(() => {
    fetchProperties()
  }, [])

  useEffect(() => {
    filterProperties()
  }, [properties, searchTerm, filterType, filterStatus])

  const fetchProperties = async () => {
    try {
      const response = await fetch('/api/properties')
      if (response.ok) {
        const data = await response.json()
        setProperties(data)
      } else {
        toast.error('Failed to fetch properties')
      }
    } catch (error) {
      console.error('Error fetching properties:', error)
      toast.error('Failed to fetch properties')
    } finally {
      setIsLoading(false)
    }
  }

  const filterProperties = () => {
    let filtered = properties

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(property =>
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.agent.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Type filter
    if (filterType !== 'all') {
      filtered = filtered.filter(property => property.propertyType === filterType)
    }

    // Status filter
    if (filterStatus !== 'all') {
      if (filterStatus === 'available') {
        filtered = filtered.filter(property => property.isAvailable)
      } else if (filterStatus === 'unavailable') {
        filtered = filtered.filter(property => !property.isAvailable)
      } else if (filterStatus === 'featured') {
        filtered = filtered.filter(property => property.isFeatured)
      }
    }

    setFilteredProperties(filtered)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this property?')) {
      return
    }

    try {
      const response = await fetch(`/api/properties/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        toast.success('Property deleted successfully')
        fetchProperties()
      } else {
        toast.error('Failed to delete property')
      }
    } catch (error) {
      console.error('Error deleting property:', error)
      toast.error('Failed to delete property')
    }
  }

  const handleEdit = (property: Property) => {
    setEditingProperty({
      id: property.id,
      title: property.title,
      description: '',
      price: property.price,
      priceType: property.priceType,
      propertyType: property.propertyType,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      area: property.area,
      location: property.location,
      address: '',
      latitude: null,
      longitude: null,
      images: property.images,
      features: property.features,
      isFeatured: property.isFeatured,
      isAvailable: property.isAvailable,
      availabilityInfo: '',
      availabilityDate: '',
      commissionRate: null,
      specialConditions: [],
      agentId: property.agent.id
    })
    setShowForm(true)
  }

  const handleFormSuccess = () => {
    setShowForm(false)
    setEditingProperty(null)
    fetchProperties()
  }

  const handleFormCancel = () => {
    setShowForm(false)
    setEditingProperty(null)
  }

  const formatPrice = (price: number, priceType: string) => {
    if (priceType === 'rent') {
      return `$${price.toLocaleString()}/month`
    } else {
      return `$${price.toLocaleString()}`
    }
  }

  if (showForm) {
    return (
      <PropertyForm
        property={editingProperty || undefined}
        onSuccess={handleFormSuccess}
        onCancel={handleFormCancel}
      />
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Loading properties...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Properties Management</h1>
          <p className="text-muted-foreground">Manage your property listings</p>
        </div>
        <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Property
        </Button>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search properties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Type</label>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="condo">Condo</SelectItem>
                  <SelectItem value="villa">Villa</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="land">Land</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Status</label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="All status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="unavailable">Unavailable</SelectItem>
                  <SelectItem value="featured">Featured</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('')
                  setFilterType('all')
                  setFilterStatus('all')
                }}
                className="w-full"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Properties Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            Properties ({filteredProperties.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredProperties.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No properties found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Property</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Agent</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProperties.map((property) => (
                    <TableRow key={property.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {property.images.length > 0 && (
                            <img
                              src={property.images[0]}
                              alt={property.title}
                              className="w-12 h-12 rounded object-cover"
                            />
                          )}
                          <div>
                            <p className="font-medium">{property.title}</p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              {property.bedrooms && (
                                <span className="flex items-center gap-1">
                                  <Bed className="h-3 w-3" />
                                  {property.bedrooms}
                                </span>
                              )}
                              {property.bathrooms && (
                                <span className="flex items-center gap-1">
                                  <Bath className="h-3 w-3" />
                                  {property.bathrooms}
                                </span>
                              )}
                              {property.area && (
                                <span className="flex items-center gap-1">
                                  <Square className="h-3 w-3" />
                                  {property.area} sqm
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          {formatPrice(property.price, property.priceType)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {property.propertyType}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {property.location}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{property.agent.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {property.agent.agentId}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          {property.isFeatured && (
                            <Badge variant="default" className="w-fit">Featured</Badge>
                          )}
                          <Badge 
                            variant={property.isAvailable ? "default" : "secondary"}
                            className="w-fit"
                          >
                            {property.isAvailable ? "Available" : "Unavailable"}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/properties/${property.id}`}>
                                <Eye className="h-4 w-4 mr-2" />
                                View
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(property)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDelete(property.id)}
                              className="text-destructive"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

