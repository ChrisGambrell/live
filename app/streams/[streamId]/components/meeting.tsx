'use client'

import { SupaSelectType, UserProfile } from '@/lib/supabase'
import { MeetingConsumer, MeetingProvider } from '@videosdk.live/react-sdk'
import { useRouter } from 'next/navigation'
import Container from './container'

export default function Meeting({ stream, token, user }: { stream: SupaSelectType<'streams'>; token: string; user: UserProfile }) {
	const router = useRouter()
	// console.log(stream)

	return (
		<MeetingProvider
			config={{
				meetingId: stream.meeting_id,
				micEnabled: false,
				webcamEnabled: false,
				name: user.name,
				// multiStream: false,
				maxResolution: 'hd',
			}}
			token={token}>
			<MeetingConsumer>{() => <Container stream={stream} user={user} onMeetingLeave={() => router.push('/')} />}</MeetingConsumer>
		</MeetingProvider>
	)
}
