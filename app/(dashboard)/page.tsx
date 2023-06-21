'use client'

import { useRealtime } from '@/lib/hooks'
import { Tv } from 'lucide-react'
import { EmptyPlaceholder } from './components/empty-placeholder'
import { Header } from './components/header'
import Shell from './components/shell'
import { StreamCreateButton } from './components/stream-create-button'
import { StreamItem } from './components/stream-item'

export default function HomePage() {
	const { data: streams } = useRealtime('streams')

	return (
		<Shell>
			<Header heading='Streams' text='Create and manage streams.'>
				<StreamCreateButton />
			</Header>
			<div>
				{streams?.length ? (
					<div className='border divide-y rounded-md divide-border'>
						{streams.map((stream) => (
							<StreamItem key={stream.id} stream={stream} />
						))}
					</div>
				) : (
					<EmptyPlaceholder>
						<EmptyPlaceholder.Icon icon={Tv} />
						<EmptyPlaceholder.Title>No posts created</EmptyPlaceholder.Title>
						<EmptyPlaceholder.Description>
							You don&apos;t have any posts yet. Start creating content.
						</EmptyPlaceholder.Description>
						<StreamCreateButton variant='outline' />
					</EmptyPlaceholder>
				)}
			</div>
		</Shell>
	)
}
