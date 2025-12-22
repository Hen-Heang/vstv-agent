export function toTelHref(phone: string) {
  const normalized = phone.trim().replace(/[^\d+]/g, '')
  return normalized ? `tel:${normalized}` : 'tel:'
}

export function toTelegramHref(handle: string) {
  const normalized = handle.trim().replace(/^@/, '')
  return normalized ? `https://t.me/${normalized}` : 'https://t.me'
}

export function toTelegramPrefillHref(telegramUrlOrHandle: string, message: string) {
  const raw = telegramUrlOrHandle.trim()
  const telegramUrl = raw.startsWith('http') ? raw : toTelegramHref(raw)

  try {
    const url = new URL(telegramUrl)
    url.searchParams.set('text', message)
    return url.toString()
  } catch {
    const encoded = encodeURIComponent(message)
    const joiner = telegramUrl.includes('?') ? '&' : '?'
    return `${telegramUrl}${joiner}text=${encoded}`
  }
}

export function toMailtoHref(email: string) {
  const normalized = email.trim()
  return normalized ? `mailto:${normalized}` : 'mailto:'
}
