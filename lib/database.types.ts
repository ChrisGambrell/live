export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      messages: {
        Row: {
          created_at: string
          display_name: string
          id: string
          meeting_id: string
          message: string
        }
        Insert: {
          created_at?: string
          display_name: string
          id?: string
          meeting_id: string
          message: string
        }
        Update: {
          created_at?: string
          display_name?: string
          id?: string
          meeting_id?: string
          message?: string
        }
        Relationships: []
      }
      organizations: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      orgs: {
        Row: {
          created_at: string
          id: string
          name: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "orgs_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          created_at: string
          id: string
          name: string
          role: string
        }
        Insert: {
          created_at?: string
          id: string
          name: string
          role?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      streams: {
        Row: {
          created_at: string
          date: string
          id: string
          meeting_id: string
          month: number | null
          name: string
          presenter: string
          week: number | null
        }
        Insert: {
          created_at?: string
          date: string
          id?: string
          meeting_id: string
          month?: number | null
          name: string
          presenter?: string
          week?: number | null
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          meeting_id?: string
          month?: number | null
          name?: string
          presenter?: string
          week?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "streams_presenter_fkey"
            columns: ["presenter"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      subpub: {
        Row: {
          created_at: string
          data: Json
          id: string
          organization_id: string
          tag: string
        }
        Insert: {
          created_at?: string
          data: Json
          id?: string
          organization_id: string
          tag: string
        }
        Update: {
          created_at?: string
          data?: Json
          id?: string
          organization_id?: string
          tag?: string
        }
        Relationships: [
          {
            foreignKeyName: "subpub_organization_id_fkey"
            columns: ["organization_id"]
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          created_at: string
          id: string
          name: string
          username: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          username: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          username?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      delete_avatar: {
        Args: {
          avatar_url: string
        }
        Returns: Record<string, unknown>
      }
      delete_storage_object: {
        Args: {
          bucket: string
          object: string
        }
        Returns: Record<string, unknown>
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
