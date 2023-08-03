'use client'

import { Button } from '@/components/ui/button'
import { SupaSelectType, UserProfile } from '@/lib/supabase'
import { useMeeting } from '@videosdk.live/react-sdk'
import { useEffect, useRef, useState } from 'react'
import SpeakerView from './speaker-view'

export default function Container({
	stream,
	user,
	onMeetingLeave,
}: {
	stream: SupaSelectType<'streams'>
	user: UserProfile
	onMeetingLeave: () => void
}) {
	const meeting = useMeeting({
		onMeetingJoined: () => setJoined('JOINED'),
		onMeetingLeft: () => {
			setJoined(null)
			onMeetingLeave()
		},
		onError: (err) => console.error(err),
	})
	const meetingRef = useRef(meeting)
	const { join } = useMeeting()
	const [joined, setJoined] = useState<string | null>(null)

	useEffect(() => {
		meetingRef.current = meeting
	}, [meeting])

	const joinMeeting = () => {
		setJoined('JOINING')
		join()
	}

	return (
		<div className='flex flex-col h-full'>
			{joined && joined === 'JOINED' ? (
				<SpeakerView stream={stream} user={user} />
			) : joined && joined === 'JOINING' ? (
				<div className='flex flex-col items-center justify-center h-full'>Joining the meeting...</div>
			) : (
				<div className='flex flex-col items-center justify-center h-full'>
					<Button className='w-full max-w-xs' onClick={joinMeeting}>
						Join Meeting
					</Button>
				</div>
			)}
		</div>
	)
}
