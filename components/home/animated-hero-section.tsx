'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Search, MapPin, DollarSign, Bed, ArrowRight, Play, Pause } from 'lucide-react'

const heroSlides = [
  {
    id: 1,
    title: "Find Your Dream Condo & Apartment in Cambodia",
    subtitle: "Trusted real estate agent for rental & sales. Expert guidance for your property investment journey.",
    backgroundImage: "/images/company/VSTV-BG.png",
    cta: "View Properties"
  },
  {
    id: 2,
    title: "Premium Properties in Prime Locations",
    subtitle: "Discover luxury condos, modern apartments, and exclusive villas in Cambodia's most desirable areas.",
    backgroundImage: "/images/properties/featured/luxury-condo-bkk1.jpg",
    cta: "Explore Now"
  },
  {
    id: 3,
    title: "Investment Opportunities Await",
    subtitle: "Smart real estate investments with expert guidance. Maximize your returns in Cambodia's growing market.",
    backgroundImage: "/images/properties/featured/premium-villa-sen-sok.jpg",
    cta: "Invest Today"
  }
]

export default function AnimatedHeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying)
  }

  return (
      <div className="relative bg-gradient-to-r from-black via-gray-900 to-yellow-700 text-white overflow-hidden">


      {/* Background Slides */}
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
              <div
                  key={slide.id}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                      index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{
                    backgroundImage: `url('${slide.backgroundImage}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    width: '100%',
                    height: '100%'
                  }}
              />
          ))}
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>


        {/* Slide Content */}
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <div className="transition-all duration-500 transform">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-6xl animate-in fade-in-50 slide-in-from-bottom-4">
              {heroSlides[currentSlide].title}
            </h1>
            <p className="mt-4 text-base leading-7 sm:mt-6 sm:text-lg sm:leading-8 text-blue-100 animate-in fade-in-50 slide-in-from-bottom-4 delay-200">
              {heroSlides[currentSlide].subtitle}
            </p>
          </div>
          
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:mt-10 sm:flex-row sm:gap-6 animate-in fade-in-50 slide-in-from-bottom-4 delay-300">
            <Button size="lg" asChild className="w-full sm:w-auto">
              <Link href="/properties" className="flex items-center justify-center gap-2">
                <Search className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-sm sm:text-base">{heroSlides[currentSlide].cta}</span>
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

      {/* Interactive Search Bar */}
      <div className="relative -mt-8 mx-auto max-w-4xl px-4 sm:-mt-12 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 animate-in fade-in-50 slide-in-from-bottom-4 delay-500">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center space-x-2">
              <Search className="h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search properties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border-0 text-sm font-medium text-gray-900 focus:ring-0 placeholder-gray-500"
              />
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
            <Button className="w-full sm:w-auto text-sm sm:text-base">
              Search Properties
            </Button>
          </div>
        </div>
      </div>

      {/* Slide Navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 sm:gap-4 sm:bottom-8">
        {/* Previous/Next Buttons */}
        <button
          onClick={prevSlide}
          className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
        >
          <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 rotate-180" />
        </button>

        {/* Slide Indicators */}
        <div className="flex gap-1 sm:gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white' : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
        >
          <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
        </button>

        {/* Auto-play Toggle */}
        <button
          onClick={toggleAutoPlay}
          className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors ml-2 sm:ml-4"
        >
          {isAutoPlaying ? (
            <Pause className="h-3 w-3 sm:h-4 sm:w-4" />
          ) : (
            <Play className="h-3 w-3 sm:h-4 sm:w-4" />
          )}
        </button>
      </div>
    </div>
  )
}

