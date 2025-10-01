'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { cn } from '@/utils/cn'
import { Icons } from '@/components/shared/icons'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Properties', href: '/properties' },
  { name: 'Units', href: '/units' },
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
      "sticky top-0 z-50 transition-all duration-500 ease-out",
      scrolled 
        ? "bg-white/90 backdrop-blur-xl shadow-xl shadow-gray-900/5 border-b border-white/20" 
        : "bg-white/95 backdrop-blur-sm shadow-md shadow-gray-900/10"
    )}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-3 py-2 sm:px-4 sm:py-3 lg:px-8 lg:py-4" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="group flex items-center space-x-3 sm:space-x-4 transition-all duration-300 ease-out hover:scale-[1.02] active:scale-[0.98]">
            <span className="sr-only">VSTV Agent</span>
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="relative h-9 w-11 sm:h-11 sm:w-16 rounded-xl overflow-hidden bg-gradient-to-br from-brand-secondary-50 via-brand-secondary-100 to-brand-secondary-200 p-1.5 shadow-lg group-hover:shadow-xl group-hover:shadow-brand-secondary-200/50 transition-all duration-300 ring-1 ring-brand-secondary-200/50 group-hover:ring-brand-secondary-300/70">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                <Image
                  src="/images/company/VSTV.png"
                  alt="VSTV Agent Logo"
                  width={64}
                  height={44}
                  className="relative w-full h-full object-contain drop-shadow-sm"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-lg lg:text-xl font-bold text-brand-text-primary group-hover:text-brand-primary-600 transition-colors duration-300 tracking-tight">VSTV Agent</span>
                <span className="text-xs font-medium text-brand-text-secondary group-hover:text-brand-text-primary -mt-0.5 hidden sm:block tracking-wide uppercase transition-colors duration-300">Real Estate</span>
              </div>
            </div>
          </Link>
        </div>
        
        <div className="flex lg:hidden">
          <button
            type="button"
            className="relative inline-flex items-center justify-center rounded-xl p-2.5 text-brand-text-primary bg-brand-neutral-50/80 hover:bg-brand-primary-50 hover:text-brand-primary-600 transition-all duration-300 shadow-sm hover:shadow-md ring-1 ring-brand-neutral-200/50 hover:ring-brand-primary-200/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Icons.Menu className="h-6 w-6 transition-transform duration-200 group-hover:scale-110" aria-hidden="true" />
          </button>
        </div>
        
        <div className="hidden lg:flex lg:gap-x-2 xl:gap-x-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "relative px-3 py-2 text-sm font-semibold leading-6 transition-all duration-300 ease-out group whitespace-nowrap rounded-xl",
                  isActive 
                    ? "text-brand-primary-600 bg-brand-primary-50/80 shadow-sm backdrop-blur-sm" 
                    : "text-brand-text-primary hover:text-brand-primary-600 hover:bg-brand-primary-50/50 hover:backdrop-blur-sm hover:shadow-sm"
                )}
              >
                <span className="relative z-10">{item.name}</span>
                {isActive && (
                  <span className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-gradient-to-r from-brand-primary-500 to-brand-primary-600 rounded-full shadow-sm"></span>
                )}
                <span className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-gradient-to-r from-brand-primary-500 to-brand-primary-600 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out shadow-sm"></span>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-brand-primary-500/5 to-brand-primary-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            )
          })}
        </div>
        
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-3 lg:items-center">
          {/* Agent Image */}
       
          
          <Button 
            variant="outline" 
            size="sm" 
            asChild
            className="relative border-gray-200/80 bg-white/50 backdrop-blur-sm hover:border-brand-primary-300/80 hover:text-brand-primary-600 hover:bg-brand-primary-50/80 transition-all duration-300 text-xs lg:text-sm shadow-sm hover:shadow-md font-semibold ring-1 ring-gray-200/20 hover:ring-brand-primary-200/50 rounded-xl"
          >
            <Link href="tel:+85598261807" className="flex items-center gap-1.5 lg:gap-2">
              <Icons.Phone className="h-3.5 w-3.5 lg:h-4 lg:w-4 transition-transform duration-200 group-hover:scale-110" />
              <span className="hidden xl:inline">Call Us</span>
              <span className="xl:hidden">Call</span>
            </Link>
          </Button>
          <Button 
            size="sm" 
            asChild
            className="relative bg-gradient-to-r from-brand-primary-500 to-brand-primary-600 hover:from-brand-primary-600 hover:to-brand-primary-700 shadow-lg hover:shadow-xl hover:shadow-brand-primary-500/25 transition-all duration-300 text-xs lg:text-sm font-semibold rounded-xl ring-1 ring-brand-primary-500/20 hover:ring-brand-primary-600/30 backdrop-blur-sm"
          >
            <Link href="https://t.me/assistant_vstv168" className="flex items-center gap-1.5 lg:gap-2">
              <Icons.Telegram className="h-3.5 w-3.5 lg:h-4 lg:w-4 transition-transform duration-200 group-hover:scale-110" />
              <span className="hidden xl:inline">Telegram</span>
              <span className="xl:hidden">TG</span>
            </Link>
          </Button>
        </div>
      </nav>
      
      {/* Mobile menu */}
      <div className={cn("lg:hidden", mobileMenuOpen ? "block" : "hidden")}>
        <div className="fixed inset-0 z-50 bg-brand-secondary-900/40 backdrop-blur-md transition-all duration-300" onClick={() => setMobileMenuOpen(false)} />
        <div className="fixed inset-y-0 right-0 z-50 w-full max-w-xs sm:max-w-sm overflow-y-auto bg-white/95 backdrop-blur-xl px-3 py-4 sm:px-6 sm:py-6 shadow-2xl shadow-brand-secondary-900/20 border-l border-white/20">
          <div className="flex items-center justify-between mb-6 sm:mb-8 pb-4 border-b border-gray-100/80">
            <Link href="/" className="flex items-center space-x-3 sm:space-x-4 group" onClick={() => setMobileMenuOpen(false)}>
              <span className="sr-only">VSTV Agent</span>
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="relative h-9 w-11 sm:h-11 sm:w-16 rounded-xl overflow-hidden bg-gradient-to-br from-brand-secondary-50 via-brand-secondary-100 to-brand-secondary-200 p-1.5 shadow-lg group-hover:shadow-xl group-hover:shadow-brand-secondary-200/50 transition-all duration-300 ring-1 ring-brand-secondary-200/50">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-60"></div>
                  <Image
                    src="/images/company/VSTV.png"
                    alt="VSTV Agent Logo"
                    width={64}
                    height={44}
                    className="relative w-full h-full object-contain drop-shadow-sm"
                  />
                </div>
                <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-bold text-brand-text-primary group-hover:text-brand-primary-600 transition-colors duration-300 tracking-tight">VSTV Agent</span>
                <span className="text-xs font-medium text-brand-text-secondary -mt-0.5 tracking-wide uppercase">Real Estate</span>
                </div>
              </div>
            </Link>
            <button
              type="button"
              className="rounded-xl p-2.5 text-brand-text-primary bg-brand-neutral-50/80 hover:bg-brand-primary-50 hover:text-brand-primary-600 transition-all duration-300 shadow-sm hover:shadow-md ring-1 ring-brand-neutral-200/50 hover:ring-brand-primary-200/50"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <Icons.X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="flow-root">
            <div className="space-y-2">
              {navigation.map((item, index) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "group block rounded-xl px-4 py-4 text-base font-semibold transition-all duration-300 relative overflow-hidden",
                      isActive 
                        ? "bg-gradient-to-r from-brand-primary-50 to-brand-primary-50/80 text-brand-primary-600 border-l-4 border-brand-primary-500 shadow-sm ring-1 ring-brand-primary-100" 
                        : "text-brand-text-primary hover:bg-gradient-to-r hover:from-brand-neutral-50 hover:to-brand-neutral-50/80 hover:text-brand-primary-600 hover:shadow-sm hover:ring-1 hover:ring-brand-neutral-100"
                    )}
                    style={{ animationDelay: `${index * 50}ms` }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="relative z-10 flex items-center justify-between">
                      <span>{item.name}</span>
                      {isActive && (
                        <div className="w-2 h-2 rounded-full bg-brand-primary-500 shadow-sm"></div>
                      )}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-primary-500/5 to-brand-primary-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                )
              })}
            </div>
            <div className="mt-8 pt-6 border-t border-gray-100/80 space-y-4">
              <Button 
                variant="outline" 
                className="w-full h-12 border-brand-neutral-200/80 bg-white/50 backdrop-blur-sm hover:border-brand-primary-300/80 hover:text-brand-primary-600 hover:bg-brand-primary-50/80 transition-all duration-300 shadow-sm hover:shadow-md font-semibold ring-1 ring-brand-neutral-200/20 hover:ring-brand-primary-200/50 rounded-xl" 
                asChild
              >
                <Link href="tel:+85598261807" className="flex items-center justify-center gap-3">
                  <Icons.Phone className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                  <span className="font-semibold">Call Us Now</span>
                </Link>
              </Button>
              <Button 
                className="w-full h-12 bg-gradient-to-r from-brand-primary-500 to-brand-primary-600 hover:from-brand-primary-600 hover:to-brand-primary-700 shadow-lg hover:shadow-xl hover:shadow-brand-primary-500/25 transition-all duration-300 font-semibold rounded-xl ring-1 ring-brand-primary-500/20 hover:ring-brand-primary-600/30" 
                asChild
              >
                <Link href="https://t.me/assistant_vstv168" className="flex items-center justify-center gap-3">
                  <Icons.Telegram className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                  <span className="font-semibold">Contact on Telegram</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

