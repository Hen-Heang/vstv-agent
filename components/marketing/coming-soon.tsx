'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { getCallHref, getTelegramHref, siteConfig } from '@/config/site'
import { useLanguage } from '@/components/i18n/language-provider'

export default function ComingSoon({
  title = 'Coming Soon',
  description = 'Listings are available via Telegram.',
  titleKm,
  descriptionKm,
}: {
  title?: string
  description?: string
  titleKm?: string
  descriptionKm?: string
}) {
  const { language } = useLanguage()
  const isKm = language === 'km'

  const defaultTitleKm = title === 'Properties' ? 'អចលនទ្រព្យ' : title === 'Units' ? 'ឯកតា' : 'មកដល់ឆាប់ៗ'
  const defaultDescriptionKm = 'បញ្ជីមាននៅលើ Telegram។'

  const displayTitle = isKm ? (titleKm ?? defaultTitleKm) : title
  const displayDescription = isKm ? (descriptionKm ?? defaultDescriptionKm) : description
  const badgeText = isKm ? 'គេហទំព័រផ្សព្វផ្សាយ V1' : 'V1 Marketing Site'
  const callLabel = isKm ? 'ហៅទូរស័ព្ទ' : 'Call'
  const footnote = isKm
    ? 'ឆ្លើយតបលឿនបំផុត៖ Telegram។ ប្រសិនបើអ្នកចង់បាន សូមហៅមក ហើយយើងនឹងណែនាំអ្នក។'
    : 'Fastest response: Telegram. If you prefer, call us and we’ll guide you.'

  return (
    <div className="min-h-[calc(100vh-72px)] bg-gray-50">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
        <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-black/5 sm:p-10">
          <div className="inline-flex items-center rounded-full bg-brand-primary-50 px-3 py-1 text-xs font-semibold text-brand-primary-700">
            {badgeText}
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {displayTitle}
          </h1>
          <p className="mt-3 text-base leading-7 text-gray-600 sm:text-lg">
            {displayDescription}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild className="h-11 rounded-xl bg-brand-primary-600 hover:bg-brand-primary-700">
              <Link href={getTelegramHref(siteConfig.telegramPrefillBaseMessage)} aria-label="Contact us on Telegram">
                Telegram
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-11 rounded-xl">
              <Link href={getCallHref()} aria-label="Call us">
                {callLabel}
              </Link>
            </Button>
          </div>

          <p className="mt-6 text-sm text-gray-500">
            {footnote}
          </p>
        </div>
      </div>
    </div>
  )
}

