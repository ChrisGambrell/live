import { Header } from './components/header'
import Shell from './components/shell'
import { StreamCreateButton } from './components/stream-create-button'
import { StreamItem } from './components/stream-item'

export default function DashboardLoading() {
	return (
		<Shell>
			<Header heading='Posts' text='Create and manage posts.'>
				{/* TODO: Activate this and include props */}
				{/* <StreamCreateButton /> */}
			</Header>
			<div className='border divide-y rounded-md divide-border-200'>
				<StreamItem.Skeleton />
				<StreamItem.Skeleton />
				<StreamItem.Skeleton />
				<StreamItem.Skeleton />
				<StreamItem.Skeleton />
			</div>
		</Shell>
	)
}
