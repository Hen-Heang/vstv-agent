export function toTelHref(phone: string) {
  const normalized = phone.trim().replace(/[^\d+]/g, '')
  return normalized ? `tel:${normalized}` : 'tel:'
}

export function toTelegramHref(handle: string) {
  const normalized = handle.trim().replace(/^@/, '')
  return normalized ? `https://t.me/${normalized}` : 'https://t.me'
}

export function toMailtoHref(email: string) {
  const normalized = email.trim()
  return normalized ? `mailto:${normalized}` : 'mailto:'
}

