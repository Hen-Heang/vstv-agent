'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import * as Dialog from '@radix-ui/react-dialog'
import { Button } from '@/components/ui/button'
import { cn } from '@/utils/cn'
import { Icons } from '@/components/shared/icons'
import { getCallHref, getTelegramHref, siteConfig } from '@/config/site'

const marketingNavigation = [
  { name: 'Home', href: '/' },
  { name: 'Our Services', href: '/services' },
  { name: 'Agents', href: '/agents' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

const listingsNavigation = [
  { name: 'Properties', href: '/properties' },
  { name: 'Units', href: '/units' },
]


export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const navigation = siteConfig.featureFlags.listings
    ? [...marketingNavigation.slice(0, 1), ...listingsNavigation, ...marketingNavigation.slice(1)]
    : marketingNavigation

  // Close the mobile menu on route change (prevents it staying open after navigation)
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  // Close the mobile menu when switching to desktop breakpoint
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)') // Tailwind `lg`

    const handleChange = () => {
      if (mediaQuery.matches) setMobileMenuOpen(false)
    }

    handleChange()

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  return (
    <header className={cn(
      "sticky top-0 z-50 transition-all duration-500 ease-out motion-reduce:transition-none",
      scrolled 
        ? "bg-white/90 backdrop-blur-xl shadow-xl shadow-gray-900/5 border-b border-white/20" 
        : "bg-white/95 backdrop-blur-sm shadow-md shadow-gray-900/10"
    )}>
      <Dialog.Root open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-3 py-2 sm:px-4 sm:py-3 lg:px-8 lg:py-4" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="group flex items-center space-x-3 sm:space-x-4 transition-all duration-300 ease-out hover:scale-[1.02] active:scale-[0.98] motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:active:scale-100">
            <span className="sr-only">{siteConfig.companyName}</span>
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="relative h-9 w-11 sm:h-11 sm:w-16 rounded-xl overflow-hidden bg-gradient-to-br from-brand-secondary-50 via-brand-secondary-100 to-brand-secondary-200 p-1.5 shadow-lg group-hover:shadow-xl group-hover:shadow-brand-secondary-200/50 transition-all duration-300 ring-1 ring-brand-secondary-200/50 group-hover:ring-brand-secondary-300/70">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                <Image
                  src="/images/company/VSTV.png"
                  alt="VSTV Agent Logo"
                  width={64}
                  height={44}
                  className="relative w-full h-full object-contain drop-shadow-sm"
                  onError={(e) => {
                    console.error('VSTV logo failed to load:', e);
                    // Show fallback text logo
                    e.currentTarget.style.display = 'none';
                    const fallback = document.createElement('div');
                    fallback.className = 'flex items-center justify-center w-full h-full text-xs font-bold text-brand-primary-600';
                    fallback.textContent = 'VSTV';
                    e.currentTarget.parentElement?.appendChild(fallback);
                  }}
                  onLoad={() => {
                    console.log('VSTV logo loaded successfully');
                  }}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-lg lg:text-xl font-bold text-brand-text-primary group-hover:text-brand-primary-600 transition-colors duration-300 tracking-tight">{siteConfig.companyName}</span>
                <span className="text-xs font-medium text-brand-text-secondary group-hover:text-brand-text-primary -mt-0.5 hidden sm:block tracking-wide uppercase transition-colors duration-300">Real Estate</span>
              </div>
            </div>
          </Link>
        </div>
        
        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <Dialog.Trigger asChild>
            <button
              type="button"
              className="inline-flex items-center justify-center p-3 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 bg-white border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 motion-reduce:transition-none motion-reduce:hover:scale-100"
              aria-label="Open main menu"
              style={{ minWidth: '56px', minHeight: '56px' }}
            >
              <span className="sr-only">Open main menu</span>
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </Dialog.Trigger>
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
            <Link href={getCallHref()} className="flex items-center gap-1.5 lg:gap-2">
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
            <Link href={getTelegramHref(siteConfig.telegramPrefillBaseMessage)} className="flex items-center gap-1.5 lg:gap-2">
              <Icons.Telegram className="h-3.5 w-3.5 lg:h-4 lg:w-4 transition-transform duration-200 group-hover:scale-110" />
              <span className="hidden xl:inline">Telegram</span>
              <span className="xl:hidden">TG</span>
            </Link>
          </Button>
        </div>
      </nav>
      
      {/* Mobile menu */}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100000] bg-black/60 backdrop-blur-md" />
        <Dialog.Content className="fixed inset-y-0 right-0 z-[100001] w-full max-w-md bg-white shadow-2xl transition-transform duration-300 ease-in-out border-l-4 border-indigo-500 outline-none">
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between px-5 py-5 border-b-2 border-indigo-100 bg-gradient-to-r from-indigo-50 to-blue-50">
                <Link href="/" className="flex items-center space-x-4" onClick={() => setMobileMenuOpen(false)}>
                  <div className="relative h-10 w-10 rounded-xl overflow-hidden bg-gradient-to-br from-indigo-100 to-blue-100 p-2 shadow-lg">
                    <Image
                      src="/images/company/VSTV.png"
                      alt="VSTV Agent Logo"
                      width={48}
                      height={48}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-bold text-gray-900">{siteConfig.companyName}</span>
                    <span className="text-sm text-indigo-600 font-semibold uppercase tracking-wide">Real Estate</span>
                  </div>
                </Link>
                <Dialog.Close asChild>
                  <button
                    type="button"
                    className="rounded-xl p-3 text-gray-400 hover:text-gray-600 hover:bg-white hover:shadow-lg transition-all duration-200 hover:scale-110"
                  >
                    <span className="sr-only">Close menu</span>
                    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </Dialog.Close>
              </div>
              
              <div className="flex-1 overflow-y-auto py-4 bg-white">
                {/* Mobile Menu Header */}
                <div className="px-5 mb-4">
                  <h2 className="text-lg font-bold text-gray-900 mb-2">Navigation</h2>
                  <p className="text-sm text-gray-600">Choose your destination</p>
                </div>
                
                <nav className="space-y-2 px-5">
                  {navigation.map((item, index) => {
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`group block rounded-xl px-5 py-4 text-lg font-semibold transition-all duration-200 min-h-[56px] flex items-center shadow-sm hover:shadow-lg hover:scale-[1.01] ${
                          isActive 
                            ? 'bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-700 border-l-4 border-indigo-500 shadow-md' 
                            : 'text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 hover:text-gray-900 hover:border-l-4 hover:border-indigo-300'
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <div className="flex-1 flex items-center">
                          <span className="flex-1">{item.name}</span>
                          <div className={`w-2 h-2 rounded-full transition-all duration-200 ${
                            isActive ? 'bg-indigo-500' : 'bg-gray-300 group-hover:bg-indigo-400'
                          }`} />
                        </div>
                        <svg className="h-5 w-5 ml-3 opacity-50 group-hover:opacity-100 transition-opacity hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    )
                  })}
                </nav>
                
                <div className="mt-6 px-5 space-y-4">
                  <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-4 mb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Get in Touch</h3>
                    <p className="text-sm text-gray-600">Ready to find your dream property?</p>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full min-h-[56px] text-lg font-bold border-2 border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50" 
                    asChild
                  >
                    <Link href={getCallHref()} className="flex items-center justify-center gap-4">
                      <div className="p-2 bg-indigo-100 rounded-full">
                        <svg className="h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <span>Call Us Now</span>
                    </Link>
                  </Button>
                  
                  <Button 
                    className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 min-h-[56px] text-lg font-bold shadow-lg hover:shadow-xl" 
                    asChild
                  >
                    <Link href={getTelegramHref(siteConfig.telegramPrefillBaseMessage)} className="flex items-center justify-center gap-4">
                      <div className="p-2 bg-white/20 rounded-full">
                        <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                        </svg>
                      </div>
                      <span>Contact on Telegram</span>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </Dialog.Content>
      </Dialog.Portal>
      </Dialog.Root>
    </header>
  )
}

