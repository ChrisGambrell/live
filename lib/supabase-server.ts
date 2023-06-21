import { createRouteHandlerClient, createServerActionClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Database } from './database.types'
import { UserProfile } from './supabase'

export const supaaction = (cookies: () => ReadonlyRequestCookies) => createServerActionClient<Database>({ cookies })
export const suparoute = (cookies: () => ReadonlyRequestCookies) => createRouteHandlerClient<Database>({ cookies })
export const supaserver = (cookies: () => ReadonlyRequestCookies) => createServerComponentClient<Database>({ cookies })

export const verifyAuth = async (): Promise<UserProfile> => {
	const supabase = supaserver(cookies)

	const {
		data: { session },
	} = await supabase.auth.getSession()
	if (!session) redirect(`/login?redirectTo=${cookies().get('Path')?.value || '/'}`)

	const { data: profile, error: profileError } = await supabase.from('profiles').select().eq('id', session.user.id).single()
	if (profileError || !profile) throw profileError || new Error('No profile found')

	return { ...profile, email: session.user.email }
}
