import { createRouteHandlerClient, createServerActionClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Database } from './database.types'

export const supaaction = (cookies: () => ReadonlyRequestCookies) => createServerActionClient<Database>({ cookies })
export const suparoute = (cookies: () => ReadonlyRequestCookies) => createRouteHandlerClient<Database>({ cookies })
export const supaserver = (cookies: () => ReadonlyRequestCookies) => createServerComponentClient<Database>({ cookies })

export const verifyAuth = async () => {
	const {
		data: { session },
	} = await supaserver(cookies).auth.getSession()
	if (!session) redirect(`/login?redirectTo=${cookies().get('Path')?.value || '/'}`)
	return session.user
}
