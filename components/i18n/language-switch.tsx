'use client'

import React from 'react'
import { cn } from '@/utils/cn'
import { useLanguage, type Language } from '@/components/i18n/language-provider'

const options: Array<{ value: Language; label: string; short: string }> = [
  { value: 'en', label: 'English', short: 'EN' },
  { value: 'km', label: 'Khmer', short: 'KH' },
]

export default function LanguageSwitch({
  className,
  compact = false,
}: {
  className?: string
  compact?: boolean
}) {
  const { language, setLanguage } = useLanguage()

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-xl border border-gray-200/80 bg-white/60 p-1 shadow-sm ring-1 ring-gray-200/20 backdrop-blur-sm',
        className
      )}
      role="group"
      aria-label="Language switch"
    >
      {options.map((opt) => {
        const isActive = language === opt.value
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => setLanguage(opt.value)}
            className={cn(
              'h-8 rounded-lg px-3 text-xs font-semibold transition-colors',
              isActive
                ? 'bg-brand-primary-600 text-white shadow-sm'
                : 'text-gray-700 hover:bg-gray-100'
            )}
            aria-pressed={isActive}
          >
            {compact ? opt.short : opt.label}
          </button>
        )
      })}
    </div>
  )
}

