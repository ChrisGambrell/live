'use client'

import { Button } from '@/components/ui/button'
import { useRealtime } from '@/lib/hooks'
import { UserProfile } from '@/lib/supabase'
import useOldStreams from '@/lib/use-old-streams'
import useStreams from '@/lib/use-streams'
import { Tv } from 'lucide-react'
import { useMemo, useState } from 'react'
import { EmptyPlaceholder } from './empty-placeholder'
import { StreamCreateButton } from './stream-create-button'
import { StreamItem } from './stream-item'

export default function Streams({ user }: { user: UserProfile }) {
	const streams = useStreams()
	const oldStreams = useOldStreams()
	const { data: profiles } = useRealtime('profiles')

	const [showOldStreams, setShowOldStreams] = useState(false)

	const streamProfiles = useMemo(
		() => streams.map((stream) => ({ ...stream, presenter: profiles.find((p) => p.id === stream.presenter) })),
		[streams, profiles]
	)
	const oldStreamProfiles = useMemo(
		() => oldStreams.map((stream) => ({ ...stream, presenter: profiles.find((p) => p.id === stream.presenter) })),
		[oldStreams, profiles]
	)

	return (
		<div className='pb-4'>
			{streams?.length ? (
				<div className='space-y-6'>
					<div className='border divide-y rounded-md divide-border'>
						{streamProfiles.map((stream) => (
							// TODO: Fix error
							// @ts-ignore
							<StreamItem key={stream.id} speaker={user.role === 'speaker'} stream={stream} user={user} />
						))}
					</div>
					<div className='flex justify-center'>
						<Button
							className='text-black/50 hover:text-black/50'
							size='xs'
							variant='ghost'
							onClick={() => setShowOldStreams((prev) => !prev)}>
							{showOldStreams ? 'Hide old streams' : 'Show old streams'}
						</Button>
					</div>
					{showOldStreams && (
						<div className='border divide-y rounded-md divide-border opacity-70'>
							{oldStreamProfiles.map((stream) => (
								// TODO: Fix error
								// @ts-ignore
								<StreamItem key={stream.id} speaker={user.role === 'speaker'} stream={stream} user={user} />
							))}
						</div>
					)}
				</div>
			) : (
				<EmptyPlaceholder>
					<EmptyPlaceholder.Icon icon={Tv} />
					<EmptyPlaceholder.Title>No posts created</EmptyPlaceholder.Title>
					<EmptyPlaceholder.Description>You don&apos;t have any posts yet. Start creating content.</EmptyPlaceholder.Description>
					<StreamCreateButton profiles={profiles} variant='outline' />
				</EmptyPlaceholder>
			)}
		</div>
	)
}
