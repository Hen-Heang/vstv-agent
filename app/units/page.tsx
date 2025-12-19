'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import UnitTable from '@/components/units/unit-table'
import UnitDetails from '@/components/units/unit-details'
import { exportUnitsToPDF, exportUnitsToCSV } from '@/lib/pdf-export'
import { FileText, Table, AlertTriangle } from 'lucide-react'
import { LOCAL_STORAGE_KEYS, loadLocalJson, saveLocalJson } from '@/lib/local-persistence'

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
  const [error, setError] = useState<string | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null)

  const readLocalUnits = () => loadLocalJson<Unit[]>(LOCAL_STORAGE_KEYS.units) ?? null

  // Fetch units from API
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
      if (response.ok) {
        const data = await response.json()
        setUnits(data)
        saveLocalJson(LOCAL_STORAGE_KEYS.units, data as unknown as any)
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Failed to fetch units')
        console.error('Failed to fetch units:', errorData)
        
        // Fallback to demo data if database is not available
        if (errorData.error?.includes('database') || errorData.error?.includes('connection')) {
          console.log('Using fallback demo data')
          setUnits([
            {
              id: 'demo-1',
              unitNo: 'ANATA/1212B',
              price: 1200,
              roomType: 'Studio Room',
              handleBy: 'Rita',
              remarks: 'Floor 5',
              status: 'available',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            },
            {
              id: 'demo-2',
              unitNo: 'Morgan/3317',
              price: 1500,
              roomType: 'One bedroom',
              handleBy: 'KA',
              remarks: 'Available 18.08.2025',
              status: 'available',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            },
            {
              id: 'demo-3',
              unitNo: 'Sale006/001',
              price: 2000,
              roomType: 'Two bedroom',
              handleBy: 'Sale006 VSTV',
              remarks: 'Negotiate',
              status: 'negotiate',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            }
          ])
          setError(null) // Clear error since we have demo data
        }
      }
    } catch (error) {
      setError('Network error. Please check your connection and try again.')
      console.error('Error fetching units:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUnits()
  }, [])

  // Handle view
  const handleView = (unit: Unit) => {
    setSelectedUnit(unit)
    setShowDetails(true)
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

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Units</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button 
            onClick={fetchUnits}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Available Units</h1>
          <p className="text-gray-600">Browse available units and export the list for sharing.</p>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
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
          onView={handleView}
        />

        {/* Unit Details Modal */}
        {showDetails && selectedUnit && (
          <UnitDetails
            unit={selectedUnit}
            onClose={handleCloseDetails}
          />
        )}
      </div>
    </div>
  )
}
