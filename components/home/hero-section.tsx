import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Search, MapPin, DollarSign, Bed } from 'lucide-react'

export default function HeroSection() {
  return (
    <div className="relative bg-gradient-to-r from-brand-red-400 to-brand-red-600 text-white">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2073&q=80')"
        }}
      ></div>
      
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-6xl">
            Find Your Dream Condo & Apartment in Cambodia
          </h1>
          <p className="mt-4 text-base leading-7 text-red-100 sm:mt-6 sm:text-lg sm:leading-8">
            Trusted real estate agent for rental & sales. Expert guidance for your property investment journey.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:mt-10 sm:flex-row sm:gap-6">
            <Button size="lg" asChild className="w-full sm:w-auto">
              <Link href="/properties" className="flex items-center justify-center gap-2">
                <Search className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-sm sm:text-base">View Properties</span>
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="w-full sm:w-auto bg-white/10 border-white/20 text-white hover:bg-white/20">
              <Link href="/contact" className="flex items-center justify-center gap-2">
                <span className="text-sm sm:text-base">Contact an Agent</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Quick Search Bar */}
      <div className="relative -mt-12 mx-auto max-w-4xl px-4 sm:-mt-16 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-xl p-4 sm:p-6">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
            <div className="flex items-center space-x-2">
              <Search className="h-5 w-5 text-gray-400" />
              <select className="w-full border-0 text-sm font-medium text-gray-900 focus:ring-0">
                <option>Rent/Sale</option>
                <option>For Rent</option>
                <option>For Sale</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-gray-400" />
              <select className="w-full border-0 text-sm font-medium text-gray-900 focus:ring-0">
                <option>Location</option>
                <option>Phnom Penh</option>
                <option>Siem Reap</option>
                <option>Sihanoukville</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-gray-400" />
              <select className="w-full border-0 text-sm font-medium text-gray-900 focus:ring-0">
                <option>Price Range</option>
                <option>$500 - $1,000</option>
                <option>$1,000 - $2,000</option>
                <option>$2,000+</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <Bed className="h-5 w-5 text-gray-400" />
              <select className="w-full border-0 text-sm font-medium text-gray-900 focus:ring-0">
                <option>Bedrooms</option>
                <option>1 Bedroom</option>
                <option>2 Bedrooms</option>
                <option>3+ Bedrooms</option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            <Button className="w-full sm:w-auto">
              Search Properties
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

