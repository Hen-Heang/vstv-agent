/**
 * UI/UX notes: Count-up number for lightweight credibility stats (respects prefers-reduced-motion).
 * Triggered when the component becomes visible to avoid unnecessary work offscreen.
 */

'use client'

import * as React from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

type Props = {
  value: number
  durationMs?: number
  suffix?: string
}

export default function CountUp({ value, durationMs = 900, suffix = '' }: Props) {
  const shouldReduceMotion = useReducedMotion()
  const ref = React.useRef<HTMLSpanElement | null>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const [display, setDisplay] = React.useState(0)

  React.useEffect(() => {
    if (!inView) return
    if (shouldReduceMotion) {
      setDisplay(value)
      return
    }

    let raf = 0
    const start = performance.now()
    const from = 0
    const to = value

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs)
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(Math.round(from + (to - from) * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [durationMs, inView, shouldReduceMotion, value])

  return (
    <span ref={ref} aria-label={`${value}${suffix}`}>
      {display.toLocaleString()}
      {suffix}
    </span>
  )
}

