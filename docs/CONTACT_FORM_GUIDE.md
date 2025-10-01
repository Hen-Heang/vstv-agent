# Contact Form Component Guide

## 📝 Overview

The Contact Form component is a fully-featured, accessible contact form with client-side validation, Supabase integration, and modern UX patterns including toast notifications and form state management.

## ✨ Features

### 🔍 **Client-Side Validation**
- **Real-time validation** with immediate feedback
- **Comprehensive validation rules** for all fields
- **Error clearing** when user starts typing
- **Visual error indicators** with icons and colors
- **Accessible error messages** with ARIA attributes

### 🗄️ **Supabase Integration**
- **Automatic data insertion** into contacts table
- **Error handling** with user-friendly messages
- **Data sanitization** (trim, lowercase email)
- **Timestamp tracking** for submission time

### 🎉 **Toast Notifications**
- **Success toasts** with green styling and checkmark
- **Error toasts** with red styling and alert icon
- **Auto-dismiss** after 5 seconds
- **Manual dismiss** with close button
- **Smooth animations** with Framer Motion

### ♿ **Accessibility Features**
- **ARIA labels** for all form elements
- **Error announcements** with role="alert"
- **Keyboard navigation** support
- **Screen reader** compatibility
- **Focus management** and proper tab order

### 🎨 **UX Enhancements**
- **Form clearing** after successful submission
- **Disabled state** while submitting with loading spinner
- **Character counters** for message field
- **Smooth animations** for error states
- **Responsive design** for all screen sizes

## 🛠️ **Technical Implementation**

### **Dependencies**
```bash
npm install framer-motion @supabase/supabase-js
```

### **Component Structure**
```
ContactForm/
├── Form Fields (Name, Email, Phone, Message)
├── Validation Logic
├── Submit Handler
├── Error Display
└── Toast Integration
```

### **Validation Rules**
```typescript
// Name: 2-50 characters, required
// Email: Valid email format, required
// Phone: Valid phone number format, required
// Message: 10-1000 characters, required
```

### **Database Schema**
```sql
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 📱 **Usage Examples**

### **Basic Usage**
```tsx
import ContactForm from '@/components/forms/contact-form'

export default function ContactPage() {
  return (
    <div>
      <ContactForm />
    </div>
  )
}
```

### **Custom Configuration**
```tsx
<ContactForm 
  title="Get in Touch"
  subtitle="We'd love to hear from you"
  className="max-w-lg"
  showTitle={true}
/>
```

### **With Toast Container**
```tsx
import ContactForm from '@/components/forms/contact-form'
import { ToastContainer } from '@/components/ui/toast'
import { useToast } from '@/components/ui/toast'

export default function ContactPage() {
  const { toasts, removeToast } = useToast()
  
  return (
    <>
      <ContactForm />
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </>
  )
}
```

## 🎯 **Form Fields**

### **Name Field**
- **Type**: Text input
- **Icon**: User icon
- **Validation**: 2-50 characters, required
- **Placeholder**: "Enter your full name"

### **Email Field**
- **Type**: Email input
- **Icon**: Mail icon
- **Validation**: Valid email format, required
- **Placeholder**: "Enter your email address"

### **Phone Field**
- **Type**: Tel input
- **Icon**: Phone icon
- **Validation**: Valid phone number format, required
- **Placeholder**: "Enter your phone number"

### **Message Field**
- **Type**: Textarea
- **Icon**: MessageSquare icon
- **Validation**: 10-1000 characters, required
- **Placeholder**: "Tell us how we can help you..."
- **Features**: Character counter, resize disabled

## 🔧 **Customization Options**

### **Styling**
- **Tailwind CSS** classes for easy customization
- **Color schemes** for success/error states
- **Responsive breakpoints** for mobile/desktop
- **Animation timing** with Framer Motion

### **Validation**
- **Custom validation rules** can be added
- **Error message customization** available
- **Validation timing** (on blur, on change, on submit)

### **Integration**
- **Different database** providers supported
- **Email service** integration possible
- **Analytics tracking** can be added
- **CRM integration** ready

## 🧪 **Testing**

### **Validation Testing**
- **Empty field** submissions
- **Invalid email** formats
- **Phone number** edge cases
- **Message length** boundaries

### **Accessibility Testing**
- **Screen reader** compatibility
- **Keyboard navigation** testing
- **Focus management** verification
- **Error announcement** testing

### **Integration Testing**
- **Supabase connection** testing
- **Error handling** scenarios
- **Success flow** verification
- **Toast notification** testing

## 📊 **Analytics Integration**

The form is ready for analytics tracking:
- **Form submission** events
- **Validation error** tracking
- **Field interaction** monitoring
- **Success/failure** rates

## 🔮 **Future Enhancements**

### **Planned Features**
- **File upload** support
- **Rich text editor** for messages
- **Auto-save** functionality
- **Progress indicators** for multi-step forms

### **Integration Ready**
- **Email notifications** to admin
- **CRM system** integration
- **Lead scoring** algorithms
- **Follow-up automation**

## 📝 **Best Practices**

### **Validation**
- Use client-side validation for immediate feedback
- Always validate on the server as well
- Provide clear, actionable error messages
- Test edge cases and boundary conditions

### **Accessibility**
- Use semantic HTML elements
- Provide proper ARIA labels
- Ensure keyboard navigation works
- Test with screen readers

### **UX**
- Show loading states during submission
- Provide clear success/error feedback
- Clear form after successful submission
- Use appropriate input types and placeholders

### **Security**
- Sanitize all input data
- Use HTTPS for form submissions
- Implement rate limiting
- Validate data on the server

## 🚀 **Deployment**

### **Environment Variables**
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### **Database Setup**
1. Run the SQL schema in your Supabase project
2. Enable Row Level Security (RLS)
3. Set up appropriate policies
4. Test the connection

### **Production Considerations**
- **Rate limiting** for form submissions
- **Spam protection** with reCAPTCHA
- **Email notifications** for new submissions
- **Data retention** policies

This Contact Form component provides a professional, accessible, and user-friendly solution for collecting contact information with modern UX patterns and robust validation.
