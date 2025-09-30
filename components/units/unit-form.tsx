'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { X, Save, Edit } from 'lucide-react'

interface Unit {
  id?: string
  unitNo: string
  price: number
  roomType: string
  handleBy: string
  remarks?: string
  status: string
}

interface UnitFormProps {
  unit?: Unit
  onSave: (unit: Unit) => void
  onCancel: () => void
  isEditing?: boolean
}

export default function UnitForm({ unit, onSave, onCancel, isEditing = false }: UnitFormProps) {
  const [formData, setFormData] = useState<Unit>({
    unitNo: unit?.unitNo || '',
    price: unit?.price || 0,
    roomType: unit?.roomType || '',
    handleBy: unit?.handleBy || '',
    remarks: unit?.remarks || '',
    status: unit?.status || 'available'
  })

  const [errors, setErrors] = useState<Partial<Record<keyof Unit, string>>>({})

  const validateForm = () => {
    const newErrors: Partial<Record<keyof Unit, string>> = {}
    
    if (!formData.unitNo.trim()) {
      newErrors.unitNo = 'Unit number is required'
    }
    if (!formData.price || formData.price <= 0) {
      newErrors.price = 'Price must be greater than 0'
    }
    if (!formData.roomType.trim()) {
      newErrors.roomType = 'Room type is required'
    }
    if (!formData.handleBy.trim()) {
      newErrors.handleBy = 'Handle by is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSave(formData)
    }
  }

  const handleChange = (field: keyof Unit, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">
          {isEditing ? 'Edit Unit' : 'Add New Unit'}
        </h2>
        <Button variant="outline" size="sm" onClick={onCancel}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Unit Number *</label>
            <Input
              value={formData.unitNo}
              onChange={(e) => handleChange('unitNo', e.target.value)}
              placeholder="e.g., ANATA/1212B, Morgan/3317"
              className={errors.unitNo ? 'border-red-500' : ''}
            />
            {errors.unitNo && <p className="text-red-500 text-sm mt-1">{errors.unitNo}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Price (USD) *</label>
            <Input
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => handleChange('price', parseFloat(e.target.value) || 0)}
              placeholder="e.g., 400.00"
              className={errors.price ? 'border-red-500' : ''}
            />
            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Room Type *</label>
            <Input
              value={formData.roomType}
              onChange={(e) => handleChange('roomType', e.target.value)}
              placeholder="e.g., Studio Room, One bedroom, Two bedroom"
              className={errors.roomType ? 'border-red-500' : ''}
            />
            {errors.roomType && <p className="text-red-500 text-sm mt-1">{errors.roomType}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Handle By *</label>
            <Input
              value={formData.handleBy}
              onChange={(e) => handleChange('handleBy', e.target.value)}
              placeholder="e.g., Rita, KA, Sale006 VSTV"
              className={errors.handleBy ? 'border-red-500' : ''}
            />
            {errors.handleBy && <p className="text-red-500 text-sm mt-1">{errors.handleBy}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => handleChange('status', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="available">Available</option>
              <option value="sold">Sold</option>
              <option value="rented">Rented</option>
              <option value="negotiate">Negotiate</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Remarks / Notes</label>
            <textarea
              value={formData.remarks}
              onChange={(e) => handleChange('remarks', e.target.value)}
              placeholder="e.g., Floor 5, Available 18.08.2025, Negotiate"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-20 resize-none"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            {isEditing ? (
              <>
                <Edit className="h-4 w-4 mr-2" />
                Update Unit
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Unit
              </>
            )}
          </Button>
        </div>
      </form>
    </Card>
  )
}
