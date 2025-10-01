'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { X, Edit, Calendar, DollarSign, Home, User, FileText, Clock, MapPin, Building } from 'lucide-react'

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

interface UnitDetailsProps {
  unit: Unit
  onClose: () => void
  onEdit: (unit: Unit) => void
}

export default function UnitDetails({ unit, onClose, onEdit }: UnitDetailsProps) {
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Unit Details</h2>
            <Button variant="outline" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-6">
            {/* Unit Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Home className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Unit Number</p>
                    <p className="font-semibold text-lg">{unit.unitNo}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Price</p>
                    <p className="font-semibold text-lg">${Number(unit.price || 0).toFixed(2)}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Home className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-600">Room Type</p>
                    <p className="font-semibold text-lg">{unit.roomType}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-orange-600" />
                  <div>
                    <p className="text-sm text-gray-600">Handle By</p>
                    <p className="font-semibold text-lg">{unit.handleBy}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Status</p>
                  <Badge className={`${getStatusColor(unit.status)} text-sm px-3 py-1`}>
                    {unit.status.charAt(0).toUpperCase() + unit.status.slice(1)}
                  </Badge>
                </div>

                {unit.remarks && (
                  <div className="flex items-start space-x-3">
                    <FileText className="h-5 w-5 text-gray-600 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Remarks / Notes</p>
                      <p className="font-medium">{unit.remarks}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">Created</p>
                    <p className="font-medium">{formatDate(unit.createdAt)}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">Last Updated</p>
                    <p className="font-medium">{formatDate(unit.updatedAt)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Availability Information */}
            {(unit.availabilityInfo || unit.availabilityDate || unit.commissionRate || unit.specialConditions?.length || unit.location || unit.floor) && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Availability Information</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
                  {unit.availabilityInfo && (
                    <div className="flex items-center text-blue-800">
                      <Clock className="h-4 w-4 mr-2" />
                      <span className="font-medium">Status: {unit.availabilityInfo}</span>
                    </div>
                  )}
                  
                  {unit.availabilityDate && (
                    <div className="flex items-center text-blue-800">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="font-medium">Available: {new Date(unit.availabilityDate).toLocaleDateString()}</span>
                    </div>
                  )}
                  
                  {unit.commissionRate && (
                    <div className="flex items-center text-blue-800">
                      <DollarSign className="h-4 w-4 mr-2" />
                      <span className="font-medium">Commission: {unit.commissionRate}%</span>
                    </div>
                  )}
                  
                  {unit.location && (
                    <div className="flex items-center text-blue-800">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="font-medium">Location: {unit.location}</span>
                    </div>
                  )}
                  
                  {unit.floor && (
                    <div className="flex items-center text-blue-800">
                      <Building className="h-4 w-4 mr-2" />
                      <span className="font-medium">Floor: {unit.floor}</span>
                    </div>
                  )}
                  
                  {unit.specialConditions && unit.specialConditions.length > 0 && (
                    <div>
                      <div className="text-sm text-blue-700 font-medium mb-2">Special Conditions:</div>
                      <div className="space-y-1">
                        {unit.specialConditions.map((condition, index) => (
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

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              <Button onClick={() => onEdit(unit)} className="bg-blue-600 hover:bg-blue-700">
                <Edit className="h-4 w-4 mr-2" />
                Edit Unit
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
