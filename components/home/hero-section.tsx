'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  Search, 
  ArrowRight,
  Star
} from 'lucide-react'

interface HeroSlide {
  id: string
  title: string
  subtitle: string
  background_image: string
  backgroundImage?: string // For backward compatibility
  cta: string
  cta_secondary: string
  ctaSecondary?: string // For backward compatibility
  cta_link?: string
  ctaLink?: string // For backward compatibility
  cta_secondary_link?: string
  ctaSecondaryLink?: string // For backward compatibility
}

export default function HeroSection() {
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => Math.abs(offset) * velocity

  const backgroundVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
  }

  const contentVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
  }

  // Fetch hero slides from Supabase
  useEffect(() => {
    const fetchHeroSlides = async () => {
      try {
        const response = await fetch('/api/hero-slides')
        if (response.ok) {
          const slides = await response.json()
          setHeroSlides(slides)
        } else {
          console.error('Failed to fetch hero slides from API')
          setHeroSlides([])
        }
      } catch (error) {
        console.error('Error fetching hero slides:', error)
        setHeroSlides([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchHeroSlides()
  }, [])

  // Auto-advance slides with progress tracking
  useEffect(() => {
    if (!isAutoPlaying || heroSlides.length === 0) {
      setProgress(0)
      return
    }

    const duration = 9000 // 9 seconds per slide
    const interval = 50 // Update every 50ms for smooth progress
    let startTime = Date.now()

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const newProgress = Math.min((elapsed / duration) * 100, 100)
      setProgress(newProgress)

      if (newProgress >= 100) {
        setDirection(1)
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
        setProgress(0)
        startTime = Date.now()
      }
    }, interval)

    return () => clearInterval(progressInterval)
  }, [isAutoPlaying, currentSlide, heroSlides.length])

  const nextSlide = useCallback(() => {
    if (heroSlides.length > 0) {
      setDirection(1)
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }
  }, [heroSlides.length])

  const prevSlide = useCallback(() => {
    if (heroSlides.length > 0) {
      setDirection(-1)
      setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
    }
  }, [heroSlides.length])

  const goToSlide = (index: number) => {
    if (index >= 0 && index < heroSlides.length) {
      setDirection(index > currentSlide ? 1 : -1)
      setCurrentSlide(index)
    }
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
  }, [isAutoPlaying, nextSlide, prevSlide])

  // Show loading state
  if (isLoading) {
    return (
      <section className="relative min-h-screen overflow-hidden bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </section>
    )
  }

  // Show empty state if no slides
  if (heroSlides.length === 0) {
    return (
      <section className="relative min-h-screen overflow-hidden bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Welcome to VSTV Agent</h1>
          <p className="text-gray-600">Your trusted real estate partner in Cambodia</p>
        </div>
      </section>
    )
  }

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
            custom={direction}
            variants={backgroundVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 180, damping: 26 },
              opacity: { duration: 0.35 },
            }}
            className="absolute inset-0"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            dragDirectionLock
            style={{ touchAction: 'pan-y' }}
            onDragEnd={(_, info) => {
              const swipe = swipePower(info.offset.x, info.velocity.x)
              if (swipe < -swipeConfidenceThreshold) nextSlide()
              else if (swipe > swipeConfidenceThreshold) prevSlide()
            }}
          >
            <Image
              src={heroSlides[currentSlide].background_image || heroSlides[currentSlide].backgroundImage || '/images/company/VSTV-BG.png'}
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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                custom={direction}
                variants={contentVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
              >
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 sm:mb-4 md:mb-6 leading-tight px-2 text-balance">
                  {heroSlides[currentSlide].title}
                </h1>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-brand-neutral-200 mb-4 sm:mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed px-4 text-balance">
                  {heroSlides[currentSlide].subtitle}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-6 sm:mb-8 md:mb-12 px-4"
            >
              <Button
                size="lg"
                asChild
                className="bg-brand-primary-600 hover:bg-brand-primary-700 text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 w-full sm:w-auto min-h-[48px] touch-manipulation"
              >
                <Link 
                  href={heroSlides[currentSlide].cta_link || heroSlides[currentSlide].ctaLink || "/properties"} 
                  className="flex items-center justify-center gap-2"
                >
                  <Search className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="truncate">{heroSlides[currentSlide].cta}</span>
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg font-semibold rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-105 w-full sm:w-auto min-h-[48px] touch-manipulation"
              >
                <Link 
                  href={heroSlides[currentSlide].cta_secondary_link || heroSlides[currentSlide].ctaSecondaryLink || "/contact"} 
                  className="flex items-center justify-center gap-2"
                >
                  <Star className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="truncate">{heroSlides[currentSlide].cta_secondary || heroSlides[currentSlide].ctaSecondary}</span>
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Slide Navigation */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-2 sm:gap-4 z-30 px-4">
        {/* Previous Button */}
        <button
          onClick={prevSlide}
          className="p-2 sm:p-3 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 backdrop-blur-sm min-h-[40px] min-w-[40px] sm:min-h-[44px] sm:min-w-[44px]"
          aria-label="Previous slide"
        >
          <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 rotate-180 text-white" />
        </button>

        {/* Slide Indicators */}
        <div className="flex items-center gap-1 sm:gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="relative w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 group"
              aria-label={`Go to slide ${index + 1}`}
            >
              <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/70'
              }`} />
              {index === currentSlide && isAutoPlaying && (
                <motion.div
                  className="absolute inset-0 rounded-full border border-white"
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
          className="p-2 sm:p-3 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 backdrop-blur-sm min-h-[40px] min-w-[40px] sm:min-h-[44px] sm:min-w-[44px]"
          aria-label="Next slide"
        >
          <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
        </button>

        {/* Auto-play Toggle */}
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="p-2 sm:p-3 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 backdrop-blur-sm ml-1 sm:ml-2 min-h-[40px] min-w-[40px] sm:min-h-[44px] sm:min-w-[44px]"
          aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
        >
          {isAutoPlaying ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full" />
            </motion.div>
          ) : (
            <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
          )}
        </button>
      </div>

      {/* Properties Counter */}
      {/* <div className="absolute top-4 right-4 sm:top-8 sm:right-8 z-30">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20"
        >
          <div className="text-xs sm:text-sm text-blue-100 mb-1">Properties Available</div>
          <div className="text-lg sm:text-xl md:text-2xl font-bold text-white">1,247</div>
          <div className="text-xs text-blue-200">Updated daily</div>
        </motion.div>
      </div> */}
    </section>
  )
}
