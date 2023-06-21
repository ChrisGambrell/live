import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from './database.types'
import { UserProfile } from './supabase'

export const supaclient = () => createClientComponentClient<Database>()
