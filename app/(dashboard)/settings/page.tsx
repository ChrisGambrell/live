import { verifyAuth } from '@/lib/supabase-server'
import { Header } from '../components/header'
import Shell from '../components/shell'
import SettingsForm from './components/settings-form'

export default async function SettingsPage() {
	const user = await verifyAuth()

	return (
		<Shell>
			<Header heading='Settings' text='Manage account and settings.' />
			<div className='grid gap-10'>
				<SettingsForm user={user} />
			</div>
		</Shell>
	)
}
