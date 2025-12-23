import { Icons } from '@/components/shared/icons'
import { getCallHref, getTelegramHref, siteConfig } from '@/config/site'

export default function MobileStickyCTA() {
  return (
    <>
      <div className="h-16 md:hidden" aria-hidden="true" />
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-black/5 bg-white/90 px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-3xl gap-3">
          <a
            href={getTelegramHref(siteConfig.telegramPrefillBaseMessage)}
            aria-label="Chat on Telegram"
            className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[#229ED9] text-sm font-semibold text-white shadow-sm transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99] motion-reduce:transition-none motion-reduce:hover:scale-100"
          >
            <Icons.Telegram className="h-5 w-5" />
            Telegram
          </a>
          <a
            href={getCallHref()}
            aria-label="Call us"
            className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-black/10 bg-white px-4 text-sm font-semibold text-gray-900 shadow-sm transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99] motion-reduce:transition-none motion-reduce:hover:scale-100"
          >
            <Icons.Phone className="h-5 w-5 text-brand-primary-700" />
            Call
          </a>
        </div>
      </div>
    </>
  )
}
