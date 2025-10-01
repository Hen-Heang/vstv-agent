'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  Search, 
  ArrowRight,
  Star
} from 'lucide-react'

const heroSlides = [
  {
    id: 1,
    title: "Find Your Dream Property in Cambodia",
    subtitle: "Discover premium condos, luxury apartments, and exclusive villas in Cambodia's most desirable locations with expert guidance.",
    backgroundImage: "/images/company/VSTV-BG.png",
    cta: "Explore Properties",
    ctaSecondary: "Contact Agent"
  },
  {
    id: 2,
    title: "Premium Properties in Prime Locations",
    subtitle: "From BKK1 luxury condos to Sen Sok family homes, find your perfect property with Cambodia's trusted real estate experts.",
    backgroundImage: "/images/properties/featured/luxury-condo-bkk1.jpg",
    cta: "View Listings",
    ctaSecondary: "Schedule Tour"
  },
  {
    id: 3,
    title: "Meet Our Expert Agents",
    subtitle: "Professional real estate agents with extensive experience in the Cambodian market. Let our experts guide you to your perfect property.",
    backgroundImage: "/images/agents/Heng-Rita.jpg",
    cta: "Meet Our Agents",
    ctaSecondary: "Contact Agent"
  },
  {
    id: 4,
    title: "Smart Real Estate Investments",
    subtitle: "Maximize your returns with strategic property investments. Expert guidance for both local and international investors.",
    backgroundImage: "/images/properties/featured/premium-villa-sen-sok.jpg",
    cta: "Investment Guide",
    ctaSecondary: "Free Consultation"
  },
  {
    id: 5,
    title: "VSTV Agent - Your Trusted Partner",
    subtitle: "Leading real estate agency in Cambodia with years of experience helping clients find their perfect properties.",
    backgroundImage: "/images/company/VSTV-BG.png",
    cta: "About Us",
    ctaSecondary: "Our Services"
  }
]

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [progress, setProgress] = useState(0)

  // Auto-advance slides with progress tracking
  useEffect(() => {
    if (!isAutoPlaying) {
      setProgress(0)
      return
    }

    const duration = 6000 // 6 seconds per slide
    const interval = 50 // Update every 50ms for smooth progress
    let startTime = Date.now()

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const newProgress = Math.min((elapsed / duration) * 100, 100)
      setProgress(newProgress)

      if (newProgress >= 100) {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
        setProgress(0)
        startTime = Date.now()
      }
    }, interval)

    return () => clearInterval(progressInterval)
  }, [isAutoPlaying, currentSlide])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        prevSlide()
      } else if (event.key === 'ArrowRight') {
        nextSlide()
      } else if (event.key === ' ') {
        event.preventDefault()
        setIsAutoPlaying(!isAutoPlaying)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isAutoPlaying])

  return (
    <section 
      className="relative min-h-screen overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background Images with Slideshow */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={heroSlides[currentSlide].backgroundImage}
              alt={heroSlides[currentSlide].title}
              fill
              className="object-cover"
              priority={currentSlide === 0}
              quality={90}
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/60" />
            {/* Gradient Overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex items-center min-h-screen">
        <div className="container mx-auto px-3 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                  {heroSlides[currentSlide].title}
                </h1>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-brand-neutral-200 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-2">
                  {heroSlides[currentSlide].subtitle}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12 px-4"
            >
              <Button
                size="lg"
                asChild
                className="bg-brand-primary-600 hover:bg-brand-primary-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 w-full sm:w-auto"
              >
                <Link 
                  href={heroSlides[currentSlide].title === "Meet Our Expert Agents" ? "/agents" : "/properties"} 
                  className="flex items-center gap-2"
                >
                  <Search className="h-5 w-5" />
                  {heroSlides[currentSlide].cta}
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-105 w-full sm:w-auto"
              >
                <Link 
                  href={heroSlides[currentSlide].title === "Meet Our Expert Agents" ? "/agents/008" : "/contact"} 
                  className="flex items-center gap-2"
                >
                  <Star className="h-5 w-5" />
                  {heroSlides[currentSlide].ctaSecondary}
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Slide Navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4 z-30">
        {/* Previous Button */}
        <button
          onClick={prevSlide}
          className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 backdrop-blur-sm"
          aria-label="Previous slide"
        >
          <ArrowRight className="h-4 w-4 rotate-180 text-white" />
        </button>

        {/* Slide Indicators */}
        <div className="flex items-center gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="relative w-3 h-3 rounded-full transition-all duration-300 group"
              aria-label={`Go to slide ${index + 1}`}
            >
              <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/70'
              }`} />
              {index === currentSlide && isAutoPlaying && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-white"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: progress / 100 }}
                  transition={{ duration: 0.1 }}
                  style={{ transformOrigin: 'left' }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 backdrop-blur-sm"
          aria-label="Next slide"
        >
          <ArrowRight className="h-4 w-4 text-white" />
        </button>

        {/* Auto-play Toggle */}
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 backdrop-blur-sm ml-2"
          aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
        >
          {isAutoPlaying ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
            </motion.div>
          ) : (
            <ArrowRight className="h-4 w-4 text-white" />
          )}
        </button>
      </div>

      {/* Properties Counter */}
      <div className="absolute top-8 right-8 z-30">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
        >
          <div className="text-sm text-blue-100 mb-1">Properties Available</div>
          <div className="text-2xl font-bold text-white">1,247</div>
          <div className="text-xs text-blue-200">Updated daily</div>
        </motion.div>
      </div>
    </section>
  )
}