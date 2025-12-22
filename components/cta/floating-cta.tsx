import { Icons } from '@/components/shared/icons'
import { getCallHref, getTelegramHref, siteConfig } from '@/config/site'

export default function FloatingCTA() {
  return (
    <div className="fixed bottom-[88px] right-4 z-50 flex flex-col gap-2 md:bottom-6 md:right-6">
      <a
        href={getTelegramHref(siteConfig.telegramPrefillBaseMessage)}
        aria-label="Chat on Telegram"
        className="group inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#229ED9] text-white shadow-lg shadow-black/10 ring-1 ring-white/20 transition-transform duration-200 hover:scale-[1.04] active:scale-[0.98] motion-reduce:transition-none motion-reduce:hover:scale-100 md:h-14 md:w-14"
      >
        <Icons.Telegram className="h-6 w-6 transition-transform duration-200 group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100" />
      </a>
      <a
        href={getCallHref()}
        aria-label="Call us"
        className="group inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-gray-900 shadow-lg shadow-black/10 ring-1 ring-black/10 transition-transform duration-200 hover:scale-[1.04] active:scale-[0.98] motion-reduce:transition-none motion-reduce:hover:scale-100 md:h-12 md:w-12"
      >
        <Icons.Phone className="h-5 w-5 text-brand-primary-700 transition-transform duration-200 group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100" />
      </a>
    </div>
  )
}

