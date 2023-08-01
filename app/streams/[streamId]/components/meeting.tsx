'use client'

import { SupaSelectType, UserProfile } from '@/lib/supabase'
import { MeetingConsumer, MeetingProvider } from '@videosdk.live/react-sdk'
import { useRouter } from 'next/navigation'
import Container from './container'

export default function Meeting({
	mode,
	stream,
	token,
	user,
}: {
	mode: 'CONFERENCE' | 'VIEWER'
	stream: SupaSelectType<'streams'>
	token: string
	user: UserProfile
}) {
	const router = useRouter()

	return (
		<MeetingProvider
			config={{
				meetingId: stream.meeting_id,
				micEnabled: true,
				webcamEnabled: true,
				name: user.name,
				mode,
			}}
			token={token}>
			<MeetingConsumer>{() => <Container onMeetingLeave={() => router.push('/')} />}</MeetingConsumer>
		</MeetingProvider>
	)
}
