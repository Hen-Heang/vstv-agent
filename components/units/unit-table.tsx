'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Edit, Trash2, Eye, Search, Filter } from 'lucide-react'

interface Unit {
  id: string
  unitNo: string
  price: number
  roomType: string
  handleBy: string
  remarks?: string
  status: string
  availabilityInfo?: string
  availabilityDate?: string
  commissionRate?: number
  specialConditions?: string[]
  location?: string
  floor?: string
  createdAt: string
  updatedAt: string
}

interface UnitTableProps {
  units: Unit[]
  onEdit: (unit: Unit) => void
  onDelete: (id: string) => void
  onView: (unit: Unit) => void
}

export default function UnitTable({ units, onEdit, onDelete, onView }: UnitTableProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortBy, setSortBy] = useState<'unitNo' | 'price' | 'roomType' | 'handleBy' | 'status'>('unitNo')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  const filteredUnits = units
    .filter(unit => {
      const matchesSearch = 
        unit.unitNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        unit.roomType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        unit.handleBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (unit.remarks && unit.remarks.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesStatus = statusFilter === 'all' || unit.status === statusFilter
      
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      let aValue: string | number
      let bValue: string | number

      switch (sortBy) {
        case 'price':
          aValue = a.price
          bValue = b.price
          break
        case 'unitNo':
        case 'roomType':
        case 'handleBy':
        case 'status':
          aValue = a[sortBy]
          bValue = b[sortBy]
          break
        default:
          return 0
      }

      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
      }
    })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800'
      case 'sold':
        return 'bg-red-100 text-red-800'
      case 'rented':
        return 'bg-blue-100 text-blue-800'
      case 'negotiate':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleSort = (column: typeof sortBy) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(column)
      setSortOrder('asc')
    }
  }

  return (
    <Card className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
        <h2 className="text-xl font-semibold">Unit Management</h2>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search units..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="available">Available</option>
            <option value="sold">Sold</option>
            <option value="rented">Rented</option>
            <option value="negotiate">Negotiate</option>
          </select>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="block sm:hidden space-y-4">
        {filteredUnits.map((unit) => (
          <Card key={unit.id} className="p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-lg">{unit.unitNo}</h3>
                <p className="text-gray-600">{unit.roomType}</p>
              </div>
              <Badge className={getStatusColor(unit.status)}>
                {unit.status.charAt(0).toUpperCase() + unit.status.slice(1)}
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Price</p>
                <p className="font-semibold">${Number(unit.price || 0).toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Handle By</p>
                <p className="font-semibold">{unit.handleBy}</p>
              </div>
            </div>
            
            {unit.remarks && (
              <div className="mb-4">
                <p className="text-sm text-gray-500">Remarks</p>
                <p className="text-sm">{unit.remarks}</p>
              </div>
            )}

            {/* Availability Information */}
            {(unit.availabilityInfo || unit.availabilityDate || unit.commissionRate || unit.specialConditions?.length || unit.location || unit.floor) && (
              <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-500 mb-2">Availability Information</p>
                <div className="space-y-1">
                  {unit.availabilityInfo && (
                    <div className="text-blue-600 font-medium text-sm">{unit.availabilityInfo}</div>
                  )}
                  {unit.availabilityDate && (
                    <div className="text-green-600 text-sm">Available: {new Date(unit.availabilityDate).toLocaleDateString()}</div>
                  )}
                  {unit.commissionRate && (
                    <div className="text-orange-600 text-sm">Commission: {unit.commissionRate}%</div>
                  )}
                  {unit.location && (
                    <div className="text-gray-500 text-sm">{unit.location}</div>
                  )}
                  {unit.floor && (
                    <div className="text-gray-500 text-sm">{unit.floor}</div>
                  )}
                  {unit.specialConditions && unit.specialConditions.length > 0 && (
                    <div className="text-xs text-gray-500">
                      {unit.specialConditions.join(', ')}
                    </div>
                  )}
                </div>
              </div>
            )}
            
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onView(unit)}
                className="text-blue-600 hover:text-blue-700 flex-1"
              >
                <Eye className="h-4 w-4 mr-1" />
                View
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(unit)}
                className="text-green-600 hover:text-green-700 flex-1"
              >
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(unit.id)}
                className="text-red-600 hover:text-red-700 flex-1"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th 
                className="text-left py-3 px-4 cursor-pointer hover:bg-gray-50"
                onClick={() => handleSort('unitNo')}
              >
                <div className="flex items-center space-x-1">
                  <span>Unit No.</span>
                  <Filter className="h-3 w-3" />
                </div>
              </th>
              <th 
                className="text-left py-3 px-4 cursor-pointer hover:bg-gray-50"
                onClick={() => handleSort('price')}
              >
                <div className="flex items-center space-x-1">
                  <span>Price ($)</span>
                  <Filter className="h-3 w-3" />
                </div>
              </th>
              <th 
                className="text-left py-3 px-4 cursor-pointer hover:bg-gray-50"
                onClick={() => handleSort('roomType')}
              >
                <div className="flex items-center space-x-1">
                  <span>Room Type</span>
                  <Filter className="h-3 w-3" />
                </div>
              </th>
              <th 
                className="text-left py-3 px-4 cursor-pointer hover:bg-gray-50"
                onClick={() => handleSort('handleBy')}
              >
                <div className="flex items-center space-x-1">
                  <span>Handle By</span>
                  <Filter className="h-3 w-3" />
                </div>
              </th>
              <th 
                className="text-left py-3 px-4 cursor-pointer hover:bg-gray-50"
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center space-x-1">
                  <span>Status</span>
                  <Filter className="h-3 w-3" />
                </div>
              </th>
              <th className="text-left py-3 px-4">Remarks</th>
              <th className="text-left py-3 px-4">Availability</th>
              <th className="text-left py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUnits.map((unit) => (
              <tr key={unit.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 font-medium">{unit.unitNo}</td>
                <td className="py-3 px-4">${Number(unit.price || 0).toFixed(2)}</td>
                <td className="py-3 px-4">{unit.roomType}</td>
                <td className="py-3 px-4">{unit.handleBy}</td>
                <td className="py-3 px-4">
                  <Badge className={getStatusColor(unit.status)}>
                    {unit.status.charAt(0).toUpperCase() + unit.status.slice(1)}
                  </Badge>
                </td>
                <td className="py-3 px-4 text-sm text-gray-600 max-w-xs truncate">
                  {unit.remarks || '-'}
                </td>
                <td className="py-3 px-4 text-sm text-gray-600 max-w-xs">
                  <div className="space-y-1">
                    {unit.availabilityInfo && (
                      <div className="text-blue-600 font-medium">{unit.availabilityInfo}</div>
                    )}
                    {unit.availabilityDate && (
                      <div className="text-green-600">Available: {new Date(unit.availabilityDate).toLocaleDateString()}</div>
                    )}
                    {unit.commissionRate && (
                      <div className="text-orange-600">Commission: {unit.commissionRate}%</div>
                    )}
                    {unit.location && (
                      <div className="text-gray-500">{unit.location}</div>
                    )}
                    {unit.floor && (
                      <div className="text-gray-500">{unit.floor}</div>
                    )}
                    {unit.specialConditions && unit.specialConditions.length > 0 && (
                      <div className="text-xs text-gray-500">
                        {unit.specialConditions.slice(0, 2).join(', ')}
                        {unit.specialConditions.length > 2 && ` +${unit.specialConditions.length - 2} more`}
                      </div>
                    )}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onView(unit)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(unit)}
                      className="text-green-600 hover:text-green-700"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDelete(unit.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredUnits.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No units found matching your criteria.
        </div>
      )}

      <div className="mt-4 text-sm text-gray-600">
        Showing {filteredUnits.length} of {units.length} units
      </div>
    </Card>
  )
}
