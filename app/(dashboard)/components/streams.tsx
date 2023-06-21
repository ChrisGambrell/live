'use client'

import { useRealtime } from '@/lib/hooks'
import { UserProfile } from '@/lib/supabase'
import { Tv } from 'lucide-react'
import { EmptyPlaceholder } from './empty-placeholder'
import { StreamCreateButton } from './stream-create-button'
import { StreamItem } from './stream-item'

export default function Streams({ user }: { user: UserProfile }) {
	const { data: streams } = useRealtime('streams')

	return (
		<div>
			{streams?.length ? (
				<div className='border divide-y rounded-md divide-border'>
					{streams.map((stream) => (
						<StreamItem key={stream.id} speaker={user.role === 'speaker'} stream={stream} />
					))}
				</div>
			) : (
				<EmptyPlaceholder>
					<EmptyPlaceholder.Icon icon={Tv} />
					<EmptyPlaceholder.Title>No posts created</EmptyPlaceholder.Title>
					<EmptyPlaceholder.Description>You don&apos;t have any posts yet. Start creating content.</EmptyPlaceholder.Description>
					<StreamCreateButton variant='outline' />
				</EmptyPlaceholder>
			)}
		</div>
	)
}
