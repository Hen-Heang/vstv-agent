/**
 * Reusable UI patterns and common component utilities
 */

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Icons } from './icons'

// Loading states
export const LoadingSpinner = ({ size = 'default' }: { size?: 'sm' | 'default' | 'lg' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    default: 'h-6 w-6',
    lg: 'h-8 w-8'
  }

  return (
    <div className={`animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 ${sizeClasses[size]}`} />
  )
}

export const LoadingSkeleton = ({ className = '' }: { className?: string }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
)

// Empty states
export const EmptyState = ({ 
  icon: Icon, 
  title, 
  description, 
  action 
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  action?: React.ReactNode
}) => (
  <div className="text-center py-12">
    <Icon className="mx-auto h-12 w-12 text-gray-400" />
    <h3 className="mt-2 text-sm font-medium text-gray-900">{title}</h3>
    <p className="mt-1 text-sm text-gray-500">{description}</p>
    {action && <div className="mt-6">{action}</div>}
  </div>
)

// Status indicators
export const StatusBadge = ({ 
  status, 
  className = '' 
}: { 
  status: string
  className?: string 
}) => {
  const getStatusConfig = (status: string) => {
    const configs: Record<string, { color: string; text: string }> = {
      available: { color: 'bg-green-100 text-green-800', text: 'Available' },
      occupied: { color: 'bg-red-100 text-red-800', text: 'Occupied' },
      maintenance: { color: 'bg-yellow-100 text-yellow-800', text: 'Maintenance' },
      pending: { color: 'bg-blue-100 text-blue-800', text: 'Pending' },
      sold: { color: 'bg-gray-100 text-gray-800', text: 'Sold' },
      rented: { color: 'bg-purple-100 text-purple-800', text: 'Rented' },
      active: { color: 'bg-green-100 text-green-800', text: 'Active' },
      inactive: { color: 'bg-gray-100 text-gray-800', text: 'Inactive' }
    }
    
    return configs[status.toLowerCase()] || { color: 'bg-gray-100 text-gray-800', text: status }
  }

  const config = getStatusConfig(status)

  return (
    <Badge className={`${config.color} ${className}`}>
      {config.text}
    </Badge>
  )
}

// Action buttons
export const ActionButton = ({ 
  icon: Icon, 
  label, 
  onClick, 
  variant = 'outline',
  size = 'sm',
  className = ''
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  onClick: () => void
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'sm' | 'default' | 'lg'
  className?: string
}) => (
  <Button
    variant={variant}
    size={size}
    onClick={onClick}
    className={`flex items-center gap-2 ${className}`}
  >
    <Icon className="h-4 w-4" />
    {label}
  </Button>
)

// Modal/Dialog wrapper
export const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'default' 
}: {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  size?: 'sm' | 'default' | 'lg' | 'xl'
}) => {
  const sizeClasses = {
    sm: 'max-w-md',
    default: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className={`bg-white rounded-lg shadow-xl w-full ${sizeClasses[size]}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-lg font-semibold">{title}</h2>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <Icons.X className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-6">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Confirmation dialog
export const ConfirmDialog = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'default'
}: {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  variant?: 'default' | 'danger'
}) => (
  <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
    <div className="space-y-4">
      <p className="text-gray-600">{message}</p>
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={onClose}>
          {cancelText}
        </Button>
        <Button 
          variant={variant === 'danger' ? 'destructive' : 'default'}
          onClick={() => {
            onConfirm()
            onClose()
          }}
        >
          {confirmText}
        </Button>
      </div>
    </div>
  </Modal>
)

// Data table row actions
export const RowActions = ({ 
  onEdit, 
  onDelete, 
  onView,
  showEdit = true,
  showDelete = true,
  showView = true
}: {
  onEdit?: () => void
  onDelete?: () => void
  onView?: () => void
  showEdit?: boolean
  showDelete?: boolean
  showView?: boolean
}) => (
  <div className="flex items-center gap-2">
    {showView && onView && (
      <ActionButton
        icon={Icons.Search}
        label="View"
        onClick={onView}
        variant="ghost"
        size="sm"
      />
    )}
    {showEdit && onEdit && (
      <ActionButton
        icon={Icons.Search} // Replace with edit icon
        label="Edit"
        onClick={onEdit}
        variant="ghost"
        size="sm"
      />
    )}
    {showDelete && onDelete && (
      <ActionButton
        icon={Icons.X}
        label="Delete"
        onClick={onDelete}
        variant="ghost"
        size="sm"
        className="text-red-600 hover:text-red-700"
      />
    )}
  </div>
)

// Search and filter bar
export const SearchBar = ({ 
  value, 
  onChange, 
  placeholder = 'Search...',
  onClear,
  className = ''
}: {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  onClear?: () => void
  className?: string
}) => (
  <div className={`relative ${className}`}>
    <Icons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
    {value && onClear && (
      <button
        onClick={onClear}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
      >
        <Icons.X className="h-4 w-4" />
      </button>
    )}
  </div>
)

// Pagination component
export const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  showInfo = true
}: {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  showInfo?: boolean
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  const visiblePages = pages.slice(
    Math.max(0, currentPage - 2),
    Math.min(totalPages, currentPage + 3)
  )

  return (
    <div className="flex items-center justify-between">
      {showInfo && (
        <div className="text-sm text-gray-700">
          Page {currentPage} of {totalPages}
        </div>
      )}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <Icons.ArrowLeft className="h-4 w-4" />
        </Button>
        
        {visiblePages.map((page) => (
          <Button
            key={page}
            variant={page === currentPage ? 'default' : 'outline'}
            size="sm"
            onClick={() => onPageChange(page)}
          >
            {page}
          </Button>
        ))}
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <Icons.ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

// Form field wrapper
export const FormFieldComponent = ({ 
  label, 
  error, 
  required = false,
  children,
  className = ''
}: {
  label: string
  error?: string
  required?: boolean
  children: React.ReactNode
  className?: string
}) => (
  <div className={`space-y-2 ${className}`}>
    <label className="block text-sm font-medium text-gray-700">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    {children}
    {error && (
      <p className="text-sm text-red-600 flex items-center">
        <Icons.Alert className="h-4 w-4 mr-1" />
        {error}
      </p>
    )}
  </div>
)

// Stats card
export const StatsCard = ({ 
  title, 
  value, 
  change, 
  icon: Icon,
  trend = 'neutral'
}: {
  title: string
  value: string | number
  change?: string
  icon: React.ComponentType<{ className?: string }>
  trend?: 'up' | 'down' | 'neutral'
}) => {
  const trendColors = {
    up: 'text-green-600',
    down: 'text-red-600',
    neutral: 'text-gray-600'
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {change && (
              <p className={`text-sm ${trendColors[trend]}`}>
                {change}
              </p>
            )}
          </div>
          <Icon className="h-8 w-8 text-gray-400" />
        </div>
      </CardContent>
    </Card>
  )
}
