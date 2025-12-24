/**
 * UI/UX notes: Next/Image wrapper that shows a subtle shimmer until the image loads.
 * Keeps UI visually rich while staying lightweight (CSS + a boolean state).
 */

'use client'

import * as React from 'react'
import Image, { type ImageProps } from 'next/image'
import { cn } from '@/utils/cn'

type Props = ImageProps & {
  wrapperClassName?: string
}

export default function ShimmerImage({ wrapperClassName, className, onLoad, ...props }: Props) {
  const [loaded, setLoaded] = React.useState(false)

  return (
    <div className={cn('relative overflow-hidden', wrapperClassName)}>
      {!loaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200">
          <div className="vstv-shimmer absolute inset-0" aria-hidden="true" />
        </div>
      )}
      <Image
        {...props}
        className={cn('transition-opacity duration-500', loaded ? 'opacity-100' : 'opacity-0', className)}
        onLoad={(e) => {
          setLoaded(true)
          onLoad?.(e)
        }}
      />
    </div>
  )
}

