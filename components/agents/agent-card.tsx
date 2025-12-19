'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import * as Dialog from '@radix-ui/react-dialog'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Icons } from '@/components/shared/icons'
import { toMailtoHref, toTelegramHref, toTelHref } from '@/utils/contact-links'

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
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false)
  const [selectedContactMethod, setSelectedContactMethod] = useState<'phone' | 'email' | 'telegram' | null>(null)
  const [imageError, setImageError] = useState(false)

  const handleContactClick = (method: 'phone' | 'email' | 'telegram') => {
    setSelectedContactMethod(method)
    setIsContactDialogOpen(true)
  }

  const handleContactAction = () => {
    if (!selectedContactMethod) return

    switch (selectedContactMethod) {
      case 'phone':
        window.open(toTelHref(agent.phone), '_self')
        break
      case 'email':
        window.open(toMailtoHref(agent.email), '_self')
        break
      case 'telegram':
        window.open(toTelegramHref(agent.telegram), '_blank')
        break
    }
    setIsContactDialogOpen(false)
    setSelectedContactMethod(null)
  }

  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      action()
    }
  }

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
            </div>
          </div>

          {/* Contact CTA Overlay */}
          <div className="absolute bottom-4 left-4 right-4 z-10">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={() => handleContactClick('phone')}
                onKeyDown={(e) => handleKeyDown(e, () => handleContactClick('phone'))}
                className="w-full bg-white/90 hover:bg-white text-gray-900 font-semibold py-3 rounded-lg transition-all duration-300 hover:shadow-lg backdrop-blur-sm"
                aria-label={`Contact ${agent.name} - ${agent.position}`}
              >
                <Icons.User className="h-4 w-4 mr-2" />
                Contact Agent
              </Button>
            </motion.div>
          </div>
        </Card>
      </motion.div>

      {/* Contact Dialog */}
      <Dialog.Root open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mx-4 z-50 focus:outline-none">
            <Dialog.Title className="text-xl font-bold text-gray-900 mb-2">
              Contact {agent.name}
            </Dialog.Title>
            <Dialog.Description className="text-gray-600 mb-6">
              Choose your preferred way to get in touch with {agent.name}
            </Dialog.Description>

            <div className="space-y-3 mb-6">
              {/* Phone Option */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedContactMethod('phone')}
                className={`w-full p-4 rounded-lg border-2 transition-all duration-300 flex items-center space-x-3 ${
                  selectedContactMethod === 'phone'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                }`}
                aria-label={`Call ${agent.name} at ${agent.phone}`}
              >
                <div className="p-2 bg-blue-100 rounded-full">
                  <Icons.Phone className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-semibold text-gray-900">Call</div>
                  <div className="text-sm text-gray-600">{agent.phone}</div>
                </div>
              </motion.button>

              {/* Email Option */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedContactMethod('email')}
                className={`w-full p-4 rounded-lg border-2 transition-all duration-300 flex items-center space-x-3 ${
                  selectedContactMethod === 'email'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                }`}
                aria-label={`Email ${agent.name} at ${agent.email}`}
              >
                <div className="p-2 bg-green-100 rounded-full">
                  <Icons.Mail className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-semibold text-gray-900">Email</div>
                  <div className="text-sm text-gray-600">{agent.email}</div>
                </div>
              </motion.button>

              {/* Telegram Option */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedContactMethod('telegram')}
                className={`w-full p-4 rounded-lg border-2 transition-all duration-300 flex items-center space-x-3 ${
                  selectedContactMethod === 'telegram'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                }`}
                aria-label={`Message ${agent.name} on Telegram`}
              >
                <div className="p-2 bg-blue-100 rounded-full">
                  <Icons.Telegram className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-semibold text-gray-900">Telegram</div>
                  <div className="text-sm text-gray-600">@{agent.telegram}</div>
                </div>
              </motion.button>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <Dialog.Close asChild>
                <Button
                  variant="outline"
                  className="flex-1"
                  aria-label="Cancel contact"
                >
                  Cancel
                </Button>
              </Dialog.Close>
              <Button
                onClick={handleContactAction}
                disabled={!selectedContactMethod}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                aria-label={`Proceed with ${selectedContactMethod} contact`}
              >
                {selectedContactMethod === 'phone' && <Icons.Phone className="h-4 w-4 mr-2" />}
                {selectedContactMethod === 'email' && <Icons.Mail className="h-4 w-4 mr-2" />}
                {selectedContactMethod === 'telegram' && <Icons.MessageCircle className="h-4 w-4 mr-2" />}
                {selectedContactMethod ? 'Contact Now' : 'Select Method'}
              </Button>
            </div>

            <Dialog.Close asChild>
              <button
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close dialog"
              >
                <Icons.X className="h-4 w-4" />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  )
}
