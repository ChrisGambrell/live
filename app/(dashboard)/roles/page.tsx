import { supaserver, verifyAuth } from '@/lib/supabase-server'
import { cookies } from 'next/headers'
import { Header } from '../components/header'
import Shell from '../components/shell'
import { UserItem } from './components/user-item'

export default async function RolesPage() {
	const user = await verifyAuth()
	const { data: users } = await supaserver(cookies).from('profiles').select().order('created_at')

	return (
		<Shell>
			<Header heading='Roles' text='Assign speaker/hosting permissions to users.' />
			<div>
				{users?.length && (
					<div className='border divide-y rounded-md divide-border'>
						{users.map((u) => (
							<UserItem key={u.id} user={u} />
						))}
					</div>
				)}
			</div>
		</Shell>
	)
}
