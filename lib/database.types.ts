export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
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
        }
        Insert: {
          created_at?: string
          id: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
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
          name: string
        }
        Insert: {
          created_at?: string
          date: string
          id?: string
          meeting_id: string
          name: string
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          meeting_id?: string
          name?: string
        }
        Relationships: []
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
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
