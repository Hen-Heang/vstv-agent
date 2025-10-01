# Shared Components and Utilities

This directory contains reusable components, utilities, and patterns that are used across the application to maintain consistency and reduce code duplication.

## Structure

### Icons (`icons.tsx`)
Centralized icon system with consistent props and styling:
- **Social Icons**: Telegram, Facebook, Instagram
- **Communication Icons**: Phone, Mail, MessageCircle, MessageSquare
- **User Icons**: User, Star, Award
- **Property Icons**: Property, Bed, Bath, Square, Car
- **Navigation Icons**: ArrowRight, ArrowLeft, ChevronRight, ChevronLeft
- **Action Icons**: Heart, Share, Download, Send, Loader2
- **Status Icons**: Check, X, Alert
- **Utility Icons**: Search, Filter, Menu

### Utilities (`utils.ts`)
Common utility functions:
- **Date formatting**: `formatDate`, `formatDateTime`
- **Price formatting**: `formatPrice`, `formatCurrency`
- **Text utilities**: `truncateText`, `capitalizeFirst`, `slugify`
- **Array utilities**: `groupBy`, `sortBy`
- **Validation utilities**: `isValidEmail`, `isValidPhone`, `isValidUrl`
- **Status utilities**: `getStatusColor`
- **Animation utilities**: `getAnimationDelay`
- **Performance utilities**: `debounce`, `throttle`
- **Storage utilities**: `getFromStorage`, `setToStorage`
- **URL utilities**: `buildQueryString`, `parseQueryString`

### Validation (`validation.ts`)
Form validation system:
- **Validation rules**: `validationRules` object with common validations
- **Form validator class**: `FormValidator` for complex form validation
- **Pre-built validators**: `validateContactForm`, `validatePropertyForm`, `validateAgentForm`
- **Utility functions**: `isEmail`, `isPhone`, `isUrl`, `isRequired`
- **Form field validation hook**: `useFieldValidation`

### Hooks (`hooks.ts`)
Custom React hooks for common functionality:
- **Storage**: `useLocalStorage`
- **Performance**: `useDebounce`, `useThrottle`, `useDebouncedCallback`, `useThrottledCallback`
- **State**: `usePrevious`, `useToggle`, `useCounter`
- **Async operations**: `useAsync`
- **UI interactions**: `useIntersectionObserver`, `useClickOutside`, `useCopyToClipboard`
- **Forms**: `useForm`
- **Data**: `usePagination`, `useSearch`
- **Window**: `useWindowSize`

### UI Patterns (`ui-patterns.tsx`)
Reusable UI components and patterns:
- **Loading states**: `LoadingSpinner`, `LoadingSkeleton`
- **Empty states**: `EmptyState`
- **Status indicators**: `StatusBadge`
- **Action buttons**: `ActionButton`
- **Modals**: `Modal`, `ConfirmDialog`
- **Data display**: `RowActions`, `SearchBar`, `Pagination`
- **Form components**: `FormField`
- **Stats**: `StatsCard`

## Usage

### Importing Icons
```tsx
import { Icons } from '@/components/shared/icons'

// Use icons with consistent props
<Icons.Phone className="h-4 w-4" size={20} color="blue" />
```

### Using Utilities
```tsx
import { formatPrice, formatDate, debounce } from '@/components/shared/utils'

const price = formatPrice(1200, 'rent') // "$1,200/month"
const date = formatDate(new Date()) // "Dec 15, 2024"
const debouncedSearch = debounce(searchFunction, 300)
```

### Form Validation
```tsx
import { validateContactForm, FormValidator } from '@/components/shared/validation'

// Pre-built validation
const result = validateContactForm(formData)

// Custom validation
const validator = new FormValidator()
  .addField('name', name, [{ type: 'required' }, { type: 'minLength', params: [2] }])
  .addField('email', email, [{ type: 'required' }, { type: 'email' }])
const validation = validator.validate()
```

### Using Hooks
```tsx
import { useLocalStorage, useDebounce, useForm } from '@/components/shared/hooks'

const [value, setValue] = useLocalStorage('key', defaultValue)
const debouncedValue = useDebounce(inputValue, 300)
const { values, errors, setValue, validate } = useForm(initialValues, validationSchema)
```

### UI Patterns
```tsx
import { LoadingSpinner, StatusBadge, Modal } from '@/components/shared/ui-patterns'

<LoadingSpinner size="lg" />
<StatusBadge status="available" />
<Modal isOpen={isOpen} onClose={onClose} title="Title">
  Content here
</Modal>
```

## Benefits

1. **Consistency**: All icons, utilities, and patterns follow the same conventions
2. **Maintainability**: Changes to shared components automatically update across the app
3. **Reusability**: Common functionality is centralized and easily accessible
4. **Type Safety**: Full TypeScript support with proper type definitions
5. **Performance**: Optimized utilities and hooks for better performance
6. **Developer Experience**: Easy-to-use APIs with consistent patterns

## Best Practices

1. **Always use the centralized icons** instead of importing from lucide-react directly
2. **Use shared utilities** for common operations like formatting and validation
3. **Leverage custom hooks** for state management and side effects
4. **Follow the established patterns** when creating new components
5. **Keep shared components generic** and configurable through props
6. **Document new additions** to maintain the system's clarity
