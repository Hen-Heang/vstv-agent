'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import UnitForm from '@/components/units/unit-form'
import UnitTable from '@/components/units/unit-table'
import UnitDetails from '@/components/units/unit-details'
import { exportUnitsToPDF, exportUnitsToCSV } from '@/lib/pdf-export'
import { AlertTriangle, FileText, Plus, Table } from 'lucide-react'
import { toast } from 'sonner'
import { LOCAL_STORAGE_KEYS, loadLocalJson, removeById, saveLocalJson, upsertById } from '@/lib/local-persistence'

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

export default function AdminUnitsPage() {
  const [units, setUnits] = useState<Unit[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [editingUnit, setEditingUnit] = useState<Unit | null>(null)
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  const readLocalUnits = () => loadLocalJson<Unit[]>(LOCAL_STORAGE_KEYS.units) ?? null

  const fetchUnits = async () => {
    try {
      setLoading(true)
      setError(null)

      const local = readLocalUnits()
      if (local && Array.isArray(local)) {
        setUnits(local)
        return
      }

      const response = await fetch('/api/units')
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'Failed to fetch units')
      }

      const data = (await response.json()) as Unit[]
      setUnits(data)
      saveLocalJson(LOCAL_STORAGE_KEYS.units, data as unknown as any)
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Failed to fetch units'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUnits()
  }, [])

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingUnit(null)
  }

  const handleCloseDetails = () => {
    setShowDetails(false)
    setSelectedUnit(null)
  }

  const handleSaveUnit = async (unitData: Omit<Unit, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const now = new Date().toISOString()
      const current = readLocalUnits() ?? units
      const id = editingUnit?.id ?? (globalThis.crypto?.randomUUID?.() ?? `unit-${Date.now()}`)
      const nextUnit: Unit = {
        id,
        ...unitData,
        createdAt: editingUnit?.createdAt ?? now,
        updatedAt: now,
      }

      const next = upsertById(current, nextUnit)
      saveLocalJson(LOCAL_STORAGE_KEYS.units, next as unknown as any)
      setUnits(next)
      setShowForm(false)
      setEditingUnit(null)
      toast.success(editingUnit ? 'Unit updated (saved on this device)!' : 'Unit created (saved on this device)!')
    } catch (error) {
      console.error('Error saving unit:', error)
      toast.error('Failed to save unit')
    }
  }

  const handleDeleteUnit = async (id: string) => {
    try {
      const current = readLocalUnits() ?? units
      const next = removeById(current, id)
      saveLocalJson(LOCAL_STORAGE_KEYS.units, next as unknown as any)
      setUnits(next)
      setDeleteConfirm(null)
      toast.success('Unit deleted (on this device)')
    } catch (error) {
      console.error('Error deleting unit:', error)
      toast.error('Failed to delete unit')
    }
  }

  const handleEdit = (unit: Unit) => {
    setEditingUnit(unit)
    setShowForm(true)
  }

  const handleView = (unit: Unit) => {
    setSelectedUnit(unit)
    setShowDetails(true)
  }

  const handleDeleteClick = (id: string) => {
    setDeleteConfirm(id)
  }

  const handleExportPDF = async () => {
    try {
      await exportUnitsToPDF(units)
    } catch (error) {
      console.error('Error exporting PDF:', error)
    }
  }

  const handleExportCSV = async () => {
    try {
      await exportUnitsToCSV(units)
    } catch (error) {
      console.error('Error exporting CSV:', error)
    }
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

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Units</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={fetchUnits} className="bg-blue-600 hover:bg-blue-700">
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Unit Management</h1>
          <p className="text-gray-600">Add, update, and export units for your team.</p>
        </div>

        <Card className="mb-6 border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          Changes here are saved to your browser only (localStorage). They will not sync to other devices/users.
        </Card>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
          <div className="flex space-x-3">
            <Button onClick={() => setShowForm(true)} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add New Unit
            </Button>
          </div>

          <div className="flex space-x-3">
            <Button variant="outline" onClick={handleExportPDF} className="text-green-600 border-green-600 hover:bg-green-50">
              <FileText className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
            <Button variant="outline" onClick={handleExportCSV} className="text-blue-600 border-blue-600 hover:bg-blue-50">
              <Table className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4">
            <div className="text-2xl font-bold text-blue-600">{units.length}</div>
            <div className="text-sm text-gray-600">Total Units</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-green-600">{units.filter((u) => u.status === 'available').length}</div>
            <div className="text-sm text-gray-600">Available</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-red-600">{units.filter((u) => u.status === 'sold').length}</div>
            <div className="text-sm text-gray-600">Sold</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-yellow-600">{units.filter((u) => u.status === 'negotiate').length}</div>
            <div className="text-sm text-gray-600">Negotiate</div>
          </Card>
        </div>

        <UnitTable units={units} onEdit={handleEdit} onDelete={handleDeleteClick} onView={handleView} />

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <UnitForm unit={editingUnit || undefined} onSave={handleSaveUnit} onCancel={handleCloseForm} isEditing={!!editingUnit} />
            </div>
          </div>
        )}

        {showDetails && selectedUnit && <UnitDetails unit={selectedUnit} onClose={handleCloseDetails} onEdit={handleEdit} />}

        {deleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md">
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                  <h3 className="text-lg font-semibold">Confirm Delete</h3>
                </div>
                <p className="text-gray-600 mb-6">Are you sure you want to delete this unit? This only affects this browser.</p>
                <div className="flex justify-end space-x-3">
                  <Button variant="outline" onClick={() => setDeleteConfirm(null)}>
                    Cancel
                  </Button>
                  <Button className="bg-red-600 hover:bg-red-700" onClick={() => handleDeleteUnit(deleteConfirm)}>
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

