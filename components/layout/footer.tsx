import Image from 'next/image'
import Link from 'next/link'
import type { ComponentType } from 'react'
import { Icons } from '@/components/shared/icons'
import { getCallHref, getTelegramHref, siteConfig } from '@/config/site'

const marketingNav = [
  { name: 'Home', href: '/' },
  { name: 'Our Services', href: '/services' },
  { name: 'Agents', href: '/agents' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

const listingsNav = [
  { name: 'Properties', href: '/properties' },
  { name: 'Units', href: '/units' },
]

export default function Footer() {
  const year = new Date().getFullYear()
  const nav = siteConfig.featureFlags.listings
    ? [...marketingNav.slice(0, 1), ...listingsNav, ...marketingNav.slice(1)]
    : marketingNav

  const socials = [
    siteConfig.social.facebook ? { name: 'Facebook', href: siteConfig.social.facebook, icon: Icons.Facebook } : null,
    siteConfig.social.tiktok ? { name: 'TikTok', href: siteConfig.social.tiktok, icon: Icons.MessageCircle } : null,
    siteConfig.social.khmer24 ? { name: 'Khmer24', href: siteConfig.social.khmer24, icon: Icons.MessageSquare } : null,
  ].filter(Boolean) as Array<{ name: string; href: string; icon: ComponentType<{ className?: string; size?: number }> }>

  return (
    <footer className="border-t border-black/5 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative h-10 w-14 overflow-hidden rounded-xl bg-brand-secondary-50 p-2 ring-1 ring-black/5">
                <Image
                  src="/images/company/VSTV.png"
                  alt={`${siteConfig.companyName} logo`}
                  width={56}
                  height={40}
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <div className="text-base font-bold text-gray-900">{siteConfig.companyName}</div>
                <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">Real Estate</div>
              </div>
            </Link>

            <p className="mt-4 text-sm leading-6 text-gray-600">
              Marketing-first real estate help in Cambodia. Message us your budget + area to get options quickly.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href={getTelegramHref(siteConfig.telegramPrefillBaseMessage)}
                className="inline-flex items-center gap-2 rounded-xl bg-[#229ED9] px-4 py-2 text-sm font-semibold text-white shadow-sm"
                aria-label="Chat on Telegram"
              >
                <Icons.Telegram className="h-4 w-4" />
                Telegram
              </a>
              <a
                href={getCallHref()}
                className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm"
                aria-label="Call us"
              >
                <Icons.Phone className="h-4 w-4 text-brand-primary-700" />
                Call
              </a>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <div className="text-sm font-semibold text-gray-900">Pages</div>
              <ul className="mt-4 space-y-2 text-sm">
                {nav.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-gray-600 hover:text-gray-900">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-sm font-semibold text-gray-900">Office Hours</div>
              <div className="mt-4 text-sm text-gray-600">
                {siteConfig.business.officeHours ?? 'Message anytime on Telegram.'}
              </div>
              <div className="mt-3 text-sm text-gray-600">
                Phone: <a href={getCallHref()} className="font-semibold text-gray-900">{siteConfig.phoneNumber}</a>
              </div>
            </div>

            {socials.length > 0 && (
              <div>
                <div className="text-sm font-semibold text-gray-900">Follow</div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {socials.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm"
                    >
                      <item.icon className="h-4 w-4" />
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-black/5 pt-6 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <div>&copy; {year} {siteConfig.companyName}. All rights reserved.</div>
          <div className="text-xs">Built for fast mobile conversion.</div>
        </div>
      </div>
    </footer>
  )
}
