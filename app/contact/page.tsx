import Link from 'next/link'
import type { ComponentType } from 'react'
import { Icons } from '@/components/shared/icons'
import { getCallHref, getTelegramHref, siteConfig } from '@/config/site'

export const metadata = {
  title: `Contact - ${siteConfig.companyName}`,
  description: `Contact ${siteConfig.companyName} via Telegram or phone call.`,
}

export default function ContactPage() {
  const social = [
    siteConfig.social.facebook ? { name: 'Facebook', href: siteConfig.social.facebook, icon: Icons.Facebook } : null,
    siteConfig.social.tiktok ? { name: 'TikTok', href: siteConfig.social.tiktok, icon: Icons.MessageCircle } : null,
    siteConfig.social.khmer24 ? { name: 'Khmer24', href: siteConfig.social.khmer24, icon: Icons.MessageSquare } : null,
  ].filter(Boolean) as Array<{ name: string; href: string; icon: ComponentType<{ className?: string; size?: number }> }>

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Contact {siteConfig.companyName}
          </h1>
          <p className="mt-4 text-base leading-7 text-gray-600 sm:text-lg">
            Fastest response is Telegram. If you prefer, call us and we’ll guide you.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-2">
          <a
            href={getTelegramHref(siteConfig.telegramPrefillBaseMessage)}
            aria-label="Contact us on Telegram"
            className="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 transition-transform duration-200 hover:-translate-y-1 hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-sm font-semibold text-gray-600">Primary</div>
                <div className="mt-1 text-xl font-bold text-gray-900">Telegram</div>
                <div className="mt-2 text-sm text-gray-600">
                  Send budget + area, we reply with options.
                </div>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#229ED9]/10 text-[#229ED9]">
                <Icons.Telegram className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#229ED9]">
              Message now <Icons.ArrowRight className="h-4 w-4" />
            </div>
          </a>

          <a
            href={getCallHref()}
            aria-label="Call us"
            className="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 transition-transform duration-200 hover:-translate-y-1 hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-sm font-semibold text-gray-600">Secondary</div>
                <div className="mt-1 text-xl font-bold text-gray-900">Phone Call</div>
                <div className="mt-2 text-sm text-gray-600">
                  Quick call to confirm details and schedule viewings.
                </div>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-primary-50 text-brand-primary-700">
                <Icons.Phone className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-primary-700">
              Call now <Icons.ArrowRight className="h-4 w-4" />
            </div>
          </a>
        </div>

        <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-2">
          {siteConfig.business.officeHours && (
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gray-50 text-gray-700">
                  <Icons.MapPin className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">Office Hours</div>
                  <div className="text-sm text-gray-600">{siteConfig.business.officeHours}</div>
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                Message anytime — we respond as fast as possible.
              </div>
            </div>
          )}

          {social.length > 0 && (
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
              <div className="text-sm font-semibold text-gray-900">Social</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {social.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm transition-transform duration-200 hover:-translate-y-[1px] hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="mt-4 text-sm text-gray-600">
                Follow us for new posts and updates.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
