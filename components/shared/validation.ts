/**
 * Shared validation utilities and form validation helpers
 */

import React from 'react'

// Validation error types
export interface ValidationError {
  field: string
  message: string
}

export interface ValidationResult {
  isValid: boolean
  errors: ValidationError[]
}

// Base validation rules
export const validationRules = {
  required: (value: string, fieldName: string): string | null => {
    if (!value || value.trim().length === 0) {
      return `${fieldName} is required`
    }
    return null
  },

  minLength: (value: string, min: number, fieldName: string): string | null => {
    if (value.length < min) {
      return `${fieldName} must be at least ${min} characters`
    }
    return null
  },

  maxLength: (value: string, max: number, fieldName: string): string | null => {
    if (value.length > max) {
      return `${fieldName} must be less than ${max} characters`
    }
    return null
  },

  email: (value: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address'
    }
    return null
  },

  phone: (value: string): string | null => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
    const cleanPhone = value.replace(/[\s\-\(\)]/g, '')
    if (!phoneRegex.test(cleanPhone)) {
      return 'Please enter a valid phone number'
    }
    return null
  },

  url: (value: string): string | null => {
    try {
      new URL(value)
      return null
    } catch {
      return 'Please enter a valid URL'
    }
  },

  number: (value: string | number, fieldName: string): string | null => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value
    if (isNaN(numValue)) {
      return `${fieldName} must be a valid number`
    }
    return null
  },

  min: (value: number, min: number, fieldName: string): string | null => {
    if (value < min) {
      return `${fieldName} must be at least ${min}`
    }
    return null
  },

  max: (value: number, max: number, fieldName: string): string | null => {
    if (value > max) {
      return `${fieldName} must be less than ${max}`
    }
    return null
  },

  pattern: (value: string, pattern: RegExp, message: string): string | null => {
    if (!pattern.test(value)) {
      return message
    }
    return null
  }
}

// Form validation schemas
export interface FormField {
  name: string
  value: unknown
  rules: ValidationRule[]
}

export interface ValidationRule {
  type: string
  params?: unknown[]
  message?: string
}

// Generic form validator
export class FormValidator {
  private fields: FormField[] = []

  addField(name: string, value: unknown, rules: ValidationRule[]): this {
    this.fields.push({ name, value, rules })
    return this
  }

  validate(): ValidationResult {
    const errors: ValidationError[] = []

    for (const field of this.fields) {
      for (const rule of field.rules) {
        const error = this.validateField(field, rule)
        if (error) {
          errors.push(error)
          break // Stop at first error for each field
        }
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }

  private validateField(field: FormField, rule: ValidationRule): ValidationError | null {
    const { name, value } = field
    const { type, params = [], message } = rule

    let errorMessage: string | null = null

    switch (type) {
      case 'required':
        errorMessage = validationRules.required(String(value), name)
        break
      case 'minLength':
        errorMessage = validationRules.minLength(String(value), params[0] as number, name)
        break
      case 'maxLength':
        errorMessage = validationRules.maxLength(String(value), params[0] as number, name)
        break
      case 'email':
        errorMessage = validationRules.email(String(value))
        break
      case 'phone':
        errorMessage = validationRules.phone(String(value))
        break
      case 'url':
        errorMessage = validationRules.url(String(value))
        break
      case 'number':
        errorMessage = validationRules.number(String(value), name)
        break
      case 'min':
        errorMessage = validationRules.min(Number(value), params[0] as number, name)
        break
      case 'max':
        errorMessage = validationRules.max(Number(value), params[0] as number, name)
        break
      case 'pattern':
        errorMessage = validationRules.pattern(String(value), params[0] as RegExp, params[1] as string)
        break
      default:
        console.warn(`Unknown validation rule: ${type}`)
    }

    if (errorMessage) {
      return {
        field: name,
        message: message || errorMessage
      }
    }

    return null
  }
}

// Specific form validators
export const validateContactForm = (data: {
  name: string
  email: string
  phone: string
  message: string
}): ValidationResult => {
  const validator = new FormValidator()
    .addField('name', data.name, [
      { type: 'required' },
      { type: 'minLength', params: [2] },
      { type: 'maxLength', params: [50] }
    ])
    .addField('email', data.email, [
      { type: 'required' },
      { type: 'email' }
    ])
    .addField('phone', data.phone, [
      { type: 'required' },
      { type: 'phone' }
    ])
    .addField('message', data.message, [
      { type: 'required' },
      { type: 'minLength', params: [10] },
      { type: 'maxLength', params: [1000] }
    ])

  return validator.validate()
}

export const validatePropertyForm = (data: {
  title: string
  price: number
  location: string
  bedrooms: number
  bathrooms: number
  area: number
}): ValidationResult => {
  const validator = new FormValidator()
    .addField('title', data.title, [
      { type: 'required' },
      { type: 'minLength', params: [5] },
      { type: 'maxLength', params: [100] }
    ])
    .addField('price', data.price, [
      { type: 'required' },
      { type: 'number' },
      { type: 'min', params: [0] }
    ])
    .addField('location', data.location, [
      { type: 'required' },
      { type: 'minLength', params: [3] }
    ])
    .addField('bedrooms', data.bedrooms, [
      { type: 'required' },
      { type: 'number' },
      { type: 'min', params: [0] }
    ])
    .addField('bathrooms', data.bathrooms, [
      { type: 'required' },
      { type: 'number' },
      { type: 'min', params: [0] }
    ])
    .addField('area', data.area, [
      { type: 'required' },
      { type: 'number' },
      { type: 'min', params: [1] }
    ])

  return validator.validate()
}

export const validateAgentForm = (data: {
  name: string
  email: string
  phone: string
  position: string
  experience_years: number
}): ValidationResult => {
  const validator = new FormValidator()
    .addField('name', data.name, [
      { type: 'required' },
      { type: 'minLength', params: [2] },
      { type: 'maxLength', params: [50] }
    ])
    .addField('email', data.email, [
      { type: 'required' },
      { type: 'email' }
    ])
    .addField('phone', data.phone, [
      { type: 'required' },
      { type: 'phone' }
    ])
    .addField('position', data.position, [
      { type: 'required' },
      { type: 'minLength', params: [2] }
    ])
    .addField('experience_years', data.experience_years, [
      { type: 'required' },
      { type: 'number' },
      { type: 'min', params: [0] },
      { type: 'max', params: [50] }
    ])

  return validator.validate()
}

// Utility functions for common validations
export const isEmail = (email: string): boolean => {
  return validationRules.email(email) === null
}

export const isPhone = (phone: string): boolean => {
  return validationRules.phone(phone) === null
}

export const isUrl = (url: string): boolean => {
  return validationRules.url(url) === null
}

export const isRequired = (value: unknown): boolean => {
  if (value === null || value === undefined) return false
  if (typeof value === 'string') return value.trim().length > 0
  if (typeof value === 'number') return !isNaN(value)
  if (Array.isArray(value)) return value.length > 0
  return true
}

// Form field validation hook
export const useFieldValidation = (initialValue: unknown = '') => {
  const [value, setValue] = React.useState(initialValue)
  const [error, setError] = React.useState<string | null>(null)
  const [touched, setTouched] = React.useState(false)

  const validate = (rules: ValidationRule[]) => {
    const validator = new FormValidator()
    validator.addField('field', value, rules)
    const result = validator.validate()
    
    if (!result.isValid) {
      setError(result.errors[0]?.message || null)
    } else {
      setError(null)
    }
    
    return result.isValid
  }

  const handleChange = (newValue: unknown) => {
    setValue(newValue)
    if (touched && error) {
      // Re-validate on change if field was touched and had error
      setError(null)
    }
  }

  const handleBlur = () => {
    setTouched(true)
  }

  return {
    value,
    error,
    touched,
    setValue: handleChange,
    setError,
    validate,
    handleBlur,
    isValid: !error
  }
}
