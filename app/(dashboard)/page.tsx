import { supaserver, verifyAuth } from '@/lib/supabase-server'
import { cookies } from 'next/headers'
import { Header } from './components/header'
import Shell from './components/shell'
import { StreamCreateButton } from './components/stream-create-button'
import Streams from './components/streams'

export default async function HomePage() {
	const user = await verifyAuth()
	const { data: profiles } = await supaserver(cookies).from('profiles').select().eq('role', 'speaker')

	return (
		<Shell>
			<Header heading='Streams' text={user.role === 'speaker' ? 'Create and manage streams.' : 'View and join streams.'}>
				{user.role === 'speaker' && <StreamCreateButton profiles={profiles!} />}
			</Header>
			<Streams user={user} />
		</Shell>
	)
}
