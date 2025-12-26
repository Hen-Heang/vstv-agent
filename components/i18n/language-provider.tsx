'use client'

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

export type Language = 'en' | 'km'

type LanguageContextValue = {
  language: Language
  setLanguage: (language: Language) => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

const STORAGE_KEY = 'vstv_language'

function normalizeLanguage(value: string | null | undefined): Language {
  if (!value) return 'en'
  const v = value.toLowerCase()
  if (v === 'km' || v === 'kh' || v.startsWith('km') || v.startsWith('kh')) return 'km'
  if (v === 'en' || v.startsWith('en')) return 'en'
  return 'en'
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')

  useEffect(() => {
    const storedRaw = window.localStorage.getItem(STORAGE_KEY)
    const stored = storedRaw ? normalizeLanguage(storedRaw) : null
    const fromNavigator = normalizeLanguage(window.navigator.language)
    setLanguageState(stored ?? fromNavigator)
  }, [])

  useEffect(() => {
    document.documentElement.lang = language === 'km' ? 'km' : 'en'
    window.localStorage.setItem(STORAGE_KEY, language)
  }, [language])

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage: setLanguageState,
    }),
    [language]
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within <LanguageProvider />')
  return ctx
}
