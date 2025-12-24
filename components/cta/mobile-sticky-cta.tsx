/**
 * UI/UX notes: Mobile conversion bar refined with stronger hierarchy, larger touch targets,
 * safe-area padding, and richer shadows while staying lightweight.
 */

import { Icons } from '@/components/shared/icons'
import { getCallHref, getTelegramHref, siteConfig } from '@/config/site'

export default function MobileStickyCTA() {
  return (
    <>
      <div className="h-16 md:hidden" aria-hidden="true" />
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-black/5 bg-white/90 px-4 pb-[calc(env(safe-area-inset-bottom)+0.9rem)] pt-3 backdrop-blur-xl shadow-soft md:hidden">
        <div className="mx-auto flex max-w-3xl gap-3">
          <a
            href={getTelegramHref(siteConfig.telegramPrefillBaseMessage)}
            aria-label="Chat on Telegram"
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-[#229ED9] text-sm font-semibold text-white shadow-soft transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#229ED9]/40 motion-reduce:transition-none motion-reduce:hover:scale-100"
          >
            <Icons.Telegram className="h-5 w-5" />
            Telegram
          </a>
          <a
            href={getCallHref()}
            aria-label="Call us"
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl border border-black/10 bg-white px-4 text-sm font-semibold text-gray-900 shadow-ring transition-transform duration-200 hover:shadow-soft hover:scale-[1.01] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary-600/30 motion-reduce:transition-none motion-reduce:hover:scale-100"
          >
            <Icons.Phone className="h-5 w-5 text-brand-primary-700" />
            Call
          </a>
        </div>
      </div>
    </>
  )
}
