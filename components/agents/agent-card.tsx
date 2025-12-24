/**
 * UI/UX notes: Simplified agent card for conversion (direct Telegram + Call, clear languages/areas covered).
 */

'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Icons } from '@/components/shared/icons'
import { toTelegramHref, toTelHref } from '@/utils/contact-links'

interface AgentCardProps {
  agent: {
    id: string
    name: string
    position: string
    email: string
    phone: string
    telegram: string
    avatar_url: string
    bio: string
    experience_years: number
    specialties: string[]
    languages: string[]
    properties_sold: number
    rating: number
    location?: string
  }
  className?: string
}


export default function AgentCard({ agent, className = '' }: AgentCardProps) {
  const [imageError, setImageError] = useState(false)

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`group ${className}`}
      >
        <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-blue-200 min-h-[400px]">
          {/* Full Background Image */}
          <div className="absolute inset-0">
            {!imageError ? (
              <Image
                src={agent.avatar_url}
                alt={`${agent.name} - ${agent.position}`}
                fill
                className="object-cover"
                loading="lazy"
                onError={() => setImageError(true)}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <div className="text-white text-6xl font-bold">
                  {agent.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>
            )}
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40" />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          </div>

          {/* Agent Info Overlay */}
          <div className="relative z-10 p-6 h-full flex flex-col justify-end">
            <div className="space-y-3">
              {/* Agent Name and Position */}
              <div>
                <h3 className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300 mb-1">
                  {agent.name}
                </h3>
                <p className="text-lg text-blue-200 font-medium">{agent.position}</p>
              </div>
              
              {/* Rating */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Icons.Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(agent.rating) 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-400'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-white/90">
                  {agent.rating} ({agent.properties_sold} sold)
                </span>
              </div>

              {/* Experience */}
              <div className="flex items-center text-sm text-white/80">
                <Icons.Award className="h-4 w-4 mr-2 text-blue-300" />
                <span>{agent.experience_years} years experience</span>
              </div>

              {/* Status Indicator */}
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-white/80">Available</span>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {agent.languages.slice(0, 3).map((lang) => (
                  <span key={lang} className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/10">
                    {lang}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {agent.specialties.slice(0, 4).map((item) => (
                  <span key={item} className="rounded-full bg-black/20 px-3 py-1 text-xs font-semibold text-white/90 ring-1 ring-white/10">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Contact CTA Overlay */}
          <div className="absolute bottom-4 left-4 right-4 z-10 grid gap-2">
            <a
              href={toTelegramHref(agent.telegram)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#229ED9] px-4 text-sm font-semibold text-white shadow-sm transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99] motion-reduce:transition-none motion-reduce:hover:scale-100"
              aria-label={`Message ${agent.name} on Telegram`}
            >
              <Icons.Telegram className="h-5 w-5" />
              Telegram
            </a>
            <a
              href={toTelHref(agent.phone)}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-white/90 px-4 text-sm font-semibold text-gray-900 shadow-sm backdrop-blur-sm transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99] motion-reduce:transition-none motion-reduce:hover:scale-100"
              aria-label={`Call ${agent.name}`}
            >
              <Icons.Phone className="h-5 w-5 text-brand-primary-700" />
              Call
            </a>
          </div>
        </Card>
      </motion.div>
    </>
  )
}
