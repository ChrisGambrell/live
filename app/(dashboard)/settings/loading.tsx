import { Header } from '../components/header'
import Shell from '../components/shell'
import { CardSkeleton } from './components/card-skeleton'

export default function SettingsLoading() {
	return (
		<Shell>
			<Header heading='Settings' text='Manage account and settings.' />
			<div className='grid gap-10'>
				<CardSkeleton />
			</div>
		</Shell>
	)
}
