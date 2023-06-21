import { User } from '@supabase/auth-helpers-nextjs'
import { Database } from './database.types'

export type SupaTables = keyof Database['public']['Tables']
export type SupaSelectType<T extends SupaTables> = Database['public']['Tables'][T]['Row']
export type UserProfile = SupaSelectType<'profiles'> & Pick<User, 'email'>
