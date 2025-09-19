'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { cn } from '@/utils/cn'
import { Menu, X, Phone, MessageCircle } from 'lucide-react'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Properties', href: '/properties' },
  { name: 'Our Services', href: '/services' },
  { name: 'Agents', href: '/agents' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={cn(
      "sticky top-0 z-50 transition-all duration-300",
      scrolled 
        ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100" 
        : "bg-white shadow-sm"
    )}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="group flex items-center space-x-2 sm:space-x-3 transition-transform duration-200 hover:scale-105">
            <span className="sr-only">VSTV Agent</span>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="h-8 w-10 sm:h-10 sm:w-14 rounded-lg overflow-hidden bg-gradient-to-br from-brand-gold-50 to-brand-gold-100 p-1 shadow-sm group-hover:shadow-md transition-shadow duration-200">
                <Image
                  src="/images/company/VSTV.png"
                  alt="VSTV Agent Logo"
                  width={56}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-brand-red-600 transition-colors duration-200">VSTV Agent</span>
                <span className="text-xs text-gray-500 -mt-1 hidden sm:block">Real Estate</span>
              </div>
            </div>
          </Link>
        </div>
        
        <div className="flex lg:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-2.5 text-gray-700 hover:bg-gray-100 hover:text-brand-red-600 transition-all duration-200"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        
        <div className="hidden lg:flex lg:gap-x-6 xl:gap-x-8">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "relative text-sm font-semibold leading-6 transition-all duration-200 group whitespace-nowrap",
                  isActive 
                    ? "text-brand-red-600" 
                    : "text-gray-700 hover:text-brand-red-600"
                )}
              >
                {item.name}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-red-600 rounded-full"></span>
                )}
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-red-600 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
              </Link>
            )
          })}
        </div>
        
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-2 xl:gap-x-3">
          <Button 
            variant="outline" 
            size="sm" 
            asChild
            className="border-gray-300 hover:border-brand-red-300 hover:text-brand-red-600 transition-all duration-200 text-xs lg:text-sm"
          >
            <Link href="tel:+85598261807" className="flex items-center gap-1 lg:gap-2">
              <Phone className="h-3 w-3 lg:h-4 lg:w-4" />
              <span className="hidden xl:inline">Call Us</span>
              <span className="xl:hidden">Call</span>
            </Link>
          </Button>
          <Button 
            size="sm" 
            asChild
            className="bg-brand-red-500 hover:bg-brand-red-600 shadow-sm hover:shadow-md transition-all duration-200 text-xs lg:text-sm"
          >
            <Link href="https://t.me/vsv168cambodia" className="flex items-center gap-1 lg:gap-2">
              <MessageCircle className="h-3 w-3 lg:h-4 lg:w-4" />
              <span className="hidden xl:inline">Telegram</span>
              <span className="xl:hidden">TG</span>
            </Link>
          </Button>
        </div>
      </nav>
      
      {/* Mobile menu */}
      <div className={cn("lg:hidden", mobileMenuOpen ? "block" : "hidden")}>
        <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
        <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-4 py-6 sm:px-6 sm:max-w-sm shadow-2xl">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <Link href="/" className="flex items-center space-x-2 sm:space-x-3" onClick={() => setMobileMenuOpen(false)}>
              <span className="sr-only">VSTV Agent</span>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="h-8 w-10 sm:h-10 sm:w-14 rounded-lg overflow-hidden bg-gradient-to-br from-brand-gold-50 to-brand-gold-100 p-1 shadow-sm">
                  <Image
                    src="/images/company/VSTV.png"
                    alt="VSTV Agent Logo"
                    width={56}
                    height={40}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg sm:text-xl font-bold text-gray-900">VSTV Agent</span>
                  <span className="text-xs text-gray-500 -mt-1">Real Estate</span>
                </div>
              </div>
            </Link>
            <button
              type="button"
              className="rounded-lg p-2.5 text-gray-700 hover:bg-gray-100 hover:text-brand-red-600 transition-all duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="flow-root">
            <div className="space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "block rounded-lg px-4 py-3 text-base font-semibold transition-all duration-200",
                      isActive 
                        ? "bg-brand-red-50 text-brand-red-600 border-l-4 border-brand-red-600" 
                        : "text-gray-900 hover:bg-gray-50 hover:text-brand-red-600"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              })}
            </div>
            <div className="mt-8 pt-6 border-t border-gray-200 space-y-3">
              <Button 
                variant="outline" 
                className="w-full border-gray-300 hover:border-brand-red-300 hover:text-brand-red-600 transition-all duration-200" 
                asChild
              >
                <Link href="tel:+85598261807" className="flex items-center justify-center gap-2">
                  <Phone className="h-4 w-4" />
                  Call Us
                </Link>
              </Button>
              <Button 
                className="w-full bg-brand-red-500 hover:bg-brand-red-600 shadow-sm hover:shadow-md transition-all duration-200" 
                asChild
              >
                <Link href="https://t.me/vsv168cambodia" className="flex items-center justify-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Telegram
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

