export interface Database {
  public: {
    Tables: {
      properties: {
        Row: {
          id: string
          title: string
          description: string | null
          price: number
          property_type: string
          listing_type: string
          bedrooms: number | null
          bathrooms: number | null
          area_sqm: number | null
          location: string
          address: string | null
          district: string | null
          city: string
          images: string[]
          features: string[]
          amenities: string[]
          status: string
          featured: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          price: number
          property_type: string
          listing_type: string
          bedrooms?: number | null
          bathrooms?: number | null
          area_sqm?: number | null
          location: string
          address?: string | null
          district?: string | null
          city?: string
          images?: string[]
          features?: string[]
          amenities?: string[]
          status?: string
          featured?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          price?: number
          property_type?: string
          listing_type?: string
          bedrooms?: number | null
          bathrooms?: number | null
          area_sqm?: number | null
          location?: string
          address?: string | null
          district?: string | null
          city?: string
          images?: string[]
          features?: string[]
          amenities?: string[]
          status?: string
          featured?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      agents: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          position: string | null
          bio: string | null
          avatar_url: string | null
          specialties: string[]
          languages: string[]
          experience_years: number
          properties_sold: number
          rating: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          position?: string | null
          bio?: string | null
          avatar_url?: string | null
          specialties?: string[]
          languages?: string[]
          experience_years?: number
          properties_sold?: number
          rating?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          position?: string | null
          bio?: string | null
          avatar_url?: string | null
          specialties?: string[]
          languages?: string[]
          experience_years?: number
          properties_sold?: number
          rating?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      services: {
        Row: {
          id: string
          title: string
          description: string | null
          icon: string | null
          features: string[]
          pricing_info: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          icon?: string | null
          features?: string[]
          pricing_info?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          icon?: string | null
          features?: string[]
          pricing_info?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      contact_inquiries: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          subject: string | null
          message: string
          property_id: string | null
          agent_id: string | null
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          subject?: string | null
          message: string
          property_id?: string | null
          agent_id?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          subject?: string | null
          message?: string
          property_id?: string | null
          agent_id?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      property_views: {
        Row: {
          id: string
          property_id: string | null
          ip_address: string | null
          user_agent: string | null
          viewed_at: string
        }
        Insert: {
          id?: string
          property_id?: string | null
          ip_address?: string | null
          user_agent?: string | null
          viewed_at?: string
        }
        Update: {
          id?: string
          property_id?: string | null
          ip_address?: string | null
          user_agent?: string | null
          viewed_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// Convenience types
export type Property = Database['public']['Tables']['properties']['Row']
export type Agent = Database['public']['Tables']['agents']['Row']
export type Service = Database['public']['Tables']['services']['Row']
export type ContactInquiry = Database['public']['Tables']['contact_inquiries']['Row']
export type PropertyView = Database['public']['Tables']['property_views']['Row']
