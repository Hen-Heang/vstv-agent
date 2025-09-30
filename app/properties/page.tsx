import { Suspense } from 'react'
import PropertyFilters from '@/components/properties/property-filters'
import PropertyGrid from '@/components/properties/property-grid'
// import PropertySearch from '@/components/properties/property-search'
// import InteractiveMap from '@/components/ui/interactive-map'
// import PropertyComparison from '@/components/properties/property-comparison'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export const metadata = {
  title: 'Properties - VSTV Agent',
  description: 'Browse our extensive collection of properties for rent and sale in Cambodia',
}

function PropertyGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <Skeleton className="h-64 w-full" />
          <CardContent className="p-6">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-4" />
            <div className="flex space-x-4 mb-4">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
            </div>
            <Skeleton className="h-8 w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default function PropertiesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Properties
            </h1>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Find your perfect property from our extensive collection
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <PropertyFilters />
          </div>

          {/* Properties Grid */}
          <div className="lg:col-span-3">
            <Suspense fallback={<PropertyGridSkeleton />}>
              <PropertyGrid />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}

