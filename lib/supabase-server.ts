import { createRouteHandlerClient, createServerActionClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from './database.types'

export const supaaction = createServerActionClient<Database>({ cookies })
export const suparoute = createRouteHandlerClient<Database>({ cookies })
export const supaserver = createServerComponentClient<Database>({ cookies })
