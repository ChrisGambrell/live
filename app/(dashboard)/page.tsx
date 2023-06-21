import { verifyAuth } from '@/lib/supabase-server'
import { Header } from './components/header'
import Shell from './components/shell'
import { StreamCreateButton } from './components/stream-create-button'
import Streams from './components/streams'

export default async function HomePage() {
	const user = await verifyAuth()

	return (
		<Shell>
			<Header heading='Streams' text={user.role === 'speaker' ? 'Create and manage streams.' : 'View and join streams.'}>
				{user.role === 'speaker' && <StreamCreateButton />}
			</Header>
			<Streams user={user} />
		</Shell>
	)
}
