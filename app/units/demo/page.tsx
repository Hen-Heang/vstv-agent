'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Download, Eye, Edit, Trash2, Plus } from 'lucide-react'

// Demo data based on your real data
const demoUnits = [
  {
    id: '1',
    unitNo: 'ANATA/1212B',
    price: 295.00,
    roomType: 'Studio Room',
    handleBy: 'Rita',
    remarks: 'Floor 5',
    status: 'available',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    unitNo: 'Agile Sky Residence/A34',
    price: 650.00,
    roomType: 'One bedroom',
    handleBy: 'KA',
    remarks: '',
    status: 'available',
    createdAt: '2024-01-14T14:20:00Z',
    updatedAt: '2024-01-14T14:20:00Z'
  },
  {
    id: '3',
    unitNo: 'Arthur residence Tonlebasac',
    price: 300.00,
    roomType: 'Studio Room',
    handleBy: 'Sale006 VSTV',
    remarks: '',
    status: 'available',
    createdAt: '2024-01-13T09:15:00Z',
    updatedAt: '2024-01-13T09:15:00Z'
  },
  {
    id: '4',
    unitNo: 'Arakawa/D1918',
    price: 31900.00,
    roomType: 'Loft Condo',
    handleBy: 'Hong',
    remarks: 'Resell',
    status: 'sold',
    createdAt: '2024-01-12T16:45:00Z',
    updatedAt: '2024-01-12T16:45:00Z'
  },
  {
    id: '5',
    unitNo: 'Condo L Tower',
    price: 400.00,
    roomType: 'Two bedroom',
    handleBy: 'Nora',
    remarks: 'Available 18.08.2025',
    status: 'available',
    createdAt: '2024-01-11T11:30:00Z',
    updatedAt: '2024-01-11T11:30:00Z'
  },
  {
    id: '6',
    unitNo: 'Borey Sen Sok/524',
    price: 360.00,
    roomType: 'One-Two Bedroom',
    handleBy: 'Vannaram',
    remarks: '',
    status: 'negotiate',
    createdAt: '2024-01-10T13:20:00Z',
    updatedAt: '2024-01-10T13:20:00Z'
  }
]

export default function UnitsDemoPage() {
  const [units] = useState(demoUnits)
  const [selectedUnit, setSelectedUnit] = useState<typeof demoUnits[0] | null>(null)
  const [showDetails, setShowDetails] = useState(false)

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

  const handleView = (unit: typeof demoUnits[0]) => {
    setSelectedUnit(unit)
    setShowDetails(true)
  }

  const handleCloseDetails = () => {
    setShowDetails(false)
    setSelectedUnit(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Unit Management Demo</h1>
          <p className="text-gray-600">This is a demonstration of your new unit management system. All data shown is sample data.</p>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
          <div className="flex space-x-3">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add New Unit
            </Button>
          </div>
          
          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              className="text-green-600 border-green-600 hover:bg-green-50"
            >
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
            <Button 
              variant="outline" 
              className="text-blue-600 border-blue-600 hover:bg-blue-50"
            >
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4">
            <div className="text-2xl font-bold text-blue-600">{units.length}</div>
            <div className="text-sm text-gray-600">Total Units</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {units.filter(u => u.status === 'available').length}
            </div>
            <div className="text-sm text-gray-600">Available</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-red-600">
              {units.filter(u => u.status === 'sold').length}
            </div>
            <div className="text-sm text-gray-600">Sold</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-yellow-600">
              {units.filter(u => u.status === 'negotiate').length}
            </div>
            <div className="text-sm text-gray-600">Negotiate</div>
          </Card>
        </div>

        {/* Unit Table */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Unit Management</h2>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Search units..."
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
              <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="all">All Status</option>
                <option value="available">Available</option>
                <option value="sold">Sold</option>
                <option value="rented">Rented</option>
                <option value="negotiate">Negotiate</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4">Unit No.</th>
                  <th className="text-left py-3 px-4">Price ($)</th>
                  <th className="text-left py-3 px-4">Room Type</th>
                  <th className="text-left py-3 px-4">Handle By</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Remarks</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {units.map((unit) => (
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
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleView(unit)}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-green-600 hover:text-green-700"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
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
        </Card>

        {/* Unit Details Modal */}
        {showDetails && selectedUnit && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Unit Details</h2>
                  <Button variant="outline" size="sm" onClick={handleCloseDetails}>
                    ×
                  </Button>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-600">Unit Number</p>
                        <p className="font-semibold text-lg">{selectedUnit.unitNo}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Price</p>
                        <p className="font-semibold text-lg">${Number(selectedUnit.price || 0).toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-600">Room Type</p>
                        <p className="font-semibold text-lg">{selectedUnit.roomType}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Handle By</p>
                        <p className="font-semibold text-lg">{selectedUnit.handleBy}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <Badge className={`${getStatusColor(selectedUnit.status)} text-sm px-3 py-1`}>
                      {selectedUnit.status.charAt(0).toUpperCase() + selectedUnit.status.slice(1)}
                    </Badge>
                  </div>

                  {selectedUnit.remarks && (
                    <div>
                      <p className="text-sm text-gray-600">Remarks / Notes</p>
                      <p className="font-medium">{selectedUnit.remarks}</p>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Features Showcase */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">System Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6">
              <CheckCircle className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">CRUD Operations</h3>
              <p className="text-gray-600">Create, read, update, and delete units with a modern interface.</p>
            </Card>
            <Card className="p-6">
              <CheckCircle className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Search & Filter</h3>
              <p className="text-gray-600">Advanced search and filtering capabilities for quick unit discovery.</p>
            </Card>
            <Card className="p-6">
              <CheckCircle className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">PDF Export</h3>
              <p className="text-gray-600">Professional PDF reports for clients and team members.</p>
            </Card>
            <Card className="p-6">
              <CheckCircle className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">CSV Export</h3>
              <p className="text-gray-600">Export data to CSV for spreadsheet compatibility.</p>
            </Card>
            <Card className="p-6">
              <CheckCircle className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Status Management</h3>
              <p className="text-gray-600">Track unit availability, sales, and negotiations.</p>
            </Card>
            <Card className="p-6">
              <CheckCircle className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Mobile Responsive</h3>
              <p className="text-gray-600">Works perfectly on desktop, tablet, and mobile devices.</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
