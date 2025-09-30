'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import UnitForm from '@/components/units/unit-form'
import UnitTable from '@/components/units/unit-table'
import UnitDetails from '@/components/units/unit-details'
import { exportUnitsToPDF, exportUnitsToCSV } from '@/lib/pdf-export'
import { Plus, FileText, Table, Trash2, AlertTriangle } from 'lucide-react'

interface Unit {
  id: string
  unitNo: string
  price: number
  roomType: string
  handleBy: string
  remarks?: string
  status: string
  createdAt: string
  updatedAt: string
}

export default function UnitsPage() {
  const [units, setUnits] = useState<Unit[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [editingUnit, setEditingUnit] = useState<Unit | null>(null)
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  // Fetch units from API
  const fetchUnits = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/units')
      if (response.ok) {
        const data = await response.json()
        setUnits(data)
      } else {
        console.error('Failed to fetch units')
      }
    } catch (error) {
      console.error('Error fetching units:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUnits()
  }, [])

  // Handle form submission
  const handleSaveUnit = async (unitData: Omit<Unit, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const url = editingUnit ? `/api/units/${editingUnit.id}` : '/api/units'
      const method = editingUnit ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(unitData),
      })

      if (response.ok) {
        await fetchUnits() // Refresh the list
        setShowForm(false)
        setEditingUnit(null)
      } else {
        console.error('Failed to save unit')
      }
    } catch (error) {
      console.error('Error saving unit:', error)
    }
  }

  // Handle unit deletion
  const handleDeleteUnit = async (id: string) => {
    try {
      const response = await fetch(`/api/units/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        await fetchUnits() // Refresh the list
        setDeleteConfirm(null)
      } else {
        console.error('Failed to delete unit')
      }
    } catch (error) {
      console.error('Error deleting unit:', error)
    }
  }

  // Handle edit
  const handleEdit = (unit: Unit) => {
    setEditingUnit(unit)
    setShowForm(true)
  }

  // Handle view
  const handleView = (unit: Unit) => {
    setSelectedUnit(unit)
    setShowDetails(true)
  }

  // Handle delete confirmation
  const handleDeleteClick = (id: string) => {
    setDeleteConfirm(id)
  }

  // Export functions
  const handleExportPDF = async () => {
    console.log('Exporting PDF with units:', units)
    await exportUnitsToPDF(units, `units-export-${new Date().toISOString().split('T')[0]}.pdf`)
  }

  const handleExportCSV = () => {
    console.log('Exporting CSV with units:', units)
    exportUnitsToCSV(units, `units-export-${new Date().toISOString().split('T')[0]}.csv`)
  }

  // Close form and reset state
  const handleCloseForm = () => {
    setShowForm(false)
    setEditingUnit(null)
  }

  // Close details
  const handleCloseDetails = () => {
    setShowDetails(false)
    setSelectedUnit(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading units...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Unit Management</h1>
          <p className="text-gray-600">Manage your available units, update information, and export data for your team and clients.</p>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
          <div className="flex space-x-3">
            <Button 
              onClick={() => setShowForm(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Unit
            </Button>
          </div>
          
          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              onClick={handleExportPDF}
              className="text-green-600 border-green-600 hover:bg-green-50"
            >
              <FileText className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
            <Button 
              variant="outline" 
              onClick={handleExportCSV}
              className="text-blue-600 border-blue-600 hover:bg-blue-50"
            >
              <Table className="h-4 w-4 mr-2" />
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
        <UnitTable
          units={units}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
          onView={handleView}
        />

        {/* Unit Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <UnitForm
                unit={editingUnit || undefined}
                onSave={handleSaveUnit}
                onCancel={handleCloseForm}
                isEditing={!!editingUnit}
              />
            </div>
          </div>
        )}

        {/* Unit Details Modal */}
        {showDetails && selectedUnit && (
          <UnitDetails
            unit={selectedUnit}
            onClose={handleCloseDetails}
            onEdit={handleEdit}
          />
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md">
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                  <h3 className="text-lg font-semibold">Confirm Delete</h3>
                </div>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete this unit? This action cannot be undone.
                </p>
                <div className="flex justify-end space-x-3">
                  <Button 
                    variant="outline" 
                    onClick={() => setDeleteConfirm(null)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => handleDeleteUnit(deleteConfirm)}
                    className="text-red-600 border-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
