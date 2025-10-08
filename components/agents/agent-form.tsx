'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { X, Plus, Save, ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'

interface Agent {
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
  education?: string
  certifications?: string[]
  achievements?: string[]
  location?: string
}

interface AgentFormProps {
  agent?: Agent
  onSuccess?: () => void
  onCancel?: () => void
}

export default function AgentForm({ agent, onSuccess, onCancel }: AgentFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    email: '',
    phone: '',
    telegram: '',
    avatar_url: '',
    bio: '',
    experience_years: 0,
    specialties: [] as string[],
    languages: [] as string[],
    properties_sold: 0,
    rating: 0,
    education: '',
    certifications: [] as string[],
    achievements: [] as string[],
    location: ''
  })

  const [newSpecialty, setNewSpecialty] = useState('')
  const [newLanguage, setNewLanguage] = useState('')
  const [newCertification, setNewCertification] = useState('')
  const [newAchievement, setNewAchievement] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (agent) {
      setFormData({
        name: agent.name || '',
        position: agent.position || '',
        email: agent.email || '',
        phone: agent.phone || '',
        telegram: agent.telegram || '',
        avatar_url: agent.avatar_url || '',
        bio: agent.bio || '',
        experience_years: agent.experience_years || 0,
        specialties: agent.specialties || [],
        languages: agent.languages || [],
        properties_sold: agent.properties_sold || 0,
        rating: agent.rating || 0,
        education: agent.education || '',
        certifications: agent.certifications || [],
        achievements: agent.achievements || [],
        location: agent.location || ''
      })
    }
  }, [agent])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    // Trim whitespace from string inputs
    const trimmedValue = typeof value === 'string' ? value.trim() : value
    setFormData(prev => ({ ...prev, [name]: trimmedValue }))
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }))
  }

  const addSpecialty = () => {
    const trimmedSpecialty = newSpecialty.trim()
    if (trimmedSpecialty && !formData.specialties.includes(trimmedSpecialty)) {
      setFormData(prev => ({
        ...prev,
        specialties: [...prev.specialties, trimmedSpecialty]
      }))
      setNewSpecialty('')
    }
  }

  const removeSpecialty = (index: number) => {
    setFormData(prev => ({
      ...prev,
      specialties: prev.specialties.filter((_, i) => i !== index)
    }))
  }

  const addLanguage = () => {
    const trimmedLanguage = newLanguage.trim()
    if (trimmedLanguage && !formData.languages.includes(trimmedLanguage)) {
      setFormData(prev => ({
        ...prev,
        languages: [...prev.languages, trimmedLanguage]
      }))
      setNewLanguage('')
    }
  }

  const removeLanguage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.filter((_, i) => i !== index)
    }))
  }

  const addCertification = () => {
    const trimmedCertification = newCertification.trim()
    if (trimmedCertification && !formData.certifications.includes(trimmedCertification)) {
      setFormData(prev => ({
        ...prev,
        certifications: [...prev.certifications, trimmedCertification]
      }))
      setNewCertification('')
    }
  }

  const removeCertification = (index: number) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index)
    }))
  }

  const addAchievement = () => {
    const trimmedAchievement = newAchievement.trim()
    if (trimmedAchievement && !formData.achievements.includes(trimmedAchievement)) {
      setFormData(prev => ({
        ...prev,
        achievements: [...prev.achievements, trimmedAchievement]
      }))
      setNewAchievement('')
    }
  }

  const removeAchievement = (index: number) => {
    setFormData(prev => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validate required fields
      if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
        toast.error('Please fill in all required fields (Name, Email, Phone)')
        setIsSubmitting(false)
        return
      }

      // Clean and validate form data
      const cleanedData = {
        ...formData,
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        position: formData.position.trim(),
        telegram: formData.telegram.trim(),
        bio: formData.bio.trim(),
        education: formData.education.trim(),
        location: formData.location.trim(),
        avatar_url: formData.avatar_url.trim(),
        specialties: formData.specialties.filter(s => s.trim()),
        languages: formData.languages.filter(l => l.trim()),
        certifications: formData.certifications.filter(c => c.trim()),
        achievements: formData.achievements.filter(a => a.trim())
      }

      const url = agent ? `/api/agents/${agent.id}` : '/api/agents'
      const method = agent ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cleanedData),
      })

      if (response.ok) {
        toast.success(agent ? 'Agent updated successfully!' : 'Agent created successfully!')
        onSuccess?.()
      } else {
        const error = await response.json()
        toast.error(error.message || 'Failed to save agent')
      }
    } catch (error) {
      console.error('Error saving agent:', error)
      toast.error('Failed to save agent')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-6">
        {onCancel && (
          <Button variant="outline" onClick={onCancel}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        )}
        <h1 className="text-3xl font-bold">
          {agent ? 'Edit Agent' : 'Add New Agent'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name *</label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Agent name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Position *</label>
                <Input
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  required
                  placeholder="Real Estate Agent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email *</label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="agent@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone *</label>
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="+855 12 345 678"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Telegram</label>
                <Input
                  name="telegram"
                  value={formData.telegram}
                  onChange={handleInputChange}
                  placeholder="@username"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <Input
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Phnom Penh"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Avatar URL</label>
              <Input
                name="avatar_url"
                value={formData.avatar_url}
                onChange={handleInputChange}
                placeholder="https://example.com/avatar.jpg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Agent biography..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Professional Information */}
        <Card>
          <CardHeader>
            <CardTitle>Professional Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Experience (Years)</label>
                <Input
                  name="experience_years"
                  type="number"
                  value={formData.experience_years}
                  onChange={handleNumberChange}
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Properties Sold</label>
                <Input
                  name="properties_sold"
                  type="number"
                  value={formData.properties_sold}
                  onChange={handleNumberChange}
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Rating</label>
                <Input
                  name="rating"
                  type="number"
                  step="0.1"
                  value={formData.rating}
                  onChange={handleNumberChange}
                  min="0"
                  max="5"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Education</label>
              <Input
                name="education"
                value={formData.education}
                onChange={handleInputChange}
                placeholder="Bachelor's in Business Administration"
              />
            </div>
          </CardContent>
        </Card>

        {/* Specialties */}
        <Card>
          <CardHeader>
            <CardTitle>Specialties</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newSpecialty}
                onChange={(e) => setNewSpecialty(e.target.value)}
                placeholder="Add specialty..."
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSpecialty())}
              />
              <Button type="button" onClick={addSpecialty}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.specialties.map((specialty, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {specialty}
                  <button
                    type="button"
                    onClick={() => removeSpecialty(index)}
                    className="ml-1 hover:text-red-500"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Languages */}
        <Card>
          <CardHeader>
            <CardTitle>Languages</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newLanguage}
                onChange={(e) => setNewLanguage(e.target.value)}
                placeholder="Add language..."
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addLanguage())}
              />
              <Button type="button" onClick={addLanguage}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.languages.map((language, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {language}
                  <button
                    type="button"
                    onClick={() => removeLanguage(index)}
                    className="ml-1 hover:text-red-500"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Certifications */}
        <Card>
          <CardHeader>
            <CardTitle>Certifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newCertification}
                onChange={(e) => setNewCertification(e.target.value)}
                placeholder="Add certification..."
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCertification())}
              />
              <Button type="button" onClick={addCertification}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.certifications.map((certification, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {certification}
                  <button
                    type="button"
                    onClick={() => removeCertification(index)}
                    className="ml-1 hover:text-red-500"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle>Achievements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newAchievement}
                onChange={(e) => setNewAchievement(e.target.value)}
                placeholder="Add achievement..."
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAchievement())}
              />
              <Button type="button" onClick={addAchievement}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.achievements.map((achievement, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {achievement}
                  <button
                    type="button"
                    onClick={() => removeAchievement(index)}
                    className="ml-1 hover:text-red-500"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end gap-4">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={isSubmitting}>
            <Save className="h-4 w-4 mr-2" />
            {isSubmitting ? 'Saving...' : (agent ? 'Update Agent' : 'Create Agent')}
          </Button>
        </div>
      </form>
    </div>
  )
}
