// BUG: Remove all unused components

import { SupaSelectType, UserProfile } from '@/lib/supabase'
import { useMeeting } from '@videosdk.live/react-sdk'
import { useMemo } from 'react'
import Messages from './messages'
import ParticipantView from './participant-view'
import Participants from './participants'

export default function ViewerView({ stream, user }: { stream: SupaSelectType<'streams'>; user: UserProfile }) {
	const { participants } = useMeeting()
	const webcamStreams = useMemo(() => [...participants.values()].filter((p) => p.webcamOn), [participants])

	return (
		<div className='flex flex-grow space-x-4'>
			<div className='flex items-center w-full h-full'>
				{webcamStreams.map((stream) => (
					<ParticipantView key={stream.id} participantId={stream.id} />
				))}
			</div>
			<div className='flex flex-col h-full pb-6 pr-4 space-y-4'>
				<Participants stream={stream} user={user} />
				<Messages />
			</div>
		</div>
	)
}
