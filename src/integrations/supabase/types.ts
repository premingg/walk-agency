export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      awards: {
        Row: {
          body: string
          created_at: string
          id: string
          sort_order: number
          title: string
          updated_at: string
          year: string
        }
        Insert: {
          body?: string
          created_at?: string
          id?: string
          sort_order?: number
          title: string
          updated_at?: string
          year?: string
        }
        Update: {
          body?: string
          created_at?: string
          id?: string
          sort_order?: number
          title?: string
          updated_at?: string
          year?: string
        }
        Relationships: []
      }
      client_logos: {
        Row: {
          created_at: string
          id: string
          logo_url: string
          name: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          logo_url: string
          name: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          logo_url?: string
          name?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      faqs: {
        Row: {
          answer: string
          created_at: string
          id: string
          question: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          answer?: string
          created_at?: string
          id?: string
          question: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          answer?: string
          created_at?: string
          id?: string
          question?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      hero_slides: {
        Row: {
          alt: string
          created_at: string
          id: string
          image_url: string
          project_slug: string | null
          sort_order: number
          updated_at: string
        }
        Insert: {
          alt?: string
          created_at?: string
          id?: string
          image_url: string
          project_slug?: string | null
          sort_order?: number
          updated_at?: string
        }
        Update: {
          alt?: string
          created_at?: string
          id?: string
          image_url?: string
          project_slug?: string | null
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      job_openings: {
        Row: {
          created_at: string
          description: string
          id: string
          job_type: string
          location: string
          sort_order: number
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string
          id?: string
          job_type?: string
          location?: string
          sort_order?: number
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          job_type?: string
          location?: string
          sort_order?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      milestones: {
        Row: {
          body: string
          created_at: string
          id: string
          sort_order: number
          title: string
          updated_at: string
          year: string
        }
        Insert: {
          body?: string
          created_at?: string
          id?: string
          sort_order?: number
          title: string
          updated_at?: string
          year?: string
        }
        Update: {
          body?: string
          created_at?: string
          id?: string
          sort_order?: number
          title?: string
          updated_at?: string
          year?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          approach: string
          category: string
          city: string
          client_name: string
          created_at: string
          detail_image_url: string | null
          featured: boolean
          highlights: string[]
          id: string
          objective: string
          overview: string
          slug: string
          sort_order: number
          thumbnail_url: string
          title: string
          updated_at: string
          year: string
        }
        Insert: {
          approach?: string
          category?: string
          city?: string
          client_name?: string
          created_at?: string
          detail_image_url?: string | null
          featured?: boolean
          highlights?: string[]
          id?: string
          objective?: string
          overview?: string
          slug: string
          sort_order?: number
          thumbnail_url: string
          title: string
          updated_at?: string
          year?: string
        }
        Update: {
          approach?: string
          category?: string
          city?: string
          client_name?: string
          created_at?: string
          detail_image_url?: string | null
          featured?: boolean
          highlights?: string[]
          id?: string
          objective?: string
          overview?: string
          slug?: string
          sort_order?: number
          thumbnail_url?: string
          title?: string
          updated_at?: string
          year?: string
        }
        Relationships: []
      }
      site_stats: {
        Row: {
          created_at: string
          id: string
          label: string
          sort_order: number
          suffix: string
          updated_at: string
          value: number
        }
        Insert: {
          created_at?: string
          id?: string
          label: string
          sort_order?: number
          suffix?: string
          updated_at?: string
          value?: number
        }
        Update: {
          created_at?: string
          id?: string
          label?: string
          sort_order?: number
          suffix?: string
          updated_at?: string
          value?: number
        }
        Relationships: []
      }
      team_members: {
        Row: {
          created_at: string
          id: string
          linkedin_url: string | null
          name: string
          photo_url: string | null
          sort_order: number
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          linkedin_url?: string | null
          name: string
          photo_url?: string | null
          sort_order?: number
          title?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          linkedin_url?: string | null
          name?: string
          photo_url?: string | null
          sort_order?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          author: string
          avatar_url: string | null
          created_at: string
          id: string
          quote: string
          role: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          author?: string
          avatar_url?: string | null
          created_at?: string
          id?: string
          quote: string
          role?: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          author?: string
          avatar_url?: string | null
          created_at?: string
          id?: string
          quote?: string
          role?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
