type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue }

export const LOCAL_STORAGE_KEYS = {
  properties: 'vstv.local.properties.v1',
  units: 'vstv.local.units.v1',
} as const

function isBrowser() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
}

function safeParseJson<T>(raw: string): T | null {
  try {
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

export function loadLocalJson<T>(key: string): T | null {
  if (!isBrowser()) return null
  const raw = window.localStorage.getItem(key)
  if (!raw) return null
  return safeParseJson<T>(raw)
}

export function saveLocalJson(key: string, value: JsonValue) {
  if (!isBrowser()) return
  window.localStorage.setItem(key, JSON.stringify(value))
}

export function removeLocalKey(key: string) {
  if (!isBrowser()) return
  window.localStorage.removeItem(key)
}

export function upsertById<T extends { id: string }>(items: T[], item: T): T[] {
  const index = items.findIndex((x) => x.id === item.id)
  if (index === -1) return [item, ...items]
  const next = items.slice()
  next[index] = item
  return next
}

export function removeById<T extends { id: string }>(items: T[], id: string): T[] {
  return items.filter((x) => x.id !== id)
}

