/**
 * UI/UX notes: Lightweight, accessible in-view animation wrapper (respects prefers-reduced-motion).
 * Used to add modern micro-interactions without duplicating Framer Motion config across sections/cards.
 */

'use client'

import * as React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/utils/cn'

type Props = {
  children: React.ReactNode
  className?: string
  delay?: number
  as?: keyof typeof motion
}

export default function MotionInView({ children, className, delay = 0, as = 'div' }: Props) {
  const shouldReduceMotion = useReducedMotion()
  const Component = (motion as any)[as] ?? motion.div

  if (shouldReduceMotion) {
    const Tag = as as keyof JSX.IntrinsicElements
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <Component
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay }}
      className={cn(className)}
    >
      {children}
    </Component>
  )
}

