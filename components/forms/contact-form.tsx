'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/toast'
import { Icons } from '@/components/shared/icons'
import { validateContactForm } from '@/components/shared/validation'

interface ContactFormData {
  name: string
  email: string
  phone: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  phone?: string
  message?: string
}

interface ContactFormProps {
  className?: string
  title?: string
  subtitle?: string
  showTitle?: boolean
}

export default function ContactForm({ 
  className = '',
  title = 'Get in Touch',
  subtitle = 'Send us a message and we\'ll get back to you as soon as possible.',
  showTitle = true
}: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { success, error: showError } = useToast()

  // Validate form using shared validation
  const validateForm = (): boolean => {
    const validation = validateContactForm(formData)
    
    if (!validation.isValid) {
      const newErrors: FormErrors = {}
      validation.errors.forEach(error => {
        newErrors[error.field as keyof FormErrors] = error.message
      })
      setErrors(newErrors)
      return false
    }
    
    setErrors({})
    return true
  }

  // Handle input changes
  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          phone: formData.phone.trim(),
          message: formData.message.trim(),
        }),
      })

      if (!response.ok) {
        const payload = await response.json().catch(() => null)
        throw new Error(payload?.error || 'Failed to send message')
      }

      // Success - show toast and clear form
      success(
        'Message Sent Successfully!',
        'Thank you for your message. We\'ll get back to you soon.',
        5000
      )
      
      // Clear form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      })
      setErrors({})

    } catch (error) {
      console.error('Error submitting contact form:', error)
      showError(
        'Failed to Send Message',
        'Sorry, there was an error sending your message. Please try again.',
        5000
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      action()
    }
  }

  return (
    <Card className={`w-full max-w-2xl mx-auto ${className}`}>
      {showTitle && (
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
            {title}
          </CardTitle>
          <p className="text-gray-600">{subtitle}</p>
        </CardHeader>
      )}
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <div className="relative">
              <Icons.User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, () => document.getElementById('email')?.focus())}
                className={`pl-10 min-h-[48px] text-base ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
                placeholder="Enter your full name"
                disabled={isSubmitting}
                aria-describedby={errors.name ? 'name-error' : undefined}
                aria-invalid={!!errors.name}
              />
            </div>
            {errors.name && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1 text-sm text-red-600 flex items-center"
                id="name-error"
                role="alert"
              >
                <Icons.Alert className="h-4 w-4 mr-1" />
                {errors.name}
              </motion.p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <div className="relative">
              <Icons.Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, () => document.getElementById('phone')?.focus())}
                className={`pl-10 min-h-[48px] text-base ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                placeholder="Enter your email address"
                disabled={isSubmitting}
                aria-describedby={errors.email ? 'email-error' : undefined}
                aria-invalid={!!errors.email}
              />
            </div>
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1 text-sm text-red-600 flex items-center"
                id="email-error"
                role="alert"
              >
                <Icons.Alert className="h-4 w-4 mr-1" />
                {errors.email}
              </motion.p>
            )}
          </div>

          {/* Phone Field */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <div className="relative">
              <Icons.Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                enterKeyHint="next"
                dir="ltr"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, () => document.getElementById('message')?.focus())}
                className={`pl-10 min-h-[48px] text-base ${errors.phone ? 'border-red-500 focus:ring-red-500' : ''}`}
                placeholder="Enter your phone number"
                disabled={isSubmitting}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
                aria-invalid={!!errors.phone}
              />
            </div>
            {errors.phone && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1 text-sm text-red-600 flex items-center"
                id="phone-error"
                role="alert"
              >
                <Icons.Alert className="h-4 w-4 mr-1" />
                {errors.phone}
              </motion.p>
            )}
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              Message *
            </label>
            <div className="relative">
              <Icons.MessageSquare className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none min-h-[120px] text-base ${
                  errors.message ? 'border-red-500 focus:ring-red-500' : ''
                }`}
                rows={4}
                placeholder="Tell us how we can help you..."
                disabled={isSubmitting}
                aria-describedby={errors.message ? 'message-error' : undefined}
                aria-invalid={!!errors.message}
              />
            </div>
            <div className="flex justify-between items-center mt-1">
              {errors.message ? (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-600 flex items-center"
                  id="message-error"
                  role="alert"
                >
                  <Icons.Alert className="h-4 w-4 mr-1" />
                  {errors.message}
                </motion.p>
              ) : (
                <div></div>
              )}
              <span className="text-xs text-gray-500">
                {formData.message.length}/1000
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 min-h-[48px] text-base"
            >
              {isSubmitting ? (
                <>
                  <Icons.Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Sending Message...
                </>
              ) : (
                <>
                  <Icons.Send className="h-4 w-4 mr-2" />
                  Send Message
                </>
              )}
            </Button>
          </motion.div>

        </form>
      </CardContent>
    </Card>
  )
}
